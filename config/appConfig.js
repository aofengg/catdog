/**
 * 全局应用配置
 */

var appConfig = {
  // 强制激活某个节日（调试用），设为 '520'/'521' 可在任意日期预览对应样式
  // forceHoliday: 61,
  forceHoliday: null,
  // 激励视频广告位ID，留空时降级为直接解锁（方便开发调试）
  // rewardedAdUnitId: ''
  rewardedAdUnitId: 'adunit-f39a60cd010127d5'
}

module.exports = appConfig
