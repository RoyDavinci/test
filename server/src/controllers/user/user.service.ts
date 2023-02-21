import {Router} from 'express';
import * as controllers from './user.controllers';
import * as middlewares from './user.middlewares';

export const userRouter = Router();

userRouter.post(
  '/create',
  middlewares.createNewUserValidation,
  controllers.createUser,
);
userRouter.post(
  '/verify-by-email',
  middlewares.forgotPasswordValidator,
  controllers.verifyByMail,
);
userRouter.post(
  '/verify-by-phone',
  middlewares.verifyBySmsValidator,
  controllers.verifyBySms,
);
userRouter.post(
  '/verify-otp/:id',
  middlewares.verifyOtp,
  controllers.verifyOtp,
);
userRouter.post(
  '/forgot-password',
  middlewares.forgotPasswordValidator,
  controllers.forgotPassword,
);
userRouter.post('/logout', controllers.logout);
userRouter.post('/login', middlewares.loginValidator, controllers.login);
