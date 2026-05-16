# Spec: 题目重构 + T分系统 + 结果页小卡片

## Context

当前项目采用 15道正式题 + 5道彩蛋题 = 20题 的结构，无预判题、无相爱相杀分(T分)。根据最新指导意见，需要将题目结构精简为 **1预判 + 12正式 + 4彩蛋 = 17题**，新增 T 分系统来覆盖"互怼/嘴硬心软"的真实养宠关系，同时在结果页新增"4张小卡片"身份卡区块，首页 CTA 改为猫狗差异化文案。

目标：让测试更轻量（适合微信群/朋友圈轻娱乐用户），同时通过 T 分和预判题增强结果的个性化和传播性。

---

## 变更总览

| 模块 | 文件 | 变更类型 | 核心改动 |
|------|------|---------|---------|
| 数据层 | `config/catData.js` | **大改** | questions 重写(20→17题) + 每个 relationship 新增5个字段 |
| 数据层 | `config/dogData.js` | **大改** | 同 catData |
| 计分核心 | `utils/scorer.js` | **中改** | 返回值从 `string` → `{code, tScore, predAnswer}` |
| 答题流程 | `pages/quiz/quiz.js` | **中改** | 题型分段 + 进度条重算 + URL传参扩展 |
| 答题UI | `pages/quiz/quiz.wxml` | **小改** | 进度条条件显示 + 预判题/彩蛋题标记 |
| 结果逻辑 | `pages/result/result.js` | **中改** | T分修正 + predComment切换 + miniCards数据 |
| 结果UI | `pages/result/result.wxml` | **小改** | 新增 miniCards 2x2 网格区块 |
| 结果样式 | `pages/result/result.wxss` | **小改** | miniCards 网格样式 |
| 首页 | `pages/home/home.js` | **小改** | CTA差异化 + 5.20日期判断 |
| 首页 | `pages/home/home.wxml` | **小改** | CTA文案数据绑定 |
| 海报 | `pages/poster/poster.js` | **小改** | circleTexts[] 随机选取 |

**不改动的文件：** `utils/posterHelper.js`、`utils/toast.js`、`utils/share.js`、`app.js`

---

## Step 1: catData.js 题目数组重写

**文件:** `config/catData.js`

### 1.1 questions 数组结构变更

当前结构 (20题):
```js
questions: [
  { id: 1, scene: '...', dimensions: 'SF_HL', options: [{ text, score }] },
  ...
  { id: 16, scene: '...', bonus: true, options: [...] },  // 彩蛋
]
```

新结构 (17题):
```js
questions: [
  // Q0: 预判题
  {
    id: 0, type: 'prediction',
    scene: '你和它平时更像哪种关系？',
    options: [
      { text: '甜蜜黏人，天天想贴贴', predKey: 'sweet' },
      { text: '相爱相杀，天天互怼但谁也离不开谁', predKey: 'bicker', tScore: 2 },
      { text: '各过各的，安静同居', predKey: 'quiet' },
      { text: '它是老大，我是员工', predKey: 'worker', tScore: 1 }
    ]
  },
  // Q1-Q12: 正式题（部分选项带 tScore）
  {
    id: 1, type: 'normal', scene: '...', dimensions: 'SF_HL',
    options: [
      { text: '...', score: 'SH' },
      { text: '...', score: 'SL' },
      { text: '...', score: 'FH', tScore: 1 },  // 带T分
      { text: '...', score: 'FL' }
    ]
  },
  // ...共12道
  // 彩蛋1-4
  {
    id: 13, type: 'bonus', scene: '...', dimensions: 'SF_HL',
    bonus: true,  // 保留旧字段兼容
    options: [{ text, score }, ...]
  },
  // ...共4道
]
```

**关键变更点：**
- 新增 `type` 字段: `'prediction'` / `'normal'` / `'bonus'`
- 预判题选项用 `predKey` 替代 `score`，新增可选 `tScore`
- 正式题部分选项新增 `tScore: 1`（标识相爱相杀特征）
- 彩蛋题同时保留 `bonus: true` 和 `type: 'bonus'`

