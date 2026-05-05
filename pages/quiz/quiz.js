var catData = require('../../config/catData.js')
var dogData = require('../../config/dogData.js')
var scorer = require('../../utils/scorer.js')
var share = require('../../utils/share.js')

Page({
  data: {
    petType: 'cat',
    stage: 'quiz',
    currentIndex: 0,
    totalQuestions: 20,
    currentQuestion: null,
    answers: [],
    masterList: [],
    selectedMaster: ''
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
      answers: Array.apply(null, Array(questions.length)).map(function () { return '' }),
      masterList: this._petData.masterPetiList
    })
  },

  onSelectOption: function (e) {
    var choice = e.currentTarget.dataset.choice
    var idx = this.data.currentIndex
    var answers = this.data.answers
    answers[idx] = choice

    var self = this
    self.setData({ answers: answers })

    setTimeout(function () {
      if (idx < self.data.totalQuestions - 1) {
        self._goNext()
      } else {
        // 第 20 题选完，进入选择主人类型
        self.setData({ stage: 'master' })
      }
    }, 300)
  },

  onPrev: function () {
    if (this.data.currentIndex <= 0) return
    var newIdx = this.data.currentIndex - 1
    this.setData({
      currentIndex: newIdx,
      currentQuestion: this._petData.questions[newIdx]
    })
  },

  _goNext: function () {
    var newIdx = this.data.currentIndex + 1
    this.setData({
      currentIndex: newIdx,
      currentQuestion: this._petData.questions[newIdx]
    })
  },

  onSelectMaster: function (e) {
    var masterCode = e.currentTarget.dataset.code
    var self = this
    self.setData({ selectedMaster: masterCode })
    setTimeout(function () {
      self._goResult(masterCode)
    }, 300)
  },

  onSkipMaster: function () {
    this._goResult('')
  },

  _goResult: function (masterCode) {
    var resultCode = scorer.calculate(this.data.answers, this._petData.questions)
    var url = '/pages/result/result?petType=' + this.data.petType + '&resultCode=' + resultCode
    if (masterCode) {
      url += '&masterCode=' + masterCode
    }
    wx.redirectTo({ url: url })
  },

  onShareAppMessage: function () {
    return share.getShareMessage()
  }
})
