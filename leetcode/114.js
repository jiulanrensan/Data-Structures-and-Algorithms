/**
 * 二叉树展开为链表
 * https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/
 */
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
 var flatten = function (root) {
  function flatToLinkedList (root) {
    // 根节点是空的或最底层的节点，直接返回root
    if (root === null || (root.left === null && root.right === null)) return root
    // 左子节点不为null，则把右子节点指向左子节点的right
    // 左子节点为null，则把右子节点指向父节点的right
    // 父节点left总是为null，right有指向
    // 前序时把root.left设为null，right设为左子节点
    // 后序时，return right
    let rootLeft = root.left
    let rootRight = root.right
    
    let left = flatToLinkedList(rootLeft)
    
    let right = flatToLinkedList(rootRight)
    root.left = null
    if (left) {
      root.right = rootLeft
      if (right) {
        left.right = rootRight
        return right
      } else {
        return left
      }
    } else {
      // left 为 null
      root.right = rootRight
      return right
    }
  }
  flatToLinkedList(root)
};

// 最后的ifelse处理太啰嗦了。看了别人的题解，思路很干脆
// 不设置返回值
var flatten = function (root) {
  if (root === null) return
  flatten(root.left)
  flatten(root.right)

  // 后序遍历处理
  let left = root.left
  let right = root.right
  root.left = null
  root.right = left
  let p = root
  // 这个while很巧妙
  // 如果left返回的是null，就不需要遍历，直接把右子节点挂在root.right
  // 如果left不是null，那需要遍历，找到最后节点，再把右子节点挂到p.right
  while (p.right !== null) {
    p = p.right
  }
  p.right = right
}

/************************ */
// 测试用例
// [1,2,null,3]
// [1,null,2,null,3,null,4,null,5,null,6]

