/**
 * 猫咪版 - 它眼中的你 · 人宠关系测试
 * 配置文件：品牌 + 维度 + 15题+5彩蛋 + 16 种关系结果
 * 主题：猫正在测试你是哪种人类
 */

var catData = {
  petType: 'cat',
  brand: {
    productName: '它眼中的你',
    title: '猫咪版 · 人宠关系测试',
    slogan: '原来你在它心里，是这样的存在',
    resultHeader: '猫眼鉴定结果',
    shareTitle: '我在猫主子眼里竟然是这样的！你呢？',
    shareDesc: '测测你在它心里到底是什么角色',
    posterCTA: [
      '我测出来是"{title}"，你呢？',
      '敢不敢看看，你在你家猫眼里到底值几个罐头？',
      '快来测测，你家主子把你当饭票、室友，还是全世界？',
      '发给你养猫的朋友，看看谁才是最惨猫奴'
    ]
  },
  dimensions: {
    SF: { positive: '温暖港湾', negative: '自由灵魂' },
    HL: { positive: '浓情蜜意', negative: '清淡自在' },
    CP: { positive: '宠溺家长', negative: '平等伙伴' },
    DR: { positive: '探索冒险', negative: '安稳日常' }
  },
  midFeedback: [
    { after: 3, text: '猫猫已记录：这个人类很容易心软。' },
    { after: 6, text: '危险提示：你可能已经被猫成功驯化。' },
    { after: 9, text: '猫咪审查进度 60%：它正在重新评估你的家庭地位。' },
    { after: 12, text: '还差几题，解锁你在它心里的真实身份。' },
    { after: 15, text: '猫咪吐槽环节开启——它有话要说。' }
  ],
  questions: [
    // === SF + HL 配对（3 题）：依恋与分离 ===
    {
      id: 1,
      scene: '你出门前，猫堵在门口盯着你，像在审查你的请假申请——',
      dimensions: 'SF_HL',
      options: [
        { text: '蹲下来汇报行程："我很快回来，罐头不变"', score: 'SH' },
        { text: '摸摸它的头："家里交给你了"', score: 'SL' },
        { text: '关门前回头三次，自己先舍不得', score: 'FH' },
        { text: '正常出门，彼此都有自己的安排', score: 'FL' }
      ]
    },
    {
      id: 2,
      scene: '深夜你还在忙，猫一屁股坐到键盘旁边——',
      dimensions: 'SF_HL',
      options: [
        { text: '立刻停工：行，今天真正的甲方是你', score: 'SH' },
        { text: '一手工作一手摸，主打两边都不耽误', score: 'SL' },
        { text: '抱到腿上办公，让它当小监工', score: 'FH' },
        { text: '随它蹭，只要别真的踩键盘', score: 'FL' }
      ]
    },
    {
      id: 3,
      scene: '回家开门，它只赏了你一眼，又慢慢转头——',
      dimensions: 'SF_HL',
      options: [
        { text: '冲过去热情汇报："我回来了！想没想我？"', score: 'SH' },
        { text: '放下东西，坐在旁边等它自己过来', score: 'SL' },
        { text: '叫它名字逗它，非要得到一点回应', score: 'FH' },
        { text: '对视点头：懂，今天也很高冷', score: 'FL' }
      ]
    },
    // === SF + CP 配对（3 题）：规则与边界 ===
    {
      id: 4,
      scene: '猫把杯子推到桌边，像在测试你的人类底线——',
      dimensions: 'SF_CP',
      options: [
        { text: '温柔但坚定地收走："这个不可以"', score: 'SC' },
        { text: '赶紧换个安全玩具，转移它的注意力', score: 'SP' },
        { text: '先拍下这副欠揍又可爱的样子', score: 'FC' },
        { text: '只要没危险，就当它在做实验', score: 'FP' }
      ]
    },
    {
      id: 5,
      scene: '客人来了，猫躲在角落低吼，像在说"谁允许他进我家"——',
      dimensions: 'SF_CP',
      options: [
        { text: '先把猫安置到安全房间，让它别紧张', score: 'SC' },
        { text: '认真叮嘱客人：别盯它、别摸它、别追它', score: 'SP' },
        { text: '忍不住想介绍："这是我家宝宝，它其实很乖"', score: 'FC' },
        { text: '远远观察，让猫自己决定要不要露面', score: 'FP' }
      ]
    },
    // === HL + CP 配对（2 题）：情绪回应方式 ===
    {
      id: 6,
      scene: '猫吃完药后，用看叛徒的眼神看着你——',
      dimensions: 'HL_CP',
      options: [
        { text: '立刻哄它，抱着解释半天', score: 'HC' },
        { text: '先完成治疗，再慢慢修复感情', score: 'LC' },
        { text: '用零食补偿它，假装刚才什么都没发生', score: 'HP' },
        { text: '心疼但清醒：该做的还是得做', score: 'LP' }
      ]
    },
    // === SF + CP 配对（第3题）===
    {
      id: 7,
      scene: '猫跳上不该去的地方，还回头看你一眼——',
      dimensions: 'SF_CP',
      options: [
        { text: '抱下来，认真告诉它这里不行', score: 'SC' },
        { text: '给它换一个更高、更安全的位置', score: 'SP' },
        { text: '先笑出声，再假装严肃处理', score: 'FC' },
        { text: '只要不危险，家规可以为它改', score: 'FP' }
      ]
    },
    // === SF + DR 配对（2 题）：环境与探索 ===
    {
      id: 8,
      scene: '猫坐在窗边看外面，你突然觉得它像有心事——',
      dimensions: 'SF_DR',
      options: [
        { text: '陪它看一会儿，像两个人一起发呆', score: 'SR' },
        { text: '检查窗户安全，让它安心看', score: 'SD' },
        { text: '给它布置一个专属观景位', score: 'FD' },
        { text: '不打扰，它也有自己的世界', score: 'FR' }
      ]
    },
    {
      id: 9,
      scene: '搬到新家，猫缩在角落，像一团失联的毛球——',
      dimensions: 'SF_DR',
      options: [
        { text: '坐在附近陪着，等它先靠近', score: 'SD' },
        { text: '把旧窝、旧碗、旧毯子都摆好', score: 'SR' },
        { text: '陪它一个房间一个房间巡视新领地', score: 'FD' },
        { text: '不追不哄，让它自己慢慢探索', score: 'FR' }
      ]
    },
    // === HL + DR 配对（3 题）：投入与表达 ===
    {
      id: 10,
      scene: '你精挑细选的新玩具，猫看都不看——',
      dimensions: 'HL_DR',
      options: [
        { text: '亲自示范，像个卖力的玩具销售', score: 'HD' },
        { text: '收起来，过几天换个时机再拿出来', score: 'LD' },
        { text: '加点猫薄荷/零食，试图让它回心转意', score: 'HR' },
        { text: '接受现实：猫喜欢包装盒胜过一切', score: 'LR' }
      ]
    },
    // === HL + CP 配对（第2题）===
    {
      id: 11,
      scene: '你在沙发看剧，猫跳上来踩奶，像突然发放亲密通行证——',
      dimensions: 'HL_CP',
      options: [
        { text: '激动到小声尖叫："宝宝终于爱我了！"', score: 'HC' },
        { text: '不敢乱动，怕打断它这一刻的信任', score: 'LC' },
        { text: '轻轻摸它，对它说："继续踩，我在呢"', score: 'HP' },
        { text: '继续看剧，熟练地给它当人肉垫子', score: 'LP' }
      ]
    },
    {
      id: 12,
      scene: '猫做了件萌到犯规的事，你第一反应是——',
      dimensions: 'HL_DR',
      options: [
        { text: '抱住亲一口：这谁受得了', score: 'HR' },
        { text: '偷偷拍下，不惊扰它', score: 'LD' },
        { text: '发给朋友：快看我家这个小东西', score: 'HD' },
        { text: '笑一下收进心里，继续过日子', score: 'LR' }
      ]
    },
    {
      id: 13,
      scene: '你情绪很低，猫刚好蹭过来——',
      dimensions: 'HL_DR',
      options: [
        { text: '把它搂住："还好有你"', score: 'HR' },
        { text: '轻轻摸它，安静地被治愈一下', score: 'LR' },
        { text: '跟它絮絮叨叨讲今天发生了什么', score: 'HD' },
        { text: '感受一下温度，然后各自待着', score: 'LD' }
      ]
    },
    // === CP + DR 配对（2 题）：照护风格 ===
    {
      id: 14,
      scene: '你准备给猫换一款新猫粮/新用品——',
      dimensions: 'CP_DR',
      options: [
        { text: '查成分、看测评，像给孩子选学校', score: 'CD' },
        { text: '先买小包装试用，观察它的状态', score: 'CR' },
        { text: '先看它愿不愿意，猫不买账就换', score: 'PD' },
        { text: '口碑过关就行，不搞太复杂', score: 'PR' }
      ]
    },
    {
      id: 15,
      scene: '你想给猫拍一张能发朋友圈的照片——',
      dimensions: 'CP_DR',
      options: [
        { text: '用逗猫棒引导角度，拍出杂志封面', score: 'CD' },
        { text: '等它自然发光，偷偷抓拍', score: 'PR' },
        { text: '道具、背景、光线全部安排上', score: 'CR' },
        { text: '随手一拍，糊了也可爱', score: 'PD' }
      ]
    },
    // === 彩蛋题（5 题）：猫咪脑洞题 ===
    {
      id: 16,
      scene: '如果猫突然会给你发微信，它第一句大概率是——',
      dimensions: 'SF_HL',
      bonus: true,
      options: [
        { text: '人类，饭呢？', score: 'FL' },
        { text: '你今天身上有别的猫味', score: 'SH' },
        { text: '别吵，我正在思考宇宙', score: 'FH' },
        { text: '刚才不理你，不代表我不爱你', score: 'SL' }
      ]
    },
    {
      id: 17,
      scene: '如果猫偷偷给你写年度评价，它会写——',
      dimensions: 'CP_DR',
      bonus: true,
      options: [
        { text: '此人情绪稳定，适合长期饲养', score: 'CR' },
        { text: '服务态度良好，但开罐头速度有待提升', score: 'CD' },
        { text: '过度热情，经常侵犯本喵私人空间', score: 'PD' },
        { text: '已被驯化成功，可继续观察', score: 'PR' }
      ]
    },
    {
      id: 18,
      scene: '朋友说你太宠猫了，你的真实想法是——',
      dimensions: 'SF_CP',
      bonus: true,
      options: [
        { text: '这还叫宠？我已经很克制了', score: 'SC' },
        { text: '它就这么小一只，我不宠谁宠', score: 'FC' },
        { text: '我知道，但它真的很会拿捏我', score: 'SP' },
        { text: '没办法，它才是这个家的房东', score: 'FP' }
      ]
    },
    {
      id: 19,
      scene: '如果猫有一份隐藏职业，你觉得它最像——',
      dimensions: 'SF_DR',
      bonus: true,
      options: [
        { text: '情绪治疗师', score: 'SD' },
        { text: '家庭监察员', score: 'SR' },
        { text: '夜间跑酷运动员', score: 'FD' },
        { text: '罐头质量检验员', score: 'FR' }
      ]
    },
    {
      id: 20,
      scene: '如果猫能给你颁一个奖，它会颁给你——',
      dimensions: 'HL_DR',
      bonus: true,
      options: [
        { text: '最好骗人类奖', score: 'HD' },
        { text: '最会开罐头奖', score: 'LR' },
        { text: '最适合当猫床奖', score: 'LD' },
        { text: '最离不开本喵奖', score: 'HR' }
      ]
    }
  ],
  relationships: {
    SHCD: {
      title: '重度被拿捏型人类',
      subtitle: '猫界认证：一喵一令，人类秒应',
      goldQuote: '它还没喵，你已经心软了。',
      subQuote: '在它面前，你的原则保质期从不超过三秒。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['被驯化本人', '有求必应', '猫咪唯一'],
      emotionTag: '羡慕型',
      posterTheme: 'warmOrange',
      indices: [
        { label: '被拿捏指数', value: 99 },
        { label: '情感浓度', value: 95 },
        { label: '操心程度', value: 90 },
        { label: '探索欲望', value: 80 }
      ],
      petComment: '本喵略施小计，你立刻缴械投降。我只要蹭一下，你今天的全部计划就得为我改。',
      summary: '你们是典型的"它负责撒娇，你负责投降"型关系。',
      description: '它知道你会接住它的每一次撒娇和依赖。你总说要有原则，但一看到它黏人卖萌，就立刻心软。在它这里，你不只是照顾者，更是被偏爱的唯一。',
      keywords: ['被驯化', '甘愿臣服', '全方位宠爱'],
      tips: [
        '偶尔给自己设个边界吧，你不用24小时待命当我的罐头机',
        '我黏你是因为信任你，你偶尔忙自己的事我也能适应',
        '继续多抱多回应我，一个撒娇一个投降的关系其实很甜'
      ],
      circleText: '测完发现我是"重度被拿捏型人类"——它还没喵我就已经心软了，这是被驯化了吧😭 #它眼中的你 #人宠关系测试PETI'
    },
    SHCR: {
      title: '猫咪安全基地型人类',
      subtitle: '猫界认证：稳定输出，从不掉线',
      goldQuote: '你什么都没做，但它就是不走。',
      subQuote: '对它来说，你在，就是世界上最确定的事。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['恒温陪伴', '细节控', '仪式感大师'],
      emotionTag: '治愈型',
      posterTheme: 'milkWhite',
      indices: [
        { label: '被拿捏指数', value: 80 },
        { label: '情感浓度', value: 75 },
        { label: '操心程度', value: 85 },
        { label: '安稳指数', value: 95 }
      ],
      petComment: '叫一声就来，不叫也来，不叫都不走。续约审批通过——薪资不变，工作量视心情增加。',
      summary: '你们是典型的"什么都不说，但什么都知道"型关系。',
      description: '你是它生活里最稳定的背景光。准时喂饭、固定撸猫、习惯性跟它说话。你不做惊天动地的事，但你的存在本身就是它最大的安心来源。',
      keywords: ['规律感', '安全港', '静默守候'],
      tips: [
        '你的规律就是我的安全感，继续保持你的节奏就好',
        '偶尔给我一个小惊喜，比如换个新口味罐头',
        '我总待在你触手可及的地方——那就是我在说需要你'
      ],
      circleText: '我是"猫咪安全基地型人类"：什么都没做，但它就是不走。原来我在猫眼里是最安心的存在🥺 #它眼中的你 #人宠关系测试PETI'
    },
    SHPD: {
      title: '双向治愈型人类',
      subtitle: '猫界认证：你治愈它的高冷，它治愈你的疲惫',
      goldQuote: '你治愈它的怕，它治愈你的累。',
      subQuote: '不是谁需要谁，是刚好一起，什么都不怕了。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['灵魂共振', '冒险搭子', '互相撑腰'],
      emotionTag: '勇敢型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '被拿捏指数', value: 75 },
        { label: '情感浓度', value: 85 },
        { label: '伙伴默契', value: 92 },
        { label: '探索欲望', value: 90 }
      ],
      petComment: '跟你一起发疯的时候，整条街的猫都羡慕——虽然我不出门，但气场已经到了。',
      summary: '你们是典型的"一起发疯，一起治愈"型关系。',
      description: '你给它的安全感不是保护性的，而是"有你在我什么都不怕"的勇气。你们像最佳搭档，一起尝试新东西，只是你恰好比它多会开门和开罐头。',
      keywords: ['双向治愈', '平等搭子', '互相撑腰'],
      tips: [
        '继续带我探索新鲜事物，我们的默契就是这样建起来的',
        '我胆子大全因为知道背后有你兜底',
        '偶尔也让我带你冒险——比如跟着我走一次我选的路'
      ],
      circleText: '居然测出“双向治愈型人类”！我治愈它的怕，它治愈我的累——这搭配也太甜了吧 #它眼中的你 #人宠关系测试PETI'
    },
    SHPR: {
      title: '猫咪专属人肉垫型',
      subtitle: '猫界认证：躺平即正义，你就是最佳猫床',
      goldQuote: '你不说话，它也不走。',
      subQuote: '你们最深的告白，就是安静地待在一起。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['人形猫床', '零压力', '天生合拍'],
      emotionTag: '温暖型',
      posterTheme: 'pinkPeach',
      indices: [
        { label: '被拿捏指数', value: 82 },
        { label: '情感浓度', value: 70 },
        { label: '伙伴默契', value: 88 },
        { label: '安稳指数', value: 90 }
      ],
      petComment: '不是所有人类都配当我的垫子——体温合格，不乱动，呼吸声白噪音级别。可以续约。',
      summary: '你们是典型的"安静待在一起，比什么都好"型关系。',
      description: '你和它天生合拍——不需要刻意经营就能舒服地待在一起。你不控制它也不忽略它，距离感刚刚好。在它眼里你是温暖可靠、随时能依赖又没压力的存在。',
      keywords: ['天然合拍', '无压力', '恰到好处'],
      tips: [
        '我们的关系已经很好了，最大的建议就是保持现状',
        '我恰好出现在你需要的时候不是巧合——那是我的方式',
        '享受这种什么都不用做也很好的默契吧'
      ],
      circleText: '我是"猫咪专属人肉垫型"哈哈哈 不说话它也不走，安静待在一起比什么都好 #它眼中的你 #人宠关系测试PETI'
    },
    SLCD: {
      title: '操心型猫家长',
      subtitle: '猫界认证：嘴硬心软，内心戏比电视剧还多',
      goldQuote: '嘴上说不惯着，手已经在开罐头了。',
      subQuote: '你从不说爱，但它的一切永远是最好的那款。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['嘴硬心软', '暗地操心', '口是心非'],
      emotionTag: '深情型',
      posterTheme: 'coolGray',
      indices: [
        { label: '被拿捏指数', value: 65 },
        { label: '情感浓度', value: 60 },
        { label: '操心程度', value: 98 },
        { label: '探索欲望', value: 75 }
      ],
      petComment: '嘴上说"别惯着你"，猫粮倒得比谁都快。半夜偷偷来摸我看我冷不冷——以为我不知道？',
      summary: '你们是典型的"嘴上说不在意，实际操碎了心"型关系。',
      description: '你的爱全藏在行动里——精挑细选猫粮、按时清理猫砂、它生病比谁都急。你们有种无声默契：不需要表演亲密，但彼此心里都清楚对方的位置。',
      keywords: ['嘴硬心软', '无声守护', '深藏不露'],
      tips: [
        '不用总是嘴硬，偶尔说出来也没关系——我听得懂',
        '你的操心我全收到了，也请放过你自己一点',
        '我在门口等你的时候，就是在用同样的方式操心你'
      ],
      circleText: '测出来是"操心型猫家长"——嘴上说不惯着，手已经在开罐头了，被精准拿捏😤 #它眼中的你 #人宠关系测试PETI'
    },
    SLCR: {
      title: '猫咪定时暖气型人类',
      subtitle: '猫界认证：像暖气片一样稳定输出，从不高调',
      goldQuote: '你不热烈，但从不缺席。',
      subQuote: '你像一台不会坏的暖气片，不炫耀温度但从不降温。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['定时定量', '靠谱本人', '恒温输出'],
      emotionTag: '踏实型',
      posterTheme: 'teaBrown',
      indices: [
        { label: '被拿捏指数', value: 60 },
        { label: '情感浓度', value: 55 },
        { label: '操心程度', value: 80 },
        { label: '安稳指数', value: 98 }
      ],
      petComment: '准时出现在我饭碗旁的永远是你。嘴上说不在意，但你的生物钟已经被我的饭点同步了。',
      summary: '你们是典型的"不浮夸但永远准时出现"型关系。',
      description: '定时喂饭、定时铲屎、偶尔摸两下。在它眼里你是那个靠谱的人类。你们不需要戏剧性的甜蜜，规律本身就是最好的情话。',
      keywords: ['规律如钟', '低调靠谱', '平淡是真'],
      tips: [
        '你的准时出现对我来说就是最大的安全感',
        '偶尔在固定流程里加一个小互动，效果超乎你想象',
        '我每天在饭点前就开始等你——这就是我在说需要你'
      ],
      circleText: '"猫咪定时暖气型人类"也太准了吧！不热烈但从不缺席，我家猫的准时暖气就是我🧹 #它眼中的你 #人宠关系测试PETI'
    },
    SLPD: {
      title: '猫咪情绪翻译官',
      subtitle: '猫界认证：读得懂猫的沉默，也给得了猫的自由',
      goldQuote: '它没出声，你就已经听懂了。',
      subQuote: '你从不替它做决定，只在它需要时刚好出现。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['猫语十级', '边界感满分', '安静的光'],
      emotionTag: '稳重型',
      posterTheme: 'lavender',
      indices: [
        { label: '被拿捏指数', value: 55 },
        { label: '情感浓度', value: 50 },
        { label: '伙伴默契', value: 90 },
        { label: '探索欲望', value: 85 }
      ],
      petComment: '你佛系带我，我佛系待你。但你偷偷看我的那些眼神，我其实都记着呢。',
      summary: '你们是典型的"我不说你也懂"型关系。',
      description: '你给它空间去探索，但永远在它需要的时候出现。你不强加意志，也不因为它的冷淡而不安。在它眼里你是一盏不灭的灯——平时不打扰，一转头你永远在。',
      keywords: ['给空间', '不灭的灯', '读懂沉默'],
      tips: [
        '你最大的天赋就是不控制我，继续保持',
        '我看起来不需要你的时刻，其实是在享受你给的安全距离',
        '偶尔主动靠近一下也没关系，我不会拒绝的'
      ],
      circleText: '我是“猫咪情绪翻译官”——它没出声我就已经听懂了，这默契是怎么练出来的🫠 #它眼中的你 #人宠关系测试PETI'
    },
    SLPR: {
      title: '高冷室友型人类',
      subtitle: '猫界认证：各过各的，但莫名和谐',
      goldQuote: '你不打扰我，我也不打扰你。完美。',
      subQuote: '这段关系最舒服的地方，就是谁也不用假装热情。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['分寸感', '互不打扰', '精神室友'],
      emotionTag: '默契型',
      posterTheme: 'coolGray',
      indices: [
        { label: '被拿捏指数', value: 40 },
        { label: '情感浓度', value: 40 },
        { label: '伙伴默契', value: 85 },
        { label: '安稳指数', value: 88 }
      ],
      petComment: '我看你也不想聊天——完美。保持这个距离，偶尔对视一下就够了，多了算加班。',
      summary: '你们是典型的"各过各的，但莫名和谐"型关系。',
      description: '你不强迫它社交，它也不无故打扰你。你们之间没有太多肢体接触，但有一种你在那边就好的安心感。看似冷淡，其实是双方都认可的最佳距离。',
      keywords: ['精神室友', '心照不宣', '各自安好'],
      tips: [
        '这种距离感是我们的默契，不需要刻意改变',
        '我的活动范围永远在你可视区内——那就是我选择了你',
        '偶尔的对视比强制撸我更有意义'
      ],
      circleText: '"高冷室友型人类"哈哈哈 你不打扰我我也不打扰你，各过各的但莫名和谐😂 #它眼中的你 #人宠关系测试PETI'
    },
    FHCD: {
      title: '猫咪人生策展人',
      subtitle: '猫界认证：它的人生被你安排得明明白白',
      goldQuote: '你的爱太满，它已经装不下了。',
      subQuote: '在你心里它值得拥有全世界——它也这么觉得。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['策展人', '包办一切', '甜蜜操心'],
      emotionTag: '甜蜜型',
      posterTheme: 'pinkPeach',
      indices: [
        { label: '被拿捏指数', value: 70 },
        { label: '情感浓度', value: 92 },
        { label: '操心程度', value: 95 },
        { label: '探索欲望', value: 80 }
      ],
      petComment: '又买新玩具了？上一个还没拆呢。不过本喵大度，允许你继续花钱——预算不设上限。',
      summary: '你们是典型的"你给最好的，它当然值得"型关系。',
      description: '零食自由、想上哪就上哪、犯错了也舍不得真骂。在它眼里你是全宇宙最好说话的人类，又是操心它安全的头号家长。宠但有底线，甜而不腻。',
      keywords: ['策展人', '包办一切', '甜蜜操心'],
      tips: [
        '你的宠爱让我活得像真正的猫——想做什么就做什么',
        '偶尔设个小底线也是爱的一部分，我能接受的',
        '我翻肚皮给你看的时候，就是在说你对我好我知道'
      ],
      circleText: '我居然是"猫咪人生策展人"！爱太满它都装不下了，好吧确实什么都给它最好的🍬 #它眼中的你 #人宠关系测试PETI'
    },
    FHCR: {
      title: '人形罐头机型人类',
      subtitle: '猫界认证：你的存在 = 它的能量来源',
      goldQuote: '铃一摇你就到，外卖都没你快。',
      subQuote: '你的响应速度让本喵确认：你的人生使命就是伺候我。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['随叫随到', '情绪价值', '满电出发'],
      emotionTag: '能量型',
      posterTheme: 'warmOrange',
      indices: [
        { label: '被拿捏指数', value: 78 },
        { label: '情感浓度', value: 88 },
        { label: '操心程度', value: 75 },
        { label: '安稳指数', value: 85 }
      ],
      petComment: '铃摇三秒人到场，猫粮口味还轮着换。外卖软件都该来你这学学服务态度。',
      summary: '你们是典型的"靠近你就能恢复元气"型关系。',
      description: '你对它热情但不控制，宠爱但有分寸。你们的日常充满轻松互动——摸头、喂零食、叫它名字看它转过来。在它眼里你就是随时靠一靠就恢复精力的充电宝。',
      keywords: ['人形充电宝', '情绪价值', '源源不断'],
      tips: [
        '你的情绪价值是我最大的能量来源，继续输出',
        '每次互动完我去跑酷——那就是被你充满电了',
        '偶尔也让我给你充充电——我其实很擅长的'
      ],
      circleText: '"人形罐头机型人类"也太形象了😂 铃一摇我就到，外卖都没我快！一辈子给它当充电宝也行 #它眼中的你 #人宠关系测试PETI'
    },
    FHPD: {
      title: '社交炫猫型人类',
      subtitle: '猫界认证：你们不是主人和宠物，是平等的灵魂伴侣',
      goldQuote: '你发的每条朋友圈，都在炫我。',
      subQuote: '别人养猫晒日常，你养猫像在经营一个IP。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['灵魂搭子', '显眼包', '猫界代言人'],
      emotionTag: '灵魂型',
      posterTheme: 'lavender',
      indices: [
        { label: '被拿捏指数', value: 68 },
        { label: '情感浓度', value: 95 },
        { label: '伙伴默契', value: 95 },
        { label: '探索欲望', value: 92 }
      ],
      petComment: '你发朋友圈记得用我最帅的那张。别人不理解我们没关系，反正你相册里我占了80%。',
      summary: '你们是典型的"互相选择、平等共处"型灵魂伴侣关系。',
      description: '你们之间没有主人与宠物的距离感。你给它完全的自由和尊重，它回报你全身心的信任。你们一起尝试新鲜事、一起发呆，默契到不需要多余动作。',
      keywords: ['灵魂伴侣', '社交货币', '高调秀猫'],
      tips: [
        '我们的关系已经是最高级的形态，保持就好',
        '继续把我当平等的生命来对待——这是你最大的魅力',
        '发朋友圈记得选我最帅的那张，我在意的'
      ],
      circleText: '传说款！我是“社交炫猫型人类”——发的每条朋友圈都在炫它，我和猫是平等的灵魂伴侣🤝 #它眼中的你 #人宠关系测试PETI'
    },
    FHPR: {
      title: '快乐搭子型人类',
      subtitle: '猫界认证：你们在一起的画面 = 快乐本身',
      goldQuote: '你贴过来，我没躲——这就是最高认可。',
      subQuote: '你们在一起的画面，就是快乐最简单的样子。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['快乐制造机', '互相搞笑', '零压力'],
      emotionTag: '快乐型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '被拿捏指数', value: 60 },
        { label: '情感浓度', value: 82 },
        { label: '伙伴默契', value: 80 },
        { label: '安稳指数', value: 75 }
      ],
      petComment: '你贴过来我不躲——你知道这对猫意味着什么吗？意味着你通过了终面，但试用期还没结束。',
      summary: '你们是典型的"它搞笑你拍手，你犯蠢它陪着"型关系。',
      description: '你不给它太多限制，它也不添太多麻烦。在它眼里你是那个很好玩的人类。你们的日常就是一出轻喜剧——笑声就是你们关系最好的证明。',
      keywords: ['轻喜剧搭子', '快乐至上', '互不嫌弃'],
      tips: [
        '快乐是我们关系最大的底色，别让它褪色',
        '你不需要我完美我也不需要你全能——做最真实的自己就好',
        '偶尔一起犯傻的时刻就是我们的黄金回忆'
      ],
      circleText: '测出来是"快乐搭子型人类"！它搞笑我拍手，我犯蠢它陪着，在一起就是停不下来地笑😆 #它眼中的你 #人宠关系测试PETI'
    },
    FLCD: {
      title: '猫界打工人型人类',
      subtitle: '猫界认证：你以为自己是主人，其实你是它的员工',
      goldQuote: '你以为你在铲屎，其实你是被选中的。',
      subQuote: '它嘴上嫌你烦，但你一天不出现它就满屋子找。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['反差深情', '嘴硬本人', '职业铲屎'],
      emotionTag: '反差型',
      posterTheme: 'teaBrown',
      indices: [
        { label: '被拿捏指数', value: 45 },
        { label: '情感浓度', value: 42 },
        { label: '操心程度', value: 92 },
        { label: '探索欲望', value: 78 }
      ],
      petComment: '你的核心作用就是开罐头。但本喵大度允许你摸两下——算你今天的加班费，别得寸进尺。',
      summary: '你们是典型的"嘴上说只是工具人，心里全是它"型关系。',
      description: '表面最淡漠的搭配——它高冷不搭理你，你也不强求亲近。但你对它操碎了心：猫粮精挑细选、疫苗一针不落、半夜听它吐了能弹射起床。',
      keywords: ['反差关系', '表面佛系', '暗地操心'],
      tips: [
        '你嘴上说我把你当开罐头的，但你比谁都疼我',
        '有一天你没准时出现在碗旁，我一定会去门口等',
        '只把你当工具人的猫不会在你生病时安静趴在身边——但我会'
      ],
      circleText: '传说款！“猫界打工人型人类”——以为自己在铲屎，其实是被选中的😂 但它的世界已经离不开我了 #它眼中的你 #人宠关系测试PETI'
    },
    FLCR: {
      title: '极简养猫型人类',
      subtitle: '猫界认证：管好基础，不搞花活，效率极高',
      goldQuote: '不多不少，刚刚好——它也这么觉得。',
      subQuote: '最高级的爱，就是什么都不多做一分。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['极简养猫', '效率至上', '平行管理员'],
      emotionTag: '佛系型',
      posterTheme: 'milkWhite',
      indices: [
        { label: '被拿捏指数', value: 38 },
        { label: '情感浓度', value: 35 },
        { label: '操心程度', value: 70 },
        { label: '安稳指数', value: 92 }
      ],
      petComment: '准时投喂=合格。多一分过度关心要扣分，少一分要拉黑。恰到好处——这就是你能得到的最高评价。',
      summary: '你们是典型的"各自运行但精密交错"型关系。',
      description: '你负责维护它的物质生活，它负责维护你的精神世界。不需要太多互动，各自存在本身就是最好的陪伴。不被打扰地存在在安全空间里就是它最高形式的幸福。',
      keywords: ['极简养猫', '各司其职', '无声契约'],
      tips: [
        '别觉得这种关系太淡——对我来说这就是最高级的幸福',
        '你给的正好是我最需要的：不打扰的照顾',
        '偶尔摸一下就缓解焦虑——这就是我给你的情绪价值'
      ],
      circleText: '我是“极简养猫型人类”：不多不少刚刚好。各过各的但互相需要，这不就是最舒服的关系吗🌐 #它眼中的你 #人宠关系测试PETI'
    },
    FLPD: {
      title: '各自精彩型人类',
      subtitle: '猫界认证：你尊重它是一只有独立人格的猫',
      goldQuote: '你玩你的，我玩我的——但挺想你的。',
      subQuote: '最高级的默契，是各自精彩又互相惦记。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['独立灵魂', '各自闪光', '高级尊重'],
      emotionTag: '独立型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '被拿捏指数', value: 30 },
        { label: '情感浓度', value: 40 },
        { label: '伙伴默契', value: 82 },
        { label: '探索欲望', value: 88 }
      ],
      petComment: '你玩你的手机，我玩我的纸球。谁也别打扰谁——这不是冷漠，这是最高级的尊重。',
      summary: '你们是典型的"各自闪光，偶尔交汇"型关系。',
      description: '你尊重它是一只有独立人格的猫，它也不把你当提款机。各自有精彩的生活，偶尔在某个时刻交汇：它跳上你膝盖你摸摸它头，然后各自继续精彩。',
      keywords: ['各自精彩', '高级尊重', '偶尔交汇'],
      tips: [
        '我在你旁边打盹而不是躲起来——这就是最高认可',
        '我不会把时间浪费在不在意的人身上，你值得骄傲',
        '保持你的不强求，这才是让我信任你的原因'
      ],
      circleText: '“各自精彩型人类”——你玩你的我玩我的，但挺想你的。不黏不远偶尔交汇就足够了✨ #它眼中的你 #人宠关系测试PETI'
    },
    FLPR: {
      title: '佛系同居型人类',
      subtitle: '猫界认证：不需要理由，你们就是该在一起的',
      goldQuote: '什么也不做，但什么都刚好。',
      subQuote: '上辈子不知道签了什么合同，这辈子认了。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['命中注定', '天选同框', '刚好合适'],
      emotionTag: '缘分型',
      posterTheme: 'lavender',
      indices: [
        { label: '被拿捏指数', value: 35 },
        { label: '情感浓度', value: 38 },
        { label: '伙伴默契', value: 88 },
        { label: '安稳指数', value: 85 }
      ],
      petComment: '不知道上辈子跟你签了什么合同——这辈子认了。退货通道已关闭，售后不接受投诉。',
      summary: '你们是典型的"说不清为什么，但就是该在一起"型关系。',
      description: '不热烈不浮夸，但就是莫名合拍。你不把它捧在手心，它也不24小时黏你。但你们总是恰好出现在对方需要的瞬间——这种缘分不需要理由。',
      keywords: ['命中注定', '不言自明', '刚好合适'],
      tips: [
        '这种关系最珍贵的就是不强求——我们都做到了',
        '你没想过改变我我也没试图改变你——保持各自的样子',
        '合拍不是因为努力经营，是因为我们本来就刚好合适'
      ],
      circleText: '传说款！“佛系同居型人类”——什么也不做但什么都刚好，上辈子一定签了什么合同💫 #它眼中的你 #人宠关系测试PETI'
    }
  }
}

module.exports = catData
