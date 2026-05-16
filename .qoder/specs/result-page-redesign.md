# Spec: 结果页重构 — 身份卡 + 专属模块化展示

## Context

当前结果页存在以下问题：
1. 第一屏信息过于分散，没有"身份卡"感
2. 维度指数（被拿捏指数/情感浓度等）太抽象、泛化，所有结果共用一套，模板感重
3. "本喵有话说"文案不够尖锐/猫味
4. "你们关系的真相"标题偏严肃，像心理报告
5. "本喵建议你这样宠我"像 AI 说教
6. 模块顺序不利于传播（先共鸣 → 再可晒 → 再建议）

本次重构目标：将结果页打造成"宠物给人类的吐槽式鉴定"，增强截图传播性和记忆点。

---

## 设计原则

1. **吐槽式鉴定 > 心理报告** — 文案必须像宠物在吐槽人类，不是分析师在输出报告
2. **每个结果专属 > 通用模板** — 指数名称、文案、标签都根据结果类型定制
3. **截图友好** — 每个模块独立成卡片，适合单独截图发朋友圈
4. **先好笑 → 再共鸣 → 再可晒 → 再轻建议** — 按传播顺序编排

---

## 变更总览

| 模块 | 文件 | 变更类型 | 核心改动 |
|------|------|---------|---------|
| 数据层 | `config/catData.js` | **大改** | 每个 relationship 新增专属指数数据 `customIndices`，重写 `petComment`/`summary`/`description`/`tips` 文案，brand 新增 `promoTexts` |
| 数据层 | `config/dogData.js` | **大改** | 同 catData |
| 结果UI | `pages/result/result.wxml` | **大改** | 第一屏身份卡 + 第二屏4模块重新编排 |
| 结果样式 | `pages/result/result.wxss` | **大改** | 全新卡片样式、2x2指数卡、气泡样式重构 |
| 结果逻辑 | `pages/result/result.js` | **中改** | 处理新数据字段 `customIndices`/`relationshipDef`，传递 petName |
| 海报绘制 | `utils/posterHelper.js` | **大改** | 重写为短版6信息海报（750x1000） |
| 海报页 | `pages/poster/poster.js` | **中改** | 读取 petName，话术来源切换为 promoTexts |
| 答题页 | `pages/quiz/quiz.wxml` / `quiz.js` | **小改** | 上传步骤新增宠物名字输入 |

**不改动的文件：** `utils/scorer.js`、`utils/toast.js`、`utils/share.js`、`app.js`

---

## 页面结构总览

```
┌─────────────────────────────────┐
│          第一屏：身份卡            │
│                                 │
│  [认证标题] 猫眼鉴定结果           │
│  [结果名] 逆子受害者              │
│  [金句] "你骂它一百遍..."         │
│  [稀有度] 前3%                   │
│  [3标签] 嘴硬心软｜长期受害｜原则失效│
│  [2x2小卡片]                     │
│    猫眼身份 | 关系模式             │
│    被拿捏指数 | 本喵评价           │
│                                 │
│  [CTA: 生成专属海报]              │
├─────────────────────────────────┤
│          第二屏：详细解释           │
│                                 │
│  模块1: 本喵有话说（宠物吐槽）      │
│  模块2: 关系定义（强结论+短解释）   │
│  模块3: 专属指数卡（2x2）         │
│  模块4: 本喵使用说明（3条短建议）   │
│                                 │
│  [次级CTA/再测/广告/免责]         │
└─────────────────────────────────┘
```

---

## Step 1: 数据层新增字段

**文件:** `config/catData.js` / `config/dogData.js`

### 1.1 每个 relationship 对象新增字段

