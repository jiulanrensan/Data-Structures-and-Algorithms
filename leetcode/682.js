/**
 * https://leetcode-cn.com/problems/baseball-game/
 */


// 输入的是一个数组，所以直接遍历就好，同时要记录上一个刚遍历过的元素

// 但写了一段代码后发现这样不行，因为"C"操作是取消上一轮有效得分，
// 但上上轮得分是没记录的，如果这个时候来了个"+"操作
// 是获取不了的，所以得拿一个栈来记录每一轮的有效分数

function calPoints (ops) {
  const stack = []
  let sum = 0
  for (let i = 0; i < ops.length; i++) {
    let cur = ops[i]
    if (cur === '+') {
      if (stack.length < 2) return false
      const last = stack.pop()
      const lastLast = stack.pop()
      stack.push(lastLast)
      stack.push(last)
      stack.push(last+lastLast)
      sum = sum + last + lastLast
    } else if (cur === 'D') {
      const last = stack.pop()
      stack.push(last)
      stack.push(last*2)
      sum += last*2
    } else if (cur === 'C') {
      const last = stack.pop()
      sum -= last
    } else {
      // 整数
      stack.push(Number(cur))
      sum += Number(cur)
    }
    
  }
  console.log(sum);
}

// calPoints(["5","2","C","D","+"])

// calPoints(["5","-2","4","C","D","9","+","+"])

calPoints(["5","2","C","D","+"])