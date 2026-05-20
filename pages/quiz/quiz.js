var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var scorer = require('../../utils/scorer.js')
var share = require('../../utils/share.js')
var history = require('../../utils/history.js')

Page({
  data: {
    petType: 'cat',
    currentIndex: 0,
    totalQuestions: 17,
    currentQuestion: null,
    answers: [],
    selectedIndex: -1,
    optionLabels: ['A', 'B', 'C', 'D'],
    questionType: 'normal',
    normalProgress: 0,
    normalTotal: 12,
    showPhaseLabel: '',
    feedbackText: '',
    // 从 upload 页传入
    photoPath: '',
    petName: ''
  },

  _petData: null,
  _submitting: false,

  onLoad: function (options) {
    var petType = options.petType || 'cat'
    this._petData = petType === 'dog' ? dogData : catData
    var questions = this._petData.questions

    var normalTotal = 0
    for (var i = 0; i < questions.length; i++) {
      if ((questions[i].type || 'normal') === 'normal') normalTotal++
    }

    var q = questions[0]
    this.setData({
      petType: petType,
      totalQuestions: questions.length,
      normalTotal: normalTotal,
      currentQuestion: q,
      questionType: q.type || 'normal',
      showPhaseLabel: q.type === 'prediction' ? '热身题' : '',
      answers: [],
      photoPath: options.photoPath ? decodeURIComponent(options.photoPath) : '',
      petName: options.petName ? decodeURIComponent(options.petName) : ''
    })

    wx.enableAlertBeforeUnload({
      message: '答题未完成，退出后进度不会保存，确定离开吗？'
    })
  },

  onSelectOption: function (e) {
    var selected = e.currentTarget.dataset.index
    var idx = this.data.currentIndex
    var answers = this.data.answers.slice()

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
    if (this._submitting) return
    this._submitting = true
    wx.disableAlertBeforeUnload()
    var result = scorer.calculate(this.data.answers, this._petData.questions)
    var petType = this.data.petType
    var rel = this._petData.relationships[result.code]

    // 写入历史记录
    var historyId = petType + '_' + result.code + '_' + Date.now()
    history.add({
      id: historyId,
      petType: petType,
      resultCode: result.code,
      tScore: result.tScore,
      predAnswer: result.predAnswer || '',
      petName: this.data.petName || '',
      title: rel ? rel.title : result.code,
      rare: rel ? rel.rare : '',
      createdAt: Date.now(),
      unlocked: false
    })

    var url = '/pages/result/result?petType=' + petType
      + '&resultCode=' + result.code
      + '&tScore=' + result.tScore
      + '&historyId=' + historyId
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
