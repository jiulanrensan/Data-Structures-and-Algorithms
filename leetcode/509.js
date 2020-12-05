/**
 * 斐波那契数
 * https://leetcode-cn.com/problems/fibonacci-number/
 * 
 * F(0) = 0,   F(1) = 1
   F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
   给定 N，计算 F(N)
 */
/**
 * 
 * 如果使用递归，会重复递归多次相同的子问题，可能会导致栈溢出，所以可以用一个哈希表存储已经计算过的值，类似于迭代了
 * 
 * 使用迭代最清晰，也很简单
 */

var fib = function(n) {
  if (n < 0 || n > 30) return false
  var res = [0,1]
  if (n === 0 || n === 1) return res[n]
  for (let i = 2; i <= n; i++) {
    res[i] = res[i-1] + res[i-2]
  }
  return res[n]
};
console.log(fib(30));