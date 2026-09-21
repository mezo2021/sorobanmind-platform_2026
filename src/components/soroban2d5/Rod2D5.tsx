// src/components/soroban2d5/Rod2D5.tsx
import { Bead2D5 } from './Bead2D5';
import type { BeadState } from './useSorobanLogic';

interface Rod2D5Props {
  state: BeadState;
  columnIndex: number;
  /** الترتيب الحقيقي للعمود (0 = آحاد، 1 = عشرات ...) */
  displayOrder: number;
  onToggleUpper: () => void;
  onSetLower: (count: number) => void;
  onReset: () => void;
  height?: number;
  beadSize?: number;
}

export function Rod2D5({
  state,
  displayOrder,
  onToggleUpper,
  onSetLower,
  onReset,
  height = 340,
  beadSize = 26,
}: Rod2D5Props) {
  const lowerBeads = [0, 1, 2, 3];

  // 🎯 حسابات رياضية دقيقة
  const beadHeight = beadSize * 0.42;    // الارتفاع المرئي للخرزة
  const gap = 2;                          // فراغ صغير
  const step = beadHeight + gap;          // مسافة بين الخرزات

  const beamY = height / 2;               // موضع العارضة (الوسط)

  // ✅ الخرزة العلوية
  const upperBeadTop = beadHeight + 8;                       // موضع "غير مفعّلة" (قريب من الأعلى)
  const upperBeadActive = beamY - beadHeight - 6;            // موضع "مفعّلة" (ملتصقة بالعارضة)

  // ✅ الخرزات السفلية
  const lowerAreaTop = beamY + 6;                            // أسفل العارضة مباشرة
  const lowerAreaBottom = height - beadHeight - 8;           // أعلى قليل من أسفل الإطار

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
          width: 5,
          height: '100%',
          background: 'linear-gradient(90deg, #5a5a5a 0%, #999 50%, #5a5a5a 100%)',
          borderRadius: 3,
          boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)',
        }}
      />

      {/* ========== الخرزة العلوية (قيمة 5) ========== */}
      <div
        style={{
          position: 'absolute',
          top: state.upper === 5 ? upperBeadActive : upperBeadTop,
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'top 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <Bead2D5
          color="dark"
          active={state.upper === 5}
          position="upper"
          size={beadSize}
          onClick={onToggleUpper}
          animateOffset={false}
        />
      </div>

      {/* ========== العارضة الوسطى ========== */}
      <div
        style={{
          position: 'absolute',
          top: beamY - 3,
          left: -6,
          width: beadSize * 1.3 + 12,
          height: 6,
          background: 'linear-gradient(180deg, #3d2817 0%, #1a0f08 100%)',
          borderRadius: 3,
          boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        }}
      />

      {/* ========== الخرزات السفلية (قيمة 1) ========== */}
      {lowerBeads.map((idx) => {
        const isActive = idx < state.lower;

        // مفعّلة: من العارضة للأسفل
        // غير مفعّلة: من الأسفل للأعلى
        const topActive = lowerAreaTop + idx * step;
        const topInactive = lowerAreaBottom - (3 - idx) * step;

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: isActive ? topActive : topInactive,
              left: '50%',
              transform: 'translateX(-50%)',
              transition: 'top 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <Bead2D5
              color="wood"
              active={isActive}
              position="lower"
              size={beadSize}
              onClick={() => {
                if (isActive && idx === state.lower - 1) {
                  onSetLower(idx);
                } else {
                  onSetLower(idx + 1);
                }
              }}
              animateOffset={false}
            />
          </div>
        );
      })}

      {/* ✅ زر إعادة التصفير — أسفل العمود */}
      <button
        type="button"
        onClick={onReset}
        className="absolute text-amber-700 hover:text-amber-900 underline whitespace-nowrap"
        style={{
          fontSize: 10,
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        aria-label="إعادة تصفير العمود"
      >
        ↺ تصفير
      </button>

      {/* ✅ اسم العمود — أعلى العمود */}
      <div
        className="absolute text-amber-800 font-bold whitespace-nowrap"
        style={{
          fontSize: 12,
          top: -22,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف', 'مئات الآلاف'][displayOrder] ||
          `عمود ${displayOrder + 1}`}
      </div>
    </div>
  );
}

export default Rod2D5;