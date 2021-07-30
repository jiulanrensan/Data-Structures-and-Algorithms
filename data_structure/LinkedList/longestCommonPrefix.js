/**
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
  let commonStr = ''
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 0; j < strs.length - 1; j++) {
      if (!strs[j][i] || !strs[j+1][i]) return commonStr
      if (strs[j][i] !== strs[j+1][i]) return commonStr
    }
    commonStr += strs[0][i]
  }
  return commonStr
};

console.log(longestCommonPrefix(["abc","vc","a"]));