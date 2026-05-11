var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var adConfig = require('../../config/adConfig.js')
var toast = require('../../utils/toast.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    resultCode: '',
    resultHeader: '',
    relationship: null,
    photoPath: '',
    showAd: false,
    adUnitId: '',
    rareBgColor: '#95A5A6'
  },

  _petData: null,

  onLoad: function (options) {
    var pages = getCurrentPages()
    if (pages.length <= 1) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    var petType = options.petType || 'cat'
    var resultCode = options.resultCode || 'SHCD'

    var petData = petType === 'dog' ? dogData : catData
    var relationship = petData.relationships[resultCode]

    if (!relationship) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    var rareBgColor = '#95A5A6'
    if (relationship.rare === '\u524d3%') rareBgColor = '#FFD700'
    else if (relationship.rare === '\u524d8%') rareBgColor = '#9B59B6'
    else if (relationship.rare === '\u524d15%') rareBgColor = '#3498DB'
    else if (relationship.rare === '\u524d25%') rareBgColor = '#78B4A0'

    var showAd = adConfig.banner.enabled
    var adUnitId = adConfig.banner.result

    this._petData = petData
    this.setData({
      petType: petType,
      resultCode: resultCode,
      resultHeader: petData.brand.resultHeader || '',
      relationship: relationship,
      resultImage: '/assets/images/result/' + petType + '/' + resultCode + '.jpg',
      rareBgColor: rareBgColor,
      showAd: showAd,
      adUnitId: adUnitId
    })
  },

  onUploadPhoto: function () {
    var self = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempPath = res.tempFiles[0].tempFilePath
        if (wx.cropImage) {
          wx.cropImage({
            src: tempPath,
            cropScale: '1:1',
            success: function (cropRes) {
              self.setData({ photoPath: cropRes.tempFilePath })
            },
            fail: function () {
              self.setData({ photoPath: tempPath })
            }
          })
        } else {
          self.setData({ photoPath: tempPath })
        }
      }
    })
  },

  onGeneratePoster: function () {
    if (this._navigating) return
    this._navigating = true
    var self = this
    wx.showLoading({ title: '海报生成中...', mask: true })
    var url = '/pages/poster/poster?petType=' + this.data.petType +
      '&resultCode=' + this.data.resultCode
    if (this.data.photoPath) {
      url += '&photoPath=' + encodeURIComponent(this.data.photoPath)
    }
    setTimeout(function () {
      wx.hideLoading()
      wx.navigateTo({
        url: url,
        complete: function () {
          self._navigating = false
        }
      })
    }, 800)
  },

  onRetest: function () {
    var self = this
    toast.showModal({
      title: '\u786e\u5b9a\u91cd\u65b0\u6d4b\u8bd5\u5417\uff1f',
      content: '\u5f53\u524d\u7ed3\u679c\u4e0d\u4f1a\u88ab\u4fdd\u5b58',
      confirmText: '\u91cd\u65b0\u6d4b\u8bd5',
      confirmColor: self.data.petType === 'cat' ? '#6B5CE7' : '#FF8C42'
    }).then(function (confirmed) {
      if (confirmed) {
        wx.redirectTo({ url: '/pages/quiz/quiz?petType=' + self.data.petType })
      }
    })
  },

  onAdError: function () {
    this.setData({ showAd: false })
  },

  onShareAppMessage: function () {
    var r = this.data.relationship
    var title = ''
    if (r) {
      title = '\u300c' + r.title + '\u300d\u2014\u2014' + r.goldQuote
    } else {
      title = '\u6765\u300a\u5b83\u773c\u91cc\u7684\u4f60\u300b\uff0c\u6d4b\u6d4b\u4f60\u5728\u6bdb\u5b69\u5b50\u773c\u4e2d\u662f\u8c01\uff01'
    }
    return {
      title: title,
      path: '/pages/home/home',
      imageUrl: '/assets/images/share-cover.jpg'
    }
  },

  onShareTimeline: function () {
    return share.getShareTimeline()
  }
})
