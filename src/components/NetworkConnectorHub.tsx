'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Layers, 
  ShieldCheck,
  Check,
  Activity
} from 'lucide-react';

interface NetworkConnectorHubProps {
  profile: UserProfile;
  onSyncAll: () => void;
  isSyncing: boolean;
}

interface PlatformNode {
  id: string;
  name: string;
  icon: string;
  category: string;
  syncedFields: string[];
  color: string;
  badgeColor: string;
  borderColor: string;
  accentHex: string;
}

const PLATFORMS: PlatformNode[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    category: 'Global Network',
    syncedFields: ['Headline', 'Skills Matrix', 'Bio', 'Certifications'],
    color: 'from-blue-600 to-sky-700',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    borderColor: 'border-blue-200 hover:border-blue-400',
    accentHex: '#2563eb',
  },
  {
    id: 'naukri',
    name: 'Naukri.com',
    icon: '🚀',
    category: 'India #1 Job Portal',
    syncedFields: ['Resume Headline', 'Key Skills', 'Notice Period', 'Current CTC'],
    color: 'from-amber-600 to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    borderColor: 'border-amber-200 hover:border-amber-400',
    accentHex: '#d97706',
  },
  {
    id: 'indeed',
    name: 'Indeed India',
    icon: '🌐',
    category: 'Global Aggregator',
    syncedFields: ['Structured CV', 'Role Titles', 'Experience Duration'],
    color: 'from-indigo-600 to-blue-700',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderColor: 'border-indigo-200 hover:border-indigo-400',
    accentHex: '#4f46e5',
  },
  {
    id: 'instahyre',
    name: 'Instahyre',
    icon: '⚡',
    category: 'Tech Recruitment',
    syncedFields: ['DevSecOps Stack', 'Notice Serving', 'Expected CTC'],
    color: 'from-emerald-600 to-teal-700',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
    accentHex: '#059669',
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    icon: '🏢',
    category: 'Salaries & Reviews',
    syncedFields: ['Target Salary (22-25 LPA)', 'Location Preferences'],
    color: 'from-emerald-700 to-green-800',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
    accentHex: '#047857',
  },
  {
    id: 'foundit',
    name: 'Foundit (Monster)',
    icon: '🎯',
    category: 'Enterprise Hiring',
    syncedFields: ['Certifications', 'Primary Skills', 'Work History'],
    color: 'from-purple-600 to-violet-700',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    borderColor: 'border-purple-200 hover:border-purple-400',
    accentHex: '#9333ea',
  },
  {
    id: 'wellfound',
    name: 'Wellfound (AngelList)',
    icon: '🦄',
    category: 'Startups & Scaleups',
    syncedFields: ['Cloud Tech Stack', 'Remote Preference', 'Projects'],
    color: 'from-rose-600 to-pink-700',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    borderColor: 'border-rose-200 hover:border-rose-400',
    accentHex: '#e11d48',
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse & Lever ATS',
    icon: '🤖',
    category: 'Company Career Portals',
    syncedFields: ['1-Click Autofill Payload', 'ATS Resume Bullets'],
    color: 'from-teal-600 to-cyan-700',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    borderColor: 'border-teal-200 hover:border-teal-400',
    accentHex: '#0d9488',
  },
];

export const NetworkConnectorHub: React.FC<NetworkConnectorHubProps> = ({
  profile,
  onSyncAll,
  isSyncing,
}) => {
  const [syncedRecently, setSyncedRecently] = useState(false);

  const handleTriggerSync = () => {
    onSyncAll();
    setSyncedRecently(true);
    setTimeout(() => setSyncedRecently(false), 4000);
  };

  const leftBranches = PLATFORMS.slice(0, 4);
  const rightBranches = PLATFORMS.slice(4, 8);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>Central Synchronization Nervous System</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Universal Platform Connector
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5">
            JOJO sits in the center as your master career core. When you make a profile change, it pulses out updates and synchronizes with all 8 connected career portals simultaneously.
          </p>
        </div>

        <button
          onClick={handleTriggerSync}
          disabled={isSyncing}
          className={`flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all ${
            isSyncing
              ? 'bg-indigo-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-200 hover:shadow-lg'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing All Branches...' : 'Sync & Refresh All Now'}</span>
        </button>
      </div>

      {/* Interactive Central Connector Diagram */}
      <div className="relative z-10 pt-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Satellite Platforms (4 apps) */}
          <div className="lg:col-span-4 space-y-4">
            {leftBranches.map((app) => (
              <div
                key={app.id}
                className={`group bg-slate-50/80 hover:bg-white p-4 rounded-2xl border ${app.borderColor} transition-all shadow-2xs hover:shadow-md relative overflow-hidden`}
              >
                {/* Connecting branch line indicator */}
                <div 
                  className={`hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-0.5 ${
                    isSyncing ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'
                  }`} 
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-white shadow-2xs border border-slate-100">
                      {app.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {app.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">{app.category}</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isSyncing
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {isSyncing ? (
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    ) : (
                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                    )}
                    <span>{isSyncing ? 'Syncing...' : 'Connected'}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-200/50">
                  {app.syncedFields.map((field) => (
                    <span key={field} className="text-[9px] font-semibold bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200/60">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Center: The Core JOJO Hub Node */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
            <div className="relative flex flex-col items-center text-center">
              
              {/* Outer Pulsing Aura */}
              <div className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center p-2 transition-all duration-700 ${
                isSyncing 
                  ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-spin' 
                  : 'bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 glow-jojo-center'
              }`}>
                {/* Inner Core Card */}
                <div className="w-full h-full rounded-full bg-slate-900 border-4 border-white/20 p-4 flex flex-col items-center justify-center text-white text-center shadow-inner relative overflow-hidden">
                  
                  {/* Subtle particle scan lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:12px_12px]" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-black text-lg text-white shadow-md mb-1">
                      J
                    </div>
                    <span className="font-extrabold text-sm sm:text-base tracking-tight">
                      JOJO CORE
                    </span>
                    <span className="text-[10px] font-semibold text-indigo-300">
                      Master Profile Engine
                    </span>

                    <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{profile.skills.length} Skills Active</span>
                    </div>

                    <button
                      onClick={handleTriggerSync}
                      disabled={isSyncing}
                      className="mt-3 flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-white/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Syncing...' : 'Sync Core'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Badge beneath the core */}
              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>8 Channels Active &amp; Synced</span>
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Last global synchronization: <span className="font-semibold text-slate-600">{profile.lastSyncedAt || 'Just now'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Satellite Platforms (4 apps) */}
          <div className="lg:col-span-4 space-y-4">
            {rightBranches.map((app) => (
              <div
                key={app.id}
                className={`group bg-slate-50/80 hover:bg-white p-4 rounded-2xl border ${app.borderColor} transition-all shadow-2xs hover:shadow-md relative overflow-hidden`}
              >
                {/* Connecting branch line indicator */}
                <div 
                  className={`hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-0.5 ${
                    isSyncing ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'
                  }`} 
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-white shadow-2xs border border-slate-100">
                      {app.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {app.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">{app.category}</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isSyncing
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {isSyncing ? (
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    ) : (
                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                    )}
                    <span>{isSyncing ? 'Syncing...' : 'Connected'}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-200/50">
                  {app.syncedFields.map((field) => (
                    <span key={field} className="text-[9px] font-semibold bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200/60">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