```js
// 在现有 relationship 对象中新增以下字段：

// 专属指数（替代通用 indices）
customIndices: [
  { label: '嘴硬心软指数', value: 95, comment: '嘴上嫌弃，手上开罐头' },
  { label: '吵完还哄指数', value: 92, comment: '刚骂完，下一秒又摸头' },
  { label: '互怼默契值', value: 96, comment: '它一作妖，你就知道来了' },
  { label: '一起发疯指数', value: 88, comment: '每天像小型连续剧' }
],

// 关系定义（替代 summary + description 的展示方式）
relationshipDef: {
  headline: '嘴上互相嫌弃，实际谁也离不开谁。',
  detail: '你们不像传统甜宠关系，更像两个住在一起的冤家。它作妖，你吐槽；你说不管，最后还是你收拾。看起来每天都在斗智斗勇，但你们都知道，对方早就是这个家的固定成员。',
  cards: [
    { label: '关系模式', value: '合租仇人' },
    { label: '相处日常', value: '互怼 + 收拾烂摊子' },
    { label: '隐藏真相', value: '你嘴硬，它也嘴硬' }
  ]
}
```

### 1.2 现有字段文案升级要求

- `petComment`: 重写为更短、更尖锐的宠物吐槽，像猫/狗在说人话
- `tips`: 改为3条短句（每条不超过25字），不说教，像宠物的使用说明
- `keywords`: 保留，用于关系定义模块下方的标签

### 1.3 结果类型 → 专属指数映射规则

不同结果大类使用不同指数集：

| 结果大类 | 代表结果 | 指数1 | 指数2 | 指数3 | 指数4 |
|---------|---------|-------|-------|-------|-------|
| 逆子受害型 | SHCD(tOverride) | 被气笑指数 | 原谅速度 | 售后能力 | 原则存活率 |
| 相爱相杀型 | FHPR等(tOverride) | 嘴硬心软指数 | 吵完还哄指数 | 互怼默契值 | 一起发疯指数 |
| 编制内员工型 | SLCD(tOverride) | 随叫随到指数 | 工牌稳定度 | 开罐头熟练度 | 被使唤概率 |
| 人形猫窝型 | SLCR | 不敢乱动指数 | 体温合格度 | 被征用概率 | 猫床舒适度 |
| 甜宠型 | SHCR等 | 被拿捏指数 | 心软速度 | 贴贴浓度 | 专属感 |
| 佛系型 | FLPR等 | 边界感 | 安静陪伴值 | 互不打扰默契 | 舒服程度 |
| 炫猫型 | FHCD等 | 发圈冲动 | 拍照频率 | 猫咪出片率 | 显摆浓度 |
| 快乐搭子型 | FHCR等 | 快乐指数 | 一起发疯值 | 通过率 | 搭子默契 |

**狗版同理，指数名称用对应的"本汪"视角。**

### 1.4 petComment 文案升级示例

| 结果 | 旧文案 | 新文案 |
|------|--------|--------|
| 逆子受害者 | (各种长句) | 你骂归骂，罐头不是照开吗？ |
| 本喵编制内员工 | (各种长句) | 此人类服务稳定，已通过本喵长期考核。 |
| 人形猫窝 | (各种长句) | 这个垫子温度不错，就是偶尔会乱动。 |
| 高冷室友 | (各种长句) | 保持距离，很好。偶尔摸一下，别太上头。 |
| 相爱相杀 | (各种长句) | 你说不管我，结果我一闹你就来了。 |

### 1.5 tips 文案升级示例（改标题为"本喵使用说明" / "本汪使用说明"）

相爱相杀版：
```js
tips: [
  '嘴上嫌弃可以，罐头别停。',
  '我作妖的时候，你可以骂，但别真不理我。',
  '你越装不在乎，我越知道你其实很在乎。'
]
```

逆子受害者版：
```js
tips: [
  '你可以骂我，但别真不理我。',
  '我可以作妖，但你要继续负责售后。',
  '我们不是关系差，只是爱得比较吵。'
]
```

---

## Step 2: 结果页 WXML 重构

**文件:** `pages/result/result.wxml`

### 2.1 第一屏：身份卡

保留现有：认证标题 + 结果名 + 副标题 + 稀有度 + 标签

**关键改动：**
- 移除 `photos-row`（配图+照片并排）从第一屏 → 将其中的宠物照片上传功能集成到CTA
- `gold-quote` 保留在第一屏（紧接标签之后）
- `mini-cards-grid` 保持 2x2 布局在第一屏
- 在 miniCards 下方添加主 CTA（生成海报）

