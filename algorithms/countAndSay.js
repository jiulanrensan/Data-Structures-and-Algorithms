/**
 * @param {number} n
 * @return {string}
 */
// 注意边界状态
 var countAndSay = function(n) {
  if (n === 1) return '1'
  let str = countAndSay(n - 1)
  let res = ''
  let last = ''
  let lastNum = 0
  let index = 0
  while (index < str.length) {
    // if (!str[index]) {
    //   // str[length]，为undefined
    //   res += `${lastNum}${last}`
    //   break
    // }
    if (last === '') {
      last = str[index]
      lastNum++
      index++
      continue
    }
    if (last !== str[index]) {
      res += `${lastNum}${last}`
      last = str[index]
      lastNum = 1
    } else {
      lastNum++
    }
    index++
  }
  res += `${lastNum}${last}`
  return res
};

console.log(countAndSay(6));