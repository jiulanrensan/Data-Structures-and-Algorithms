

// 二叉树数组
const binaryTree = [null, 1, 3, 5, 6, 9, 10]
/**
 * 
 *              1
 *            /   \
 *          3       5
 *        /  \     /  \
 *       6    9   10
 */

//  前序遍历
function preTraverse(array, idx) {
  if (!array.length) return false
  if (idx > array.length - 1) return
  console.log(array[idx]);
  preTraverse(array, idx * 2)
  preTraverse(array, idx * 2 + 1)
}

// preTraverse(binaryTree, 1)

// 中序遍历
function middleTraverse(array, idx) {
  if (!array.length) return false
  if (idx > array.length - 1) return
  middleTraverse(array, 2 * idx)
  console.log(array[idx]);
  middleTraverse(array, 2 * idx + 1)
}

// middleTraverse(binaryTree, 1)

// 后序遍历
function tailTraverse(array, idx) {
  if (!array.length) return false
  if (idx > array.length - 1) return
  tailTraverse(array, 2 * idx)
  tailTraverse(array, 2 * idx + 1)
  console.log(array[idx]);
}

// tailTraverse(binaryTree, 1)

//  可以看到，其实遍历二叉树的顺序都是一样，只是取决于在何处去打印节点值
// 每次都是先拿到父节点，然后去访问左子节点，访问完之后再访问右子节点
// 父节点需要读取两次，所以每个节点最多会访问两次，所以时间复杂度为O(2n)即O(n)


// 还要一种遍历模式，层序遍历
// 如果是数组存储，很明显数组就是按每层遍历去排列的
// 如果是链式存储，思路如下：
/**
 * 链式存储的二叉树层序遍历思路
 * 借助一个队列，打印当前节点，如果有左右子节点，就把他们放入队列中
 * 取队列头部节点，打印当前节点，如果有左右子节点，继续push进队列
 * 再取队列头部节点，以此类推
 */

//  生成链式节点

class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}
let root = null
function LinkedListBinaryTree(binaryTree, idx, node) {
  if (idx > binaryTree.length - 1) return
  let temp = new Node(binaryTree[idx])
  if (!node) {
    node = temp
    temp = node
  } else {
    if (idx%2) {
      node.right = temp
      temp = node.right
    } else {
      node.left = temp
      temp = node.left
    }
  }
  LinkedListBinaryTree(binaryTree, 2*idx, temp)
  LinkedListBinaryTree(binaryTree, 2*idx + 1, temp)
  if (idx === 1) {
    // console.log(node);
    return node
  }
}
// root = new Node(binaryTree[1])
const res = LinkedListBinaryTree(binaryTree, 1, root)
console.log(res);

// 链式存储的二叉树层序遍历
function squenceTraversal (node) {
  // 用一个辅助队列来存放节点
  const tempList = []
  console.log(node.data);
  tempList.push(node.left,node.right)
  while (tempList.length) {
    const temp = tempList.shift()
    console.log(temp.data);
    temp.left && tempList.push(temp.left)
    temp.right && tempList.push(temp.right)
  }
}
squenceTraversal(res)