'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Kanban, 
  UserCheck, 
  RefreshCw,
  Bell
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'matches' | 'pipeline' | 'profile' | 'sync';
  setActiveTab: (tab: 'dashboard' | 'matches' | 'pipeline' | 'profile' | 'sync') => void;
  highMatchCount: number;
  totalApplications: number;
  lastSyncedAt?: string;
  onSyncAll: () => void;
  isSyncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  highMatchCount,
  totalApplications,
  lastSyncedAt,
  onSyncAll,
  isSyncing,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              J
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
                  JOJO
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-full">
                  Career OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                All-in-One Job Finding &amp; Multi-Platform Sync
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-600" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'matches'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Job Matches</span>
              {highMatchCount > 0 && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {highMatchCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <Kanban className="w-4 h-4 text-indigo-500" />
              <span>Applications</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {totalApplications}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-500" />
              <span className="hidden md:inline">My Profile</span>
              <span className="md:hidden">Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('sync')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'sync'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-500 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Hub</span>
            </button>
          </nav>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onSyncAll}
              disabled={isSyncing}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{isSyncing ? 'Syncing...' : 'Sync All Platforms'}</span>
              <span className="md:hidden">Sync</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
