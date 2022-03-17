/**
 * 差分数组实现
 */
module.exports = class Difference {
  constructor (nums) {
    this._nums = nums
    this.df = []
    this._genDiffArray()
  }
  // 生成差分数组
  _genDiffArray () {
    this.df[0] = this._nums[0]
    for (let i = 1; i < this._nums.length; i++) {
      this.df[i] = this._nums[i] - this._nums[i - 1]
    }
  }
  /**
   * 
   * @param {number} i 左边界
   * @param {number} j 右边界
   * @param {nunmber} value 添加的值
   */
  increment (i, j, value) {
    this.df[i] += value
    // 只有j+1还在差分数组范围内才需要减，如果超出范围，说明i后面全改了，那也不用修改df[j+1]了
    if (j+1 < this.df.length) this.df[j+1] -= value
    
  }

  /**
   * @desc 遍历差分数组还原数组
   */
  result () {
    const res = [this.df[0]]
    for (let i = 1; i < this.df.length; i++) {
      res[i] = this.df[i] + res[i - 1]
    }
    return res
  }
}
