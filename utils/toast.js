/**
 * Toast 提示封装工具
 * 统一全局提示行为，ES5 严格兼容
 */

function showSuccess(title) {
  wx.showToast({ title: title || '操作成功', icon: 'success', duration: 1500 })
}

function showError(title) {
  wx.showToast({ title: title || '操作失败', icon: 'none', duration: 2000 })
}

function showLoading(title) {
  wx.showLoading({ title: title || '加载中...', mask: true })
}

function hideLoading() {
  wx.hideLoading()
}

function showModal(options) {
  return new Promise(function (resolve) {
    wx.showModal({
      title: options.title || '提示',
      content: options.content || '',
      showCancel: options.showCancel !== false,
      cancelText: options.cancelText || '取消',
      confirmText: options.confirmText || '确定',
      confirmColor: options.confirmColor || '#6B5CE7',
      success: function (res) {
        resolve(res.confirm)
      },
      fail: function () {
        resolve(false)
      }
    })
  })
}

module.exports = {
  showSuccess: showSuccess,
  showError: showError,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showModal: showModal
}
