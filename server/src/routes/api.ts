import { Router } from 'express';
import { authMw } from './middleware';
import authRouter from './auth-router';
import userRouter from './user-router';
import chatRouter from './chat-router';
import sudokuRouter from './sudoku-router';


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', authMw, userRouter);
apiRouter.use('/chat', authMw, chatRouter);
apiRouter.use('/sudoku', sudokuRouter);

// Export default
export default apiRouter;
