import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  RotateCcw,
  Hand,
  Plus,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  TrendingUp,
} from 'lucide-react';

interface InteractiveSorobanProps {
  onBack: () => void;
  playSound: (type: 'click' | 'bead' | 'whoosh') => void;
  onXP: (amount: number) => void;
}

const RODS = 5;
const PLACE_LABELS = ['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف'];
const PLACE_VALUES = [1, 10, 100, 1000, 10000];

type RodState = {
  upper: boolean;
  lower: number;
};

interface AdditionExercise {
  first: number;
  second: number;
  answer: number;
  level: number;
}

interface DifficultyLevel {
  title: string;
  description: string;
  xp: number;
  min: number;
  max: number;
}

const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    title: 'المستوى 1 — البداية',
    description: 'جمع آحاد بسيط دون تجاوز 5',
    xp: 10,
    min: 1,
    max: 4,
  },
  {
    title: 'المستوى 2 — أصدقاء 5',
    description: 'جمع آحاد يحتاج إلى استخدام الخرزة 5',
    xp: 15,
    min: 2,
    max: 5,
  },
  {
    title: 'المستوى 3 — إلى 10',
    description: 'جمع آحاد ضمن العدد 10',
    xp: 20,
    min: 3,
    max: 9,
  },
  {
    title: 'المستوى 4 — الحمل',
    description: 'جمع يؤدي إلى الانتقال من الآحاد إلى العشرات',
    xp: 25,
    min: 6,
    max: 9,
  },
  {
    title: 'المستوى 5 — الآحاد والعشرات',
    description: 'جمع أعداد مكونة من آحاد وعشرات',
    xp: 30,
    min: 10,
    max: 99,
  },
];

const MAX_LEVEL = DIFFICULTY_LEVELS.length;
const CORRECT_TO_ADVANCE = 3;
const WRONG_TO_DROP = 3;

const initialState = (): RodState[] =>
  Array.from({ length: RODS }, () => ({
    upper: false,
    lower: 0,
  }));

/**
 * تحويل رقم إلى حالة سوروبان.
 */
const numberToSoroban = (value: number): RodState[] => {
  const safeValue = Math.max(0, Math.min(value, 99999));

  return Array.from({ length: RODS }, (_, rodIndex) => {
    const placeValue = PLACE_VALUES[RODS - 1 - rodIndex];
    const digit = Math.floor(safeValue / placeValue) % 10;

    return {
      upper: digit >= 5,
      lower: digit >= 5 ? digit - 5 : digit,
    };
  });
};

/**
 * توليد مسألة مناسبة لمستوى الصعوبة.
 */
const generateExerciseForLevel = (level: number): AdditionExercise => {
  const difficulty =
    DIFFICULTY_LEVELS[Math.min(level - 1, DIFFICULTY_LEVELS.length - 1)];

  let first = 1;
  let second = 1;

  switch (level) {
    case 1: {
      // أمثلة: 1+2، 2+2، 3+1
      first = Math.floor(Math.random() * 4) + 1;
      second = Math.floor(Math.random() * (5 - first)) + 1;

      break;
    }

    case 2: {
      // أمثلة: 3+2، 4+1، 4+2
      // نضمن أن الناتج يحتاج إلى قيمة 5 أو يقترب منها.
      first = Math.floor(Math.random() * 3) + 3;
      second = Math.floor(Math.random() * 3) + 1;

      if (first + second > 9) {
        second = 9 - first;
      }

      break;
    }

    case 3: {
      // جمع آحاد مع نواتج متنوعة حتى 10.
      first = Math.floor(Math.random() * 7) + 2;
      second = Math.floor(Math.random() * (11 - first)) + 1;

      break;
    }

    case 4: {
      // نضمن وجود حمل إلى العشرات.
      first = Math.floor(Math.random() * 4) + 6;
      second = Math.floor(Math.random() * 5) + 3;

      break;
    }

    case 5: {
      // أعداد مكونة من عشرات وآحاد.
      first = Math.floor(Math.random() * 90) + 10;
      second = Math.floor(Math.random() * 90) + 10;

      break;
    }

    default: {
      first =
        Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) +
        difficulty.min;

      second =
        Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) +
        difficulty.min;

      break;
    }
  }

  return {
    first,
    second,
    answer: first + second,
    level,
  };
};

