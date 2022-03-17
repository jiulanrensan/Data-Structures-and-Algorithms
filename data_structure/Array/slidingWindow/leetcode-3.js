/**
 * [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
 */
//  输入: s = "abcabcbb"
//  输出: 3 
//  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const strMap = {}
  let max = 0
  let left = 0
  let right = 0
  while (right < s.length) {
    const str = s[right]
    // 子字符串加1
    strMap[str] ? strMap[str]++ : strMap[str] = 1
    right++
    // 如果已经重复，就要收缩滑动窗口到right上，重新开始计算
    while (strMap[str] > 1) {
      const str = s[left]
      strMap[str]--
      left++
    }
    // 此时right已经指向下一个，所以不用加1再减left
    max = Math.max(max, right - left)
  }
  return max
};

console.log(lengthOfLongestSubstring("pwwkew"));