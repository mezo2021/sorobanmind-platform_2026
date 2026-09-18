import { useState, useCallback } from 'react';
import { ArrowRight, RotateCcw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBeadClasses } from './Soroban';

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const COLUMNS = 5;
const COLUMN_LABELS = ['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف'];

function InteractiveColumn({
  digit,
  onChange,
}: {
  digit: number;
  onChange: (newDigit: number) => void;
}) {
  const upperActive = digit >= 5;
  const lowerActiveCount = digit % 5;
  const lowerInactiveCount = 4 - lowerActiveCount;

  const handleUpperClick = () => {
    onChange(upperActive ? digit - 5 : digit + 5);
  };

  const handleActiveLowerClick = (index: number) => {
    onChange((upperActive ? 5 : 0) + index);
  };

  const handleInactiveLowerClick = (index: number) => {
    const newCount = Math.min(lowerActiveCount + index + 1, 4);
    onChange((upperActive ? 5 : 0) + newCount);
  };

  return (
    <div className="relative flex flex-col items-center w-10 sm:w-12">
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-amber-800/70" />

      <div className="relative z-10 flex flex-col w-full items-center h-[60px] sm:h-[68px]">
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={handleUpperClick}
          className={`${upperActive ? 'mt-auto mb-1.5' : 'mt-1.5'} cursor-pointer`}
          aria-label="خرزة علوية"
        >
          <div className={getBeadClasses('gold', upperActive)} />
        </motion.button>
      </div>

      <div className="relative z-10 w-full h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />

      <div className="relative z-10 flex flex-col justify-between w-full items-center h-[132px] sm:h-[148px]">
        <div className="flex flex-col items-center gap-[3px] mt-1.5">
          {Array.from({ length: lowerActiveCount }).map((_, i) => (
            <motion.button
              key={`a-${i}`}
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => handleActiveLowerClick(i)}
              className="cursor-pointer"
            >
              <div className={getBeadClasses('blue', true)} />
            </motion.button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-[3px] mb-1.5">
          {Array.from({ length: lowerInactiveCount }).map((_, i) => (
            <motion.button
              key={`i-${i}`}
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => handleInactiveLowerClick(i)}
              className="cursor-pointer"
            >
              <div className={getBeadClasses('blue', false)} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface InteractiveSorobanScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'bead' | 'whoosh') => void;
  onXP?: (amount: number) => void;
}

export function InteractiveSorobanScreen({
  onBack,
  playSound,
}: InteractiveSorobanScreenProps) {
  const [digits, setDigits] = useState<number[]>(() => Array(COLUMNS).fill(0));

  const totalValue = digits.reduce((acc, d, i) => acc + d * Math.pow(10, i), 0);

  const updateDigit = useCallback(
    (index: number, newDigit: number) => {
      const clamped = Math.max(0, Math.min(9, newDigit));
      setDigits((prev) => {
        const next = [...prev];
        next[index] = clamped;
        return next;
      });
      playSound('bead');
    },
    [playSound]
  );

  const handleReset = () => {
    playSound('whoosh');
    setDigits(Array(COLUMNS).fill(0));
  };

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto">
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
            السوروبان التفاعلي
          </h2>
          <p className="text-sm text-white/50 font-body">المس الخرزات لتكوين الأرقام</p>
        </div>
      </div>

      <div className="glass-card p-5 sm:p-6 mb-4 text-center">
        <p className="text-white/50 text-sm mb-1 font-body">القيمة الإجمالية</p>
        <motion.p
          key={totalValue}
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl sm:text-6xl font-extrabold font-display text-electric-300 tabular-nums"
        >
          {toArabicNumber(totalValue)}
        </motion.p>
      </div>

      <div className="glass-card p-4 sm:p-6 mb-4 overflow-x-auto">
        <div
          className="flex flex-row-reverse items-start justify-center gap-2 sm:gap-3 min-w-max"
          dir="ltr"
        >
          {digits.map((digit, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <InteractiveColumn
                digit={digit}
                onChange={(newDigit) => updateDigit(idx, newDigit)}
              />
              <div className="mt-2 text-[10px] text-white/40 font-body">
                {COLUMN_LABELS[4 - idx]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleReset} className="btn-primary flex-1">
          <RotateCcw className="w-5 h-5" /> تصفير
        </button>
      </div>

      <div className="glass-card p-4 mt-4 flex items-start gap-3">
        <Calculator className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
        <div className="text-xs text-white/60 font-body leading-relaxed">
          <p className="font-bold text-white/80 mb-1">كيف تستخدم السوروبان؟</p>
          <p>• المس الخرزة العلوية (الذهبية) لتحريكها للأسفل (قيمتها ٥).</p>
          <p>• المس الخرزات السفلية (الزرقاء) لتحريكها للأعلى (قيمة كل واحدة ١).</p>
          <p>• الخرزات الملامسة للعارضة فقط تُحتسب.</p>
        </div>
      </div>
    </div>
  );
}

export { InteractiveSorobanScreen };
export default InteractiveSorobanScreen;
