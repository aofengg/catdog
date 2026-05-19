/**
 * 分享配置工具
 * 统一所有页面的分享行为，确保路径始终回首页
 * 节日期间自动使用节日氛围文案
 */

var holidayConfig = require('../config/holidayConfig.js')

var DEFAULT_SHARE = {
  title: '来《它眼中的你》，测测在毛孩子眼中你是什么样的存在！',
  path: '/pages/home/home',
  imageUrl: '/assets/images/share-cover.jpg'
}

var DEFAULT_TIMELINE = {
  title: '测测在毛孩子眼中，你是什么样的存在？',
  query: ''
}

function getShareMessage() {
  var holiday = holidayConfig.getCurrentHoliday()
  var title = DEFAULT_SHARE.title
  var imageUrl = DEFAULT_SHARE.imageUrl
  if (holiday) {
    var texts = holidayConfig.getTexts(holiday)
    var meta = holidayConfig.getHolidayMeta(holiday)
    if (texts && texts.shareTitle) title = texts.shareTitle
    if (meta && meta.shareImage) imageUrl = meta.shareImage
  }
  return {
    title: title,
    path: DEFAULT_SHARE.path,
    imageUrl: imageUrl
  }
}

function getShareTimeline() {
  var holiday = holidayConfig.getCurrentHoliday()
  var title = DEFAULT_TIMELINE.title
  if (holiday) {
    var texts = holidayConfig.getTexts(holiday)
    if (texts && texts.shareTimelineTitle) title = texts.shareTimelineTitle
  }
  return {
    title: title,
    query: DEFAULT_TIMELINE.query
  }
}

module.exports = {
  getShareMessage: getShareMessage,
  getShareTimeline: getShareTimeline
}
