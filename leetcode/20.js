/**
 * 20: https://leetcode-cn.com/problems/valid-parentheses/
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
 * 
 * 左括号必须用相同类型的右括号闭合
 * 左括号必须以正确的顺序闭合
 */

// 思路：先把括号分为左，右括号两种，遍历字符串，当遇到右括号时，就必须查看上一个左括号是否与当前右括号匹配
// 所以很明显用栈来处理，这个时候就需要取栈顶元素

function isValidStr (str) {
  const stack = []
  const left = ['(','[','{']
  const right = [')',']','}']
  // 空字符串为有效字符串
  if (!str.length) return true
  for (let i = 0; i < str.length; i++) {
    if (left.includes(str[i])) {
      stack.push(str[i])
    } else {
      if (!stack.length) return false
      const leftStr = stack.pop()
      if (left.indexOf(leftStr) !== right.indexOf(str[i])) return false
    }
  }
  return !stack.length

}

// console.log(isValidStr('(()))'));

// 优化，把'(){}[]'这些字符串用键值对映射，这样不用每次都遍历一次left和right 数组

// 看了评论，有个很吊的解法
// 于是用了js写了相似的解法
function ValidStr (s) {
  let len = 0
  while (len !== s.length) {
    if (!s.length) return true
    len = s.length
    s = s.replace('()', '')
    s = s.replace('[]', '')
    s = s.replace('{}', '')
  }
  return !len
}

console.log(ValidStr('([[]])'));

// 但是看了执行结果，内存消耗和运行时间均比用栈解法的大
// 于是用了Python的解法去跑，也是用栈方法比replace方法运行时间要短

// 所以需要看下replace方法是实现的