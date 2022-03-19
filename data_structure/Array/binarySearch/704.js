/**
 * [704](https://leetcode-cn.com/problems/binary-search/)
 * 数组假设是升序且无重复数字
 */
//  输入: nums = [-1,0,3,5,9,12], target = 9
//  输出: 4
//  解释: 9 出现在 nums 中并且下标为 4
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  return searchRecurrence(nums, target, 0, nums.length - 1)
  function searchRecurrence (nums, target, left, right) {
    if (left > right) return -1
    let start = left
    let end = right
    let mid = Math.floor((end + start) / 2)
    if (target === nums[mid]) return mid
    if (target < nums[mid]) {
      // 小于中间值，就截取左边的
      right = mid - 1
      return searchRecurrence(nums, target, left, right)
    } else {
      // 大于中间值，取右边的
      left = mid + 1
      return searchRecurrence(nums, target, left, right)
    }
  }
};

// console.log(search([-1,0,3,5,9,12], 9));

console.log(search([-1,0,3,5,9,12],2));