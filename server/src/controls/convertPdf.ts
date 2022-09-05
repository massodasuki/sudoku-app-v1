import generateRandom from './createSudokuPuzzle'
var uuid = require('uuid')
const fs = require('fs')



var dir = `./sudoku-${increment}`

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

fs.writeFile(
  `./${dir}/sudoku-answer-${id}.html`,
  `${sudokuAnswer}`,
  function (err: any) {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!')
  }
)

var id = uuid.v4()
var sudokuPuzzle = genSudokuTableFromGrid(grid)
fs.writeFile(`./${dir}/sudoku-${id}.html`, `${sudokuPuzzle}`, function (err: any) {
  if (err) {
    return console.log(err)
  }
  console.log('The file was saved!')
})

fs.rmdir(dir, { recursive: true }, (err: any) => {
  if (err) {
    throw err
  }
  console.log(`${dir} is deleted!`)
})
console.log('no solution  exists ')
}
function genSudokuTableFromGrid (grid: any[][]) {
  var table = `<!DOCTYPE html>
                <html>
                <head>
                <style>
                table { border-collapse: collapse; font-family: Calibri, sans-serif; }
colgroup, tbody { border: solid medium; }
td { border: solid thin; height: 1.4em; width: 1.4em; text-align: center; padding: 0; }
                </style>
                </head>
                <body>

                <h2>HTML Table</h2>
                <table>
                <caption>Sudoku of the day</caption>
                  <colgroup><col><col><col>
                  <colgroup><col><col><col>
                  <colgroup><col><col><col>`

  for (let i = 0; i < 9; i++) {
    if (i == 0 || i == 3 || i == 6) {
      table += `<tbody>`
    }
    table += `<tr>`
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] != 0) {
        table += `<td>${grid[i][j]}`
      } else {
        table += `<td> `
      }
    }
    // table += '</tr>'
  }
  table += `</table>
</body>
</html>
`
  return table
}