### 1.2 具体题目内容

按指导意见逐题替换，12道正式题的维度分配和T分标记如下：

| 序号 | 场景 | 维度 | T分选项 |
|------|------|------|--------|
| Q1 | 出门猫堵门口 | SF_HL | C选项 T+1 |
| Q2 | 深夜猫坐键盘旁 | SF_HL | C选项 T+1 |
| Q3 | 回家猫只看一眼 | SF_HL | C选项 T+1 |
| Q4 | 猫推杯子到桌边 | SF_CP | C选项 T+1, D选项 T+1 |
| Q5 | 客人来猫低吼 | SF_CP | 无T |
| Q6 | 猫吃药后看叛徒眼神 | HL_CP | D选项 T+1 |
| Q7 | 凌晨3点猫开运动会 | HL_CP | C选项 T+1 |
| Q8 | 猫坐窗边像有心事 | SF_DR | 无T |
| Q9 | 搬新家猫缩角落 | SF_DR | 无T |
| Q10 | 新玩具猫看都不看 | HL_DR | C选项 T+1 |
| Q11 | 猫跳上沙发踩奶 | HL_CP | D选项 T+1 |
| Q12 | 给关系取标题 | CP_DR | A选项 T+1, C选项 T+1, D选项 T+1 |

### 1.3 midFeedback 调整

从5个节点调整为3个（适配12题正式）：
```js
midFeedback: [
  { after: 4, text: '猫猫已记录：这个人类很容易心软。' },
  { after: 8, text: '危险提示：你可能已经被猫成功驯化。' },
  { after: 12, text: '猫咪审查完毕，正在生成你的人类档案...' }
]
```

---

## Step 2: catData.js 结果映射扩展

**文件:** `config/catData.js`

每个 relationship 对象新增以下字段：

### 2.1 miniCards（4张小卡片）

在金句下方、指数条上方以 2x2 网格展示。

```js
SHCD: {
  ...existing,
  miniCards: [
    { label: '猫眼身份', value: '被驯化人类' },
    { label: '关系模式', value: '一喵一令' },
    { label: '被拿捏指数', value: '99%' },
    { label: '本喵评价', value: '还没喵就已经心软了' }
  ],
}
```

### 2.2 tOverride（T>=4时的相爱相杀替换）

```js
SHCD: {
  ...existing,
  tOverride: {
    title: '逆子受害者',
    goldQuote: '你骂它一百遍，还是会给它开罐头。'
  },
  tTag: '嘴硬心软',  // T=2-3时追加的标签
}
```

**相爱相杀修正规则（猫版）：**

| 原结果倾向 | tOverride.title | tOverride.goldQuote |
|-----------|----------------|---------------------|
| 高照护/高操心 (SxCx) | 逆子受害者 | 你骂它一百遍，还是会给它开罐头。 |
| 高松弛/高平等 (FxPx) | 相爱相杀型室友 | 你们不是不爱，是爱得很像打架。 |
| 高投喂/高响应 (xHxR) | 本喵编制内员工 | 它没说爱你，但已经给你发工牌了。 |
| 高记录/高吐槽 (xHxD) | 猫家售后部部长 | 它负责闯祸，你负责售后。 |
| 低表达/高边界 (xLCx) | 合租仇人型人类 | 谁也看不上谁，谁也没真想分开。 |

### 2.3 predComments（预判题影响 petComment 语气）

```js
SHCD: {
  ...existing,
  predComments: {
    sweet: '你果然是一叫就来的类型...',    // 甜蜜型语气
    bicker: '哦？说是互怼？你每次都先投降...', // 互怼型语气
    quiet: '你以为很淡定？蹭你一下就破功了...', // 安静型语气
    worker: '打工人说法很准确，但你甘之如饴...' // 打工型语气
  },
}
```

### 2.4 circleTexts（朋友圈文案池）

