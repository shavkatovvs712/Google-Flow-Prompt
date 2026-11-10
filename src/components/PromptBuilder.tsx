import React, { useState, useMemo } from 'react';
import {
  Wand2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Camera,
  Sun,
  Video,
  Layers,
  Ratio,
  ShieldAlert,
  Play,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  CAMERA_MOTIONS,
  LIGHTING_STYLES,
  LENS_OPTIONS,
  MOTION_DYNAMICS,
  ASPECT_RATIOS,
  QUICK_IDEA_TAGS,
  BuilderOption,
} from '../data/builderPresets';
import { VideoPrompt } from '../types';

interface PromptBuilderProps {
  onTestInSimulator: (prompt: VideoPrompt) => void;
  onSaveFavorite: (prompt: VideoPrompt) => void;
  isFavorited?: (promptText: string) => boolean;
}

export const PromptBuilder: React.FC<PromptBuilderProps> = ({
  onTestInSimulator,
  onSaveFavorite,
  isFavorited,
}) => {
  const [subjectText, setSubjectText] = useState(
    'A futuristic robotic falcon with gold-plated mechanical wings perched on a skyscraper overlooking Neo-Tashkent'
  );
  const [selectedMotion, setSelectedMotion] = useState<BuilderOption>(CAMERA_MOTIONS[0]);
  const [selectedLighting, setSelectedLighting] = useState<BuilderOption>(LIGHTING_STYLES[0]);
  const [selectedLens, setSelectedLens] = useState<BuilderOption>(LENS_OPTIONS[0]);
  const [selectedDynamic, setSelectedDynamic] = useState<BuilderOption>(MOTION_DYNAMICS[0]);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '21:9' | '1:1'>('16:9');
  const [includeNegative, setIncludeNegative] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isExpandingWithAI, setIsExpandingWithAI] = useState(false);
  const [expandError, setExpandError] = useState<string | null>(null);

  // Default negative prompt
  const defaultNegativePrompt =
    'jittery motion, morphing artifacts, erratic camera shaking, low frame rate, blurry, cartoonish 3D render, low resolution, blown-out highlights, duplicate limbs, amateur footage';

  // Assemble the prompt string dynamically
  const assembledEnglishPrompt = useMemo(() => {
    const parts = [
      subjectText.trim(),
      selectedMotion.valueEn,
      selectedLighting.valueEn,
      selectedLens.valueEn,
      selectedDynamic.valueEn,
      'photorealistic 8K render fidelity, DaVinci Resolve color grading',
    ].filter(Boolean);

    return parts.join(', ');
  }, [subjectText, selectedMotion, selectedLighting, selectedLens, selectedDynamic]);

  const handleCopy = () => {
    let textToCopy = assembledEnglishPrompt;
    if (includeNegative) {
      textToCopy += `\n--no ${defaultNegativePrompt}`;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#34d399'],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const currentAsPromptObject = useMemo((): VideoPrompt => {
    return {
      id: `custom-${Date.now()}`,
      titleUz: subjectText.slice(0, 30) + '...',
      titleEn: subjectText.slice(0, 30) + '...',
      category: 'cinematic',
      styleTag: selectedLens.labelEn,
      englishPrompt: assembledEnglishPrompt,
      uzbekExplanation: `Maxsus yig'ilgan prompt: ${selectedMotion.labelUz}, ${selectedLighting.labelUz}, ${selectedLens.labelUz}`,
      cameraDirection: selectedMotion.labelUz,
      lightingAndMood: selectedLighting.labelUz,
      lensAndCamera: selectedLens.labelUz,
      negativePrompt: defaultNegativePrompt,
      veoDirectorTip:
        'Google Veo kadrda fizika va yorug\'lik uzluksizligini saqlash uchun kamera harakatini aniq bir yo\'nalishda ushlab turadi.',
      aspectRatio,
      fps: selectedDynamic.labelUz,
      previewGradient: 'from-blue-900 via-indigo-950 to-neutral-950',
    };
  }, [
    subjectText,
    assembledEnglishPrompt,
    selectedMotion,
    selectedLighting,
    selectedLens,
    selectedDynamic,
    aspectRatio,
  ]);

  const handleExpandWithAI = async () => {
    setIsExpandingWithAI(true);
    setExpandError(null);
    try {
      const response = await fetch('/api/expand-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawPrompt: assembledEnglishPrompt }),
      });

      if (!response.ok) {
        throw new Error('AI bilan kuchaytirishda xatolik yuz berdi');
      }

      const data = await response.json();
      if (data.enhancedPrompt) {
        setSubjectText(data.enhancedPrompt);
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#ec4899', '#3b82f6'],
        });
      }
    } catch (err: any) {
      setExpandError(err.message || 'Xatolik yuz berdi');
    } finally {
      setIsExpandingWithAI(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Intro */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Modulli Prompt Konstruktori
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800 font-normal">
                  Interaktiv Yig&apos;uvchi
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Tayyor bloklar orqali Gollivud qoidalariga mos professional Google Flow &amp; Veo promptini yig&apos;ing
              </p>
            </div>
          </div>

          {/* AI Polish Button */}
          <button
            onClick={handleExpandWithAI}
            disabled={isExpandingWithAI}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-950/50 transition disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isExpandingWithAI ? 'animate-spin' : ''}`} />
            {isExpandingWithAI ? 'AI Qayta Ishlamoqda...' : 'AI Bilan Boyitish (Polish)'}
          </button>
        </div>

        {expandError && (
          <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-800/50 mt-2">
            {expandError}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Modular Options Selector */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* 1. Subject & Action Input */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[11px] font-bold">
                  1
                </span>
                Asosiy Obyekt &amp; Harakat (Subject &amp; Action)
              </label>
              <span className="text-[11px] text-neutral-400">
                Kim yoki nima, qanday harakat qilyapti?
              </span>
            </div>

            <textarea
              value={subjectText}
              onChange={(e) => setSubjectText(e.target.value)}
              rows={3}
              placeholder="Masalan: Interstellar uslubidagi koinot kemasi gigant qora tuynuk tomon yaqinlashmoqda..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs sm:text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-sky-500 transition leading-relaxed resize-none"
            />

            {/* Quick Suggestions Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-neutral-400 flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                G&apos;oyalar:
              </span>
              {QUICK_IDEA_TAGS.slice(0, 6).map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSubjectText(tag)}
                  className="px-2.5 py-1 rounded-lg text-[11px] bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/60 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Camera Motion Selector */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[11px] font-bold">
                  2
                </span>
                Kamera Harakati (Camera Motion)
              </label>
              <span className="text-[11px] text-neutral-400 font-mono">
                {selectedMotion.labelEn}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CAMERA_MOTIONS.map((motion) => {
                const isSelected = selectedMotion.id === motion.id;
                return (
                  <button
                    key={motion.id}
                    onClick={() => setSelectedMotion(motion)}
                    className={`p-2.5 rounded-xl text-left border transition flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-sky-500/10 border-sky-500/50 text-sky-300 shadow-sm'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800/50'
                    }`}
                  >
                    <span className="text-xs font-semibold block leading-tight">
                      {motion.labelUz}
                    </span>
                    <span className="text-[10px] text-neutral-400 block line-clamp-1">
                      {motion.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Lighting & Atmosphere */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-bold">
                  3
                </span>
                Yorug&apos;lik &amp; Muhit (Lighting)
              </label>
              <span className="text-[11px] text-neutral-400 font-mono">
                {selectedLighting.labelEn}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LIGHTING_STYLES.map((light) => {
                const isSelected = selectedLighting.id === light.id;
                return (
                  <button
                    key={light.id}
                    onClick={() => setSelectedLighting(light)}
                    className={`p-2.5 rounded-xl text-left border transition flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-sm'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800/50'
                    }`}
                  >
                    <span className="text-xs font-semibold block leading-tight">
                      {light.labelUz}
                    </span>
                    <span className="text-[10px] text-neutral-400 block line-clamp-1">
                      {light.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Lens & Camera Gear */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">
                  4
                </span>
                Ob&apos;yektiv &amp; Kamera (Camera &amp; Lens)
              </label>
              <span className="text-[11px] text-neutral-400 font-mono">
                {selectedLens.labelEn}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {LENS_OPTIONS.map((lens) => {
                const isSelected = selectedLens.id === lens.id;
                return (
                  <button
                    key={lens.id}
                    onClick={() => setSelectedLens(lens)}
                    className={`p-2.5 rounded-xl text-left border transition flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-sm'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800/50'
                    }`}
                  >
                    <span className="text-xs font-semibold block leading-tight">
                      {lens.labelUz}
                    </span>
                    <span className="text-[10px] text-neutral-400 block line-clamp-1">
                      {lens.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Dynamics & Frame Rate */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[11px] font-bold">
                  5
                </span>
                Kadr Tezligi &amp; Harakat Dinamikasi
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MOTION_DYNAMICS.map((dyn) => {
                const isSelected = selectedDynamic.id === dyn.id;
                return (
                  <button
                    key={dyn.id}
                    onClick={() => setSelectedDynamic(dyn)}
                    className={`p-2.5 rounded-xl text-left border transition flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-rose-500/10 border-rose-500/50 text-rose-300 shadow-sm'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800/50'
                    }`}
                  >
                    <span className="text-xs font-semibold block leading-tight">
                      {dyn.labelUz}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Live Final Prompt & Action Dashboard */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Assembled Output Box */}
          <div className="sticky top-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-white text-sm">
                  Tayyor Google Flow / Veo Prompti
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                {aspectRatio}
              </span>
            </div>

            {/* Aspect Ratio Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-neutral-400 font-medium">
                Tomonlar Nisbati (Aspect Ratio):
              </label>
              <div className="grid grid-cols-4 gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                {ASPECT_RATIOS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAspectRatio(item.id as any)}
                    className={`py-1.5 text-center rounded-lg text-xs font-medium transition ${
                      aspectRatio === item.id
                        ? 'bg-neutral-800 text-sky-400 border border-neutral-700 shadow-sm font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Textarea Display */}
            <div className="relative group">
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-200 leading-relaxed max-h-[220px] overflow-y-auto selection:bg-sky-500 selection:text-white">
                {assembledEnglishPrompt}
              </div>
            </div>

            {/* Negative Prompt Switch */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5 cursor-pointer">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  Salbiy promptni (Negative) qo&apos;shish
                </label>
                <input
                  type="checkbox"
                  checked={includeNegative}
                  onChange={(e) => setIncludeNegative(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 bg-neutral-900 border-neutral-700"
                />
              </div>
              {includeNegative && (
                <p className="text-[11px] text-neutral-400 font-mono bg-neutral-900/60 p-2 rounded-lg border border-neutral-800 leading-relaxed">
                  --no {defaultNegativePrompt}
                </p>
              )}
            </div>

            {/* Actions: Copy, Test, Save */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-sky-950/50"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Nusxalandi!' : 'Google Flow uchun Nusxalash'}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onTestInSimulator(currentAsPromptObject)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition border border-neutral-700"
                >
                  <Play className="w-3.5 h-3.5 text-sky-400" />
                  Viewfinderda Ko&apos;rish
                </button>

                <button
                  onClick={() => onSaveFavorite(currentAsPromptObject)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition border border-neutral-700"
                >
                  {isFavorited && isFavorited(assembledEnglishPrompt) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Saqlangan
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-neutral-400" />
                      Saqlash
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Flow Pro Tip Box */}
            <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-800/30 text-[11px] text-neutral-300 leading-relaxed">
              <span className="font-semibold text-sky-400 block mb-0.5">
                💡 Google Flow Maslahati:
              </span>
              Google Flow da eng sifatli natija olish uchun promptni nusxalab,
              kamera sozlamalarida kadr nisbatini ({aspectRatio}) tanlang.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
