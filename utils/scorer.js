/**
 * PETI 计分算法
 * 根据答题结果计算 4 字母人格代码
 */

/**
 * 计算人格类型代码
 * @param {string[]} answers - 每题的选择 ('A' 或 'B')
 * @param {Object[]} questions - 题目配置数组
 * @returns {string} 4 字母人格代码，如 'ENFP'
 */
function calculate(answers, questions) {
  var scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  for (var i = 0; i < questions.length; i++) {
    var q = questions[i]
    var choice = answers[i]
    if (!choice) continue
    var letter = choice === 'A' ? q.scoreA : q.scoreB
    scores[letter] = (scores[letter] || 0) + 1
  }

  var code = ''
  code += scores.E >= scores.I ? 'E' : 'I'
  code += scores.N >= scores.S ? 'N' : 'S'
  code += scores.F >= scores.T ? 'F' : 'T'
  code += scores.P >= scores.J ? 'P' : 'J'

  return code
}

/**
 * 计算匹配度
 * @param {string} petCode - 宠物人格代码
 * @param {string} masterCode - 主人人格代码
 * @param {Object} petData - 宠物数据配置
 * @returns {Object} 匹配结果 { score, tag, matchDesc, matchCircleText }
 */
function getMatch(petCode, masterCode, petData) {
  var personality = petData.personalities[petCode]
  if (!personality) return null

  // 1. 检查是否在 bestMatch 中
  if (personality.bestMatch && personality.bestMatch.indexOf(masterCode) !== -1) {
    return {
      score: personality.score,
      tag: personality.tag,
      matchDesc: personality.matchDesc,
      matchCircleText: personality.matchCircleText
    }
  }

  // 2. 比较字母相同数
  var sameCount = 0
  for (var i = 0; i < 4; i++) {
    if (petCode[i] === masterCode[i]) {
      sameCount++
    }
  }

  if (sameCount >= 3) {
    // 日常合拍
    var score = Math.floor(Math.random() * 9) + 74 // 74-82
    var desc = petData.petType === 'cat'
      ? '不算天选搭档，但日常相处还挺合拍，偶尔小摩擦反而是调味料。猫咪虽然不是对你最黏的，但该蹭的时候绝不含糊。'
      : '不算天选搭档，但日常相处还挺合拍，偶尔小摩擦反而是调味料。修勾虽然偶尔不听话，但该撒娇的时候绝不含糊。'
    return {
      score: score,
      tag: '日常合拍',
      matchDesc: desc,
      matchCircleText: petData.petType === 'cat'
        ? '我和我家猫的关系就是：不完美但刚刚好，日常小摩擦反而让感情更有温度😊'
        : '我和我家狗的关系就是：不完美但刚刚好，偶尔互相嫌弃但谁也离不开谁😊'
    }
  }

  if (sameCount === 2) {
    // 欢喜冤家 - 使用 lowMatch 数据
    return {
      score: petData.lowMatch.score,
      tag: petData.lowMatch.tag,
      matchDesc: petData.lowMatch.matchDesc,
      matchCircleText: petData.lowMatch.matchCircleText
    }
  }

  // 0-1 个相同：反差磨合
  var score2 = Math.floor(Math.random() * 7) + 52 // 52-58
  return {
    score: score2,
    tag: '反差磨合',
    matchDesc: petData.petType === 'cat'
      ? '你们的组合充满戏剧性——猫咪的性格和你完全不同频，但反差才是最大的看点。越是不一样，相处起来越有惊喜。'
      : '你们的组合充满戏剧性——修勾的性格和你完全不同频，但反差才是最大的看点。越是不一样，相处起来越有惊喜。',
    matchCircleText: petData.petType === 'cat'
      ? '测出来跟我家猫性格完全反着来，但这不妨碍我们互相拿捏、相爱相杀🔥'
      : '测出来跟我家狗性格完全反着来，但它还是每天摇着尾巴等我回家🔥'
  }
}

module.exports = {
  calculate: calculate,
  getMatch: getMatch
}
