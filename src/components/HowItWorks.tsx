import React from 'react';
import { UserCheck, Binary, Sparkles } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Enter Your Names',
    description: 'Type in your name and your partner’s or crush’s name. Any two names can reveal a unique cosmic signature.',
    icon: UserCheck,
    accent: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
  },
  {
    step: '02',
    title: 'Harmonic Algorithm',
    description: 'Our consistent name-resonance engine calculates letter harmony and numerological compatibility without randomness.',
    icon: Binary,
    accent: 'from-rose-500/20 to-purple-500/20',
    iconColor: 'text-rose-400',
  },
  {
    step: '03',
    title: 'Celebrate & Share',
    description: 'Discover your love percentage, read custom insights, and share your score directly on WhatsApp with your friends!',
    icon: Sparkles,
    accent: 'from-amber-500/20 to-pink-500/20',
    iconColor: 'text-amber-300',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="max-w-4xl w-full mx-auto mt-20 sm:mt-28 px-4 relative z-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-pink-300 bg-pink-500/10 border border-pink-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Simple &amp; Sweet</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          How It Works
        </h2>
        <p className="text-pink-200/70 text-sm sm:text-base mt-2 max-w-md mx-auto">
          Three gentle steps to uncover the magnetic chemistry between two names.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="glass-panel-subtle rounded-3xl p-6 sm:p-7 relative border border-white/[0.08] hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-pink-400/50">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
