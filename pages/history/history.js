var history = require('../../utils/history.js')

function formatTime(ts) {
  var d = new Date(ts)
  var mo = d.getMonth() + 1
  var day = d.getDate()
  var h = d.getHours()
  var m = d.getMinutes()
  return mo + '/' + day + ' ' + (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m)
}

Page({
  data: {
    list: []
  },

  onShow: function () {
    var raw = history.getAll()
    var list = raw.map(function (item) {
      return {
        id: item.id,
        petType: item.petType,
        resultCode: item.resultCode,
        tScore: item.tScore,
        predAnswer: item.predAnswer || '',
        petName: item.petName || '',
        title: item.title || item.resultCode,
        rare: item.rare || '',
        unlocked: !!item.unlocked,
        timeLabel: formatTime(item.createdAt)
      }
    })
    this.setData({ list: list })
  },

  onTapRecord: function (e) {
    var id = e.currentTarget.dataset.id
    var raw = history.getAll()
    var record = null
    for (var i = 0; i < raw.length; i++) {
      if (raw[i].id === id) { record = raw[i]; break }
    }
    if (!record) return

    var url = '/pages/result/result'
      + '?petType=' + record.petType
      + '&resultCode=' + record.resultCode
      + '&tScore=' + (record.tScore || 0)
      + '&historyId=' + record.id
    if (record.predAnswer) url += '&predAnswer=' + record.predAnswer
    if (record.petName) url += '&petName=' + encodeURIComponent(record.petName)

    wx.navigateTo({ url: url })
  }
})
