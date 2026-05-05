# 喵汪人格测试 · 完整产品 Spec v1.0

> 宠物 PETI 人格测试微信小程序 — 产品方案 · UI · 交互设计 · 合规审查

---

## Context

本文档是「喵汪人格测试」微信小程序的完整产品规格说明书。该小程序是一款纯前端、无后端的趣味宠物人格测试工具——用户选择猫或狗，回答 20 道行为观察题，获得 4 字母人格类型结果，查看性格分析与主人匹配度，并生成可分享的 9:16 海报。

本 Spec 将指导后续全部开发工作，同时覆盖合规审查与侵权风险规避设计。

---

## 第一章 · 产品概述

### 1.1 产品定义

| 项 | 内容 |
|---|------|
| 产品名称 | 喵汪人格测试 |
| 产品形态 | 微信小程序（原生开发，WXML + WXSS + JS） |
| 技术架构 | **纯前端**，无后端 / 无数据库 / 无云函数 |
| 核心玩法 | 选物种 → 答 20 题 → 选主人类型（可跳过）→ 看人格 + 匹配 → 生海报 → 分享裂变 |
| 自创体系 | **PETI**（Pet Personality Type Indicator，宠物人格类型指标） |

### 1.2 核心价值

- **对用户**：用趣味方式"读懂"自家毛孩子的隐藏人格，获得社交货币
- **对传播**：拟人化人格标签 + 稀有度收集感 + 海报天然适合社交分享
- **差异点**：不是测"人"，是测"宠物"——情感门槛更低，分享意愿更强

### 1.3 目标用户

| 层级 | 画像 | 场景 |
|------|------|------|
| 核心 | 18-35 岁，女性为主，养猫 / 养狗的宠物主人 | 想了解宠物性格、晒宠社交 |
| 次核心 | 云养宠爱好者、被朋友圈海报吸引的好奇用户 | 看到海报 → 好奇扫码 → 测试 → 分享 |

### 1.4 PETI 术语体系

为规避 MBTI 商标风险（详见第七章），本产品自创术语体系：

| 术语 | 全称 | 定义 | 使用规范 |
|------|------|------|---------|
| PETI | Pet Personality Type Indicator | 宠物人格类型指标 | 所有用户可见文案统一使用 |
| PETI 类型 | — | 4 字母人格代码（如 ENFP） | 替代"MBTI 类型" |
| 人格维度 | — | E/I, S/N, T/F, J/P | 使用宠物化标签，不引用官方维度定义 |

> **关键约束**：4 字母代码（ENFP 等）属于心理学公共领域知识，不受商标保护，可安全使用。但"MBTI"四个字母的组合是注册商标，**全文本任何用户可见处均不得出现**。

### 1.5 品牌调性差异

猫版与狗版共享页面结构和逻辑，通过 `petType` 参数加载不同配置，品牌调性严格区分：

| 维度 | 猫版 | 狗版 |
|------|------|------|
| 核心气质 | 傲娇 / 高冷 / 神秘 / 文艺 | 忠诚 / 暖心 / 元气 / 憨厚 |
| 命名后缀 | "XX猫"（如：铁腕霸总猫） | "XX修勾"（如：霸气队长修勾） |
| 文案口吻 | 高冷毒舌、欲拒还迎 | 热情直球、呆萌暖心 |
| 色调倾向 | 冷色系（深紫 / 靛蓝 / 灰黑） | 暖色系（橘 / 黄 / 奶白） |
| 按钮风格 | 描边 / 线条感 | 实心 / 圆角填充 |

---

## 第二章 · 架构设计

### 2.1 技术架构

```
┌─────────────────────────────────────────┐
│          微信小程序前端                    │
│                                         │
│  ┌───────────┐   ┌───────────────────┐  │
│  │  页面层     │   │  静态配置层        │  │
│  │  4 个 Page │ ← │  catData.js      │  │
│  │            │   │  dogData.js      │  │
│  └───────────┘   └───────────────────┘  │
│        ↕                                │
│  ┌───────────────────────────────────┐  │
│  │  工具层                            │  │
│  │  scorer.js · posterHelper.js      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  无后端 · 无数据库 · 无云函数 · 无缓存     │
└─────────────────────────────────────────┘
```

### 2.2 项目目录结构

```
/catdog
├── app.js / app.json / app.wxss
├── config/
│   ├── catData.js          ← 猫咪完整配置
│   ├── dogData.js          ← 狗狗完整配置
│   └── adConfig.js         ← 广告独立开关（banner/interstitial 各自 enabled）+ 广告位 ID
├── utils/
│   ├── scorer.js           ← 计分 + 配对匹配算法
│   └── posterHelper.js     ← 海报 Canvas 绘制（含安全绘制 + 图片超时兜底）
├── pages/
│   ├── home/               ← 首页（物种选择，app.json pages[0]，所有外部入口）
│   ├── quiz/               ← 答题页（含主人类型选择步骤）
│   ├── result/             ← 结果页（防深链接 + Banner 广告位）
│   └── poster/             ← 海报页（Canvas 资源释放 + 插屏广告 + 防深链接）
├── components/
│   ├── progress-bar/       ← 答题进度条
│   └── option-card/        ← 选项卡片
└── assets/
    └── images/             ← 插画 / 占位图 / 图标
```

### 2.3 页面路由与导航

```
         navigateTo                      redirectTo
Home ─────────────→ Quiz ─────────────────────────→ Result
                    (20题 + 选主人类型/跳过)           │
                                                     ↓ navigateTo
                                                   Poster

重测：Result → redirectTo → Quiz（清空状态，不可返回结果页）
```

| 跳转 | API | 理由 |
|------|-----|------|
| Home → Quiz | `wx.navigateTo` | 可返回首页重选物种 |
| Quiz → Result | `wx.redirectTo` | 提交结果后不可返回答题页（答题中可通过「上一题」返回修改） |
| Result → Poster | `wx.navigateTo` | 可返回结果页 |
| 重测 → Quiz | `wx.redirectTo` | 清空当前页面栈 |

### 2.4 数据流（页面间传参）

使用 URL query 参数传递，**不使用** `globalData` 或 `wx.setStorageSync`：

| 跳转 | 参数 |
|------|------|
| Home → Quiz | `petType=cat` 或 `petType=dog` |
| Quiz → Result | `petType=cat&resultCode=ENFP&masterCode=INTJ`（masterCode 可选，跳过时不传） |
| Result → Poster | `petType=cat&resultCode=ENFP&masterCode=INTJ&photoPath=xxx`（masterCode/photoPath 均可选） |

**不缓存原则**：每次测试独立，关闭即消失，不写入本地存储。

### 2.5 配置数据结构

已有 `config/catData.js` 和 `config/dogData.js`，完整字段规范：

```javascript
{
  petType: 'cat' | 'dog',
  brand: {
    title: string,            // 品牌标题
    slogan: string,           // 主 slogan
    subtitle: string,         // 副标题
    shareTitle: string,       // 微信分享标题
    shareDesc: string,        // 微信分享描述
    posterCTA: string[]       // 海报小程序码旁挑衅式引导语（3 条，随机选 1）
  },
  dimensions: {               // 4 维度的正负向标签
    EI: { positive, negative },
    NS: { positive, negative },
    TF: { positive, negative },
    JP: { positive, negative }
  },
  questions: [{               // 20 题
    id: number,
    question: string,
    optionA: string,
    optionB: string,
    dimension: 'EI'|'NS'|'TF'|'JP',
    scoreA: string,           // 选 A 得到的字母
    scoreB: string            // 选 B 得到的字母
  }],
  personalities: {            // 16 种人格，key 为 4 字母码
    [CODE]: {
      petName: string,        // 人格昵称
      rare: string,           // 稀有度标签（传说款/珍稀款/独特款/大众款）
      rareLevel: string,      // 百分比（3%/8%/15%/25%）
      posterBadge: string,    // 海报角标（含 emoji）
      posterTheme: string,    // 海报主题色 key
      posterShort: string,    // 一句话简介
      description: string,    // 完整人格描述
      tips: string,           // 相处建议
      bestMatch: string[],    // 高匹配主人 PETI 类型（2-3 个）
      score: number,          // 高匹配分数（93-98）
      tag: string,            // 高匹配等级标签
      matchDesc: string,      // 高匹配描述
      matchCircleText: string,// 朋友圈配对文案
      circleText: string,     // 朋友圈人格文案
      petComment: string      // 宠物第一人称视角评价（海报用，1句话）
    }
  },
  lowMatch: {                 // 非 bestMatch 时的兜底
    score: number,
    tag: string,
    matchDesc: string,
    matchCircleText: string
  },
  masterPetiList: string[]    // 主人类型选项（16 个）
}
```

