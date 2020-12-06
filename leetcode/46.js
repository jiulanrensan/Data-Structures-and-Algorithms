/**
 * https://leetcode-cn.com/problems/permutations/
 * 
 */

// 回溯算法
// 遍历n叉树,n叉树根节点为空
// 思路
// [1,2,3]
/**
 * root arr[1,2,3] sort[]
 * 
 * 分三条路径
 * arr[2,3] sort[1]      arr[1,3] sort[2]       arr[1,2] sort[3]
 * 
 * 往下分两条路径
 * arr[2] sort[1,3]; arr[3] sort[1,2]     arr[3] sort[2,1]; arr[1] sort[2,3]    arr[1] sort[3,2]; arr[2] sort[3,1]
 * 
 */

/**
 * @param {number[]} nums
 * @return {number[][]} 
 */

// 第一版，先写出前序遍历n叉树，在前序打印节点路径
var permute1 = function (nums) {
  function pm(nums) {
    for (let i = 0; i < nums.length; i++) {
      if (nums.length === 1) {
        console.log(nums[0]);
        return
      }
      var newNums = nums.slice()
      const cur = newNums.splice(i, 1)
      // 前序遍历
      console.log(cur[0]);
      pm(newNums)
    }
  }
  pm(nums)
};
// const res = permute1([1, 2, 3])
/**
 * output
 * 1,2,3,3,2,2,1,3,3,1,3,,1,2,2,1
 */

// 第二版，由上面的前序遍历可以看到，可以在进入一个分支时，用一个数组记录走过的路径，即前序时操作
// 到最底层时，表示此种排列完成，赋值给全局变量
// 然后在分支返回时，删掉数组最后一个记录的路径，再进入分支时，再记录
var permute2 = function (nums) {
  const res = []
  const road = []
  function pm (nums) {
    for (let i = 0; i < nums.length; i++) {
      if (nums.length === 1) {
        res.push([...road, ...nums])
        return
      }
      var newNums = nums.slice()
      const cur = newNums.splice(i, 1)
      road.push(cur[0])
      pm(newNums)
      road.pop()
    }
  }
  pm(nums)
  return res
}
permute2([1, 2, 3])


// 总结，可以看到，解法其实就是树的遍历上做文章，分别在前序和后序过程中操作road数组

