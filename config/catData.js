/**
 * 猫咪版 - 它眼中的你 · 人宠关系测试
 * 配置文件：品牌 + 维度 + 1预判题 + 12正式题 + 4彩蛋题 + 16 种关系结果
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
    ],
    homeCTA: {
      subtitle: '是主人、饭票、员工，还是合租仇人？',
      btnText: '开始猫眼鉴定',
      uploadCTA: '上传你家猫照片，生成专属关系卡'
    },
    posterGuideText: '扫码测测你在它心里是什么身份',
    posterGuideText520: '5.20 测测你在它心里是什么身份',
    poster520Quote: '5.20 不一定要人类告白，本喵已经认证你了',
    promoTexts: {
      petGroup: [
        '我刚测出来是「{title}」，太准了……\n{goldQuote}\n你们也测一下，我想看谁家猫最离谱。',
        '你们快测！我测完发现我在猫眼里是「{title}」，笑死。',
        '这个测试有点冒犯了……我居然是「{title}」，准到无法反驳。'
      ],
      moments: [
        '测完觉得很冒犯，但确实无法反驳。\n我在猫眼里是「{title}」—— {goldQuote}',
        '{goldQuote}\n原来我在它心里是这样的人类……你们也来测测'
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
    DR: { positive: '晒猫探索', negative: '宅家日常' }
  },
  midFeedback: [
    { after: 4, text: '猫猫已记录：这个人类很容易心软。' },
    { after: 8, text: '危险提示：你可能已经被猫成功驯化。' },
    { after: 12, text: '猫咪审查完毕，正在生成你的人类档案...' }
  ],
  questions: [
    // === Q0: 关系预判题（不计入主结果，仅用于文案风格）===
    {
      id: 0,
      type: 'prediction',
      scene: '你和它平时更像哪种关系？',
      options: [
        { text: '甜蜜黏人，天天想贴贴', predKey: 'sweet' },
        { text: '相爱相杀，天天互怼但谁也离不开谁', predKey: 'bicker', tScore: 2 },
        { text: '各过各的，安静同居', predKey: 'quiet' },
        { text: '它是老大，我是员工', predKey: 'worker', tScore: 1 }
      ]
    },
    // === Q1–Q12: 正式题 ===
    {
      id: 1,
      type: 'normal',
      scene: '你刚准备出门，猫堵在门口盯着你，像在查你的请假条。',
      dimensions: 'SF_HL',
      options: [
        { text: '蹲下来汇报行程："我很快回来，饭点不变"', score: 'SH' },
        { text: '摸摸头："家里交给你了"', score: 'SL' },
        { text: '嘴上说"别装舍不得"，关门前还是回头三次', score: 'FH', tScore: 1 },
        { text: '正常出门，彼此都有自己的安排', score: 'FL' }
      ]
    },
    {
      id: 2,
      type: 'normal',
      scene: '深夜你还在忙，猫一屁股坐到键盘旁边。',
      dimensions: 'SF_HL',
      options: [
        { text: '立刻停工：行，今天真正的甲方是你', score: 'SH' },
        { text: '一手工作一手摸，主打两边都不耽误', score: 'SL' },
        { text: '跟它抢键盘："你又来了是不是？"', score: 'FH', tScore: 1 },
        { text: '它坐它的，我忙我的，只要别真踩键盘', score: 'FL' }
      ]
    },
    {
      id: 3,
      type: 'normal',
      scene: '你回家开门，它只赏了你一眼，又慢慢转头。',
      dimensions: 'SF_HL',
      options: [
        { text: '冲过去汇报："我回来了！想没想我？"', score: 'SH' },
        { text: '放下东西，坐旁边等它自己过来', score: 'SL' },
        { text: '对它喊："装什么高冷，刚才是不是在等我？"', score: 'FH', tScore: 1 },
        { text: '对视点头：懂，今天也很有边界感', score: 'FL' }
      ]
    },
    {
      id: 4,
      type: 'normal',
      scene: '猫把杯子一点点推到桌边，还回头看你一眼。',
      dimensions: 'SF_CP',
      options: [
        { text: '赶紧收走："这个不可以"', score: 'SC' },
        { text: '拿玩具转移注意力，别让它继续作案', score: 'SP' },
        { text: '先拍视频发群里控诉："看它这个欠揍样"', score: 'FC', tScore: 1 },
        { text: '边骂边收拾："你真是我祖宗"', score: 'FP', tScore: 1 }
      ]
    },
    {
      id: 5,
      type: 'normal',
      scene: '客人来了，猫躲在角落低吼，像在说"谁允许他进我家"。',
      dimensions: 'SF_CP',
      options: [
        { text: '先把猫安置到安全房间，让它别紧张', score: 'SC' },
        { text: '认真叮嘱客人：别盯它、别摸它、别追它', score: 'SP' },
        { text: '忍不住介绍："这是我家宝宝，它其实很乖"', score: 'FC' },
        { text: '它不想营业就算了，今天谁也别烦谁', score: 'FP' }
      ]
    },
    {
      id: 6,
      type: 'normal',
      scene: '猫吃完药后，用看叛徒的眼神看着你。',
      dimensions: 'HL_CP',
      options: [
        { text: '立刻哄它："我也是为你好啊"', score: 'HC' },
        { text: '药先吃完，感情之后再慢慢修复', score: 'LC' },
        { text: '用零食补偿它，假装刚才什么都没发生', score: 'HP' },
        { text: '心疼但清醒："你恨我也得吃"', score: 'LP', tScore: 1 }
      ]
    },
    {
      id: 7,
      type: 'normal',
      scene: '凌晨 3 点，猫在客厅开运动会，你被迫醒来。',
      dimensions: 'HL_CP',
      options: [
        { text: '起床看看是不是饿了、渴了、哪里不舒服', score: 'HC' },
        { text: '翻个身继续睡，明天再处理', score: 'LC' },
        { text: '躺床上骂它两句："你白天是死机了吗？"', score: 'HP', tScore: 1 },
        { text: '戴上耳塞：它跑它的，我活我的', score: 'LP' }
      ]
    },
    {
      id: 8,
      type: 'normal',
      scene: '猫坐在窗边看外面，你突然觉得它像有心事。',
      dimensions: 'SF_DR',
      options: [
        { text: '陪它看一会儿，像两个无业人员一起发呆', score: 'SR' },
        { text: '检查窗户和纱窗，安全第一', score: 'SD' },
        { text: '给它布置一个专属观景位，安排上', score: 'FD' },
        { text: '不打扰，它也有自己的世界', score: 'FR' }
      ]
    },
    {
      id: 9,
      type: 'normal',
      scene: '搬到新家，猫缩在角落，像一团失联的毛球。',
      dimensions: 'SF_DR',
      options: [
        { text: '坐在附近陪着，等它先靠近', score: 'SD' },
        { text: '把旧窝、旧碗、旧毯子都摆好', score: 'SR' },
        { text: '陪它一个房间一个房间巡视新领地', score: 'FD' },
        { text: '不追不哄，让它自己慢慢探索', score: 'FR' }
      ]
    },
    {
      id: 10,
      type: 'normal',
      scene: '你精挑细选的新玩具，猫看都不看。',
      dimensions: 'HL_DR',
      options: [
        { text: '亲自示范，像个卖力的玩具销售', score: 'HD' },
        { text: '收起来，过几天换个时机再拿出来', score: 'LD' },
        { text: '对它说："你不玩是吧？那我玩给你看"', score: 'HR', tScore: 1 },
        { text: '接受现实：猫喜欢纸箱胜过一切', score: 'LR' }
      ]
    },
    {
      id: 11,
      type: 'normal',
      scene: '你在沙发看剧，猫跳上来踩奶，像突然发放亲密通行证。',
      dimensions: 'HL_CP',
      options: [
        { text: '激动到小声尖叫："宝宝终于爱我了！"', score: 'HC' },
        { text: '不敢乱动，怕打断它这一刻', score: 'LC' },
        { text: '轻轻摸它："继续踩，我今天是你的垫子"', score: 'HP' },
        { text: '熟练躺平：行，又被征用了', score: 'LP', tScore: 1 }
      ]
    },
    {
      id: 12,
      type: 'normal',
      scene: '如果给你和猫的关系取个标题，你觉得更像？',
      dimensions: 'CP_DR',
      options: [
        { text: '《我骂它，但我最惯着它》', score: 'PR', tScore: 1 },
        { text: '《它不说爱，但默认我属于它》', score: 'CR' },
        { text: '《同住一个屋檐下的两个怪人》', score: 'PD', tScore: 1 },
        { text: '《我只是它的长期服务人员》', score: 'CD', tScore: 1 }
      ]
    },
    // === 彩蛋题（4 题）：不强制计入主结果，权重 0.5 ===
    {
      id: 13,
      type: 'bonus',
      bonus: true,
      scene: '如果猫突然会给你发微信，它第一句大概率是？',
      dimensions: 'SF_HL',
      options: [
        { text: '人类，饭呢？', score: 'FL' },
        { text: '你今天身上有别的猫味。', score: 'SH' },
        { text: '别吵，我正在思考猫生。', score: 'FH' },
        { text: '刚才不理你，不代表我不需要你。', score: 'SL' }
      ]
    },
    {
      id: 14,
      type: 'bonus',
      bonus: true,
      scene: '如果猫偷偷给你写年度评价，它会写？',
      dimensions: 'CP_DR',
      options: [
        { text: '此人类情绪稳定，适合长期饲养。', score: 'CR' },
        { text: '服务态度良好，但开罐头速度有待提升。', score: 'CD' },
        { text: '过度热情，经常侵犯本喵私人空间。', score: 'PD' },
        { text: '已被驯化成功，可继续观察。', score: 'PR' }
      ]
    },
    {
      id: 15,
      type: 'bonus',
      bonus: true,
      scene: '朋友说你太宠猫了，你的真实想法是？',
      dimensions: 'SF_CP',
      options: [
        { text: '这还叫宠？我已经很克制了。', score: 'SC' },
        { text: '它就这么小一只，我不宠谁宠。', score: 'FC' },
        { text: '我知道，但它真的很会拿捏我。', score: 'SP' },
        { text: '没办法，它才是这个家的房东。', score: 'FP' }
      ]
    },
    {
      id: 16,
      type: 'bonus',
      bonus: true,
      scene: '如果猫能给你颁一个奖，它会颁给你？',
      dimensions: 'HL_DR',
      options: [
        { text: '最好骗人类奖。', score: 'HD' },
        { text: '最会开罐头奖。', score: 'LR' },
        { text: '最适合当猫床奖。', score: 'LD' },
        { text: '最离不开本喵奖。', score: 'HR' }
      ]
    }
  ],
  relationships: {
    SHCD: {
      title: '被主子驯化成功',
      subtitle: '本喵认证：它还没开口，你已经开始让步。',
      goldQuote: '它还没喵，你已经投降了。',
      subQuote: '在它面前，你的原则保质期从不超过三秒。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['自动投降', '原则失效', '主子认证', '很好拿捏'],
      emotionTag: '羡慕型',
      posterTheme: 'warmOrange',
      indices: [
        { label: '被拿捏指数', value: 99 },
        { label: '情感浓度', value: 95 },
        { label: '操心程度', value: 90 },
        { label: '探索欲望', value: 80 }
      ],
      petComment: '你骂归骂，罐头不是照开吗？本喵很满意。',
      summary: '嘴上说不管了，身体很诚实。',
      description: '嘴上说不惯，身体很诚实。它知道你会接住它每一次撒娇，你也知道自己撑不过三秒。',
      keywords: ['被驯化', '甘愿臣服', '原则失效'],
      tips: [
        '可以立规矩，但别演太久',
        '我撒娇的时候，你可以慢一点投降',
        '罐头别停，其他都好说'
      ],
      customIndices: [
        { label: '被气笑指数', value: 95, comment: '气到笑出声是常态' },
        { label: '原谅速度', value: 99, comment: '撑不过三秒' },
        { label: '售后能力', value: 92, comment: '负责收拾一切' },
        { label: '原则存活率', value: 8, comment: '每次立的规矩都白立' }
      ],
      relationshipDef: {
        headline: '嘴上说不管了，身体很诚实。',
        detail: '你和它之间不是甜蜜型关系，更像一个长期被拿捏的受害者。它作妖你吐槽，你说不管它就立刻表演可怜，你的原则保质期从来不超过三秒。',
        cards: [
          { label: '关系模式', value: '逆子 + 售后人员' },
          { label: '相处日常', value: '作妖 → 骂 → 心软 → 开罐头' },
          { label: '隐藏真相', value: '你嘴上不要它，其实最离不开' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '被驯化人类' },
        { label: '关系模式', value: '一喵一令' },
        { label: '拿捏指数', value: '99%' },
        { label: '本喵评价', value: '还没叫你就来了' }
      ],
      tOverride: {
        title: '逆子受害者',
        goldQuote: '你骂它一百遍，还是会给它开罐头。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '你自己都说了是甜蜜型——果然，本喵一撒娇你就立刻投降，一点悬念都没有。',
        bicker: '说好的相爱相杀呢？你每次都先心软，这哪是互怼，是你在单方面认输。',
        quiet: '安静同居？你确定？你明明一回家就冲过来汇报行程，哪里安静了。',
        worker: '打工人说法倒是精准——但你这个打工人未免也太甘愿了吧。'
      },
      circleTexts: [
        '测完确认了，我在猫家已经被驯化成功了，原则保质期三秒 #它眼中的你 #人宠关系测试PETI',
        '我说再也不惯它了，然后手已经在开罐头。',
        '测完觉得很冒犯，但确实无法反驳。',
        '来比比，谁家猫最像老板，谁家人类最像员工。'
      ],
      circleText: '测完确认了，我在猫家已经被驯化成功了。它还没喵，我就已经开始心软。'
    },
    SHCR: {
      title: '猫咪安全基地',
      subtitle: '本喵认证：它不一定黏你，但它知道你一直在。',
      goldQuote: '它不一定扑向你，但一定会把你当退路。',
      subQuote: '对它来说，你在，就是世界上最确定的事。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['稳定输出', '安心来源', '靠谱人类', '从不掉线'],
      emotionTag: '治愈型',
      posterTheme: 'milkWhite',
      indices: [
        { label: '被拿捏指数', value: 80 },
        { label: '情感浓度', value: 75 },
        { label: '操心程度', value: 85 },
        { label: '安稳指数', value: 95 }
      ],
      petComment: '你不用每天表现得很爱我，准时出现就够了。',
      summary: '什么都不说，但什么都知道。',
      description: '它不一定天天贴贴，但你是它确认安全的地方。你在，它就知道生活没有出错。',
      keywords: ['规律感', '安全港', '静默守候'],
      tips: [
        '别突然改变饭点',
        '偶尔主动摸一下，本喵不会拒绝',
        '我待在你附近，就是在说信任你'
      ],
      customIndices: [
        { label: '被拿捏指数', value: 80, comment: '表面平静，内心全听它的' },
        { label: '心软速度', value: 88, comment: '看一眼就投降' },
        { label: '贴贴浓度', value: 75, comment: '不多不少刚刚好' },
        { label: '专属感', value: 95, comment: '只对你这样' }
      ],
      relationshipDef: {
        headline: '什么都不说，但什么都知道。',
        detail: '你不做惊天动地的事，但你的存在就是它最稳的背景光。准时喂饭、固定撸猫，你们的日常安静但确定。',
        cards: [
          { label: '关系模式', value: '稳定输出型' },
          { label: '相处日常', value: '规律 + 安心 + 从不掉线' },
          { label: '隐藏真相', value: '它不黏你，但它一直在你旁边' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '安全基地管理员' },
        { label: '关系模式', value: '稳定输出' },
        { label: '安稳指数', value: '95%' },
        { label: '本喵评价', value: '不叫你也会来' }
      ],
      tOverride: {
        title: '逆子受害者',
        goldQuote: '你骂它一百遍，还是会给它开罐头。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '你说你们甜蜜黏人？嗯，你确实随叫随到，但本喵只是觉得你挺靠谱。',
        bicker: '互怼？你？你连我赏你一眼都感恩戴德，哪来的底气互怼。',
        quiet: '安静同居说得对。你就是那个安安静静在旁边等我翻牌子的人类。',
        worker: '员工？不，你是本喵永久编制内的安全基地，级别比员工高。'
      },
      circleTexts: [
        '我是猫咪安全基地——什么都没做，但它就是不走 #它眼中的你 #人宠关系测试PETI',
        '笑死，我家猫给我的身份不是主人，是可持续使用人类。',
        '我家猫：不熟。也是我家猫：今晚继续睡你头上。',
        '测完觉得很冒犯，但确实无法反驳。'
      ],
      circleText: '我测出来是「猫咪安全基地」，原来它不黏我，不代表不需要我。'
    },
    SHPD: {
      title: '主子生活策展人',
      subtitle: '本喵认证：它的猫生，被你安排得明明白白。',
      goldQuote: '你不是在养猫，你是在策展它的人生。',
      subQuote: '在你心里它值得拥有全世界——它也这么觉得。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['精致养猫', '生活策展', '买买买', '主角待遇'],
      emotionTag: '勇敢型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '被拿捏指数', value: 75 },
        { label: '情感浓度', value: 85 },
        { label: '伙伴默契', value: 92 },
        { label: '探索欲望', value: 90 }
      ],
      petComment: '又买新玩具了？上一个还没拆呢。不过你继续，展品本猫很满意。',
      summary: '你给最好的，它当然值得。',
      description: '你把它当家里的主角。猫粮、玩具、窝、照片、节日仪式感，一个都不能少。',
      keywords: ['精致养猫', '策展人', '包办一切'],
      tips: [
        '可以继续买，但别强迫我配合',
        '纸箱可能比新玩具更好玩',
        '我喜欢你的用心，但我也有自己的审美'
      ],
      customIndices: [
        { label: '发圈冲动', value: 92, comment: '每天都想晒它' },
        { label: '拍照频率', value: 95, comment: '手机全是猫照' },
        { label: '出片率', value: 88, comment: '张张都是大片' },
        { label: '显摆浓度', value: 90, comment: '朋友圈半壁江山' }
      ],
      relationshipDef: {
        headline: '你不是养猫，你是在策展。',
        detail: '你给它的安全感不只是保护性的，更是"整个世界都为它安排好了"的确定感。它是主角，你是幕后最认真的人。',
        cards: [
          { label: '关系模式', value: '策展人 + 展品' },
          { label: '相处日常', value: '买买买 + 拍拍拍' },
          { label: '隐藏真相', value: '它值得，你也值得它' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '首席策展人' },
        { label: '关系模式', value: '包办型养猫' },
        { label: '上头指数', value: '92%' },
        { label: '本喵评价', value: '展品本猫很满意' }
      ],
      tOverride: {
        title: '猫家售后部部长',
        goldQuote: '它负责闯祸，你负责售后。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜型？你确实很甜——甜到连猫粮都要精心搭配，它的猫生真的被你安排得明明白白。',
        bicker: '说互怼？你这不叫互怼，你这叫一边吐槽一边给它升级装备。',
        quiet: '安静同居？你确定？你给它安排的生活可一点都不安静。',
        worker: '打工人？你不是打工，你是策展人——薪资为零但干劲十足。'
      },
      circleTexts: [
        '我是主子生活策展人——猫的猫生被我安排得明明白白 #它眼中的你 #人宠关系测试PETI',
        '又买新玩具了，上一个还没拆呢。没办法，策展人的职业病。',
        '测完觉得很冒犯，但确实无法反驳。',
        '来比比，谁家猫最像老板，谁家人类最像员工。'
      ],
      circleText: '测完发现，我不是养猫，是给它策展人生。主子生活策展人本人上线。'
    },
    SHPR: {
      title: '人形猫窝',
      subtitle: '本喵认证：你最大的优点，是温度合适还不乱动。',
      goldQuote: '它不一定黏你，但它很会使用你。',
      subQuote: '你们最深的告白，就是安静地待在一起。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['人形猫床', '体温合格', '不敢乱动', '可续约'],
      emotionTag: '温暖型',
      posterTheme: 'pinkPeach',
      indices: [
        { label: '被拿捏指数', value: 82 },
        { label: '情感浓度', value: 70 },
        { label: '伙伴默契', value: 88 },
        { label: '安稳指数', value: 90 }
      ],
      petComment: '你身上温度不错，就是偶尔会乱动。下次注意。',
      summary: '安静待在一起，比什么都好。',
      description: '你不需要做什么特别的事。它愿意趴在你身上，就已经是最高级的信任。',
      keywords: ['天然合拍', '无压力', '恰到好处'],
      tips: [
        '我睡着时别乱动',
        '不用一直说话，保持恒温就行',
        '我压着你，是在给你面子'
      ],
      customIndices: [
        { label: '不敢乱动指数', value: 92, comment: '它一趴你就定住' },
        { label: '体温合格度', value: 95, comment: '恒温人形暖宝宝' },
        { label: '被征用概率', value: 88, comment: '睡觉就是你的主业' },
        { label: '猫床舒适度', value: 90, comment: '它给你打了高分' }
      ],
      relationshipDef: {
        headline: '你不说话它也不走，这就够了。',
        detail: '你和它天生合拍，不需要刻意经营。你不控制它也不忽略它，距离感刚刚好。它不说爱你，但它一直在你身上。',
        cards: [
          { label: '关系模式', value: '安静共处型' },
          { label: '相处日常', value: '你躺着 + 它趴着 = 完美' },
          { label: '隐藏真相', value: '它信任你到可以在你身上睡着' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '人形猫窝' },
        { label: '关系模式', value: '安静共处' },
        { label: '被征用概率', value: '88%' },
        { label: '本喵评价', value: '这个垫子不错' }
      ],
      tOverride: {
        title: '本喵编制内员工',
        goldQuote: '它没说爱你，但已经给你发工牌了。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？不，本喵只是觉得你体温合格，刚好适合当垫子。',
        bicker: '互怼？你哪有力气跟我怼，你连我踩你脸都不带躲的。',
        quiet: '安静同居这个说法本喵认可。保持安静，继续当猫床。',
        worker: '你说你是员工？不，你的岗位更精准——人形猫窝，24小时待机。'
      },
      circleTexts: [
        '我是人形猫窝——不说话它也不走，安静待在一起比什么都好 #它眼中的你 #人宠关系测试PETI',
        '我家猫的择偶标准：体温合格、不乱动、呼吸声白噪音级别。',
        '测完觉得很冒犯，但确实无法反驳。',
        '来比比，谁家猫最像老板，谁家人类最像员工。'
      ],
      circleText: '我测出来是「人形猫窝」。不说了，腿麻了，但不敢动。'
    },
    SLCD: {
      title: '操心型猫家长',
      subtitle: '本喵认证：嘴上说不管，实际全都管了。',
      goldQuote: '嘴上说不惯着，手已经在开罐头了。',
      subQuote: '你从不说爱，但它的一切永远是最好的那款。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['嘴硬心软', '暗地操心', '口是心非', '细节控'],
      emotionTag: '深情型',
      posterTheme: 'coolGray',
      indices: [
        { label: '被拿捏指数', value: 65 },
        { label: '情感浓度', value: 60 },
        { label: '操心程度', value: 98 },
        { label: '探索欲望', value: 75 }
      ],
      petComment: '你以为我不知道？你每次生气都不超过三分钟。',
      summary: '嘴上说不在意，实际操碎了心。',
      description: '你不太说爱，但它的一切你都记得。饭、水、猫砂、药、情绪变化，一个都逃不过你。',
      keywords: ['嘴硬心软', '无声守护', '深藏不露'],
      tips: [
        '不用装不在意，本喵看得出来',
        '别总把担心憋着',
        '我偶尔作妖，但我知道你会管我'
      ],
      customIndices: [
        { label: '嘴硬心软指数', value: 98, comment: '嘴上嫌弃手上开罐头' },
        { label: '操心程度', value: 95, comment: '比它自己还上心' },
        { label: '口是心非值', value: 92, comment: '说不管但全都管了' },
        { label: '原则存活率', value: 15, comment: '说好的规矩呢' }
      ],
      relationshipDef: {
        headline: '嘴上说不管，手上全在管。',
        detail: '你从不说爱它，但它的一切永远是最好的那款。你们有种无声默契：不需要表演亲密，但心里都清楚对方的位置。',
        cards: [
          { label: '关系模式', value: '嘴硬心软型' },
          { label: '相处日常', value: '吐槽 → 担心 → 偷偷操心' },
          { label: '隐藏真相', value: '你比它自己还在意它' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '操心型家长' },
        { label: '关系模式', value: '嘴硬心软' },
        { label: '操心程度', value: '98%' },
        { label: '本喵评价', value: '嘴上骂我心里疼' }
      ],
      tOverride: {
        title: '逆子受害者',
        goldQuote: '你骂它一百遍，还是会给它开罐头。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你表面不是挺冷的吗？但半夜偷偷来摸我这件事，别以为我不知道。',
        bicker: '互怼倒是真的——你嘴上从没服过，但猫粮一直是最贵的那款。',
        quiet: '安静同居？你嘴上是挺安静的，手上可一点没闲着。',
        worker: '打工人？你这个打工人嘴硬心软，加班费都不要还倒贴零食。'
      },
      circleTexts: [
        '我是操心型猫家长——嘴上说不惯着，手已经在开罐头了 #它眼中的你 #人宠关系测试PETI',
        '我说再也不惯它了，然后手已经在开罐头。',
        '笑死，我家猫给我的身份不是主人，是可持续使用人类。',
        '测完觉得很冒犯，但确实无法反驳。'
      ],
      circleText: '我说再也不惯它了，然后手已经在开罐头。'
    },
    SLCR: {
      title: '定时暖气型人类',
      subtitle: '本喵认证：不热烈，但从不缺席。',
      goldQuote: '你不高调，但你一直在。',
      subQuote: '你像一台不会坏的暖气片，不炫耀温度但从不降温。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['准时出现', '恒温陪伴', '低调靠谱', '平淡是真'],
      emotionTag: '踏实型',
      posterTheme: 'teaBrown',
      indices: [
        { label: '被拿捏指数', value: 60 },
        { label: '情感浓度', value: 55 },
        { label: '操心程度', value: 80 },
        { label: '安稳指数', value: 98 }
      ],
      petComment: '你可能不浪漫，但你很准时。本喵认可这种能力。',
      summary: '不浮夸但永远准时出现。',
      description: '你们的关系不是烟花，是暖气。平时不明显，但一旦不在，就会觉得少了点什么。',
      keywords: ['规律如钟', '低调靠谱', '平淡是真'],
      tips: [
        '饭点稳定就是情话',
        '偶尔加个互动，本喵也不是不可以',
        '别突然消失，暖气不能断供'
      ],
      customIndices: [
        { label: '准时指数', value: 98, comment: '比闹钟还准' },
        { label: '恒温输出', value: 95, comment: '不炫耀但从不降温' },
        { label: '靠谱程度', value: 92, comment: '从不缺席' },
        { label: '存在感', value: 60, comment: '低调但不可缺少' }
      ],
      relationshipDef: {
        headline: '不热烈，但从不缺席。',
        detail: '你是那个定时出现的人类。你们的爱不是烟花，是暖气——一直在，从不高调。',
        cards: [
          { label: '关系模式', value: '恒温陪伴型' },
          { label: '相处日常', value: '准时喂饭 + 定时铲屎' },
          { label: '隐藏真相', value: '规律本身就是它最好的情话' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '定时暖气' },
        { label: '关系模式', value: '恒温输出' },
        { label: '准时指数', value: '98%' },
        { label: '本喵评价', value: '饭点从不迟到' }
      ],
      tOverride: {
        title: '合租仇人型人类',
        goldQuote: '谁也看不上谁，谁也没真想分开。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你确定说的是你们？你连摸我都定时定量的。',
        bicker: '互怼？你这人连怼都是温吞的，最多皱个眉就继续铲屎了。',
        quiet: '安静同居，非常准确。你就是那个安静又准时的暖气片。',
        worker: '打工人？你是那种准时上下班、从不加班也从不迟到的模范员工。'
      },
      circleTexts: [
        '我是定时暖气型人类——不热烈但从不缺席 #它眼中的你 #人宠关系测试PETI',
        '我家猫的生物钟已经和我的饭点同步了，这算什么双向奔赴。',
        '测完觉得很冒犯，但确实无法反驳。',
        '来比比，谁家猫最像老板，谁家人类最像员工。'
      ],
      circleText: '我测出来是「定时暖气型人类」，不热烈但从不缺席，这不就是我本人。'
    },
    SLPD: {
      title: '猫咪情绪翻译官',
      subtitle: '本喵认证：它没出声，你已经开始翻译。',
      goldQuote: '它一个眼神，你已经脑补完一整集。',
      subQuote: '你从不替它做决定，只在它需要时刚好出现。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['猫语十级', '过度解读', '细节捕手', '读猫高手'],
      emotionTag: '稳重型',
      posterTheme: 'lavender',
      indices: [
        { label: '被拿捏指数', value: 55 },
        { label: '情感浓度', value: 50 },
        { label: '伙伴默契', value: 90 },
        { label: '探索欲望', value: 85 }
      ],
      petComment: '我只是看了你一眼，你已经猜到我想吃零食了。不错。',
      summary: '不说你也懂。',
      description: '别人看它只是发呆，你已经开始分析它今天是不是心情不好。你未必每次都猜对，但你真的很在意。',
      keywords: ['边界感', '安静陪伴', '互不打扰'],
      tips: [
        '可以观察，但别过度脑补',
        '我不说话，不代表我没表达',
        '猜对了奖励你一个眼神'
      ],
      customIndices: [
        { label: '边界感', value: 95, comment: '从不越界' },
        { label: '安静陪伴值', value: 92, comment: '在但不吵' },
        { label: '互不打扰默契', value: 90, comment: '各自安好' },
        { label: '舒服程度', value: 88, comment: '距离刚刚好' }
      ],
      relationshipDef: {
        headline: '不说你也懂，懂了也不说。',
        detail: '你不控制也不忽略，需要时刚好出现。你们的沉默不是冷漠，是最高级的默契。',
        cards: [
          { label: '关系模式', value: '安静翻译型' },
          { label: '相处日常', value: '一个眼神 = 全部理解' },
          { label: '隐藏真相', value: '它一直在你视线范围内' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '特聘翻译官' },
        { label: '关系模式', value: '眼神交流' },
        { label: '读猫指数', value: '90%' },
        { label: '本喵评价', value: '勉强算你懂我' }
      ],
      tOverride: {
        title: '合租仇人型人类',
        goldQuote: '谁也看不上谁，谁也没真想分开。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你佛系得很，但偷偷看我的眼神出卖了你。',
        bicker: '互怼？你连怼都是沉默式的——用一个眼神就把我翻译完了。',
        quiet: '安静同居是对的。你最大的能力就是安静地听懂我没说的话。',
        worker: '打工人？你这种翻译官级别的人类，不是打工，是特聘。'
      },
      circleTexts: [
        '我是猫咪情绪翻译官——它没出声我就已经听懂了 #它眼中的你 #人宠关系测试PETI',
        '我家猫：没出声。我：你是不是想吃零食。它：……行吧你确实听懂了。',
        '测完觉得很冒犯，但确实无法反驳。',
        '笑死，我家猫给我的身份不是主人，是可持续使用人类。'
      ],
      circleText: '我家猫没出声，我已经听懂了。猫咪情绪翻译官，看来是我。'
    },
    SLPR: {
      title: '高冷室友合伙人',
      subtitle: '本喵认证：各过各的，但谁也没走远。',
      goldQuote: '不贴贴也没关系，彼此在就行。',
      subQuote: '这段关系最舒服的地方，就是谁也不用假装热情。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['精神室友', '互不打扰', '边界感', '安静同居'],
      emotionTag: '默契型',
      posterTheme: 'coolGray',
      indices: [
        { label: '被拿捏指数', value: 40 },
        { label: '情感浓度', value: 40 },
        { label: '伙伴默契', value: 85 },
        { label: '安稳指数', value: 88 }
      ],
      petComment: '你坐沙发，我蹲窗台。距离刚好，别过来破坏气氛。',
      summary: '各过各的，莫名和谐。',
      description: '看起来冷淡，其实是双方都舒服的距离。你不强迫它热情，它也不打扰你生活。',
      keywords: ['精神室友', '边界感', '各自安好'],
      tips: [
        '别突然热情，吓猫',
        '偶尔对视就够了',
        '各自安好，就是我们最好的状态'
      ],
      customIndices: [
        { label: '边界感', value: 98, comment: '教科书级别' },
        { label: '安静陪伴值', value: 85, comment: '同空间就够' },
        { label: '互不打扰默契', value: 95, comment: '谁都不多事' },
        { label: '舒服程度', value: 90, comment: '零压力共处' }
      ],
      relationshipDef: {
        headline: '各过各的，但都没走远。',
        detail: '没有太多肢体接触，但有一种你在那边就好的安心感。看似冷淡，其实是最舒服的距离。',
        cards: [
          { label: '关系模式', value: '精神室友型' },
          { label: '相处日常', value: '各自精彩 + 偶尔对视' },
          { label: '隐藏真相', value: '活动范围永远在你可视区内' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '高冷合伙人' },
        { label: '关系模式', value: '精神室友' },
        { label: '边界感', value: '98%' },
        { label: '本喵评价', value: '保持这个距离' }
      ],
      tOverride: {
        title: '合租仇人型人类',
        goldQuote: '谁也看不上谁，谁也没真想分开。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你们？你连多看它一眼都怕打扰到对方。',
        bicker: '互怼？你们这种互怼方式太高级了——用沉默表达一切不满。',
        quiet: '安静同居，终于有个说法精准的了。各过各的，完美。',
        worker: '打工人？你是那种到点下班、绝不多留一秒的合伙人型员工。'
      },
      circleTexts: [
        '我是高冷室友合伙人——各过各的但莫名和谐 #它眼中的你 #人宠关系测试PETI',
        '你不打扰我我也不打扰你，偶尔对视一下就够了。',
        '我家猫：不熟。也是我家猫：今晚继续睡你头上。',
        '测完觉得很冒犯，但确实无法反驳。'
      ],
      circleText: '我和我家猫是高冷室友合伙人，不贴贴，但也没真想分开。'
    },
    FHCD: {
      title: '猫界代言人',
      subtitle: '本喵认证：你发的每条朋友圈，都像在替它营业。',
      goldQuote: '它只是路过，你已经拍出了官宣感。',
      subQuote: '别人养猫晒日常，你养猫像在经营一个IP。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['炫猫达人', '猫界代言', '显摆浓度高', '出片积极'],
      emotionTag: '甜蜜型',
      posterTheme: 'pinkPeach',
      indices: [
        { label: '被拿捏指数', value: 70 },
        { label: '情感浓度', value: 92 },
        { label: '操心程度', value: 95 },
        { label: '探索欲望', value: 80 }
      ],
      petComment: '你又偷拍我？算了，这张还行，可以发。',
      summary: '随叫随到本人。',
      description: '它负责可爱，你负责让全世界知道它可爱。你不是普通铲屎官，是它的宣传部门。',
      keywords: ['随叫随到', '高调宠爱', '猫界代言人'],
      tips: [
        '拍可以，丑照别发',
        '滤镜别太重，本喵天生好看',
        '发圈前最好先获得本喵眼神批准'
      ],
      customIndices: [
        { label: '随叫随到指数', value: 96, comment: '比外卖还快' },
        { label: '开罐头熟练度', value: 92, comment: '单手三秒开盖' },
        { label: '工牌稳定度', value: 88, comment: '从未旷工' },
        { label: '被使唤概率', value: 95, comment: '一叫就动' }
      ],
      relationshipDef: {
        headline: '叫一声就到，从不掉线。',
        detail: '你的服务态度让外卖软件都该来学习。铃一摇人到场，猫粮口味轮着换，从不让它等。',
        cards: [
          { label: '关系模式', value: '全年无休员工型' },
          { label: '相处日常', value: '摇铃 → 到场 → 服务' },
          { label: '隐藏真相', value: '你乐在其中根本不想辞职' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '专属经纪人' },
        { label: '关系模式', value: '你拍它营业' },
        { label: '发圈冲动', value: '95%' },
        { label: '本喵评价', value: '角度还可以' }
      ],
      tOverride: {
        title: '猫家售后部部长',
        goldQuote: '它负责闯祸，你负责售后。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你岂止甜蜜，你是甜到连朋友圈都在替我营业的程度。',
        bicker: '互怼？你每次怼完还要给我拍十张照片发群里，这叫什么互怼。',
        quiet: '安静同居？你安静？你发朋友圈的频率比我叫的次数还多。',
        worker: '打工人说法太谦虚了——你是我的经纪人兼PR兼后勤部长。'
      },
      circleTexts: [
        '我是社交炫猫型人类——发的每条朋友圈都在替它营业 #它眼中的你 #人宠关系测试PETI',
        '测完发现我不是在养猫，是在运营一个猫咪IP。',
        '测完觉得很冒犯，但确实无法反驳。',
        '来比比，谁家猫最像老板，谁家人类最像员工。'
      ],
      circleText: '我测出来是猫界代言人。不是我爱晒，是它确实太好看了。'
    },
    FHCR: {
      title: '人形罐头机',
      subtitle: '本喵认证：铃一响你就到，外卖都没你快。',
      goldQuote: '它一看你，你就开始怀疑是不是该加餐。',
      subQuote: '你的响应速度让本喵确认：你的人生使命就是伺候我。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['随叫随到', '饭票本人', '投喂积极', '很好骗'],
      emotionTag: '能量型',
      posterTheme: 'warmOrange',
      indices: [
        { label: '被拿捏指数', value: 78 },
        { label: '情感浓度', value: 88 },
        { label: '操心程度', value: 75 },
        { label: '安稳指数', value: 85 }
      ],
      petComment: '我不一定饿，但我知道你一定会以为我饿。',
      summary: '快乐搭子认证。',
      description: '它掌握了你的投喂按钮。你以为自己在照顾它，它以为自己在正常点餐。',
      keywords: ['快乐搭子', '一起发疯', '默契拍档'],
      tips: [
        '加餐可以，别乱加',
        '我看你不一定是饿，也可能是无聊',
        '别被我每一次喵都骗到'
      ],
      customIndices: [
        { label: '快乐指数', value: 98, comment: '在一起就笑' },
        { label: '一起发疯值', value: 95, comment: '随时起飞' },
        { label: '搭子默契', value: 92, comment: '不说就懂' },
        { label: '通过率', value: 90, comment: '终面已过' }
      ],
      relationshipDef: {
        headline: '在一起就停不下来地笑。',
        detail: '你们不是主人和宠物，是平等的快乐搭子。它搞笑你拍手，你犯蠢它陪着，默契天生自带。',
        cards: [
          { label: '关系模式', value: '快乐搭子型' },
          { label: '相处日常', value: '互相搞笑 + 一起发疯' },
          { label: '隐藏真相', value: '它选了你当唯一搭子' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '人形罐头机' },
        { label: '关系模式', value: '眼神下单' },
        { label: '响应速度', value: '99%' },
        { label: '本喵评价', value: '叫一声就开饭' }
      ],
      tOverride: {
        title: '本喵编制内员工',
        goldQuote: '它没说爱你，但已经给你发工牌了。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你不是黏人，你是随叫随到，比外卖还快的那种。',
        bicker: '互怼？你哪有空跟我怼，你忙着给我换猫粮口味呢。',
        quiet: '安静同居？你安静？铃一摇你就弹射起步了，哪里安静了。',
        worker: '打工人说得非常精准——而且你是全年无休那种。'
      },
      circleTexts: [
        '我是人形罐头机——铃一摇就到，外卖都没我快 #它眼中的你 #人宠关系测试PETI',
        '铃摇三秒人到场，猫粮口味还轮着换。这服务态度谁比得过。',
        '测完觉得很冒犯，但确实无法反驳。',
        '来比比，谁家猫最像老板，谁家人类最像员工。'
      ],
      circleText: '测完发现，我不是主人，是人形罐头机。它一喵，我就开饭。'
    },
    FHPD: {
      title: '快乐搭子型人类',
      subtitle: '本喵认证：它搞笑你拍手，你犯傻它旁观。',
      goldQuote: '你们不是不爱，是爱得很好笑。',
      subQuote: '你们在一起的画面，就是快乐最简单的样子。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['快乐搭子', '轻喜剧日常', '互相嫌弃', '一起犯傻'],
      emotionTag: '灵魂型',
      posterTheme: 'lavender',
      indices: [
        { label: '被拿捏指数', value: 68 },
        { label: '情感浓度', value: 95 },
        { label: '伙伴默契', value: 95 },
        { label: '探索欲望', value: 92 }
      ],
      petComment: '别装了，你看我犯蠢的时候明明笑得最大声。',
      summary: '甜到拿捏你全部。',
      description: '你们的关系不像偶像剧，更像情景喜剧。它一个动作，你笑半天；你一个失误，它冷眼旁观。',
      keywords: ['甜宠', '被拿捏', '贴贴'],
      tips: [
        '可以笑我，但别笑太大声',
        '别逼我营业，我自然搞笑',
        '快乐可以继续，丑照少发'
      ],
      customIndices: [
        { label: '被拿捏指数', value: 97, comment: '完全没抵抗力' },
        { label: '心软速度', value: 95, comment: '一秒都撑不住' },
        { label: '贴贴浓度', value: 92, comment: '24小时想贴' },
        { label: '专属感', value: 90, comment: '只对你这样' }
      ],
      relationshipDef: {
        headline: '一撒娇你就没辙了。',
        detail: '它知道你会接住每一次撒娇。你说要有原则，但看到它卖萌就立刻投降，毫无抵抗力。',
        cards: [
          { label: '关系模式', value: '甜宠溺爱型' },
          { label: '相处日常', value: '撒娇 → 心软 → 贴贴' },
          { label: '隐藏真相', value: '它其实也在宠你' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '快乐搭子' },
        { label: '关系模式', value: '互相搞笑' },
        { label: '快乐指数', value: '95%' },
        { label: '本喵评价', value: '通过终面试用中' }
      ],
      tOverride: {
        title: '相爱相杀型室友',
        goldQuote: '你们不是不爱，是爱得很像打架。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你们的甜蜜方式就是互相搞笑——全世界都觉得你们很吵。',
        bicker: '互怼？你们确实天天互怼，但谁也没真想让对方闭嘴。',
        quiet: '安静同居？你确定？你们在一起的画风明明是停不下来地笑。',
        worker: '打工人？不，你是搭子——我们是平等合伙关系，不存在上下级。'
      },
      circleTexts: [
        '我是快乐搭子型人类——它搞笑我拍手，我犯蠢它陪着 #它眼中的你 #人宠关系测试PETI',
        '在一起就是停不下来地笑，我们是猫界最佳拍档。',
        '测完觉得很冒犯，但确实无法反驳。',
        '发给你养猫的朋友，看看谁才是最惨猫奴。'
      ],
      circleText: '我和我家猫不是主宠，是快乐搭子。每天都像在演小型情景喜剧。'
    },
    FHPR: {
      title: '铲屎冤种本人',
      subtitle: '本喵认证：它负责闯祸，你负责售后。',
      goldQuote: '你边骂边收拾，它边看边满意。',
      subQuote: '你们在一起的画面，就是快乐最简单的样子。',
      rare: '前25%',
      rareLevel: '25%',
      posterBadge: '25%人类是同款',
      tags: ['长期售后', '边骂边干', '心软复发', '冤种本人'],
      emotionTag: '快乐型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '被拿捏指数', value: 60 },
        { label: '情感浓度', value: 82 },
        { label: '伙伴默契', value: 80 },
        { label: '安稳指数', value: 75 }
      ],
      petComment: '我只是轻轻作了一下妖，你怎么又开始收拾了？',
      summary: '炫猫停不下来。',
      description: '它每天制造一点小麻烦，你每天重新原谅一次。你不是不知道自己冤，但你还是会收拾。',
      keywords: ['炫猫', '发圈', '拍照达人'],
      tips: [
        '可以骂，但别罢工',
        '本喵售后需求长期存在',
        '你越说不管，越容易被看穿'
      ],
      customIndices: [
        { label: '发圈冲动', value: 96, comment: '日更三条起步' },
        { label: '拍照频率', value: 98, comment: '手机全是猫照' },
        { label: '猫咪出片率', value: 90, comment: '张张精修' },
        { label: '显摆浓度', value: 93, comment: '朋友圈半壁江山' }
      ],
      relationshipDef: {
        headline: '你的相册里我占了80%。',
        detail: '你发朋友圈比陪我的时间还多。别人养猫晒日常，你养猫像在运营一个IP。',
        cards: [
          { label: '关系模式', value: '炫猫经纪人型' },
          { label: '相处日常', value: '拍拍拍 + 发发发' },
          { label: '隐藏真相', value: '炫的是猫，晒的是爱' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '猫家售后部' },
        { label: '关系模式', value: '作妖后处理' },
        { label: '售后能力', value: '满级' },
        { label: '本喵评价', value: '服务态度稳定' }
      ],
      tOverride: {
        title: '相爱相杀型室友',
        goldQuote: '你们不是不爱，是爱得很像打架。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你们这种甜蜜方式，就是它闯祸你收拾，然后彼此都觉得挺开心。',
        bicker: '互怼？没错，它负责闯祸你负责骂，骂完继续开罐头。标准冤种操作。',
        quiet: '安静同居？你们安静得了吗？它一天能给你制造三起售后事件。',
        worker: '打工人？你是那种被客户气到想辞职但永远不会真走的冤种员工。'
      },
      circleTexts: [
        '我是铲屎冤种本人——它负责闯祸我负责售后 #它眼中的你 #人宠关系测试PETI',
        '测完确认了，我就是那个被猫气到想辞职但永远不走的人。',
        '我说再也不惯它了，然后手已经在开罐头。',
        '测完觉得很冒犯，但确实无法反驳。'
      ],
      circleText: '测完确认了，我是铲屎冤种本人。它负责闯祸，我负责售后。'
    },
    FLCD: {
      title: '本喵编制内员工',
      subtitle: '本喵认证：你以为你在养猫，其实你已经入职。',
      goldQuote: '你不是主人，你是猫家长期员工。',
      subQuote: '它嘴上嫌你烦，但你一天不出现它就满屋子找。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['编制内员工', '职业铲屎', '饭点稳定', '不准辞职'],
      emotionTag: '反差型',
      posterTheme: 'teaBrown',
      indices: [
        { label: '被拿捏指数', value: 45 },
        { label: '情感浓度', value: 42 },
        { label: '操心程度', value: 92 },
        { label: '探索欲望', value: 78 }
      ],
      petComment: '此人类服务稳定，已通过本喵长期考核。',
      summary: '互不打扰，各自舒服。',
      description: '你负责基础服务，它负责审核你的表现。你以为自己有选择权，其实早就被纳入猫家编制。',
      keywords: ['互不打扰', '佛系', '反差深情'],
      tips: [
        '上班别迟到，饭点要准',
        '铲屎是基本岗位职责',
        '本喵不接受突然离职'
      ],
      customIndices: [
        { label: '边界感', value: 92, comment: '从不多事' },
        { label: '安静陪伴值', value: 78, comment: '在就够了' },
        { label: '互不打扰默契', value: 96, comment: '各过各的' },
        { label: '舒服程度', value: 90, comment: '刚好合适' }
      ],
      relationshipDef: {
        headline: '各自安好，互不打扰。',
        detail: '表面最淡漠的搭配——它高冷你佛系。但你操碎了心，猫粮精选疫苗不落，心里全是它。',
        cards: [
          { label: '关系模式', value: '佛系铲屎型' },
          { label: '相处日常', value: '投喂 → 铲屎 → 各忙各的' },
          { label: '隐藏真相', value: '嘴上工具人心里全是它' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '编制内员工' },
        { label: '关系模式', value: '长期服务' },
        { label: '工牌稳定度', value: '95%' },
        { label: '本喵评价', value: '不接受离职' }
      ],
      tOverride: {
        title: '合租仇人型人类',
        goldQuote: '谁也看不上谁，谁也没真想分开。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你确定？你在猫面前的画风明明是"别烦我"然后默默操碎心。',
        bicker: '互怼？你连怼都是冷冷的，但猫粮从来都是最贵的那款。',
        quiet: '安静同居倒是真的——你们一个比一个嘴硬，但谁也没想过搬走。',
        worker: '打工人，精准。你以为你是主人？不，你已经入职猫家了。'
      },
      circleTexts: [
        '我是猫界打工人——以为自己在养猫其实已经入职了 #它眼中的你 #人宠关系测试PETI',
        '我已经入职猫家了，你们是什么岗位？',
        '我说再也不惯它了，然后手已经在开罐头。',
        '来比比，谁家猫最像老板，谁家人类最像员工。'
      ],
      circleText: '我已经入职猫家了，你们是什么岗位？'
    },
    FLCR: {
      title: '极简养猫型人类',
      subtitle: '本喵认证：管好基础，不搞花活，效率很高。',
      goldQuote: '不多不少，刚刚好。',
      subQuote: '最高级的爱，就是什么都不多做一分。',
      rare: '前15%',
      rareLevel: '15%',
      posterBadge: '15%人类获此认证',
      tags: ['极简养猫', '效率至上', '不搞花活', '刚好舒服'],
      emotionTag: '佛系型',
      posterTheme: 'milkWhite',
      indices: [
        { label: '被拿捏指数', value: 38 },
        { label: '情感浓度', value: 35 },
        { label: '操心程度', value: 70 },
        { label: '安稳指数', value: 92 }
      ],
      petComment: '多一分过度关心要扣分，少一分要拉黑。你这个刚好。',
      summary: '不多不少刚刚好。',
      description: '你不把养猫搞成大工程，但该做的都没落下。它需要的不是花活，是稳定和清爽。',
      keywords: ['极简', '独立', '各自精彩'],
      tips: [
        '基础服务保持稳定',
        '不要突然过度热情',
        '偶尔互动一下就行，别上强度'
      ],
      customIndices: [
        { label: '边界感', value: 96, comment: '精准到毫米' },
        { label: '安静陪伴值', value: 80, comment: '存在即安心' },
        { label: '互不打扰默契', value: 98, comment: '完美平行线' },
        { label: '舒服程度', value: 95, comment: '恰到好处' }
      ],
      relationshipDef: {
        headline: '各自运行，精密交错。',
        detail: '你给的刚好是它最需要的：不打扰的照顾。不需要太多互动，各自存在就是最好的陪伴。',
        cards: [
          { label: '关系模式', value: '极简平行型' },
          { label: '相处日常', value: '投喂 + 铲屎 + 各自精彩' },
          { label: '隐藏真相', value: '这种恰到好处最难得' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '平行管理员' },
        { label: '关系模式', value: '各司其职' },
        { label: '安稳指数', value: '92%' },
        { label: '本喵评价', value: '正好，不用加戏' }
      ],
      tOverride: {
        title: '合租仇人型人类',
        goldQuote: '谁也看不上谁，谁也没真想分开。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你？你连多摸我一下都觉得多余。但这种极简的爱我挺受用。',
        bicker: '互怼？你连怼的力气都省了——直接用效率解决一切问题。',
        quiet: '安静同居非常精准。你给的刚好是我最需要的：不打扰的照顾。',
        worker: '打工人？你是那种效率极高、到点下班、绝不加感情戏的极简员工。'
      },
      circleTexts: [
        '我是极简养猫型人类——不多不少刚刚好 #它眼中的你 #人宠关系测试PETI',
        '各过各的但互相需要，这不就是最舒服的关系吗。',
        '测完觉得很冒犯，但确实无法反驳。',
        '笑死，我家猫给我的身份不是主人，是可持续使用人类。'
      ],
      circleText: '我测出来是极简养猫型人类。不多不少刚刚好，猫也这么觉得。'
    },
    FLPD: {
      title: '各自精彩型人类',
      subtitle: '本喵认证：你玩你的，它玩它的，但都没走远。',
      goldQuote: '你们各自精彩，又互相惦记。',
      subQuote: '最高级的默契，是各自精彩又互相惦记。',
      rare: '前8%',
      rareLevel: '8%',
      posterBadge: '仅8%人类解锁此身份',
      tags: ['独立灵魂', '高级尊重', '偶尔交汇', '自由相处'],
      emotionTag: '独立型',
      posterTheme: 'mintGreen',
      indices: [
        { label: '被拿捏指数', value: 30 },
        { label: '情感浓度', value: 40 },
        { label: '伙伴默契', value: 82 },
        { label: '探索欲望', value: 88 }
      ],
      petComment: '我不理你，不代表不在乎。我只是有自己的事要忙。',
      summary: '投喂到位，从不越界。',
      description: '你给它自由，它也给你空间。你们不是疏远，而是彼此都不需要证明关系。',
      keywords: ['投喂', '不过界', '各自精彩'],
      tips: [
        '别因为我独立就觉得我不需要你',
        '我主动靠近时，请珍惜',
        '自由是礼物，不是冷淡'
      ],
      customIndices: [
        { label: '边界感', value: 94, comment: '从不越界' },
        { label: '投喂准时度', value: 95, comment: '从不迟到' },
        { label: '互不打扰默契', value: 90, comment: '各忙各的' },
        { label: '舒服程度', value: 88, comment: '刚好的距离' }
      ],
      relationshipDef: {
        headline: '投喂到位，从不多事。',
        detail: '你给饭准时从不越界，尊重它是一只有独立人格的猫。各自精彩偶尔交汇，分寸感刚好。',
        cards: [
          { label: '关系模式', value: '投喂型边界选手' },
          { label: '相处日常', value: '喂饭 → 走开 → 偶尔对视' },
          { label: '隐藏真相', value: '它选择待在你旁边打盹' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '独立合伙人' },
        { label: '关系模式', value: '各自精彩' },
        { label: '自由指数', value: '90%' },
        { label: '本喵评价', value: '需要你时会来' }
      ],
      tOverride: {
        title: '相爱相杀型室友',
        goldQuote: '你们不是不爱，是爱得很像打架。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你们明明各玩各的，但都没走远——这种甜蜜很高级。',
        bicker: '互怼？你们的互怼方式就是各自精彩地忽略对方——然后偶尔对视一下。',
        quiet: '安静同居说得对。你们各自精彩，偶尔交汇的瞬间才最珍贵。',
        worker: '打工人？不不不，你们是各自独立创业的合伙人。'
      },
      circleTexts: [
        '我是各自精彩型人类——你玩你的我玩我的但都没走远 #它眼中的你 #人宠关系测试PETI',
        '不黏不远偶尔交汇就足够了，这才是最高级的养猫。',
        '测完觉得很冒犯，但确实无法反驳。',
        '我家猫：不熟。也是我家猫：今晚继续睡你头上。'
      ],
      circleText: '我和我家猫各自精彩，但谁也没真走远。'
    },
    FLPR: {
      title: '佛系同居型人类',
      subtitle: '本喵认证：什么都不做，但什么都刚好。',
      goldQuote: '你们不是刻意合拍，是天生省事。',
      subQuote: '上辈子不知道签了什么合同，这辈子认了。',
      rare: '前3%',
      rareLevel: '3%',
      posterBadge: '仅3%人类获得此认证',
      tags: ['佛系同居', '命中合拍', '零压力', '退货关闭'],
      emotionTag: '缘分型',
      posterTheme: 'lavender',
      indices: [
        { label: '被拿捏指数', value: 35 },
        { label: '情感浓度', value: 38 },
        { label: '伙伴默契', value: 88 },
        { label: '安稳指数', value: 85 }
      ],
      petComment: '说不清哪里好，但就是刚刚好。认了。',
      summary: '什么都不做但刚好。',
      description: '不热烈、不浮夸，但莫名舒服。你们不用证明什么，待在一起就已经对了。',
      keywords: ['命中注定', '佛系', '刚好合适'],
      tips: [
        '别刻意经营，越折腾越容易翻车',
        '继续各自做自己',
        '合拍不是靠努力，是靠刚好'
      ],
      customIndices: [
        { label: '边界感', value: 88, comment: '天然的不过分' },
        { label: '安静陪伴值', value: 90, comment: '在就够了' },
        { label: '互不打扰默契', value: 92, comment: '都不用说' },
        { label: '舒服程度', value: 98, comment: '命中注定的合拍' }
      ],
      relationshipDef: {
        headline: '什么都不做，但什么都对。',
        detail: '不热烈不浮夸但莫名合拍。你们不需要理由就能待在一起，这种缘分天生自带。',
        cards: [
          { label: '关系模式', value: '命中注定型' },
          { label: '相处日常', value: '各自存在 + 恰好合拍' },
          { label: '隐藏真相', value: '上辈子签了合同这辈子认了' }
        ]
      },
      miniCards: [
        { label: '猫眼身份', value: '佛系同居人' },
        { label: '关系模式', value: '命中注定' },
        { label: '舒服程度', value: '98%' },
        { label: '本喵评价', value: '退货通道已关闭' }
      ],
      tOverride: {
        title: '相爱相杀型室友',
        goldQuote: '你们不是不爱，是爱得很像打架。'
      },
      tTag: '嘴硬心软',
      predComments: {
        sweet: '甜蜜黏人？你们这种佛系的甜蜜，就是什么都不做但什么都刚好。',
        bicker: '互怼？你们佛系到连怼都懒得怼——但谁也没想过换一个。',
        quiet: '安静同居，完美形容。你们就是那种不需要理由就能待在一起的存在。',
        worker: '打工人？你不是打工，你是签了终身合同的佛系合伙人。'
      },
      circleTexts: [
        '我是佛系同居型人类——什么也不做但什么都刚好 #它眼中的你 #人宠关系测试PETI',
        '上辈子一定签了什么合同，这辈子认了。',
        '测完觉得很冒犯，但确实无法反驳。',
        '发给你养猫的朋友，看看谁才是最惨猫奴。'
      ],
      circleText: '测出来是佛系同居型人类。什么也没做，但什么都刚好。'
    }
  }
}

module.exports = catData
