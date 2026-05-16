var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var appConfig = require('../../config/appConfig.js')
var posterHelper = require('../../utils/posterHelper.js')
var toast = require('../../utils/toast.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    resultCode: '',
    photoPath: '',
    petName: '',
    isDrawing: true,
    drawError: false,
    posterImage: '',
    circleText: ''
  },

  _canvas: null,
  _canvasImg: null,
  _tempImagePath: null,
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
    var petName = options.petName ? decodeURIComponent(options.petName) : ''
    var tScore = parseInt(options.tScore) || 0

    this._petData = petType === 'dog' ? dogData : catData
    this._relationship = this._petData.relationships[resultCode]

    if (!this._relationship) {
      wx.redirectTo({ url: '/pages/home/home' })
      return
    }

    // T分修正：与 result.js 保持一致
    var rel = this._relationship
    if (tScore >= 4 && rel.tOverride) {
      rel = {}
      for (var k in this._relationship) { rel[k] = this._relationship[k] }
      rel.title = this._relationship.tOverride.title
      rel.goldQuote = this._relationship.tOverride.goldQuote
      if (tScore >= 2 && this._relationship.tTag) {
        rel.tags = [this._relationship.tTag].concat(this._relationship.tags)
      }
      this._relationship = rel
    } else if (tScore >= 2 && rel.tTag) {
      rel = {}
      for (var k in this._relationship) { rel[k] = this._relationship[k] }
      rel.tags = [this._relationship.tTag].concat(this._relationship.tags)
      this._relationship = rel
    }

    // 生成分享文案：优先 promoTexts.moments，fallback circleTexts
    var circleText = ''
    var brand = this._petData.brand
    var rel = this._relationship

    if (brand.promoTexts && brand.promoTexts.moments && brand.promoTexts.moments.length > 0) {
      var pool = brand.promoTexts.moments.slice()
      // 5.20 限定：将520专属文案加入选择池
      if (appConfig.is520() && brand.promoTexts.moments520) {
        pool = pool.concat(brand.promoTexts.moments520)
      }
      var template = pool[Math.floor(Math.random() * pool.length)]
      circleText = template
        .replace(/\{title\}/g, rel.title)
        .replace(/\{goldQuote\}/g, rel.goldQuote)
    } else {
      var circleTexts = rel.circleTexts
      if (circleTexts && circleTexts.length > 0) {
        circleText = circleTexts[Math.floor(Math.random() * circleTexts.length)]
      } else {
        circleText = rel.circleText || ''
      }
    }

    this.setData({
      petType: petType,
      resultCode: resultCode,
      photoPath: photoPath,
      petName: petName,
      circleText: circleText
    })
  },

  onReady: function () {
    this._drawPoster()
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

      // 引导文案（可按日期切换）
      var brand = self._petData.brand
      var guideText = brand.posterGuideText || '扫码测测你在它心里是什么身份'
      // 5.20 限定
      if (appConfig.is520() && brand.posterGuideText520) {
        guideText = brand.posterGuideText520
      }

      try {
        var drawIs520 = appConfig.is520()
        posterHelper.draw(ctx, {
          canvas: canvas,
          petData: self._petData,
          relationship: self._relationship,
          resultCode: self.data.resultCode,
          photoPath: self.data.photoPath,
          petName: self.data.petName,
          guideText: guideText,
          is520: drawIs520,
          poster520Quote: drawIs520 ? (brand.poster520Quote || '') : ''
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
    if (!self._canvas && !self._tempImagePath) {
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
  },

  onCopyText: function () {
    var text = this.data.circleText + ' #它眼中的你 #人宠关系测试PETI'
    wx.setClipboardData({
      data: text,
      success: function () {
        toast.showSuccess('已复制')
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
