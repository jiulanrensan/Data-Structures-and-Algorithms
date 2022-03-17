/**
 * [1109. 航班预订统计](https://leetcode-cn.com/problems/corporate-flight-bookings/)
 */

//  输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
//  输出：[10,55,45,25,25]
//  解释：
//  航班编号        1   2   3   4   5
//  预订记录 1 ：   10  10
//  预订记录 2 ：       20  20
//  预订记录 3 ：       25  25  25  25
//  总座位数：      10  55  45  25  25
//  因此，answer = [10,55,45,25,25]

// 输入：bookings = [[1,2,10],[2,2,15]], n = 2
// 输出：[10,25]
// 解释：
// 航班编号        1   2
// 预订记录 1 ：   10  10
// 预订记录 2 ：       15
// 总座位数：      10  25
// 因此，answer = [10,25]

const Difference = require('./differenceArray')
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function(bookings, n) {
  const df = new Difference(Array.from({length: n}, () => 0))
  for (let i = 0; i < bookings.length; i++) {
    const [left, right, seats] = bookings[i];
    // n从1开始，所以要减1
    df.increment(left - 1, right - 1, seats)
  }
  const res = df.result()
  return res
};

// console.log(corpFlightBookings([[1,2,10],[2,3,20],[2,5,25]], 5));

console.log(corpFlightBookings([[1,2,10],[2,2,15]], 2));