```js
SHCD: {
  ...existing,
  circleTexts: [
    '测完确认了，我俩不是主宠，是合租仇人。',
    '我说再也不惯它了，然后手已经在开罐头。',
    '我已经入职猫家了，你们是什么岗位？',
    // ...来自指导意见的8条通用文案
  ],
  circleText: '...',  // 保留旧字段向后兼容
}
```

### 2.5 结果标题/金句全量更新

按指导意见的猫咪版结果映射表（第四节），更新所有16个结果的 `title` 和 `goldQuote`：

| 编码 | 新title | 新goldQuote |
|------|---------|------------|
| SHCD | 被主子驯化成功 | 它还没喵，你已经心软了。 |
| SHCR | 猫咪安全基地 | 它不一定黏你，但它知道你一直在。 |
| SHPD | 主子生活策展人 | 你不是养猫，你是在经营它的人生。 |
| SHPR | 人形猫窝 | 它不一定黏你，但它很会使用你。 |
| SLCD | 操心型猫家长 | 嘴上说不惯着，手已经在开罐头了。 |
| SLCR | 定时暖气型人类 | 你不热烈，但从不缺席。 |
| SLPD | 猫咪情绪翻译官 | 它没出声，你已经开始翻译了。 |
| SLPR | 高冷室友合伙人 | 不贴贴也没关系，彼此在就行。 |
| FHCD | 社交炫猫型人类 | 你发的每条朋友圈，都像在替它营业。 |
| FHCR | 人形罐头机 | 铃一摇你就到，外卖都没你快。 |
| FHPD | 快乐搭子型人类 | 它搞笑你拍手，你犯蠢它陪着。 |
| FHPR | 铲屎冤种本人 | 它负责闯祸，你负责售后。 |
| FLCD | 猫界打工人 | 你以为你在养猫，其实你已经入职了。 |
| FLCR | 极简养猫型人类 | 不多不少，刚刚好。 |
| FLPD | 各自精彩型人类 | 你玩你的，它玩它的，但都没走远。 |
| FLPR | 佛系同居型人类 | 什么也不做，但什么都刚好。 |

> 注意：title 不强制采用"XX型人类"后缀规范，**对于指导意见中本身读起来完整的名称（如"铲屎冤种本人""猫界打工人"），不强加"型人类"后缀，以保持梗感和传播性。**

### 2.6 brand 对象新增 CTA 配置

```js
brand: {
  ...existing,
  homeCTA: {
    title: '看看你在猫家到底是什么岗位',
    subtitle: '是主人、饭票、员工，还是合租仇人？',
    btnText: '开始猫眼鉴定',
    uploadCTA: '上传你家猫照片，生成专属关系卡'
  },
  valentineCTA: {
    title: '5.20 没人告白没关系，看看你在猫家有没有编制',
    subtitle: '上传照片，生成你和毛孩子的专属关系卡',
    btnText: '开始猫眼鉴定'
  }
}
```

---

## Step 3: dogData.js 同步变更

**文件:** `config/dogData.js`

与 catData.js 完全对称的变更：
- questions 替换为指导意见中的狗狗版 1+12+4 题
- 16种 relationship 全量更新 title/goldQuote，新增 miniCards/tOverride/tTag/predComments/circleTexts
- brand 新增 homeCTA/valentineCTA

**狗版 tOverride 修正规则：**

| 原结果倾向 | tOverride.title | tOverride.goldQuote |
|-----------|----------------|---------------------|
| 高热情/高互动 | 快乐逆子饲养员 | 它每天制造麻烦，也每天制造快乐。 |
| 高规则/高训练 | 相爱相杀训练搭子 | 你以为你在训练它，其实它也在训练你。 |
| 高出门/高探索 | 人形遛弯按钮 | 你不是主人，你是它的出门开关。 |
| 高投喂/高纵容 | 零食外交官 | 它一坐下，你就开始掏零食。 |
| 高稳定/低表达 | 松弛同居型人类 | 不用天天黏着，但它知道你在。 |

---

## Step 4: scorer.js 计分算法重构

**文件:** `utils/scorer.js`

### 返回值变更（Breaking Change）

```js
// 旧：
function calculate(answers, questions) → string  // 'SHCD'

// 新：
function calculate(answers, questions) → { code: string, tScore: number, predAnswer: string|null }
```

