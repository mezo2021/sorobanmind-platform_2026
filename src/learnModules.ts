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
    'في يوم مشمس، وصل ثلاثة أبطال صغار — ليلى وعمر وياسين — إلى بوابة خشبية ضخمة نُقش عليها: قلعة السوروبان — من يدخلها يصبح سيد الأرقام. دقّوا الجرس، فانفتح الباب، وظهر حارس القلعة: رجل خشبي اسمه الإطار. قال مبتسماً: في هذه القلعة تسكن عائلة غريبة: أربعة أطفال نشيطون في الطابق السفلي، كل واحد قيمته واحد. وفوق الجسر تسكن الجدة الحنونة، قيمتها خمسة.',
  storyAudioText:
    'في يوم مشمس، وصل ثلاثة أبطال صغار إلى بوابة خشبية ضخمة نُقش عليها: قلعة السوروبان، من يدخلها يصبح سيد الأرقام. دقوا الجرس، فانفتح الباب، وظهر حارس القلعة: رجل خشبي اسمه الإطار. قال مبتسماً: في هذه القلعة تسكن عائلة غريبة: أربعة أطفال نشيطون في الطابق السفلي، كل واحد قيمته واحد. وفوق الجسر تسكن الجدة الحنونة، قيمتها خمسة.',
  targetAge: '6-7',
  requiresAllPrevious: true,

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

  examples: [
    {
      problemText: 'كم خرزة علوية في العمود الواحد؟',
      answer: 1,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'انظر فوق الجسر — هناك خرزة واحدة فقط',
          fingerUsed: 'index',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [5],
          expectedValueAfter: 5,
        },
      ],
      explanation: 'الخرزة العلوية واحدة، قيمتها 5',
      story: 'فوق الجسر تسكن جدة واحدة حنونة، قيمتها خمسة.',
      storyAudioText: 'فوق الجسر تسكن جدة واحدة حنونة، قيمتها خمسة.',
    },
    {
      problemText: 'كم خرزة سفلية في العمود الواحد؟',
      answer: 4,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'انظر تحت الجسر — هناك 4 خرزات',
          fingerUsed: 'thumb',
          direction: 'up',
          targetColumn: 'units',
          beadsAffected: [1, 2, 3, 4],
          expectedValueAfter: 4,
        },
      ],
      explanation: 'الخرزات السفلية 4، كل واحدة قيمتها 1',
      story: 'تحت الجسر يسكن أربعة أطفال نشيطون، كل واحد قيمته واحد!',
      storyAudioText: 'تحت الجسر يسكن أربعة أطفال نشيطون، كل واحد قيمته واحد.',
    },
    {
      problemText: 'كم عدد الخرزات في العمود الواحد؟',
      answer: 5,
      ruleCategory: 'direct',
      steps: [
        {
          stepIndex: 1,
          instructionText: 'اجمع: 4 خرزات سفلية + خرزة علوية',
          fingerUsed: 'both_pinch',
          direction: 'pinch_in',
          targetColumn: 'units',
          beadsAffected: [5, 1, 2, 3, 4],
          expectedValueAfter: 5,
        },
      ],
      explanation: '5 خرزات في العمود: 4 + 1 = 5',
      story: 'عائلة السوروبان: 4 أطفال + الجدة = 5 أفراد في كل عمود!',
      storyAudioText: 'عائلة السوروبان: أربعة أطفال زائد الجدة يساوي خمسة أفراد في كل عمود.',
    },
    {
      problemText: 'ما اسم الجسر الذي يقسم المعداد؟',
      answer: 0,
      ruleCategory: 'direct',
      steps: [],
      explanation: 'العارضة الفاصلة أو الجسر',
      story: 'العارضة الفاصلة هي الحدود بين عالم الأطفال وعالم الجدة!',
      storyAudioText: 'العارضة الفاصلة هي الحدود بين عالم الأطفال وعالم الجدة.',
    },
    {
      problemText: 'لماذا نتعلم السوروبان؟',
      answer: 0,
      ruleCategory: 'direct',
      steps: [],
      explanation:
        'لتنمية 6 مهارات: التركيز، التخيل، الحفظ السريع، دقة الملاحظة، الفعالية في القراءة والاستماع، ومعالجة المعلومات',
      story: 'السوروبان ليس آلة حاسبة! إنه مدرّب عقلي يجعل دماغك أقوى.',
      storyAudioText: 'السوروبان ليس آلة حاسبة! إنه مدرب عقلي يجعل دماغك أقوى.',
    },
    {
      problemText: 'ما الأصابع المستخدمة في تحريك الخرزات؟',
      answer: 0,
      ruleCategory: 'direct',
      steps: [],
      explanation:
        'الإبهام لرفع الخرزات السفلية، والسبابة لإنزالها وتحريك العلوية',
      story:
        'الإبهام مسؤول عن الرفع، والسبابة مسؤولة عن الإنزال. لا تخلطوا بينهما!',
      storyAudioText:
        'الإبهام مسؤول عن الرفع، والسبابة مسؤولة عن الإنزال. لا تخلطوا بينهما.',
    },
    {
      problemText: 'ما قيمة الخرزة العلوية؟',
      answer: 5,
      ruleCategory: 'direct',
      steps: [],
      explanation: 'قيمة الخرزة العلوية 5',
      story: 'الجدة وحدها تساوي 5! هذا سرّها.',
      storyAudioText: 'الجدة وحدها تساوي خمسة. هذا سرها.',
    },
    {
      problemText: 'ما قيمة كل خرزة سفلية؟',
      answer: 1,
      ruleCategory: 'direct',
      steps: [],
      explanation: 'كل خرزة سفلية تساوي 1',
      story: 'كل طفل قيمته واحد!',
      storyAudioText: 'كل طفل قيمته واحد.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// مصفوفة الدروس
// ═══════════════════════════════════════════════════════════
export const LEARN_MODULES: LearnModule[] = [
  level0,
  level1,
];