export type Role = 'hero' | 'guardian' | null;

export type Screen =
  | 'role'
  | 'hero-dashboard'
  | 'learn'
  | 'practice'
  | 'anzan'
  | 'quests'
  | 'soroban'
  | 'guardian-dashboard';

export type LearnModuleStatus = 'locked' | 'available' | 'completed';

export type FingerType = 'thumb' | 'index' | 'both';

export type MovementType =
  | 'raise-lower'
  | 'pinch'
  | 'open'
  | 'small-friend'
  | 'big-friend';

export interface MovementStep {
  /** نوع الحركة: رفع، إنزال، قبض، فتح */
  movement: MovementType;
  /** عدد الخرزات السفلية */
  lowerBeads?: number;
  /** هل الخرزة العلوية تُفعّل؟ */
  upperBead?: boolean;
  /** الإصبع المستخدم */
  finger: FingerType;
  /** نص شرح الحركة */
  explanation: string;
}

export interface LessonExample {
  /** السؤال المعروض */
  question: string;
  /** القيمة المطلوبة */
  targetValue: number;
  /** نوع العملية: مباشرة، صديق صغير، صديق كبير */
  type: 'direct' | 'small-friend' | 'big-friend';
  /** خطوات الحل */
  steps: MovementStep[];
  /** الشرح العام */
  explanation: string;
}

export interface LearnModule {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  status: LearnModuleStatus;
  beads: { upper: number; lower: number };
  value: number;
  concept: string;
  conceptAr: string;
  icon: string;
  /** النص الصوتي للدرس */
  audioText: string;
  /** القاعدة التعليمية في هذا الدرس */
  rule: string;
  ruleAr: string;
  /** أمثلة الدرس */
  examples: LessonExample[];
}

export interface LevelNode {
  id: number;
  name: string;
  nameAr: string;
  status: LearnModuleStatus;
  icon: string;
  xpRequired: number;
}

export type QuestType =
  | 'practice'
  | 'anzan'
  | 'anzanHighScore'
  | 'streak'
  | 'lessons'
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division';

export interface Quest {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  xpReward: number;
  progress: number;
  target: number;
  icon: string;
  color: string;
  type: QuestType;
}

export interface PracticeQuestion {
  question: string;
  answer: number;
  choices: number[];
  /** نوع السؤال */
  type?: 'direct' | 'small-friend' | 'big-friend';
  /** الخطوات الصحيحة */
  steps?: MovementStep[];
}

export interface Badge {
  id: string;
  nameAr: string;
  xpRequired: number;
  icon: string;
}

export interface GameStats {
  xp: number;
  streak: number;
  level: number;
  soundEnabled: boolean;
  earnedBadges: string[];
}

export interface ProgressData {
  totalProblems: number;
  correctAnswers: number;
  averageSpeed: number;
  lessonsCompleted: number;
  anzanHighScore: number;
  weeklyXP: { day: string; xp: number }[];
}
