import { motion } from 'framer-motion';
import { Swords, Shield, Star, TrendingUp, Brain, ArrowRight } from 'lucide-react';
import type { Role } from '@/types';

interface RoleSelectionProps {
  onSelect: (role: Role) => void;
  playSound: (type: 'click' | 'whoosh') => void;
}

export function RoleSelection({ onSelect, playSound }: RoleSelectionProps) {
  const handleSelect = (role: Role) => {
    playSound('whoosh');
    onSelect(role);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Title */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center mb-8 sm:mb-12"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-electric-500 shadow-2xl shadow-purple-500/40 mb-4"
        >
          <Brain className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </motion.div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-display shimmer-text mb-2">
          SorobanMind
        </h1>
        <p className="text-xl sm:text-2xl text-white/80 font-body font-semibold">
          أكاديمية السوروبان
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm sm:text-base text-white/50 mt-3 font-body"
        >
          اختر شخصيتك وابدأ مغامرة الحساب الذهني
        </motion.p>
      </motion.div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 w-full max-w-4xl">
        {/* Hero (Child) */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSelect('hero')}
          className="group relative glass-card p-6 sm:p-8 overflow-hidden text-right"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-electric-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center shadow-xl shadow-purple-500/40 mb-5"
          >
            <Swords className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Star className="w-3.5 h-3.5 text-gold-900" />
            </motion.div>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-1">
            البطل
          </h2>
          <p className="text-lg text-purple-300/80 font-body mb-3">Hero (Child)</p>
          <p className="text-sm text-white/60 font-body mb-5 leading-relaxed">
            تدرب على السوروبان، العب ألعاب الأنزان، اكسب نقاط الخبرة، وارتقِ في المستويات
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {['تعلّم', 'تدرّب', 'أنزان', 'مغامرات'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-body text-white/70">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-purple-300 font-bold text-sm group-hover:gap-3 transition-all">
            <span>ابدأ المغامرة</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </div>
        </motion.button>

        {/* Guardian (Parent) */}
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSelect('guardian')}
          className="group relative glass-card p-6 sm:p-8 overflow-hidden text-right"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald2-500/20 via-transparent to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-emerald2-500 to-gold-500 flex items-center justify-center shadow-xl shadow-emerald2-500/40 mb-5"
          >
            <Shield className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-1">
            ولي الأمر
          </h2>
          <p className="text-lg text-emerald2-300/80 font-body mb-3">Guardian (Parent)</p>
          <p className="text-sm text-white/60 font-body mb-5 leading-relaxed">
            تابع تقدم طفلك، اطلع على الإحصائيات، وشجعه على الاستمرار في رحلة التعلم
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {['تقارير', 'إحصائيات', 'متابعة', 'تقدم'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-body text-white/70">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-emerald2-300 font-bold text-sm group-hover:gap-3 transition-all">
            <span>لوحة المتابعة</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </div>
        </motion.button>
      </div>

      {/* Bottom info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 mt-10 text-white/40 text-sm font-body"
      >
        <TrendingUp className="w-4 h-4" />
        <span>منصة تعليمية تفاعلية للحساب الذهني بالعداد الياباني</span>
      </motion.div>
    </div>
  );
}
