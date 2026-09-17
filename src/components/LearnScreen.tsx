import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Lock, CheckCircle2, Info, Star, CircleDot,
  Combine, Hash, Sigma, Lightbulb, type LucideIcon,
} from 'lucide-react';
import { LEARN_MODULES } from '@/data';
import { Soroban } from './Soroban';
import type { LearnModule } from '@/types';

const ICONS: Record<string, LucideIcon> = {
  Info, Star, CircleDot, Combine, Hash, Sigma,
};

interface LearnScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'bead' | 'whoosh') => void;
  onXP: (amount: number) => void;
}

export function LearnScreen({ onBack, playSound, onXP }: LearnScreenProps) {
  const [selected, setSelected] = useState<LearnModule | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  const handleOpen = (mod: LearnModule) => {
    if (mod.status === 'locked') return;
    playSound('click');
    setSelected(mod);
  };

  const handleComplete = () => {
    if (!selected) return;
    playSound('success');
    if (!completed.includes(selected.id)) {
      setCompleted([...completed, selected.id]);
      onXP(30);
    }
    setSelected(null);
  };

  return (
    <div className="px-3 sm:px-6 py-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
          <span className="hidden sm:inline">رجوع</span>
        </button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">التعلّم</h2>
          <p className="text-sm text-white/50 font-body">تعرّف على السوروبان خطوة بخطوة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEARN_MODULES.map((mod, i) => {
          const Icon = ICONS[mod.icon] || Info;
          const isDone = completed.includes(mod.id) || mod.status === 'completed';
          const isLocked = mod.status === 'locked' && !completed.includes(mod.id - 1);

          return (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={!isLocked ? { scale: 1.03, y: -4 } : {}}
              whileTap={!isLocked ? { scale: 0.97 } : {}}
              onClick={() => handleOpen(mod)}
              disabled={isLocked}
              className="group relative glass-card p-5 text-right overflow-hidden disabled:opacity-50"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
              <div className="relative flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {isDone ? (
                  <span className="badge bg-emerald2-500/20 border-emerald2-400/30 text-emerald2-300 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" /> مكتمل
                  </span>
                ) : isLocked ? (
                  <span className="badge bg-white/5 border-white/10 text-white/40 text-xs">
                    <Lock className="w-3.5 h-3.5" /> مقفل
                  </span>
                ) : (
                  <span className="badge bg-gold-400/20 border-gold-400/30 text-gold-300 text-xs">
                    متاح
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold font-display text-white mb-1">{mod.titleAr}</h3>
              <p className="text-xs text-white/40 font-body mb-2">{mod.title}</p>
              <p className="text-sm text-white/60 font-body leading-snug">{mod.descriptionAr}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Lesson Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-extrabold font-display text-white">{selected.titleAr}</h3>
                <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <span className="text-white/70 text-xl">×</span>
                </button>
              </div>

              <p className="text-white/60 font-body text-sm mb-5">{selected.descriptionAr}</p>

              {/* Soroban Visual */}
              <div className="flex justify-center mb-5">
                <Soroban value={selected.value} columns={1} showLabels />
              </div>

              {/* Value display */}
              <div className="text-center mb-5">
                <p className="text-white/40 font-body text-xs mb-1">القيمة</p>
                <motion.p
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="text-5xl font-extrabold font-display shimmer-text"
                >
                  {selected.value}
                </motion.p>
              </div>

              {/* Concept */}
              <div className="flex gap-3 p-4 rounded-2xl bg-purple-500/10 border border-purple-400/20 mb-5">
                <Lightbulb className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/80 font-body leading-relaxed">{selected.conceptAr}</p>
              </div>

              <button onClick={handleComplete} className="btn-primary w-full">
                <CheckCircle2 className="w-5 h-5" />
                أكملت الدرس +30 XP
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
