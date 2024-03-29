# 二叉树
一般有满二叉树和完全二叉树

## 存储方式


1. 链式存储

每个节点存储着节点数据、左子节点的地址和右子节点的地址

2. 数组存储
i=0不存放数据，根节点放在i=1下，左子节点放在`2*1`索引下，右子节点放在`2*1+1`索引下

举个例子

根节点索引为1，根节点左子节点为`2*i=2*1=2`，右子节点为`2*i+1=3`

然后索引为2处的节点的子节点分别为`2*i=2*2=4,2*i+1=2*2+1=5`

## 二叉树的遍历
前序遍历、中序遍历和后序遍历

前中后序中的“序”，针对的是当前父节点和其左右子节点的前后处理关系，即父节点是第几个遍历到，那就是什么序

1. 前序遍历

前序遍历是指，对于树中的任意节点来说，先打印这个节点，然后再打印它的左子树，最后打印它的右子树

2. 中序遍历

中序遍历是指，对于树中的任意节点来说，先打印它的左子树，然后再打印它本身，最后打印它的右子树

3. 后序遍历

后序遍历是指，对于树中的任意节点来说，先打印它的左子树，然后再打印它的右子树，最后打印这个节点本身

## 二叉查找树(BST)
二叉查找树也叫作二叉排序树。

中序遍历二叉查找树，可以输出有序的数据序列，时间复杂度是 O(n)

二叉查找树要求，在树中的任意一个节点，其左子树中的每个节点的值，都要小于这个节点的值，而右子树节点的值都大于这个节点的值

二叉树的中序遍历结果是升序(先递归左子树，再递归右子树，如果想要降序，那就先递归右子树)

## 平衡二叉查找树