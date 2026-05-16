var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var appConfig = require('../../config/appConfig.js')
var share = require('../../utils/share.js')

Page({
  data: {
    tapAnim: '',
    brandSlogan: '测测在毛孩子眼中，你是什么样的存在',
    catSubtitle: '',
    catBtnText: '',
    dogSubtitle: '',
    dogBtnText: ''
  },

  onLoad: function () {
    var is520 = appConfig.is520()

    var updates = {
      catSubtitle: catData.brand.homeCTA.subtitle || '',
      catBtnText: catData.brand.homeCTA.btnText || '测猫咪视角',
      dogSubtitle: dogData.brand.homeCTA.subtitle || '',
      dogBtnText: dogData.brand.homeCTA.btnText || '测修勾视角'
    }

    if (is520) {
      updates.brandSlogan = '5.20 不一定要人类告白，你的毛孩子也在偷偷爱你'
    }

    this.setData(updates)
  },

  onTapCat: function () {
    this._goQuiz('cat')
  },

  onTapDog: function () {
    this._goQuiz('dog')
  },

  _goQuiz: function (petType) {
    var self = this
    self.setData({ tapAnim: petType })
    wx.vibrateShort({ type: 'light' })
    setTimeout(function () {
      self.setData({ tapAnim: '' })
      wx.navigateTo({ url: '/pages/quiz/quiz?petType=' + petType })
    }, 200)
  },

  onShareAppMessage: function () {
    return share.getShareMessage()
  },

  onShareTimeline: function () {
    return share.getShareTimeline()
  }
})
