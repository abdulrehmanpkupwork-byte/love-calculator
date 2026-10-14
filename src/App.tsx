import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Sparkles, ShieldAlert } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { LoveForm } from './components/LoveForm';
import { LoadingHeart } from './components/LoadingHeart';
import { LoveResult } from './components/LoveResult';
import { HowItWorks } from './components/HowItWorks';
import { getLoveDetails, LoveResultData } from './utils/loveAlgorithm';
import { soundFx } from './utils/sound';

type ViewState = 'form' | 'loading' | 'result';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('form');
  const [pendingNames, setPendingNames] = useState<{ name1: string; name2: string }>({
    name1: '',
    name2: '',
  });
  const [resultData, setResultData] = useState<LoveResultData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Check URL parameters for pre-filled names or instant calculation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const n1 = params.get('name1') || params.get('n1');
      const n2 = params.get('name2') || params.get('n2');

      if (n1 && n2) {
        setPendingNames({ name1: n1, name2: n2 });
        const details = getLoveDetails(n1, n2);
        setResultData(details);
        setViewState('result');
      }
    }
  }, []);

  const handleSoundToggle = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFx.enabled = nextState;
  };

  const handleStartCalculation = (name1: string, name2: string) => {
    setPendingNames({ name1, name2 });
    setViewState('loading');

    // 2-second romantic anticipation loading
    setTimeout(() => {
      const details = getLoveDetails(name1, name2);
      setResultData(details);
      setViewState('result');

      // Update URL query parameters cleanly without reload for easy sharing
      if (typeof window !== 'undefined' && window.history) {
        const newUrl = `${window.location.pathname}?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
      }
    }, 2000);
  };

  const handleReset = () => {
    setViewState('form');
    setResultData(null);
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-[#090514] text-slate-100 relative overflow-hidden flex flex-col justify-between">
      {/* Background Ambience Layers: Deep Purple & Dark Navy with Rose accents */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/25 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-900/20 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-pink-950/30 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,40,90,0.18),rgba(9,5,20,0.95))]" />
      </div>

      {/* Floating Animated Hearts */}
      <FloatingHearts />

      {/* Top Bar Navigation Contract: 1-line brand, sound toggle & cute indicator */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleReset();
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.4)] group-hover:scale-105 transition-transform duration-200">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-romantic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400">
            Love Calculator
          </span>
        </a>

        {/* Action button: Sound Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSoundToggle}
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-pink-300 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-pink-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-4 py-8 sm:py-12">
        {/* Hero Header */}
        <section className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Harmonic Compatibility Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight mb-4 drop-shadow-[0_4px_25px_rgba(244,63,94,0.35)]">
            Love Calculator
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-pink-200/80 font-light max-w-xl mx-auto leading-relaxed">
            Find out how strong your love really is
          </p>
        </section>

        {/* Dynamic State: Form, Loading Animation, or Result Card */}
        <div className="w-full flex justify-center">
          {viewState === 'form' && (
            <LoveForm
              onCalculate={handleStartCalculation}
              initialName1={pendingNames.name1}
              initialName2={pendingNames.name2}
            />
          )}

          {viewState === 'loading' && (
            <LoadingHeart
              name1={pendingNames.name1}
              name2={pendingNames.name2}
            />
          )}

          {viewState === 'result' && resultData && (
            <LoveResult
              data={resultData}
              onReset={handleReset}
            />
          )}
        </div>

        {/* How It Works Section */}
        <HowItWorks />
      </main>

      {/* Footer & Disclaimer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 mt-16 border-t border-white/[0.06] text-center text-xs text-slate-400/80 space-y-3">
        {/* Entertainment Only Disclaimer Note */}
        <div className="inline-flex items-center justify-center gap-1.5 text-pink-300/70 bg-white/[0.02] px-3.5 py-1 rounded-full border border-white/[0.05]">
          <ShieldAlert className="w-3.5 h-3.5 text-pink-400" />
          <span>This calculator is for entertainment only</span>
        </div>

        {/* Made with love */}
        <p className="flex items-center justify-center gap-1.5 text-slate-400 text-sm">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>for true romantics</span>
        </p>
      </footer>
    </div>
  );
}
