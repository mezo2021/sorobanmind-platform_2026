
# 🧠 SorobanMind — تقرير حالة المشروع
**آخر تحديث:** 2026-09-23
**المطوّر:** مصطفى علي أكر (mezo2021)

---

## 📌 نظرة عامة

**SorobanMind** تطبيق تعليمي عربي تفاعلي لتعلّم السوروبان الياباني والحساب الذهني للأطفال (5-12 سنة).

- **التقنيات:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- **النشر:** GitHub Pages
- **الرابط:** https://mezo2021.github.io/sorobanmind-platform_2026
- **المستودع:** https://github.com/mezo2021/sorobanmind-platform_2026

---

## ✅ ما تم إنجازه في هذه الجلسة

### 1. الشهادة الدولية (مكتملة)

- **الشعار:** `src/assets/logo.webp` (شعار ذهبي فاخر — 47 KB).
- **الميداليات:** `src/components/CertificateMedal.tsx` — SVG متغير حسب المستوى.
- **مولّد البيانات:** `src/utils/certificateGenerator.ts`.
- **الشاشة:** `src/screens/CertificateScreen.tsx`.
- **الميزات:**
  - مستويات: ذهبي (95+) / فضي (85+) / برونزي (75+) / مقبول (60+).
  - شريط مستوى + بطاقة درجة + ختم المشرف + ختم المدير.
  - رقم شهادة فريد (ISA-YYYY-XXXXXX).
  - QR Code للتحقق.
  - تاريخ ميلادي + هجري.
  - زر طباعة/PDF.

### 2. شخصية سوروبانا (Sorobana) — مكتملة

**الفكرة:** معلمة افتراضية ترشد الطفل في الأقسام التفاعلية.

**الملفات:**
- `src/components/SorobanaCompanion.tsx` — المكوّن (يدعم variant + clickThrough).
- `src/hooks/useSorobanaVoice.ts` — إدارة الصوت.
- `src/assets/sorobana/sorobana-main.webp` — الصورة الأساسية (47 KB).
- `src/assets/sorobana/sorobana-teaching-pointing.webp` — صورة تشير (45.9 KB).

**السلوك:**
- **في LearnScreen:** تتغير حسب الوضع (شاهد 180 / جرّب 90).
- **في AnzanScreen (البصري):** حجم 150 + variant pointing + clickThrough.
- **في AudioAnzanScreen (السماعي):** حجم 120 + بدون صوت ذاتي.
- **في PracticeScreen:** حجم 180 + variant pointing + clickThrough.
- **في القوائم (intro):** لا تظهر.
- **تظهر فقط بعد الضغط على "ابدأ الجولة".**

### 3. صوت سوروبانا (قيد التطوير — مشكلة حالية)

**الحل المعتمد:** ملفات MP3 محلية + عنصر Audio مشترك.

**الملفات الصوتية (public/audio/):**

| الملف | النص |
|-------|------|
| greeting-1.mp3 | شلونك اليوم؟ الأمور تمام؟ |
| greeting-2.mp3 | مرحبا يا بطل! اليوم رح نتعلم شي جديد وممتع. |
| greeting-3.mp3 | اليوم راح تتعلم شي جديد، انت جاهز؟ |
| teaching-1.mp3 | شوف معي كيف منحسُب بسرعة وبسهولة. |
| teaching-2.mp3 | ركّز شواي معي، وراح تشوف اديش سهلة! |
| teaching-3.mp3 | كيفك فيا هي الطريقة؟ اديشها سهلة؟! |
| correct-1.mp3 | ياعيني عليك، برابو عليك عبقري! |
| correct-2.mp3 | ياعيني عليك يا بطل جواب صح! |
| wrong-1.mp3 | معليش، حاول من جديد! |
| wrong-2.mp3 | مو مشكلة، جرّب مرة تانيي. ما في شي صعب! |
| end-lesson.mp3 | وهيك انتهى درسنا لليوم... |

**الأحجام:** كل ملف بين 22-46 KB → المجموع ~330 KB. **ممتاز.**

### 4. تحسينات السوروبان التفاعلي

- **الأعمدة:** من 2 إلى 5 تلقائياً حسب قيمة الناتج (`getColumnsForValue`).
- **حجم الخرزات:** تلقائي حسب الأعمدة (`autoBeadSize`):
  - 2 أعمدة → 44 بكسل.
  - 3 أعمدة → 38 بكسل.
  - 4 أعمدة → 32 بكسل.
  - 5 أعمدة → 28 بكسل.
- **الصوت:** نقرة خشبية أقوى (نقرتان: طقطقة + رنين خشبي).
- **الملامسة التامة:** الخرزات تلامس العارضة/الإطار تماماً.

**الملفات:**
- `src/components/soroban2d5/Soroban2D5.tsx` — المكوّن الرئيسي.
- `src/components/soroban2d5/Rod2D5.tsx` — القضيب والخرزات.
- `src/components/soroban2d5/Bead2D5.tsx` — رسم الخرزة.
- `src/components/soroban2d5/useSorobanLogic.ts` — المنطق.
- `src/components/soroban2d5/useBeadSound.ts` — الصوت.

