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

export type RuleCategory = 'direct' | 'small_friends' | 'big_friends' | 'combined' | 'anzan';

export interface LessonExample {
  problemText: string;
  answer: number;
  ruleCategory: RuleCategory;
  steps: LessonStep[];
  explanation: string;
  story?: string;
}

export interface DivisionExample {
  problemText: string;
  answer: number;
  ruleCategory: RuleCategory;
  steps: DivisionStep[];
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
  audioText: string;
  rule: string;
  ruleAr: string;
  story: string;
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
  | 'addition' | 'subtraction' | 'multiplication' | 'division';

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

// تتبع تقدم كل درس: كم مثالاً تم حله
export interface LessonProgress {
  [lessonId: number]: number[]; // مصفوفة معرفات الأمثلة المحلولة
}
