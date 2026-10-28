'use client';

import React, { useState } from 'react';
import { JobPost, ApplicationStage, UserProfile } from '@/types';
import { 
  Sparkles, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Building, 
  MapPin, 
  Banknote, 
  Calendar,
  Layers,
  Plus,
  ArrowUpRight,
  FileText
} from 'lucide-react';
import { calculateJobMatch } from '@/lib/matchEngine';

interface JobFeedViewProps {
  jobs: JobPost[];
  profile: UserProfile;
  onUpdateJobStage: (jobId: string, stage: ApplicationStage) => void;
  onAddNewJob: (job: JobPost) => void;
  onOpenTailorForJob: (job: JobPost) => void;
}

export const JobFeedView: React.FC<JobFeedViewProps> = ({
  jobs,
  profile,
  onUpdateJobStage,
  onAddNewJob,
  onOpenTailorForJob,
}) => {
  const [onlyHighMatch, setOnlyHighMatch] = useState<boolean>(true);
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Job form state
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPlatform, setNewPlatform] = useState<'LinkedIn' | 'Naukri' | 'Indeed' | 'Glassdoor' | 'Direct'>('LinkedIn');
  const [newLocation, setNewLocation] = useState('Bangalore (Hybrid)');
  const [newSalary, setNewSalary] = useState('₹24 - ₹30 LPA');
  const [newExp, setNewExp] = useState('3-6 years');
  const [newSkillsStr, setNewSkillsStr] = useState('DevSecOps, AWS Cloud Security, Docker & Kubernetes');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    if (onlyHighMatch && job.matchScore < 70) {
      return false;
    }
    if (platformFilter !== 'All' && job.platform !== platformFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${job.title} ${job.company} ${job.location} ${job.requiredSkills.join(' ')}`.toLowerCase();
      return matchText.includes(q);
    }
    return true;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const skillsArray = newSkillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const match = calculateJobMatch(profile, {
      id: '',
      title: newTitle,
      company: newCompany,
      platform: newPlatform,
      location: newLocation,
      workplaceType: 'Hybrid',
      salary: newSalary,
      experienceRequired: newExp,
      description: newDesc,
      requiredSkills: skillsArray,
      postedDate: 'Just now',
      url: newUrl || '#',
      applicationStage: 'Wishlist',
    });

    const created: JobPost = {
      id: `job_${Date.now()}`,
      title: newTitle,
      company: newCompany,
      platform: newPlatform,
      location: newLocation,
      workplaceType: 'Hybrid',
      salary: newSalary,
      experienceRequired: newExp,
      description: newDesc || 'Custom added job posting for tracking.',
      requiredSkills: skillsArray,
      postedDate: 'Just now',
      url: newUrl || '#',
      matchScore: match.matchScore,
      matchedSkills: match.matchedSkills,
      missingSkills: match.missingSkills,
      applicationStage: 'Wishlist',
    };

    onAddNewJob(created);
    setShowAddModal(false);
    setNewTitle('');
    setNewCompany('');
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Aggregated Job Feed
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {jobs.length} Total Jobs
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Consolidated listings from LinkedIn, Naukri, and Indeed with AI match scoring against your profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Job to Analyze
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, skill, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            {/* Platform Dropdown */}
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50"
            >
              <option value="All">All Platforms</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Naukri">Naukri.com</option>
              <option value="Indeed">Indeed</option>
              <option value="Glassdoor">Glassdoor</option>
            </select>
          </div>

          {/* User's Core Rule: Match > 70% Toggle */}
          <div className="flex items-center gap-3 bg-indigo-50/80 border border-indigo-200/80 px-4 py-2 rounded-xl">
            <input
              type="checkbox"
              id="matchToggle"
              checked={onlyHighMatch}
              onChange={(e) => setOnlyHighMatch(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="matchToggle" className="text-xs font-bold text-indigo-900 cursor-pointer flex items-center gap-1.5 select-none">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Show Only High Match (&gt;70% Match)
            </label>
          </div>
        </div>
      </div>

      {/* Jobs Grid (Responsive 4 columns on large screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredJobs.map((job) => {
          const isHighMatch = job.matchScore >= 70;
          return (
            <div
              key={job.id}
              className={`bg-white rounded-3xl p-5 border flex flex-col justify-between shadow-xs transition-all hover:shadow-md ${
                isHighMatch
                  ? 'border-indigo-200/90 ring-1 ring-indigo-500/10'
                  : 'border-slate-200 opacity-80'
              }`}
            >
              {/* Card Header: Platform, Match Pill */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      job.platform === 'LinkedIn'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : job.platform === 'Naukri'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {job.platform}
                  </span>

                  {/* Match Score Badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${
                      job.matchScore >= 85
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : job.matchScore >= 70
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{job.matchScore}% Match</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 line-clamp-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.company}</span>
                  </div>
                </div>

                {/* Details Pills */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 pt-1">
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Banknote className="w-3 h-3 text-slate-400" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 pt-1 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills Overlap Analysis */}
                <div className="pt-2 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                    <span>Matched Skills ({job.matchedSkills.length})</span>
                    {job.missingSkills.length > 0 && (
                      <span className="text-amber-600 font-normal">
                        {job.missingSkills.length} missing
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {job.matchedSkills.slice(0, 4).map((sk) => (
                      <span
                        key={sk}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-md"
                      >
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                        {sk}
                      </span>
                    ))}
                    {job.missingSkills.slice(0, 2).map((sk) => (
                      <span
                        key={sk}
                        className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-md"
                      >
                        <XCircle className="w-2.5 h-2.5 text-slate-400" />
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Tailor Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenTailorForJob(job)}
                    className="w-full flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs py-2 rounded-xl border border-indigo-200 transition-all shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI Tailor Resume &amp; Bullets</span>
                  </button>
                </div>
              </div>

              {/* Card Footer: Stage Selector & Apply Link */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Stage:
                  </span>
                  <select
                    value={job.applicationStage}
                    onChange={(e) =>
                      onUpdateJobStage(job.id, e.target.value as ApplicationStage)
                    }
                    className={`text-xs font-bold border rounded-lg px-2 py-1 transition-all ${
                      job.applicationStage === 'Applied'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : job.applicationStage === 'Screening'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : job.applicationStage === 'Technical'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : job.applicationStage === 'Offer'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <option value="Wishlist">Wishlist</option>
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Technical">Technical</option>
                    <option value="Final Round">Final Round</option>
                    <option value="Offer">Offer 🎉</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  <span>Post</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
