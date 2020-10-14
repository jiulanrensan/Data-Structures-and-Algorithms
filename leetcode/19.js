/**
 * 19. https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
 * 删除链表倒数第 n 个结点,并且返回链表的头结点
 * 给定一个链表: 1->2->3->4->5, 和 n = 2
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5
 * 
 * 进阶：你能尝试使用一趟扫描实现吗？
 */

//  注意点，n必须是正整数，且n不大于链表长度
// 第一反应是用栈存储(push)遍历后的节点，再把栈的节点拿出来(pop)



// 但是第一种方法最糟情况是遍历2n(n为链表长度)次，如果是只需要遍历一遍
// 能想到的是之前做题的快慢指针，但想了一会，即使快指针到了尾节点，好像也没啥用
// 于是想到用空间换时间，直接用Object的键值对，key为遍历的次数

/**
 * 
 * @param {*} head 头节点
 * @param {Number} n 倒数第几个
 */
function deleteNode(head, n) {
  if (!n && Object.prototype.toString.call(n) !== '[object Number]') return false
  let listLen = 0
  const fixedHead = head
  const nodeObj = {}
  while (head) {
    listLen++
    nodeObj[listLen] = head
    head = head.next
  }
  if (listLen < n) return false
  let delNodePrev = nodeObj[listLen - n - 1]
  let delNode = nodeObj[listLen - n]
  delNodePrev.next = delNode.next
  return fixedHead
}

// 虽然时间复杂度是O(n)，但是需要额外的内存空间
// 于是看了评论，又学到了快慢指针的牛逼用法
// 先前就只知道快慢指针一个是间隔跳，另一个是逐个跳
// 这道题的快慢指针用法是：先让快指针跳n次，再让慢指针开始跳，两者都是逐个跳，这样快慢指针相差永远都是n步
// 当快指针到尾部的时候，倒数第n个节点就是需要删除的了
/**
 * 如1,2,3,4,5,6    n = 2
 * 1. f->1
 * 2. f->2
 * 3. f->3,s->1
 * 4. f->4,s->2
 * 5. f->5,s->3
 * 6. f->6,s->4
 * 7. f->null,s->5
 */
// 但是我需要删除倒数第二个，就需要获取倒数第三个，即倒数第n+1个
function sfDelNode(head, n) {
  if (!n && Object.prototype.toString.call(n) !== '[Object, Number]') return false
  let fast = null
  let slow = null
  let step = 0
  // 需要一个常量保存头部节点
  const fixedHead = head
  while (fast.next) {
    if (step > n) {
      slow = !slow ? fixedHead : slow.next
    }
    fast = head
    fast = fast.next
    step++
  }
  // fast.next 为null，即到了尾节点的前一个节点
  if (n > step) return false
  else {
    slow.next = slow.next.next
  }
  return fixedHead
}