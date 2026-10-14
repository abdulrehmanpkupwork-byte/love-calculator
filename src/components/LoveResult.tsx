import React, { useEffect, useState } from 'react';
import { Heart, RotateCcw, Share2, Check, Sparkles, Flame, Shield, MessageCircleHeart } from 'lucide-react';
import { LoveResultData } from '../utils/loveAlgorithm';
import { CircularProgress } from './CircularProgress';
import { fireLoveConfetti } from '../utils/confetti';
import { soundFx } from '../utils/sound';

interface LoveResultProps {
  data: LoveResultData;
  onReset: () => void;
}

export const LoveResult: React.FC<LoveResultProps> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Play celebratory sound
    soundFx.playCelebrationChime();

    // Trigger confetti if score is above 80%
    if (data.score >= 80) {
      fireLoveConfetti();
    }
  }, [data.score]);

  const shareText = `💘 ${data.name1} & ${data.name2} scored ${data.score}% on the Love Calculator! Outcome: "${data.title}" ✨ Calculate your romantic compatibility here:`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://lovecalculator.app';

  const handleShareWhatsApp = () => {
    const encodedText = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  // Badge gradient based on tier
  const getBadgeStyle = () => {
    switch (data.tier) {
      case 'soulmates':
        return 'bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)]';
      case 'great_match':
        return 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]';
      case 'spark':
        return 'bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'just_friends':
      default:
        return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]';
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 max-w-xl w-full mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-500">
      {/* Top romantic badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border border-white/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-pink-200">{data.badge}</span>
        </div>

        {/* Couples Names Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-3">
          <span className="text-rose-300 truncate max-w-[180px]">{data.name1}</span>
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 shrink-0 animate-heartbeat" />
          <span className="text-pink-300 truncate max-w-[180px]">{data.name2}</span>
        </h2>
      </div>

      {/* Central Animated Circular Meter */}
      <div className="my-6 flex justify-center">
        <CircularProgress score={data.score} />
      </div>

      {/* Tier Title and Tagline */}
      <div className="text-center mb-6">
        <div className="inline-block px-5 py-1.5 rounded-full text-sm font-bold tracking-wide mb-2 shadow-lg">
          <span className={`px-4 py-1 rounded-full ${getBadgeStyle()}`}>
            {data.title}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-pink-200/70 italic mt-2">
          &ldquo;{data.quote}&rdquo;
        </p>
      </div>

      {/* Description Body */}
      <div className="glass-panel-subtle rounded-2xl p-4 sm:p-5 mb-6 text-slate-200 text-sm leading-relaxed border border-pink-500/10">
        <p className="mb-3">{data.description}</p>
        <div className="pt-3 border-t border-white/[0.08] flex items-start gap-2.5 text-xs text-pink-300/90">
          <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 fill-rose-400" />
          <span><strong>Love Advice:</strong> {data.advice}</span>
        </div>
      </div>

      {/* Compatibility Trait Metrics Breakdown */}
      <div className="space-y-3 mb-8">
        <div className="text-xs font-medium text-pink-300/80 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Harmonic Breakdown</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.metrics.map((metric) => (
            <div
              key={metric.label}
              className="glass-panel-subtle rounded-xl p-3 border border-white/[0.06] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-200 font-medium">{metric.label}</span>
                <span className="font-mono text-pink-300 font-semibold tabular-nums">
                  {metric.value}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons: WhatsApp Share & Try Again */}
      <div className="space-y-3">
        {/* WhatsApp Share Button */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full py-3.5 px-5 rounded-2xl font-semibold text-white tracking-wide text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer bg-[#25D366] hover:bg-[#20ba59] shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.5)] active:scale-[0.99]"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.571 5.942l-1.671 6.108 6.278-1.645c1.7 1 3.659 1.595 5.822 1.595 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
          </svg>
          <span>Share on WhatsApp</span>
        </button>

        {/* Action Row: Copy Link & Try Again */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={handleCopyLink}
            className="py-3 px-4 rounded-xl font-medium text-xs sm:text-sm text-pink-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-pink-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Result Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-pink-300" />
                <span>Copy Result Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="py-3 px-4 rounded-xl font-medium text-xs sm:text-sm text-white bg-gradient-to-r from-rose-600/70 to-pink-600/70 hover:from-rose-500 hover:to-pink-500 border border-rose-500/30 flex items-center justify-center gap-2 transition-all shadow-[0_2px_15px_rgba(244,63,94,0.3)] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-white" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
