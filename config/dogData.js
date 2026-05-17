/**
 * 狗狗版 - 它眼中的你 · 人宠关系测试
 * 配置文件：品牌 + 维度 + 1预判题 + 12正式题 + 4彩蛋题 + 16 种关系结果
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
    ],
    homeCTA: {
      subtitle: '是全世界、遛弯机，还是零食贩卖机？',
      btnText: '开始本汪认证',
      uploadCTA: '上传你家狗照片，生成专属关系卡'
    },
    posterGuideText: '扫码测测你在它心里是什么身份',
    posterGuideText520: '5.20 测测你在它心里是什么身份',
    poster520Quote: '5.20 不一定要人类告白，本汪已经认证你了',
    promoTexts: {
      petGroup: [
        '我测出来是「{title}」，有点被我家狗感动到。\n你们也测一下，看你在狗眼里是饭票、司机，还是全世界。',
        '这测试太真实了，我是「{title}」……{goldQuote}',
        '来！测测你家修勾怎么看你的。我测出来笑了五分钟。'
      ],
      moments: [
        '测完发现我是「{title}」—— {goldQuote}\n被自己家狗认证了属于是。',
        '{goldQuote}\n我在它心里原来是这样的……你们也来测测'
      ],
      moments520: [
        '5.20 不一定要人类告白，我家毛孩子已经给我发身份认证了。\n我是「{title}」，你们是什么？'
      ]
    }
  },
  dimensions: {
    SF: { positive: '稳定照护', negative: '松弛随缘' },
    HL: { positive: '上头表达', negative: '克制陪伴' },
    CP: { positive: '规矩操心', negative: '平等惯着' },
    DR: { positive: '遛狗探索', negative: '宅家日常' }
  },
  midFeedback: [
    { after: 4, text: '汪！系统检测到：这个人类很容易被尾巴打败。' },
    { after: 8, text: '狗狗备注：你可能已经被列入"最重要的人类名单"。' },
    { after: 12, text: '本汪审查完毕，正在生成你的人类档案...' }
  ],
  questions: [
    { id: 0, type: 'prediction', scene: '你和它平时更像哪种关系？', options: [
      { text: '甜蜜黏人，它是你的尾巴你是它的全世界', predKey: 'sweet' },
      { text: '相爱相杀，天天拆家但谁也离不开谁', predKey: 'bicker', tScore: 2 },
      { text: '各过各的，它玩它的你忙你的', predKey: 'quiet' },
      { text: '它是老大，你就是遛弯工具人', predKey: 'worker', tScore: 1 }
    ]},
    { id: 1, type: 'normal', scene: '你刚拿起钥匙，狗已经坐在门口，尾巴摇成螺旋桨。', dimensions: 'SF_HL', options: [
      { text: '蹲下来抱抱它："乖，等我回来，饭点不变"', score: 'SH' },
      { text: '摸摸头再出门，让它知道你会回来', score: 'SL' },
      { text: '嘴上说"别演了"，出门前还是偷偷回头看', score: 'FH', tScore: 1 },
      { text: '正常出门，它已经习惯你的节奏', score: 'FL' }
    ]},
    { id: 2, type: 'normal', scene: '你回家开门，狗像一颗炮弹冲过来，尾巴快甩脱。', dimensions: 'SF_HL', options: [
      { text: '立刻接住它，蹲下来让它舔个够', score: 'SH' },
      { text: '先让它冷静一点，再慢慢互动', score: 'SL' },
      { text: '一边躲一边笑骂："至于吗你这戏精！"', score: 'FH', tScore: 1 },
      { text: '淡定换鞋，它扑几下就好了', score: 'FL' }
    ]},
    { id: 3, type: 'normal', scene: '出差三天回来，狗叫到像在控诉你不忠。', dimensions: 'SF_HL', options: [
      { text: '抱着它道歉："对不起让你等太久了"', score: 'SH' },
      { text: '坐在旁边陪它，等它慢慢安心', score: 'SL' },
      { text: '边逗它边说："想我想疯了吧，这演技值个小金人"', score: 'FH', tScore: 1 },
      { text: '它激动一阵就好，先恢复日常节奏', score: 'FL' }
    ]},
    { id: 4, type: 'normal', scene: '狗叼走了你最贵的鞋，还一脸骄傲地看着你。', dimensions: 'SF_CP', options: [
      { text: '追过去拿回来，认真说"这个不可以"', score: 'SC' },
      { text: '拿零食交换，让它知道鞋不是玩具', score: 'SP' },
      { text: '先拍视频发群控诉："看看这个败家子"', score: 'FC', tScore: 1 },
      { text: '边骂边追："你等着"，但语气完全不凶', score: 'FP', tScore: 1 }
    ]},
    { id: 5, type: 'normal', scene: '遛弯时，狗突然冲向陌生人，像发现了新朋友。', dimensions: 'SF_CP', options: [
      { text: '立刻拉回，先确认对方是否愿意接触', score: 'SC' },
      { text: '让它靠近闻闻，但你全程盯着安全', score: 'SP' },
      { text: '开心介绍："它很热情不咬人的"', score: 'FC' },
      { text: '松松牵引绳，让它自己判断要不要过去', score: 'FP' }
    ]},
    { id: 6, type: 'normal', scene: '到医院门口，狗突然刹车，眼神像在说"你背叛我"。', dimensions: 'HL_CP', options: [
      { text: '用零食一点点引导，全程轻声安抚', score: 'HC' },
      { text: '直接抱进去，该看病还是得看', score: 'LC' },
      { text: '在旁边铺上它熟悉的小毯子让它安心', score: 'HP' },
      { text: '心疼但坚定："你恨我也得看"', score: 'LP', tScore: 1 }
    ]},
    { id: 7, type: 'normal', scene: '凌晨被响动吵醒，发现客厅被拆了，狗坐在残骸旁摇尾巴。', dimensions: 'HL_CP', options: [
      { text: '先检查它有没有受伤，再收拾残局', score: 'HC' },
      { text: '默默收拾完，关好门回去睡', score: 'LC' },
      { text: '对着它骂："你是不是疯了？"但语气越来越没底气', score: 'HP', tScore: 1 },
      { text: '叹口气：我养的不是狗，是碎纸机', score: 'LP' }
    ]},
    { id: 8, type: 'normal', scene: '下雨天没法遛弯，狗在家里憋得来回踱步。', dimensions: 'SF_DR', options: [
      { text: '在客厅陪它玩游戏，消耗一下精力', score: 'SD' },
      { text: '给它安排嗅闻垫和玩具，让它安静放电', score: 'SR' },
      { text: '穿上雨衣带它下楼短暂放风', score: 'FD' },
      { text: '今天就休息吧，少遛一次没关系', score: 'FR' }
    ]},
    { id: 9, type: 'normal', scene: '你想换一条新的遛弯路线，狗站在岔路口犹豫。', dimensions: 'SF_DR', options: [
      { text: '先走一小段，确认它不紧张再继续', score: 'SD' },
      { text: '还是老路线吧，熟悉的地方它更放松', score: 'SR' },
      { text: '直接带它探索新路，看它会不会兴奋', score: 'FD' },
      { text: '它想往哪边走，就跟着它走', score: 'FR' }
    ]},
    { id: 10, type: 'normal', scene: '狗学会了握手，第一时间冲你显摆，像在说"看我多棒"。', dimensions: 'HL_DR', options: [
      { text: '疯狂夸夸 + 零食奖励 + 拍视频', score: 'HD' },
      { text: '淡定奖励一下，继续巩固训练', score: 'LD' },
      { text: '对它说："就这？教了三天才学会？"然后偷偷发朋友圈', score: 'HR', tScore: 1 },
      { text: '摸摸它表示认可，回头给它加餐', score: 'LR' }
    ]},
    { id: 11, type: 'normal', scene: '你起床时，狗趴在你脚边睡得很香，像人形暖脚宝。', dimensions: 'HL_CP', options: [
      { text: '忍不住摸摸它脑袋再走', score: 'HC' },
      { text: '轻轻绕开，舍不得吵醒它', score: 'LC' },
      { text: '直接叫醒它："走啦，陪我开始新一天"', score: 'HP' },
      { text: '熟练跨过去：它是暖脚宝，我是闹钟，各司其职', score: 'LP', tScore: 1 }
    ]},
    { id: 12, type: 'normal', scene: '如果给你和狗的关系取个标题，你觉得更像？', dimensions: 'CP_DR', options: [
      { text: '《我骂它，但我最护着它》', score: 'PR', tScore: 1 },
      { text: '《它不说话，但默认跟你走》', score: 'CR' },
      { text: '《一个遛弯一个被遛，谁也没搞清谁遛谁》', score: 'PD', tScore: 1 },
      { text: '《我只是它的出门按钮和饭票》', score: 'CD', tScore: 1 }
    ]},
    { id: 13, type: 'bonus', bonus: true, scene: '如果狗突然会给你发微信，它第一句大概率是？', dimensions: 'SF_HL', options: [
      { text: '你什么时候回来？！沙发不是我拆的！', score: 'FL' },
      { text: '你今天身上有别的狗味，需要解释。', score: 'SH' },
      { text: '我不是在等你！我只是恰好坐在门口！', score: 'FH' },
      { text: '刚才冲你叫不是凶你，是太开心了说不出话。', score: 'SL' }
    ]},
    { id: 14, type: 'bonus', bonus: true, scene: '如果狗偷偷给你写年度评价，它会写？', dimensions: 'CP_DR', options: [
      { text: '此人类情绪稳定，适合长期追随。', score: 'CR' },
      { text: '遛弯速度一般，但态度良好，可以留用。', score: 'CD' },
      { text: '零食发放不够及时，有待改进。', score: 'PD' },
      { text: '已被驯化成功，可继续投喂。', score: 'PR' }
    ]},
    { id: 15, type: 'bonus', bonus: true, scene: '朋友说你太宠狗了，你的真实想法是？', dimensions: 'SF_CP', options: [
      { text: '这还叫宠？它值得最好的一切。', score: 'SC' },
      { text: '它就这么傻一只，我不宠谁宠。', score: 'FC' },
      { text: '我知道，但它一用眼神看我我就投降。', score: 'SP' },
      { text: '没办法，谁让它是这个家真正的老板。', score: 'FP' }
    ]},
    { id: 16, type: 'bonus', bonus: true, scene: '如果狗能给你颁一个奖，它会颁给你？', dimensions: 'HL_DR', options: [
      { text: '最好骗人类奖——叫一声就给零食。', score: 'HD' },
      { text: '最会开门奖——遛弯从不迟到。', score: 'LR' },
      { text: '最适合当枕头奖——体温刚刚好。', score: 'LD' },
      { text: '最离不开本汪奖——出门还回头看。', score: 'HR' }
    ]}
  ],
  relationships: {
    SHCD: {
      title: '本汪全世界', subtitle: '本汪认证：你就是它冲过来的唯一理由。',
      goldQuote: '你只是回了趟家，它却等回了整个世界。', subQuote: '对它来说，你出门五分钟和五年没有区别。',
      rare: '前3%', rareLevel: '3%', posterBadge: '仅3%人类获得此认证',
      tags: ['全世界本人', '被狗偏爱', '回家开关', '本汪唯一'], emotionTag: '热烈型', posterTheme: 'warmOrange',
      indices: [{ label: '奔向你指数', value: 99 },{ label: '情感浓度', value: 95 },{ label: '操心程度', value: 92 },{ label: '探索欲望', value: 80 }],
      petComment: '你出门的时候，我真的会等你。你回来那一秒，今天才算开始。',
      summary: '你就是本汪全世界',
      description: '它不懂复杂表达，只知道你出现时，所有快乐都回来了。',
      keywords: ['全世界都是你', '毫无保留', '认定了你'],
      tips: ['回家先看我一眼', '摸头可以多一点', '我那么疯，是攒了太多想你'],
      customIndices: [{ label: '冲向你指数', value: 99, comment: '根本刹不住' }, { label: '摇尾巴速度', value: 97, comment: '快要起飞了' }, { label: '等门时长', value: 95, comment: '你出门就开始' }, { label: '快乐传染值', value: 92, comment: '全小区都知道' }],
      relationshipDef: { headline: '你就是本汪的全世界', detail: '每次你打开门的瞬间，它冲向你的速度比任何语言都诚实。你就是它等了一整天的答案。', cards: [{ label: '依恋模式', value: '满格冲锋' }, { label: '核心需求', value: '你在就好' }, { label: '关系本质', value: '毫无保留' }] },
      miniCards: [{ label: '本汪身份', value: '全世界都是你' },{ label: '关系模式', value: '冲过去接住' },{ label: '奔向你指数', value: '99%' },{ label: '本汪评价', value: '你一开门我就起飞' }],
      tOverride: { title: '相爱相杀训练搭子', goldQuote: '你以为你在训练它，其实它也在训练你。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？那当然——你一开门我就冲过去，这不叫黏人叫本能。', bicker: '互怼？我不跟你怼，我只负责冲过去和摇尾巴。你嘴上骂我的时候尾巴也在摇。', quiet: '安静同居？你确定？你出门五分钟我就在门口等了五年。', worker: '打工人？你哪里是打工，你是我的全世界，全世界不接受辞职。' },
      circleTexts: ['我是狗狗全世界型人类——它只是等我回家，却等回了整个世界 #它眼中的你 #人宠关系测试PETI','我家狗看到我回来的反应，比中了彩票还夸张。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '我只是回个家，它却像等到了全世界。'
    },
    SHCR: {
      title: '狗狗安全感本人', subtitle: '本汪认证：你不用做什么特别的事，你在就够了。',
      goldQuote: '你在，它就安心。', subQuote: '它跟在你身后的每一步，都是在说有你就安心。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['安全感来源', '稳定日常', '跟到哪都安心', '恒温陪伴'], emotionTag: '治愈型', posterTheme: 'milkWhite',
      indices: [{ label: '奔向你指数', value: 80 },{ label: '情感浓度', value: 72 },{ label: '操心程度', value: 85 },{ label: '安稳指数', value: 95 }],
      petComment: '我不是非要黏你，我只是觉得你在旁边比较踏实。',
      summary: '你在就是最好的日常',
      description: '它最需要的不是刺激，而是确定。你每天稳定出现，就是它最喜欢的日常。',
      keywords: ['如约而至', '日常即爱', '稳稳的幸福'],
      tips: ['别突然改变节奏', '偶尔跟我说句话，我听语气就懂', '我跟着你，是因为你让我安心'],
      customIndices: [{ label: '粘人浓度', value: 95, comment: '走哪跟哪' }, { label: '守门忠诚度', value: 93, comment: '门口定点等' }, { label: '摇尾巴速度', value: 78, comment: '稳定摇摆中' }, { label: '撒娇频率', value: 70, comment: '偶尔蹭蹭腿' }],
      relationshipDef: { headline: '你在就够了', detail: '它不需要你做什么特别的事。你存在本身，就是它每天最大的安全感来源。', cards: [{ label: '依恋模式', value: '默默跟随' }, { label: '核心需求', value: '你别走远' }, { label: '关系本质', value: '稳稳的安心' }] },
      miniCards: [{ label: '本汪身份', value: '安全感来源' },{ label: '关系模式', value: '你在就够了' },{ label: '安稳指数', value: '95%' },{ label: '本汪评价', value: '跟到哪都安心' }],
      tOverride: { title: '相爱相杀训练搭子', goldQuote: '你以为你在训练它，其实它也在训练你。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？嗯，你确实随叫随到，但本汪只是觉得你挺靠谱。', bicker: '互怼？你倒是想怼，但每次看我用眼神看你就投降了。', quiet: '安静同居挺好的。你在那边坐着，我在这边跟着，各自安好。', worker: '员工？不，你是本汪永久编制内的安全基地，级别比员工高。' },
      circleTexts: ['我是狗狗安全感本人——不用做什么在就够了 #它眼中的你 #人宠关系测试PETI','我家狗跟到厕所门口等——这不叫跟踪叫安全巡逻。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '我测出来是狗狗安全感本人。它不是黏人，是觉得我在就安心。'
    },
    SHPD: {
      title: '热血冒险搭子', subtitle: '本汪认证：有你在，去哪都敢冲。',
      goldQuote: '它不怕路远，怕的是身边没有你。', subQuote: '它不怕路远，怕的是身边没有你。',
      rare: '前8%', rareLevel: '8%', posterBadge: '仅8%人类解锁此身份',
      tags: ['一起冲', '冒险搭子', '撑腰本人', '联合巡街'], emotionTag: '勇敢型', posterTheme: 'mintGreen',
      indices: [{ label: '奔向你指数', value: 85 },{ label: '情感浓度', value: 82 },{ label: '伙伴默契', value: 95 },{ label: '探索欲望', value: 98 }],
      petComment: '今天去哪？本汪先探路！你在后面，我就什么都不怕。',
      summary: '有你在去哪都敢冲',
      description: '你不是单方面带它出门，你们更像一起探索世界的队友。',
      keywords: ['并肩冲锋', '你在我就敢', '最佳搭档'],
      tips: ['多带我看看新地方', '让我也偶尔带路', '有你撑腰，我胆子会变大'],
      customIndices: [{ label: '出门疯跑值', value: 98, comment: '完全收不住' }, { label: '冲向你指数', value: 90, comment: '并肩冲锋型' }, { label: '接住飞盘率', value: 88, comment: '配合超默契' }, { label: '快乐传染值', value: 95, comment: '嗨到全场沸腾' }],
      relationshipDef: { headline: '并肩冲锋的搭档', detail: '你不是在前面拉着它，而是并肩跑在一起。你的勇敢让它相信世界没有可怕的事。', cards: [{ label: '依恋模式', value: '并肩冲锋' }, { label: '核心需求', value: '一起出发' }, { label: '关系本质', value: '最佳搭档' }] },
      miniCards: [{ label: '本汪身份', value: '冒险搭子' },{ label: '关系模式', value: '并肩冲锋' },{ label: '探索欲望', value: '98%' },{ label: '本汪评价', value: '有你在就敢冲' }],
      tOverride: { title: '快乐逆子饲养员', goldQuote: '它每天制造麻烦，也每天制造快乐。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你确实很甜——甜到愿意陪我上山下海到处冲。', bicker: '互怼？我们不叫互怼，叫互相壮胆——你冲我也冲！', quiet: '安静同居？你确定？你跟我在一起的画风明明是到处冒险。', worker: '打工人？你不是打工，你是我的冒险搭子——我们是合伙人关系。' },
      circleTexts: ['我是热血冒险搭子型人类——有我在它去哪都敢冲 #它眼中的你 #人宠关系测试PETI','别人遛狗叫散步，我们俩叫联合巡街。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '别人遛狗叫散步，我们俩叫联合巡街。'
    },
    SHPR: {
      title: '双向奔赴天花板', subtitle: '本汪认证：不需要语言，你们都懂。',
      goldQuote: '你不说话，它也知道你想它了。', subQuote: '你们之间最好的默契，就是不用说也都懂。',
      rare: '前25%', rareLevel: '25%', posterBadge: '25%人类是同款',
      tags: ['双向奔赴', '不用说也懂', '天生合拍', '最佳距离'], emotionTag: '温暖型', posterTheme: 'pinkPeach',
      indices: [{ label: '奔向你指数', value: 82 },{ label: '情感浓度', value: 70 },{ label: '伙伴默契', value: 90 },{ label: '安稳指数', value: 88 }],
      petComment: '你对我好，我都记得。我不会说，但我会用尾巴还给你。',
      summary: '不用说也都懂',
      description: '你们不是一方付出一方接受，而是互相回应、互相确认。',
      keywords: ['天生合拍', '互相奔赴', '不用说也懂'],
      tips: ['不用太用力，我们已经很好', '你给我空间，我也会自己回来', '安静趴在你脚边，就是我在选你'],
      customIndices: [{ label: '摇尾巴速度', value: 82, comment: '稳定而持久' }, { label: '粘人浓度', value: 75, comment: '恰到好处' }, { label: '快乐传染值', value: 88, comment: '互相感染中' }, { label: '被原谅概率', value: 95, comment: '你笑我就好了' }],
      relationshipDef: { headline: '不说也懂的默契', detail: '你们之间最好的关系，就是不用语言也能确认彼此的心意。双向奔赴，才是最高级的陪伴。', cards: [{ label: '依恋模式', value: '双向奔赴' }, { label: '核心需求', value: '互相确认' }, { label: '关系本质', value: '天生合拍' }] },
      miniCards: [{ label: '本汪身份', value: '双向奔赴对象' },{ label: '关系模式', value: '不说也懂' },{ label: '默契指数', value: '90%' },{ label: '本汪评价', value: '你好我加倍还' }],
      tOverride: { title: '零食外交官', goldQuote: '它一坐下，你就开始掏零食。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？嗯，你们确实很甜——你对我好我加倍还，这就是双向奔赴。', bicker: '互怼？你确定？你们明明是那种安静看着对方就很开心的类型。', quiet: '安静同居也很好。你不说话我也知道你想我了——这叫默契。', worker: '打工人？你这个打工人待遇太好了——本汪给你发的是终身合同。' },
      circleTexts: ['我是双向奔赴天花板——不说话它也知道我想它了 #它眼中的你 #人宠关系测试PETI','你对它好它加倍还——这种双向奔赴谁不想要。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '测出来是双向奔赴天花板。有点感动，它好像真的懂我。'
    },
    SLCD: {
      title: '嘴硬守护型人类', subtitle: '本汪认证：嘴上说别闹，手已经在摸头。',
      goldQuote: '你不说爱，但全都做到了。', subQuote: '你从不说爱，但它的一切你都安排得最好。',
      rare: '前8%', rareLevel: '8%', posterBadge: '仅8%人类解锁此身份',
      tags: ['嘴硬心软', '行动派', '暗地操心', '沉默守护'], emotionTag: '深情型', posterTheme: 'coolGray',
      indices: [{ label: '奔向你指数', value: 65 },{ label: '情感浓度', value: 58 },{ label: '操心程度', value: 96 },{ label: '探索欲望', value: 78 }],
      petComment: '你嘴上嫌我麻烦，但你每次都第一个发现我不对劲。',
      summary: '嘴上不说但全做到了',
      description: '你不是会大声表达的人，但疫苗、驱虫、饭点、情绪变化，你一样都没落下。',
      keywords: ['沉默的爱', '始终如一', '不说但全做到'],
      tips: ['偶尔也可以直接夸我', '我知道你嘴硬', '摸头这件事可以不用偷偷做'],
      customIndices: [{ label: '守门忠诚度', value: 96, comment: '听声辨位中' }, { label: '等门时长', value: 90, comment: '门口蹲守专家' }, { label: '撒娇频率', value: 55, comment: '偶尔才蹭蹭' }, { label: '被原谅概率', value: 99, comment: '一个眼神就够' }],
      relationshipDef: { headline: '不说但全做到', detail: '你的爱从不张扬，但它从未错过你任何一个细微的关心。沉默是你的方式，它全都收到了。', cards: [{ label: '依恋模式', value: '沉默深情' }, { label: '核心需求', value: '被看见就好' }, { label: '关系本质', value: '行动即是爱' }] },
      miniCards: [{ label: '本汪身份', value: '沉默守护者' },{ label: '关系模式', value: '不说但全做到' },{ label: '操心程度', value: '96%' },{ label: '本汪评价', value: '偷偷照顾被发现了' }],
      tOverride: { title: '相爱相杀训练搭子', goldQuote: '你以为你在训练它，其实它也在训练你。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你表面不是挺酷的吗？但半夜偷偷盖被子这件事暴露了你。', bicker: '互怼？你这种沉默型的互怼方式太深情了——嘴上骂完手就开始摸头。', quiet: '安静同居说得对。你嘴上是挺安静的，手上可一点没闲着。', worker: '打工人？你这个打工人嘴硬心软，加班费都不要还倒贴零食。' },
      circleTexts: ['我是沉默守护型人类——嘴上说别闹手已经在摸头了 #它眼中的你 #人宠关系测试PETI','我的爱从不张扬，但它一分不落地收到了。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '嘴上说别闹，手已经在摸头了。太准了。'
    },
    SLCR: {
      title: '靠谱遛弯官', subtitle: '本汪认证：你不热烈，但每天都在。',
      goldQuote: '你准时出现，就是它最稳的幸福。', subQuote: '你的靠谱是它最不张扬的幸福来源。',
      rare: '前25%', rareLevel: '25%', posterBadge: '25%人类是同款',
      tags: ['准时即爱', '靠谱本人', '雷打不动', '日常很稳'], emotionTag: '踏实型', posterTheme: 'teaBrown',
      indices: [{ label: '奔向你指数', value: 62 },{ label: '情感浓度', value: 55 },{ label: '操心程度', value: 82 },{ label: '安稳指数', value: 96 }],
      petComment: '我最喜欢的不是大惊喜，是你每天都会出现。',
      summary: '每天如约而至',
      description: '你们的爱不靠惊喜，靠重复。每天都在，就是最让狗安心的事。',
      keywords: ['准时即爱', '简单靠谱', '雷打不动'],
      tips: ['遛弯时间尽量固定', '偶尔多走五分钟，我会很开心', '稳定就是最好的礼物'],
      customIndices: [{ label: '守门忠诚度', value: 96, comment: '准时蹲点型' }, { label: '摇尾巴速度', value: 72, comment: '平稳节奏型' }, { label: '等门时长', value: 60, comment: '掐着点等' }, { label: '粘人浓度', value: 55, comment: '不远不近刚好' }],
      relationshipDef: { headline: '准时即是爱', detail: '你不热烈，但从未缺席。每天如约而至的脚步声，就是它心里最踏实的节拍器。', cards: [{ label: '依恋模式', value: '定时相见' }, { label: '核心需求', value: '规律感' }, { label: '关系本质', value: '简单靠谱' }] },
      miniCards: [{ label: '本汪身份', value: '靠谱遛弯官' },{ label: '关系模式', value: '规律陪伴' },{ label: '准时指数', value: '98%' },{ label: '本汪评价', value: '每天都等得到' }],
      tOverride: { title: '松弛同居型人类', goldQuote: '不用天天黏着，但它知道你在。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你确定说的是你们？你连遛弯都是准时准点的。', bicker: '互怼？你这人连怼都是温吞的，最多皱个眉就继续遛弯了。', quiet: '安静同居，非常准确。你就是那个安静又准时的靠谱遛弯人。', worker: '打工人？你是那种准时上下班、从不加班也从不迟到的模范员工。' },
      circleTexts: ['我是靠谱遛弯人型人类——不热烈但每天都在 #它眼中的你 #人宠关系测试PETI','我家狗固定时间摇尾巴不是因为饿，是因为知道我快来了。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '我测出来是靠谱遛弯官。不浪漫，但每天都在。'
    },
    SLPD: {
      title: '安静领航员', subtitle: '本汪认证：你给它自由，也给它底气。',
      goldQuote: '它跑多远都不怕，因为知道你在。', subQuote: '你不牵绳也不怕，因为它永远会回头找你。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['给自由的人', '安静同行', '信任满分', '不强迫'], emotionTag: '稳重型', posterTheme: 'lavender',
      indices: [{ label: '奔向你指数', value: 60 },{ label: '情感浓度', value: 50 },{ label: '伙伴默契', value: 92 },{ label: '探索欲望', value: 88 }],
      petComment: '我不是不回头，我只是知道你一定在那里。',
      summary: '跑多远都不怕',
      description: '你不急着控制它，也不放任它失控。你给的自由，是有安全底线的自由。',
      keywords: ['自由的陪伴', '不控制', '永远在旁边'],
      tips: ['给我探索空间', '但别真的放开安全线', '我回头看你时，请回应我'],
      customIndices: [{ label: '出门疯跑值', value: 88, comment: '自由奔跑中' }, { label: '冲向你指数', value: 60, comment: '跑远了才回头' }, { label: '接住飞盘率', value: 85, comment: '独立完成型' }, { label: '快乐传染值', value: 78, comment: '安静的快乐' }],
      relationshipDef: { headline: '不控制但永远在', detail: '你从不替它做决定，只是默默陪着走每一步。它跑多远都不怕，因为知道你在身后。', cards: [{ label: '依恋模式', value: '自由同行' }, { label: '核心需求', value: '有人在身后' }, { label: '关系本质', value: '信任满分' }] },
      miniCards: [{ label: '本汪身份', value: '自由探索者' },{ label: '关系模式', value: '你在后面守着' },{ label: '信任指数', value: '92%' },{ label: '本汪评价', value: '我敢跑，因为你在' }],
      tOverride: { title: '人形遛弯按钮', goldQuote: '你不是主人，你是它的出门开关。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你佛系得很，但偷偷看我的眼神出卖了你。', bicker: '互怼？你连怼都是沉默式的——用一个眼神就把我翻译完了。', quiet: '安静同居是对的。你最大的能力就是安静地陪我走每一步。', worker: '打工人？你这种领航员级别的人类，不是打工，是特聘。' },
      circleTexts: ['我是安静领航员型人类——不控制方向但一直陪着走 #它眼中的你 #人宠关系测试PETI','它跑多远都不怕，因为知道我在。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '它跑多远都不怕，因为知道我在。这个结果有点戳。'
    },
    SLPR: {
      title: '高质量陪伴型人类', subtitle: '本汪认证：不用时时互动，在一起就舒服。',
      goldQuote: '沙发两头，各自舒服，也挺好。', subQuote: '在一起但互不打扰，就是你们最舒服的距离。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['零压力', '高级默契', '安静陪伴', '舒服关系'], emotionTag: '默契型', posterTheme: 'coolGray',
      indices: [{ label: '奔向你指数', value: 50 },{ label: '情感浓度', value: 45 },{ label: '伙伴默契', value: 85 },{ label: '安稳指数', value: 90 }],
      petComment: '不用一直叫我，也不用一直陪我玩。你在那边，我就安心。',
      summary: '在一起就安心',
      description: '你们不需要时时互动来证明感情。稳定、舒服、不紧绷，就是最好的陪伴。',
      keywords: ['舒适距离', '无压力共处', '在就安心'],
      tips: ['不用一直逗我', '我安静趴着也很开心', '你别走太远就行'],
      customIndices: [{ label: '粘人浓度', value: 50, comment: '保持距离型' }, { label: '摇尾巴速度', value: 60, comment: '不急不慢' }, { label: '撒娇频率', value: 45, comment: '偶尔才撒' }, { label: '被原谅概率', value: 90, comment: '本来就没生气' }],
      relationshipDef: { headline: '各自舒服的默契', detail: '不黏不远，在一起就安心。你给的是最高级的爱：存在感而非压迫感。', cards: [{ label: '依恋模式', value: '各自安好' }, { label: '核心需求', value: '互不打扰' }, { label: '关系本质', value: '高级默契' }] },
      miniCards: [{ label: '本汪身份', value: '安静陪伴对象' },{ label: '关系模式', value: '同空间共处' },{ label: '舒服程度', value: '95%' },{ label: '本汪评价', value: '你在旁边就行' }],
      tOverride: { title: '松弛同居型人类', goldQuote: '不用天天黏着，但它知道你在。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你们？你连多看它一眼都怕打扰到对方。', bicker: '互怼？你们这种互怼方式太高级了——用沉默表达一切。', quiet: '安静同居，终于有个说法精准的了。各自舒服，完美。', worker: '打工人？你是那种到点下班、绝不多留一秒的高质量室友型员工。' },
      circleTexts: ['我是高质量陪伴型人类——沙发两头各自舒服 #它眼中的你 #人宠关系测试PETI','在一起不用说话就是最好的距离。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '我和狗的关系就是：沙发两头，各自舒服，也挺好。'
    },
    FHCD: {
      title: '狗狗人生策划师', subtitle: '本汪认证：它负责开心，你负责把生活安排明白。',
      goldQuote: '你的爱太满，它都快溢出来了。', subQuote: '它以为全世界都是好人——因为你就是它的全世界。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['狗生规划', '精致养狗', '宠爱满格', '操心但甜'], emotionTag: '甜蜜型', posterTheme: 'pinkPeach',
      indices: [{ label: '奔向你指数', value: 75 },{ label: '情感浓度', value: 92 },{ label: '操心程度', value: 95 },{ label: '探索欲望', value: 82 }],
      petComment: '今天又是什么项目？游泳、训练、零食测评，还是拍照？',
      summary: '有你什么都开心',
      description: '你给它安排的不只是吃喝拉撒，而是完整狗生体验。',
      keywords: ['无条件宠爱', '安排明白', '甜蜜到齁'],
      tips: ['可以安排，但别排太满', '我开心最重要', '有时候普通遛弯也很好'],
      customIndices: [{ label: '摇尾巴速度', value: 95, comment: '兴奋到模糊' }, { label: '撒娇频率', value: 99, comment: '随时随地撒' }, { label: '快乐传染值', value: 96, comment: '感染全家人' }, { label: '被原谅概率', value: 100, comment: '从没被骂过' }],
      relationshipDef: { headline: '宠爱没有上限', detail: '你给什么它都开心，但它最开心的永远是有你。你教会了它一件事：世界是安全的。', cards: [{ label: '依恋模式', value: '无条件信赖' }, { label: '核心需求', value: '你开心就好' }, { label: '关系本质', value: '甜蜜到齁' }] },
      miniCards: [{ label: '本汪身份', value: '被安排明白的狗' },{ label: '关系模式', value: '狗生规划' },{ label: '宠爱浓度', value: '98%' },{ label: '本汪评价', value: '生活质量很高' }],
      tOverride: { title: '快乐逆子饲养员', goldQuote: '它每天制造麻烦，也每天制造快乐。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？那当然——你给的爱太满了，我都快溢出来了。', bicker: '互怼？你每次怼完还是会给我买新玩具，这叫什么互怼。', quiet: '安静同居？你安静？你给我安排的活动比我自己想的还多。', worker: '打工人说法太谦虚了——你是我的狗生规划师兼后勤部长。' },
      circleTexts: ['我是狗狗人生策划师——爱太满它都快溢出来了 #它眼中的你 #人宠关系测试PETI','又！买！新！的！了！好耶好耶好耶！','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '测完发现，我不是养狗，是在给它规划狗生。'
    },
    FHCR: {
      title: '人形零食机', subtitle: '本汪认证：你一伸手，它的世界就亮了。',
      goldQuote: '你递啥它都接，开心得像中了彩票。', subQuote: '你的口袋是它眼中永远的宝库。',
      rare: '前8%', rareLevel: '8%', posterBadge: '仅8%人类解锁此身份',
      tags: ['零食管理员', '快乐充电站', '好骗但心甘', '满电出发'], emotionTag: '能量型', posterTheme: 'warmOrange',
      indices: [{ label: '奔向你指数', value: 78 },{ label: '情感浓度', value: 88 },{ label: '操心程度', value: 72 },{ label: '安稳指数', value: 85 }],
      petComment: '我不是贪吃，我只是觉得你手里总有好东西。',
      summary: '靠近你就满血复活',
      description: '你是它的快乐补给站。零食只是表面，真正让它兴奋的是你给出的回应。',
      keywords: ['人形充电桩', '快乐供给站', '满电出发'],
      tips: ['零食可以有，但别太频繁', '夸夸也算奖励', '我看你手，不一定只是在看吃的'],
      customIndices: [{ label: '冲向你指数', value: 88, comment: '一叫就冲过来' }, { label: '摇尾巴速度', value: 92, comment: '看到零食加速' }, { label: '快乐传染值', value: 90, comment: '你开心我更开心' }, { label: '撒娇频率', value: 85, comment: '撒娇换零食' }],
      relationshipDef: { headline: '靠近就能充满电', detail: '你一伸手它的世界就亮了。你给的不只是食物，还有每天都在线的情绪价值和快乐。', cards: [{ label: '依恋模式', value: '能量补给型' }, { label: '核心需求', value: '你的回应' }, { label: '关系本质', value: '快乐供给站' }] },
      miniCards: [{ label: '本汪身份', value: '人形零食机' },{ label: '关系模式', value: '靠近就有电' },{ label: '响应速度', value: '99%' },{ label: '本汪评价', value: '你递啥我都接着' }],
      tOverride: { title: '零食外交官', goldQuote: '它一坐下，你就开始掏零食。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你不是黏人，你是随叫随到的人形零食机。', bicker: '互怼？你哪有空跟我怼，你忙着给我换零食口味呢。', quiet: '安静同居？你安静？你一伸手我的世界就亮了，哪里安静了。', worker: '打工人说得非常精准——而且你是全年无休那种。' },
      circleTexts: ['我是人形零食机型人类——一伸手它的世界就亮了 #它眼中的你 #人宠关系测试PETI','你递啥我都接着，靠近我就满电出发。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '我家狗眼里的我：会买零食、会开门、偶尔有用。'
    },
    FHPD: {
      title: '快乐显眼包搭子', subtitle: '本汪认证：你们一出门，气氛就开始变吵。',
      goldQuote: '别人遛狗叫散步，你们叫联合巡街。', subQuote: '别人遛狗叫散步，你们俩叫联合巡街。',
      rare: '前3%', rareLevel: '3%', posterBadge: '仅3%人类获得此认证',
      tags: ['显眼包搭子', '联合巡街', '一起嗨', '快乐过载'], emotionTag: '灵魂型', posterTheme: 'lavender',
      indices: [{ label: '奔向你指数', value: 72 },{ label: '情感浓度', value: 95 },{ label: '伙伴默契', value: 98 },{ label: '探索欲望', value: 95 }],
      petComment: '你别装安静了，我们两个谁也别嫌谁吵。',
      summary: '灵魂伙伴互相选择',
      description: '你们不是主人和宠物，是两个快乐显眼包。一个负责冲，一个负责笑。',
      keywords: ['灵魂伙伴', '选择彼此', '热烈而平等'],
      tips: ['可以继续一起发疯', '但记得看路', '快乐归快乐，牵引绳别松'],
      customIndices: [{ label: '出门疯跑值', value: 98, comment: '联合巡街中' }, { label: '快乐传染值', value: 99, comment: '嗨翻全场' }, { label: '接住飞盘率', value: 95, comment: '默契满分' }, { label: '冲向你指数', value: 88, comment: '并肩出发型' }],
      relationshipDef: { headline: '互相选择的灵魂搭子', detail: '你们不是主人和宠物，是互相选择的灵魂伙伴。一起嗨、一起闹、一起当全场焦点。', cards: [{ label: '依恋模式', value: '灵魂搭子' }, { label: '核心需求', value: '一起嗨' }, { label: '关系本质', value: '热烈而平等' }] },
      miniCards: [{ label: '本汪身份', value: '显眼包搭子' },{ label: '关系模式', value: '联合巡街' },{ label: '快乐传染值', value: '99%' },{ label: '本汪评价', value: '走到哪一起嗨' }],
      tOverride: { title: '快乐逆子饲养员', goldQuote: '它每天制造麻烦，也每天制造快乐。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你们的甜蜜方式就是一起当显眼包——全世界都觉得你们很吵。', bicker: '互怼？你们确实天天互嗨，但谁也没真想让对方安静。', quiet: '安静同居？你确定？你们在一起的画风明明是联合巡街。', worker: '打工人？不，你们是搭子——平等合伙关系，不存在上下级。' },
      circleTexts: ['我是快乐显眼包搭子——不是主人和宠物是灵魂伙伴 #它眼中的你 #人宠关系测试PETI','别人遛狗叫散步，我们俩叫联合巡街。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '别人遛狗叫散步，我们俩叫联合巡街。'
    },
    FHPR: {
      title: '快乐贴贴型人类', subtitle: '本汪认证：你贴过来，它就赖上了。',
      goldQuote: '它不是黏人，它是认定你了。', subQuote: '你们在一起的画面，就是快乐最简单的样子。',
      rare: '前25%', rareLevel: '25%', posterBadge: '25%人类是同款',
      tags: ['贴贴达人', '快乐制造机', '被狗认领', '黏人搭子'], emotionTag: '快乐型', posterTheme: 'mintGreen',
      indices: [{ label: '奔向你指数', value: 70 },{ label: '情感浓度', value: 82 },{ label: '伙伴默契', value: 80 },{ label: '安稳指数', value: 75 }],
      petComment: '你一靠近，我就知道今天会很开心。',
      summary: '在一起就是快乐',
      description: '你们的快乐来得很直接。它喜欢靠近你，你也不介意被它占满生活。',
      keywords: ['快乐优先', '互相犯蠢', '每天都好玩'],
      tips: ['多摸摸我', '贴贴要及时', '但我太激动时，也可以教我冷静'],
      customIndices: [{ label: '粘人浓度', value: 92, comment: '贴上就不撒手' }, { label: '快乐传染值', value: 95, comment: '笑声停不下来' }, { label: '摇尾巴速度', value: 88, comment: '快乐摇摆中' }, { label: '撒娇频率', value: 90, comment: '分分钟撒娇' }],
      relationshipDef: { headline: '快乐就是主旋律', detail: '你们在一起永远在笑。它蠢你也蠢，但在一起就是停不下来的快乐，这就够了。', cards: [{ label: '依恋模式', value: '贴贴不撒手' }, { label: '核心需求', value: '一起开心' }, { label: '关系本质', value: '快乐优先' }] },
      miniCards: [{ label: '本汪身份', value: '贴贴搭子' },{ label: '关系模式', value: '靠近就快乐' },{ label: '贴贴浓度', value: '96%' },{ label: '本汪评价', value: '贴一下还不够' }],
      tOverride: { title: '零食外交官', goldQuote: '它一坐下，你就开始掏零食。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？那当然——你贴过来我就赖上了，永远别松手。', bicker: '互怼？你们这种互怼方式就是贴着贴着就笑了。', quiet: '安静同居？你们安静得了吗？在一起就是停不下来地笑。', worker: '打工人？你是那种被客户贴到脸上但从来不嫌弃的快乐员工。' },
      circleTexts: ['我是快乐贴贴型人类——它蠢我也蠢在一起就是快乐 #它眼中的你 #人宠关系测试PETI','贴贴贴贴！还要贴！永远别松手！','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '它不是黏人，是已经把我认领了。'
    },
    FLCD: {
      title: '人形遛弯按钮', subtitle: '本汪认证：你最大的超能力，是会打开门。',
      goldQuote: '你以为你在遛狗，其实是狗在遛你。', subQuote: '它嘴上叼着球跑开，回头还是冲你来的。',
      rare: '前3%', rareLevel: '3%', posterBadge: '仅3%人类获得此认证',
      tags: ['出门按钮', '遛弯工具人', '路线管理员', '被狗安排'], emotionTag: '反差型', posterTheme: 'teaBrown',
      indices: [{ label: '奔向你指数', value: 45 },{ label: '情感浓度', value: 40 },{ label: '操心程度', value: 94 },{ label: '探索欲望', value: 78 }],
      petComment: '别装了，我一看门口，你就知道该出门了。',
      summary: '表面工具人实际离不开',
      description: '你以为自己是主人，其实它已经把你训练成了稳定出门系统。',
      keywords: ['嘴上无所谓', '暗地超在乎', '反差深情'],
      tips: ['出门别拖太久', '路线可以换，但别少走', '我闻电线杆不是浪费时间，是读新闻'],
      customIndices: [{ label: '等门时长', value: 94, comment: '门口转圈专家' }, { label: '拆家冲动', value: 78, comment: '你不在就拆' }, { label: '守门忠诚度', value: 92, comment: '暗地超在乎' }, { label: '被原谅概率', value: 88, comment: '嘴硬心软型' }],
      relationshipDef: { headline: '嘴硬心软的反差', detail: '你以为你只是遛弯工具人，其实你是被它选中的。表面无所谓，暗地里谁也离不开谁。', cards: [{ label: '依恋模式', value: '反差深情' }, { label: '核心需求', value: '别说出来就好' }, { label: '关系本质', value: '暗地超在乎' }] },
      miniCards: [{ label: '本汪身份', value: '出门按钮' },{ label: '关系模式', value: '一叫就走' },{ label: '被遛指数', value: '95%' },{ label: '本汪评价', value: '会开门，很好' }],
      tOverride: { title: '相爱相杀训练搭子', goldQuote: '你以为你在训练它，其实它也在训练你。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你确定？你在狗面前的画风明明是"别烦我"然后默默操碎心。', bicker: '互怼？你连怼都是冷冷的，但遛弯从来都是准时的。', quiet: '安静同居倒是真的——你们一个比一个嘴硬，但谁也没想过分开。', worker: '打工人，精准。你以为你在遛狗？不，你已经入职狗家了。' },
      circleTexts: ['我是人形遛弯机型人类——以为自己在遛狗其实是被选中的 #它眼中的你 #人宠关系测试PETI','表面工具人实际谁也离不开谁。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '我不是主人，我是它的人形遛弯按钮。'
    },
    FLCR: {
      title: '定时投喂型人类', subtitle: '本汪认证：不多不少，刚刚好。',
      goldQuote: '你不搞花活，但饭点从不失误。', subQuote: '最靠谱的爱，就是什么都不多做一分。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['定时投喂', '各司其职', '佛系靠谱', '无声契约'], emotionTag: '佛系型', posterTheme: 'milkWhite',
      indices: [{ label: '奔向你指数', value: 42 },{ label: '情感浓度', value: 38 },{ label: '操心程度', value: 72 },{ label: '安稳指数', value: 92 }],
      petComment: '你可能不浪漫，但你从不忘记我的饭。这很重要。',
      summary: '各自运行方向相同',
      description: '你们的关系不是轰轰烈烈，但很稳。它知道你不会亏待它。',
      keywords: ['各自运行', '方向相同', '存在即陪伴'],
      tips: ['饭点别乱', '偶尔加个夸夸', '稳定比花样更重要'],
      customIndices: [{ label: '等门时长', value: 60, comment: '掐着饭点等' }, { label: '摇尾巴速度', value: 55, comment: '不急不慢型' }, { label: '守门忠诚度', value: 80, comment: '到点出现就行' }, { label: '撒娇频率', value: 35, comment: '极少主动撒' }],
      relationshipDef: { headline: '不多不少刚刚好', detail: '你给的恰好是它需要的，不多一分也不少一分。规律的照顾本身就是最踏实的爱。', cards: [{ label: '依恋模式', value: '各司其职' }, { label: '核心需求', value: '规律就好' }, { label: '关系本质', value: '存在即陪伴' }] },
      miniCards: [{ label: '本汪身份', value: '定时饭点' },{ label: '关系模式', value: '各司其职' },{ label: '稳定指数', value: '92%' },{ label: '本汪评价', value: '饭点很准，可以' }],
      tOverride: { title: '松弛同居型人类', goldQuote: '不用天天黏着，但它知道你在。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你？你连多摸我一下都觉得多余。但这种极简的爱我挺受用。', bicker: '互怼？你连怼的力气都省了——直接用效率解决一切问题。', quiet: '安静同居非常精准。你给的刚好是我最需要的：不打扰的照顾。', worker: '打工人？你是那种效率极高、到点下班、绝不加感情戏的极简员工。' },
      circleTexts: ['我是定时投喂型人类——不多不少刚刚好 #它眼中的你 #人宠关系测试PETI','各自运行方向相同，存在即陪伴。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '我测出来是定时投喂型人类。不浪漫，但饭点从不失误。'
    },
    FLPD: {
      title: '各自精彩型人类', subtitle: '本汪认证：你忙你的，它玩它的，但挺想你的。',
      goldQuote: '各自精彩，不代表不惦记。', subQuote: '最高级的关系，是各自精彩又互相惦记。',
      rare: '前8%', rareLevel: '8%', posterBadge: '仅8%人类解锁此身份',
      tags: ['独立灵魂', '自由即爱', '偶尔交汇', '高级尊重'], emotionTag: '独立型', posterTheme: 'mintGreen',
      indices: [{ label: '奔向你指数', value: 35 },{ label: '情感浓度', value: 40 },{ label: '伙伴默契', value: 82 },{ label: '探索欲望', value: 90 }],
      petComment: '我自己玩得很好，但不代表我不想你。',
      summary: '各自精彩偶尔想你',
      description: '你给它空间，它也给你自由。你们不需要天天黏在一起，但关系一直在。',
      keywords: ['互不干涉', '各自精彩', '偶尔交汇'],
      tips: ['别因为我独立就忽略我', '我主动靠近时，请回应', '自由和陪伴都要有'],
      customIndices: [{ label: '出门疯跑值', value: 90, comment: '自己玩得飞起' }, { label: '粘人浓度', value: 35, comment: '各玩各的' }, { label: '冲向你指数', value: 40, comment: '偶尔才冲' }, { label: '快乐传染值', value: 82, comment: '独立的快乐' }],
      relationshipDef: { headline: '各自精彩互相惦记', detail: '最高级的关系是各自精彩又互相惦记。你给的自由，让它成为了最自信的狗。', cards: [{ label: '依恋模式', value: '独立共处' }, { label: '核心需求', value: '自由空间' }, { label: '关系本质', value: '偶尔交汇' }] },
      miniCards: [{ label: '本汪身份', value: '独立灵魂' },{ label: '关系模式', value: '各自精彩' },{ label: '自由指数', value: '90%' },{ label: '本汪评价', value: '玩完会回来找你' }],
      tOverride: { title: '人形遛弯按钮', goldQuote: '你不是主人，你是它的出门开关。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你们明明各玩各的，但都没走远——这种甜蜜很高级。', bicker: '互怼？你们的互怼方式就是各自精彩地忽略对方——然后偶尔对视一下。', quiet: '安静同居说得对。你们各自精彩，偶尔交汇的瞬间才最珍贵。', worker: '打工人？不不不，你们是各自独立创业的合伙人。' },
      circleTexts: ['我是各自精彩型人类——你忙你的我玩我的但挺想你的 #它眼中的你 #人宠关系测试PETI','不黏不远各自闪光偶尔交汇就足够了。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '我和狗各自精彩，但它玩完还是会回来找我。'
    },
    FLPR: {
      title: '命中注定型人类', subtitle: '本汪认证：什么都没做，但什么都刚好。',
      goldQuote: '这辈子就这样了，不退货。', subQuote: '不知道怎么就选了你，但绝对不退货。',
      rare: '前3%', rareLevel: '3%', posterBadge: '仅3%人类获得此认证',
      tags: ['命中注定', '天选同框', '刚好合适', '退货关闭'], emotionTag: '缘分型', posterTheme: 'lavender',
      indices: [{ label: '奔向你指数', value: 40 },{ label: '情感浓度', value: 38 },{ label: '伙伴默契', value: 88 },{ label: '安稳指数', value: 85 }],
      petComment: '不知道为什么是你，但就是你。认了。',
      summary: '没有理由就是你',
      description: '你们没有特别用力经营，却莫名合拍。它遇到你，就像刚好找到了自己的位置。',
      keywords: ['命中注定', '就是你', '安静同框'],
      tips: ['别刻意证明关系', '继续这样就很好', '我认你了，不用多说'],
      customIndices: [{ label: '粘人浓度', value: 45, comment: '不远不近' }, { label: '摇尾巴速度', value: 50, comment: '不急不慢' }, { label: '被原谅概率', value: 92, comment: '天生包容型' }, { label: '守门忠诚度', value: 88, comment: '这辈子就你了' }],
      relationshipDef: { headline: '就是该在一起', detail: '什么也没做但什么都刚好。不知道怎么就选了你，但绝对不退货。这就是命中注定。', cards: [{ label: '依恋模式', value: '天选合拍' }, { label: '核心需求', value: '不需要理由' }, { label: '关系本质', value: '命中注定' }] },
      miniCards: [{ label: '本汪身份', value: '命中注定对象' },{ label: '关系模式', value: '刚好合拍' },{ label: '合拍指数', value: '88%' },{ label: '本汪评价', value: '认了，不换了' }],
      tOverride: { title: '松弛同居型人类', goldQuote: '不用天天黏着，但它知道你在。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你们这种命中注定的甜蜜，就是什么都不做但什么都刚好。', bicker: '互怼？你们佛系到连怼都懒得怼——但谁也没想过换一个。', quiet: '安静同居，完美形容。你们就是那种不需要理由就能待在一起的存在。', worker: '打工人？你不是打工，你是签了终身合同的命中注定合伙人。' },
      circleTexts: ['我是命中注定型人类——什么也没做但什么都刚好 #它眼中的你 #人宠关系测试PETI','不知道怎么就选了你，但绝对不退货。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '测出来是命中注定型人类。什么也没做，但什么都刚好。'
    }
  }
}

module.exports = dogData
