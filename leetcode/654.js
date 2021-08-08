/**
 * 最大二叉树
 * https://leetcode-cn.com/problems/maximum-binary-tree/
 */

// 这道题一点思路都没有
// 参考https://labuladong.gitbook.io/algo/mu-lu-ye-1/mu-lu-ye-1/er-cha-shu-xi-lie-2
// 把递归用到极致
// 
// 先找到最大值，然后将最大值左右两边的数组进行递归

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
 var constructMaximumBinaryTree = function(nums) {
  //  递归的边界一定要是0
  if (nums.length === 0) return null
  let index = 0
  let max = 0
  // 找到最大值
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i]
      index = i
    }
  }
  const root = new TreeNode(max)
  // 取最大值左边的数组
  const left = constructMaximumBinaryTree(nums.slice(0, index))
  // 取最大值右边的数组
  const right = constructMaximumBinaryTree(nums.slice(index + 1))
  root.left = left
  root.right = right
  return root
};