```html
<!-- === 第一屏：身份卡 === -->
<!-- 顶部认证标题 -->
<view wx:if="{{resultHeader}}" class="result-header-label">...</view>

<!-- 结果名 -->
<view class="result-header">
  <text class="result-title">{{relationship.title}}</text>
  <view wx:if="{{relationship.subtitle}}" class="subtitle-row">
    <text class="result-subtitle">{{relationship.subtitle}}</text>
  </view>
</view>

<!-- 金句 -->
<view class="gold-quote-card">
  <text class="quote-main">"{{relationship.goldQuote}}"</text>
</view>

<!-- 稀有度 + 标签 -->
<view class="badge-tags-row">
  <view class="rare-badge" style="background: {{rareBgColor}}">
    <text class="rare-text">{{relationship.posterBadge}}</text>
  </view>
  <view wx:if="{{relationship.tags.length}}" class="tags-inline">
    <block wx:for="{{relationship.tags}}" wx:key="*this">
      <text class="tag-item">{{item}}</text>
      <text wx:if="{{index < relationship.tags.length - 1}}" class="tag-sep">|</text>
    </block>
  </view>
</view>

<!-- 4张小卡片 (2x2) -->
<view wx:if="{{miniCards.length}}" class="mini-cards-grid">
  <view wx:for="{{miniCards}}" wx:key="label" class="mini-card-item">
    <text class="mini-card-label">{{item.label}}</text>
    <text class="mini-card-value">{{item.value}}</text>
  </view>
</view>

<!-- 主 CTA -->
<view class="cta-area">
  <view class="cta-btn {{petType === 'cat' ? 'cta-cat' : 'cta-dog'}}" bindtap="onGeneratePoster">
    <text class="cta-text">{{photoPath ? '生成我的专属海报' : '上传照片，生成专属海报'}}</text>
  </view>
</view>
```

### 2.2 第二屏：详细解释（4大模块）

**顺序改为：**
1. 本喵有话说 → 2. 关系定义 → 3. 专属指数卡 → 4. 本喵使用说明

```html
<!-- === 第二屏：详细解释 === -->

<!-- 模块1: 本喵/本汪有话说 -->
<view class="section comment-section">
  <text class="section-title">{{petType === 'cat' ? '🐱 本喵有话说' : '🐶 本汪有话说'}}</text>
  <view class="pet-comment-bubble">
    <text class="pet-comment-text">{{relationship.petComment}}</text>
  </view>
</view>

<!-- 模块2: 关系定义 -->
<view class="section relationship-def-section">
  <text class="section-title">你们这段关系，说白了就是——</text>
  <text class="def-headline">{{relationshipDef.headline}}</text>
  <text class="def-detail">{{relationshipDef.detail}}</text>
  <!-- 关系小卡 -->
  <view wx:if="{{relationshipDef.cards.length}}" class="def-cards">
    <view wx:for="{{relationshipDef.cards}}" wx:key="label" class="def-card-item">
      <text class="def-card-label">{{item.label}}</text>
      <text class="def-card-value">{{item.value}}</text>
    </view>
  </view>
  <!-- 关键词标签 -->
  <view wx:if="{{relationship.keywords.length}}" class="keywords-row">
    <text wx:for="{{relationship.keywords}}" wx:key="*this" class="keyword-tag">#{{item}}</text>
  </view>
</view>

<!-- 模块3: 专属指数卡 (2x2) -->
<view class="section indices-card-section">
  <text class="section-title">{{indicesTitle}}</text>
  <view class="custom-indices-grid">
    <view wx:for="{{customIndices}}" wx:key="label" class="index-card-item">
      <text class="index-card-label">{{item.label}}</text>
      <text class="index-card-value">{{item.value}}</text>
      <text class="index-card-comment">{{item.comment}}</text>
    </view>
  </view>
</view>

<!-- 模块4: 本喵/本汪使用说明 -->
<view class="section tips-section">
  <text class="section-title">{{petType === 'cat' ? '🐱 本喵使用说明' : '🐶 本汪使用说明'}}</text>
  <view class="tips-list">
    <view wx:for="{{relationship.tips}}" wx:key="*this" class="tip-item">
      <text class="tip-bullet">•</text>
      <text class="tip-text">{{item}}</text>
    </view>
  </view>
</view>

<!-- 次级操作区 -->
<view class="retest-wrap">
  <view class="sub-btn" bindtap="onRetest"><text>再测一次</text></view>
</view>

<!-- 广告 + 免责 -->
<view wx:if="{{showAd}}" class="ad-area">
  <ad unit-id="{{adUnitId}}" ad-type="banner" ad-theme="white" binderror="onAdError"></ad>
</view>
<view class="disclaimer">
  <text class="disclaimer-text">本测试仅供娱乐，结果不构成专业建议</text>
</view>
```

