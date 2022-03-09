# 单调栈解决下一个更大的数

[496. 下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i/)

## 思路
从给定数组nums后面开始遍历。维护一个单调栈`stack`，最大的放最下，当遍历到数组第i个`nums[i]`时，取单调栈`stack.top`与之比较，如果`nums[i]`>=`stack.top`，`stack.top`出栈，继续往下比，直到`nums[i]`<`stack.top`，此时`stack.top`是我们想要的值，并且把`nums[i]` push 进`stack`

# 参考
- [0] [单调栈结构解决三道算法题](https://labuladong.github.io/algo/2/21/51/)