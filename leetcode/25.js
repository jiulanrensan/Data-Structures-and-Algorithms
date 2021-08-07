/**
 * K 个一组翻转链表todo 
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
 */
// 思路
// 双指针，一个指针负责探路，走k步，
// 然后调用traverse方法开始反转链表，方法返回 first,last


/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var reverseKGroup = function (head, k) {
  if (head === null || head.next === null || k === 1) return head
  let count = 1 // k个一组
  // 会反转第一个节点，所以需要插入一个虚拟的头节点
  let vHead = {}
  // vHead.next = head
  let reverseLast = null // 反转后的尾部
  let fast = head        // 快指针
  let slow = head        // 慢指针

  function reverse (head, n) {
    let next = null
    let prev = null
    const noteLast = head // 反转之后的最后一个节点
    while (n > 0) {
      next = head.next
      head.next = prev
      prev = head
      head = next
      n--
    }
    return {
      first: prev,
      last: noteLast
    }
  }
  
  while (fast) {
    if (count !== k) {
      fast = fast.next
      count++
      continue
    }
    fast = fast.next
    // count 等于 k
    const { first, last } = reverse(slow, k)
    if (!vHead.next) {
      vHead.next = first
    } else {
      reverseLast.next = first
    }
    reverseLast = last
    slow = fast
    count = 1
  }
  reverseLast.next = slow
  return vHead.next
};


/*********测试用例 */
// [1,2,3,4,5] 2