---

## Step 3: 结果页 JS 逻辑适配

**文件:** `pages/result/result.js`

### 3.1 data 新增字段

```js
data: {
  // ...现有字段保留...
  customIndices: [],      // 专属指数卡数据
  indicesTitle: '',       // 指数卡标题（如"相爱相杀指数"）
  relationshipDef: null   // 关系定义结构
}
```

### 3.2 onLoad 中组装新数据

```js
// 在 onLoad 中，构造 displayRel 之后：

// 专属指数
var customIndices = rel.customIndices || rel.indices.map(function(item) {
  return { label: item.label, value: item.value, comment: '' }
})

// 指数卡标题（用 tLabel 或 emotionTag 拼接）
var indicesTitle = (tLabel || rel.emotionTag || '关系') + '指数'

// 关系定义
var relationshipDef = rel.relationshipDef || {
  headline: rel.summary || '',
  detail: rel.description || '',
  cards: []
}

this.setData({
  // ...现有 setData...
  customIndices: customIndices,
  indicesTitle: indicesTitle,
  relationshipDef: relationshipDef
})
```

### 3.3 向后兼容

- 如果 `customIndices` 不存在，fallback 到旧的 `indices` 数组（不带 comment）
- 如果 `relationshipDef` 不存在，fallback 到旧的 `summary` + `description`
- 这确保数据迁移期间两种格式都能正常显示

---

## Step 4: 结果页 WXSS 重构

**文件:** `pages/result/result.wxss`

### 4.1 删除的旧样式

- `.indices-section` / `.index-row` / `.index-bar-bg` / `.index-bar-fill` / `.index-value`（横条指数）
- `.photos-row` / `.illust-cell` / `.illust-img` / `.photo-cell`（配图并排区移除）

### 4.2 新增：金句卡片样式

```css
.gold-quote-card {
  text-align: center;
  margin: 24rpx 0 32rpx;
  padding: 28rpx 32rpx;
}

.gold-quote-card .quote-main {
  font-size: 34rpx;
  color: #333;
  font-weight: bold;
  line-height: 1.6;
}
```

### 4.3 新增：关系定义模块样式

```css
.relationship-def-section .def-headline {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.relationship-def-section .def-detail {
  font-size: 28rpx;
  color: #555;
  line-height: 1.8;
  display: block;
  margin-bottom: 24rpx;
}

.def-cards {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-bottom: 20rpx;
}

.def-card-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx 20rpx;
  background: #FAFAFA;
  border-radius: 12rpx;
}

.def-card-label {
  font-size: 24rpx;
  color: #999;
  width: 140rpx;
  flex-shrink: 0;
}

.def-card-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}
```

### 4.4 新增：专属指数卡 2x2 样式

```css
.custom-indices-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.index-card-item {
  background: #FAFAFA;
  border-radius: 16rpx;
  padding: 24rpx 20rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.theme-cat .index-card-item {
  background: #F8F5FF;
}

.theme-dog .index-card-item {
  background: #FFF8F2;
}

.index-card-label {
  font-size: 22rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.index-card-value {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.theme-cat .index-card-value {
  color: #6B5CE7;
}

.theme-dog .index-card-value {
  color: #FF8C42;
}

.index-card-comment {
  font-size: 22rpx;
  color: #999;
  line-height: 1.4;
}
```

---

## Step 5: 数据迁移 — catData.js 示例

**文件:** `config/catData.js`

### 5.1 SHCD（逆子受害者 / 被主子驯化成功）的完整新数据

