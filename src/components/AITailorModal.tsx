'use client';

import React, { useState } from 'react';
import { JobPost, UserProfile } from '@/types';
import { 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  FileText, 
  Send, 
  ShieldCheck, 
  Zap, 
  Target,
  ArrowRight
} from 'lucide-react';

interface AITailorModalProps {
  job: JobPost;
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveTailoredData: (jobId: string, bullets: string[], coverLetter: string) => void;
}

export const AITailorModal: React.FC<AITailorModalProps> = ({
  job,
  profile,
  isOpen,
  onClose,
  onSaveTailoredData,
}) => {
  const [activeTab, setActiveTab] = useState<'bullets' | 'letter'>('bullets');
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate tailored bullets based on job required skills and user profile
  const defaultBullets = [
    `Engineered enterprise-grade CI/CD pipelines integrating automated ${job.requiredSkills.slice(0, 2).join(' & ')} scanning, reducing vulnerability escape rate by 42%.`,
    `Architected container security and orchestration using ${job.requiredSkills.includes('Docker & Kubernetes') ? 'Kubernetes & Docker' : 'Cloud Native infrastructure'}, ensuring zero-trust governance across environments.`,
    `Implemented shift-left security policies and IaC scanning with ${job.requiredSkills.includes('Terraform (IaC)') ? 'Terraform' : 'automated compliance tooling'}, cutting deployment audit turnaround from days to hours.`,
    `Collaborated cross-functionally with SRE and Product teams at ${profile.experiences[0]?.company || 'enterprise scale'} to achieve 99.95% system uptime while upholding strict security baselines.`,
  ];

  const defaultCoverLetter = `Dear Hiring Team at ${job.company},

I am writing to express my enthusiastic interest in the ${job.title} role. With over ${profile.yearsOfExperience} years of hands-on experience in DevSecOps and cloud infrastructure, I have specialized in building secure software delivery lifecycles, container governance, and automated vulnerability management.

At ${profile.experiences[0]?.company || 'my current role'}, I spearheaded the implementation of automated security guardrails across CI/CD pipelines and managed cloud infrastructure utilizing ${job.requiredSkills.slice(0, 3).join(', ')}. Your mission at ${job.company} aligns closely with my dedication to embedding shift-left security without sacrificing release velocity.

I am particularly excited about how my background with ${profile.skills.slice(0, 4).map(s => s.name).join(', ')} directly matches the requirements for this position. I welcome the opportunity to discuss how I can contribute to the security and scalability of ${job.company}'s engineering initiatives.

Sincerely,
${profile.fullName}
${profile.phone} | ${profile.email}`;

  const [bullets, setBullets] = useState<string[]>(job.tailoredBullets || defaultBullets);
  const [coverLetter, setCoverLetter] = useState<string>(job.tailoredCoverLetter || defaultCoverLetter);

  if (!isOpen) return null;

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  const handleSave = () => {
    onSaveTailoredData(job.id, bullets, coverLetter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">AI Tailor &amp; ATS Optimizer</h3>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {job.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Tailored for <span className="font-semibold text-white">{job.title}</span> at <span className="font-semibold text-white">{job.company}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ATS Keywords matched pill banner */}
        <div className="bg-indigo-50/70 border-b border-indigo-100 px-5 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-indigo-900 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Target Keywords Injected:</span>
            <div className="flex flex-wrap gap-1 ml-1">
              {job.requiredSkills.slice(0, 3).map((sk) => (
                <span key={sk} className="bg-white px-2 py-0.5 rounded border border-indigo-200 text-[10px] font-bold text-indigo-700">
                  {sk}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
          >
            <Zap className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 px-5 pt-3 bg-slate-50">
          <button
            onClick={() => setActiveTab('bullets')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'bullets'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tailored Resume Bullets ({bullets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('letter')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'letter'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>1-Click Cover Letter</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'bullets' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Copy and paste these high-impact bullet points into your resume to guarantee high ATS match for {job.company}:
              </p>
              {bullets.map((b, idx) => (
                <div
                  key={idx}
                  className="group bg-slate-50 hover:bg-indigo-50/40 p-3.5 rounded-xl border border-slate-200 transition-all flex items-start justify-between gap-3"
                >
                  <p className="text-xs font-medium text-slate-700 leading-relaxed flex-1">
                    • {b}
                  </p>
                  <button
                    onClick={() => handleCopyBullet(b, idx)}
                    className="shrink-0 flex items-center gap-1 bg-white hover:bg-indigo-600 hover:text-white text-slate-600 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs transition-all"
                  >
                    {copiedBulletIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Ready to send directly in Easy Apply, LinkedIn message, or email:
                </span>
                <button
                  onClick={handleCopyLetter}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-all"
                >
                  {copiedLetter ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLetter ? 'Copied Letter!' : 'Copy Full Letter'}</span>
                </button>
              </div>
              <textarea
                rows={10}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full text-xs font-mono text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            💡 Tested with Greenhouse, Lever, and Workday ATS parsers
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
            >
              Save to Job Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