---

## 第三章 · 页面详细设计

### 3.1 Home 首页（物种选择页）

**页面路径**：`/pages/home/home`

**页面目标**：品牌第一印象 + 物种选择入口

**布局结构**（自上而下）：

```
┌──────────────────────────────┐
│                              │
│     🐾 喵汪人格测试             │  ← 品牌名（大字报风格）
│   每一只毛孩子都有专属人格密码   │  ← slogan
│                              │
├──────────────┬───────────────┤
│              │               │
│  ┌────────┐  │  ┌────────┐   │
│  │ 猫插画  │  │  │ 狗插画  │   │  ← 插画占位（各 300×300rpx）
│  │ 占位区  │  │  │ 占位区  │   │
│  └────────┘  │  └────────┘   │
│              │               │
│ 「测猫咪人格」│ 「测修勾人格」  │  ← CTA 按钮
│   傲娇密码    │   暖心密码      │  ← 调性文案
│              │               │
├──────────────┴───────────────┤
│                              │
│  🐾 趣味测试仅供娱乐参考       │  ← 免责声明（小字灰色）
│                              │
└──────────────────────────────┘
```

**交互规范**：

- 点击猫入口 → `wx.navigateTo({ url: '/pages/quiz/quiz?petType=cat' })`
- 点击狗入口 → `wx.navigateTo({ url: '/pages/quiz/quiz?petType=dog' })`
- 卡片点击：缩放动效 + `wx.vibrateShort({ type: 'light' })`
- 猫/狗区域色调差异：猫侧偏冷色，狗侧偏暖色
- 配置 `onShareAppMessage`：分享标题使用通用文案

**底部免责声明文案**：

> 🐾 本测试为趣味娱乐内容，PETI 为「喵汪人格测试」原创宠物人格体系，结果仅供参考，不构成任何专业建议。

---

### 3.2 Quiz 答题页

**页面路径**：`/pages/quiz/quiz?petType=cat|dog`

**页面目标**：20 道题逐题作答 + 完成后选择主人 PETI 类型（可跳过）

**布局结构 — 答题阶段**：

```
┌──────────────────────────────┐
│  3/20 ████████░░░░░░░░░░░░░  │  ← 进度条 + 题号
├──────────────────────────────┤
│                              │
│                              │
│  家里来了陌生人，              │
│  你家猫咪会？                 │  ← 题目文案（大字居中）
│                              │
│                              │
├──────────────────────────────┤
│                              │
│  ┌──────────────────────┐    │
│  │  A  大方走过去嗅探     │    │  ← 选项 A 卡片
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │  B  找个角落躲起来     │    │  ← 选项 B 卡片
│  └──────────────────────┘    │
│                              │
├──────────────────────────────┤
│  ← 上一题              🐱    │  ← 底部：上一题按钮 + 物种标识
└──────────────────────────────┘
```

**布局结构 — 选择主人类型阶段**（第 20 题选完后过渡到此界面）：

```
┌──────────────────────────────┐
│                              │
│  最后一步！                    │
│  选择你自己的 PETI 类型        │  ← 标题
│  看看和你家猫咪有多配～         │  ← 副标题（引导语）
│                              │
│  ┌────┬────┬────┬────┐       │
│  │ISTJ│ISFJ│INFJ│INTJ│       │
│  ├────┼────┼────┼────┤       │  ← 4×4 宫格选择
│  │ISTP│ISFP│INFP│INTP│       │
│  ├────┼────┼────┼────┤       │
│  │ESTP│ESFP│ENFP│ENTP│       │
│  ├────┼────┼────┼────┤       │
│  │ESTJ│ESFJ│ENFJ│ENTJ│       │
│  └────┴────┴────┴────┘       │
│                              │
│  ┌────────────────────────┐  │
│  │   跳过，直接看结果 →     │  │  ← 跳过按钮（文字链样式）
│  └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

**交互规范 — 答题阶段**：

| 操作 | 行为 |
|------|------|
| 点击选项 | 选中态高亮（scale 缩放 + 主题色边框）→ 300ms 延迟 → 自动下一题 |
| 题目切换（前进） | 水平滑动过渡（当前题左滑出，下一题右滑入，300ms ease-out） |
| 上一题 | 点击「上一题」按钮 → 回退到前一题（右滑出，前一题左滑入）→ 显示之前的选择状态（高亮已选项），可重新选择覆盖 |
| 第 1 题时 | 「上一题」按钮隐藏或置灰不可点 |
| 手势滑动 | **不响应**（仅点击切题，防误触） |
| 第 20 题选完 | 执行计分算法得到 resultCode → 同页面内过渡到「选择主人类型」阶段 |

**交互规范 — 选择主人类型阶段**：

| 操作 | 行为 |
|------|------|
| 点击某个类型 | 选中高亮 → 300ms 后自动跳转 `wx.redirectTo` 到 Result 页（携带 masterCode） |
| 点击「跳过」 | 直接 `wx.redirectTo` 到 Result 页（不携带 masterCode） |
| 返回上一题 | 不提供（此阶段已完成答题，不可回退修改答案） |

**上一题重选规则**：
- 页面维护 `answers[]` 数组记录每题已选答案
- 回退时显示该题之前的选择（高亮对应选项），用户可点击另一个选项覆盖
- 回退不影响已记录的后续答案（若用户从第 15 题回到第 10 题改选，第 11-15 题的答案保留）
- 最终提交时以 `answers[]` 中每题的最新选择为准

**进度条规范**：

- 高度 6rpx，圆角
- 背景色：浅灰 `#E8E8E8`
- 填充色：随 petType 切换（猫=冷色调，狗=暖色调）
- 填充动画：linear transition 300ms
- 选择主人类型阶段：进度条满格（20/20），表示答题已完成

---

### 3.3 Result 结果页

**页面路径**：`/pages/result/result?petType=cat|dog&resultCode=XXXX&masterCode=YYYY`

> `masterCode` 为可选参数。有值时展示匹配区域，无值时隐藏。

**页面目标**：一屏展示宠物人格全貌 + 主人匹配度（如有），用唯一 CTA 驱动海报生成与分享

**布局结构**：

```
┌──────────────────────────────┐
│                              │
│       E N F P                │  ← 4 字母码（超大字，撞色）
│    「元气小太阳猫」            │  ← 人格昵称
│    ⭐ 传说款  仅 3%           │  ← 稀有度徽章
│                              │
│  ┌────────────────────────┐  │
│  │   宠物照片 / 占位图      │  │  ← 照片区域（可上传替换）
│  └────────────────────────┘  │
│                              │
│  「走到哪里都是焦点」          │  ← posterShort
│                              │
├──────────────────────────────┤
│  ▌你家猫咪是这样的             │  ← 人格详情
│                              │
│  天生自带社交光环的小太阳...    │  ← description
│                              │
├──────────────────────────────┤
│  ▌和它相处的小秘诀             │  ← 相处建议
│                              │
│  · 给它足够的社交空间...       │  ← tips
│                              │
├──────────────────────────────┤  ← 以下仅当 masterCode 存在时显示 ↓
│  ▌你和它的默契指数              │
│                              │
│    💕 95 · 天命绝配            │  ← 匹配分数 + 标签（数字跳动动画）
│    你是那种陪猫看夕阳它甩尾...  │  ← matchDesc
│                              │
├──────────────────────────────┤  ← masterCode 区域结束 ↑
│                              │
│  ┌────────────────────────┐  │
│  │ 🎨 生成我的专属海报      │  │  ← **唯一主 CTA**（强视觉权重）
│  └────────────────────────┘  │
│                              │
│  🔄 再测一次    📋 复制文案   │  ← 次级操作（文字链，低视觉权重）
│                              │
│  📋 免责声明                  │  ← 折叠式详细免责（见 7.6）
│                              │
└──────────────────────────────┘
```

**交互规范**：