```js
SHCD: {
  // ...现有字段保留（title, subtitle, goldQuote, rare, posterBadge, tags, emotionTag, posterTheme）...

  // 升级 petComment（更短、更猫味）
  petComment: '你骂归骂，罐头不是照开吗？',

  // 新增：专属指数
  customIndices: [
    { label: '被气笑指数', value: 95, comment: '气到笑出声是常态' },
    { label: '原谅速度', value: 99, comment: '撑不过三秒' },
    { label: '售后能力', value: 92, comment: '负责收拾一切' },
    { label: '原则存活率', value: 8, comment: '每次立的规矩都白立' }
  ],

  // 新增：关系定义
  relationshipDef: {
    headline: '嘴上说不管了，身体很诚实。',
    detail: '你和它之间不是甜蜜型关系，更像一个长期被拿捏的受害者。它作妖你吐槽，你说不管它就立刻表演可怜，你的原则保质期从来不超过三秒。但你知道，这就是你们的日常。',
    cards: [
      { label: '关系模式', value: '逆子 + 售后人员' },
      { label: '相处日常', value: '作妖 → 骂 → 心软 → 开罐头' },
      { label: '隐藏真相', value: '你嘴上不要它，其实最离不开' }
    ]
  },

  // 升级 tips（使用说明风格）
  tips: [
    '你可以骂我，但别真不理我。',
    '我可以作妖，但你要继续负责售后。',
    '我们不是关系差，只是爱得比较吵。'
  ],

  // 保留 miniCards（第一屏身份卡用）
  miniCards: [
    { label: '猫眼身份', value: '猫家售后人员' },
    { label: '关系模式', value: '相爱相杀' },
    { label: '被拿捏指数', value: '96%' },
    { label: '本喵评价', value: '嘴硬手很诚实' }
  ],

  // summary/description/keywords 保留用于海报
  summary: '嘴上说不管了，身体很诚实。',
  description: '你和它之间不是甜蜜型关系...',
  keywords: ['嘴硬心软', '合租仇人', '谁也离不开谁'],

  // ...其余字段不变...
}
```

### 5.2 其他结果的 customIndices 模板（在实施时逐个填写）

每个结果的 `customIndices` 和 `relationshipDef` 需根据 Step 1.3 的映射表逐个撰写，确保：
- 指数名有梗、好记
- comment 是一句话吐槽（不超过15字）
- headline 是能记住的强结论（不超过20字）
- detail 不超过80字

---

## Step 6: 狗版差异化

**文件:** `config/dogData.js`

规则：
- 模块标题：`本汪有话说` / `本汪使用说明`
- 结果页 section-title：`你们这段关系，说白了就是——`（通用，不区分猫狗）
- customIndices 指数名使用狗版视角（如"摇尾巴速度"替代"嘴硬心软指数"）
- petComment 用本汪语气
- 指数标题：用 `(tLabel || emotionTag) + '指数'`

狗版示例（快乐逆子饲养员）：
```js
customIndices: [
  { label: '被气笑指数', value: 94, comment: '又拆家又让你笑' },
  { label: '追鞋速度', value: 98, comment: '你放下鞋的瞬间就没了' },
  { label: '快乐传染值', value: 96, comment: '它傻乐你也跟着乐' },
  { label: '原谅指数', value: 92, comment: '一个眼神你就投降' }
]
```

---

## Step 7: 第一屏中移除配图并排区

### 7.1 移除逻辑

当前第一屏的 `photos-row`（配图+用户照片）占据大量空间，不利于身份卡聚焦。改为：
- 移除 `photos-row` 整个区块
- 用户照片上传功能保留在 CTA 按钮流程中（现有 `onGeneratePoster` 逻辑不变）
- 结果配图 `resultImage` 保留用于海报生成，但不在结果页展示

### 7.2 CTA 文案

```
有照片: "生成我的专属海报"
无照片: "上传照片，生成专属海报"（带呼吸动画）
```

---

## Step 8: 海报改为短版（详见 Step 9）

海报从"长报告截图"改为**短版身份卡**，只保留 6 个核心信息。`posterHelper.js` 需要重写。

