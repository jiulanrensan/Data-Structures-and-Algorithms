// 选择排序
// 其实就是另一个版本的插入排序
// 选择排序也分已排序区和未排序区
// 不同的是，选择排序是在未排序区选择最小的出来放入已排序区

function selectionSort(array) {
  if (!array.length) return false
  debugger
  for (let i = 0; i < array.length; i++) {
    let min = null
    let minIdx = i
    for (let j = i; j < array.length; j++) {
      if (min === null) {
        min = array[j]
      } else if (array[j] < min) {
        min = array[j]
        minIdx = j
      }
    }
    let temp = array[i]
    array[i] = min
    array[minIdx] = temp
  }
  return array
}

console.log(selectionSort([4,5,6,1,3,2]));