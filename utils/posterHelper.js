/**
 * 海报 Canvas 绘制工具（身份卡 + 小卡片版）
 * 展示：宠物照片、宠物名+结果名、金句、标签、4张小卡片、小程序码
 */

var CANVAS_W = 750
var PADDING = 56
var IMG_TIMEOUT = 5000

var THEMES = {
  milkWhite: { bg: '#FFFDF8', primary: '#4A3728', accent: '#F0C78E', cardBg: '#FFF9EE' },
  warmOrange: { bg: '#FFF7F0', primary: '#5C3A1E', accent: '#FFB76B', cardBg: '#FFF2E6' },
  pinkPeach: { bg: '#FFF5F5', primary: '#6B3A3A', accent: '#FF9E9E', cardBg: '#FFF0F0' },
  teaBrown: { bg: '#FFFBF2', primary: '#5C3D2E', accent: '#E8A855', cardBg: '#FFF6E8' },
  mintGreen: { bg: '#F5FFFA', primary: '#2D5A3E', accent: '#7DDBA8', cardBg: '#ECFFF5' },
  lavender: { bg: '#F8F3FF', primary: '#3E2D5A', accent: '#B08ED6', cardBg: '#F3ECFF' },
  coolGray: { bg: '#F2F5FA', primary: '#2C3E50', accent: '#7BA7CC', cardBg: '#EAF0F8' }
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

function fillWrappedTextCenter(ctx, text, centerX, y, maxWidth, lineHeight) {
  var chars = text.split('')
  var line = ''
  var lines = []
  for (var i = 0; i < chars.length; i++) {
    var testLine = line + chars[i]
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      lines.push(line)
      line = chars[i]
    } else {
      line = testLine
    }
  }
  if (line) lines.push(line)
  for (var j = 0; j < lines.length; j++) {
    ctx.fillText(lines[j], centerX, y + j * lineHeight)
  }
  return y + lines.length * lineHeight
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
 * 绘制海报
 * opts: { relationship, petData, resultCode, photoPath, petName, canvas, guideText, holidayBadge, holidayQuote }
 */
function draw(ctx, opts, callback) {
  var relationship = opts.relationship
  var petData = opts.petData
  var photoPath = opts.photoPath
  var petName = opts.petName || (petData.petType === 'cat' ? '猫主子' : '我家修勾')
  var canvas = opts.canvas
  var guideText = opts.guideText || (petData.brand.posterGuideText || '扫码测测你在它心里是什么身份')
  var holidayBadge = opts.holidayBadge || ''
  var holidayQuote = opts.holidayQuote || ''

  var themeName = relationship.posterTheme || 'milkWhite'
  var theme = THEMES[themeName] || THEMES.milkWhite

  // 预计算金句行数
  var quoteFont = 'bold 30px PingFang SC'
  ctx.font = quoteFont
  var quoteMaxW = CANVAS_W - PADDING * 2 - 60
  var goldQuoteText = '\u201c' + relationship.goldQuote + '\u201d'
  var quoteLines = measureLines(ctx, goldQuoteText, quoteMaxW)

  // miniCards 数据
  var miniCards = relationship.miniCards || []

  // 动态计算画布高度
  var photoSize = 260
  var quoteBlockH = quoteLines * 44
  var miniCardRowH = 90
  var miniCardGap = 14
  var miniCardRows = Math.ceil(miniCards.length / 2)
  var miniCardTotalH = miniCardRows > 0 ? (miniCardRows * miniCardRowH + (miniCardRows - 1) * miniCardGap) : 0
  var qrSize = 120

  // 节日情绪金句高度
  var quoteHolidayH = holidayQuote ? 56 : 0

  // 各区间距
  var totalH = 56           // top
    + photoSize + 32        // photo + gap
    + 44 + 16              // title + gap
    + quoteBlockH + 20     // quote + gap
    + 32 + 24             // tags + gap
    + quoteHolidayH        // 节日情绪金句
    + miniCardTotalH + 36  // cards + gap
    + qrSize + 20         // qr area + gap
    + 48                   // bottom

  if (totalH < 1000) totalH = 1000

  canvas.width = CANVAS_W
  canvas.height = totalH

  // 加载图片资源
  var placeholderPath = '/assets/images/' + petData.petType + '-placeholder.png'
  var imgSrc = photoPath || placeholderPath
  var qrcodePath = '/assets/images/qrcode.jpg'

  loadImage(canvas, imgSrc, function (err1, photoImg) {
    loadImage(canvas, qrcodePath, function (err2, qrcodeImg) {
      // === 1. 背景 ===
      ctx.fillStyle = theme.bg
      ctx.fillRect(0, 0, CANVAS_W, totalH)

      var y = 56

      // === 2. 宠物照片（圆角居中） ===
      var photoX = (CANVAS_W - photoSize) / 2
      if (photoImg) {
        ctx.save()
        roundRect(ctx, photoX, y, photoSize, photoSize, 36)
        ctx.clip()
        ctx.drawImage(photoImg, photoX, y, photoSize, photoSize)
        ctx.restore()
      } else {
        ctx.save()
        roundRect(ctx, photoX, y, photoSize, photoSize, 36)
        ctx.fillStyle = theme.cardBg
        ctx.fill()
        ctx.restore()
      }
      y += photoSize + 32

      // === 2.5 节日限定角标（照片右上角） ===
      if (holidayBadge) {
        ctx.save()
        ctx.font = 'bold 20px PingFang SC'
        var badgeW = ctx.measureText(holidayBadge).width + 24
        var badgeH = 36
        var badgeX = photoX + photoSize - badgeW + 12
        var badgeY = y - photoSize - 32 + 8
        roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 8)
        ctx.fillStyle = '#FF6B81'
        ctx.fill()
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(holidayBadge, badgeX + badgeW / 2, badgeY + badgeH / 2)
        ctx.restore()
      }

      // === 3. 标题行 ===
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'bold 32px PingFang SC'
      ctx.fillStyle = theme.primary
      var titleText = petName + '\u773c\u4e2d\u7684\u6211\uff1a' + relationship.title
      ctx.fillText(titleText, CANVAS_W / 2, y + 22)
      y += 44 + 16

      // === 4. 金句 ===
      ctx.font = quoteFont
      ctx.fillStyle = theme.accent
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      y = fillWrappedTextCenter(ctx, goldQuoteText, CANVAS_W / 2, y, quoteMaxW, 44)
      y += 20

      // === 5. 标签行 ===
      ctx.font = '24px PingFang SC'
      ctx.fillStyle = '#999999'
      ctx.textBaseline = 'middle'
      var tags = relationship.tags || []
      var tagsText = tags.slice(0, 4).join('  |  ')
      ctx.fillText(tagsText, CANVAS_W / 2, y + 16)
      y += 32 + 24

      // === 5.5 节日情绪金句（标签与小卡片之间） ===
      if (holidayQuote) {
        ctx.font = 'bold 24px PingFang SC'
        ctx.fillStyle = '#FF6B81'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(holidayQuote, CANVAS_W / 2, y + 12)
        y += quoteHolidayH
      }

      // === 6. 小卡片 2x2 网格 ===
      if (miniCards.length > 0) {
        var gridLeft = PADDING
        var gridRight = CANVAS_W - PADDING
        var gridW = gridRight - gridLeft
        var cardW = (gridW - miniCardGap) / 2
        var cardH = miniCardRowH

        for (var i = 0; i < miniCards.length && i < 4; i++) {
          var col = i % 2
          var row = Math.floor(i / 2)
          var cx = gridLeft + col * (cardW + miniCardGap)
          var cy = y + row * (cardH + miniCardGap)

          // 卡片背景
          ctx.save()
          roundRect(ctx, cx, cy, cardW, cardH, 14)
          ctx.fillStyle = theme.cardBg
          ctx.fill()
          ctx.restore()

          // 标签文字（上方小字）
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.font = '22px PingFang SC'
          ctx.fillStyle = '#999999'
          ctx.fillText(miniCards[i].label, cx + cardW / 2, cy + 30)

          // 值文字（下方粗体）
          ctx.font = 'bold 26px PingFang SC'
          ctx.fillStyle = theme.primary
          ctx.fillText(miniCards[i].value, cx + cardW / 2, cy + 62)
        }

        y += miniCardTotalH + 36
      }

      // === 7. 底部：小程序码 + 引导文案 ===
      // 分割线
      ctx.strokeStyle = '#E8E8E8'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(PADDING, y - 12)
      ctx.lineTo(CANVAS_W - PADDING, y - 12)
      ctx.stroke()

      var footerY = y + 8
      var codeX = PADDING + 16

      // 小程序码（120x120 清晰显示）
      if (qrcodeImg) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(codeX + qrSize / 2, footerY + qrSize / 2, qrSize / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(qrcodeImg, codeX, footerY, qrSize, qrSize)
        ctx.restore()
      } else {
        ctx.beginPath()
        ctx.arc(codeX + qrSize / 2, footerY + qrSize / 2, qrSize / 2, 0, Math.PI * 2)
        ctx.fillStyle = '#F0F0F0'
        ctx.fill()
      }

      // 引导文案（右侧垂直居中）
      var textX = codeX + qrSize + 24
      var textCenterY = footerY + qrSize / 2

      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.font = 'bold 24px PingFang SC'
      ctx.fillStyle = theme.primary
      ctx.fillText(guideText, textX, textCenterY - 16)

      ctx.font = '20px PingFang SC'
      ctx.fillStyle = '#BBBBBB'
      ctx.fillText('\u5b83\u773c\u4e2d\u7684\u4f60 \u00b7 \u4eba\u5ba0\u5173\u7cfb\u6d4b\u8bd5 \u00b7 PETI', textX, textCenterY + 16)

      callback(null)
    })
  })
}

module.exports = {
  draw: draw
}
