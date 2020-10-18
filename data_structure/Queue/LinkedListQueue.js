// 链式队列
// 这个简单多了，跟一般的链表实现一样，只是需要多两个指针：头指针和尾指针

class Node{
  constructor (data) {
    this.data = data
    this.next = null
  }
}

class LinkedListQueue{
  constructor () {
    this.head = null
    this.tail = null
  }
  enqueue (data) {
    if (this.head === null) {
      this.head = this.tail = new Node(data)
    } else {
      this.tail.next = new Node(data)
      this.tail = this.tail.next
    }
  }
  dequeue () {
    if (this.head === null) return null
    const headNode = this.head
    this.head = this.head.next
    console.log(this.head);
    return headNode
  }
}

const llq = new LinkedListQueue(10)
let i = 10
while (i) {
  llq.enqueue(i)
  i--
}
console.log('head:', llq.head, 'tail:', llq.tail);
llq.dequeue()