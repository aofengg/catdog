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
      title: '狗狗全世界型人类', subtitle: '本汪认证：你就是它冲过来的唯一理由',
      goldQuote: '你只是回了趟家，它却等回了整个世界。', subQuote: '对它来说，你出门五分钟和五年没有区别。',
      rare: '前3%', rareLevel: '3%', posterBadge: '仅3%人类获得此认证',
      tags: ['全世界本人', '被狗偏爱', '本汪唯一'], emotionTag: '热烈型', posterTheme: 'warmOrange',
      indices: [{ label: '奔向你指数', value: 99 },{ label: '情感浓度', value: 95 },{ label: '操心程度', value: 92 },{ label: '探索欲望', value: 80 }],
      petComment: '你一开门，本汪直接起飞！等你的每一秒都觉得好漫长，但看到你出现的瞬间什么都值了。你就是本汪冲过去的唯一理由。',
      summary: '你就是本汪全世界',
      description: '你一回家它的世界就亮了。疯狂奔向你的每个瞬间，都是因为确信你会回来，也会接住它。',
      keywords: ['全世界都是你', '毫无保留', '认定了你'],
      tips: ['你回来了就是今天最好的事。', '规律陪伴比突然加倍更安心。', '我那么疯，是攒了太多想你。'],
      customIndices: [{ label: '冲向你指数', value: 99, comment: '根本刹不住' }, { label: '摇尾巴速度', value: 97, comment: '快要起飞了' }, { label: '等门时长', value: 95, comment: '你出门就开始' }, { label: '快乐传染值', value: 92, comment: '全小区都知道' }],
      relationshipDef: { headline: '你就是本汪的全世界', detail: '每次你打开门的瞬间，它冲向你的速度比任何语言都诚实。你就是它等了一整天的答案。', cards: [{ label: '依恋模式', value: '满格冲锋' }, { label: '核心需求', value: '你在就好' }, { label: '关系本质', value: '毫无保留' }] },
      miniCards: [{ label: '本汪身份', value: '全世界都是你' },{ label: '关系模式', value: '冲过去接住' },{ label: '奔向你指数', value: '99%' },{ label: '本汪评价', value: '你就是全世界' }],
      tOverride: { title: '相爱相杀训练搭子', goldQuote: '你以为你在训练它，其实它也在训练你。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？那当然——你一开门我就冲过去，这不叫黏人叫本能。', bicker: '互怼？我不跟你怼，我只负责冲过去和摇尾巴。你嘴上骂我的时候尾巴也在摇。', quiet: '安静同居？你确定？你出门五分钟我就在门口等了五年。', worker: '打工人？你哪里是打工，你是我的全世界，全世界不接受辞职。' },
      circleTexts: ['我是狗狗全世界型人类——它只是等我回家，却等回了整个世界 #它眼中的你 #人宠关系测试PETI','我家狗看到我回来的反应，比中了彩票还夸张。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '测完发现我是"狗狗全世界型人类"——它只是等我回家，却等回了整个世界 被狗爱着真的太幸福了 #它眼中的你 #人宠关系测试PETI'
    },
    SHCR: {
      title: '狗狗安全感本人', subtitle: '本汪认证：你不用做什么特别的事，你在就够了',
      goldQuote: '你不用做什么，在就够了。', subQuote: '它跟在你身后的每一步，都是在说有你就安心。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['日常即幸福', '狗狗安心源', '恒温陪伴'], emotionTag: '治愈型', posterTheme: 'milkWhite',
      indices: [{ label: '奔向你指数', value: 80 },{ label: '情感浓度', value: 72 },{ label: '操心程度', value: 85 },{ label: '安稳指数', value: 95 }],
      petComment: '你在哪，本汪就跟到哪。你不用回头，我就在你身后。跟着你走的每一步，我都觉得踏实又安心。',
      summary: '你在就是最好的日常',
      description: '你把爱融进每天的细节里，按时遛弯定时喂饭。在它眼里你就是最温暖的日常本身。',
      keywords: ['如约而至', '日常即爱', '稳稳的幸福'],
      tips: ['你的规律就是我最大的心安，别轻易改变。', '跟着你走不是焦虑，是享受每一步。', '蹲下来跟我说说话吧，我听得懂你的语气。'],
      customIndices: [{ label: '粘人浓度', value: 95, comment: '走哪跟哪' }, { label: '守门忠诚度', value: 93, comment: '门口定点等' }, { label: '摇尾巴速度', value: 78, comment: '稳定摇摆中' }, { label: '撒娇频率', value: 70, comment: '偶尔蹭蹭腿' }],
      relationshipDef: { headline: '你在就够了', detail: '它不需要你做什么特别的事。你存在本身，就是它每天最大的安全感来源。', cards: [{ label: '依恋模式', value: '默默跟随' }, { label: '核心需求', value: '你别走远' }, { label: '关系本质', value: '稳稳的安心' }] },
      miniCards: [{ label: '本汪身份', value: '安全感来源' },{ label: '关系模式', value: '你在就够了' },{ label: '安稳指数', value: '95%' },{ label: '本汪评价', value: '跟到哪都安心' }],
      tOverride: { title: '相爱相杀训练搭子', goldQuote: '你以为你在训练它，其实它也在训练你。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？嗯，你确实随叫随到，但本汪只是觉得你挺靠谱。', bicker: '互怼？你倒是想怼，但每次看我用眼神看你就投降了。', quiet: '安静同居挺好的。你在那边坐着，我在这边跟着，各自安好。', worker: '员工？不，你是本汪永久编制内的安全基地，级别比员工高。' },
      circleTexts: ['我是狗狗安全感本人——不用做什么在就够了 #它眼中的你 #人宠关系测试PETI','我家狗跟到厕所门口等——这不叫跟踪叫安全巡逻。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '我是"狗狗安全感本人"：不用做什么在就够了。原来我在狗眼里是最稳的日常 #它眼中的你 #人宠关系测试PETI'
    },
    SHPD: {
      title: '热血冒险搭子型人类', subtitle: '本汪认证：有你在，去哪里都不怕',
      goldQuote: '有你在，去哪都敢冲。', subQuote: '它不怕路远，怕的是身边没有你。',
      rare: '前8%', rareLevel: '8%', posterBadge: '仅8%人类解锁此身份',
      tags: ['撑腰本人', '一起冲', '冒险搭子'], emotionTag: '勇敢型', posterTheme: 'mintGreen',
      indices: [{ label: '奔向你指数', value: 85 },{ label: '情感浓度', value: 82 },{ label: '伙伴默契', value: 95 },{ label: '探索欲望', value: 98 }],
      petComment: '冲！今天去哪！本汪先探路！有你壮胆，整个世界都不可怕。你跑我就追，你停我就等——搭子就要这样才带劲。',
      summary: '有你在去哪都敢冲',
      description: '你给它安全感的方式不是保护，而是带它一起冒险。有你在它什么都不怕。',
      keywords: ['并肩冲锋', '你在我就敢', '最佳搭档'],
      tips: ['带我去探索新世界吧——外面还有好多没见过的！', '我胆子这么大全因为身后有你撑着。', '偶尔让我带路好不好？我鼻子比你灵。'],
      customIndices: [{ label: '出门疯跑值', value: 98, comment: '完全收不住' }, { label: '冲向你指数', value: 90, comment: '并肩冲锋型' }, { label: '接住飞盘率', value: 88, comment: '配合超默契' }, { label: '快乐传染值', value: 95, comment: '嗨到全场沸腾' }],
      relationshipDef: { headline: '并肩冲锋的搭档', detail: '你不是在前面拉着它，而是并肩跑在一起。你的勇敢让它相信世界没有可怕的事。', cards: [{ label: '依恋模式', value: '并肩冲锋' }, { label: '核心需求', value: '一起出发' }, { label: '关系本质', value: '最佳搭档' }] },
      miniCards: [{ label: '本汪身份', value: '冒险搭子' },{ label: '关系模式', value: '并肩冲锋' },{ label: '探索欲望', value: '98%' },{ label: '本汪评价', value: '有你在就敢冲' }],
      tOverride: { title: '快乐逆子饲养员', goldQuote: '它每天制造麻烦，也每天制造快乐。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你确实很甜——甜到愿意陪我上山下海到处冲。', bicker: '互怼？我们不叫互怼，叫互相壮胆——你冲我也冲！', quiet: '安静同居？你确定？你跟我在一起的画风明明是到处冒险。', worker: '打工人？你不是打工，你是我的冒险搭子——我们是合伙人关系。' },
      circleTexts: ['我是热血冒险搭子型人类——有我在它去哪都敢冲 #它眼中的你 #人宠关系测试PETI','别人遛狗叫散步，我们俩叫联合巡街。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '居然测出"热血冒险搭子型人类"！有我在它去哪都敢冲——这种搭档关系也太燃了 #它眼中的你 #人宠关系测试PETI'
    },
    SHPR: {
      title: '双向奔赴天花板', subtitle: '本汪认证：不需要语言，你们之间的默契就是答案',
      goldQuote: '你不说话，它也知道你想它了。', subQuote: '你们之间最好的默契，就是不用说也都懂。',
      rare: '前25%', rareLevel: '25%', posterBadge: '25%人类是同款',
      tags: ['双向奔赴', '天生合拍', '最佳距离'], emotionTag: '温暖型', posterTheme: 'pinkPeach',
      indices: [{ label: '奔向你指数', value: 82 },{ label: '情感浓度', value: 70 },{ label: '伙伴默契', value: 90 },{ label: '安稳指数', value: 88 }],
      petComment: '你对我好，本汪加倍还！你给一分温暖，我还你十分忠诚。这种双向奔赴不是谁教的，是天生的。',
      summary: '不用说也都懂',
      description: '你给它安全感和温暖但不限制它做自己。你们之间有不说出口但双方都懂的默契。',
      keywords: ['天生合拍', '互相奔赴', '不用说也懂'],
      tips: ['做你自己就是最好的，不用刻意讨好我。', '我安静趴在你脚边就是在用我的方式选你。', '给彼此一点空间刚刚好，太近反而不自在。'],
      customIndices: [{ label: '摇尾巴速度', value: 82, comment: '稳定而持久' }, { label: '粘人浓度', value: 75, comment: '恰到好处' }, { label: '快乐传染值', value: 88, comment: '互相感染中' }, { label: '被原谅概率', value: 95, comment: '你笑我就好了' }],
      relationshipDef: { headline: '不说也懂的默契', detail: '你们之间最好的关系，就是不用语言也能确认彼此的心意。双向奔赴，才是最高级的陪伴。', cards: [{ label: '依恋模式', value: '双向奔赴' }, { label: '核心需求', value: '互相确认' }, { label: '关系本质', value: '天生合拍' }] },
      miniCards: [{ label: '本汪身份', value: '双向奔赴对象' },{ label: '关系模式', value: '不说也懂' },{ label: '伙伴默契', value: '90%' },{ label: '本汪评价', value: '你好我加倍还' }],
      tOverride: { title: '零食外交官', goldQuote: '它一坐下，你就开始掏零食。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？嗯，你们确实很甜——你对我好我加倍还，这就是双向奔赴。', bicker: '互怼？你确定？你们明明是那种安静看着对方就很开心的类型。', quiet: '安静同居也很好。你不说话我也知道你想我了——这叫默契。', worker: '打工人？你这个打工人待遇太好了——本汪给你发的是终身合同。' },
      circleTexts: ['我是双向奔赴天花板——不说话它也知道我想它了 #它眼中的你 #人宠关系测试PETI','你对它好它加倍还——这种双向奔赴谁不想要。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '我是"双向奔赴天花板"！不说话它也知道我想它了，这种默契是怎么练出来的 #它眼中的你 #人宠关系测试PETI'
    },
    SLCD: {
      title: '沉默守护型人类', subtitle: '本汪认证：你的爱从不张扬，但它一分不落地收到了',
      goldQuote: '嘴上说别闹，手已经在摸头了。', subQuote: '你从不说爱，但它的一切你都安排得最好。',
      rare: '前8%', rareLevel: '8%', posterBadge: '仅8%人类解锁此身份',
      tags: ['沉默深情', '行动派', '嘴硬心软'], emotionTag: '深情型', posterTheme: 'coolGray',
      indices: [{ label: '奔向你指数', value: 65 },{ label: '情感浓度', value: 58 },{ label: '操心程度', value: 96 },{ label: '探索欲望', value: 78 }],
      petComment: '假装不在意？盖被子被发现了哦。你嘴上从来不说爱，但你做的每一件事都在大声告诉我。这种沉默的深情，我全都收到了。',
      summary: '嘴上不说但全做到了',
      description: '你不把爱挂嘴边，但疫苗驱虫一次不落，听到它哼一声就立刻看过去。沉默守护比什么都重。',
      keywords: ['沉默的爱', '始终如一', '不说但全做到'],
      tips: ['你做的一切我都记得，一分一毫都不会忘。', '偶尔蹲下来抱一下吧，我在等你的信号。', '我们的对视就是在说爱——不需要更多了。'],
      customIndices: [{ label: '守门忠诚度', value: 96, comment: '听声辨位中' }, { label: '等门时长', value: 90, comment: '门口蹲守专家' }, { label: '撒娇频率', value: 55, comment: '偶尔才蹭蹭' }, { label: '被原谅概率', value: 99, comment: '一个眼神就够' }],
      relationshipDef: { headline: '不说但全做到', detail: '你的爱从不张扬，但它从未错过你任何一个细微的关心。沉默是你的方式，它全都收到了。', cards: [{ label: '依恋模式', value: '沉默深情' }, { label: '核心需求', value: '被看见就好' }, { label: '关系本质', value: '行动即是爱' }] },
      miniCards: [{ label: '本汪身份', value: '沉默守护者' },{ label: '关系模式', value: '不说但全做到' },{ label: '操心程度', value: '96%' },{ label: '本汪评价', value: '半夜盖被子被发现了' }],
      tOverride: { title: '相爱相杀训练搭子', goldQuote: '你以为你在训练它，其实它也在训练你。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你表面不是挺酷的吗？但半夜偷偷盖被子这件事暴露了你。', bicker: '互怼？你这种沉默型的互怼方式太深情了——嘴上骂完手就开始摸头。', quiet: '安静同居说得对。你嘴上是挺安静的，手上可一点没闲着。', worker: '打工人？你这个打工人嘴硬心软，加班费都不要还倒贴零食。' },
      circleTexts: ['我是沉默守护型人类——嘴上说别闹手已经在摸头了 #它眼中的你 #人宠关系测试PETI','我的爱从不张扬，但它一分不落地收到了。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '测出来是"沉默守护型人类"——嘴上说别闹手已经在摸头了，我的爱从不张扬但它全收到了 #它眼中的你 #人宠关系测试PETI'
    },
    SLCR: {
      title: '靠谱遛弯人型人类', subtitle: '本汪认证：准时、靠谱、从不让我失望',
      goldQuote: '你不热烈，但你每天都在。', subQuote: '你的靠谱是它最不张扬的幸福来源。',
      rare: '前25%', rareLevel: '25%', posterBadge: '25%人类是同款',
      tags: ['准时即爱', '靠谱本人', '雷打不动'], emotionTag: '踏实型', posterTheme: 'teaBrown',
      indices: [{ label: '奔向你指数', value: 62 },{ label: '情感浓度', value: 55 },{ label: '操心程度', value: 82 },{ label: '安稳指数', value: 96 }],
      petComment: '你脚步慢了等我，当我不知道吗。你从来不催我，也从来不迟到。这种稳定的节奏感，让我觉得每一天都是被照顾着的。',
      summary: '每天如约而至',
      description: '定时遛弯按时喂饭，不过分溺爱也不忽略需求。你是每天都会出现的那个靠谱人类。',
      keywords: ['准时即爱', '简单靠谱', '雷打不动'],
      tips: ['定时出现就是爱，比任何惊喜都踏实。', '我提前摇尾巴是因为听到了你的脚步声。', '继续做我最靠谱的人吧，不接受离职。'],
      customIndices: [{ label: '守门忠诚度', value: 96, comment: '准时蹲点型' }, { label: '摇尾巴速度', value: 72, comment: '平稳节奏型' }, { label: '等门时长', value: 60, comment: '掐着点等' }, { label: '粘人浓度', value: 55, comment: '不远不近刚好' }],
      relationshipDef: { headline: '准时即是爱', detail: '你不热烈，但从未缺席。每天如约而至的脚步声，就是它心里最踏实的节拍器。', cards: [{ label: '依恋模式', value: '定时相见' }, { label: '核心需求', value: '规律感' }, { label: '关系本质', value: '简单靠谱' }] },
      miniCards: [{ label: '本汪身份', value: '靠谱遛弯人' },{ label: '关系模式', value: '准时即爱' },{ label: '安稳指数', value: '96%' },{ label: '本汪评价', value: '脚步慢了等我' }],
      tOverride: { title: '松弛同居型人类', goldQuote: '不用天天黏着，但它知道你在。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你确定说的是你们？你连遛弯都是准时准点的。', bicker: '互怼？你这人连怼都是温吞的，最多皱个眉就继续遛弯了。', quiet: '安静同居，非常准确。你就是那个安静又准时的靠谱遛弯人。', worker: '打工人？你是那种准时上下班、从不加班也从不迟到的模范员工。' },
      circleTexts: ['我是靠谱遛弯人型人类——不热烈但每天都在 #它眼中的你 #人宠关系测试PETI','我家狗固定时间摇尾巴不是因为饿，是因为知道我快来了。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '"靠谱遛弯人型人类"也太准了吧！不热烈但每天都在，实在人养实在狗 #它眼中的你 #人宠关系测试PETI'
    },
    SLPD: {
      title: '安静领航员型人类', subtitle: '本汪认证：你从不替我做决定，只是默默陪我走每一步',
      goldQuote: '它跑多远都不怕，因为知道你在。', subQuote: '你不牵绳也不怕，因为它永远会回头找你。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['安静同行', '给自由的人', '信任满分'], emotionTag: '稳重型', posterTheme: 'lavender',
      indices: [{ label: '奔向你指数', value: 60 },{ label: '情感浓度', value: 50 },{ label: '伙伴默契', value: 92 },{ label: '探索欲望', value: 88 }],
      petComment: '你佛你的，我跑远了会回头看。你不牵绳我也不怕，因为我知道只要回头你一定在那里。你给的自由里全是信任。',
      summary: '跑多远都不怕',
      description: '你给它空间探索但永远在旁边。不控制方向，但让它知道有人同行。',
      keywords: ['自由的陪伴', '不控制', '永远在旁边'],
      tips: ['你给的信任比什么都珍贵。', '我回头看你就是在说在吗。', '继续做不控制但永远在的人。'],
      customIndices: [{ label: '出门疯跑值', value: 88, comment: '自由奔跑中' }, { label: '冲向你指数', value: 60, comment: '跑远了才回头' }, { label: '接住飞盘率', value: 85, comment: '独立完成型' }, { label: '快乐传染值', value: 78, comment: '安静的快乐' }],
      relationshipDef: { headline: '不控制但永远在', detail: '你从不替它做决定，只是默默陪着走每一步。它跑多远都不怕，因为知道你在身后。', cards: [{ label: '依恋模式', value: '自由同行' }, { label: '核心需求', value: '有人在身后' }, { label: '关系本质', value: '信任满分' }] },
      miniCards: [{ label: '本汪身份', value: '安静领航员' },{ label: '关系模式', value: '跑远了也回头' },{ label: '伙伴默契', value: '92%' },{ label: '本汪评价', value: '跑多远都不怕' }],
      tOverride: { title: '人形遛弯按钮', goldQuote: '你不是主人，你是它的出门开关。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你佛系得很，但偷偷看我的眼神出卖了你。', bicker: '互怼？你连怼都是沉默式的——用一个眼神就把我翻译完了。', quiet: '安静同居是对的。你最大的能力就是安静地陪我走每一步。', worker: '打工人？你这种领航员级别的人类，不是打工，是特聘。' },
      circleTexts: ['我是安静领航员型人类——不控制方向但一直陪着走 #它眼中的你 #人宠关系测试PETI','它跑多远都不怕，因为知道我在。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '我是"安静领航员型人类"——不控制方向但一直陪着走，它跑多远都不怕因为知道我在 #它眼中的你 #人宠关系测试PETI'
    },
    SLPR: {
      title: '高质量陪伴型人类', subtitle: '本汪认证：各自安好，偶尔温情，刚刚好',
      goldQuote: '沙发两头，各自舒服——挺好的。', subQuote: '在一起但互不打扰，就是你们最舒服的距离。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['在就安心', '零压力', '高级默契'], emotionTag: '默契型', posterTheme: 'coolGray',
      indices: [{ label: '奔向你指数', value: 50 },{ label: '情感浓度', value: 45 },{ label: '伙伴默契', value: 85 },{ label: '安稳指数', value: 90 }],
      petComment: '沙发两头，中间放零食，完美。不黏你也不远离你，就这个距离刚刚好。在一起不说话也舒服，这种默契可遇不可求。',
      summary: '在一起就安心',
      description: '各自有空间有节奏，在一起就莫名安心。像两个默契室友——存在就是最好的陪伴。',
      keywords: ['舒适距离', '无压力共处', '在就安心'],
      tips: ['你在就好不用做更多，存在本身就是陪伴。', '我能在你旁边自在睡着说明百分百信任你。', '偶尔主动靠过来摸摸我，我会假装不在意。'],
      customIndices: [{ label: '粘人浓度', value: 50, comment: '保持距离型' }, { label: '摇尾巴速度', value: 60, comment: '不急不慢' }, { label: '撒娇频率', value: 45, comment: '偶尔才撒' }, { label: '被原谅概率', value: 90, comment: '本来就没生气' }],
      relationshipDef: { headline: '各自舒服的默契', detail: '不黏不远，在一起就安心。你给的是最高级的爱：存在感而非压迫感。', cards: [{ label: '依恋模式', value: '各自安好' }, { label: '核心需求', value: '互不打扰' }, { label: '关系本质', value: '高级默契' }] },
      miniCards: [{ label: '本汪身份', value: '高质量室友' },{ label: '关系模式', value: '各自舒服' },{ label: '默契指数', value: '85%' },{ label: '本汪评价', value: '中间放零食完美' }],
      tOverride: { title: '松弛同居型人类', goldQuote: '不用天天黏着，但它知道你在。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你们？你连多看它一眼都怕打扰到对方。', bicker: '互怼？你们这种互怼方式太高级了——用沉默表达一切。', quiet: '安静同居，终于有个说法精准的了。各自舒服，完美。', worker: '打工人？你是那种到点下班、绝不多留一秒的高质量室友型员工。' },
      circleTexts: ['我是高质量陪伴型人类——沙发两头各自舒服 #它眼中的你 #人宠关系测试PETI','在一起不用说话就是最好的距离。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '"高质量陪伴型人类"——沙发两头各自舒服，在一起不用说话就是最好的距离 #它眼中的你 #人宠关系测试PETI'
    },
    FHCD: {
      title: '狗狗人生策划师', subtitle: '本汪认证：你给的爱太满了，满到我以为全世界都是好人',
      goldQuote: '你的爱太满，它都快溢出来了。', subQuote: '它以为全世界都是好人——因为你就是它的全世界。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['宠爱满格', '狗生规划师', '甜蜜操心'], emotionTag: '甜蜜型', posterTheme: 'pinkPeach',
      indices: [{ label: '奔向你指数', value: 75 },{ label: '情感浓度', value: 92 },{ label: '操心程度', value: 95 },{ label: '探索欲望', value: 82 }],
      petComment: '又买新的了！好耶好耶好耶！你把整个世界最好的都往我面前堆，我被你宠到不知道什么叫委屈。在你身边，每天都是好日子。',
      summary: '有你什么都开心',
      description: '你对它的宠爱没上限，犯错也舍不得骂。它被你宠成了全世界最快乐的狗。',
      keywords: ['无条件宠爱', '安排明白', '甜蜜到齁'],
      tips: ['偶尔加点小规矩也是爱，本汪能接受。', '我最最需要的其实不是零食是你在身边。', '你就是我的人生赢家，不接受任何反驳！'],
      customIndices: [{ label: '摇尾巴速度', value: 95, comment: '兴奋到模糊' }, { label: '撒娇频率', value: 99, comment: '随时随地撒' }, { label: '快乐传染值', value: 96, comment: '感染全家人' }, { label: '被原谅概率', value: 100, comment: '从没被骂过' }],
      relationshipDef: { headline: '宠爱没有上限', detail: '你给什么它都开心，但它最开心的永远是有你。你教会了它一件事：世界是安全的。', cards: [{ label: '依恋模式', value: '无条件信赖' }, { label: '核心需求', value: '你开心就好' }, { label: '关系本质', value: '甜蜜到齁' }] },
      miniCards: [{ label: '本汪身份', value: '狗生规划师' },{ label: '关系模式', value: '宠爱满格' },{ label: '情感浓度', value: '92%' },{ label: '本汪评价', value: '你就是人生赢家' }],
      tOverride: { title: '快乐逆子饲养员', goldQuote: '它每天制造麻烦，也每天制造快乐。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？那当然——你给的爱太满了，我都快溢出来了。', bicker: '互怼？你每次怼完还是会给我买新玩具，这叫什么互怼。', quiet: '安静同居？你安静？你给我安排的活动比我自己想的还多。', worker: '打工人说法太谦虚了——你是我的狗生规划师兼后勤部长。' },
      circleTexts: ['我是狗狗人生策划师——爱太满它都快溢出来了 #它眼中的你 #人宠关系测试PETI','又！买！新！的！了！好耶好耶好耶！','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '我居然是"狗狗人生策划师"！爱太满它都快溢出来了，好吧确实把它宠上天了 #它眼中的你 #人宠关系测试PETI'
    },
    FHCR: {
      title: '人形零食机型人类', subtitle: '本汪认证：靠近你就能满血复活',
      goldQuote: '你一伸手，它的世界就亮了。', subQuote: '你的口袋是它眼中永远的宝库。',
      rare: '前8%', rareLevel: '8%', posterBadge: '仅8%人类解锁此身份',
      tags: ['快乐充电站', '靠近就有电', '满电出发'], emotionTag: '能量型', posterTheme: 'warmOrange',
      indices: [{ label: '奔向你指数', value: 78 },{ label: '情感浓度', value: 88 },{ label: '操心程度', value: 72 },{ label: '安稳指数', value: 85 }],
      petComment: '你递啥本汪都接着！开心！你一伸手我就知道有好事发生。靠近你就是满电复活，你是我永远用不完的充电站。',
      summary: '靠近你就满血复活',
      description: '你热情但不控制，你们的日常充满轻松互动。在它眼里你就是取之不尽的能量源。',
      keywords: ['人形充电桩', '快乐供给站', '满电出发'],
      tips: ['你给的不只是食物，是每天都在线的快乐。', '听到你声音我就弹起来了——条件反射。', '蹲下来让我靠着你吧，充电五分钟快乐一整天。'],
      customIndices: [{ label: '冲向你指数', value: 88, comment: '一叫就冲过来' }, { label: '摇尾巴速度', value: 92, comment: '看到零食加速' }, { label: '快乐传染值', value: 90, comment: '你开心我更开心' }, { label: '撒娇频率', value: 85, comment: '撒娇换零食' }],
      relationshipDef: { headline: '靠近就能充满电', detail: '你一伸手它的世界就亮了。你给的不只是食物，还有每天都在线的情绪价值和快乐。', cards: [{ label: '依恋模式', value: '能量补给型' }, { label: '核心需求', value: '你的回应' }, { label: '关系本质', value: '快乐供给站' }] },
      miniCards: [{ label: '本汪身份', value: '人形零食机' },{ label: '关系模式', value: '靠近就有电' },{ label: '响应速度', value: '99%' },{ label: '本汪评价', value: '你递啥我都接着' }],
      tOverride: { title: '零食外交官', goldQuote: '它一坐下，你就开始掏零食。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你不是黏人，你是随叫随到的人形零食机。', bicker: '互怼？你哪有空跟我怼，你忙着给我换零食口味呢。', quiet: '安静同居？你安静？你一伸手我的世界就亮了，哪里安静了。', worker: '打工人说得非常精准——而且你是全年无休那种。' },
      circleTexts: ['我是人形零食机型人类——一伸手它的世界就亮了 #它眼中的你 #人宠关系测试PETI','你递啥我都接着，靠近我就满电出发。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '"人形零食机型人类"哈哈哈 我一伸手它的世界就亮了，靠近我就满电出发 #它眼中的你 #人宠关系测试PETI'
    },
    FHPD: {
      title: '快乐显眼包搭子', subtitle: '本汪认证：你们不是主人和宠物，是互相选择的灵魂伙伴',
      goldQuote: '你发的每条朋友圈，它都想一起出镜。', subQuote: '别人遛狗叫散步，你们俩叫联合巡街。',
      rare: '前3%', rareLevel: '3%', posterBadge: '仅3%人类获得此认证',
      tags: ['灵魂搭子', '显眼包本人', '天生合拍'], emotionTag: '灵魂型', posterTheme: 'lavender',
      indices: [{ label: '奔向你指数', value: 72 },{ label: '情感浓度', value: 95 },{ label: '伙伴默契', value: 98 },{ label: '探索欲望', value: 95 }],
      petComment: '走！一起当显眼包！本汪准备好了！跟你在一起永远不无聊，每天都像开派对。你是本汪最佳搭子，全世界都可以知道。',
      summary: '灵魂伙伴互相选择',
      description: '你放下主人身份，真正把它当平等伙伴。你们一起嗨、一起冒险、一起当显眼包。',
      keywords: ['灵魂伙伴', '选择彼此', '热烈而平等'],
      tips: ['继续当我最好的搭子吧，全世界都可以知道！', '跟你在一起永远最开心，谁也比不了。', '显眼包的快乐只有显眼包搭子才懂。'],
      customIndices: [{ label: '出门疯跑值', value: 98, comment: '联合巡街中' }, { label: '快乐传染值', value: 99, comment: '嗨翻全场' }, { label: '接住飞盘率', value: 95, comment: '默契满分' }, { label: '冲向你指数', value: 88, comment: '并肩出发型' }],
      relationshipDef: { headline: '互相选择的灵魂搭子', detail: '你们不是主人和宠物，是互相选择的灵魂伙伴。一起嗨、一起闹、一起当全场焦点。', cards: [{ label: '依恋模式', value: '灵魂搭子' }, { label: '核心需求', value: '一起嗨' }, { label: '关系本质', value: '热烈而平等' }] },
      miniCards: [{ label: '本汪身份', value: '显眼包搭子' },{ label: '关系模式', value: '联合巡街' },{ label: '伙伴默契', value: '98%' },{ label: '本汪评价', value: '走到哪一起嗨' }],
      tOverride: { title: '快乐逆子饲养员', goldQuote: '它每天制造麻烦，也每天制造快乐。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你们的甜蜜方式就是一起当显眼包——全世界都觉得你们很吵。', bicker: '互怼？你们确实天天互嗨，但谁也没真想让对方安静。', quiet: '安静同居？你确定？你们在一起的画风明明是联合巡街。', worker: '打工人？不，你们是搭子——平等合伙关系，不存在上下级。' },
      circleTexts: ['我是快乐显眼包搭子——不是主人和宠物是灵魂伙伴 #它眼中的你 #人宠关系测试PETI','别人遛狗叫散步，我们俩叫联合巡街。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '传说款！我是"快乐显眼包搭子"——不是主人和宠物，是互相选择的灵魂伙伴 #它眼中的你 #人宠关系测试PETI'
    },
    FHPR: {
      title: '快乐贴贴型人类', subtitle: '本汪认证：你们在一起永远在笑，快乐就是主旋律',
      goldQuote: '你贴过来，它就赖上了——这就是爱。', subQuote: '你们在一起的画面，就是快乐最简单的样子。',
      rare: '前25%', rareLevel: '25%', posterBadge: '25%人类是同款',
      tags: ['贴贴达人', '快乐制造机', '零压力'], emotionTag: '快乐型', posterTheme: 'mintGreen',
      indices: [{ label: '奔向你指数', value: 70 },{ label: '情感浓度', value: 82 },{ label: '伙伴默契', value: 80 },{ label: '安稳指数', value: 75 }],
      petComment: '贴贴！还要贴！永远别松手！一靠近你就不想走了。你身上有一种魔力，让本汪想永远赖着你、蹭着你、跟你贴在一起。',
      summary: '在一起就是快乐',
      description: '你不给它太多规矩，它也不给你找麻烦。你们的日常就是互相犯蠢、停不下来地笑。',
      keywords: ['快乐优先', '互相犯蠢', '每天都好玩'],
      tips: ['快乐是我们之间最核心的主题，永远不变。', '我贴你不是因为冷，是因为认可你。', '一起犯的傻都是黄金回忆，以后还要继续犯。'],
      customIndices: [{ label: '粘人浓度', value: 92, comment: '贴上就不撒手' }, { label: '快乐传染值', value: 95, comment: '笑声停不下来' }, { label: '摇尾巴速度', value: 88, comment: '快乐摇摆中' }, { label: '撒娇频率', value: 90, comment: '分分钟撒娇' }],
      relationshipDef: { headline: '快乐就是主旋律', detail: '你们在一起永远在笑。它蠢你也蠢，但在一起就是停不下来的快乐，这就够了。', cards: [{ label: '依恋模式', value: '贴贴不撒手' }, { label: '核心需求', value: '一起开心' }, { label: '关系本质', value: '快乐优先' }] },
      miniCards: [{ label: '本汪身份', value: '贴贴达人' },{ label: '关系模式', value: '互相犯蠢' },{ label: '快乐指数', value: '88%' },{ label: '本汪评价', value: '永远别松手' }],
      tOverride: { title: '零食外交官', goldQuote: '它一坐下，你就开始掏零食。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？那当然——你贴过来我就赖上了，永远别松手。', bicker: '互怼？你们这种互怼方式就是贴着贴着就笑了。', quiet: '安静同居？你们安静得了吗？在一起就是停不下来地笑。', worker: '打工人？你是那种被客户贴到脸上但从来不嫌弃的快乐员工。' },
      circleTexts: ['我是快乐贴贴型人类——它蠢我也蠢在一起就是快乐 #它眼中的你 #人宠关系测试PETI','贴贴贴贴！还要贴！永远别松手！','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '测出来是"快乐贴贴型人类"！它蠢我也蠢，在一起就是停不下来地笑 #它眼中的你 #人宠关系测试PETI'
    },
    FLCD: {
      title: '人形遛弯机型人类', subtitle: '本汪认证：你嘴上说我是工具狗，其实你是我离不开的日常',
      goldQuote: '你以为你在遛狗，其实你是被选中的。', subQuote: '它嘴上叼着球跑开，回头还是冲你来的。',
      rare: '前3%', rareLevel: '3%', posterBadge: '仅3%人类获得此认证',
      tags: ['反差深情', '嘴硬本人', '暗地操心'], emotionTag: '反差型', posterTheme: 'teaBrown',
      indices: [{ label: '奔向你指数', value: 45 },{ label: '情感浓度', value: 40 },{ label: '操心程度', value: 94 },{ label: '探索欲望', value: 78 }],
      petComment: '本汪允许你摸头，算加班费。表面嫌你烦，但你不在的时候我在门口转了好几圈。这件事你不用知道。',
      summary: '表面工具人实际离不开',
      description: '你负责开门倒粮遛弯，但疫苗表贴冰箱上。表面佛系实则操心到爆，它超依赖你。',
      keywords: ['嘴上无所谓', '暗地超在乎', '反差深情'],
      tips: ['你晚回来我就在门口转了。', '我们不太会说爱但爱最深。', '你手机里全是偷拍的我吧。'],
      customIndices: [{ label: '等门时长', value: 94, comment: '门口转圈专家' }, { label: '拆家冲动', value: 78, comment: '你不在就拆' }, { label: '守门忠诚度', value: 92, comment: '暗地超在乎' }, { label: '被原谅概率', value: 88, comment: '嘴硬心软型' }],
      relationshipDef: { headline: '嘴硬心软的反差', detail: '你以为你只是遛弯工具人，其实你是被它选中的。表面无所谓，暗地里谁也离不开谁。', cards: [{ label: '依恋模式', value: '反差深情' }, { label: '核心需求', value: '别说出来就好' }, { label: '关系本质', value: '暗地超在乎' }] },
      miniCards: [{ label: '本汪身份', value: '人形遛弯机' },{ label: '关系模式', value: '表面工具人' },{ label: '操心程度', value: '94%' },{ label: '本汪评价', value: '开门倒粮准时就行' }],
      tOverride: { title: '相爱相杀训练搭子', goldQuote: '你以为你在训练它，其实它也在训练你。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你确定？你在狗面前的画风明明是"别烦我"然后默默操碎心。', bicker: '互怼？你连怼都是冷冷的，但遛弯从来都是准时的。', quiet: '安静同居倒是真的——你们一个比一个嘴硬，但谁也没想过分开。', worker: '打工人，精准。你以为你在遛狗？不，你已经入职狗家了。' },
      circleTexts: ['我是人形遛弯机型人类——以为自己在遛狗其实是被选中的 #它眼中的你 #人宠关系测试PETI','表面工具人实际谁也离不开谁。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '传说款！"人形遛弯机型人类"——以为自己在遛狗，其实是被选中的 表面工具人实际谁也离不开谁 #它眼中的你 #人宠关系测试PETI'
    },
    FLCR: {
      title: '定时投喂型人类', subtitle: '本汪认证：你管好我的世界，我管好你的心情',
      goldQuote: '不多不少，刚刚好——它也这么觉得。', subQuote: '最靠谱的爱，就是什么都不多做一分。',
      rare: '前15%', rareLevel: '15%', posterBadge: '15%人类获此认证',
      tags: ['各司其职', '佛系本人', '无声契约'], emotionTag: '佛系型', posterTheme: 'milkWhite',
      indices: [{ label: '奔向你指数', value: 42 },{ label: '情感浓度', value: 38 },{ label: '操心程度', value: 72 },{ label: '安稳指数', value: 92 }],
      petComment: '饭点到了叫我，没到别吵。我们的关系不复杂——你管好饭，我管好自己。看起来冷淡，但谁也没想过换一个人。',
      summary: '各自运行方向相同',
      description: '你负责它的衣食住行，它负责在你需要时出现。彼此存在本身就是最好的安排。',
      keywords: ['各自运行', '方向相同', '存在即陪伴'],
      tips: ['规律照顾就是最好的爱，比惊喜更让我安心。', '我安静等待不是冷淡，是因为信任你会来。', '偶尔在日常流程里加个摸头，我会记很久。'],
      customIndices: [{ label: '等门时长', value: 60, comment: '掐着饭点等' }, { label: '摇尾巴速度', value: 55, comment: '不急不慢型' }, { label: '守门忠诚度', value: 80, comment: '到点出现就行' }, { label: '撒娇频率', value: 35, comment: '极少主动撒' }],
      relationshipDef: { headline: '不多不少刚刚好', detail: '你给的恰好是它需要的，不多一分也不少一分。规律的照顾本身就是最踏实的爱。', cards: [{ label: '依恋模式', value: '各司其职' }, { label: '核心需求', value: '规律就好' }, { label: '关系本质', value: '存在即陪伴' }] },
      miniCards: [{ label: '本汪身份', value: '定时投喂对象' },{ label: '关系模式', value: '各自运行' },{ label: '安稳指数', value: '92%' },{ label: '本汪评价', value: '绩效考核合格' }],
      tOverride: { title: '松弛同居型人类', goldQuote: '不用天天黏着，但它知道你在。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你？你连多摸我一下都觉得多余。但这种极简的爱我挺受用。', bicker: '互怼？你连怼的力气都省了——直接用效率解决一切问题。', quiet: '安静同居非常精准。你给的刚好是我最需要的：不打扰的照顾。', worker: '打工人？你是那种效率极高、到点下班、绝不加感情戏的极简员工。' },
      circleTexts: ['我是定时投喂型人类——不多不少刚刚好 #它眼中的你 #人宠关系测试PETI','各自运行方向相同，存在即陪伴。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '我是"定时投喂型人类"：不多不少刚刚好。各自运行方向相同，存在即陪伴 #它眼中的你 #人宠关系测试PETI'
    },
    FLPD: {
      title: '各自精彩型人类', subtitle: '本汪认证：你给我最好的礼物，就是自由',
      goldQuote: '你忙你的，我玩我的——但挺想你的。', subQuote: '最高级的关系，是各自精彩又互相惦记。',
      rare: '前8%', rareLevel: '8%', posterBadge: '仅8%人类解锁此身份',
      tags: ['独立灵魂', '自由即爱', '各自闪光'], emotionTag: '独立型', posterTheme: 'mintGreen',
      indices: [{ label: '奔向你指数', value: 35 },{ label: '情感浓度', value: 40 },{ label: '伙伴默契', value: 82 },{ label: '探索欲望', value: 90 }],
      petComment: '你看你的，我啃我的，挺好。各自精彩不代表不在乎。我偶尔主动蹭过来的时候，你知道那有多珍贵吗？',
      summary: '各自精彩偶尔想你',
      description: '你不强迫它表演亲密，它也不依赖你到失去自我。你的放手让它成为最自信的狗。',
      keywords: ['互不干涉', '各自精彩', '偶尔交汇'],
      tips: ['你给的自由是最好的礼物，我很珍惜。', '不搭理你不是不爱你——是在享受独处。', '我主动靠过来的时候你要知道那有多珍贵。'],
      customIndices: [{ label: '出门疯跑值', value: 90, comment: '自己玩得飞起' }, { label: '粘人浓度', value: 35, comment: '各玩各的' }, { label: '冲向你指数', value: 40, comment: '偶尔才冲' }, { label: '快乐传染值', value: 82, comment: '独立的快乐' }],
      relationshipDef: { headline: '各自精彩互相惦记', detail: '最高级的关系是各自精彩又互相惦记。你给的自由，让它成为了最自信的狗。', cards: [{ label: '依恋模式', value: '独立共处' }, { label: '核心需求', value: '自由空间' }, { label: '关系本质', value: '偶尔交汇' }] },
      miniCards: [{ label: '本汪身份', value: '独立灵魂' },{ label: '关系模式', value: '各自精彩' },{ label: '尊重指数', value: '90%' },{ label: '本汪评价', value: '看完过来摸摸我' }],
      tOverride: { title: '人形遛弯按钮', goldQuote: '你不是主人，你是它的出门开关。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你们明明各玩各的，但都没走远——这种甜蜜很高级。', bicker: '互怼？你们的互怼方式就是各自精彩地忽略对方——然后偶尔对视一下。', quiet: '安静同居说得对。你们各自精彩，偶尔交汇的瞬间才最珍贵。', worker: '打工人？不不不，你们是各自独立创业的合伙人。' },
      circleTexts: ['我是各自精彩型人类——你忙你的我玩我的但挺想你的 #它眼中的你 #人宠关系测试PETI','不黏不远各自闪光偶尔交汇就足够了。','测完觉得很冒犯，但确实无法反驳。','敢不敢看看，你在你家狗心里到底排第几？'],
      circleText: '"各自精彩型人类"——你忙你的我玩我的，但挺想你的。不黏不远各自闪光偶尔交汇 #它眼中的你 #人宠关系测试PETI'
    },
    FLPR: {
      title: '命中注定型人类', subtitle: '本汪认证：没有理由，你们就是该在一起的',
      goldQuote: '什么也没做，但什么都刚好。', subQuote: '不知道怎么就选了你，但绝对不退货。',
      rare: '前3%', rareLevel: '3%', posterBadge: '仅3%人类获得此认证',
      tags: ['命中注定', '不需要理由', '天选同框'], emotionTag: '缘分型', posterTheme: 'lavender',
      indices: [{ label: '奔向你指数', value: 40 },{ label: '情感浓度', value: 38 },{ label: '伙伴默契', value: 88 },{ label: '安稳指数', value: 85 }],
      petComment: '选了你，退货通道已关闭。不知道为什么是你，但就是你了。不需要理由，不需要证明，这辈子就这样吧。',
      summary: '没有理由就是你',
      description: '不是轰轰烈烈的爱但莫名合拍。你不刻意改变它，它也不要求你做什么。就是该在一起。',
      keywords: ['命中注定', '就是你', '安静同框'],
      tips: ['保持各自的样子就最好，别试图改变对方。', '你没想换我也没想走——这就是命中注定。', '安静同框一辈子就够了，不需要更多证明。'],
      customIndices: [{ label: '粘人浓度', value: 45, comment: '不远不近' }, { label: '摇尾巴速度', value: 50, comment: '不急不慢' }, { label: '被原谅概率', value: 92, comment: '天生包容型' }, { label: '守门忠诚度', value: 88, comment: '这辈子就你了' }],
      relationshipDef: { headline: '就是该在一起', detail: '什么也没做但什么都刚好。不知道怎么就选了你，但绝对不退货。这就是命中注定。', cards: [{ label: '依恋模式', value: '天选合拍' }, { label: '核心需求', value: '不需要理由' }, { label: '关系本质', value: '命中注定' }] },
      miniCards: [{ label: '本汪身份', value: '命中注定' },{ label: '关系模式', value: '不退货' },{ label: '合拍指数', value: '88%' },{ label: '本汪评价', value: '退货通道已关闭' }],
      tOverride: { title: '松弛同居型人类', goldQuote: '不用天天黏着，但它知道你在。' },
      tTag: '嘴硬心软',
      predComments: { sweet: '甜蜜黏人？你们这种命中注定的甜蜜，就是什么都不做但什么都刚好。', bicker: '互怼？你们佛系到连怼都懒得怼——但谁也没想过换一个。', quiet: '安静同居，完美形容。你们就是那种不需要理由就能待在一起的存在。', worker: '打工人？你不是打工，你是签了终身合同的命中注定合伙人。' },
      circleTexts: ['我是命中注定型人类——什么也没做但什么都刚好 #它眼中的你 #人宠关系测试PETI','不知道怎么就选了你，但绝对不退货。','测完觉得很冒犯，但确实无法反驳。','发给你养狗的朋友，看看谁被自家狗爱得最深。'],
      circleText: '传说款！"命中注定型人类"——什么也没做但什么都刚好，这辈子就这样了不退货 #它眼中的你 #人宠关系测试PETI'
    }
  }
}

module.exports = dogData
