// ============================================================
// data.ts — الملف الرئيسي (الجزء الأول)
// ============================================================

import type {
  LevelNode,
  LearnModule,
  Quest,
  PracticeQuestion,
  ChainExercise,
} from './types';

// ═══════════════════════════════════════════════════════════
// المستويات (10 مستويات مُصحّحة)
// ═══════════════════════════════════════════════════════════
export const LEVELS: LevelNode[] = [
  { id: 0, name: 'Finger Math', nameAr: 'رياضيات الأصابع', status: 'available', icon: 'Hand', xpRequired: 0 },
  { id: 1, name: 'Soroban Intro', nameAr: 'تعريف السوروبان', status: 'locked', icon: 'Info', xpRequired: 100 },
  { id: 2, name: 'Number Representation', nameAr: 'تمثيل الأعداد', status: 'locked', icon: 'Hash', xpRequired: 250 },
  { id: 3, name: 'Direct Operations', nameAr: 'العمليات المباشرة', status: 'locked', icon: 'Plus', xpRequired: 500 },
  { id: 4, name: 'Small Friends - Addition', nameAr: 'متممات الخمسة — جمع', status: 'locked', icon: 'Combine', xpRequired: 900 },
  { id: 5, name: 'Small Friends - Subtraction', nameAr: 'متممات الخمسة — طرح', status: 'locked', icon: 'Minus', xpRequired: 1400 },
  { id: 6, name: 'Big Friends - Addition', nameAr: 'مكملات العشرة — جمع', status: 'locked', icon: 'Sigma', xpRequired: 2200 },
  { id: 7, name: 'Big Friends - Subtraction', nameAr: 'مكملات العشرة — طرح', status: 'locked', icon: 'Sigma', xpRequired: 3000 },
  { id: 8, name: 'Magic Merge', nameAr: 'الاندماج السحري', status: 'locked', icon: 'Brain', xpRequired: 4000 },
  { id: 9, name: 'Chain Challenge', nameAr: 'تحدي السلاسل', status: 'locked', icon: 'List', xpRequired: 5200 },
];

// ═══════════════════════════════════════════════════════════
// الدروس — تُبنى تدريجياً
// ═══════════════════════════════════════════════════════════
// ⚠️ مؤقتاً فارغة — سنملؤها تدريجياً
export const LEARN_MODULES: LearnModule[] = [];

// ═══════════════════════════════════════════════════════════
// المهام (Quests)
// ═══════════════════════════════════════════════════════════
export const QUESTS: Quest[] = [
  { id: 1, title: 'Daily Practice', titleAr: 'التدريب اليومي', description: 'Complete 10', descriptionAr: 'أكمل ١٠ مسائل', xpReward: 50, progress: 0, target: 10, icon: 'Swords', color: 'from-purple-500 to-electric-500', type: 'practice' },
  { id: 2, title: 'Anzan Apprentice', titleAr: 'متدرب الأنزان', description: 'Score 20', descriptionAr: 'احصل على ٢٠ نقطة', xpReward: 80, progress: 0, target: 20, icon: 'Eye', color: 'from-electric-500 to-emerald2-500', type: 'anzan' },
  { id: 3, title: 'Perfect Streak', titleAr: 'سلسلة مثالية', description: '5-day streak', descriptionAr: 'حافظ على ٥ أيام', xpReward: 100, progress: 0, target: 5, icon: 'Flame', color: 'from-gold-400 to-gold-600', type: 'streak' },
  { id: 4, title: 'Lesson Explorer', titleAr: 'مستكشف الدروس', description: 'Complete 3', descriptionAr: 'أكمل ٣ دروس', xpReward: 60, progress: 0, target: 3, icon: 'BookOpen', color: 'from-emerald2-400 to-emerald2-600', type: 'lessons' },
  { id: 5, title: 'Addition Master', titleAr: 'سيد الجمع', description: '5 additions', descriptionAr: '٥ مسائل جمع', xpReward: 70, progress: 0, target: 5, icon: 'Plus', color: 'from-purple-400 to-purple-600', type: 'addition' },
  { id: 6, title: 'Subtraction Hero', titleAr: 'بطل الطرح', description: '5 subtractions', descriptionAr: '٥ مسائل طرح', xpReward: 70, progress: 0, target: 5, icon: 'Minus', color: 'from-electric-400 to-electric-600', type: 'subtraction' },
  { id: 7, title: 'Multiplication Pro', titleAr: 'محترف الضرب', description: '5 multiplications', descriptionAr: '٥ مسائل ضرب', xpReward: 100, progress: 0, target: 5, icon: 'X', color: 'from-pink-400 to-pink-600', type: 'multiplication' },
  { id: 8, title: 'Division Expert', titleAr: 'خبير القسمة', description: '5 divisions', descriptionAr: '٥ مسائل قسمة', xpReward: 100, progress: 0, target: 5, icon: 'Divide', color: 'from-gold-400 to-gold-600', type: 'division' },
  { id: 9, title: 'Anzan Expert', titleAr: 'خبير الأنزان', description: 'Score 50', descriptionAr: '٥٠ نقطة في الأنزان', xpReward: 150, progress: 0, target: 50, icon: 'Eye', color: 'from-emerald2-400 to-emerald2-600', type: 'anzanHighScore' },
];

// ═══════════════════════════════════════════════════════════
// أسئلة التدريب (تُملأ تدريجياً)
// ═══════════════════════════════════════════════════════════
export const PRACTICE_QUESTIONS: PracticeQuestion[] = [];

// ═══════════════════════════════════════════════════════════
// تمارين السلاسل (تُملأ تدريجياً)
// ═══════════════════════════════════════════════════════════
export const CHAIN_EXERCISES: ChainExercise[] = [];

// ═══════════════════════════════════════════════════════════
// Aliases للتوافق
// ═══════════════════════════════════════════════════════════
export const ADDITION_QUESTIONS = PRACTICE_QUESTIONS.filter((q) => q.question.includes('+'));
export const SUBTRACTION_QUESTIONS = PRACTICE_QUESTIONS.filter((q) => q.question.includes('-') && !q.question.includes('÷'));
export const MULTIPLICATION_QUESTIONS = PRACTICE_QUESTIONS.filter((q) => q.question.includes('×'));
export const DIVISION_QUESTIONS = PRACTICE_QUESTIONS.filter((q) => q.question.includes('÷'));

// ═══════════════════════════════════════════════════════════
// الشارات
// ═══════════════════════════════════════════════════════════
export const BADGES = [
  { id: 'beginner', name: 'Beginner', nameAr: 'مبتدئ', xpRequired: 200, icon: 'Star' },
  { id: 'trainee', name: 'Trainee', nameAr: 'متدرب', xpRequired: 500, icon: 'Target' },
  { id: 'anzan-master', name: 'Anzan Master', nameAr: 'سيد الأنزان', xpRequired: 750, icon: 'Eye' },
  { id: 'skilled', name: 'Skilled', nameAr: 'ماهر', xpRequired: 1250, icon: 'Award' },
  { id: 'soroban-expert', name: 'Soroban Expert', nameAr: 'خبير السوروبان', xpRequired: 2000, icon: 'Award' },
  { id: 'professional', name: 'Professional', nameAr: 'محترف', xpRequired: 3500, icon: 'Diamond' },
  { id: 'legend', name: 'Legend', nameAr: 'أسطورة', xpRequired: 5000, icon: 'Crown' },
  { id: 'eternal-legend', name: 'Eternal Legend', nameAr: 'أسطورة خالدة', xpRequired: 10000, icon: 'Crown' },
];