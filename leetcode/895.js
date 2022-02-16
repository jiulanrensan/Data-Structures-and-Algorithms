// [leetcode 895](https://leetcode-cn.com/problems/maximum-frequency-stack/)

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
    return popValue
  }
}