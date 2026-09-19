import type { LearnModule, LevelNode, Quest, ProgressData, PracticeQuestion } from './types';

export const LEVELS: LevelNode[] = [
  { id: 1, name: 'Soroban Intro', nameAr: 'تعريف بالسوروبان', status: 'completed', icon: 'Info', xpRequired: 0 },
  { id: 2, name: 'Castle & Beads', nameAr: 'قلعة السوروبان', status: 'completed', icon: 'Circle', xpRequired: 100 },
  { id: 3, name: 'Direct Ops', nameAr: 'العمليات المباشرة', status: 'completed', icon: 'Plus', xpRequired: 300 },
  { id: 4, name: 'Grandma 5', nameAr: 'الجدة 5', status: 'available', icon: 'Combine', xpRequired: 600 },
  { id: 5, name: 'Giant 10', nameAr: 'عملاق 10', status: 'locked', icon: 'Sigma', xpRequired: 1000 },
  { id: 6, name: 'Magic Merge', nameAr: 'الاندماج السحري', status: 'locked', icon: 'Brain', xpRequired: 1500 },
  { id: 7, name: 'Chain Challenge', nameAr: 'تحدي السلاسل', status: 'locked', icon: 'List', xpRequired: 2000 },
  { id: 8, name: 'Anzan', nameAr: 'الأنزان', status: 'locked', icon: 'Eye', xpRequired: 2600 },
  { id: 9, name: 'Tens Friends (50)', nameAr: 'أصدقاء العشرات 50', status: 'locked', icon: 'Sigma', xpRequired: 3400 },
  { id: 10, name: 'Hundreds Friends (100)', nameAr: 'أصدقاء المئات 100', status: 'locked', icon: 'Sigma', xpRequired: 4200 },
  { id: 11, name: 'Multiplication', nameAr: 'الضرب', status: 'locked', icon: 'X', xpRequired: 5200 },
  { id: 12, name: 'Division', nameAr: 'القسمة', status: 'locked', icon: 'Divide', xpRequired: 6500 },
];

