/**
 * 海报 Canvas 绘制工具
 * 适配字段：resultHeader / subtitle / tags / indices / keywords / friendComment
 */

var CANVAS_W = 750
var IMG_TIMEOUT = 5000
var PADDING = 56

var THEMES = {
  milkWhite: { bg: '#FFFDF8', primary: '#4A3728', accent: '#F0C78E' },
  warmOrange: { bg: '#FFF7F0', primary: '#5C3A1E', accent: '#FFB76B' },
  pinkPeach: { bg: '#FFF5F5', primary: '#6B3A3A', accent: '#FF9E9E' },
  teaBrown: { bg: '#FFFBF2', primary: '#5C3D2E', accent: '#E8A855' },
  mintGreen: { bg: '#F5FFFA', primary: '#2D5A3E', accent: '#7DDBA8' },
  lavender: { bg: '#F8F3FF', primary: '#3E2D5A', accent: '#B08ED6' },
  coolGray: { bg: '#F2F5FA', primary: '#2C3E50', accent: '#7BA7CC' }
}

function loadImage(canvas, src, callback) {
  if (!src) { callback(null, null); return }
  var img = canvas.createImage()
  var timer = null
  var done = false
  timer = setTimeout(function () {
    if (done) return
    done = true; img.onload = null; img.onerror = null
    callback(null, null)
  }, IMG_TIMEOUT)
  img.onload = function () {
    if (done) return
    done = true; clearTimeout(timer); callback(null, img)
  }
  img.onerror = function () {
    if (done) return
    done = true; clearTimeout(timer); callback(null, null)
  }
  img.src = src
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

function fillWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  var chars = text.split('')
  var line = ''
  for (var i = 0; i < chars.length; i++) {
    var testLine = line + chars[i]
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      ctx.fillText(line, x, y)
      line = chars[i]
      y += lineHeight
    } else {
      line = testLine
    }
  }
  if (line) {
    ctx.fillText(line, x, y)
    y += lineHeight
  }
  return y
}

function measureLines(ctx, text, maxWidth) {
  var chars = text.split('')
  var line = ''
  var lines = 1
  for (var i = 0; i < chars.length; i++) {
    var testLine = line + chars[i]
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      line = chars[i]
      lines++
    } else {
      line = testLine
    }
  }
  return lines
}

/**
 * 绘制海报主函数
 * opts: { relationship, petData, resultCode, photoPath, canvas }
 */
