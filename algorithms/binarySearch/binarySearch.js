// 二分查找
// 局限：必须查找有序的数组

// 递归查找
function binarySearch (array, start, end, num) {
  const mid = (start + end - 1) >> 1
  if (start >= end) {
    return array[start] !== num ? false : start
  }
  // 返回下标
  if (array[mid] === num) return mid
  const flag = array[mid] > num
  return binarySearch(array, flag ? start : mid + 1, flag ? mid - 1 : end, num)
}

// console.log(binarySearch([8,11,19,23,27,33,45,55,67,98], 0, 9, 8));

function iteration (array, num) {
  let start = 0
  let end = array.length - 1
  let mid = (start + end) >> 1
  while (start < end) {
    array[mid] > num ? end = mid - 1 : start = mid + 1
    mid = (start + end) >> 1
  }
  if (array[mid] !== num) return false
  return start
}

console.log(iteration([8,11,19,23,27,33,45,55,67,98], 9));