旧海报使用的数据字段（`indices`/`description`/`summary`/`tips`/`petComment`）在 catData/dogData 中保留（结果页第二屏仍使用部分字段），但海报不再渲染这些内容。

---

## ~~实施顺序（旧）~~

> 已被 Step 9 后的"实施顺序（更新）"替代，见文末。

---

## Step 9: 分享海报改为短版（重写 posterHelper）

### 9.1 设计原则

当前海报是"长报告截图"，信息密度高但不适合朋友圈场景。改为**短版身份卡海报**，只放 6 个核心信息：

```
┌─────────────────────────────────┐
│                                 │
│  ┌───────────────────────────┐  │
│  │      宠物照片（大圆/圆角）    │  │
│  └───────────────────────────┘  │
│                                 │
│  [宠物名] 眼中的我：[结果名]     │
│                                 │
│  "[金句]"                       │
│                                 │
│  标签1 ｜ 标签2 ｜ 标签3        │
│                                 │
│  ┌─────────┐                    │
│  │ 小程序码 │  扫码测测你是什么   │
│  └─────────┘                    │
│                                 │
└─────────────────────────────────┘
```

### 9.2 海报只放 6 个信息

| 序号 | 信息 | 数据来源 |
|------|------|---------|
| 1 | 宠物照片 | `photoPath`（用户上传），无照片时用占位图 |
| 2 | 宠物名字 | 新增 `petName` 字段（用户输入），默认"猫主子"/"我家修勾" |
| 3 | 结果名 | `relationship.title` |
| 4 | 一句金句 | `relationship.goldQuote` |
| 5 | 三个标签 | `relationship.tags[0..2]` |
| 6 | 小程序码 | `assets/images/qrcode.png`（PNG格式，>=240x240px） |

### 9.3 海报尺寸与布局

- **画布尺寸：** 750 x 1000 px（接近正方形，适合朋友圈/微信群）
- **背景：** 使用 `posterTheme` 对应的 `bg` 色
- **不再包含：** indices横条、description长文、tips建议、keywords标签、subtitle副标题

### 9.4 布局规格（从上到下）

```
顶部留白: 60px
宠物照片: 280x280px 圆角(40px)，居中
    间距: 40px
标题行:   "[petName]眼中的我：[title]"  bold 28px  居中
    间距: 24px
金句:     ""[goldQuote]""  bold 32px  居中  主题accent色
    间距: 24px
标签行:   "tag1 ｜ tag2 ｜ tag3"  24px  居中  灰色
    间距: 40px
底部区:   左侧小程序码(80x80) + 右侧引导文案
底部留白: 60px
```

### 9.5 底部引导文案

- 通用：`扫码测测你在它心里是什么身份`
- 5.20 限定：`5.20 测测你在它心里是什么身份`

### 9.6 petName 字段来源

新增用户输入流程：
- 在 quiz 页上传照片步骤，新增"给你家宝贝取个名字"输入框（可选）
- 默认值：猫版 = "猫主子"，狗版 = "我家修勾"
- 通过 URL 参数传递到 result 页和 poster 页：`petName=xxx`

### 9.7 posterHelper.js 重写

**文件:** `utils/posterHelper.js`

替换现有 `draw` 函数为短版逻辑：

