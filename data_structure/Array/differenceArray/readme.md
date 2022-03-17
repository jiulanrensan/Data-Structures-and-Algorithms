# 差分数组
[370 区间加法](https://leetcode-cn.com/problems/range-addition/)
题目要会员才能看，所以没有提交

> 本文讲一个和前缀和思想非常类似的算法技巧「差分数组」，差分数组的主要适用场景是频繁对原始数组的某个区间的元素进行增减。

如果直接用遍历对某个区间的元素进行增减，那每次就都是O(n)。

差分数组是每个元素减去前一个元素得到的差值

```js
// nums
[8,2,6,3,1]

// differenceNums
[8,-6,4,-3,-2]
```
所以很明显可以通过遍历差分数组`differenceNums`还原`nums`，就直接前一个元素加当前`differenceNums[i]`。

比如对数组区间`[0,2]`进行加5时
```js
// nums
[13,7,11,3,1]

// differenceNums
[13,-6,4,-8,-2]
```
要对`differenceNums[i]`加5，,对`differenceNums[j+1]`进行减5

最后再遍历差分数组还原`nums`

所以就是多次O(n)降为了一次O(n)

## 类似题目
[1109. 航班预订统计](https://leetcode-cn.com/problems/corporate-flight-bookings/)

[1094. 拼车](https://leetcode-cn.com/problems/car-pooling/)


# 参考
- [1] [差分数组](https://labuladong.github.io/algo/2/22/58/)