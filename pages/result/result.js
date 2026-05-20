var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var appConfig = require('../../config/appConfig.js')
var holidayConfig = require('../../config/holidayConfig.js')
var toast = require('../../utils/toast.js')
var share = require('../../utils/share.js')
var history = require('../../utils/history.js')

Page({
  data: {
    petType: 'cat',
    resultCode: '',
    tScore: 0,
    resultHeader: '',
    relationship: null,
    photoPath: '',
    petName: '',
    placeholderImg: '/assets/images/cat-placeholder.jpg',
    rareBgColor: '#95A5A6',
    miniCards: [],
    customIndices: [],
    indicesTitle: '',
    relationshipDef: null,
    ctaUploadText: '上传照片，生成专属海报',
    ctaGoText: '生成我的专属海报',
    contentUnlocked: false,
    adLoaded: false
  },

  _petData: null,
  _videoAd: null,
  _historyId: null,

  onLoad: function (options) {
    var petType = options.petType || 'cat'
    var resultCode = options.resultCode || 'SHCD'
    var tScore = parseInt(options.tScore) || 0
    var predAnswer = options.predAnswer || null
    var petName = options.petName ? decodeURIComponent(options.petName) : ''

    // 记录 historyId，用于广告解锁后更新存储
    this._historyId = options.historyId || null

    // 从历史记录读取 unlocked 状态
    var alreadyUnlocked = false
    if (this._historyId) {
      var record = history.getById(this._historyId)
      if (record && record.unlocked) alreadyUnlocked = true
    }

    var petData = petType === 'dog' ? dogData : catData
    var rel = petData.relationships[resultCode]

    if (!rel) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    // T分修正
    var displayTitle = rel.title
    var displayGoldQuote = rel.goldQuote
    var displayTags = rel.tags.slice()
    var tLabel = ''

    if (tScore >= 4 && rel.tOverride) {
      displayTitle = rel.tOverride.title
      displayGoldQuote = rel.tOverride.goldQuote
      tLabel = '相爱相杀'
    }
    if (tScore >= 2 && rel.tTag) {
      if (displayTags.indexOf(rel.tTag) === -1) {
        displayTags.unshift(rel.tTag)
      }
      if (!tLabel) tLabel = '嘴硬心软'
    }

    // 预判题影响 petComment
    var petComment = rel.petComment
    if (predAnswer && rel.predComments && rel.predComments[predAnswer]) {
      petComment = rel.predComments[predAnswer]
    }

    // 构造展示用 relationship 对象（不污染原数据）
    var displayRel = {}
    for (var k in rel) { displayRel[k] = rel[k] }
    displayRel.title = displayTitle
    displayRel.goldQuote = displayGoldQuote
    displayRel.tags = displayTags.slice(0, 4)
    displayRel.petComment = petComment

    var rareBgColor = '#95A5A6'
    if (rel.rare === '前3%') rareBgColor = '#FFD700'
    else if (rel.rare === '前8%') rareBgColor = '#9B59B6'
    else if (rel.rare === '前15%') rareBgColor = '#3498DB'
    else if (rel.rare === '前25%') rareBgColor = '#78B4A0'


    // 专属指数（优先 customIndices，fallback 到旧 indices）
    var customIndices = rel.customIndices || (rel.indices ? rel.indices.map(function(item) {
      return { label: item.label, value: item.value, comment: '' }
    }) : [])

    // 指数卡标题
    var indicesTitle = (tLabel || rel.emotionTag || '关系') + '指数'

    // 关系定义（优先 relationshipDef，fallback 到旧 summary + description）
    var relationshipDef = rel.relationshipDef || {
      headline: rel.summary || '',
      detail: rel.description || '',
      cards: []
    }

    this._petData = petData

    this.setData({
      petType: petType,
      resultCode: resultCode,
      tScore: tScore,
      resultHeader: petData.brand.resultHeader || '',
      relationship: displayRel,
      rareBgColor: rareBgColor,
      miniCards: rel.miniCards || [],
      petName: petName,
      placeholderImg: petType === 'dog' ? '/assets/images/dog-placeholder.jpg' : '/assets/images/cat-placeholder.jpg',
      customIndices: customIndices,
      indicesTitle: indicesTitle,
      relationshipDef: relationshipDef,
      photoPath: options.photoPath ? decodeURIComponent(options.photoPath) : '',
      contentUnlocked: alreadyUnlocked
    })

    // 节日 CTA 文案
    var holiday = holidayConfig.getCurrentHoliday()
    if (holiday) {
      var hTexts = holidayConfig.getTexts(holiday, petType)
      if (hTexts) {
        if (hTexts.ctaUploadText) this.setData({ ctaUploadText: hTexts.ctaUploadText })
        if (hTexts.ctaGoText) this.setData({ ctaGoText: hTexts.ctaGoText })
      }
    }

    // 激励视频广告初始化
    this._initRewardedAd()
  },

  _initRewardedAd: function () {
    var self = this
    var adUnitId = appConfig.rewardedAdUnitId

    if (!adUnitId || typeof wx.createRewardedVideoAd !== 'function') {
      return
    }

    var videoAd = wx.createRewardedVideoAd({ adUnitId: adUnitId })
    self._videoAd = videoAd

    videoAd.onLoad(function () {
      self.setData({ adLoaded: true })
    })

    videoAd.onError(function (err) {
      var errCode = err && err.errCode
      if (errCode === 1004) {
        console.warn('激励视频：暂无广告填充', err)
      } else {
        console.warn('激励视频广告异常', err)
      }
      if (self._historyId) history.update(self._historyId, { unlocked: true })
      self.setData({ adLoaded: false, contentUnlocked: true })
    })

    videoAd.onClose(function (res) {
      if (res && res.isEnded) {
        if (self._historyId) {
          history.update(self._historyId, { unlocked: true })
        }
        self.setData({ contentUnlocked: true })
      } else {
        toast.showError('看完视频才能解锁哦~')
      }
    })
  },

  onUnlockTap: function () {
    var self = this
    if (!self._videoAd || !self.data.adLoaded) {
      if (self._historyId) history.update(self._historyId, { unlocked: true })
      self.setData({ contentUnlocked: true })
      toast.showSuccess('已为你解锁完整报告')
      return
    }

    self._videoAd.show().catch(function () {
      self._videoAd.load().then(function () {
        return self._videoAd.show()
      }).catch(function () {
        if (self._historyId) history.update(self._historyId, { unlocked: true })
        self.setData({ contentUnlocked: true })
        toast.showSuccess('已为你解锁完整报告')
      })
    })
  },

  onUploadPhoto: function (callback) {
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
              if (typeof callback === 'function') callback()
            },
            fail: function () {
              self.setData({ photoPath: tempPath })
              if (typeof callback === 'function') callback()
            }
          })
        } else {
          self.setData({ photoPath: tempPath })
          if (typeof callback === 'function') callback()
        }
      }
    })
  },

  onGeneratePoster: function () {
    var self = this
    if (!self.data.photoPath) {
      self.onUploadPhoto(function () {
        if (self.data.photoPath) {
          self._navigateToPoster()
        }
      })
      return
    }
    self._navigateToPoster()
  },

  _navigateToPoster: function () {
    if (this._navigating) return
    this._navigating = true
    var self = this
    wx.showLoading({ title: '海报生成中...', mask: true })
    var url = '/pages/poster/poster?petType=' + this.data.petType +
      '&resultCode=' + this.data.resultCode
    if (this.data.photoPath) {
      url += '&photoPath=' + encodeURIComponent(this.data.photoPath)
    }
    if (this.data.petName) {
      url += '&petName=' + encodeURIComponent(this.data.petName)
    }
    if (this.data.tScore) {
      url += '&tScore=' + this.data.tScore
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
      title: '确定重新测试吗？',
      content: '本次结果已保存在测试记录中，随时可以查看',
      confirmText: '重新测试',
      confirmColor: self.data.petType === 'cat' ? '#6B5CE7' : '#FF8C42'
    }).then(function (confirmed) {
      if (confirmed) {
        wx.redirectTo({ url: '/pages/quiz/quiz?petType=' + self.data.petType })
      }
    })
  },

  onGoHome: function () {
    wx.reLaunch({ url: '/pages/home/home' })
  },

  onShareAppMessage: function () {
    var r = this.data.relationship
    var holiday = holidayConfig.getCurrentHoliday()
    var hTexts = holiday ? holidayConfig.getTexts(holiday) : null
    var hMeta = holiday ? holidayConfig.getHolidayMeta(holiday) : null
    var title = ''
    if (r) {
      title = '\u300c' + r.title + '\u300d\u2014\u2014' + r.goldQuote
    } else if (hTexts && hTexts.shareTitle) {
      title = hTexts.shareTitle
    } else {
      title = '来《它眼中的你》，测测你在毛孩子眼中是谁！'
    }
    // 节日期间，在结果文案前拼上节日标语
    if (r && hTexts && hTexts.shareTitle) {
      title = hTexts.shareTitle + ' ' + '\u300c' + r.title + '\u300d'
    }
    var imageUrl = (hMeta && hMeta.shareImage) ? hMeta.shareImage : '/assets/images/share-cover.jpg'
    return {
      title: title,
      path: '/pages/home/home',
      imageUrl: imageUrl
    }
  },

  onShareTimeline: function () {
    return share.getShareTimeline()
  },

  onUnload: function () {
    if (this._videoAd) {
      this._videoAd.offLoad()
      this._videoAd.offError()
      this._videoAd.offClose()
      this._videoAd = null
    }
  }
})
