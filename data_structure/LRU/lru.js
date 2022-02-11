// 定义双链表节点
// 为什么需要设置一个key？
// 因为删除这个节点的时候，要去hashMap里面去删除对应的key值
class Node {
  constructor(key, data) {
    this.key = key
    this.data = data
    this.prev = null
    this.next = null
  }
}


// 定义双链表
// 需要添加多一个长度属性
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

class LRUCache {
  constructor (capacity) {
    this.capacity = capacity
    this.hashMap = {}
    this.doubleList = new DoubleLinkedList()
  }
  // 添加新的值
  _addNewValue (key, value) {
    const node = new Node(key, value)
    this.hashMap[key] = node
    this.doubleList.addLast(node)
  }
  // 将某个key变为最近使用的
  _makeRecently (key) {
    const node = this.hashMap[key]
    this.doubleList.removeNode(node)
    this.doubleList.addLast(node)
  }
  // 删除某个key值
  _delKey (key) {
    const node = this.hashMap[key]
    // 删除节点
    this.doubleList.removeNode(node)
    // 删除hashMap中的key
    this.hashMap[key] = null
  }
  // 删除最少使用的
  _removeLeastRecently () {
    const node = this.doubleList.removeFirst()
    this.hashMap[node.key] = null
  }

  get (key) {
    if (!this.hashMap[key]) return -1
    this._makeRecently(key)
    // 这里应该返回data值而不是node节点
    const data = this.hashMap[key].data
    console.log('----');
    console.log('get data', data);
    console.log('----');
    this.printList()
    return data
  }

  /**
   * 1. key值存在，删除原有节点，往队尾新增节点
   * 2. key值不存在，先判断链表长度是否大于capacity，小于则新增；大于则先删除最少使用节点再新增
   */
  put (key, value) {
    if (this.hashMap[key]) {
      this._delKey(key)
      this._addNewValue(key, value)
      return
    }
    if (this.doubleList.getSize < this.capacity) {
      this._addNewValue(key, value)
    } else {
      this._removeLeastRecently(key)
      this._addNewValue(key, value)
    }
    this.printList()
  }

  // 打印链表，方便测试
  printList () {
    const arr = []
    let node = this.doubleList.head.next
    while (node.next) {
      arr.push([node.key, node.data])
      node = node.next
    }
    console.log('----');
    console.log(arr.join('->'))
    console.log('----');

  }
}

module.exports = LRUCache