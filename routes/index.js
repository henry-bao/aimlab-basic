import express from 'express';
const router = express.Router();

import { gameRouter } from './controllers/game';
import { userRouter } from './controllers/user';

router.use('/game', gameRouter);
router.use('/user', userRouter);

export { router as apiRouter };
