/**
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
 * 输入：root = [3,9,20,null,null,15,7]
   输出：2
 */
// 思路：
// 从第一层开始，取得当前层的所有节点，判断节点是否有子节点，若无，return当前层，若有，把子节点加入数组中
// 进入下一层，遍历数组中的节点，重复上面的判断


/**
 * 数组形式表示二叉树
 * 当前节点索引为i,则节点左右子节点为2i+1,2i+2
 */

/**
 * @description 用数组来表示二叉树
 * @param {Array} root
 * @return {number}
 */
var minDepth = function(root) {
  if (!root.length) return 0
  let curNodes = []
  curNodes.push(root[0])
  let deepth = 1
  
  while (curNodes.length) {
    let tempNodes = curNodes
    let size = tempNodes.length
    curNodes = []
    for (let i = 0; i < size; i++) {
      if (getLeft(root, i) === null && getRight(root, i) === null) {
        return deepth
      }
      if (getLeft(root, i) !== null) curNodes.push(getLeft(root, i))
      if (getRight(root, i) !== null) curNodes.push(getRight(root, i)) 
    }
    deepth++
  }
  function getLeft (root, i) {
    if (2*i+1 > root.length - 1) return null
    return root[2*i+1]
  }
  function getRight (root, i) {
    if (2*i+2 > root.length - 1) return null
    return root[2*i+2]
  }
};

/**
 * @description 用Object表示二叉树
 * @param {TreeNode} root 
 * @return {numver}
 */
var minDepth2 = function (root) {
  debugger
  if (root === null) return 0
  let deepth = 1
  let nodes = [root]
  while (nodes.length) {
    let tempNodes = nodes
    let size = tempNodes.length
    nodes = []
    for (let i = 0; i < size; i++) {
      if (tempNodes[i].left === null && tempNodes[i].right === null) {
        return deepth
      }
      if (tempNodes[i].left !== null) nodes.push(tempNodes[i].left)
      if (tempNodes[i].right !== null) nodes.push(tempNodes[i].right)
    }
    deepth++
  }
}

class TreeNode {
  constructor (val) {
    this.data = val
    this.left = null
    this.right = null
  }
}
// 数组转为Object表示的二叉树
function ArrayToBinaryTree (array, idx, node) {
  if (idx > array.length - 1) return
  let newNode = array[idx] === null ? null : new TreeNode(array[idx])
  if (node) {
    if (idx%2) {
      // left child
      node.left = newNode
    } else {
      node.right = newNode
    }
  }
  // left
  ArrayToBinaryTree(array, 2*idx+1, newNode)
  // right
  ArrayToBinaryTree(array, 2*idx+2, newNode)
  return newNode
}

const array = [1,2,3,4,5]
const root = ArrayToBinaryTree(array, 0, null)
const res = minDepth2(root);
console.log(res);

