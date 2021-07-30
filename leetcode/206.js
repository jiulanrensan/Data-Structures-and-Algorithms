/**
 * 206. https://leetcode-cn.com/problems/reverse-linked-list/
 * 反转单链表
 * 
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 */

// 迭代
/**
 * @param {ListNode} head 指向链表头节点
 * @return {ListNode}
 */
 var reverseList = function(head) {
  if (head === null || head.next === null) return head
  let last = null // 上一个节点
  let next = null // 下一个节点
  // head 当前节点
  while (head.next) {
    next = head.next // 先记录好下一个节点
    head.next = last // 然后再改变当前的next，指向上一个节点。第一次改变的时候last是null

    // 修改完指向，继续操作下一个节点
    last = head 
    head = next
  }
  // 到最后一个节点，直接修改next指向为上一个节点
  head.next = last
  return head
}

// 利用栈
var reverseList = function(head) {
  if (head === null || head.next === null) return head
  const stack = []
  let node = head
  while (node) {
    stack.push(node)
    node = node.next
  }
  // 需要一个变量记住前一个节点
  let last = null
  while (stack.length) {
    // 取出栈顶元素
    node = stack.pop()
    if (!last) {
      // 这里只执行一次，因为要返回head
      head = last = node
    } else {
      // 上一个节点的next指向当前节点
      last.next = node
      // 再把当前节点赋给last，给下一次迭代使用
      last = node
    }
  }
  // 最后这一步特别重要，这里卡了很久
  // 上面的while里面不会对栈最底下的节点进行处理，所以最底下的节点(就是原链表的头节点)的next没有改变，这样会构成环
  node.next = null
  return head
}

// 递归，递归思路有点绕
var reverseList = function(head) {
  // 递归结束的条件
  // 当前是null，next是null(当前节点是最后一个节点)
  if (head === null || head.next === null) return head
  const nextNode = head.next
  // 返回的是反转之后的头节点，即最终的head
  const curNode = reverseList(nextNode)
  // 改变下一个节点的next指向，这里的head是当前节点
  nextNode.next = head
  // 当前节点(head)原本是指向nextNode，这里改为null，是避免行成环
  head.next = null
  // 头节点一层层返出去
  return curNode
};