```js
var CANVAS_W = 750
var CANVAS_H = 1000
var PADDING = 56

function draw(ctx, opts, callback) {
  var relationship = opts.relationship
  var petData = opts.petData
  var photoPath = opts.photoPath
  var petName = opts.petName || (petData.petType === 'cat' ? '猫主子' : '我家修勾')
  var canvas = opts.canvas

  var themeName = relationship.posterTheme || 'milkWhite'
  var theme = THEMES[themeName] || THEMES.milkWhite

  canvas.width = CANVAS_W
  canvas.height = CANVAS_H

  // 1. 背景
  ctx.fillStyle = theme.bg
  roundRect(ctx, 0, 0, CANVAS_W, CANVAS_H, 0)
  ctx.fill()

  var y = 60

  // 2. 宠物照片（280x280 圆角）
  // ... 加载图片并绘制 ...
  var photoSize = 280
  var photoX = (CANVAS_W - photoSize) / 2
  // drawRoundImage(ctx, img, photoX, y, photoSize, photoSize, 40)
  y += photoSize + 40

  // 3. 标题行："[petName]眼中的我：[title]"
  ctx.textAlign = 'center'
  ctx.font = 'bold 28px PingFang SC'
  ctx.fillStyle = theme.primary
  ctx.fillText(petName + '眼中的我：' + relationship.title, CANVAS_W / 2, y + 28)
  y += 28 + 24

  // 4. 金句
  ctx.font = 'bold 32px PingFang SC'
  ctx.fillStyle = theme.accent
  // fillWrappedText 居中处理
  y += goldQuoteHeight + 24

  // 5. 标签行
  ctx.font = '24px PingFang SC'
  ctx.fillStyle = '#888888'
  var tagsText = (relationship.tags || []).slice(0, 3).join(' ｜ ')
  ctx.fillText(tagsText, CANVAS_W / 2, y + 24)
  y += 24 + 40

  // 6. 底部：小程序码 + 引导文案
  // 左侧 qrcode 80x80，右侧文案
  // ...

  callback(null)
}
```

### 9.8 数据层变更

**文件:** `config/catData.js` / `config/dogData.js`

`brand` 对象新增：

```js
brand: {
  // ...现有字段...
  posterGuideText: '扫码测测你在它心里是什么身份',
  posterGuideText520: '5.20 测测你在它心里是什么身份'
}
```

### 9.9 poster.js 传参变更

**文件:** `pages/poster/poster.js`

- onLoad 新增读取 `petName` 参数
- 传递给 posterHelper.draw：`petName: options.petName || defaultPetName`

### 9.10 result.js 传参变更

**文件:** `pages/result/result.js`

- `_navigateToPoster` 时追加 `&petName=xxx`

---

## Step 10: quiz 页新增宠物名输入

**文件:** `pages/quiz/quiz.wxml` / `pages/quiz/quiz.js`

### 10.1 上传照片步骤新增名字输入

在现有上传引导区域中，照片上传按钮下方新增：

```html
<!-- 宠物名字输入（可选） -->
<view class="pet-name-input-wrap">
  <input class="pet-name-input"
    placeholder="{{petType === 'cat' ? '你家猫叫什么名字？（选填）' : '你家狗叫什么名字？（选填）'}}"
    value="{{petName}}"
    bindinput="onPetNameInput"
    maxlength="8" />
</view>
```

### 10.2 quiz.js 变更

```js
data: {
  // ...现有字段...
  petName: ''
},

onPetNameInput: function(e) {
  this.setData({ petName: e.detail.value })
},

// _goResult 中传递 petName
_goResult: function() {
  // ...现有逻辑...
  var url = '/pages/result/result?petType=' + this.data.petType +
    '&resultCode=' + resultCode +
    '&tScore=' + result.tScore +
    '&predAnswer=' + (result.predAnswer || '')
  if (this.data.photoPath) {
    url += '&photoPath=' + encodeURIComponent(this.data.photoPath)
  }
  if (this.data.petName) {
    url += '&petName=' + encodeURIComponent(this.data.petName)
  }
  wx.redirectTo({ url: url })
}
```

---

## Step 11: 推广话术配置

**文件:** `config/catData.js` / `config/dogData.js`

### 11.1 数据结构

在 `brand` 对象中新增 `promoTexts`：

```js
brand: {
  // ...现有字段...
  promoTexts: {
    // 养宠群话术（3条，随机选1条展示在分享引导中）
    petGroup: [
      '我刚测出来是「{title}」，太准了……\n{goldQuote}\n你们也测一下，我想看谁家猫最离谱。',
      '你们快测！我测完发现我在猫眼里是「{title}」，笑死。',
      '这个测试有点冒犯了……我居然是「{title}」，准到无法反驳。'
    ],
    // 朋友圈话术
    moments: [
      '5.20 不一定要人类告白，我家毛孩子已经给我发身份认证了。\n我是「{title}」，你们是什么？',
      '测完觉得很冒犯，但确实无法反驳。\n我在猫眼里是「{title}」—— {goldQuote}',
      '{goldQuote}\n原来我在它心里是这样的人类……你们也来测测 #它眼中的你'
    ]
  }
}
```

