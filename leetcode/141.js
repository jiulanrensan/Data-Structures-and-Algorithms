/**
 * 141. https://leetcode-cn.com/problems/linked-list-cycle/
 * 给定一个链表，判断链表中是否有环。
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 
 * 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 * 
 * 题目理解，题目没看懂，看了评论才明白，pos其实是给leetcode测试时生成代码时使用的
 * 就是告诉网站我的环是这个样子的
 */

// 1. 哈希表
// 利用一个哈希表保存访问过的节点，遍历节点时，总是先访问哈希表是否已存在当前节点
// 利用es6 Map数据类型

/**
 * @description 判断链表是否有环
 * @param {*} headNode 链表头部
 * @returns {boolean}
 */
function hasCircle(headNode) { 
  let node = headNode
  const visitedMap = new Map()
  while (node) {
    if (!visitedMap.has(node)) {
      visitedMap.set(node, true)
      node = node.next
    } else {
      return true
    }
  }
  return false
}

// 2. 看到一个很不错的解法，但是需要改变原链表
// 每次遍历节点，都给节点添加一个已访问的属性

function addVisited (headNode) {
  let node = headNode
  while (node) {
    if (!node.visited) {
      node.visited = true
      node = node.next
    } else {
      return true
    }
  }
  return false
}

// 3. 快慢指针法
// 其实就是跑400米的追及问题，只要一直是环状跑，总会相遇