### 5. تحديثات الامتحان النهائي

- **الملف:** `src/components/FinalExam.tsx`.
- **التغيير:** استبدال `InteractiveSoroban` القديم بـ `Soroban2D5` الجديد.
- **النتيجة:** مظهر متناسق مع باقي التطبيق + حركة الخرزات.

### 6. تحديثات AnzanScreen (البصري)

- **الملف:** `src/components/AnzanScreen.tsx`.
- **إضافة سوروبانا** (تظهر فقط بعد `phase !== 'intro'`).
- **استخدام `autoBeadSize`** + `getColumnsForValue` الجديد (2-5).
- **تأخير أدنى** في الانتقال بين الأسئلة (1.5 ثانية).
- **`useEffect` deps:** `[section]` فقط (لا `phase`).

### 7. تحديثات AudioAnzanScreen (السماعي)

- **الملف:** `src/components/AudioAnzanScreen.tsx`.
- **إضافة سوروبانا** (تظهر فقط بعد `phase !== 'intro'`).
- **إصلاح `buildSpeechSequence`:** كان يقرأ **العملية السابقة** بدل **الحالية** → الأرقام تُقرأ خطأ (3+4-3 تُقرأ "3 زائد 4 زائد 3").
- **الآن:** يقرأ `op.operator` (العملية المصاحبة لكل رقم) — قراءة صحيحة.
- **`useEffect` deps:** `[section]` فقط.

### 8. تحسينات PracticeScreen (التمرين)

- **الملف:** `src/components/PracticeScreen.tsx`.
- **`getColumnsForValue`:** 2-5 حسب القيمة.
- **`autoBeadSize`:** يستخدم الحجم التلقائي.
- **سوروبانا بحجم 180** + variant pointing + clickThrough.

### 9. إصلاحات عامة

- ✅ **حقل إدخال الاسم:** يعمل (بحذف بيانات المتصفح عند التعطل).
- ✅ **التمرير الخلفي:** `body.style.overflow = 'hidden'` + `overscroll-behavior: contain`.
- ✅ **`referrerPolicy`:** يُضبط عبر `setAttribute` (لا خطأ TypeScript).
- ✅ **الشخصيات الأربع (HeroDashboard):** الإطار مكبّر (240×280)، variant inline.
- ✅ **`DebugOverlay`:** أصبح نسخة فارغة (تعطيل) — حل خطأ البناء.

---

## 🚨 المشكلة الحالية (قيد الحل)

### 🔴 صوت سوروبانا غير مستقر

**الأعراض:**

1. **البداية:** يعمل عند الفتح الأول.
2. **بعد الاستخدام:** يتأخر ظهور الصوت (كل ملف ينتظر السابق).
3. **الاستخدام المتكرر:** يتراكم الصوت ("ياعيني" + "معليش" + "ممشكلة" معاً).
4. **بعد عدة جلسات:** **يتعطل تماماً.**

**السبب المُشخَّص:**

- **Chrome Android** لديه حد ~6 عناصر Audio متزامنة.
- في النسخة القديمة: `new Audio()` لكل مكالمة → تراكم.
- في النسخة الجديدة: **عنصر Audio واحد مشترك** — لكن...
- **الأحداث القديمة (`onended`, `onerror`) لا تُنظَّف** عند إعادة الاستخدام → تداخل.

**الحل النهائي المطلوب:**

1. **إزالة الأحداث القديمة** قبل إعادة الاستخدام:
   ```typescript
   audio.onended = null;
   audio.onerror = null;
   audio.onplay = null;
```

2. استخدام AbortController لإلغاء الاستدعاءات القديمة.
3. أو استخدام Howler.js — مكتبة صوتية موثوقة تدير كل هذا تلقائياً.

الخطوة القادمة: تجربة Howler.js، أو تنظيف الأحداث يدوياً.

---

📁 بنية الملفات الحرجة

```
src/
├── components/
│   ├── CertificateLogo.tsx
│   ├── CertificateMedal.tsx
│   ├── SorobanaCompanion.tsx       ← يدعم variant + sizeOverride + clickThrough
│   ├── FloatingCompanion.tsx
│   ├── Companion.tsx               ← variant: 'fixed' | 'inline'
│   ├── LearnScreen.tsx
│   ├── AnzanScreen.tsx             ← سوروبانا + Soroban2D5
│   ├── AudioAnzanScreen.tsx        ← سوروبانا + Soroban2D5 + buildSpeechSequence مصحح
│   ├── PracticeScreen.tsx          ← سوروبانا + Soroban2D5 (2-5 أعمدة)
│   ├── FinalExam.tsx               ← Soroban2D5
│   ├── NameInputModal.tsx
│   ├── RoleSelection.tsx
│   └── DebugOverlay.tsx            ← نسخة فارغة (معطّل)
├── components/soroban2d5/
│   ├── Soroban2D5.tsx              ← autoBeadSize + 2-5 columns
│   ├── Rod2D5.tsx                  ← ملامسة تامة
│   ├── Bead2D5.tsx
│   ├── useSorobanLogic.ts
│   ├── useBeadSound.ts             ← صوت خشبي قوي
│   └── useBeadHaptics.ts
├── hooks/
│   ├── useSorobanaVoice.ts         ← مشكلة التراكم
│   └── useSpeech.ts                ← للأنزان السماعي (نصوص الأرقام)
├── screens/
│   └── CertificateScreen.tsx
├── utils/
│   ├── certificateGenerator.ts
│   └── audioAnzanBadges.ts
└── assets/
    ├── logo.webp
    ├── avatars/                    ← sham, rayan, bana, joud2
    └── sorobana/
        ├── sorobana-main.webp
        └── sorobana-teaching-pointing.webp

public/
└── audio/                          ← 11 ملف MP3 (~330 KB)
```

