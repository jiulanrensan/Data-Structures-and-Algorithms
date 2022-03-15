/**
 * 前缀和解法
 */

 class NumArray{
  /**
   * 
   * @param {Array<number>} nums 
   */
  constructor (nums) {
    this._nums = nums
    this.prefixSums = [0]
    for (let i = 1; i < this._nums.length + 1; i++) {
      this.prefixSums[i] = this.prefixSums[i-1] + this._nums[i-1]
    }
  }
  /** 
   * @param {number} left 
   * @param {number} right
   * @return {number}
   */
  sumRange (left, right) {
    return this.prefixSums[right+1] - this.prefixSums[left]
  };
}

const numArray = new NumArray([-2, 0, 3, -5, 2, -1])
console.log(numArray.sumRange(0, 2));
console.log(numArray.sumRange(2, 5));
console.log(numArray.sumRange(0, 5));