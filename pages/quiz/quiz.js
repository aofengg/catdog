var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var scorer = require('../../utils/scorer.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    currentIndex: 0,
    totalQuestions: 20,
    currentQuestion: null,
    answers: [],
    selectedIndex: -1,
    optionLabels: ['A', 'B', 'C', 'D']
  },

  _petData: null,

  onLoad: function (options) {
    var petType = options.petType || 'cat'
    this._petData = petType === 'dog' ? dogData : catData
    var questions = this._petData.questions
    this.setData({
      petType: petType,
      totalQuestions: questions.length,
      currentQuestion: questions[0],
      answers: []
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
    this.setData({
      currentIndex: newIdx,
      currentQuestion: this._petData.questions[newIdx],
      selectedIndex: this._getSelectedFor(newIdx)
    })
  },

  _goNext: function () {
    var newIdx = this.data.currentIndex + 1
    this.setData({
      currentIndex: newIdx,
      currentQuestion: this._petData.questions[newIdx],
      selectedIndex: this._getSelectedFor(newIdx)
    })
  },

  _goResult: function () {
    var resultCode = scorer.calculate(this.data.answers, this._petData.questions)
    var url = '/pages/result/result?petType=' + this.data.petType + '&resultCode=' + resultCode
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
