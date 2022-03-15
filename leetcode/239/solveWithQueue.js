/**
 * 使用单调队列
 */

 class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

class DoubleLinkedList {
  constructor () {
    this.head = new Node()
    this.tail = new Node()
    this.head.next = this.tail
    this.tail.prev = this.head
    this.size = 0
  }
  // 向双链表末尾添加节点
  // O(1)
  addLast (num) {
    const node = new Node(num)
    const last = this.tail.prev
    last.next = node
    node.prev = last
    node.next = this.tail
    this.tail.prev = node
    this.size++
  }
  // 删除给定的节点
  // O(1)
  removeNode (node) {
    node.prev.next = node.next
    node.next.prev = node.prev
    this.size--
  }
  // 删除第一个节点
  // O(1)
  removeFirst () {
    if (this.head.next === this.tail) {
      // 此时没有节点
      return
    }
    const node = this.head.next
    this.removeNode(node)
    return node
  }
  removeLast () {
    if (this.head.next === this.tail) {
      // 此时没有节点
      return
    }
    const node = this.tail.prev
    this.removeNode(node)
    return node
  }
  get first () {
    if (this.head.next === this.tail) {
      // 此时没有节点
      return null
    }
    return this.head.next.data
  }
  get last () {
    if (this.head.next === this.tail) {
      // 此时没有节点
      return null
    }
    return this.tail.prev.data
  }
  get getSize () {
    return this.size
  }
}

class MonotonicQueue {
  constructor() {
    this._window = new DoubleLinkedList()
  }
  max () {
    return this._window.first
  }
  // 往队尾添加元素
  push(num) {
    // 循环地和队尾比较
    while (this._window.getSize && this._window.last < num) {
      this._window.removeLast()
    }
    this._window.addLast(num)
  }
  // 删除队头元素，判断窗口最左边的是不是单调队列的最大值，是就删除
  pop (num) {
    if (num === this._window.first) this._window.removeFirst()
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  // 用双链表实现一个单调队列
  const window = new MonotonicQueue()
  // 先生成窗口
  for (let i = 0; i < k; i++) {
    window.push(nums[i])
  }
  const res = [window.max()]
  for (let i = 1; i < nums.length - k + 1; i++) {
    // 先移除队首
    window.pop(nums[i - 1])
    window.push(nums[i + k - 1])
    res[i] = window.max()
  }
  return res
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
// console.log(maxSlidingWindow([9,10,9,-7,-4,-8,2,-6], 5));
// console.log(maxSlidingWindow([1, -1], 1));