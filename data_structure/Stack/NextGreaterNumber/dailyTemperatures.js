// 739 https://leetcode-cn.com/problems/daily-temperatures/
// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，
// 其中 answer[i] 是指在第 i 天之后，才会有更高的温度。
// 如果气温在这之后都不会升高，请在该位置用 0 来代替

// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]

/**
 * 思路还是用单调栈，只是这里需要记录索引
 */
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const stack = []
  const res = []
  const len = temperatures.length
  for (let i = len - 1; i >= 0; i--) {
    while (stack.length && temperatures[i] >= stack[stack.length - 1].value) {
      stack.pop()
    }
    res[i] = stack.length ? stack[stack.length - 1].index - i : 0
    stack.push({ value: temperatures[i], index: i })
  }
  return res
};

// console.log(dailyTemperatures([30,40,50,60]));
console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));