/**
 * 全局应用配置
 */

var appConfig = {
  // 强制启用 520 模式（调试用），设为 true 可在任意日期看到 520 样式
  force520: false,
  // 激励视频广告位ID，留空时降级为直接解锁（方便开发调试）
  rewardedAdUnitId: 'adunit-f39a60cd010127d5'
}

/**
 * 判断当前是否为 520 模式
 * force520 为 true 时始终返回 true，否则仅 5月20日 返回 true
 */
appConfig.is520 = function () {
  if (appConfig.force520) return true
  var now = new Date()
  return now.getMonth() === 4 && now.getDate() === 20
}

module.exports = appConfig