export function InteractiveSoroban({
  onBack,
  playSound,
  onXP,
}: InteractiveSorobanProps) {
  const [rods, setRods] = useState<RodState[]>(initialState);

  const [exercise, setExercise] = useState<AdditionExercise>(() =>
    generateExerciseForLevel(1)
  );

  const [exerciseMode, setExerciseMode] = useState(false);

  const [exerciseResult, setExerciseResult] = useState<
    'correct' | 'wrong' | null
  >(null);

  const [exerciseAttempts, setExerciseAttempts] = useState(0);

  /**
   * مستوى الطفل الحالي.
   */
  const [difficultyLevel, setDifficultyLevel] = useState(1);

  /**
   * عدد الإجابات الصحيحة المتتالية.
   */
  const [correctStreak, setCorrectStreak] = useState(0);

  /**
   * عدد الأخطاء المتتالية.
   */
  const [wrongStreak, setWrongStreak] = useState(0);

  /**
   * رسالة انتقال المستوى.
   */
  const [levelMessage, setLevelMessage] = useState<string | null>(null);

  const currentDifficulty = DIFFICULTY_LEVELS[difficultyLevel - 1];

  /**
   * تحريك الخرزة العلوية.
   */
  const toggleUpper = useCallback(
    (rodIndex: number) => {
      setRods((prev) => {
        const next = [...prev];

        next[rodIndex] = {
          ...next[rodIndex],
          upper: !next[rodIndex].upper,
        };

        return next;
      });

      setExerciseResult(null);
      playSound('bead');
    },
    [playSound]
  );

  /**
   * تحريك الخرزات السفلية.
   */
  const incrementLower = useCallback(
    (rodIndex: number) => {
      setRods((prev) => {
        const next = [...prev];
        const current = next[rodIndex].lower;

        next[rodIndex] = {
          ...next[rodIndex],
          lower: current >= 4 ? 0 : current + 1,
        };

        return next;
      });

      setExerciseResult(null);
      playSound('bead');
    },
    [playSound]
  );

  /**
   * تصفير المعداد.
   */
  const reset = useCallback(() => {
    setRods(initialState());
    setExerciseResult(null);
    setLevelMessage(null);
    playSound('whoosh');
  }, [playSound]);

  /**
   * القيمة الإجمالية للمعداد.
   */
  const totalValue = useMemo(
    () =>
      rods.reduce((sum, rod, i) => {
        const rodValue = (rod.upper ? 5 : 0) + rod.lower;

        return sum + rodValue * PLACE_VALUES[RODS - 1 - i];
      }, 0),
    [rods]
  );

  /**
   * قيمة كل قضيب.
   */
  const perRodValues = useMemo(
    () => rods.map((rod) => (rod.upper ? 5 : 0) + rod.lower),
    [rods]
  );

  /**
   * بدء تمرين الجمع.
   */
  const startAdditionExercise = useCallback(() => {
    setExercise(generateExerciseForLevel(difficultyLevel));
    setRods(initialState());
    setExerciseResult(null);
    setExerciseAttempts(0);
    setCorrectStreak(0);
    setWrongStreak(0);
    setLevelMessage(null);
    setExerciseMode(true);

    playSound('click');
  }, [difficultyLevel, playSound]);

  /**
   * الانتقال إلى تمرين جديد.
   */
  const nextExercise = useCallback(() => {
    setExercise(generateExerciseForLevel(difficultyLevel));
    setRods(initialState());
    setExerciseResult(null);
    setExerciseAttempts(0);
    setLevelMessage(null);

    playSound('click');
  }, [difficultyLevel, playSound]);

  /**
   * التحقق من الإجابة.
   */
  const checkExercise = useCallback(() => {
    setExerciseAttempts((prev) => prev + 1);

    if (totalValue === exercise.answer) {
      const nextCorrectStreak = correctStreak + 1;

      setExerciseResult('correct');
      setWrongStreak(0);
      setCorrectStreak(nextCorrectStreak);

      /**
       * منح XP حسب مستوى الصعوبة.
       */
      onXP(currentDifficulty.xp);
      playSound('click');

      /**
       * بعد 3 إجابات صحيحة متتالية:
       * الانتقال إلى المستوى التالي.
       */
      if (
        nextCorrectStreak >= CORRECT_TO_ADVANCE &&
        difficultyLevel < MAX_LEVEL
      ) {
        const nextLevel = difficultyLevel + 1;

        setDifficultyLevel(nextLevel);
        setCorrectStreak(0);

        setLevelMessage(
          `رائع! لقد أتقنت ${currentDifficulty.title} وانتقلت إلى ${DIFFICULTY_LEVELS[nextLevel - 1].title}`
        );
      }

      return;
    }

    /**
     * إجابة خاطئة.
     */
    const nextWrongStreak = wrongStreak + 1;

    setExerciseResult('wrong');
    setCorrectStreak(0);
    setWrongStreak(nextWrongStreak);

    playSound('whoosh');

    /**
     * عند تكرار الخطأ 3 مرات:
     * نعيد الطفل مستوى واحداً إذا لم يكن في المستوى الأول.
     */
    if (nextWrongStreak >= WRONG_TO_DROP && difficultyLevel > 1) {
      const previousLevel = difficultyLevel - 1;

      setDifficultyLevel(previousLevel);
      setWrongStreak(0);

      setLevelMessage(
        `لا بأس، سنراجع المستوى السابق قليلاً ثم نعود للتقدم من جديد.`
      );
    }
  }, [
    totalValue,
    exercise.answer,
    correctStreak,
    wrongStreak,
    difficultyLevel,
    currentDifficulty.xp,
    currentDifficulty.title,
    onXP,
    playSound,
  ]);

  /**
   * إظهار الإجابة الصحيحة للمساعدة.
   */
  const showAnswer = useCallback(() => {
    setRods(numberToSoroban(exercise.answer));
    setExerciseResult(null);
    playSound('bead');
  }, [exercise.answer, playSound]);

  /**
   * النسبة التقدمية للانتقال إلى المستوى التالي.
   */
  const levelProgress = Math.min(
    100,
    (correctStreak / CORRECT_TO_ADVANCE) * 100
  );

  return (
    <div className="px-3 sm:px-6 py-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click');
              onBack();
            }}
            className="btn-ghost !px-3 !py-2"
            aria-label="العودة"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              السوروبان التفاعلي
            </h2>

            <p className="text-sm text-white/50 font-body">
              تعلّم، تدرب، ثم أتقن الحساب الذهني
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="btn-primary !py-2.5 !px-4 !text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          تصفير
        </motion.button>
      </div>

      {/* Difficulty Progress */}
      <motion.div
        layout
        className="glass-card p-4 mb-5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-electric-500/10 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>

              <div>
                <p className="text-white font-bold font-body text-sm">
                  {currentDifficulty.title}
                </p>

                <p className="text-white/45 text-xs font-body">
                  {currentDifficulty.description}
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] text-white/40 font-body">
                المستوى
              </p>

              <p className="text-xl font-extrabold text-white font-display">
                {difficultyLevel}
                <span className="text-sm text-white/35">
                  /{MAX_LEVEL}
                </span>
              </p>
            </div>
          </div>

          {/* Level indicators */}
          <div className="flex gap-1.5 mb-3">
            {DIFFICULTY_LEVELS.map((_, index) => {
              const level = index + 1;

              return (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    level <= difficultyLevel
                      ? 'bg-gradient-to-r from-purple-500 to-electric-500'
                      : 'bg-white/10'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-body">
            <span className="text-white/40">
              التقدم للمستوى التالي
            </span>

            <span className="text-white/60">
              {difficultyLevel >= MAX_LEVEL
                ? 'أعلى مستوى'
                : `${correctStreak}/${CORRECT_TO_ADVANCE} إجابات صحيحة`}
            </span>
          </div>

          {difficultyLevel < MAX_LEVEL && (
            <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-electric-500 rounded-full"
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Addition Exercise */}
      <motion.div
        layout
        className="glass-card p-5 mb-5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-electric-500/10 to-emerald2-500/10 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white font-display">
                  تمرين الجمع المتدرج
                </h3>

                <p className="text-xs text-white/50 font-body">
                  الصعوبة تتكيف مع تقدمك
                </p>
              </div>
            </div>

            {!exerciseMode && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={startAdditionExercise}
                className="btn-primary !py-2.5 !px-4 !text-sm"
              >
                <Sparkles className="w-4 h-4" />
                ابدأ التمرين
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {exerciseMode ? (
              <motion.div
                key="active-exercise"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Exercise */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center mb-4">
                  <p className="text-xs text-white/45 font-body mb-2">
                    {currentDifficulty.title}
                  </p>

                  <div
                    dir="ltr"
                    className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-wide"
                  >
                    {exercise.first} + {exercise.second}
                  </div>

                  <p className="text-xs text-white/40 font-body mt-2">
                    حرّك الخرزات حتى يظهر الناتج الصحيح
                  </p>
                </div>

                {/* Controls */}
                <div className="flex gap-2 justify-center flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={checkExercise}
                    className="btn-primary !py-2.5 !px-5 !text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    تحقق من الإجابة
                  </motion.button>

                  <button
                    onClick={showAnswer}
                    className="btn-ghost !py-2.5 !px-4 !text-sm"
                  >
                    إظهار المساعدة
                  </button>

                  <button
                    onClick={nextExercise}
                    className="btn-ghost !py-2.5 !px-4 !text-sm"
                  >
                    مسألة جديدة
                  </button>
                </div>

                {/* Attempts */}
                {exerciseAttempts > 0 && (
                  <p className="text-center text-[11px] text-white/35 mt-3 font-body">
                    عدد المحاولات: {exerciseAttempts}
                  </p>
                )}

                {/* Level transition message */}
                <AnimatePresence>
                  {levelMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 rounded-xl bg-purple-500/10 border border-purple-400/20 p-3 text-center"
                    >
                      <Trophy className="w-5 h-5 text-gold-300 mx-auto mb-1" />

                      <p className="text-purple-200 font-bold font-body text-sm">
                        {levelMessage}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result */}
                <AnimatePresence mode="wait">
                  {exerciseResult === 'correct' && (
                    <motion.div
                      key="correct"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20 p-3 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />

                      <div className="text-center">
                        <p className="text-emerald-300 font-bold font-body">
                          إجابة صحيحة! أحسنت يا بطل 🎉
                        </p>

                        <p className="text-xs text-emerald-300/60 font-body">
                          الناتج = {exercise.answer} — حصلت على +
                          {currentDifficulty.xp} XP
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {exerciseResult === 'wrong' && (
                    <motion.div
                      key="wrong"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-4 rounded-xl bg-red-500/10 border border-red-400/20 p-3 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5 text-red-400" />

                      <div className="text-center">
                        <p className="text-red-300 font-bold font-body">
                          حاول مرة أخرى
                        </p>

                        <p className="text-xs text-red-300/60 font-body">
                          القيمة الحالية على المعداد:{' '}
                          {totalValue.toLocaleString('ar-EG')}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="inactive-exercise"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl bg-white/5 border border-white/10 p-4 text-center"
              >
                <p className="text-sm text-white/55 font-body leading-relaxed">
                  ابدأ من المستوى الأول، ومع كل مجموعة من الإجابات الصحيحة
                  سيتطور التمرين تدريجياً حتى تصل إلى مسائل الآحاد والعشرات.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Total value display */}
      <motion.div
        key={totalValue}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card p-5 mb-5 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-electric-500/10 to-emerald2-500/10" />

        <div className="relative">
          <p className="text-sm text-white/50 font-body mb-1">
            القيمة الإجمالية
          </p>

          <motion.p
            key={totalValue}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-5xl sm:text-6xl font-extrabold font-display shimmer-text"
          >
            {totalValue.toLocaleString('ar-EG')}
          </motion.p>
        </div>
      </motion.div>

      {/* Soroban frame */}
      <div className="glass-card p-4 sm:p-8 mb-5">
        <div className="bg-gradient-to-b from-amber-950/40 to-amber-900/20 rounded-2xl p-3 sm:p-6 border-2 border-amber-700/20">
          {/* Top frame bar */}
          <div className="h-3 rounded-full bg-gradient-to-r from-amber-700/40 via-amber-600/40 to-amber-700/40 mb-1" />

          {/* Rods */}
          <div className="flex justify-center gap-1 sm:gap-3 md:gap-5">
            {rods.map((rod, rodIndex) => (
              <div key={rodIndex} className="flex flex-col items-center">
                {/* Upper deck */}
                <div className="relative w-10 sm:w-14 h-14 sm:h-20 flex flex-col items-center justify-start pt-1">
                  <div
                    className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-600/30 to-amber-700/20 rounded-full"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />

                  <motion.button
                    onClick={() => toggleUpper(rodIndex)}
                    whileTap={{ scale: 0.85 }}
                    animate={{
                      y: rod.upper ? [0, 28] : [28, 0],
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                    }}
                    className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 border-2 border-gold-200/50 shadow-lg cursor-pointer touch-manipulation"
                    style={{
                      boxShadow: rod.upper
                        ? '0 4px 12px rgba(251,191,36,0.4)'
                        : '0 2px 6px rgba(251,191,36,0.2)',
                    }}
                    aria-label={`خرزة علوية - قضيب ${rodIndex + 1}`}
                  >
                    <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
                  </motion.button>
                </div>

                {/* Reckoning bar */}
                <div className="w-9 sm:w-13 h-[4px] sm:h-[5px] rounded-full bg-gradient-to-r from-purple-500 via-electric-500 to-purple-500 shadow-md shadow-purple-500/50 my-0.5" />

                {/* Lower deck */}
                <div className="relative w-10 sm:w-14 h-28 sm:h-36 flex flex-col-reverse items-center justify-start pb-1 gap-0.5">
                  <div
                    className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-700/20 to-amber-600/30 rounded-full"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />

                  {[0, 1, 2, 3].map((beadIdx) => {
                    const isActive = beadIdx < rod.lower;

                    return (
                      <motion.button
                        key={beadIdx}
                        onClick={() => incrementLower(rodIndex)}
                        whileTap={{ scale: 0.85 }}
                        animate={{
                          y: isActive ? [0, -28] : [-28, 0],
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                        className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-electric-400 to-electric-600 border-2 border-electric-300/50 shadow-lg cursor-pointer touch-manipulation"
                        style={{
                          boxShadow: isActive
                            ? '0 4px 12px rgba(59,130,246,0.4)'
                            : '0 2px 6px rgba(59,130,246,0.2)',
                        }}
                        aria-label={`خرزة سفلية ${beadIdx + 1} - قضيب ${rodIndex + 1}`}
                      >
                        <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Place label */}
                <div className="mt-2 text-center">
                  <p className="text-[10px] sm:text-xs font-bold text-white/40 font-body">
                    {PLACE_LABELS[RODS - 1 - rodIndex]}
                  </p>

                  <p className="text-sm sm:text-base font-extrabold text-white/70 font-display">
                    {perRodValues[rodIndex].toLocaleString('ar-EG')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom frame bar */}
          <div className="h-3 rounded-full bg-gradient-to-r from-amber-700/40 via-amber-600/40 to-amber-700/40 mt-1" />
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4 flex items-center gap-3"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center shrink-0"
        >
          <Hand className="w-5 h-5 text-white" />
        </motion.div>

        <div className="text-sm text-white/60 font-body leading-relaxed">
          <p className="text-white/80 font-bold mb-0.5">
            كيف تستخدم السوروبان؟
          </p>

          <p>
            المس الخرزة الذهبية العلوية لتحريكها لأسفل (قيمتها ٥).
            المس الخرزات الزرقاء السفلية لتحريكها للأعلى
            (قيمة كل واحدة ١). اضغط زر «تصفير» لإعادة الكل للوضع الأولي.
          </p>
        </div>
      </motion.div>

      {/* Bead value legend */}
      <div className="flex gap-3 mt-4 justify-center flex-wrap">
        <div className="badge bg-gold-400/15 border-gold-400/25">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gold-300 to-gold-500" />

          <span className="text-gold-200 text-xs">
            خرزة علوية = ٥
          </span>
        </div>

        <div className="badge bg-electric-500/15 border-electric-400/25">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-electric-400 to-electric-600" />

          <span className="text-electric-200 text-xs">
            خرزة سفلية = ١
          </span>
        </div>
      </div>
    </div>
  );
}

