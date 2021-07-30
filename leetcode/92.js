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
/**
 * @param {ListNode} head 这里的head表示的是头指针
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
 var reverseBetween = function(head, left, right) {
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