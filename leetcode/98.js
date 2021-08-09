//  验证二叉搜索树
// https://leetcode-cn.com/problems/validate-binary-search-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 参考https://labuladong.gitbook.io/algo/mu-lu-ye-1/mu-lu-ye-1/er-cha-sou-suo-shu-cao-zuo-ji-jin
// 这个递归的思路真的厉害，完全想不到
// 个人能想到就是中序遍历，得到的数组进行遍历，是升序就表明是正确的
// 缺点就是需要额外的O(n)空间
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const res = []
  let last = null
  function traverse(root) {
    if (root === null) return null
    traverse(root.left)
    res.push(root.val)
    traverse(root.right)
    return root
  }
  traverse(root)
  last = res.shift()
  while (res.length) {
    const temp = res.shift()
    if (temp <= last) return false
    else last = temp
  }
  return true
};


// 参考文章的方法
var isValidBST = function (root) {
  function traverse(root, min, max) {
    if (root === null) return true
    if (min !== null && root.val <= min.val) return false
    if (max !== null && root.val >= max.val) return false
    // 对于左子树，最小值就是min，最大值就是当前节点
    // 对于右子树，最小值就是当前节点，最大值是max
    return traverse(root.left, min, root) && traverse(root.right, root, max)
  }
  return traverse(root, null, null)
};