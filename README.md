📄 ملف README.md (نسخة نهائية احترافية)

```markdown
<div align="center">

# 🧮 SorobanMind

### أكاديمية السوروبان الدولية
### حيث يصبح العقل أسرع من الآلة الحاسبة 🚀

[![Live Demo](https://img.shields.io/badge/🌐_الموقع_المباشر-زيارة-4CAF50?style=for-the-badge)](https://mezo2021.github.io/sorobanmind-platform_2026)
[![Repository](https://img.shields.io/badge/📦_المستودع-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/mezo2021/sorobanmind-platform_2026)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)

**المطوّر:** [مصطفى علي أكر](https://github.com/mezo2021) · **الفئة المستهدفة:** أطفال 5-12 سنة

</div>

---

## 📑 فهرس المحتويات

- [نظرة عامة](#-نظرة-عامة)
- [أحدث الإنجازات](#-أحدث-الإنجازات)
- [معمارية نظام الصوت](#-معمارية-نظام-الصوت)
- [قرارات تصميمية](#-قرارات-تصميمية)
- [بنية الملفات](#-بنية-الملفات)
- [ملاحظات فنية](#-ملاحظات-فنية)
- [الخطوات القادمة](#-الخطوات-القادمة)
- [دروس مستفادة](#-دروس-مستفادة)
- [روابط مهمة](#-روابط-مهمة)

---

## 🎯 نظرة عامة

> **SorobanMind** — تطبيق تعليمي عربي تفاعلي لتعلّم السوروبان الياباني والحساب الذهني.

| البند | التفصيل |
|-------|---------|
| 🎨 **الواجهة** | React 18 + TypeScript + Tailwind + Framer Motion |
| ⚡ **البناء** | Vite 5 |
| 🌍 **النشر** | GitHub Pages |
| 🎯 **الجمهور** | أطفال 5-12 سنة |
| 🗣️ **اللغة** | عامية سورية (للصوت) + فصحى (للنصوص) |

---

## ✅ أحدث الإنجازات

### 🎧 إصلاح نظام الصوت (إنجاز جوهري)

| 🔴 المشكلة | 🟢 الحل |
|-----------|---------|
| صوت سوروبانا (MP3) يفشل على Chrome Android | ترحيل `useSorobanaVoice` إلى **Web Audio API** |
| أخطاء: `DECODE :: AUDIO_RENDERER_ERROR` و `AbortError` | **Singleton AudioContext** واحد لكل التطبيق |
| تعارض بين `<audio>` و `AudioContext` | **Buffer Cache** — تحميل مرة واحدة |
| — | **Global Unlock** — فتح الصوت عند أول لمسة |
| — | **`await ctx.resume()`** قبل كل تشغيل |

**🎉 النتيجة:**
- ✅ صوت سوروبانا يعمل على Chrome Android (بصري + سماعي)
- ✅ لا تعارض مع `useBeadSound`
- ✅ نفس ملفات MP3، نفس الواجهة، نفس الجودة
- ✅ Learn و Practice بدون تغيير

---

### 🧮 تعديلات الأنزان

| الميزة | الحالة |
|--------|:------:|
| محاولة واحدة فقط (`MAX_ATTEMPTS = 1`) | ✅ |
| زر "تحقق" → "التالي" (بدون انتقال تلقائي) | ✅ |
| المؤقّت يتوقف عند الإجابة | ✅ |
| سوروبانا فقط عند الإجابة | ✅ |

---

### 📖 موجزات القصص (TTS)

> زر **"📖 موجز القصة"** داخل بطاقة القصة في كل درس من دروس Learn (0-9)

| السلوك | التفصيل |
|--------|---------|
| 🎯 عند الضغط | سوروبانا تتوقف + الموجز يُقرأ |
| ✅ عند الانتهاء أو "إيقاف" | سوروبانا تستأنف عملها |
| 🔄 الموجز | **يستمر** عند تبديل الوضع/الانتقال |
| 🔇 سوروبانا | **صامتة تمامًا** أثناء قراءة الموجز |

---

### 🎓 شاشة الترحيب (Welcome Screen) — جديد

> تُعرض **مرة كل 7 أيام** — أو يدوياً من لوحة ولي الأمر.

| العنصر | التفصيل |
|--------|---------|
| 🖼️ **الشعار** | `logo-header.png` (الشعار الجديد البنفسجي/الذهبي) |
| 👩‍🏫 **سوروبانا** | تظهر بحركة Bounce، وعند النقر → تتكلم |
| 💬 **الفقاعة** | "مرحباً! أنا سوروبانا معلمتكم. جاهزين نصير أسرع من الحاسبة!" |
| ✨ **5 ميزات** | أنزان، تدريب، دروس، شهادة، متابعة |
| 🎬 **زر "ابدأ الرحلة"** | ينقل لشاشة اختيار الدور |
| 🔄 **زر "شاشة الترحيب"** | في لوحة ولي الأمر — لإعادة عرضها |

---

## ⚙️ معمارية نظام الصوت

```

