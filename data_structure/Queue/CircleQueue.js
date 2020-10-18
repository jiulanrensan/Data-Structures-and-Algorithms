// 循环队列
// 其实就是固定队列长度
// 有个前提，tail指向的位置是没有存储数据结构的，所以这样会浪费一个数组元素的储存空间
// 且判断队满条件： (tail+1)%n === head
/**
 * 判断循环数组的队满：
 * [1,2,3,4,5]
 * 当i为5时，对数组长度取余， 5%5=0，取余的值是数组的0下标，即重新以此开始新一轮循环
 */

// 循环队列
class CircleQueue {
  constructor (length) {
    // 队列头部索引
    this.head = 0
    // 队尾索引
    this.tail = 0
    // 存放数据的数组
    this.array = null
    // 数组长度
    this.len = 0
    this.generateArray(Number(length))
  }
  // 生成长度为N的数组
  generateArray (n) {
    this.array = Array(n)
    this.len = n
    console.log(this.array);
  }
  // 入队
  enqueue (item) {
    // 如果tail+1对队列长度取余等于head,表示数组已经满了
    if ((this.tail + 1) % this.len === this.head) return false
    this.array[this.tail] = item
    this.tail = (this.tail + 1) % this.len
    return true
  }
  // 出队
  dequeue () {
    // 表示队列为空
    if (this.head === this.tail) return null
    const headItem = this.array[this.head]
    this.head = (this.head + 1) % this.len
    console.log(this.array, 'head:', this.head, 'tail:', this.tail);
    return headItem
  }
}

// 不明白课程的这个循环队列的实现，如果tail下一个指向了head,就不继续覆盖head了吗