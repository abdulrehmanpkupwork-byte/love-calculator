import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowLeft,
  Heart,
  Clock,
  Share2,
  Check,
  Search,
  BookOpen,
  ArrowRight,
  HeartHandshake,
  MessageSquareHeart,
  Flame,
  Key,
  Compass,
  ShieldCheck,
  Smile,
  Quote,
} from 'lucide-react';
import { LOVE_ARTICLES, LoveArticle } from '../data/loveArticles';

interface LoveTipsPageProps {
  onNavigateToCalculator: () => void;
  selectedArticleId?: string | null;
  onSelectArticle: (id: string | null) => void;
}

const iconMap = {
  Sparkles,
  HeartHandshake,
  MessageSquareHeart,
  Flame,
  Key,
  Compass,
  ShieldCheck,
  Smile,
};

export const LoveTipsPage: React.FC<LoveTipsPageProps> = ({
  onNavigateToCalculator,
  selectedArticleId,
  onSelectArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Retrieve current active article if selected
  const activeArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return LOVE_ARTICLES.find((a) => a.id === selectedArticleId) || null;
  }, [selectedArticleId]);

  // Categories list
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(LOVE_ARTICLES.map((a) => a.category)))];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return LOVE_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleShareWhatsApp = (article: LoveArticle) => {
    const text = encodeURIComponent(
      `💖 Read this romantic tip: "${article.title}"\n\n"${article.highlightQuote}"\n\nCheck out the Love Tips & Love Calculator here: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = async (article: LoveArticle) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          `💖 ${article.title}\n\n"${article.highlightQuote}"\n\n${window.location.origin}?page=tips&article=${article.id}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  // -------------------------------------------------------------
  // Full Article View
  // -------------------------------------------------------------
  if (activeArticle) {
    const IconComponent = iconMap[activeArticle.iconName] || Sparkles;

    return (
      <div className="max-w-3xl w-full mx-auto px-4 py-6 sm:py-10 relative z-10 animate-in fade-in duration-300">
        {/* Back navigation button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelectArticle(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-pink-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-pink-500/30 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-pink-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Love Tips</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToCalculator}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-pink-300 hover:text-white transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Go to Love Calculator</span>
          </button>
        </div>

        {/* Main Article Glass Card */}
        <article className="glass-panel rounded-3xl p-6 sm:p-10 border border-pink-500/20 shadow-2xl relative overflow-hidden">
          {/* Ambient header glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Meta header */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
            <span className="px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 font-semibold tracking-wide">
              {activeArticle.category}
            </span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-pink-400/80" />
              <span>{activeArticle.readTime}</span>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 leading-tight">
            {activeArticle.title}
          </h1>

          {/* Highlight Quote Box */}
          <div className="glass-panel-subtle rounded-2xl p-4 sm:p-5 mb-8 border border-pink-500/25 bg-pink-950/20 relative">
            <Quote className="w-8 h-8 text-rose-400/30 absolute top-3 right-4 pointer-events-none" />
            <p className="text-pink-200 text-sm sm:text-base italic font-serif leading-relaxed pr-6">
              &ldquo;{activeArticle.highlightQuote}&rdquo;
            </p>
          </div>

          {/* Article Content */}
          <div className="space-y-6 text-slate-200 text-base leading-relaxed">
            <p className="text-pink-100/90 text-lg font-light leading-relaxed">
              {activeArticle.content.introduction}
            </p>

            {activeArticle.content.sections.map((section, idx) => (
              <div key={idx} className="pt-2">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {section.heading}
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {section.body}
                </p>
              </div>
            ))}

            {/* Key Takeaway Box */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-pink-950/40 border border-pink-500/30">
              <div className="flex items-center gap-2 text-pink-300 font-semibold text-sm mb-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Golden Love Takeaway</span>
              </div>
              <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
                {activeArticle.content.takeaway}
              </p>
            </div>
          </div>

          {/* Share Actions */}
          <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-pink-300/70 font-medium">
              Share this insight with your partner:
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleShareWhatsApp(activeArticle)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyLink(activeArticle)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-pink-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-pink-300" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </article>

        {/* Bottom Prompts: Back to Love Tips + CTA to Love Calculator */}
        <div className="mt-8 space-y-4">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 text-center border border-pink-500/20 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <Heart className="w-6 h-6 text-white fill-white animate-heartbeat" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to Test Your Cosmic Connection?
            </h3>
            <p className="text-pink-200/80 text-sm max-w-md mx-auto mb-6">
              Put these love principles to the test! Enter your names in our Love Calculator to discover your romance score and relationship dynamics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onNavigateToCalculator}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 shadow-[0_4px_25px_rgba(244,63,94,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate Your Love Score</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectArticle(null)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl font-medium text-pink-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Love Tips</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Articles Listing View (8 Cards)
  // -------------------------------------------------------------
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 sm:py-10 relative z-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Wisdom for True Romantics</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 drop-shadow-[0_4px_25px_rgba(244,63,94,0.35)]">
          Romantic Wisdom &amp; Love Tips
        </h1>

        <p className="text-base sm:text-lg text-pink-200/80 font-light max-w-xl mx-auto leading-relaxed">
          Curated relationship insights, psychology-backed secrets, and heartfelt advice to cultivate unbreakable soulmate connections.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-400'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] text-pink-200/80 border border-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-pink-400/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tips..."
              className="glass-input w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm text-white placeholder-pink-300/40 focus:ring-2 focus:ring-rose-500/40"
            />
          </div>
        </div>
      </div>

      {/* 8 Article Cards Grid */}
      {filteredArticles.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto">
          <BookOpen className="w-10 h-10 text-pink-400/50 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">No tips found</h3>
          <p className="text-slate-400 text-sm mb-4">
            Try adjusting your search query or switching categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => {
            const Icon = iconMap[article.iconName] || Sparkles;

            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.08] hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:shadow-[0_10px_30px_rgba(244,63,94,0.18)] hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Ambient hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/15 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-pink-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-rose-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-300 transition-colors leading-snug">
                      {article.title}
                    </h2>
                  </div>

                  {/* Excerpt */}
                  <p className="text-slate-300/80 text-sm leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer read action */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-pink-300/80 italic line-clamp-1 pr-2">
                    &ldquo;{article.highlightQuote}&rdquo;
                  </span>

                  <span className="text-xs sm:text-sm font-semibold text-rose-400 group-hover:text-rose-300 flex items-center gap-1 shrink-0">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating CTA Card to Love Calculator */}
      <div className="mt-14 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-pink-500/25">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
            <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Haven't calculated your love match yet?
            </h3>
            <p className="text-pink-200/70 text-xs sm:text-sm">
              Discover your romantic compatibility percentage and cosmic harmony.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNavigateToCalculator}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 shadow-[0_4px_20px_rgba(244,63,94,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap"
        >
          <span>Open Love Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
