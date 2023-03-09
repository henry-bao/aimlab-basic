import express from 'express';
const apiRouter = express.Router();

import { gameRouter } from './controllers/game.js';
import { userRouter } from './controllers/user.js';

apiRouter.use('/game', gameRouter);
apiRouter.use('/user', userRouter);

export { apiRouter };
