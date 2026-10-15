import React, { useState, useMemo } from 'react';
import {
  Heart,
  Sparkles,
  Trophy,
  Crown,
  Medal,
  Search,
  Share2,
  Calculator,
  Flame,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { FAMOUS_COUPLES, FamousCouple, CoupleCategory } from '../data/famousCouples';
import { CircularProgress } from './CircularProgress';

interface FamousCouplesPageProps {
  onCalculateCouple: (name1: string, name2: string) => void;
}

type FilterTab = 'All' | 'Classic' | 'Epic' | 'Movies' | 'Legendary';

export const FamousCouplesPage: React.FC<FamousCouplesPageProps> = ({
  onCalculateCouple,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Top 5 Highest Scores for Leaderboard
  const top5Couples = useMemo(() => {
    return [...FAMOUS_COUPLES]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, []);

  // Filtered couples
  const filteredCouples = useMemo(() => {
    return FAMOUS_COUPLES.filter((couple) => {
      const matchesCategory =
        selectedFilter === 'All' || couple.categoryGroup === selectedFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        couple.name1.toLowerCase().includes(q) ||
        couple.name2.toLowerCase().includes(q) ||
        `${couple.name1} and ${couple.name2}`.toLowerCase().includes(q) ||
        couple.oneLineStory.toLowerCase().includes(q) ||
        couple.origin.toLowerCase().includes(q) ||
        couple.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const handleShareWhatsApp = (couple: FamousCouple) => {
    const text = encodeURIComponent(
      `💘 ${couple.name1} & ${couple.name2} scored a massive ${couple.score}% on the Love Calculator!\n\n"${couple.oneLineStory}"\n\nTest your own love compatibility here: ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return {
        icon: Trophy,
        label: '#1',
        style: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-[0_0_15px_rgba(251,191,36,0.6)]',
      };
    }
    if (index === 1) {
      return {
        icon: Crown,
        label: '#2',
        style: 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black shadow-[0_0_12px_rgba(226,232,240,0.5)]',
      };
    }
    if (index === 2) {
      return {
        icon: Medal,
        label: '#3',
        style: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-black shadow-[0_0_12px_rgba(217,119,6,0.5)]',
      };
    }
    return {
      icon: Sparkles,
      label: `#${index + 1}`,
      style: 'bg-pink-500/20 border border-pink-500/30 text-pink-300 font-bold',
    };
  };

  const getCategoryBadgeClass = (category: CoupleCategory) => {
    switch (category) {
      case 'Classic Romance':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Epic Love Stories':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'Movie Couples':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Legendary Love':
      default:
        return 'bg-pink-500/15 text-pink-300 border-pink-500/30';
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 sm:py-10 relative z-10 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md">
          <Trophy className="w-3.5 h-3.5 text-amber-300" />
          <span>Hall of Iconic Romances</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 drop-shadow-[0_4px_25px_rgba(244,63,94,0.35)]">
          Famous Couples Love Scores
        </h1>

        <p className="text-base sm:text-lg text-pink-200/80 font-light max-w-xl mx-auto leading-relaxed">
          From timeless Shakespearean drama and Eastern folk epics to Hollywood cinema, explore how legendary lovers score on our cosmic algorithm.
        </p>
      </section>

      {/* 6. Top 5 Highest Scores Leaderboard Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.4)]">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Top 5 Highest Love Scores
              </h2>
              <p className="text-xs text-pink-200/70">
                The most cosmically aligned couples ranked by our algorithm
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {top5Couples.map((c, index) => {
            const badge = getRankBadge(index);
            const Icon = badge.icon;

            return (
              <div
                key={c.id}
                onClick={() => onCalculateCouple(c.name1, c.name2)}
                className="glass-panel-subtle rounded-2xl p-4 border border-white/[0.08] hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/20 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs ${badge.style}`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>

                    <span className="font-mono text-base font-bold text-pink-300 tabular-nums">
                      {c.score}%
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-1 mb-1">
                    {c.name1} &amp; {c.name2}
                  </h3>

                  <p className="text-[11px] text-pink-200/60 line-clamp-1 mb-3">
                    {c.origin}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-pink-300/80 group-hover:text-white transition-colors">
                  <span>Calculate match</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Category Filter Tabs & Search Bar */}
      <section className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { id: 'All', label: 'All Couples (16)' },
              { id: 'Classic', label: 'Classic Romance' },
              { id: 'Epic', label: 'Epic Love Stories' },
              { id: 'Movies', label: 'Movie Couples' },
              { id: 'Legendary', label: 'Legendary Love' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id as FilterTab)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-400'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] text-pink-200/80 border border-white/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-pink-400/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Romeo, Heer, Titanic..."
              className="glass-input w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm text-white placeholder-pink-300/40 focus:ring-2 focus:ring-rose-500/40"
            />
          </div>
        </div>
      </section>

      {/* 2. Responsive Grid of 16 Couple Cards */}
      {filteredCouples.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto">
          <BookOpen className="w-10 h-10 text-pink-400/50 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">No couples found</h3>
          <p className="text-slate-400 text-sm mb-4">
            Try adjusting your search query or choosing another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCouples.map((couple) => (
            <div
              key={couple.id}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.08] hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden hover:shadow-[0_12px_32px_rgba(244,63,94,0.18)]"
            >
              {/* Soft ambient background glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/15 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Category badge & origin */}
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border font-medium ${getCategoryBadgeClass(
                      couple.category
                    )}`}
                  >
                    {couple.category}
                  </span>
                  <span className="text-xs text-slate-400 truncate">
                    {couple.origin}
                  </span>
                </div>

                {/* Main Card Content: Couple names + circular progress */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  {/* Couple Names */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center flex-wrap gap-2 group-hover:text-pink-200 transition-colors">
                      <span className="text-rose-300">{couple.name1}</span>
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0 animate-pulse" />
                      <span className="text-pink-300">{couple.name2}</span>
                    </h3>
                  </div>

                  {/* Animated Circular Meter */}
                  <div className="shrink-0">
                    <CircularProgress
                      score={couple.score}
                      size={105}
                      strokeWidth={8}
                    />
                  </div>
                </div>

                {/* One-Line Story */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  {couple.oneLineStory}
                </p>
              </div>

              {/* 5. Action Buttons: "Calculate Your Own" & "Share on WhatsApp" */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onCalculateCouple(couple.name1, couple.name2)}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-[0_2px_15px_rgba(244,63,94,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Your Own</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(couple)}
                  className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  title="Share this match on WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="sm:hidden">Share on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Call to Action Card */}
      <section className="mt-14 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-pink-500/25">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
            <Heart className="w-6 h-6 text-white fill-white animate-heartbeat" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Curious how you and your partner rank?
            </h3>
            <p className="text-pink-200/70 text-xs sm:text-sm">
              Enter your own names into the Love Calculator to see if you can beat the legends!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onCalculateCouple('', '')}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 shadow-[0_4px_20px_rgba(244,63,94,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap"
        >
          <span>Open Love Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
