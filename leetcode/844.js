/**
 * https://leetcode-cn.com/problems/backspace-string-compare/
 * 
 * 给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符
 * 输入：S = "ab#c", T = "ad#c"
 * 输出：true
 * 解释：S 和 T 都会变成 “ac”。
 */

// 就用栈实现，正常小写字母推入栈，遇到#就弹出栈顶元素
// 需要注意的是输入的两个S、T字符串长度不一定相等

function backspaceCompare (S, T) {
  let maxLen = Math.max(S.length, T.length)
  const s = [], t = []
  debugger
  for (let i = 0; i < maxLen; i++) {
    if (S.length > i) {
      if (S[i] !== '#') {
        s.push(S[i])
      } else {
        s.pop()
      }
    }
    if (T.length > i) {
      if (T[i] !== '#') {
        t.push(T[i])
      } else {
        t.pop()
      }
    }
  }
  if (s.length !== t.length) return false
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== t[i]) return false
  }
  return true
}

// console.log(backspaceCompare('xywrrmp', 'xywrrmu#p'))
console.log(backspaceCompare('a#c', 'b'))