| 操作 | 行为 |
|------|------|
| 上传照片 | 点击照片区 → `wx.chooseMedia({ count: 1, mediaType: ['image'] })` → 本地预览 → tempFilePath 传给 Poster 页 |
| 无照片 | 显示默认占位插画（猫/狗各一张通用） |
| 生成海报 | `wx.navigateTo` → Poster 页，携带 petType + resultCode + masterCode（可选） + photoPath（可选） |
| 再测一次 | 弹出确认弹窗「确定重新测试吗？当前结果不会被保存」→ 确认后 `wx.redirectTo` 回 Quiz |
| 复制文案 | 有 masterCode 时复制 `matchCircleText`，无则复制 `circleText` → 自动附加 `#喵汪人格测试` |
| 分享 | `<button open-type="share">` → 分享卡片带人格结果信息 |

**匹配度展示逻辑**（当 masterCode 存在时）：

| 等级 | 分数段 | 标签 | 触发条件 |
|------|--------|------|---------|
| 天命绝配 | 95-100 | 💕 | masterCode ∈ bestMatch 且 score ≥ 95 |
| 神仙合拍 | 85-94 | ✨ | masterCode ∈ bestMatch 且 score < 95 |
| 日常合拍 | 70-84 | 😊 | 不在 bestMatch，3 字母相同 |
| 欢喜冤家 | 60-69 | 😤 | 不在 bestMatch，2 字母相同 |
| 反差磨合 | < 60 | 🔥 | 不在 bestMatch，0-1 字母相同 |

**匹配计算逻辑**：

```
getMatch(petCode, masterCode, petData):
  1. 若 masterCode ∈ bestMatch → 返回该人格的 score/tag/matchDesc/matchCircleText
  2. 否则，比较 petCode 与 masterCode 的 4 个字母：
     - 3 个相同 → 日常合拍（随机 74-82 分）
     - 2 个相同 → 欢喜冤家（使用 lowMatch 数据，72 分）
     - 0-1 个相同 → 反差磨合（随机 52-58 分）
  3. 非 bestMatch 时使用通用模版文案：
     - 日常合拍：猫版「不算天选搭档，但日常相处还挺合拍，偶尔小摩擦反而是调味料」
     - 反差磨合：猫版「你们的组合充满戏剧性，反差才是最大的看点」
```

**稀有度徽章样式**：

| 等级 | 标签 | 颜色 | 动效 |
|------|------|------|------|
| ⭐ 传说款 3% | 金色底 + 金字 | `#FFD700` | 轻微呼吸光效 |
| 💎 珍稀款 8% | 紫色底 + 白字 | `#9B59B6` | 无 |
| ✨ 独特款 15% | 蓝色底 + 白字 | `#3498DB` | 无 |
| 🧸 大众款 25% | 灰色底 + 灰字 | `#95A5A6` | 无 |

---

### 3.4 Poster 海报页

**页面路径**：`/pages/poster/poster?petType=cat|dog&resultCode=XXXX&masterCode=YYYY&photoPath=xxx`

> `masterCode` 和 `photoPath` 均为可选参数。

**页面目标**：Canvas 生成 9:16 竖版海报，保存到相册或直接分享

**Canvas 画布规范**：

- API：Canvas 2D（新版，非旧版 Canvas）
- 画布尺寸：宽 750px × 高动态计算（基于内容，含/不含匹配区域高度不同）
- DPR 策略：自适应（设备 pixelRatio >= 2 → 使用 2，否则使用 1.5，兼顾清晰度与低端机性能）
- 输出格式：JPG（quality: 0.92，相比 PNG 文件更小、分享更快）
- 资源释放：导出完成后立即 `canvas.width = 0; canvas.height = 0` 释放 GPU 内存

**页面操作区**（Canvas 上方或下方，非海报内容）：

```
┌──────────────────────────────┐
│  海报预览区（Canvas 渲染结果）  │
├──────────────────────────────┤
│                              │
│  ☑ 展示和主人的匹配结果        │  ← toggle 开关（仅当 masterCode 存在时显示）
│                              │     默认：选中（展示匹配）
│  ┌────────────────────────┐  │     取消：海报实时刷新为无匹配版
│  │  💾 保存到相册           │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │  📤 分享给好友           │  │
│  └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

**海报布局 — 有匹配信息版**（masterCode 存在 + toggle 选中）：

```
┌──────────────────────────────┐  ← 整体背景色由 posterTheme 决定
│                              │
│  ┌────────────────────────┐  │
│  │    宠物照片 / 占位图     │  │  ← 圆角矩形裁剪 (320×320)
│  └────────────────────────┘  │
│                              │
│      元气小太阳猫             │  ← 人格昵称（主角，42px bold）
│ ╭────────────────────────╮   │
│ │ ENFP 🧸 大众款25%·猫咪同款│  │  ← pill 标签（accent 底色圆角）
│ ╰────────────────────────╯   │
│ ╭────────────────────╮       │
│ │「快来陪本喵玩！不许拒绝！」│   │  ← petComment 语录气泡（半透明底）
│ ╰────────────────────╯       │
│                              │
│ ┃ 🐾 我家猫咪是这样的         │  ← 左竖线 + 标题 + 自动换行描述
│ ┃ 精力永远用不完……           │
│                              │
│ ┃ 💡 和它相处的秘诀           │  ← 左竖线 + 标题 + 自动换行 tips
│ ┃ 每天保证足够的玩耍时间……   │
│                              │
│ ┃ 💕 95分 · 天命绝配          │  ← 左竖线 + 匹配信息
│ ┃ 主人 INTJ × 猫咪 ENFP     │
│ ┃ "我家猫是行走的快乐源泉…"  │  ← matchCircleText 引述
│                              │
│ ─────────────────────────── │  ← 分隔线
│ 你家猫比我的稀有吗？   (○码) │  ← 左文案 + 右小程序码
│ 喵汪人格测试·PETI·仅供娱乐  │
└──────────────────────────────┘
```

**海报布局 — 无匹配信息版**（masterCode 缺失 或 toggle 取消）：

```
┌──────────────────────────────┐
│                              │
│  ┌────────────────────────┐  │
│  │    宠物照片 / 占位图     │  │
│  └────────────────────────┘  │
│                              │
│      元气小太阳猫             │
│ ╭────────────────────────╮   │
│ │ ENFP 🧸 大众款25%·猫咪同款│  │
│ ╰────────────────────────╯   │
│ ╭────────────────────╮       │
│ │「快来陪本喵玩！不许拒绝！」│   │
│ ╰────────────────────╯       │
│                              │
│ ┃ 🐾 我家猫咪是这样的         │
│ ┃ 精力永远用不完……           │
│                              │
│ ┃ 💡 和它相处的秘诀           │
│ ┃ 每天保证足够的玩耍时间……   │
│                              │
│ ─────────────────────────── │
│ 你家猫比我的稀有吗？   (○码) │
│ 喵汪人格测试·PETI·仅供娱乐  │
└──────────────────────────────┘
```

**三个传播增强要素**：

| 要素 | 来源 | 位置 | 说明 |
|------|------|------|------|
| 稀有度同款标签 | `posterBadge` + 物种名 | pill 标签内 | 格式：`posterBadge + ' · ' + noun + '同款'`，如"🧸 大众款 25% · 猫咪同款" |
| 宠物视角文案 | `petComment` 字段 | 人格昵称下方语录气泡 | 以宠物第一人称口吻写的一句话，猫版傲娇/狗版暖心 |
| 挑衅式引导语 | `brand.posterCTA` 数组 | 小程序码旁 | 随机选 1 条，面向"观看者"制造参与冲动 |

**数据字段**：

1. **`petComment`**（每个 personality 对象）：
   - 定义：宠物第一人称视角的评价/喊话，1 句话
   - 猫版调性：傲娇毒舌（如"本喵允许你继续铲屎了""你还算合格的人类"）
   - 狗版调性：暖心撒娇（如"有你在就是最幸福的事！""你永远是我的全世界！"）

2. **`brand.posterCTA`**（brand 对象数组）：
   - 定义：海报小程序码旁的挑衅式引导语，随机选 1 条
   - 猫版示例：`['你家猫比我的稀有吗？', '你确定你配得上你家猫？', '测测你家主子的真面目']`
   - 狗版示例：`['你家修勾是什么人格？', '你和你家狗的默契指数有多高？', '来看看谁家修勾更有个性']`

**稀有度标签文案逻辑**（海报 pill 标签内）：

```
// poster pill 标签文案拼接
var noun = (petType === 'cat') ? '猫咪' : '修勾'
var badgeText = resultCode + ' ' + posterBadge + ' · ' + noun + '同款'
// 示例输出: "ENFP 🧸 大众款 25% · 猫咪同款"
```

> **注意**：不再使用"超越XX%"表述。`rareLevel` 表示的是该类型的分布占比，不是排名百分位，不适合用于"超越"语义。当前使用"XX同款"格式更为准确，同时保留了收集感。

**7 套海报主题色**：

| Key | 名称 | 背景色 | 文字色 | 强调色（accent） | 适用人格 |
|-----|------|--------|--------|-----------------|---------|
| milkWhite | 奶白 | #FFFDF8 | #4A3728 | #F0C78E | ESFJ, ISFJ, ENFJ |
| warmOrange | 暖橘 | #FFF7F0 | #5C3A1E | #FFB76B | ESTP, ENFP |
| pinkPeach | 粉桃 | #FFF5F5 | #6B3A3A | #FF9E9E | ESFP, INFP |
| teaBrown | 茶棕 | #FFFBF2 | #5C3D2E | #E8A855 | ESTJ, ISTJ |
| mintGreen | 薄荷 | #F5FFFA | #2D5A3E | #7DDBA8 | ISFP, INTP |
| lavender | 薰衣草 | #F8F3FF | #3E2D5A | #B08ED6 | INTJ, INFJ |
| coolGray | 酷灰 | #F2F5FA | #2C3E50 | #7BA7CC | ISTP, ENTJ, ENTP |

> **设计说明**：accent 色用于 pill 标签底色、左竖线、品牌点缀等。所有主题均保证 accent 与 bg 有足够对比度，确保在分享图中视觉突出。

**保存与分享**：

| 操作 | 实现 |
|------|------|
| 保存/分享海报 | `canvasToTempFilePath({ fileType: 'jpg', quality: 0.92 })` → `wx.showShareImageMenu({ path, menus: ['shareAppMessage', 'shareTimeline', 'savePicture', 'collectPicture'] })` |
| 权限被拒 | 弹窗引导 → `wx.openSetting` 跳转系统设置 |
| 分享好友（小程序卡片） | 配置 `onShareAppMessage` 分享卡片（路径回首页） |

> **说明**：使用 `wx.showShareImageMenu` 代替单独的保存按钮，一次操作提供「分享好友」「分享朋友圈」「保存图片」「收藏」四个选项，减少页面按钮数量，提升分享转化率。`shareTimeline` 选项在真机上可用（模拟器可能不显示），与微信认证状态无关。

---

## 第四章 · 视觉设计规范

### 4.1 整体风格：潮流玩梗风

| 要素 | 规范 |
|------|------|
| 排版 | 大字报风格，标题粗体 + 超大字号，信息层级分明 |
| 配色 | 高饱和撞色，猫冷 / 狗暖双色系 |
| 元素 | emoji 点缀、网络梗标签、潮牌质感色块 |
| 氛围 | 综艺感字幕条 + 社交媒体信息流风格，留白要有呼吸感 |
| 图形 | 圆角卡片、色块标签、描边图标 |

### 4.2 色彩系统

**全局色板**（通过 petType 动态切换）：

| 用途 | 猫版 | 狗版 |
|------|------|------|
| 主色 | `#6B5CE7`（冷紫） | `#FF8C42`（暖橘） |
| 强调色 | `#4ECDC4`（青绿） | `#FFD93D`（明黄） |
| 背景色 | `#F8F7FF`（浅紫灰） | `#FFFAF0`（暖白） |
| 正文色 | `#2C2C2C` | `#2C2C2C` |
| 辅助色 | `#999999` | `#999999` |

