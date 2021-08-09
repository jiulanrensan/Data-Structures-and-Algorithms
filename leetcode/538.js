// 把二叉搜索树转换为累加树
// https://leetcode-cn.com/problems/convert-bst-to-greater-tree/

// BST中序遍历，先打印右子树，输出的就是倒序，就是先打印最右边的

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
  let sum = 0
  function traverse(root) {
    if (root === null) return null
    traverse(root.right)
    sum += root.val
    root.val = sum
    traverse(root.left)
    return root
  }
  return traverse(root)
};