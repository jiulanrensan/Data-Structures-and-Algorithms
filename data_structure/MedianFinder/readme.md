# 数据流的中位数
[leetcode 295](https://leetcode-cn.com/problems/find-median-from-data-stream/)

中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：
* void addNum(int num) - 从数据流中添加一个整数到数据结构中。
* double findMedian() - 返回目前所有元素的中位数。

```
addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3) 
findMedian() -> 2
```

# 思路
> 一看到这道题就想到最小堆，因为可以用数组表示表示堆，最小堆的数组是自然有序的，直接通过索引取中间的数不就好> 了。
> 
> 但是看了解答，发现并没有这样用。

解答思路：

想象一个递增的数组，中间切半(偶数个)，左边变为最大堆(left)，右边变为最小堆(right)，那么这两个堆的堆顶就是中位数。

当num小于中位数时，说明要加入到左边，这时候得到的新中位数肯定是比原中位数要小的，所以可能要把左边的堆顶元素(leftRoot)移除，插入右边。

当num大于中位数时，说明要加入到右边，这时候得到的新中位数肯定是比原中位数要大的，所以可能要把右边的堆顶的堆顶元素(rightRoot)移除，插入左边。

那什么时候需要移除操作呢：左右两边长度不等的时候。

# 参考
- [1] [中位数](https://mp.weixin.qq.com/s/oklQN_xjYy--_fbFkd9wMg)
- [2] [数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/solution/shu-ju-liu-de-zhong-wei-shu-by-leetcode-ktkst/)