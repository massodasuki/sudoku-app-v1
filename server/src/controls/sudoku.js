
// Javascript program for above approach

// N is the size of the 2D matrix   N*N
let N = 9;

module.exports = {
  /* Takes a partially filled-in grid and attempts
      to assign values to all unassigned locations in
      such a way to meet the requirements for
      Sudoku solution (non-duplication across rows,
      columns, and boxes) */
    solveSudoku : function (grid, row, col) {
            /* If we have reached the 8th
               row and 9th column (0
               indexed matrix) ,
               we are returning true to avoid further
               backtracking       */
            if (row == N - 1 && col == N)
                return true;

            // Check if column value  becomes 9 ,
            // we move to next row
            // and column start from 0
            if (col == N)
            {
                row++;
                col = 0;
            }

            // Check if the current position
            // of the grid already
            // contains value >0, we iterate
            // for next column
            if (grid[row][col] != 0)
                return solveSudoku(grid, row, col + 1);

            for(let num = 1; num < 10; num++)
            {

                // Check if it is safe to place
                // the num (1-9)  in the given
                // row ,col ->we move to next column
                if (isSafe(grid, row, col, num))
                {

                    /*  assigning the num in the current
                    (row,col)  position of the grid and
                    assuming our assigned num in the position
                    is correct */
                    grid[row][col] = num;

                    // Checking for next
                    // possibility with next column
                    if (solveSudoku(grid, row, col + 1))
                        return true;
                }

                /* removing the assigned num , since our
                   assumption was wrong , and we go for next
                   assumption with diff num value   */
                grid[row][col] = 0;
            }
            return false;
        },

        /* A utility function to print grid */
    print : function (grid)
    {
        for(let i = 0; i < N; i++)
        {
            for(let j = 0; j < N; j++)
                document.write(grid[i][j] + " ");

            document.write("<br>");
        }
    },

    // Check whether it will be legal
    // to assign num to the
    // given row, col
    isSafe : function (grid, row, col, num)
    {

        // Check if we find the same num
        // in the similar row , we
        // return false
        for(let x = 0; x <= 8; x++)
            if (grid[row][x] == num)
                return false;

        // Check if we find the same num
        // in the similar column ,
        // we return false
        for(let x = 0; x <= 8; x++)
            if (grid[x][col] == num)
                return false;

        // Check if we find the same num
        // in the particular 3*3
        // matrix, we return false
        let startRow = row - row % 3,
            startCol = col - col % 3;

        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
                if (grid[i + startRow][j + startCol] == num)
                    return false;

        return true;
    }
};

function generateRandom(maxLimit){
  let rand = Math.random() * maxLimit;
  // console.log(rand); // say 99.81321410836433
  rand = Math.floor(rand); // 99
  return rand;
}

var uuid = require('uuid');
var fs = require('fs');

function createRandomGrid (grid) {
    var newGrid;
    for (let i = 0; i < 5; i++) {
        var randomNum = generateRandom(9);
        var randomRow = generateRandom(9);
        var randomCol = generateRandom(9);

        if (grid[randomRow][randomCol] == 0) {
            grid[randomRow][randomCol] = randomNum;
            console.log("here")
        }

    }
    newGrid = grid;
    return newGrid;

}

function genSudokuTableFromGrid (grid){
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
                  <colgroup><col><col><col>`;

    for (let i = 0; i < 9; i++) {
        if (i == 0 || i == 3 || i == 6 ) {
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
    return table;
}


// Driver Code
// let grid0 = [[ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
//              [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
//              [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
//              [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
//              [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
//              [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
//              [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
//              [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
//              [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ]






function main(increment){

    var grid = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ]

    var dir = `./sudoku-${increment}`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    // grid = createRandomGrid(grid, 5);
    grid = createRandomGrid(grid, increment);
    // console.log(grid)
    var id = uuid.v4();
    var sudokuPuzzle = genSudokuTableFromGrid(grid)
    fs.writeFile(`./${dir}/sudoku-${id}.html`, `${sudokuPuzzle}`, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    if (solveSudoku(grid, 0, 0)) {
        // console.log(grid);
        var sudokuAnswer = genSudokuTableFromGrid(grid)
        fs.writeFile(`./${dir}/sudoku-answer-${id}.html`, `${sudokuAnswer}`, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    } else {
        fs.rmdir(dir, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
            console.log(`${dir} is deleted!`);
        });
        console.log("no solution  exists ")
    }
}

//max length 92
for (let i = 0; i < 3; i++) {
        main(i);
    }
