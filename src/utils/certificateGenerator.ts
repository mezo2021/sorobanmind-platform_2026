// ============================================================
// certificateGenerator.ts — توليد شهادة PDF
// ============================================================
import jsPDF from 'jspdf';

interface CertificateData {
  studentName: string;
  finalScore: number;
  averageScore: number;
  date: string;
  certificateNumber: string;
  appreciation: string;
}

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SNM-${year}-${random}`;
}

function getAppreciation(score: number): string {
  if (score >= 90) return 'متميز';
  if (score >= 80) return 'جيد جداً';
  if (score >= 70) return 'جيد';
  if (score >= 60) return 'مقبول';
  return 'راسب';
}

export function getCertificateData(
  studentName: string,
  exam1Score: number,
  exam2Score: number
): CertificateData {
  const averageScore = Math.round((exam1Score + exam2Score) / 2);
  return {
    studentName: studentName || 'اكتب اسمك الثلاثي',
    finalScore: exam1Score + exam2Score,
    averageScore,
    date: new Date().toLocaleDateString('ar-EG'),
    certificateNumber: generateCertificateNumber(),
    appreciation: getAppreciation(averageScore),
  };
}

export function generateCertificatePDF(data: CertificateData): void {
  // A4 size in mm: 210 x 297
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ===== الخلفية =====
  doc.setFillColor(253, 251, 245); // بيج فاتح
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // ===== الإطار الذهبي الخارجي =====
  doc.setDrawColor(212, 175, 55); // ذهبي
  doc.setLineWidth(3);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // ===== الإطار الذهبي الداخلي =====
  doc.setDrawColor(184, 134, 11);
  doc.setLineWidth(1);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // ===== زخارف الزوايا =====
  const cornerSize = 15;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(2);

  // الزاوية العلوية اليسرى
  doc.line(14, 14 + cornerSize, 14 + cornerSize, 14 + cornerSize);
  doc.line(14 + cornerSize, 14, 14 + cornerSize, 14 + cornerSize);

  // الزاوية العلوية اليمنى
  doc.line(pageWidth - 14, 14 + cornerSize, pageWidth - 14 - cornerSize, 14 + cornerSize);
  doc.line(pageWidth - 14 - cornerSize, 14, pageWidth - 14 - cornerSize, 14 + cornerSize);

  // الزاوية السفلية اليسرى
  doc.line(14, pageHeight - 14 - cornerSize, 14 + cornerSize, pageHeight - 14 - cornerSize);
  doc.line(14 + cornerSize, pageHeight - 14, 14 + cornerSize, pageHeight - 14 - cornerSize);

  // الزاوية السفلية اليمنى
  doc.line(pageWidth - 14, pageHeight - 14 - cornerSize, pageWidth - 14 - cornerSize, pageHeight - 14 - cornerSize);
  doc.line(pageWidth - 14 - cornerSize, pageHeight - 14, pageWidth - 14 - cornerSize, pageHeight - 14 - cornerSize);

  // ===== الأكاديمية (أعلى) =====
  doc.setFontSize(14);
  doc.setTextColor(76, 29, 149); // بنفسجي داكن
  doc.text('International Soroban Academy', pageWidth / 2, 28, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(76, 29, 149);
  doc.text('أكاديمية السوروبان الدولية', pageWidth / 2, 38, { align: 'center' });

  // ===== خط فاصل =====
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 50, 43, pageWidth / 2 + 50, 43);

  // ===== العنوان الرئيسي =====
  doc.setFontSize(32);
  doc.setTextColor(184, 134, 11); // ذهبي داكن
  doc.text('شهادة إتمام', pageWidth / 2, 65, { align: 'center' });

  // ===== العنوان الفرعي =====
  doc.setFontSize(18);
  doc.setTextColor(76, 29, 149);
  doc.text('دورة السوروبان الدولية', pageWidth / 2, 80, { align: 'center' });

  doc.setFontSize(16);
  doc.text('في الحساب الذهني', pageWidth / 2, 90, { align: 'center' });

  // ===== خط فاصل =====
  doc.setDrawColor(212, 175, 55);
  doc.line(30, 98, pageWidth - 30, 98);

  // ===== النص التمهيدي =====
  doc.setFontSize(13);
  doc.setTextColor(51, 51, 51);
  doc.text('تشهد الأكاديمية بأن الطالب/ة:', pageWidth / 2, 112, { align: 'center' });

  // ===== اسم الطالب =====
  doc.setFontSize(28);
  doc.setTextColor(184, 134, 11);
  doc.text(data.studentName, pageWidth / 2, 130, { align: 'center' });

  // خط تحت الاسم
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 70, 135, pageWidth / 2 + 70, 135);

  // ===== نص الإتمام =====
  doc.setFontSize(13);
  doc.setTextColor(51, 51, 51);
  doc.text('قد أكمل/ت بنجاح متطلبات الدورة،', pageWidth / 2, 148, { align: 'center' });
  doc.text('وأثبت/ت إتقان/اً للحساب الذهني بالسوروبان.', pageWidth / 2, 156, { align: 'center' });

  // ===== الدرجة =====
  doc.setFontSize(14);
  doc.setTextColor(76, 29, 149);
  doc.text(`الدرجة النهائية: ${toArabicNumber(data.finalScore)} من ${toArabicNumber(200)}`, pageWidth / 2, 172, { align: 'center' });

  doc.setFontSize(13);
  doc.setTextColor(51, 51, 51);
  doc.text(`التقدير: ${data.appreciation}`, pageWidth / 2, 180, { align: 'center' });

  // ===== التاريخ ورقم الشهادة =====
  doc.setFontSize(11);
  doc.setTextColor(102, 102, 102);
  doc.text(`التاريخ: ${data.date}`, 30, pageHeight - 30);
  doc.text(`رقم الشهادة: ${data.certificateNumber}`, pageWidth - 30, pageHeight - 30, { align: 'right' });

  // ===== التوقيع =====
  // خط التوقيع
  doc.setDrawColor(76, 29, 149);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 70, pageHeight - 55, pageWidth - 20, pageHeight - 55);

  doc.setFontSize(14);
  doc.setTextColor(76, 29, 149);
  doc.text('مصطفى علي أكر', pageWidth - 45, pageHeight - 48, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(102, 102, 102);
  doc.text('المدير والمؤسس', pageWidth - 45, pageHeight - 42, { align: 'center' });

  // ===== شعار النجمة الذهبية =====
  doc.setFillColor(212, 175, 55);
  doc.circle(pageWidth / 2, pageHeight - 50, 8, 'F');

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('★', pageWidth / 2, pageHeight - 48, { align: 'center' });

  // ===== حفظ الملف =====
  const fileName = `شهادة_${data.studentName.replace(/\s+/g, '_')}_${data.certificateNumber}.pdf`;
  doc.save(fileName);
}