┌─────────────────────────────────────────────────────┐
│                Web Audio API                        │
│         (AudioContext Singleton — مشترك)            │
└──────────────────┬──────────────────────────────────┘
│
┌───────────┼───────────┐
│           │           │
▼           ▼           ▼
سوروبانا    خرزات      playSound
(MP3)     (Beads)   (Success/Error)
│           │           │
└───────────┴───────────┘
│
لا تعارض ✅

```

| # | الميزة | الشرح |
|:-:|--------|-------|
| 1 | **مسار صوت موحّد** | كل الأصوات عبر `AudioContext` واحد |
| 2 | **Buffer Cache** | الملف يُحمَّل مرة واحدة، ثم فوري |
| 3 | **Global Unlock** | مستمع عام يفتح الصوت عند أول لمسة |
| 4 | **Auto Resume** | `ctx.resume()` تلقائي عند Suspended |
| 5 | **بدون مكتبات** | مدمج في المتصفح |

> [!NOTE]
> **TTS** (`speechSynthesis`) نظام منفصل تمامًا — لا يتعارض مع Web Audio API.

---

## 🎯 قرارات تصميمية

| القرار | التفصيل |
|--------|---------|
| 👥 **الشخصيات الأربع** | بدون صوت — فقاعات كلام فقط |
| 🗣️ **سوروبانا** | الشخصية الوحيدة الصوتية |
| 🏆 **الشهادة والامتحان** | رسمية — سوروبانا لا تظهر |
| 🗣️ **اللغة** | عامية سورية للصوت · فصحى للنصوص |
| 🎯 **درجة النجاح** | 60/100 لكل امتحان |
| 🔇 **سوروبانا في Learn** | لا تترحّب تلقائيًا — زر 🔊 يدوي |
| ✅ **سوروبانا في Anzan** | فقط عند الإجابة |
| 🚫 **الموجز TTS** | لا يتزامن مع MP3 أبدًا |
| 👆 **clickThrough** | سوروبانا لا تعترض النقر |
| 🖼️ **الشعار الرسمي** | بنفسجي/ذهبي (من Ideogram) |
| 🎬 **شاشة الترحيب** | مرة كل 7 أيام + يدوياً من لوحة ولي الأمر |

---

## 📁 بنية الملفات

```

src/
├── 📂 components/
│   ├── WelcomeScreen.tsx              ⭐ جديد — شاشة الترحيب
│   ├── AnzanScreen.tsx                ← زر التالي + محاولة واحدة
│   ├── AudioAnzanScreen.tsx           ← نفس النمط + TTS للأرقام
│   ├── PracticeScreen.tsx             ← سوروبانا عند الإجابة
│   ├── LearnScreen.tsx                ← موجزات القصص + سوروبانا
│   ├── MultiplicationScreen.tsx       ← درس الضرب (TTS)
│   ├── CrossMultiplicationScreen.tsx
│   ├── MagicSecretsScreen.tsx
│   ├── DivisionScreen.tsx
│   ├── SorobanaCompanion.tsx
│   ├── FloatingCompanion.tsx
│   ├── FinalExam.tsx
│   ├── CertificateScreen.tsx
│   ├── CertificateMedal.tsx
│   ├── NameInputModal.tsx
│   ├── RoleSelection.tsx
│   └── DebugOverlay.tsx               ← 🐞 للتشخيص (مفعّل)
│
├── 📂 components/soroban2d5/
│   ├── Soroban2D5.tsx                 ← autoBeadSize + 2-5 columns
│   ├── Rod2D5.tsx
│   ├── Bead2D5.tsx
│   ├── useSorobanLogic.ts
│   ├── useBeadSound.ts                ← AudioContext للخرزات
│   └── useBeadHaptics.ts
│
├── 📂 hooks/
│   ├── useSorobanaVoice.ts            ⭐ Web Audio API
│   └── useSpeech.ts                   ← TTS للأرقام + الموجزات
│
├── 📂 data/
│   └── learnModules.ts                ← 10 دروس + قصص
│
├── 📂 screens/
│   └── CertificateScreen.tsx
│
├── 📂 utils/
│   ├── certificateGenerator.ts
│   └── audioAnzanBadges.ts
│
└── 📂 assets/
├── logo.webp                      ← احتياطي
├── logo-header.png                ⭐ شعار الهيدر
├── logo-intro.webp                ⭐ شعار الشاشة التعريفية
├── logo-certificate.webp          ⭐ شعار الشهادة
├── avatars/
└── sorobana/
├── sorobana-main.webp
└── sorobana-teaching-pointing.webp

