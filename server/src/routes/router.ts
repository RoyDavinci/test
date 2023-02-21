import {Router} from 'express';
import {userRouter} from '../controllers';

const apiRouter = Router();

apiRouter.use('/user', userRouter);

export default apiRouter;
