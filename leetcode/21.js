/**
 * 21. https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * 将两个升序链表合并为一个新的 升序 链表并返回。
 * 新链表是通过拼接给定的两个链表的所有节点组成的。 
 */

/**
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 */

/**
 * 思路: 用两个指针分别指向两个链表头部，开始遍历后，比较节点大小，
 * 节点值小的添加到新链表当中，此链表指针移到下一位，节点值大的指针位置不变
 * 当某链表指针指向的节点为空时，直接将另一链表添加到新链表当中即可
 */

class Node {
  constructor (data) {
    this.data = data
    this.next = null
  }
}

/**
 * 
 * @param {*} headNode1 链表1头节点
 * @param {*} headNode2 链表2头节点
 * @returns 新链表头节点
 */
function mergeLinedList (headNode1, headNode2) {
  let newHeadNode = {
    next = null
  }
  let node1 = headNode1
  let node2 = headNode2
  while (node1 && node2) {
    let temp = null
    if (node1.data < node2.data) {
      temp = node1
      node1 = node1.next
    } else {
      temp = node2
      node2 = node2.next
    }
    newHeadNode.next = new Node(temp)
  }
  // node1 or node2 is null now
  newHeadNode.next = node1 ? node1 : node2
  // return the head of the LinkedList
  return newHeadNode

}