public/
└── 📂 audio/                          ← 13 ملف MP3 (~370 KB)
├── greeting-1.mp3 · greeting-2.mp3 · greeting-3.mp3
├── teaching-1.mp3 · teaching-2.mp3 · teaching-3.mp3
├── correct-1.mp3 · correct-2.mp3
├── wrong-1.mp3 · wrong-2.mp3
├── end-lesson.mp3
└── welcome-sorobana.mp3           ⭐ ترحيب الشاشة التعريفية

```

---

## 🚨 ملاحظات فنية

> [!IMPORTANT]
> **مسار الملفات على GitHub Pages** يجب أن يكون **مطلقًا**:
```

https://mezo2021.github.io/sorobanmind-platform_2026/audio/

```

قيود Chrome Android

· 🔒 Autoplay Policy — يحتاج تفاعل مستخدم أول
· ❌ <audio> يفشل عند وجود AudioContext نشط
· ✅ الحل: Web Audio API

قيود UC Browser

· ❌ لا يدعم speechSynthesis → TTS لا يعمل
· ✅ صوت سوروبانا MP3 يعمل

[!TIP]

· TTS: يعمل offline إذا كانت حزمة اللغة العربية مثبتة على الجهاز.
· MP3: مضمون — يعمل offline دائمًا بعد التثبيت.

---

🎯 الخطوات القادمة

🥇 أولوية عالية

☐ حذف DebugOverlay بعد التأكد من الاستقرار
☐ تسجيل موجزات MP3 بدل TTS — لدعم UC و APK
☐ زر "استلام الشهادة" رسمي في HeroDashboard
☐ تسجيل نصوص الدروس المتقدمة MP3 (الضرب، التقاطعي، الأسرار، القسمة)

🥈 أولوية متوسطة

☐ صفحة تحقق الشهادة عبر QR (#verify/ISA-2026-XXXXXX)
☐ إضافة معلومات التواصل (واتساب، إيميل) في مكان مناسب
☐ معلومات التواصل + قسم "من نحن"

🥉 أولوية مستقبلية

☐ تحويل إلى APK (بعد تسجيل كل الأصوات MP3)
☐ مؤثرات صوتية إضافية (صدى، فلتر)
☐ صفحة هبوط (Landing Page) للتسويق
☐ نظام KYU الياباني (تأهيل للبطولات الدولية)

---

💡 دروس مستفادة

# الدرس
1 Chrome Android يرفض <audio> عند وجود AudioContext → استخدم Web Audio API
2 TTS (speechSynthesis) نظام منفصل — لا يتعارض مع Web Audio API
3 TTS لا يعمل على UC Browser
4 TTS يحتاج حزمة صوت محلية ليعمل offline
5 MP3 داخل التطبيق = يعمل offline دائمًا (حل APK)
6 Buffer Cache = أداء فوري بعد التحميل الأول
7 Global Unlock ضروري لتجاوز Autoplay Policy
8 Debug Overlay أداة لا غنى عنها لتشخيص الموبايل
9 الأرقام في الشعار الرسمي تحتاج حجماً أكبر من المُقدَّر
10 استخدام نفس صوت "نور" يوحد هوية الصوت في كل التطبيق

---

🔗 روابط مهمة

الرابط الاستخدام
🌐 الموقع المباشر التطبيق
📦 GitHub Repo المستودع
🎙️ TTSMaker توليد MP3 (نور السوري)
🎙️ TTSMP3 بديل
🖼️ TinyPNG ضغط الصور
🖼️ Squoosh WebP
✂️ remove.bg إزالة خلفية
🎨 Ideogram توليد الشعارات

---

📊 إحصائيات المشروع

<div align="center">

📚 الدروس 📖 الموجزات 🎵 ملفات MP3 🏆 الدروس المتقدمة ⚙️ أنظمة الصوت
10 10 13 4 1 موحّد

</div>

---

💡 قواعد العمل مع المساعد

[!IMPORTANT]
اتفاق مع المساعد:

1. 🗣️ الحوار أولًا — ثم "نفذ"
2. 📦 الكود كامل في رسالة واحدة — بدون تجزئة
3. 📋 أسماء الملفات قابلة للنسخ
4. 🚫 لا تنفيذ بدون اتفاق
5. 🔒 لا تعديل على الدوال المنطقية بدون طلب صريح

---

<div align="center">

🙏 شكر خاص

صُنع بحب لأطفال العالم العربي 🌍

🧮 SorobanMind

حيث يصبح العقل أسرع من الآلة الحاسبة 🚀

---

التطبيق يكبر كل يوم ✨

</div>
```

---