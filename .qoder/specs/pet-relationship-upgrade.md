# 《它眼里的你》产品重塑方案

## Context

当前产品《喵汪人格测试》的传播点是"我家宠物是什么性格"，但真正驱动转发的不是人格标签，而是关系洞察——"原来它不是粘人，是把我当安全感"。本次重塑将产品从「宠物人格测试」升级为「人宠关系测试」，核心变更：

- 产品重命名为《它眼里的你》
- 题目从"宠物行为观察"改为"人宠互动场景"
- 结果主角从"宠物人格昵称"改为"关系称号 + 戳心金句"
- 去掉"选主人类型"步骤，答题直出关系结果
- 稀有度保留 + 新增感性标签，双重分享驱动

---

## 一、新维度体系

### 4 维度关系模型

| 维度 | 正极 | 负极 | 描述 |
|------|------|------|------|
| S/F | S=避风港型 | F=自由伙伴型 | 你是它的安全堡垒，还是自由探索的同行者？ |
| H/L | H=浓情蜜意 | L=清淡自在 | 情感浓度是黏腻热烈，还是各自舒适？ |
| C/P | C=照护者 | P=平等伙伴 | 你更像宠溺的家长，还是一起生活的室友？ |
| D/R | D=冒险探索 | R=安稳日常 | 日常是充满新鲜感，还是踏实的陪伴循环？ |

### 计分系统：每题 4 选项 × 覆盖 2 维度

**核心机制**：每道题是一个互动场景，4 个选项分别对应两个维度的 2×2 组合。

**示例**：一道题覆盖 S/F 维度 + H/L 维度
```
场景：你出门前，它蹲在门口盯着你——

A: 蹲下来抱抱它说"等我回来"再出门     → S + H（避风港 + 浓情）
B: 摸摸头正常出门，心里知道它会等你     → S + L（避风港 + 清淡）
C: 它自己玩自己的，你凑过去亲一口再走   → F + H（自由 + 浓情）
D: 你们各忙各的，你正常出门它继续躺着   → F + L（自由 + 清淡）
```

**维度配对分布**（6 种配对 × 20 题）：

| 配对 | 题数 | SF覆盖 | HL覆盖 | CP覆盖 | DR覆盖 |
|------|------|--------|--------|--------|--------|
| SF+HL | 3 | 3 | 3 | - | - |
| SF+CP | 4 | 4 | - | 4 | - |
| SF+DR | 3 | 3 | - | - | 3 |
| HL+CP | 3 | - | 3 | 3 | - |
| HL+DR | 4 | - | 4 | - | 4 |
| CP+DR | 3 | - | - | 3 | 3 |
| **合计** | **20** | **10** | **10** | **10** | **10** |

每个维度被 10 道题覆盖，每道题给该维度正极或负极 +1 分。最终取多数方判定结果字母。

**平局处理**：5-5 时取正极（S/H/C/D），概率较低且偏向"更有故事性"的结果。

**计分算法**：
```javascript
function calculate(answers, questions) {
  var counts = { S:0, F:0, H:0, L:0, C:0, P:0, D:0, R:0 }
  for (var i = 0; i < answers.length; i++) {
    var q = questions[answers[i].questionId]
    var score = q.options[answers[i].selected].score  // 如 'SH'
    counts[score[0]] += 1  // 第一个字母 +1
    counts[score[1]] += 1  // 第二个字母 +1
  }
  return (counts.S >= counts.F ? 'S' : 'F')
       + (counts.H >= counts.L ? 'H' : 'L')
       + (counts.C >= counts.P ? 'C' : 'P')
       + (counts.D >= counts.R ? 'D' : 'R')
}
```

### 16 种关系称号

| 代码 | 关系称号（猫版参考） | 稀有度 | 感性标签 |
|------|---------------------|--------|---------|
| SHCD | 行走的安全感 | 传说款 3% | 羡慕型 |
| SHCR | 温暖发电站 | 独特款 15% | 治愈型 |
| SHPD | 狂热冒险搭子 | 珍稀款 8% | 勇敢型 |
| SHPR | 贴心小太阳 | 大众款 25% | 温暖型 |
| SLCD | 沉默守护者 | 珍稀款 8% | 深情型 |
| SLCR | 靠谱铲屎官 | 大众款 25% | 踏实型 |
| SLPD | 安静领航员 | 独特款 15% | 稳重型 |
| SLPR | 高冷同居室友 | 独特款 15% | 默契型 |
| FHCD | 宠溺甜心 | 独特款 15% | 甜蜜型 |
| FHCR | 专属充电宝 | 珍稀款 8% | 能量型 |
| FHPD | 人生搭子 | 传说款 3% | 灵魂型 |
| FHPR | 快乐共生体 | 大众款 25% | 快乐型 |
| FLCD | 会开罐头的室友 | 传说款 3% | 反差型 |
| FLCR | 平行世界管理员 | 独特款 15% | 佛系型 |
| FLPD | 各自精彩的灵魂 | 珍稀款 8% | 独立型 |
| FLPR | 命中注定的同框 | 传说款 3% | 缘分型 |

