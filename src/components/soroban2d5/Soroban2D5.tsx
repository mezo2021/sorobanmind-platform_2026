// src/components/soroban2d5/Soroban2D5.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useSorobanLogic } from './useSorobanLogic';
import { Rod2D5 } from './Rod2D5';
import { useBeadSound } from './useBeadSound';
import { useBeadHaptics } from './useBeadHaptics';

interface Soroban2D5Props {
  columns?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  showValue?: boolean;
  interactive?: boolean;
  /** عرض مثل "شاهد": يعرض قيمة معينة بدون تفاعل */
  demoValue?: number;
}

export function Soroban2D5({
  columns = 4,
  initialValue = 0,
  onValueChange,
  showValue = true,
  interactive = true,
  demoValue,
}: Soroban2D5Props) {
  const {
    columns: colStates,
    totalValue,
    toggleUpper,
    setLower,
    resetColumn,
    resetAll,
    setValue,
  } = useSorobanLogic(columns);

  const playSound = useBeadSound();
  const vibrate = useBeadHaptics();

  // ✅ مزامنة القيمة الأولية
  useEffect(() => {
    if (initialValue > 0) setValue(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ وضع "شاهد" — نعرض قيمة معينة
  useEffect(() => {
    if (demoValue !== undefined) setValue(demoValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoValue]);

  // ✅ إبلاغ الأب عند تغيّر القيمة
  useEffect(() => {
    onValueChange?.(totalValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalValue]);

  const handleResetAll = () => {
    playSound('slide');
    vibrate('medium');
    resetAll();
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 p-6">
      {/* العنوان */}
      <h3 className="text-2xl font-bold text-amber-900">
        🧮 عداد السوروبان
      </h3>

      {/* الإطار الخشبي */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative rounded-3xl p-6"
        style={{
          background:
            'linear-gradient(135deg, #8b6f47 0%, #6b4423 50%, #4a2e15 100%)',
          boxShadow: `
            inset 0 4px 12px rgba(255,200,150,0.15),
            inset 0 -6px 16px rgba(0,0,0,0.4),
            0 20px 40px rgba(0,0,0,0.35),
            0 8px 16px rgba(0,0,0,0.25)
          `,
          border: '2px solid rgba(0,0,0,0.25)',
        }}
      >
        {/* الإطار الداخلي */}
        <div
          className="relative rounded-2xl p-4"
          style={{
            background: 'linear-gradient(180deg, #fef9f0 0%, #f5e6c8 100%)',
            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {/* 
            ✅ الأعمدة — نعرض من اليسار (آلاف) إلى اليمين (آحاد)
            colStates[0] = أعلى مرتبة (آلاف) → يظهر يساراً
            colStates[last] = آحاد → يظهر يميناً
            displayOrder: 0 = آحاد، 1 = عشرات، 2 = مئات، 3 = آلاف...
          */}
          <div
            className="flex flex-row-reverse items-center justify-center gap-6"
            style={{ paddingTop: 40, paddingBottom: 40 }}
            dir="rtl"
          >
            {colStates.map((state, idx) => {
              // نعكس الترتيب: colStates[0] (أعلى مرتبة) → displayOrder أعلى
              const displayOrder = columns - 1 - idx;
              return (
                <Rod2D5
                  key={idx}
                  state={state}
                  columnIndex={idx}
                  displayOrder={displayOrder}
                  onToggleUpper={() => interactive && toggleUpper(idx)}
                  onSetLower={(count) => interactive && setLower(idx, count)}
                  onReset={() => interactive && resetColumn(idx)}
                />
              );
            })}
          </div>
        </div>

        {/* أزرار التحكم */}
        {interactive && (
          <div className="flex justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleResetAll}
              className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold shadow-lg backdrop-blur-sm transition"
            >
              ↺ إعادة الكل
            </button>
          </div>
        )}
      </motion.div>

      {/* عرض القيمة الحالية */}
      {showValue && (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={totalValue}
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.6, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="text-5xl font-black text-amber-900 tabular-nums"
            style={{
              fontFamily: 'monospace',
              textShadow: '0 4px 8px rgba(139,111,71,0.3)',
            }}
          >
            {totalValue.toLocaleString('ar-EG')}
          </motion.div>
        </AnimatePresence>
      )}

      {/* تعليمات */}
      <p className="text-sm text-amber-700 text-center max-w-md">
        💡 اضغط على الخرزة لتفعيلها. الخرزة العلوية = <strong>5</strong>،
        السفلية = <strong>1</strong>.
      </p>
    </div>
  );
}

export default Soroban2D5;