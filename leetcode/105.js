// https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
// 从前序与中序遍历序列构造二叉树
// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]

// 参考 https://mp.weixin.qq.com/s/OlpaDhPDTJlQ5MJ8tsARlA
// 前序遍历，第一个元素一定是根元素
// 然后就找到中序遍历数组根元素所在位置，所以根元素左边是左子节点，右边是右子节点
// 同时也得知，前序数组中左、右子节点部分的区域
// 然后递归


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1)
  function build(preorder, preStart, preEnd, inorder, inStart, inEnd) {
    // base case
    if (preStart > preEnd) {
      return null
    }
    // 先找到根节点
    const rootValue = preorder[preStart]
    // 然后找到中序数组中根节点的位置
    let index = 0
    for (let i = inStart; i <= inEnd; i++) {
      if (inorder[i] === rootValue) index = i
    }
    // 中序根节点位置左边部分的个数就是左子节点
    const leftSize = index - inStart
    const root = new TreeNode(rootValue)
    // 对于前序数组，preStart + 1是左子节点的根节点，
    // leftSize是左子节点数量，所以preStart+leftSize是左子节点的右边界
    // 对于中序数组，inStart到index-1是左子节点部分
    // 递归，数组继续往下传
    root.left = build(
      preorder, preStart + 1, preStart + leftSize,
      inorder, inStart, index - 1
    )
    // 对于前序数组，preStart+leftSize+1是右子节点的左边界
    // 对于中序数组，index+1是右子节点的左边界
    root.right = build(
      preorder, preStart + 1 + leftSize, preEnd,
      inorder, index + 1, inEnd
    )
    return root
  }
};