// 插入排序
/**
 * 插入排序其实是将数组分组两部分：已排序区和未排序区
 * 每次在未排序区取得数值后，开始在已排序区最后一位开始遍历比较
 * 数值比已排序区的小，则让已排序区的值往后移动一位，以此类推
 * 其实往后移动一位这个操作就将拿出来的这个未排序的数值的空间占用了
 * 这就是为什么从后面开始遍历
 * 
 * 例子：取第一位为已排序区
 * 4,5,6,1,3,2
 * 
 * 1st  5>4,  4,5
 * 2nd  6>5,4,  5,6
 * 3rd  1<6,6->,1<5,5->,1<4,4->,  1,4,5,6
 * 4th  3<6,6->,3>5,5->,3<4,4->,3>1,  1,3,4,5,6
 * 5th  2<6,6->,2<5,5->,2<4,4->,2<3,3->,2>1,  1,2,3,4,5,6
 */

function insertionSort (array) {
  debugger
  if (!array.length) return false
  // 默认第一位为已排序，所以从第二位开始
  for (let i = 1; i < array.length; i++) {
    const unsortValue = array[i];
    // 所以已排序区为i - 1，并且从末尾往前遍历
    let j = i - 1
    for (; j >= 0; j--) {
      if (unsortValue < array[j]) {
        // 如果未排序数小，则让已排序数往后移动一位
        array[j + 1] = array[j]
      } else {
        // 如果未排序数大于遍历到的值话，就不必再往前遍历了，因为都比前面得大
        break
      }
    }
    // 遍历完已排序区后，将比较值插入空出的那个位置
    // 若break时，j为排序区末尾，j+1就是未排序的首个，所以j+1处填入
    // 若j=-1跳出了循环，表明排序区已经遍历到头了，j+1就是索引为0处
    array[j + 1] = unsortValue
  }
  return array
}

console.log(insertionSort([4,5,6,1,3,2]));