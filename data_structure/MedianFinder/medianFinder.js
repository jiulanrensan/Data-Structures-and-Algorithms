const { MaxHeap, MinHeap } = require('../Heap/heap.js')
class MedianFinder{
  constructor () {
    this._left = new MaxHeap()
    this._right = new MinHeap()
    this._median = 0
  }
  addNum (num) {
    if (typeof num !== 'number') throw new Error('num should be Number')
    // 第一次添加时，默认给左边
    // 这里一开始用this._median去判断，但是我设置了0，如果传入的值是负数，就不对了
    // if (!this._left.size || num <= this._median)
    if (!this._left.size || num <= this._left.root) {
      this._left.insert(num)
      if (this._left.size > this._right.size + 1) {
        const leftRoot = this._left.removeRoot()
        this._right.insert(leftRoot)
      }
    } else {
      this._right.insert(num)
      if (this._left.size < this._right.size) {
        const rightRoot = this._right.removeRoot()
        this._left.insert(rightRoot)
      }
    }
    
    console.log('minHeap', this._right);
    console.log('maxHeap', this._left);
  }
  findMedian () {
    if (this._left.size === this._right.size) {
      this._median = (this._left.root + this._right.root)/2
    } else {
      this._median = this._left.root
    }
    console.log('findMedian', this._median);
    return this._median
  }
}

const mf = new MedianFinder()
mf.addNum(1)
mf.addNum(2)
mf.addNum(5)
mf.addNum(6)
mf.addNum(8)
mf.findMedian()
mf.addNum(4)
mf.addNum(7)
mf.findMedian()
mf.addNum(3)
mf.findMedian()