狗版：
```js
promoTexts: {
  petGroup: [
    '我测出来是「{title}」，有点被我家狗感动到。\n你们也测一下，看你在狗眼里是饭票、司机，还是全世界。',
    '这测试太真实了，我是「{title}」……{goldQuote}',
    '来！测测你家修勾怎么看你的。我测出来笑了五分钟。'
  ],
  moments: [
    '5.20 不一定要人类告白，我家毛孩子已经给我发身份认证了。\n我是「{title}」，你们是什么？',
    '测完发现我是「{title}」—— {goldQuote}\n被自己家狗认证了属于是。',
    '{goldQuote}\n我在它心里原来是这样的……你们也来测测 #它眼中的你'
  ]
}
```

### 11.2 话术替换逻辑

在 poster 页的 `circleText` 区域展示时，对 `{title}` 和 `{goldQuote}` 做字符串替换：

```js
var promoText = promoTemplate
  .replace(/\{title\}/g, relationship.title)
  .replace(/\{goldQuote\}/g, relationship.goldQuote)
```

### 11.3 poster 页展示方式

保留现有 `copy-card` 区域，但文案来源改为：
- 优先使用 `promoTexts.moments` 中随机一条（朋友圈话术）
- 用户点击复制时自动追加 `#它眼中的你 #人宠关系测试PETI` 双话题标签

### 11.4 结果页新增"分享到群"引导

在结果页底部（再测一次按钮旁），新增"分享到群"按钮：
- 点击后调用 `wx.showShareImageMenu` 或 `onShareAppMessage`
- 分享卡片标题使用 `promoTexts.petGroup` 中随机一条（经过字符串替换）

---

## 实施顺序（更新）

1. **WXML + WXSS 重构** — 结果页新页面结构和样式
2. **result.js 适配** — 处理新字段，确保 fallback 兼容
3. **quiz.js 新增 petName 输入** — 上传步骤加名字输入
4. **posterHelper.js 重写** — 短版6信息海报
5. **poster.js 适配** — 读取 petName，传递给 posterHelper
6. **catData.js 数据填充** — 16个结果 `customIndices` + `relationshipDef` + 升级文案 + `promoTexts`
7. **dogData.js 数据填充** — 同上
8. **验证测试** — 结果页 + 海报生成 + 分享流程全链路验证

---

## 验收标准

### 结果页

1. 第一屏"身份卡"一屏可见：结果名 + 金句 + 标签 + 4张小卡 + CTA
2. 第二屏按新顺序展示 4 个模块：吐槽 → 关系定义 → 指数卡 → 使用说明
3. 每个结果的指数名称为专属定制（不共用"被拿捏指数/情感浓度"通用名称）
4. 指数卡为 2x2 布局，每个卡片含数值 + 一句短吐槽
5. tips 标题为"本喵/本汪使用说明"，每条不超过25字
6. petComment 改为更短尖锐的吐槽体
7. 关系定义区包含：强结论 + 短解释(不超过80字) + 关系小卡 + 关键词标签
8. 无照片时 CTA 带呼吸动画引导上传
9. 猫/狗双版本主题色、语气差异正确

### 短版海报

10. 海报画布 750x1000，只含6个信息：宠物照片 + 宠物名 + 结果名 + 金句 + 标签 + 小程序码
11. 标题格式为"[petName]眼中的我：[结果名]"
12. 无照片时使用占位图（猫版 `cat-placeholder.png` / 狗版 `dog-placeholder.png`）
13. 海报背景使用对应 `posterTheme` 的 bg 色
14. 底部小程序码为 PNG 格式 >= 240x240px
15. 底部引导文案可根据日期切换（5.20限定版）

### 推广话术

16. `promoTexts.petGroup` 养宠群话术 3 条，包含 `{title}` 和 `{goldQuote}` 占位符
17. `promoTexts.moments` 朋友圈话术 3 条，同上
18. poster 页复制文案来源切换为 `promoTexts.moments` 随机选取
19. 复制时自动追加双话题标签 `#它眼中的你 #人宠关系测试PETI`
20. 结果页分享到群时使用 `promoTexts.petGroup` 话术
