# 优先队列(Priority Queue)
普通的队列是一种先进先出的数据结构，元素在队列尾追加，而从队列头删除。在优先队列中，元素被赋予优先级。当访问元素时，具有最高优先级的元素最先删除。优先队列具有最高级先出 （first in, largest out）的行为特征。

可以基于数组实现优先队列，比如数字最大的优先级最高，那么插入时进行排序，删除时找到队首即可。或者直接插入到队尾，删除时再排序查找。无论哪种方式实现，排序时时间复杂度为O(n)。

而一般都是基于二叉堆实现优先队列。回想之前堆的实现，加入以数值大小来判断优先级，那不就是最大堆/最小堆了吗？插入时执行上滤(O(log(n)))，堆顶即为优先级最高的，删除堆顶元素为O(1)

所以最大优先队列就是最大堆，最小优先队列就是最小堆

## 队列基本操作
* `enqueue({ priority: 1, data: 0 })` 插入建值为优先权重的数据到队列中 O(log(N))
* `dequeue` 将优先级最高的元素删除 O(1)

## 代码实现

# 参考
- [1] [https://github.com/datastructures-js/priority-queue](https://github.com/datastructures-js/priority-queue)