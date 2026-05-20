var STORAGE_KEY = 'test_history'
var MAX_COUNT = 8

function getAll() {
  try {
    var list = wx.getStorageSync(STORAGE_KEY)
    return Array.isArray(list) ? list : []
  } catch (e) {
    return []
  }
}

function save(list) {
  try {
    wx.setStorageSync(STORAGE_KEY, list)
  } catch (e) {}
}

// 新增一条记录，超出8条删除最早的
function add(record) {
  var list = getAll()
  list.unshift(record)
  if (list.length > MAX_COUNT) {
    list = list.slice(0, MAX_COUNT)
  }
  save(list)
  return record.id
}

// 根据 id 更新字段
function update(id, fields) {
  var list = getAll()
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      for (var k in fields) {
        list[i][k] = fields[k]
      }
      break
    }
  }
  save(list)
}

// 根据 id 获取单条
function getById(id) {
  var list = getAll()
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) return list[i]
  }
  return null
}

// 删除单条
function remove(id) {
  var list = getAll()
  list = list.filter(function (item) { return item.id !== id })
  save(list)
}

module.exports = { getAll: getAll, add: add, update: update, getById: getById, remove: remove }
