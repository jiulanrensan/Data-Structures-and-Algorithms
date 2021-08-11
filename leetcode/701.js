// 二叉搜索树中的插入操作
// https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/

// 递归，找到null，说明可以插入了

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
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (root === null) {
    root = new TreeNode(val)
    return root
  }
  let res
  if (val > root.val) {
    res = insertIntoBST(root.right, val)
    root.right = res
  } else {
    res = insertIntoBST(root.left, val)
    root.left = res
  }
  return root
};

// 比较容易漏掉的一个测试用例
// BST是一个null

// 其实可以去掉res，这样内存占用更低
var insertIntoBST = function (root, val) {
  if (root === null) {
    root = new TreeNode(val)
    return root
  }
  if (val > root.val) {
    root.right = insertIntoBST(root.right, val)
  } else {
    root.right = insertIntoBST(root.left, val)
  }
  return root
};