// https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/
// 二叉搜索树中第K小的元素
// 思路：BST的中序遍历升序，所以中序遍历之后，找到第k个就行


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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const inOrderList = []
  function toInorder (root) {
    if (root === null) return null
    toInorder(root.left)
    inOrderList.push(root.val)
    toInorder(root.right)
  }
  toInorder(root)
  return inOrderList[k]
};

// 上面的版本需要遍历完整个树，那么第k个后面都是浪费的
var kthSmallest = function (root, k) {
  let res = 0
  let count = 0
  function traverse (root, k) {
    if (root === null) return root
    traverse(root.left, k)
    count++
    if (count === k) {
      res = root.val
      return
    }
    traverse(root.right, k)
  }
  traverse(root, k)
  return res
};
