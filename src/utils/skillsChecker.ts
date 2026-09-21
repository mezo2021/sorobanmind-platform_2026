// ============================================================
// skillsChecker.ts — حساب المهارات الأربع للطفل
// ============================================================

const ANZAN_KEY = 'soroban_anzan_stats';
const PRACTICE_KEY = 'soroban_practice_stats';

interface AnzanStats {
  highScore: number;
  totalRounds: number;
  totalCorrect: number;
}

interface PracticeStats {
  totalProblems: number;
  correctAnswers: number;
  additionProblems: number;
  subtractionProblems: number;
  multiplicationProblems: number;
  divisionProblems: number;
}

function loadAnzanStats(): AnzanStats {
  try {
    const raw = localStorage.getItem(ANZAN_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        highScore: typeof parsed.highScore === 'number' ? parsed.highScore : 0,
        totalRounds: typeof parsed.totalRounds === 'number' ? parsed.totalRounds : 0,
        totalCorrect: typeof parsed.totalCorrect === 'number' ? parsed.totalCorrect : 0,
      };
    }
  } catch { /* ignore */ }
  return { highScore: 0, totalRounds: 0, totalCorrect: 0 };
}

function loadPracticeStats(): PracticeStats {
  try {
    const raw = localStorage.getItem(PRACTICE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        totalProblems: typeof parsed.totalProblems === 'number' ? parsed.totalProblems : 0,
        correctAnswers: typeof parsed.correctAnswers === 'number' ? parsed.correctAnswers : 0,
        additionProblems: typeof parsed.additionProblems === 'number' ? parsed.additionProblems : 0,
        subtractionProblems: typeof parsed.subtractionProblems === 'number' ? parsed.subtractionProblems : 0,
        multiplicationProblems: typeof parsed.multiplicationProblems === 'number' ? parsed.multiplicationProblems : 0,
        divisionProblems: typeof parsed.divisionProblems === 'number' ? parsed.divisionProblems : 0,
      };
    }
  } catch { /* ignore */ }
  return { totalProblems: 0, correctAnswers: 0, additionProblems: 0, subtractionProblems: 0, multiplicationProblems: 0, divisionProblems: 0 };
}

export interface SkillResult {
  id: string;
  nameAr: string;
  descriptionAr: string;
  /** النسبة من 0 إلى 100 */
  percentage: number;
  /** هل المهارة قابلة للقياس حالياً؟ */
  available: boolean;
  /** رسالة توضيحية */
  note?: string;
}

/**
 * يحسب جميع المهارات الأربع
 */
export function calculateSkills(): SkillResult[] {
  const anzan = loadAnzanStats();
  const practice = loadPracticeStats();

  // ═══════════════════════════════════════════════
  // 1. التركيز والانتباه
  //    المصدر: مدة الجلسات + عدد الجولات
  //    القياس: عدد جولات الأنزان الكلية / 50 × 100
  // ═══════════════════════════════════════════════
  const concentrationRaw = Math.min(100, (anzan.totalRounds / 50) * 100);

  // ═══════════════════════════════════════════════
  // 2. التخيل والتصور
  //    المصدر: نسبة الإجابات الصحيحة في الأنزان
  // ═══════════════════════════════════════════════
  const visualizationRaw = anzan.totalRounds > 0
    ? Math.min(100, (anzan.totalCorrect / anzan.totalRounds) * 100)
    : 0;

  // ═══════════════════════════════════════════════
  // 3. دقة الملاحظة
  //    المصدر: نسبة الإجابات الصحيحة في التدريب
  // ═══════════════════════════════════════════════
  const observationRaw = practice.totalProblems > 0
    ? Math.min(100, (practice.correctAnswers / practice.totalProblems) * 100)
    : 0;

  // ═══════════════════════════════════════════════
  // 4. الاستماع (قيد الإنشاء)
  //    المصدر: تمارين الإملاء (غير موجودة بعد)
  // ═══════════════════════════════════════════════
  const listeningRaw = 0;

  return [
    {
      id: 'concentration',
      nameAr: 'التركيز والانتباه',
      descriptionAr: 'قدرة الطفل على البقاء مركّزاً خلال الجلسات',
      percentage: Math.round(concentrationRaw),
      available: true,
    },
    {
      id: 'visualization',
      nameAr: 'التخيل والتصور',
      descriptionAr: 'قدرة الطفل على تخيل المعداد في عقله (الأنزان)',
      percentage: Math.round(visualizationRaw),
      available: true,
    },
    {
      id: 'observation',
      nameAr: 'دقة الملاحظة',
      descriptionAr: 'قدرة الطفل على حل المسائل من المحاولة الأولى',
      percentage: Math.round(observationRaw),
      available: true,
    },
    {
      id: 'listening',
      nameAr: 'الاستماع والانتباه السمعي',
      descriptionAr: 'قدرة الطفل على الحساب من خلال السماع',
      percentage: listeningRaw,
      available: false,
      note: '🎤 أضف تمارين الإملاء لتفعيل هذه المهارة',
    },
  ];
}