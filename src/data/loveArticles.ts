export interface LoveArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
    }[];
    takeaway: string;
  };
  highlightQuote: string;
  iconName: 'Sparkles' | 'HeartHandshake' | 'MessageSquareHeart' | 'Flame' | 'Key' | 'Compass' | 'ShieldCheck' | 'Smile';
}

export const LOVE_ARTICLES: LoveArticle[] = [
  {
    id: 'daily-micro-moments',
    title: 'The Magic of Daily Micro-Moments: Small Gestures That Ignite Lasting Love',
    slug: 'magic-of-daily-micro-moments',
    category: 'Daily Romance',
    readTime: '3 min read',
    excerpt: 'Grand gestures make great movie scenes, but tiny, everyday rituals are the true secret to lifelong emotional intimacy.',
    highlightQuote: 'Love is not preserved in monumental anniversaries, but in the gentle glances exchanged across a crowded kitchen.',
    iconName: 'Sparkles',
    content: {
      introduction:
        'When we picture romance, our minds often gravitate toward grand gestures: candlelit rooftops, overseas surprises, and extravagant bouquets. Yet relationship researchers consistently discover that lasting affection is built upon tiny, recurring micro-moments. These understated interactions signal that your partner remains cherished in the midst of chaotic daily schedules.',
      sections: [
        {
          heading: 'The Power of the 6-Second Kiss',
          body:
            'Dr. John Gottman famously coined the "six-second kiss"—a kiss long enough to pull you out of your hurried mental commute and trigger an oxytocin release. Rushing past each other at the front door creates emotional distance. Pausing for just six intentional seconds communicates that your reunion matters more than your inbox.',
        },
        {
          heading: 'Curated Unexpected Kindness',
          body:
            'Small surprises carry immense psychological warmth. Preparing their morning tea without being asked, sliding an encouraging handwritten note into their bag, or sending a spontaneous text praising something specific they did validates their presence. These micro-deposits into your emotional bank account create a buffer of goodwill during stressful periods.',
        },
        {
          heading: 'Curiosity as an Act of Devotion',
          body:
            'Long-term couples frequently assume they know everything about each other. Fight emotional stagnation by asking fresh, open-ended questions: "What was the most peaceful part of your day?" or "What are you daydreaming about this week?" Genuine curiosity reaffirms that you never take their inner world for granted.',
        },
      ],
      takeaway:
        'Commit to offering at least two intentional micro-moments today. You will discover that intimacy is an evolving garden watered by gentle daily kindness rather than occasional downpours.',
    },
  },
  {
    id: 'five-love-languages',
    title: "Mastering the 5 Love Languages: Speaking Your Partner's Heart Tongue",
    slug: 'mastering-the-5-love-languages',
    category: 'Understanding',
    readTime: '3 min read',
    excerpt: 'Discover why you might be pouring love into your relationship that your partner cannot feel, and how to bridge the gap.',
    highlightQuote: 'Sincere love often gets lost in translation when we love others how we wish to be loved, rather than how they need.',
    iconName: 'HeartHandshake',
    content: {
      introduction:
        'Have you ever poured energy into washing your partner’s car or arranging their desk, only to have them sigh that you haven’t sat down to talk? You weren’t lacking love; you were simply speaking a dialect they couldn’t decode. Dr. Gary Chapman’s five love languages reveal that emotional connection requires tailored fluency.',
      sections: [
        {
          heading: 'Decoding the Core Dialects',
          body:
            'The five languages encompass Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, and Physical Touch. If your primary language is Acts of Service, a cooked dinner feels like poetry. But if your partner thrives on Words of Affirmation, they hunger to hear verbal reassurance: "I appreciate your patience," or "You make my life brighter."',
        },
        {
          heading: 'The Trap of Romantic Projection',
          body:
            'Our default instinct is to offer what would make us feel valued. If you crave physical closeness, you may initiate frequent hugs, oblivious to the fact that your partner feels lonely because your phone never leaves your hand during conversations. Bridging this requires observing what they frequently request or lovingly do for you.',
        },
        {
          heading: 'Bilingual Love Practices',
          body:
            'Sit together and explicitly rank your top two love languages. Frame the conversation around mutual curiosity rather than critique. Ask: "When did you feel most deeply loved by me this past month?" Their answer provides an exact roadmap to their heart.',
        },
      ],
      takeaway:
        'True romance is the willingness to study your partner like your favorite book. When you learn their primary dialect, even modest efforts blossom into profound emotional security.',
    },
  },
  {
    id: 'loving-communication',
    title: 'Active Listening & Conflict: How to Disagree Without Damaging the Bond',
    slug: 'loving-communication-and-conflict',
    category: 'Communication',
    readTime: '3 min read',
    excerpt: 'Arguments are inevitable in any meaningful relationship; the secret lies in turning friction into deeper closeness.',
    highlightQuote: 'In a healthy relationship, the objective of an argument is never victory over your partner, but understanding between you.',
    iconName: 'MessageSquareHeart',
    content: {
      introduction:
        'Disagreements do not signify the end of harmony; rather, they mark the frontier where two distinct personalities negotiate shared life. Couples who never quarrel are often concealing resentment beneath polite silence. The goal of healthy love is not conflict avoidance, but the art of disagreeing while protecting each other’s dignity.',
      sections: [
        {
          heading: 'Separate the Problem from the Person',
          body:
            'When tempers flare, visualize the disagreement as a challenge sitting across the table, with both of you on the same side facing it together. Replace accusatory "You always forget..." statements with vulnerable "I feel overwhelmed when..." reflections. This instantly disarms defensiveness and encourages cooperative teamwork.',
        },
        {
          heading: 'The 10-Second Breath Pause',
          body:
            'During heated discussions, physiological heart rates often exceed 100 beats per minute, triggering fight-or-flight mode. Creative problem-solving shuts down under stress. If you sense anger mounting, request a gentle pause: "I care about this conversation too much to speak rashly. Let us take ten deep breaths and reconvene."',
        },
        {
          heading: 'Reflective Validation Before Response',
          body:
            'Before presenting your counterpoint, summarize what your partner just shared: "What I hear you saying is that you felt unheard during dinner. Did I get that right?" Feeling understood neutralizes eighty percent of conflict before practical compromises are even formulated.',
        },
      ],
      takeaway:
        'Remember that winning an argument at the expense of your partner’s emotional safety is a loss for both of you. Prioritize connection over being right.',
    },
  },
  {
    id: 'creative-date-nights',
    title: 'Budget-Friendly Date Nights That Spark Childlike Joy and Wonder',
    slug: 'budget-friendly-date-nights',
    category: 'Adventure',
    readTime: '3 min read',
    excerpt: 'You do not need expensive reservations to make memories. Reignite romance with imaginative, heartfelt experiences.',
    highlightQuote: 'Magic is not purchased with fancy menus; it is summoned whenever two people decide to play and laugh together.',
    iconName: 'Smile',
    content: {
      introduction:
        'Routine is the silent predator of romance. When every evening devolves into mindless streaming and scrolling on parallel screens, intimacy gradually dulls. You do not need expensive tasting menus or high-end tickets to revive that early-dating flutter; you merely need novelty, anticipation, and an appetite for playful spontaneity.',
      sections: [
        {
          heading: 'The Living Room Stargazing Picnic',
          body:
            'Push your living room furniture to the perimeter, lay out cozy blankets, string fairy lights, and prepare a charcuterie board with simple pantry ingredients. Put phones in airplane mode and curate a playlist of songs that carry nostalgia from the earliest months of your relationship. The ambient transformation feels unexpectedly thrilling.',
        },
        {
          heading: 'The Bookstore Secret Mission',
          body:
            'Visit a local library or bookstore with a quirky challenge: spend twenty minutes finding three books for each other—one that reminds you of their personality, one addressing a topic you both wish to explore, and a children’s book with artwork that makes you smile. Conclude over hot cocoa discussing your picks.',
        },
        {
          heading: 'Cook-Off with a Secret Ingredient',
          body:
            'Emulate television cooking shows by assigning a quirky secret ingredient—like mango, dark chocolate, or smoked paprika—and cooking a dish together using whatever remains in your kitchen. Laughter over culinary experiments often creates far more durable memories than formal dining.',
        },
      ],
      takeaway:
        'Novelty stimulates dopamine in the brain, mirroring the exhilarating neurological state of falling in love. Schedule one unexpected date this week and watch your bond reignite.',
    },
  },
  {
    id: 'emotional-intimacy-questions',
    title: 'Cultivating Emotional Intimacy: 8 Questions That Pierce the Surface',
    slug: 'cultivating-emotional-intimacy',
    category: 'Soul Connection',
    readTime: '3 min read',
    excerpt: 'Move beyond routine chatter about chores and weather with transformative inquiries that open doors into your partner’s soul.',
    highlightQuote: 'To be truly seen and yet deeply cherished is the ultimate human longing.',
    iconName: 'Key',
    content: {
      introduction:
        'Over time, couples easily fall into logistical dialogue: who is grocery shopping, when the laundry is done, or what time tomorrow’s meeting starts. While necessary, operational talk leaves the soul malnourished. Emotional intimacy thrives when you regularly invite each other into current anxieties, evolving dreams, and tender vulnerabilities.',
      sections: [
        {
          heading: 'Inquiries That Unlock Vulnerability',
          body:
            'Replace generic greetings with questions that require reflection. Consider asking: "What is an unspoken fear you have carried this month?" or "What part of your younger self do you miss the most?" Such questions honor the fact that your partner is continuously growing and changing beneath their familiar exterior.',
        },
        {
          heading: 'Holding Space Without Fixing',
          body:
            'When your partner answers honestly, resist the temptation to immediately offer solutions or analyze their feelings. True emotional safety requires empathetic presence. Simply holding their hand and acknowledging: "Thank you for trusting me with that. That sounds so heavy," creates an sanctuary of unconditional acceptance.',
        },
        {
          heading: 'Reflecting on Your Shared Journey',
          body:
            'Deepen intimacy by celebrating how far you have journeyed together: "What is a challenge we conquered as a couple that made you proud of our love?" Reminiscing about shared resilience cements your identity as an unbreakable, dedicated alliance.',
        },
      ],
      takeaway:
        'Intimacy is not a static milestone you achieve; it is a dynamic conversation you continually choose to nurture. Pick one deep question tonight and listen with an open heart.',
    },
  },
  {
    id: 'reigniting-the-flame',
    title: 'Reigniting the Spark: Breathing Passion Back into Everyday Comfort',
    slug: 'reigniting-the-romantic-spark',
    category: 'Passion',
    readTime: '3 min read',
    excerpt: 'Comfort is wonderful, but passion requires mystery. Here is how to keep the romantic sizzle vibrant throughout the years.',
    highlightQuote: 'Passion does not die from conflict; it withers from predictability and unattended routines.',
    iconName: 'Flame',
    content: {
      introduction:
        'Long-term security is one of love’s sweetest blessings, yet extreme predictability can inadvertently dampen passionate chemistry. Erotic and romantic desire flourish in the fertile space between intimacy and intrigue. You don’t need to reinvent your entire relationship to rediscover attraction; you simply need to cultivate deliberate polarity and intentional anticipation.',
      sections: [
        {
          heading: 'Preserving Individual Wholeness',
          body:
            'Psychotherapist Esther Perel notes that passion requires space. When partners merge so completely that they surrender independent hobbies, friendships, and creative passions, there is no distance across which desire can travel. Pursuing personal interests makes you vibrant and fascinating in your partner’s eyes once again.',
        },
        {
          heading: 'Building Anticipation Throughout the Day',
          body:
            'Romance does not begin in the bedroom at bedtime; it is cultivated hours in advance. A midday message hinting at your evening together, a subtle compliment about their appearance before leaving for work, or an lingering gaze across the dinner table builds an irresistible undercurrent of playful tension.',
        },
        {
          heading: 'Breaking the Sensory Routine',
          body:
            'Familiarity dulls our senses. Change your sensory environment: introduce warm amber lamps instead of overhead lights, light aromatic sandalwood candles, or play sultry acoustic jazz. Shifting auditory and visual cues signals to your nervous system that this moment is special and distinct from work.',
        },
      ],
      takeaway:
        'The spark is not something you passively wait to feel; it is a warmth you intentionally stoke. Introduce a whisper of mystery into your routine today.',
    },
  },
  {
    id: 'unshakeable-trust',
    title: 'Building Unshakeable Trust: The Invisible Architecture of Soulmates',
    slug: 'building-unshakeable-trust',
    category: 'Trust & Loyalty',
    readTime: '3 min read',
    excerpt: 'Trust is not built in heroic moments; it is woven through hundreds of tiny commitments kept when nobody else is looking.',
    highlightQuote: 'Trust is the confidence that your partner holds your heart with the same tenderness they hold their own.',
    iconName: 'ShieldCheck',
    content: {
      introduction:
        'Trust is the silent bedrock upon which passion, humor, and emotional vulnerability comfortably rest. When trust is fragile, even harmless jokes trigger suspicion; when trust is rock-solid, couples navigate life’s fiercest storms with serene confidence. Yet trust is rarely established through grand vows; it is built through steady, quiet integrity.',
      sections: [
        {
          heading: 'Reliability in Small Commitments',
          body:
            'Every time you follow through on a promise—whether calling when you said you would or taking care of an errand—you cast a vote for your reliability. Consistently showing up in mundane circumstances assures your partner that you will stand firm during seismic life trials.',
        },
        {
          heading: 'Radical Transparency and Vulnerability',
          body:
            'Secretiveness, even regarding minor matters, breeds emotional shadows. Cultivate an open-book lifestyle where your partner never has to guess your whereabouts, feelings, or motives. Speaking the truth with compassion, especially when admitting a mistake, demonstrates that honesty matters more to you than saving face.',
        },
        {
          heading: 'Protecting Each Other in Public',
          body:
            'Never diminish, mock, or air private grievances about your partner in social gatherings or online. Knowing that you will fiercely protect their dignity in their absence inspires a depth of devotion that superficial charm can never replicate.',
        },
      ],
      takeaway:
        'Treat trust like fine porcelain: handle it with mindful reverence every single day. A trustworthy partner is the rarest, most intoxicating presence in the world.',
    },
  },
  {
    id: 'vulnerability-paradox',
    title: 'The Vulnerability Paradox: Why Lowering Your Armor Unlocks True Love',
    slug: 'the-vulnerability-paradox',
    category: 'Intimacy',
    readTime: '3 min read',
    excerpt: 'We fear that revealing our flaws will drive our partner away, yet courageous openness is the very thing that makes them fall deeper.',
    highlightQuote: 'Vulnerability sounds like courage in you, and weakness in me—until we realize it is the only bridge to genuine belonging.',
    iconName: 'Compass',
    content: {
      introduction:
        'Many of us carry invisible emotional shields forged in past heartbreaks. We present a polished, invincible version of ourselves, fearing that if our partner glimpses our insecurities, clumsiness, or self-doubt, they will pack their bags. Yet vulnerability is not weakness; it is the ultimate proof of romantic courage.',
      sections: [
        {
          heading: 'Perfection Breeds Intimidation, Flaws Breed Love',
          body:
            'Nobody falls in love with an untouchable statue. It is our partner’s human quirks, tender anxieties, and crooked smiles that make our hearts melt. When you confess: "I feel nervous about tomorrow" or "I felt insecure when that happened," you give your partner permission to breathe and be human too.',
        },
        {
          heading: 'Tearing Down the Defense Mechanisms',
          body:
            'Sarcasm, emotional withdrawal, and silent stonewalling are protective armor disguised as strength. Next time you feel hurt, instead of retreating into icy aloofness, try speaking from your core wound: "I am feeling hurt right now, and I really need reassurance." Vulnerability disarms arguments before they start.',
        },
        {
          heading: 'The Sacred Gift of Being Receptive',
          body:
            'When your partner entrusts you with their vulnerable truth, treat it as sacred ground. Never weaponize their past confessions during a future disagreement. Safeguarding their emotional exposure guarantees that your love remains a fortress of safety.',
        },
      ],
      takeaway:
        'Take down your drawbridge. When you dare to be seen fully without disguise, you invite an extraordinary love that loves you for who you genuinely are.',
    },
  },
];