export const LEARN_MODULES: LearnModule[] = [
  // ═══════════════════════════════════════════════════════════
  // الدرس 1: تعريف بالسوروبان (مقدمة: ما هو، تاريخه، فوائده)
  // ═══════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Introduction to Soroban',
    titleAr: 'تعريف بالسوروبان',
    description: 'What is Soroban, its history and benefits',
    descriptionAr: 'ما هو السوروبان؟ تاريخه وفوائده العجيبة',
    status: 'available',
    beads: { upper: 0, lower: 0 },
    value: 0,
    concept: 'Soroban is a Japanese abacus for mental math',
    conceptAr: 'السوروبان آلة حساب يابانية قديمة تُنشّط العقل',
    icon: 'Info',
    audioText: 'مرحباً بكم في عالم السوروبان! كلمة سوروبان تعني لوح الحساب باليابانية. اخترعه اليابانيون قبل أكثر من أربعمئة عام، واستخدموه في المدارس والمحلات. يساعد على تنشيط الدماغ وتقوية الذاكرة والتركيز. ستصبح أبطال الحساب الذهني بفضله!',
    rule: 'Soroban: 4 lower beads (1 each) + 1 upper bead (5)',
    ruleAr: 'السوروبان: أربع خرزات سفلية قيمتها ١، وخرزة علوية واحدة قيمتها ٥',
    story: 'قصة اكتشاف السوروبان: منذ زمن بعيد في اليابان، كان التجار يحتاجون آلة سريعة لحساب البضائع. فاخترعوا السوروبان! كان الأطفال في المدارس يتسابقون في حل المسائل بالسوروبان، وكان الفائز يُلقّب بـ "فارس الأرقام". اليوم، ستصبح أنت أيضاً فارساً من فرسان السوروبان!',
    storyAudioText: 'منذ زمن بعيد في اليابان، كان التجار يحتاجون آلة سريعة لحساب البضائع، فاخترعوا السوروبان. كان الأطفال في المدارس يتسابقون في حل المسائل، وكان الفائز يُلقّب بفارس الأرقام. اليوم، ستصبح أنت أيضاً فارساً من فرسان السوروبان!',
    examples: [
      {
        problemText: 'ما هو السوروبان؟',
        answer: 0,
        ruleCategory: 'direct',
        steps: [],
        explanation: 'السوروبان آلة حساب يابانية تعتمد على تحريك الخرزات بسرعة. عدد الخرزات ثابت، لكن قيمتها تتغير حسب موضعها. له 13 عموداً عادةً، وكل عمود يمثل منزلة رقمية واحدة.',
        story: 'تخيل صندوقاً خشبياً سحرياً، فيه جسر أفقي وأعمدة رأسية، وعلى كل عمود خرزات تنزلق صعوداً ونزولاً. هذا هو السوروبان!',
        storyAudioText: 'تخيل صندوقاً خشبياً سحرياً، فيه جسر أفقي وأعمدة رأسية، وعلى كل عمود خرزات تنزلق صعوداً ونزولاً. هذا هو السوروبان!'
      },
      {
        problemText: 'لماذا نتعلم السوروبان؟',
        answer: 0,
        ruleCategory: 'direct',
        steps: [],
        explanation: 'لأنه ينشّط النصف الأيمن والأيسر من الدماغ معاً، ويقوّي الذاكرة البصرية، ويزيد سرعة التركيز، ويجعل الحساب الذهني سهلاً وممتعاً.',
        story: 'الدماغ مثل عضلة، وكلما تدرّبت عليها أقوى! السوروبان هو "صالة الرياضة" الذهنية لعقلك.',
        storyAudioText: 'الدماغ مثل عضلة، وكلما تدرّبت عليها أقوى. السوروبان هو صالة الرياضة الذهنية لعقلك.'
      },
      {
        problemText: 'من يستخدم السوروبان؟',
        answer: 0,
        ruleCategory: 'direct',
        steps: [],
        explanation: 'يستخدمه ملايين الأطفال في اليابان والصين وكوريا ودول العالم. حتى بعض المدارس الأوروبية أدخلته ضمن مناهجها!',
        story: 'في اليابان، يُجرى مسابقة سنوية للسوروبان، ويشارك فيها أطفال من عمر خمس سنوات، ويحلّون مسائل بسرعة أسرع من الآلة الحاسبة!',
        storyAudioText: 'في اليابان، يُجرى مسابقة سنوية للسوروبان، ويشارك فيها أطفال من عمر خمس سنوات، ويحلّون مسائل بسرعة أسرع من الآلة الحاسبة.'
      },
      {
        problemText: 'ما فرق السوروبان عن الآلة الحاسبة؟',
        answer: 0,
        ruleCategory: 'direct',
        steps: [],
        explanation: 'الآلة الحاسبة تعطي الجواب فقط، بينما السوروبان يجعلك تفكر وتتخيل وتحسب في عقلك. مع السوروبان، ستُصبح أنت الآلة الحاسبة!',
        story: 'الآلة الحاسبة صديق يساعدك، أما السوروبان فهو مدرّب يجعلك قوياً.',
        storyAudioText: 'الآلة الحاسبة صديق يساعدك، أما السوروبان فهو مدرّب يجعلك قوياً.'
      },
      {
        problemText: 'كم عدد الخرزات في العمود الواحد؟',
        answer: 5,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'انظر إلى العمود الواحد، ستجد 4 خرزات في الأسفل', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [], expectedValueAfter: 0 },
          { stepIndex: 2, instructionText: 'وفوق العارضة خرزة واحدة', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [], expectedValueAfter: 0 }
        ],
        explanation: '٥ خرزات: ٤ سفلية + ١ علوية.',
        story: 'كل عمود هو عائلة صغيرة: أربعة أطفال في الأسفل وجدة واحدة في الأعلى.',
        storyAudioText: 'كل عمود هو عائلة صغيرة: أربعة أطفال في الأسفل وجدة واحدة في الأعلى.'
      },
      {
        problemText: 'كيف نُسمّي الخرزة العلوية؟',
        answer: 5,
        ruleCategory: 'direct',
        steps: [],
        explanation: 'الخرزة العلوية تُسمّى "الجدة 5"، لأن قيمتها ٥.',
        story: 'الجدة تجلس في الأعلى، وعندما تنزل لترى الأطفال، تعطيهم ٥ نقاط قوة دفعة واحدة!',
        storyAudioText: 'الجدة تجلس في الأعلى، وعندما تنزل لترى الأطفال، تعطيهم خمس نقاط قوة دفعة واحدة.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 2: قلعة السوروبان (المكونات وقيم الخرزات)
  // ═══════════════════════════════════════════════════════════
  {
    id: 2,
    title: 'Soroban Castle: Components and Bead Values',
    titleAr: 'قلعة السوروبان: المكونات وقيم الخرزات',
    description: 'Explore the structure and bead values',
    descriptionAr: 'استكشف هيكل العداد وقيم الخرزات',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 9,
    concept: 'Upper bead = 5, Lower beads = 1 each',
    conceptAr: 'الخرزة العلوية = ٥، كل خرزة سفلية = ١',
    icon: 'Circle',
    audioText: 'أهلاً بكم في قلعة السوروبان. الجسر الأفقي اسمه العارضة الفاصلة، والأعمدة الرأسية هي بيوت الأرقام. الأطفال يسكنون في الأسفل، وقيمة كل طفل واحد. الجدة تسكن في الأعلى، وقيمتها خمسة.',
    rule: 'Thumb raises lower beads (add 1), Index lowers them (subtract 1). Index moves upper bead.',
    ruleAr: 'الإبهام يرفع الخرزات السفلية، والسبابة تُنزلها وتحرّك العلوية',
    story: 'في يوم مشمس، وقف ثلاثة أبطال صغار — ليلى وعمر وياسين — أمام بوابة خشبية ضخمة نُقش عليها: "قلعة السوروبان — من يدخلها يصبح سيد الأرقام". دقّوا الجرس، فانفتح الباب بصوت دافئ، وظهر حارس القلعة: رجل خشبي اسمه "الإطار"، وعلى صدره جسر أفقي يُسمى "العارضة الفاصلة". قال الحارس مبتسماً: "أهلاً بكم! في هذه القلعة تسكن عائلة غريبة: أربعة أطفال نشيطون يسكنون الطابق السفلي، كل واحد منهم قوته واحد. وفوق الجسر تسكن الجدة الحنونة، قوتها خمسة كاملة". رفع ياسين إبهامه بحماس، فصعد طفل واحد من الأسفل ليلمس الجسر — فنطق المعداد: "واحد!". حينها أدرك الأبطال أن لكل حركة قصة، ولكل إصبع مهمة.',
    storyAudioText: 'في يوم مشمس، وقف ثلاثة أبطال صغار، ليلى وعمر وياسين، أمام بوابة خشبية ضخمة نُقش عليها: قلعة السوروبان، من يدخلها يصبح سيد الأرقام. دقّوا الجرس، فانفتح الباب بصوت دافئ، وظهر حارس القلعة: رجل خشبي اسمه الإطار، وعلى صدره جسر أفقي يُسمى العارضة الفاصلة. قال الحارس مبتسماً: أهلاً بكم، في هذه القلعة تسكن عائلة غريبة: أربعة أطفال نشيطون يسكنون الطابق السفلي، كل واحد منهم قوته واحد. وفوق الجسر تسكن الجدة الحنونة، قوتها خمسة كاملة. رفع ياسين إبهامه بحماس، فصعد طفل واحد من الأسفل ليلمس الجسر، فنطق المعداد: واحد. حينها أدرك الأبطال أن لكل حركة قصة، ولكل إصبع مهمة.',
    examples: [
      {
        problemText: 'مثّل 1 على المعداد',
        answer: 1,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'ارفع خرزة سفلية واحدة بالإبهام حتى تلمس العارضة', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 1 }
        ],
        explanation: 'طفل واحد صعد ليلعب مع الجسر = 1',
        story: 'كان طفل واحد جالساً في الأسفل، فرفع ياسين إبهامه فصعد الطفل ولامس الجسر السحري، فنطق المعداد: واحد!',
        storyAudioText: 'كان طفل واحد جالساً في الأسفل، فرفع ياسين إبهامه فصعد الطفل ولامس الجسر السحري، فنطق المعداد: واحد.'
      },
      {
        problemText: 'مثّل 2 على المعداد',
        answer: 2,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'ارفع خرزتين سفليتين بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 2 }
        ],
        explanation: 'طفلان صعدا = 2',
        story: 'استدعى ياسين صديقاً لطفل الساحة، فصعد الطفلان معاً حتى لمسا الجسر، فأصبح العدد اثنين!',
        storyAudioText: 'استدعى ياسين صديقاً لطفل الساحة، فصعد الطفلان معاً حتى لمسا الجسر، فأصبح العدد اثنين.'
      },
      {
        problemText: 'مثّل 5 على المعداد',
        answer: 5,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'أنزل الخرزة العلوية بالسبابة حتى تلمس العارضة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 }
        ],
        explanation: 'الجدة نزلت من طابقتها = 5',
        story: 'سمعت الجدة صوت ضحكات الأطفال، فأنزلت السبابة جسرها الصغير، فهبطت الجدة لتلعب معهم، فأضافت خمس نقاط قوة دفعة واحدة!',
        storyAudioText: 'سمعت الجدة صوت ضحكات الأطفال، فأنزلت السبابة جسرها الصغير، فهبطت الجدة لتلعب معهم، فأضافت خمس نقاط قوة دفعة واحدة.'
      },
      {
        problemText: 'مثّل 6 على المعداد',
        answer: 6,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'أنزل الجدة 5 بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
          { stepIndex: 2, instructionText: 'ارفع خرزة واحدة بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 6 }
        ],
        explanation: '5 + 1 = 6 (الجدة + طفل)',
        story: 'الجدة 5 نزلت لترى الأطفال، واصطحبت معها طفلاً واحداً فقط، فصار المجموع 5 + 1 = ستة!',
        storyAudioText: 'الجدة خمسة نزلت لترى الأطفال، واصطحبت معها طفلاً واحداً فقط، فصار المجموع خمسة زائد واحد يساوي ستة.'
      },
      {
        problemText: 'مثّل 9 على المعداد',
        answer: 9,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'أنزل الجدة 5 بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
          { stepIndex: 2, instructionText: 'ارفع الأربعة أطفال كلهم بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 9 }
        ],
        explanation: '5 + 4 = 9 (الجدة + كل الأطفال)',
        story: 'نزلت الجدة 5 وصفّقت بيديها، فصعد الأربعة أطفال كلهم للمشاركة في الحفلة، فصار المجموع 5 + 4 = تسعة!',
        storyAudioText: 'نزلت الجدة خمسة وصفّقت بيديها، فصعد الأربعة أطفال كلهم للمشاركة في الحفلة، فصار المجموع خمسة زائد أربعة يساوي تسعة.'
      },
      {
        problemText: 'أعد المعداد إلى الصفر',
        answer: 0,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'أنزل جميع الخرزات السفلية بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 0 },
          { stepIndex: 2, instructionText: 'ارفع الجدة 5 بالسبابة أيضاً', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 0 }
        ],
        explanation: 'كل الخرزات بعيدة عن الجسر = 0',
        story: 'عندما يحين وقت النوم، تعود الجدة إلى طابقتها، وينزل الأطفال إلى أسرّتهم، فيهدأ المعداد ويعود إلى الصفر.',
        storyAudioText: 'عندما يحين وقت النوم، تعود الجدة إلى طابقتها، وينزل الأطفال إلى أسرّتهم، فيهدأ المعداد ويعود إلى الصفر.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 3: الجمع والطرح المباشر (آحاد وعشرات)
  // ═══════════════════════════════════════════════════════════
  {
    id: 3,
    title: 'Direct Addition and Subtraction',
    titleAr: 'الجمع والطرح المباشر',
    description: 'Move beads directly without any rules',
    descriptionAr: 'حرّك الخرزات مباشرة دون قواعد',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 8,
    concept: 'Direct ops: no friends needed, just move beads',
    conceptAr: 'العمليات المباشرة: بلا حاجة لقواعد، فقط حرّك الخرزات',
    icon: 'Plus',
    audioText: 'الآن نتعلم الجمع والطرح المباشر. عندما تكون الخرزات كافية، نرفع بالإبهام عند الجمع، وننزل بالسبابة عند الطرح. لا حاجة لأي قاعدة!',
    rule: 'Add = raise with thumb; Subtract = lower with index',
    ruleAr: 'الجمع = رفع بالإبهام، الطرح = إنزال بالسبابة',
    story: 'صعود وهبوط الأصدقاء: في ساحة المعداد، رفع الإبهام طفلين، ثم طفلاً ثالثاً، فصاروا ثلاثة. جاءت الريح فأنزلت السبابة طفلاً، فبقوا اثنين. هكذا نلعب مع الأرقام مباشرة دون قواعد!',
    storyAudioText: 'صعود وهبوط الأصدقاء: في ساحة المعداد، رفع الإبهام طفلين، ثم طفلاً ثالثاً، فصاروا ثلاثة. جاءت الريح فأنزلت السبابة طفلاً، فبقوا اثنين. هكذا نلعب مع الأرقام مباشرة دون قواعد.',
    examples: [
      {
        problemText: '1 + 2 = ؟',
        answer: 3,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'ارفع خرزة واحدة بالإبهام (1)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 1 },
          { stepIndex: 2, instructionText: 'ارفع خرزتين أخريين (2)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [2, 3], expectedValueAfter: 3 }
        ],
        explanation: '1 + 2 = 3',
        story: 'طفل واحد في الساحة، فصعد طفلان آخران ليلعبا معه، فصاروا ثلاثة.',
        storyAudioText: 'طفل واحد في الساحة، فصعد طفلان آخران ليلعبا معه، فصاروا ثلاثة.'
      },
      {
        problemText: '2 + 2 + 5 - 1 = ؟',
        answer: 8,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'ارفع خرزتين (2)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 2 },
          { stepIndex: 2, instructionText: 'ارفع خرزتين أخريين (2)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [3, 4], expectedValueAfter: 4 },
          { stepIndex: 3, instructionText: 'أنزل الجدة 5 بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 9 },
          { stepIndex: 4, instructionText: 'أنزل خرزة واحدة بالسبابة (-1)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 8 }
        ],
        explanation: '2 + 2 + 5 - 1 = 8',
        story: 'كان يلعب طفلان نشيطان في الساحة، ثم رفعنا طفلين آخرين بالإبهام فأصبحوا أربعة. أطلت الجدة 5 من نافذتها العلوية وهبطت بالسبابة لتلعب معهم، فأصبح المجموع تسعة. وفي النهاية ذهب طفل واحد لينام في الأسفل وبقي ثمانية أطفال يلعبون.',
        storyAudioText: 'كان يلعب طفلان نشيطان في الساحة، ثم رفعنا طفلين آخرين بالإبهام فأصبحوا أربعة. أطلت الجدة خمسة من نافذتها العلوية وهبطت بالسبابة لتلعب معهم، فأصبح المجموع تسعة. وفي النهاية ذهب طفل واحد لينام في الأسفل وبقي ثمانية أطفال يلعبون.'
      },
      {
        problemText: '12 + 21 = ؟',
        answer: 33,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 12: ارفع 1 عشرات و2 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 12 },
          { stepIndex: 2, instructionText: 'أضف 21: ارفع 2 عشرات و1 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [2, 3], expectedValueAfter: 33 }
        ],
        explanation: '12 + 21 = 33 (عشرات + عشرات، آحاد + آحاد)',
        story: 'في بيت العشرات والآحاد، دخلت خرزة عشرات واحدة وخرزتان في الآحاد، فصار 12. ثم دخلت خرزتان في العشرات وخرزة في الآحاد، فصار 33.',
        storyAudioText: 'في بيت العشرات والآحاد، دخلت خرزة عشرات واحدة وخرزتان في الآحاد، فصار اثني عشر. ثم دخلت خرزتان في العشرات وخرزة في الآحاد، فصار ثلاثة وثلاثين.'
      },
      {
        problemText: '9 - 5 = ؟',
        answer: 4,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 9: الجدة 5 + 4 أطفال', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 9 },
          { stepIndex: 2, instructionText: 'ارفع الجدة 5 بالسبابة (-5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 4 }
        ],
        explanation: '9 - 5 = 4',
        story: 'كان لدينا الجدة 5 وأربعة أطفال، فصعدت الجدة لتستريح، فبقي أربعة أطفال فقط.',
        storyAudioText: 'كان لدينا الجدة خمسة وأربعة أطفال، فصعدت الجدة لتستريح، فبقي أربعة أطفال فقط.'
      },
      {
        problemText: '1 + 3 - 2 + 5 = ؟',
        answer: 7,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'ارفع خرزة (1)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 1 },
          { stepIndex: 2, instructionText: 'ارفع 3 خرزات (+3)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [2, 3, 4], expectedValueAfter: 4 },
          { stepIndex: 3, instructionText: 'أنزل خرزتين (-2)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [3, 4], expectedValueAfter: 2 },
          { stepIndex: 4, instructionText: 'أنزل الجدة 5 بالسبابة (+5)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 7 }
        ],
        explanation: '1 + 3 - 2 + 5 = 7',
        story: 'بدأ طفل واحد باللعب، ثم رفعنا ثلاثة أطفال إضافيين ليكونوا فريقاً من أربعة. ابتعد طفلان للراحة فنزل خرزتان للأسفل وبقي طفلان. ثم هبطت الجدة 5 لتنضم للطفلين الباقيين فأصبح المجموع سبعة.',
        storyAudioText: 'بدأ طفل واحد باللعب، ثم رفعنا ثلاثة أطفال إضافيين ليكونوا فريقاً من أربعة. ابتعد طفلان للراحة فنزل خرزتان للأسفل وبقي طفلان. ثم هبطت الجدة خمسة لتنضم للطفلين الباقيين فأصبح المجموع سبعة.'
      },
      {
        problemText: '12 + 21 + 55 - 13 = ؟',
        answer: 75,
        ruleCategory: 'direct',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 12', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 12 },
          { stepIndex: 2, instructionText: 'أضف 21 = 33', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [2, 3], expectedValueAfter: 33 },
          { stepIndex: 3, instructionText: 'أضف 55 (5 عشرات + 5 آحاد)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5], expectedValueAfter: 88 },
          { stepIndex: 4, instructionText: 'اطرح 13 (1 عشرات + 3 آحاد)', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 75 }
        ],
        explanation: '12 + 21 + 55 - 13 = 75',
        story: 'دخلت خرزة عشرات وخرزتا آحاد (12)، ثم خرزتا عشرات وخرزة آحاد (21) فصار 33. نزلت الجدة في العشرات والآحاد معاً (55) فصار 88. وأخيراً خرجت خرزة عشرات وثلاث خرزات آحاد (13) فتبقى 75.',
        storyAudioText: 'دخلت خرزة عشرات وخرزتا آحاد، فصار اثني عشر. ثم خرزتا عشرات وخرزة آحاد، فصار ثلاثة وثلاثين. نزلت الجدة في العشرات والآحاد معاً، فصار ثمانية وثمانين. وأخيراً خرجت خرزة عشرات وثلاث خرزات آحاد، فتبقى خمسة وسبعين.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 4: الجدة 5 (المكملات الصغرى)
  // ═══════════════════════════════════════════════════════════
  {
    id: 4,
    title: 'Grandma 5 (Small Complements)',
    titleAr: 'الجدة 5 (المكملات الصغرى)',
    description: 'Use upper bead when lower beads are full',
    descriptionAr: 'استعن بالجدة 5 عندما تمتلئ خرزات الأسفل',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 9,
    concept: 'Small Friends of 5: N + (5-N) = 5',
    conceptAr: 'أصدقاء 5: N + (5 - N) = 5',
    icon: 'Combine',
    audioText: 'الآن نتعلم أصدقاء الجدة 5. عندما تمتلئ خرزات الأسفل، نستعين بالجدة 5، لكن بشرط: يجب أن يخرج صديق الرقم الذي نريد إضافته. صديق 4 هو 1، وصديق 3 هو 2، وهكذا.',
    rule: 'Add N = +5 - (5-N); Subtract N = -5 + (5-N)',
    ruleAr: 'لجمع N: أضف 5 واطرح صديقه (5-N)؛ للطرح: اطرح 5 وأضف صديقه',
    ruleTable: [
      { formula: '+1', result: '+5 - 4' },
      { formula: '+2', result: '+5 - 3' },
      { formula: '+3', result: '+5 - 2' },
      { formula: '+4', result: '+5 - 1' },
      { formula: '-1', result: '-5 + 4' },
      { formula: '-2', result: '-5 + 3' },
      { formula: '-3', result: '-5 + 2' },
      { formula: '-4', result: '-5 + 1' },
    ],
    story: 'وصل الأبطال إلى غرفة الجدة 5. أرادوا إضافة 4، لكن خرزات الأسفل الأربعة كانت مشغولة! ظهرت الجدة 5 وقالت: "لا تقلقوا! أنا أستطيع مساعدتكم، لكن لي شرط: إذا دخلت أنا (+5)، يجب أن يخرج صديق الرقم الذي تريدونه!". سأل الأبطال: "من هم الأصدقاء؟"، أجابت الجدة: صديق 4 هو 1، صديق 3 هو 2، صديق 2 هو 3، صديق 1 هو 4.',
    storyAudioText: 'وصل الأبطال إلى غرفة الجدة خمسة. أرادوا إضافة أربعة، لكن خرزات الأسفل الأربعة كانت مشغولة. ظهرت الجدة خمسة وقالت: لا تقلقوا، أنا أستطيع مساعدتكم، لكن لي شرط: إذا دخلت أنا، يجب أن يخرج صديق الرقم الذي تريدونه. سأل الأبطال: من هم الأصدقاء. أجابت الجدة: صديق الأربعة هو الواحد، وصديق الثلاثة هو الاثنان، وصديق الاثنين هو الثلاثة، وصديق الواحد هو الأربعة.',
    examples: [
      {
        problemText: '4 + 4 = ؟',
        answer: 8,
        ruleCategory: 'small_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 4: ارفع 4 خرزات بالإبهام', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 4 },
          { stepIndex: 2, instructionText: 'نريد إضافة 4، لكن لا مكان. أنزل الجدة 5 بالسبابة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 9 },
          { stepIndex: 3, instructionText: 'أنزل خرزة واحدة (اطرح صديق 4 = 1)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 8 }
        ],
        explanation: '4 + 4 = 8 (القاعدة: +4 = +5 - 1)',
        story: 'يقف 4 أطفال في الآحاد ونريد إضافة 4 آخرين، لكن خرزات الأسفل كلها مشغولة! استغاث الأطفال بالجدة 5 فنزلت للمساعدة (+5)، وبحسب شرط الجدة يجب أن ينزل صديق الرقم 4 وهو الطفل 1 (-1). فأصبحت النتيجة 8.',
        storyAudioText: 'يقف أربعة أطفال في الآحاد ونريد إضافة أربعة آخرين، لكن خرزات الأسفل كلها مشغولة. استغاث الأطفال بالجدة خمسة فنزلت للمساعدة، وبحسب شرط الجدة يجب أن ينزل صديق الرقم أربعة وهو الطفل واحد. فأصبحت النتيجة ثمانية.'
      },
      {
        problemText: '3 + 3 = ؟',
        answer: 6,
        ruleCategory: 'small_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 3: ارفع 3 خرزات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 3 },
          { stepIndex: 2, instructionText: 'أنزل الجدة 5 بالسبابة (+5)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 8 },
          { stepIndex: 3, instructionText: 'أنزل خرزتين (صديق 3 = 2)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 6 }
        ],
        explanation: '3 + 3 = 6 (القاعدة: +3 = +5 - 2)',
        story: 'لدينا 3 أطفال ونريد إضافة 3 آخرين والأسفل مكتظ. تهبط الجدة 5 للمساعدة (+5)، وتطلب مغادرة صديق الرقم 3 وهو الطفلان 2 (-2). فأصبحت النتيجة 6.',
        storyAudioText: 'لدينا ثلاثة أطفال ونريد إضافة ثلاثة آخرين والأسفل مكتظ. تهبط الجدة خمسة للمساعدة، وتطلب مغادرة صديق الرقم ثلاثة وهو الطفلان اثنان. فأصبحت النتيجة ستة.'
      },
      {
        problemText: '4 + 3 = ؟',
        answer: 7,
        ruleCategory: 'small_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 4', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 4 },
          { stepIndex: 2, instructionText: 'أنزل الجدة 5 (+5)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 9 },
          { stepIndex: 3, instructionText: 'أنزل خرزتين (صديق 3 = 2)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 7 }
        ],
        explanation: '4 + 3 = 7 (القاعدة: +3 = +5 - 2)',
        story: 'أربعة أطفال في الساحة، وأراد ثلاثة آخرون اللعب معهم. لكن الساحة ممتلئة! جاءت الجدة 5 (+5)، وطلبت خروج صديق الرقم 3 وهو الطفلان 2 (-2). فصار المجموع 7.',
        storyAudioText: 'أربعة أطفال في الساحة، وأراد ثلاثة آخرون اللعب معهم. لكن الساحة ممتلئة. جاءت الجدة خمسة، وطلبت خروج صديق الرقم ثلاثة وهو الطفلان اثنان. فصار المجموع سبعة.'
      },
      {
        problemText: '5 - 4 = ؟',
        answer: 1,
        ruleCategory: 'small_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 5: أنزل الجدة 5', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
          { stepIndex: 2, instructionText: 'ارفع الجدة 5 بالسبابة (-5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 0 },
          { stepIndex: 3, instructionText: 'ارفع خرزة واحدة (صديق 4 = 1)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 1 }
        ],
        explanation: '5 - 4 = 1 (القاعدة: -4 = -5 + 1)',
        story: 'تجلس الجدة 5 وحدها على العارضة، ونريد طرح 4 ولا يوجد أطفال في الأسفل. تصعد الجدة للأعلى وتغادر (-5)، وتُرسل بدلاً منها صديق الـ 4 وهو الطفل 1 ليلعب في الأسفل (+1).',
        storyAudioText: 'تجلس الجدة خمسة وحدها على العارضة، ونريد طرح أربعة ولا يوجد أطفال في الأسفل. تصعد الجدة للأعلى وتغادر، وتُرسل بدلاً منها صديق الأربعة وهو الطفل واحد ليلعب في الأسفل.'
      },
      {
        problemText: '7 - 4 = ؟',
        answer: 3,
        ruleCategory: 'small_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 7: أنزل 5 وارفع 2 - القبض', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 },
          { stepIndex: 2, instructionText: 'ارفع الجدة 5 بالسبابة (-5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 2 },
          { stepIndex: 3, instructionText: 'ارفع خرزة واحدة (صديق 4 = 1)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 3 }
        ],
        explanation: '7 - 4 = 3 (القاعدة: -4 = -5 + 1)',
        story: 'لدينا الجدة 5 وطفلان في الأسفل (7). نريد طرح 4، فتصعد الجدة 5 وتستريح (-5)، ويصعد صديق الـ 4 وهو الطفل 1 لينضم للطفلين الباقيين (+1) فيصبح لدينا 3 أطفال.',
        storyAudioText: 'لدينا الجدة خمسة وطفلان في الأسفل، فيصبح المجموع سبعة. نريد طرح أربعة، فتصعد الجدة خمسة وتستريح، ويصعد صديق الأربعة وهو الطفل واحد لينضم للطفلين الباقيين، فيصبح لدينا ثلاثة أطفال.'
      },
      {
        problemText: '3 + 4 - 2 = ؟',
        answer: 5,
        ruleCategory: 'small_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 3 },
          { stepIndex: 2, instructionText: 'أضف 4: أنزل الجدة 5 وأنزل 1 (صديق 4)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 7 },
          { stepIndex: 3, instructionText: 'اطرح 2: أنزل خرزتين', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 5 }
        ],
        explanation: '3 + 4 - 2 = 5',
        story: 'ثلاثة أطفال، أضفنا 4 (نزلت الجدة 5 وخرج طفل 1)، فأصبح 7. ثم طرحنا 2 بنزول خرزتين، فبقي 5.',
        storyAudioText: 'ثلاثة أطفال، أضفنا أربعة فنزلت الجدة خمسة وخرج طفل واحد، فأصبح سبعة. ثم طرحنا اثنين بنزول خرزتين، فبقي خمسة.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 5: عملاق 10 (المكملات الكبرى)
  // ═══════════════════════════════════════════════════════════
  {
    id: 5,
    title: 'Giant 10 (Big Complements)',
    titleAr: 'عملاق 10 (المكملات الكبرى)',
    description: 'Call the Giant when units column is full',
    descriptionAr: 'استعن بالعملاق 10 عندما يمتلئ عمود الآحاد',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 13,
    concept: 'Big Friends of 10: N + (10-N) = 10',
    conceptAr: 'أصدقاء 10: N + (10 - N) = 10',
    icon: 'Sigma',
    audioText: 'الآن نتعلم أصدقاء العملاق 10. عندما يمتلئ عمود الآحاد، نستدعي العملاق من عمود العشرات ونرفع خرزة، ثم نطرح صديق الرقم من الآحاد.',
    rule: 'Add N = +10 - (10-N); Subtract N = -10 + (10-N)',
    ruleAr: 'لجمع N: أضف 10 واطرح صديقه؛ للطرح: اطرح 10 وأضف صديقه',
    ruleTable: [
      { formula: '+1', result: '+10 - 9' },
      { formula: '+2', result: '+10 - 8' },
      { formula: '+3', result: '+10 - 7' },
      { formula: '+4', result: '+10 - 6' },
      { formula: '+5', result: '+10 - 5' },
      { formula: '+6', result: '+10 - 4' },
      { formula: '+7', result: '+10 - 3' },
      { formula: '+8', result: '+10 - 2' },
      { formula: '+9', result: '+10 - 1' },
      { formula: '-1', result: '-10 + 9' },
      { formula: '-2', result: '-10 + 8' },
      { formula: '-3', result: '-10 + 7' },
      { formula: '-4', result: '-10 + 6' },
      { formula: '-5', result: '-10 + 5' },
      { formula: '-6', result: '-10 + 4' },
      { formula: '-7', result: '-10 + 3' },
      { formula: '-8', result: '-10 + 2' },
      { formula: '-9', result: '-10 + 1' },
    ],
    story: 'عندما كَبُرت الأرقام وأصبحت المسائل أعمق، لم تعد قوة الجدة 5 تكفي وحدها! فجأة، اهتزت القلعة وظهر "عملاق العشرات 10" في العمود الثاني على اليسار. قال العملاق: "أنا أتدخل عندما يكتظ عمود الآحاد! إذا أردتم إضافة أي رقم من 1 إلى 9 ولم تجدوا مكاناً، نادوا عليّ (+10)، وسأطرح لكم المكمل للعدد الذي سأساعده من الآحاد!".',
    storyAudioText: 'عندما كبرت الأرقام وأصبحت المسائل أعمق، لم تعد قوة الجدة خمسة تكفي وحدها. فجأة، اهتزت القلعة وظهر عملاق العشرات عشرة في العمود الثاني على اليسار. قال العملاق: أنا أتدخل عندما يكتظ عمود الآحاد. إذا أردتم إضافة أي رقم من واحد إلى تسعة ولم تجدوا مكاناً، نادوا عليّ عشرة، وسأطرح لكم المكمل للعدد الذي سأساعده من الآحاد.',
    examples: [
      {
        problemText: '9 + 9 = ؟',
        answer: 18,
        ruleCategory: 'big_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 9: الجدة 5 + 4 أطفال', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 9 },
          { stepIndex: 2, instructionText: 'ارفع خرزة عشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 19 },
          { stepIndex: 3, instructionText: 'أنزل خرزة واحدة (اطرح صديق 9 = 1)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 18 }
        ],
        explanation: '9 + 9 = 18 (القاعدة: +9 = +10 - 1)',
        story: 'يمتلئ عمود الآحاد بالكامل بالعدد 9 ونريد إضافة 9 أخرى. لا توجد أي خرزة شاغرة! ننادي العملاق 10 في عمود العشرات فيدخل بخرزة واحدة (+10)، ويطرح صديق الرقم 9 وهو الطفل 1 من عمود الآحاد (-1). فأصبحت النتيجة 18.',
        storyAudioText: 'يمتلئ عمود الآحاد بالكامل بالعدد تسعة ونريد إضافة تسعة أخرى. لا توجد أي خرزة شاغرة. ننادي العملاق عشرة في عمود العشرات فيدخل بخرزة واحدة، ويطرح صديق الرقم تسعة وهو الطفل واحد من عمود الآحاد. فأصبحت النتيجة ثمانية عشر.'
      },
      {
        problemText: '8 + 7 = ؟',
        answer: 15,
        ruleCategory: 'big_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 8: الجدة 5 + 3', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 8 },
          { stepIndex: 2, instructionText: 'ارفع خرزة عشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 18 },
          { stepIndex: 3, instructionText: 'أنزل 3 (صديق 7 = 3)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 15 }
        ],
        explanation: '8 + 7 = 15 (القاعدة: +7 = +10 - 3)',
        story: 'لدينا العدد 8 ونريد إضافة 7. ينزل العملاق 10 في العشرات (+10)، ونخصم صديق الرقم 7 وهو الأطفال 3 من الآحاد (-3). فأصبحت النتيجة 15.',
        storyAudioText: 'لدينا العدد ثمانية ونريد إضافة سبعة. ينزل العملاق عشرة في العشرات، ونخصم صديق الرقم سبعة وهو الأطفال ثلاثة من الآحاد. فأصبحت النتيجة خمسة عشر.'
      },
      {
        problemText: '6 + 6 = ؟',
        answer: 12,
        ruleCategory: 'big_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 6: الجدة 5 + 1', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 6 },
          { stepIndex: 2, instructionText: 'ارفع خرزة عشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 16 },
          { stepIndex: 3, instructionText: 'أنزل 4 (صديق 6 = 4)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 12 }
        ],
        explanation: '6 + 6 = 12 (القاعدة: +6 = +10 - 4)',
        story: 'ستة أطفال في الساحة، وأراد ستة آخرون اللعب. لكن الساحة ضيقة! نادى الأبطال العملاق 10 (+10)، فخرج صديق الرقم 6 وهو 4 أطفال (-4)، فبقي 12.',
        storyAudioText: 'ستة أطفال في الساحة، وأراد ستة آخرون اللعب. لكن الساحة ضيقة. نادى الأبطال العملاق عشرة، فخرج صديق الرقم ستة وهو أربعة أطفال، فبقي اثنا عشر.'
      },
      {
        problemText: '11 - 9 = ؟',
        answer: 2,
        ruleCategory: 'big_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 11: 1 عشرات + 1 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 11 },
          { stepIndex: 2, instructionText: 'أنزل خرزة عشرات (-10)', fingerUsed: 'left_index', direction: 'down', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 1 },
          { stepIndex: 3, instructionText: 'ارفع خرزة واحدة (صديق 9 = 1)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 2 }
        ],
        explanation: '11 - 9 = 2 (القاعدة: -9 = -10 + 1)',
        story: 'لدينا 11 (خرزة 10 في العشرات وخرزة 1 في الآحاد). نريد طرح 9 من الآحاد ولا يكفي، فيغادر العملاق 10 من العشرات (-10)، ويُرسل صديق الـ 9 وهو الطفل 1 إلى الآحاد (+1) ليلعب مع الطفل الموجود.',
        storyAudioText: 'لدينا أحد عشر، خرزة عشرة في العشرات وخرزة واحد في الآحاد. نريد طرح تسعة من الآحاد ولا يكفي، فيغادر العملاق عشرة من العشرات، ويُرسل صديق التسعة وهو الطفل واحد إلى الآحاد ليلعب مع الطفل الموجود.'
      },
      {
        problemText: '15 - 8 = ؟',
        answer: 7,
        ruleCategory: 'big_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 15: 1 عشرات + 5 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 15 },
          { stepIndex: 2, instructionText: 'أنزل خرزة عشرات (-10)', fingerUsed: 'left_index', direction: 'down', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 5 },
          { stepIndex: 3, instructionText: 'ارفع خرزتين (صديق 8 = 2)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 7 }
        ],
        explanation: '15 - 8 = 7 (القاعدة: -8 = -10 + 2)',
        story: 'لدينا 15 (10 في العشرات والجدة 5 في الآحاد). نريد طرح 8، فيغادر العملاق 10 (-10)، ويدخل صديق الـ 8 وهو الرقم 2 إلى الآحاد (+2) لينضم للجدة 5 المتبقية فتصبح النتيجة 7.',
        storyAudioText: 'لدينا خمسة عشر، عشرة في العشرات والجدة خمسة في الآحاد. نريد طرح ثمانية، فيغادر العملاق عشرة، ويدخل صديق الثمانية وهو الرقم اثنان إلى الآحاد لينضم للجدة خمسة المتبقية فتصبح النتيجة سبعة.'
      },
      {
        problemText: '19 + 4 = ؟',
        answer: 23,
        ruleCategory: 'big_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 19: 1 عشرات + 9 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 19 },
          { stepIndex: 2, instructionText: 'ارفع عشرات أخرى (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [2], expectedValueAfter: 29 },
          { stepIndex: 3, instructionText: 'أنزل 6 (صديق 4 = 6)', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 23 }
        ],
        explanation: '19 + 4 = 23 (القاعدة: +4 = +10 - 6)',
        story: 'في العشرات خرزة واحدة، وفي الآحاد الجدة 5 وأربعة أطفال (19). أردنا إضافة 4، فاستدعينا العملاق (+10) وطرحنا صديق 4 وهو 6 (أنزلنا 5 ورفعنا 1). فصار 23.',
        storyAudioText: 'في العشرات خرزة واحدة، وفي الآحاد الجدة خمسة وأربعة أطفال. أردنا إضافة أربعة، فاستدعينا العملاق عشرة وطرحنا صديق أربعة وهو ستة، أنزلنا خمسة ورفعنا واحد. فصار ثلاثة وعشرين.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 6: الاندماج السحري (العمليات المركبة)
  // ═══════════════════════════════════════════════════════════
  {
    id: 6,
    title: 'Magic Merge (Combined Operations)',
    titleAr: 'الاندماج السحري (العمليات المركبة)',
    description: 'Merge Grandma 5 and Giant 10 together',
    descriptionAr: 'اجمع الجدة 5 والعملاق 10 معاً',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 14,
    concept: 'Combined: +10 - 5 + (N-5)',
    conceptAr: 'المركب: +10 - 5 + (N-5)',
    icon: 'Brain',
    audioText: 'في المسائل الصعبة، نستدعي العملاق 10 والجدة 5 معاً. لجمع 6: نضيف 10، نطرح 5، ثم نضيف 1. عملية واحدة بثلاث حركات سحرية!',
    rule: 'Add N (6-9): +10 - 5 + (N-5); Subtract N: -10 + 5 - (N-5)',
    ruleAr: 'لجمع N من 6 إلى 9: أضف 10، اطرح 5، أضف (N-5)',
    ruleTable: [
      { formula: '+6', result: '+10 - 5 + 1' },
      { formula: '+7', result: '+10 - 5 + 2' },
      { formula: '+8', result: '+10 - 5 + 3' },
      { formula: '+9', result: '+10 - 5 + 4' },
      { formula: '-6', result: '-10 + 5 - 1' },
      { formula: '-7', result: '-10 + 5 - 2' },
      { formula: '-8', result: '-10 + 5 - 3' },
      { formula: '-9', result: '-10 + 5 - 4' },
    ],
    story: 'وصل الأبطال إلى العرش المزدوج حيث تلتقي الجدة 5 مع العملاق 10. في بعض المسائل الصعبة، نحتاج للاتصال بالعملاق 10 والجدة 5 في نفس اللحظة! تتعاون الجدة مع العملاق لحل أكثر الألغاز تعقيداً بلمسة سحرية واحدة.',
    storyAudioText: 'وصل الأبطال إلى العرش المزدوج حيث تلتقي الجدة خمسة مع العملاق عشرة. في بعض المسائل الصعبة، نحتاج للاتصال بالعملاق عشرة والجدة خمسة في نفس اللحظة. تتعاون الجدة مع العملاق لحل أكثر الألغاز تعقيداً بلمسة سحرية واحدة.',
    examples: [
      {
        problemText: '5 + 6 = ؟',
        answer: 11,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 5: أنزل الجدة 5', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
          { stepIndex: 2, instructionText: 'ارفع خرزة عشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 15 },
          { stepIndex: 3, instructionText: 'ارفع الجدة 5 (-5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 10 },
          { stepIndex: 4, instructionText: 'ارفع خرزة واحدة (+1)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 11 }
        ],
        explanation: '5 + 6 = 11 (القاعدة: +6 = +10 - 5 + 1)',
        story: 'لدينا الجدة 5 نشيطة في الآحاد، ونريد إضافة 6. لا يمكن إضافة 6 مباشرة! هنا يتعاون العملاق والجدة: يأتي العملاق 10 (+10)، وتصعد الجدة 5 لتستريح (-5)، وينزل طفل واحد (+1). فأصبحت النتيجة 11.',
        storyAudioText: 'لدينا الجدة خمسة نشيطة في الآحاد، ونريد إضافة ستة. لا يمكن إضافة ستة مباشرة. هنا يتعاون العملاق والجدة: يأتي العملاق عشرة، وتصعد الجدة خمسة لتستريح، وينزل طفل واحد. فأصبحت النتيجة أحد عشر.'
      },
      {
        problemText: '6 + 7 = ؟',
        answer: 13,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 6: الجدة 5 + 1', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 6 },
          { stepIndex: 2, instructionText: 'ارفع خرزة عشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 16 },
          { stepIndex: 3, instructionText: 'ارفع الجدة 5 (-5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 11 },
          { stepIndex: 4, instructionText: 'ارفع خرزتين (+2)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 13 }
        ],
        explanation: '6 + 7 = 13 (القاعدة: +7 = +10 - 5 + 2)',
        story: 'لدينا 6 ونريد إضافة 7. يدخل العملاق 10 (+10)، وتغادر الجدة 5 (-5)، وينضم طفلان (+2). فأصبحت النتيجة 13.',
        storyAudioText: 'لدينا ستة ونريد إضافة سبعة. يدخل العملاق عشرة، وتغادر الجدة خمسة، وينضم طفلان. فأصبحت النتيجة ثلاثة عشر.'
      },
      {
        problemText: '7 + 8 = ؟',
        answer: 15,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 7', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 },
          { stepIndex: 2, instructionText: 'ارفع عشرات (+10)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 17 },
          { stepIndex: 3, instructionText: 'ارفع الجدة 5 (-5)', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 12 },
          { stepIndex: 4, instructionText: 'ارفع 3 (+3)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 15 }
        ],
        explanation: '7 + 8 = 15 (القاعدة: +8 = +10 - 5 + 3)',
        story: 'سبعة أطفال، أردنا إضافة 8. نادى الأبطال العملاق 10 (+10)، وأمروا الجدة 5 بالنزول (-5)، ثم صعد 3 أطفال (+3). النتيجة 15.',
        storyAudioText: 'سبعة أطفال، أردنا إضافة ثمانية. نادى الأبطال العملاق عشرة، وأمروا الجدة خمسة بالنزول، ثم صعد ثلاثة أطفال. النتيجة خمسة عشر.'
      },
      {
        problemText: '14 - 6 = ؟',
        answer: 8,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 14: 1 عشرات + 4 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 14 },
          { stepIndex: 2, instructionText: 'أنزل عشرات (-10)', fingerUsed: 'left_index', direction: 'down', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 4 },
          { stepIndex: 3, instructionText: 'أنزل الجدة 5 (+5)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 9 },
          { stepIndex: 4, instructionText: 'أنزل 1 (-1)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 8 }
        ],
        explanation: '14 - 6 = 8 (القاعدة: -6 = -10 + 5 - 1)',
        story: 'لدينا 14 ونريد طرح 6. يغادر العملاق 10 (-10)، وتنزل الجدة 5 للمساعدة (+5)، ويغادر طفل واحد (-1). فأصبحت النتيجة 8.',
        storyAudioText: 'لدينا أربعة عشر ونريد طرح ستة. يغادر العملاق عشرة، وتنزل الجدة خمسة للمساعدة، ويغادر طفل واحد. فأصبحت النتيجة ثمانية.'
      },
      {
        problemText: '13 - 7 = ؟',
        answer: 6,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 13', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 13 },
          { stepIndex: 2, instructionText: 'أنزل عشرات (-10)', fingerUsed: 'left_index', direction: 'down', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 3 },
          { stepIndex: 3, instructionText: 'أنزل الجدة 5 (+5)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 8 },
          { stepIndex: 4, instructionText: 'أنزل 2 (-2)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 6 }
        ],
        explanation: '13 - 7 = 6 (القاعدة: -7 = -10 + 5 - 2)',
        story: 'ثلاثة عشر في الساحة، أردنا طرح 7. ذهب العملاق (-10)، ثم نزلت الجدة (+5)، ثم خرج طفلان (-2). فبقي 6.',
        storyAudioText: 'ثلاثة عشر في الساحة، أردنا طرح سبعة. ذهب العملاق عشرة، ثم نزلت الجدة خمسة، ثم خرج طفلان. فبقي ستة.'
      },
      {
        problemText: '12 - 8 = ؟',
        answer: 4,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 12', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 12 },
          { stepIndex: 2, instructionText: 'أنزل عشرات (-10)', fingerUsed: 'left_index', direction: 'down', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 2 },
          { stepIndex: 3, instructionText: 'أنزل الجدة 5 (+5)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 7 },
          { stepIndex: 4, instructionText: 'أنزل 3 (-3)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 4 }
        ],
        explanation: '12 - 8 = 4 (القاعدة: -8 = -10 + 5 - 3)',
        story: 'اثنا عشر، أردنا طرح 8. خرج العملاق (-10)، نزلت الجدة (+5)، خرج ثلاثة (-3). فبقي 4.',
        storyAudioText: 'اثنا عشر، أردنا طرح ثمانية. خرج العملاق عشرة، نزلت الجدة خمسة، خرج ثلاثة. فبقي أربعة.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 7: تحدي السلاسل (٤ إلى ١٥ صفاً، ومنزلتان وثلاث)
  // ═══════════════════════════════════════════════════════════
  {
    id: 7,
    title: 'Chain Challenge (Long Sequences)',
    titleAr: 'تحدي السلاسل (سلاسل طويلة)',
    description: 'Solve long chains 4-15 rows, 2-3 columns',
    descriptionAr: 'حل سلاسل طويلة من 4 إلى 15 صفاً، بمنزلتين وثلاث',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 0,
    concept: 'Chains combine all rules: direct + friends',
    conceptAr: 'السلاسل تجمع كل القواعد: المباشر + الأصدقاء',
    icon: 'List',
    audioText: 'الآن نواجه التحدي الأكبر: سلاسل من 4 صفوف تصل إلى 15 صفاً متتالياً! نطبّق كل ما تعلمناه: المباشر والجدة 5 والعملاق 10 والمركب. كل سطر نُطبّق قاعدته المناسبة.',
    rule: 'Row by row: apply the matching rule',
    ruleAr: 'سطراً بسطر: طبّق القاعدة المناسبة لكل عملية',
    story: 'وصل الأبطال إلى ساحة التحديات الكبرى. على لوح خشبي كبير، صفّت الأرقام نفسها في عمود طويل. قال كبير الفرسان: "من يحل السلسلة كاملة دون خطأ يصبح فارساً!". تنفّس الأبطال بعمق، وبدأوا سطراً بسطر، كل رقم يطبق قاعدته.',
    storyAudioText: 'وصل الأبطال إلى ساحة التحديات الكبرى. على لوح خشبي كبير، صفّت الأرقام نفسها في عمود طويل. قال كبير الفرسان: من يحل السلسلة كاملة دون خطأ يصبح فارساً. تنفّس الأبطال بعمق، وبدأوا سطراً بسطر، كل رقم يطبق قاعدته.',
    examples: [
      {
        problemText: '5 - 4 + 7 + 8 = ؟',
        answer: 16,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 5: أنزل الجدة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
          { stepIndex: 2, instructionText: 'اطرح 4: ارفع 5 وارفع 1 (صديق 4)', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 1 },
          { stepIndex: 3, instructionText: 'أضف 7: أنزل 5 وارفع 2 (مباشر)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 8 },
          { stepIndex: 4, instructionText: 'أضف 8: ارفع عشرات (+10)، أنزل 2 (صديق 8)', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 18 },
          { stepIndex: 5, instructionText: 'أنزل 2 (أكمل صديق 8)', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 16 }
        ],
        explanation: '5 - 4 + 7 + 8 = 16',
        story: 'نبدأ بالجدة 5. نطرح 4: تصعد الجدة ويصعد الطفل 1 (الناتج 1). نضيف 7: تنزل الجدة وطفلان (الناتج 8). نضيف 8: يدخل العملاق 10 ويُخصم صديق 8 وهو 2 (الناتج 16).',
        storyAudioText: 'نبدأ بالجدة خمسة. نطرح أربعة، تصعد الجدة ويصعد الطفل واحد، الناتج واحد. نضيف سبعة، تنزل الجدة وطفلان، الناتج ثمانية. نضيف ثمانية، يدخل العملاق عشرة ويُخصم صديق ثمانية وهو اثنان، الناتج ستة عشر.'
      },
      {
        problemText: '3 + 60 - 12 + 66 = ؟',
        answer: 117,
        ruleCategory: 'big_friends',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 3 },
          { stepIndex: 2, instructionText: 'أضف 60: ارفع 5 و1 عشرات', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5, 1], expectedValueAfter: 63 },
          { stepIndex: 3, instructionText: 'اطرح 12: أنزل 1 عشرات و2 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 51 },
          { stepIndex: 4, instructionText: 'أضف 66: 5+1 عشرات، 5+1 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5, 1], expectedValueAfter: 117 }
        ],
        explanation: '3 + 60 - 12 + 66 = 117',
        story: 'ثلاثة أطفال، أضفنا 60 (الجدة 5 والعشرة في العشرات). طرحنا 12 (عشرة واثنين). أضفنا 66 (6 عشرات و6 آحاد). فصار 117.',
        storyAudioText: 'ثلاثة أطفال، أضفنا ستين، الجدة خمسة والعشرة في العشرات. طرحنا اثني عشر، عشرة واثنين. أضفنا ستة وستين، ست عشرات وست آحاد. فصار مئة وسبعة عشر.'
      },
      {
        problemText: '37 + 49 - 24 + 7 = ؟',
        answer: 69,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 37: 3 عشرات + 7 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 37 },
          { stepIndex: 2, instructionText: 'أضف 49: 4 عشرات (5-1) + 9 آحاد (+10-1)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5, 1], expectedValueAfter: 86 },
          { stepIndex: 3, instructionText: 'اطرح 24: 2 عشرات + 4 آحاد', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 62 },
          { stepIndex: 4, instructionText: 'أضف 7: +10 - 5 + 2 (مركب)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 5, 1, 2], expectedValueAfter: 69 }
        ],
        explanation: '37 + 49 - 24 + 7 = 69',
        story: 'نمثل 37 (3 عشرات و7 آحاد). نضيف 49: في العشرات نضيف 4 باستخدام الجدة، وفي الآحاد نضيف 9 باستخدام العملاق 10. الناتج 86. نطرح 24: نطرح خرزتين من العشرات و4 من الآحاد. الناتج 62. نضيف 7: قاعدة مركبة. الناتج 69.',
        storyAudioText: 'نمثل سبعة وثلاثين، ثلاث عشرات وسبع آحاد. نضيف تسعة وأربعين: في العشرات نضيف أربعة باستخدام الجدة، وفي الآحاد نضيف تسعة باستخدام العملاق عشرة. الناتج ستة وثمانين. نطرح أربعة وعشرين: نطرح خرزتين من العشرات وأربعاً من الآحاد. الناتج اثنان وستين. نضيف سبعة: قاعدة مركبة. الناتج تسعة وستين.'
      },
      {
        problemText: '5 + 3 + 2 + 8 = ؟',
        answer: 18,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 5: أنزل الجدة', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
          { stepIndex: 2, instructionText: 'أضف 3: ارفع 3 (مباشر)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 8 },
          { stepIndex: 3, instructionText: 'أضف 2: ارفع 1 + عشرات (+10 - 8)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 1], expectedValueAfter: 10 },
          { stepIndex: 4, instructionText: 'أضف 8: +10 - 2', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 18 }
        ],
        explanation: '5 + 3 + 2 + 8 = 18',
        story: 'الجدة 5 + 3 = 8. أضف 2: لاحظ أن الآحاد ممتلئة، لذا نستخدم +10 - 8. أضف 8: +10 - 2 = 18.',
        storyAudioText: 'الجدة خمسة زائد ثلاثة يساوي ثمانية. أضف اثنين: لاحظ أن الآحاد ممتلئة، لذا نستخدم زائد عشرة ناقص ثمانية. أضف ثمانية: زائد عشرة ناقص اثنين، الناتج ثمانية عشر.'
      },
      {
        problemText: '9 + 6 - 5 + 9 - 8 - 8 + 6 + 1 + 8 - 3 = ؟',
        answer: 15,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 9', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 9 },
          { stepIndex: 2, instructionText: 'أضف 6: +10 - 4 = 15', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 5, 1], expectedValueAfter: 15 },
          { stepIndex: 3, instructionText: 'اطرح 5: ارفع الجدة = 10', fingerUsed: 'index', direction: 'up', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 10 },
          { stepIndex: 4, instructionText: 'أضف 9: +10 - 1 = 19', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 1], expectedValueAfter: 19 },
          { stepIndex: 5, instructionText: 'اطرح 8: -10 + 2 = 11', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 11 },
          { stepIndex: 6, instructionText: 'اطرح 8: -10 + 2 = 3', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 3 },
          { stepIndex: 7, instructionText: 'أضف 6: +10 - 4 = 9', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 5, 1], expectedValueAfter: 9 },
          { stepIndex: 8, instructionText: 'أضف 1: مباشر = 10', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 10 },
          { stepIndex: 9, instructionText: 'أضف 8: +10 - 2 = 18', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 18 },
          { stepIndex: 10, instructionText: 'اطرح 3: مباشر = 15', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 15 }
        ],
        explanation: '9 + 6 - 5 + 9 - 8 - 8 + 6 + 1 + 8 - 3 = 15',
        story: 'سلسلة طويلة من 10 صفوف. نطبّق قاعدة كل عملية بالترتيب، والنتيجة النهائية 15.',
        storyAudioText: 'سلسلة طويلة من عشرة صفوف. نطبق قاعدة كل عملية بالترتيب، والنتيجة النهائية خمسة عشر.'
      },
      {
        problemText: '8 + 3 + 1 + 8 + 9 + 8 - 3 + 6 - 4 + 1 = ؟',
        answer: 37,
        ruleCategory: 'combined',
        steps: [
          { stepIndex: 1, instructionText: 'مثّل 8', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 8 },
          { stepIndex: 2, instructionText: 'أضف 3: مباشر = 11', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 11 },
          { stepIndex: 3, instructionText: 'أضف 1: مباشر = 12', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [4], expectedValueAfter: 12 },
          { stepIndex: 4, instructionText: 'أضف 8: +10 - 2 = 20', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 20 },
          { stepIndex: 5, instructionText: 'أضف 9: +10 - 1 = 29', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 1], expectedValueAfter: 29 },
          { stepIndex: 6, instructionText: 'أضف 8: +10 - 2 = 37', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 37 },
          { stepIndex: 7, instructionText: 'اطرح 3: -10 + 7 = 34', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 5, 1, 2], expectedValueAfter: 34 },
          { stepIndex: 8, instructionText: 'أضف 6: +10 - 4 = 40', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1, 5, 1], expectedValueAfter: 40 },
          { stepIndex: 9, instructionText: 'اطرح 4: -10 + 6 = 36', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 5, 1], expectedValueAfter: 36 },
          { stepIndex: 10, instructionText: 'أضف 1: مباشر = 37', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1], expectedValueAfter: 37 }
        ],
        explanation: '8 + 3 + 1 + 8 + 9 + 8 - 3 + 6 - 4 + 1 = 37',
        story: 'سلسلة طويلة من 10 صفوف. النتيجة النهائية 37.',
        storyAudioText: 'سلسلة طويلة من عشرة صفوف. النتيجة النهائية سبعة وثلاثين.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 8: الأنزان (الحساب الذهني التخيلي)
  // ═══════════════════════════════════════════════════════════
  {
    id: 8,
    title: 'Anzan (Mental Visualization)',
    titleAr: 'الأنزان (الحساب الذهني التخيلي)',
    description: 'Imagine the abacus and calculate mentally',
    descriptionAr: 'تخيّل المعداد واحسب ذهنياً',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 0,
    concept: 'Anzan: calculate without touching the abacus',
    conceptAr: 'الأنزان: احسب دون لمس المعداد',
    icon: 'Eye',
    audioText: 'الآن نتعلم الأنزان: أن تحسب بعقلك دون لمس المعداد. أغلق عينيك، تخيل المعداد يسبح في الهواء أمامك، وحرّك الخرزات المتخيلة بأصابعك في الهواء. هذه هي القوة الحقيقية للسوروبان!',
    rule: 'Visualize the beads, move fingers in the air',
    ruleAr: 'تخيل الخرزات، وحرّك أصابعك في الهواء',
    story: 'في المرحلة الأخيرة من الرحلة، توقف الأطفال عن لمس العداد الخشبي! يُغمضون أعينهم ويتخيلون العداد السحري يسبح في الهواء أمامهم، والجدة 5 والعملاق 10 يتحركان بمهارة. تحرك أصابعهم الهواء بسرعة البرق لحل سلاسل طويلة من الأرقام دون أخطاء، ليصبحوا رسمياً "فرسان السوروبان الأقوياء".',
    storyAudioText: 'في المرحلة الأخيرة من الرحلة، توقف الأطفال عن لمس العداد الخشبي. يغمضون أعينهم ويتخيلون العداد السحري يسبح في الهواء أمامهم، والجدة خمسة والعملاق عشرة يتحركان بمهارة. تحرك أصابعهم الهواء بسرعة البرق لحل سلاسل طويلة من الأرقام دون أخطاء، ليصبحوا رسمياً فرسان السوروبان الأقوياء.',
    examples: [
      {
        problemText: 'تخيّل: 2 + 3 = ؟',
        answer: 5,
        ruleCategory: 'anzan',
        steps: [
          { stepIndex: 1, instructionText: 'تخيّل رفع خرزتين', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 2 },
          { stepIndex: 2, instructionText: 'تخيّل رفع 3 خرزات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [3, 4, 5], expectedValueAfter: 5 }
        ],
        explanation: '2 + 3 = 5 (بالتخيل)',
        story: 'تخيل المعداد في الهواء. ارفع إبهامك المتخيل خرزتين، ثم ثلاثاً. كم صار؟ خمسة!',
        storyAudioText: 'تخيل المعداد في الهواء. ارفع إبهامك المتخيل خرزتين، ثم ثلاثاً. كم صار؟ خمسة.'
      },
      {
        problemText: 'تخيّل: 5 + 3 = ؟',
        answer: 8,
        ruleCategory: 'anzan',
        steps: [
          { stepIndex: 1, instructionText: 'تخيّل نزول الجدة 5', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 5 },
          { stepIndex: 2, instructionText: 'تخيّل رفع 3 سفليّة', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedValueAfter: 8 }
        ],
        explanation: '5 + 3 = 8 (بالتخيل)',
        story: 'أنزل الجدة في خيالك 5، ثم ارفع 3 أطفال. صار 8.',
        storyAudioText: 'أنزل الجدة في خيالك خمسة، ثم ارفع ثلاثة أطفال. صار ثمانية.'
      },
      {
        problemText: 'تخيّل: 4 + 3 = ؟',
        answer: 7,
        ruleCategory: 'anzan',
        steps: [
          { stepIndex: 1, instructionText: 'تخيّل 4', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 4 },
          { stepIndex: 2, instructionText: 'تخيّل الجدة 5 (اطرح 2)', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 7 }
        ],
        explanation: '4 + 3 = 7 (بالتخيل)',
        story: 'أربعة أطفال، ثم تنزل الجدة 5 ويخرج صديق 3 وهو 2. الباقي 7.',
        storyAudioText: 'أربعة أطفال، ثم تنزل الجدة خمسة ويخرج صديق ثلاثة وهو اثنان. الباقي سبعة.'
      },
      {
        problemText: 'تخيّل: 9 + 4 = ؟',
        answer: 13,
        ruleCategory: 'anzan',
        steps: [
          { stepIndex: 1, instructionText: 'تخيّل 9', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 9 },
          { stepIndex: 2, instructionText: 'تخيّل +10', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 19 },
          { stepIndex: 3, instructionText: 'تخيّل إزالة 6', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 13 }
        ],
        explanation: '9 + 4 = 13 (بالتخيل)',
        story: 'تخيل 9. أضف 10 في خيالك = 19. اطرح صديق 4 وهو 6 = 13.',
        storyAudioText: 'تخيل تسعة. أضف عشرة في خيالك يساوي تسعة عشر. اطرح صديق أربعة وهو ستة يساوي ثلاثة عشر.'
      },
      {
        problemText: 'تخيّل: 15 + 6 = ؟',
        answer: 21,
        ruleCategory: 'anzan',
        steps: [
          { stepIndex: 1, instructionText: 'تخيّل 15', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 15 },
          { stepIndex: 2, instructionText: 'تخيّل +10', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [2], expectedValueAfter: 25 },
          { stepIndex: 3, instructionText: 'تخيّل نزول 5 ورفع 1', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 21 }
        ],
        explanation: '15 + 6 = 21 (بالتخيل)',
        story: 'تخيل 15. أضف 10 = 25. اطرح 5 وارفع 1 = 21.',
        storyAudioText: 'تخيل خمسة عشر. أضف عشرة يساوي خمسة وعشرين. اطرح خمسة وارفع واحد يساوي واحداً وعشرين.'
      },
      {
        problemText: 'تخيّل: 8 + 8 = ؟',
        answer: 16,
        ruleCategory: 'anzan',
        steps: [
          { stepIndex: 1, instructionText: 'تخيّل 8', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 8 },
          { stepIndex: 2, instructionText: 'تخيّل +10', fingerUsed: 'left_index', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 18 },
          { stepIndex: 3, instructionText: 'تخيّل نزول 5 ورفع 3', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2], expectedValueAfter: 16 }
        ],
        explanation: '8 + 8 = 16 (بالتخيل)',
        story: 'تخيل 8. +10 = 18. اطرح صديق 8 وهو 2 = 16.',
        storyAudioText: 'تخيل ثمانية. زائد عشرة يساوي ثمانية عشر. اطرح صديق ثمانية وهو اثنان يساوي ستة عشر.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 9: أصدقاء العشرات (50)
  // ═══════════════════════════════════════════════════════════
  {
    id: 9,
    title: 'Tens Friends (50)',
    titleAr: 'أصدقاء العشرات (50)',
    description: 'Carry and borrow across tens',
    descriptionAr: 'الحمل والاستلاف بين العشرات والمئات',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 50,
    concept: 'Tens Friends = 50 - N×10',
    conceptAr: 'صديق 50: القاعدة 50 - N×10',
    icon: 'Sigma',
    audioText: 'الآن نتعلم أصدقاء العشرات. عندما لا تكفي العشرات، نطرق باب الجار في المئات ونرفع خرزة (+100)، ثم نسحب صديق الرقم.',
    rule: 'Add N×10 = add 50, subtract (50-N×10)',
    ruleAr: 'لجمع N×10: أضف 50، اطرح صديقه (50 - N×10)',
    ruleTable: [
      { formula: '+10', result: '+50 - 40' },
      { formula: '+20', result: '+50 - 30' },
      { formula: '+30', result: '+50 - 20' },
      { formula: '+40', result: '+50 - 10' },
      { formula: '-10', result: '-50 + 40' },
      { formula: '-20', result: '-50 + 30' },
      { formula: '-30', result: '-50 + 20' },
      { formula: '-40', result: '-50 + 10' },
    ],
    story: 'الجار في المئات: عندما لا تكفي العشرات، نذهب للجار في المئات ونرفع خرزة (+100)، ثم نسحب صديق الرقم.',
    storyAudioText: 'الجار في المئات: عندما لا تكفي العشرات، نذهب للجار في المئات ونرفع خرزة، ثم نسحب صديق الرقم.',
    examples: [
      { problemText: '20 + 40 = ؟', answer: 60, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 20: 2 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 20 },
        { stepIndex: 2, instructionText: 'ارفع 4 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [3, 4, 5, 6], expectedValueAfter: 60 }
      ], explanation: '20 + 40 = 60 (مباشر في العشرات)' },
      { problemText: '30 + 30 = ؟', answer: 60, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 30', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 30 },
        { stepIndex: 2, instructionText: 'ارفع 3 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [4, 5, 6], expectedValueAfter: 60 }
      ], explanation: '30 + 30 = 60' },
      { problemText: '40 + 40 = ؟', answer: 80, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 40', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 40 },
        { stepIndex: 2, instructionText: 'ارفع 4 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [5, 6, 7, 8], expectedValueAfter: 80 }
      ], explanation: '40 + 40 = 80' },
      { problemText: '20 + 40 - 50 = ؟', answer: 10, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 20', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 20 },
        { stepIndex: 2, instructionText: 'أضف 40 = 60', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [3, 4, 5, 6], expectedValueAfter: 60 },
        { stepIndex: 3, instructionText: 'أزل مئات (-100)', fingerUsed: 'left_index', direction: 'down', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: -40 },
        { stepIndex: 4, instructionText: 'ارفع 5 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4, 5], expectedValueAfter: 10 }
      ], explanation: '20 + 40 - 50 = 10 (القاعدة: -50 = -100 + 50)' },
      { problemText: '30 + 30 - 40 = ؟', answer: 20, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 30', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 30 },
        { stepIndex: 2, instructionText: 'أضف 30 = 60', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [4, 5, 6], expectedValueAfter: 60 },
        { stepIndex: 3, instructionText: 'أزل مئات (-100)', fingerUsed: 'left_index', direction: 'down', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: -40 },
        { stepIndex: 4, instructionText: 'ارفع 6 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4, 5, 6], expectedValueAfter: 20 }
      ], explanation: '30 + 30 - 40 = 20 (القاعدة: -40 = -100 + 60)' },
      { problemText: '10 + 40 - 20 = ؟', answer: 30, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 10', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 },
        { stepIndex: 2, instructionText: 'أضف 40 = 50', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [2, 3, 4, 5], expectedValueAfter: 50 },
        { stepIndex: 3, instructionText: 'أنزل 2 عشرات (-20)', fingerUsed: 'index', direction: 'down', targetColumn: 'tens', beadsAffected: [4, 5], expectedValueAfter: 30 }
      ], explanation: '10 + 40 - 20 = 30' },
      { problemText: '50 - 30 = ؟', answer: 20, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 50: أنزل الجدة 5 عشرات', fingerUsed: 'index', direction: 'down', targetColumn: 'tens', beadsAffected: [5], expectedValueAfter: 50 },
        { stepIndex: 2, instructionText: 'اطرح 30 (3 عشرات)', fingerUsed: 'index', direction: 'down', targetColumn: 'tens', beadsAffected: [3, 4, 5], expectedValueAfter: 20 }
      ], explanation: '50 - 30 = 20' },
      { problemText: '40 - 20 = ؟', answer: 20, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 40', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 40 },
        { stepIndex: 2, instructionText: 'اطرح 20', fingerUsed: 'index', direction: 'down', targetColumn: 'tens', beadsAffected: [3, 4], expectedValueAfter: 20 }
      ], explanation: '40 - 20 = 20' }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 10: أصدقاء المئات (100)
  // ═══════════════════════════════════════════════════════════
  {
    id: 10,
    title: 'Hundreds Friends (100)',
    titleAr: 'أصدقاء المئات (100)',
    description: 'Carry and borrow across hundreds',
    descriptionAr: 'الحمل والاستلاف بين المئات والآلاف',
    status: 'locked',
    beads: { upper: 1, lower: 4 },
    value: 100,
    concept: 'Hundreds Friends = 100 - N×10',
    conceptAr: 'صديق 100: القاعدة 100 - N×10',
    icon: 'Sigma',
    audioText: 'الآن نتعلم أصدقاء المئات. عندما لا تكفي المئات، نطرق باب الجار في الآلاف ونرفع خرزة (+1000)، ثم نسحب صديق الرقم.',
    rule: 'Add N×10 = add 100, subtract (100-N×10)',
    ruleAr: 'لجمع N×10: أضف 100، اطرح صديقه (100 - N×10)',
    ruleTable: [
      { formula: '+10', result: '+100 - 90' },
      { formula: '+20', result: '+100 - 80' },
      { formula: '+30', result: '+100 - 70' },
      { formula: '+40', result: '+100 - 60' },
      { formula: '+50', result: '+100 - 50' },
      { formula: '+60', result: '+100 - 40' },
      { formula: '+70', result: '+100 - 30' },
      { formula: '+80', result: '+100 - 20' },
      { formula: '+90', result: '+100 - 10' },
      { formula: '-10', result: '-100 + 90' },
      { formula: '-20', result: '-100 + 80' },
      { formula: '-30', result: '-100 + 70' },
      { formula: '-40', result: '-100 + 60' },
      { formula: '-50', result: '-100 + 50' },
      { formula: '-60', result: '-100 + 40' },
      { formula: '-70', result: '-100 + 30' },
      { formula: '-80', result: '-100 + 20' },
      { formula: '-90', result: '-100 + 10' },
    ],
    story: 'الجار في الآلاف: عندما لا تكفي المئات، نذهب للجار في الآلاف ونرفع خرزة (+1000)، ثم نسحب صديق الرقم.',
    storyAudioText: 'الجار في الآلاف: عندما لا تكفي المئات، نذهب للجار في الآلاف ونرفع خرزة، ثم نسحب صديق الرقم.',
    examples: [
      { problemText: '50 + 50 = ؟', answer: 100, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 50: أنزل الجدة 5 عشرات', fingerUsed: 'index', direction: 'down', targetColumn: 'tens', beadsAffected: [5], expectedValueAfter: 50 },
        { stepIndex: 2, instructionText: 'ارفع 1 مئات (+100)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 150 },
        { stepIndex: 3, instructionText: 'ارفع الجدة 5 عشرات (-50)', fingerUsed: 'index', direction: 'up', targetColumn: 'tens', beadsAffected: [5], expectedValueAfter: 100 }
      ], explanation: '50 + 50 = 100 (القاعدة: +50 = +100 - 50)' },
      { problemText: '60 + 50 = ؟', answer: 110, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 60', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4, 5, 6], expectedValueAfter: 60 },
        { stepIndex: 2, instructionText: 'ارفع 1 مئات (+100)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 160 },
        { stepIndex: 3, instructionText: 'ارفع 5 عشرات (-50)', fingerUsed: 'index', direction: 'up', targetColumn: 'tens', beadsAffected: [5], expectedValueAfter: 110 }
      ], explanation: '60 + 50 = 110 (القاعدة: +50 = +100 - 50)' },
      { problemText: '70 + 60 = ؟', answer: 130, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 70', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5, 1, 2], expectedValueAfter: 70 },
        { stepIndex: 2, instructionText: 'ارفع 1 مئات (+100)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 170 },
        { stepIndex: 3, instructionText: 'أنزل 4 عشرات (-40)', fingerUsed: 'index', direction: 'down', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 130 }
      ], explanation: '70 + 60 = 130 (القاعدة: +60 = +100 - 40)' },
      { problemText: '80 + 70 = ؟', answer: 150, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 80', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5, 1, 2, 3], expectedValueAfter: 80 },
        { stepIndex: 2, instructionText: 'ارفع 1 مئات (+100)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 180 },
        { stepIndex: 3, instructionText: 'أنزل 3 عشرات (-30)', fingerUsed: 'index', direction: 'down', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 150 }
      ], explanation: '80 + 70 = 150 (القاعدة: +70 = +100 - 30)' },
      { problemText: '90 + 80 = ؟', answer: 170, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 90', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 90 },
        { stepIndex: 2, instructionText: 'ارفع 1 مئات (+100)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 190 },
        { stepIndex: 3, instructionText: 'أنزل 2 عشرات (-20)', fingerUsed: 'index', direction: 'down', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 170 }
      ], explanation: '90 + 80 = 170 (القاعدة: +80 = +100 - 20)' },
      { problemText: '100 - 30 = ؟', answer: 70, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 100', fingerUsed: 'thumb', direction: 'up', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 100 },
        { stepIndex: 2, instructionText: 'أزل 1 مئات (-100)', fingerUsed: 'thumb', direction: 'down', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 0 },
        { stepIndex: 3, instructionText: 'ارفع 7 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4, 5, 6, 7], expectedValueAfter: 70 }
      ], explanation: '100 - 30 = 70 (القاعدة: -30 = -100 + 70)' },
      { problemText: '120 - 40 = ؟', answer: 80, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 120', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 120 },
        { stepIndex: 2, instructionText: 'أزل 1 مئات (-100)', fingerUsed: 'thumb', direction: 'down', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 20 },
        { stepIndex: 3, instructionText: 'ارفع 6 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [3, 4, 5, 6, 7, 8], expectedValueAfter: 80 }
      ], explanation: '120 - 40 = 80 (القاعدة: -40 = -100 + 60)' },
      { problemText: '150 - 70 = ؟', answer: 80, ruleCategory: 'big_friends', steps: [
        { stepIndex: 1, instructionText: 'مثّل 150', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 150 },
        { stepIndex: 2, instructionText: 'أزل 1 مئات (-100)', fingerUsed: 'thumb', direction: 'down', targetColumn: 'hundreds', beadsAffected: [1], expectedValueAfter: 50 },
        { stepIndex: 3, instructionText: 'ارفع 3 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 80 }
      ], explanation: '150 - 70 = 80 (القاعدة: -70 = -100 + 30)' }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 11: الضرب على المعداد
  // ═══════════════════════════════════════════════════════════
  {
    id: 11,
    title: 'Multiplication',
    titleAr: 'الضرب على المعداد',
    description: 'Multiply digit by digit',
    descriptionAr: 'اضرب رقماً برقم',
    status: 'locked',
    beads: { upper: 0, lower: 6 },
    value: 42,
    concept: 'Multiply then shift position',
    conceptAr: 'اضرب ثم أزح الخانة',
    icon: 'X',
    audioText: 'الضرب على المعداد: نضرب كل رقم من العدد الأول بالعدد الثاني، ثم نُزاح الخانة.',
    rule: 'Multiply digit, shift position to left',
    ruleAr: 'اضرب الرقم، ثم أزح الخانة لليسار',
    story: 'مملكة الضرب: كل رقم يضرب له مملكته الخاصة في الخانة المناسبة.',
    storyAudioText: 'مملكة الضرب: كل رقم يضرب له مملكته الخاصة في الخانة المناسبة.',
    examples: [
      { problemText: '12 × 3 = ؟', answer: 36, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'اضرب 10 × 3 = 30', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 30 },
        { stepIndex: 2, instructionText: 'اضرب 2 × 3 = 6', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 36 }
      ], explanation: '12 × 3 = 36' },
      { problemText: '14 × 3 = ؟', answer: 42, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: '10 × 3 = 30', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 30 },
        { stepIndex: 2, instructionText: '4 × 3 = 12 → 1 عشرات + 2 آحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [4], expectedValueAfter: 40 },
        { stepIndex: 3, instructionText: 'أضف 2 في الآحاد', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2], expectedValueAfter: 42 }
      ], explanation: '14 × 3 = 42' },
      { problemText: '23 × 2 = ؟', answer: 46, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: '20 × 2 = 40', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 40 },
        { stepIndex: 2, instructionText: '3 × 2 = 6', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedValueAfter: 46 }
      ], explanation: '23 × 2 = 46' },
      { problemText: '11 × 4 = ؟', answer: 44, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: '10 × 4 = 40', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 40 },
        { stepIndex: 2, instructionText: '1 × 4 = 4', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 44 }
      ], explanation: '11 × 4 = 44' },
      { problemText: '5 × 4 = ؟', answer: 20, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: '5 × 4 = 20 (اضع 2 في العشرات)', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2], expectedValueAfter: 20 }
      ], explanation: '5 × 4 = 20' },
      { problemText: '5 × 3 = ؟', answer: 15, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: '5 × 3 = 15 → 1 عشرات', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1], expectedValueAfter: 10 },
        { stepIndex: 2, instructionText: 'أضف 5 في الآحاد', fingerUsed: 'index', direction: 'down', targetColumn: 'units', beadsAffected: [5], expectedValueAfter: 15 }
      ], explanation: '5 × 3 = 15' },
      { problemText: '13 × 3 = ؟', answer: 39, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: '10 × 3 = 30', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2, 3], expectedValueAfter: 30 },
        { stepIndex: 2, instructionText: '3 × 3 = 9', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 39 }
      ], explanation: '13 × 3 = 39' },
      { problemText: '47 × 2 = ؟', answer: 94, ruleCategory: 'combined', steps: [
        { stepIndex: 1, instructionText: '7 × 2 = 14 → اكتب 4، وارفع 1', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedValueAfter: 4 },
        { stepIndex: 2, instructionText: '4 × 2 = 8 + 1 = 9', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [5, 1, 2, 3, 4], expectedValueAfter: 94 }
      ], explanation: '47 × 2 = 94' }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // الدرس 12: القسمة على المعداد
  // ═══════════════════════════════════════════════════════════
  {
    id: 12,
    title: 'Division',
    titleAr: 'القسمة على المعداد',
    description: 'Divide digit by digit',
    descriptionAr: 'اقسم رقماً برقم على المعداد',
    status: 'locked',
    beads: { upper: 0, lower: 3 },
    value: 21,
    concept: 'Divide, multiply, subtract',
    conceptAr: 'اقسم، اضرب، اطرح',
    icon: 'Divide',
    audioText: 'القسمة على المعداد: مثّل المقسوم، اقسم على المقسوم عليه، اكتب الناتج في الخانة المناسبة، ثم اضرب واطرح.',
    rule: 'Represent → Divide → Multiply → Subtract',
    ruleAr: 'مثّل ← اقسم ← اضرب ← اطرح',
    story: 'كنز القراصنة: نقسم الذهب بين القراصنة بالتساوي!',
    storyAudioText: 'كنز القراصنة: نقسم الذهب بين القراصنة بالتساوي.',
    examples: [
      { problemText: '8 ÷ 2 = ؟', answer: 4, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'مثّل 8', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedAbacusState: [8, 0, 0] },
        { stepIndex: 2, instructionText: 'اقسم 8 ÷ 2 = 4', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedAbacusState: [4, 0, 0] },
        { stepIndex: 3, instructionText: 'تحقق: 4 × 2 = 8. اطرح 8', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3], expectedAbacusState: [4, 0, 0] }
      ], explanation: '8 ÷ 2 = 4. الباقي: 0' },
      { problemText: '6 ÷ 2 = ؟', answer: 3, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'مثّل 6', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1], expectedAbacusState: [6, 0, 0] },
        { stepIndex: 2, instructionText: 'اقسم 6 ÷ 2 = 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
        { stepIndex: 3, instructionText: 'تحقق: 3 × 2 = 6. اطرح', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1], expectedAbacusState: [3, 0, 0] }
      ], explanation: '6 ÷ 2 = 3. الباقي: 0' },
      { problemText: '9 ÷ 3 = ؟', answer: 3, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'مثّل 9', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedAbacusState: [9, 0, 0] },
        { stepIndex: 2, instructionText: 'اقسم 9 ÷ 3 = 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
        { stepIndex: 3, instructionText: 'تحقق: 3 × 3 = 9. اطرح', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'units', beadsAffected: [5, 1, 2, 3, 4], expectedAbacusState: [3, 0, 0] }
      ], explanation: '9 ÷ 3 = 3. الباقي: 0' },
      { problemText: '12 ÷ 4 = ؟', answer: 3, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'مثّل 12', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedAbacusState: [2, 1, 0] },
        { stepIndex: 2, instructionText: 'اقسم 12 ÷ 4 = 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
        { stepIndex: 3, instructionText: 'تحقق: 3 × 4 = 12. اطرح', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [3, 0, 0] }
      ], explanation: '12 ÷ 4 = 3. الباقي: 0' },
      { problemText: '15 ÷ 5 = ؟', answer: 3, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'مثّل 15', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedAbacusState: [5, 1, 0] },
        { stepIndex: 2, instructionText: 'اقسم 15 ÷ 5 = 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
        { stepIndex: 3, instructionText: 'تحقق: 3 × 5 = 15. اطرح', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 5], expectedAbacusState: [3, 0, 0] }
      ], explanation: '15 ÷ 5 = 3. الباقي: 0' },
      { problemText: '20 ÷ 5 = ؟', answer: 4, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'مثّل 20', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [0, 2, 0] },
        { stepIndex: 2, instructionText: 'اقسم 20 ÷ 5 = 4', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3, 4], expectedAbacusState: [4, 0, 0] },
        { stepIndex: 3, instructionText: 'تحقق: 4 × 5 = 20. اطرح', fingerUsed: 'thumb', direction: 'down', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [4, 0, 0] }
      ], explanation: '20 ÷ 5 = 4. الباقي: 0' },
      { problemText: '21 ÷ 7 = ؟', answer: 3, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'مثّل 21', fingerUsed: 'thumb', direction: 'up', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [1, 2, 0] },
        { stepIndex: 2, instructionText: 'اقسم 21 ÷ 7 = 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
        { stepIndex: 3, instructionText: 'تحقق: 3 × 7 = 21. اطرح', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 2], expectedAbacusState: [3, 0, 0] }
      ], explanation: '21 ÷ 7 = 3. الباقي: 0' },
      { problemText: '18 ÷ 6 = ؟', answer: 3, ruleCategory: 'direct', steps: [
        { stepIndex: 1, instructionText: 'مثّل 18', fingerUsed: 'both_pinch', direction: 'pinch_in', targetColumn: 'tens', beadsAffected: [1], expectedAbacusState: [8, 1, 0] },
        { stepIndex: 2, instructionText: 'اقسم 18 ÷ 6 = 3', fingerUsed: 'thumb', direction: 'up', targetColumn: 'units', beadsAffected: [1, 2, 3], expectedAbacusState: [3, 0, 0] },
        { stepIndex: 3, instructionText: 'تحقق: 3 × 6 = 18. اطرح', fingerUsed: 'both_pinch', direction: 'pinch_out', targetColumn: 'tens', beadsAffected: [1, 5, 1, 2, 3], expectedAbacusState: [3, 0, 0] }
      ], explanation: '18 ÷ 6 = 3. الباقي: 0' }
    ]
  },
];

