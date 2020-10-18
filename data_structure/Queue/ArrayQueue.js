// 顺序队列
/**
 * 按照《数据结构与算法javascript描述》里面关于队列的介绍，
 * js中直接搬用Array来实现队列
 * 其实我是有点疑惑的，队列的出队操作，书里是用`Array.prototype.shift`操作
 * 这个内置api底层的实现其实是把索引为0的数据去掉，再把后面的数据往前移动一位，
 * 即O(n)复杂度，具体见readme前提的知乎文章
 * 但是出队操作应该O(1)复杂度，所以这里还是按照原本的定义用js实现一个队列
 */

class ArrayQueue {
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
    // 如果tail等于n,表示数组已经满了
    if (this.tail === this.n) {
      // 不在dequeue中删除首个元素
      // 在入队的时候往前搬移元素
      // 如果头部索引是0就表示队列已经满了
      if (this.head === 0) return false
      for (let i = this.head; i < this.array.length; i++) {
        this.array[i - this.head] = this.array[i]
      }
      // 此时尾部索引应为减去搬移前的head
      this.tail = this.tail - this.head
      // 此时头部是0
      this.head = 0
    }
    this.array[this.tail] = item
    this.tail++
    return true
  }
  // 出队
  dequeue () {
    // 表示队列为空
    if (this.head === this.n) return null
    const headItem = this.array[this.head]
    // 删掉第一个元素
    // delete this.array[this.head]
    this.head++
    console.log(this.array, 'head:', this.head, 'tail:', this.tail);
    return headItem
  }
}

const arrayqueue = new ArrayQueue(10)
let i = 10
while (i) {
  arrayqueue.enqueue(i)
  i--
}
console.log(arrayqueue.array, 'head:', arrayqueue.head, 'tail:', arrayqueue.tail);
arrayqueue.dequeue()
