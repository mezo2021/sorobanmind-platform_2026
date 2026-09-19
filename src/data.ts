import type { LearnModule, LevelNode, Quest, ProgressData, PracticeQuestion } from './types';

export const LEVELS: LevelNode[] = [
  { id: 1, name: 'Bead Basics', nameAr: 'أساسيات الخرزات', status: 'completed', icon: 'Circle', xpRequired: 0 },
  { id: 2, name: 'Direct Ops', nameAr: 'العمليات المباشرة', status: 'completed', icon: 'Plus', xpRequired: 100 },
  { id: 3, name: 'Small Friends', nameAr: 'أصدقاء 5', status: 'completed', icon: 'Combine', xpRequired: 300 },
  { id: 4, name: 'Big Friends', nameAr: 'أصدقاء 10', status: 'available', icon: 'Sigma', xpRequired: 600 },
  { id: 5, name: 'Combined Rules', nameAr: 'القواعد المركبة', status: 'locked', icon: 'Brain', xpRequired: 1000 },
  { id: 6, name: 'Anzan', nameAr: 'التصور الذهني', status: 'locked', icon: 'Eye', xpRequired: 1500 },
  { id: 7, name: 'Multiplication', nameAr: 'الضرب', status: 'locked', icon: 'X', xpRequired: 2000 },
  { id: 8, name: 'Division', nameAr: 'القسمة', status: 'locked', icon: 'Divide', xpRequired: 3000 },
];

