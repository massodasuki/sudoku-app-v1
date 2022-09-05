const { solveSudoku } = require('./sudoku')
var uuid = require('uuid')
var fs = require('fs')

function generateRandom (maxLimit: number) {
  let rand = Math.random() * maxLimit
  // console.log(rand); // say 99.81321410836433
  rand = Math.floor(rand)
  // 99
  return rand
}

function createRandomGrid (grid: number[][]) {
  var newGrid : number [][] = grid;
  for (let i = 0; i < 5; i++) {
    var randomNum : number = generateRandom(9);
    var randomRow : number = generateRandom(9);
    var randomCol : number = generateRandom(9);

    if (newGrid[randomRow][randomCol] == 0) {
      newGrid[randomRow][randomCol] = randomNum;
      console.log('here')
    }
  }
  return grid
}

// function genSudokuTableFromGrid (grid: any[][]) {
//   var table = `<!DOCTYPE html>
//                 <html>
//                 <head>
//                 <style>
//                 table { border-collapse: collapse; font-family: Calibri, sans-serif; }
// colgroup, tbody { border: solid medium; }
// td { border: solid thin; height: 1.4em; width: 1.4em; text-align: center; padding: 0; }
//                 </style>
//                 </head>
//                 <body>
//
//                 <h2>HTML Table</h2>
//                 <table>
//                 <caption>Sudoku of the day</caption>
//                   <colgroup><col><col><col>
//                   <colgroup><col><col><col>
//                   <colgroup><col><col><col>`
//
//   for (let i = 0; i < 9; i++) {
//     if (i == 0 || i == 3 || i == 6) {
//       table += `<tbody>`
//     }
//     table += `<tr>`
//     for (let j = 0; j < 9; j++) {
//       if (grid[i][j] != 0) {
//         table += `<td>${grid[i][j]}`
//       } else {
//         table += `<td> `
//       }
//     }
//     // table += '</tr>'
//   }
//   table += `</table>
// </body>
// </html>
// `
//   return table
// }

function main (increment: number) {
  var defaultGrid = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ]


  // grid = createRandomGrid(grid, 5);
  const grid = createRandomGrid(defaultGrid)
  // console.log(grid)


  if (solveSudoku(grid, 0, 0)) {
    // console.log(grid);
    var sudokuAnswer = genSudokuTableFromGrid(grid)

  } else {

}

// max length 92
for (let i = 0; i < 3; i++) {
  main(i)
}
