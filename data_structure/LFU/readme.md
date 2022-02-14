# LFU(Least Frequently Used)
淘汰使用次数最少的。

需要将数据按照使用次数进行排序，如果有次数相同的数据，则要淘汰最早插入的数据(即还需要按照时间顺序排序)

根据[leetcode 460题](https://leetcode-cn.com/problems/lfu-cache/)

> 实现 LFUCache 类：
>
> LFUCache(int capacity) - 用数据结构的容量 capacity 初始化对象
>
> int get(int key) - 如果键 key 存在于缓存中，则获取键的值，否则返回 -1 。
>
> void put(int key, int value) - 如果键 key 已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量 capacity 时，则应该在插入新项之前，移除最不经常使用> 的项。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除 最近最久未使用 的键。
> 为了确定最不常使用的键，可以为缓存中的每个键维护一个 使用计数器 。使用计数最小的键是最久未使用的键。
> 
> 当一个键首次插入到缓存中时，它的使用计数器被设置为 1 (由于 put 操作)。对缓存中的键执行 get 或 put 操作，使用计数器的值将会递增。
>
> 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行

# 思路
划重点，`函数 get 和 put 必须以 O(1) 的平均时间复杂度运行`

1. 满足`get`的O(1)要求，必须要有了一个哈希表存放`key`到`value`的映射，称为`keyToValue`

2. 必须有哈希表记录每个`key`对应的使用次数`freq`，因为`get`操作时，需要让`freq`加一，称为`keyToFreq`，且用一个变量`minFreq`记录最少的使用次数

3. 肯定存在多个`key`有相同的使用次数，而此时，需要根据插入的顺序排列，所以用到哈希链表(就是lru用的那种)，所以需要一个哈希链表，存放`freq`对应的`key`，`key`关联着对应的`value`，称为`freqToKeys`

4. 当`get(key)`操作时，可通过`keyToValue`获取到值，获取`keyToFreq`中`key`值对应的`freq`次数，记为`curKeyFreq`，再把`keyToFreq`中`key`值对应`freq`加一，然后再去`freqToKeys`获取`curKeyFreq`对应的值中找到这个`key`，删除，判断此时`freqToKeys`中`curKeyFreq`是否还有其他`key`，如果没有说明这个次数没有对应的值了，再去与`minFreq`对比，等于`curKeyFreq`的话，说明`minFreq`要加一。接着，往`freqToKeys[curKeyFreq+1]`插入这个`key`

5. 当`put(key,value)`操作时，需判断有无此`key`

5.1 如果有，修改值`keyToValue[key] = value`，然后`keyToFreq[key]`获取`freq`，再加1，在`freqToKeys[freq]`中删除这个`key`，再往`freqToKeys[freq+1]`添加`key`，判断`freq`是否等于`minFreq`，如果是且`freqToKeys[freq]`没有值，则`minFreq`加一

5.2 如果无，需判断储存个数是否达到上限，

5.2.1 否，则直接`keyToValue[key] = value`，`keyToFreq[key] = 1`，`freqToKeys[1]`插入`key`，`minFreq=1`

5.2.2 是，则先删除次数最少的，`freqToKeys[minFreq]`获取最早插入的`key`，删除掉，然后删除`keyToFreq[key]`和`keyToValue`对应值。再重复5.2.1

# 代码实现
```js
// 需实现哈希链表
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
    console.log('get, getValue', getValue);
    return getValue
  }
  put (key, value) {
    if (this.cap <= 0) return
    if (this.keyToValue.get(key)) {
      // 有此key
      this.keyToValue.set(key, value)

      this.increaseKeyFreq(key)

      this.currentSize++
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

module.exports = LFUCache
```

# 参考
- [1] [手把手带你拆解 LFU 算法](https://mp.weixin.qq.com/s/oXv03m1J8TwtHwMJEZ1ApQ)