var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var adConfig = require('../../config/adConfig.js')
var posterHelper = require('../../utils/posterHelper.js')
var toast = require('../../utils/toast.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    resultCode: '',
    photoPath: '',
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
  _relationship: null,

  onLoad: function (options) {
    var pages = getCurrentPages()
    if (pages.length <= 1) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    var petType = options.petType || 'cat'
    var resultCode = options.resultCode || 'SHCD'
    var photoPath = options.photoPath ? decodeURIComponent(options.photoPath) : ''

    this._petData = petType === 'dog' ? dogData : catData
    this._relationship = this._petData.relationships[resultCode]

    if (!this._relationship) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    this.setData({
      petType: petType,
      resultCode: resultCode,
      photoPath: photoPath,
      circleText: this._relationship.circleText
    })

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
        this._interstitialAd.onError(function () { })
      }
    } catch (e) { }
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

      try {
        posterHelper.draw(ctx, {
          canvas: canvas,
          petData: self._petData,
          relationship: self._relationship,
          resultCode: self.data.resultCode,
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
    if (!self._canvas && !self._tempImagePath) {
      toast.showError('\u6d77\u62a5\u672a\u5c31\u7eea')
      return
    }

    toast.showLoading('\u4fdd\u5b58\u4e2d...')

    self._ensureTempImage(function (err, filePath) {
      if (err) {
        toast.hideLoading()
        toast.showError('\u751f\u6210\u56fe\u7247\u5931\u8d25')
        return
      }
      wx.saveImageToPhotosAlbum({
        filePath: filePath,
        success: function () {
          toast.hideLoading()
          toast.showSuccess('\u5df2\u4fdd\u5b58\u5230\u76f8\u518c')
          self._showAdAfterSave()
        },
        fail: function (errObj) {
          toast.hideLoading()
          if (errObj.errMsg && errObj.errMsg.indexOf('auth deny') !== -1) {
            toast.showModal({
              title: '\u9700\u8981\u6388\u6743',
              content: '\u8bf7\u5728\u8bbe\u7f6e\u4e2d\u5141\u8bb8\u4fdd\u5b58\u56fe\u7247\u5230\u76f8\u518c',
              confirmText: '\u53bb\u8bbe\u7f6e'
            }).then(function (confirmed) {
              if (confirmed) {
                wx.openSetting()
              }
            })
          } else {
            toast.showError('\u4fdd\u5b58\u5931\u8d25')
          }
        }
      })
    })
  },

  onShareImage: function () {
    var self = this
    if (!self._canvas && !self._tempImagePath) {
      toast.showError('\u6d77\u62a5\u672a\u5c31\u7eea')
      return
    }

    toast.showLoading('\u51c6\u5907\u4e2d...')

    self._ensureTempImage(function (err, filePath) {
      toast.hideLoading()
      if (err) {
        toast.showError('\u751f\u6210\u56fe\u7247\u5931\u8d25')
        return
      }
      if (wx.showShareImageMenu) {
        wx.showShareImageMenu({
          path: filePath,
          menus: ['shareAppMessage', 'shareTimeline', 'savePicture', 'collectPicture'],
          fail: function () { toast.showError('\u5206\u4eab\u5931\u8d25') }
        })
      } else {
        wx.saveImageToPhotosAlbum({
          filePath: filePath,
          success: function () { toast.showSuccess('\u5df2\u4fdd\u5b58\u5230\u76f8\u518c') },
          fail: function () { toast.showError('\u4fdd\u5b58\u5931\u8d25') }
        })
      }
    })
  },

  _showAdAfterSave: function () {
    if (!this._interstitialAd) return
    var self = this
    self._adTimer = setTimeout(function () {
      try {
        self._interstitialAd.show().catch(function () { })
      } catch (e) { }
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

  onCopyText: function () {
    var text = this.data.circleText + ' #\u5b83\u773c\u91cc\u7684\u4f60 #\u4eba\u5ba0\u5173\u7cfb\u6d4b\u8bd5'
    wx.setClipboardData({
      data: text,
      success: function () {
        toast.showSuccess('\u5df2\u590d\u5236')
      }
    })
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
