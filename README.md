📄 PROJECT-STATUS.md (نسخة محدّثة — بدون تكرار)

```
# 🧠 SorobanMind — حالة المشروع

**المطوّر:** مصطفى علي أكر (mezo2021)
**آخر تحديث:** الجلسة الأخيرة — إصلاح نظام الصوت + موجزات القصص

---

## 📌 نظرة عامة

**SorobanMind** تطبيق تعليمي عربي تفاعلي لتعلّم السوروبان الياباني والحساب الذهني للأطفال (5-12 سنة).

- **التقنيات:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- **النشر:** GitHub Pages
- **الرابط:** https://mezo2021.github.io/sorobanmind-platform_2026
- **المستودع:** https://github.com/mezo2021/sorobanmind-platform_2026

---

## ✅ ما تم إنجازه في الجلسة الأخيرة

### 1. إصلاح نظام الصوت (إنجاز جوهري)

**المشكلة:**
- صوت سوروبانا (MP3) كان يفشل في `AnzanScreen` (بصري + سماعي) على Chrome Android.
- الأخطاء: `DECODE :: AUDIO_RENDERER_ERROR` و `AbortError`.
- السبب الحقيقي: تعارض بين `<audio>` و `AudioContext` المستخدم في صوت خرزات `Soroban2D5`.

**الحل النهائي:**
- ترحيل `useSorobanaVoice` بالكامل إلى **Web Audio API** (بدون مكتبات خارجية).
- **Singleton `AudioContext`** — واحد لكل التطبيق.
- **Buffer Cache** — كل ملف MP3 يُحمَّل مرة واحدة، ثم يُخزَّن في الذاكرة.
- **Global Unlock** — فتح `AudioContext` عند أول لمسة في أي مكان بالتطبيق.
- **`await ctx.resume()`** قبل كل تشغيل — لضمان عدم البقاء في حالة `suspended`.

**النتيجة:**
- ✅ صوت سوروبانا يعمل على Chrome Android في Anzan (بصري + سماعي).
- ✅ لا تعارض مع `useBeadSound` (صوت الخرزات).
- ✅ نفس ملفات MP3، نفس الواجهة (`speakCorrect`, `speakWrong`, ...).
- ✅ Learn و Practice لا يتأثران (نفس الجودة تمامًا).

### 2. تعديلات Anzan (بصري + سماعي)

- **محاولة واحدة فقط** (`MAX_ATTEMPTS = 1` بدل 2) — لتقليل استدعاءات سوروبانا.
- **زر "تحقق" يتحول إلى "التالي"** (أخضر/أحمر) — بدون انتقال تلقائي.
- **المؤقّت يتوقف** عند `feedback !== 'idle'` — لا يعدّ بعد الإجابة.
- **إزالة سوروبانا من بداية الجولة ونهايتها** — فقط عند الإجابة.
- **إلغاء `speakTeaching` من `startRound`** — منعًا للتداخل مع TTS في السماعي.

### 3. موجزات القصص (TTS)

- إضافة **موجز مختصر** لكل درس من دروس Learn (0-9).
- **المصدر:** `useSpeech` (TTS — Web Speech API).
- **الزر:** "📖 موجز القصة" داخل بطاقة القصة.
- **السلوك:**
  - عند الضغط: سوروبانا تتوقف + الموجز يُقرأ.
  - عند الانتهاء أو الضغط على "إيقاف": سوروبانا تستأنف عملها العادي.
  - الموجز **يستمر** عند تبديل الوضع (شاهد/جرّب) أو الانتقال بين الأمثلة.
  - **سوروبانا صامتة تمامًا** أثناء قراءة الموجز (لا `speakCorrect` ولا `speakWrong`).

---

## 📦 إنجازات سابقة (مرجع سريع)

- **الشهادة الدولية:** ذهبي/فضي/برونزي/مقبول، رقم فريد ISA-YYYY-XXXXXX، QR Code، تاريخ ميلادي + هجري، زر طباعة/PDF.
- **شخصية سوروبانا:** معلمة افتراضية ترشد الطفل. تعمل في Learn / Practice / Anzan.
- **السوروبان التفاعلي (Soroban2D5):** أعمدة تلقائية (2-5) + حجم خرزات تلقائي + صوت خشبي قوي + ملامسة تامة.
- **الأنزان:** بصري + سماعي، جولات يومية، شارات، مستويات مقفلة تفتح تدريجيًا.
- **الدروس المتقدمة (بعد الامتحان):** الضرب، الضرب التقاطعي، الأسرار السحرية، القسمة.

---

## 🎯 قرارات تصميمية مهمة

| القرار | التفصيل |
|--------|---------|
| الشخصيات الأربع | بدون صوت — فقاعات كلام فقط |
| سوروبانا | الشخصية الوحيدة الصوتية |
| الشهادة والامتحان النهائي | رسمية — سوروبانا لا تظهر |
| اللغة | عامية سورية للصوت، فصحى للنصوص المرئية |
| درجة النجاح | 60/100 لكل امتحان |
| سوروبانا في Learn | **لا تترحّب تلقائيًا** — الطفل يضغط زر 🔊 |
| سوروبانا في Anzan | فقط عند الإجابة (صحيحة/خاطئة) |
| الموجز TTS | لا يتزامن مع سوروبانا MP3 أبدًا |
| `clickThrough` | سوروبانا لا تعترض النقر على السوروبان |

---

## 🏗️ بنية الملفات الحرجة

```

