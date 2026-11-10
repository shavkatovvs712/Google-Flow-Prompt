import React, { useState } from 'react';
import {
  BookOpen,
  Camera,
  Layers,
  Sparkles,
  ShieldAlert,
  Copy,
  Check,
  Film,
  Zap,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MASTER_GUIDE_SECTIONS } from '../data/guideContent';

export const MasterGuide: React.FC = () => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#34d399'],
    });
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Google Flow &amp; Veo Masterklass Qo&apos;llanmasi
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-normal">
                O&apos;zbek tilida to&apos;liq yo&apos;riqnoma
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Kinematografiya qoidalari, kamera tili, yorug&apos;lik sirlari va AI video generatsiyasida mukammal natijaga erishish sirlari
            </p>
          </div>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="flex flex-col gap-6">
        {MASTER_GUIDE_SECTIONS.map((section) => (
          <div
            key={section.id}
            className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {section.titleUz}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {section.summaryUz}
            </p>

            {/* Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {section.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-neutral-200 flex items-start gap-2 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Code example if present */}
            {section.codeExample && (
              <div className="relative mt-2">
                <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-950 border-t border-x border-neutral-800 rounded-t-xl text-[11px] text-neutral-400 font-mono">
                  <span>Formula Namunasi:</span>
                  <button
                    onClick={() => handleCopyCode(section.codeExample!, section.id)}
                    className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition"
                  >
                    {copiedSnippet === section.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedSnippet === section.id ? 'Nusxalandi!' : 'Nusxalash'}
                  </button>
                </div>
                <pre className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-b-xl text-xs font-mono text-sky-200/90 leading-relaxed whitespace-pre-wrap overflow-x-auto selection:bg-sky-500 selection:text-white">
                  {section.codeExample}
                </pre>
              </div>
            )}

            {/* Pro Tip */}
            {section.tip && (
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-amber-200 text-xs flex items-start gap-2.5 leading-relaxed">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-400 block mb-0.5">
                    💡 Rejissyor Maslahati:
                  </span>
                  <span>{section.tip}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Extra Cinema Terminology Reference Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Film className="w-4 h-4 text-sky-400" />
          Kino Texnikasi va Ob&apos;yektivlar Cheat-Sheet
        </h3>
        <p className="text-xs text-neutral-400">
          Ushbu so&apos;zlarni promptingizga kiritish orqali sun&apos;iy intellektga Gollivud kinolari sifatini yuklaysiz:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="font-mono font-bold text-sky-400 block mb-1">
              ARRI Alexa 65
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Dunyodagi eng qimmat kinokamera. Rasmga mayin, organik, tabiiy teri ranglarini beradi.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="font-mono font-bold text-sky-400 block mb-1">
              35mm Panavision Anamorphic
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              O&apos;ziga xos oval bokeh va gorizontal moviy yorug&apos;lik chiziqlari (lens flare) beradi.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="font-mono font-bold text-sky-400 block mb-1">
              120fps Ultra Slow-Motion
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Suv tomchilari, qum zarralari yoki portlashlarni vaqt to&apos;xtaganidek sekinlashtiradi.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="font-mono font-bold text-sky-400 block mb-1">
              Volumetric Fog &amp; God Rays
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Tuman orasidan tushayotgan nurlar kadrga 3D hajmdorlik va kino muhitini taqdim etadi.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="font-mono font-bold text-sky-400 block mb-1">
              DaVinci Resolve Teal &amp; Orange
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Gollivud blokbasterlarining asosiy rang korreksiyasi: sovuq fon va iliq terilar kontrasti.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="font-mono font-bold text-sky-400 block mb-1">
              Laowa 24mm Probe Lens
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Mikroskopik kichik narsalar ichiga kirib boruvchi naychasimon makro ob&apos;yektiv harakati.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
