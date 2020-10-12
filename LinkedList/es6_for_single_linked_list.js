/**
 * 1. 定义： 链表是由一组节点组成的集合，每个节点包含data与next，data存放当前节点的数据，next存放下一个节点的地址
 * 2. 尾节点next指向null，头节点next指向第一个节点
 */

/**
 * 定义节点属性类
 */
class Node {
  constructor (data) {
    this.data = data
    this.next = null
  }
}


/**
 * 定义链表类，包含操作以及链表属性
 * 链表常用操作：
 * 1. 查找
 * 2. 插入
 * 3. 删除 
 */
class LinkedList {
  constructor (showList = true) {
    this.length = 0 // 链表长度
    this.head = null // 指向链表的第一个指针
    this.noResult = 'NO_RESULT'
    this.showList = showList
  }

  /**
   * @description 在链表尾部添加新节点
   * @param {any} newVal 节点值
   */
  append (newVal) {
    let node = this.head
    const newNode = new Node(newVal)
    if (!node) {
      this.head = newNode
      newNode.next = null
      this.showList && this.showLinkedList()
      return
    }
    while (node.next) {
      node = node.next
    }
    node.next = newNode
    newNode.next = null
    this.showList && this.showLinkedList()
    return
  }

  /**
   * @description 在链表某节点后插入值
   * @param {any} item 链表节点值 
   * @param {any} newVal 新插入的节点值
   */
  insert (item, newVal) {
    const insertItem = this.find(item)
    if (insertItem === this.noResult) {
      console.log(this.noResult);
      return false
    }
    const node = new Node(newVal)
    let nextItem = insertItem.next
    insertItem.next = node
    node.next = nextItem
    this.showList && this.showLinkedList()
    return true
  }
  
  /**
   * @description 查找链表值
   * @param {any} val 要查找的值
   */
  find (val) {
    let node = this.head
    let data = null
    let next = null
    if (node) {
      data = node.data
      next = node.next
    }
    while (next) {
      if (data === val) {
        return node
      } else {
        node = node.next
        data = node.data
        next = node.next
      }
    }
    if (data === val) {
      return node
    }
    else return this.noResult
  }

  /**
   * @description 删除链表节点
   * @param {any} val 需要删除的节点值
   */
  delete (val) {
    let node = this.head
    let data = null
    let next = null
    if (node) {
      data = node.data
      next = node.next
    } else {
      console.log('Nothing to delete');
      return false
    }
    while (next && next.data !== val) {
      node = node.next
      data = node.data
      next = node.next
    }
    if (next === null) {
      console.log(`cannot find val in the LinkedList`);
      return false
    } else {
      let nextNode = node.next.next
      node.next = nextNode
      this.showList && this.showLinkedList()
      return true
    }

  }

  showLinkedList () {
    let node = this.head
    let data = null
    let next = null
    let showData = 'head -> '
    if (node) {
      data = node.data
      next = node.next
    } else {
      console.log(showData + 'null');
      return
    }
    while (next) {
      showData += `${data} | next -> `
      node = node.next
      data = node.data
      next = node.next
    }
    showData += `${data} | next -> null`
    console.log(showData);
  }
}

// test
const linkedList = new LinkedList()
// linkedList.showLinkedList()

// 插入链表操作
let i = 0
while (i < 5) {
  console.log(i);
  linkedList.append(i)
  i++
}

// const findRes = linkedList.find(4)

// linkedList.insert(4, 5)

linkedList.insert(3, 5)
linkedList.delete(5)