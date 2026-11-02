'use client';

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Building,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { AuthUser } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

const COMMON_ROLES = [
  'DevSecOps Engineer',
  'DevOps & Cloud Engineer',
  'Site Reliability Engineer (SRE)',
  'Full Stack Developer',
  'Backend Engineer (Java / Python / Go)',
  'Cloud Solutions Architect',
  'Data Engineer / AI Ops',
  'QA Automation Engineer',
];

const COMMON_SKILLS = [
  'DevSecOps',
  'Docker & Kubernetes',
  'AWS Cloud Security',
  'CI/CD Pipelines (GitHub Actions / Jenkins)',
  'Terraform (IaC)',
  'SonarQube & SAST/DAST',
  'Trivy / Container Scanning',
  'Python / Bash Scripting',
  'Linux Administration',
  'React / Next.js',
  'PostgreSQL / MongoDB',
  'Microservices Architecture'
];

const PLATFORMS_LIST = [
  { id: 'linkedin', label: 'LinkedIn Profile' },
  { id: 'naukri', label: 'Naukri.com' },
  { id: 'indeed', label: 'Indeed India' },
  { id: 'instahyre', label: 'Instahyre' },
  { id: 'wellfound', label: 'Wellfound (AngelList)' },
  { id: 'glassdoor', label: 'Glassdoor' },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2 Options
  const [role, setRole] = useState('DevSecOps Engineer');
  const [customRole, setCustomRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('3-5 Years (Mid-Senior)');
  const [noticePeriod, setNoticePeriod] = useState('30 Days');
  const [currentCTC, setCurrentCTC] = useState('14 LPA');
  const [expectedCTC, setExpectedCTC] = useState('24 LPA');
  const [preferredLocation, setPreferredLocation] = useState('Worldwide Remote');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'linkedin',
    'naukri',
    'indeed',
    'instahyre',
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'DevSecOps',
    'Docker & Kubernetes',
    'AWS Cloud Security',
    'CI/CD Pipelines (GitHub Actions / Jenkins)',
    'Terraform (IaC)',
  ]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleQuickDemoLogin = async () => {
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'geeta.jogi@altisec.com', password: 'password123' }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setErrorMsg(data.error || 'Quick login failed.');
      }
    } catch {
      setErrorMsg('Connection error with backend database. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Authentication failed. Please verify credentials.');
        return;
      }

      onLoginSuccess(data.user);
      onClose();
    } catch {
      setErrorMsg('Unable to connect to JOJO authentication database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !password) {
      setErrorMsg('Please fill in your name, email, and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role: customRole || role,
          experienceLevel,
          noticePeriod,
          currentCTC,
          expectedCTC,
          preferredLocation,
          targetPlatforms: selectedPlatforms,
          skills: selectedSkills,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to create account.');
        return;
      }

      onLoginSuccess(data.user);
      onClose();
    } catch {
      setErrorMsg('Error connecting to backend database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 p-6 sm:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-[11px] font-bold border border-indigo-400/30 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              JOJO Career OS
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
              Database Auth Active
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            {mode === 'login' ? 'Log In to Your JOJO Account' : 'Create Account & Save to Database'}
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-md">
            {mode === 'login'
              ? 'Enter your registered credentials to access your dashboard, sync engine, and 80%+ match jobs.'
              : 'Register your account to save your credentials to the backend database and configure your auto-sync.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-black/25 p-1 rounded-xl mt-5 w-fit border border-white/10">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-indigo-900 shadow-sm' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'register' ? 'bg-white text-indigo-900 shadow-sm' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. geeta.jogi@altisec.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                  Remember this device
                </label>
                <span className="text-[11px] text-slate-400">
                  Backend auth verification enabled
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials with Database...</span>
                  </>
                ) : (
                  <>
                    <span>Verify &amp; Log In to JOJO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-400 font-medium">or test with demo database account</span>
                </div>
              </div>

              {/* 1-Click Demo Login */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Test Login with Geeta Jogi Database Account (`password123`)</span>
              </button>
            </form>
          ) : (
            /* CREATE ACCOUNT FORM WITH OPTIONS */
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 1 ? 'bg-indigo-600 text-white' : 'bg-emerald-500 text-white'
                    }`}
                  >
                    1
                  </div>
                  <span className={`text-xs font-bold ${step === 1 ? 'text-slate-900' : 'text-slate-500'}`}>
                    Account Credentials
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    2
                  </div>
                  <span className={`text-xs font-bold ${step === 2 ? 'text-slate-900' : 'text-slate-500'}`}>
                    Career &amp; Sync Options
                  </span>
                </div>
              </div>

              {step === 1 && (
                /* STEP 1: CREDENTIALS */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Geeta Jogi"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address * (Used for login)</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. geeta.jogi@altisec.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Password * (Saved to backend database)</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 4 characters"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!fullName || !email || !password) {
                        setErrorMsg('Please fill in your name, email, and password to proceed.');
                        return;
                      }
                      if (password.length < 4) {
                        setErrorMsg('Password should be at least 4 characters long.');
                        return;
                      }
                      setErrorMsg('');
                      setStep(2);
                    }}
                    className="w-full mt-4 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Next: Set Career Profile &amp; Sync Options</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                /* STEP 2: RICH CAREER & SYNC OPTIONS */
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {/* Option 1: Target Role */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                      Target Role / Job Title
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {COMMON_ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Option 2: Experience & Notice Period */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        Experience Level
                      </label>
                      <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="0-2 Years (Junior / Entry)">0-2 Years (Junior / Entry)</option>
                        <option value="3-5 Years (Mid-Senior)">3-5 Years (Mid-Senior)</option>
                        <option value="5-8 Years (Senior)">5-8 Years (Senior)</option>
                        <option value="8+ Years (Lead / Staff)">8+ Years (Lead / Staff)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        Notice Period
                      </label>
                      <select
                        value={noticePeriod}
                        onChange={(e) => setNoticePeriod(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Immediate / Serving Notice">Immediate / Serving Notice</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                        <option value="90 Days">90 Days</option>
                      </select>
                    </div>
                  </div>

                  {/* Option 3: Salary / CTC Expectations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                        Current CTC
                      </label>
                      <input
                        type="text"
                        value={currentCTC}
                        onChange={(e) => setCurrentCTC(e.target.value)}
                        placeholder="e.g. 14 LPA"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        Expected CTC
                      </label>
                      <input
                        type="text"
                        value={expectedCTC}
                        onChange={(e) => setExpectedCTC(e.target.value)}
                        placeholder="e.g. 24 LPA ($100k Remote)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Option 4: Preferred Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-indigo-600" />
                      Preferred Location
                    </label>
                    <select
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Worldwide Remote">Worldwide Remote (USD Salaries)</option>
                      <option value="India (Bangalore, Pune, Hyderabad, Remote)">India (Bangalore, Pune, Hyderabad, Remote)</option>
                      <option value="United States">United States</option>
                      <option value="Europe / UK">Europe / UK</option>
                      <option value="Hybrid / Any">Hybrid / Any</option>
                    </select>
                  </div>

                  {/* Option 5: Target Platforms to Sync */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-indigo-600" />
                        Platforms to Auto-Sync
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">Select all that apply</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PLATFORMS_LIST.map((p) => {
                        const isChecked = selectedPlatforms.includes(p.id);
                        return (
                          <button
                            type="button"
                            key={p.id}
                            onClick={() => togglePlatform(p.id)}
                            className={`flex items-center gap-2 p-2 rounded-xl text-xs text-left border transition-all ${
                              isChecked
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-600 font-medium hover:bg-slate-100'
                            }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                                isChecked ? 'bg-indigo-600 text-white' : 'border border-slate-300'
                              }`}
                            >
                              {isChecked && '✓'}
                            </span>
                            <span className="truncate">{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Option 6: Primary Skills Tags */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        Select Your Core Skills (Used for 80%+ Match Engine)
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1.5 bg-slate-50 rounded-xl border border-slate-200">
                      {COMMON_SKILLS.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            type="button"
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving to Database...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Save Account to Database &amp; Launch</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