export const LEARN_MODULES: LearnModule[] = [
  {{
  id: 1, title: 'Meet the Soroban', titleAr: 'تعرف على السوروبان',
  description: 'Discover the parts', descriptionAr: 'اكتشف أجزاء العداد الياباني',
  status: 'available', beads: { upper: 0, lower: 0 }, value: 0,
  concept: 'Soroban parts and finger rules', conceptAr: 'أجزاء السوروبان وقواعد الأصابع',
  icon: 'Info',
  audioText: 'مرحباً بك في عالم السوروبان! السوروبان عداد ياباني قديم. الإبهام يرفع خرزات الأرض، والسبابة تنزل خرزات الأرض وتحرك خرزة السماء.',
  rule: 'Thumb up lower, index moves upper and lowers', ruleAr: 'الإبهام يرفع السفلية، والسبابة تنزل السفلية وتحريك العلوية',
  story: 'بيت الخرزات السحري: المعداد منزل من دورين. الدور السفلي فيه 4 إخوة نرفعهم بالبصمة القوية (الإبهام). والدور العلوي تسكن فيه الجدة "خمسة" ونزورها بالسبابة.',
  examples: [
    {
      problemText: 'مثّل 0 (المعداد فارغ)',
      answer: 0,
      ruleCategory: 'direct',
      steps: [],
      explanation: 'كل الخرزات بعيدة عن العارضة = 0'
    },
    {
      problemText: 'مثّل 1',
      answer: 1,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'ارفع خرزة سفلية واحدة بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 1 }
      ],
      explanation: '1 = خرزة سفلية واحدة'
    },
    {
      problemText: 'مثّل 2',
      answer: 2,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'ارفع خرزتين سفليتين بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 2 }
      ],
      explanation: '2 = خرزتان سفليتان'
    },
    {
      problemText: 'مثّل 5',
      answer: 5,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل الخرزة العلوية بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 }
      ],
      explanation: '5 = الخرزة العلوية'
    },
    {
      problemText: 'مثّل 6',
      answer: 6,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل الخرزة العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع خرزة سفلية واحدة (1) بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 6 }
      ],
      explanation: '6 = 5 (علوية) + 1 (سفلية)'
    },
    {
      problemText: 'مثّل 9',
      answer: 9,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل الخرزة العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع 4 خرزات سفلية بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 9 }
      ],
      explanation: '9 = 5 (علوية) + 4 (سفلية)'
    }
  ]
{
  id: 2, title: 'Direct Addition and Subtraction', titleAr: 'الجمع والطرح المباشر',
  description: 'Add/Remove beads directly', descriptionAr: 'أضف وأزل الخرزات مباشرة',
  status: 'available', beads: { upper: 0, lower: 4 }, value: 4,
  concept: 'Direct operations without friends', conceptAr: 'عمليات مباشرة بدون قواعد',
  icon: 'Plus',
  audioText: 'الآن نتعلم الجمع والطرح المباشر. عندما تكون الخرزات كافية، نرفع بالإبهام أو ننزل بالسبابة.',
  rule: 'Thumb raises for addition, index lowers for subtraction', ruleAr: 'الإبهام يرفع عند الجمع، والسبابة تنزل عند الطرح',
  story: 'صعود وهبوط الأصدقاء: صعد صديقان الدرج (2)، ثم نزل صديق واحد (1)، فبقي 1.',
  examples: [
    {
      problemText: '1 + 2 = ؟',
      answer: 3,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'ارفع خرزة للإشارة إلى 1 (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 1 },
        { stepIndex: 2, instructionText: 'ارفع خرزتين إضافيتين (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [2, 3], expectedValueAfter: 3 }
      ],
      explanation: '1 + 2 = 3. الجمع المباشر.'
    },
    {
      problemText: '2 + 2 = ؟',
      answer: 4,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'ارفع خرزتين (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 2 },
        { stepIndex: 2, instructionText: 'ارفع خرزتين أخريين (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [3, 4], expectedValueAfter: 4 }
      ],
      explanation: '2 + 2 = 4. الجمع المباشر.'
    },
    {
      problemText: '5 + 3 = ؟',
      answer: 8,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل الخرزة العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع 3 خرزات سفلية (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 8 }
      ],
      explanation: '5 + 3 = 8. علوية + 3.'
    },
    {
      problemText: '6 + 2 = ؟',
      answer: 8,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع خرزة (1) بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 6 },
        { stepIndex: 3, instructionText: 'ارفع خرزتين إضافيتين (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [2, 3], expectedValueAfter: 8 }
      ],
      explanation: '6 + 2 = 8. علوية + 1 + 2.'
    },
    {
      problemText: '4 - 1 = ؟',
      answer: 3,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'ارفع 4 خرزات سفلية (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 4 },
        { stepIndex: 2, instructionText: 'أنزل خرزة واحدة (بالسبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 3 }
      ],
      explanation: '4 - 1 = 3. الطرح المباشر.'
    },
    {
      problemText: '8 - 3 = ؟',
      answer: 5,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع 3 خرزات سفلية (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 8 },
        { stepIndex: 3, instructionText: 'أنزل 3 خرزات سفلية (بالسبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 5 }
      ],
      explanation: '8 - 3 = 5. نطرح 3 سفلية.'
    },
    {
      problemText: '9 - 5 = ؟',
      answer: 4,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع 4 خرزات سفلية (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 9 },
        { stepIndex: 3, instructionText: 'ارفع العلوية (5) بالسبابة لطرحها', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 4 }
      ],
      explanation: '9 - 5 = 4. نطرح العلوية.'
    },
    {
      problemText: '7 - 2 = ؟',
      answer: 5,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع خرزتين (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 7 },
        { stepIndex: 3, instructionText: 'أنزل خرزتين (بالسبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 5 }
      ],
      explanation: '7 - 2 = 5. نطرح 2 سفلية.'
    },
    {
      problemText: '9 - 2 = ؟',
      answer: 7,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع 4 خرزات سفلية (بالإبهام)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 9 },
        { stepIndex: 3, instructionText: 'أنزل خرزتين (بالسبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 7 }
      ],
      explanation: '9 - 2 = 7. نطرح 2 سفلية.'
    },
    {
      problemText: '5 - 4 = ؟',
      answer: 1,
      ruleCategory: 'direct',
      steps: [
        { stepIndex: 1, instructionText: 'أنزل العلوية (5) بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
        { stepIndex: 2, instructionText: 'ارفع 4 خرزات سفلية (بالإبهام) لتمثيل 9', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 9 },
        { stepIndex: 3, instructionText: 'أنزل 3 خرزات (بالسبابة) لطرح 4', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 5 },
        { stepIndex: 4, instructionText: 'أنزل خرزة أخيرة (بالسبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 1 }
      ],
      explanation: '5 - 4 = 1. نطرح 4 من 5.'
    }
  ]
},
    id: 3, title: 'Small Friends (5)', titleAr: 'أصدقاء العدد 5',
    description: 'Use upper bead to add/remove', descriptionAr: 'استخدام الخرزة العلوية للجمع والطرح',
    status: 'locked', beads: { upper: 1, lower: 4 }, value: 9,
    concept: 'Small Friends = 5 - N', conceptAr: 'صديق 5: القاعدة 5 - N',
    icon: 'Combine',
    audioText: 'الآن نتعلم أصدقاء العدد 5. صديق الرقم هو ما نطرحه لإكماله إلى 5.',
    rule: 'Adding N = add 5, subtract (5-N)', ruleAr: 'لجمع N: أضف 5، اطرح صديقه (5 - N)',
    story: 'نزّل الجدة 5، واطرُد صديق الرقم.',
    examples: [
      { problemText: '1 + 4 = ؟', answer: 5, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'ارفع 1 بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 1 }, { stepIndex: 2, instructionText: 'أنزل 5 وأنزل 1 (السبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 5 }], explanation: '1 + 4 = 5. صديق 4 هو 1' },
      { problemText: '2 + 3 = ؟', answer: 5, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'ارفع 2 بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 2 }, { stepIndex: 2, instructionText: 'أنزل 5 وأنزل 2 (السبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 5 }], explanation: '2 + 3 = 5. صديق 3 هو 2' },
      { problemText: '3 + 2 = ؟', answer: 5, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'ارفع 3 بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 3 }, { stepIndex: 2, instructionText: 'أنزل 5 وأنزل 3 (السبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 5 }], explanation: '3 + 2 = 5. صديق 2 هو 3' },
      { problemText: '4 + 1 = ؟', answer: 5, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'ارفع 4 بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 4 }, { stepIndex: 2, instructionText: 'أنزل 5 وأنزل 4 (السبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 5 }], explanation: '4 + 1 = 5' },
      { problemText: '2 + 4 = ؟', answer: 6, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'ارفع 2 بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 2 }, { stepIndex: 2, instructionText: 'أنزل 5 وأنزل 1 (السبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 6 }], explanation: '2 + 4 = 6. صديق 4 هو 1' },
      { problemText: '3 + 3 = ؟', answer: 6, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'ارفع 3 بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 3 }, { stepIndex: 2, instructionText: 'أنزل 5 وأنزل 2 (السبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 6 }], explanation: '3 + 3 = 6. صديق 3 هو 2' },
      { problemText: '4 + 2 = ؟', answer: 6, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'ارفع 4 بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 4 }, { stepIndex: 2, instructionText: 'أنزل 5 وأنزل 3 (السبابة)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 6 }], explanation: '4 + 2 = 6. صديق 2 هو 3' },
      { problemText: '5 - 1 = ؟', answer: 4, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'أنزل 5', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 }, { stepIndex: 2, instructionText: 'ارفع 5 (السبابة) وارفع 4 (الإبهام)', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 4 }], explanation: '5 - 1 = 4. صديق 1 هو 4' },
      { problemText: '5 - 2 = ؟', answer: 3, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'أنزل 5', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 }, { stepIndex: 2, instructionText: 'ارفع 5 وارفع 3', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 3 }], explanation: '5 - 2 = 3. صديق 2 هو 3' },
      { problemText: '6 - 2 = ؟', answer: 4, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 6 (علوية + 1)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 6 }, { stepIndex: 2, instructionText: 'ارفع 5 وارفع 3', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 4 }], explanation: '6 - 2 = 4' },
      { problemText: '7 - 3 = ؟', answer: 4, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 7 (علوية + 2)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 }, { stepIndex: 2, instructionText: 'ارفع 5 وارفع 2', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 4 }], explanation: '7 - 3 = 4' },
      { problemText: '8 - 4 = ؟', answer: 4, ruleCategory: 'small_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 8 (علوية + 3)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 8 }, { stepIndex: 2, instructionText: 'ارفع 5 وارفع 1', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 4 }], explanation: '8 - 4 = 4' },
    ],
  },
  {
    id: 4, title: 'Big Friends (10)', titleAr: 'أصدقاء العدد 10',
    description: 'Carry and borrow across columns', descriptionAr: 'الحمل والاستلاف بين الخانات',
    status: 'locked', beads: { upper: 1, lower: 4 }, value: 13,
    concept: 'Big Friends = 10 - N', conceptAr: 'صديق 10: القاعدة 10 - N',
    icon: 'Sigma',
    audioText: 'الآن نتعلم أصدقاء العدد 10. عندما يتجاوز الجمع 9، نحمل 10 إلى العشرات.',
    rule: 'Add N = add 10, subtract (10-N)', ruleAr: 'لجمع N: أضف 10، اطرح صديقه (10 - N)',
    story: 'طرق باب الجار الكريم: البيت ممتلئ، نذهب للجار في عمود العشرات ونرفع خرزة (+10).',
    examples: [
      { problemText: '9 + 4 = ؟', answer: 13, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 9 (علوية + 4)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 9 }, { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 19 }, { stepIndex: 3, instructionText: 'أزل 6 من الآحاد (صديق 4)', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 13 }], explanation: '9 + 4 = 13. صديق 4 هو 6' },
      { problemText: '8 + 5 = ؟', answer: 13, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 8 (علوية + 3)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 8 }, { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 18 }, { stepIndex: 3, instructionText: 'أزل 5 من الآحاد (صديق 5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 13 }], explanation: '8 + 5 = 13. صديق 5 هو 5' },
      { problemText: '7 + 5 = ؟', answer: 12, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 7 (علوية + 2)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 }, { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 17 }, { stepIndex: 3, instructionText: 'أزل 5 من الآحاد (صديق 5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 12 }], explanation: '7 + 5 = 12' },
      { problemText: '6 + 5 = ؟', answer: 11, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 6 (علوية + 1)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 6 }, { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 16 }, { stepIndex: 3, instructionText: 'أزل 5 من الآحاد (صديق 5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 11 }], explanation: '6 + 5 = 11' },
      { problemText: '5 + 5 = ؟', answer: 10, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 5', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 }, { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 15 }, { stepIndex: 3, instructionText: 'أزل 5 من الآحاد', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 10 }], explanation: '5 + 5 = 10' },
      { problemText: '12 - 5 = ؟', answer: 7, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 12 (1 عشرات + 2 آحاد)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 }, { stepIndex: 2, instructionText: 'أضف 2 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 12 }, { stepIndex: 3, instructionText: 'اطرح 10 وأضف 5', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 7 }], explanation: '12 - 5 = 7' },
      { problemText: '15 - 7 = ؟', answer: 8, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 15 (1 عشرات + 5 آحاد)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 }, { stepIndex: 2, instructionText: 'أضف 5 في الآحاد', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 15 }, { stepIndex: 3, instructionText: 'اطرح 10 وأضف 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 8 }], explanation: '15 - 7 = 8. صديق 7 هو 3' },
      { problemText: '13 - 5 = ؟', answer: 8, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 13 (1 عشرات + 3 آحاد)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 }, { stepIndex: 2, instructionText: 'أضف 3 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 13 }, { stepIndex: 3, instructionText: 'اطرح 10 وأضف 5', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 8 }], explanation: '13 - 5 = 8' },
      { problemText: '11 - 4 = ؟', answer: 7, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 11 (1 عشرات + 1 آحاد)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 }, { stepIndex: 2, instructionText: 'أضف 1 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 11 }, { stepIndex: 3, instructionText: 'اطرح 10 وأضف 6', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 7 }], explanation: '11 - 4 = 7. صديق 4 هو 6' },
      { problemText: '10 - 3 = ؟', answer: 7, ruleCategory: 'big_friends', steps: [{ stepIndex: 1, instructionText: 'مثّل 10 (1 عشرات)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 }, { stepIndex: 2, instructionText: 'اطرح 10 وأضف 7', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 }], explanation: '10 - 3 = 7. صديق 3 هو 7' },
    ],
  },
  {
    id: 5, title: 'Combined Rules', titleAr: 'القواعد المركبة',
    description: 'Combine friends 5 and 10', descriptionAr: 'دمج صديق 5 وصديق 10',
    status: 'locked', beads: { upper: 1, lower: 4 }, value: 13,
    concept: 'Combined = +10 - 5 + 1', conceptAr: 'المركب: +10 - 5 + 1',
    icon: 'Brain',
    audioText: 'القواعد المركبة تجمع بين صديق 5 وصديق 10. مثلاً لجمع 6: نضيف 10، ثم ننزل 5، ثم نرفع 1.',
    rule: '+N = +10 - 5 + (N-5)', ruleAr: 'لجمع N: أضف 10، اطرح 5، أضف (N - 5)',
    story: 'حفلة التبادل الكبرى: نريد إضافة 6، لكن الخرزات السفلية غير كافية.',
    examples: [
      { problemText: '7 + 6 = ؟', answer: 13, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 7 (علوية + 2)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 },
        { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 17 },
        { stepIndex: 3, instructionText: 'أنزل 5 (اطرح 5، فأصبح 12)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 12 },
        { stepIndex: 4, instructionText: 'ارفع 1 (أضف 1، فأصبح 13)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 13 }
      ], explanation: '7 + 6 = 13 (+10 - 5 + 1)' },
      { problemText: '6 + 6 = ؟', answer: 12, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 6 (علوية + 1)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 6 },
        { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 16 },
        { stepIndex: 3, instructionText: 'أنزل 5 (اطرح 5، فأصبح 11)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 11 },
        { stepIndex: 4, instructionText: 'ارفع 1 (أضف 1، فأصبح 12)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 12 }
      ], explanation: '6 + 6 = 12 (+10 - 5 + 1)' },
      { problemText: '8 + 8 = ؟', answer: 16, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 8 (علوية + 3)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 8 },
        { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 18 },
        { stepIndex: 3, instructionText: 'أنزل 5 وارفع 3 (اطرح 2 فقط، فأصبح 16)', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 16 }
      ], explanation: '8 + 8 = 16 (اضف 10، اطرح 2)' },
      { problemText: '13 - 6 = ؟', answer: 7, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 13 (1 عشرات + 3 آحاد)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 },
        { stepIndex: 2, instructionText: 'أضف 3 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 13 },
        { stepIndex: 3, instructionText: 'اطرح 10، أنزل 5، ارفع 1', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 7 }
      ], explanation: '13 - 6 = 7 (-10 + 5 - 1)' },
      { problemText: '14 - 8 = ؟', answer: 6, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 14 (1 عشرات + 4 آحاد)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 },
        { stepIndex: 2, instructionText: 'أضف 4 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 14 },
        { stepIndex: 3, instructionText: 'اطرح 10، أنزل 5، ارفع 3', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 6 }
      ], explanation: '14 - 8 = 6' },
      { problemText: '15 - 9 = ؟', answer: 6, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 15 (1 عشرات + 5 آحاد)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 },
        { stepIndex: 2, instructionText: 'أضف 5', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 15 },
        { stepIndex: 3, instructionText: 'اطرح 10، أنزل 5، ارفع 4', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 6 }
      ], explanation: '15 - 9 = 6' },
      { problemText: '7 + 7 = ؟', answer: 14, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 7 (علوية + 2)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 },
        { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 17 },
        { stepIndex: 3, instructionText: 'أنزل 5، ارفع 2', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 14 }
      ], explanation: '7 + 7 = 14' },
      { problemText: '9 + 9 = ؟', answer: 18, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 9 (علوية + 4)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 9 },
        { stepIndex: 2, instructionText: 'ارفع 1 في العشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 19 },
        { stepIndex: 3, instructionText: 'أزل 1 من الآحاد', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 18 }
      ], explanation: '9 + 9 = 18' },
      { problemText: '12 - 7 = ؟', answer: 5, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: 'مثّل 12 (1 عشرات + 2 آحاد)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 },
        { stepIndex: 2, instructionText: 'أضف 2', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 12 },
        { stepIndex: 3, instructionText: 'اطرح 10، أضف 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 5 }
      ], explanation: '12 - 7 = 5' },
    ],
  },
  {
    id: 6, title: 'Anzan (Mental Visualization)', titleAr: 'التصور الذهني (الأنزان)',
    description: 'Imagine beads in your mind', descriptionAr: 'تخيل الخرزات في عقلك',
    status: 'locked', beads: { upper: 1, lower: 4 }, value: 9,
    concept: 'Imagine the abacus movement', conceptAr: 'تخيل حركة المعداد',
    icon: 'Eye',
    audioText: 'الآن نتعلم الأنزان: التصور الذهني. أغلق عينيك وتخيل المعداد. استخدم أصابعك كما لو كنت تلمس الخرزات.',
    rule: 'Visualize and move fingers', ruleAr: 'تخيل وحرك أصابعك',
    story: 'مغامرة في عالم الخيال: المعداد اختفى، لكن أصابعك تتذكره!',
    examples: [
      { problemText: 'تخيل: 2 + 3 = ؟', answer: 5, ruleCategory: 'anzan', steps: [{ stepIndex: 1, instructionText: 'تخيل رفع خرزتين', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 2 }, { stepIndex: 2, instructionText: 'تخيل رفع 3 خرزات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [3, 4, 5], expectedValueAfter: 5 }], explanation: '2 + 3 = 5 (بالتخيل)' },
      { problemText: 'تخيل: 5 + 3 = ؟', answer: 8, ruleCategory: 'anzan', steps: [{ stepIndex: 1, instructionText: 'تخيل نزول العلوية', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 }, { stepIndex: 2, instructionText: 'تخيل رفع 3 سفليّة', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 8 }], explanation: '5 + 3 = 8 (بالتخيل)' },
      { problemText: 'تخيل: 4 + 3 = ؟', answer: 7, ruleCategory: 'anzan', steps: [{ stepIndex: 1, instructionText: 'تخيل 4', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 4 }, { stepIndex: 2, instructionText: 'تخيل +3 بصديق 5 (اطرح 2)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 }], explanation: '4 + 3 = 7 (بالتخيل)' },
      { problemText: 'تخيل: 9 + 4 = ؟', answer: 13, ruleCategory: 'anzan', steps: [{ stepIndex: 1, instructionText: 'تخيل 9', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 9 }, { stepIndex: 2, instructionText: 'تخيل +10 واطرح 6', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 19 }, { stepIndex: 3, instructionText: 'أزل 6', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 13 }], explanation: '9 + 4 = 13 (بالتخيل)' },
    ],
  },
  {
    id: 7, title: 'Multiplication', titleAr: 'الضرب على المعداد',
    description: 'Multiply digit by digit', descriptionAr: 'اضرب رقماً برقم',
    status: 'locked', beads: { upper: 0, lower: 6 }, value: 42,
    concept: 'Multiply then shift position', conceptAr: 'اضرب ثم أزح الخانة',
    icon: 'X',
    audioText: 'الضرب على المعداد: نضرب كل رقم من العدد الأول بالعدد الثاني، ثم نُزاح الخانة.',
    rule: 'Multiply digit, shift position to left', ruleAr: 'اضرب الرقم، ثم أزح الخانة لليسار',
    story: 'مملكة الضرب: كل رقم يضرب له مملكته الخاصة في الخانة المناسبة.',
    examples: [
      { problemText: '12 × 3 = ؟', answer: 36, ruleCategory: 'direct', steps: [{ stepIndex: 1, instructionText: 'اضرب 10 × 3 = 30 (في العشرات)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 30 }, { stepIndex: 2, instructionText: 'اضرب 2 × 3 = 6 (في الآحاد)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 36 }], explanation: '12 × 3 = 36' },
      { problemText: '14 × 3 = ؟', answer: 42, ruleCategory: 'direct', steps: [{ stepIndex: 1, instructionText: '10 × 3 = 30', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 30 }, { stepIndex: 2, instructionText: '4 × 3 = 12 → 1 عشرات + 2 آحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [4], expectedValueAfter: 40 }, { stepIndex: 3, instructionText: 'أضف 2 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 42 }], explanation: '14 × 3 = 42' },
      { problemText: '23 × 2 = ؟', answer: 46, ruleCategory: 'direct', steps: [{ stepIndex: 1, instructionText: '20 × 2 = 40', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 40 }, { stepIndex: 2, instructionText: '3 × 2 = 6', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 46 }], explanation: '23 × 2 = 46' },
      { problemText: '11 × 4 = ؟', answer: 44, ruleCategory: 'direct', steps: [{ stepIndex: 1, instructionText: '10 × 4 = 40', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 40 }, { stepIndex: 2, instructionText: '1 × 4 = 4', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 44 }], explanation: '11 × 4 = 44' },
      { problemText: '5 × 4 = ؟', answer: 20, ruleCategory: 'direct', steps: [{ stepIndex: 1, instructionText: '5 × 4 = 20 (اضع 2 في العشرات)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 20 }], explanation: '5 × 4 = 20' },
      { problemText: '5 × 3 = ؟', answer: 15, ruleCategory: 'direct', steps: [{ stepIndex: 1, instructionText: '5 × 3 = 15 → 1 عشرات + 5 آحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 }, { stepIndex: 2, instructionText: 'أضف 5 في الآحاد', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 15 }], explanation: '5 × 3 = 15' },
      { problemText: '13 × 3 = ؟', answer: 39, ruleCategory: 'direct', steps: [{ stepIndex: 1, instructionText: '10 × 3 = 30', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 30 }, { stepIndex: 2, instructionText: '3 × 3 = 9', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 39 }], explanation: '13 × 3 = 39' },
      { problemText: '21 × 4 = ؟', answer: 84, ruleCategory: 'direct', steps: [{ stepIndex: 1, instructionText: '20 × 4 = 80', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4, 5, 6, 7, 8], expectedValueAfter: 80 }, { stepIndex: 2, instructionText: '1 × 4 = 4', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 84 }], explanation: '21 × 4 = 84' },
    ],
  },
  // ============================================================
  // الدرس 8: القسمة (مصحّح بالكامل)
  // ============================================================
  {
    id: 8, title: 'Division', titleAr: 'القسمة على المعداد',
    description: 'Divide digit by digit', descriptionAr: 'اقسم رقماً برقم على المعداد',
    status: 'locked', beads: { upper: 0, lower: 3 }, value: 21,
    concept: 'Divide, multiply, subtract', conceptAr: 'اقسم، اضرب، اطرح',
    icon: 'Divide',
    audioText: 'القسمة على المعداد: مثّل المقسوم، اقسم على المقسوم عليه، اكتب الناتج في الخانة المناسبة، ثم اضرب واطرح. الناتج النهائي يظهر على المعداد.',
    rule: 'Represent → Divide → Multiply → Subtract', ruleAr: 'مثّل ← اقسم ← اضرب ← اطرح',
    story: 'كنز القراصنة: نقسم الذهب بين القراصنة بالتساوي!',
    examples: [
      {
        problemText: '8 ÷ 2 = ؟',
        answer: 4,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل المقسوم (8) على المعداد: خرزة علوية + 3 سفلية', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedAbacusState: [8, 0, 0] },
          { stepIndex: 2, instructionText: 'اقسم 8 ÷ 2 = 4. اكتب الناتج (4) في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedAbacusState: [4, 0, 0] },
          { stepIndex: 3, instructionText: 'تحقق: 4 × 2 = 8. اطرح 8 من الآحاد (أعد المعداد للصفر)', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedAbacusState: [4, 0, 0] }
        ],
        explanation: '8 ÷ 2 = 4. الباقي: 0'
      },
      {
        problemText: '6 ÷ 2 = ؟',
        answer: 3,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 6 (خرزة علوية + 1 سفلية)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedAbacusState: [6, 0, 0] },
          { stepIndex: 2, instructionText: 'اقسم 6 ÷ 2 = 3. اكتب 3 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
          { stepIndex: 3, instructionText: 'تحقق: 3 × 2 = 6. اطرح 6', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1], expectedAbacusState: [3, 0, 0] }
        ],
        explanation: '6 ÷ 2 = 3. الباقي: 0'
      },
      {
        problemText: '9 ÷ 3 = ؟',
        answer: 3,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 9 (علوية + 4)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedAbacusState: [9, 0, 0] },
          { stepIndex: 2, instructionText: 'اقسم 9 ÷ 3 = 3. اكتب 3 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
          { stepIndex: 3, instructionText: 'تحقق: 3 × 3 = 9. اطرح 9', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedAbacusState: [3, 0, 0] }
        ],
        explanation: '9 ÷ 3 = 3. الباقي: 0'
      },
      {
        problemText: '84 ÷ 4 = ؟',
        answer: 21,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 84: 8 عشرات، 4 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5, 1, 2, 3], expectedAbacusState: [4, 8, 0] },
          { stepIndex: 2, instructionText: 'اقسم 8 ÷ 4 = 2. اكتب 2 في العشرات من الناتج', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedAbacusState: [4, 2, 0] },
          { stepIndex: 3, instructionText: 'تحقق: 2 × 4 = 8. اطرح 8 من العشرات', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [5, 1, 2, 3], expectedAbacusState: [4, 2, 0] },
          { stepIndex: 4, instructionText: 'اقسم 4 ÷ 4 = 1. اكتب 1 في الآحاد من الناتج', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedAbacusState: [1, 2, 0] },
          { stepIndex: 5, instructionText: 'تحقق: 1 × 4 = 4. اطرح 4 من الآحاد', fingerUsed: 'thumb', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedAbacusState: [1, 2, 0] }
        ],
        explanation: '84 ÷ 4 = 21. الباقي: 0'
      },
      {
        problemText: '15 ÷ 5 = ؟',
        answer: 3,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 15: 1 عشرات، 5 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedAbacusState: [5, 1, 0] },
          { stepIndex: 2, instructionText: 'اقسم 15 ÷ 5 = 3. اكتب 3 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
          { stepIndex: 3, instructionText: 'تحقق: 3 × 5 = 15. اطرح 15 بالكامل', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [1, 5], expectedAbacusState: [3, 0, 0] }
        ],
        explanation: '15 ÷ 5 = 3. الباقي: 0'
      },
      {
        problemText: '12 ÷ 4 = ؟',
        answer: 3,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 12: 1 عشرات، 2 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedAbacusState: [2, 1, 0] },
          { stepIndex: 2, instructionText: 'اقسم 12 ÷ 4 = 3. اكتب 3 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
          { stepIndex: 3, instructionText: 'تحقق: 3 × 4 = 12. اطرح 12 بالكامل', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [3, 0, 0] }
        ],
        explanation: '12 ÷ 4 = 3. الباقي: 0'
      },
      {
        problemText: '20 ÷ 5 = ؟',
        answer: 4,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 20: 2 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [0, 2, 0] },
          { stepIndex: 2, instructionText: 'اقسم 20 ÷ 5 = 4. اكتب 4 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedAbacusState: [4, 0, 0] },
          { stepIndex: 3, instructionText: 'تحقق: 4 × 5 = 20. اطرح 20 بالكامل', fingerUsed: 'thumb', direction: 'down', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [4, 0, 0] }
        ],
        explanation: '20 ÷ 5 = 4. الباقي: 0'
      },
      {
        problemText: '21 ÷ 7 = ؟',
        answer: 3,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 21: 2 عشرات، 1 آحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [1, 2, 0] },
          { stepIndex: 2, instructionText: 'اقسم 21 ÷ 7 = 3. اكتب 3 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
          { stepIndex: 3, instructionText: 'تحقق: 3 × 7 = 21. اطرح 21 بالكامل', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [3, 0, 0] }
        ],
        explanation: '21 ÷ 7 = 3. الباقي: 0'
      },
    ],
  },
];

