import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import sudokuService from '@services/sudoku-service';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
    getAll: '/all',
    getPuz: '/puzzle',
    getAns: '/answer',
    delete: '/delete/:id',
} as const;

/**
 * Get all users.
 */
router.get(p.getAll, async (_: Request, res: Response) => {
    const sudoku = await sudokuService.getSudokuPuzzleWithAnswer();
    // console.log(sudoku)
    return res.status(OK).json({sudoku});
});

router.get(p.getPuz, async (_: Request, res: Response) => {
    const sudoku = await sudokuService.getSudokuPuzzle();
    // console.log(sudoku)
    return res.status(OK).json({sudoku});
});

router.get(p.getAns, async (_: Request, res: Response) => {
    const sudoku = await sudokuService.getSudokuAnswer();
    // console.log(sudoku)
    return res.status(OK).json({sudoku});
});



// Export default
export default router;
