// 删除二叉搜索树中的节点
// https://leetcode-cn.com/problems/delete-node-in-a-bst/

// 参考 https://labuladong.gitbook.io/algo/mu-lu-ye-1/mu-lu-ye-1/er-cha-sou-suo-shu-cao-zuo-ji-jin#san-zai-bst-zhong-shan-chu-yi-ge-shu
/**
 * 思路
 * 分三种情况
 * 1. 当前节点的left,right都为null
 * 2. 当前节点的left或right为null
 * 3. 当前节点的left,right都不为null
 * 
 * 第一种情况，直接删掉就行
 * 第二种情况，直接用左子节点或右子节点替换当前节点
 * 第三种情况，(1)在左子树中找到最大的，代替当前节点的值(2)在右子树找到最小的代替当前节点
 */


/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root === null) return null
  if (root.val === key) {
    if (root.left === null) return root.right
    if (root.right === null) return root.left
    // 第三种情况
    // root.left !== null && root.right !== null
    // 先获右子树值最小的节点，返回的是节点
    let minRoot = getMinInRight(root.right)
    // 然后给当前节点赋值
    root.val = minRoot.val
    // 这一步真的很巧妙，利用了递归
    // 把当前节点的右指针指向最小节点的右指针，这样就能把最小节点删除掉(因为这个时候，最小节点的值已经赋值给原key值的点)
    root.right = deleteNode(root.right, minRoot.val)
    return root
  } else {
    if (key > root.val) {
      root.right = deleteNode(root.right, key)
    } else {
      root.left = deleteNode(root.left, key)
    }
    return root
  }
};
function getMinInRight(root) {
  if (root.left === null) return root
  return getMinInRight(root.left)
}

const node = {
  val: 5
}
node.left = {
  val: 3
}
node.right = {
  val: 6,
  left: null
}

node.left.left = {
  val: 2,
  left: null,
  right: null
}
node.left.right = {
  val: 4,
  left: null,
  right: null
}

node.right.right = {
  val: 7,
  left: null,
  right: null
}

deleteNode(node, 5)
console.log(node);
console.log(111);