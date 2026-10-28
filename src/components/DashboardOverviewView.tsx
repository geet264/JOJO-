'use client';

import React from 'react';
import { UserProfile, JobPost, SyncPlatformState } from '@/types';
import { 
  TrendingUp, 
  Sparkles, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Banknote, 
  ArrowUpRight, 
  Layers, 
  Zap,
  Target,
  ChevronRight,
  ShieldAlert,
  Award,
  RefreshCw
} from 'lucide-react';
import { NetworkConnectorHub } from './NetworkConnectorHub';

interface DashboardOverviewViewProps {
  profile: UserProfile;
  jobs: JobPost[];
  platforms: SyncPlatformState[];
  onNavigateTab: (tab: 'matches' | 'pipeline' | 'profile' | 'sync') => void;
  onSyncAll: () => void;
  isSyncing: boolean;
  onOpenTailorForJob: (job: JobPost) => void;
}

export const DashboardOverviewView: React.FC<DashboardOverviewViewProps> = ({
  profile,
  jobs,
  platforms,
  onNavigateTab,
  onSyncAll,
  isSyncing,
  onOpenTailorForJob,
}) => {
  const highMatchJobs = jobs.filter((j) => j.matchScore >= 70);
  const activeApplications = jobs.filter((j) => j.applicationStage !== 'Wishlist');
  const interviewsCount = jobs.filter(
    (j) => j.applicationStage === 'Screening' || j.applicationStage === 'Technical' || j.applicationStage === 'Final Round'
  ).length;
  const offersCount = jobs.filter((j) => j.applicationStage === 'Offer').length;

  // Funnel calculations
  const totalCount = jobs.length;
  const appliedCount = jobs.filter((j) => j.applicationStage === 'Applied').length;
  const screeningCount = jobs.filter((j) => j.applicationStage === 'Screening').length;
  const techCount = jobs.filter((j) => j.applicationStage === 'Technical').length;

  // Skill demand aggregation
  const missingSkillFrequency: { [key: string]: number } = {};
  jobs.forEach((j) => {
    j.missingSkills.forEach((sk) => {
      missingSkillFrequency[sk] = (missingSkillFrequency[sk] || 0) + 1;
    });
  });

  const topMissingSkills = Object.entries(missingSkillFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Highest match job
  const topMatchJob = [...highMatchJobs].sort((a, b) => b.matchScore - a.matchScore)[0];

  return (
    <div className="space-y-8 w-full pb-16">
      {/* Hero Welcome & Quick Command Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Job Hunt Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {profile.fullName}! 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              You have <span className="text-white font-bold">{highMatchJobs.length} jobs</span> matching your DevSecOps profile by &gt;70%, with <span className="text-emerald-400 font-bold">{interviewsCount} active interview rounds</span> in progress across LinkedIn and Naukri.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('matches')}
              className="flex items-center gap-2 bg-white text-indigo-950 hover:bg-slate-100 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all"
            >
              <span>Explore 70%+ Matches</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSyncAll}
              disabled={isSyncing}
              className="flex items-center gap-2 bg-indigo-600/90 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl border border-indigo-400/30 backdrop-blur-xs transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync All Platforms'}</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => onNavigateTab('matches')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">High Match Feed</span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{highMatchJobs.length}</span>
            <span className="text-xs font-semibold text-emerald-600">&ge; 70% match</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Out of {jobs.length} aggregated postings</p>
        </div>

        <div 
          onClick={() => onNavigateTab('pipeline')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Interview Pipeline</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">{interviewsCount}</span>
            <span className="text-xs font-semibold text-amber-700">active rounds</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Zomato (HR) &amp; Swiggy (Tech)</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pipeline Compensation</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">₹26.5 LPA</span>
            <span className="text-xs font-bold text-emerald-600">+89% hike</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Current: {profile.currentCTC} • Target: {profile.expectedCTC}</p>
        </div>

        <div 
          onClick={() => onNavigateTab('profile')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Profile ATS Strength</span>
            <div className="w-10 h-10 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-violet-600">95%</span>
            <span className="text-xs font-semibold text-violet-700">Optimized</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{profile.skills.length} skills indexed &amp; ready to sync</p>
        </div>
      </div>

      {/* USER'S CORE REQUEST: Central Connector Diagram with all app branches! */}
      <NetworkConnectorHub
        profile={profile}
        onSyncAll={onSyncAll}
        isSyncing={isSyncing}
      />

      {/* Main Grid: Application Funnel + Top Match & Skill Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Funnel & Upcoming Agenda */}
        <div className="lg:col-span-2 space-y-6">
          {/* Conversion Funnel Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Application Velocity &amp; Conversion Funnel
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visual breakdown of where all your opportunities stand right now.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('pipeline')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Kanban View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Funnel Bars */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>1. Discovered / Wishlist</span>
                  <span className="font-bold text-slate-900">{jobs.filter(j => j.applicationStage === 'Wishlist').length} Roles</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-blue-800 mb-1">
                  <span>2. Applied</span>
                  <span className="font-bold">{appliedCount} Applied</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.max(15, (appliedCount / totalCount) * 100)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-purple-800 mb-1">
                  <span>3. HR Screening Call</span>
                  <span className="font-bold">{screeningCount} In Progress</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${Math.max(15, (screeningCount / totalCount) * 100)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-amber-800 mb-1">
                  <span>4. Technical &amp; System Design Round</span>
                  <span className="font-bold">{techCount} In Progress</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.max(15, (techCount / totalCount) * 100)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-emerald-800 mb-1">
                  <span>5. Final Round &amp; Offer</span>
                  <span className="font-bold">{offersCount} Offers</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: offersCount > 0 ? '30%' : '4%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Interview Schedule & Action Items */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Active Interview Milestones &amp; Action Items
            </h3>

            <div className="space-y-3">
              <div className="flex items-start justify-between p-4 rounded-2xl border border-purple-200 bg-purple-50/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      HR Screening Call
                    </span>
                    <span className="text-xs font-bold text-slate-900">Zomato</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Discussion on notice period (30 days) and expected compensation (22 LPA).
                  </p>
                  <p className="text-[11px] text-purple-700 font-medium">Scheduled: Thursday, 3:00 PM</p>
                </div>
                <button
                  onClick={() => onNavigateTab('pipeline')}
                  className="text-xs font-bold text-purple-700 hover:underline"
                >
                  View Details
                </button>
              </div>

              <div className="flex items-start justify-between p-4 rounded-2xl border border-amber-200 bg-amber-50/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      Technical Architecture Round
                    </span>
                    <span className="text-xs font-bold text-slate-900">Swiggy</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Round 1 cleared! System design &amp; container security policies review.
                  </p>
                  <p className="text-[11px] text-amber-700 font-medium">Prep: Kubernetes Falco runtime protection</p>
                </div>
                <button
                  onClick={() => onNavigateTab('pipeline')}
                  className="text-xs font-bold text-amber-700 hover:underline"
                >
                  View Notes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Top Opportunity Card & Market Skill Gap Advisor */}
        <div className="space-y-6">
          {/* Top Recommended Job Card */}
          {topMatchJob && (
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full text-indigo-200">
                  Top Profile Match
                </span>
                <span className="text-sm font-black text-emerald-400">
                  {topMatchJob.matchScore}% Match
                </span>
              </div>

              <div>
                <h4 className="font-bold text-base text-white">{topMatchJob.title}</h4>
                <p className="text-xs text-indigo-200 font-medium">{topMatchJob.company} • {topMatchJob.location}</p>
                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {topMatchJob.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">{topMatchJob.salary}</span>
                <button
                  onClick={() => onOpenTailorForJob(topMatchJob)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI Tailor Resume</span>
                </button>
              </div>
            </div>
          )}

          {/* Market Skill Gap Advisor (like Jobscan / Teal) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Skill Gap Advisor</h3>
              </div>
              <p className="text-xs text-slate-500">
                Skills most frequently requested in your target roles that are currently not in your profile:
              </p>
            </div>

            <div className="space-y-2.5">
              {topMissingSkills.map(([skill, count]) => (
                <div
                  key={skill}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold text-slate-800">{skill}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    in <span className="text-indigo-600 font-bold">{count}</span> job posts
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('profile')}
              className="w-full text-center text-xs font-bold text-indigo-600 hover:text-indigo-800 py-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200/60 transition-all"
            >
              + Add Skills to Boost Matches
            </button>
          </div>

          {/* Sync Status Mini Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Naukri &amp; LinkedIn Connected</span>
              </div>
              <p className="text-[11px] text-slate-500">Changes sync automatically</p>
            </div>
            <button
              onClick={() => onNavigateTab('sync')}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