### 核心逻辑

```js
function calculate(answers, questions) {
  // 使用整数避免浮点精度问题：正式题每字母+2，彩蛋题每字母+1
  var counts = { S: 0, F: 0, H: 0, L: 0, C: 0, P: 0, D: 0, R: 0 }
  var tScore = 0
  var predAnswer = null

  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i]
    var q = questions[answer.questionId]
    if (!q) continue
    var option = q.options[answer.selected]
    if (!option) continue

    var qType = q.type || 'normal'

    // 预判题：只记录答案，不计维度分
    if (qType === 'prediction') {
      predAnswer = option.predKey || null
      // 预判题也可能有tScore
      if (option.tScore) tScore += option.tScore
      continue
    }

    // 维度计分
    if (option.score) {
      var weight = (qType === 'bonus') ? 1 : 2  // 彩蛋权重0.5（整数化：正式+2，彩蛋+1）
      counts[option.score[0]] = (counts[option.score[0]] || 0) + weight
      counts[option.score[1]] = (counts[option.score[1]] || 0) + weight
    }

    // T分累加
    if (option.tScore) {
      tScore += option.tScore
    }
  }

  var code = ''
  code += counts.S >= counts.F ? 'S' : 'F'
  code += counts.H >= counts.L ? 'H' : 'L'
  code += counts.C >= counts.P ? 'C' : 'P'
  code += counts.D >= counts.R ? 'D' : 'R'

  return { code: code, tScore: tScore, predAnswer: predAnswer }
}
```

> **整数化策略说明：** 正式题每字母+2，彩蛋题每字母+1，等价于正式题权重1、彩蛋题权重0.5。比较大小时结果一致，且避免浮点精度问题。

---

## Step 5: quiz.js 答题流程改造

**文件:** `pages/quiz/quiz.js`

### 5.1 data 新增字段

```js
data: {
  ...existing,
  questionType: 'prediction',  // 当前题类型
  normalProgress: 0,           // 正式题已完成数
  normalTotal: 12,             // 正式题总数
  showPhaseLabel: '',          // 阶段标签文案（'热身' / '' / '彩蛋 1/4'）
}
```

### 5.2 onLoad 预处理

```js
onLoad: function(options) {
  var petType = options.petType || 'cat'
  this._petData = petType === 'dog' ? dogData : catData
  var questions = this._petData.questions

  // 统计正式题数量
  var normalTotal = 0
  for (var i = 0; i < questions.length; i++) {
    if ((questions[i].type || 'normal') === 'normal') normalTotal++
  }

  this.setData({
    petType: petType,
    totalQuestions: questions.length,
    normalTotal: normalTotal,
    currentQuestion: questions[0],
    questionType: questions[0].type || 'normal',
    showPhaseLabel: questions[0].type === 'prediction' ? '热身题' : ''
  })
}
```

### 5.3 _goNext 增加阶段标签计算

每次切换题目时，根据新题的 type 更新：
- `questionType`: 当前题类型
- `normalProgress`: 已完成的正式题数（用于进度条）
- `showPhaseLabel`: 预判→'热身题', 正式→'', 彩蛋→'彩蛋 X/4'

### 5.4 _goResult URL 参数扩展

```js
_goResult: function() {
  var result = scorer.calculate(this.data.answers, this._petData.questions)
  var url = '/pages/result/result?petType=' + this.data.petType
    + '&resultCode=' + result.code
    + '&tScore=' + result.tScore
  if (result.predAnswer) {
    url += '&predAnswer=' + result.predAnswer
  }
  wx.redirectTo({ url: url })
}
```

### 5.5 quiz.wxml 进度条改造

