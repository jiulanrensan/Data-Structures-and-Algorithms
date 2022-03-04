class Heap {
  constructor(arr = []) {
    this.tree = []
    if (arr.length) this._buildDown(arr)
  }
  root () {
    if (!this.tree.length) return null
    return this.tree[0]
  }
  /**
   * @private
   * @desc 交换
   * @param {number} i 
   * @param {number} j 
   */
  _swap (i, j) {
    [this.tree[i], this.tree[j]] = [this.tree[j], this.tree[i]]
  }

  get size () {
    return this.tree.length
  }

  _shouldSwap (parentIdx, childIdx) {
    // 检查索引
    if (parentIdx < 0 || parentIdx >= this.size) return false
    if (childIdx < 0 || childIdx >= this.size) return false
    // 检查大小关系，若与不符合大小关系，则要交换
    return !this._compareRule(this.tree[parentIdx], this.tree[childIdx])
  }

  /**
   * @private
   * @desc 上浮操作，一直往上找父节点对比，直到根节点
   * @param {number} index 
   */
  _heapifyUp (index) {
    let childIndex = index
    // 找到父节点索引
    let parentIndex = Math.floor((childIndex - 1) / 2)
    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex)
      childIndex = parentIndex
      parentIndex = Math.floor((childIndex - 1) / 2)
    }
  }

  /**
   * @public
   * @desc 插入值
   * @param {number} value 
   */
  insert (value) {
    // 把值放到最后，然后执行上浮(heapifyUp)操作
    this.tree.push(value)
    this._heapifyUp(this.tree.length - 1)
  }

  /**
   * @desc 返回堆顶元素
   */
  get root () {
    return this.tree.length ? this.tree[0] : null
  }

  /**
   * @desc 下沉操作，一直往下，将最大的子节点(Max(left, right))与父节点比较
   * @param {number} startIndex 
   */
  _heapifyDown (startIndex) {
    let parentIdx = startIndex
    // 最大堆：返回值最大的子节点
    // 最小堆：返回值最小的子节点
    let childIdx = this._getChildIndexByCompareRule(parentIdx)
    
    while (this._shouldSwap(parentIdx, childIdx)) {
      this._swap(parentIdx, childIdx)
      parentIdx = childIdx
      childIdx = this._getChildIndexByCompareRule(parentIdx)
    }
  }

  /**
   * @desc 根据对应的比较规则找到子节点索引，只对比左右子节点
   * 
   * @param {number} parentIdx 
   */
  _getChildIndexByCompareRule (parentIdx) {
    let left = parentIdx * 2 + 1
    let right = parentIdx * 2 + 2
    // 没有子节点返回-1
    if (left >= this.size && right >= this.size) return -1
    // 没有左子节点返回右子节点
    if (left >= this.size) return right
    // 没有右子节点返回左子节点
    if (right >= this.size) return left
    // 都有时，通过比较规则
    // 最大堆返回最大的
    // 最小堆返回最小的
    const isLeft = this._compareRule(this.tree[left], this.tree[right])
    return isLeft ? left : right
  }

  /**
   * @desc 移除堆顶元素。堆顶元素移除后，把列表最后的元素放到堆顶的位置，然后执行下沉操作(heapifyDown)
   * @returns 返回堆顶元素
   */
  removeRoot () {
    if (!this.tree.length) return null
    const root = this.root
    this.tree[0] = this.tree[this.size - 1] // 先赋值
    this.tree.pop() // 再移除
    this._heapifyDown(0)
    return root
  }

  /**
   * @desc 初始化堆，使用insert方式创建堆
   * @param {Array<number>} arr
   */
  _buildUp (arr) {
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i])
    }
  }
  /**
   * @desc 采用下滤方式创建堆
   * @param {Array<number>} arr 
   */
  _buildDown (arr) {
    this.tree = [...arr]
    for (let i = Math.floor(this.tree.length/2); i >= 0; i--) {
      this._heapifyDown(i)
    }
  }
}

class MaxHeap extends Heap {
  /**
   * 省略constructor，表示默认调用super
   */
  /**
   * @desc 比较规则，最大堆，父节点大于子节点
   * @param {*} parentValue 
   * @param {*} childValue 
   * @returns 
   */
  _compareRule (parentValue, childValue) {
    return parentValue > childValue
  }
}

class MinHeap extends Heap {
  /**
   * @desc 比较规则，最小堆，父节点大于子节点
   * @param {*} parentValue 
   * @param {*} childValue 
   * @returns 
   */
  _compareRule (parentValue, childValue) {
    return parentValue < childValue
  }
}
class MedianFinder{
  constructor () {
    this._left = new MaxHeap()
    this._right = new MinHeap()
    this._median = 0
  }
  addNum (num) {
    if (typeof num !== 'number') throw new Error('num should be Number')
    // 第一次添加时，默认给左边
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
  }
  findMedian () {
    if (this._left.size === this._right.size) {
      this._median = (this._left.root + this._right.root)/2
    } else {
      this._median = this._left.root
    }
    return this._median
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */