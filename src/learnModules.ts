// ============================================================
// learnModules.ts — دروس السوروبان (تُبنى تدريجياً)
// ============================================================

import type { LearnModule } from './types';

// ═══════════════════════════════════════════════════════════
// المستوى 0: رياضيات الأصابع
// ═══════════════════════════════════════════════════════════
const level0: LearnModule = {
  id: 0,
  title: 'Finger Math',
  titleAr: 'رياضيات الأصابع',
  description: 'Learn numbers with your hands before Soroban',
  descriptionAr: 'تعلّم الأعداد بأصابعك قبل السوروبان',
  status: 'available',
  beads: { upper: 0, lower: 0 },
  value: 0,
  concept: 'Thumb = 5, Other fingers = 1',
  conceptAr: 'الإبهام = 5، الأصابع الأخرى = 1',
  icon: 'Hand',
  audioText:
    'أهلاً بك في مملكة الأصابع! قبل أن نتعلم السوروبان، سنتعلم لغة سحرية بأصابعنا. يدك اليمنى تمثل الآحاد، ويدك اليسرى تمثل العشرات. الإبهام مثل الجدة 5، وباقي الأصابع مثل الأطفال كل واحد قيمته 1. هيا بنا نلعب مع الأعداد من 0 إلى 99!',
  rule: 'Right hand = units, Left hand = tens',
  ruleAr: 'اليد اليمنى = الآحاد، اليد اليسرى = العشرات',
  story:
    'في مملكة الأصابع، تعيش عائلتان صديقتان: عائلة اليد اليمنى المسؤولة عن الآحاد، وعائلة اليد اليسرى المسؤولة عن العشرات. في كل عائلة، الإبهام هو الجدة الحنونة التي قيمتها 5، والأصابع الأربعة أطفال صغار كل واحد قيمته 1. اجتمعوا معاً ليصنعوا كل الأعداد من 0 إلى 99!',
  storyAudioText:
    'في مملكة الأصابع، تعيش عائلتان صديقتان: عائلة اليد اليمنى المسؤولة عن الآحاد، وعائلة اليد اليسرى المسؤولة عن العشرات. في كل عائلة، الإبهام هو الجدة الحنونة التي قيمتها خمسة، والأصابع الأربعة أطفال صغار كل واحد قيمته واحد. اجتمعوا معاً ليصنعوا كل الأعداد من صفر إلى تسعة وتسعين.',
  targetAge: '5-6',

  tactileActivity: {
    titleAr: 'لعبة العائلات',
    materials: ['قفازان ورقيان', 'أقلام ملونة', 'ورقة كبيرة'],
    steps: [
      'لوّن الإبهام في القفازين بالأخضر (الجدة 5)',
      'لوّن الأصابع الأربعة بالبرتقالي (الأطفال 1)',
      'اكتب على القفاز الأيمن: عائلة الآحاد',
      'اكتب على القفاز الأيسر: عائلة العشرات',
      'العب مع طفلك: ارفع الإبهام في اليمين، اسأله كم؟',
    ],
    goal: 'ربط الجدة 5 بالإبهام في ذهن الطفل قبل رؤية السوروبان',
  },

  examples: [
    // مثال 1: الرقم 1
    {
      problemText: 'مثّل الرقم 1 بالأصابع',
      answer: 1,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'ارفع السبابة في يدك اليمنى',
          fingerUsed: 'index',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1],
          expectedValueAfter: 1,
        },
      ],
      explanation: 'طفل واحد من عائلة الآحاد وقف = 1',
      story:
        'استدعت الجدة طفلاً واحداً من الساحة، فرفع أصبعه عالياً وقال: أنا الرقم واحد!',
      storyAudioText:
        'استدعت الجدة طفلاً واحداً من الساحة، فرفع أصبعه عالياً وقال: أنا الرقم واحد.',
    },

    // مثال 2: الرقم 3
    {
      problemText: 'مثّل الرقم 3 بالأصابع',
      answer: 3,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'ارفع ثلاثة أصابع (السبابة، الوسطى، البنصر) في اليد اليمنى',
          fingerUsed: 'index',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2, 3],
          expectedValueAfter: 3,
        },
      ],
      explanation: 'ثلاثة أطفال من اليد اليمنى = 3',
      story:
        'نادى الحارس ثلاثة أطفال، فرفعوا أصابعهم وقالوا بصوت واحد: ثلاثة!',
      storyAudioText:
        'نادى الحارس ثلاثة أطفال، فرفعوا أصابعهم وقالوا بصوت واحد: ثلاثة.',
    },

    // مثال 3: الرقم 5 (الجدة)
    {
      problemText: 'مثّل الرقم 5 بالأصابع',
      answer: 5,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'ارفع الإبهام في اليد اليمنى فقط',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
      ],
      explanation: 'الجدة 5 وحدها = 5',
      story:
        'رفعت الجدة إبهامها عالياً وقالت: أنا وحدي أُساوي خمسة! هذا سرّ الجدة 5.',
      storyAudioText:
        'رفعت الجدة إبهامها عالياً وقالت: أنا وحدي أساوي خمسة! هذا سر الجدة خمسة.',
    },

    // مثال 4: الرقم 7
    {
      problemText: 'مثّل الرقم 7 بالأصابع',
      answer: 7,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'ارفع الإبهام (5) في اليد اليمنى',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
        {
          stepIndex: 2,
          instructionText: 'ارفع السبابة والوسطى (2)',
          fingerUsed: 'index',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2],
          expectedValueAfter: 7,
        },
      ],
      explanation: '5 + 2 = 7 (الجدة + طفلان)',
      story:
        'رفعت الجدة إبهامها أولاً، ثم انضم إليها طفلان صغيران. صار المجموع: 5 + 2 = 7!',
      storyAudioText:
        'رفعت الجدة إبهامها أولاً، ثم انضم إليها طفلان صغيران. صار المجموع خمسة زائد اثنان يساوي سبعة.',
    },

    // مثال 5: الرقم 9
    {
      problemText: 'مثّل الرقم 9 بالأصابع',
      answer: 9,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'ارفع الإبهام في اليد اليمنى (5)',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
        {
          stepIndex: 2,
          instructionText: 'ارفع الأصابع الأربعة كلها (4)',
          fingerUsed: 'index',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2, 3, 4],
          expectedValueAfter: 9,
        },
      ],
      explanation: '5 + 4 = 9 (الجدة + كل الأطفال)',
      story:
        'هيا نلعب! رفعت الجدة إبهامها، فصفّق الحارس، فصعد الأطفال الأربعة للمشاركة. الجميع هنا: 5 + 4 = 9!',
      storyAudioText:
        'هيا نلعب! رفعت الجدة إبهامها، فصفق الحارس، فصعد الأطفال الأربعة للمشاركة. الجميع هنا: خمسة زائد أربعة يساوي تسعة.',
    },

    // مثال 6: الرقم 10
    {
      problemText: 'مثّل الرقم 10 بالأصابع',
      answer: 10,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'أغلق يدك اليمنى كلها (0 آحاد)',
          fingerUsed: 'index',
          direction: 'down',
          targetColumn: 'units',
          beadsAffected: [],
          expectedValueAfter: 0,
        },
        {
          stepIndex: 2,
          instructionText: 'ارفع السبابة في اليد اليسرى (10)',
          fingerUsed: 'index',
          direction: 'up',
          targetColumn: 'tens',
          beadsAffected: [1],
          expectedValueAfter: 10,
        },
      ],
      explanation: 'عشرة = 1 في العشرات و 0 في الآحاد',
      story:
        'عندما يجتمع 10 أطفال، ينتقلون إلى قاعة العشرات! الآن صاروا عائلة كبيرة: 10',
      storyAudioText:
        'عندما يجتمع عشرة أطفال، ينتقلون إلى قاعة العشرات! الآن صاروا عائلة كبيرة: عشرة.',
    },

    // مثال 7: الرقم 27
    {
      problemText: 'مثّل الرقم 27 بالأصابع',
      answer: 27,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'اليد اليمنى (الآحاد): ارفع الإبهام + طفلين = 7',
          fingerUsed: 'both_pinch',
          direction: 'pinch_in',
          targetColumn: 'units',
          beadsAffected: [5, 1, 2],
          expectedValueAfter: 7,
        },
        {
          stepIndex: 2,
          instructionText: 'اليد اليسرى (العشرات): ارفع طفلين = 20',
          fingerUsed: 'index',
          direction: 'up',
          targetColumn: 'tens',
          beadsAffected: [1, 2],
          expectedValueAfter: 27,
        },
      ],
      explanation: '20 + 7 = 27',
      story:
        'قالت عائلة اليسرى: نحن عشرون! وقالت عائلة اليمنى: نحن سبعة! اجتمعوا معاً: 27',
      storyAudioText:
        'قالت عائلة اليسرى: نحن عشرون! وقالت عائلة اليمنى: نحن سبعة! اجتمعوا معاً: سبعة وعشرون.',
    },

    // مثال 8: الرقم 99 (الأكبر)
    {
      problemText: 'مثّل الرقم 99 بالأصابع',
      answer: 99,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'اليد اليمنى: 5 + 4 = 9',
          fingerUsed: 'both_pinch',
          direction: 'pinch_in',
          targetColumn: 'units',
          beadsAffected: [5, 1, 2, 3, 4],
          expectedValueAfter: 9,
        },
        {
          stepIndex: 2,
          instructionText: 'اليد اليسرى: 50 + 40 = 90',
          fingerUsed: 'both_pinch',
          direction: 'pinch_in',
          targetColumn: 'tens',
          beadsAffected: [5, 1, 2, 3, 4],
          expectedValueAfter: 99,
        },
      ],
      explanation: '90 + 9 = 99',
      story:
        'أكبر عدد في مملكة الأصابع! كل الأصابع مرفوعة، حتى الإبهامين: 99! الجميع يهتف: تسعة وتسعون!',
      storyAudioText:
        'أكبر عدد في مملكة الأصابع! كل الأصابع مرفوعة، حتى الإبهامين: تسعة وتسعون. الجميع يهتف: تسعة وتسعون.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// مصفوفة الدروس — سيُضاف كل مستوى هنا تدريجياً
