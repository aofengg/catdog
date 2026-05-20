var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var holidayConfig = require('../../config/holidayConfig.js')
var share = require('../../utils/share.js')
var history = require('../../utils/history.js')

Page({
  data: {
    tapAnim: '',
    brandSlogan: '测测在毛孩子眼中，你是什么样的存在',
    catSubtitle: '',
    catBtnText: '',
    dogSubtitle: '',
    dogBtnText: '',
    hasHistory: false
  },

  onLoad: function () {
    var updates = {
      catSubtitle: catData.brand.homeCTA.subtitle || '',
      catBtnText: catData.brand.homeCTA.btnText || '测猫咪视角',
      dogSubtitle: dogData.brand.homeCTA.subtitle || '',
      dogBtnText: dogData.brand.homeCTA.btnText || '测修勾视角'
    }

    var holiday = holidayConfig.getCurrentHoliday()
    if (holiday) {
      var texts = holidayConfig.getTexts(holiday)
      if (texts && texts.homeSlogan) {
        updates.brandSlogan = texts.homeSlogan
      }
    }

    this.setData(updates)
  },

  onShow: function () {
    // 每次展示时刷新历史入口可见性
    this.setData({ hasHistory: history.getAll().length > 0 })
  },

  onTapCat: function () {
    this._goQuiz('cat')
  },

  onTapDog: function () {
    this._goQuiz('dog')
  },

  onTapHistory: function () {
    wx.navigateTo({ url: '/pages/history/history' })
  },

  _goQuiz: function (petType) {
    var self = this
    self.setData({ tapAnim: petType })
    wx.vibrateShort({ type: 'light' })
    setTimeout(function () {
      self.setData({ tapAnim: '' })
      wx.redirectTo({ url: '/pages/upload/upload?petType=' + petType })
    }, 200)
  },

  onShareAppMessage: function () {
    return share.getShareMessage()
  },

  onShareTimeline: function () {
    return share.getShareTimeline()
  }
})
