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

  // ✅ شاشة كاملة — بدون modal
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      dir="rtl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        className="w-full max-w-md"
      >
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center shadow-xl shadow-purple-500/40">
          <User className="w-10 h-10 text-white" />
        </div>

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
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            dir="rtl"
            inputMode="text"
            className="w-full px-4 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white text-lg font-bold font-body text-center placeholder:text-white/30 placeholder:font-normal focus:outline-none focus:border-purple-400/60 transition-colors"
          />
          {error && (
            <p className="text-sm text-red-300 font-body text-center mt-2">
              {error}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={name.trim().length < 2}
          className="btn-primary w-full !py-4 disabled:opacity-40"
        >
          <Check className="w-5 h-5" />
          ابدأ المغامرة!
        </button>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="w-full mt-3 text-sm text-white/40 font-body hover:text-white/60 transition-colors py-2"
        >
          تخطّي (استخدم "البطل" كاسم)
        </button>
      </motion.div>
    </div>
  );
}

export default NameInputModal;