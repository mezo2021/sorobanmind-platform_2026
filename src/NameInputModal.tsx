import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Check } from 'lucide-react';

interface NameInputModalProps {
  onSave: (name: string) => void;
  onSkip?: () => void;
}

export function NameInputModal({ onSave, onSkip }: NameInputModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError('الرجاء إدخال اسم لا يقل عن حرفين');
      return;
    }
    if (trimmed.length > 20) {
      setError('الاسم طويل جداً (20 حرفاً كحد أقصى)');
      return;
    }
    onSave(trimmed);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onSave('البطل');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/10"
      dir="rtl"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center shadow-xl shadow-purple-500/40"
      >
        <User className="w-10 h-10 text-white" />
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white text-center mb-2">
        ما اسمك أيها البطل؟
      </h2>
      <p className="text-sm text-white/50 font-body text-center mb-6">
        سنستخدم اسمك لتخصيص تجربتك في الأكاديمية
      </p>

      {/* Input */}
      <div className="mb-5">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="اكتب اسمك هنا..."
          maxLength={20}
          autoFocus
          dir="rtl"
          className="w-full px-4 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white text-lg font-bold font-body text-center placeholder:text-white/30 placeholder:font-normal focus:outline-none focus:border-purple-400/60 transition-colors"
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-300 font-body text-center mt-2"
          >
            {error}
          </motion.p>
        )}
      </div>

      {/* Submit button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={name.trim().length < 2}
        className="btn-primary w-full !py-4 disabled:opacity-40"
      >
        <Check className="w-5 h-5" />
        ابدأ المغامرة!
      </motion.button>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="w-full mt-3 text-sm text-white/40 font-body hover:text-white/60 transition-colors py-2"
      >
        تخطّي (استخدم "البطل" كاسم)
      </button>
    </motion.div>
  );
}

export default NameInputModal;