export const QUESTS: Quest[] = [
  { id: 1, title: 'Daily Practice', titleAr: 'التدريب اليومي', description: 'Complete 10', descriptionAr: 'أكمل ١٠ مسائل', xpReward: 50, progress: 0, target: 10, icon: 'Swords', color: 'from-purple-500 to-electric-500', type: 'practice' },
  { id: 2, title: 'Anzan Apprentice', titleAr: 'متدرب الأنزان', description: 'Score 20', descriptionAr: 'احصل على ٢٠ نقطة', xpReward: 80, progress: 0, target: 20, icon: 'Eye', color: 'from-electric-500 to-emerald2-500', type: 'anzan' },
  { id: 3, title: 'Perfect Streak', titleAr: 'سلسلة مثالية', description: '5-day streak', descriptionAr: 'حافظ على ٥ أيام', xpReward: 100, progress: 0, target: 5, icon: 'Flame', color: 'from-gold-400 to-gold-600', type: 'streak' },
  { id: 4, title: 'Lesson Explorer', titleAr: 'مستكشف الدروس', description: 'Complete 3', descriptionAr: 'أكمل ٣ دروس', xpReward: 60, progress: 0, target: 3, icon: 'BookOpen', color: 'from-emerald2-400 to-emerald2-600', type: 'lessons' },
  { id: 5, title: 'Addition Master', titleAr: 'سيد الجمع', description: '5 additions', descriptionAr: '٥ مسائل جمع', xpReward: 70, progress: 0, target: 5, icon: 'Plus', color: 'from-purple-400 to-purple-600', type: 'addition' },
  { id: 6, title: 'Subtraction Hero', titleAr: 'بطل الطرح', description: '5 subtractions', descriptionAr: '٥ مسائل طرح', xpReward: 70, progress: 0, target: 5, icon: 'Minus', color: 'from-electric-400 to-electric-600', type: 'subtraction' },
  { id: 7, title: 'Multiplication Pro', titleAr: 'محترف الضرب', description: '5 multiplications', descriptionAr: '٥ مسائل ضرب', xpReward: 100, progress: 0, target: 5, icon: 'X', color: 'from-pink-400 to-pink-600', type: 'multiplication' },
  { id: 8, title: 'Division Expert', titleAr: 'خبير القسمة', description: '5 divisions', descriptionAr: '٥ مسائل قسمة', xpReward: 100, progress: 0, target: 5, icon: 'Divide', color: 'from-gold-400 to-gold-600', type: 'division' },
  { id: 9, title: 'Anzan Expert', titleAr: 'خبير الأنزان', description: 'Score 50', descriptionAr: '٥٠ نقطة في الأنزان', xpReward: 150, progress: 0, target: 50, icon: 'Eye', color: 'from-emerald2-400 to-emerald2-600', type: 'anzanHighScore' },
];

