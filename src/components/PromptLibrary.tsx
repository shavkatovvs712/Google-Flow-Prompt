import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Copy,
  Check,
  Play,
  Bookmark,
  BookmarkCheck,
  Clapperboard,
  Camera,
  Layers,
  Sparkles,
  Film,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURATED_PROMPTS } from '../data/curatedPrompts';
import { VideoPrompt } from '../types';

interface PromptLibraryProps {
  onTestInSimulator: (prompt: VideoPrompt) => void;
  onSaveFavorite: (prompt: VideoPrompt) => void;
  isFavorited?: (promptText: string) => boolean;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  onTestInSimulator,
  onSaveFavorite,
  isFavorited,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRatio, setSelectedRatio] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelUz: 'Barchasi', icon: '✨' },
    { id: 'cinematic', labelUz: '🎬 Kinematik & Blokbaster' },
    { id: 'nature', labelUz: '🌿 Tabiat & Jonivorlar' },
    { id: 'commercial', labelUz: '💎 Tijorat & Reklama' },
    { id: 'surreal', labelUz: '🎨 Syurreal & San\'at' },
    { id: 'reels', labelUz: '📱 9:16 Reels & Shorts' },
  ];

  const filteredPrompts = useMemo(() => {
    return CURATED_PROMPTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Ratio filter
      if (selectedRatio !== 'all' && item.aspectRatio !== selectedRatio) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesUz = item.titleUz.toLowerCase().includes(query);
        const matchesEn = item.titleEn.toLowerCase().includes(query);
        const matchesPrompt = item.englishPrompt.toLowerCase().includes(query);
        const matchesExplanation = item.uzbekExplanation.toLowerCase().includes(query);
        const matchesTag = item.styleTag.toLowerCase().includes(query);
        return matchesUz || matchesEn || matchesPrompt || matchesExplanation || matchesTag;
      }
      return true;
    });
  }, [selectedCategory, selectedRatio, searchQuery]);

  const handleCopy = (prompt: VideoPrompt) => {
    navigator.clipboard.writeText(prompt.englishPrompt);
    setCopiedId(prompt.id);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#34d399'],
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Filter Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Google Flow &amp; Veo Saralangan Promptlar Kutubxonasi
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-sky-400 font-mono">
                {filteredPrompts.length} ta video prompt
              </span>
            </h2>
            <p className="text-xs text-neutral-400">
              Gollivud darajasida sinovdan o&apos;tgan, tayyor yuqori aniqlikdagi video promptlar to&apos;plami
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Prompt yoki kalit so'zni qidirish..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-sky-500 transition"
            />
          </div>
        </div>

        {/* Category Pills & Aspect Ratio Filter */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-neutral-950 font-bold shadow-md shadow-sky-950/40'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                {cat.labelUz}
              </button>
            ))}
          </div>

          {/* Aspect Filter */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
            <span className="text-[11px] text-neutral-400 px-2 font-medium">Format:</span>
            {['all', '16:9', '9:16', '21:9'].map((ratio) => (
              <button
                key={ratio}
                onClick={() => setSelectedRatio(ratio)}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition ${
                  selectedRatio === ratio
                    ? 'bg-neutral-800 text-sky-400 border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {ratio === 'all' ? 'Barchasi' : ratio}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prompts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPrompts.map((item) => {
          const isSaved = isFavorited ? isFavorited(item.englishPrompt) : false;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between gap-4 hover:border-neutral-700 transition group"
            >
              <div className="flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-sky-300 transition">
                      {item.titleUz}
                    </h3>
                    <span className="text-xs text-neutral-400 font-medium">
                      {item.titleEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800">
                      {item.aspectRatio}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800 font-medium">
                      {item.styleTag}
                    </span>
                  </div>
                </div>

                {/* Uzbek explanation */}
                <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/60">
                  {item.uzbekExplanation}
                </p>

                {/* English Prompt snippet */}
                <div className="relative">
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-200 leading-relaxed max-h-[140px] overflow-y-auto selection:bg-sky-500 selection:text-white">
                    {item.englishPrompt}
                  </div>
                </div>

                {/* Camera & Lighting Tags */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300">
                    <span className="text-neutral-500 block text-[10px] font-medium">
                      🎥 Harakat:
                    </span>
                    <span className="line-clamp-2">{item.cameraDirection}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300">
                    <span className="text-neutral-500 block text-[10px] font-medium">
                      💡 Yorug&apos;lik:
                    </span>
                    <span className="line-clamp-2">{item.lightingAndMood}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-neutral-800">
                <button
                  onClick={() => handleCopy(item)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs transition shadow-md shadow-sky-950/40"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? 'Nusxalandi!' : 'Nusxalash'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTestInSimulator(item)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs transition border border-neutral-700"
                    title="Viewfinder simulatorida ko'rish"
                  >
                    <Play className="w-3.5 h-3.5 text-sky-400" />
                    Sinash
                  </button>

                  <button
                    onClick={() => onSaveFavorite(item)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition border border-neutral-700"
                    title="Saqlash"
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

      {filteredPrompts.length === 0 && (
        <div className="text-center p-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col items-center gap-3">
          <Clapperboard className="w-10 h-10 text-neutral-600" />
          <h3 className="text-base font-bold text-white">Hech qanday prompt topilmadi</h3>
          <p className="text-xs text-neutral-400">
            Qidiruv so&apos;zini o&apos;zgartiring yoki filtrlarni tozalang
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedRatio('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-white"
          >
            Filtrlarni Tiklash
          </button>
        </div>
      )}
    </div>
  );
};
