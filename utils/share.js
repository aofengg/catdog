/**
 * 分享配置工具
 * 统一所有页面的分享行为，确保路径始终回首页
 */

var DEFAULT_SHARE = {
  title: '来喵汪人格测试，测测你家毛孩子的隐藏人格！',
  path: '/pages/home/home',
  imageUrl: '/assets/images/share-cover.jpg'
}

var DEFAULT_TIMELINE = {
  title: '测测你家毛孩子是什么人格？',
  query: ''
}

function getShareMessage() {
  return {
    title: DEFAULT_SHARE.title,
    path: DEFAULT_SHARE.path,
    imageUrl: DEFAULT_SHARE.imageUrl
  }
}

function getShareTimeline() {
  return {
    title: DEFAULT_TIMELINE.title,
    query: DEFAULT_TIMELINE.query
  }
}

module.exports = {
  getShareMessage: getShareMessage,
  getShareTimeline: getShareTimeline
}