**语义色**（稀有度）：

| 等级 | 色值 |
|------|------|
| 传说款 | `#FFD700`（金） |
| 珍稀款 | `#9B59B6`（紫） |
| 独特款 | `#3498DB`（蓝） |
| 大众款 | `#95A5A6`（灰） |

### 4.3 字体与排版

| 层级 | 字号 | 字重 | 用途 |
|------|------|------|------|
| 超大标题 | 80-120rpx | Bold | 4 字母 PETI 码 |
| 大标题 | 40-48rpx | Bold | 人格昵称、页面标题 |
| 标题 | 32-36rpx | Medium | 段落标题 |
| 正文 | 28-30rpx | Regular | 描述、建议内容 |
| 辅助 | 24rpx | Regular | 标签、提示 |
| 免责 | 20-22rpx | Light | 免责声明、版权 |

- 中文：系统默认 PingFang SC
- 数字 / 字母：系统默认（或后续可引入等宽字体增强 4 字母码视觉冲击力）
- 全部使用系统字体，**无自定义字体版权风险**

### 4.4 插画规范（占位）

> 插画素材后续单独准备，此处定义占位规范。

| 场景 | 尺寸 | 数量 | 要求 |
|------|------|------|------|
| 首页选择卡片 | 600×600rpx | 猫 1 / 狗 1 | 通用形象，品牌调性 |
| 结果页占位图 | 400×400rpx | 猫 1 / 狗 1 | 用户未上传照片时显示 |
| 海报占位图 | 500×500px(@2x) | 猫 1 / 狗 1 | 同上，海报版 |

**素材要求**：
- 风格统一（扁平 / 涂鸦 / Q 版均可，需统一）
- PNG 格式，带透明通道
- **必须为原创或获得合法商用授权**（详见 7.5）

### 4.5 动效规范

| 场景 | 动效 | 参数 |
|------|------|------|
| 选项选中 | scale 缩放 | 1.0 → 0.95 → 1.02 → 1.0，200ms |
| 题目切换 | 水平滑动 | translateX 左出右入，300ms ease-out |
| 结果展示 | 上滑渐入 | translateY + opacity，400ms ease-out |
| 匹配分数 | 数字跳动 | 0 → 目标值，800ms ease-out |
| 传说款徽章 | 呼吸光效 | opacity 0.8 ↔ 1.0，2s infinite |
| 按钮点击 | 缩放反馈 | scale 0.96，100ms |

---

## 第五章 · 数据与算法

### 5.1 题目设计

- 总题数：20 题 / 物种
- 维度分配：EI × 5、NS × 5、TF × 5、JP × 5
- 排列：维度交叉排列（不连续出同维度题）
- 形式：场景化二选一（A/B）

### 5.2 计分算法

```
function calculate(answers, questions):
  初始化计数器：counts = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 }
  
  遍历 answers：
    question = questions[answer.questionId]
    letter = (answer.selected === 'A') ? question.scoreA : question.scoreB
    counts[letter] += 1
  
  结果码 = 
    (counts.E > counts.I ? 'E' : 'I') +
    (counts.N > counts.S ? 'N' : 'S') +   // 注意：N 是正向
    (counts.T > counts.F ? 'T' : 'F') +   // 注意：T 在此处算正向（数据定义）
    (counts.J > counts.P ? 'J' : 'P')     // 注意：J 在此处算正向（数据定义）
  
  // 实际正负向以 scoreA/scoreB 字段为准
  // 每维度 5 题，不可能出现平局（5 是奇数）
  
  return 结果码  // 如 "ENFP"
```

**关键约定**：
- 结果码拼接顺序：**[E/I][S/N][T/F][J/P]**（标准 16 型排列）
- 每维度 5 题，计数范围 0-5，不会出现平局
- Q5（猫/狗）的 scoreA/scoreB 与通用模式不同（A=J, B=P），需按字段值处理

### 5.3 稀有度分布

| 等级 | 标签 | 占比标识 | 分配数量 |
|------|------|---------|---------|
| 传说款 | ⭐ 传说款 | 3% | 4 个 |
| 珍稀款 | 💎 珍稀款 | 8% | 4 个 |
| 独特款 | ✨ 独特款 | 15% | 5 个 |
| 大众款 | 🧸 大众款 | 25% | 3 个 |

> 百分比为标签属性（人设设定），非实际概率分布。结果由答题决定。

---

## 第六章 · 分享与传播设计

### 6.1 微信分享配置

**分享给好友（onShareAppMessage）**：

