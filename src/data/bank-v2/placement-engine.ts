// src/data/bank-v2/placement-engine.ts
// محرك امتحان تحديد المستوى (Placement Test)
// ═══════════════════════════════════════════════════════════
// يأخذ من: EXAM_POOL_1 + EXAM_POOL_2
// 40 سؤالاً: 5 من كل مستوى (L0-L7)
// التقييم: 200 نقطة → 100 درجة مئوية
// عتبة النجاح: 20/25 (80%) لكل مستوى
// ═══════════════════════════════════════════════════════════

import {
  EXAM_POOL_1,
  EXAM_POOL_2,
  type ExamQuestion,
} from "./bank-exam";
import { recordWeaknessAttempt } from "./index";

// ═══════════════════════════════════════════════════════════
// الأنواع
// ═══════════════════════════════════════════════════════════

export interface PlacementQuestion extends ExamQuestion {
  /** مصدر السؤال (EX1 أو EX2) */
  source: "EX1" | "EX2";
  /** معرّف فريد للتتبع */
  placementId: string;
}

export interface LevelResult {
  /** المستوى */
  levelId: string;
  /** الإجابات الصحيحة */
  correct: number;
  /** المجموع */
  total: number;
  /** النقاط (5 × correct) */
  points: number;
  /** النسبة المئوية من 25 */
  percentage: number;
  /** هل نجح؟ */
  passed: boolean;
}

export interface PlacementResult {
  /** المستوى المُوصى به */
  recommendedLevel: string;
  /** النتيجة الكلية (0-100) */
  totalScore: number;
  /** هل نجح في أي مستوى؟ */
  passed: boolean;
  /** تفصيل كل مستوى */
  levels: LevelResult[];
  /** المهارات الضعيفة */
  weakSkills: string[];
  /** أول مستوى رسب فيه */
  firstFailedLevel: string | null;
}

// ═══════════════════════════════════════════════════════════
// الثوابت
// ═══════════════════════════════════════════════════════════

/** عدد الأسئلة من كل مستوى */
export const QUESTIONS_PER_LEVEL = 5;

/** درجة كل سؤال */
export const POINTS_PER_QUESTION = 5;

/** إجمالي نقاط المستوى */
export const POINTS_PER_LEVEL = 25;

/** عتبة النجاح (80%) */
export const PASS_THRESHOLD = 20;

/** المستويات */
const ALL_LEVELS = ["L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7"];

/** المستويات من EX1 */
const EX1_LEVELS = ["L0", "L1", "L2", "L3"];

/** المستويات من EX2 */
const EX2_LEVELS = ["L4", "L5", "L6", "L7"];

// ═══════════════════════════════════════════════════════════
// أدوات
// ═══════════════════════════════════════════════════════════

