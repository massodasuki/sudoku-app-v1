import sudokuRepo from '@repos/sudoku-repo';

/**
 * Get sudoku.
 *
 * @returns
 */
function getSudokuPuzzleWithAnswer(): Promise<any> {
    return sudokuRepo.generatesSudokuPuzzleWithAnswer();
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
    getSudokuPuzzle,
    getSudokuAnswer,
} as const;