| 页面 | 分享标题 | 分享路径 |
|------|---------|---------|
| Home | 「来喵汪人格测试，测测你家毛孩子的隐藏人格！」 | `/pages/home/home` |
| Result（有匹配） | 「我家[猫咪/修勾]是[元气小太阳猫]，和我[天命绝配]！你家呢？」 | `/pages/home/home` |
| Result（无匹配） | 「我家[猫咪/修勾]是[元气小太阳猫]，[⭐传说款]！你家呢？」 | `/pages/home/home` |

- 分享路径**始终回到首页**（确保新用户完整体验）
- 分享图片：建议自定义 5:4 比例封面图

**分享到朋友圈（onShareTimeline）**：
- 标题精简到 20 字以内
- 单页模式分享

### 6.2 海报裂变路径

```
用户完成测试
  ↓
Result 页 → 点击"生成海报"
  ↓
Poster 页 → 生成 9:16 海报
  ↓
保存到相册 → 手动发朋友圈 / 微信群
  ↓
他人看到海报 → 扫小程序码 → 进入 Home → 测试 → 生成海报
  ↓
（裂变循环）
```

**关键转化要素**：
- 海报**必须**包含小程序码（预生成静态码图或 `wx.getQRCode`）
- 海报底部 `posterCTA` 挑衅式引导语制造参与冲动（如"你家猫比我的稀有吗？"）
- 稀有度标签驱动炫耀分享（传说款 3% 自带社交货币属性）

### 6.3 社交传播文案

每个人格类型内置两套传播文案：

| 字段 | 用途 | 使用场景 |
|------|------|---------|
| `circleText` | 纯人格朋友圈文案 | Result 页（无匹配时）「复制文案」 |
| `matchCircleText` | 含配对的朋友圈文案 | Result 页（有匹配时）「复制文案」 |

复制时自动附加话题标签：`#喵汪人格测试 #PETI人格测试`

**文案设计原则**：
- 第一人称视角（"我家猫/修勾"）
- 自嘲 / 玩梗口吻
- 末尾带 emoji 增加亲和力
- 留悬念引发好奇（"你也来测测？"）

### 6.4 增长漏斗（参考指标）

```
曝光（朋友圈/群看到海报）
  ↓  扫码率（目标 > 15%）
进入首页
  ↓  开始测试率（目标 > 80%）
开始答题
  ↓  完成率（目标 > 90%，20 题不算多）
看到结果
  ↓  生成海报率（目标 > 40%）
保存海报
  ↓  实际发布率（目标 > 20%）
发朋友圈/群 → 新一轮曝光
```

---

### 6.5 广告变现设计

#### 6.5.1 接入方式

采用**自主开发接入**（非免开发智能接入），确保对广告位置和触发时机的精确控制，避免平台自动插入广告干扰核心裂变链路。

#### 6.5.2 广告位规划（A + D 方案）

| 方案 | 位置 | 广告类型 | 触发时机 | 对裂变的影响 |
|------|------|---------|---------|------------|
| A | Result 结果页底部，CTA 按钮上方 | Banner 广告 | 页面加载后自动展示 | 几乎无影响（结果已展示，用户注意力在内容上） |
| D | Poster 海报保存成功后 | 插屏广告 | `saveImageToPhotosAlbum` 成功回调中主动触发 | 无影响（用户已获取全部价值） |

#### 6.5.3 广告位置示意

**方案 A — Result 页 Banner**：

```
├──────────────────────────────┤
│                              │
│  ┌────────────────────────┐  │
│  │ 🎨 生成我的专属海报      │  │  ← 主 CTA（不被广告遮挡）
│  └────────────────────────┘  │
│                              │
│  🔄 再测一次    📋 复制文案   │  ← 次级操作
│                              │
│  ┌────────────────────────┐  │
│  │     Banner 广告位        │  │  ← 广告位 A（页面底部，不影响核心操作）
│  └────────────────────────┘  │
│                              │
│  📋 免责声明                  │
│                              │
└──────────────────────────────┘
```

**方案 D — 保存后插屏**：

```
用户点击"保存到相册"
  ↓
Canvas 导出 + 保存成功
  ↓
显示"保存成功"Toast
  ↓ 500ms 延迟
弹出插屏广告（用户可关闭）
  ↓
广告关闭后回到海报页面（无任何状态变化）
```

#### 6.5.4 广告独立开关（流量主未开通适配）

由于当前尚未开通流量主，广告功能需支持**独立开关**——Banner 和插屏可单独启停，开通后仅需改对应开关即可启用：

```javascript
// config/adConfig.js
var adConfig = {
  banner: {
    // ★ Banner 独立开关：false = 不渲染 Banner 广告
    enabled: false,
    result: 'adunit-xxxxxxxx'     // 结果页 Banner 广告位 ID
  },
  interstitial: {
    // ★ 插屏独立开关：false = 不创建插屏实例
    enabled: false,
    posterSave: 'adunit-yyyyyyyy' // 海报保存后插屏广告位 ID
  }
}
module.exports = adConfig
```

**开关生效逻辑**：
- `banner.enabled === false` 时：Result 页不渲染 `<ad>` 组件
- `interstitial.enabled === false` 时：Poster 页不创建插屏实例
- 两个开关互不影响，可独立启停
- 开通流量主后：按需将对应 `enabled` 改为 `true` + 替换真实 adUnitId

```xml
<!-- pages/result/result.wxml — 条件渲染广告 -->
<ad wx:if="{{adEnabled}}" unit-id="{{adUnitId}}" ad-type="banner"
    binderror="onAdError" bindclose="onAdClose"></ad>
```

```javascript
// pages/result/result.js
var adConfig = require('../../config/adConfig')
Page({
  data: {
    adEnabled: adConfig.banner.enabled,
    adUnitId: adConfig.banner.result
  },
  onAdError: function () {
    // 广告加载失败 → 静默隐藏，不影响用户体验
    this.setData({ adEnabled: false })
  }
})
```

#### 6.5.5 实现要点

**Banner 广告（方案 A）**：
- 组件：`<ad unit-id="{{adUnitId}}" ad-type="banner" />`
- 位置：Result 页 WXML 底部，CTA 和次级操作按钮下方
- 容错：监听 `binderror` 事件，广告加载失败时 `setData({ adEnabled: false })` 隐藏容器
- 不影响首屏加载（广告异步加载）
- **广告唤起失败绝不中断用户体验**

**插屏广告（方案 D）**：
- API：`wx.createInterstitialAd({ adUnitId: 'adunit-yyy' })`
- 在 Poster 页 `onLoad` 中：仅当 `adConfig.interstitial.enabled === true` 时预创建实例
- 保存成功后 500ms 延迟调用 `.show()`（给用户消化"保存成功"提示的时间）
- `.show()` 失败静默处理（广告未加载完、频次限制、未开通等情况不阻塞用户）
- 用户关闭广告后无任何后续操作（不跳转、不弹窗）
- **插屏创建/展示全程 try-catch 包裹，任何异常静默吞掉**

```javascript
// pages/poster/poster.js — 安全的插屏广告逻辑
var adConfig = require('../../config/adConfig')
Page({
  onLoad: function () {
    if (adConfig.interstitial.enabled) {
      try {
        this._interstitialAd = wx.createInterstitialAd({
          adUnitId: adConfig.interstitial.posterSave
        })
      } catch (e) { /* 静默 */ }
    }
  },
  _showAdAfterSave: function () {
    if (!this._interstitialAd) return
    var self = this
    setTimeout(function () {
      try {
        self._interstitialAd.show().catch(function () { /* 静默 */ })
      } catch (e) { /* 静默 */ }
    }, 500)
  },
  onUnload: function () {
    // 释放广告实例
    if (this._interstitialAd) {
      this._interstitialAd.destroy && this._interstitialAd.destroy()
      this._interstitialAd = null
    }
  }
})
```

#### 6.5.6 禁入区域（红线）

以下页面/时机**严禁**出现任何形式的广告：

| 禁入区域 | 理由 |
|---------|------|
| Home 首页 | 品牌第一印象，广告损害品质感 |
| Quiz 答题过程中 | 打断心流，导致答题放弃 |
| 答题完成 → 结果展示之间 | 惩罚用户行为，杀死裂变 |
| Result 页匹配度区域 | 干扰核心情绪高点 |
| Poster 海报 Canvas 内容中 | 污染用户生成的社交素材 |
| 海报生成等待过程中 | 用户正在期待，强制广告体验极差 |

> **注意**：广告 ID 需在微信公众平台 → 流量主 → 广告管理 中创建获取，开发阶段 `enabled: false` 即可跳过。

