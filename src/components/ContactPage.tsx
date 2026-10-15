import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  HelpCircle,
  Heart,
  ExternalLink,
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Is the Love Calculator accurate?',
    answer:
      'Our Love Calculator uses a deterministic name-resonance algorithm that factors in letter harmonics, romantic numerology, and character symmetry. While the results are always consistent for the same two names, this app is created purely for entertainment, fun, and bringing smiles to couples and friends!',
  },
  {
    question: 'Is it completely free to use?',
    answer:
      'Yes, 100% free! You can calculate compatibility for as many names as you wish, explore all love tips, and check famous couple scores without any subscriptions, paywalls, or accounts.',
  },
  {
    question: 'Do you store our names or personal data?',
    answer:
      'Never! Your privacy is sacred. All calculations run strictly in your web browser (client-side). No names, scores, or messages are ever stored in a database or tracked on our servers.',
  },
  {
    question: 'How can I suggest a new feature or famous couple?',
    answer:
      'We welcome your creative ideas! Simply drop us a note using the contact form above, send an email to abdulrehmansheikh030347@gmail.com, or reach out directly on WhatsApp.',
  },
];

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }
    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }
    if (!subject.trim()) {
      setError('Please provide a subject for your message.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your message.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Your message should be at least 10 characters long.');
      return;
    }

    setError(null);

    // Prepare mailto link to abdulrehmansheikh030347@gmail.com
    const emailTo = 'abdulrehmansheikh030347@gmail.com';
    const emailSubject = encodeURIComponent(`[Love Calculator] ${subject.trim()}`);
    const emailBody = encodeURIComponent(
      `Hello Love Calculator Team,\n\n${message.trim()}\n\n---\nSender: ${name.trim()}\nEmail: ${email.trim()}`
    );

    // Open user's email client
    const mailtoUrl = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;

    // Show friendly success confirmation card
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setError(null);
    setIsSubmitted(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-6 sm:py-10 relative z-10 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 drop-shadow-[0_4px_25px_rgba(244,63,94,0.35)]">
          Contact Us
        </h1>

        <p className="text-base sm:text-lg text-pink-200/80 font-light max-w-xl mx-auto leading-relaxed">
          We would love to hear from you! Have feedback, questions, or romantic ideas for the calculator? Reach out anytime.
        </p>
      </section>

      {/* 2. Contact Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Email Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.35)] group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs uppercase tracking-wider text-pink-300/80 font-semibold block mb-1">
                Email Us Directly
              </span>
              <a
                href="mailto:abdulrehmansheikh030347@gmail.com"
                className="text-base sm:text-lg font-medium text-white hover:text-pink-300 transition-colors break-all flex items-center gap-1.5 group/link"
              >
                <span>abdulrehmansheikh030347@gmail.com</span>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover/link:opacity-100 shrink-0" />
              </a>
              <p className="text-xs text-slate-400 mt-2">
                We typically reply within 24 hours. Feel free to send suggestions, inquiries, or greetings!
              </p>
            </div>
          </div>
        </div>

        {/* Phone & WhatsApp Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs uppercase tracking-wider text-emerald-300/90 font-semibold block mb-1">
                Phone &amp; WhatsApp
              </span>
              <div className="flex items-center gap-2 mb-3">
                <a
                  href="tel:03034787130"
                  className="text-base sm:text-lg font-medium text-white hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>03034787130</span>
                </a>
              </div>

              {/* Green WhatsApp Chat Button */}
              <a
                href="https://wa.me/923034787130"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20ba59] shadow-[0_4px_15px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact Form / Confirmation Card */}
      <section className="mb-16">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-pink-500/20 shadow-2xl relative overflow-hidden">
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {isSubmitted ? (
            /* Thank you confirmation state */
            <div className="text-center py-8 sm:py-12 max-w-md mx-auto animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto mb-5 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Thank You, {name}!
              </h2>
              <p className="text-pink-100/80 text-sm sm:text-base leading-relaxed mb-6">
                Your email client has been prepared with your message to <strong>abdulrehmansheikh030347@gmail.com</strong>. We look forward to reading your thoughts!
              </p>
              <button
                type="button"
                onClick={handleResetForm}
                className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-[0_2px_15px_rgba(244,63,94,0.35)] transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* Active Form */
            <div>
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2.5">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                  <span>Send Us a Message</span>
                </h2>
                <p className="text-pink-200/70 text-sm">
                  Fill in the details below and we will get back to you promptly.
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-sm animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-medium text-pink-200/90">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="e.g. Juliet Johnson"
                      className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-pink-300/40 text-sm focus:ring-2 focus:ring-rose-500/40"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-medium text-pink-200/90">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="e.g. juliet@example.com"
                      className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-pink-300/40 text-sm focus:ring-2 focus:ring-rose-500/40"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-pink-200/90">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="e.g. Love Calculator feedback or feature suggestion"
                    className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-pink-300/40 text-sm focus:ring-2 focus:ring-rose-500/40"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-medium text-pink-200/90">
                    Your Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Write your feedback, question, or story here..."
                    className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-pink-300/40 text-sm focus:ring-2 focus:ring-rose-500/40 resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 shadow-[0_4px_25px_rgba(244,63,94,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm sm:text-base"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 4. Short FAQ Section (4 Questions) */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
            <span>Common Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-panel-subtle rounded-2xl border border-white/[0.08] hover:border-pink-500/30 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-pink-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
