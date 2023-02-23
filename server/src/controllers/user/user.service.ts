import {Router} from 'express';
// import multer from 'multer';
import {authenticateJWT} from '../../common/authenticate';
import {uploadSingle} from '../../common/multer';
import * as controllers from './user.controllers';
import * as middlewares from './user.middlewares';

export const userRouter = Router();
// const fileUpload = multer();

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
userRouter.patch('/update-user/:id', uploadSingle, controllers.updateUser);
userRouter.post(
  '/verify-otp/:id',
  middlewares.verifyOtp,
  controllers.verifyOtp,
);
userRouter.post(
  '/verify-email-token',
  authenticateJWT,
  controllers.verifyEmailToken,
);
userRouter.post(
  '/forgot-password',
  middlewares.forgotPasswordValidator,
  controllers.forgotPassword,
);
userRouter.post('/logout', controllers.logout);
userRouter.post('/login', middlewares.loginValidator, controllers.login);
userRouter.patch('/update-password', controllers.updatePassword);
