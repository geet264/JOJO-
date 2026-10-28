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
import { NetworkConnectorHub } from './NetworkConnectorHub';

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
      platformsTargeted: ['Naukri.com', 'LinkedIn', 'Indeed', 'Instahyre', 'Glassdoor', 'Foundit'],
    };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  return (
    <div className="space-y-8 w-full pb-16">
      {/* Visual Central Connector Hub */}
      <NetworkConnectorHub
        profile={profile}
        onSyncAll={onSyncAll}
        isSyncing={isSyncing}
      />

      {/* Sync Payload & Browser Companion Integration */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold">
              <Laptop className="w-4 h-4" />
              Direct Browser &amp; Extension Sync Engine
            </div>
            <h2 className="text-xl font-bold">Auto-Fill &amp; Universal Sync Payload</h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Because job portals like Naukri, LinkedIn, and Instahyre require authenticated sessions, JOJO synchronizes profiles via our background handler and companion extension payload.
            </p>
          </div>

          <button
            onClick={handleCopyPayload}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-3 rounded-xl border border-white/20 transition-all shadow-sm"
          >
            {copiedPayload ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPayload ? 'Copied Payload!' : 'Copy Sync JSON Payload'}</span>
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl p-5 font-mono text-xs text-indigo-200 border border-white/10 overflow-x-auto max-h-56">
          <pre>
{`{
  "profile": "${profile.fullName}",
  "currentRole": "${profile.currentTitle}",
  "totalSkills": ${profile.skills.length},
  "targets": ["Naukri.com", "LinkedIn Profile", "Indeed India", "Instahyre", "Foundit", "Glassdoor"],
  "status": "Ready for automated synchronization",
  "syncedAt": "${profile.updatedAt}"
}`}
          </pre>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-800">Recent Synchronization History</h2>
        <div className="divide-y divide-slate-100">
          {syncLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="font-bold text-slate-800">{log.platform}</span>
                <span className="text-slate-600">{log.message}</span>
              </div>
              <span className="text-slate-400 font-medium">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
