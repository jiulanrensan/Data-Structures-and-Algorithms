# LRU(Least Recently Used)
保留最近使用的，内存满了就删了很久没使用过的

以[leetcode 146题](https://leetcode-cn.com/problems/lru-cache/)的问题描述来实现一个LRU结构
> 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
>
> 实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
>
> int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
> 
> void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
> 
> 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行


要实现获取是O(1)复杂度，就要用哈希表(js中的Object)，但是哈希表不能表示数据的顺序，所以要用到链表。

链表的特性是，最早进来的放在队头，最晚进来的放在队尾，如果要删除用的最少的，最把队头的删除就好

对于修改和插入，一般链表是需要先遍历找到再去修改和插入，这里我们可以用哈希表记录每一个链表节点的位置，省去了遍历的O(n)复杂度。但如果是单链表，拿到单个节点时，只能知道下一个节点，所以要是用双链表，这样才能得知前后节点，这样修改和插入都是O(1)。并且修改之后，要把节点提到队尾

所以LRU要把两种数据结构结合起来。


# 代码实现
```js
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
  }
}

module.exports = LRUCache
```

# 参考
- [1] [算法就像搭乐高：带你手撸 LRU 算法](https://labuladong.github.io/algo/2/20/45/)