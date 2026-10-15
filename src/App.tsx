import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Sparkles, ShieldAlert, BookOpen, Trophy, Mail, Phone, MessageCircle } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { LoveForm } from './components/LoveForm';
import { LoadingHeart } from './components/LoadingHeart';
import { LoveResult } from './components/LoveResult';
import { HowItWorks } from './components/HowItWorks';
import { LoveTipsPage } from './components/LoveTipsPage';
import { FamousCouplesPage } from './components/FamousCouplesPage';
import { ContactPage } from './components/ContactPage';
import { getLoveDetails, LoveResultData } from './utils/loveAlgorithm';
import { soundFx } from './utils/sound';
import { Analytics } from '@vercel/analytics/react';

type ActivePage = 'home' | 'tips' | 'famous' | 'contact';
type ViewState = 'form' | 'loading' | 'result';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const [viewState, setViewState] = useState<ViewState>('form');
  const [pendingNames, setPendingNames] = useState<{ name1: string; name2: string }>({
    name1: '',
    name2: '',
  });
  const [resultData, setResultData] = useState<LoveResultData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync state with URL parameters on mount and browser navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleLocationChange = () => {
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('page');
        const articleParam = params.get('article');
        const n1 = params.get('name1') || params.get('n1');
        const n2 = params.get('name2') || params.get('n2');

        if (pageParam === 'contact') {
          setActivePage('contact');
          document.title = 'Contact Us | Love Calculator';
        } else if (pageParam === 'famous') {
          setActivePage('famous');
          document.title = 'Famous Couples Love Scores & Leaderboard | Love Calculator';
        } else if (pageParam === 'tips' || articleParam) {
          setActivePage('tips');
          document.title = 'Romantic Wisdom & Love Tips | Love Calculator';
          if (articleParam) {
            setSelectedArticleId(articleParam);
          }
        } else {
          setActivePage('home');
          document.title = 'Love Calculator - Romantic Compatibility Test';
          if (n1 && n2) {
            setPendingNames({ name1: n1, name2: n2 });
            const details = getLoveDetails(n1, n2);
            setResultData(details);
            setViewState('result');
          }
        }
      };

      handleLocationChange();
      window.addEventListener('popstate', handleLocationChange);
      return () => window.removeEventListener('popstate', handleLocationChange);
    }
  }, []);

  const handleSoundToggle = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFx.enabled = nextState;
  };

  const handleNavigate = (page: ActivePage, articleId: string | null = null) => {
    setActivePage(page);
    setSelectedArticleId(articleId);

    if (typeof window !== 'undefined' && window.history) {
      if (page === 'contact') {
        window.history.pushState({}, '', '?page=contact');
        document.title = 'Contact Us | Love Calculator';
      } else if (page === 'famous') {
        window.history.pushState({}, '', '?page=famous');
        document.title = 'Famous Couples Love Scores & Leaderboard | Love Calculator';
      } else if (page === 'tips') {
        const url = articleId ? `?page=tips&article=${articleId}` : `?page=tips`;
        window.history.pushState({}, '', url);
        document.title = 'Romantic Wisdom & Love Tips | Love Calculator';
      } else {
        const url = resultData && pendingNames.name1 && pendingNames.name2
          ? `?name1=${encodeURIComponent(pendingNames.name1)}&name2=${encodeURIComponent(pendingNames.name2)}`
          : window.location.pathname;
        window.history.pushState({}, '', url);
        document.title = 'Love Calculator - Romantic Compatibility Test';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreFillAndCalculate = (name1: string, name2: string) => {
    if (!name1.trim() && !name2.trim()) {
      handleNavigate('home');
      setViewState('form');
      return;
    }

    setPendingNames({ name1, name2 });
    setActivePage('home');
    setViewState('loading');

    if (typeof window !== 'undefined' && window.history) {
      const url = `?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`;
      window.history.pushState({}, '', url);
      document.title = `${name1} & ${name2} Love Score | Love Calculator`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      const details = getLoveDetails(name1, name2);
      setResultData(details);
      setViewState('result');
    }, 1500);
  };

  const handleStartCalculation = (name1: string, name2: string) => {
    setPendingNames({ name1, name2 });
    setViewState('loading');

    // 2-second romantic anticipation loading
    setTimeout(() => {
      const details = getLoveDetails(name1, name2);
      setResultData(details);
      setViewState('result');

      if (typeof window !== 'undefined' && window.history) {
        const newUrl = `?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
        document.title = `${name1} & ${name2} Love Score | Love Calculator`;
      }
    }, 2000);
  };

  const handleReset = () => {
    setViewState('form');
    setResultData(null);
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState({}, '', window.location.pathname);
      document.title = 'Love Calculator - Romantic Compatibility Test';
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

      {/* Top Bar Navigation: Brand Mark, Home, Love Tips, Famous Couples, Contact, Sound Toggle */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Link */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('home');
            handleReset();
          }}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.4)] group-hover:scale-105 transition-transform duration-200">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-romantic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 hidden xs:inline">
            Love Calculator
          </span>
        </a>

        {/* Navigation Links: Home, Love Tips, Famous Couples, Contact */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activePage === 'home'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-[0_2px_12px_rgba(244,63,94,0.4)]'
                : 'text-pink-200/80 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('tips')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activePage === 'tips'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-[0_2px_12px_rgba(244,63,94,0.4)]'
                : 'text-pink-200/80 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Love Tips</span>
            <span className="sm:hidden">Tips</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('famous')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activePage === 'famous'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-[0_2px_12px_rgba(244,63,94,0.4)]'
                : 'text-pink-200/80 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Famous Couples</span>
            <span className="sm:hidden">Famous</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activePage === 'contact'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-[0_2px_12px_rgba(244,63,94,0.4)]'
                : 'text-pink-200/80 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </nav>

        {/* Action: Sound Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSoundToggle}
            className="p-2 sm:p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-pink-300 transition-colors cursor-pointer"
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
      <main className="relative z-10 flex-1 flex flex-col justify-center px-4 py-6 sm:py-10">
        {activePage === 'home' && (
          <>
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
          </>
        )}

        {activePage === 'tips' && (
          <LoveTipsPage
            selectedArticleId={selectedArticleId}
            onSelectArticle={(id) => handleNavigate('tips', id)}
            onNavigateToCalculator={() => handleNavigate('home')}
          />
        )}

        {activePage === 'famous' && (
          <FamousCouplesPage
            onCalculateCouple={handlePreFillAndCalculate}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer & Disclaimer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 mt-16 border-t border-white/[0.06] text-center text-xs text-slate-400/80 space-y-4">
        {/* Quick Nav in Footer: Home, Love Tips, Famous Couples, Contact Us */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-pink-300/80">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home / Calculator
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleNavigate('tips')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Love Tips &amp; Advice
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleNavigate('famous')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Famous Couples
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        {/* Dedicated Contact info strip in footer: Email, Phone & WhatsApp */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-pink-200/90 py-2.5 px-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] max-w-2xl mx-auto">
          <a
            href="mailto:abdulrehmansheikh030347@gmail.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">abdulrehmansheikh030347@gmail.com</span>
          </a>

          <span className="hidden sm:inline text-white/20">|</span>

          <a
            href="tel:03034787130"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>03034787130</span>
          </a>

          <span className="hidden sm:inline text-white/20">|</span>

          <a
            href="https://wa.me/923034787130"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

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

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
