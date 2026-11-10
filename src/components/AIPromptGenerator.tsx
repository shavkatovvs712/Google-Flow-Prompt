import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Copy,
  Check,
  Play,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
  Video,
  Clapperboard,
  Camera,
  Film,
  Compass,
  Sliders,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PromptGenerationResponse, VideoPrompt } from '../types';
import { QUICK_IDEA_TAGS } from '../data/builderPresets';

interface AIPromptGeneratorProps {
  onTestInSimulator: (prompt: VideoPrompt) => void;
  onSaveFavorite: (prompt: VideoPrompt) => void;
  isFavorited?: (promptText: string) => boolean;
}

export const AIPromptGenerator: React.FC<AIPromptGeneratorProps> = ({
  onTestInSimulator,
  onSaveFavorite,
  isFavorited,
}) => {
  const [topic, setTopic] = useState('Samarqand Registon maydoni ustida yomg\'ir va neon yorug\'liklarida uchuvchi mashinalar');
  const [style, setStyle] = useState('Cinematic Hollywood Blockbuster');
  const [cameraMovement, setCameraMovement] = useState('Smooth Dynamic Tracking & Low Angle Pan');
  const [lighting, setLighting] = useState('Volumetric Neon & Wet Street Reflections');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '21:9' | '1:1'>('16:9');
  const [fps, setFps] = useState('24fps cinematic film shutter');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PromptGenerationResponse | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          style,
          cameraMovement,
          lighting,
          aspectRatio,
          fps,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Prompt yaratishda xatolik yuz berdi');
      }

      const data: PromptGenerationResponse = await response.json();
      setResult(data);

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#ec4899', '#f59e0b'],
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Server bilan bog\'lanishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#34d399'],
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const convertToPromptObject = (item: PromptGenerationResponse['prompts'][0], index: number): VideoPrompt => {
    return {
      id: `ai-gen-${Date.now()}-${index}`,
      titleUz: item.titleUz,
      titleEn: item.titleEn,
      category: 'cinematic',
      styleTag: item.styleTag,
      englishPrompt: item.englishPrompt,
      uzbekExplanation: item.uzbekExplanation,
      cameraDirection: item.cameraDirection,
      lightingAndMood: item.lightingAndMood,
      lensAndCamera: item.lensAndCamera,
      negativePrompt: item.negativePrompt,
      veoDirectorTip: item.veoDirectorTip,
      aspectRatio,
      fps,
      previewGradient:
        index === 0
          ? 'from-blue-900 via-indigo-950 to-neutral-950'
          : index === 1
          ? 'from-emerald-950 via-teal-950 to-neutral-950'
          : 'from-purple-950 via-rose-950 to-neutral-950',
    };
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search / Input Banner */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-950/40">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              AI Video Prompt Generator (Google Veo &amp; Flow)
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800 font-normal">
                Gemini 3.8 Flash Engine
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              O&apos;zbek yoki boshqa tilda istalgan video g&apos;oyasini yozing — AI uni Google Flow uchun mukammal 3 xil Gollivud promptiga aylantirib beradi.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          {/* Main prompt input */}
          <div className="relative">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              placeholder="Masalan: Fazo stansiyasida turganda oynadan ko'ringan yorqin superyulduz portlashi, sekin yaqinlashuvchi kamera va suzib yurgan zarralar..."
              className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl p-3.5 text-sm sm:text-base text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition leading-relaxed resize-none"
            />
          </div>

          {/* Quick Idea Inspiration Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Tezkor g&apos;oyalar:
            </span>
            {QUICK_IDEA_TAGS.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTopic(tag)}
                className="text-xs px-2.5 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/70 transition"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Advanced Cinematography Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {/* Style Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
                <Clapperboard className="w-3.5 h-3.5 text-sky-400" />
                Kinematik Uslub:
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-sky-500 transition"
              >
                <option value="Cinematic Hollywood Blockbuster">🎬 Gollivud Blokbasteri (35mm Anamorphic)</option>
                <option value="Hyper-Realistic Wildlife Documentary">🌿 BBC Planet Earth (Tabiat 120fps)</option>
                <option value="Cyberpunk & Dark Sci-Fi Noir">⚡ Kiberpank &amp; Blade Runner 2049</option>
                <option value="Luxury Commercial & Automotive">💎 Tijorat &amp; Hashamatli Reklama</option>
                <option value="Ghibli & Makoto Shinkai Anime">🎨 Makoto Shinkai &amp; Ghibli Realizm</option>
                <option value="Surreal Fluid & Liquid Physics">🌌 Syurreal &amp; Suyuqlik Fizikasi</option>
              </select>
            </div>

            {/* Camera Movement */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-indigo-400" />
                Kamera Harakati:
              </label>
              <select
                value={cameraMovement}
                onChange={(e) => setCameraMovement(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-sky-500 transition"
              >
                <option value="Smooth Dynamic Tracking & Low Angle Pan">🎥 Silliq Tracking &amp; Pastki Rakurs</option>
                <option value="360 Degree Smooth Orbital Pan">🔄 360° Aylana (Orbit Shot)</option>
                <option value="Acrobatic FPV Drone Dive and Banking">🦅 FPV Dron Sho&apos;ng&apos;ishi</option>
                <option value="Slow Cinematic Dolly Push-In at Eye Level">🎯 Sekin Doli Yaqinlashuvi (Push-In)</option>
                <option value="Grand Sweeping Crane Boom Up">🏗️ Yuqoriga Ko&apos;tariluvchi Kran (Crane Up)</option>
                <option value="Microscopic Probe Macro Gliding">🔍 Makro Probe Ob&apos;yektiv Harakati</option>
              </select>
            </div>

            {/* Aspect Ratio */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-emerald-400" />
                Kadr Formati:
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-sky-500 transition"
              >
                <option value="16:9">16:9 Widescreen (YouTube / Kino)</option>
                <option value="9:16">9:16 Vertikal (TikTok / Shorts / Reels)</option>
                <option value="21:9">21:9 Cinemascope (Ultra-Keng Kino)</option>
                <option value="1:1">1:1 Kvadrat (Instagram Post)</option>
              </select>
            </div>

            {/* Dynamic Frame Rate */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Harakat Tezligi:
              </label>
              <select
                value={fps}
                onChange={(e) => setFps(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-sky-500 transition"
              >
                <option value="24fps cinematic film shutter">24fps Kino Standarti (Motion Blur)</option>
                <option value="120fps ultra slow-motion">120fps Ultra Sekin Harakat (Slow-Mo)</option>
                <option value="60fps high dynamic sports">60fps Dinamik Silliq Harakat</option>
                <option value="Hyperlapse kinetic time compression">Giperlaps (Tezlashtirilgan Vaqt)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-sky-950/50 transition flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'AI Gollivud Promptlarini Yaratmoqda...' : 'Google Flow uchun 3 ta Master Prompt Yaratish'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="flex flex-col gap-5">
          {/* Concept Summary Banner in Uzbek */}
          <div className="bg-sky-950/30 border border-sky-800/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                  AI Rejissyor Xulosasi:
                </span>
                <p className="text-xs sm:text-sm text-neutral-200">
                  {result.conceptSummaryUz}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 shrink-0">
              Format: {aspectRatio}
            </span>
          </div>

          {/* 3 Generated Options */}
          <div className="grid grid-cols-1 gap-6">
            {result.prompts.map((item, index) => {
              const promptObj = convertToPromptObject(item, index);
              const isSaved = isFavorited ? isFavorited(item.englishPrompt) : false;

              return (
                <div
                  key={index}
                  className="bg-neutral-900/95 border border-neutral-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4 relative overflow-hidden group hover:border-neutral-700 transition"
                >
                  {/* Option Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-white text-sm sm:text-base">
                          {item.titleUz}
                        </h3>
                        <span className="text-xs text-neutral-400 font-medium">
                          {item.titleEn}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-sky-400 border border-neutral-700 text-xs font-medium">
                        {item.styleTag}
                      </span>
                    </div>
                  </div>

                  {/* Ready-to-Copy English Prompt Box */}
                  <div className="relative flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span className="font-semibold text-sky-400 flex items-center gap-1">
                        <Clapperboard className="w-3.5 h-3.5" />
                        Google Flow &amp; Veo Prompti (Nusxalash uchun tayyor):
                      </span>
                      <span className="text-[11px] font-mono text-neutral-500">
                        {item.englishPrompt.length} belgidan iborat
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-100 leading-relaxed selection:bg-sky-500 selection:text-white">
                      {item.englishPrompt}
                    </div>
                  </div>

                  {/* Uzbek Explanation */}
                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 text-xs text-neutral-300 flex flex-col gap-1">
                    <span className="font-semibold text-neutral-200">
                      🇺🇿 Kadr mazmuni va vizual siri:
                    </span>
                    <p className="leading-relaxed">{item.uzbekExplanation}</p>
                  </div>

                  {/* Technical Breakdown Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="text-neutral-400 block font-medium mb-1">
                        🎥 Kamera Harakati:
                      </span>
                      <p className="text-neutral-200 font-medium">
                        {item.cameraDirection}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="text-neutral-400 block font-medium mb-1">
                        💡 Yorug&apos;lik &amp; Muhit:
                      </span>
                      <p className="text-neutral-200 font-medium">
                        {item.lightingAndMood}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="text-neutral-400 block font-medium mb-1">
                        🔭 Ob&apos;yektiv &amp; Texnika:
                      </span>
                      <p className="text-neutral-200 font-medium">
                        {item.lensAndCamera}
                      </p>
                    </div>
                  </div>

                  {/* Negative Prompt & Director Tip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-rose-200 flex flex-col gap-1">
                      <span className="font-semibold text-rose-400">
                        🚫 Salbiy Prompt (Negative Prompt):
                      </span>
                      <p className="font-mono text-[11px] text-rose-300/80">
                        {item.negativePrompt}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-amber-200 flex flex-col gap-1">
                      <span className="font-semibold text-amber-400">
                        💡 Google Veo Rejissyor Maslahati:
                      </span>
                      <p className="text-[11px] text-amber-200/90 leading-relaxed">
                        {item.veoDirectorTip}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyPrompt(item.englishPrompt, index)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs transition shadow-md shadow-sky-950/50"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        {copiedIndex === index ? 'Nusxalandi!' : 'Promptni Nusxalash'}
                      </button>

                      <button
                        onClick={() =>
                          handleCopyPrompt(
                            `${item.englishPrompt}\n--no ${item.negativePrompt}`,
                            index
                          )
                        }
                        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs transition border border-neutral-700"
                        title="Salbiy prompt bilan birga nusxalash"
                      >
                        <Copy className="w-3 h-3 text-neutral-400" />
                        + Salbiy Prompt Bilan
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTestInSimulator(promptObj)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-sky-400 font-medium text-xs transition border border-neutral-700"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Viewfinderda Sinash
                      </button>

                      <button
                        onClick={() => onSaveFavorite(promptObj)}
                        className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition border border-neutral-700"
                        title="Sevimlilarga saqlash"
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-neutral-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cinematography Terms Glossary */}
          {result.keyCinemaTerms && result.keyCinemaTerms.length > 0 && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-sky-400" />
                Ushbu Videolarda Ishlatilgan Kinematik Atamalar Lug&apos;ati
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.keyCinemaTerms.map((term, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col gap-1 text-xs"
                  >
                    <span className="font-mono font-bold text-sky-400">{term.term}</span>
                    <p className="text-neutral-300 text-[11px] leading-relaxed">
                      {term.meaningUz}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