// ═══════════════════════════════════════════════════════════
// QUESTS
// ═══════════════════════════════════════════════════════════
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
// 
// ═══════════════════════════════════════════════════════════
// PRACTICE QUESTIONS — موحّدة مع lessonId
// ═══════════════════════════════════════════════════════════
export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  { question: '1 + 2', answer: 3, choices: [2, 3, 4, 5], type: 'direct', lessonId: 3 },
  { question: '2 + 2', answer: 4, choices: [3, 4, 5, 6], type: 'direct', lessonId: 3 },
  { question: '5 + 3', answer: 8, choices: [7, 8, 9, 10], type: 'direct', lessonId: 3 },
  { question: '4 + 5', answer: 9, choices: [8, 9, 10, 11], type: 'direct', lessonId: 3 },
  { question: '4 - 1', answer: 3, choices: [2, 3, 4, 5], type: 'direct', lessonId: 3 },
  { question: '9 - 5', answer: 4, choices: [3, 4, 5, 6], type: 'direct', lessonId: 3 },
  { question: '8 - 3', answer: 5, choices: [4, 5, 6, 7], type: 'direct', lessonId: 3 },
  { question: '12 + 21', answer: 33, choices: [31, 32, 33, 34], type: 'direct', lessonId: 3 },
  { question: '4 + 4', answer: 8, choices: [7, 8, 9, 10], type: 'small_friends', lessonId: 4 },
  { question: '3 + 3', answer: 6, choices: [5, 6, 7, 8], type: 'small_friends', lessonId: 4 },
  { question: '2 + 3', answer: 5, choices: [4, 5, 6, 7], type: 'small_friends', lessonId: 4 },
  { question: '4 + 3', answer: 7, choices: [6, 7, 8, 9], type: 'small_friends', lessonId: 4 },
  { question: '1 + 4', answer: 5, choices: [4, 5, 6, 7], type: 'small_friends', lessonId: 4 },
  { question: '2 + 4', answer: 6, choices: [5, 6, 7, 8], type: 'small_friends', lessonId: 4 },
  { question: '5 - 4', answer: 1, choices: [1, 2, 3, 4], type: 'small_friends', lessonId: 4 },
  { question: '6 - 3', answer: 3, choices: [2, 3, 4, 5], type: 'small_friends', lessonId: 4 },
  { question: '7 - 4', answer: 3, choices: [2, 3, 4, 5], type: 'small_friends', lessonId: 4 },
  { question: '8 - 4', answer: 4, choices: [3, 4, 5, 6], type: 'small_friends', lessonId: 4 },
  { question: '9 + 9', answer: 18, choices: [17, 18, 19, 20], type: 'big_friends', lessonId: 5 },
  { question: '8 + 8', answer: 16, choices: [15, 16, 17, 18], type: 'big_friends', lessonId: 5 },
  { question: '7 + 7', answer: 14, choices: [13, 14, 15, 16], type: 'big_friends', lessonId: 5 },
  { question: '6 + 6', answer: 12, choices: [11, 12, 13, 14], type: 'big_friends', lessonId: 5 },
  { question: '5 + 5', answer: 10, choices: [9, 10, 11, 12], type: 'big_friends', lessonId: 5 },
  { question: '8 + 7', answer: 15, choices: [14, 15, 16, 17], type: 'big_friends', lessonId: 5 },
  { question: '9 + 4', answer: 13, choices: [12, 13, 14, 15], type: 'big_friends', lessonId: 5 },
  { question: '6 + 8', answer: 14, choices: [13, 14, 15, 16], type: 'big_friends', lessonId: 5 },
  { question: '7 + 5', answer: 12, choices: [11, 12, 13, 14], type: 'big_friends', lessonId: 5 },
  { question: '11 - 9', answer: 2, choices: [1, 2, 3, 4], type: 'big_friends', lessonId: 5 },
  { question: '12 - 8', answer: 4, choices: [3, 4, 5, 6], type: 'big_friends', lessonId: 5 },
  { question: '15 - 7', answer: 8, choices: [7, 8, 9, 10], type: 'big_friends', lessonId: 5 },
  { question: '13 - 5', answer: 8, choices: [7, 8, 9, 10], type: 'big_friends', lessonId: 5 },
  { question: '10 - 3', answer: 7, choices: [6, 7, 8, 9], type: 'big_friends', lessonId: 5 },
  { question: '5 + 6', answer: 11, choices: [10, 11, 12, 13], type: 'combined', lessonId: 6 },
  { question: '6 + 7', answer: 13, choices: [12, 13, 14, 15], type: 'combined', lessonId: 6 },
  { question: '7 + 8', answer: 15, choices: [14, 15, 16, 17], type: 'combined', lessonId: 6 },
  { question: '8 + 9', answer: 17, choices: [16, 17, 18, 19], type: 'combined', lessonId: 6 },
  { question: '5 + 7', answer: 12, choices: [11, 12, 13, 14], type: 'combined', lessonId: 6 },
  { question: '6 + 8', answer: 14, choices: [13, 14, 15, 16], type: 'combined', lessonId: 6 },
  { question: '14 - 6', answer: 8, choices: [7, 8, 9, 10], type: 'combined', lessonId: 6 },
  { question: '13 - 7', answer: 6, choices: [5, 6, 7, 8], type: 'combined', lessonId: 6 },
  { question: '12 - 8', answer: 4, choices: [3, 4, 5, 6], type: 'combined', lessonId: 6 },
  { question: '15 - 9', answer: 6, choices: [5, 6, 7, 8], type: 'combined', lessonId: 6 },
  { question: '20 + 40', answer: 60, choices: [50, 60, 70, 80], type: 'big_friends', lessonId: 9 },
  { question: '30 + 30', answer: 60, choices: [50, 60, 70, 80], type: 'big_friends', lessonId: 9 },
  { question: '40 + 40', answer: 80, choices: [70, 80, 90, 100], type: 'big_friends', lessonId: 9 },
  { question: '50 - 30', answer: 20, choices: [10, 20, 30, 40], type: 'big_friends', lessonId: 9 },
  { question: '40 - 20', answer: 20, choices: [10, 20, 30, 40], type: 'big_friends', lessonId: 9 },
  { question: '50 + 50', answer: 100, choices: [90, 100, 110, 120], type: 'big_friends', lessonId: 10 },
  { question: '60 + 50', answer: 110, choices: [100, 110, 120, 130], type: 'big_friends', lessonId: 10 },
  { question: '100 - 30', answer: 70, choices: [60, 70, 80, 90], type: 'big_friends', lessonId: 10 },
  { question: '120 - 40', answer: 80, choices: [70, 80, 90, 100], type: 'big_friends', lessonId: 10 },
  { question: '150 - 70', answer: 80, choices: [70, 80, 90, 100], type: 'big_friends', lessonId: 10 },
  { question: '2 × 2', answer: 4, choices: [2, 4, 6, 8], type: 'direct', lessonId: 11 },
  { question: '3 × 2', answer: 6, choices: [4, 6, 8, 10], type: 'direct', lessonId: 11 },
  { question: '4 × 2', answer: 8, choices: [6, 8, 10, 12], type: 'direct', lessonId: 11 },
  { question: '5 × 2', answer: 10, choices: [8, 10, 12, 14], type: 'direct', lessonId: 11 },
  { question: '3 × 3', answer: 9, choices: [6, 9, 12, 15], type: 'direct', lessonId: 11 },
  { question: '4 × 3', answer: 12, choices: [9, 12, 15, 18], type: 'direct', lessonId: 11 },
  { question: '12 × 3', answer: 36, choices: [33, 36, 39, 42], type: 'direct', lessonId: 11 },
  { question: '14 × 3', answer: 42, choices: [39, 42, 45, 48], type: 'direct', lessonId: 11 },
  { question: '23 × 2', answer: 46, choices: [43, 46, 49, 52], type: 'direct', lessonId: 11 },
  { question: '11 × 4', answer: 44, choices: [41, 44, 47, 50], type: 'direct', lessonId: 11 },
  { question: '6 ÷ 2', answer: 3, choices: [2, 3, 4, 5], type: 'direct', lessonId: 12 },
  { question: '8 ÷ 2', answer: 4, choices: [3, 4, 5, 6], type: 'direct', lessonId: 12 },
  { question: '9 ÷ 3', answer: 3, choices: [2, 3, 4, 5], type: 'direct', lessonId: 12 },
  { question: '15 ÷ 5', answer: 3, choices: [2, 3, 4, 5], type: 'direct', lessonId: 12 },
  { question: '12 ÷ 4', answer: 3, choices: [2, 3, 4, 5], type: 'direct', lessonId: 12 },
  { question: '20 ÷ 5', answer: 4, choices: [3, 4, 5, 6], type: 'direct', lessonId: 12 },
  { question: '21 ÷ 7', answer: 3, choices: [2, 3, 4, 5], type: 'direct', lessonId: 12 },
  { question: '18 ÷ 6', answer: 3, choices: [2, 3, 4, 5], type: 'direct', lessonId: 12 },
];

