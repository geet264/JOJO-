'use client';

import React, { useState } from 'react';
import { JobPost, ApplicationStage } from '@/types';
import { 
  Kanban, 
  Building, 
  Calendar, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  CheckCircle2,
  Clock,
  Award,
  User,
  Plus
} from 'lucide-react';

interface ApplicationTrackerViewProps {
  jobs: JobPost[];
  onUpdateJobStage: (jobId: string, stage: ApplicationStage) => void;
  onUpdateJobNotes: (jobId: string, notes: string) => void;
  onOpenTailorForJob: (job: JobPost) => void;
}

const STAGES: { key: ApplicationStage; title: string; color: string; badgeColor: string }[] = [
  { key: 'Wishlist', title: 'Wishlist / Saved', color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-700' },
  { key: 'Applied', title: 'Applied', color: 'border-blue-400', badgeColor: 'bg-blue-50 text-blue-700' },
  { key: 'Screening', title: 'HR Screening', color: 'border-purple-400', badgeColor: 'bg-purple-50 text-purple-700' },
  { key: 'Technical', title: 'Tech Interview', color: 'border-amber-400', badgeColor: 'bg-amber-50 text-amber-700' },
  { key: 'Final Round', title: 'Final Round', color: 'border-indigo-400', badgeColor: 'bg-indigo-50 text-indigo-700' },
  { key: 'Offer', title: 'Offer Received 🎉', color: 'border-emerald-500', badgeColor: 'bg-emerald-50 text-emerald-800 font-bold' },
];

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  jobs,
  onUpdateJobStage,
  onUpdateJobNotes,
  onOpenTailorForJob,
}) => {
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  const appliedCount = jobs.filter((j) => j.applicationStage !== 'Wishlist').length;
  const interviewingCount = jobs.filter(
    (j) => j.applicationStage === 'Screening' || j.applicationStage === 'Technical' || j.applicationStage === 'Final Round'
  ).length;
  const offersCount = jobs.filter((j) => j.applicationStage === 'Offer').length;

  const handleStartEditNotes = (job: JobPost) => {
    setEditingNotesId(job.id);
    setTempNotes(job.notes || '');
  };

  const handleSaveNotes = (jobId: string) => {
    onUpdateJobNotes(jobId, tempNotes);
    setEditingNotesId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Active Applications</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{appliedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">In Interview Pipeline</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{interviewingCount}</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Kanban className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Offers Extended</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{offersCount}</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">High Match Jobs (&gt;70%)</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">
              {jobs.filter((j) => j.matchScore >= 70).length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1250px]">
          {STAGES.map((col) => {
            const columnJobs = jobs.filter((j) => j.applicationStage === col.key);
            return (
              <div
                key={col.key}
                className="flex-1 bg-slate-100/80 rounded-3xl p-4 border border-slate-200/80 flex flex-col min-w-[280px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{col.title}</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                    {columnJobs.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1">
                  {columnJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400">
                              {job.platform}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] font-semibold text-emerald-600">
                              {job.matchScore}% Match
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 mt-0.5 leading-snug">
                            {job.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>{job.company}</span>
                      </div>

                      {/* Notes / Interview date info */}
                      <div className="bg-slate-50 rounded-xl p-2.5 text-[11px] border border-slate-100">
                        {editingNotesId === job.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              placeholder="Add interview notes, recruiter contacts..."
                              className="w-full text-[11px] border rounded p-1 bg-white"
                            />
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="text-[10px] px-2 py-0.5 text-slate-500"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNotes(job.id)}
                                className="text-[10px] px-2 py-0.5 bg-indigo-600 text-white font-semibold rounded"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleStartEditNotes(job)}
                            className="cursor-pointer group flex items-start justify-between text-slate-600"
                          >
                            <span className="italic line-clamp-2">
                              {job.notes || '+ Add interview notes / date'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* AI Tailor Shortcut button */}
                      <button
                        onClick={() => onOpenTailorForJob(job)}
                        className="w-full flex items-center justify-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50/70 hover:bg-indigo-100 py-1.5 rounded-lg border border-indigo-200/60 transition-all"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Tailored Resume &amp; Bullets</span>
                      </button>

                      {/* Stage Move Controls */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-[10px] font-bold text-slate-400">Move:</span>
                        <select
                          value={job.applicationStage}
                          onChange={(e) =>
                            onUpdateJobStage(job.id, e.target.value as ApplicationStage)
                          }
                          className="text-[11px] font-semibold border rounded-lg px-2 py-1 bg-slate-50"
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
                    </div>
                  ))}

                  {columnJobs.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-200/80 rounded-2xl flex items-center justify-center text-[11px] text-slate-400 font-medium">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
