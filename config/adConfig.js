/**
 * 广告配置 - 各广告位独立开关
 * 开通流量主后，替换 adUnitId 并将对应 enabled 设为 true
 */

var adConfig = {
  banner: {
    enabled: false,
    result: 'adunit-xxxxxxxx'
  },
  interstitial: {
    enabled: false,
    posterSave: 'adunit-yyyyyyyy'
  }
}

module.exports = adConfig