// ═══════════════════════════════════════════════════════════
// CHAIN EXERCISES — تمارين السلاسل الطويلة (الدرس 7)
// ═══════════════════════════════════════════════════════════
export const CHAIN_EXERCISES: ChainExercise[] = [
  {
    id: 'c1-1', rows: 10, digits: 1, lessonId: 7, difficulty: 5,
    groupAr: 'سلاسل الآحاد (١٠ صفوف)',
    operations: [
      { value: 5, operator: '+' }, { value: 4, operator: '-' },
      { value: 7, operator: '+' }, { value: 8, operator: '+' },
      { value: 3, operator: '+' }, { value: 1, operator: '-' },
      { value: 1, operator: '-' }, { value: 4, operator: '+' },
    ],
    answer: 21,
  },
  {
    id: 'c1-2', rows: 10, digits: 1, lessonId: 7, difficulty: 5,
    groupAr: 'سلاسل الآحاد (١٠ صفوف)',
    operations: [
      { value: 6, operator: '+' }, { value: 7, operator: '+' },
      { value: 8, operator: '-' }, { value: 7, operator: '+' },
      { value: 2, operator: '-' }, { value: 1, operator: '+' },
      { value: 9, operator: '-' }, { value: 2, operator: '+' },
      { value: 3, operator: '+' }, { value: 9, operator: '+' },
    ],
    answer: 16,
  },
  {
    id: 'c1-3', rows: 10, digits: 1, lessonId: 7, difficulty: 5,
    groupAr: 'سلاسل الآحاد (١٠ صفوف)',
    operations: [
      { value: 8, operator: '+' }, { value: 3, operator: '+' },
      { value: 1, operator: '+' }, { value: 8, operator: '+' },
      { value: 9, operator: '+' }, { value: 8, operator: '+' },
      { value: 3, operator: '-' }, { value: 6, operator: '+' },
      { value: 4, operator: '-' }, { value: 1, operator: '+' },
    ],
    answer: 37,
  },
  {
    id: 'c2-1', rows: 4, digits: 2, lessonId: 7, difficulty: 3,
    groupAr: 'منزلتان (٤ صفوف)',
    operations: [
      { value: 3, operator: '+' }, { value: 60, operator: '+' },
      { value: 12, operator: '-' }, { value: 66, operator: '+' },
    ],
    answer: 117,
  },
  {
    id: 'c2-2', rows: 4, digits: 2, lessonId: 7, difficulty: 3,
    groupAr: 'منزلتان (٤ صفوف)',
    operations: [
      { value: 45, operator: '+' }, { value: 56, operator: '+' },
      { value: 30, operator: '-' }, { value: 88, operator: '+' },
    ],
    answer: 159,
  },
  {
    id: 'c2-3', rows: 4, digits: 2, lessonId: 7, difficulty: 4,
    groupAr: 'منزلتان (٤ صفوف)',
    operations: [
      { value: 99, operator: '+' }, { value: 81, operator: '+' },
      { value: 4, operator: '-' }, { value: 35, operator: '+' },
    ],
    answer: 211,
  },
  {
    id: 'c3-1', rows: 4, digits: 2, lessonId: 7, difficulty: 4,
    groupAr: 'منزلتان متقدمة',
    operations: [
      { value: 37, operator: '+' }, { value: 49, operator: '+' },
      { value: 24, operator: '-' }, { value: 7, operator: '+' },
    ],
    answer: 69,
  },
  {
    id: 'c3-2', rows: 4, digits: 2, lessonId: 7, difficulty: 4,
    groupAr: 'منزلتان متقدمة',
    operations: [
      { value: 68, operator: '+' }, { value: 46, operator: '-' },
      { value: 27, operator: '+' }, { value: 69, operator: '+' },
    ],
    answer: 118,
  },
  {
    id: 'c4-1', rows: 4, digits: 3, lessonId: 7, difficulty: 5,
    groupAr: 'مئات وآحاد',
    operations: [
      { value: 4, operator: '+' }, { value: 71, operator: '+' },
      { value: 95, operator: '+' }, { value: 69, operator: '+' },
    ],
    answer: 239,
  },
  {
    id: 'c4-2', rows: 4, digits: 3, lessonId: 7, difficulty: 5,
    groupAr: 'مئات وآحاد',
    operations: [
      { value: 15, operator: '+' }, { value: 96, operator: '+' },
      { value: 40, operator: '-' }, { value: 12, operator: '+' },
    ],
    answer: 83,
  },
  {
    id: 'c5-1', rows: 5, digits: 2, lessonId: 7, difficulty: 5,
    groupAr: '٥ صفوف متتالية',
    operations: [
      { value: 99, operator: '+' }, { value: 79, operator: '-' },
      { value: 37, operator: '+' }, { value: 38, operator: '-' },
      { value: 38, operator: '+' },
    ],
    answer: 57,
  },
  {
    id: 'c5-2', rows: 5, digits: 2, lessonId: 7, difficulty: 5,
    groupAr: '٥ صفوف متتالية',
    operations: [
      { value: 9, operator: '+' }, { value: 57, operator: '+' },
      { value: 31, operator: '-' }, { value: 86, operator: '+' },
      { value: 9, operator: '+' },
    ],
    answer: 130,
  },
  {
    id: 'c5-3', rows: 5, digits: 2, lessonId: 7, difficulty: 6,
    groupAr: '٥ صفوف متتالية',
    operations: [
      { value: 23, operator: '+' }, { value: 37, operator: '+' },
      { value: 37, operator: '+' }, { value: 77, operator: '-' },
      { value: 13, operator: '+' },
    ],
    answer: 33,
  },
  {
    id: 'c6-1', rows: 15, digits: 2, lessonId: 7, difficulty: 6,
    groupAr: 'التحدي الأكبر (١٥ صفاً)',
    operations: [
      { value: 21, operator: '+' }, { value: 72, operator: '+' },
      { value: 40, operator: '+' }, { value: 53, operator: '-' },
      { value: 65, operator: '-' }, { value: 35, operator: '+' },
      { value: 66, operator: '+' }, { value: 42, operator: '+' },
      { value: 24, operator: '-' }, { value: 47, operator: '-' },
      { value: 86, operator: '+' }, { value: 49, operator: '+' },
      { value: 7, operator: '-' }, { value: 14, operator: '-' },
      { value: 75, operator: '-' },
    ],
    answer: 126,
  },
  {
    id: 'c6-2', rows: 15, digits: 2, lessonId: 7, difficulty: 6,
    groupAr: 'التحدي الأكبر (١٥ صفاً)',
    operations: [
      { value: 97, operator: '+' }, { value: 35, operator: '-' },
      { value: 85, operator: '+' }, { value: 87, operator: '-' },
      { value: 90, operator: '+' }, { value: 36, operator: '-' },
      { value: 50, operator: '+' }, { value: 28, operator: '+' },
      { value: 95, operator: '-' }, { value: 68, operator: '+' },
      { value: 71, operator: '-' }, { value: 27, operator: '-' },
      { value: 10, operator: '+' }, { value: 29, operator: '+' },
      { value: 4, operator: '-' },
    ],
    answer: 102,
  },
  {
    id: 'c6-3', rows: 15, digits: 2, lessonId: 7, difficulty: 6,
    groupAr: 'التحدي الأكبر (١٥ صفاً)',
    operations: [
      { value: 34, operator: '+' }, { value: 77, operator: '+' },
      { value: 9, operator: '+' }, { value: 70, operator: '-' },
      { value: 33, operator: '+' }, { value: 37, operator: '-' },
      { value: 41, operator: '+' }, { value: 81, operator: '+' },
      { value: 60, operator: '-' }, { value: 67, operator: '+' },
      { value: 22, operator: '+' }, { value: 7, operator: '-' },
      { value: 65, operator: '-' }, { value: 21, operator: '+' },
      { value: 54, operator: '+' },
    ],
    answer: 200,
  },
];

// ═══════════════════════════════════════════════════════════
// Aliases للتوافق مع الكود القديم
// ═══════════════════════════════════════════════════════════
export const ADDITION_QUESTIONS = PRACTICE_QUESTIONS.filter((q) => q.question.includes('+'));
export const SUBTRACTION_QUESTIONS = PRACTICE_QUESTIONS.filter((q) => q.question.includes('-') && !q.question.includes('÷'));
export const MULTIPLICATION_QUESTIONS = PRACTICE_QUESTIONS.filter((q) => q.question.includes('×'));
export const DIVISION_QUESTIONS = PRACTICE_QUESTIONS.filter((q) => q.question.includes('÷'));