export const ADDITION_QUESTIONS: PracticeQuestion[] = [
  { question: '1 + 2', answer: 3, choices: [2, 3, 4, 5], type: 'direct' },
  { question: '2 + 2', answer: 4, choices: [3, 4, 5, 6], type: 'direct' },
  { question: '5 + 3', answer: 8, choices: [7, 8, 9, 10], type: 'direct' },
  { question: '4 + 5', answer: 9, choices: [8, 9, 10, 11], type: 'direct' },
  { question: '1 + 4', answer: 5, choices: [4, 5, 6, 7], type: 'small_friends' },
  { question: '2 + 3', answer: 5, choices: [4, 5, 6, 7], type: 'small_friends' },
  { question: '4 + 3', answer: 7, choices: [6, 7, 8, 9], type: 'small_friends' },
  { question: '3 + 4', answer: 7, choices: [6, 7, 8, 9], type: 'small_friends' },
  { question: '2 + 4', answer: 6, choices: [5, 6, 7, 8], type: 'small_friends' },
  { question: '9 + 4', answer: 13, choices: [12, 13, 14, 15], type: 'big_friends' },
  { question: '8 + 5', answer: 13, choices: [12, 13, 14, 15], type: 'big_friends' },
  { question: '7 + 5', answer: 12, choices: [11, 12, 13, 14], type: 'big_friends' },
  { question: '6 + 5', answer: 11, choices: [10, 11, 12, 13], type: 'big_friends' },
  { question: '5 + 5', answer: 10, choices: [9, 10, 11, 12], type: 'big_friends' },
  { question: '7 + 6', answer: 13, choices: [12, 13, 14, 15], type: 'combined' },
  { question: '6 + 6', answer: 12, choices: [11, 12, 13, 14], type: 'combined' },
  { question: '8 + 8', answer: 16, choices: [15, 16, 17, 18], type: 'combined' },
  { question: '7 + 7', answer: 14, choices: [13, 14, 15, 16], type: 'combined' },
  { question: '9 + 9', answer: 18, choices: [17, 18, 19, 20], type: 'combined' },
];

