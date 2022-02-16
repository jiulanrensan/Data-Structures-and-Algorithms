/**
 * 1. 需要一个hashMap，数值(value)对应次数(freq)，第二步要用
 * 2. 因为要有插入的时序，所以需要栈结构存放按顺序插入的数据。
 *    并且每个次数都需要对应一个栈，新插入的数据根据次数存放在对应次数的栈中。
 *    比如push(5)执行三次，数值5分别在freq等于1,2,3的栈中
 * 3. 需要一个值maxFreq记录最大次数
 * 4. 这里不模拟栈了，直接用数组代替
 */

class FreqStack{
  constructor(){
    this.maxFreq = 0
    this.valueToFreq = new Map()
    this.freqToStack = new Map()
  }
  push (value) {
    const freq = this.valueToFreq.get(value) || 0
    this.valueToFreq.set(value, freq+1)
    if (!this.freqToStack.get(freq+1)) this.freqToStack.set(freq+1, [])
    this.freqToStack.get(freq+1).push(value)
    if (freq+1 > this.maxFreq) this.maxFreq = freq+1
    this.print('push', value)
  }
  pop () {
    if (!this.maxFreq) return -1
    const stack = this.freqToStack.get(this.maxFreq)
    const popValue = stack.pop()
    const popValueFreq = this.valueToFreq.get(popValue)
    popValueFreq - 1 ? this.valueToFreq.set(popValue, popValueFreq - 1) : this.valueToFreq.delete(popValue)
    if (!stack.length) {
      this.freqToStack.delete(this.maxFreq)
      this.maxFreq--
    }
    this.print('pop')
    return popValue
  }
  print (type, value) {
    console.log();
    console.log(type, value, '----');
    this.freqToStack.forEach((value, key) => {
      console.log(key, this.freqToStack.get(key));
    })
    console.log(type, value, '----');
  }
}

module.exports = FreqStack