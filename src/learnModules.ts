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
export const LEARN_MODULES: LearnModule[] = [
  level0,
];
