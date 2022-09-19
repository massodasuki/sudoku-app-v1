import sudokuRepo from '@repos/sudoku-repo';

/**
 * Get sudoku.
 *
 * @returns
 */
function getSudokuPuzzleWithAnswer(): Promise<any> {
    return sudokuRepo.generatesSudokuPuzzleWithAnswer();
}

function getBundleSudokuPuzzleWithAnswer(numberOfChapter:any): Promise<any> {
    let num : number = parseInt(numberOfChapter);
    return sudokuRepo.generatesBundleSudokuPuzzleWithAnswer(num);
}

function getSudokuPuzzle(): Promise<any> {
    return sudokuRepo.generatesSudokuPuzzle();
}

function getSudokuAnswer(): Promise<any> {
    return sudokuRepo.generatesValidSudokuBoard();
}

// Export default
export default {
    getSudokuPuzzleWithAnswer,
    getBundleSudokuPuzzleWithAnswer,
    getSudokuPuzzle,
    getSudokuAnswer,
} as const;
