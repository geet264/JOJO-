export type SkillLevel = 'Beginner' | 'Intermediate' | 'Expert';

export interface UserSkill {
  name: string;
  level: SkillLevel;
  category: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  currentTitle: string;
  targetTitles: string[];
  summary: string;
  yearsOfExperience: number;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  skills: UserSkill[];
  experiences: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  links: {
    linkedin?: string;
    naukri?: string;
    github?: string;
    portfolio?: string;
  };
  lastSyncedAt?: string;
  updatedAt: string;
}

export type ApplicationStage = 
  | 'Wishlist'
  | 'Applied'
  | 'Screening'
  | 'Technical'
  | 'Final Round'
  | 'Offer'
  | 'Rejected';

export type JobRegion = 'India' | 'Worldwide Remote' | 'United States' | 'Europe';

export interface JobPost {
  id: string;
  title: string;
  company: string;
  platform: 'LinkedIn' | 'Naukri' | 'Indeed' | 'Glassdoor' | 'Direct';
  location: string;
  region: JobRegion;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  experienceRequired: string;
  description: string;
  requiredSkills: string[];
  postedDate: string;
  url: string;
  matchScore: number;
  atsScore: number;
  atsStatus: 'Top 5% Candidate' | 'Strong ATS Match' | 'Needs Optimization';
  matchedSkills: string[];
  missingSkills: string[];
  applicationStage: ApplicationStage;
  appliedDate?: string;
  interviewDate?: string;
  recruiterName?: string;
  recruiterContact?: string;
  notes?: string;
  salaryOffered?: string;
  tailoredBullets?: string[];
  tailoredCoverLetter?: string;
}

export interface SyncPlatformState {
  id: 'linkedin' | 'naukri' | 'indeed' | 'instahyre' | 'glassdoor' | 'foundit' | 'wellfound' | 'greenhouse' | string;
  name: string;
  logo: string;
  status: 'Connected' | 'Pending' | 'Needs Update';
  lastSyncedAt?: string;
  accountEmail?: string;
}

export interface UserAccountData {
  userId: string;
  userEmail: string;
  profile: UserProfile;
  jobs: JobPost[];
  platforms: SyncPlatformState[];
  syncLogs: Array<{ id: string; timestamp: string; platform: string; message: string }>;
}

export interface ActivityReminder {
  id: string;
  title: string;
  company: string;
  dueDate: string;
  type: 'Interview' | 'FollowUp' | 'Screening' | 'OfferDeadline';
  completed: boolean;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  role: string;
  experienceLevel: string;
  noticePeriod: string;
  currentCTC: string;
  expectedCTC: string;
  preferredLocation: string;
  targetPlatforms: string[];
  skills: string[];
}

