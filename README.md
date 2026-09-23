```markdown
<div align="center">

# 🧮 SorobanMind

### أكاديمية السوروبان — حيث يصبح العقل أسرع من الآلة الحاسبة 🚀

[![Live Demo](https://img.shields.io/badge/🌐_الموقع_المباشر-زيارة-4CAF50?style=for-the-badge)](https://mezo2021.github.io/sorobanmind-platform_2026)
[![Repository](https://img.shields.io/badge/📦_المستودع-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/mezo2021/sorobanmind-platform_2026)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)

**المطوّر:** [مصطفى علي أكر](https://github.com/mezo2021) · **الفئة المستهدفة:** أطفال 5-12 سنة · **آخر تحديث:** الجلسة الأخيرة

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

<table>
<tr><td width="50%">

**🔴 المشكلة**

- صوت سوروبانا (MP3) يفشل في `AnzanScreen` على Chrome Android
- أخطاء: `DECODE :: AUDIO_RENDERER_ERROR` و `AbortError`
- السبب: تعارض بين `<audio>` و `AudioContext` (صوت الخرزات)

</td><td width="50%">

**🟢 الحل**

- ترحيل `useSorobanaVoice` إلى **Web Audio API**
- **Singleton `AudioContext`** واحد لكل التطبيق
- **Buffer Cache** — تحميل مرة واحدة
- **Global Unlock** — فتح الصوت عند أول لمسة
- **`await ctx.resume()`** قبل كل تشغيل

</td></tr>
</table>

**🎉 النتيجة:**

- ✅ صوت سوروبانا يعمل على Chrome Android (بصري + سماعي)
- ✅ لا تعارض مع `useBeadSound`
- ✅ نفس ملفات MP3، نفس الواجهة، نفس الجودة
- ✅ Learn و Practice بدون أي تغيير

---

### 🧮 تعديلات الأنزان

| الميزة | الحالة |
|--------|:------:|
| محاولة واحدة فقط (`MAX_ATTEMPTS = 1`) | ✅ |
| زر "تحقق" → "التالي" (بدون انتقال تلقائي) | ✅ |
| المؤقّت يتوقف عند الإجابة | ✅ |
| سوروبانا فقط عند الإجابة (لا بداية/نهاية) | ✅ |

---

### 📖 موجزات القصص (TTS)

> زر **"📖 موجز القصة"** داخل بطاقة القصة في كل درس من دروس Learn (0-9)

**السلوك:**
- 🎯 عند الضغط → سوروبانا تتوقف + الموجز يُقرأ
- ✅ عند الانتهاء أو "إيقاف" → سوروبانا تستأنف
- 🔄 الموجز **يستمر** عند تبديل الوضع/الانتقال
- 🔇 سوروبانا **صامتة تمامًا** أثناء قراءة الموجز

---

## ⚙️ معمارية نظام الصوت

```

```

**المزايا:**

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

---

## 📁 بنية الملفات

```

src/
├── 📂 components/
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
├── logo.webp
├── avatars/
└── sorobana/
├── sorobana-main.webp
└── sorobana-teaching-pointing.webp

public/
└── 📂 audio/                          ← 11 ملف MP3 (~330 KB)
├── greeting-1.mp3 · greeting-2.mp3 · greeting-3.mp3
├── teaching-1.mp3 · teaching-2.mp3 · teaching-3.mp3
├── correct-1.mp3 · correct-2.mp3
├── wrong-1.mp3 · wrong-2.mp3
└── end-lesson.mp3

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
TTS يعمل offline إذا كانت حزمة اللغة العربية مثبتة على الجهاز.
MP3 مضمون — يعمل offline دائمًا بعد التثبيت.

---

🎯 الخطوات القادمة

🥇 أولوية عالية

☐ حذف DebugOverlay بعد التأكد من الاستقرار
☐ تسجيل موجزات MP3 بدل TTS — لدعم UC و APK
☐ زر "استلام الشهادة" رسمي في HeroDashboard

🥈 أولوية متوسطة

☐ قراءة الدروس المتقدمة بصوت موحّد
☐ صفحة تحقق الشهادة عبر QR (#verify/ISA-2026-XXXXXX)
☐ Guardian Dashboard — إحصائيات الطفل

🥉 أولوية مستقبلية

☐ تحويل إلى APK (بعد تسجيل كل الأصوات MP3)
☐ مؤثرات صوتية إضافية (صدى، فلتر)
☐ قراءة الدرس + سوروبانا معًا (بفضل Web Audio API)

---

💡 دروس مستفادة

<table>
<tr><th>#</th><th>الدرس</th></tr>
<tr><td>1</td><td>Chrome Android يرفض <code>&lt;audio&gt;</code> عند وجود <code>AudioContext</code> → استخدم Web Audio API</td></tr>
<tr><td>2</td><td>TTS (<code>speechSynthesis</code>) نظام منفصل — لا يتعارض مع Web Audio API</td></tr>
<tr><td>3</td><td>TTS لا يعمل على UC Browser</td></tr>
<tr><td>4</td><td>TTS يحتاج حزمة صوت محلية ليعمل offline</td></tr>
<tr><td>5</td><td>MP3 داخل التطبيق = يعمل offline دائمًا (حل APK)</td></tr>
<tr><td>6</td><td>Buffer Cache = أداء فوري بعد التحميل الأول</td></tr>
<tr><td>7</td><td>Global Unlock ضروري لتجاوز Autoplay Policy</td></tr>
<tr><td>8</td><td>Debug Overlay أداة لا غنى عنها لتشخيص الموبايل</td></tr>
</table>

---

🔗 روابط مهمة

الأيقونة الرابط الاستخدام
🌐 الموقع المباشر التطبيق
📦 GitHub Repo المستودع
🎙️ TTSMaker توليد MP3 (نور السوري)
🎙️ TTSMP3 بديل
🖼️ TinyPNG ضغط الصور
🖼️ Squoosh WebP
✂️ remove.bg إزالة خلفية

---

📊 إحصائيات المشروع

<div align="center">

📚 الدروس 📖 الموجزات 🎵 ملفات MP3 🏆 الدروس المتقدمة ⚙️ أنظمة الصوت
10 10 11 4 1 موحّد

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

آخر تحديث: الجلسة الأخيرة
التطبيق يكبر كل يوم ✨

</div>
```

---

🎨 ما الجديد في هذه النسخة؟

الميزة الوصف
🎖️ Badges شعارات في الأعلى (React، TypeScript، Vite...)
📑 فهرس روابط تنقّل سريعة
🎨 جدولان متوازيان للمشكلة/الحل جنبًا إلى جنب
📊 Diagram مخطط معماري للصوت
⚠️ Alerts [!NOTE] [!TIP] [!IMPORTANT] (يظهر بشكل ملون)
✅ Checkboxes قوائم قابلة للتحديد في GitHub
🎯 Center align للعناوين والشعارات
📈 إحصائيات جدولية بشكل جميل في النهاية

---