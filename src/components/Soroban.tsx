import React from 'react';

// ============================================================
// أنواع وثوابت مشتركة (يتم استيرادها من InteractiveSoroban.tsx
// لضمان تطابق الألوان والقياسات بين الوضعين)
// ============================================================

export type BeadColor = 'gold' | 'blue';

export const BEAD_SIZE = 'w-7 h-7 sm:w-8 sm:h-8';

export function getBeadClasses(color: BeadColor, active: boolean): string {
  const base = `${BEAD_SIZE} rounded-full border transition-colors duration-150`;

  if (color === 'gold') {
    return active
      ? `${base} bg-gradient-to-br from-yellow-300 to-amber-500 border-yellow-100 shadow-[0_0_8px_rgba(251,191,36,0.7)]`
      : `${base} bg-gradient-to-br from-amber-700 to-amber-900 border-amber-500/80`;
  }

  return active
    ? `${base} bg-gradient-to-br from-sky-300 to-sky-500 border-sky-100 shadow-[0_0_8px_rgba(56,189,248,0.7)]`
    : `${base} bg-gradient-to-br from-blue-800 to-blue-950 border-blue-600/80`;
}

interface BeadProps {
  color: BeadColor;
  active: boolean;
}

export const Bead: React.FC<BeadProps> = ({ color, active }) => (
  <div className={getBeadClasses(color, active)} />
);

// حوّل قيمة رقمية إلى مصفوفة أرقام (الآحاد أولاً، ثم العشرات، ...)
export function valueToDigits(value: number, columns: number): number[] {
  const safe = Math.max(0, Math.min(Math.pow(10, columns) - 1, Math.floor(Math.abs(value))));
  const str = String(safe).padStart(columns, '0');
  // اقلب الترتيب ليصبح digits[0] = الآحاد، digits[1] = العشرات، وهكذا
  return str.split('').reverse().map(Number);
}

// ============================================================
// عمود سوروبان واحد (رقم من 0 إلى 9) — عرض فقط
// ============================================================

interface SorobanColumnProps {
  digit: number; // 0-9
}

export const SorobanColumn: React.FC<SorobanColumnProps> = ({ digit }) => {
  const upperActive = digit >= 5;
  const lowerActiveCount = digit % 5;
  const lowerInactiveCount = 4 - lowerActiveCount;

  return (
    <div className="relative flex flex-col items-center w-10 sm:w-12">
      {/* العمود الرأسي (القضيب) */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-amber-800/70" />

      {/* القسم العلوي: السماء (خرزة ذهبية واحدة) */}
      <div className="relative z-10 flex flex-col w-full items-center h-[60px] sm:h-[68px]">
        <div className={upperActive ? 'mt-auto mb-1.5' : 'mt-1.5'}>
          <Bead color="gold" active={upperActive} />
        </div>
      </div>

      {/* العارضة الوسطى */}
      <div className="relative z-10 w-full h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />

      {/* القسم السفلي: الأرض (أربع خرزات زرقاء) */}
      <div className="relative z-10 flex flex-col justify-between w-full items-center h-[132px] sm:h-[148px] py-1.5">
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-amber-800/70" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />

        {/* الخرزات المفعّلة: ملتصقة بالعارضة من الأسفل */}
        <div className="relative z-10 flex flex-col items-center gap-[3px]">
          {Array.from({ length: lowerActiveCount }).map((_, i) => (
            <Bead key={`active-${i}`} color="blue" active />
          ))}
        </div>
        {/* الخرزات غير المفعّلة: بعيدة عند أسفل الإطار */}
        <div className="relative z-10 flex flex-col items-center gap-[3px]">
          {Array.from({ length: lowerInactiveCount }).map((_, i) => (
            <Bead key={`inactive-${i}`} color="blue" active={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// السوروبان الكامل (5 أعمدة افتراضياً) — عرض فقط، وضع "شاهد"
// ============================================================

interface SorobanProps {
  value: number;
  columns?: number;
  className?: string;
}

const Soroban: React.FC<SorobanProps> = ({ value, columns = 5, className = '' }) => {
  const digits = valueToDigits(value, columns);

  return (
    <div className={`inline-flex flex-col items-center gap-3 p-5 glass rounded-3xl ${className}`}>
      <div className="flex flex-row-reverse items-center justify-center gap-1 sm:gap-2" dir="ltr">
        {digits.map((digit, idx) => (
          <SorobanColumn key={idx} digit={digit} />
        ))}
      </div>
    </div>
  );
};

export { Soroban };
export default Soroban;
