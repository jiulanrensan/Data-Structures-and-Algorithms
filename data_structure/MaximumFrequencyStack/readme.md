# 最大栈
[leetcode 895](https://leetcode-cn.com/problems/maximum-frequency-stack/)
设计一个类似堆栈的数据结构，将元素推入堆栈，并从堆栈中弹出出现频率最高的元素。

实现 FreqStack 类:

* FreqStack() 构造一个空的堆栈。
* void push(int val) 将一个整数 val 压入栈顶。
* int pop() 删除并返回堆栈中出现频率最高的元素。
  * 如果出现频率最高的元素不只一个，则移除并返回最接近栈顶的元素。

测试用例
```
输入：
["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
输出：[null,null,null,null,null,null,null,5,7,5,4]
解释：
FreqStack = new FreqStack();
freqStack.push (5);//堆栈为 [5]
freqStack.push (7);//堆栈是 [5,7]
freqStack.push (5);//堆栈是 [5,7,5]
freqStack.push (7);//堆栈是 [5,7,5,7]
freqStack.push (4);//堆栈是 [5,7,5,7,4]
freqStack.push (5);//堆栈是 [5,7,5,7,4,5]
freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,5,7,4]。
freqStack.pop ();//返回 7 ，因为 5 和 7 出现频率最高，但7最接近顶部。堆栈变成 [5,7,5,4]。
freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,4]。
freqStack.pop ();//返回 4 ，因为 4, 5 和 7 出现频率最高，但 4 是最接近顶部的。堆栈变成 [5,7]。
```

# 思路
参考文章最后的动图非常形象

# 代码实现
```js
class FreqStack{
  constructor(){
    this.maxFreq = 0
    this.valueToFreq = new Map()
    this.freqToStack = new Map()
  }
  push (value) {
    const freq = this.valueToFreq.get(value) || 0
    this.valueToFreq.set(value, freq+1)
    if (!this.freqToStack.get(freq+1)) this.freqToStack.set(freq+1, [])
    this.freqToStack.get(freq+1).push(value)
    if (freq+1 > this.maxFreq) this.maxFreq = freq+1
  }
  pop () {
    if (!this.maxFreq) return -1
    const stack = this.freqToStack.get(this.maxFreq)
    const popValue = stack.pop()
    const popValueFreq = this.valueToFreq.get(popValue)
    popValueFreq - 1 ? this.valueToFreq.set(popValue, popValueFreq - 1) : this.valueToFreq.delete(popValue)
    if (!stack.length) {
      this.freqToStack.delete(this.maxFreq)
      this.maxFreq--
    }
    return popValue
  }
}
```

# 参考
- [1][数据结构设计：最大栈](https://labuladong.github.io/algo/2/20/48/)