export const SUBTRACTION_QUESTIONS: PracticeQuestion[] = [
  { question: '4 - 1', answer: 3, choices: [2, 3, 4, 5], type: 'direct' },
  { question: '9 - 5', answer: 4, choices: [3, 4, 5, 6], type: 'direct' },
  { question: '8 - 3', answer: 5, choices: [4, 5, 6, 7], type: 'direct' },
  { question: '5 - 2', answer: 3, choices: [2, 3, 4, 5], type: 'small_friends' },
  { question: '5 - 1', answer: 4, choices: [3, 4, 5, 6], type: 'small_friends' },
  { question: '6 - 2', answer: 4, choices: [3, 4, 5, 6], type: 'small_friends' },
  { question: '7 - 3', answer: 4, choices: [3, 4, 5, 6], type: 'small_friends' },
  { question: '8 - 4', answer: 4, choices: [3, 4, 5, 6], type: 'small_friends' },
  { question: '12 - 5', answer: 7, choices: [6, 7, 8, 9], type: 'big_friends' },
  { question: '15 - 7', answer: 8, choices: [7, 8, 9, 10], type: 'big_friends' },
  { question: '13 - 5', answer: 8, choices: [7, 8, 9, 10], type: 'big_friends' },
  { question: '11 - 4', answer: 7, choices: [6, 7, 8, 9], type: 'big_friends' },
  { question: '10 - 3', answer: 7, choices: [6, 7, 8, 9], type: 'big_friends' },
  { question: '13 - 6', answer: 7, choices: [6, 7, 8, 9], type: 'combined' },
  { question: '14 - 8', answer: 6, choices: [5, 6, 7, 8], type: 'combined' },
  { question: '15 - 9', answer: 6, choices: [5, 6, 7, 8], type: 'combined' },
  { question: '12 - 7', answer: 5, choices: [4, 5, 6, 7], type: 'combined' },
];