---

## 第七章 · 合规与风险规避

### 7.1 商标法风险与 PETI 策略

#### 7.1.1 风险背景

- "MBTI" 是 The Myers-Briggs Company 的注册商标
- 在中国大陆，相关商标由代理机构持有
- 未经授权在商业产品中使用"MBTI"名称可能面临侵权风险
- 近年来已有多起针对"MBTI 测试"类小程序的商标维权案例

#### 7.1.2 规避策略

本产品自创 **PETI**（Pet Personality Type Indicator）术语体系，完全独立于 MBTI 品牌。

**执行规范**：

| 范围 | 要求 | 检查方式 |
|------|------|---------|
| 产品名称 | 不含"MBTI" | ✅「喵汪人格测试」 |
| 所有页面文案 | 不出现"MBTI" | 全局文本搜索 |
| 数据配置文件 | 替换所有 MBTI 引用 | 见下方修复清单 |
| 分享标题/描述 | 使用"PETI" | 代码审查 |
| 海报文案 | 不出现"MBTI" | 海报审查 |
| 小程序名称/简介 | 不含"MBTI" | 提审前检查 |
| 代码注释 | 建议一并替换 | 代码审查 |

**数据文件修复清单**（开发首要任务）：

| 文件 | 字段 | 当前值 | 替换为 |
|------|------|--------|--------|
| catData.js | brand.title | "猫咪 MBTI 人格测试" | "猫咪 PETI 人格测试" |
| catData.js | brand.shareTitle | "测你家猫咪是什么 MBTI 人格？" | "测你家猫咪是什么 PETI 人格？" |
| catData.js | brand.shareDesc | "...和你 MBTI 灵魂配对" | "...和主人灵魂配对" |
| catData.js | 文件注释第 2 行 | "猫咪 MBTI 人格测试" | "猫咪 PETI 人格测试" |
| dogData.js | brand.title | "狗狗 MBTI 人格测试" | "狗狗 PETI 人格测试" |
| dogData.js | brand.shareTitle | "测你家狗狗是什么 MBTI 人格？" | "测你家狗狗是什么 PETI 人格？" |
| dogData.js | brand.shareDesc | "...和你 MBTI 灵魂配对" | "...和主人灵魂配对" |
| dogData.js | 文件注释第 2 行 | "狗狗 MBTI 人格测试" | "狗狗 PETI 人格测试" |

> `masterMbtiList` 变量名将一并重命名为 `masterPetiList`，实现全面去 MBTI 化。

#### 7.1.3 额外防御

- 不在任何用户可见处出现"Myers-Briggs""迈尔斯-布里格斯"
- 4 字母代码（ENFP 等）属心理学公共领域知识，不受商标保护
- 4 维度概念（外向/内向等）属心理学公共知识，非 MBTI 专属
- 免责声明中明确 PETI 为独立原创体系

### 7.2 心理测试内容合规

#### 7.2.1 法规背景

- 中国《心理咨询师管理办法》：非专业机构不得提供心理诊断服务
- 心理测试类内容需避免专业性暗示

#### 7.2.2 合规策略

| 原则 | 执行方式 |
|------|---------|
| 定性为"趣味娱乐" | 使用"趣味人格测试""性格小测试"等措辞，避免"心理测试""人格评估" |
| 不做专业性声明 | 不引用心理学论文/理论作为背书，不声称科学依据 |
| 不做决策建议 | 不暗示结果可用于医疗/教育/就业决策 |
| 娱乐化表达 | 结果用轻松玩梗口吻描述（已在数据中体现） |
| 正向描述 | 所有 16 种类型均为正面描述，无负面标签 |

### 7.3 微信小程序平台审核红线

| 红线 | 本产品状态 | 应对 |
|------|-----------|------|
| 诱导分享 | ✅ 无（结果直接展示，不需分享解锁） | — |
| 诱导关注 | ✅ 无 | — |
| UGC 内容安全 | ✅ 无 UGC（用户不输入文字，照片仅本地使用） | — |
| 类目选择 | 🔴 需正确配置 | 选择「工具 → 信息查询」或「生活服务」，**避免**「医疗健康」「教育」 |
| 小程序名称 | 🟡 注意 | 「喵汪人格测试」含"测试"字样，部分类目下可能被要求补充资质。建议提审时选「工具」类目，简介中强调"趣味""娱乐"定性，降低审核风险 |
| 简介描述 | 🟡 需谨慎撰写 | 突出"宠物趣味性格分析"，避免"心理"相关词汇 |
| 隐私协议 | 🔴 需配置 | 声明相册/相机权限用途（即使不采集个人信息） |
| 海报内容 | 🟡 注意 | 海报中仅允许小程序码，不得包含外部链接或二维码 |

**隐私协议需声明的权限**：

| 权限 | 用途说明 | 触发场景 |
|------|---------|---------|
| `scope.writePhotosAlbum` | 保存海报图片到相册 | Poster 页保存海报 |
| `scope.camera` / 相册访问 | 选择宠物照片用于海报 | Result 页上传照片 |

### 7.4 用户隐私保护

**本产品的隐私优势（纯前端无后端）**：

| 检查项 | 状态 |
|--------|------|
| 不采集用户个人信息（姓名/手机/微信号） | ✅ |
| 不使用 `wx.getUserProfile`（不获取头像/昵称） | ✅ |
| 不使用 `wx.getLocation`（不获取位置） | ✅ |
| 不使用第三方数据统计 SDK | ✅ |
| 不上传用户照片到任何服务器 | ✅ |
| 不缓存测试结果到本地存储 | ✅ |
| 照片仅存于 tempFilePath，关闭即清除 | ✅ |

### 7.5 版权与肖像权

| 风险项 | 规避措施 |
|--------|---------|
| 插画素材 | 必须原创或获合法商用授权；禁止使用未授权的网络图片 |
| AI 生成插画 | 保留完整生成记录（prompt + 工具 + 日期）备查 |
| 字体 | 仅使用系统字体（PingFang SC），无字体版权风险 |
| 题目文案 | 全部原创，不照搬任何已有测试题目 ✅ |
| 人格描述 | 全部原创，不搬运已有 MBTI 解析内容 ✅ |
| 宠物照片 | 用户自行上传，仅本地使用，不涉及肖像权 |

### 7.6 免责声明文案

#### 首页底部（简版，常驻显示）

> 🐾 本测试为趣味娱乐内容，PETI 为「喵汪人格测试」原创宠物人格指标体系，结果仅供参考和娱乐，不构成任何专业建议。每一只毛孩子都是独一无二的！

#### 结果页底部（详版，可折叠展开）

> **📋 关于 PETI 测试**
> 1. PETI（Pet Personality Type Indicator）是「喵汪人格测试」原创的宠物人格分类体系，与任何专业心理学评估工具无关。
> 2. 测试结果基于日常行为观察的趣味分析，不具有科学诊断效力，不应作为宠物健康、行为矫正或医疗决策的依据。
> 3. 如果您的宠物存在行为异常，请咨询专业兽医或动物行为学家。
> 4. 本小程序不采集任何个人信息，您上传的照片仅在本地生成海报使用，不会上传至任何服务器，关闭小程序后自动清除。

#### 海报底部（微文案，极小字）

> PETI 趣味测试 · 仅供娱乐 · 喵汪人格测试

### 7.7 合规自查清单

| # | 检查项 | 通过标准 |
|---|--------|---------|
| 1 | 全部用户可见文本不含"MBTI" | 全局搜索 |
| 2 | 全部用户可见文本不含"Myers-Briggs" | 全局搜索 |
| 3 | 不含"心理测试""心理诊断""人格评估" | 全局搜索 |
| 4 | 首页免责声明存在且可见 | 视觉审查 |
| 5 | 结果页免责声明存在 | 视觉审查 |
| 6 | 海报含免责微文案 | 海报输出审查 |
| 7 | 插画素材有原创证明或授权文件 | 文件归档 |
| 8 | 无诱导分享机制 | 功能审查 |
| 9 | 不获取用户个人信息 | 代码审查 |
| 10 | 照片不上传服务器 | 代码审查 |
| 11 | 小程序类目不含"医疗""教育" | 后台配置 |
| 12 | 隐私协议已配置（相册/相机权限说明） | 后台配置 |
| 13 | 海报仅含小程序码，无外部链接 | 海报输出审查 |
| 14 | 所有 16 种人格描述为正向，无负面标签 | 内容审查 |