// ═══════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════
// المستوى 1: تعريف السوروبان
// ═══════════════════════════════════════════════════════════
const level1: LearnModule = {
  id: 1,
  title: 'Introduction to Soroban',
  titleAr: 'تعريف السوروبان',
  description: 'What is Soroban, its parts and benefits',
  descriptionAr: 'ما هو السوروبان؟ أجزاؤه وفوائده',
  status: 'locked',
  beads: { upper: 1, lower: 4 },
  value: 0,
  concept: 'Soroban = 4 lower beads (1) + 1 upper bead (5)',
  conceptAr: 'السوروبان = 4 خرزات سفلية (1) + خرزة علوية (5)',
  icon: 'Info',
  audioText:
    'مرحباً بكم في عالم السوروبان! السوروبان آلة حساب يابانية عمرها أكثر من 400 سنة. اخترعه اليابانيون لتنشيط الدماغ وتقوية الذاكرة. جسر أفقي يقسم المعداد، وتحته 4 خرزات كل واحدة تساوي 1، وفوقه خرزة واحدة تساوي 5.',
  rule: 'Upper bead = 5, Lower beads = 1 each',
  ruleAr: 'الخرزة العلوية = 5، السفلية = 1',
  story:
    'في يوم مشمس، وصل ثلاثة أبطال صغار — شام وريان وبانة — إلى بوابة خشبية ضخمة نُقش عليها: قلعة السوروبان — من يدخلها يصبح سيد الأرقام. دقّوا الجرس، فانفتح الباب، وظهر حارس القلعة: رجل خشبي اسمه الإطار. قال مبتسماً: في هذه القلعة تسكن عائلة غريبة: أربعة أطفال نشيطون في الطابق السفلي، كل واحد قيمته واحد. وفوق الجسر تسكن الجدة الحنونة، قيمتها خمسة.',
  storyAudioText:
    'في يوم مشمس، وصل ثلاثة أبطال صغار إلى بوابة خشبية ضخمة نُقش عليها: قلعة السوروبان، من يدخلها يصبح سيد الأرقام. دقوا الجرس، فانفتح الباب، وظهر حارس القلعة: رجل خشبي اسمه الإطار. قال مبتسماً: في هذه القلعة تسكن عائلة غريبة: أربعة أطفال نشيطون في الطابق السفلي، كل واحد قيمته واحد. وفوق الجسر تسكن الجدة الحنونة، قيمتها خمسة.',
  targetAge: '6-7',
  requiresAllPrevious: true,

  // ✨ إعدادات التفاعل
  interactionMode: 'number-input',
  maxAttempts: 5,

  tactileActivity: {
    titleAr: 'نشاط بناء السوروبان',
    materials: ['إطار من الكرتون', '10 خرزات خشبية', 'أعواد أسنان'],
    steps: [
      'اصنع إطاراً من الكرتون على شكل مستطيل',
      'اقسمه بجسر أفقي إلى قسمين',
      'أدخل 4 خرزات في القسم السفلي',
      'أدخل خرزة واحدة في القسم العلوي',
      'أعط الجدة الخرزة العلوية، والأطفال الخرزات السفلية',
    ],
    goal: 'فهم البنية الفيزيائية للسوروبان قبل التعلم النظري',
  },

  // ═══════════════════════════════════════════════════════════
  // 9 أسئلة متنوعة — كل سؤال يختبر مفهوماً مختلفاً
  // ═══════════════════════════════════════════════════════════
  examples: [
    // 1) قيمة الخرزة العلوية (الجدة)
    {
      problemText: 'ما قيمة الخرزة العلوية (الجدة)؟',
      answer: 5,
      ruleCategory: 'direct',
      steps: [],
      explanation:
        'الخرزة العلوية وحدها تساوي 5. نسميها الجدة 5، لأنها تجلس فوق الجسر في الطابق العلوي.',
      story:
        'الجدة تجلس وحدها في الطابق العلوي، وقيمتها خمسة كاملة. هذا سرّ الجدة!',
      storyAudioText:
        'الجدة تجلس وحدها في الطابق العلوي، وقيمتها خمسة كاملة. هذا سر الجدة.',
    },

    // 2) قيمة الخرزة السفلية (الطفل)
    {
      problemText: 'ما قيمة كل خرزة سفلية (طفل)؟',
      answer: 1,
      ruleCategory: 'direct',
      steps: [],
      explanation:
        'كل خرزة سفلية تساوي 1. نسميها طفلاً، لأن الأربعة أطفال يسكنون تحت الجسر في الطابق السفلي.',
      story:
        'تحت الجسر يسكن أربعة أطفال نشيطون، كل واحد قيمته واحد فقط.',
      storyAudioText:
        'تحت الجسر يسكن أربعة أطفال نشيطون، كل واحد قيمته واحد فقط.',
    },

    // 3) الجدة + طفلان
    {
      problemText: 'الجدة + طفلان = كم؟',
      answer: 7,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'أنزل الجدة (5)',
          fingerUsed: 'index',
          direction: 'down',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
        {
          stepIndex: 2,
          instructionText: 'ارفع طفلين (2)',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2],
          expectedValueAfter: 7,
        },
      ],
      explanation: '5 + 2 = 7 (الجدة + طفلان)',
      story:
        'نزلت الجدة من طابقها لترى الأطفال، فانضم إليها طفلان صغيران. صار المجموع: 5 + 2 = 7',
      storyAudioText:
        'نزلت الجدة من طابقها لترى الأطفال، فانضم إليها طفلان صغيران. صار المجموع خمسة زائد اثنين يساوي سبعة.',
    },

    // 4) عدد الخرزات السفلية
    {
      problemText: 'كم خرزة سفلية في العمود الواحد؟',
      answer: 4,
      ruleCategory: 'direct',
      steps: [],
      explanation:
        'في كل عمود أربع خرزات سفلية، كل واحدة قيمتها 1. إذاً الأربعة أطفال مجموعهم 4.',
      story:
        'عدّ الأطفال في الطابق السفلي: واحد، اثنان، ثلاثة، أربعة!',
      storyAudioText:
        'عد الأطفال في الطابق السفلي: واحد، اثنان، ثلاثة، أربعة!',
    },

    // 5) عدد الخرزات الكلي
    {
      problemText: 'كم خرزة كلياً في العمود الواحد؟',
      answer: 5,
      ruleCategory: 'direct',
      steps: [],
      explanation:
        'في العمود الواحد: 4 خرزات سفلية + 1 خرزة علوية = 5 خرزات. الجدة + الأربعة أطفال = 5 أفراد.',
      story:
        'عائلة السوروبان في كل عمود: الجدة + 4 أطفال = 5 أفراد!',
      storyAudioText:
        'عائلة السوروبان في كل عمود: الجدة زائد أربعة أطفال يساوي خمسة أفراد.',
    },

    // 6) الجدة + كل الأطفال
    {
      problemText: 'الجدة + كل الأطفال الأربعة = كم؟',
      answer: 9,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'أنزل الجدة (5)',
          fingerUsed: 'index',
          direction: 'down',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
        {
          stepIndex: 2,
          instructionText: 'ارفع الأربعة أطفال (4)',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2, 3, 4],
          expectedValueAfter: 9,
        },
      ],
      explanation: '5 + 4 = 9 (الجدة + كل الأطفال)',
      story:
        'صفّقت الجدة بيديها، فصعد الأطفال الأربعة كلهم للمشاركة. صار المجموع: 5 + 4 = 9',
      storyAudioText:
        'صفقت الجدة بيديها، فصعد الأطفال الأربعة كلهم للمشاركة. صار المجموع خمسة زائد أربعة يساوي تسعة.',
    },

    // 7) عدد الأعمدة
    {
      problemText: 'كم عموداً عادة في السوروبان؟',
      answer: 13,
      ruleCategory: 'direct',
      steps: [],
      explanation:
        'السوروبان التقليدي فيه 13 عموداً، لكن قد تجد أنواعاً بـ 11 أو 15 أو 27 عموداً.',
      story:
        'تخيل 13 برجاً في قلعة السوروبان، كل برج فيه عائلة كاملة (جدة + 4 أطفال)!',
      storyAudioText:
        'تخيل ثلاثة عشر برجاً في قلعة السوروبان، كل برج فيه عائلة كاملة: جدة وأربعة أطفال.',
    },

    // 8) عدد الأصابع المستخدمة
    {
      problemText: 'كم إصبعاً نستخدم لتحريك الخرزات؟',
      answer: 2,
      ruleCategory: 'direct',
      steps: [],
      explanation:
        'نستخدم إصبعين فقط: الإبهام (للرفع) والسبابة (للإنزال). الإبهام مسؤول عن الأطفال، والسبابة عن الجدة.',
      story:
        'قال الحارس: لا تحتاج كل أصابعك! فقط الإبهام والسبابة — هما المفتاح السحري.',
      storyAudioText:
        'قال الحارس: لا تحتاج كل أصابعك! فقط الإبهام والسبابة، هما المفتاح السحري.',
    },

    // 9) سؤال حسابي بسيط
    {
      problemText: '6 + 2 = كم؟',
      answer: 8,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'مثّل 6: الجدة + طفل',
          fingerUsed: 'both_pinch',
          direction: 'pinch_in',
          targetColumn: 'units',
          beadsAffected: [5, 1],
          expectedValueAfter: 6,
        },
        {
          stepIndex: 2,
          instructionText: 'أضف 2: ارفع طفلين',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [2, 3],
          expectedValueAfter: 8,
        },
      ],
      explanation: '6 + 2 = 8 (الجدة + طفل + طفلان)',
      story:
        'الجدة وطفل واحد في الساحة، فانضم طفلان آخران. المجموع: 6 + 2 = 8',
      storyAudioText:
        'الجدة وطفل واحد في الساحة، فانضم طفلان آخران. المجموع ستة زائد اثنين يساوي ثمانية.',
    },
  ],
};


