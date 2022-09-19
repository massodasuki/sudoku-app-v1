
function solved(board: any[][]): boolean{
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // checks to see if the given puzzle is solved
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

function findEmptySquare(board: any[][]){
    // THIS FUNCTION WORKS.
    // Board -> [Int, Int]
    // (get the i j coordinates for the first empty square)
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}


function nextBoards(board: any[][]){
    // THIS FUNCTION WORKS.
    // Board -> List[Board]
    // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
    var res = []
    const firstEmpty = findEmptySquare(board)
    if (firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (var i = 1; i <= 9; i++){
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

function rowsGood(board: any[][]): boolean{
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each row
    for (var i = 0; i < 9; i++){
        var cur: any[] = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true
}

function columnsGood(board: any[][]): boolean{
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each column
    for (var i = 0; i < 9; i++){
        var cur: any[] = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}


function boxesGood(board: any[][]): boolean{
    // transform this everywhere to update res
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each box
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            // each traversal should examine each box
            var cur: any[] = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}


function validBoard(board: any[][]): boolean{
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // checks to see if given board is valid
    return rowsGood(board) && columnsGood(board) && boxesGood(board)
}


function keepOnlyValid(boards: string | any[]): any[]{
    // THIS FUNCTION WORKS.
    // List[Board] -> List[Board]
    // filters out all of the invalid boards from the list
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}


function searchForSolution(boards: any[]): any{
    // List[Board] -> Board or false
    // finds a valid solution to the sudoku problem
    if (boards.length < 1){
        return false
    }
    else {
        // backtracking search for solution
        var first = boards.shift()
        const tryPath = solve({ board: first })
        if (tryPath != false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}

function solve({ board }: { board: any[][] }): any {
    // THIS FUNCTION WORKS.
    // Board -> Board
    // solves the given sudoku board
    // ASSUME the given sudoku board is valid
    if (solved(board)) {
        return board
    }
    else {
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}


function generateRandomNum(maxLimit: number): number{
  let rand = Math.random() * maxLimit;
  // console.log(rand); // say 99.81321410836433
  rand = Math.floor(rand); // 99
  return rand;
}


function generatesRandomBoards (): any {
  const b = null;
  let boards: any [][] = [ [b, b, b, b, b, b, b, b, b],
              [b, b, b, b, b, b, b, b, b],
              [b, b, b, b, b, b, b, b, b],
              [b, b, b, b, b, b, b, b, b],
              [b, b, b, b, b, b, b, b, b],
              [b, b, b, b, b, b, b, b, b],
              [b, b, b, b, b, b, b, b, b],
              [b, b, b, b, b, b, b, b, b],
              [b, b, b, b, b, b, b, b, b]]

    for (let i = 0; i < 5; i++) {
        var randomNum = generateRandomNum(9);
        var randomRow = generateRandomNum(9);
        var randomCol = generateRandomNum(9);
        if (boards[randomRow][randomCol] == b) {
            boards[randomRow][randomCol] = randomNum;
        }
    }
    return boards;
}

function removeBoardByPercent (boards: number[][], percent: any): any {

    var newBoards = boards;
    console.log(boards)
    const b : any = null;
    let row : number = 9;
    let col : number = 9;

    let totalBoard : number = row * col;
    let boardToRemove : number = (percent/100)*totalBoard;

    let k : number = 0;

    // nested_loop:
      // for (let i = 0; i < row; i++) {
        for (let j = 0; j < totalBoard; j++){
            if (k < boardToRemove) {
              var randomRow = generateRandomNum(9);
              var randomCol = generateRandomNum(9);
              if (newBoards[randomRow][randomCol] != b) {
                  newBoards[randomRow][randomCol] = b;
                  k++;
              } else {
                // break nested_loop;
              }
            }
          }
        // }
    console.log("removeBoardByPercent")
    return newBoards;
}

async function generatesValidSudokuBoard (): Promise<any> {
  let randomBoards = await generatesRandomBoards();
  // console.log(randomBoards);
  let sudokuBoards = await solve({ board: randomBoards });
  // console.log(sudokuBoards);
  console.log("generatesValidSudokuBoard")
  return sudokuBoards;
}

async function generatesSudokuPuzzle (): Promise<any> {

   let validSudokuBoard;
   let valid = false;
   while (valid == false ){
     validSudokuBoard = await generatesValidSudokuBoard();
     if (validSudokuBoard != false){
        valid = true;
     }
   }
   let sudokuPuzzle = removeBoardByPercent(validSudokuBoard, 50)
   return sudokuPuzzle;
}

async function generatesSudokuPuzzleWithAnswer (): Promise<any> {
   var data : any = {};
   let sudokuPuzzle = await generatesSudokuPuzzle()
   let sudokuBoards = await solve({ board: sudokuPuzzle });
   data.answer = sudokuBoards;
   data.puzzle = sudokuPuzzle;

   console.log(data)
   return data;
}

async function generatesBundleSudokuPuzzleWithAnswer(numOfPuzzles: number): Promise<any> {
   var book : any = [];

   var count = 0;
   while (count < numOfPuzzles){
     var chapter : any = {};
     let sudokuPuzzle = await generatesSudokuPuzzle()
     let sudokuBoards = await solve({ board: sudokuPuzzle });
     chapter.answer = sudokuBoards;
     chapter.puzzle = sudokuPuzzle;
     book.push(chapter)
     count++;
   }
   return book;
}

// Export default
export default {
    generatesSudokuPuzzleWithAnswer,
    generatesBundleSudokuPuzzleWithAnswer,
    generatesSudokuPuzzle,
    generatesValidSudokuBoard
} as const;
