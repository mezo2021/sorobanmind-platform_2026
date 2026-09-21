import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Printer, Award, Home, Edit3, Sparkles } from 'lucide-react';
import CertificateLogo from '@/components/CertificateLogo';
import {
  getCertificateData,
  getLevelColors,
  type CertificateData,
} from '@/utils/certificateGenerator';

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

  const data: CertificateData = getCertificateData(studentName, exam1Score, exam2Score);
  const colors = getLevelColors(data.level);

  const handlePrint = () => {
    if (!studentName || studentName === 'اكتب اسمك الثلاثي') {
      setEditingName(true);
      return;
    }
    playSound('click');
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white p-3 sm:p-6 pb-24" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
        <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
          شهادة الإتمام الدولية
        </h1>
        <Award className="w-6 h-6 text-amber-300" />
      </div>

      {/* تنبيه اسم */}
      {editingName && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/15 border border-amber-400/40 rounded-2xl p-4 mb-4 max-w-4xl mx-auto"
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

      {/* ═══════ الشهادة ═══════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mb-5 print:my-0"
        style={{
          background: 'linear-gradient(135deg, #B8860B 0%, #FFD700 25%, #B8860B 50%, #FFD700 75%, #8B6914 100%)',
          padding: '10px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #FDF8E7 0%, #F5EBD0 50%, #EFE1BC 100%)',
            borderRadius: '14px',
            padding: '22px 18px',
          }}
        >
          {/* علامة مائية */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <CertificateLogo size={500} />
          </div>

          {/* إطار داخلي مزخرف */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: 8,
              left: 8,
              right: 8,
              bottom: 8,
              border: '2px solid #B8860B',
              borderRadius: '10px',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              top: 12,
              left: 12,
              right: 12,
              bottom: 12,
              border: '1px solid #DAA520',
              borderRadius: '8px',
            }}
          />

          {/* زخارف الزوايا */}
          {[
            { top: 4, left: 4, rotate: 0 },
            { top: 4, right: 4, rotate: 90 },
            { bottom: 4, right: 4, rotate: 180 },
            { bottom: 4, left: 4, rotate: 270 },
          ].map((pos, i) => (
            <svg
              key={i}
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="absolute pointer-events-none"
              style={{ ...pos, transform: `rotate(${pos.rotate}deg)` }}
            >
              <path d="M 2 2 L 20 2 L 20 6 L 6 6 L 6 20 L 2 20 Z" fill="#B8860B" />
              <circle cx="10" cy="10" r="2.5" fill="#FFD700" stroke="#8B6914" strokeWidth="0.5" />
              <circle cx="4" cy="4" r="1.5" fill="#FFD700" />
              <path d="M 20 2 L 30 2" stroke="#B8860B" strokeWidth="1" />
              <path d="M 2 20 L 2 30" stroke="#B8860B" strokeWidth="1" />
            </svg>
          ))}

          {/* ───── المحتوى ───── */}
          <div className="relative z-10 text-center" style={{ color: '#2C1A0E' }}>

            {/* الشعار */}
            <div className="flex justify-center mb-2">
              <CertificateLogo size={100} />
            </div>

            {/* اسم الأكاديمية */}
            <p className="font-serif font-bold text-[10px] sm:text-xs tracking-widest" style={{ color: '#7B5D0A' }}>
              INTERNATIONAL SOROBAN ACADEMY
            </p>
            <p className="font-serif font-black text-sm sm:text-base mt-0.5" style={{ color: '#5D3A1A' }}>
              أكاديمية السوروبان الدولية
            </p>

            {/* فاصل زخرفي */}
            <div className="flex items-center justify-center gap-2 my-3">
              <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to right, transparent, #B8860B, transparent)' }} />
              <span style={{ color: '#B8860B', fontSize: '14px' }}>❖</span>
              <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to left, transparent, #B8860B, transparent)' }} />
            </div>

            {/* العنوان الرئيسي */}
            <h1
              className="font-serif font-black leading-tight"
              style={{
                fontSize: 'clamp(22px, 5vw, 34px)',
                color: '#8B6914',
                textShadow: '1px 1px 0 #FFD700, 2px 2px 3px rgba(0,0,0,0.15)',
              }}
            >
              شهادة إتمام دولية
            </h1>
            <p className="font-serif italic text-[10px] sm:text-xs mt-1" style={{ color: '#7B5D0A' }}>
              International Certificate of Completion
            </p>

            {/* الدورة */}
            <p className="font-bold text-sm sm:text-base mt-2" style={{ color: '#5D3A1A' }}>
              دورة السوروبان الدولية في الحساب الذهني
            </p>

            {/* فاصل */}
            <div className="flex items-center justify-center gap-2 my-3">
              <div className="h-px flex-1 max-w-[200px]" style={{ background: 'linear-gradient(to right, transparent, #DAA520, transparent)' }} />
              <span style={{ color: '#DAA520' }}>✦</span>
              <div className="h-px flex-1 max-w-[200px]" style={{ background: 'linear-gradient(to left, transparent, #DAA520, transparent)' }} />
            </div>

            {/* نص التقديم */}
            <p className="text-xs sm:text-sm" style={{ color: '#5D3A1A' }}>
              تشهد الأكاديمية بأن الطالب/ة المتميز/ة
            </p>

            {/* اسم الطالب */}
            <p
              className="font-serif font-black my-2 sm:my-3"
              style={{
                fontSize: 'clamp(20px, 4.5vw, 30px)',
                color: '#8B6914',
                textShadow: '1px 1px 0 #FFF8DC',
              }}
            >
              {data.studentName}
            </p>

            {/* خط تحت الاسم */}
            <div className="mx-auto mb-3" style={{ width: '60%', maxWidth: '300px', height: '1.5px', background: 'linear-gradient(to right, transparent, #B8860B, transparent)' }} />

            {/* نص الإتمام */}
            <p className="text-[11px] sm:text-xs leading-relaxed px-2 sm:px-6" style={{ color: '#5D3A1A' }}>
              قد أكمل/ت بنجاح متطلبات الدورة الدولية للحساب الذهني بالسوروبان،
              وأثبت/ت إتقان/اً للمهارات الأساسية والمتقدمة وفق معايير الأكاديمية الدولية.
            </p>

            {/* ─── بطاقة النتيجة والمستوى ─── */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 my-4 px-2">
              {/* النتيجة */}
              <div
                className="rounded-xl p-2 sm:p-3 text-center"
                style={{
                  background: 'linear-gradient(135deg, #FFF8DC 0%, #F5EBD0 100%)',
                  border: '1.5px solid #DAA520',
                }}
              >
                <p className="text-[9px] sm:text-[10px] font-bold" style={{ color: '#7B5D0A' }}>
                  الدرجة النهائية
                </p>
                <p className="font-black font-serif leading-none mt-1" style={{ fontSize: 'clamp(18px, 4vw, 26px)', color: '#8B6914' }}>
                  {toArabicNumber(data.averageScore.toFixed(1))}
                </p>
                <p className="text-[9px] sm:text-[10px] mt-0.5" style={{ color: '#7B5D0A' }}>
                  من {toArabicNumber(100)} / 100
                </p>
              </div>

              {/* المستوى */}
              <div
                className="rounded-xl p-2 sm:p-3 text-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.primary} 200%)`,
                  border: `1.5px solid ${colors.dark}`,
                }}
              >
                <p className="text-[9px] sm:text-[10px] font-bold" style={{ color: colors.text }}>
                  المستوى والتقدير
                </p>
                <p className="font-black font-serif leading-none mt-1" style={{ fontSize: 'clamp(14px, 3.2vw, 20px)', color: colors.text }}>
                  {data.appreciation}
                </p>
                <p className="text-[9px] sm:text-[10px] mt-0.5 font-bold" style={{ color: colors.dark }}>
                  🏅 المستوى {data.levelAr}
                </p>
              </div>
            </div>

            {/* ─── التذييل: التوقيعات والأختام ─── */}
            <div className="grid grid-cols-2 gap-2 sm:gap-6 mt-5 mb-3 px-1 sm:px-4">
              {/* يسار: المشرف الأكاديمي */}
              <div className="text-center">
                <div
                  className="mx-auto mb-1 flex items-center justify-center rounded-full"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'radial-gradient(circle, #F5EBD0 0%, #DAA520 100%)',
                    border: '1.5px dashed #8B6914',
                  }}
                >
                  <span style={{ color: '#5D3A1A', fontSize: '9px', fontWeight: 'bold', lineHeight: 1 }}>
                    ISA
                    <br />
                    SEAL
                  </span>
                </div>
                <div style={{ height: '1px', background: '#B8860B', margin: '4px 8px' }} />
                <p className="text-[10px] sm:text-xs font-bold" style={{ color: '#5D3A1A' }}>
                  المشرف الأكاديمي
                </p>
                <p className="text-[8px] sm:text-[9px]" style={{ color: '#7B5D0A' }}>
                  Academic Supervisor
                </p>
              </div>

              {/* يمين: المدير والمؤسس */}
              <div className="text-center">
                <div
                  className="mx-auto mb-1 flex items-center justify-center rounded-full"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'radial-gradient(circle, #FFD700 0%, #B8860B 100%)',
                    border: '1.5px solid #5D3A1A',
                    boxShadow: '0 0 10px rgba(184,134,11,0.4)',
                  }}
                >
                  <span style={{ color: '#2C1A0E', fontSize: '9px', fontWeight: 'bold', lineHeight: 1 }}>
                    ★
                    <br />
                    CEO
                  </span>
                </div>
                <div style={{ height: '1px', background: '#B8860B', margin: '4px 8px' }} />
                <p className="text-[10px] sm:text-xs font-black" style={{ color: '#5D3A1A' }}>
                  مصطفى علي أكر
                </p>
                <p className="text-[8px] sm:text-[9px]" style={{ color: '#7B5D0A' }}>
                  المدير والمؤسس
                </p>
              </div>
            </div>

            {/* ─── رقم الشهادة والتاريخ ─── */}
            <div
              className="flex items-center justify-between flex-wrap gap-2 mt-3 px-2 py-2 rounded-lg"
              style={{ background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.3)' }}
            >
              <div className="text-right">
                <p className="text-[8px] sm:text-[9px]" style={{ color: '#7B5D0A' }}>رقم الشهادة</p>
                <p className="text-[9px] sm:text-[10px] font-bold" style={{ color: '#5D3A1A' }} dir="ltr">
                  {data.certificateNumber}
                </p>
              </div>
              <div className="text-center hidden sm:block">
                <p className="text-[8px] sm:text-[9px]" style={{ color: '#7B5D0A' }}>تاريخ الإصدار</p>
                <p className="text-[9px] sm:text-[10px] font-bold" style={{ color: '#5D3A1A' }} dir="ltr">
                  {data.issueDate}
                </p>
              </div>
              <div className="text-left">
                <p className="text-[8px] sm:text-[9px]" style={{ color: '#7B5D0A' }}>بالهجري</p>
                <p className="text-[9px] sm:text-[10px] font-bold" style={{ color: '#5D3A1A' }} dir="ltr">
                  {data.issueDateHijri}
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ═══════ أزرار التحكم ═══════ */}
      <div className="max-w-4xl mx-auto flex gap-2 print:hidden">
        <button
          onClick={() => setEditingName(true)}
          className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 font-bold flex items-center justify-center gap-2 text-sm"
        >
          <Edit3 className="w-4 h-4" /> تعديل الاسم
        </button>
        <button
          onClick={handlePrint}
          disabled={!studentName || studentName === 'اكتب اسمك الثلاثي'}
          className="flex-1 py-3 rounded-2xl bg-gradient-to-l from-amber-500 to-amber-600 font-bold flex items-center justify-center gap-2 disabled:opacity-40 text-sm"
        >
          <Printer className="w-5 h-5" /> طباعة / PDF
        </button>
      </div>

      {onGoHome && (
        <button
          onClick={() => { playSound('click'); onGoHome(); }}
          className="max-w-4xl mx-auto w-full mt-3 py-3 rounded-2xl bg-white/5 hover:bg-white/10 font-bold flex items-center justify-center gap-2 text-white/70 text-sm print:hidden"
        >
          <Home className="w-5 h-5" /> الصفحة الرئيسية
        </button>
      )}

      {/* رسالة مساعدة */}
      <div className="max-w-4xl mx-auto mt-4 text-center text-xs text-white/40 print:hidden flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3" />
        <span>لطباعة الشهادة أو حفظها كـ PDF، اضغط زر "طباعة / PDF"</span>
      </div>
    </div>
  );
};

export default CertificateScreen;