export const MULTIPLICATION_QUESTIONS: PracticeQuestion[] = [
  { question: '12 × 3', answer: 36, choices: [33, 36, 39, 42], type: 'direct' },
  { question: '14 × 3', answer: 42, choices: [39, 42, 45, 48], type: 'direct' },
  { question: '23 × 2', answer: 46, choices: [43, 46, 49, 52], type: 'direct' },
  { question: '11 × 4', answer: 44, choices: [41, 44, 47, 50], type: 'direct' },
  { question: '5 × 4', answer: 20, choices: [15, 20, 25, 30], type: 'direct' },
  { question: '5 × 3', answer: 15, choices: [10, 15, 20, 25], type: 'direct' },
  { question: '13 × 3', answer: 39, choices: [36, 39, 42, 45], type: 'direct' },
  { question: '21 × 4', answer: 84, choices: [80, 84, 88, 92], type: 'direct' },
  { question: '2 × 2', answer: 4, choices: [2, 4, 6, 8], type: 'direct' },
  { question: '3 × 2', answer: 6, choices: [4, 6, 8, 10], type: 'direct' },
  { question: '4 × 2', answer: 8, choices: [6, 8, 10, 12], type: 'direct' },
  { question: '5 × 2', answer: 10, choices: [8, 10, 12, 14], type: 'direct' },
  { question: '3 × 3', answer: 9, choices: [6, 9, 12, 15], type: 'direct' },
  { question: '4 × 3', answer: 12, choices: [9, 12, 15, 18], type: 'direct' },
  { question: '3 × 5', answer: 15, choices: [10, 15, 20, 25], type: 'direct' },
  { question: '4 × 5', answer: 20, choices: [15, 20, 25, 30], type: 'direct' },
  { question: '2 × 6', answer: 12, choices: [10, 12, 14, 16], type: 'direct' },
  { question: '3 × 6', answer: 18, choices: [15, 18, 21, 24], type: 'direct' },
];

