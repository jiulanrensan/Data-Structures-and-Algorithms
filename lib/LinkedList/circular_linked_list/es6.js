/**
 * 循环链表与单链表区别在于：
 * 1. 尾节点的next指向头节点
 * 2. 创建循环链表时，让其头节点的next指向本身
 */


class Node {
  constructor (data) {
    this.data = data
    this.next = null
  }
}

class LinkedLidt {
  constructor () {
    this.head = {
      isHead: true,
      next: null
    }
    this.noRes = 'cannot find the value'
    this.head.next = this.head
  }

  find (val) {
    let node = this.head.next
    let data = null
    let next = null
    if (node.isHead) {
      console.log(this.noRes);
      return false
    } else {
      data = node.data
      next = node.next
    }
    while (!node.isHead) {
      node = node.next
      data = node.data
      next = node.next
    }
    if (node.isHead) {
      console.log(this.noRes);
      return false
    } else {
      return node
    }
  }

  insert (insertItem, val) {
    const insertNode = this.find(insertItem)
    if (!insertNode) return false
    const next = insertNode.next
    const newNode = new Node(val)
    insertNode.next = newNode
    newNode.next = next
    return true
  }

  delete (val) {
    let node = this.head.next
    let data = null
    let next = null
    if (node.isHead) {
      console.log(this.noRes);
      return false
    } else {
      data = node.data
      next = node.next
    }
    while (next.data !== val) {
      // stop 
      if (node.next.isHead) break
      node = node.next
      data = node.data
      next = node.next
    }
    if (next.data !== val) {
      console.log(this.noRes);
      return false
    } else {
      const next = next.next
      node.next = next
      return true
    }
  }
}