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

// ============================================================
// الأصابع والحركات (للسوروبان)
// ============================================================

export type FingerType =
  | 'thumb'           // الإبهام
  | 'index'           // السبابة
  | 'both_pinch'      // الإبهام والسبابة معاً (حركة القبض)
  | 'left_index';     // سبابة اليد اليسرى

export type MovementDirection =
  | 'up'              // رفع الخرزات
  | 'down'            // إنزال الخرزات
  | 'pinch_in'        // حركة القبض (ضم للعارضة)
  | 'pinch_out';      // فتح القبض (إبعاد عن العارضة)

export type ColumnType = 'units' | 'tens' | 'hundreds' | 'thousands';

// ============================================================
// خطوات الدروس العادية (جمع، طرح، أصدقاء 5، أصدقاء 10...)
// ============================================================

export interface LessonStep {
  stepIndex: number;
  instructionText: string;
  fingerUsed: FingerType;
  direction: MovementDirection;
  targetColumn: ColumnType;
  beadsAffected: number[];
  expectedValueAfter: number;
}

// ============================================================
// خطوات القسمة (مع حالة المعداد المتوقعة)
// ============================================================

export interface DivisionStep {
  stepIndex: number;
  instructionText: string;
  fingerUsed: FingerType;
  direction: MovementDirection;
  targetColumn: ColumnType;
  beadsAffected: number[];
  /** حالة المعداد المتوقعة بعد هذه الخطوة: [وحدات، عشرات، مئات، آلاف] */
  expectedAbacusState: number[];
}

// ============================================================
// أنواع القواعد
// ============================================================

export type RuleCategory =
  | 'direct'
  | 'small_friends'
  | 'big_friends'
  | 'combined'
  | 'anzan';

// ============================================================
// مثال تعليمي عادي
// ============================================================

export interface LessonExample {
  problemText: string;
  answer: number;
  ruleCategory: RuleCategory;
  steps: LessonStep[];
  explanation: string;
  story?: string;
}

// ============================================================
// مثال قسمة
// ============================================================

export interface DivisionExample {
  id: string;
  problemText: string;
  ruleCategory: RuleCategory;
  steps: DivisionStep[];
  explanation: string;
}

// ============================================================
// وحدة تعليمية
// ============================================================

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
  audioText: string;
  rule: string;
  ruleAr: string;
  story: string;
  examples: (LessonExample | DivisionExample)[];
}

// ============================================================
// باقي الأنواع كما هي
// ============================================================

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
  type?: RuleCategory;
  steps?: LessonStep[];
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
