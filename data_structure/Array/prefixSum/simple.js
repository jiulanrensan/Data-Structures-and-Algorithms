/**
 * 303. 区域和检索 - 数组不可变
 * https://leetcode-cn.com/problems/range-sum-query-immutable/
 * 
 * 最简单的解法，直接遍历数组区间
 */

class NumArray{
  /**
   * 
   * @param {Array<number>} nums 
   */
  constructor (nums) {
    this._nums = nums
  }
  /** 
   * @param {number} left 
   * @param {number} right
   * @return {number}
   */
  sumRange (left, right) {
    let sum = 0
    for (let i = left; i < right + 1; i++) {
      sum += this._nums[i]
    }
    return sum
  };
}

const numArray = new NumArray([-2, 0, 3, -5, 2, -1])
console.log(numArray.sumRange(0, 2));
console.log(numArray.sumRange(2, 5));
console.log(numArray.sumRange(0, 5));
