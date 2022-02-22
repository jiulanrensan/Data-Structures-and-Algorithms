# 堆(Heap)
## 定义
> 堆（英语：Heap）是计算机科学中的一种特别的完全二叉树。若是满足以下特性，即可称为堆：“给定堆中任意节点P和C，若P是C的母节点，那么P的值会小于等于（或大于等于）C的值”。若母节点的值恒小于等于子节点的值，此堆称为最小堆（min heap）；反之，若母节点的值恒大于等于子节点的值，此堆称为最大堆（max heap）。在堆中最顶端的那一个节点，称作根节点（root node），根节点本身没有母节点（parent node）
> ———— 维基百科

**给定堆中任意节点P和C，若P是C的母节点，那么P的值会小于等于（或大于等于）C的值**

对于这个定义，举个例子，取任意一个节点P，这个节点有两个子节点L和R，但是`P<L`且`P>R`，那么此时这个二叉树就不符合堆的定义了

完全二叉树: 从根往下数，除了最下层外都是全满（都有两个子节点），而最下层所有叶结点都向左边靠拢填满


<center>
  <img style="border-radius: 0.3125em;
  box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
  src="https://gitee.com/jlrszxc/pic-go-images/raw/master/images/企业微信截图_16451648242333.png">
  <br>
  <div style="color:orange; border-bottom: 1px solid #d9d9d9;
  display: inline-block;
  color: #999;
  padding: 2px;">完全二叉树，也是最小堆</div>
</center>

<center>
  <img style="border-radius: 0.3125em;
  box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
  src="https://gitee.com/jlrszxc/pic-go-images/raw/master/images/企业微信截图_1645164877765.png">
  <br>
  <div style="color:orange; border-bottom: 1px solid #d9d9d9;
  display: inline-block;
  color: #999;
  padding: 2px;">最大堆</div>
</center>

## 用数组来表示堆
以上图最大堆为例，用一组数组来表示，可以看到其实就是层序遍历的结果

<center>
  <img style="border-radius: 0.3125em;
  box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
  src="https://gitee.com/jlrszxc/pic-go-images/raw/master/images/企业微信截图_16451649241521.png">
  <br>
  <div style="color:orange; border-bottom: 1px solid #d9d9d9;
  display: inline-block;
  color: #999;
  padding: 2px;">最大堆</div>
</center>

|数组下标| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|--|--|--|--|--|--|--|--|--|--|--|--|
|值|10|9|8|7|6|5|4|3|2|1|

可以得到规律：
* 某节点数组下标为i时，其左子节点的数组下标为2i+1，其右子节点的数组下标为2i+2

如i=2时，值为8，则左子节点为5，对应数组坐标为`2*2+1=5`，右子节点为4，对应数组坐标为`2*2+2=6`

* 某叶子节点数组下标为i时，其父节点对应数组坐标为`Math.floor((i-1)/2)`

如右子节点值为2，i=8，其父节点对应数组坐标为`Math.floor((8-1)/2)=3`即数值为7

如左子节点值为1，i=9，其父节点对应数组坐标为`Math.floor((9-1)/2)=4`即数值为6

因此可以很方便地数组来表示堆

## 堆的基本操作
* 插入
* 移除堆顶元素
* 上浮元素，使堆满足最大堆、最小堆 O(log(N))
* 下沉元素 O(log(N))

## 实现
见`heap.js`

## 参考
- [1][堆](https://zh.wikipedia.org/wiki/%E5%A0%86%E7%A9%8D)
- [2][datastructures-js/heap](https://github.com/datastructures-js/heap)