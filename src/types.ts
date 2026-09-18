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

// الأصابع المستخدمة
export type FingerType =
  | 'thumb'           // الإبهام
  | 'index'           // السبابة
  | 'both_pinch'      // الإبهام والسبابة معاً (حركة القبض)
  | 'left_index';     // سبابة اليد اليسرى (للخانات الكبرى)

// اتجاه الحركة
export type MovementDirection =
  | 'up'              // رفع الخرزات (للجمع)
  | 'down'            // إنزال الخرزات (للطرح)
  | 'pinch_in'        // حركة القبض (ضم الخرزات للعارضة)
  | 'pinch_out';      // فتح القبض (إبعاد الخرزات عن العارضة)

// الخانات المستهدفة
export type ColumnType = 'units' | 'tens' | 'hundreds' | 'thousands';

// خطوة واحدة في الحل
export interface LessonStep {
  /** رقم الخطوة (1، 2، 3...) */
  stepIndex: number;
  /** النص الإرشادي للطفل */
  instructionText: string;
  /** الإصبع المستخدم */
  fingerUsed: FingerType;
  /** اتجاه الحركة */
  direction: MovementDirection;
  /** الخانة المستهدفة */
  targetColumn: ColumnType;
  /** الخرزات المتأثرة (0-4 للسفلية، 5 للعلوية) */
  beadsAffected: number[];
  /** القيمة المتوقعة بعد هذه الخطوة */
  expectedValueAfter: number;
}

// نوع القاعدة في الدرس
export type RuleCategory =
  | 'direct'          // الجمع/الطرح المباشر
  | 'small_friends'   // أصدقاء 5
  | 'big_friends'     // أصدقاء 10
  | 'combined'        // القواعد المركبة
  | 'anzan';          // التصور الذهني

// مثال تعليمي
export interface LessonExample {
  /** النص المعروض للسؤال */
  problemText: string;
  /** الإجابة النهائية */
  answer: number;
  /** نوع القاعدة المستخدمة */
  ruleCategory: RuleCategory;
  /** خطوات الحل */
  steps: LessonStep[];
  /** شرح عام للمثال */
  explanation: string;
  /** القصة المشوقة للطفل */
  story?: string;
}

// وحدة تعليمية
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
  /** القاعدة التعليمية */
  rule: string;
  ruleAr: string;
  /** القصة المشوقة */
  story: string;
  /** أمثلة الدرس */
  examples: LessonExample[];
}

// باقي الأنواع كما هي
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