// ═══════════════════════════════════════════════════════════
// مصفوفة الدروس
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// المستوى 2: تمثيل الأعداد على السوروبان
// ═══════════════════════════════════════════════════════════
const level2: LearnModule = {
  id: 2,
  title: 'Number Representation',
  titleAr: 'تمثيل الأعداد على السوروبان',
  description: 'Represent numbers from 0 to 9999',
  descriptionAr: 'مثّل الأعداد من 0 إلى 9999',
  status: 'locked',
  beads: { upper: 1, lower: 4 },
  value: 0,
  concept: 'Each column represents one digit',
  conceptAr: 'كل عمود يمثل منزلة رقمية',
  icon: 'Hash',
  audioText:
    'الآن سنتعلم كيف نمثّل الأعداد على السوروبان. كل عمود يمثل منزلة: الآحاد، العشرات، المئات، الآلاف. الخرزة التي تلمس الجسر هي التي لها قيمة! الباقي نائم لا قيمة له.',
  rule: 'Bead touching the bridge = active',
  ruleAr: 'الخرزة التي تلمس الجسر = مُفعّلة',
  story:
    'قال حارس القلعة: تذكّروا القاعدة الذهبية — الخرزة التي تلمس الجسر هي التي تُحسب! الباقي نائم لا قيمة له. الآن ستمثّلون الأعداد بأيديكم على المعداد، وستصبحون سادة الأرقام!',
  storyAudioText:
    'قال حارس القلعة: تذكروا القاعدة الذهبية — الخرزة التي تلمس الجسر هي التي تحسب. الباقي نائم لا قيمة له. الآن ستمثلون الأعداد بأيديكم على المعداد، وستصبحون سادة الأرقام.',
  targetAge: '6-8',
  requiresAllPrevious: true,

  interactionMode: 'abacus-representation',
  maxAttempts: 10,

  tactileActivity: {
    titleAr: 'نشاط البيوت الثلاثة',
    materials: ['3 صناديق صغيرة', 'بطاقات أرقام 0-9', 'قلم'],
    steps: [
      'سمّ الصندوق الأول: الآحاد',
      'سمّ الصندوق الثاني: العشرات',
      'سمّ الصندوق الثالث: المئات',
      'ضع في كل صندوق عدداً من 0 إلى 9',
      'اسأل طفلك: ما الرقم الذي يمثله هذا الترتيب؟',
    ],
    goal: 'فهم مفهوم المنازل (آحاد، عشرات، مئات) قبل تطبيقه على المعداد',
  },

  examples: [
    // 1) الرقم 0
    {
      problemText: 'مثّل الرقم 0 على السوروبان',
      answer: 0,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'تأكد أن جميع الخرزات بعيدة عن الجسر',
          fingerUsed: 'index',
          direction: 'down',
          targetColumn: 'units',
          beadsAffected: [],
          expectedValueAfter: 0,
        },
      ],
      explanation: 'لا توجد خرزة تلمس الجسر = 0',
      story: 'الجميع نائم! لا أحد يلمس الجسر، فالرقم صفر.',
      storyAudioText: 'الجميع نائم! لا أحد يلمس الجسر، فالرقم صفر.',
    },

    // 2) الرقم 3
    {
      problemText: 'مثّل الرقم 3 على السوروبان',
      answer: 3,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'ارفع ثلاثة أطفال بالإبهام في عمود الآحاد',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2, 3],
          expectedValueAfter: 3,
        },
      ],
      explanation: 'ثلاثة أطفال لمسوا الجسر = 3',
      story: 'استدعت الجدة ثلاثة أطفال، فرفعوا أصابعهم ولامسوا الجسر.',
      storyAudioText: 'استدعت الجدة ثلاثة أطفال، فرفعوا أصابعهم ولامسوا الجسر.',
    },

    // 3) الرقم 5
    {
      problemText: 'مثّل الرقم 5 على السوروبان',
      answer: 5,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'أنزل الجدة 5 بالسبابة في عمود الآحاد',
          fingerUsed: 'index',
          direction: 'down',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
      ],
      explanation: 'الجدة وحدها لمست الجسر = 5',
      story: 'سمعت الجدة ضحكات الأطفال، فنزلت لتراهم. الجدة وحدها تساوي 5!',
      storyAudioText:
        'سمعت الجدة ضحكات الأطفال، فنزلت لتراهم. الجدة وحدها تساوي خمسة.',
    },

    // 4) الرقم 7
    {
      problemText: 'مثّل الرقم 7 على السوروبان',
      answer: 7,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'أنزل الجدة 5 بالسبابة في عمود الآحاد',
          fingerUsed: 'index',
          direction: 'down',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
        {
          stepIndex: 2,
          instructionText: 'ارفع طفلين بالإبهام',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2],
          expectedValueAfter: 7,
        },
      ],
      explanation: '5 + 2 = 7 (الجدة + طفلان)',
      story: 'نزلت الجدة، وانضم إليها طفلان. صار المجموع 5 + 2 = 7',
      storyAudioText:
        'نزلت الجدة، وانضم إليها طفلان. صار المجموع خمسة زائد اثنين يساوي سبعة.',
    },

    // 5) الرقم 9
    {
      problemText: 'مثّل الرقم 9 على السوروبان',
      answer: 9,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'أنزل الجدة 5 بالسبابة',
          fingerUsed: 'index',
          direction: 'down',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
        {
          stepIndex: 2,
          instructionText: 'ارفع الأربعة أطفال بالإبهام',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2, 3, 4],
          expectedValueAfter: 9,
        },
      ],
      explanation: '5 + 4 = 9 (الجدة + كل الأطفال)',
      story:
        'صفّقت الجدة بيديها، فصعد الأطفال الأربعة كلهم. ممتلئ! 5 + 4 = 9',
      storyAudioText:
        'صفقت الجدة بيديها، فصعد الأطفال الأربعة كلهم. ممتلئ! خمسة زائد أربعة يساوي تسعة.',
    },

    // 6) الرقم 10
    {
      problemText: 'مثّل الرقم 10 على السوروبان',
      answer: 10,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'ارفع خرزة واحدة في عمود العشرات بالإبهام',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'tens',
          beadsAffected: [1],
          expectedValueAfter: 10,
        },
      ],
      explanation: '10 = 1 في العشرات و 0 في الآحاد',
      story:
        'عندما نصل إلى 10، ننتقل إلى بيت العشرات! خرزة واحدة هناك تساوي 10.',
      storyAudioText:
        'عندما نصل إلى عشرة، ننتقل إلى بيت العشرات. خرزة واحدة هناك تساوي عشرة.',
    },

    // 7) الرقم 25
    {
      problemText: 'مثّل الرقم 25 على السوروبان',
      answer: 25,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'في العشرات: ارفع طفلين بالإبهام',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'tens',
          beadsAffected: [1, 2],
          expectedValueAfter: 20,
        },
        {
          stepIndex: 2,
          instructionText: 'في الآحاد: أنزل الجدة 5 بالسبابة',
          fingerUsed: 'index',
          direction: 'down',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 25,
        },
      ],
      explanation: '20 + 5 = 25 (عشرتان + الجدة)',
      story:
        'عشرتان في بيت العشرات + الجدة في بيت الآحاد = 25',
      storyAudioText:
        'عشرتان في بيت العشرات زائد الجدة في بيت الآحاد يساوي خمسة وعشرين.',
    },

    // 8) الرقم 47
    {
      problemText: 'مثّل الرقم 47 على السوروبان',
      answer: 47,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'في العشرات: ارفع 4 أطفال (4 عشرات = 40)',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'tens',
          beadsAffected: [1, 2, 3, 4],
          expectedValueAfter: 40,
        },
        {
          stepIndex: 2,
          instructionText: 'في الآحاد: أنزل الجدة 5 + ارفع طفلين (7)',
          fingerUsed: 'both_pinch',
          direction: 'pinch_in',
          targetColumn: 'units',
          beadsAffected: [5, 1, 2],
          expectedValueAfter: 47,
        },
      ],
      explanation: '40 + 7 = 47',
      story: 'أربع عشرات + سبعة آحاد = 47',
      storyAudioText:
        'أربع عشرات زائد سبعة آحاد يساوي سبعة وأربعين.',
    },

    // 9) الرقم 100
    {
      problemText: 'مثّل الرقم 100 على السوروبان',
      answer: 100,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'ارفع خرزة واحدة في عمود المئات بالإبهام',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'hundreds',
          beadsAffected: [1],
          expectedValueAfter: 100,
        },
      ],
      explanation: 'مائة = خرزة واحدة في خانة المئات',
      story: 'عندما نصل إلى 100، ننتقل إلى بيت المئات! هذا بيت العائلة الكبيرة.',
      storyAudioText:
        'عندما نصل إلى مائة، ننتقل إلى بيت المئات. هذا بيت العائلة الكبيرة.',
    },

    // 10) الرقم 134
    {
      problemText: 'مثّل الرقم 134 على السوروبان',
      answer: 134,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'في المئات: ارفع خرزة واحدة (100)',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'hundreds',
          beadsAffected: [1],
          expectedValueAfter: 100,
        },
        {
          stepIndex: 2,
          instructionText: 'في العشرات: ارفع 3 أطفال (30)',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'tens',
          beadsAffected: [1, 2, 3],
          expectedValueAfter: 130,
        },
        {
          stepIndex: 3,
          instructionText: 'في الآحاد: ارفع 4 أطفال (4)',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2, 3, 4],
          expectedValueAfter: 134,
        },
      ],
      explanation: '100 + 30 + 4 = 134',
      story:
        'مائة + ثلاثون + أربعة = 134. كل منزلة تجلس في بيتها!',
      storyAudioText:
        'مائة زائد ثلاثون زائد أربعة يساوي مائة وأربعة وثلاثين. كل منزلة تجلس في بيتها.',
    },
  ],
};
export const LEARN_MODULES: LearnModule[] = [
  level0,
  level1,
  level2,
];