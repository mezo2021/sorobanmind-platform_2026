import { useState, useCallback, useEffect } from 'react';
import { ArrowRight, RotateCcw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { Soroban2D5 } from './soroban2d5/Soroban2D5';

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const COLUMNS = 5;

interface InteractiveSorobanScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'bead' | 'whoosh') => void;
  onXP?: (amount: number) => void;
}

export function InteractiveSorobanScreen({
  onBack,
  playSound,
  onXP,
}: InteractiveSorobanScreenProps) {
  const [totalValue, setTotalValue] = useState(0);

  const handleValueChange = useCallback((value: number) => {
    setTotalValue(value);
    playSound('bead');
  }, [playSound]);

  const handleReset = () => {
    playSound('whoosh');
    // إعادة التصفير تتم داخل Soroban2D5 عبر زر "إعادة الكل"
    // لكن لضمان التزامن، نحدّث القيمة هنا
    setTotalValue(0);
  };

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto">
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
            السوروبان التفاعلي
          </h2>
          <p className="text-sm text-white/50 font-body">
            المس الخرزات لتكوين الأرقام
          </p>
        </div>
      </div>

      {/* بطاقة القيمة الإجمالية */}
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

      {/* ✅ السوروبان 2.5D الجديد */}
      <div className="glass-card p-4 sm:p-6 mb-4 overflow-x-auto">
        <Soroban2D5
          columns={COLUMNS}
          interactive={true}
          showValue={false}
          onValueChange={handleValueChange}
        />
      </div>

      {/* زر التصفير (يمكن حذفه — Soroban2D5 فيه زر "إعادة الكل") */}
      {/* أبقيناه للتوافق مع الواجهة القديمة */}
      <div className="flex gap-3">
        <button onClick={handleReset} className="btn-primary flex-1">
          <RotateCcw className="w-5 h-5" /> تصفير
        </button>
      </div>

      {/* بطاقة التعليمات */}
      <div className="glass-card p-4 mt-4 flex items-start gap-3">
        <Calculator className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
        <div className="text-xs text-white/60 font-body leading-relaxed">
          <p className="font-bold text-white/80 mb-1">
            كيف تستخدم السوروبان؟
          </p>
          <p>• المس الخرزة العلوية (الذهبية) لتحريكها للأسفل (قيمتها ٥).</p>
          <p>• المس الخرزات السفلية (الزرقاء) لتحريكها للأعلى (قيمة كل واحدة ١).</p>
          <p>• الخرزات الملامسة للعارضة فقط تُحتسب.</p>
        </div>
      </div>
    </div>
  );
}

export default InteractiveSorobanScreen;