---

## 二、新数据结构

### 顶层配置（catData/dogData）

```javascript
{
  petType: 'cat' | 'dog',
  brand: {
    productName: string,   // '它眼里的你'
    title: string,         // 猫版/狗版标题
    slogan: string,        // '原来你在它心里，是这样的存在'
    shareTitle: string,    // 分享卡片标题
    shareDesc: string,     // 分享描述
    posterCTA: string[]    // 海报引导语（3 条随机）
  },
  dimensions: {
    SF: { positive: string, negative: string },
    HL: { positive: string, negative: string },
    CP: { positive: string, negative: string },
    DR: { positive: string, negative: string }
  },
  questions: [{            // 20 道互动场景题，每题 4 选项覆盖 2 维度
    id: number,
    scene: string,         // 互动场景描述
    dimensions: string,    // 覆盖的维度对（如 'SF_HL'、'CP_DR'）
    options: [             // 4 个选项
      { text: string, score: string },  // score 为 2 字母，如 'SH'
      { text: string, score: string },  // 如 'SL'
      { text: string, score: string },  // 如 'FH'
      { text: string, score: string }   // 如 'FL'
    ]
  }],
  relationships: {         // 16 种关系（原 personalities 改名）
    [CODE]: {
      title: string,       // 关系称号（海报最大字）
      goldQuote: string,   // 金句（核心传播载体）
      rare: string,        // 稀有度标签
      rareLevel: string,   // 百分比
      posterBadge: string, // 海报徽章
      emotionTag: string,  // 感性标签（新增）
      posterTheme: string, // 主题色 key
      description: string, // 关系描述
      tips: string,        // 这段关系的小秘密
      petComment: string,  // 宠物评价这段关系
      circleText: string   // 朋友圈分享文案
    }
  }
}
```

### 删除的字段/对象
- `lowMatch` — 不再需要匹配兜底
- `masterPetiList` — 不再选主人类型
- `personality.bestMatch[]` / `score` / `tag` / `matchDesc` / `matchCircleText` — 匹配体系移除
- `personality.posterShort` — 被 `goldQuote` 替代
- `personality.petName` — 被 `title` 替代

---

## 三、文件变更清单

### 完全重写

| 文件 | 说明 |
|------|------|
| `config/catData.js` | 品牌 + 维度 + 20 题 + 16 种关系结果 |
| `config/dogData.js` | 同上，狗版差异化 |
| `utils/scorer.js` | 新维度字母 SFHLCPDR，删除 getMatch |

### 较大修改

| 文件 | 变更内容 |
|------|---------|
| `pages/quiz/quiz.js` | 删除 master 阶段；选项从 A/B 改为 0/1/2/3 索引；answers 记录格式适配 4 选项；20 题后直接 redirectTo result |
| `pages/quiz/quiz.wxml` | 删除 `stage==='master'` 区块；选项区从 2 个改为 4 个（2×2 或纵向排列） |
| `pages/quiz/quiz.wxss` | 删除 .master-* 样式；新增 4 选项布局样式 |
| `components/option-card/` | 适配 4 选项模式（原组件仅支持 A/B 两个，需改为支持数组循环渲染） |
| `pages/result/result.js` | personality → relationship 字段映射；删除 masterCode/matchInfo 逻辑；onCopyText 只用 circleText |
| `pages/result/result.wxml` | 展示层级重排：关系称号(大字)→ 金句 → 稀有度+感性标签 → 描述 → tips；删除匹配区 |
| `pages/poster/poster.js` | 删除 masterCode/showMatch/onToggleMatch；精简 draw 调用参数 |
| `pages/poster/poster.wxml` | 删除匹配 toggle 开关 |
| `utils/posterHelper.js` | 新布局：称号(44px) → pill(稀有度+感性标签) → 金句区(引号包裹) → 语录气泡 → 描述竖线 → tips 竖线；删除匹配区绘制 |