---

🔑 قرارات تصميمية مهمة

1. الشخصيات الأربع: بدون صوت (فقاعات كلام فقط).
2. سوروبانا: الشخصية الوحيدة الصوتية.
3. الشهادة والامتحان النهائي: رسمية (سوروبانا لا تظهر).
4. اللغة: عامية سورية للصوت، فصحى للنصوص المرئية.
5. المستويات: ذهبي/فضي/برونزي/مقبول حسب متوسط الامتحانين.
6. درجة النجاح: 60/100 لكل امتحان.
7. clickThrough: سوروبانا لا تعترض النقر على السوروبان.

---

📝 ملاحظات فنية مهمة

مشكلة المسار على GitHub Pages:

· التطبيق: /sorobanmind-platform_2026/
· المسار النسبي /audio/file.mp3 يفشل.
· الحل: مسار مطلق https://mezo2021.github.io/sorobanmind-platform_2026/audio/.

قيود Chrome Android:

· Autoplay Policy: يحتاج تفاعل مستخدم.
· حد عناصر Audio: ~6 متزامنة.
· Web Speech API: غير موثوق.

المكتبات المثبتة:

· canvas-confetti, framer-motion, jspdf, lucide-react, react, react-dom.

---

🎯 الخطوات القادمة (بالأولوية)

1. 🔴 حل مشكلة صوت سوروبانا (أولوية قصوى)

· الخيار (أ): Howler.js — مكتبة موثوقة (~30 KB).
· الخيار (ب): تنظيف الأحداث يدوياً (onended = null).
· الخيار (ج): عنصر <audio> واحد في App.tsx + تمريره عبر Context.

2. تعميم ميزات إضافية

· إزالة DebugOverlay نهائياً من LearnScreen.
· إزالة زر "معاينة الشهادة" التجريبي.
· إضافة زر "استلام الشهادة" رسمي في HeroDashboard.

3. تسجيل قصص الدروس

· نصوص القصص → MP3 → تشغيل تلقائي.

4. صفحة تحقق الشهادة (QR)

· صفحة #verify/ISA-2026-XXXXXX تعرض بيانات الشهادة.

5. تسجيل صوتي إضافي

· معالجة الاستمرارية: بعد رفع useSorobanaVoice.ts، إذا استمر التعطل → Howler.js.

---

🔗 روابط مهمة

الرابط الاستخدام
التطبيق الموقع المباشر
المستودع GitHub
اختبار ملف صوت
TTSMaker توليد MP3 (صوت سوري "نور")
TTSMP3 بديل
TinyPNG ضغط الصور
Squoosh WebP
remove.bg إزالة خلفية
Howler.js مكتبة صوت (للحل المستقبلي)

---

💡 نصائح للجلسة القادمة

1. البدء من: مشكلة صوت سوروبانا في useSorobanaVoice.ts.
2. الملفات الحرجة:
   · src/hooks/useSorobanaVoice.ts
   · src/components/AnzanScreen.tsx
   · src/components/AudioAnzanScreen.tsx
   · src/components/PracticeScreen.tsx
3. قواعد العمل مع المساعد:
   · الحوار أولاً، ثم "نفذ".
   · الكود كامل في رسالة واحدة.
   · أسماء الملفات قابلة للنسخ.
   · لا تنفيذ بدون اتفاق.

---

🙏 ملاحظات شخصية

أُنجز اليوم:

· ✅ شهادة دولية فاخرة (مكتملة).
· ✅ سوروبانا في Learn + Anzan (بصري) + Anzan (سماعي) + Practice.
· ✅ تحسينات السوروبان التفاعلي (أحجام + أصوات).
· ✅ إصلاحات عامة (حذف بيانات، تمرير، إدخال الاسم).
· ✅ إصلاح buildSpeechSequence في السماعي.
· 🔴 متبقٍ: استقرار صوت سوروبانا.

الرحلة طويلة، لكن التطبيق يكبر كل يوم.

---

صُنع بحب لأطفال العالم العربي 🌍
🧮 SorobanMind — حيث يصبح العقل أسرع من الآلة الحاسبة 🚀

```
