/**
 * 人宠关系计分算法
 * 4 维度关系模型：S/F H/L C/P D/R
 * 每题 4 选项覆盖 2 个维度，选中选项的 2 个字母各 +1
 */

/**
 * 计算关系类型代码
 * @param {Object[]} answers - 答题记录 [{questionId, selected}]，selected 为 0-3 索引
 * @param {Object[]} questions - 题目配置数组（含 options[].score）
 * @returns {string} 4 字母关系代码，如 'SHCD'
 */
function calculate(answers, questions) {
  var counts = { S: 0, F: 0, H: 0, L: 0, C: 0, P: 0, D: 0, R: 0 }

  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i]
    var q = questions[answer.questionId]
    if (!q) continue
    var option = q.options[answer.selected]
    if (!option || !option.score) continue
    var score = option.score // 2 字母，如 'SH'、'FL'
    counts[score[0]] = (counts[score[0]] || 0) + 1
    counts[score[1]] = (counts[score[1]] || 0) + 1
  }

  var code = ''
  code += counts.S >= counts.F ? 'S' : 'F'
  code += counts.H >= counts.L ? 'H' : 'L'
  code += counts.C >= counts.P ? 'C' : 'P'
  code += counts.D >= counts.R ? 'D' : 'R'

  return code
}

module.exports = {
  calculate: calculate
}
