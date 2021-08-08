// https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
// 从中序与后序遍历序列构造二叉树
// 后序遍历，根节点是在数组的最后一位
// 然后通过在中序数组找到根节点位置，根节点左边是左子节点部分，可以知道数量
// 所以回到后序数组，可以找到左子节点部分和右子节点部分
// 思路与105一模一样

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  return build(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1)

  function build(inorder, inStart, inEnd, postorder, postStart, postEnd) {
    if (inStart > inEnd) return null

    // 后序数组找跟节点
    const rootValue = postorder[postEnd]
    // 中序数组找根节点
    let index = 0
    for (let i = inStart; i <= inEnd; i++) {
      if (inorder[i] === rootValue) index = i
    }

    const leftSize = index - inStart

    const root = new TreeNode(rootValue)
    root.left = build(inorder, inStart, index - 1, postorder, postStart, postStart + leftSize - 1)
    root.right = build(inorder, index + 1, inEnd, postorder, postStart + leftSize, postEnd - 1)
    return root
  }
};