### 小幅修改

| 文件 | 变更 |
|------|------|
| `app.json` | navigationBarTitleText → "它眼里的你" |
| `pages/home/home.wxml` | 品牌名和按钮文案更新 |
| `pages/home/home.js` | onShareAppMessage 文案更新 |
| Spec 文档 | 全面更新反映新产品方向 |

### 不动

| 文件 | 原因 |
|------|------|
| `config/adConfig.js` | 广告逻辑独立于产品方向 |
| `app.js` | 仅有内存监听 |
| `components/progress-bar/` | 进度条通用，20 题不变 |

---

## 四、海报新布局

```
┌──────────────────────────────────────┐
│                                      │
│     ┌────────────────────────┐      │
│     │    宠物照片 320×320     │      │  ← 圆角裁剪
│     └────────────────────────┘      │
│                                      │
│       「行走的安全感」               │  ← 关系称号 (bold 44px, 最大字)
│                                      │
│  ╭─────────────────────────────╮    │
│  │ ⭐ 传说款 3% · 羡慕型       │    │  ← pill: 稀有度 + 感性标签
│  ╰─────────────────────────────╯    │
│                                      │
│  " 原来它不是粘人，                  │  ← 金句区 (28px, 居中)
│    是把我当安全感 "                  │     引号包裹，核心传播内容
│                                      │
│  ╭─────────────────────────────╮    │
│  │ 🐾「有你在，哪里都是家」    │    │  ← 宠物语录气泡
│  ╰─────────────────────────────╯    │
│                                      │
│  ┃ 🐾 在它眼里你是这样的       │    │  ← 左竖线 + 关系描述
│  ┃ 你是那个每天准点回家的人…   │    │
│                                      │
│  ┃ 💡 这段关系的小秘密         │    │  ← 左竖线 + tips
│  ┃ 它看似独立，其实每次你出门… │    │
│                                      │
│  ─────────────────────────────────── │
│  它眼里的你 · 人宠关系测试     (码) │  ← 底部品牌 + 小程序码
│  仅供娱乐                            │
│                                      │
└──────────────────────────────────────┘
```

---

## 五、数据流变更

**旧**：Home → Quiz(20题 + 选主人类型) → Result(?petType&resultCode&masterCode) → Poster

**新**：Home → Quiz(20题) → Result(?petType&resultCode) → Poster(?petType&resultCode&photoPath)

---

## 六、实施分步

| Phase | 内容 | 验证方式 |
|-------|------|---------|
| 1 | 重写 scorer.js（新维度字母 + 删 getMatch） | 控制台调用 calculate 确认输出正确 4 字母 |
| 2 | 重写 catData.js + dogData.js（品牌+维度+题目+结果） | require 后检查结构完整性 + node -c 语法校验 |
| 3 | 修改 quiz 页（删除 master 阶段，20题直出结果） | 跑通答题→跳转 |
| 4 | 修改 result 页（新字段映射+删匹配区+新展示层级） | 视觉验证 |
| 5 | 重写 posterHelper.js（新布局+删匹配绘制） | 生成海报并检查 |
| 6 | 修改 poster 页（删 toggle+精简参数） | 保存到相册验证 |
| 7 | 全局品牌替换（app.json/home/分享文案） | 全链路冒烟 |

---

## 七、内容创作工作量

本次重塑涉及大量内容创作（非纯技术工作）：

- 20 道互动场景题 × 4 选项 × 2 版本（猫/狗）= **160 条选项文案**
- 16 种关系结果 × 2 版本 = **32 组完整文案**（每组含：title、goldQuote、description、tips、petComment、circleText）
- 品牌文案更新（slogan、shareTitle 等）
- posterCTA 更新（3 条 × 2 版本）

建议：先完成猫版全部内容，确认调性和质量后再快速适配狗版。

---

## 验证方案

完成后需通过以下验证：
1. 猫版全链路：Home → 20题答完 → 直接出关系结果 → 生成海报 → wx.showShareImageMenu
2. 狗版全链路：同上
3. 海报视觉：关系称号为最大字、金句突出、稀有度+感性标签均展示
4. 广告正常：banner.enabled/interstitial.enabled 开关仍有效
5. 分享卡片：标题含"它眼里的你"相关文案，路径回首页
6. 代码质量：无 MBTI 残留、ES5 兼容、lazyCodeLoading 保持