export const DIVISION_QUESTIONS: PracticeQuestion[] = [
  { question: '6 ÷ 2', answer: 3, choices: [2, 3, 4, 5], type: 'direct' },
  { question: '8 ÷ 2', answer: 4, choices: [3, 4, 5, 6], type: 'direct' },
  { question: '9 ÷ 3', answer: 3, choices: [2, 3, 4, 5], type: 'direct' },
  { question: '15 ÷ 5', answer: 3, choices: [2, 3, 4, 5], type: 'direct' },
  { question: '12 ÷ 4', answer: 3, choices: [2, 3, 4, 5], type: 'direct' },
  { question: '20 ÷ 5', answer: 4, choices: [3, 4, 5, 6], type: 'direct' },
  { question: '21 ÷ 7', answer: 3, choices: [2, 3, 4, 5], type: 'direct' },
  { question: '18 ÷ 6', answer: 3, choices: [2, 3, 4, 5], type: 'direct' },
  { question: '10 ÷ 2', answer: 5, choices: [4, 5, 6, 7], type: 'direct' },
  { question: '12 ÷ 2', answer: 6, choices: [5, 6, 7, 8], type: 'direct' },
  { question: '12 ÷ 3', answer: 4, choices: [3, 4, 5, 6], type: 'direct' },
  { question: '15 ÷ 3', answer: 5, choices: [4, 5, 6, 7], type: 'direct' },
  { question: '8 ÷ 4', answer: 2, choices: [1, 2, 3, 4], type: 'direct' },
  { question: '16 ÷ 4', answer: 4, choices: [3, 4, 5, 6], type: 'direct' },
  { question: '10 ÷ 5', answer: 2, choices: [1, 2, 3, 4], type: 'direct' },
  { question: '25 ÷ 5', answer: 5, choices: [4, 5, 6, 7], type: 'direct' },
  { question: '12 ÷ 6', answer: 2, choices: [1, 2, 3, 4], type: 'direct' },
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  ...ADDITION_QUESTIONS,
  ...SUBTRACTION_QUESTIONS,
  ...MULTIPLICATION_QUESTIONS,
  ...DIVISION_QUESTIONS,
];

