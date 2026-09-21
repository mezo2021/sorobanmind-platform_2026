import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Trophy, RotateCcw, Award,
  FileText, AlertCircle, Lock, BookOpen,
  Brain, Grid3X3,
} from 'lucide-react';
import { InteractiveSoroban } from './InteractiveSoroban';
import { LEARN_MODULES } from '@/data';
import {
  pickAdditionExam,
  pickMultDivExam,
  loadAnzanBadges,
  type ExamQuestion,
} from '@/examBank2';

interface FinalExamProps {
  onBack: () => void;
  onComplete: (score: number, passed: boolean) => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onGoToLearn?: () => void;
}

const TOTAL_QUESTIONS = 25;
const POINTS_PER_QUESTION = 4;
const PASS_THRESHOLD = 60;
const MAX_ATTEMPTS = 2;
const COMPLETED_STORAGE_KEY = 'soroban-completed-lessons';

type ExamState = 'intro' | 'running' | 'finished';
type ExamTab = 'addition' | 'multdiv';

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

function getColumnsForValue(value: number): number {
  if (value < 1000) return 3;
  return 6;
}

function questionToString(q: ExamQuestion): string {
  if (!q.operations || q.operations.length === 0) return '';
  const parts: string[] = [String(q.operations[0].value)];
  for (let i = 1; i < q.operations.length; i++) {
    const currentOp = q.operations[i];
    parts.push(`${currentOp.operator} ${currentOp.value}`);
  }
  return parts.join(' ') + ' = ؟';
}

function isLessonsCompleted(): boolean {
  try {
    const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
    if (!saved) return false;
    const completed: number[] = JSON.parse(saved);
    const allIds = LEARN_MODULES.map((m) => m.id);
    return allIds.every((id) => completed.includes(id));
  } catch {
    return false;
  }
}

function getCompletedCount(): number {
  try {
    const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
    if (!saved) return 0;
    return JSON.parse(saved).length;
  } catch {
    return 0;
  }
}

function checkExamUnlock() {
  const lessonsCompleted = isLessonsCompleted();
  const badges = loadAnzanBadges();
  return {
    lessonsCompleted,
    additionUnlocked: lessonsCompleted && !!badges.master_addition,
    multdivUnlocked:
      lessonsCompleted &&
      !!badges.master_multiplication &&
      !!badges.master_division &&
      !!badges.master_mixed,
  };
}

