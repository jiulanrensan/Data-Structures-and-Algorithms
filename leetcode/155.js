/**
 * 155. https://leetcode-cn.com/problems/min-stack/
 * 
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈
 * 
 * push(x) —— 将元素 x 推入栈中
 * pop() —— 删除栈顶的元素
 * top() —— 获取栈顶元素
 * getMin() —— 检索栈中的最小元素
 */

// 思路：既然规定了必须是栈，那就没啥好说的了，撸起袖子干
// push,pop,top都是常规操作，唯一一个奇葩的是getMin,还要常数时间内找到，那就只能放在“栈顶”了
// 这里的栈顶是伪栈顶，栈顶往下数第二个才是真正的栈顶元素

class MinStack {
  constructor () {
    this.stack = []
    this.min = null
  }
  push (val) {
    let min = null
    
    // 先把处于栈顶的最小值拿出来
    if (this.stack.length) {
      min = this.stack.pop()
    }
    if (min !== null) {
      min = val > min ? min : val
    } else {
      min = val
    }
    this.stack.push(val)
    // 最小值放在栈顶
    this.stack.push(min)
    console.log(this.stack);
  }
  /**
   * stack 2,3,1,1
   * 
   * 删除时，需要遍历一遍找最小值
   * 
   * 2,3,2
   */
  pop () {
    let min = this.stack.pop()
    const top = this.stack.pop()
    const tempStack = []
    debugger
    if (min !== top) {
      this.stack.push(min)
    } else {
      let newMin = null
      while (this.stack.length) {
        const tempTop = this.stack.pop()
        if (newMin === null || tempTop < newMin) {
          newMin = tempTop
        }
        tempStack.push(tempTop)
      }
      while (tempStack.length) {
        this.stack.push(tempStack.pop())
      }
      this.stack.push(newMin)
      console.log(this.stack);
      return newMin
    }
  }
  top () {
    const min = this.stack.pop()
    const top = this.stack.pop()
    this.stack.push(top)
    this.stack.push(min)
    console.log(this.stack);
    return top
  }
  getMin () {
    const min = this.stack.pop()
    this.stack.push(min)
    console.log(this.stack);
    return min
  }
}

// const minStack = new MinStack()
// minStack.push(-2)
// minStack.push(0)
// minStack.push(-3)
// minStack.getMin()
// minStack.pop()
// minStack.top()
// minStack.getMin()

// 但是很不好的就是pop是O(n)操作，还需要额外的空间

// 看了评论，看到一个很牛逼的解法，每次入栈两个元素，一个是本身，一个是最小值，这样就能保证每次操作都是O(1)且能得到最小值

class MinStackDouble {
  constructor () {
    this.stack = []
  }
  _top () {
    const top = this.stack.pop()
    this.stack.push(top)
    return top
  }
  push (x) {
    if (!this.stack.length) {
      this.stack.push(x,x)
    } else {
      let min = this._top()
      this.stack.push(x, Math.min(min, x))
    }
    console.log(this.stack);
  }
  pop () {
    this.stack.pop()
    this.stack.pop()
    console.log(this.stack);
  }
  top () {
    const topMin = this.stack.pop()
    const top = this.stack.pop()
    this.stack.push(top)
    this.stack.push(topMin)
    console.log(this.stack);
    return top
  }
  getMin () {
    console.log(this.stack);
    return this._top()
  }
}

// const minStackDouble = new MinStackDouble()
// minStackDouble.push(-2)
// minStackDouble.push(0)
// minStackDouble.push(-3)
// minStackDouble.getMin()
// minStackDouble.pop()
// minStackDouble.top()
// minStackDouble.getMin()


// 看到评论还有用链表解决的，细想一下，链表一个节点存放三个东西：当前节点值，最小值，下一个节点的引用
// 时间复杂度和用栈其实是一样的，只是用栈的方式，需要先向内存申请一定的空间，不足之后再扩容，如果链表就不需要考虑这个
// 不足之处就是链表需要用多一倍的空间去存放下一个节点的引用