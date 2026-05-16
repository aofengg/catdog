/**
 * 人宠关系计分算法
 * 4 维度关系模型：S/F H/L C/P D/R + T分（相爱相杀分）
 * 正式题每字母+2，彩蛋题每字母+1（等价于权重1.0 vs 0.5，整数化避免浮点精度问题）
 */

/**
 * 计算关系类型代码 + T分 + 预判答案
 * @param {Object[]} answers - 答题记录 [{questionId, selected}]
 * @param {Object[]} questions - 题目配置数组
 * @returns {{ code: string, tScore: number, predAnswer: string|null }}
 */
function calculate(answers, questions) {
  var counts = { S: 0, F: 0, H: 0, L: 0, C: 0, P: 0, D: 0, R: 0 }
  var tScore = 0
  var predAnswer = null

  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i]
    var q = questions[answer.questionId]
    if (!q) continue
    var option = q.options[answer.selected]
    if (!option) continue

    var qType = q.type || 'normal'

    // 预判题：只记录答案，不计维度分
    if (qType === 'prediction') {
      predAnswer = option.predKey || null
      if (option.tScore) tScore += option.tScore
      continue
    }

    // 维度计分
    if (option.score) {
      var weight = (qType === 'bonus') ? 1 : 2
      counts[option.score[0]] = (counts[option.score[0]] || 0) + weight
      counts[option.score[1]] = (counts[option.score[1]] || 0) + weight
    }

    // T分累加
    if (option.tScore) {
      tScore += option.tScore
    }
  }

  var code = ''
  code += counts.S >= counts.F ? 'S' : 'F'
  code += counts.H >= counts.L ? 'H' : 'L'
  code += counts.C >= counts.P ? 'C' : 'P'
  code += counts.D >= counts.R ? 'D' : 'R'

  return { code: code, tScore: tScore, predAnswer: predAnswer }
}

module.exports = {
  calculate: calculate
}
