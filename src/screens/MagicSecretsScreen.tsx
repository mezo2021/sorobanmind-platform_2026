import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, X, Check, Grid3X3, Lock, Star } from 'lucide-react';

// ===== بيانات الجدول المختصر (بدون تكرار) =====
const SHORT_TABLE: Record<number, Array<{ a: number; b: number; r: number }>> = {};
for (let i = 1; i <= 9; i++) {
  SHORT_TABLE[i] = [];
  for (let j = i; j <= 9; j++) {
    SHORT_TABLE[i].push({ a: i, b: j, r: i * j });
  }
}

// ===== بطاقات الأسرار =====
const SECRETS = [
  {
    id: 5,
    title: 'سر جدول الـ 5',
    icon: '✋',
    color: 'from-cyan-500 to-blue-600',
    rule: 'الآحاد: زوجي = 0، فردي = 5',
    rule2: 'العشرات: نصف الرقم (بدون كسور)',
    examples: [
      { q: '5 × 7', a: '35', steps: '7 فردي ← 5 | نصف 7 = 3 → 35' },
      { q: '5 × 8', a: '40', steps: '8 زوجي ← 0 | نصف 8 = 4 → 40' },
      { q: '5 × 6', a: '30', steps: '6 زوجي ← 0 | نصف 6 = 3 → 30' },
    ],
  },
  {
    id: 6,
    title: 'سر جدول الـ 6',
    icon: '🎲',
    color: 'from-purple-500 to-pink-600',
    rule: 'للأعداد الزوجية فقط',
    rule2: 'الآحاد: نفس الرقم | العشرات: نصفه',
    examples: [
      { q: '6 × 4', a: '24', steps: '4 زوجي → آحاد 4 | نصف 4 = 2 → 24' },
      { q: '6 × 8', a: '48', steps: '8 زوجي → آحاد 8 | نصف 8 = 4 → 48' },
      { q: '6 × 2', a: '12', steps: '2 زوجي → آحاد 2 | نصف 2 = 1 → 12' },
    ],
    note: 'مع الأعداد الفردية استخدم طريقة الخطوط!',
  },
  {
    id: 7,
    title: 'لغز الرقم 7',
    icon: '🔮',
    color: 'from-amber-500 to-orange-600',
    rule: 'الآحاد: اطرح 3 في كل مرة (مع الدوران عند 10)',
    rule2: 'العشرات: تتصاعد وتتوقف عند 2 و 4 مرتين',
    examples: [
      { q: '7 × 1', a: '07', steps: 'آحاد: 7' },
      { q: '7 × 3', a: '21', steps: 'آحاد: 7→4→1 | عشرات: 2' },
      { q: '7 × 6', a: '42', steps: 'آحاد: 7→4→1→8→5→2 | عشرات: 4' },
    ],
  },
  {
    id: 8,
    title: 'سر جدول الـ 8',
    icon: '🎯',
    color: 'from-emerald-500 to-teal-600',
    rule: 'الآحاد: اطرح 2 في كل مرة (مع الدوران)',
    rule2: 'العشرات: تتصاعد، وتتوقف عند 4 مرتين',
    examples: [
      { q: '8 × 1', a: '08', steps: 'آحاد: 8' },
      { q: '8 × 5', a: '40', steps: 'آحاد: 8→6→4→2→0 | عشرات: 4' },
      { q: '8 × 7', a: '56', steps: 'آحاد: 8→6→4→2→0→8→6 | عشرات: 5' },
    ],
  },
  {
    id: 9,
    title: 'سر جدول الـ 9',
    icon: '✨',
    color: 'from-rose-500 to-red-600',
    rule: 'العشرات: تتصاعد من 0 إلى 9',
    rule2: 'الآحاد: تتناقص من 9 إلى 0 | المجموع = 9',
    examples: [
      { q: '9 × 1', a: '09', steps: 'عشرات 0 | آحاد 9' },
      { q: '9 × 4', a: '36', steps: 'عشرات 3 | آحاد 6 | 3+6=9' },
      { q: '9 × 7', a: '63', steps: 'عشرات 6 | آحاد 3 | 6+3=9' },
    ],
  },
];

interface Props {
  onBack: () => void;
  onComplete?: (stars: number) => void;
}

