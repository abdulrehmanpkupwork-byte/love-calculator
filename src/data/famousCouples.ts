import { calculateLoveScore } from '../utils/loveAlgorithm';

export type CoupleCategory = 'Classic Romance' | 'Epic Love Stories' | 'Movie Couples' | 'Legendary Love';

export interface FamousCouple {
  id: string;
  name1: string;
  name2: string;
  category: CoupleCategory;
  categoryGroup: 'Classic' | 'Epic' | 'Movies' | 'Legendary';
  oneLineStory: string;
  origin: string;
  score: number;
}

const RAW_FAMOUS_COUPLES: Omit<FamousCouple, 'score'>[] = [
  {
    id: 'romeo-juliet',
    name1: 'Romeo',
    name2: 'Juliet',
    category: 'Classic Romance',
    categoryGroup: 'Classic',
    oneLineStory: 'Star-crossed lovers whose passionate devotion in Verona defied feuding families for eternity.',
    origin: 'Shakespearean Classic',
  },
  {
    id: 'jack-rose',
    name1: 'Jack',
    name2: 'Rose',
    category: 'Movie Couples',
    categoryGroup: 'Movies',
    oneLineStory: 'An unforgettable romance that blossomed across social classes aboard the ill-fated Titanic.',
    origin: 'Cinematic Masterpiece (1997)',
  },
  {
    id: 'heer-ranjha',
    name1: 'Heer',
    name2: 'Ranjha',
    category: 'Epic Love Stories',
    categoryGroup: 'Epic',
    oneLineStory: 'Punjab’s timeless folklore of mystical devotion, sacred music, and eternal spiritual union.',
    origin: 'Punjabi Epic Folklore',
  },
  {
    id: 'laila-majnu',
    name1: 'Laila',
    name2: 'Majnu',
    category: 'Epic Love Stories',
    categoryGroup: 'Epic',
    oneLineStory: 'The legendary Arabian tale of Qais whose divine love for Laila drove him passionately mad.',
    origin: 'Arabian & Persian Legend',
  },
  {
    id: 'sohni-mahiwal',
    name1: 'Sohni',
    name2: 'Mahiwal',
    category: 'Epic Love Stories',
    categoryGroup: 'Epic',
    oneLineStory: 'A brave heroine who swam across the churning Chenab river every night on an earthen pot for love.',
    origin: 'South Asian Legend',
  },
  {
    id: 'shirin-farhad',
    name1: 'Shirin',
    name2: 'Farhad',
    category: 'Legendary Love',
    categoryGroup: 'Legendary',
    oneLineStory: 'The devoted stonecutter who carved a tunnel straight through Mount Bisitun to win his princess.',
    origin: 'Classical Persian Literature',
  },
  {
    id: 'mumtaz-shah-jahan',
    name1: 'Mumtaz',
    name2: 'Shah Jahan',
    category: 'Legendary Love',
    categoryGroup: 'Legendary',
    oneLineStory: 'A deep imperial bond commemorated by the Taj Mahal—the world’s most famous monument to love.',
    origin: 'Mughal History',
  },
  {
    id: 'antony-cleopatra',
    name1: 'Antony',
    name2: 'Cleopatra',
    category: 'Classic Romance',
    categoryGroup: 'Classic',
    oneLineStory: 'A powerful Roman triumvir and the Queen of Egypt whose love reshaped empires.',
    origin: 'Ancient History & Drama',
  },
  {
    id: 'rama-sita',
    name1: 'Rama',
    name2: 'Sita',
    category: 'Legendary Love',
    categoryGroup: 'Legendary',
    oneLineStory: 'The divine embodiment of unswerving loyalty, mutual devotion, and cosmic dharma.',
    origin: 'The Ramayana Epic',
  },
  {
    id: 'radha-krishna',
    name1: 'Radha',
    name2: 'Krishna',
    category: 'Legendary Love',
    categoryGroup: 'Legendary',
    oneLineStory: 'The supreme celestial manifestation of unconditional, joyful spiritual intimacy and divine love.',
    origin: 'Ancient Indian Lore',
  },
  {
    id: 'cinderella-prince-charming',
    name1: 'Cinderella',
    name2: 'Prince Charming',
    category: 'Classic Romance',
    categoryGroup: 'Classic',
    oneLineStory: 'A glass slipper and an enchanted midnight dance that brought two destiny-bound hearts together.',
    origin: 'Classic Fairy Tale',
  },
  {
    id: 'beauty-beast',
    name1: 'Beauty',
    name2: 'Beast',
    category: 'Movie Couples',
    categoryGroup: 'Movies',
    oneLineStory: 'A tale as old as time proving that sincere empathy and kindness transform even cursed hearts.',
    origin: 'Classic Tale & Animation',
  },
  {
    id: 'aladdin-jasmine',
    name1: 'Aladdin',
    name2: 'Jasmine',
    category: 'Movie Couples',
    categoryGroup: 'Movies',
    oneLineStory: 'A street-smart dreamer and an independent princess discovering a whole new world together.',
    origin: 'One Thousand and One Nights',
  },
  {
    id: 'tristan-isolde',
    name1: 'Tristan',
    name2: 'Isolde',
    category: 'Classic Romance',
    categoryGroup: 'Classic',
    oneLineStory: 'A medieval romance of knightly chivalry, a fateful love potion, and unbreakable eternal longing.',
    origin: 'Celtic & Arthurian Legend',
  },
  {
    id: 'lancelot-guinevere',
    name1: 'Lancelot',
    name2: 'Guinevere',
    category: 'Classic Romance',
    categoryGroup: 'Classic',
    oneLineStory: 'The noble First Knight of the Round Table and his queen whose fierce love challenged Camelot.',
    origin: 'Arthurian Chivalric Romance',
  },
  {
    id: 'layla-qais',
    name1: 'Layla',
    name2: 'Qais',
    category: 'Epic Love Stories',
    categoryGroup: 'Epic',
    oneLineStory: 'The poetic lovers whose eternal longing in the Arabian sands became the blueprint for devotion.',
    origin: 'Nizami Ganjavi Poetry',
  },
];

// Calculate score using the EXACT SAME algorithm as the main Love Calculator
export const FAMOUS_COUPLES: FamousCouple[] = RAW_FAMOUS_COUPLES.map((couple) => ({
  ...couple,
  score: calculateLoveScore(couple.name1, couple.name2),
}));