```xml
<!-- 进度条区域 -->
<view class="progress-wrap">
  <block wx:if="{{questionType === 'prediction'}}">
    <text class="progress-num">热身题</text>
  </block>
  <block wx:elif="{{questionType === 'bonus'}}">
    <text class="progress-num">{{showPhaseLabel}}</text>
  </block>
  <block wx:else>
    <text class="progress-num">{{normalProgress + 1}}/{{normalTotal}}</text>
  </block>
  <view class="progress-bar">
    <view class="progress-fill"
      style="width: {{questionType === 'prediction' ? 0 : (questionType === 'bonus' ? 100 : (normalProgress + 1) / normalTotal * 100)}}%">
    </view>
  </view>
</view>
```

---

## Step 6: result.js T分修正 + predComment + miniCards

**文件:** `pages/result/result.js`

### 6.1 onLoad 扩展参数解析

```js
onLoad: function(options) {
  var petType = options.petType || 'cat'
  var resultCode = options.resultCode || 'SHCD'
  var tScore = parseInt(options.tScore) || 0
  var predAnswer = options.predAnswer || null

  var petData = petType === 'dog' ? dogData : catData
  var rel = petData.relationships[resultCode]
  if (!rel) { wx.redirectTo({url:'/pages/home/home'}); return }

  // --- T分修正 ---
  var displayTitle = rel.title
  var displayGoldQuote = rel.goldQuote
  var displayTags = rel.tags.slice()  // 浅拷贝，不污染原数据
  var tLabel = ''

  if (tScore >= 4 && rel.tOverride) {
    displayTitle = rel.tOverride.title
    displayGoldQuote = rel.tOverride.goldQuote
    tLabel = '相爱相杀'
  }
  if (tScore >= 2 && rel.tTag) {
    displayTags.unshift(rel.tTag)
    if (!tLabel) tLabel = '嘴硬心软'
  }

  // --- 预判题影响 petComment ---
  var petComment = rel.petComment
  if (predAnswer && rel.predComments && rel.predComments[predAnswer]) {
    petComment = rel.predComments[predAnswer]
  }

  // 构造展示用 relationship 对象
  var displayRel = {}
  for (var k in rel) { displayRel[k] = rel[k] }
  displayRel.title = displayTitle
  displayRel.goldQuote = displayGoldQuote
  displayRel.tags = displayTags
  displayRel.petComment = petComment

  this.setData({
    ...existing setData,
    relationship: displayRel,
    miniCards: rel.miniCards || [],
    tLabel: tLabel,
    tScore: tScore,
    predAnswer: predAnswer
  })
}
```

### 6.2 result.wxml 新增 miniCards 区块

在金句（`.gold-quote`）下方、指数条（`.indices-section`）上方插入：

```xml
<!-- 身份小卡片 (2x2 网格) -->
<view wx:if="{{miniCards.length}}" class="mini-cards-grid">
  <view wx:for="{{miniCards}}" wx:key="label" class="mini-card-item">
    <text class="mini-card-label">{{item.label}}</text>
    <text class="mini-card-value">{{item.value}}</text>
  </view>
</view>

<!-- T分标签（嘴硬心软/相爱相杀） -->
<view wx:if="{{tLabel}}" class="t-label-row">
  <text class="t-label-tag">{{tLabel}}</text>
</view>
```

### 6.3 result.wxss 新增样式

```css
.mini-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
  margin: 24rpx 0;
  padding: 0 8rpx;
}
.mini-card-item {
  background: #FAFAFA;
  border-radius: 16rpx;
  padding: 24rpx 20rpx;
  text-align: center;
}
.mini-card-label {
  font-size: 24rpx;
  color: #999;
  display: block;
  margin-bottom: 8rpx;
}
.mini-card-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
}
.t-label-row { text-align: center; margin: 16rpx 0; }
.t-label-tag {
  display: inline-block;
  padding: 8rpx 24rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  color: #FF6B6B;
  background: #FFF0F0;
  border: 1rpx solid #FFD4D4;
}
```

---

## Step 7: home.js / home.wxml CTA 差异化

**文件:** `pages/home/home.js`, `pages/home/home.wxml`

### 7.1 home.js 新增 CTA 逻辑

