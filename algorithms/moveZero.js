// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]

var moveZero = (array) => {
  const len = array.length
  if (!len) return array
  let idx = len - 1
  // 记录0开始存放的起始索引
  let tailIdx = len - 1
  while (idx >= 0) {
    if (!array[idx]) {
      let temp = array[idx]
      let i = idx
      while (tailIdx > i) {
        array[i] = array[i+1]
        i++
      }
      array[i] = temp
    }
    idx--
  }
}

const arr = [0,1,0,3,12]
moveZero(arr)
console.log(arr);