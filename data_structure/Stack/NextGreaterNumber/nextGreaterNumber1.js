// 496. https://leetcode-cn.com/problems/next-greater-element-i/

// 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出：[-1,3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// - 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
// - 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
// - 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  const nums1Map = nums1.reduce((acc, cur, index) => {
    acc[cur] = {
      index,
      value: cur
    }
    return acc
  }, {})
  const monotonousStack = []
  const resultList = []
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (monotonousStack.length && nums2[i] >= monotonousStack[monotonousStack.length - 1]) {
      monotonousStack.pop()
    }
    
    if (nums1Map[nums2[i]]) {
      const result = monotonousStack.length ? monotonousStack[monotonousStack.length - 1] : -1
      resultList[nums1Map[nums2[i]].index] = result
    }

    monotonousStack.push(nums2[i])
  }
  return resultList
}

console.log(nextGreaterElement([2,4], [1,2,3,4]));