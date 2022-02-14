/**
 * 460. https://leetcode-cn.com/problems/lfu-cache/
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
  addLast (node) {
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
  get getSize () {
    return this.size
  }
}

class HashLinked {
  constructor () {
    this.hashMap = {}
    this.doubleList = new DoubleLinkedList()
  }
  // 添加新的值
  addNewValue (key) {
    const node = new Node(key)
    this.hashMap[key] = node
    this.doubleList.addLast(node)
  }
  // 将某个key变为最近使用的
  makeRecently (key) {
    const node = this.hashMap[key]
    this.doubleList.removeNode(node)
    this.doubleList.addLast(node)
  }
  // 删除某个key值
  delKey (key) {
    const node = this.hashMap[key]
    // 删除节点
    this.doubleList.removeNode(node)
    // 删除hashMap中的key
    delete this.hashMap[key]
    return node
  }
  // 删除最少使用的
  removeLeastRecently () {
    const node = this.doubleList.removeFirst()
    delete this.hashMap[node.key]
    return node
  }
  get size () {
    return this.doubleList.getSize
  }
}

class LFUCache {
  constructor (capacity) {
    this.cap = capacity
    this.currentSize = 0 // 当前大小
    this.minFreq = 0 // 最小次数
    this.keyToValue = new Map()
    this.keyToFreq = new Map()
    this.freqToKeys = new Map()
  }
  // 有一些共用的逻辑抽离出来
  
  increaseKeyFreq (key) {
    const curKeyFreq = this.keyToFreq.get(key)
    this.keyToFreq.set(key, curKeyFreq + 1)
    // 此处 keyInFreqToKeys 是哈希链表结构
    const keyInFreqToKeys = this.freqToKeys.get(curKeyFreq)
    keyInFreqToKeys.delKey(key)
    if (!keyInFreqToKeys.size) {
      // 移除空的哈希链表
      this.freqToKeys.delete(curKeyFreq)
      if (curKeyFreq === this.minFreq) {
        this.minFreq++
      }
    }
    
    if (!this.freqToKeys.get(curKeyFreq+1)) this.freqToKeys.set(curKeyFreq+1, new HashLinked())
    const nextKeys = this.freqToKeys.get(curKeyFreq+1)
    nextKeys.addNewValue(key)
    
  }
  removeMinFreq () {
    const minKeys = this.freqToKeys.get(this.minFreq)
    const minKey = minKeys.removeLeastRecently()
    // 如果没有了，就删除掉
    if (!minKeys.size) this.freqToKeys.delete(this.minFreq)
    this.keyToFreq.delete(minKey.data)
    this.keyToValue.delete(minKey.data)
    this.currentSize--
  }
  get (key) {
    if (!this.keyToValue.has(key)) {
      return -1
    }
    this.increaseKeyFreq(key)
    const getValue = this.keyToValue.get(key)
    return getValue
  }
  put (key, value) {
    if (this.cap <= 0) return
    if (this.keyToValue.get(key)) {
      // 有此key
      this.keyToValue.set(key, value)

      this.increaseKeyFreq(key)

      return 
    }
    // 无此key
    if (this.currentSize >= this.cap) {
      // 达到上限
      // 删除最小次数的
      this.removeMinFreq()
    }
    this.keyToValue.set(key, value)
    this.keyToFreq.set(key, 1)

    // 插入哈希链表
    if (!this.freqToKeys.get(1)) this.freqToKeys.set(1, new HashLinked())
    const nextKeys = this.freqToKeys.get(1)
    nextKeys.addNewValue(key)

    this.currentSize++
    this.minFreq = 1
  }
}
