// es5

/**
 * @description 定义节点
 * @param {any} data 
 */
function node (data) {
  this.data = data
  this.next = null
}

/**
 * 定义链表类，包含操作以及链表属性
 * 链表常用操作：
 * 1. 查找
 * 2. 插入
 * 3. 删除 
 */

function linkedList () {
  this.head = null

  /**
   * @description 在链表尾部添加新节点
   * @param {*} val 
   */
  this.append = function (val) {
    var node = this.head
    var data = null
    var next = null
    if (node) {
      data = node.data
      next = node.next
    } else {
      this.head = new Node(val)
      return true
    }
    while (next) {
      node = node.next
      data = node.data
      next = node.next
    }
    node.next = new Node(val)
    return true
  }

  /**
   * @description 在链表查找val值
   * @param {*} val 
   */
  this.find = function (val) {
    var node = this.head
    var data = null
    var next = null
    if (node) {
      data = node.data
      next = node.next
    } else {
      console.log('cannot find val in this linkedList');
      return false
    }
    while (data !== val) {
      if (node.next) {
        node = node.next
        data = node.data
        next = node.next
      } else {
        console.log('cannot find val in this linkedList');
        return false
      }
    }
    console.log(data);
    return node
  }

  /**
   * @description 往链表insertItem节点后插入val
   * @param {*} insertItem 
   * @param {*} val 
   */
  this.insert = function (insertItem, val) {
    var node = this.head
    var data = null
    var next = null
    if (node) {
      data = node.data
      next = node.next
    } else {
      console.log('cannot find val in the linkedList');
      return false
    }
    while (data !== val) {
      if (node.next) {
        node = node.next
        data = node.data
        next = node.next
      } else {
        console.log('cannot find val in the linkedList');
        return false
      }
    }
    var nextNode = node.next
    node.next = new Node(val)
    node.next.next = nextNode
    return true
  }

  /**
   * @description 删除val
   * @param {*} val 
   */
  this.delete = function (val) {
    var node = this.head
    var data = null
    var next = null
    if (node) {
      data = node.data
      next = node.next
    } else {
      console.log('cannot find val');
      return false
    }
    while (next.data !== val) {
      if (next) {
        node = node.next
        data = node.data
        next = node.next
      } else {
        console.log('cannot find val');
        return false
      }
    }
    var nextItem = node.next.next
    node.next = nextItem
    return true
  }
}