---

## 第八章 · 开发交付规范

### 8.1 开发里程碑

| 阶段 | 内容 |
|------|------|
| P0 | 项目初始化 + 路由配置 + 数据文件 MBTI→PETI 修复 + adConfig 开关文件 |
| P1 | Home 首页（物种选择 + 截图识别入口保障） |
| P2 | Quiz 答题页 + 计分算法 + 主人类型选择步骤 |
| P3 | Result 结果页（含条件匹配展示 + 照片上传 + Banner 广告位 + 防深链接） |
| P4 | Poster 海报页（Canvas 2D 绘制 + 资源释放 + 插屏广告 + 防深链接） |
| P5 | 分享配置（所有入口回首页）+ 视觉打磨 + 合规文案嵌入 |
| P6 | 健壮性验证（异常兜底 + 内存释放 + 广告失败静默）+ 真机测试 + 提审 |

### 8.2 兼容性要求

| 项 | 要求 |
|---|------|
| 最低基础库 | 2.25.0+（Canvas 2D 支持） |
| iOS 适配 | iPhone SE ~ iPhone 15 Pro Max |
| Android 适配 | 主流机型（≥ 720p） |
| 布局方案 | rpx 单位，确保不同屏幕尺寸一致 |
| Canvas 兼容 | 低端 Android 加载态 + 分步绘制 |

### 8.3 性能指标

| 指标 | 目标 |
|------|------|
| 首屏加载 | < 1.5s |
| 答题切换延迟 | < 100ms |
| 海报生成时间 | < 3s |
| 小程序包大小 | < 2MB |

### 8.4 关键测试用例

| # | 场景 | 预期结果 |
|---|------|---------|
| 1 | 猫版 20 题全选 A | 计算出正确结果码，展示对应人格 |
| 2 | 狗版 20 题全选 B | 计算出正确结果码，展示对应人格 |
| 3 | 同一结果码切换猫/狗 | 展示不同的 petName/description（如 ENFP → 元气小太阳猫 vs 元气满满修勾） |
| 4 | 选择主人类型 + bestMatch | 结果页显示匹配区域，高分（93-98）+ 对应 tag |
| 5 | 选择主人类型 + 非 bestMatch | 根据字母匹配数显示对应等级（日常合拍/欢喜冤家/反差磨合） |
| 6 | 跳过主人类型选择 | 结果页不显示匹配区域，海报不含匹配信息 |
| 7 | 无照片生成海报（有匹配） | 占位图 + 匹配度信息，海报正常生成 |
| 8 | 有照片生成海报（无匹配） | 照片裁剪嵌入 + 无匹配区域，海报正常生成 |
| 9 | 保存海报权限拒绝 | 弹窗引导到设置页 |
| 10 | 重测流程 | 弹窗确认 → redirectTo Quiz → 无法返回上一个结果页 |
| 11 | 上一题功能 | 回退后显示之前选择，改选后继续答题，最终结果正确 |
| 12 | 分享卡片（有匹配） | 标题含匹配信息，路径回到首页 |
| 13 | 全局文本搜索"MBTI" | 0 个匹配 |
| 14 | 首页免责声明 | 可见且内容正确 |
| 15 | 广告 banner.enabled=false | 结果页无 Banner 渲染 |
| 16 | 广告 interstitial.enabled=false | 海报保存后无插屏弹出 |
| 17 | 广告开关 true + 广告加载失败 | 页面正常显示，无报错，无中断 |
| 18 | 从分享卡片进入 | 始终到达首页，不可见他人结果 |
| 18 | 从截图识别进入 | 始终到达首页 |
| 19 | Canvas 生成海报后 | 内存释放，无残留图片对象 |

### 8.5 性能与健壮性规范

#### 8.5.1 资源释放

| 资源 | 释放时机 | 释放方式 |
|------|---------|---------|
| Canvas Image 对象 | 海报生成完成（success/fail/catch 三条路径） | `img.src = ''; img.onload = null; img.onerror = null` |
| Canvas GPU 内存 | 离开 Poster 页（onUnload） | `canvas.width = 0; canvas.height = 0` |
| 插屏广告实例 | 离开 Poster 页（onUnload） | `ad.destroy && ad.destroy(); ad = null` |
| tempFilePath 照片 | 不主动清理（微信框架自动回收） | 小程序关闭时框架统一清理 |
| setTimeout 定时器 | onUnload | `clearTimeout(timer); timer = null` |

```javascript
// Poster 页 onUnload 统一清理
onUnload: function () {
  // 1. Canvas 释放
  if (this._canvasImg) {
    this._canvasImg.src = ''
    this._canvasImg.onload = null
    this._canvasImg.onerror = null
    this._canvasImg = null
  }
  if (this._canvas) {
    this._canvas.width = 0
    this._canvas.height = 0
    this._canvas = null
  }
  // 2. 广告实例释放
  if (this._interstitialAd) {
    this._interstitialAd.destroy && this._interstitialAd.destroy()
    this._interstitialAd = null
  }
  // 3. 定时器释放
  if (this._adTimer) {
    clearTimeout(this._adTimer)
    this._adTimer = null
  }
}
```

#### 8.5.2 防闪退策略

| 风险点 | 防御措施 |
|--------|---------|
| Canvas 绘制异常 | 整个绘制流程 try-catch 包裹，catch 时显示兜底文案 |
| 图片加载超时 | `img.onload` 设 5s timeout，超时用占位图兜底 |
| 广告 API 异常 | 所有广告操作 try-catch，异常静默吞掉 |
| setData 频率过高 | 答题切换合并动画相关 setData 为单次调用 |
| 内存压力 | 注册 `wx.onMemoryWarning`，收到警告时释放 Canvas 缓存 |

```javascript
// app.js — 内存警告监听
onLaunch: function () {
  if (wx.onMemoryWarning) {
    wx.onMemoryWarning(function (res) {
      console.warn('[Memory] level:', res.level)
      // 无全局缓存需要清理（纯前端无存储），此处仅做日志
    })
  }
}
```

#### 8.5.3 异常兜底文案

所有可能失败的操作都需要用户友好的兜底提示：

| 场景 | 兜底文案 | 处理方式 |
|------|---------|---------|
| 海报生成失败 | "海报生成失败，请重试" | Toast 提示，按钮恢复可点击 |
| 图片加载失败 | 静默使用占位图 | 不弹提示，用户无感知 |
| 保存相册失败（非权限） | "保存失败，请重试" | Toast 提示 |
| 保存相册失败（权限拒绝） | "需要您授权相册权限才能保存哦" | Modal 引导到设置页 |
| 广告加载失败 | 不显示任何提示 | 静默隐藏广告区域 |
| 广告展示失败 | 不显示任何提示 | 静默跳过，流程继续 |
| 分享失败 | "分享失败，请重试" | Toast 提示 |
| 复制文案失败 | "复制失败，请重试" | Toast 提示（极低概率） |

**核心原则**：广告相关的任何失败**绝不**向用户展示错误信息，绝不中断用户正常使用流程。

#### 8.5.4 Canvas 安全绘制模式

```javascript
// posterHelper.js — 安全绘制包装器
function safeDraw(canvas, ctx, drawFn, fallbackFn) {
  try {
    drawFn(canvas, ctx)
  } catch (e) {
    console.error('[Poster] draw error:', e)
    if (fallbackFn) {
      try { fallbackFn(canvas, ctx) } catch (e2) { /* 兜底也失败，放弃 */ }
    }
  }
}

// 图片加载安全封装（带超时）
function loadImage(canvas, src, timeout) {
  var _timeout = timeout || 5000
  return new Promise(function (resolve, reject) {
    var img = canvas.createImage()
    var timer = setTimeout(function () {
      img.onload = null
      img.onerror = null
      reject(new Error('timeout'))
    }, _timeout)

    img.onload = function () {
      clearTimeout(timer)
      resolve(img)
    }
    img.onerror = function () {
      clearTimeout(timer)
      reject(new Error('load failed'))
    }
    img.src = src
  })
}
```

### 8.6 入口控制与路由安全

#### 8.6.1 核心原则

**所有外部入口一律进入首页**，确保：
- 他人不可见测试结果（Result/Poster 页不可通过外部链接直接访问）
- 新用户获得完整体验（从首页开始选择物种→答题→结果）
- 不存在"深链接"暴露中间页面的风险

