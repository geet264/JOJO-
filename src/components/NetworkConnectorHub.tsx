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
  Activity,
  ExternalLink,
  Laptop,
  HelpCircle,
  X,
  Copy
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
  url: string;
  syncedFields: string[];
  color: string;
  badgeColor: string;
  borderColor: string;
  accentHex: string;
  howToConnect: string;
}

const PLATFORMS: PlatformNode[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    category: 'Global Network',
    url: 'https://www.linkedin.com/in/',
    syncedFields: ['Headline', 'Skills Matrix', 'Bio', 'Certifications'],
    color: 'from-blue-600 to-sky-700',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    borderColor: 'border-blue-200 hover:border-blue-400',
    accentHex: '#2563eb',
    howToConnect: 'Uses JOJO Chrome Companion extension to read your master skills and automatically inject tailored experience bullets & headline into your LinkedIn Profile & Easy Apply forms.',
  },
  {
    id: 'naukri',
    name: 'Naukri.com',
    icon: '🚀',
    category: 'India #1 Job Portal',
    url: 'https://www.naukri.com/mnjuser/profile',
    syncedFields: ['Resume Headline', 'Key Skills', 'Notice Period', 'Current CTC'],
    color: 'from-amber-600 to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    borderColor: 'border-amber-200 hover:border-amber-400',
    accentHex: '#d97706',
    howToConnect: 'Synchronizes your 30-day notice period, 14 LPA current CTC, and DevSecOps skills directly to your Naukri Candidate Dashboard via the companion background script.',
  },
  {
    id: 'indeed',
    name: 'Indeed India',
    icon: '🌐',
    category: 'Global Aggregator',
    url: 'https://in.indeed.com/',
    syncedFields: ['Structured CV', 'Role Titles', 'Experience Duration'],
    color: 'from-indigo-600 to-blue-700',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderColor: 'border-indigo-200 hover:border-indigo-400',
    accentHex: '#4f46e5',
    howToConnect: 'Exports your verified DevSecOps work history and certifications into Indeed Resume format for 1-click recruiter reachout.',
  },
  {
    id: 'instahyre',
    name: 'Instahyre',
    icon: '⚡',
    category: 'Tech Recruitment',
    url: 'https://www.instahyre.com/candidate/opportunities/',
    syncedFields: ['DevSecOps Stack', 'Notice Serving', 'Expected CTC'],
    color: 'from-emerald-600 to-teal-700',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
    accentHex: '#059669',
    howToConnect: 'Updates your active status and target 22-25 LPA CTC for top Indian tech product firms and unicorns.',
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    icon: '🏢',
    category: 'Salaries & Reviews',
    url: 'https://www.glassdoor.co.in/',
    syncedFields: ['Target Salary (22-25 LPA)', 'Location Preferences'],
    color: 'from-emerald-700 to-green-800',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
    accentHex: '#047857',
    howToConnect: 'Calibrates compensation ranges against verified DevSecOps engineer salary benchmarks.',
  },
  {
    id: 'foundit',
    name: 'Foundit (Monster)',
    icon: '🎯',
    category: 'Enterprise Hiring',
    url: 'https://www.foundit.in/',
    syncedFields: ['Certifications', 'Primary Skills', 'Work History'],
    color: 'from-purple-600 to-violet-700',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    borderColor: 'border-purple-200 hover:border-purple-400',
    accentHex: '#9333ea',
    howToConnect: 'Refreshes profile activity timestamp to push your resume to the top of recruiter searches.',
  },
  {
    id: 'wellfound',
    name: 'Wellfound (AngelList)',
    icon: '🦄',
    category: 'Startups & Scaleups',
    url: 'https://wellfound.com/jobs',
    syncedFields: ['Cloud Tech Stack', 'Remote Preference', 'Projects'],
    color: 'from-rose-600 to-pink-700',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    borderColor: 'border-rose-200 hover:border-rose-400',
    accentHex: '#e11d48',
    howToConnect: 'Matches your cloud security background directly with US and European remote startup founders.',
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse & Lever ATS',
    icon: '🤖',
    category: 'Company Career Portals',
    url: 'https://www.greenhouse.io/',
    syncedFields: ['1-Click Autofill Payload', 'ATS Resume Bullets'],
    color: 'from-teal-600 to-cyan-700',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    borderColor: 'border-teal-200 hover:border-teal-400',
    accentHex: '#0d9488',
    howToConnect: 'Autofills standard Greenhouse, Lever, and Workday application forms with your exact profile answers in 2 seconds.',
  },
];

