// 双向链表
/**
 * 节点多了一个prev属性，用来指向前一个节点
 */

class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = {
      prev: null,
      next: null
    },
      this.noRes = 'cannot find value'
  }
  find(val) {
    let node = this.head.next
    let data = null
    let next = null
    if (node) {
      data = node.data
      next = node.next
    } else {
      console.log(this.noRes);
      return false
    }
    while (val !== data) {
      if (node.next) {
        node = node.next
        data = node.data
        next = node.next
      } else {
        console.log(this.noRes);
        return false
      }
    }
    return node
  }

  insert(insertItem, val) {
    const insertNode = this.find(insertItem)
    if (!insertNode) return false
    const next = this.insertNode.next
    const newNode = new Node(val)
    newNode.prev = insertNode
    newNode.next = next
    return true
  }

  delete (val) {
    const deleteNode = this.find(insertItem)
    if (!deleteNode) return false
    const prev = deleteNode.prev
    const next = deleteNode.next
    prev.next = next
    return true
  }

}