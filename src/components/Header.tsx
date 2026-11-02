'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Kanban, 
  UserCheck, 
  RefreshCw,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  User as UserIcon,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { AuthUser } from '@/types';

interface HeaderProps {
  activeTab: 'dashboard' | 'matches' | 'pipeline' | 'profile' | 'sync';
  setActiveTab: (tab: 'dashboard' | 'matches' | 'pipeline' | 'profile' | 'sync') => void;
  highMatchCount: number;
  totalApplications: number;
  lastSyncedAt?: string;
  onSyncAll: () => void;
  isSyncing: boolean;
  currentUser: AuthUser | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  onOpenMobileGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  highMatchCount,
  totalApplications,
  lastSyncedAt,
  onSyncAll,
  isSyncing,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenMobileGuide,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12">
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

            {/* Desktop Navigation Tabs (Hidden on Mobile) */}
            <nav className="hidden md:flex items-center space-x-1 sm:space-x-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/60">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  activeTab === 'profile'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('sync')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  activeTab === 'sync'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-500 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync Hub</span>
              </button>
            </nav>

            {/* Top Quick Actions + Mobile Help + Auth State */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Phone & Extension Helper Button */}
              <button
                onClick={onOpenMobileGuide}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200/70 transition-all shadow-2xs"
                title="How to run JOJO and extension on mobile phone"
              >
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Phone &amp; Extension</span>
                <span className="sm:hidden">Phone</span>
              </button>

              {/* Sync All button */}
              <button
                onClick={onSyncAll}
                disabled={isSyncing}
                className="hidden lg:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync All'}</span>
              </button>

              {/* AUTH STATE: Logged In vs Logged Out */}
              {currentUser ? (
                /* User Menu Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-100 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {getInitials(currentUser.fullName)}
                    </div>
                    <div className="hidden sm:block leading-tight">
                      <p className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                        {currentUser.fullName}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fade-in">
                      {/* User header */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <span className="mt-1.5 inline-block px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                          {currentUser.role}
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setActiveTab('profile');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                          My Profile &amp; CTC Settings
                        </button>

                        <button
                          onClick={() => {
                            onOpenMobileGuide();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                        >
                          <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                          Run on Phone / Mobile Guide
                        </button>

                        <button
                          onClick={() => {
                            onOpenAuth('register');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                        >
                          <UserPlus className="w-3.5 h-3.5 text-indigo-500" />
                          Create Another Account
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            onLogout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          Log Out of JOJO
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Logged Out: Sign In & Create Account Buttons */
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Log In</span>
                  </button>

                  <button
                    onClick={() => onOpenAuth('register')}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold px-3.5 sm:px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom on phones) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-xl px-2 py-1.5 flex items-center justify-around safe-bottom">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'dashboard' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('matches')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl relative transition-all ${
            activeTab === 'matches' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-amber-500" />
          <span className="text-[10px]">Matches</span>
          {highMatchCount > 0 && (
            <span className="absolute top-0.5 right-1.5 w-4 h-4 bg-emerald-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
              {highMatchCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl relative transition-all ${
            activeTab === 'pipeline' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <Kanban className="w-5 h-5 mb-0.5 text-indigo-500" />
          <span className="text-[10px]">Pipeline</span>
          <span className="absolute top-0.5 right-1.5 w-4 h-4 bg-slate-900 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
            {totalApplications}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'profile' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <UserCheck className="w-5 h-5 mb-0.5 text-emerald-500" />
          <span className="text-[10px]">Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('sync')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'sync' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <RefreshCw className={`w-5 h-5 mb-0.5 text-blue-500 ${isSyncing ? 'animate-spin' : ''}`} />
          <span className="text-[10px]">Sync Hub</span>
        </button>
      </nav>
    </>
  );
};