export const NetworkConnectorHub: React.FC<NetworkConnectorHubProps> = ({
  profile,
  onSyncAll,
  isSyncing,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformNode | null>(null);
  const [showExtensionGuide, setShowExtensionGuide] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const leftBranches = PLATFORMS.slice(0, 4);
  const rightBranches = PLATFORMS.slice(4, 8);

  const handleCopyProfilePayload = () => {
    const payload = {
      fullName: profile.fullName,
      headline: `${profile.currentTitle} • 4 Yrs Exp • Kubernetes, AWS, SAST/DAST`,
      skills: profile.skills.map((s) => s.name),
      noticePeriod: profile.noticePeriod,
      currentCTC: profile.currentCTC,
      expectedCTC: profile.expectedCTC,
      summary: profile.summary,
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

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
            Click on any platform branch (LinkedIn, Naukri, etc.) to view its connection bridge or launch synchronization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowExtensionGuide(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-3 rounded-2xl border border-indigo-200/70 transition-all shadow-2xs"
          >
            <Laptop className="w-4 h-4 text-indigo-600" />
            <span>How Connections Work</span>
          </button>

          <button
            onClick={onSyncAll}
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
      </div>

      {/* Interactive Central Connector Diagram */}
      <div className="relative z-10 pt-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Satellite Platforms (4 apps) */}
          <div className="lg:col-span-4 space-y-4">
            {leftBranches.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedPlatform(app)}
                className={`group bg-slate-50/80 hover:bg-white p-4 rounded-2xl border ${app.borderColor} transition-all shadow-2xs hover:shadow-md relative overflow-hidden cursor-pointer`}
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
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                        <span>{app.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
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
                      onClick={onSyncAll}
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
                <span className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5">
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
                onClick={() => setSelectedPlatform(app)}
                className={`group bg-slate-50/80 hover:bg-white p-4 rounded-2xl border ${app.borderColor} transition-all shadow-2xs hover:shadow-md relative overflow-hidden cursor-pointer`}
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
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                        <span>{app.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
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

      {/* Platform Connection Modal */}
      {selectedPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-200">
                  {selectedPlatform.icon}
                </span>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {selectedPlatform.name} Connection Bridge
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active Channel ✓
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlatform(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">How JOJO connects:</span>
              <p className="text-slate-600 leading-relaxed">
                {selectedPlatform.howToConnect}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Synchronized Profile Fields:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPlatform.syncedFields.map((field) => (
                  <span
                    key={field}
                    className="text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70 px-2.5 py-1 rounded-xl"
                  >
                    ✓ {field}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={handleCopyProfilePayload}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-200 transition-all"
              >
                {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPayload ? 'Copied Profile Data!' : 'Copy Sync Payload'}</span>
              </button>

              <a
                href={selectedPlatform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <span>Open {selectedPlatform.name} Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Browser Extension How-It-Works Guide Modal */}
      {showExtensionGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    How Cross-Platform Sync Works in JOJO
                  </h3>
                  <p className="text-xs text-slate-500">
                    Industry standard used by Simplify.jobs &amp; Teal HQ
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowExtensionGuide(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/60 text-indigo-900">
                <span className="font-bold block mb-1">Why a Browser Companion is used:</span>
                Portals like LinkedIn and Naukri do not allow third-party servers to edit personal profiles without enterprise contracts. JOJO solves this using a lightweight **Chrome Companion Extension** that operates directly inside your authenticated browser session!
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <div>
                    <span className="font-bold text-slate-800">Your Master Profile in JOJO:</span>
                    <p className="text-slate-500">You maintain your 9 core skills, current CTC (14 LPA), target CTC (22-25 LPA), and 30-day notice period in JOJO.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <div>
                    <span className="font-bold text-slate-800">The JOJO Extension (`/extension` folder):</span>
                    <p className="text-slate-500">Connects to your local JOJO server. When you open Naukri or LinkedIn, it shows a floating <strong>JOJO Sync</strong> pill in the corner of your page.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <div>
                    <span className="font-bold text-slate-800">1-Click Auto-Fill &amp; Sync:</span>
                    <p className="text-slate-500">Clicking the pill instantly copies or fills your updated headline, skills list, and notice period into the portal form.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowExtensionGuide(false)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
