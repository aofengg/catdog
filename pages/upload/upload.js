var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    photoPath: '',
    petName: '',
    uploadTitle: '',
    uploadDesc: '',
    uploadCTA: ''
  },

  _petData: null,

  onLoad: function (options) {
    var petType = options.petType || 'cat'
    this._petData = petType === 'dog' ? dogData : catData

    var uploadTitle = petType === 'dog'
      ? '先交出你家修勾的证件照'
      : '先交出你家主子的证件照'
    var uploadDesc = '等下会生成专属关系卡，不然只能用系统默认图。'
    var uploadCTA = this._petData.brand.homeCTA.uploadCTA || '上传我家宝贝照片'

    this.setData({
      petType: petType,
      uploadTitle: uploadTitle,
      uploadDesc: uploadDesc,
      uploadCTA: uploadCTA
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

  onConfirmUpload: function () {
    if (!this.data.photoPath) {
      this.onUploadPhoto()
      return
    }
    this._goQuiz()
  },

  onSkipUpload: function () {
    this._goQuiz()
  },

  onPetNameInput: function (e) {
    this.setData({ petName: e.detail.value })
  },

  _goQuiz: function () {
    var url = '/pages/quiz/quiz?petType=' + this.data.petType
    if (this.data.photoPath) {
      url += '&photoPath=' + encodeURIComponent(this.data.photoPath)
    }
    if (this.data.petName) {
      url += '&petName=' + encodeURIComponent(this.data.petName)
    }
    wx.redirectTo({ url: url })
  },

  onShareAppMessage: function () {
    return share.getShareMessage()
  }
})
