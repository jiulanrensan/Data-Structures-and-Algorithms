// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]

// 如果是有序数组，可以用双指针，O(n)
var twoSum = function(nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l < r) {
    if (nums[l] + nums[r] > target) {
      r--
    } else if (nums[l] + nums[r] < target) {
      l++
    } else {
      return [l, r]
    }
  }
  return []
};

// console.log(twoSum([2,3,4], 6));

// 如果是无序数组，则用一个哈希表记录差值cur = target-nums[i],然后在遍历过程中查找这个值
var twoSum1 = function(nums, target) {
  const hashMap = {}
  for (let i = 0; i < nums.length; i++) {
    const cur = target - nums[i]
    if (!hashMap.hasOwnProperty(nums[i])) {
      hashMap[cur] = i
    } else {
      return [hashMap[nums[i]], i]
    }
    
  }
  return []
};

console.log(twoSum1([2,3,4], 6));
// 2  cur = 6-2=4
// 4  cur = 6-4 = 2