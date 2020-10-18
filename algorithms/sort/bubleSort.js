// 冒泡排序
/**
 * 例子： 4,5,6,3,2,1 
 * 1st  4<5,5<6,6>3,6<=>3,6>2,6<=>2,6>1,6<=>1,res:4,5,3,2,1,6
 * 2nd  4<5,5>3,5<=>3,5>2,5<=>2,5>1,5<=>1,5<6,res:4,3,2,1,5,6
 * 3th  4>3,4<=>3,4>2,4<=>2,4>1,4<=>1,4<5,5<6,res: 3,2,1,4,5,6
 * 4th  3>2,3<=>2,3>1,3<=>1,3<4,4<5,5<6,res:2,1,3,4,5,6
 * 5th  2>1,2<=>1,2<3,3<4,4<5,5<6,res:1,2,3,4,5,6
 * 6th  没有改动数据，此时可以return
 */
function bubleSort(array) {
  if (!array.length) return false
  for (let i = 0; i < array.length; i++) {
    let noBuble = true
    // 减掉后面i个元素，因为后面i个元素都已经排序好了
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j+1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        noBuble = false
      }
    }
    if (noBuble) return array
  }
  return array
}
console.log(bubleSort([4,5,6,3,2,1]));