```js
var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')

Page({
  data: {
    tapAnim: '',
    catTitle: '',
    catSubtitle: '',
    catBtnText: '',
    dogTitle: '',
    dogSubtitle: '',
    dogBtnText: ''
  },

  onLoad: function() {
    var now = new Date()
    var is520 = (now.getMonth() === 4 && now.getDate() === 20)

    var catCTA = is520 && catData.brand.valentineCTA
      ? catData.brand.valentineCTA : catData.brand.homeCTA
    var dogCTA = is520 && dogData.brand.valentineCTA
      ? dogData.brand.valentineCTA : dogData.brand.homeCTA

    this.setData({
      catTitle: catCTA.title || '',
      catSubtitle: catCTA.subtitle || '',
      catBtnText: catCTA.btnText || '测猫咪视角',
      dogTitle: dogCTA.title || '',
      dogSubtitle: dogCTA.subtitle || '',
      dogBtnText: dogCTA.btnText || '测修勾视角'
    })
  },
  // ...existing methods
})
```

### 7.2 home.wxml 替换硬编码文案

```xml
<!-- 猫入口 -->
<view class="species-card cat-card" bindtap="onTapCat">
  <view class="card-img-area">
    <image class="card-img" src="/assets/images/cat-placeholder.jpg" mode="aspectFit" />
  </view>
  <view class="card-btn cat-btn">{{catBtnText}}</view>
  <text class="card-sub">{{catSubtitle}}</text>
</view>

<!-- 狗入口同理 -->
```

---

## Step 8: poster.js circleTexts 支持

**文件:** `pages/poster/poster.js`

在 onLoad 中替换 circleText 读取逻辑：

```js
// 优先使用 circleTexts 池随机选一条
var circleTexts = this._relationship.circleTexts
var circleText = ''
if (circleTexts && circleTexts.length > 0) {
  circleText = circleTexts[Math.floor(Math.random() * circleTexts.length)]
} else {
  circleText = this._relationship.circleText || ''
}
this.setData({ circleText: circleText })
```

**posterHelper.js 不修改**：海报不体现 T 分修正标题，使用原始 relationship 数据绘制。

---

## 实施顺序

```
Phase 1: 数据层（无外部依赖）
  1. config/catData.js → 题目重写 + 结果字段扩展 + brand CTA
  2. config/dogData.js → 同上

Phase 2: 计分核心（依赖 Phase 1 的数据结构）
  3. utils/scorer.js → 返回值重构

Phase 3: 联动页面（依赖 Phase 2 的新返回值，需同步提交）
  4. pages/quiz/quiz.js → 流程改造
  5. pages/quiz/quiz.wxml → 进度条UI

Phase 4: 结果展示（依赖 Phase 3 的新URL参数）
  6. pages/result/result.js → T分修正 + miniCards
  7. pages/result/result.wxml → miniCards区块
  8. pages/result/result.wxss → 新样式

Phase 5: 独立功能（可并行，无强依赖）
  9. pages/home/home.js → CTA逻辑
  10. pages/home/home.wxml → CTA模板
  11. pages/poster/poster.js → circleTexts
```

---

## Verification

1. **数据完整性检查：** catData.js 和 dogData.js 各应有 17 道题（1+12+4），16 种结果且每种都包含 miniCards(4项)、tOverride、tTag、predComments(4个key)、circleTexts(>=1条)
2. **计分正确性：** scorer.js 单元测试 - 验证正式题+2、彩蛋题+1 的整数化计分；验证 T 分累加；验证预判题不计入维度
3. **答题流程测试：** 从首页进入 → 预判题显示"热身题" → 12道正式题进度 1/12~12/12 → 彩蛋题显示"彩蛋 1/4~4/4" → 跳转结果页
4. **T分修正测试：** 手动选择大量T分选项(>=4)，验证结果页标题切换为 tOverride 版本
5. **miniCards渲染：** 结果页金句下方出现2x2网格小卡片
6. **首页CTA：** 猫入口显示"开始猫眼鉴定"，狗入口显示"开始本汪认证"
7. **5.20日期逻辑：** 修改系统日期为5月20日，验证首页切换为520文案
8. **海报circleTexts：** 多次生成海报，验证文案从池中随机选取
