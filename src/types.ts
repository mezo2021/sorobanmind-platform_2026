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

export type FingerType = 'thumb' | 'index' | 'both_pinch' | 'left_index';

export type MovementDirection = 'up' | 'down' | 'pinch_in' | 'pinch_out';

export type ColumnType = 'units' | 'tens' | 'hundreds' | 'thousands';

export interface LessonStep {
  stepIndex: number;
  instructionText: string;
  fingerUsed: FingerType;
  direction: MovementDirection;
  targetColumn: ColumnType;
  beadsAffected: number[];
  expectedValueAfter: number;
}

export interface DivisionStep {
  stepIndex: number;
  instructionText: string;
  fingerUsed: FingerType;
  direction: MovementDirection;
  targetColumn: ColumnType;
  beadsAffected: number[];
  expectedAbacusState: number[];
}

export type RuleCategory = 'direct' | 'small_friends' | 'big_friends' | 'combined' | 'anzan' | 'chain';

export interface LessonExample {
  problemText: string;
  answer: number;
  ruleCategory: RuleCategory;
  steps: LessonStep[];
  explanation: string;
  story?: string;
  storyAudioText?: string;
}

export interface DivisionExample {
  problemText: string;
  answer: number;
  ruleCategory: RuleCategory;
  steps: DivisionStep[];
  explanation: string;
  story?: string;
  storyAudioText?: string;
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
  audioText: string;
  rule: string;
  ruleAr: string;
  ruleTable?: { formula: string; result: string }[];
  story: string;
  storyAudioText?: string;
  examples: (LessonExample | DivisionExample)[];
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
  | 'practice' | 'anzan' | 'anzanHighScore' | 'streak' | 'lessons'
  | 'addition' | 'subtraction' | 'multiplication' | 'division'
  | 'chain';

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

// ============================================================
// PracticeQuestion — موسّع بـ lessonId
// ============================================================
export interface PracticeQuestion {
  question: string;
  answer: number;
  choices: number[];
  type?: RuleCategory;
  steps?: LessonStep[];
  /** رقم الدرس المرتبط بالسؤال (1-12) */
  lessonId?: number;
}

// ============================================================
// ChainExercise — تمرين سلسلة طويلة (الدرس 7)
// ============================================================
export interface ChainOperation {
  value: number;
  operator: '+' | '-';
}

export interface ChainExercise {
  id: string;
  /** العمليات المتتالية */
  operations: ChainOperation[];
  /** النتيجة النهائية */
  answer: number;
  /** عدد الصفوف (4-15) */
  rows: number;
  /** عدد المنازل: 1 = آحاد، 2 = عشرات، 3 = مئات */
  digits: 1 | 2 | 3;
  /** اسم المجموعة */
  groupAr: string;
  /** مرتبط بالدرس */
  lessonId: number;
  /** صعوبة: 1-6 */
  difficulty: number;
}

// ============================================================
// AnzanLevelConfig — إعدادات مستويات الأنزان
// ============================================================
export interface AnzanLevelRules {
  /** المستوى المرتبط بالدرس */
  lessonId: number;
  /** مفتاح المستوى (beginner, intermediate, ...) */
  key: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  /** عدد العمليات */
  operationsCount: number;
  /** هل تسمح بالطرح */
  allowSubtract: boolean;
  /** هل تسمح بمنزلتين أو أكثر */
  multiDigit: boolean;
  /** القاعدة المسيطرة: direct | small_friends | big_friends | combined */
  dominantRule: RuleCategory;
  /** أقصى قيمة للعملية الواحدة */
  maxValue: number;
  /** الوصف بالعربية */
  labelAr: string;
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

export interface LessonProgress {
  [lessonId: number]: number[];
}