const MagicSecretsScreen: React.FC<Props> = ({ onBack, onComplete }) => {
  const [tab, setTab] = useState<'table' | 'secrets'>('table');
  const [openSecret, setOpenSecret] = useState<number | null>(null);
  const [doneSecrets, setDoneSecrets] = useState<number[]>([]);

  const handleLearnSecret = (id: number) => {
    if (!doneSecrets.includes(id)) {
      const next = [...doneSecrets, id];
      setDoneSecrets(next);
      if (next.length === SECRETS.length && onComplete) onComplete(3);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white p-4 pb-24" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
          الأسرار السحرية
        </h1>
        <Sparkles className="w-6 h-6 text-amber-300" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-2xl">
        <button
          onClick={() => setTab('table')}
          className={`flex-1 py-3 rounded-xl font-bold transition ${tab === 'table' ? 'bg-purple-600 shadow-lg' : 'text-white/60'}`}
        >
          <Grid3X3 className="w-5 h-5 inline ml-2" />
          الجدول المختصر
        </button>
        <button
          onClick={() => setTab('secrets')}
          className={`flex-1 py-3 rounded-xl font-bold transition ${tab === 'secrets' ? 'bg-purple-600 shadow-lg' : 'text-white/60'}`}
        >
          <Sparkles className="w-5 h-5 inline ml-2" />
          الأسرار
        </button>
      </div>

      {/* Tab 1: Short Table */}
      {tab === 'table' && (
        <div className="space-y-4">
          <p className="text-center text-white/70 text-sm mb-2">
            الجدول بدون تكرار — تعلّم نصف الجدول فقط! 🎉
          </p>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
            <motion.div
              key={col}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: col * 0.05 }}
              className="bg-gradient-to-l from-emerald-900/40 to-slate-800/60 rounded-2xl p-4 border border-emerald-500/20"
            >
              <h3 className="font-bold text-emerald-300 mb-3 flex items-center gap-2">
                <span className="bg-emerald-500 text-black rounded-lg px-3 py-1 text-sm">الضرب في {col}</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {SHORT_TABLE[col].map(({ a, b, r }) => (
                  <div key={`${a}-${b}`} className="bg-slate-900/60 rounded-xl px-3 py-2 text-center border border-white/5">
                    <span className="text-white/80">{a} × {b} = </span>
                    <span className="text-amber-300 font-bold">{r}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tab 2: Secrets */}
      {tab === 'secrets' && (
        <div className="space-y-4">
          {SECRETS.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => setOpenSecret(s.id)}
              whileTap={{ scale: 0.97 }}
              className={`w-full p-4 rounded-2xl bg-gradient-to-l ${s.color} text-right shadow-lg flex items-center gap-3`}
            >
              <span className="text-3xl">{s.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{s.title}</h3>
                <p className="text-xs opacity-90">{s.rule}</p>
              </div>
              {doneSecrets.includes(s.id) ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <Lock className="w-5 h-5 opacity-70" />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Secret Modal */}
      <AnimatePresence>
        {openSecret !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setOpenSecret(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-3xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto border border-white/10"
            >
              {(() => {
                const s = SECRETS.find((x) => x.id === openSecret)!;
                return (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-4xl">{s.icon}</span>
                        <h2 className="text-2xl font-bold mt-2">{s.title}</h2>
                      </div>
                      <button onClick={() => setOpenSecret(null)} className="p-2 rounded-full bg-white/10">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className={`rounded-2xl p-4 bg-gradient-to-l ${s.color} mb-4`}>
                      <p className="font-bold mb-1">🔑 القاعدة:</p>
                      <p className="text-sm mb-1">{s.rule}</p>
                      <p className="text-sm">{s.rule2}</p>
                    </div>

                    <h3 className="font-bold mb-3 text-amber-300">أمثلة محلولة:</h3>
                    <div className="space-y-3">
                      {s.examples.map((ex, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-3">
                          <div className="flex justify-between mb-1">
                            <span className="font-bold text-lg">{ex.q} = {ex.a}</span>
                          </div>
                          <p className="text-xs text-white/60">{ex.steps}</p>
                        </div>
                      ))}
                    </div>

                    {s.note && (
                      <div className="mt-4 p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-sm">
                        ⚠️ {s.note}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        handleLearnSecret(s.id);
                        setOpenSecret(null);
                      }}
                      className="mt-6 w-full py-4 bg-gradient-to-l from-purple-600 to-amber-500 rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
                    >
                      <Star className="w-5 h-5" />
                      فهمت السر!
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagicSecretsScreen;