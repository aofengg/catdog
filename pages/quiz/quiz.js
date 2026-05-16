var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var scorer = require('../../utils/scorer.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    currentIndex: 0,
    totalQuestions: 17,
    currentQuestion: null,
    answers: [],
    selectedIndex: -1,
    optionLabels: ['A', 'B', 'C', 'D'],
    questionType: 'upload',
    normalProgress: 0,
    normalTotal: 12,
    showPhaseLabel: '',
    // upload phase
    showUpload: true,
    photoPath: '',
    petName: '',
    uploadTitle: '',
    uploadDesc: '',
    uploadCTA: '',
    // midFeedback
    feedbackText: ''
  },

  _petData: null,

  onLoad: function (options) {
    var petType = options.petType || 'cat'
    this._petData = petType === 'dog' ? dogData : catData
    var questions = this._petData.questions

    var normalTotal = 0
    for (var i = 0; i < questions.length; i++) {
      if ((questions[i].type || 'normal') === 'normal') normalTotal++
    }

    var uploadTitle = petType === 'dog'
      ? '先交出你家修勾的证件照'
      : '先交出你家主子的证件照'
    var uploadDesc = '等下会生成专属关系卡，不然只能用系统默认图。'
    var uploadCTA = this._petData.brand.homeCTA.uploadCTA || '上传我家宝贝照片'

    this.setData({
      petType: petType,
      totalQuestions: questions.length,
      normalTotal: normalTotal,
      currentQuestion: questions[0],
      questionType: 'upload',
      showUpload: true,
      showPhaseLabel: '',
      uploadTitle: uploadTitle,
      uploadDesc: uploadDesc,
      uploadCTA: uploadCTA,
      answers: []
    })
  },

  // --- Upload phase ---
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
    this._exitUpload()
  },

  onSkipUpload: function () {
    this._exitUpload()
  },

  onPetNameInput: function (e) {
    this.setData({ petName: e.detail.value })
  },

  _exitUpload: function () {
    var q = this._petData.questions[0]
    this.setData({
      showUpload: false,
      questionType: q.type || 'normal',
      showPhaseLabel: q.type === 'prediction' ? '热身题' : ''
    })
  },

  onSelectOption: function (e) {
    var selected = e.currentTarget.dataset.index
    var idx = this.data.currentIndex
    var answers = this.data.answers.slice()

    // 查找是否已有该题答案
    var found = false
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].questionId === idx) {
        answers[i] = { questionId: idx, selected: selected }
        found = true
        break
      }
    }
    if (!found) {
      answers.push({ questionId: idx, selected: selected })
    }

    var self = this
    self.setData({ answers: answers, selectedIndex: selected })

    setTimeout(function () {
      if (idx < self.data.totalQuestions - 1) {
        self._goNext()
      } else {
        self._goResult()
      }
    }, 300)
  },

  onPrev: function () {
    if (this.data.currentIndex <= 0) return
    var newIdx = this.data.currentIndex - 1
    var q = this._petData.questions[newIdx]
    var qType = q.type || 'normal'

    // 回退时重算 normalProgress
    var normalProgress = 0
    for (var i = 0; i < newIdx; i++) {
      if ((this._petData.questions[i].type || 'normal') === 'normal') normalProgress++
    }

    var showPhaseLabel = ''
    if (qType === 'prediction') {
      showPhaseLabel = '热身题'
    } else if (qType === 'bonus') {
      var bonusIdx = 0
      var bonusTotal = 0
      for (var j = 0; j < this._petData.questions.length; j++) {
        if ((this._petData.questions[j].type || 'normal') === 'bonus') {
          bonusTotal++
          if (j <= newIdx) bonusIdx++
        }
      }
      showPhaseLabel = '彩蛋 ' + bonusIdx + '/' + bonusTotal
    }

    this.setData({
      currentIndex: newIdx,
      currentQuestion: q,
      selectedIndex: this._getSelectedFor(newIdx),
      questionType: qType,
      normalProgress: normalProgress,
      showPhaseLabel: showPhaseLabel
    })
  },

  _goNext: function () {
    var newIdx = this.data.currentIndex + 1
    if (newIdx >= this._petData.questions.length) {
      this._goResult()
      return
    }
    var q = this._petData.questions[newIdx]
    var qType = q.type || 'normal'

    var normalProgress = this.data.normalProgress
    var curQ = this._petData.questions[this.data.currentIndex]
    if ((curQ.type || 'normal') === 'normal') {
      normalProgress++
    }

    var showPhaseLabel = ''
    if (qType === 'prediction') {
      showPhaseLabel = '热身题'
    } else if (qType === 'bonus') {
      var bonusIdx = 0
      var bonusTotal = 0
      for (var i = 0; i < this._petData.questions.length; i++) {
        if ((this._petData.questions[i].type || 'normal') === 'bonus') {
          bonusTotal++
          if (i <= newIdx) bonusIdx++
        }
      }
      showPhaseLabel = '彩蛋 ' + bonusIdx + '/' + bonusTotal
    }

    this.setData({
      currentIndex: newIdx,
      currentQuestion: q,
      selectedIndex: this._getSelectedFor(newIdx),
      questionType: qType,
      normalProgress: normalProgress,
      showPhaseLabel: showPhaseLabel
    })

    // 只在刚完成一道正式题时检测 midFeedback
    if ((curQ.type || 'normal') === 'normal') {
      this._checkMidFeedback(normalProgress)
    }
  },

  _checkMidFeedback: function (normalDone) {
    var feedbacks = this._petData.midFeedback
    if (!feedbacks || !feedbacks.length) return
    var self = this
    for (var i = 0; i < feedbacks.length; i++) {
      if (feedbacks[i].after === normalDone) {
        self.setData({ feedbackText: feedbacks[i].text })
        setTimeout(function () {
          self.setData({ feedbackText: '' })
        }, 2000)
        break
      }
    }
  },

  _goResult: function () {
    var result = scorer.calculate(this.data.answers, this._petData.questions)
    var url = '/pages/result/result?petType=' + this.data.petType
      + '&resultCode=' + result.code
      + '&tScore=' + result.tScore
    if (result.predAnswer) {
      url += '&predAnswer=' + result.predAnswer
    }
    if (this.data.photoPath) {
      url += '&photoPath=' + encodeURIComponent(this.data.photoPath)
    }
    if (this.data.petName) {
      url += '&petName=' + encodeURIComponent(this.data.petName)
    }
    wx.redirectTo({ url: url })
  },

  _getSelectedFor: function (questionIdx) {
    var answers = this.data.answers
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].questionId === questionIdx) return answers[i].selected
    }
    return -1
  },

  onShareAppMessage: function () {
    return share.getShareMessage()
  }
})