export function FinalExam({ onBack, onComplete, playSound, onGoToLearn }: FinalExamProps) {
  const [state, setState] = useState<ExamState>('intro');
  const [tab, setTab] = useState<ExamTab>('addition');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [abacusValue, setAbacusValue] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong' | 'revealed'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [answers, setAnswers] = useState<Array<{ correct: boolean }>>([]);

  const [unlock, setUnlock] = useState(checkExamUnlock());
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setUnlock(checkExamUnlock());
    setCompletedCount(getCompletedCount());
  }, []);

  const currentQuestion = questions[currentIndex];
  const correctCount = answers.filter((a) => a.correct).length;
  const currentScore = correctCount * POINTS_PER_QUESTION;
  const totalLevels = LEARN_MODULES.length;

  const isCurrentTabUnlocked =
    tab === 'addition' ? unlock.additionUnlocked : unlock.multdivUnlocked;

  const startExam = () => {
    if (!isCurrentTabUnlocked) {
      playSound('error');
      return;
    }
    playSound('click');
    const examQuestions =
      tab === 'addition' ? pickAdditionExam() : pickMultDivExam();
    setQuestions(examQuestions);
    setCurrentIndex(0);
    setAbacusValue(0);
    setFeedback('idle');
    setAttempts(0);
    setAnswers([]);
    setState('running');
  };

  const handleCheck = () => {
    if (!currentQuestion || feedback !== 'idle') return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (abacusValue === currentQuestion.answer) {
      playSound('success');
      setFeedback('correct');
      const newAnswers = [...answers, { correct: true }];
      setTimeout(() => advance(newAnswers), 1200);
    } else if (newAttempts >= MAX_ATTEMPTS) {
      playSound('error');
      setFeedback('revealed');
      const newAnswers = [...answers, { correct: false }];
      setTimeout(() => advance(newAnswers), 2500);
    } else {
      playSound('error');
      setFeedback('wrong');
      setTimeout(() => setFeedback('idle'), 900);
    }
  };

  const advance = (finalAnswers: Array<{ correct: boolean }>) => {
    setAbacusValue(0);
    setFeedback('idle');
    setAttempts(0);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setAnswers(finalAnswers);
    } else {
      const finalScore =
        finalAnswers.filter((a) => a.correct).length * POINTS_PER_QUESTION;
      const passed = finalScore >= PASS_THRESHOLD;
      setAnswers(finalAnswers);
      setState('finished');
      if (passed) playSound('levelup');
      else playSound('error');

      // ✅ حفظ النتيجة في localStorage
      try {
        if (tab === 'addition') {
          localStorage.setItem(
            'soroban_exam_result',
            JSON.stringify({ score: finalScore, passed, date: Date.now() })
          );
        } else {
          localStorage.setItem(
            'soroban_exam2_result',
            JSON.stringify({ score: finalScore, passed, date: Date.now() })
          );
        }
      } catch { /* ignore */ }

      onComplete(finalScore, passed);
    }
  };

  // ═══════════════════════════════════════════════════════
  // شاشة الترحيب
  // ═══════════════════════════════════════════════════════
  if (state === 'intro') {
    const remaining = totalLevels - completedCount;

    return (
      <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { playSound('click'); onBack(); }}
            className="btn-ghost !px-3 !py-2"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="hidden sm:inline">رجوع</span>
          </button>
        </div>

        <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-2xl">
          <button
            onClick={() => { playSound('click'); setTab('addition'); }}
            className={`flex-1 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2 ${
              tab === 'addition' ? 'bg-purple-600 shadow-lg' : 'text-white/60'
            }`}
          >
            <Brain className="w-4 h-4" /> جمع وطرح
          </button>
          <button
            onClick={() => { playSound('click'); setTab('multdiv'); }}
            className={`flex-1 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2 ${
              tab === 'multdiv' ? 'bg-purple-600 shadow-lg' : 'text-white/60'
            }`}
          >
            <Grid3X3 className="w-4 h-4" /> ضرب وقسمة
          </button>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-8 text-center"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-2xl mb-4 ${
            isCurrentTabUnlocked
              ? 'bg-gradient-to-br from-gold-400 to-purple-600'
              : 'bg-gradient-to-br from-slate-600 to-slate-800'
          }`}>
            {isCurrentTabUnlocked ? (
              <FileText className="w-10 h-10 text-white" />
            ) : (
              <Lock className="w-10 h-10 text-white/60" />
            )}
          </div>

          <h2 className="text-2xl font-black font-display text-white mb-3">
            {tab === 'addition'
              ? isCurrentTabUnlocked
                ? 'امتحان جمع وطرح 🏆'
                : 'امتحان جمع وطرح — مقفل 🔒'
              : isCurrentTabUnlocked
                ? 'امتحان ضرب وقسمة 🏆'
                : 'امتحان ضرب وقسمة — مقفل 🔒'}
          </h2>

          {!unlock.lessonsCompleted && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <p className="text-xs text-white/50 font-body mb-2">
                📚 إكمال دروس التعلّم (0-9)
              </p>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-electric-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / totalLevels) * 100}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <p className="text-xs text-white/50 font-body mt-2">
                {toArabicNumber(completedCount)} / {toArabicNumber(totalLevels)} — باقي {toArabicNumber(remaining)}
              </p>
            </div>
          )}

          {unlock.lessonsCompleted && tab === 'addition' && !unlock.additionUnlocked && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 mb-4">
              <p className="text-sm text-amber-100 font-body leading-relaxed">
                🏅 تحتاج شارة <span className="font-bold">"خبير جمع وطرح"</span> من قسم الأنزان لفتح هذا الامتحان.
              </p>
            </div>
          )}

          {unlock.lessonsCompleted && tab === 'multdiv' && !unlock.multdivUnlocked && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 mb-4">
              <p className="text-sm text-amber-100 font-body leading-relaxed">
                🏅 تحتاج ٣ شارات من قسم الأنزان:{' '}
                <span className="font-bold">خبير ضرب + خبير قسمة + خبير مختلط</span>.
              </p>
            </div>
          )}

          {isCurrentTabUnlocked && (
            <>
              <p className="text-white/60 font-body mb-6 leading-relaxed">
                هذا الامتحان يقيس إتقانك لكل ما تعلمته. ركّز، واستخدم المعداد التفاعلي لتمثيل الناتج.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 text-right">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 font-body mb-1">عدد الأسئلة</p>
                  <p className="text-2xl font-black font-display text-white">
                    {toArabicNumber(TOTAL_QUESTIONS)}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 font-body mb-1">الدرجة الكلية</p>
                  <p className="text-2xl font-black font-display text-white">
                    {toArabicNumber(100)}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 font-body mb-1">درجة كل سؤال</p>
                  <p className="text-2xl font-black font-display text-white">
                    {toArabicNumber(POINTS_PER_QUESTION)}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald2-500/15 border border-emerald2-400/30">
                  <p className="text-xs text-emerald2-300 font-body mb-1">النجاح</p>
                  <p className="text-2xl font-black font-display text-emerald2-200">
                    {toArabicNumber(PASS_THRESHOLD)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 p-3 rounded-2xl bg-electric-500/10 border border-electric-400/30 mb-6 text-right">
                <AlertCircle className="w-5 h-5 text-electric-300 shrink-0 mt-0.5" />
                <p className="text-xs text-white/70 font-body leading-relaxed">
                  محاولتان لكل سؤال. عند الفشل في المحاولتين، ستظهر الإجابة الصحيحة وينتقل تلقائياً للسؤال التالي.
                </p>
              </div>

              <button onClick={startExam} className="btn-primary w-full !py-4 !text-lg">
                <Award className="w-6 h-6" />
                ابدأ الامتحان
              </button>
            </>
          )}

          {!unlock.lessonsCompleted && onGoToLearn && (
            <button
              onClick={() => { playSound('click'); onGoToLearn(); }}
              className="btn-primary w-full !py-4 !text-lg"
            >
              <BookOpen className="w-6 h-6" />
              اذهب إلى الدروس
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // شاشة النتيجة
  // ═══════════════════════════════════════════════════════
  if (state === 'finished') {
    const finalScore = correctCount * POINTS_PER_QUESTION;
    const passed = finalScore >= PASS_THRESHOLD;

    return (
      <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
            transition={{ delay: 0.2, type: 'spring' }}
            className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-5 shadow-2xl ${
              passed
                ? 'bg-gradient-to-br from-gold-400 to-gold-600'
                : 'bg-gradient-to-br from-red-400 to-red-700'
            }`}
          >
            {passed ? (
              <Trophy className="w-14 h-14 text-white" />
            ) : (
              <RotateCcw className="w-14 h-14 text-white" />
            )}
          </motion.div>

          <h2 className="text-3xl font-black font-display text-white mb-2">
            {passed ? '🎉 مبروك!' : '💪 حاول مرة أخرى'}
          </h2>

          <p className="text-white/70 font-body mb-6">
            {passed
              ? 'لقد اجتزت الامتحان بنجاح!'
              : 'لم تصل إلى درجة النجاح بعد. لا بأس، التدريب يجعلك أقوى.'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 font-body mb-1">نتيجتك</p>
              <p className="text-3xl font-black font-display text-gold-300">
                {toArabicNumber(finalScore)}
              </p>
              <p className="text-[10px] text-white/40 font-body mt-1">من ١٠٠</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 font-body mb-1">الإجابات الصحيحة</p>
              <p className="text-3xl font-black font-display text-emerald2-300">
                {toArabicNumber(correctCount)}
              </p>
              <p className="text-[10px] text-white/40 font-body mt-1">
                من {toArabicNumber(TOTAL_QUESTIONS)}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={startExam} className="btn-primary flex-1">
              <RotateCcw className="w-5 h-5" />
              أعد المحاولة
            </button>
            <button
              onClick={() => { playSound('click'); onBack(); }}
              className="btn-ghost flex-1"
            >
              <ArrowRight className="w-5 h-5" />
              رجوع
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // شاشة الامتحان الجارية
  // ═══════════════════════════════════════════════════════
  const progressPct = (currentIndex / TOTAL_QUESTIONS) * 100;
  const questionText = currentQuestion ? questionToString(currentQuestion) : '';

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto" dir="rtl">
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => { playSound('click'); onBack(); }}
          className="btn-ghost !px-3 !py-2"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center">
          <p className="text-sm text-white/60 font-body">
            {tab === 'addition' ? 'امتحان جمع وطرح' : 'امتحان ضرب وقسمة'}
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-gold-400/15 border border-gold-400/30">
          <p className="text-xs font-black text-gold-300 font-display">
            {toArabicNumber(currentScore)}/{toArabicNumber(100)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-white/50 font-body">
            السؤال {toArabicNumber(currentIndex + 1)} من {toArabicNumber(TOTAL_QUESTIONS)}
          </p>
          <p className="text-xs text-white/40 font-body">
            {toArabicNumber(Math.round(progressPct))}%
          </p>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong p-5 mb-4"
      >
        <p className="text-center text-3xl sm:text-4xl font-black font-display text-white tracking-wide">
          {questionText}
        </p>
      </motion.div>

      <div className="flex justify-center mb-4">
        <InteractiveSoroban
          columns={getColumnsForValue(currentQuestion?.answer ?? 99)}
          value={abacusValue}
          onValueChange={(v) => setAbacusValue(v)}
        />
      </div>

      {feedback === 'idle' && (
        <div className="text-center mb-3">
          <span className="text-xs text-white/60">القيمة الحالية: </span>
          <span className="text-xl font-bold text-amber-300">{toArabicNumber(abacusValue)}</span>
        </div>
      )}

      <div className="flex gap-2 mb-3">
        <button
          onClick={handleCheck}
          disabled={feedback !== 'idle'}
          className={`flex-1 ${
            feedback === 'correct'
              ? 'btn-primary !bg-gradient-to-br !from-emerald2-400 !to-emerald2-600'
              : feedback === 'wrong'
              ? 'btn-primary !bg-gradient-to-br !from-red-400 !to-red-700'
              : 'btn-primary'
          } !py-3`}
        >
          {feedback === 'correct' ? (
            <><CheckCircle2 className="w-5 h-5" /> أحسنت!</>
          ) : feedback === 'wrong' ? (
            <>❌ حاول مرة أخرى</>
          ) : (
            <><CheckCircle2 className="w-5 h-5" /> تحقق</>
          )}
        </button>
        {abacusValue !== 0 && feedback === 'idle' && (
          <button
            onClick={() => { setAbacusValue(0); playSound('click'); }}
            className="btn-ghost !py-3 !px-4"
            title="مسح المعداد"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      {feedback === 'revealed' && currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-red-500/15 border border-red-400/40 text-center"
        >
          <p className="text-sm text-white/70 mb-1">الإجابة الصحيحة:</p>
          <p className="text-3xl font-black text-red-300 font-display">
            {toArabicNumber(currentQuestion.answer)}
          </p>
          <p className="text-xs text-white/50 mt-2">جاري الانتقال للسؤال التالي...</p>
        </motion.div>
      )}
    </div>
  );
}

export default FinalExam;