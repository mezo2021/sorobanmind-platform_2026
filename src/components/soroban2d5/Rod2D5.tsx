// src/components/soroban2d5/Rod2D5.tsx
import { motion } from 'framer-motion';
import { Bead2D5 } from './Bead2D5';
import type { BeadState } from './useSorobanLogic';

interface Rod2D5Props {
  state: BeadState;
  columnIndex: number;
  onToggleUpper: () => void;
  onSetLower: (count: number) => void;
  onReset: () => void;
  height?: number;
  beadSize?: number;
}

export function Rod2D5({
  state,
  columnIndex,
  onToggleUpper,
  onSetLower,
  onReset,
  height = 380,
  beadSize = 44,
}: Rod2D5Props) {
  // 4 خرزات سفلية + 1 علوية
  const lowerBeads = [0, 1, 2, 3];
  const beamY = height / 2;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ height, width: beadSize * 1.3 }}
    >
      {/* القضيب الخلفي */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 6,
          height: '100%',
          background: 'linear-gradient(90deg, #5a5a5a 0%, #999 50%, #5a5a5a 100%)',
          borderRadius: 3,
          boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)',
        }}
      />

      {/* الخرزة العلوية (قيمة 5) — تتحرك للأسفل عند التفعيل */}
      <div
        style={{
          position: 'absolute',
          top: beamY - beadSize * 1.4,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Bead2D5
          color="dark"
          active={state.upper === 5}
          position="upper"
          size={beadSize}
          onClick={onToggleUpper}
        />
      </div>

      {/* العارضة الوسطى */}
      <div
        style={{
          position: 'absolute',
          top: beamY - 3,
          left: -8,
          width: beadSize * 1.3 + 16,
          height: 6,
          background: 'linear-gradient(180deg, #3d2817 0%, #1a0f08 100%)',
          borderRadius: 3,
          boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        }}
      />

      {/* الخرزات السفلية (قيمة 1) — ترتفع للأعلى عند التفعيل */}
      {lowerBeads.map((idx) => {
        const isActive = idx < state.lower;
        const baseY = beamY + beadSize * 0.6 + idx * beadSize * 0.55;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: baseY,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Bead2D5
              color="wood"
              active={isActive}
              position="lower"
              size={beadSize}
              onClick={() => {
                // الضغط على خرزة N → تفعّل من 0 إلى N
                // الضغط على خرزة مفعّلة → تلغي من N إلى الأسفل
                if (isActive && idx === state.lower - 1) {
                  onSetLower(idx);       // إلغاء هذه الخرزة ومن تحتها
                } else {
                  onSetLower(idx + 1);   // تفعيل حتى هذه
                }
              }}
            />
          </div>
        );
      })}

      {/* زر إعادة التصفير أسفل العمود */}
      <button
        type="button"
        onClick={onReset}
        className="absolute -bottom-10 text-xs text-amber-700 hover:text-amber-900 underline"
        style={{ fontSize: 11 }}
        aria-label="إعادة تصفير العمود"
      >
        تصفير ↺
      </button>

      {/* رقم العمود */}
      <div
        className="absolute -top-8 text-amber-800 font-bold"
        style={{ fontSize: 14 }}
      >
        {['آلاف', 'مئات', 'عشرات', 'آحاد'][columnIndex] || `عمود ${columnIndex + 1}`}
      </div>
    </div>
  );
}