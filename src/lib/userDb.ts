import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { AuthUser, UserAccountData, UserProfile, SyncPlatformState } from '@/types';
import { initialProfile, initialJobs } from '@/lib/initialData';
import { enrichJobsWithMatchScores } from '@/lib/matchEngine';

const dataDir = path.join(process.cwd(), 'data');
const usersFilePath = path.join(dataDir, 'users.json');

export interface StoredUser extends AuthUser {
  passwordHash?: string;
  password?: string; // Legacy support during migration
  createdAt: string;
}

const DEFAULT_USERS: StoredUser[] = [
  {
    id: 'user_1',
    fullName: 'Geeta Jogi',
    email: 'geeta.jogi@altisec.com',
    passwordHash: bcrypt.hashSync('password123', 12),
    role: 'DevSecOps Engineer',
    experienceLevel: '3-5 Years (Mid-Senior)',
    noticePeriod: '30 Days / Serving Notice',
    currentCTC: '14 LPA',
    expectedCTC: '22 - 25 LPA ($90k - $120k for Remote)',
    preferredLocation: 'Worldwide Remote & India',
    targetPlatforms: ['linkedin', 'naukri', 'indeed', 'instahyre'],
    skills: [
      'DevSecOps',
      'Docker & Kubernetes',
      'AWS Cloud Security',
      'CI/CD Pipelines (GitHub Actions / Jenkins)',
      'Terraform (IaC)',
      'SonarQube & SAST/DAST',
      'Trivy / Container Scanning',
      'Python / Bash Scripting',
      'Linux Administration',
    ],
    createdAt: new Date().toISOString(),
  },
];

export function ensureUsersDb(): StoredUser[] {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify(DEFAULT_USERS, null, 2), 'utf-8');
    return DEFAULT_USERS;
  }

  try {
    const raw = fs.readFileSync(usersFilePath, 'utf-8');
    const users: StoredUser[] = JSON.parse(raw);
    if (!Array.isArray(users) || users.length === 0) {
      fs.writeFileSync(usersFilePath, JSON.stringify(DEFAULT_USERS, null, 2), 'utf-8');
      return DEFAULT_USERS;
    }

    // Auto-migrate any plaintext passwords to bcrypt hashes
    let modified = false;
    users.forEach((u) => {
      if (u.password && (!u.passwordHash || !u.passwordHash.startsWith('$2'))) {
        u.passwordHash = bcrypt.hashSync(u.password, 12);
        delete u.password;
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    }

    return users;
  } catch {
    fs.writeFileSync(usersFilePath, JSON.stringify(DEFAULT_USERS, null, 2), 'utf-8');
    return DEFAULT_USERS;
  }
}

export function getAllUsers(): StoredUser[] {
  return ensureUsersDb();
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const users = ensureUsersDb();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.trim().toLowerCase() === normalized);
}

