// 二叉搜索树中的搜索
// https://leetcode-cn.com/problems/search-in-a-binary-search-tree/

// 思路，利用BST特点，在每个节点处进行一次判断，向左走还是向右走
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (root === null) return null
  if (root.val < val) {
    return searchBST(root.right, val)
  } else if (root.val > val) {
    return searchBST(root.left, val)
  } else {
    return root
  }
};