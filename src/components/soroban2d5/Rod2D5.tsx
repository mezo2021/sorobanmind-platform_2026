import { Bead2D5 } from './Bead2D5';
import type { BeadState } from './useSorobanLogic';

interface Rod2D5Props {
  state: BeadState;
  columnIndex: number;
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
  height = 440,
  beadSize = 44,
}: Rod2D5Props) {
  const lowerBeads = [0, 1, 2, 3];

  // 🎯 حسابات دقيقة
  const beadHeight = beadSize * 0.42;
  const gap = 2; // مسافة صغيرة جداً بين الخرزات
  const step = beadHeight + gap;

  // ✅ الطول الكلي للقضيب
  const rodHeight = height - 30;
  const beamY = rodHeight / 2;

  // ✅ الخرزة العلوية:
  // - عند الإلغاء (upper=0): تلامس الإطار العلوي تماماً
  // - عند التفعيل (upper=5): تلامس العارضة تماماً
  const upperBeadTop = 2; // ملامسة الإطار العلوي
  const upperBeadActive = beamY - beadHeight - 2; // ملامسة العارضة

  // ✅ الخرزات السفلية:
  // - عند الإلغاء: تلامس الإطار السفلي
  // - عند التفعيل: تلامس العارضة
  const lowerAreaTop = beamY + 4; // أول خرزة مفعلة (فوق، ملاصقة للعارضة)
  const lowerAreaBottom = rodHeight - beadHeight - 2; // آخر خرزة غير مفعلة (تحت، ملاصقة للإطار السفلي)

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ height, width: beadSize * 1.3 }}
    >
      {/* القضيب */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 6,
          height: rodHeight,
          background: 'linear-gradient(90deg, #5a5a5a 0%, #999 50%, #5a5a5a 100%)',
          borderRadius: 3,
          boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)',
        }}
      />

      {/* الخرزة العلوية */}
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

      {/* الخرزات السفلية */}
      {lowerBeads.map((idx) => {
        const isActive = idx < state.lower;

        // ✅ عند التفعيل: من العارضة للأسفل
        const topActive = lowerAreaTop + idx * step;

        // ✅ عند الإلغاء: من الإطار السفلي للأعلى
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

      {/* زر التصفير */}
      <button
        type="button"
        onClick={onReset}
        className="absolute text-amber-700 hover:text-amber-900 underline whitespace-nowrap"
        style={{
          fontSize: 11,
          bottom: 2,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        aria-label="إعادة تصفير العمود"
      >
        ↺ تصفير
      </button>

      {/* اسم العمود */}
      <div
        className="absolute text-amber-800 font-bold whitespace-nowrap"
        style={{
          fontSize: 13,
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