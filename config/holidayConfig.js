/**
 * 节日文案统一配置
 * 新增节日只需在此文件添加配置，无需修改业务代码。
 *
 * 使用方式：
 *   var holidayConfig = require('./holidayConfig.js')
 *   var holiday = holidayConfig.getCurrentHoliday()   // 返回 '520' / '521' / null
 *   var texts = holidayConfig.getTexts(holiday, 'cat') // 返回节日文案对象
 *
 * 文案中可用占位符：
 *   {date}    —— 自动替换为节日日期标签，如 "5.20"
 *   {title}   —— 在 moments 文案中由调用方替换
 *   {goldQuote} —— 在 moments 文案中由调用方替换
 */

var appConfig = require('./appConfig.js')

var HOLIDAYS = {
  '520': {
    dateLabel: '5.20',
    badge: '5.20 限定',
    shareImage: '/assets/images/share-cover-520.jpg',
    month: 5,
    day: 20,
    texts: {
      homeSlogan: '{date} 不一定要人类告白，你的毛孩子也在偷偷爱你',
      ctaUploadText: '上传照片，生成 {date} 专属告白海报',
      ctaGoText: '生成 {date} 专属告白海报',
      posterGuideText: '{date} 测测你在它心里是什么身份',
      shareTitle: '{date} 我家毛孩子已经偷偷认证我了，你呢？',
      shareTimelineTitle: '{date} 在毛孩子眼里，你是什么身份？',
      posterQuote: function (petType) {
        return '{date} 不一定要人类告白，' + (petType === 'cat' ? '本喵' : '本汪') + '已经认证你了'
      },
      moments: [
        '{date} 不一定要人类告白，我家毛孩子已经给我发身份认证了。\n我是「{title}」，你们是什么？'
      ]
    }
  },
  '521': {
    dateLabel: '5.21',
    badge: '5.21 限定',
    shareImage: '/assets/images/share-cover-521.jpg',
    month: 5,
    day: 21,
    texts: {
      homeSlogan: '{date} 不一定需要回应，你的毛孩子已经偷偷认定你了',
      ctaUploadText: '上传照片，生成 {date} 专属认定海报',
      ctaGoText: '生成 {date} 专属认定海报',
      posterGuideText: '{date} 测测你在它心里是什么身份',
      shareTitle: '{date} 它用陪伴认定了我，你家毛孩子呢？',
      shareTimelineTitle: '{date} 在毛孩子眼里，你是什么身份？',
      posterQuote: '{date} 它在用自己的方式，偷偷认定你了',
      moments: [
        '{date} 不一定需要回应，我家毛孩子已经用陪伴认定我了。\n我是「{title}」，你们是什么？'
      ]
    }
  },
  '61': {
    dateLabel: '6.1',
    badge: '6.1 限定',
    shareImage: '/assets/images/share-cover-61.jpg',
    month: 6,
    day: 1,
    texts: {
      homeSlogan: '{date} 今天换你做它的小朋友',
      ctaUploadText: '上传照片，生成 {date} 专属儿童节海报',
      ctaGoText: '生成 {date} 专属儿童节海报',
      posterGuideText: '{date} 测测你在它心里是什么身份',
      shareTitle: '{date} 儿童节我家毛孩子给我发了认证，来测你的！',
      shareTimelineTitle: '{date} 儿童节，在毛孩子眼里你是什么身份？',
      posterQuote: function (petType) {
        return '{date} 今天你做小朋友，' + (petType === 'cat' ? '本喵' : '本汪') + '来做你的家长'
      },
      moments: [
        '{date} 今天换我做小朋友了，我家毛孩子已经给我发了儿童节认证。\n我是「{title}」，你们是什么？'
      ]
    }
  }
}

/**
 * 获取当前节日 ID（如 '520' / '521'），无节日返回 null
 */
function getCurrentHoliday () {
  if (appConfig.forceHoliday) return appConfig.forceHoliday
  var now = new Date()
  var month = now.getMonth() + 1
  var day = now.getDate()
  for (var id in HOLIDAYS) {
    var h = HOLIDAYS[id]
    if (h.month === month && h.day === day) return id
  }
  return null
}

/**
 * 获取节日元信息（badge、dateLabel 等）
 */
function getHolidayMeta (holidayId) {
  if (!holidayId) return null
  var h = HOLIDAYS[holidayId]
  if (!h) return null
  return {
    id: holidayId,
    dateLabel: h.dateLabel,
    badge: h.badge,
    shareImage: h.shareImage || null
  }
}

/**
 * 获取节日文案，已替换 {date} 占位符
 * @param {string} holidayId - 节日 ID，如 '520'
 * @param {string} petType   - 'cat' | 'dog'，用于处理猫狗差异化文案
 */
function getTexts (holidayId, petType) {
  var h = HOLIDAYS[holidayId]
  if (!h || !h.texts) return null
  var result = {}
  var label = h.dateLabel
  for (var key in h.texts) {
    var val = h.texts[key]
    if (typeof val === 'function') {
      val = val(petType)
    }
    if (typeof val === 'string') {
      result[key] = val.replace(/\{date\}/g, label)
    } else if (Array.isArray(val)) {
      result[key] = val.map(function (item) {
        if (typeof item === 'function') item = item(petType)
        return item.replace(/\{date\}/g, label)
      })
    } else {
      result[key] = val
    }
  }
  return result
}

module.exports = {
  getCurrentHoliday: getCurrentHoliday,
  getHolidayMeta: getHolidayMeta,
  getTexts: getTexts
}
