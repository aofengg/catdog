/**
 * 狗狗 PETI 人格测试 - 完整配置数据
 * 纯前端静态数据，ES5 严格兼容
 */

var dogData = {
  petType: 'dog',

  brand: {
    title: '狗狗 PETI 人格测试',
    slogan: '每一只修勾，都有专属暖心性格',
    subtitle: '读懂狗狗的温柔与忠诚',
    shareTitle: '测你家狗狗是什么 PETI 人格？',
    shareDesc: '测出狗狗真实性格，还能和你 PETI 灵魂配对',
    posterCTA: [
      '你家修勾是什么人格？敢不敢测',
      '你和你家狗的默契指数有多高？',
      '不服？让你家修勾也来接受鉴定'
    ]
  },

  dimensions: {
    EI: { positive: '热情社交', negative: '腼腆害羞' },
    TF: { positive: '暖心粘人', negative: '沉稳淡定' },
    JP: { positive: '活泼随性', negative: '听话守矩' },
    NS: { positive: '探索好动', negative: '居家慵懒' }
  },

  questions: [
    {
      id: 1,
      question: '家里来陌生人，狗狗会？',
      optionA: '主动上前摇尾巴亲近',
      optionB: '躲在主人身后警惕害羞',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 2,
      question: '你坐下休息，狗狗会？',
      optionA: '主动贴过来撒娇求抱抱',
      optionB: '趴在一旁自己休息不打扰',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 3,
      question: '看到新玩具/新零食？',
      optionA: '立刻兴奋凑上去探索',
      optionB: '瞟一眼无兴趣继续趴着',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    },
    {
      id: 4,
      question: '到点没及时遛它？',
      optionA: '围着你转圈哼哼催促',
      optionB: '安静等待不吵不闹',
      dimension: 'JP',
      scoreA: 'P',
      scoreB: 'J'
    },
    {
      id: 5,
      question: '你强行抱住撸它？',
      optionA: '乖乖享受温顺不动',
      optionB: '扭动挣脱不愿被束缚',
      dimension: 'JP',
      scoreA: 'J',
      scoreB: 'P'
    },
    {
      id: 6,
      question: '打开大门准备出门？',
      optionA: '兴奋冲出去想往外跑',
      optionB: '谨慎犹豫不敢轻易出门',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 7,
      question: '家里家具、布局重新挪动？',
      optionA: '到处嗅闻巡视新环境',
      optionB: '无所谓依旧躺老位置',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    },
    {
      id: 8,
      question: '做错事被你轻声批评？',
      optionA: '耷拉耳朵委屈低头认错',
      optionB: '若无其事扭头走开',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 9,
      question: '日常作息吃饭遛弯是否固定？',
      optionA: '想玩就玩想睡就睡',
      optionB: '作息超规律定点行事',
      dimension: 'JP',
      scoreA: 'P',
      scoreB: 'J'
    },
    {
      id: 10,
      question: '出门遇到别的小狗？',
      optionA: '热情想上前玩耍社交',
      optionB: '回避远离甚至警惕低吼',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 11,
      question: '你情绪低落不开心？',
      optionA: '安静靠过来安慰陪伴',
      optionB: '自顾自玩耍毫无察觉',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 12,
      question: '换全新狗粮/狗窝？',
      optionA: '很快愿意尝试适应',
      optionB: '挑食抗拒很难适应新东西',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    },
    {
      id: 13,
      question: '在家会不会疯狂跑酷拆家？',
      optionA: '经常疯跑拆家精力旺盛',
      optionB: '安静乖巧从不乱闹腾',
      dimension: 'JP',
      scoreA: 'P',
      scoreB: 'J'
    },
    {
      id: 14,
      question: '更喜欢出门撒欢还是在家躺平？',
      optionA: '超爱出门到处探索',
      optionB: '宁愿在家趴着发呆睡觉',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    },
    {
      id: 15,
      question: '摸肚子、摸敏感部位？',
      optionA: '很享受随便撸不抗拒',
      optionB: '躲闪警惕不让随便碰',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 16,
      question: '去宠物店洗澡/就医？',
      optionA: '虽紧张但能慢慢适应',
      optionB: '极度应激害怕浑身发抖',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 17,
      question: '家里来客吵闹热闹？',
      optionA: '好奇围观适应嘈杂氛围',
      optionB: '躲安静角落不愿凑热闹',
      dimension: 'EI',
      scoreA: 'E',
      scoreB: 'I'
    },
    {
      id: 18,
      question: '有没有拆家咬鞋、乱翻东西习惯？',
      optionA: '调皮爱搞小破坏',
      optionB: '乖巧安分从不闯祸',
      dimension: 'JP',
      scoreA: 'P',
      scoreB: 'J'
    },
    {
      id: 19,
      question: '是粘人跟屁虫还是独立狗狗？',
      optionA: '走哪跟哪超级粘人',
      optionB: '独立独行不用时刻陪伴',
      dimension: 'TF',
      scoreA: 'F',
      scoreB: 'T'
    },
    {
      id: 20,
      question: '去到陌生新环境（搬家/亲戚家）？',
      optionA: '慢慢探索很快适应',
      optionB: '一直躲藏很久不敢放松',
      dimension: 'NS',
      scoreA: 'N',
      scoreB: 'S'
    }
  ],

  personalities: {
    ESTJ: {
      petName: '霸气队长修勾',
      rare: '传说款',
      rareLevel: '3%',
      posterBadge: '\u2b50 传说款 3%',
      posterTheme: 'teaBrown',
      posterShort: '天生肩负守护，沉稳自带威严',
      description: '天生自带护卫队长气场，家里有它在谁都不敢乱来。忠诚守家稳重靠谱，听到门外有动静第一个冲上去。虽然看着严肃，但摸摸头就立刻露出傻笑，反差萌直接拉满。',
      tips: '给它明确的口令训练，它天生爱执行任务；带它巡视小区时让它走前面，满足它的护卫本能；别忘了严肃背后也需要肚皮按摩',
      bestMatch: ['ISFJ', 'INFP', 'ISFP'],
      score: 96,
      tag: '天命绝配',
      matchDesc: '霸气修勾遇上温柔主人，它负责守护你负责被保护。有它在的日子，出门安全感满格，回家被威严护卫迎接，这就是最靠谱的陪伴。',
      matchCircleText: '我家修勾是天生的保镖队长，走在我前面帮我开路，安全感直接拉满\ud83d\ude24',
      circleText: '天生自带护卫气场，顾家又稳重，全家安全感都被它承包了\ud83d\ude24',
      petComment: '有本汪在，谁都别想欺负你'
    },
    ESTP: {
      petName: '社牛快乐修勾',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'warmOrange',
      posterShort: '外向乐天开朗，社交从不怯场',
      description: '出门见谁都摇尾巴，社交天花板本汪。在公园能跟所有狗打成一片，回家精力还剩一半继续拆家。永远活力满满，快乐是真快乐，闯祸也是真闯祸。但看它开心的样子，你也跟着开心了。',
      tips: '每天保证充足的户外时间，不然它会自己找乐子；社交场合不用担心它，它比你更会交朋友；回家后的拆家行为……尽量把贵重物品收高',
      bestMatch: ['ENFP', 'ESFP'],
      score: 95,
      tag: '天命绝配',
      matchDesc: '两个快乐星球的居民终于汇合了！你爱出门它更爱出门，你爱社交它社交天花板。一起逛公园、一起交朋友，快乐从来都是双份的。',
      matchCircleText: '我和我家修勾出门比赛谁先交到新朋友，每次都是它赢\ud83e\udd2a',
      circleText: '出门社交天花板，在家调皮乐天，永远活力满满，生活从不无聊\ud83e\udd2a',
      petComment: '走！出门交朋友去！'
    },
    ESFJ: {
      petName: '甩不掉小尾巴修勾',
      rare: '大众款',
      rareLevel: '25%',
      posterBadge: '\ud83e\uddf8 大众款 25%',
      posterTheme: 'milkWhite',
      posterShort: '走到哪跟到哪，甩不掉的小尾巴',
      description: '走到哪跟到哪的贴身小尾巴，你上厕所它在门口等，你做饭它在脚边守着，你洗澡它在浴室门口趴着。粘人程度堪称一流，分离焦虑重灾区。但正因为这样，你回家时它摇到整个身体都在晃的样子，才是一天中最治愈的瞬间。',
      tips: '出门前给它留一件你的旧衣服，有你的气味它会安心；回家后要第一时间给它打招呼；训练适度独处，但不要冷落它',
      bestMatch: ['INTJ', 'INTP'],
      score: 93,
      tag: '神仙合拍',
      matchDesc: '社恐主人遇上贴心跟班修勾，它用无条件的陪伴慢慢融化你的心墙。你不爱出门？没关系，它趴在你脚边就很开心。',
      matchCircleText: '我是社恐本人，但我家修勾每天用蹭腿大法逼我营业，根本拒绝不了\ud83d\udc36\u2764\ufe0f',
      circleText: '粘人忠诚又温柔，天生贴身小跟班，治愈所有坏情绪\ud83d\udc36\u2764\ufe0f',
      petComment: '你去哪我跟哪，别想甩掉我'
    },
    ESFP: {
      petName: '卖萌担当修勾',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'pinkPeach',
      posterShort: '可爱自带光环，元气温暖日常',
      description: '长了一张让人毫无抵抗力的脸，会用眼神杀向你要零食，会在你面前翻肚皮求摸摸。走到哪都是焦点，出门散步路人纷纷拍照。靠可爱吃饭这件事，它做到了极致。',
      tips: '定期打理毛发，颜值选手要保持竞争力；多带它出门社交，它享受被夸奖的感觉；拍照时它会配合，试试跟它对视',
      bestMatch: ['ESFP', 'ENFJ', 'ISFJ'],
      score: 95,
      tag: '天命绝配',
      matchDesc: '你对可爱的东西毫无抵抗力，而它就是可爱本身。每天一起出门散步就是你最好的朋友圈素材，每次回头看它都觉得"我怎么这么幸运"。',
      matchCircleText: '有了我家修勾之后朋友圈点赞翻了三倍，颜值就是生产力\ud83e\udd70',
      circleText: '长相讨喜性格活泼，走到哪都是焦点，靠可爱圈粉所有人\ud83e\udd70',
      petComment: '看我这么可爱，零食呢？'
    },
    ISTJ: {
      petName: '按时打卡修勾',
      rare: '珍稀款',
      rareLevel: '8%',
      posterBadge: '\ud83d\udc8e 珍稀款 8%',
      posterTheme: 'teaBrown',
      posterShort: '比你还自律，生物钟精准到秒',
      description: '全家最自律的存在——早上7:01叫你起床（比闹钟还准），下午5:30准时站在门口暗示该遛弯了。定点吃饭定点散步，作息比你还规律。安静本分到你偶尔会忘记家里还有只狗，但它从不忘记每一个和你有关的时间点。',
      tips: '保持固定的作息和散步路线，它喜欢规律；迟到五分钟它真的会焦虑；不需要花哨的训练，基础口令一遍记住，是天生的优等生',
      bestMatch: ['ISTJ', 'ESTJ'],
      score: 96,
      tag: '天命绝配',
      matchDesc: '两个自律打卡人的日常：定点起床、定点散步、定点各做各的事。不需要惊喜，日复一日的同步作息就是最长情的告白。',
      matchCircleText: '我和我家修勾作息一模一样，7点起床5点半遛弯，比情侣还同步\ud83d\ude0c',
      circleText: '生物钟精准到秒，作息比主人还自律，安静稳重不闹腾\ud83d\ude0c',
      petComment: '定时吃饭遛弯，不接受变动'
    },
    ISTP: {
      petName: '独立酷盖修勾',
      rare: '传说款',
      rareLevel: '3%',
      posterBadge: '\u2b50 传说款 3%',
      posterTheme: 'coolGray',
      posterShort: '随性自有态度，独立不失温柔',
      description: '不粘人、不讨好、有自己的节奏和态度。你叫它它看你一眼，可能来也可能不来——取决于心情。独立得不像一般修勾，但偶尔也会安静地躺在你脚边，用最酷的方式说"我在呢"。',
      tips: '不要强迫它做不想做的事；给它独处空间，它会更信任你；它主动靠近你时要珍惜，酷盖的温柔很稀有',
      bestMatch: ['ISTP', 'INTJ', 'ENTJ'],
      score: 97,
      tag: '天命绝配',
      matchDesc: '独立的你遇上独立的修勾，完美。不需要时刻黏在一起，你忙你的它趴它的，但心里都知道对方在。偶尔它主动靠过来的瞬间，比任何热烈的示好都珍贵。',
      matchCircleText: '我和我家修勾是同款酷盖——各自独立，但偶尔对视的那一秒全是温柔\ud83d\ude0e',
      circleText: '独立有主见，不刻意粘人，洒脱自在，有自己的小坚持\ud83d\ude0e',
      petComment: '本汪今天心情好，允许你摸一下'
    },
    ISFJ: {
      petName: '死心眼等门修勾',
      rare: '大众款',
      rareLevel: '25%',
      posterBadge: '\ud83e\uddf8 大众款 25%',
      posterTheme: 'milkWhite',
      posterShort: '认准你就是一辈子，等你是每天的头等大事',
      description: '认定你就是一辈子的修勾，你出门它趴在门口等，你加班它等到打瞌睡也不挪窝。温顺腼腆但内心无比坚定——下雨天等你回来、生病时守在床边、你哭的时候默默把头搁在你腿上。它不会说话，但比谁都死心眼。',
      tips: '出门前跟它说一句"等我回来"，它真的在等；回家第一件事先理它，不然它会委屈到哼唧；它的忠诚是天生的，不需要用零食换',
      bestMatch: ['ENFP', 'ESFJ', 'ISTJ'],
      score: 94,
      tag: '神仙合拍',
      matchDesc: '它会在你出门前的眼神里写满不舍，在你回来时用全身摇摆说"你终于回来了"。不需要复杂的互动，它的忠诚和等待就是最纯粹的爱。',
      matchCircleText: '我家修勾每天在门口等我回家，那个摇尾巴的样子，是我一天中最温暖的画面\ud83e\udd7a',
      circleText: '死心眼认准主人，每天趴门口等我回家，那股子执着让人心疼\ud83e\udd7a',
      petComment: '等你回来，是我每天最重要的事'
    },
    ISFP: {
      petName: '佛系宅家修勾',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'mintGreen',
      posterShort: '偏爱居家静好，温柔慢度时光',
      description: '别的修勾出门撒欢，它更想窝在家里晒太阳。不爱跑酷不爱闹，最大的爱好是找个舒服的地方趴着放空。温柔安静得像一团会呼吸的毛绒玩具，居家治愈感拉满。',
      tips: '不需要高强度运动，在小区慢慢遛就够了；给它准备一个晒得到太阳的软垫；安静的陪伴对它来说就是最好的爱',
      bestMatch: ['INFP', 'ISFP'],
      score: 93,
      tag: '神仙合拍',
      matchDesc: '一人一修勾，各自佛系，各自舒服。你在沙发刷剧，它在旁边打盹，阳光从窗户照进来，这就是最理想的居家时光。',
      matchCircleText: '我和我家修勾的最佳状态：各自躺平，互不打扰，偶尔对视一笑就很好\ud83c\udf3f',
      circleText: '不爱疯跑不爱闹，喜欢安静居家发呆，温柔佛系过狗生\ud83c\udf3f',
      petComment: '出门？不了，我选择躺平'
    },
    ENTJ: {
      petName: '聪明大佬修勾',
      rare: '传说款',
      rareLevel: '3%',
      posterBadge: '\u2b50 传说款 3%',
      posterTheme: 'coolGray',
      posterShort: '自带领袖格局，聪慧有分寸感',
      description: '聪明到你怀疑它是不是偷偷看过训练教程。学口令一遍就会，看你眼色行事从不出错。表面乖巧听话，实际上全家的地位排序它心里门儿清。智商在线加情商在线，修勾界的卷王。',
      tips: '给它有挑战性的训练任务，太简单的它不屑；别以为你能骗它，它比你想象中精；聪明修勾需要精神刺激，益智玩具必备',
      bestMatch: ['ENTJ', 'ISTP', 'ESTJ'],
      score: 96,
      tag: '天命绝配',
      matchDesc: '聪明人遇上聪明修勾，日常就是互相斗智。你教它新技能它一遍就会，你藏零食它三秒找到。虽然经常被它的智商碾压，但这种势均力敌的感觉也挺有意思。',
      matchCircleText: '我以为我在训练我家修勾，后来发现是它在训练我——大佬就是大佬\ud83d\ude24',
      circleText: '气场强、有主见，懂事又聪明，悄悄拿捏家里地位\ud83d\ude24',
      petComment: '你以为你在训练我？天真'
    },
    ENTP: {
      petName: '戏精捣蛋修勾',
      rare: '珍稀款',
      rareLevel: '8%',
      posterBadge: '\ud83d\udc8e 珍稀款 8%',
      posterTheme: 'coolGray',
      posterShort: '好奇奔赴山海，调皮不失可爱',
      description: '好奇心爆棚的小戏精，每天都在上演不同的剧本。今天翻垃圾桶明天扒沙发，闯完祸还一脸无辜地看你，演技堪称影帝。精力旺盛到让你怀疑它是不是接了电源，但生活有它确实从不无聊。',
      tips: '易碎品、垃圾桶、拖鞋——能收的全收起来；给它足够的探索空间和玩具轮换；闯祸后认真批评，但别太凶，戏精会记仇',
      bestMatch: ['ENTP', 'INTP', 'ESTP'],
      score: 95,
      tag: '天命绝配',
      matchDesc: '戏精主人遇上戏精修勾，家里每天都是即兴表演现场。它翻垃圾桶你假装生气，它装无辜你假装心软，来来回回就是一出双人喜剧。',
      matchCircleText: '我和我家修勾每天都在上演"捣蛋-被抓-装无辜-原谅"的无限循环\ud83e\udd2f',
      circleText: '好奇心拉满，精力旺盛爱探索，每天都有新花样，生活充满惊喜\ud83e\udd2f',
      petComment: '今天的拆家计划已排满'
    },
    ENFJ: {
      petName: '氛围感暖男修勾',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'milkWhite',
      posterShort: '情商在线，全家氛围组组长',
      description: '对所有人都温柔，社交场合进退得体，在家暖心治愈。你难过时它默默蹭过来，你开心时它跟着摇尾巴。情商高到你怀疑它是不是上辈子做过心理咨询师——家里谁情绪不好它第一个发现，然后默默去蹭。',
      tips: '多带它见不同的人和狗，社交是它的快乐源泉；记得也给它情绪价值，暖男也需要被暖；它很在意你的态度，尽量多给正面反馈',
      bestMatch: ['INFJ', 'ESFP'],
      score: 94,
      tag: '神仙合拍',
      matchDesc: '暖心的你遇上暖心的修勾，这个家变成了温柔的避风港。你照顾它它也照顾你，你治愈世界它治愈你。双向奔赴的温柔，就是最好的生活。',
      matchCircleText: '温柔的人养了温柔的修勾，我们互相治愈的日子真的太甜了\u2600\ufe0f',
      circleText: '情商在线、温柔到骨子里，全家的氛围担当，有它在家里永远暖暖的\u2600\ufe0f',
      petComment: '交给本汪，包你今天心情好'
    },
    ENFP: {
      petName: '元气满满修勾',
      rare: '大众款',
      rareLevel: '25%',
      posterBadge: '\ud83e\uddf8 大众款 25%',
      posterTheme: 'warmOrange',
      posterShort: '元气洒满日常，活泼治愈人心',
      description: '精力值永远显示100%的快乐小马达。出门撒欢跑不停，回家继续蹦蹦跳跳。见谁都热情，看什么都新鲜，整个修勾就是一团移动的快乐能量。虽然偶尔闹腾到崩溃，但没有它的日子真的会无聊。',
      tips: '每天至少两次高强度户外活动，消耗它的核能；家里备足玩具并定期更换，保持新鲜感；它的快乐很有感染力，跟着它一起疯就对了',
      bestMatch: ['INFJ', 'INTJ', 'ESTP'],
      score: 97,
      tag: '天命绝配',
      matchDesc: '元气修勾像一团移动的快乐能量，直接闯进了你安静的世界。你本来不爱出门，自从有了它天天被拽出去散步，结果发现户外也挺好的。它改变了你的生活方式，而且是往更快乐的方向。',
      matchCircleText: '自从养了这只元气修勾，我的社恐好了运动量上去了心情也变好了，这是什么神仙狗\ud83e\udd73',
      circleText: '天生活泼好动，元气永远用不完，给家里带来满满热闹与欢乐\ud83e\udd73',
      petComment: '快快快！出去玩！现在！马上！'
    },
    INTJ: {
      petName: '深沉学霸修勾',
      rare: '传说款',
      rareLevel: '3%',
      posterBadge: '\u2b50 传说款 3%',
      posterTheme: 'lavender',
      posterShort: '沉静自带睿智，内敛自有气场',
      description: '安静内敛的思考者，不爱凑热闹，喜欢独自趴在角落观察世界。眼神深沉得像在写论文，安静得让你忘记它的存在。但当它用那双懂事的眼睛看你时，你会觉得它什么都明白，只是选择了沉默。',
      tips: '不要强迫它社交，独处是它充电的方式；给它一个固定的安静角落；跟它对视时多说几句话，它在认真听',
      bestMatch: ['ENFP', 'ENTP'],
      score: 96,
      tag: '天命绝配',
      matchDesc: '安静的它懂你的安静，你不需要在它面前假装外向。你对着电脑工作到深夜，它就安静地趴在脚边，不吵不闹。那种"你做你的，我陪着你"的默契，是最高级的陪伴。',
      matchCircleText: '我家修勾是INTJ，它那双深沉的眼睛看我时，我觉得它比我还成熟\ud83d\udd2e',
      circleText: '性格沉静内敛，心思深沉懂事，安静看着你，仿佛什么都懂\ud83d\udd2e',
      petComment: '本汪在思考，请勿打扰'
    },
    INTP: {
      petName: '摆烂躺平修勾',
      rare: '珍稀款',
      rareLevel: '8%',
      posterBadge: '\ud83d\udc8e 珍稀款 8%',
      posterTheme: 'mintGreen',
      posterShort: '闲来无事躺平，佛系安度余生',
      description: '把"躺平"刻进了DNA的修勾，出门五分钟就想回家，回家直奔最软的垫子。对运动毫无兴趣，对零食兴趣一般般，唯一热爱的就是晒太阳和睡觉。别担心它是不是不开心——它只是很会享受生活。',
      tips: '适量散步就好，别逼它长跑；准备一个超软的狗窝，是它最大的快乐；它的佛系不需要纠正，随它去吧',
      bestMatch: ['INTP', 'INFP'],
      score: 93,
      tag: '神仙合拍',
      matchDesc: '两个躺平星人的同居日常：你刷手机它打盹，你点外卖它闻味道，你困了它早困了。零内耗零争吵，世界上最和平的人狗关系。',
      matchCircleText: '我和我家修勾的共同爱好：躺着。区别是它比我更擅长，而且完全不焦虑\u2601\ufe0f',
      circleText: '不爱折腾不爱闹，只想躺平晒太阳，佛系度日，自在随心\u2601\ufe0f',
      petComment: '动？不存在的，选择原地躺'
    },
    INFJ: {
      petName: '温柔读心修勾',
      rare: '珍稀款',
      rareLevel: '8%',
      posterBadge: '\ud83d\udc8e 珍稀款 8%',
      posterTheme: 'lavender',
      posterShort: '温柔善解人意，共情温暖人心',
      description: '心思细腻到让人心疼的修勾，能精准感知你的每一丝情绪。你加班到深夜它安静守在脚边，你哭的时候它把脑袋搁在你膝盖上。温柔得像一颗暖暖的小太阳，不说一句话却比谁都懂你的心。',
      tips: '尽量不在它面前有负面情绪爆发，它会跟着焦虑；多给它安全感和稳定的环境；它的温柔需要被看见，记得常常夸它',
      bestMatch: ['ENFP', 'ENFJ'],
      score: 98,
      tag: '天命绝配',
      matchDesc: '它能感知你说不出口的每一种疲惫，在你最需要的时候把头轻轻搁在你膝盖上。不需要解释，它都懂。这种跨物种的心灵感应，是养修勾最奢侈的礼物。',
      matchCircleText: '我不开心的时候我家修勾总是第一个发现，它不说话就蹭蹭我，眼泪瞬间掉下来\ud83e\udd7a',
      circleText: '心思细腻温柔，很会感知主人情绪，贴心又懂事，治愈感拉满\ud83e\udd7a',
      petComment: '你累了对吧？靠过来吧'
    },
    INFP: {
      petName: '软萌治愈修勾',
      rare: '独特款',
      rareLevel: '15%',
      posterBadge: '\u2728 独特款 15%',
      posterTheme: 'pinkPeach',
      posterShort: '软萌治愈人间，温柔温暖岁月',
      description: '软乎乎的小可爱，性格单纯天真，对世界充满好奇又有点胆小。遇到新事物先躲在你身后偷看，确认安全了才慢慢探出头。它的存在本身就是治愈——不需要做什么，光看着它就觉得世界变温柔了。',
      tips: '带它见新事物时要有耐心，不要催促；温柔的语气是打开它心门的钥匙；给它足够的安全感，它会慢慢变勇敢',
      bestMatch: ['ENFJ', 'ESFJ', 'INFJ'],
      score: 95,
      tag: '天命绝配',
      matchDesc: '软萌修勾遇上温柔主人，整个画面就是一幅治愈系水彩画。你蹲下来它就趴你腿上，你说话它就歪头看你。世界可能很复杂，但你们之间的关系很简单——就是温柔。',
      matchCircleText: '我家修勾是世界上最软萌的存在，每天看着它我都觉得生活没那么难\ud83c\udf43',
      circleText: '性格单纯软乎乎，天真又温柔，安静陪伴，治愈所有生活疲惫\ud83c\udf43',
      petComment: '世界有点吓人，但有你就不怕了'
    }
  },

  lowMatch: {
    score: 72,
    tag: '欢喜冤家',
    matchDesc: '性格虽然不太一样，但修勾最大的优点就是——不管你是什么 PETI，它都无条件爱你。磨合期可能闹点小别扭，但日子越过越甜。',
    matchCircleText: '测出来跟我家修勾不太配，但它看我的眼神分明写着"我不管我就要跟你"\ud83e\udd7a'
  },

  masterPetiList: [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ]
}

module.exports = dogData
