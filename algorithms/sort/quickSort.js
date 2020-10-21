// 快速排序
/**
 * 思路：
 * [8,10,2,3,6,1,5]
 * 取数组中的随机数作为分区点，遍历数组，小于此此数的放左边，大于则放右边
 * 一般取数组末尾值为分区点
 * pivot = 5
 * 1. 遍历后：[2,3,1],5,[8,10,6]
 * 2. 然后对分区后的数组再进行同样的操作:
 * pivot = 1, [],1,[2,3]
 * pivot = 6, [],6,[8,10]
 * 3. pivot = 3, [2],3,[],merge then return
 */
/**
 * 
 * @param {*} array 
 * @param {*} end   末尾索引
 */
function quickSort (array, end) {
  // 数组里面没值或只有一个值，直接返回数组
  if (!array.length || array.length === 1) return array
  const pivot = array[end]
  const leftRes = [], rightRes = []
  for (let i = 0; i < end; i++) {
    if (array[i] <= pivot) {
      leftRes.push(array[i])
    } else {
      rightRes.push(array[i])
    }
  }
  const res = quickSort(leftRes, leftRes.length - 1).concat(
    [pivot], 
    quickSort(rightRes, rightRes.length - 1)
  )
  return res
}

// console.log(quickSort([5,4,3,6,8,1,2], 0, 6))

// 这种方法每次递归都需要创建两个临时数组：const leftRes = [], rightRes = []
// 并且直到递归完才会释放内存，非常占用内存
// 课程里介绍了一种原地排序的方法，非常强悍


/**
 * 思路：
 * 每次递归，不借用临时数组，直接在原数组上进行原地处理
 * 使得小于pivot的值和大于pivot的值在pivot两边
 * 
 * [6,11,3,9,8]
 * pivot = 8, i,j=0,i为已处理区间末尾索引，j为未处理区间开始索引
 * 如果遍历的值小于pivot，则放到已处理区间
 * begin
 * 1. 6<8,so i+1,j+1
 * 2. 11>8,so i no change,j+1
 * 3. 3<8,3要放到已处理区间，所以11和3交换位置，即array[i] swap array[j],i+2,j+1,[6,3,11,9,8]
 * 4. 9>8, i no change,j+1
 * 5. 8<=8, 8要放到已处理区间，故array[i] swap array[j], i+1, [6,3,8,11,9], 遍历完成，停止
 */
/**
 * 
 * @param {*} array 
 * @param {*} start
 * @param {*} end
 */

function quickSort_version2 (array, start, end) {
  // 索引为-1则说明pivot在索引为0处，左边没有小于他的数
  // 索引大等于array.length,说明pivot在数组末尾，右边没有大于他的数
  debugger
  if (start >= end) return
  const pivot = array[end]
  let handleIdx = 0
  // 原地分区
  for (let index = 0; index < end + 1; index++) {
    if (array[index] <= pivot) {
      let temp = array[handleIdx]
      array[handleIdx] = array[index]
      array[index] = temp
      handleIdx++
    }
  }
  // console.log(array);
  // console.log(handleIdx - 1);
  // handleIdx - 1为pivot索引位置，减一则为已处理区末尾索引
  quickSort_version2(array, start, handleIdx - 2)
  quickSort_version2(array, handleIdx, end)
  return array
}

// console.log(quickSort_version2([6,11,3,9,8], 0, 4));
// [ 6, 3, 8, 9, 11 ]
// 2

console.log(quickSort_version2([6,11,3,9,18], 0, 4));

// console.log(quickSort_version2([1,11,2,0],0,3));
