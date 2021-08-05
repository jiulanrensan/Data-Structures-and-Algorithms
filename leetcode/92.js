/**
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/
 * 反转从位置 m 到 n 的链表
 * 
 * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
   输出: 1->4->3->2->5->NULL
 */
// 单链表默认没有头节点，但必须有头指针，头节点可以不存储数据
// https://blog.csdn.net/zhenyusoso/article/details/6092843
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 迭代
/**
 * @param {ListNode} head 这里的head表示的是头指针
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (head.next === null || left === right) return head
  let index = 0
  let prev = null
  let next = null
  // 预设一个虚拟的头节点
  // 可能会有第一个节点进行交换，所以要预设一个头节点，专门用来做指向
  let vp = {}
  vp.next = head
  let node = vp
  while (index < left - 1) {
    node = node.next
    index++
  }
  // 反转部分的前面的节点
  let changedBefore = node
  // 记录第一个反转的节点，是当前节点的下一个节点
  let changedFirst = node.next
  // 开始反转
  // 现在node是反转的第一个节点
  while (node.next && index < right) {
    next = node.next
    node.next = prev
    prev = node
    node = next
    index++
  }
  // 反转的遍历完成
  // 此时有两种情况
  // 1. 有可能是到最后一个节点了，node表示的是最后一个节点
  // 2. index 到达 right 边界
  changedFirst.next = node.next
  changedBefore.next = node
  node.next = prev
  return vp.next
};


/****************************************************************************** */
// 递归
// 参考 https://labuladong.gitbook.io/algo/mu-lu-ye-1/mu-lu-ye/di-gui-fan-zhuan-lian-biao-de-yi-bu-fen

// 可以先考虑前n个节点的递归
/**
 * 
 * @param {ListNode} head 头指针
 * @param {number} n 前N个节点，1 <= n <= 链表长度
 */
var reverse = function (head, n) {
  if (head === null || head.next === null || n === 1) return head

  // nextNode表示的是反转前的当前节点的下一个节点
  // head才是当前节点
  // node表示的是反转之后的第一个节点
  let nextNode = head.next
  let node = reverse(nextNode, n - 1)

  // 进行反转
  // nextNode.next 指向的是最后一个反转节点的下一个节点，即不反转的第一个节点
  head.next = nextNode.next
  nextNode.next = head
  return node
}


// 然后在考虑原题，m-n部分的递归
/**
 * @param {ListNode} head 这里的head表示的是头指针
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (head === null || head.next === null || left === right) return head
  if (left === 1) {
    // 如果left是链表的开始，那就是反转前n个节点
    return reverse(head, right)
  }
  // 前进到需要反转的节点
  head.next = reverseBetween(head.next, left - 1, right)
  return head
}