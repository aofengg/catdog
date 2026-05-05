var share = require('../../utils/share.js')

Page({
  data: {
    tapAnim: ''
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
