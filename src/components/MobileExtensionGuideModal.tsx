'use client';

import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  HelpCircle, 
  Laptop, 
  ExternalLink,
  Copy,
  Check,
  Share2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface MobileExtensionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const MobileExtensionGuideModal: React.FC<MobileExtensionGuideModalProps> = ({
  isOpen,
  onClose,
  userEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'iphone' | 'pwa'>('android');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLocalUrl = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-6 sm:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-[11px] font-bold border border-indigo-400/30 inline-flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-amber-300" />
              Mobile &amp; Phone Extension Setup
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            Can We Run the JOJO Extension on a Phone?
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-lg">
            Yes! On Android, you can run full Chrome extensions using Chromium mobile browsers. On iPhone, you can use our 1-tap mobile sync engine.
          </p>

          {/* Device Tabs */}
          <div className="flex bg-black/25 p-1 rounded-xl mt-5 w-fit border border-white/10">
            <button
              onClick={() => setActiveTab('android')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'android' ? 'bg-white text-indigo-900 shadow-sm' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Android (Full Extension)
            </button>
            <button
              onClick={() => setActiveTab('iphone')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'iphone' ? 'bg-white text-indigo-900 shadow-sm' : 'text-indigo-200 hover:text-white'
              }`}
            >
              iPhone (iOS)
            </button>
            <button
              onClick={() => setActiveTab('pwa')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'pwa' ? 'bg-white text-indigo-900 shadow-sm' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Add App to Phone Home Screen
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'android' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sm text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Android Extension Support: Fully Compatible!
                </span>
                <p className="text-xs text-emerald-700">
                  Standard mobile Chrome locks out extensions, but <strong>Kiwi Browser</strong> or <strong>Lemur Browser</strong> (free on Play Store) support unpacked Chrome extensions identically to desktop.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <h3 className="font-bold text-slate-900 text-sm">3 Easy Steps to Run on Your Android Phone:</h3>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-slate-900">Install Kiwi Browser from Google Play Store</h4>
                    <p className="text-slate-500 mt-0.5">
                      Open Google Play Store on your phone, search for <strong>&quot;Kiwi Browser&quot;</strong>, and tap Install.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-slate-900">Load the JOJO Extension</h4>
                    <p className="text-slate-500 mt-0.5">
                      In Kiwi Browser, tap the 3 dots in the top right &rarr; tap <strong>Extensions</strong> &rarr; turn on <strong>Developer Mode</strong> toggle &rarr; tap <strong>+(from .zip / .crx / user dir)</strong> and pick the JOJO extension folder.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-slate-900">Open LinkedIn or Naukri on your Phone</h4>
                    <p className="text-slate-500 mt-0.5">
                      Navigate to LinkedIn or Naukri in Kiwi Browser. The JOJO floating sync badge will appear in the corner of your phone screen just like on desktop!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'iphone' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sm text-amber-800">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  iPhone &amp; iOS Extension Restriction
                </span>
                <p className="text-xs text-amber-700">
                  Apple does not allow desktop Chrome unpacked extensions on iOS. However, JOJO solves this with <strong>Mobile 1-Tap Auto-Copy</strong>!
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <h3 className="font-bold text-slate-900 text-sm">How to use JOJO seamlessly on iPhone:</h3>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-slate-900">Open JOJO on Safari / Chrome on iPhone</h4>
                    <p className="text-slate-500 mt-0.5">
                      Browse your 80%+ job matches and ATS recommendations on your phone.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-slate-900">1-Tap &quot;AI Tailor &amp; Copy&quot;</h4>
                    <p className="text-slate-500 mt-0.5">
                      Tap the AI Tailor button on any job card. JOJO generates targeted ATS bullets formatted specifically for mobile clipboard.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-slate-900">Tap &quot;Apply on LinkedIn / Naukri App&quot;</h4>
                    <p className="text-slate-500 mt-0.5">
                      JOJO opens the native mobile job application link directly in your phone app, and you paste the tailored response in 1 second!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sm text-indigo-800">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Install JOJO as a Native Phone App (PWA)
                </span>
                <p className="text-xs text-indigo-700">
                  You can add JOJO directly to your smartphone home screen. It will launch full-screen with no browser address bar!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>📱 On Android (Chrome)</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                    <li>Open JOJO in Chrome on your phone.</li>
                    <li>Tap the <strong>3 dots menu</strong> in the top right.</li>
                    <li>Tap <strong>&quot;Add to Home screen&quot;</strong> or <strong>&quot;Install App&quot;</strong>.</li>
                    <li>JOJO icon is now placed on your phone home screen!</li>
                  </ol>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>🍎 On iPhone (Safari)</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                    <li>Open JOJO in Safari on your iPhone.</li>
                    <li>Tap the <strong>Share button</strong> (square with arrow up).</li>
                    <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                    <li>Tap <strong>Add</strong>. JOJO opens as a full-screen app!</li>
                  </ol>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-3">
                <div className="truncate">
                  <p className="text-[11px] font-bold text-slate-700">Share or open link on phone:</p>
                  <p className="text-[11px] font-mono text-slate-500 truncate">{typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:3000'}</p>
                </div>
                <button
                  onClick={handleCopyLocalUrl}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
            >
              Got it, close guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