#### 8.6.2 外部入口场景

| 入口方式 | 进入位置 | 实现方式 |
|---------|---------|---------|
| 微信分享卡片（好友/群） | Home 首页 | `onShareAppMessage` 的 `path` 始终为 `/pages/home/home` |
| 朋友圈分享 | Home 首页 | `onShareTimeline` 不携带 query 参数 |
| 海报扫小程序码 | Home 首页 | 小程序码配置 scene → 解析后 redirectTo Home |
| 截图识别进入（聊天图片左下角入口） | Home 首页 | 框架默认进入 `app.json` 的 `pages[0]`，即 Home 页 |
| 搜索/发现进入 | Home 首页 | 默认行为 |

#### 8.6.3 截图识别（图片打开小程序）

微信对话框中的小程序截图，用户点击图片左下角可直接打开小程序。此行为由微信框架控制，默认进入 `app.json` 中 `pages` 数组的第一个页面。

**确保方式**：`app.json` 的 `pages` 数组第一项**必须是** `/pages/home/home`。

```json
{
  "pages": [
    "pages/home/home",
    "pages/quiz/quiz",
    "pages/result/result",
    "pages/poster/poster"
  ]
}
```

#### 8.6.4 防深链接保护

即使有人手动构造带 query 的 URL 尝试直接进入 Result/Poster 页，也需在页面 `onLoad` 中做防御：

```javascript
// pages/result/result.js & pages/poster/poster.js
onLoad: function (options) {
  // 页面栈仅 1 层 = 外部直接进入（非正常 navigateTo/redirectTo）
  var pages = getCurrentPages()
  if (pages.length <= 1) {
    wx.redirectTo({ url: '/pages/home/home' })
    return
  }
  // 正常逻辑...
}
```

**保护逻辑说明**：
- 正常流程中 Result 页由 Quiz 页 `redirectTo` 跳入，此时页面栈至少有 2 层（Home + Result）
- 正常流程中 Poster 页由 Result 页 `navigateTo` 跳入，页面栈有 3 层
- 如果页面栈仅 1 层，说明是从外部直接进入，立即重定向到首页
- 这确保了**任何人通过任何分享链接进入，都只能看到首页**，无法看到他人测评结果

#### 8.6.5 分享路径配置汇总

```javascript
// 所有页面的 onShareAppMessage 统一路径
onShareAppMessage: function () {
  return {
    title: '来喵汪人格测试，测测你家毛孩子的隐藏人格！',
    path: '/pages/home/home',     // ★ 始终回首页
    imageUrl: '/assets/images/share-cover.png'
  }
}

// 朋友圈分享
onShareTimeline: function () {
  return {
    title: '测测你家毛孩子是什么人格？',
    query: ''                      // ★ 无参数，进入首页
  }
}
```

---

## 附录 A · 已有文件清单

| 文件 | 路径 | 状态 |
|------|------|------|
| 猫版配置 | `config/catData.js` | ✅ 已创建（PETI 修复完成 + 字段完备） |
| 狗版配置 | `config/dogData.js` | ✅ 已创建（PETI 修复完成 + 字段完备） |
| 广告配置 | `config/adConfig.js` | ✅ 已创建（banner/interstitial 独立开关） |
| 海报绘制 | `utils/posterHelper.js` | ✅ 已创建（Canvas 2D 绘制 + 7 主题 + 动态高度） |
| 计分算法 | `utils/scorer.js` | ✅ 已创建 |

---

## 附录 B · 数据文件更新记录

以下更新已全部完成：

### catData.js 已完成修复

1. ✅ 第 2 行注释：`猫咪 MBTI 人格测试` → `猫咪 PETI 人格测试`
2. ✅ `brand.title`：`'猫咪 MBTI 人格测试'` → `'猫咪 PETI 人格测试'`
3. ✅ `brand.shareTitle`：`'测你家猫咪是什么 MBTI 人格？'` → `'测你家猫咪是什么 PETI 人格？'`
4. ✅ `brand.shareDesc`：`'...和你 MBTI 灵魂配对'` → `'...和主人灵魂配对'`
5. ✅ `masterMbtiList` → 重命名为 `masterPetiList`
6. ✅ 新增 `brand.posterCTA`（3 条挑衅式引导语）
7. ✅ 每个 personality 新增 `petComment`（16 个）
8. ✅ 移除 `brand.posterSlogans`（已废弃）
9. ✅ ISFJ petName 优化：`岁月静好猫` → `专一挂件猫`

### dogData.js 已完成修复

1. ✅ 第 2 行注释：`狗狗 MBTI 人格测试` → `狗狗 PETI 人格测试`
2. ✅ `brand.title`：`'狗狗 MBTI 人格测试'` → `'狗狗 PETI 人格测试'`
3. ✅ `brand.shareTitle`：`'测你家狗狗是什么 MBTI 人格？'` → `'测你家狗狗是什么 PETI 人格？'`
4. ✅ `brand.shareDesc`：`'...和你 MBTI 灵魂配对'` → `'...和主人灵魂配对'`
5. ✅ `masterMbtiList` → 重命名为 `masterPetiList`
6. ✅ 新增 `brand.posterCTA`（3 条挑衅式引导语）
7. ✅ 每个 personality 新增 `petComment`（16 个）
8. ✅ 移除 `brand.posterSlogans`（已废弃）
9. ✅ ISFJ petName 优化：`忠诚守护修勾` → `死心眼等门修勾`
10. ✅ ESFJ petName 优化：`贴心跟班修勾` → `甩不掉小尾巴修勾`
11. ✅ ISTJ petName 优化：`靠谱老实修勾` → `按时打卡修勾`
12. ✅ ENFJ petName 优化：`暖心天使修勾` → `氛围感暖男修勾`

### petComment 参考数据

**catData.js — 16 个人格的 petComment**：

| CODE | petComment |
|------|-----------|
| ESTJ | 本喵允许你继续铲屎了 |
| ESTP | 还不快来跟本喵社交？ |
| ESFJ | 你今天看起来需要本喵蹭蹭 |
| ESFP | 拍我可以，先给零食 |
| ISTJ | 定时投喂，不接受加班 |
| ISTP | 人类，你清醒一点 |
| ISFJ | 只要你在，就够了喵 |
| ISFP | 别打扰本喵的艺术人生 |
| ENTJ | 一切尽在本喵掌控之中 |
| ENTP | 下一个实验对象就是你 |
| ENFJ | 过来，本喵给你暖暖 |
| ENFP | 快来陪本喵玩！不许拒绝！ |
| INTJ | 我选择你，不是因为你优秀 |
| INTP | 人类在忙什么？算了不关心 |
| INFJ | 你的心事，本喵全知道 |
| INFP | 小心轻放，本喵很珍贵的 |

**dogData.js — 16 个人格的 petComment**：

| CODE | petComment |
|------|-----------|
| ESTJ | 有本汪在，谁都别想欺负你 |
| ESTP | 走！出门交朋友去！ |
| ESFJ | 你去哪我跟哪，别想甩掉我 |
| ESFP | 看我这么可爱，零食呢？ |
| ISTJ | 定时吃饭遛弯，不接受变动 |
| ISTP | 本汪今天心情好，允许你摸一下 |
| ISFJ | 等你回来，是我每天最重要的事 |
| ISFP | 出门？不了，我选择躺平 |
| ENTJ | 你以为你在训练我？天真 |
| ENTP | 今天的拆家计划已排满 |
| ENFJ | 交给本汪，包你今天心情好 |
| ENFP | 快快快！出去玩！现在！马上！ |
| INTJ | 本汪在思考，请勿打扰 |
| INTP | 动？不存在的，选择原地躺 |
| INFJ | 你累了对吧？靠过来吧 |
| INFP | 世界有点吓人，但有你就不怕了 |

### 验证方式

1. **MBTI 清除验证**：`grep -r "MBTI" config/` → 预期结果为 **0 匹配**
2. **字段完整性验证**：
   - 两文件均包含 `brand.posterCTA`（各 3 条）
   - 两文件 `personalities` 下每个 CODE 都包含 `petComment`（各 16 个）
   - `masterPetiList` 变量名替换完成
   - `posterSlogans` 已从两文件中移除
3. **JS 语法验证**：`node -c config/catData.js && node -c config/dogData.js` → 无报错
