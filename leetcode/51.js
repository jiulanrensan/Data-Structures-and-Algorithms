/**
 * https://leetcode-cn.com/problems/n-queens/
 * 将 n 个皇后放置在 n×n 的棋盘上
 * 任何两个皇后都不能处于同一条横行、纵行或斜线上
 */
// 使用回溯算法，也是遍历n叉树，棋盘的每一行的n列就是对应n个分支

// 思路：
// col1,row1,放置棋子，往下遍历子n叉树，col1的分叉不用再遍历(col1已经有棋子，这里需要判断边界条件)
// 前序时放置棋子，row递增，递增到row>=n，此时判断放置的棋子是否满足要求，然后return
// 后序时，row递减，并把放置棋子的格子置空，

// 边界条件：如何判断在横纵斜线上已放置棋子
// 横坐标不等 && 纵坐标不等 && 纵差/横差绝对不等1 就是斜率绝对值不能为1



/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  // 记录棋子放置坐标
  var board = Array.from({length: n}, () => {
    return Array.from({length: n}, () => '.')
  })
  var res = []
  function isDown (col, row) {
    // 分三种情况，纵坐标上、横坐标上，斜线上
    // 纵坐标上
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return true
    }
    // 横坐标上
    for (let i = 0; i < col; i++) {
      if (board[row][i] === 'Q') return true
    }
    // 经过此点且斜率为正负1的斜线上，且只需查找小于row的
    for (let i = 1; row - i >= 0 && (col - i >= 0 || col + i >= 0); i++) {
      if (board[row - i][col - i] === 'Q') return true
      if (board[row - i][col + i] === 'Q') return true
    }
    return false
  }
  var down = 0
  function sq (n, row) {
    if (row >= n) {
      // 放置了n枚棋子的才保存
      if (down === n) {
        res.push(board.map(el => el.join('')))
      }
      return
    }
    for (let col = 0; col < n; col++) {
      if (isDown(col,row)) continue
      board[row][col] = 'Q'
      down++
      sq(n, row+1)
      board[row][col] = '.'
      down--
    }
  }
  sq(n,0)
  console.log(res);
}

solveNQueens(5)

/**
 * 总结
 * 回溯的很重要的一步，遍历n叉树时，在前序增加操作，在后序撤销操作！
 */


// 逻辑不对的第一版，留作参考
// var solveNQueens = function(n) {
//   // 记录棋子放置坐标
//   var board = Array.from({length: n}, () => '')
//   var row = 0
//   var res = []
//   function isDown (row, i) {
//     if (
//       board[row].indexOf('Q') !== -1 ||
//       !board[row - 1] ||
//       board[row - 1][i] === 'Q'
//     ) return true
//   }
//   debugger
//   function sq(n) {
//     // 遍历，每一列是一个分支
//     for (let i = 0; i < n; i++) {
//       if (row >= n) {
//         // res.push(board.join(''))
//         return
//       }
//       if (isDown(row, i)) {
//         board[row] += '.'
//       } else {
//         board[row] += 'Q'
//       }
//       row++
//       sq(n)
//       row--
//       // board[row] = board[row].slice(0,-1)
//       // if (i === row) {
//       //   res.push([...board])
//       //   board = Array.from({length: n}, () => '')
//       // }
//     }
//   }
//   sq(n)
//   console.log(res);
// };

