import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Swords, Eye, Flame, BookOpen, Gift, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { useQuests } from '@/hooks/useQuests';
import type { Quest } from '@/types';

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const ICONS: Record<string, typeof Swords> = {
  Swords,
  Eye,
  Flame,
  BookOpen,
  Plus,
};

/** ✅ مفتاح حفظ المهام المستلمة */
const CLAIMED_QUESTS_KEY = 'soroban_claimed_quests';

interface ClaimedQuest {
  id: number;
  date: number;
}

function loadClaimedQuests(): ClaimedQuest[] {
  try {
    const raw = localStorage.getItem(CLAIMED_QUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveClaimedQuests(quests: ClaimedQuest[]) {
  try {
    localStorage.setItem(CLAIMED_QUESTS_KEY, JSON.stringify(quests));
  } catch { /* ignore */ }
}

/** ✅ فحص: هل هذه المهمة استُلمت مؤخراً؟ (نسمح بالاستلام مجدداً كل 24 ساعة) */
function isQuestClaimedRecently(claimed: ClaimedQuest[], questId: number): boolean {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const lastClaim = claimed.find((c) => c.id === questId);
  if (!lastClaim) return false;
  return now - lastClaim.date < DAY_MS;
}

interface QuestsScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'whoosh') => void;
  onXP: (amount: number) => void;
  burst: (x?: number, y?: number) => void;
}

export function QuestsScreen({ onBack, playSound, onXP, burst }: QuestsScreenProps) {
  const quests = useQuests();
  const [claimed, setClaimed] = useState<ClaimedQuest[]>(() => loadClaimedQuests());
  const [justClaimed, setJustClaimed] = useState<number | null>(null);

  // ✅ مزامنة عند تحديث التخزين من نوافذ أخرى
  useEffect(() => {
    const handleStorage = () => {
      setClaimed(loadClaimedQuests());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleClaim = (quest: Quest) => {
    // ✅ حماية: لا يُستلم إن كان مُستلماً حديثاً
    if (isQuestClaimedRecently(claimed, quest.id)) {
      playSound('whoosh');
      return;
    }

    playSound('success');
    onXP(quest.xpReward);
    burst(0.5, 0.5);

    const newClaimed = [...claimed, { id: quest.id, date: Date.now() }];
    setClaimed(newClaimed);
    saveClaimedQuests(newClaimed);

    // ✅ تأثير بصري عند الاستلام
    setJustClaimed(quest.id);
    setTimeout(() => setJustClaimed(null), 1500);
  };

  return (
    <div className="px-3 sm:px-6 py-6 max-w-4xl mx-auto">
      {/* رأس الصفحة */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="btn-ghost !px-3 !py-2"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            المغامرات
          </h2>
          <p className="text-sm text-white/50 font-body">
            أكمل التحديات واكسب المكافآت
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-gold-300 font-display">
            {toArabicNumber(quests.filter((q) => q.progress >= q.target).length)}
          </p>
          <p className="text-[10px] text-white/40 font-body">مكتملة</p>
        </div>
      </div>

      {/* شبكة المهام */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quests.map((quest, i) => {
          const Icon = ICONS[quest.icon] || Swords;
          const pct = Math.min(100, (quest.progress / quest.target) * 100);
          const isComplete = quest.progress >= quest.target;
          const isRecentlyClaimed = isQuestClaimedRecently(claimed, quest.id);
          const isJustClaimed = justClaimed === quest.id;

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className={`glass-card p-5 overflow-hidden relative ${
                isRecentlyClaimed ? 'opacity-70' : ''
              }`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${quest.color} opacity-10 rounded-full blur-2xl`}
              />

              {/* الرأس: أيقونة + معلومات + XP */}
              <div className="relative flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${quest.color} flex items-center justify-center shadow-lg shrink-0 ${
                    isRecentlyClaimed ? 'grayscale' : ''
                  }`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold font-display text-white mb-0.5">
                    {quest.titleAr}
                  </h3>
                  <p className="text-xs text-white/40 font-body mb-1">
                    {quest.title}
                  </p>
                  <p className="text-sm text-white/60 font-body leading-snug">
                    {quest.descriptionAr}
                  </p>
                </div>
                <div className="shrink-0 text-center">
                  <p className="text-xl font-extrabold text-gold-300 font-display">
                    +{toArabicNumber(quest.xpReward)}
                  </p>
                  <p className="text-[10px] text-white/40">XP</p>
                </div>
              </div>

              {/* شريط التقدم */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${quest.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      delay: 0.3 + i * 0.08,
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                  />
                </div>
                <span className="text-xs text-white/50 font-body whitespace-nowrap">
                  {toArabicNumber(quest.progress)}/{toArabicNumber(quest.target)}
                </span>
              </div>

              {/* زر الاستلام / الحالة */}
              <AnimatePresence mode="wait">
                {isJustClaimed ? (
                  <motion.div
                    key="just-claimed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full py-2.5 rounded-xl bg-emerald2-500/20 border border-emerald2-400/40 flex items-center justify-center gap-2 text-emerald2-300 font-bold text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>+{toArabicNumber(quest.xpReward)} XP! 🎉</span>
                  </motion.div>
                ) : isRecentlyClaimed ? (
                  <motion.div
                    key="claimed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white/40 font-body text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم الاستلام — عد غداً</span>
                  </motion.div>
                ) : isComplete ? (
                  <motion.button
                    key="claim"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleClaim(quest)}
                    className="btn-primary w-full !py-2.5 !text-sm"
                  >
                    <Gift className="w-4 h-4" /> استلم المكافأة
                  </motion.button>
                ) : (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2 py-2 text-sm text-white/40 font-body"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>قيد التقدم...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* بطاقة المكافأة اليومية */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5 mt-5 flex items-center gap-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shrink-0"
        >
          <Gift className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <p className="font-bold text-white font-body text-sm">
            مكافأة يومية متاحة!
          </p>
          <p className="text-xs text-white/50 font-body">
            عد كل يوم للحفاظ على سلسلتك واكسب نقاط إضافية
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default QuestsScreen;