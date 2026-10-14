import React, { useState } from 'react';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

interface LoveFormProps {
  onCalculate: (name1: string, name2: string) => void;
  initialName1?: string;
  initialName2?: string;
}

export const LoveForm: React.FC<LoveFormProps> = ({
  onCalculate,
  initialName1 = '',
  initialName2 = '',
}) => {
  const [name1, setName1] = useState(initialName1);
  const [name2, setName2] = useState(initialName2);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed1 = name1.trim();
    const trimmed2 = name2.trim();

    if (!trimmed1 && !trimmed2) {
      setError('Please enter both names to reveal your love compatibility!');
      return;
    }
    if (!trimmed1) {
      setError('Please enter your name!');
      return;
    }
    if (!trimmed2) {
      setError("Please enter your partner's name!");
      return;
    }
    if (trimmed1.length < 2 || trimmed2.length < 2) {
      setError('Each name should be at least 2 characters long.');
      return;
    }

    setError(null);
    onCalculate(trimmed1, trimmed2);
  };

  const handlePreset = (n1: string, n2: string) => {
    setName1(n1);
    setName2(n2);
    setError(null);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 max-w-lg w-full mx-auto relative z-10 transition-all duration-300">
      {/* Decorative top soft glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input 1: Your Name */}
        <div className="space-y-2">
          <label
            htmlFor="your-name"
            className="block text-sm font-medium text-pink-200/90"
          >
            Your Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-400 group-focus-within:text-rose-300 transition-colors">
              <Heart className="w-5 h-5 fill-rose-500/20 text-rose-400" />
            </div>
            <input
              id="your-name"
              type="text"
              value={name1}
              onChange={(e) => {
                setName1(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Juliet"
              maxLength={40}
              className="glass-input w-full pl-11 pr-4 py-3.5 rounded-2xl text-white placeholder-pink-300/40 text-base focus:ring-2 focus:ring-rose-500/50"
            />
          </div>
        </div>

        {/* Center Interlocking Heart */}
        <div className="flex items-center justify-center -my-2 relative">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
          <div className="mx-3 w-10 h-10 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-600/30 border border-pink-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <Heart className="w-5 h-5 text-rose-300 fill-rose-400 animate-pulse" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
        </div>

        {/* Input 2: Partner's Name */}
        <div className="space-y-2">
          <label
            htmlFor="partner-name"
            className="block text-sm font-medium text-pink-200/90"
          >
            Partner's Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-400 group-focus-within:text-pink-300 transition-colors">
              <Heart className="w-5 h-5 fill-pink-500/20 text-pink-400" />
            </div>
            <input
              id="partner-name"
              type="text"
              value={name2}
              onChange={(e) => {
                setName2(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Romeo"
              maxLength={40}
              className="glass-input w-full pl-11 pr-4 py-3.5 rounded-2xl text-white placeholder-pink-300/40 text-base focus:ring-2 focus:ring-pink-500/50"
            />
          </div>
        </div>

        {/* Validation Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-sm animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Calculate Love Button with Pulse & Glow */}
        <button
          type="submit"
          className="w-full relative group py-4 px-6 rounded-2xl font-semibold text-white tracking-wide text-base md:text-lg overflow-hidden transition-all duration-300 cursor-pointer bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:via-pink-500 hover:to-rose-500 shadow-[0_4px_25px_rgba(244,63,94,0.45)] hover:shadow-[0_6px_35px_rgba(244,63,94,0.7)] hover:scale-[1.01] active:scale-[0.99] animate-pulse-glow"
        >
          <div className="flex items-center justify-center gap-2.5 relative z-10">
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
            <span>Calculate Love</span>
            <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform duration-300" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </button>
      </form>

      {/* Quick fun couples preset tags */}
      <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
        <span className="text-xs text-pink-300/70 font-medium block mb-2.5">
          Or try a legendary couple:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { n1: 'Romeo', n2: 'Juliet' },
            { n1: 'Jack', n2: 'Rose' },
            { n1: 'Bonnie', n2: 'Clyde' },
            { n1: 'Jim', n2: 'Pam' },
          ].map((pair) => (
            <button
              key={`${pair.n1}-${pair.n2}`}
              type="button"
              onClick={() => handlePreset(pair.n1, pair.n2)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-pink-500/40 text-pink-200 transition-all duration-200 cursor-pointer"
            >
              {pair.n1} &amp; {pair.n2}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
