var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var adConfig = require('../../config/adConfig.js')
var scorer = require('../../utils/scorer.js')
var posterHelper = require('../../utils/posterHelper.js')
var toast = require('../../utils/toast.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    resultCode: '',
    masterCode: '',
    photoPath: '',
    showMatch: true,
    isDrawing: true,
    drawError: false,
    posterImage: ''
  },

  _canvas: null,
  _canvasImg: null,
  _tempImagePath: null,
  _interstitialAd: null,
  _adTimer: null,
  _petData: null,
  _personality: null,
  _matchInfo: null,

  onLoad: function (options) {
    // 防深链接
    var pages = getCurrentPages()
    if (pages.length <= 1) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    var petType = options.petType || 'cat'
    var resultCode = options.resultCode || 'ENFP'
    var masterCode = options.masterCode || ''
    var photoPath = options.photoPath ? decodeURIComponent(options.photoPath) : ''

    this._petData = petType === 'dog' ? dogData : catData
    this._personality = this._petData.personalities[resultCode]

    if (!this._personality) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    if (masterCode) {
      this._matchInfo = scorer.getMatch(resultCode, masterCode, this._petData)
    }

    this.setData({
      petType: petType,
      resultCode: resultCode,
      masterCode: masterCode,
      photoPath: photoPath,
      showMatch: !!masterCode
    })

    // 初始化插屏广告
    this._initInterstitialAd()
  },

  onReady: function () {
    this._drawPoster()
  },

  _initInterstitialAd: function () {
    if (!adConfig.interstitial.enabled) return
    try {
      if (wx.createInterstitialAd) {
        this._interstitialAd = wx.createInterstitialAd({
          adUnitId: adConfig.interstitial.posterSave
        })
        this._interstitialAd.onError(function () { /* 静默 */ })
      }
    } catch (e) { /* 静默 */ }
  },

  _drawPoster: function () {
    var self = this
    self.setData({ isDrawing: true, drawError: false, posterImage: '' })
    self._tempImagePath = null

    var query = wx.createSelectorQuery()
    query.select('#posterCanvas').fields({ node: true, size: true }).exec(function (res) {
      if (!res || !res[0] || !res[0].node) {
        self.setData({ isDrawing: false, drawError: true })
        return
      }

      var canvas = res[0].node
      self._canvas = canvas

      var ctx = canvas.getContext('2d')
      // 画布尺寸由 posterHelper 内部动态设置

      try {
        posterHelper.draw(ctx, {
          canvas: canvas,
          petData: self._petData,
          personality: self._personality,
          resultCode: self.data.resultCode,
          masterCode: self.data.masterCode,
          matchInfo: self.data.showMatch ? self._matchInfo : null,
          photoPath: self.data.photoPath
        }, function (err) {
          if (err) {
            self.setData({ isDrawing: false, drawError: true })
          } else {
            self._generatePreview()
          }
        })
      } catch (e) {
        console.error('[Poster] draw error:', e)
        self.setData({ isDrawing: false, drawError: true })
      }
    })
  },

  _generatePreview: function () {
    var self = this
    wx.canvasToTempFilePath({
      canvas: self._canvas,
      fileType: 'jpg',
      quality: 0.92,
      success: function (res) {
        self._tempImagePath = res.tempFilePath
        self.setData({ isDrawing: false, posterImage: res.tempFilePath })
        // 释放 canvas 内存（已导出为图片，不再需要）
        self._canvas.width = 0
        self._canvas.height = 0
      },
      fail: function () {
        self.setData({ isDrawing: false, drawError: true })
      }
    })
  },

  onRetryDraw: function () {
    this._drawPoster()
  },

  onToggleMatch: function () {
    var showMatch = !this.data.showMatch
    this.setData({ showMatch: showMatch })
    this._drawPoster()
  },

  _ensureTempImage: function (callback) {
    var self = this
    if (self._tempImagePath) {
      callback(null, self._tempImagePath)
      return
    }
    if (!self._canvas) {
      callback(new Error('canvas not ready'))
      return
    }
    wx.canvasToTempFilePath({
      canvas: self._canvas,
      fileType: 'jpg',
      quality: 0.92,
      success: function (res) {
        self._tempImagePath = res.tempFilePath
        callback(null, res.tempFilePath)
      },
      fail: function () {
        callback(new Error('generate failed'))
      }
    })
  },

  onSaveToAlbum: function () {
    var self = this
    if (!self._canvas) {
      toast.showError('海报未就绪')
      return
    }

    toast.showLoading('保存中...')

    self._ensureTempImage(function (err, filePath) {
      if (err) {
        toast.hideLoading()
        toast.showError('生成图片失败')
        return
      }
      wx.saveImageToPhotosAlbum({
        filePath: filePath,
        success: function () {
          toast.hideLoading()
          toast.showSuccess('已保存到相册')
          self._showAdAfterSave()
        },
        fail: function (errObj) {
          toast.hideLoading()
          if (errObj.errMsg && errObj.errMsg.indexOf('auth deny') !== -1) {
            toast.showModal({
              title: '需要授权',
              content: '请在设置中允许保存图片到相册',
              confirmText: '去设置'
            }).then(function (confirmed) {
              if (confirmed) {
                wx.openSetting()
              }
            })
          } else {
            toast.showError('保存失败')
          }
        }
      })
    })
  },

  onShareImage: function () {
    var self = this
    if (!self._canvas) {
      toast.showError('海报未就绪')
      return
    }

    toast.showLoading('准备中...')

    self._ensureTempImage(function (err, filePath) {
      toast.hideLoading()
      if (err) {
        toast.showError('生成图片失败')
        return
      }
      if (wx.showShareImageMenu) {
        wx.showShareImageMenu({
          path: filePath,
          menus: ['shareAppMessage', 'shareTimeline', 'savePicture', 'collectPicture'],
          fail: function () { toast.showError('分享失败') }
        })
      } else {
        wx.saveImageToPhotosAlbum({
          filePath: filePath,
          success: function () { toast.showSuccess('已保存到相册') },
          fail: function () { toast.showError('保存失败') }
        })
      }
    })
  },

  _showAdAfterSave: function () {
    if (!this._interstitialAd) return
    var self = this
    self._adTimer = setTimeout(function () {
      try {
        self._interstitialAd.show().catch(function () { /* 静默 */ })
      } catch (e) { /* 静默 */ }
    }, 500)
  },

  onUnload: function () {
    if (this._canvasImg) {
      this._canvasImg.src = ''
      this._canvasImg.onload = null
      this._canvasImg.onerror = null
      this._canvasImg = null
    }
    if (this._canvas) {
      this._canvas.width = 0
      this._canvas.height = 0
      this._canvas = null
    }
    if (this._interstitialAd) {
      this._interstitialAd.destroy && this._interstitialAd.destroy()
      this._interstitialAd = null
    }
    if (this._adTimer) {
      clearTimeout(this._adTimer)
      this._adTimer = null
    }
  },

  onShareAppMessage: function () {
    return share.getShareMessage()
  },

  onShareTimeline: function () {
    return share.getShareTimeline()
  },

  onAddToFavorites: function () {
    return share.getShareMessage()
  }
})
