import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Grid,
  Maximize2,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Sparkles,
  Camera,
  Film,
  Volume2,
  VolumeX,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoPrompt } from '../types';

interface CinematicSimulatorProps {
  prompt: VideoPrompt | null;
  onCopyPrompt?: (text: string) => void;
}

export const CinematicSimulator: React.FC<CinematicSimulatorProps> = ({
  prompt,
  onCopyPrompt,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '21:9' | '1:1'>(
    prompt?.aspectRatio || '16:9'
  );
  const [copied, setCopied] = useState(false);
  const [timecode, setTimecode] = useState('00:00:04:12');
  const [speed, setSpeed] = useState<'0.5x' | '1x' | '2x'>('1x');
  const [motionType, setMotionType] = useState<'dolly' | 'orbit' | 'fpv' | 'macro'>('dolly');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync aspect ratio if prompt changes
  useEffect(() => {
    if (prompt?.aspectRatio) {
      setAspectRatio(prompt.aspectRatio);
    }
  }, [prompt]);

  // Timecode animation timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const date = new Date();
      const s = String(date.getSeconds()).padStart(2, '0');
      const m = String(date.getMinutes()).padStart(2, '0');
      const f = String(Math.floor((date.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`00:${m}:${s}:${f}`);
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Canvas dynamic cinematic visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Determine color palette based on prompt
    const category = prompt?.category || 'cinematic';

    const render = () => {
      if (isPlaying) {
        const speedMultiplier = speed === '0.5x' ? 0.005 : speed === '2x' ? 0.025 : 0.012;
        t += speedMultiplier;
      }

      const w = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 450);

      ctx.clearRect(0, 0, w, h);

      // 1. Dynamic background gradient with motion
      const grad = ctx.createRadialGradient(
        w / 2 + Math.sin(t * 1.5) * (motionType === 'orbit' ? 120 : 40),
        h / 2 + Math.cos(t) * (motionType === 'fpv' ? 80 : 30),
        10,
        w / 2,
        h / 2,
        Math.max(w, h) * (motionType === 'dolly' ? 0.7 + Math.sin(t) * 0.15 : 0.7)
      );

      if (category === 'cinematic') {
        grad.addColorStop(0, '#1e1b4b');
        grad.addColorStop(0.5, '#0f172a');
        grad.addColorStop(1, '#020617');
      } else if (category === 'nature') {
        grad.addColorStop(0, '#064e3b');
        grad.addColorStop(0.5, '#022c22');
        grad.addColorStop(1, '#020617');
      } else if (category === 'commercial') {
        grad.addColorStop(0, '#451a03');
        grad.addColorStop(0.5, '#1c1917');
        grad.addColorStop(1, '#09090b');
      } else if (category === 'reels') {
        grad.addColorStop(0, '#701a75');
        grad.addColorStop(0.5, '#3b0764');
        grad.addColorStop(1, '#030712');
      } else {
        grad.addColorStop(0, '#312e81');
        grad.addColorStop(0.5, '#1e1b4b');
        grad.addColorStop(1, '#020617');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. Horizon / Anamorphic light streaks
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const streakGrad = ctx.createLinearGradient(0, h * 0.45, w, h * 0.55);
      streakGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      streakGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.28)');
      streakGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(0, h * 0.4, w, h * 0.2);

      // Anamorphic horizontal lens flare line
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.5 + Math.sin(t) * 10);
      ctx.lineTo(w * 0.9, h * 0.5 - Math.sin(t) * 10);
      ctx.stroke();
      ctx.restore();

      // 3. Floating 3D kinetic particles & motion rings
      const particleCount = 40;
      ctx.save();
      for (let i = 0; i < particleCount; i++) {
        const offset = i * (Math.PI * 2 / particleCount);
        const radius = (120 + Math.sin(t * 2 + i) * 60) * (motionType === 'dolly' ? (1 + (t % 2) * 0.4) : 1);
        const px = w / 2 + Math.cos(t + offset) * radius * (motionType === 'orbit' ? 1.8 : 1.2);
        const py = h / 2 + Math.sin(t * 1.5 + offset) * (radius * 0.6);
        const size = Math.abs(Math.sin(t + i)) * 3.5 + 1;

        ctx.fillStyle = i % 2 === 0 ? 'rgba(253, 224, 71, 0.75)' : 'rgba(96, 165, 250, 0.75)';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glowing tail
        if (isPlaying) {
          ctx.strokeStyle = i % 2 === 0 ? 'rgba(253, 224, 71, 0.15)' : 'rgba(96, 165, 250, 0.15)';
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - Math.cos(t + offset) * 12, py - Math.sin(t * 1.5 + offset) * 12);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 4. Subtle Film grain simulation
      const imgData = ctx.getImageData(0, 0, Math.min(w, 400), Math.min(h, 300));
      // Light grain calculation on low res
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = '#ffffff';
      for (let j = 0; j < 80; j++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, speed, motionType, prompt]);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt.englishPrompt);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#c084fc'],
    });
    setTimeout(() => setCopied(false), 2000);
    if (onCopyPrompt) onCopyPrompt(prompt.englishPrompt);
  };

  const getAspectStyle = () => {
    switch (aspectRatio) {
      case '9:16':
        return 'max-w-[320px] aspect-[9/16]';
      case '21:9':
        return 'w-full aspect-[21/9] max-h-[480px]';
      case '1:1':
        return 'max-w-[440px] aspect-square';
      case '16:9':
      default:
        return 'w-full aspect-video max-h-[460px]';
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base flex items-center gap-2">
              Kino Rejissyor Viewfinder (Google Flow Simulator)
              <span className="px-2 py-0.5 text-xs font-mono bg-neutral-800 text-sky-400 rounded-md border border-neutral-700">
                Veo Motion Engine
              </span>
            </h3>
            <p className="text-xs text-neutral-400">
              Promptning harakati, yorug&apos;lik dinamikasi va kadr kompozitsiyasini vizual sinash
            </p>
          </div>
        </div>

        {/* Aspect Ratio Switcher */}
        <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
          {(['16:9', '9:16', '21:9', '1:1'] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAspectRatio(ratio)}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                aspectRatio === ratio
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative w-full bg-black rounded-xl overflow-hidden flex items-center justify-center min-h-[320px] p-2 sm:p-4">
        {/* Viewfinder Frame according to aspect ratio */}
        <div
          className={`relative overflow-hidden rounded-lg transition-all duration-300 shadow-2xl border border-neutral-700/80 mx-auto ${getAspectStyle()}`}
        >
          {/* Animated Canvas Background */}
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Rule of Thirds Grid Overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
              <div className="border-r border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-b border-white/15" />
              <div className="border-r border-white/15" />
              <div className="border-r border-white/15" />
              <div className="" />
            </div>
          )}

          {/* Center Crosshair */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-6 h-6 border-t border-b border-white/25 flex items-center justify-center">
              <div className="w-0.5 h-3 bg-white/40" />
            </div>
          </div>

          {/* Top HUD Display */}
          <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80 pointer-events-none drop-shadow">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-red-500/50 text-red-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                REC [STBY]
              </span>
              <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20">
                {timecode}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-yellow-300">
                ISO 800
              </span>
              <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20">
                1/48s 180°
              </span>
              <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-sky-300">
                5600K RAW
              </span>
            </div>
          </div>

          {/* Bottom HUD Display with Camera Specs */}
          <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/80 pointer-events-none drop-shadow">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-black/70 border border-white/20 text-emerald-300 font-semibold">
                {prompt?.lensAndCamera?.split(',')[0] || 'ARRI ALEXA 65'}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-black/70 border border-white/20 text-sky-300">
                {prompt?.fps || '24 FPS CINEMA'}
              </span>
            </div>
            <div className="text-right text-[10px] text-neutral-300 bg-black/70 px-2 py-0.5 rounded border border-white/10 hidden sm:block">
              {prompt?.cameraDirection || 'Cinematic Dolly Push'}
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Quick Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pauza' : 'Ijro'}
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition ${
              showGrid
                ? 'bg-sky-500/10 border-sky-500/40 text-sky-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}
            title="Kadr to'ri (Rule of thirds grid)"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Setka</span>
          </button>

          {/* Motion Preset Selector */}
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            {(['dolly', 'orbit', 'fpv', 'macro'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMotionType(m)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium uppercase transition ${
                  motionType === m
                    ? 'bg-neutral-800 text-sky-400 border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Speed Preset Selector */}
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            {(['0.5x', '1x', '2x'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  speed === s
                    ? 'bg-neutral-800 text-yellow-400 border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Copy Prompt Directly From Simulator */}
        {prompt && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium transition shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Nusxalandi!' : 'Ushbu Promptni Nusxalash'}
          </button>
        )}
      </div>

      {/* Prompt Preview Details Box */}
      {prompt && (
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col gap-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              {prompt.titleUz} ({prompt.titleEn})
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300">
              {prompt.styleTag}
            </span>
          </div>

          <p className="text-xs text-neutral-300 font-mono bg-neutral-900 p-3 rounded-lg border border-neutral-800 leading-relaxed select-all">
            {prompt.englishPrompt}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
              <span className="text-neutral-400 block font-medium mb-1">
                🎥 Kamera &amp; Rakurs:
              </span>
              <p className="text-neutral-200">{prompt.cameraDirection}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
              <span className="text-neutral-400 block font-medium mb-1">
                💡 Yorug&apos;lik &amp; Muhit:
              </span>
              <p className="text-neutral-200">{prompt.lightingAndMood}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