function draw(ctx, opts, callback) {
  var relationship = opts.relationship
  var petData = opts.petData
  var resultCode = opts.resultCode
  var photoPath = opts.photoPath
  var canvas = opts.canvas

  var themeName = relationship.posterTheme || 'milkWhite'
  var theme = THEMES[themeName] || THEMES.milkWhite

  var ctaList = petData.brand.posterCTA
  var cta = ctaList[Math.floor(Math.random() * ctaList.length)]
  cta = cta.replace('{title}', relationship.title)

  var illustPath = '/assets/images/result/' + petData.petType + '/' + resultCode + '.jpg'

  // --- 预计算文本行数 ---
  var cardW = CANVAS_W - PADDING * 2
  var accentLineW = 4
  var textMaxW = cardW - accentLineW - 16

  ctx.font = '24px PingFang SC'
  var descLines = measureLines(ctx, relationship.description, textMaxW)

  // summary 行数
  var summaryLines = 0
  if (relationship.summary) {
    ctx.font = 'bold 24px PingFang SC'
    summaryLines = measureLines(ctx, relationship.summary, textMaxW)
  }

  // tips 现在是数组，逐条计算行数
  var tipsArr = relationship.tips || []
  var tipsIsArray = Array.isArray(tipsArr)
  var tipLineCounts = []
  var totalTipLines = 0
  if (tipsIsArray) {
    ctx.font = '24px PingFang SC'
    var tipTextMaxW = textMaxW - 24 // 留出bullet空间
    for (var ti = 0; ti < tipsArr.length; ti++) {
      var tl = measureLines(ctx, tipsArr[ti], tipTextMaxW)
      tipLineCounts.push(tl)
      totalTipLines += tl
    }
  } else {
    totalTipLines = measureLines(ctx, tipsArr, textMaxW)
  }

  var mainQuoteFont = 'bold 30px PingFang SC'
  ctx.font = mainQuoteFont
  var quoteMaxW = cardW - 64
  var mainQuoteLines = measureLines(ctx, relationship.goldQuote, quoteMaxW)

  var subQuoteFont = '22px PingFang SC'
  var subQuoteLines = 0
  if (relationship.subQuote) {
    ctx.font = subQuoteFont
    subQuoteLines = measureLines(ctx, relationship.subQuote, quoteMaxW)
  }

  var commentLines = 0
  if (relationship.petComment) {
    ctx.font = '22px PingFang SC'
    commentLines = measureLines(ctx, relationship.petComment, cardW - 48)
  }

  // 特征标志
  var hasSubtitle = !!relationship.subtitle
  var tags = relationship.tags || []
  var hasTags = tags.length > 0
  var hasIndices = relationship.indices && relationship.indices.length > 0
  var hasKeywords = relationship.keywords && relationship.keywords.length > 0

  // --- 各区块高度 ---
  var imgSize = 280
  var quoteCardH = 32 + mainQuoteLines * 42 + (subQuoteLines > 0 ? 12 + subQuoteLines * 30 : 0) + 32
  var commentBlockH = commentLines > 0 ? (36 + 24 + commentLines * 32 + 24) : 0
  var indicesBlockH = hasIndices ? (36 + relationship.indices.length * 44) : 0
  var descCardH = 44 + (summaryLines > 0 ? summaryLines * 34 + 12 : 0) + descLines * 34 + 24
  var tipsCardH = 44 + totalTipLines * 34 + (tipsIsArray ? (tipsArr.length - 1) * 8 : 0) + 24

  // --- 总高度 ---
  var totalH = 60                                             // 顶部留白
    + 74                                                      // 品牌头 + 间距
    + 68                                                      // 标题 + 间距
    + (hasSubtitle ? 46 : 0)                                  // 副标题 + 间距
    + (hasTags ? 40 : 0)                                      // 标签行 + 间距
    + 56                                                      // 徽章 + 间距
    + imgSize + 24                                            // 图片行 + 间距
    + quoteCardH + 24                                         // 金句 + 间距
    + (indicesBlockH > 0 ? indicesBlockH + 24 : 0)           // 指数区 + 间距
    + (commentBlockH > 0 ? commentBlockH + 24 : 0)           // 宠物评价 + 间距
    + descCardH + 16                                          // 描述 + 间距
    + (hasKeywords ? 48 : 0)                                  // 关键词 + 间距
    + tipsCardH + 32                                          // 秘诀 + 间距
    + 100 + 60                                                // 底部品牌 + 底部留白

  if (totalH < 1334) totalH = 1334

  // --- 画布设置 ---
  var sysDpr = wx.getWindowInfo ? wx.getWindowInfo().pixelRatio : (wx.getSystemInfoSync().pixelRatio || 2)
  var dpr = sysDpr >= 2 ? 2 : 1.5
  canvas.width = CANVAS_W * dpr
  canvas.height = totalH * dpr
  ctx.scale(dpr, dpr)

  // === 1. 背景 ===
  ctx.fillStyle = theme.bg
  ctx.fillRect(0, 0, CANVAS_W, totalH)

  // === 2. 品牌头（resultHeader + 装饰线） ===
  var y = 60
  ctx.textAlign = 'center'
  ctx.font = 'bold 30px PingFang SC'
  ctx.fillStyle = theme.primary
  var brandText = petData.brand.resultHeader || '宠物眼中的你'
  var brandTextW = ctx.measureText(brandText).width
  ctx.fillText(brandText, CANVAS_W / 2, y + 30)

  var decoLineW = 48
  var decoGap = 16
  var decoY = y + 22
  ctx.strokeStyle = theme.accent
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(CANVAS_W / 2 - brandTextW / 2 - decoGap - decoLineW, decoY)
  ctx.lineTo(CANVAS_W / 2 - brandTextW / 2 - decoGap, decoY)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(CANVAS_W / 2 + brandTextW / 2 + decoGap, decoY)
  ctx.lineTo(CANVAS_W / 2 + brandTextW / 2 + decoGap + decoLineW, decoY)
  ctx.stroke()

  var dotY = y + 48
  ctx.fillStyle = theme.accent
  ctx.beginPath()
  ctx.moveTo(CANVAS_W / 2, dotY - 4)
  ctx.lineTo(CANVAS_W / 2 + 4, dotY)
  ctx.lineTo(CANVAS_W / 2, dotY + 4)
  ctx.lineTo(CANVAS_W / 2 - 4, dotY)
  ctx.closePath()
  ctx.fill()
  y += 74

  // === 3. 标题（关系称号，Hero） ===
  ctx.font = 'bold 48px PingFang SC'
  ctx.fillStyle = theme.primary
  ctx.textAlign = 'center'
  ctx.fillText(relationship.title, CANVAS_W / 2, y + 44)
  y += 68

  // === 4. 副标题（NEW） ===
  if (hasSubtitle) {
    ctx.font = '24px PingFang SC'
    ctx.fillStyle = '#888888'
    ctx.textAlign = 'center'
    ctx.fillText(relationship.subtitle, CANVAS_W / 2, y + 22)
    y += 46
  }

  // === 5. 标签行（tags: tag1 | tag2 | tag3）（替代旧 emotionTag） ===
  if (hasTags) {
    var tagsText = tags.join('  |  ')
    ctx.font = 'bold 22px PingFang SC'
    ctx.fillStyle = theme.accent
    ctx.textAlign = 'center'
    ctx.fillText(tagsText, CANVAS_W / 2, y + 22)
    y += 40
  }

  // === 6. 徽章（posterBadge） ===
  ctx.font = 'bold 20px PingFang SC'
  var badgeText = relationship.posterBadge
  var badgeW = ctx.measureText(badgeText).width + 32
  var pillH = 32
  var badgeX = (CANVAS_W - badgeW) / 2

  ctx.fillStyle = theme.accent
  roundRect(ctx, badgeX, y, badgeW, pillH, pillH / 2)
  ctx.fill()
  ctx.fillStyle = theme.primary
  ctx.textAlign = 'center'
  ctx.fillText(badgeText, CANVAS_W / 2, y + 22)
  y += 56

  // === 7. 配图 + 照片并排 ===
  var imgGap = 24
  var rowTotalW = imgSize + imgGap + imgSize
  var rowStartX = (CANVAS_W - rowTotalW) / 2
  var illustX = rowStartX
  var photoX = rowStartX + imgSize + imgGap
  var rowY = y

  var illustImg = null
  var photoImg = null
  var qrcodeImg = null
  var loadCount = 0
  var loadTotal = 3

  function onAllLoaded() {
    if (illustImg) {
      ctx.save()
      roundRect(ctx, illustX, rowY, imgSize, imgSize, 20)
      ctx.clip()
      ctx.drawImage(illustImg, illustX, rowY, imgSize, imgSize)
      ctx.restore()
    }

    if (photoImg) {
      ctx.save()
      roundRect(ctx, photoX, rowY, imgSize, imgSize, 20)
      ctx.clip()
      ctx.drawImage(photoImg, photoX, rowY, imgSize, imgSize)
      ctx.restore()
    } else {
      ctx.fillStyle = theme.accent
      roundRect(ctx, photoX, rowY, imgSize, imgSize, 20)
      ctx.fill()
      ctx.font = '72px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillStyle = theme.primary
      ctx.fillText(petData.petType === 'cat' ? '\ud83d\udc31' : '\ud83d\udc36', photoX + imgSize / 2, rowY + imgSize / 2 + 24)
    }

    y = rowY + imgSize + 24
    drawContent()
  }

  loadImage(canvas, illustPath, function (err, img) {
    illustImg = img
    loadCount++
    if (loadCount === loadTotal) onAllLoaded()
  })

  loadImage(canvas, photoPath, function (err, img) {
    photoImg = img
    loadCount++
    if (loadCount === loadTotal) onAllLoaded()
  })

  loadImage(canvas, '/assets/images/qrcode.jpg', function (err, img) {
    qrcodeImg = img
    loadCount++
    if (loadCount === loadTotal) onAllLoaded()
  })

  function drawContent() {
    // === 8. 双金句卡片 ===
    var quoteCardX = PADDING
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    roundRect(ctx, quoteCardX, y, cardW, quoteCardH, 16)
    ctx.fill()
    ctx.strokeStyle = theme.accent
    ctx.lineWidth = 1.5
    roundRect(ctx, quoteCardX, y, cardW, quoteCardH, 16)
    ctx.stroke()

    // 主金句（大）
    ctx.textAlign = 'center'
    ctx.font = mainQuoteFont
    ctx.fillStyle = theme.primary
    var mainQuoteY = y + 32 + 30
    var mainQuoteText = '\u201c' + relationship.goldQuote + '\u201d'
    var mqChars = mainQuoteText.split('')
    var mqLine = ''
    var mqLineY = mainQuoteY
    for (var mqi = 0; mqi < mqChars.length; mqi++) {
      var mqTest = mqLine + mqChars[mqi]
      if (ctx.measureText(mqTest).width > quoteMaxW && mqLine !== '') {
        ctx.fillText(mqLine, CANVAS_W / 2, mqLineY)
        mqLine = mqChars[mqi]
        mqLineY += 42
      } else {
        mqLine = mqTest
      }
    }
    if (mqLine) { ctx.fillText(mqLine, CANVAS_W / 2, mqLineY); mqLineY += 42 }

    // 副金句（小）
    if (relationship.subQuote && subQuoteLines > 0) {
      ctx.font = subQuoteFont
      ctx.fillStyle = '#888888'
      var sqY = mqLineY - 42 + 12 + 22
      var sqChars = relationship.subQuote.split('')
      var sqLine = ''
      var sqLineY = sqY
      for (var sqi = 0; sqi < sqChars.length; sqi++) {
        var sqTest = sqLine + sqChars[sqi]
        if (ctx.measureText(sqTest).width > quoteMaxW && sqLine !== '') {
          ctx.fillText(sqLine, CANVAS_W / 2, sqLineY)
          sqLine = sqChars[sqi]
          sqLineY += 30
        } else {
          sqLine = sqTest
        }
      }
      if (sqLine) ctx.fillText(sqLine, CANVAS_W / 2, sqLineY)
    }
    y += quoteCardH + 24

    // === 9. 专属指数区 ===
    if (hasIndices) {
      var indices = relationship.indices
      var barAreaX = PADDING

      ctx.textAlign = 'left'
      ctx.font = 'bold 24px PingFang SC'
      ctx.fillStyle = theme.primary
      ctx.fillText('\ud83d\udcca \u4e13\u5c5e\u6307\u6570', barAreaX, y + 26)
      y += 36

      var labelW = 120
      var valueW = 44
      var barX = barAreaX + labelW + 12
      var barW = cardW - labelW - 12 - valueW - 8
      var barH = 16
      var barRadius = barH / 2

      for (var bi = 0; bi < indices.length; bi++) {
        var idx = indices[bi]
        var barRowY = y + bi * 44

        ctx.textAlign = 'left'
        ctx.font = '22px PingFang SC'
        ctx.fillStyle = '#666666'
        ctx.fillText(idx.label, barAreaX, barRowY + 24)

        ctx.fillStyle = 'rgba(0,0,0,0.06)'
        roundRect(ctx, barX, barRowY + 12, barW, barH, barRadius)
        ctx.fill()

        var fillW = Math.max(barW * idx.value / 100, barH)
        ctx.fillStyle = theme.accent
        roundRect(ctx, barX, barRowY + 12, fillW, barH, barRadius)
        ctx.fill()

        ctx.textAlign = 'right'
        ctx.font = 'bold 22px PingFang SC'
        ctx.fillStyle = theme.primary
        ctx.fillText(idx.value + '', barAreaX + cardW, barRowY + 24)
      }

      y += indices.length * 44 + 24
    }

    // === 10. 宠物吐槽条 ===
    if (relationship.petComment && commentLines > 0) {
      var bubbleX = PADDING + 16
      var bubbleW = cardW - 32
      var bubbleH = commentBlockH
      ctx.fillStyle = 'rgba(0,0,0,0.03)'
      roundRect(ctx, PADDING, y, cardW, bubbleH, 14)
      ctx.fill()

      // 吐槽条标题
      ctx.textAlign = 'left'
      ctx.font = 'bold 22px PingFang SC'
      ctx.fillStyle = theme.primary
      var commentTitle = petData.petType === 'cat' ? '\ud83d\udc31 \u672c\u55b5\u6709\u8bdd\u8bf4' : '\ud83d\udc36 \u672c\u6c6a\u6709\u8bdd\u8bf4'
      ctx.fillText(commentTitle, bubbleX, y + 30)

      // 吐槽内容
      ctx.font = '22px PingFang SC'
      ctx.fillStyle = '#666666'
      fillWrappedText(ctx, relationship.petComment, bubbleX, y + 60, bubbleW, 32)
      y += bubbleH + 24
    }

    // === 11. 关系描述区（左竖线） ===
    var cardX = PADDING
    var textX = cardX + accentLineW + 16

    ctx.fillStyle = theme.accent
    roundRect(ctx, cardX, y, accentLineW, descCardH, 2)
    ctx.fill()

    var descTitle = petData.petType === 'cat' ? '\u2728 \u4f60\u4eec\u5173\u7cfb\u7684\u771f\u76f8' : '\u2728 \u4f60\u5728\u5b83\u5fc3\u91cc\u7684\u4f4d\u7f6e'
    ctx.textAlign = 'left'
    ctx.font = 'bold 24px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText(descTitle, textX, y + 34)

    var descContentY = y + 70
    // 先渲染 summary（加粗）
    if (relationship.summary && summaryLines > 0) {
      ctx.font = 'bold 24px PingFang SC'
      ctx.fillStyle = '#333333'
      descContentY = fillWrappedText(ctx, relationship.summary, textX, descContentY, textMaxW, 34)
      descContentY += 12
    }
    // 再渲染 description
    ctx.font = '24px PingFang SC'
    ctx.fillStyle = '#444444'
    fillWrappedText(ctx, relationship.description, textX, descContentY, textMaxW, 34)
    y += descCardH + 16

    // === 12. 关键词标签行（NEW） ===
    if (hasKeywords) {
      var kws = relationship.keywords
      var kwText = kws.map(function (k) { return '#' + k }).join('  ')
      ctx.textAlign = 'left'
      ctx.font = '22px PingFang SC'
      ctx.fillStyle = theme.accent
      ctx.fillText(kwText, PADDING + 20, y + 24)
      y += 48
    }

    // === 13. 相处秘诀区（左竖线） ===
    ctx.fillStyle = theme.accent
    roundRect(ctx, cardX, y, accentLineW, tipsCardH, 2)
    ctx.fill()

    var tipsTitle = petData.petType === 'cat' ? '\ud83d\udc31 \u672c\u55b5\u5efa\u8bae\u4f60\u8fd9\u6837\u5ba0\u6211' : '\ud83d\udc36 \u672c\u6c6a\u7ed9\u4f60\u7684\u5c0f\u63d0\u9192'
    ctx.textAlign = 'left'
    ctx.font = 'bold 24px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText(tipsTitle, textX, y + 34)

    var tipY = y + 70
    var tipBulletX = textX
    var tipContentX = textX + 24
    var tipContentMaxW = textMaxW - 24
    if (tipsIsArray) {
      ctx.font = '24px PingFang SC'
      for (var tii = 0; tii < tipsArr.length; tii++) {
        ctx.fillStyle = theme.accent
        ctx.fillText('\u2022', tipBulletX, tipY)
        ctx.fillStyle = '#444444'
        tipY = fillWrappedText(ctx, tipsArr[tii], tipContentX, tipY, tipContentMaxW, 34)
        if (tii < tipsArr.length - 1) tipY += 8
      }
    } else {
      ctx.font = '24px PingFang SC'
      ctx.fillStyle = '#444444'
      fillWrappedText(ctx, tipsArr, textX, tipY, textMaxW, 34)
    }
    y += tipsCardH + 32

    // === 15. 底部品牌区 ===
    var footerY = totalH - 100
    var codeSize = 56
    var codeX = CANVAS_W - PADDING - codeSize

    ctx.strokeStyle = theme.accent
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(PADDING, footerY)
    ctx.lineTo(CANVAS_W - PADDING, footerY)
    ctx.stroke()
    footerY += 16

    var textOffsetY = Math.floor((codeSize - 40) / 2)
    ctx.textAlign = 'left'
    ctx.font = 'bold 22px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText(cta, PADDING, footerY + textOffsetY + 20)

    ctx.font = '16px PingFang SC'
    ctx.fillStyle = '#BBBBBB'
    ctx.fillText('\u5b83\u773c\u4e2d\u7684\u4f60 \u00b7 \u4eba\u5ba0\u5173\u7cfb\u6d4b\u8bd5 \u00b7 \u4ec5\u4f9b\u5a31\u4e50', PADDING, footerY + textOffsetY + 44)

    if (qrcodeImg) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(codeX + codeSize / 2, footerY + codeSize / 2, codeSize / 2, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(qrcodeImg, codeX, footerY, codeSize, codeSize)
      ctx.restore()
    } else {
      ctx.beginPath()
      ctx.arc(codeX + codeSize / 2, footerY + codeSize / 2, codeSize / 2, 0, Math.PI * 2)
      ctx.fillStyle = '#F0F0F0'
      ctx.fill()
    }

    callback(null)
  }
}

module.exports = {
  draw: draw
}
