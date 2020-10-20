// 归并排序
/**
 * 思路
 * 11,8,3,9,7,1,2,5,6 length:9
 * 分治过程：
 * 1. mid = (0+8) >> 1 = 4,so[0,4][5,8]     [11,8,3,9,7],[1,2,5,6]
 * 2. mid = (0+4) >> 1 = 2,so[0,2][3,4]     [11,8,3],[9,7]  [1,2],[5,6]
 *    mid = (5+8) >> 1 = 6,so[5,6][7,8]
 * 3. mid = (0+2) >> 1 = 1,so[0,1][2,2]
 *    mid = (3+4) >> 1 = 3,so[3,3][4,4]
 *    mid = (5+6) >> 1 = 5,so[5,5][6,6]
 *    mid = (7,8) >> 1 = 7,so[7,7][8,8]     [11,8],[3]  [9],[7] [1],[2],[5],[6]
 * 
 * 4. mid = (0+1) >> 1 = 0,so[0,0][1,1]     [11],[8]
 * 
 * 合并过程：
 * 对于两个有序数组合成一个有序数组：
 * 用两个指针，遍历次数为两数组长度之和，指针指向的值相比较，值小的指针加1
 * 
 * 
 */


function mergeSort (array, start, end) {
  if (!array.length) return false
  // 停止递归条件，两个索引相同
  if (start === end) return [array[start]]
  let mid = (start + end) >> 1
  const resLeft = mergeSort(array, start, mid)
  const resRight = mergeSort(array, mid + 1, end)
  const len = resLeft.length + resRight.length
  const res = []
  let l = 0,r = 0
  for (let i = 0; i < len; i++) {
    if (r >= resRight.length || resLeft[l] <= resRight[r]) {
      res.push(resLeft[l])
      l++
    } else if (l >= resLeft.length || resLeft[l] > resRight[r]) {
      res.push(resRight[r])
      r++
    }
  }
  return res
}

console.log(mergeSort([11,8,6,5,4], 0, 4));