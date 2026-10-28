'use client';

import React, { useState } from 'react';
import { UserProfile, UserSkill, WorkExperience, Education, Certification, SkillLevel } from '@/types';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Link2, 
  RefreshCw, 
  ExternalLink 
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => Promise<void>;
  onSyncTrigger: () => void;
  isSyncing: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile: initialData,
  onSaveProfile,
  onSyncTrigger,
  isSyncing,
}) => {
  const [profile, setProfile] = useState<UserProfile>(initialData);
  const [savedAlert, setSavedAlert] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Intermediate');
  const [newSkillCat, setNewSkillCat] = useState('Core');

  const handleTextChange = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinksChange = (field: keyof UserProfile['links'], value: string) => {
    setProfile((prev) => ({
      ...prev,
      links: { ...prev.links, [field]: value },
    }));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const exists = profile.skills.some(
      (s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase()
    );
    if (exists) return;

    const newSkill: UserSkill = {
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: newSkillCat,
    };

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillName: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.name !== skillName),
    }));
  };

  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp_${Date.now()}`,
      role: 'Role Title',
      company: 'Company Name',
      location: 'Location',
      startDate: '2024-01',
      endDate: '',
      isCurrent: true,
      description: 'Key deliverables, technologies used and impact...',
    };
    setProfile((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const handleUpdateExperience = (id: string, updates: Partial<WorkExperience>) => {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const handleSave = async () => {
    const updated = {
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    await onSaveProfile(updated);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3500);
  };

  return (
    <div className="space-y-8 w-full pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Master Single Source of Truth
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Centralized Career Profile
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-3xl leading-relaxed">
            Update your profile once in JOJO. When you save, changes immediately sync across your job feeds, recalculate all job match percentages, and update all 8 connected career portals.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-900/30 transition-all text-sm"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </button>
          <button
            onClick={() => {
              handleSave();
              onSyncTrigger();
            }}
            disabled={isSyncing}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-950/40 transition-all text-sm disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Save &amp; Sync Platforms
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 rounded-2xl flex items-center gap-3 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">
            Profile saved successfully! Job match scores have been recalculated and changes queued for sync.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Personal info & Preferences (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              Basic Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => handleTextChange('fullName', e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleTextChange('email', e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => handleTextChange('phone', e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Current Title</label>
              <input
                type="text"
                value={profile.currentTitle}
                onChange={(e) => handleTextChange('currentTitle', e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Location &amp; Work Mode</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleTextChange('location', e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Years of Total Experience</label>
              <input
                type="number"
                value={profile.yearsOfExperience}
                onChange={(e) => handleTextChange('yearsOfExperience', Number(e.target.value))}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Current CTC</label>
                <input
                  type="text"
                  value={profile.currentCTC}
                  onChange={(e) => handleTextChange('currentCTC', e.target.value)}
                  className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Expected CTC</label>
                <input
                  type="text"
                  value={profile.expectedCTC}
                  onChange={(e) => handleTextChange('expectedCTC', e.target.value)}
                  className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Notice Period</label>
              <input
                type="text"
                value={profile.noticePeriod}
                onChange={(e) => handleTextChange('noticePeriod', e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-indigo-600" />
              Connected Profiles
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={profile.links.linkedin || ''}
                onChange={(e) => handleLinksChange('linkedin', e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Naukri Profile URL</label>
              <input
                type="text"
                value={profile.links.naukri || ''}
                onChange={(e) => handleLinksChange('naukri', e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">GitHub / Portfolio URL</label>
              <input
                type="text"
                value={profile.links.github || ''}
                onChange={(e) => handleLinksChange('github', e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Right Columns: Skills, Experience, Bio (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Summary / Headline */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-800">
              Professional Summary &amp; Bio
            </h2>
            <textarea
              rows={3}
              value={profile.summary}
              onChange={(e) => handleTextChange('summary', e.target.value)}
              className="w-full text-sm text-slate-700 border border-slate-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              placeholder="Concise overview of your technical background, accomplishments, and value..."
            />
          </div>

          {/* Master Skills Matrix */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Skills Matrix ({profile.skills.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Used by JOJO's match engine to calculate the &gt;70% job match score.
                </p>
              </div>
            </div>

            {/* Add Skill form */}
            <form onSubmit={handleAddSkill} className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <input
                type="text"
                placeholder="Add skill (e.g. AWS, Kubernetes, Terraform)..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="flex-1 min-w-[200px] text-xs font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                className="text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Skill
              </button>
            </form>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-semibold shadow-2xs ${
                    skill.level === 'Expert'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : skill.level === 'Intermediate'
                      ? 'bg-slate-50 text-slate-700 border-slate-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-white/70 border border-slate-200/50">
                    {skill.level}
                  </span>
                  <button
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="text-slate-400 hover:text-red-500 ml-1"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Work Experience ({profile.experiences.length})
              </h2>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3.5 py-2 rounded-xl border border-indigo-200 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleUpdateExperience(exp.id, { role: e.target.value })}
                        className="text-sm font-bold text-slate-800 border border-slate-200 rounded-xl px-3 py-2 bg-white"
                        placeholder="Job Title / Role"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                        className="text-sm font-semibold text-indigo-600 border border-slate-200 rounded-xl px-3 py-2 bg-white"
                        placeholder="Company"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleUpdateExperience(exp.id, { startDate: e.target.value })}
                      className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white"
                      placeholder="Start (e.g. 2023-01)"
                    />
                    <input
                      type="text"
                      value={exp.isCurrent ? 'Present' : exp.endDate}
                      disabled={exp.isCurrent}
                      onChange={(e) => handleUpdateExperience(exp.id, { endDate: e.target.value })}
                      className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white disabled:opacity-60"
                      placeholder="End (e.g. 2024-05)"
                    />
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) => handleUpdateExperience(exp.id, { isCurrent: e.target.checked })}
                        className="rounded text-indigo-600"
                      />
                      Current Role
                    </label>
                  </div>

                  <textarea
                    rows={2}
                    value={exp.description}
                    onChange={(e) => handleUpdateExperience(exp.id, { description: e.target.value })}
                    className="w-full text-xs text-slate-600 border border-slate-200 rounded-xl p-3 bg-white"
                    placeholder="Description of accomplishments, technologies, and metrics..."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