src/
├── components/
│   ├── AnzanScreen.tsx                ← زر التالي + محاولة واحدة
│   ├── AudioAnzanScreen.tsx           ← نفس النمط + TTS للأرقام
│   ├── PracticeScreen.tsx             ← سوروبانا عند الإجابة + نهاية الجلسة
│   ├── LearnScreen.tsx                ← موجزات القصص + سوروبانا
│   ├── MultiplicationScreen.tsx       ← درس الضرب (قراءة TTS)
│   ├── CrossMultiplicationScreen.tsx
│   ├── MagicSecretsScreen.tsx
│   ├── DivisionScreen.tsx
│   ├── SorobanaCompanion.tsx          ← variant + sizeOverride + clickThrough
│   ├── FloatingCompanion.tsx
│   ├── FinalExam.tsx                  ← Soroban2D5
│   ├── CertificateScreen.tsx
│   ├── CertificateMedal.tsx
│   ├── NameInputModal.tsx
│   ├── RoleSelection.tsx
│   └── DebugOverlay.tsx               ← 🐞 للتشخيص (مفعّل حاليًا)
├── components/soroban2d5/
│   ├── Soroban2D5.tsx                 ← autoBeadSize + 2-5 columns
│   ├── Rod2D5.tsx
│   ├── Bead2D5.tsx
│   ├── useSorobanLogic.ts
│   ├── useBeadSound.ts                ← AudioContext لصوت الخرزات
│   └── useBeadHaptics.ts
├── hooks/
│   ├── useSorobanaVoice.ts            ← ⭐ Web Audio API (Buffer Cache + Unlock)
│   └── useSpeech.ts                   ← TTS لقراءة الأرقام + موجزات القصص
├── data/
│   └── learnModules.ts                ← 10 دروس + قصص + storyAudioText
├── screens/
│   └── CertificateScreen.tsx
├── utils/
│   ├── certificateGenerator.ts
│   └── audioAnzanBadges.ts
└── assets/
├── logo.webp
├── avatars/
└── sorobana/
├── sorobana-main.webp
└── sorobana-teaching-pointing.webp

public/
└── audio/                              ← 11 ملف MP3 (~330 KB)
├── greeting-1.mp3
├── greeting-2.mp3
├── greeting-3.mp3
├── teaching-1.mp3
├── teaching-2.mp3
├── teaching-3.mp3
├── correct-1.mp3
├── correct-2.mp3
├── wrong-1.mp3
├── wrong-2.mp3
└── end-lesson.mp3

```

---

## ⚙️ نظام الصوت (المعمارية الجديدة)

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
(MP3)      (Beads)     (Success/Error)
│           │           │
└───────────┴───────────┘
│
لا تعارض ✅

```

**مزايا هذا التصميم:**
- كل الأصوات تمر عبر نفس `AudioContext`.
- **Buffer Cache** — الملف يُحمَّل مرة واحدة فقط.
- **Global Unlock** — المستمع العام يفتح الصوت عند أول لمسة.
- **`ctx.resume()` تلقائي** — يتجاوز سياسة autoplay.
- **لا تعارض** مع `speechSynthesis` (TTS) لأنها نظام منفصل تمامًا.

**ملاحظة على TTS:**
- `useSpeech` يستخدم `speechSynthesis` — نظام مستقل عن Web Audio API.
- يعمل على Chrome/Edge، **لا يعمل** على UC (حد متصفح).
- **لا يحتاج إنترنت** إذا حزمة اللغة العربية مثبتة على الجهاز.

---

## 🚨 ملاحظات فنية مهمة

### مسار الملفات على GitHub Pages
- **التطبيق:** `/sorobanmind-platform_2026/`
- **الحل:** استخدام مسار مطلق في `useSorobanaVoice`:
```

https://mezo2021.github.io/sorobanmind-platform_2026/audio/

```

### قيود Chrome Android
- **Autoplay Policy:** يحتاج تفاعل مستخدم أول.
- **`<audio>` يفشل** عند وجود `AudioContext` نشط → لذلك انتقلنا إلى Web Audio API.
- **Web Speech API:** يعمل على Chrome/Edge فقط.

