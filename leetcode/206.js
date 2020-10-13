/**
 * 206. https://leetcode-cn.com/problems/reverse-linked-list/
 * 反转单链表
 * 
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 */

class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class SingleLinkedList {
  constructor() {
    this.head = null
  }
  append (val) {
    let node = this.head
    const newNode = new Node(val)
    if (!node) {
      this.head = newNode
      this.showLinkedList(this.head)
      return
    }
    while (node.next) {
      node = node.next
    }
    node.next = newNode
    this.showLinkedList(this.head)
  }
  showLinkedList(head) {
    let node = head
    let resStr = 'head | -> '
    if (!node) {
      resStr += 'null'
      console.log(resStr);
      return
    }
    while (node.next) {
      resStr += `${node.data} | -> `
      node = node.next
    }
    resStr += `${node.data} | -> null`
    console.log(resStr);
  }
  /**
   * 方法一: 直接修改链表结构
   */
  reverse(head) {
    let node = head
    let resStr = 'head -> '
    if (!node) {
      resStr += 'null'
      console.log(resStr);
      return
    }
    let prev = null
    let next = null
    while (node.next) {
      next = node.next
      node.next = prev
      // head = next
      prev = node
      node = next
    }
    node.next = prev
    return node
  }

  /**
   * 方法二: 利用栈的特性先进后出
   */
  stackReverse (head) {
    const stack = []
    let node = head
    let newNode = null
    while (node) {
      stack.push(node)
      node = node.next
    }
    while (stack.length) {
      let temp = new Node(stack.pop())
      !newNode ? newNode = temp : newNode.next = temp
    }
  }
}


const linkedList = new SingleLinkedList()
Array.from({length: 5}).forEach((el, idx) => {
  linkedList.append(idx)
})
// linkedList.reverse()
console.log(linkedList.head);