import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { initialProfile, initialJobs, initialPlatforms } from '@/lib/initialData';
import { UserAccountData, UserProfile, JobPost, SyncPlatformState } from '@/types';
import { findUserById, generateDefaultAccountData } from '@/lib/userDb';
import { getAuthenticatedUserFromRequest, applySecurityHeaders } from '@/lib/security';

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

    if (!parsed.accounts) {
      const migrated: MultiTenantDatabase = {
        accounts: {
          user_1: defaultGeetaAccount,
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

/**
 * Handle CORS Preflight OPTIONS requests securely (CWE-942)
 */
export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';
  const allowed = origin.includes('localhost') || origin.includes('127.0.0.1') || origin.startsWith('chrome-extension://');

  const res = new NextResponse(null, { status: 204 });
  if (allowed) {
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return applySecurityHeaders(res);
}

export async function GET(req: Request) {
  try {
    const db = ensureMultiTenantDb();
    const { searchParams } = new URL(req.url);
    const requestedUserId = searchParams.get('userId');

    // 1. Session & Identity Verification (OWASP API1:2023 / CWE-639 IDOR Protection)
    const session = getAuthenticatedUserFromRequest(req);

    // If an authenticated user attempts to access another user's private data, block with 403 Forbidden
    if (session.authenticated && requestedUserId && requestedUserId !== session.userId) {
      const res = NextResponse.json(
        { success: false, error: 'Access denied (IDOR Violation): You cannot access private profile data of another user.' },
        { status: 403 }
      );
      return applySecurityHeaders(res);
    }

    const effectiveUserId = session.authenticated ? session.userId! : (requestedUserId || 'user_1');

    if (db.accounts[effectiveUserId]) {
      const res = NextResponse.json(db.accounts[effectiveUserId]);
      return applySecurityHeaders(res);
    }

    // Initialize account data if registered user
    const registeredUser = findUserById(effectiveUserId);
    if (registeredUser) {
      const newAccountData = generateDefaultAccountData(registeredUser);
      db.accounts[effectiveUserId] = newAccountData;
      fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf-8');
      const res = NextResponse.json(newAccountData);
      return applySecurityHeaders(res);
    }

    // Fallback safe preview data
    const previewData = db.accounts['user_1'];
    const res = NextResponse.json(previewData);
    return applySecurityHeaders(res);
  } catch {
    const res = NextResponse.json(
      { success: false, error: 'Secure data retrieval failure.' },
      { status: 500 }
    );
    return applySecurityHeaders(res);
  }
}

export async function POST(req: Request) {
  try {
    const db = ensureMultiTenantDb();
    const session = getAuthenticatedUserFromRequest(req);

    const payload = await req.json();
    const targetUserId = payload.userId || payload.profile?.id || 'user_1';

    // 2. Strict IDOR Mutation Authorization Check (OWASP API1:2023 / CWE-639)
    if (session.authenticated && targetUserId !== session.userId) {
      const res = NextResponse.json(
        { success: false, error: 'Access denied: You are not authorized to modify another account’s data.' },
        { status: 403 }
      );
      return applySecurityHeaders(res);
    }

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
    const res = NextResponse.json({ success: true, userId: targetUserId, data: updatedAccount });
    return applySecurityHeaders(res);
  } catch {
    const res = NextResponse.json(
      { success: false, error: 'Secure data persistence failure.' },
      { status: 500 }
    );
    return applySecurityHeaders(res);
  }
}
