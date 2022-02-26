const { CustomHeap } = require('../Heap/heap')
class PriorityQueue {
  /**
   * 
   * @param {object} options 
   * @param {function} options.comparator 自定义比较规则
   */
  constructor (options) {
		const { comparator } = options
    if (typeof comparator !== 'function') {
      throw new Error('comparator should be Function')
    }
    this._comparator = options
    this._heap = new CustomHeap(comparator)
	}
  /**
   * @desc 插入队列，每个值都必须要要有一个优先级属性
   * @param {object} element
   * @param {number} element.priority
   * @param {any} element.data 
   */
  enqueue (element) {
    this._heap.insert(element)
  }
  dequeue () {
    if (!this._heap.size) return null
    this._heap.removeRoot()
  }
  /**
   * @desc 获取队列优先级最高的的元素
   */
  getQueueHead () {
    if (!this._heap.size) return null
    this._heap.root()
  }
}
