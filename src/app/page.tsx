'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { DashboardOverviewView } from '@/components/DashboardOverviewView';
import { JobFeedView } from '@/components/JobFeedView';
import { ApplicationTrackerView } from '@/components/ApplicationTrackerView';
import { ProfileView } from '@/components/ProfileView';
import { SyncManagerView } from '@/components/SyncManagerView';
import { AITailorModal } from '@/components/AITailorModal';
import { AuthModal } from '@/components/AuthModal';
import { MobileExtensionGuideModal } from '@/components/MobileExtensionGuideModal';
import { UserProfile, JobPost, SyncPlatformState, ApplicationStage, AuthUser } from '@/types';
import { initialProfile, initialJobs, initialPlatforms } from '@/lib/initialData';
import { enrichJobsWithMatchScores } from '@/lib/matchEngine';
import { Loader2, Sparkles, UserPlus, LogIn } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'matches' | 'pipeline' | 'profile' | 'sync'>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [jobs, setJobs] = useState<JobPost[]>(() => enrichJobsWithMatchScores(initialProfile, initialJobs));
  const [platforms, setPlatforms] = useState<SyncPlatformState[]>(initialPlatforms);
  const [syncLogs, setSyncLogs] = useState<Array<{ id: string; timestamp: string; platform: string; message: string }>>([
    {
      id: 'log_1',
      timestamp: 'Today, 2:30 PM',
      platform: 'Naukri.com',
      message: 'DevSecOps skills and notice period updated',
    },
    {
      id: 'log_2',
      timestamp: 'Today, 2:32 PM',
      platform: 'LinkedIn',
      message: 'Headline & certifications verified',
    },
  ]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'user_1',
    fullName: 'Geeta Jogi',
    email: 'geeta.jogi@altisec.com',
    role: 'DevSecOps Engineer',
    experienceLevel: '4 Years',
    noticePeriod: '30 Days / Serving Notice',
    currentCTC: '14 LPA',
    expectedCTC: '22 - 25 LPA ($90k - $120k for Remote)',
    preferredLocation: 'Worldwide Remote & India',
    targetPlatforms: ['linkedin', 'naukri', 'indeed'],
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
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isMobileGuideOpen, setIsMobileGuideOpen] = useState<boolean>(false);

  // AI Tailor Modal state
  const [selectedTailorJob, setSelectedTailorJob] = useState<JobPost | null>(null);

  // Dedicated multi-account data loader with secure session token
  const loadUserData = async (userId: string) => {
    setIsLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('jojo_auth_token') : null;
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/data?userId=${userId}`, { headers });
      if (res.ok) {
        const json = await res.json();
        if (json.profile) {
          setProfile(json.profile);
          const enriched = enrichJobsWithMatchScores(json.profile, json.jobs || initialJobs);
          setJobs(enriched);
        }
        if (json.platforms) setPlatforms(json.platforms);
        if (json.syncLogs) setSyncLogs(json.syncLogs);
      }
    } catch (err) {
      console.error('Failed to load user account data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch persisted data from disk on mount & restore user session
  useEffect(() => {
    let targetUserId = 'user_1';
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('jojo_active_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setCurrentUser(parsed);
          if (parsed.id) targetUserId = parsed.id;
        } catch {
          // keep initial
        }
      }
    }
    loadUserData(targetUserId);
  }, []);

  // Save changes to backend disk database for THIS active user only
  const persistChanges = async (
    updatedProfile: UserProfile,
    updatedJobs: JobPost[],
    updatedPlatforms?: SyncPlatformState[],
    updatedLogs?: any[]
  ) => {
    try {
      const targetUserId = currentUser?.id || updatedProfile.id || 'user_1';
      const token = typeof window !== 'undefined' ? localStorage.getItem('jojo_auth_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      await fetch('/api/data', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId: targetUserId,
          profile: updatedProfile,
          jobs: updatedJobs,
          platforms: updatedPlatforms || platforms,
          syncLogs: updatedLogs || syncLogs,
        }),
      });
    } catch (err) {
      console.error('Error persisting account data:', err);
    }
  };

  // Auth Handlers
  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jojo_active_user');
      localStorage.removeItem('jojo_auth_token');
    }
  };

  const handleLoginSuccess = async (user: AuthUser, token?: string) => {
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jojo_active_user', JSON.stringify(user));
      if (token) localStorage.setItem('jojo_auth_token', token);
    }
    await loadUserData(user.id);
  };

  // Recalculate matches when profile changes
  const handleSaveProfile = async (updated: UserProfile) => {
    setProfile(updated);
    const enriched = enrichJobsWithMatchScores(updated, jobs);
    setJobs(enriched);
    await persistChanges(updated, enriched);
  };

  // Update job stage
  const handleUpdateJobStage = async (jobId: string, stage: ApplicationStage) => {
    const updated = jobs.map((j) =>
      j.id === jobId
        ? {
            ...j,
            applicationStage: stage,
            appliedDate: stage === 'Applied' && !j.appliedDate ? new Date().toISOString().split('T')[0] : j.appliedDate,
          }
        : j
    );
    setJobs(updated);
    await persistChanges(profile, updated);
  };

  // Update job interview notes
  const handleUpdateJobNotes = async (jobId: string, notes: string) => {
    const updated = jobs.map((j) => (j.id === jobId ? { ...j, notes } : j));
    setJobs(updated);
    await persistChanges(profile, updated);
  };

  // Save AI Tailored bullets & cover letter to job card
  const handleSaveTailoredData = async (jobId: string, bullets: string[], coverLetter: string) => {
    const updated = jobs.map((j) =>
      j.id === jobId
        ? {
            ...j,
            tailoredBullets: bullets,
            tailoredCoverLetter: coverLetter,
          }
        : j
    );
    setJobs(updated);
    await persistChanges(profile, updated);
  };

  // Add new job
  const handleAddNewJob = async (newJob: JobPost) => {
    const updated = [newJob, ...jobs];
    setJobs(updated);
    await persistChanges(profile, updated);
  };

  // Toggle individual platform connection for this account
  const handleTogglePlatform = async (platformId: string) => {
    const existing = platforms.find((p) => p.id === platformId);
    let updatedPlatforms: SyncPlatformState[];

    if (existing) {
      const nextStatus = existing.status === 'Connected' ? ('Pending' as const) : ('Connected' as const);
      updatedPlatforms = platforms.map((p) =>
        p.id === platformId
          ? {
              ...p,
              status: nextStatus,
              lastSyncedAt: nextStatus === 'Connected' ? 'Connected just now' : 'Disconnected',
              accountEmail: currentUser?.email || profile.email,
            }
          : p
      );
    } else {
      updatedPlatforms = [
        ...platforms,
        {
          id: platformId,
          name: platformId.toUpperCase(),
          logo: '🌐',
          status: 'Connected',
          lastSyncedAt: 'Connected just now',
          accountEmail: currentUser?.email || profile.email,
        },
      ];
    }

    setPlatforms(updatedPlatforms);
    await persistChanges(profile, jobs, updatedPlatforms);
  };

  // Trigger sync to all platforms for this account
  const handleSyncAll = async () => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLogs = [
      {
        id: `log_${Date.now()}_1`,
        timestamp: `Today, ${nowStr}`,
        platform: 'Naukri.com',
        message: `Synced ${profile.skills.length} skills & updated experience for ${profile.email}`,
      },
      {
        id: `log_${Date.now()}_2`,
        timestamp: `Today, ${nowStr}`,
        platform: 'LinkedIn',
        message: `Headline & profile summary synchronized for ${profile.email}`,
      },
      ...syncLogs,
    ];

    const updatedPlatforms = platforms.map((p) => ({
      ...p,
      status: 'Connected' as const,
      lastSyncedAt: 'Just now',
      accountEmail: currentUser?.email || profile.email,
    }));

    const updatedProfile = {
      ...profile,
      lastSyncedAt: 'Just now',
    };

    setSyncLogs(newLogs);
    setPlatforms(updatedPlatforms);
    setProfile(updatedProfile);
    setIsSyncing(false);

    await persistChanges(updatedProfile, jobs, updatedPlatforms, newLogs);
  };

  const highMatchJobsCount = jobs.filter((j) => j.matchScore >= 80).length;
  const totalApplications = jobs.filter((j) => j.applicationStage !== 'Wishlist').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="text-sm font-semibold text-slate-600">Loading JOJO Account Data...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        highMatchCount={highMatchJobsCount}
        totalApplications={totalApplications}
        lastSyncedAt={profile.lastSyncedAt}
        onSyncAll={handleSyncAll}
        isSyncing={isSyncing}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenMobileGuide={() => setIsMobileGuideOpen(true)}
      />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-12">
        {/* Guest / Logged Out Welcome Banner */}
        {!currentUser && (
          <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border border-indigo-800/60 animate-fade-in">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">You are viewing JOJO in Guest / Preview Mode</h3>
                <p className="text-xs text-indigo-200">
                  Log in or Create an Account to configure your career options, sync with LinkedIn &amp; Naukri, and unlock 80%+ match jobs.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
              <button
                onClick={() => handleOpenAuth('login')}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/15 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => handleOpenAuth('register')}
                className="flex items-center gap-1.5 px-4 py-2 bg-white text-indigo-950 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Free Account</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardOverviewView
            profile={profile}
            jobs={jobs}
            platforms={platforms}
            onNavigateTab={setActiveTab}
            onSyncAll={handleSyncAll}
            isSyncing={isSyncing}
            onOpenTailorForJob={(job) => setSelectedTailorJob(job)}
          />
        )}

        {activeTab === 'matches' && (
          <JobFeedView
            jobs={jobs}
            profile={profile}
            onUpdateJobStage={handleUpdateJobStage}
            onAddNewJob={handleAddNewJob}
            onOpenTailorForJob={(job) => setSelectedTailorJob(job)}
          />
        )}

        {activeTab === 'pipeline' && (
          <ApplicationTrackerView
            jobs={jobs}
            onUpdateJobStage={handleUpdateJobStage}
            onUpdateJobNotes={handleUpdateJobNotes}
            onOpenTailorForJob={(job) => setSelectedTailorJob(job)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            onSaveProfile={handleSaveProfile}
            onSyncTrigger={handleSyncAll}
            isSyncing={isSyncing}
          />
        )}

        {activeTab === 'sync' && (
          <SyncManagerView
            platforms={platforms}
            profile={profile}
            syncLogs={syncLogs}
            onTogglePlatform={handleTogglePlatform}
            onSyncAll={handleSyncAll}
            isSyncing={isSyncing}
          />
        )}
      </main>

      {/* Authentication Modal (Create Account / Login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* AI Tailor Modal */}
      {selectedTailorJob && (
        <AITailorModal
          job={selectedTailorJob}
          profile={profile}
          isOpen={Boolean(selectedTailorJob)}
          onClose={() => setSelectedTailorJob(null)}
          onSaveTailoredData={handleSaveTailoredData}
        />
      )}

      {/* Mobile & Phone Extension Guide Modal */}
      <MobileExtensionGuideModal
        isOpen={isMobileGuideOpen}
        onClose={() => setIsMobileGuideOpen(false)}
        userEmail={currentUser?.email}
      />
    </div>
  );
}
