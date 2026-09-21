// ═══════════════════════════════════════════════════════════════
// مولّد بيانات الشهادة ومولّد PDF
// ═══════════════════════════════════════════════════════════════

export type CertificateLevel = 'gold' | 'silver' | 'bronze' | 'pass';

export interface CertificateData {
  studentName: string;
  exam1Score: number;      // من 100
  exam2Score: number;      // من 100
  averageScore: number;    // من 100
  level: CertificateLevel;
  levelAr: string;         // "ذهبي" / "فضي" ...
  levelEn: string;         // "Gold" / "Silver" ...
  appreciation: string;    // "ممتاز" / "جيد جداً" ...
  certificateNumber: string;
  issueDate: string;       // ميلادي
  issueDateHijri: string;  // هجري
}

// ─────────────────────────────────────────────
// تحديد المستوى بناءً على المتوسط المئوي
// ─────────────────────────────────────────────
export function getLevel(average: number): {
  level: CertificateLevel;
  levelAr: string;
  levelEn: string;
  appreciation: string;
} {
  if (average >= 95) {
    return { level: 'gold', levelAr: 'ذهبي', levelEn: 'Gold', appreciation: 'ممتاز' };
  }
  if (average >= 85) {
    return { level: 'silver', levelAr: 'فضي', levelEn: 'Silver', appreciation: 'جيد جداً' };
  }
  if (average >= 75) {
    return { level: 'bronze', levelAr: 'برونزي', levelEn: 'Bronze', appreciation: 'جيد' };
  }
  return { level: 'pass', levelAr: 'مقبول', levelEn: 'Pass', appreciation: 'مقبول' };
}

// ─────────────────────────────────────────────
// توليد رقم شهادة فريد
// ─────────────────────────────────────────────
function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `ISA-${year}-${random}`;
}

// ─────────────────────────────────────────────
// التاريخ الهجري التقريبي (بسيط)
// ─────────────────────────────────────────────
function toHijriApprox(date: Date): string {
  // تحويل تقريبي: السنة الميلادية - 622 ثم ضرب 33/32
  const gregorianYear = date.getFullYear();
  const hijriYear = Math.floor(((gregorianYear - 622) * 33) / 32);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${hijriYear} / ${String(month).padStart(2, '0')} / ${String(day).padStart(2, '0')} هـ`;
}

// ─────────────────────────────────────────────
// توليد بيانات الشهادة الكاملة
// ─────────────────────────────────────────────
export function getCertificateData(
  studentName: string,
  exam1Score: number,
  exam2Score: number
): CertificateData {
  const safeName = studentName?.trim() || 'اكتب اسمك الثلاثي';
  const avg = (exam1Score + exam2Score) / 2;
  const averageScore = Math.round(avg * 10) / 10; // منزلة عشرية واحدة
  const { level, levelAr, levelEn, appreciation } = getLevel(averageScore);

  const now = new Date();
  const issueDate = `${now.getFullYear()} / ${String(now.getMonth() + 1).padStart(2, '0')} / ${String(now.getDate()).padStart(2, '0')} م`;

  return {
    studentName: safeName,
    exam1Score,
    exam2Score,
    averageScore,
    level,
    levelAr,
    levelEn,
    appreciation,
    certificateNumber: generateCertificateNumber(),
    issueDate,
    issueDateHijri: toHijriApprox(now),
  };
}

// ─────────────────────────────────────────────
// ألوان المستويات
// ─────────────────────────────────────────────
export function getLevelColors(level: CertificateLevel) {
  switch (level) {
    case 'gold':
      return { primary: '#FFD700', dark: '#B8860B', light: '#FFF8DC', text: '#7B5D0A' };
    case 'silver':
      return { primary: '#C0C0C0', dark: '#808080', light: '#F5F5F5', text: '#4A4A4A' };
    case 'bronze':
      return { primary: '#CD7F32', dark: '#8B4513', light: '#F5E6D3', text: '#5D3A1A' };
    case 'pass':
    default:
      return { primary: '#4A90E2', dark: '#2C5AA0', light: '#E3F2FD', text: '#1A3D7A' };
  }
}

// ─────────────────────────────────────────────
// توليد PDF (بسيط — يعتمد على HTML الحالي)
// ─────────────────────────────────────────────
export function generateCertificatePDF(data: CertificateData): void {
  // ملاحظة: توليد PDF بالعربية يحتاج إعداد خط عربي في jsPDF.
  // سنستخدم هنا طريقة بديلة: فتح نافذة الطباعة ليختار المستخدم "حفظ كـ PDF".
  if (typeof window !== 'undefined') {
    window.print();
  }
}