export function createUser(userData: Omit<StoredUser, 'id' | 'createdAt'> & { password?: string }): { success: boolean; user?: AuthUser; error?: string } {
  const users = ensureUsersDb();
  const normalizedEmail = userData.email.trim().toLowerCase();

  // Check if user already exists
  const existing = users.find((u) => u.email.trim().toLowerCase() === normalizedEmail);
  if (existing) {
    return { success: false, error: 'An account with this email address already exists. Please log in.' };
  }

  const rawPassword = userData.password || 'password123';
  const passwordHash = bcrypt.hashSync(rawPassword, 12);

  const { password, ...cleanedData } = userData;

  const newUser: StoredUser = {
    ...cleanedData,
    id: `usr_${Date.now()}`,
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

  // Strip password and passwordHash for return payload
  const { passwordHash: _, password: __, ...safeUser } = newUser;
  return { success: true, user: safeUser };
}

export function authenticateUser(email: string, passwordAttempt: string): { success: boolean; user?: AuthUser; error?: string } {
  const users = ensureUsersDb();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find((u) => u.email.trim().toLowerCase() === normalizedEmail);
  if (!user) {
    return { 
      success: false, 
      error: 'No account found with this email. Please click "Create Account" to register.' 
    };
  }

  // Check password against bcrypt hash or legacy plaintext
  const hash = user.passwordHash || (user.password ? bcrypt.hashSync(user.password, 12) : '');
  const isMatch = hash ? bcrypt.compareSync(passwordAttempt, hash) : false;

  if (!isMatch) {
    return { 
      success: false, 
      error: 'Incorrect password. Please check your credentials and try again.' 
    };
  }

  // Ensure passwordHash is saved and plain password removed
  if (user.password) {
    user.passwordHash = hash;
    delete user.password;
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  // Password matches - return safe user without password or hash
  const { passwordHash: _, password: __, ...safeUser } = user;
  return { success: true, user: safeUser };
}

export function findUserById(id: string): StoredUser | undefined {
  const users = ensureUsersDb();
  return users.find((u) => u.id === id);
}

export function generateDefaultAccountData(user: AuthUser): UserAccountData {
  const isGeeta = user.email.toLowerCase().includes('geeta.jogi');

  const profile: UserProfile = {
    ...initialProfile,
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    currentTitle: user.role || 'Senior Software Engineer',
    targetTitles: [user.role, `Senior ${user.role}`, `${user.role} Specialist`],
    summary: `${user.role} with expertise in modern infrastructure, pipelines, and cloud automation. Seeking high-impact positions.`,
    yearsOfExperience: user.experienceLevel?.includes('8+') ? 8 : user.experienceLevel?.includes('5-8') ? 6 : 4,
    currentCTC: user.currentCTC || '14 LPA',
    expectedCTC: user.expectedCTC || '24 LPA',
    noticePeriod: user.noticePeriod || '30 Days',
    location: user.preferredLocation || 'Worldwide Remote & India',
    skills: user.skills && user.skills.length > 0
      ? user.skills.map((s) => ({ name: s, level: 'Expert' as const, category: 'Core Stack' }))
      : initialProfile.skills,
    links: {
      linkedin: `https://linkedin.com/in/${user.fullName.toLowerCase().replace(/\s+/g, '-')}`,
      naukri: `https://naukri.com/profile/${user.fullName.toLowerCase().replace(/\s+/g, '-')}`,
    },
    lastSyncedAt: isGeeta ? '10 minutes ago' : 'Ready to sync',
    updatedAt: new Date().toISOString(),
  };

  const platforms: SyncPlatformState[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      logo: '💼',
      status: 'Connected',
      lastSyncedAt: isGeeta ? '10 minutes ago' : 'Connected for ' + user.email,
      accountEmail: user.email,
    },
    {
      id: 'naukri',
      name: 'Naukri.com',
      logo: '🚀',
      status: user.targetPlatforms?.includes('naukri') || isGeeta ? 'Connected' : 'Pending',
      lastSyncedAt: isGeeta ? '1 hour ago' : 'Pending initial sync',
      accountEmail: user.email,
    },
    {
      id: 'indeed',
      name: 'Indeed India',
      logo: '🌐',
      status: user.targetPlatforms?.includes('indeed') || isGeeta ? 'Connected' : 'Pending',
      lastSyncedAt: isGeeta ? 'Yesterday' : 'Pending initial sync',
      accountEmail: user.email,
    },
    {
      id: 'instahyre',
      name: 'Instahyre',
      logo: '⚡',
      status: user.targetPlatforms?.includes('instahyre') || isGeeta ? 'Connected' : 'Pending',
      lastSyncedAt: isGeeta ? '2 days ago' : 'Pending initial sync',
      accountEmail: user.email,
    },
    {
      id: 'glassdoor',
      name: 'Glassdoor',
      logo: '🏢',
      status: 'Pending',
      lastSyncedAt: 'Not connected',
      accountEmail: user.email,
    },
    {
      id: 'wellfound',
      name: 'Wellfound',
      logo: '✌️',
      status: 'Pending',
      lastSyncedAt: 'Not connected',
      accountEmail: user.email,
    },
  ];

  const jobs = enrichJobsWithMatchScores(profile, initialJobs);

  const syncLogs = [
    {
      id: `log_init_${Date.now()}_1`,
      timestamp: 'Today, Just now',
      platform: 'JOJO Core Hub',
      message: `Account created for ${user.fullName} (${user.email}) with isolated platform channels.`,
    },
    {
      id: `log_init_${Date.now()}_2`,
      timestamp: 'Today, Just now',
      platform: 'LinkedIn',
      message: `Channel configured for ${user.email} (Ready for automated auto-fill sync)`,
    },
  ];

  return {
    userId: user.id,
    userEmail: user.email,
    profile,
    jobs,
    platforms,
    syncLogs,
  };
}
