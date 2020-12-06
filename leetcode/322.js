/**
 * https://leetcode-cn.com/problems/coin-change/
 * 找零钱问题
 */
// 1.
// 先考虑数组迭代的方法
// 设数组为dp,当金额为i时，最少可拿dp[i]枚硬币凑出
// 初始条件是金额为0时，就是0枚硬币
// 然后迭代至对应的金额
// 迭代每个金额过程中，再迭代硬币面值，取最小值
// 思路如下
// amount = 11, coins = [1,2,5]
// dp.length = 11
// dp = [0]

// i = 0;continue;

// i = 1;
// coin = 1;
// dp[1] = min(dp[1], 1+dp[0]) = min(dp[1], 1+0)
// return 1

// i = 2;
// coin = 1;
// dp[2] = min(dp[2], 1+dp[1]) = 2
// coin = 2;
// dp[2] = min(dp[2], dp[0]) = 1

// i = 3;
// coin = 1;
// dp[3]= min(dp[3], 1+dp[2]) = 2
// coin = 2;
// dp[3] = min(dp[3], 1+dp[1]) = 2

// // ...

// i = 11;
// coin = 1;
// dp[11] = min(dp[11], 1+dp[10])
// coin = 2;
// dp[11] = min(dp[11], 1+dp[9])
// coin = 5;
// dp[11] = min(dp[11], 1+dp[6])

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  var dp = []
  dp[0] = 0
  debugger
  for (let i = 1; i <= amount; i++) {
    // 因为凑硬币最多只可能是amount个，所以初始值为amount+1
    dp[i] = amount + 1
    for (const coin of coins) {
      // 跳出当前循环的条件
      // 1. 当前索引小于硬币面额
      // 2. dp[i - coin] 子问题的面额如果是-1，说明也凑不成，也应该跳出（这里卡了很久，导致测试不通过）
      if (i - coin < 0 || dp[i - coin] === -1) {
        continue
      }
      // 取 每种硬币面值对应的最小硬币数，Math.min
      // 1 + dp[i - coin] 是因为数组起始情况是dp[0] = 0,取coins=[1],amount=1分析一下就懂了
      dp[i] = Math.min(dp[i], 1 + dp[i - coin])
      // 如果需要记录是哪几个面值的硬币，可以在Math.min这里记录是哪个面值的硬币
    }
    // 当前amount遍历完coins后需要判断一下是否有赋值，没有赋值，填上-1
    dp[i] = dp[i] === amount + 1 ? -1 : dp[i]
  }
  console.log(dp);
};

// coinChange([1, 2, 5], 11)
// coinChange([6,4,3,8],29)

// 2. 
// 用递归暴力破解
// 思路如下
// amount = 11, coins = [1,2,5]
/**
 * 11
 * (-1,-2,-5)
 * 10,9,6
 * (-1,-2,-5) (-1,-2,-5) (-1,-2,-5)
 * 9,8,5      8,7,4       5,4,1
 */
// 可以看到，有很多重叠子问题，所以一般递归为了减少次数肯定都要用一个备忘录记录计算过的值
var hashTable = {
  0: 0
}
var coinChange1 = function(coins, amount) {
  if (hashTable.hasOwnProperty(amount)) return hashTable[amount]
  hashTable[amount] = amount + 1
  for (const coin of coins) {
    if (amount - coin < 0) continue
    var res = coinChange1(coins, amount - coin)
    // 边界条件，递归返回结果为-1时，跳出此循环
    // 这里卡了很久
    if (res === -1) continue
    hashTable[amount] = Math.min(hashTable[amount], 1+res)
    
  }
  hashTable[amount] = hashTable[amount] === amount + 1 ? -1 : hashTable[amount]
  return hashTable[amount]
}

// coinChange1([1, 2, 5], 11)
console.log(coinChange1([2], 3));

console.log(hashTable);

// coins = [3]  amount = 4
// hashTable[4] = 5,4-3>0,Math.min(5, 1+coinChange(1))

// hashTable[1] = 5,1-3<0,return -1

// hashTable[4] = 1+(-1) = 0