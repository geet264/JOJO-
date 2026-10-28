import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { initialProfile, initialJobs, initialPlatforms } from '@/lib/initialData';
import { UserProfile, JobPost, SyncPlatformState } from '@/types';

const dataDir = path.join(process.cwd(), 'data');
const dbFilePath = path.join(dataDir, 'jojo-db.json');

interface DatabaseSchema {
  profile: UserProfile;
  jobs: JobPost[];
  platforms: SyncPlatformState[];
  syncLogs: Array<{ id: string; timestamp: string; platform: string; message: string }>;
}

function ensureDbExists(): DatabaseSchema {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dbFilePath)) {
    const defaultData: DatabaseSchema = {
      profile: initialProfile,
      jobs: initialJobs,
      platforms: initialPlatforms,
      syncLogs: [
        {
          id: 'log_1',
          timestamp: new Date().toLocaleTimeString(),
          platform: 'Naukri',
          message: 'Profile skills and current experience synced to Naukri.com',
        },
        {
          id: 'log_2',
          timestamp: new Date().toLocaleTimeString(),
          platform: 'LinkedIn',
          message: 'Updated headline and DevSecOps certifications on LinkedIn',
        },
      ],
    };
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }

  try {
    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {
      profile: initialProfile,
      jobs: initialJobs,
      platforms: initialPlatforms,
      syncLogs: [],
    };
  }
}

export async function GET() {
  const data = ensureDbExists();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    ensureDbExists();

    const current = ensureDbExists();
    const updated: DatabaseSchema = {
      profile: payload.profile || current.profile,
      jobs: payload.jobs || current.jobs,
      platforms: payload.platforms || current.platforms,
      syncLogs: payload.syncLogs || current.syncLogs || [],
    };

    fs.writeFileSync(dbFilePath, JSON.stringify(updated, null, 2), 'utf-8');
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
