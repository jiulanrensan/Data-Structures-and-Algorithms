// 引入最大堆，每个节点记录值和索引
const { CustomHeap } = require('../../data_structure/Heap/heap')

/**
 * @desc 先比较值，再比较索引
 * @param {*} parentObj 
 * @param {*} childObj 
 * @returns 
 */
function comparatorFn (parentObj, childObj) {
  return parentObj.value !== childObj.value ? parentObj.value > childObj.value : parentObj.index > childObj.index
}


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  const maxHeap = new CustomHeap(comparatorFn)
  
  // 先往最大堆添加k个数据
  for (let i = 0; i < k; i++) {
    maxHeap.insert({
      value: nums[i],
      index: i
    })
  }
  const res = [maxHeap.root.value]
  for (let i = 1; i <= nums.length - k; i++) {
    while (maxHeap.root && maxHeap.root.index < i) {
      // 最大值对应的索引已经不在窗口中
      // 移除堆顶
      maxHeap.removeRoot()
    }
    // 每次遍历都插入新的
    maxHeap.insert({value: nums[i + k - 1], index: i + k - 1})
    res[i] = maxHeap.root.value
  }
  return res
};

// console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
// console.log(maxSlidingWindow([9,10,9,-7,-4,-8,2,-6], 5));
console.log(maxSlidingWindow([1, -1], 1));