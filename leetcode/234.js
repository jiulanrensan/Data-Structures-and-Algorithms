/**
 * 回文链表 todo
 * https://leetcode-cn.com/problems/palindrome-linked-list/
 * 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 */
// 回文链表可能存在奇数个，也可能存在偶数个
// 奇数个时，只存在中间一个对称点；偶数个时，存在中间两个对称点
// 思路： 快慢指针，一个指针跑两步，一个跑一步，慢指针走的同时翻转链表
// 快指针遍历完后，设置一个p指针向左走，慢指针则继续向右，逐个对比
/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var isPalindrome = function (head) {
  if (head === null || head.next === null) return true
  let slow = head
  let fast = head
  let p = null
  let next = null
  let prev = null
  while (fast.next && fast.next.next) {
    fast = fast.next.next
    next = slow.next
    slow.next = prev
    prev = slow
    slow = next
  }
  if (fast.next) {
    p = slow
    slow = slow.next
    p.next = prev
  } else {
    p = prev
    slow = slow.next
  }
  // 开始比较
  while (slow) {
    if (slow.val !== p.val) return false
    slow = slow.next
    p = p.next
  }
  return true
};

// 1->2->3->2->1

// 1->2->2->1

// 1->2->1

// 1->2

// 0->0