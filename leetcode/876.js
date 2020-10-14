/**
 * 876. https://leetcode-cn.com/problems/middle-of-the-linked-list/
 * 给定一个带有头结点 head 的非空单链表，返回链表的中间结点
 * 如果有两个中间结点，则返回第二个中间结点
 * 
 */

//  这道题一看到中间节点，就想到了快慢指针
// 快指针间隔跳，慢指针逐个跳
// 规定从头节点开始跳
// 如果链表是奇数个
/**
 * 1,2,3,null
 * f->3,s->2
 * 此时f.next 为null
 * return s
 */
// 如果是偶数个
/**
 * 1,2,3,4,null
 * f->3,s->2
 * f->null,s->3
 * 则s和s.prev为中间节点
 * 返回s即可
 */

 function getMiddleNode (head) {
   let fast = head
   let slow = head
   while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
   }
   return slow
 }