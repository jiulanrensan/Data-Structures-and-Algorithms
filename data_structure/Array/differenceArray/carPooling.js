/**
 * [1094. 拼车](https://leetcode-cn.com/problems/car-pooling/)
 * 
 *  trips.length <= 1000
    trips[i].length == 3
    1 <= trips[i][0] <= 100
    0 <= trips[i][1] < trips[i][2] <= 1000 假设全程有1001个站点
    1 <= capacity <= 100000
 */

const Difference = require('./differenceArray')
/**
* @param {number[][]} trips
* @param {number} capacity
* @return {boolean}
*/
var carPooling = function (trips, capacity) {
  const df = new Difference(Array.from({length: 1001}, () => 0))
  for (let i = 0; i < trips.length; i++) {
    // 乘客数，上车点，下车点
    const [passengersNums, startLocation, endLocation] = trips[i]
    // 到站上车
    df.increment(startLocation, endLocation, passengersNums)
    // 到站下车
    df.increment(endLocation, endLocation, -passengersNums)
  }
  const res = df.result()
  for (let i = 0; i < res.length; i++) {
    if (res[i] > capacity) return false
  }
  return true
};

// console.log(carPooling([[2,1,5],[3,3,7]], 4));

// console.log(carPooling([[2,1,5],[3,3,7]], 5));

// console.log(carPooling([[2,1,5],[3,5,7]], 3));

console.log(carPooling([[3,2,7],[3,7,9],[8,3,9]],11));
