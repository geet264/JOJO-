import fs from 'fs';
import path from 'path';
import { AuthUser } from '@/types';

const dataDir = path.join(process.cwd(), 'data');
const usersFilePath = path.join(dataDir, 'users.json');

export interface StoredUser extends AuthUser {
  password?: string;
  createdAt: string;
}

const DEFAULT_USERS: StoredUser[] = [
  {
    id: 'user_1',
    fullName: 'Geeta Jogi',
    email: 'geeta.jogi@altisec.com',
    password: 'password123',
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
    const users = JSON.parse(raw);
    if (!Array.isArray(users) || users.length === 0) {
      fs.writeFileSync(usersFilePath, JSON.stringify(DEFAULT_USERS, null, 2), 'utf-8');
      return DEFAULT_USERS;
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

export function createUser(userData: Omit<StoredUser, 'id' | 'createdAt'>): { success: boolean; user?: AuthUser; error?: string } {
  const users = ensureUsersDb();
  const normalizedEmail = userData.email.trim().toLowerCase();

  // Check if user already exists
  const existing = users.find((u) => u.email.trim().toLowerCase() === normalizedEmail);
  if (existing) {
    return { success: false, error: 'An account with this email address already exists. Please log in.' };
  }

  const newUser: StoredUser = {
    ...userData,
    id: `usr_${Date.now()}`,
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

  // Strip password for return payload
  const { password, ...safeUser } = newUser;
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

  // Check password
  if (user.password !== passwordAttempt) {
    return { 
      success: false, 
      error: 'Incorrect password. Please check your credentials and try again.' 
    };
  }

  // Password matches - return safe user without password
  const { password, ...safeUser } = user;
  return { success: true, user: safeUser };
}
