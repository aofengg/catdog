/**
 * 海报 Canvas 绘制工具
 * 新版：关系称号为主角，金句突出展示
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

  // 配图路径
  var illustPath = '/assets/images/result/' + petData.petType + '/' + resultCode + '.jpg'

  // --- 预计算动态高度 ---
  var cardW = CANVAS_W - PADDING * 2
  var lineW = 4
  var textMaxW = cardW - lineW - 16

  ctx.font = '24px PingFang SC'
  var descLines = measureLines(ctx, relationship.description, textMaxW)
  var tipsLines = measureLines(ctx, relationship.tips, textMaxW)

  var quoteFont = '26px PingFang SC'
  ctx.font = quoteFont
  var quoteMaxW = cardW - 64
  var quoteLines = measureLines(ctx, relationship.goldQuote, quoteMaxW)

  var commentLines = 0
  if (relationship.petComment) {
    ctx.font = '22px PingFang SC'
    commentLines = measureLines(ctx, relationship.petComment, cardW - 48)
  }

  // 并排图片尺寸
  var imgSize = 280
  var imgGap = 24
  var headerH = 60 + 56 + 36 + 44 + 24     // top padding + title + gap + badges + gap
  var photosRowH = imgSize + 24              // side-by-side row + gap
  var quoteH = 32 + quoteLines * 36 + 32
  var commentH = commentLines > 0 ? (32 + commentLines * 32 + 32) : 0
  var descCardH = 44 + descLines * 34 + 24
  var tipsCardH = 44 + tipsLines * 34 + 24
  var ctaH = 100

  var totalH = headerH + photosRowH + quoteH + 24 + commentH + 24 + descCardH + 24 + tipsCardH + 32 + ctaH + 60
  if (totalH < 1334) totalH = 1334

  // 设置画布
  var sysDpr = wx.getWindowInfo ? wx.getWindowInfo().pixelRatio : (wx.getSystemInfoSync().pixelRatio || 2)
  var dpr = sysDpr >= 2 ? 2 : 1.5
  canvas.width = CANVAS_W * dpr
  canvas.height = totalH * dpr
  ctx.scale(dpr, dpr)

  // --- 1. 背景 ---
  ctx.fillStyle = theme.bg
  ctx.fillRect(0, 0, CANVAS_W, totalH)

  // --- 2. 标题（关系称号，Hero） ---
  var y = 60
  ctx.textAlign = 'center'
  ctx.font = 'bold 48px PingFang SC'
  ctx.fillStyle = theme.primary
  ctx.fillText(relationship.title, CANVAS_W / 2, y + 44)
  y += 56 + 36

  // --- 3. 徽章行（posterBadge + emotionTag） ---
  ctx.font = 'bold 20px PingFang SC'
  var badgeText = relationship.posterBadge
  var tagText = relationship.emotionTag
  var badgeW = ctx.measureText(badgeText).width + 28
  var tagW = ctx.measureText(tagText).width + 28
  var totalBadgeW = badgeW + 12 + tagW
  var badgeStartX = (CANVAS_W - totalBadgeW) / 2
  var pillH = 32

  ctx.fillStyle = theme.accent
  roundRect(ctx, badgeStartX, y - 22, badgeW, pillH, pillH / 2)
  ctx.fill()
  ctx.fillStyle = theme.primary
  ctx.textAlign = 'center'
  ctx.fillText(badgeText, badgeStartX + badgeW / 2, y)

  var tagX = badgeStartX + badgeW + 12
  ctx.fillStyle = '#F0F0F0'
  roundRect(ctx, tagX, y - 22, tagW, pillH, pillH / 2)
  ctx.fill()
  ctx.fillStyle = '#666666'
  ctx.fillText(tagText, tagX + tagW / 2, y)
  y += 44 + 24

  // --- 4. 配图 + 照片并排 ---
  var rowTotalW = imgSize + imgGap + imgSize
  var rowStartX = (CANVAS_W - rowTotalW) / 2
  var illustX = rowStartX
  var photoX = rowStartX + imgSize + imgGap
  var rowY = y

  // 并行加载三张图（配图 + 照片 + 小程序码）
  var illustImg = null
  var photoImg = null
  var qrcodeImg = null
  var loadCount = 0
  var loadTotal = 3

  function onAllLoaded() {
    // 画配图
    if (illustImg) {
      ctx.save()
      roundRect(ctx, illustX, rowY, imgSize, imgSize, 20)
      ctx.clip()
      ctx.drawImage(illustImg, illustX, rowY, imgSize, imgSize)
      ctx.restore()
    }

    // 画照片或占位
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
    // --- 5. 金句卡片 ---
    var quoteCardX = PADDING
    var quoteCardW = cardW
    var quoteCardH = quoteH
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    roundRect(ctx, quoteCardX, y, quoteCardW, quoteCardH, 16)
    ctx.fill()
    ctx.strokeStyle = theme.accent
    ctx.lineWidth = 1.5
    roundRect(ctx, quoteCardX, y, quoteCardW, quoteCardH, 16)
    ctx.stroke()

    ctx.textAlign = 'center'
    ctx.font = quoteFont
    ctx.fillStyle = '#555555'
    var quoteY = y + 32 + 26
    var quoteText = '\u201c' + relationship.goldQuote + '\u201d'
    var qChars = quoteText.split('')
    var qLine = ''
    var qLineY = quoteY
    for (var qi = 0; qi < qChars.length; qi++) {
      var qTest = qLine + qChars[qi]
      if (ctx.measureText(qTest).width > quoteMaxW && qLine !== '') {
        ctx.fillText(qLine, CANVAS_W / 2, qLineY)
        qLine = qChars[qi]
        qLineY += 36
      } else {
        qLine = qTest
      }
    }
    if (qLine) ctx.fillText(qLine, CANVAS_W / 2, qLineY)
    y += quoteCardH + 24

    // --- 6. 宠物评价气泡 ---
    if (relationship.petComment) {
      var bubbleX = PADDING + 24
      var bubbleW = cardW - 48
      var bubbleH = 24 + commentLines * 32 + 24
      ctx.fillStyle = 'rgba(0,0,0,0.03)'
      roundRect(ctx, PADDING, y, cardW, bubbleH, 14)
      ctx.fill()

      ctx.textAlign = 'left'
      ctx.font = '22px PingFang SC'
      ctx.fillStyle = '#666666'
      var commentText = '\ud83d\udcac ' + relationship.petComment
      fillWrappedText(ctx, commentText, bubbleX, y + 24 + 16, bubbleW, 32)
      y += bubbleH + 24
    }

    // --- 7. 关系描述区（左竖线） ---
    var cardX = PADDING
    var textX = cardX + lineW + 16

    ctx.fillStyle = theme.accent
    roundRect(ctx, cardX, y, lineW, descCardH, 2)
    ctx.fill()

    ctx.textAlign = 'left'
    ctx.font = 'bold 24px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText('\u2728 \u4f60\u4eec\u7684\u5173\u7cfb', textX, y + 34)

    ctx.font = '24px PingFang SC'
    ctx.fillStyle = '#444444'
    fillWrappedText(ctx, relationship.description, textX, y + 70, textMaxW, 34)
    y += descCardH + 24

    // --- 8. 相处秘诀区（左竖线） ---
    ctx.fillStyle = theme.accent
    roundRect(ctx, cardX, y, lineW, tipsCardH, 2)
    ctx.fill()

    ctx.textAlign = 'left'
    ctx.font = 'bold 24px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText('\ud83d\udca1 \u8ba9\u5173\u7cfb\u66f4\u597d', textX, y + 34)

    ctx.font = '24px PingFang SC'
    ctx.fillStyle = '#444444'
    fillWrappedText(ctx, relationship.tips, textX, y + 70, textMaxW, 34)
    y += tipsCardH + 32

    // --- 9. 底部品牌区 ---
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

    // 小程序码
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
