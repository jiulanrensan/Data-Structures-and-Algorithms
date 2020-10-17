/**
 * https://leetcode-cn.com/problems/next-greater-element-i/
 */

// 想了十来分钟，只能想到暴力破解法：
// 先遍历大的数组，用Object记录下每一个值对应的数组索引
// 然后遍历小的数组，找到此值在大数组的位置，再在大数组往后遍历，取到下一个比此值大的即退出遍历

// 感觉这个解法太暴力了，于是看答案

// 官方解法是用单调栈和一个hashMap
// 比如 [2,3,5,1,0,7]
// 2进栈
// 3比2大，2出栈，2和3作为键值对放入HashMap，3入栈
// 5>3,3出栈，3:5 放入hashMap,5入栈
// 1入栈
// 0入栈
// 7>0,0:7放入hashMap,
// 7>1,1:7放入hashMap,
// 7>5,5:7放入hashMap,
// 7入栈
// 此时数组遍历完成，栈里元素为[7]
// 故没有比7大的元素
// 再遍历小数组

function nextGreaterElement (nums1, nums2) {
  // 单调栈
  const stack = []
  // 存放下一个比当前值大的数
  const hashMap = {}
  // 存放结果的数组
  const res = []
  // 先遍历大的数组
  for (let i = 0; i < nums2.length; i++) {
    if (!stack.length) {
      stack.push(nums2[i])
    } else {
      let top = stack.pop()
      while (nums2[i] > top) {
        hashMap[top] = nums2[i]
        top = stack.pop()
      }
      stack.push(top)
      stack.push(nums2[i])
    }
    
  }
  // 遍历完大数组
  // 把栈剩余的元素弹出放入hashMap
  while (stack.length) {
    const top = stack.pop()
    hashMap[top] = -1
  }
  for (let i = 0; i < nums1.length; i++) {
    res.push(hashMap[nums1[i]])
  }
  console.log(res);
}

// nextGreaterElement([4,1,2], [1,3,4,2])

nextGreaterElement([2,4], [1,2,3,4])


// 其他题解介绍了 下一个更大的数 这一类问题的解法(496,503,1118)
// https://leetcode-cn.com/problems/next-greater-element-i/solution/dan-diao-zhan-jie-jue-next-greater-number-yi-lei-w/

// 单调栈实际上就是栈，只是利用了一些巧妙的逻辑，使得每次新元素入栈后，栈内的元素都保持有序（单调递增或单调递减）

// 不得不佩服，一看作者，原来是labuladong


