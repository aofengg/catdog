/**
 * 海报 Canvas 绘制工具
 * 离屏绘制，动态画布高度，自动换行
 */

var CANVAS_W = 750
var IMG_TIMEOUT = 5000
var PADDING = 56

// 7 套海报主题色
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
 */
function draw(ctx, opts, callback) {
  var personality = opts.personality
  var petData = opts.petData
  var resultCode = opts.resultCode
  var matchInfo = opts.matchInfo
  var photoPath = opts.photoPath
  var canvas = opts.canvas

  var themeName = personality.posterTheme || 'milkWhite'
  var theme = THEMES[themeName] || THEMES.milkWhite
  var noun = petData.petType === 'cat' ? '猫咪' : '修勾'

  var ctaList = petData.brand.posterCTA
  var cta = ctaList[Math.floor(Math.random() * ctaList.length)]

  // --- 预计算动态高度 ---
  var cardW = CANVAS_W - PADDING * 2
  var lineW = 4
  var textMaxW = cardW - lineW - 16
  ctx.font = '24px PingFang SC'
  var descLines = measureLines(ctx, personality.description, textMaxW)
  var tipsLines = measureLines(ctx, personality.tips, textMaxW)

  // petComment 语录气泡高度
  var commentH = personality.petComment ? 50 : 0

  var photoSize = 320
  var headerH = 80 + photoSize + 48 + 50 + 52 + commentH
  var descCardH = 44 + descLines * 34 + 24
  var tipsCardH = 44 + tipsLines * 34 + 24

  // 匹配区（左竖线样式）
  var matchH = 0
  var matchContentLines = 0
  if (matchInfo) {
    var matchText = matchInfo.score + '分 · ' + matchInfo.tag + '  主人 ' + opts.masterCode + ' × ' + noun + ' ' + resultCode
    matchH = 44 + 30 + 16
    if (matchInfo.matchCircleText) {
      ctx.font = '20px PingFang SC'
      matchContentLines = measureLines(ctx, matchInfo.matchCircleText, textMaxW)
      matchH += matchContentLines * 30 + 8
    }
  }

  var ctaH = 100
  var totalH = headerH + descCardH + 28 + tipsCardH + 28 + matchH + ctaH + 60

  if (totalH < 1334) totalH = 1334

  // 设置画布（低端机用较低 dpr 避免 OOM）
  var sysDpr = wx.getWindowInfo ? wx.getWindowInfo().pixelRatio : (wx.getSystemInfoSync().pixelRatio || 2)
  var dpr = sysDpr >= 2 ? 2 : 1.5
  canvas.width = CANVAS_W * dpr
  canvas.height = totalH * dpr
  ctx.scale(dpr, dpr)

  // --- 1. 背景 ---
  ctx.fillStyle = theme.bg
  ctx.fillRect(0, 0, CANVAS_W, totalH)

  // --- 2. 照片 ---
  var photoX = (CANVAS_W - photoSize) / 2
  var photoY = 80

  if (photoPath) {
    loadImage(canvas, photoPath, function (err, img) {
      if (img) {
        ctx.save()
        roundRect(ctx, photoX, photoY, photoSize, photoSize, 32)
        ctx.clip()
        ctx.drawImage(img, photoX, photoY, photoSize, photoSize)
        ctx.restore()
      } else {
        drawPlaceholder()
      }
      drawBody()
    })
  } else {
    drawPlaceholder()
    drawBody()
  }

  function drawPlaceholder() {
    ctx.fillStyle = theme.accent
    roundRect(ctx, photoX, photoY, photoSize, photoSize, 32)
    ctx.fill()
    ctx.font = '100px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillStyle = theme.primary
    ctx.fillText(petData.petType === 'cat' ? '🐱' : '🐶', CANVAS_W / 2, photoY + photoSize / 2 + 35)
  }

  function drawBody() {
    var y = photoY + photoSize + 48

    // --- 3. 昵称（主角，大字） ---
    ctx.textAlign = 'center'
    ctx.font = 'bold 42px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText(personality.petName, CANVAS_W / 2, y)
    y += 50

    // --- 4. 人格码标签（pill 形状） ---
    ctx.font = 'bold 22px PingFang SC'
    var codeText = resultCode + '  ' + personality.posterBadge + ' · ' + noun + '同款'
    var pillW = ctx.measureText(codeText).width + 36
    var pillH = 36
    var pillX = (CANVAS_W - pillW) / 2
    ctx.fillStyle = theme.accent
    roundRect(ctx, pillX, y - 24, pillW, pillH, pillH / 2)
    ctx.fill()
    ctx.fillStyle = theme.primary
    ctx.fillText(codeText, CANVAS_W / 2, y)
    y += 52

    // --- 5. 宠物语录气泡 ---
    if (personality.petComment) {
      ctx.font = '20px PingFang SC'
      var quoteText = '「' + personality.petComment + '」'
      var bubbleW = ctx.measureText(quoteText).width + 32
      var bubbleH = 36
      var bubbleX = (CANVAS_W - bubbleW) / 2
      ctx.fillStyle = 'rgba(0,0,0,0.04)'
      roundRect(ctx, bubbleX, y - 24, bubbleW, bubbleH, bubbleH / 2)
      ctx.fill()
      ctx.fillStyle = '#888888'
      ctx.textAlign = 'center'
      ctx.fillText(quoteText, CANVAS_W / 2, y)
      y += 50
    }

    // --- 6. 性格描述区（左竖线 + 文字） ---
    var cardX = PADDING
    var lineW = 4
    var textX = cardX + lineW + 16

    ctx.fillStyle = theme.accent
    roundRect(ctx, cardX, y, lineW, descCardH, 2)
    ctx.fill()

    ctx.textAlign = 'left'
    ctx.font = 'bold 24px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText('🐾 我家' + noun + '是这样的', textX, y + 34)

    ctx.font = '24px PingFang SC'
    ctx.fillStyle = '#444444'
    fillWrappedText(ctx, personality.description, textX, y + 70, cardW - lineW - 16, 34)
    y += descCardH + 28

    // --- 7. 相处秘诀区（左竖线 + 文字） ---
    ctx.fillStyle = theme.accent
    roundRect(ctx, cardX, y, lineW, tipsCardH, 2)
    ctx.fill()

    ctx.textAlign = 'left'
    ctx.font = 'bold 24px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText('💡 和它相处的秘诀', textX, y + 34)

    ctx.font = '24px PingFang SC'
    ctx.fillStyle = '#444444'
    fillWrappedText(ctx, personality.tips, textX, y + 70, cardW - lineW - 16, 34)
    y += tipsCardH + 28

    // --- 8. 匹配区（左竖线样式，与上面一致） ---
    if (matchInfo) {
      ctx.fillStyle = theme.accent
      roundRect(ctx, cardX, y, lineW, matchH, 2)
      ctx.fill()

      ctx.textAlign = 'left'
      ctx.font = 'bold 24px PingFang SC'
      ctx.fillStyle = theme.primary
      ctx.fillText('💕 ' + matchInfo.score + '分 · ' + matchInfo.tag, textX, y + 34)

      ctx.font = '20px PingFang SC'
      ctx.fillStyle = '#999999'
      ctx.fillText('主人 ' + opts.masterCode + ' × ' + noun + ' ' + resultCode, textX, y + 62)

      if (matchInfo.matchCircleText) {
        ctx.font = '20px PingFang SC'
        ctx.fillStyle = '#666666'
        fillWrappedText(ctx, '"' + matchInfo.matchCircleText + '"', textX, y + 90, textMaxW, 30)
      }
      y += matchH + 28
    }

    // --- 9. 底部品牌区（左文案 + 右小程序码） ---
    var footerY = totalH - 100
    var codeSize = 56
    var codeX = CANVAS_W - PADDING - codeSize

    // 分隔线
    ctx.strokeStyle = theme.accent
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(PADDING, footerY)
    ctx.lineTo(CANVAS_W - PADDING, footerY)
    ctx.stroke()
    footerY += 16

    // 左侧：CTA + 品牌（两行，与右侧码垂直居中）
    var textOffsetY = Math.floor((codeSize - 40) / 2)

    ctx.textAlign = 'left'
    ctx.font = 'bold 22px PingFang SC'
    ctx.fillStyle = theme.primary
    ctx.fillText(cta, PADDING, footerY + textOffsetY + 20)

    ctx.font = '16px PingFang SC'
    ctx.fillStyle = '#BBBBBB'
    ctx.fillText('喵汪人格测试 · PETI · 仅供娱乐', PADDING, footerY + textOffsetY + 44)

    // 右侧小程序码占位
    ctx.beginPath()
    ctx.arc(codeX + codeSize / 2, footerY + codeSize / 2, codeSize / 2, 0, Math.PI * 2)
    ctx.fillStyle = '#F0F0F0'
    ctx.fill()
    ctx.font = '12px sans-serif'
    ctx.fillStyle = '#CCCCCC'
    ctx.textAlign = 'center'
    ctx.fillText('小程序码', codeX + codeSize / 2, footerY + codeSize / 2 + 4)

    callback(null)
  }
}

module.exports = {
  draw: draw
}