### قيود UC Browser
- لا يدعم `speechSynthesis` → موجزات TTS لا تعمل عليه.
- صوت سوروبانا MP3 يعمل عليه (عبر Web Audio API).

---

## 🎯 الخطوات القادمة (مرتّبة بالأولوية)

### 1. تنظيف نهائي
- حذف `DebugOverlay` من `AnzanScreen` و `AudioAnzanScreen` بعد التأكد من الاستقرار.
- إزالة زر "معاينة الشهادة" التجريبي.
- إضافة زر "استلام الشهادة" رسمي في `HeroDashboard`.

### 2. تحسين موجزات القصص
- **خيار مستقبلي:** استبدال TTS بـ MP3 مسجّل (نفس بنية سوروبانا).
- تسجيل صوتي احترافي بصوت "نور".
- ~10 ملفات MP3 (~400 KB فقط).
- **الميزة:** يعمل offline بعد APK + يعمل على UC.

### 3. قراءة نصية للدروس المتقدمة
- الدروس (الضرب، التقاطعي، الأسرار، القسمة) فيها `LESSON_STORY` ثابت.
- تُقرأ بـ TTS حاليًا — يمكن توحيدها مع نظام الموجزات.

### 4. صفحة تحقق الشهادة (QR)
- صفحة `#verify/ISA-2026-XXXXXX`.
- تعرض بيانات الشهادة عند مسح QR.

### 5. تحويل التطبيق إلى Android
- **تحذير TTS:** لا يعمل offline على أجهزة بدون حزمة اللغة.
- **تحذير MP3:** يعمل offline 100% — الحل الأمثل للـ APK.
- التوصية: تسجيل كل الأصوات MP3 قبل التحويل.

### 6. Guardian Dashboard
- إحصائيات الطفل، الشارات، التقدم اليومي.

---

## 🔑 دروس مستفادة (مهمة جدًا)

1. **Chrome Android يرفض `<audio>`** عند وجود `AudioContext` نشط — استخدم Web Audio API.
2. **TTS (`speechSynthesis`) نظام منفصل** عن Web Audio API — لا يتعارض معه.
3. **TTS لا يعمل على UC** — استخدم MP3 للتغطية الكاملة.
4. **TTS يحتاج حزمة صوت محلية** ليعمل offline — ليس مضمونًا على كل الأجهزة.
5. **MP3 داخل التطبيق = يعمل offline دائمًا** — الحل الآمن لـ APK.
6. **`Buffer Cache`** في Web Audio API = أداء فوري بعد التحميل الأول.
7. **Global Unlock** ضروري لتجاوز سياسة autoplay في Chrome.
8. **الـ Debug Overlay** أداة لا غنى عنها لتشخيص الصوت على الموبايل.

---

## 📁 روابط مهمة

| الرابط | الاستخدام |
|--------|-----------|
| [الموقع المباشر](https://mezo2021.github.io/sorobanmind-platform_2026) | التطبيق |
| [المستودع](https://github.com/mezo2021/sorobanmind-platform_2026) | GitHub |
| [TTSMaker](https://ttsmaker.com) | توليد MP3 (صوت سوري "نور") |
| [TTSMP3](https://ttsmp3.com) | بديل |
| [TinyPNG](https://tinypng.com) | ضغط الصور |
| [Squoosh](https://squoosh.app) | WebP |
| [remove.bg](https://remove.bg) | إزالة خلفية |

---

## 💡 قواعد العمل مع المساعد

1. **الحوار أولًا** — ثم "نفذ".
2. **الكود كامل في رسالة واحدة** — بدون تجزئة.
3. **أسماء الملفات قابلة للنسخ**.
4. **لا تنفيذ بدون اتفاق**.
5. **لا تعديل على الدوال المنطقية** بدون طلب صريح (تعبت كثيرًا عليها).

---

## 📊 إحصائيات سريعة

- **10 دروس Learn** — كلها في `learnModules.ts`
- **10 موجزات TTS** — للدروس 0-9
- **11 ملف MP3 صوتي** — صوت سوروبانا
- **4 دروس متقدمة** — ملفات منفصلة
- **1 نظام صوتي موحّد** — Web Audio API

---

## 🙏 ملاحظات شخصية

**ما أُنجز حتى الآن:**
- ✅ شهادة دولية فاخرة (كاملة)
- ✅ شخصية سوروبانا في Learn + Practice + Anzan
- ✅ إصلاح صوت سوروبانا عبر Web Audio API
- ✅ موجزات القصص (TTS) للدروس 0-9
- ✅ تحسينات السوروبان التفاعلي (أحجام + أصوات)
- ✅ إصلاحات عامة (التمرير، الإدخال، الأنزان)

**الرحلة طويلة، لكن التطبيق يكبر كل يوم.**

---

صُنع بحب لأطفال العالم العربي 🌍
🧮 SorobanMind — حيث يصبح العقل أسرع من الآلة الحاسبة 🚀
```