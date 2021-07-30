/**
 * @desc 思路：双指针；l指针指向haystack起始点,r指针指向needle起始点，同时向右移动
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
 var strStr = function(haystack, needle) {
  if (needle === '') return 0
  if (needle.length > haystack.length) return -1
  let l = 0
  let r = 0
  debugger
  while (l < haystack.length) {
    if (haystack[l] === needle[r]) {
      if (r === needle.length - 1) return l - r
      r++
      l++
    } else {
      if (l === haystack.length - 1 && r === needle.length - 1) return -1
      l = l - r + 1
      r = 0
    }
  }
  return -1
};

// aaa,aa
// "mississippi"
// "issi"
// abc c
// "mississippi","issip"
console.log(strStr("mississippi","issip"));