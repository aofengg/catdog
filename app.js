App({
  onLaunch: function () {
    if (wx.onMemoryWarning) {
      wx.onMemoryWarning(function (res) {
        console.warn('[Memory] level:', res.level)
      })
    }
  }
})
