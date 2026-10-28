'use client';

import React, { useState } from 'react';
import { SyncPlatformState, UserProfile } from '@/types';
import { 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  Laptop,
  Check
} from 'lucide-react';

interface SyncManagerViewProps {
  platforms: SyncPlatformState[];
  profile: UserProfile;
  syncLogs: Array<{ id: string; timestamp: string; platform: string; message: string }>;
  onSyncAll: () => void;
  isSyncing: boolean;
}

export const SyncManagerView: React.FC<SyncManagerViewProps> = ({
  platforms,
  profile,
  syncLogs,
  onSyncAll,
  isSyncing,
}) => {
  const [copiedPayload, setCopiedPayload] = useState(false);

  const handleCopyPayload = () => {
    const payload = {
      profileSnapshot: {
        fullName: profile.fullName,
        currentTitle: profile.currentTitle,
        targetTitles: profile.targetTitles,
        summary: profile.summary,
        totalExperience: profile.yearsOfExperience,
        skills: profile.skills.map((s) => s.name),
        experiences: profile.experiences,
      },
      syncTimestamp: new Date().toISOString(),
      platformsTargeted: ['Naukri.com', 'LinkedIn', 'Indeed'],
    };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Cross-Platform Sync Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            When you update your skills or experience in Jojo, this engine pushes the updates to your connected Naukri, LinkedIn, and Indeed profiles.
          </p>
        </div>

        <button
          onClick={onSyncAll}
          disabled={isSyncing}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-indigo-100 transition-all disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Profiles...' : 'Trigger Instant Sync'}</span>
        </button>
      </div>

      {/* Connected Platforms Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-3xl">{p.logo}</div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {p.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-800">{p.name}</h3>
                <p className="text-xs text-slate-500">{p.accountEmail || 'Connected via Browser Session'}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1.5 border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500">Auto-Synced Fields:</div>
                <div className="flex flex-wrap gap-1 text-[10px] text-slate-700 font-medium">
                  <span className="bg-white px-2 py-0.5 rounded border">Headline</span>
                  <span className="bg-white px-2 py-0.5 rounded border">Key Skills ({profile.skills.length})</span>
                  <span className="bg-white px-2 py-0.5 rounded border">Work Experience</span>
                  <span className="bg-white px-2 py-0.5 rounded border">Notice Period</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Last synced:</span>
              <span className="font-semibold text-slate-700">{p.lastSyncedAt || 'Just now'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sync Payload & Browser Companion Integration */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold">
              <Laptop className="w-4 h-4" />
              Direct Browser &amp; Extension Sync Engine
            </div>
            <h2 className="text-lg font-bold">Auto-Fill &amp; Platform Sync Payload</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Because job portals like Naukri and LinkedIn require authenticated sessions, Jojo syncs profiles via our automated background handler and browser companion payload.
            </p>
          </div>

          <button
            onClick={handleCopyPayload}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all"
          >
            {copiedPayload ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPayload ? 'Copied Payload!' : 'Copy Sync JSON Payload'}</span>
          </button>
        </div>

        <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-indigo-200 border border-white/10 overflow-x-auto max-h-48">
          <pre>
{`{
  "profile": "${profile.fullName}",
  "title": "${profile.currentTitle}",
  "totalSkills": ${profile.skills.length},
  "targets": ["Naukri Profile", "LinkedIn Headline & Skills", "Indeed Resume"],
  "status": "Ready for automated synchronization",
  "updatedAt": "${profile.updatedAt}"
}`}
          </pre>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-800">Recent Synchronization History</h2>
        <div className="divide-y divide-slate-100">
          {syncLogs.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="font-bold text-slate-700">{log.platform}</span>
                <span className="text-slate-500">{log.message}</span>
              </div>
              <span className="text-slate-400 font-medium">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
