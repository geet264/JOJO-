import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { initialProfile, initialJobs, initialPlatforms } from '@/lib/initialData';
import { UserAccountData, UserProfile, JobPost, SyncPlatformState } from '@/types';
import { findUserById, generateDefaultAccountData, ensureUsersDb } from '@/lib/userDb';

const dataDir = path.join(process.cwd(), 'data');
const dbFilePath = path.join(dataDir, 'jojo-db.json');

interface MultiTenantDatabase {
  accounts: Record<string, UserAccountData>;
  lastActiveUserId?: string;
}

function ensureMultiTenantDb(): MultiTenantDatabase {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Ensure default Geeta Jogi account data
  const defaultGeetaAccount: UserAccountData = {
    userId: 'user_1',
    userEmail: 'geeta.jogi@altisec.com',
    profile: initialProfile,
    jobs: initialJobs,
    platforms: initialPlatforms,
    syncLogs: [
      {
        id: 'log_1',
        timestamp: 'Today, 2:30 PM',
        platform: 'Naukri.com',
        message: 'DevSecOps skills, experience, and 30-day notice period synced',
      },
      {
        id: 'log_2',
        timestamp: 'Today, 2:32 PM',
        platform: 'LinkedIn',
        message: 'Headline & AWS certifications verified and live on profile',
      },
    ],
  };

  if (!fs.existsSync(dbFilePath)) {
    const initialDb: MultiTenantDatabase = {
      accounts: {
        user_1: defaultGeetaAccount,
      },
      lastActiveUserId: 'user_1',
    };
    fs.writeFileSync(dbFilePath, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    const parsed = JSON.parse(raw);

    // If existing database was old single-user schema, migrate it safely
    if (!parsed.accounts) {
      const migrated: MultiTenantDatabase = {
        accounts: {
          user_1: {
            userId: 'user_1',
            userEmail: parsed.profile?.email || 'geeta.jogi@altisec.com',
            profile: parsed.profile || initialProfile,
            jobs: parsed.jobs || initialJobs,
            platforms: parsed.platforms || initialPlatforms,
            syncLogs: parsed.syncLogs || [],
          },
        },
        lastActiveUserId: 'user_1',
      };
      fs.writeFileSync(dbFilePath, JSON.stringify(migrated, null, 2), 'utf-8');
      return migrated;
    }

    if (!parsed.accounts['user_1']) {
      parsed.accounts['user_1'] = defaultGeetaAccount;
      fs.writeFileSync(dbFilePath, JSON.stringify(parsed, null, 2), 'utf-8');
    }

    return parsed;
  } catch {
    const fallbackDb: MultiTenantDatabase = {
      accounts: {
        user_1: defaultGeetaAccount,
      },
      lastActiveUserId: 'user_1',
    };
    fs.writeFileSync(dbFilePath, JSON.stringify(fallbackDb, null, 2), 'utf-8');
    return fallbackDb;
  }
}

export async function GET(req: Request) {
  try {
    const db = ensureMultiTenantDb();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    // If specific userId requested
    if (userId) {
      if (db.accounts[userId]) {
        return NextResponse.json(db.accounts[userId]);
      }

      // Check if user exists in users table and initialize their isolated account data
      const registeredUser = findUserById(userId);
      if (registeredUser) {
        const newAccountData = generateDefaultAccountData(registeredUser);
        db.accounts[userId] = newAccountData;
        fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf-8');
        return NextResponse.json(newAccountData);
      }
    }

    // Default to active user or user_1
    const fallbackId = db.lastActiveUserId || 'user_1';
    const accountData = db.accounts[fallbackId] || db.accounts['user_1'];
    return NextResponse.json(accountData);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Database read error: ' + String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const db = ensureMultiTenantDb();

    const targetUserId = payload.userId || payload.profile?.id || 'user_1';

    const currentAccount = db.accounts[targetUserId] || {
      userId: targetUserId,
      userEmail: payload.profile?.email || 'user@jojo.dev',
      profile: payload.profile || initialProfile,
      jobs: payload.jobs || initialJobs,
      platforms: payload.platforms || initialPlatforms,
      syncLogs: payload.syncLogs || [],
    };

    const updatedAccount: UserAccountData = {
      userId: targetUserId,
      userEmail: payload.profile?.email || currentAccount.userEmail,
      profile: payload.profile || currentAccount.profile,
      jobs: payload.jobs || currentAccount.jobs,
      platforms: payload.platforms || currentAccount.platforms,
      syncLogs: payload.syncLogs || currentAccount.syncLogs,
    };

    // Save strictly to this user's isolated account slot
    db.accounts[targetUserId] = updatedAccount;
    db.lastActiveUserId = targetUserId;

    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf-8');
    return NextResponse.json({ success: true, userId: targetUserId, data: updatedAccount });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Database save error: ' + String(error) },
      { status: 500 }
    );
  }
}
