const LinkedList = require('./es6')
const linkedList = new LinkedList()

const head = [3,5]
head.forEach(el => {
  linkedList.append(el)
})

// 1->2->3->4->5 [2,4]
// 1->3->2->4->5
// 1->4->3->2->5
// 逐个调换位置
var reverseBetween = function(head, left, right) {
  // 空节点和只有一个节点的
  if (head === null || head.next === null) return head
  let i = 1
  let last = head
  while (i < left) {
    // 得到反转的前一个节点
    last = last.next
    i++
  }
  // 从这个节点node开始遍历
  let node = last.next
  let reverseHead = node
  while (i <= right) {
    let next = node.next
    let nextNext = next.next
    last.next = next
    next.next = reverseHead
    node.next = nextNext
    reverseHead = next
    i++
  }
}

// 180度反转
var reverseBetween = function(head, left, right) {
  // 空节点和只有一个节点的
  if (head === null || head.next === null) return head
  let i = 1
  let last = head
  while (i < left) {
    // 得到反转的前一个节点
    last = last.next
    i++
  }
  // 从这个节点node开始遍历
  let node = last.next
  let next = null
  let prev = null
  let reverseFirst = null
  while (i <= right) {
    if (reverseFirst === null) reverseFirst = node
    next = node.next
    node.next = prev
    prev = node
    node = next
    i++
  }
  // 遍历完之后，此时node是反转部分的后一个节点
  last.next = prev
  reverseFirst.next = node
  return head
};
const reverseHead = reverseBetween(linkedList.head, 1,2)
linkedList.showLinkedList()
// console.log(reverseHead)
