import React, { useState } from 'react';
import {
  Bookmark,
  X,
  Copy,
  Check,
  Play,
  Trash2,
  Download,
  Film,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoPrompt } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: VideoPrompt[];
  onRemoveFavorite: (promptText: string) => void;
  onClearAll: () => void;
  onTestInSimulator: (prompt: VideoPrompt) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearAll,
  onTestInSimulator,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (prompt: VideoPrompt) => {
    navigator.clipboard.writeText(prompt.englishPrompt);
    setCopiedId(prompt.id);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#34d399'],
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportAsTxt = () => {
    if (favorites.length === 0) return;
    const content = favorites
      .map(
        (f, i) =>
          `=== [${i + 1}] ${f.titleUz} (${f.titleEn}) ===\nFormat: ${f.aspectRatio}\nPrompt:\n${f.englishPrompt}\n\nNegative Prompt:\n${f.negativePrompt}\n\nKamera Harakati: ${f.cameraDirection}\n----------------------------------------\n`
      )
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `google-flow-veo-prompts-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Saqlangan Video Promptlar
                <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono">
                  {favorites.length} ta
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                O&apos;zingizga yoqqan va keyinchalik ishlatish uchun belgilangan promptlar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-3">
              <Bookmark className="w-10 h-10 text-neutral-600" />
              <p className="text-sm font-medium text-neutral-300">
                Hozircha saqlangan promptlar mavjud emas
              </p>
              <p className="text-xs text-neutral-500 max-w-sm">
                Kutubxonadan yoki AI generatordan yoqqan promptlarni belgilash uchun xatcho&apos;p (Bookmark) tugmasini bosing.
              </p>
            </div>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col gap-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.titleUz}</h4>
                    <span className="text-xs text-neutral-400">{item.titleEn}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-sky-400">
                    {item.aspectRatio}
                  </span>
                </div>

                <p className="text-xs font-mono text-neutral-300 bg-neutral-900 p-3 rounded-lg border border-neutral-800/80 leading-relaxed max-h-[100px] overflow-y-auto">
                  {item.englishPrompt}
                </p>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-900">
                  <button
                    onClick={() => handleCopy(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs transition"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedId === item.id ? 'Nusxalandi!' : 'Nusxalash'}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onTestInSimulator(item);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition"
                    >
                      <Play className="w-3.5 h-3.5 text-sky-400" />
                      Viewfinderda Sinash
                    </button>

                    <button
                      onClick={() => onRemoveFavorite(item.englishPrompt)}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/50 transition"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {favorites.length > 0 && (
          <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-red-400 hover:text-red-300 transition flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Barchasini tozalash
            </button>

            <button
              onClick={exportAsTxt}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition border border-neutral-700"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              TXT Fayl Sifatida Yuklab Olish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
