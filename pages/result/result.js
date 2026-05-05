var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var adConfig = require('../../config/adConfig.js')
var scorer = require('../../utils/scorer.js')
var toast = require('../../utils/toast.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    resultCode: '',
    masterCode: '',
    personality: null,
    matchInfo: null,
    photoPath: '',
    showAd: false,
    adUnitId: '',
    rareBgColor: '#95A5A6',
    showDisclaimer: false
  },

  _petData: null,

  onLoad: function (options) {
    // 防深链接：页面栈仅 1 层 = 外部直接进入
    var pages = getCurrentPages()
    if (pages.length <= 1) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    var petType = options.petType || 'cat'
    var resultCode = options.resultCode || 'ENFP'
    var masterCode = options.masterCode || ''

    var petData = petType === 'dog' ? dogData : catData
    var personality = petData.personalities[resultCode]

    if (!personality) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    // 计算匹配
    var matchInfo = null
    if (masterCode) {
      matchInfo = scorer.getMatch(resultCode, masterCode, petData)
    }

    // 稀有度颜色
    var rareBgColor = '#95A5A6'
    if (personality.rare === '传说款') rareBgColor = '#FFD700'
    else if (personality.rare === '珍稀款') rareBgColor = '#9B59B6'
    else if (personality.rare === '独特款') rareBgColor = '#3498DB'

    // 广告配置
    var showAd = adConfig.banner.enabled
    var adUnitId = adConfig.banner.result

    this._petData = petData
    this.setData({
      petType: petType,
      resultCode: resultCode,
      masterCode: masterCode,
      personality: personality,
      matchInfo: matchInfo,
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
        self.setData({ photoPath: tempPath })
      }
    })
  },

  onGeneratePoster: function () {
    var url = '/pages/poster/poster?petType=' + this.data.petType +
      '&resultCode=' + this.data.resultCode
    if (this.data.masterCode) {
      url += '&masterCode=' + this.data.masterCode
    }
    if (this.data.photoPath) {
      url += '&photoPath=' + encodeURIComponent(this.data.photoPath)
    }
    wx.navigateTo({ url: url })
  },

  onRetest: function () {
    var self = this
    toast.showModal({
      title: '确定重新测试吗？',
      content: '当前结果不会被保存',
      confirmText: '重新测试',
      confirmColor: self.data.petType === 'cat' ? '#6B5CE7' : '#FF8C42'
    }).then(function (confirmed) {
      if (confirmed) {
        wx.redirectTo({ url: '/pages/quiz/quiz?petType=' + self.data.petType })
      }
    })
  },

  onCopyText: function () {
    var text = ''
    if (this.data.matchInfo) {
      text = this.data.matchInfo.matchCircleText
    } else {
      text = this.data.personality.circleText
    }
    text += ' #喵汪人格测试 #PETI人格测试'

    wx.setClipboardData({
      data: text,
      success: function () {
        toast.showSuccess('已复制')
      }
    })
  },

  onAdError: function () {
    this.setData({ showAd: false })
  },

  onToggleDisclaimer: function () {
    this.setData({ showDisclaimer: !this.data.showDisclaimer })
  },

  onShareAppMessage: function () {
    var petLabel = this.data.petType === 'cat' ? '猫咪' : '修勾'
    var name = this.data.personality ? this.data.personality.petName : ''
    var title = ''
    if (this.data.matchInfo) {
      title = '我家' + petLabel + '是' + name + '，和我' + this.data.matchInfo.tag + '！你家呢？'
    } else if (this.data.personality) {
      title = '我家' + petLabel + '是' + name + '，' + this.data.personality.posterBadge + '！你家呢？'
    } else {
      title = '来喵汪人格测试，测测你家毛孩子的隐藏人格！'
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
