/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Wand2,
  Layers,
  Film,
  Camera,
  BookOpen,
  Bookmark,
  Sparkles,
  Clapperboard,
  Video,
  Play,
  Share2,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURATED_PROMPTS } from './data/curatedPrompts';
import { VideoPrompt } from './types';
import { AIPromptGenerator } from './components/AIPromptGenerator';
import { PromptBuilder } from './components/PromptBuilder';
import { PromptLibrary } from './components/PromptLibrary';
import { CinematicSimulator } from './components/CinematicSimulator';
import { MasterGuide } from './components/MasterGuide';
import { FavoritesModal } from './components/FavoritesModal';

type TabType = 'generator' | 'builder' | 'library' | 'simulator' | 'guide';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('generator');
  const [activeSimulatorPrompt, setActiveSimulatorPrompt] = useState<VideoPrompt>(
    CURATED_PROMPTS[0]
  );
  const [favorites, setFavorites] = useState<VideoPrompt[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('veo_flow_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        // Pre-fill with a favorite
        setFavorites([CURATED_PROMPTS[0], CURATED_PROMPTS[1]]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavoritesToStorage = (updated: VideoPrompt[]) => {
    setFavorites(updated);
    try {
      localStorage.setItem('veo_flow_favorites', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFavorite = (prompt: VideoPrompt) => {
    const exists = favorites.some((f) => f.englishPrompt === prompt.englishPrompt);
    let updated: VideoPrompt[];
    if (exists) {
      updated = favorites.filter((f) => f.englishPrompt !== prompt.englishPrompt);
      showToast('Sevimlilardan o\'chirildi');
    } else {
      updated = [prompt, ...favorites];
      showToast('Sevimlilarga saqlandi!');
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#34d399'],
      });
    }
    saveFavoritesToStorage(updated);
  };

  const handleRemoveFavorite = (promptText: string) => {
    const updated = favorites.filter((f) => f.englishPrompt !== promptText);
    saveFavoritesToStorage(updated);
    showToast('O\'chirildi');
  };

  const handleClearAllFavorites = () => {
    saveFavoritesToStorage([]);
    showToast('Barcha saqlanganlar tozalandi');
  };

  const isFavorited = (promptText: string) => {
    return favorites.some((f) => f.englishPrompt === promptText);
  };

  const handleTestInSimulator = (prompt: VideoPrompt) => {
    setActiveSimulatorPrompt(prompt);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setCopyToast(msg);
    setTimeout(() => {
      setCopyToast(null);
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Toast Notification */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-900 border border-neutral-700 text-sky-300 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-2xl shadow-sky-950/60 animate-bounce">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-sky-950/50">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                Google Flow &amp; Veo
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-sky-950 text-sky-400 rounded-md border border-sky-800">
                  Prompt Studio
                </span>
              </h1>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                Sun&apos;iy intellekt orqali professional AI videolar yaratish studiyasi
              </p>
            </div>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium transition shadow-sm"
              title="Saqlangan video promptlar"
            >
              <Bookmark className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Saqlanganlar</span>
              <span className="px-1.5 py-0.2 rounded-full bg-neutral-800 text-emerald-400 text-[10px] font-mono border border-neutral-700">
                {favorites.length}
              </span>
            </button>

            <button
              onClick={() => {
                const samplePrompt = CURATED_PROMPTS[0];
                navigator.clipboard.writeText(samplePrompt.englishPrompt);
                showToast('Namuna prompt nusxalandi!');
              }}
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tezkor Namuna
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 border-t border-neutral-900">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'generator'
                ? 'bg-sky-500 text-neutral-950 shadow-md shadow-sky-950/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            AI Prompt Generator
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'builder'
                ? 'bg-sky-500 text-neutral-950 shadow-md shadow-sky-950/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Modulli Konstruktor
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'library'
                ? 'bg-sky-500 text-neutral-950 shadow-md shadow-sky-950/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Film className="w-4 h-4" />
            Saralangan Kutubxona
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'simulator'
                ? 'bg-sky-500 text-neutral-950 shadow-md shadow-sky-950/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            Viewfinder Simulyator
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'guide'
                ? 'bg-sky-500 text-neutral-950 shadow-md shadow-sky-950/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            O&apos;zbekcha Qo&apos;llanma
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'generator' && (
          <AIPromptGenerator
            onTestInSimulator={handleTestInSimulator}
            onSaveFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
          />
        )}

        {activeTab === 'builder' && (
          <PromptBuilder
            onTestInSimulator={handleTestInSimulator}
            onSaveFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
          />
        )}

        {activeTab === 'library' && (
          <PromptLibrary
            onTestInSimulator={handleTestInSimulator}
            onSaveFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
          />
        )}

        {activeTab === 'simulator' && (
          <div className="flex flex-col gap-5">
            <CinematicSimulator
              prompt={activeSimulatorPrompt}
              onCopyPrompt={() => showToast('Viewfinder prompti nusxalandi!')}
            />

            {/* Quick Prompts to Load into Simulator */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-sky-400" />
                Boshqa tayyor kadrlarni yuklash:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {CURATED_PROMPTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveSimulatorPrompt(p)}
                    className={`p-3 rounded-xl text-left border transition flex flex-col gap-1 ${
                      activeSimulatorPrompt.id === p.id
                        ? 'bg-sky-500/10 border-sky-500/60 text-sky-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-850'
                    }`}
                  >
                    <span className="text-xs font-bold block">{p.titleUz}</span>
                    <span className="text-[11px] text-neutral-400 line-clamp-1">
                      {p.styleTag} &bull; {p.aspectRatio}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && <MasterGuide />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-900 bg-neutral-950 py-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Google Flow &amp; Google Veo uchun maxsus AI Video Prompt Konstruktori va Kinematografiya Studiyasi
          </p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Google Veo 1080p / 4K</span>
            <span>&bull;</span>
            <span>ARRI Alexa 65</span>
            <span>&bull;</span>
            <span>IMAX 70mm</span>
          </div>
        </div>
      </footer>

      {/* Favorites Modal Drawer */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAll={handleClearAllFavorites}
        onTestInSimulator={handleTestInSimulator}
      />
    </div>
  );
}
