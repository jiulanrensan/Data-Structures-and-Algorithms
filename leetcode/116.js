// https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/
// 给定一个 完美二叉树 
// 输入：root = [1,2,3,4,5,6,7]
// 输出：[1,#,2,3,#,4,5,6,7,#]
// 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。

// 思路，目前只能想到广度优先遍历，每一层进行遍历的时候，给next指针赋值
// 但进阶的是需要常量级内存空间
// 下面是参考别人的，思路真的牛逼

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (root === null) return root
  connectTwo(root.left, root.right)
  return root
  function connectTwo (left, right) {
    if (left === null || right === null) return
    // 前序遍历处连接
    left.next = right
    // 同父节点的
    connectTwo(left.left, left.right)
    connectTwo(right.left, right.right)
    // 不同父节点的
    connectTwo(left.right, right.left)
    connectTwo
  }
};



/***
 *                  1
 *              2         3
 *           4     5     6     7
 *         8  9 10  11 12 13  14 15
 */