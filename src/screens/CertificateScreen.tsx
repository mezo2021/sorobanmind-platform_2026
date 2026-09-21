import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Award, Star, Home } from 'lucide-react';
import CertificateLogo from '@/components/CertificateLogo';
import { getCertificateData, generateCertificatePDF } from '@/utils/certificateGenerator';

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

interface Props {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'whoosh' | 'levelup') => void;
  onGoHome?: () => void;
}

const CertificateScreen: React.FC<Props> = ({ onBack, playSound, onGoHome }) => {
  const [exam1Score, setExam1Score] = useState(0);
  const [exam2Score, setExam2Score] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    // قراءة نتائج الامتحانين
    try {
      const raw1 = localStorage.getItem('soroban_exam_result');
      if (raw1) {
        const data = JSON.parse(raw1);
        if (data?.score) setExam1Score(data.score);
      }
    } catch { /* ignore */ }

    try {
      const raw2 = localStorage.getItem('soroban_exam2_result');
      if (raw2) {
        const data = JSON.parse(raw2);
        if (data?.score) setExam2Score(data.score);
      }
    } catch { /* ignore */ }

    // قراءة اسم الطالب
    const savedName = localStorage.getItem('soroban_child_full_name');
    if (savedName) {
      setStudentName(savedName);
    } else {
      setEditingName(true);
    }
  }, []);

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    setStudentName(tempName.trim());
    try {
      localStorage.setItem('soroban_child_full_name', tempName.trim());
    } catch { /* ignore */ }
    setEditingName(false);
    playSound('success');
  };

  const certificateData = getCertificateData(studentName, exam1Score, exam2Score);

  const handleDownload = () => {
    if (!studentName || studentName === 'اكتب اسمك الثلاثي') {
      setEditingName(true);
      return;
    }
    playSound('click');
    generateCertificatePDF(certificateData);
    playSound('success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white p-4 pb-24" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
          شهادة الإتمام
        </h1>
        <Award className="w-6 h-6 text-amber-300" />
      </div>

      {/* تنبيه: اكتب الاسم أولاً */}
      {editingName && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/15 border border-amber-400/40 rounded-2xl p-4 mb-4"
        >
          <p className="text-sm text-amber-100 font-body mb-3">
            📝 اكتب اسمك الثلاثي ليظهر على الشهادة:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="مثال: محمد أحمد العلي"
              className="flex-1 bg-slate-800 border-2 border-amber-500/50 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-amber-400"
              dir="rtl"
            />
            <button
              onClick={handleSaveName}
              disabled={!tempName.trim()}
              className="px-4 py-2 bg-gradient-to-l from-amber-500 to-amber-600 rounded-xl font-bold text-sm disabled:opacity-40"
            >
              حفظ
            </button>
          </div>
        </motion.div>
      )}

      {/* الشهادة */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-6 sm:p-8 mb-4 relative overflow-hidden border-4 border-amber-400 shadow-2xl"
      >
        {/* زخارف الزوايا */}
        <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-amber-500 rounded-tr-2xl" />
        <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-amber-500 rounded-tl-2xl" />
        <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-amber-500 rounded-br-2xl" />
        <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-amber-500 rounded-bl-2xl" />

        {/* الشعار */}
        <div className="flex justify-center mb-3">
          <CertificateLogo size={80} />
        </div>

        {/* الأكاديمية */}
        <p className="text-center text-purple-900 font-bold text-sm mb-1">International Soroban Academy</p>
        <p className="text-center text-purple-900 font-black text-lg mb-3">أكاديمية السوروبان الدولية</p>

        {/* خط فاصل */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <Star className="w-4 h-4 text-amber-500" />
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-center text-3xl sm:text-4xl font-black text-amber-700 mb-2">
          شهادة إتمام
        </h1>
        <p className="text-center text-purple-900 font-bold text-base sm:text-lg">
          دورة السوروبان الدولية
        </p>
        <p className="text-center text-purple-900 font-bold text-sm sm:text-base mb-4">
          في الحساب الذهني
        </p>

        {/* خط فاصل */}
        <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-4" />

        {/* النص التمهيدي */}
        <p className="text-center text-gray-700 text-sm mb-2">
          تشهد الأكاديمية بأن الطالب/ة:
        </p>

        {/* اسم الطالب */}
        <p className="text-center text-2xl sm:text-3xl font-black text-amber-700 mb-1">
          {certificateData.studentName}
        </p>
        <div className="flex justify-center mb-4">
          <div className="w-2/3 h-0.5 bg-amber-500" />
        </div>

        {/* نص الإتمام */}
        <p className="text-center text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
          قد أكمل/ت بنجاح متطلبات الدورة،<br />
          وأثبت/ت إتقان/اً للحساب الذهني بالسوروبان.
        </p>

        {/* الدرجة */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-purple-900/10 rounded-xl p-3 text-center border border-purple-900/20">
            <p className="text-[10px] text-gray-600 mb-1">الدرجة النهائية</p>
            <p className="text-lg font-black text-purple-900">
              {toArabicNumber(certificateData.finalScore)} / {toArabicNumber(200)}
            </p>
          </div>
          <div className="bg-purple-900/10 rounded-xl p-3 text-center border border-purple-900/20">
            <p className="text-[10px] text-gray-600 mb-1">التقدير</p>
            <p className="text-lg font-black text-purple-900">{certificateData.appreciation}</p>
          </div>
        </div>

        {/* التوقيع ورقم الشهادة */}
        <div className="flex items-end justify-between mt-6">
          <div className="text-left">
            <p className="text-[10px] text-gray-600 mb-1">رقم الشهادة</p>
            <p className="text-[10px] font-bold text-purple-900" dir="ltr">{certificateData.certificateNumber}</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-0.5 bg-purple-900 mb-1" />
            <p className="text-sm font-black text-purple-900">مصطفى علي أكر</p>
            <p className="text-[10px] text-gray-600">المدير والمؤسس</p>
          </div>
        </div>
      </motion.div>

      {/* أزرار التحكم */}
      <div className="flex gap-2">
        <button
          onClick={() => setEditingName(true)}
          className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 font-bold flex items-center justify-center gap-2"
        >
          ✏️ تعديل الاسم
        </button>
        <button
          onClick={handleDownload}
          disabled={!studentName || studentName === 'اكتب اسمك الثلاثي'}
          className="flex-1 py-3 rounded-2xl bg-gradient-to-l from-amber-500 to-amber-600 font-bold flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Download className="w-5 h-5" /> تنزيل PDF
        </button>
      </div>

      {onGoHome && (
        <button
          onClick={() => { playSound('click'); onGoHome(); }}
          className="w-full mt-3 py-3 rounded-2xl bg-white/5 hover:bg-white/10 font-bold flex items-center justify-center gap-2 text-white/70"
        >
          <Home className="w-5 h-5" /> الصفحة الرئيسية
        </button>
      )}
    </div>
  );
};

export default CertificateScreen;