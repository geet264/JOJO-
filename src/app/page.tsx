'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { DashboardOverviewView } from '@/components/DashboardOverviewView';
import { JobFeedView } from '@/components/JobFeedView';
import { ApplicationTrackerView } from '@/components/ApplicationTrackerView';
import { ProfileView } from '@/components/ProfileView';
import { SyncManagerView } from '@/components/SyncManagerView';
import { AITailorModal } from '@/components/AITailorModal';
import { UserProfile, JobPost, SyncPlatformState, ApplicationStage } from '@/types';
import { initialProfile, initialJobs, initialPlatforms } from '@/lib/initialData';
import { enrichJobsWithMatchScores } from '@/lib/matchEngine';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'matches' | 'pipeline' | 'profile' | 'sync'>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [jobs, setJobs] = useState<JobPost[]>(() => enrichJobsWithMatchScores(initialProfile, initialJobs));
  const [platforms, setPlatforms] = useState<SyncPlatformState[]>(initialPlatforms);
  const [syncLogs, setSyncLogs] = useState<Array<{ id: string; timestamp: string; platform: string; message: string }>>([
    {
      id: 'log_1',
      timestamp: 'Today, 2:30 PM',
      platform: 'Naukri',
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

  // AI Tailor Modal state
  const [selectedTailorJob, setSelectedTailorJob] = useState<JobPost | null>(null);

  // Fetch persisted data from disk on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/data');
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
        console.error('Failed to load local database:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Save changes to backend disk database
  const persistChanges = async (
    updatedProfile: UserProfile,
    updatedJobs: JobPost[],
    updatedPlatforms?: SyncPlatformState[],
    updatedLogs?: any[]
  ) => {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: updatedProfile,
          jobs: updatedJobs,
          platforms: updatedPlatforms || platforms,
          syncLogs: updatedLogs || syncLogs,
        }),
      });
    } catch (err) {
      console.error('Error persisting data:', err);
    }
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

  // Trigger sync to all platforms
  const handleSyncAll = async () => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLogs = [
      {
        id: `log_${Date.now()}_1`,
        timestamp: `Today, ${nowStr}`,
        platform: 'Naukri.com',
        message: `Synced ${profile.skills.length} skills & updated experience`,
      },
      {
        id: `log_${Date.now()}_2`,
        timestamp: `Today, ${nowStr}`,
        platform: 'LinkedIn',
        message: 'Headline & profile summary synchronized',
      },
      ...syncLogs,
    ];

    const updatedPlatforms = platforms.map((p) => ({
      ...p,
      status: 'Connected' as const,
      lastSyncedAt: 'Just now',
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

  const highMatchJobsCount = jobs.filter((j) => j.matchScore >= 70).length;
  const totalApplications = jobs.filter((j) => j.applicationStage !== 'Wishlist').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="text-sm font-semibold text-slate-600">Loading JOJO Hub...</span>
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
      />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-12">
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
            onSyncAll={handleSyncAll}
            isSyncing={isSyncing}
          />
        )}
      </main>

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
    </div>
  );
}
