// 503. https://leetcode-cn.com/problems/next-greater-element-ii/
// 这里是循环数组
// 输入: nums = [1,2,3,4,3]
// 输出: [2,3,4,-1,4]

/**
 * 可以这样理解，将两个nums拼接，得到一个新数组newNums: [1,2,3,4,3,  1,2,3,4,3]
 * 从最后一项(i)开始生成单调栈，然后从第一个nums最后一项开始比较(i%nums.length)
 * 
 * stack = []; i = 9; newNums[i]: 3; compareIdx = 4; newNums[compareIdx]: 3
 * res[4] = -1
 * ------------
 * stack = [3]; i = 8; newNums[i]: 4; compareIdx = 3; newNums[compareIdx]: 4
 * stack.push(4)
 * res[3] = -1
 * ------------
 * stack = [4]; i = 7; newNums[i]: 3; compareIdx = 2; newNums[compareIdx]: 3
 * res[2] = 4;
 * stack.push(3)
 * ------------
 * stack = [4,3]; i = 6; newNums[i]: 2; compareIdx = 1; newNums[compareIdx]: 2
 * res[1] = 3;
 * stack.push(2)
 * ------------
 * stack = [4,3,2];i = 5; newNums[i]: 1; compareIdx = 0; newNums[compareIdx]: 1
 * res[0] = 2;
 * stack.push(1)
 * ------------
 * stack = [4,3,2,1];i = 4; newNums[i]: 3; compareIdx = 4; newNums[compareIdx]: 3
 * stack.pop() 直到剩余4
 * res[4] = 4;
 * stack.push(3)
 * ------------
 * stack = [4,3];i = 3; newNums[i]: 4; compareIdx = 3; newNums[compareIdx]: 4
 * stack.pop() 直到空
 * res[3] = -1;
 * stack.push(4)
 * ------------
 * stack = [4];i = 2; newNums[i]: 3; compareIdx = 2; newNums[compareIdx]: 3
 * res[2] = 4
 * stack.push(3)
 * ------------
 * ...
 * 
 */

/**
 * @desc 返回下一个更大的元素
 * @param {Array<number>} nums 
 */
var nextGreaterElements = function(nums) {
  const res = []
  const stack = []
  const len = nums.length
  for (let i = len*2 - 1; i >= 0; i--) {
    // 这里注释的是错误的写法
    // 数组值大于或者等于栈顶值时，都应该pop。比如数组值为3，栈为[4,3]
    // while (stack.length && nums[i % len] > stack[stack.length - 1]) {
    //   stack.pop()
    // }
    while (stack.length && nums[i % len] >= stack[stack.length - 1]) {
      stack.pop()
    }
    res[i % len] = stack.length ? stack[stack.length - 1] : -1
    stack.push(nums[i % len])
  }
  return res
};

console.log(nextGreaterElements([1,2,3,4,3]));