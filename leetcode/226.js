// 翻转二叉树
// https://leetcode-cn.com/problems/invert-binary-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  // 叶子节点的left,right都等于null，所以递归要到叶子节点才能停止
  if (root === null) return null
  let temp = invertTree(root.left)
  root.left = invertTree(root.right)
  root.right = temp
  return root
};