function createRng(seed: number): () => number {
  let value = seed >>> 0;
  return (): number => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * اختيار "الأطول" من مصفوفة أسئلة.
 *
 * القاعدة: الأسئلة الأطول (termCount الأعلى)
 */
function pickLongest(
  pool: ExamQuestion[],
  count: number,
): ExamQuestion[] {
  const sorted = [...pool].sort((a, b) => b.termCount - a.termCount);
  return sorted.slice(0, Math.min(count, sorted.length));
}

// ═══════════════════════════════════════════════════════════
// بناء امتحان تحديد المستوى
// ═══════════════════════════════════════════════════════════

/**
 * بناء امتحان تحديد المستوى.
 *
 * 40 سؤالاً: 5 من كل مستوى (L0-L7)
 *   - L0-L3: من EXAM_POOL_1
 *   - L4-L7: من EXAM_POOL_2
 *
 * القاعدة: الأسئلة الأطول (termCount الأعلى)
 */
export function buildPlacementTest(seed = Date.now()): PlacementQuestion[] {
  const rng = createRng(seed);
  const questions: PlacementQuestion[] = [];

  // ─── L0-L3 من EXAM_POOL_1 ───
  for (const levelId of EX1_LEVELS) {
    const pool = EXAM_POOL_1.filter((q) => q.levelId === levelId);
    if (pool.length === 0) continue;

    const selected = pickLongest(pool, QUESTIONS_PER_LEVEL);

    for (const q of selected) {
      questions.push({
        ...q,
        source: "EX1",
        placementId: `PL-${levelId}-${q.skillId}-${questions.length + 1}`,
      });
    }
  }

  // ─── L4-L7 من EXAM_POOL_2 ───
  for (const levelId of EX2_LEVELS) {
    const pool = EXAM_POOL_2.filter((q) => q.levelId === levelId);
    if (pool.length === 0) continue;

    const selected = pickLongest(pool, QUESTIONS_PER_LEVEL);

    for (const q of selected) {
      questions.push({
        ...q,
        source: "EX2",
        placementId: `PL-${levelId}-${q.skillId}-${questions.length + 1}`,
      });
    }
  }

  // خلط نهائي للأسئلة (مع الحفاظ على IDs)
  return shuffle(questions, rng);
}

// ═══════════════════════════════════════════════════════════
// تقييم امتحان تحديد المستوى
// ═══════════════════════════════════════════════════════════

/**
 * تقييم إجابات الطالب.
 *
 * @param questions الأسئلة المُعرَضة
 * @param answers خريطة: placementId → إجابة الطالب
 */
export function evaluatePlacementTest(
  questions: PlacementQuestion[],
  answers: Map<string, number>,
): PlacementResult {
  // ─── تجميع الأسئلة حسب المستوى ───
  const byLevel = new Map<
    string,
    { total: number; correct: number; weakSkills: Set<string> }
  >();

  for (const levelId of ALL_LEVELS) {
    byLevel.set(levelId, {
      total: 0,
      correct: 0,
      weakSkills: new Set(),
    });
  }

  // ─── معالجة كل سؤال ───
  for (const q of questions) {
    const levelData = byLevel.get(q.levelId);
    if (!levelData) continue;

    levelData.total += 1;

    const userAnswer = answers.get(q.placementId);
    const isCorrect = userAnswer === q.correctAnswer;

    if (isCorrect) {
      levelData.correct += 1;
    } else {
      // تسجيل الضعف في المهارة
      levelData.weakSkills.add(q.skillId);

      // حفظ في localStorage (للأداء التكيفي لاحقاً)
      try {
        recordWeaknessAttempt(q.skillId, false, 5000);
      } catch { /* ignore */ }
    }
  }

  // ─── بناء النتائج ───
  const levels: LevelResult[] = [];
  let firstFailedLevel: string | null = null;
  const allWeakSkills = new Set<string>();

  for (const levelId of ALL_LEVELS) {
    const data = byLevel.get(levelId);
    if (!data || data.total === 0) continue;

    const points = data.correct * POINTS_PER_QUESTION;
    const percentage = (points / POINTS_PER_LEVEL) * 100;
    const passed = points >= PASS_THRESHOLD;

    // تسجيل أول رسوب
    if (!passed && firstFailedLevel === null) {
      firstFailedLevel = levelId;
    }

    // تجميع الضعف
    for (const skill of data.weakSkills) {
      allWeakSkills.add(skill);
    }

    levels.push({
      levelId,
      correct: data.correct,
      total: data.total,
      points,
      percentage: Math.round(percentage),
      passed,
    });
  }

  // ─── تحديد المستوى المُوصى به ───
  let recommendedLevel: string;

  if (firstFailedLevel !== null) {
    recommendedLevel = firstFailedLevel;
  } else {
    recommendedLevel = "L7"; // نجح في كل شيء
  }

  // ─── النتيجة الكلية ───
  const totalPoints = levels.reduce((sum, l) => sum + l.points, 0);
  const totalMax = levels.length * POINTS_PER_LEVEL;
  const totalScore =
    totalMax === 0 ? 0 : Math.round((totalPoints / totalMax) * 100);

  return {
    recommendedLevel,
    totalScore,
    passed: firstFailedLevel !== "L0",
    levels,
    weakSkills: [...allWeakSkills],
    firstFailedLevel,
  };
}

// ═══════════════════════════════════════════════════════════
// أدوات مساعدة
// ═══════════════════════════════════════════════════════════

/**
 * هل امتحان تحديد المستوى متاح الآن؟
 *
 * يُفتح كل 48 ساعة — أو دائماً (حسب الإعداد).
 *
 * @param lastAttempt آخر محاولة (timestamp)
 * @param cooldownMs مدة الانتظار (افتراضي: 48 ساعة)
 */
export function canTakePlacementTest(
  lastAttempt: number | null,
  cooldownMs: number = 48 * 60 * 60 * 1000,
): { allowed: boolean; waitMs: number } {
  if (!lastAttempt) return { allowed: true, waitMs: 0 };

  const elapsed = Date.now() - lastAttempt;
  if (elapsed >= cooldownMs) return { allowed: true, waitMs: 0 };

  return { allowed: false, waitMs: cooldownMs - elapsed };
}

/**
 * الحصول على اسم المستوى بالعربية.
 */
export function getLevelName(levelId: string): string {
  const map: Record<string, string> = {
    L0: "التمهيدي",
    L1: "الجمع والطرح",
    L2: "الضرب",
    L3: "القسمة",
    L4: "جمع وطرح متقدم",
    L5: "ضرب وقسمة متقدم",
    L6: "الكسور العشرية",
    L7: "الجذور",
  };
  return map[levelId] ?? levelId;
}