export const PROGRESS_DATA: ProgressData = {
  totalProblems: 0, correctAnswers: 0, averageSpeed: 0, lessonsCompleted: 0, anzanHighScore: 0,
  weeklyXP: [{ day: 'السبت', xp: 0 }, { day: 'الأحد', xp: 0 }, { day: 'الاثنين', xp: 0 }, { day: 'الثلاثاء', xp: 0 }, { day: 'الأربعاء', xp: 0 }, { day: 'الخميس', xp: 0 }, { day: 'الجمعة', xp: 0 }],
};

export const BADGES = [
  { id: 'beginner', name: 'Beginner', nameAr: 'مبتدئ', xpRequired: 200, icon: 'Star' },
  { id: 'trainee', name: 'Trainee', nameAr: 'متدرب', xpRequired: 500, icon: 'Target' },
  { id: 'anzan-master', name: 'Anzan Master', nameAr: 'سيد الأنزان', xpRequired: 750, icon: 'Eye' },
  { id: 'skilled', name: 'Skilled', nameAr: 'ماهر', xpRequired: 1250, icon: 'Award' },
  { id: 'soroban-expert', name: 'Soroban Expert', nameAr: 'خبير السوروبان', xpRequired: 2000, icon: 'Award' },
  { id: 'professional', name: 'Professional', nameAr: 'محترف', xpRequired: 3500, icon: 'Diamond' },
  { id: 'legend', name: 'Legend', nameAr: 'أسطورة', xpRequired: 5000, icon: 'Crown' },
  { id: 'eternal-legend', name: 'Eternal Legend', nameAr: 'أسطورة خالدة', xpRequired: 10000, icon: 'Crown' },
];
