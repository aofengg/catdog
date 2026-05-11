/**
 * 狗狗版 - 它眼中的你 · 人宠关系测试
 * 配置文件：品牌 + 维度 + 15题+5彩蛋 + 16 种关系结果
 * 主题：狗狗正在判断你是哪种人类
 */

var dogData = {
  petType: 'dog',
  brand: {
    productName: '它眼中的你',
    title: '狗狗版 · 人宠关系测试',
    slogan: '原来你在它心里，是这样的存在',
    resultHeader: '本汪认证的人类档案',
    shareTitle: '我在我家狗眼里竟然是这样的！你呢？',
    shareDesc: '测测你在它心里到底是什么角色',
    posterCTA: [
      '我测出来是"{title}"，你呢？',
      '敢不敢看看，你在你家狗心里到底排第几？',
      '快来测测，你家修勾把你当全世界还是遛弯机？',
      '发给你养狗的朋友，看看谁被自家狗爱得最深'
    ]
  },
  dimensions: {
    SF: { positive: '温暖港湾', negative: '自由灵魂' },
    HL: { positive: '浓情蜜意', negative: '清淡自在' },
    CP: { positive: '宠溺家长', negative: '平等伙伴' },
    DR: { positive: '探索冒险', negative: '安稳日常' }
  },
  midFeedback: [
    { after: 3, text: '汪！系统检测到：这个人类很容易被尾巴打败。' },
    { after: 6, text: '狗狗备注：你可能已经被列入"最重要的人类名单"。' },
    { after: 9, text: '进度 60%：它正在判断你是主人、搭子，还是全世界。' },
    { after: 12, text: '危险提示：你可能不是在养狗，是在被狗训练按时出门。' },
    { after: 15, text: '狗狗脑洞时间——它有话要对你说。' }
  ],
  questions: [
    // === SF + HL 配对（3 题）：分离与重逢 ===
    {
      id: 1,
      scene: '你刚拿起钥匙，狗已经坐在门口，尾巴摇成小风扇——',
      dimensions: 'SF_HL',
      options: [
        { text: '蹲下来抱抱它："乖乖等我回来"', score: 'SH' },
        { text: '摸摸头再出门，让它知道你会回来', score: 'SL' },
        { text: '跟它玩一小会儿，假装这不是离别', score: 'FH' },
        { text: '正常出门，它已经习惯你的节奏', score: 'FL' }
      ]
    },
    {
      id: 2,
      scene: '你回家开门，狗像一颗炮弹一样冲向你——',
      dimensions: 'SF_HL',
      options: [
        { text: '立刻接住它，今天的重逢仪式必须完整', score: 'SH' },
        { text: '先让它冷静一点，再慢慢互动', score: 'SL' },
        { text: '跟它一起疯，反正你也很想它', score: 'FH' },
        { text: '淡定换鞋，它扑几下就好了', score: 'FL' }
      ]
    },
    {
      id: 3,
      scene: '出差几天回来，狗看到你后叫到像在控诉——',
      dimensions: 'SF_HL',
      options: [
        { text: '抱着它道歉："对不起，让你等太久了"', score: 'SH' },
        { text: '坐下来陪它一会儿，让它慢慢安心', score: 'SL' },
        { text: '一边逗它一边说："想我想疯了吧"', score: 'FH' },
        { text: '它激动一会儿就好，先恢复日常节奏', score: 'FL' }
      ]
    },
    // === SF + CP 配对（3 题）：社交与规则 ===
    {
      id: 4,
      scene: '遛弯时，狗突然冲向陌生人，像发现了新朋友——',
      dimensions: 'SF_CP',
      options: [
        { text: '立刻拉回，先确认对方是否愿意接触', score: 'SC' },
        { text: '让它靠近闻闻，但你全程盯着安全', score: 'SP' },
        { text: '开心介绍："它很热情，不咬人的"', score: 'FC' },
        { text: '松松牵引绳，让它自己判断要不要过去', score: 'FP' }
      ]
    },
    {
      id: 5,
      scene: '狗叼走了你的鞋，还一脸骄傲地看着你——',
      dimensions: 'SF_CP',
      options: [
        { text: '追过去拿回来，认真说"不可以"', score: 'SC' },
        { text: '拿玩具交换，让它知道鞋不是玩具', score: 'SP' },
        { text: '假装追它，把这变成一场游戏', score: 'FC' },
        { text: '先让它玩一下，反正旧鞋也无所谓', score: 'FP' }
      ]
    },
    // === HL + CP 配对（2 题）：亲密与照护 ===
    {
      id: 6,
      scene: '到医院门口，狗突然刹车，眼神像在说"你背叛我"——',
      dimensions: 'HL_CP',
      options: [
        { text: '用零食一点点引导，全程轻声安抚', score: 'HC' },
        { text: '直接抱进去，该看病还是得看', score: 'LC' },
        { text: '在旁边铺上它熟悉的小毯子，让它安心', score: 'HP' },
        { text: '打开门等一会儿，它准备好了自然会进去', score: 'LP' }
      ]
    },
    // === SF + CP 配对（第3题）===
    {
      id: 7,
      scene: '狗在沙发上留下了一大片毛，还睡得很理直气壮——',
      dimensions: 'SF_CP',
      options: [
        { text: '默默清理，然后给它铺个专属垫子', score: 'SC' },
        { text: '拍张照留念，毕竟它躺得太幸福', score: 'SP' },
        { text: '假装哭穷："你知道这沙发多贵吗"', score: 'FC' },
        { text: '无所谓，沙发早就是它的领地', score: 'FP' }
      ]
    },
    // === SF + DR 配对（2 题）：活动与探索 ===
    {
      id: 8,
      scene: '下雨天没法遛弯，狗在家里憋得来回踱步——',
      dimensions: 'SF_DR',
      options: [
        { text: '在客厅陪它玩游戏，消耗一下精力', score: 'SD' },
        { text: '给它安排嗅闻垫/玩具，让它安静放电', score: 'SR' },
        { text: '穿上雨衣带它下楼短暂放风', score: 'FD' },
        { text: '今天就休息吧，少遛一次没关系', score: 'FR' }
      ]
    },
    {
      id: 9,
      scene: '你想换一条新的遛弯路线，狗站在岔路口犹豫——',
      dimensions: 'SF_DR',
      options: [
        { text: '先走一小段，确认它不紧张再继续', score: 'SD' },
        { text: '还是老路线吧，熟悉的地方它更放松', score: 'SR' },
        { text: '直接带它探索新路，看它会不会兴奋', score: 'FD' },
        { text: '它想往哪边走，就跟着它走', score: 'FR' }
      ]
    },
    // === CP + DR 配对（2 题）：决策风格 ===
    {
      id: 10,
      scene: '朋友约你带狗去宠物聚会——',
      dimensions: 'CP_DR',
      options: [
        { text: '去，但全程观察它的状态和安全', score: 'CD' },
        { text: '算了，狗多狗杂，它可能不自在', score: 'CR' },
        { text: '去！让它多认识新朋友', score: 'PD' },
        { text: '看它当天心情，不勉强社交', score: 'PR' }
      ]
    },
    // === HL + CP 配对（第2题）===
    {
      id: 11,
      scene: '你起床时，狗趴在你脚边睡得很香——',
      dimensions: 'HL_CP',
      options: [
        { text: '忍不住摸摸它脑袋再走', score: 'HC' },
        { text: '轻轻绕开，舍不得吵醒它', score: 'LC' },
        { text: '直接叫醒它："走啦，陪我开始新一天"', score: 'HP' },
        { text: '正常起身，它醒了再摸摸它', score: 'LP' }
      ]
    },
    // === HL + DR 配对（3 题）：互动与表达 ===
    {
      id: 12,
      scene: '狗学会了新技能，比如握手，第一时间冲你显摆——',
      dimensions: 'HL_DR',
      options: [
        { text: '疯狂夸夸 + 零食奖励 + 拍视频', score: 'HD' },
        { text: '淡定奖励一下，继续巩固训练', score: 'LR' },
        { text: '立刻叫家人来看："快看它会了！"', score: 'HR' },
        { text: '摸摸它表示认可，回头给它加餐', score: 'LD' }
      ]
    },
    {
      id: 13,
      scene: '你心情很差的时候，狗安静地靠过来——',
      dimensions: 'HL_DR',
      options: [
        { text: '抱着它哭，跟它说"还好有你"', score: 'HR' },
        { text: '摸摸它，什么都不说也好多了', score: 'LR' },
        { text: '跟它聊天，像跟最可靠的朋友说话', score: 'HD' },
        { text: '感受到它的善意，然后继续做自己的事', score: 'LD' }
      ]
    },
    {
      id: 14,
      scene: '看到一款新的狗狗零食，你第一反应是——',
      dimensions: 'HL_DR',
      options: [
        { text: '看配料表，确认健康再买', score: 'LD' },
        { text: '买回去让它试试，看它开不开心', score: 'HD' },
        { text: '买一堆不同口味，让它自己挑最喜欢的', score: 'HR' },
        { text: '不特别在意，它现在吃的就挺好', score: 'LR' }
      ]
    },
    // === CP + DR 配对（第2题）===
    {
      id: 15,
      scene: '你考虑要不要给狗报一个游泳课/训练课——',
      dimensions: 'CP_DR',
      options: [
        { text: '可以，但要先确认安全和它是否适应', score: 'CD' },
        { text: '先观察它对水/训练的兴趣，不急着报', score: 'CR' },
        { text: '一想到它学新东西就兴奋，想马上安排', score: 'PD' },
        { text: '没必要，平时遛弯和玩耍已经够了', score: 'PR' }
      ]
    },
    // === 彩蛋题（5 题）：狗狗脑洞题 ===
    {
      id: 16,
      scene: '如果狗狗突然会给你发微信，它第一句大概率是——',
      dimensions: 'SF_HL',
      bonus: true,
      options: [
        { text: '你什么时候回来？', score: 'SH' },
        { text: '今天可以多遛十分钟吗？', score: 'FL' },
        { text: '我刚才表现很好，奖励呢？', score: 'FH' },
        { text: '我没有拆家，是沙发先动的', score: 'SL' }
      ]
    },
    {
      id: 17,
      scene: '如果狗狗给你写年度评价，它会写——',
      dimensions: 'CP_DR',
      bonus: true,
      options: [
        { text: '此人类情绪稳定，适合长期陪伴', score: 'CR' },
        { text: '遛弯速度一般，但态度良好', score: 'CD' },
        { text: '零食发放不够及时，有待改进', score: 'PD' },
        { text: '经常出门，本狗表示强烈关注', score: 'PR' }
      ]
    },
    {
      id: 18,
      scene: '如果狗狗偷偷给你取外号，最可能叫你——',
      dimensions: 'HL_CP',
      bonus: true,
      options: [
        { text: '我的全世界', score: 'HC' },
        { text: '人形遛弯机', score: 'LC' },
        { text: '零食管理员', score: 'LP' },
        { text: '永远回家的那个人', score: 'HP' }
      ]
    },
    {
      id: 19,
      scene: '如果狗狗有隐藏职业，它最像——',
      dimensions: 'SF_DR',
      bonus: true,
      options: [
        { text: '家庭保安队长', score: 'SR' },
        { text: '情绪治疗师', score: 'SD' },
        { text: '外出探险家', score: 'FD' },
        { text: '零食质检员', score: 'FR' }
      ]
    },
    {
      id: 20,
      scene: '如果狗狗能给你颁奖，它会颁给你——',
      dimensions: 'SF_CP',
      bonus: true,
      options: [
        { text: '最可靠人类奖', score: 'SC' },
        { text: '最好骗零食奖', score: 'FP' },
        { text: '最会陪玩奖', score: 'FC' },
        { text: '最值得等待奖', score: 'SP' }
      ]
    }
  ],
  relationships: {
    SHCD: {
      title: '狗狗全世界型人类',
      subtitle: '本汪认证：你就是它冲过来的唯一理由',
      goldQuote: '你只是回了趟家，它却等回了整个世界。',
      subQuote: '对它来说，你出门五分钟和五年没有区别。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['全世界本人', '被狗偏爱', '本汪唯一'],
      emotionTag: '热烈型',
      posterTheme: 'warmOrange',
      indices: [
        { label: '奔向你指数', value: 99 },
        { label: '情感浓度', value: 95 },
        { label: '操心程度', value: 92 },
        { label: '探索欲望', value: 80 }
      ],
      petComment: '别装了，你一开门我就知道：你也是想我的。不然你干嘛回来这么快！',
      summary: '你们是典型的"它负责奔向你，你负责接住它"型关系。',
      description: '在它眼里你不是普通主人，而是它每天最期待出现的人。你一回家，它的世界就重新亮起来。它的热情不是没边界，而是因为它确认：你会回来，也会接住它。',
      keywords: ['全世界都是你', '毫无保留', '认定了你'],
      tips: [
        '多给我稳定的回应，我不是不懂分离，只是太期待你回来',
        '不用每次都补偿式狂宠，规律陪伴比突然加倍更让我安心',
        '我那么疯，是因为你不在的时间里真的攒了很多想你'
      ],
      circleText: '测完发现我是“狗狗全世界型人类”——它只是等我回家，却等回了整个世界😭 被狗爱着真的太幸福了 #它眼中的你 #人宠关系测试PETI'
    },
    SHCR: {
      title: '狗狗安全感本人',
      subtitle: '本汪认证：你不用做什么特别的事，你在就够了',
      goldQuote: '你不用做什么，在就够了。',
      subQuote: '它跟在你身后的每一步，都是在说有你就安心。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['日常即幸福', '狗狗安心源', '恒温陪伴'],
      emotionTag: '治愈型',
      posterTheme: 'milkWhite',
      indices: [
        { label: '奔向你指数', value: 80 },
        { label: '情感浓度', value: 72 },
        { label: '操心程度', value: 85 },
        { label: '安稳指数', value: 95 }
      ],
      petComment: '你走到哪我跟到哪——这不叫跟踪，叫安全巡逻。本汪有义务。',
      summary: '你们是典型的"你在就是最好的日常"型关系。',
      description: '你把爱融进生活细节里——按时遛弯、定时喂饭、晚上它趴脚边你看电视。在它眼里你就是最温暖的日常本身。你的稳定就是它最大的幸福来源。',
      keywords: ['如约而至', '日常即爱', '稳稳的幸福'],
      tips: [
        '你的规律就是我的心安，继续保持就好',
        '我跟在你身后不是焦虑，是在享受有你在的安心',
        '偶尔蹲下来跟我平视说说话，我会特别开心'
      ],
      circleText: '我是“狗狗安全感本人”：不用做什么在就够了。原来我在狗眼里是最稳的日常🥺 #它眼中的你 #人宠关系测试PETI'
    },
    SHPD: {
      title: '热血冒险搭子型人类',
      subtitle: '本汪认证：有你在，去哪里都不怕',
      goldQuote: '有你在，去哪我都敢冲。',
      subQuote: '它不怕路远，怕的是身边没有你。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['撑腰本人', '一起冲', '冒险搭子'],
      emotionTag: '勇敢型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '奔向你指数', value: 85 },
        { label: '情感浓度', value: 82 },
        { label: '伙伴默契', value: 95 },
        { label: '探索欲望', value: 98 }
      ],
      petComment: '冲！今天去哪！等等我先叼个球——前面的路交给我探！',
      summary: '你们是典型的"跟着你就不会有事"型搭档关系。',
      description: '你给它安全感的方式不是保护而是带它一起冒险。你们一起跑步、探索新路线、迎接每个惊喜。在它眼里你是那个有你在就什么都敢的人。',
      keywords: ['并肩冲锋', '你在我就敢', '最佳搭档'],
      tips: [
        '继续带我探索新世界，我们的默契就是在一起冲的路上建起来的',
        '我胆子大全因为你——知道身后有你兜底就什么都不怕',
        '偶尔也让我带路，我会用摇尾巴告诉你有多开心'
      ],
      circleText: '居然测出“热血冒险搭子型人类”！有我在它去哪都敢冲——这种搭档关系也太燃了💪 #它眼中的你 #人宠关系测试PETI'
    },
    SHPR: {
      title: '双向奔赴天花板',
      subtitle: '本汪认证：不需要语言，你们之间的默契就是答案',
      goldQuote: '你不说话，它也知道你想它了。',
      subQuote: '你们之间最好的默契，就是不用说也都懂。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['双向奔赴', '天生合拍', '最佳距离'],
      emotionTag: '温暖型',
      posterTheme: 'pinkPeach',
      indices: [
        { label: '奔向你指数', value: 82 },
        { label: '情感浓度', value: 70 },
        { label: '伙伴默契', value: 90 },
        { label: '安稳指数', value: 88 }
      ],
      petComment: '你对我好我全记着——然后加倍还你。这叫双向奔赴，懂不懂！',
      summary: '你们是典型的"不用说也都懂"型默契关系。',
      description: '你给它安全感和温暖但不限制它做自己。在它眼里你是温柔稳定、让它完全放松的存在。你们之间有不说出口但双方都懂的默契——这才是最高级的双向奔赴。',
      keywords: ['天生合拍', '互相奔赴', '不用说也懂'],
      tips: [
        '我们的关系已经很好了，继续做你自己就是最好的',
        '我安静趴在你身边就是在说我选择跟你待在一起',
        '给彼此一点空间，双向奔赴不是24小时粘着嘛'
      ],
      circleText: '我是“双向奔赴天花板”！不说话它也知道我想它了，这种默契是怎么练出来的☀️ #它眼中的你 #人宠关系测试PETI'
    },
    SLCD: {
      title: '沉默守护型人类',
      subtitle: '本汪认证：你的爱从不张扬，但它一分不落地收到了',
      goldQuote: '嘴上说别闹，手已经在摸头了。',
      subQuote: '你从不说爱，但它的一切你都安排得最好。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['沉默深情', '行动派', '嘴硬心软'],
      emotionTag: '深情型',
      posterTheme: 'coolGray',
      indices: [
        { label: '奔向你指数', value: 65 },
        { label: '情感浓度', value: 58 },
        { label: '操心程度', value: 96 },
        { label: '探索欲望', value: 78 }
      ],
      petComment: '假装不在意我？行——那半夜偷偷给我盖被子的是谁？以为我睡着了不知道？',
      summary: '你们是典型的"嘴上不说爱，但全做到了"型关系。',
      description: '你不把爱挂嘴边，但疫苗驱虫一次不落、每天准时遛弯、听到它哼一声就立刻看过去。在它眼里你是话不多但从不缺席的人。你的沉默守护比什么都重。',
      keywords: ['沉默的爱', '始终如一', '不说但全做到'],
      tips: [
        '你做的每一件事我都记得，不用刻意表达也没关系',
        '偶尔蹲下来抱一下——你不说我也知道，但说了我会更开心',
        '我们的安静对视就是在互相说你做的一切我都记得'
      ],
      circleText: '测出来是“沉默守护型人类”——嘴上说别闹手已经在摸头了，我的爱从不张扬但它全收到了💙 #它眼中的你 #人宠关系测试PETI'
    },
    SLCR: {
      title: '靠谱遛弯人型人类',
      subtitle: '本汪认证：准时、靠谱、从不让我失望',
      goldQuote: '你不热烈，但你每天都在。',
      subQuote: '你的靠谱是它最不张扬的幸福来源。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['准时即爱', '靠谱本人', '雷打不动'],
      emotionTag: '踏实型',
      posterTheme: 'teaBrown',
      indices: [
        { label: '奔向你指数', value: 62 },
        { label: '情感浓度', value: 55 },
        { label: '操心程度', value: 82 },
        { label: '安稳指数', value: 96 }
      ],
      petComment: '你嘴上说别跟着，但脚步慢了等我。当我傻啊？你就是最靠谱的那个人。',
      summary: '你们是典型的"每天如约而至"型关系。',
      description: '定时遛弯、按时喂饭、生病就看医生。你不过分溺爱也不忽略基本需求。在它眼里你是每天都会出现的靠谱人类——没有戏剧性，但有最踏实的信任。',
      keywords: ['准时即爱', '简单靠谱', '雷打不动'],
      tips: [
        '别小看每天定时出现——对我来说规律感就是爱',
        '我固定时间摇尾巴不是因为饿，是因为知道你快来了',
        '你的准时就是我的心安，继续做我最靠谱的人吧'
      ],
      circleText: '“靠谱遛弯人型人类”也太准了吧！不热烈但每天都在，实在人养实在狗🚶 #它眼中的你 #人宠关系测试PETI'
    },
    SLPD: {
      title: '安静领航员型人类',
      subtitle: '本汪认证：你从不替我做决定，只是默默陪我走每一步',
      goldQuote: '它跑多远都不怕，因为知道你在。',
      subQuote: '你不牵绳也不怕，因为它永远会回头找你。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['安静同行', '给自由的人', '信任满分'],
      emotionTag: '稳重型',
      posterTheme: 'lavender',
      indices: [
        { label: '奔向你指数', value: 60 },
        { label: '情感浓度', value: 50 },
        { label: '伙伴默契', value: 92 },
        { label: '探索欲望', value: 88 }
      ],
      petComment: '你佛你的，我自己跑我的。但跑远了我还是会回头看你在不在。',
      summary: '你们是典型的"我在后面看着你，你放心去跑"型关系。',
      description: '你给它空间探索世界但永远走在它旁边。你不过度干预也不因它调皮大惊小怪。在它眼里你是安静可靠的同行者——不控制方向，但让它知道有人陪。',
      keywords: ['自由的陪伴', '不控制', '永远在旁边'],
      tips: [
        '你给我的信任比什么都珍贵——被信任的狗才会自信',
        '我跑远了会回头看你，那就是我在说你还在吧',
        '继续做那个不控制但永远在的人就好'
      ],
      circleText: '我是“安静领航员型人类”——不控制方向但一直陪着走，它跑多远都不怕因为知道我在🧭 #它眼中的你 #人宠关系测试PETI'
    },
    SLPR: {
      title: '高质量陪伴型人类',
      subtitle: '本汪认证：各自安好，偶尔温情，刚刚好',
      goldQuote: '沙发两头，各自舒服——挺好的。',
      subQuote: '在一起但互不打扰，就是你们最舒服的距离。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['在就安心', '零压力', '高级默契'],
      emotionTag: '默契型',
      posterTheme: 'coolGray',
      indices: [
        { label: '奔向你指数', value: 50 },
        { label: '情感浓度', value: 45 },
        { label: '伙伴默契', value: 85 },
        { label: '安稳指数', value: 90 }
      ],
      petComment: '你在沙发左边，我在右边。中间放零食——完美。多了不要，少了不行。',
      summary: '你们是典型的"在一起就安心，不用说话"型关系。',
      description: '你不时刻关注它，它也不无时无刻黏你。但你们都知道：对方在就好。像两个默契的室友——各自有空间和节奏，住在一起就莫名安心。',
      keywords: ['舒适距离', '无压力共处', '在就安心'],
      tips: [
        '你给的是最高级的爱：存在感而非压迫感',
        '我能自在地在角落睡觉不焦虑——恰恰证明了我对你的信任',
        '偶尔主动靠过来摸摸我，让我知道你也在意'
      ],
      circleText: '“高质量陪伴型人类”——沙发两头各自舒服，在一起不用说话就是最好的距离😊 #它眼中的你 #人宠关系测试PETI'
    },
    FHCD: {
      title: '狗狗人生策划师',
      subtitle: '本汪认证：你给的爱太满了，满到我以为全世界都是好人',
      goldQuote: '你的爱太满，它都快溢出来了。',
      subQuote: '它以为全世界都是好人——因为你就是它的全世界。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['宠爱满格', '狗生规划师', '甜蜜操心'],
      emotionTag: '甜蜜型',
      posterTheme: 'pinkPeach',
      indices: [
        { label: '奔向你指数', value: 75 },
        { label: '情感浓度', value: 92 },
        { label: '操心程度', value: 95 },
        { label: '探索欲望', value: 82 }
      ],
      petComment: '又！买！新！的！了！好耶好耶好耶！你就是我的人生赢家！',
      summary: '你们是典型的"你给什么它都开心，但它最开心的是有你"型关系。',
      description: '你对它的宠爱没上限——什么都给最好的、犯错舍不得骂。唯一的副作用：它被你宠成了社交达人，对谁都热情。因为你教会了它一件事：世界是安全的。',
      keywords: ['无条件宠爱', '安排明白', '甜蜜到齁'],
      tips: [
        '你的宠爱没问题，偶尔加一点小规矩也是爱',
        '我对谁都热情是因为从小被你无条件接纳——这是好事',
        '我不需要更多东西，我最需要的就是你在身边'
      ],
      circleText: '我居然是“狗狗人生策划师”！爱太满它都快溢出来了，好吧确实把它宠上天了🍯 #它眼中的你 #人宠关系测试PETI'
    },
    FHCR: {
      title: '人形零食机型人类',
      subtitle: '本汪认证：靠近你就能满血复活',
      goldQuote: '你一伸手，它的世界就亮了。',
      subQuote: '你的口袋是它眼中永远的宝库。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['快乐充电站', '靠近就有电', '满电出发'],
      emotionTag: '能量型',
      posterTheme: 'warmOrange',
      indices: [
        { label: '奔向你指数', value: 78 },
        { label: '情感浓度', value: 88 },
        { label: '操心程度', value: 72 },
        { label: '安稳指数', value: 85 }
      ],
      petComment: '你递啥我都接着！你让干啥我都乐意！谁让跟你在一起就开心呢！',
      summary: '你们是典型的"靠近你就满血复活"型关系。',
      description: '你热情但不控制、宠爱但有分寸。你们的日常充满轻松互动——摸头、喊名字、回应它每一次凑过来。在它眼里你就是取之不尽的能量源，靠近就恢复元气。',
      keywords: ['人形充电桩', '快乐供给站', '满电出发'],
      tips: [
        '你给的不只是食物，还有每天都在线的情绪价值',
        '我一听到你声音就弹起来——这种快乐装不出来',
        '偶尔也让我给你充充电——蹲下来让我靠着你'
      ],
      circleText: '“人形零食机型人类”哈哈哈 我一伸手它的世界就亮了，靠近我就满电出发⚡ #它眼中的你 #人宠关系测试PETI'
    },
    FHPD: {
      title: '快乐显眼包搭子',
      subtitle: '本汪认证：你们不是主人和宠物，是互相选择的灵魂伙伴',
      goldQuote: '你发的每条朋友圈，它都想一起出镜。',
      subQuote: '别人遛狗叫散步，你们俩叫联合巡街。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['灵魂搭子', '显眼包本人', '天生合拍'],
      emotionTag: '灵魂型',
      posterTheme: 'lavender',
      indices: [
        { label: '奔向你指数', value: 72 },
        { label: '情感浓度', value: 95 },
        { label: '伙伴默契', value: 98 },
        { label: '探索欲望', value: 95 }
      ],
      petComment: '今天一起当显眼包了吗？我准备好了！走到哪都要跟你一起嗨！',
      summary: '你们是典型的"放下身份，选择彼此"型灵魂伙伴关系。',
      description: '你放下了主人的身份，真正把它当平等的生命来对待。你从不命令它但它愿意跟随你——这不是驯服，这是选择。你们一起嗨、一起冒险、一起当显眼包。',
      keywords: ['灵魂伙伴', '选择彼此', '热烈而平等'],
      tips: [
        '继续当我最好的搭子，我们的快乐是双向的',
        '我跟你出门不是因为牵绳，是因为跟你在一起最开心',
        '一起疯就对了，显眼包的快乐只有搭子才懂'
      ],
      circleText: '传说款！我是“快乐显眼包搭子”——不是主人和宠物，是互相选择的灵魂伙伴🤝 #它眼中的你 #人宠关系测试PETI'
    },
    FHPR: {
      title: '快乐贴贴型人类',
      subtitle: '本汪认证：你们在一起永远在笑，快乐就是主旋律',
      goldQuote: '你贴过来，它就赖上了——这就是爱。',
      subQuote: '你们在一起的画面，就是快乐最简单的样子。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['贴贴达人', '快乐制造机', '零压力'],
      emotionTag: '快乐型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '奔向你指数', value: 70 },
        { label: '情感浓度', value: 82 },
        { label: '伙伴默契', value: 80 },
        { label: '安稳指数', value: 75 }
      ],
      petComment: '贴贴贴贴！还要贴！不嫌我口水多就永远别松手！',
      summary: '你们是典型的"它蠢你也蠢，但在一起就是快乐"型关系。',
      description: '你不给它太多规矩，它也不给你找太多麻烦。你们的日常就是一出欢乐剧——它闹你也闹，笑声就是你们关系最好的证明。',
      keywords: ['快乐优先', '互相犯蠢', '每天都好玩'],
      tips: [
        '快乐是我们关系的核心，别让任何事把它变严肃',
        '我贴你是因为认可你——你不嫌弃就继续贴',
        '一起犯傻的时刻就是我们最好的黄金回忆'
      ],
      circleText: '测出来是“快乐贴贴型人类”！它蠢我也蠢，在一起就是停不下来地笑🤣 #它眼中的你 #人宠关系测试PETI'
    },
    FLCD: {
      title: '人形遛弯机型人类',
      subtitle: '本汪认证：你嘴上说我是工具狗，其实你是我离不开的日常',
      goldQuote: '你以为你在遛狗，其实你是被选中的。',
      subQuote: '它嘴上叼着球跑开，回头还是冲你来的。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['反差深情', '嘴硬本人', '暗地操心'],
      emotionTag: '反差型',
      posterTheme: 'teaBrown',
      indices: [
        { label: '奔向你指数', value: 45 },
        { label: '情感浓度', value: 40 },
        { label: '操心程度', value: 94 },
        { label: '探索欲望', value: 78 }
      ],
      petComment: '你的核心作用就是开门和倒粮。但本汪大度允许你摸头——算加班费，别得寸进尺。',
      summary: '你们是典型的"表面工具人，实际谁也离不开谁"型关系。',
      description: '你负责开门、倒粮、遛弯，它负责吃睡拆家。但你疫苗表贴冰箱上、驱虫日历精确到天。你表面佛系实则操心到爆，它表面无所谓实则超依赖你。',
      keywords: ['嘴上无所谓', '暗地超在乎', '反差深情'],
      tips: [
        '你要是晚回家十分钟，我就在门口急得打转了',
        '我们都不太会表达爱，但爱比谁都深——这就很好',
        '那些你说就是养着玩的时刻，手机里全是偷拍的我吧'
      ],
      circleText: '传说款！“人形遛弯机型人类”——以为自己在遛狗，其实是被选中的😂 表面工具人实际谁也离不开谁 #它眼中的你 #人宠关系测试PETI'
    },
    FLCR: {
      title: '定时投喂型人类',
      subtitle: '本汪认证：你管好我的世界，我管好你的心情',
      goldQuote: '不多不少，刚刚好——它也这么觉得。',
      subQuote: '最靠谱的爱，就是什么都不多做一分。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['各司其职', '佛系本人', '无声契约'],
      emotionTag: '佛系型',
      posterTheme: 'milkWhite',
      indices: [
        { label: '奔向你指数', value: 42 },
        { label: '情感浓度', value: 38 },
        { label: '操心程度', value: 72 },
        { label: '安稳指数', value: 92 }
      ],
      petComment: '饭点到了没？到了叫我。没到就别吵——我在这等着呢。绩效考核：合格。',
      summary: '你们是典型的"各自运行、方向相同"型关系。',
      description: '你负责它的衣食住行，它负责在你需要时出现在旁边。不需要过多交流，彼此存在本身就是最好的安排。你的规律照顾本身就是最好的爱。',
      keywords: ['各自运行', '方向相同', '存在即陪伴'],
      tips: [
        '你提供的规律照顾就是最好的爱，不需要做更多',
        '我每天安静等待然后自然迎接你——从不焦虑说明我信你',
        '偶尔在准时投喂之外加一个摸头，我会记住的'
      ],
      circleText: '我是“定时投喂型人类”：不多不少刚刚好。各自运行方向相同，存在即陪伴🌐 #它眼中的你 #人宠关系测试PETI'
    },
    FLPD: {
      title: '各自精彩型人类',
      subtitle: '本汪认证：你给我最好的礼物，就是自由',
      goldQuote: '你忙你的，我玩我的——但挺想你的。',
      subQuote: '最高级的关系，是各自精彩又互相惦记。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['独立灵魂', '自由即爱', '各自闪光'],
      emotionTag: '独立型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '奔向你指数', value: 35 },
        { label: '情感浓度', value: 40 },
        { label: '伙伴默契', value: 82 },
        { label: '探索欲望', value: 90 }
      ],
      petComment: '你看你的剧，我啃我的骨头。谁也别打扰谁——但你看完过来摸摸我。',
      summary: '你们是典型的"各自精彩，偶尔想你"型关系。',
      description: '你不强迫它表演亲密，它也不依赖你到失去自我。别人说你养的像野狗，你知道那叫活得像一只真正自由的狗。你的放手让它成长为最自信的样子。',
      keywords: ['互不干涉', '各自精彩', '偶尔交汇'],
      tips: [
        '我想玩就玩想躺就躺——你给的自由是最好的礼物',
        '我不搭理你不是不爱，是在享受你给的独立空间',
        '偶尔我主动靠过来的时刻——那才是最珍贵的瞬间'
      ],
      circleText: '“各自精彩型人类”——你忙你的我玩我的，但挺想你的。不黏不远各自闪光偶尔交汇✨ #它眼中的你 #人宠关系测试PETI'
    },
    FLPR: {
      title: '命中注定型人类',
      subtitle: '本汪认证：没有理由，你们就是该在一起的',
      goldQuote: '什么也没做，但什么都刚好。',
      subQuote: '不知道怎么就选了你，但绝对不退货。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['命中注定', '不需要理由', '天选同框'],
      emotionTag: '缘分型',
      posterTheme: 'lavender',
      indices: [
        { label: '奔向你指数', value: 40 },
        { label: '情感浓度', value: 38 },
        { label: '伙伴默契', value: 88 },
        { label: '安稳指数', value: 85 }
      ],
      petComment: '也不知道怎么就选了你——但既然选了，这辈子就这样了。退货通道已关闭。',
      summary: '你们是典型的"没有理由，就是该在一起"型关系。',
      description: '不是轰轰烈烈的爱，但就是莫名合拍。你不刻意改变它，它也不要求你做什么。你们的相遇没有太多戏剧性，但有一种这只狗就该是我的的笃定。',
      keywords: ['命中注定', '就是你', '安静同框'],
      tips: [
        '这种关系不需要经营——保持各自的样子就是最好的状态',
        '你没想过换一只狗我也没想过跟别人走——这就够了',
        '有些缘分不需要轰轰烈烈，安安静静同框一辈子就够了'
      ],
      circleText: '传说款！“命中注定型人类”——什么也没做但什么都刚好，这辈子就这样了不退货💫 #它眼中的你 #人宠关系测试PETI'
    }
  }
}

module.exports = dogData
