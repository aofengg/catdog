/**
 * 猫咪 PETI 人格测试 - 完整配置数据
 * 纯前端静态数据，ES5 严格兼容
 */

var catData = {
  petType: 'cat',

  brand: {
    title: '猫咪 PETI 人格测试',
    slogan: '每一只猫咪，都有傲娇的小人格',
    subtitle: '解锁傲娇主子的内心小世界',
    shareTitle: '测你家猫咪是什么 PETI 人格？',
    shareDesc: '测出猫咪真实性格，还能和你 PETI 灵魂配对',
    posterCTA: [
      '你家猫比我的稀有吗？',
      '你确定你配得上你家猫？',
      '不服？让你家主子也来鉴定一下'
    ]
  },

  dimensions: {
    EI: { positive: '外放社牛', negative: '高冷社恐' },
    TF: { positive: '软萌共情', negative: '傲娇理性' },
    JP: { positive: '随性调皮', negative: '规矩高冷' },
    NS: { positive: '好奇脑洞', negative: '躺平佛系' }
  },

  questions: [
    {
      id: 1,
      question: '家里来陌生人，猫咪会？',
      optionA: '主动凑过去闻、围观凑热闹',
      optionB: '立刻躲床底/角落，绝不露面',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 2,
      question: '你坐沙发玩手机，猫咪会？',
      optionA: '主动过来蹭腿、趴你身上撒娇',
      optionB: '自己一旁躺着，互不打扰',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 3,
      question: '给新玩具，猫咪反应？',
      optionA: '立刻扑上去玩半天',
      optionB: '瞟一眼继续睡觉，没兴趣',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    },
    {
      id: 4,
      question: '到饭点没及时喂，猫咪？',
      optionA: '围着你不停叫、蹭腿催饭',
      optionB: '安静等着，不吵不闹',
      dimension: 'JP',
      scoreA: 'P',
      scoreB: 'J'
    },
    {
      id: 5,
      question: '被你抱在怀里，猫咪？',
      optionA: '乖乖顺从、呼噜撒娇',
      optionB: '挣扎想跑，不爱被束缚',
      dimension: 'JP',
      scoreA: 'J',
      scoreB: 'P'
    },
    {
      id: 6,
      question: '打开家门，猫咪？',
      optionA: '探头张望、想往外溜探索',
      optionB: '原地不动，毫无兴趣',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 7,
      question: '家里环境重新摆放家具，猫咪？',
      optionA: '到处巡视、挨个探查新位置',
      optionB: '一脸无所谓，照旧躺老地方',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    },
    {
      id: 8,
      question: '做错事被你轻声批评，猫咪？',
      optionA: '耳朵耷拉、委屈躲起来',
      optionB: '面无表情，扭头走开无所谓',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 9,
      question: '日常作息是否固定？',
      optionA: '想睡就睡、疯玩不分时间',
      optionB: '定点睡、定点吃、作息超规律',
      dimension: 'JP',
      scoreA: 'P',
      scoreB: 'J'
    },
    {
      id: 10,
      question: '见到别的小动物/流浪猫？',
      optionA: '好奇盯着、甚至想靠近',
      optionB: '无视甚至哈气，保持距离',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 11,
      question: '你情绪低落不说话，猫咪？',
      optionA: '主动过来蹭你、安静陪着',
      optionB: '该干嘛干嘛，毫无察觉',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 12,
      question: '给猫换新猫砂/新猫粮？',
      optionA: '愿意尝试，很快适应',
      optionB: '抗拒、挑食、不习惯变动',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    },
    {
      id: 13,
      question: '半夜三更会不会跑酷疯玩？',
      optionA: '经常半夜蹦迪、满屋狂奔',
      optionB: '晚上安静睡觉，从不闹腾',
      dimension: 'JP',
      scoreA: 'P',
      scoreB: 'J'
    },
    {
      id: 14,
      question: '喜欢高处窗台俯瞰还是窝在低处小窝？',
      optionA: '爱登高、到处探索制高点',
      optionB: '偏爱低矮安全角落躺平',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    },
    {
      id: 15,
      question: '撸猫摸肚子，猫咪？',
      optionA: '享受呼噜，随便摸',
      optionB: '警惕闪躲，不让碰敏感部位',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 16,
      question: '出门去宠物医院/洗澡？',
      optionA: '虽然紧张但不极度崩溃',
      optionB: '极度应激、炸毛发抖狂躲',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 17,
      question: '家里来人吵闹，猫咪？',
      optionA: '好奇围观，适应嘈杂环境',
      optionB: '嫌吵躲起来，要安静独处',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 18,
      question: '有没有拆家、扒拉水杯、打翻东西习惯？',
      optionA: '调皮好动，经常搞小破坏',
      optionB: '乖巧安分，很少闯祸',
      dimension: 'JP',
      scoreA: 'P',
      scoreB: 'J'
    },
    {
      id: 19,
      question: '更喜欢独处还是时刻黏着主人？',
      optionA: '粘人精，走哪跟哪',
      optionB: '独立独行，不需要时刻陪伴',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 20,
      question: '面对陌生新环境（搬家/新房间）？',
      optionA: '慢慢探索，很快适应',
      optionB: '一直躲藏，很久不敢出来',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    }
  ],

  personalities: {
    ESTJ: {
      petName: '铁腕霸总猫',
      rare: '传说款',
      rareLevel: '3%',
      posterBadge: '\u2b50 传说款 3%',
      posterTheme: 'teaBrown',
      posterShort: '清冷自带气场，暗中主宰全家',
      description: '全家真正的掌权者，走路自带气场，吃饭要第一个，睡觉占最好的位置。表面高冷不可一世，实际上把家里每个人的脾气摸得门儿清。你以为你在养猫？不，它在管理你。',
      tips: '不要挑战它的权威，它记仇；给它固定的专属领地，会更安心；偶尔顺毛夸两句，霸总也需要被认可',
      bestMatch: ['ISFJ', 'INFP', 'ISFP'],
      score: 96,
      tag: '天命绝配',
      matchDesc: '温柔型主人遇上霸道猫总裁，表面被拿捏得死死的，实则心甘情愿臣服于猫主子的高冷气场。你负责听话，它负责当家，完美分工。',
      matchCircleText: '我家猫是铁腕霸总，而我只是它的带薪铲屎打工人，感谢猫老板不裁员之恩\ud83d\ude3c',
      circleText: '我家猫不是宠物，是这个家的最高掌权人，我只是个带薪铲屎的打工人\ud83d\ude3c',
      petComment: '本喵允许你继续铲屎了'
    },
    ESTP: {
      petName: '社牛显眼猫',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'warmOrange',
      posterShort: '随性傲娇天性，调皮又有分寸',
      description: '猫界社交天花板，见谁都不怕，来客人第一个冲上去围观。在家是拆家小能手，精力旺盛到你怀疑它装了电池。虽然天天闯祸，但一脸无辜看你的时候，又实在骂不出口。',
      tips: '多准备玩具和猫爬架，消耗它的精力；有客人来别关它，社牛不给社交会抑郁；收好易碎品，这不是建议，是忠告',
      bestMatch: ['ENFP', 'ESFP'],
      score: 95,
      tag: '天命绝配',
      matchDesc: '两个社牛凑一起，家里天天像开派对。你负责疯，它负责闹，欢乐指数拉满。虽然隔三差五一起闯祸，但快乐是加倍的。',
      matchCircleText: '我和我家猫唯一的共同点就是：都是社牛显眼包，走哪都是全场焦点\ud83e\udd2a',
      circleText: '社交天花板 + 拆家专业户，出门谁都熟，在家天天给我制造惊喜（惊吓）\ud83e\udd2a',
      petComment: '还不快来跟本喵社交？'
    },
    ESFJ: {
      petName: '贴心小棉猫',
      rare: '大众款',
      rareLevel: '25%',
      posterBadge: '\ud83e\uddf8 大众款 25%',
      posterTheme: 'milkWhite',
      posterShort: '温柔藏于心底，默默温柔相伴',
      description: '猫界稀缺的暖心存在，喜欢蹭腿、趴怀里、跟着你从客厅到厨房。你难过它会安静陪着，你开心它也跟着撒娇。别人家的猫高冷到不理人，你家这只恨不得长在你身上。',
      tips: '多给它肢体接触，摸头撸下巴是必修课；出门久了回来要补偿性陪玩；它很敏感，吵架声大它会害怕',
      bestMatch: ['INTJ', 'INTP'],
      score: 93,
      tag: '神仙合拍',
      matchDesc: '高冷主人遇上粘人猫，一个冷到极点一个暖到心尖。起初你以为你不需要它，后来发现你比它还粘人。真正的双向救赎。',
      matchCircleText: '我的高冷人设，被我家小棉猫一天三次蹭腿毁得彻底\ud83d\ude2d',
      circleText: '别人养猫是养猫，我养猫是多了个贴身小棉袄，情绪全靠它治愈\ud83d\udc31\u2764\ufe0f',
      petComment: '你今天看起来需要本喵蹭蹭'
    },
    ESFP: {
      petName: '颜值担当猫',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'pinkPeach',
      posterShort: '天生颜值出众，傲娇又讨喜',
      description: '天生长了一张讨喜的脸，拍照自带滤镜，随手一拍就是朋友圈素材。性格也配得上颜值，会撒娇会卖萌，关键时刻还带点小傲娇。全家最会拿捏人心的小妖精，没有之一。',
      tips: '定期打理毛发，颜值选手要保持水准；多拍照多夸，它真的听得懂好话；偶尔给点新鲜感，换个新玩具就能开心半天',
      bestMatch: ['ESFP', 'ENFJ', 'ISFJ'],
      score: 95,
      tag: '天命绝配',
      matchDesc: '颜值控遇上颜值担当，这组合就是朋友圈最佳拍档。你拍它美它拍你美，一猫一人承包所有点赞。',
      matchCircleText: '一个比一个上镜，朋友圈晒猫大赛我从未输过\ud83c\udfc6\ud83d\ude3d',
      circleText: '靠颜值混吃混喝，靠卖萌拿捏全家，天生网红命，躺平也受欢迎\ud83d\ude3d',
      petComment: '拍我可以，先给零食'
    },
    ISTJ: {
      petName: '自律打工猫',
      rare: '珍稀款',
      rareLevel: '8%',
      posterBadge: '\ud83d\udc8e 珍稀款 8%',
      posterTheme: 'teaBrown',
      posterShort: '沉静守己度日，清冷安稳随缘',
      description: '作息比你还规律——定点吃、定点睡、定点巡视领地。不爱凑热闹，不喜欢被打扰，安静得像个沉默的老干部。虽然不怎么撒娇，但每天准点出现在你脚边，就是它表达忠诚的方式。',
      tips: '保持喂食和作息的规律性，它不喜欢变动；给它安静的独处空间；不需要太多互动，在场就是最好的陪伴',
      bestMatch: ['ISTJ', 'ESTJ'],
      score: 96,
      tag: '天命绝配',
      matchDesc: '两个自律打工人的日常：定点起床、定点吃饭、定点各做各的事。不需要太多交流，默契全在无声中。安静但舒服，就是最好的陪伴。',
      matchCircleText: '我和我家猫，两个打工人，作息一模一样，感觉活成了同一个人\ud83d\ude10',
      circleText: '猫界老干部，作息比我还自律，安静沉稳、不苟言笑，自带生人勿近气场\ud83d\ude10',
      petComment: '定时投喂，不接受加班'
    },
    ISTP: {
      petName: '人间清醒猫',
      rare: '传说款',
      rareLevel: '3%',
      posterBadge: '\u2b50 传说款 3%',
      posterTheme: 'coolGray',
      posterShort: '独行自有风骨，清冷不迎合',
      description: '高冷独行侠一枚，不粘人、不讨好、不看脸色。有自己的地盘和节奏，被撸两下就走开，绝不多给一秒面子。但偶尔深夜会默默蹭过来，假装不经意地靠着你——这大概就是猫界天花板的傲娇了。',
      tips: '给它留一个不被打扰的专属角落；不要强行抱它，等它主动来找你才是真正的认可；它的冷淡不是不爱，只是爱的方式比较清醒',
      bestMatch: ['ISTP', 'INTJ', 'ENTJ'],
      score: 97,
      tag: '天命绝配',
      matchDesc: '你俩是同一个频道的灵魂——互不打扰、各自精彩、偶尔对视一眼就够了。别人不懂你们的相处模式，但你们自己觉得刚刚好。',
      matchCircleText: '我跟我家猫唯一的共同点：都是人间清醒，都不爱社交，都觉得对方挺酷的\ud83d\ude0e',
      circleText: '高冷独行侠，不粘人、不讨好、不在乎，这辈子主打一个人间清醒、自由散漫\ud83d\ude0e',
      petComment: '人类，你清醒一点'
    },
    ISFJ: {
      petName: '专一挂件猫',
      rare: '大众款',
      rareLevel: '25%',
      posterBadge: '\ud83e\uddf8 大众款 25%',
      posterTheme: 'milkWhite',
      posterShort: '认准你一个人，粘到你心软',
      description: '认准你就是一辈子的猫，别人伸手一律躲开，只有你能让它露肚皮。你走到哪它挂到哪，像个毛茸茸的挂件一样甩不掉。它的世界很小，小到只有你和一个温暖的角落就够了——但它的安全感，全部压在你身上。',
      tips: '不要强迫它社交，它只需要你就够了；轻声细语跟它说话，它会更有安全感；出门久了回来一定要第一时间理它，不然会生闷气',
      bestMatch: ['ENFP', 'ESFJ', 'ISTJ'],
      score: 94,
      tag: '神仙合拍',
      matchDesc: '它不吵不闹只认你一个人，你活泼外向给它带来新鲜感。你是它眼里整个世界的光，它是你回家后最安心的治愈。',
      matchCircleText: '外面再怎么疯回到家，我家猫总是安安静静等着我，这种专一谁受得了\ud83e\udd7a',
      circleText: '全世界只认我一个人，别人碰都不让碰，专一到让人心软\ud83e\udd7a',
      petComment: '只要你在，就够了喵'
    },
    ISFP: {
      petName: '躺平艺术猫',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'mintGreen',
      posterShort: '慵懒享岁月，安静自成诗意',
      description: '人生哲学就四个字：能躺不站。最爱的事是找一个阳光正好的窗台，眯着眼睛发呆半天。不争不抢，不吵不闹，把猫生过成了一首慵懒的诗。你忙你的，它躺它的，各自安好。',
      tips: '给它一个朝阳的窗台位置，是对它最大的宠爱；不需要太多互动，它享受独处的安静；偶尔放点轻音乐，它真的会更放松',
      bestMatch: ['INFP', 'ISFP'],
      score: 93,
      tag: '神仙合拍',
      matchDesc: '一猫一人同款佛系，各自躺各自的，偶尔在阳光里对视一笑。不需要太多互动，窗台上的阳光和旁边打盹的你，就是它最理想的岁月静好。',
      matchCircleText: '我和我家猫的日常：一个躺床上刷手机，一个趴窗台发呆，谁也不打扰谁\ud83c\udf3f',
      circleText: '不爱跑酷不爱闹，一生所求：晒太阳、躺平、看风景，活成最佛系的文艺喵\ud83c\udf3f',
      petComment: '别打扰本喵的艺术人生'
    },
    ENTJ: {
      petName: '幕后大佬猫',
      rare: '传说款',
      rareLevel: '3%',
      posterBadge: '\u2b50 传说款 3%',
      posterTheme: 'coolGray',
      posterShort: '心思藏于眉眼，气场自带格局',
      description: '看似安静不声不响，实则把家里每个人的作息、脾气、底线摸得一清二楚。该撒娇时撒娇，该高冷时高冷，每一步都在它的计划之中。你以为你在养猫？它在布局。',
      tips: '不要试图改变它的习惯，它有自己的规划；多观察它的行为模式，你会发现它比你想象中聪明；给它足够的尊重，大佬需要被平等对待',
      bestMatch: ['ENTJ', 'ISTP', 'ESTJ'],
      score: 96,
      tag: '天命绝配',
      matchDesc: '大佬遇上大佬，家里暗潮涌动。它在沙发上看你，你在桌前看它，都觉得对方很有气场。虽然偶尔争地盘，但双方都欣赏对方的独立和果断。',
      matchCircleText: '我和我家猫之间是一种微妙的权力平衡——它拿捏我，我假装不知道\ud83d\ude3c',
      circleText: '心机拉满、气场全开，看似高冷，实则把全家心思拿捏得死死的，妥妥谋略家\ud83d\ude3c',
      petComment: '一切尽在本喵掌控之中'
    },
    ENTP: {
      petName: '脑洞清奇猫',
      rare: '珍稀款',
      rareLevel: '8%',
      posterBadge: '\ud83d\udc8e 珍稀款 8%',
      posterTheme: 'coolGray',
      posterShort: '脑洞无边无际，好奇贯穿日常',
      description: '好奇心能杀死猫？不存在的，因为它有九条命。每天在家探索新大陆：今天研究水龙头怎么开，明天挑战柜子顶怎么上。脑回路清奇到你永远猜不到它下一步要干什么，养它等于养了一个行为艺术家。',
      tips: '危险物品一定要收好，它真的什么都敢碰；多准备益智玩具，满足它的探索欲；别跟它斗智斗勇，你赢不了',
      bestMatch: ['ENTP', 'INTP', 'ESTP'],
      score: 95,
      tag: '天命绝配',
      matchDesc: '脑洞主人遇上脑洞猫，家里每天都是探索实验室。它研究怎么打开柜子，你研究它怎么打开的柜子。智商对决乐趣无穷。',
      matchCircleText: '我家猫的脑回路和我一样清奇，经常大眼瞪小眼互相研究，谁都看不懂谁\ud83e\udd2f',
      circleText: '好奇心泛滥，每天在家探索新大陆，脑回路清奇，永远猜不到它下一步要干嘛\ud83e\udd2f',
      petComment: '下一个实验对象就是你'
    },
    ENFJ: {
      petName: '治愈系暖猫',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'milkWhite',
      posterShort: '温柔自带暖意，安静治愈人心',
      description: '猫界罕见的情商选手，对谁都温柔，对主人更是暖到心坎。你不开心它会安静蹭过来陪着，你忙碌它会乖乖等着不打扰。虽然是猫，但治愈能力堪比最好的心理医生。',
      tips: '多跟它说话互动，它需要情感回应；家里来客人它会主动社交，不用担心；记得也关心它的情绪，暖心的它也需要被暖',
      bestMatch: ['INFJ', 'ESFP'],
      score: 94,
      tag: '神仙合拍',
      matchDesc: '温柔的你遇上温柔的猫，家里氛围感直接拉满。你懂它的撒娇是在说"我爱你"，它懂你的抚摸是在说"我也是"。最柔软的双向治愈。',
      matchCircleText: '温柔的人养了温柔的猫，我们之间的默契不需要语言\u2600\ufe0f',
      circleText: '对内温柔治愈，对外社交满分，谁来都能处，全家的情绪小太阳\u2600\ufe0f',
      petComment: '过来，本喵给你暖暖'
    },
    ENFP: {
      petName: '元气小太阳猫',
      rare: '大众款',
      rareLevel: '25%',
      posterBadge: '\ud83e\uddf8 大众款 25%',
      posterTheme: 'warmOrange',
      posterShort: '灵动元气满满，俏皮治愈日常',
      description: '精力永远用不完，白天满屋跑酷，晚上蹦迪到半夜。时而黏着你撒娇，时而独自疯玩，情绪来得快去得也快。虽然偶尔闹腾得让人崩溃，但一秒卖萌就能让你原谅它所有调皮。',
      tips: '每天保证足够的玩耍时间，不然它会自己找乐子；别嫌它吵，安静的时候你反而会担心；它的快乐很简单，一个纸箱就够了',
      bestMatch: ['INFJ', 'INTJ', 'ESTP'],
      score: 97,
      tag: '天命绝配',
      matchDesc: '元气猫主子闯进你安静的世界，从此你的日常被快乐承包。它用撒娇融化你的高冷，你用宠溺纵容它的调皮。你以为你不需要陪伴，但其实你最需要。',
      matchCircleText: '我家猫是行走的快乐源泉，我的社恐在它面前完全失效\ud83e\udd73',
      circleText: '精力永远用不完，白天卖萌晚上跑酷，承包家里所有快乐元气\ud83e\udd73',
      petComment: '快来陪本喵玩！不许拒绝！'
    },
    INTJ: {
      petName: '高冷禁欲猫',
      rare: '传说款',
      rareLevel: '3%',
      posterBadge: '\u2b50 传说款 3%',
      posterTheme: 'lavender',
      posterShort: '孤高清冷入骨，自带神秘气场',
      description: '自带生人勿近的气场，不爱社交、不爱撒娇、不屑于讨好任何人。总是独自待在角落发呆，目光深沉得像在思考宇宙的终极问题。接近它需要极大的耐心，但一旦被它认可，那种专属的信任感无可替代。',
      tips: '不要主动靠近它，让它来找你；保持环境安静稳定，它讨厌变化；当它愿意在你旁边睡觉时，恭喜，你被选中了',
      bestMatch: ['ENFP', 'ENTP'],
      score: 96,
      tag: '天命绝配',
      matchDesc: '最高冷的猫遇上最话多的主人——听着你絮絮叨叨讲一天的事，它一脸高冷实则耳朵全竖着。它给不了热烈的回应，但那个专属的窝就固定在你旁边，这就够了。',
      matchCircleText: '我是话痨，我家猫是禁欲系，每天我说它听，完美互补\ud83d\udd2e',
      circleText: '猫界孤独智者，不爱凑热闹、不爱撒娇，总是独自发呆，神秘感直接拉满\ud83d\udd2e',
      petComment: '我选择你，不是因为你优秀'
    },
    INTP: {
      petName: '佛系摆烂猫',
      rare: '珍稀款',
      rareLevel: '8%',
      posterBadge: '\ud83d\udc8e 珍稀款 8%',
      posterTheme: 'mintGreen',
      posterShort: '静思度日随缘，躺平不问俗事',
      description: '主业发呆，副业睡觉，偶尔兼职看风景。对什么都提不起太大兴趣，玩具玩两下就腻了，零食吃两口就够了。不争不抢，佛到极致。但别以为它傻，那双眼睛什么都看在眼里，只是懒得回应罢了。',
      tips: '别期待太多互动，它的爱是安静的在场；换新东西要循序渐进，它适应得慢；尊重它的节奏，佛系猫不需要被催促',
      bestMatch: ['INTP', 'INFP'],
      score: 93,
      tag: '神仙合拍',
      matchDesc: '两只佛系灵魂的同频：你在沙发发呆，它在猫窝发呆，偶尔同时看向窗外，又同时收回目光。不需要社交的快乐，你们最懂。',
      matchCircleText: '我和我家猫都是佛系躺平选手，在一起的日常就是各自发呆，偶尔对视\u2601\ufe0f',
      circleText: '主业发呆、副业睡觉，每天思考猫生大事，不争不抢、佛系过完一生\u2601\ufe0f',
      petComment: '人类在忙什么？算了不关心'
    },
    INFJ: {
      petName: '读心大师猫',
      rare: '珍稀款',
      rareLevel: '8%',
      posterBadge: '\ud83d\udc8e 珍稀款 8%',
      posterTheme: 'lavender',
      posterShort: '心思细腻敏感，温柔共情万物',
      description: '心思细腻到可怕，你开心它凑过来蹭，你难过它安静陪着。不需要你说出口，它的眼神就能读懂你的情绪。安静温柔不喧闹，像一个永远懂你的小灵魂伴侣。这种猫，遇到就是上辈子修来的福。',
      tips: '它对情绪很敏感，尽量不要在它面前大声争吵；多给它安全感，它的信任一旦建立很难被替代；独处时间对它很重要，别一直打扰',
      bestMatch: ['ENFP', 'ENFJ'],
      score: 98,
      tag: '天命绝配',
      matchDesc: '能读心的猫遇上情感丰富的你，不用开口它就知道你今天过得好不好。你的每一种情绪，它都接得住、陪得了。这种灵魂级别的默契，世间难得。',
      matchCircleText: '别人养猫是养宠物，我养的是灵魂伴侣——它总是在我最需要的时候默默出现\ud83e\udd79',
      circleText: '能看懂我的开心和难过，心思细腻又敏感，温柔得让人舍不得大声说话\ud83e\udd79',
      petComment: '你的心事，本喵全知道'
    },
    INFP: {
      petName: '呆萌小天使猫',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'pinkPeach',
      posterShort: '软萌藏着天真，温柔治愈岁月',
      description: '天真无邪的小可爱，活在自己的小世界里。不争宠不抢食，软乎乎地窝在一个角落，用圆圆的眼睛看着这个世界。偶尔被什么吓一跳，炸毛的样子蠢萌到让人想截屏——这大概就是治愈的极致了。',
      tips: '给它一个安全温暖的小窝，是它最大的幸福；轻柔地对待它，它真的很容易受惊；不需要复杂的玩具，一个毛线球就是它的全世界',
      bestMatch: ['ENFJ', 'ESFJ', 'INFJ'],
      score: 95,
      tag: '天命绝配',
      matchDesc: '呆萌小天使需要一个温柔的守护者，而你恰好是那个会轻声细语、会蹲下来慢慢等它的人。它用天真治愈你的疲惫，你用耐心守护它的纯真。',
      matchCircleText: '我家猫是全世界最软萌的小天使，我就是那个每天被治愈的幸运铲屎官\ud83c\udf43',
      circleText: '呆萌天真不谙世事，活在自己的小世界里，软乎乎一只，治愈所有不开心\ud83c\udf43',
      petComment: '小心轻放，本喵很珍贵的'
    }
  },

  lowMatch: {
    score: 72,
    tag: '欢喜冤家',
    matchDesc: '虽然你俩不是教科书式的完美搭档，但猫咪的傲娇加上你的执着，反而碰撞出独特的相处默契。磨合本身就是最好的陪伴。',
    matchCircleText: '虽然我家猫跟我八字不合，但它还是每天准时踩我脸叫我起床，这大概就是爱吧\ud83d\ude3c'
  },

  masterPetiList: [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ]
}

module.exports = catData
