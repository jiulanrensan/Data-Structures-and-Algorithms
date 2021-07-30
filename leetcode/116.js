// https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/
// 给定一个 完美二叉树 
// 输入：root = [1,2,3,4,5,6,7]
// 输出：[1,#,2,3,#,4,5,6,7,#]
// 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  const hashMap = {}
  let floor = 0
  const result = []
  const traversal = function (root) {
    if (root === null) return null
    floor++
    let left = traversal(root.left)
    let right = traversal(root.right)
    left.next = right
    if (!hashMap[floor] && floor !== 1) {
      hashMap[floor] = right
    } else {
      hashMap[floor] && (hashMap[floor].next = left);
      right.next = null
    }
    floor--
    return root
  }
};