'use client';

import React, { useState } from 'react';
import { JobPost, ApplicationStage, UserProfile, JobRegion } from '@/types';
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
  FileText,
  ShieldCheck,
  Globe,
  SlidersHorizontal,
  Flame
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
  // User's Core Filters: 80%+ Match, Worldwide / Regional Location
  const [matchThreshold, setMatchThreshold] = useState<'80+' | '70+' | 'all'>('80+');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Job form state
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPlatform, setNewPlatform] = useState<'LinkedIn' | 'Naukri' | 'Indeed' | 'Glassdoor' | 'Direct'>('LinkedIn');
  const [newLocation, setNewLocation] = useState('Remote Worldwide');
  const [newRegion, setNewRegion] = useState<JobRegion>('Worldwide Remote');
  const [newSalary, setNewSalary] = useState('$110,000 - $130,000 / yr');
  const [newExp, setNewExp] = useState('3-6 years');
  const [newSkillsStr, setNewSkillsStr] = useState('DevSecOps, AWS Cloud Security, Docker & Kubernetes, Terraform (IaC)');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Filter jobs based on 80%+ threshold and Location
  const filteredJobs = jobs.filter((job) => {
    // 1. Match Threshold filter (80+ vs 70+ vs All)
    if (matchThreshold === '80+' && job.matchScore < 80) {
      return false;
    }
    if (matchThreshold === '70+' && job.matchScore < 70) {
      return false;
    }

    // 2. Region / Location filter
    if (regionFilter !== 'All') {
      if (job.region !== regionFilter) {
        return false;
      }
    }

    // 3. Platform filter
    if (platformFilter !== 'All' && job.platform !== platformFilter) {
      return false;
    }

    // 4. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${job.title} ${job.company} ${job.location} ${job.region} ${job.requiredSkills.join(' ')}`.toLowerCase();
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
      region: newRegion,
      workplaceType: 'Remote',
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
      region: newRegion,
      workplaceType: 'Remote',
      salary: newSalary,
      experienceRequired: newExp,
      description: newDesc || 'Custom added job posting for tracking.',
      requiredSkills: skillsArray,
      postedDate: 'Just now',
      url: newUrl || '#',
      matchScore: match.matchScore,
      atsScore: match.atsScore,
      atsStatus: match.atsStatus,
      matchedSkills: match.matchedSkills,
      missingSkills: match.missingSkills,
      applicationStage: 'Wishlist',
    };

    onAddNewJob(created);
    setShowAddModal(false);
    setNewTitle('');
    setNewCompany('');
  };

  const highMatch80Count = jobs.filter((j) => j.matchScore >= 80).length;

  return (
    <div className="space-y-6 w-full pb-16">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Worldwide Job Aggregator &amp; ATS Scanner
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {jobs.length} Total Captured Roles
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consolidated listings across India, US, and Worldwide Remote with real-time ATS scoring &amp; &gt;80% profile matching.
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

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search title, skills, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            {/* Location / Region Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50/70 border border-slate-200 rounded-xl px-2.5 py-1">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="text-xs font-bold text-slate-700 bg-transparent py-1 focus:outline-none cursor-pointer"
              >
                <option value="All">🌍 All Locations Worldwide</option>
                <option value="India">🇮🇳 India (Bangalore / Pune / Gurgaon)</option>
                <option value="Worldwide Remote">🌐 Worldwide Remote ($ USD)</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="Europe">🇪🇺 Europe / UK</option>
              </select>
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

          {/* User's Core Request: 80%+ Match Toggle Bar */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setMatchThreshold('80+')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                matchThreshold === '80+'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>80%+ Top Match ({highMatch80Count})</span>
            </button>

            <button
              onClick={() => setMatchThreshold('70+')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                matchThreshold === '70+'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>70%+ Match</span>
            </button>

            <button
              onClick={() => setMatchThreshold('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                matchThreshold === 'all'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Grid (Responsive 4 columns on large screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredJobs.map((job) => {
          const isTopTier = job.matchScore >= 80;
          return (
            <div
              key={job.id}
              className={`bg-white rounded-3xl p-5 border flex flex-col justify-between shadow-xs transition-all hover:shadow-md ${
                isTopTier
                  ? 'border-emerald-200/90 ring-1 ring-emerald-500/10'
                  : job.matchScore >= 70
                  ? 'border-indigo-200/90'
                  : 'border-slate-200 opacity-80'
              }`}
            >
              {/* Card Header: Platform, Region Pill, Match Score */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        job.platform === 'LinkedIn'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : job.platform === 'Naukri'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {job.platform}
                    </span>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {job.region === 'India' ? '🇮🇳 India' : job.region === 'Worldwide Remote' ? '🌐 Remote' : '🇺🇸 ' + job.region}
                    </span>
                  </div>

                  {/* Match Score Badge */}
                  <div
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black shadow-2xs ${
                      job.matchScore >= 80
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : job.matchScore >= 70
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-300'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
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

                {/* ATS Scanner Pass Bar */}
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className={`w-4 h-4 ${job.atsScore >= 85 ? 'text-emerald-600' : 'text-indigo-600'}`} />
                    <span className="text-[11px] font-bold text-slate-800">
                      ATS Score: <span className="text-emerald-700">{job.atsScore}%</span>
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    job.atsScore >= 85
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}>
                    {job.atsStatus}
                  </span>
                </div>

                {/* Details Pills */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 pt-0.5">
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="line-clamp-1">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Banknote className="w-3 h-3 text-slate-400" />
                    <span className="font-semibold text-slate-800">{job.salary}</span>
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
                    <span>AI Tailor Resume &amp; ATS Bullets</span>
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
                  <span>Apply Post</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No jobs match your current filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching from &quot;80%+ Top Match&quot; to &quot;70%+ Match&quot; or changing your Location filter!
          </p>
        </div>
      )}

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Add New Job to Score &amp; Track</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cloud Security Architect"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cisco"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full text-xs border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Region / Location</label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value as any)}
                    className="w-full text-xs border rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="Worldwide Remote">Worldwide Remote</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Europe">Europe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Salary</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full text-xs border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Required Skills (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. DevSecOps, AWS, Kubernetes, Terraform"
                  value={newSkillsStr}
                  onChange={(e) => setNewSkillsStr(e.target.value)}
                  className="w-full text-xs border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Job URL / Link</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full text-xs border rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  Calculate ATS Match &amp; Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
