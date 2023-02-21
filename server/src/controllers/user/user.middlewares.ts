import {check, param} from 'express-validator';
import {validationErrorHandler} from '../../utils/validationErrorHandler';

export const createNewUserValidation = [
  check('name')
    .optional({checkFalsy: true})
    .bail()
    .isString()
    .withMessage('name must be string'),
  check('interest')
    .optional({checkFalsy: true})
    .bail()
    .isString()
    .withMessage('interest must be string'),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .bail()
    .isString()
    .withMessage('password must be string'),
  check('email')
    .isEmail()
    .withMessage('must be valid email')
    .bail()
    .notEmpty()
    .withMessage('email is required')
    .bail()
    .isString()
    .withMessage('email must be string'),
  check('phone')
    .isMobilePhone('en-NG')
    .withMessage('phone must be valid nigerian number')
    .bail()
    .isString()
    .withMessage('phone should be string'),
  validationErrorHandler,
];

export const loginValidator = [
  check('username')
    .notEmpty()
    .withMessage('username is required')
    .bail()
    .isString()
    .withMessage('username must be string')
    .bail(),
  check('userpassword')
    .notEmpty()
    .withMessage('userpassword is required')
    .bail()
    .isString()
    .withMessage('userpassword must be string')
    .bail(),
  validationErrorHandler,
];
export const verifyOtp = [
  check('otp')
    .notEmpty()
    .withMessage('otp is required')
    .bail()
    .isString()
    .withMessage('otp must be string')
    .bail(),
  param('id')
    .notEmpty()
    .withMessage('id is required')
    .bail()
    .isString()
    .withMessage('id must be string')
    .isMongoId()
    .withMessage('param must be mongo id')
    .bail(),
  validationErrorHandler,
];
export const forgotPasswordValidator = [
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .bail()
    .isString()
    .withMessage('email must be string')
    .bail()
    .isEmail()
    .withMessage('invalid email value'),
  validationErrorHandler,
];
export const verifyBySmsValidator = [
  check('phone')
    .notEmpty()
    .withMessage('phone is required')
    .bail()
    .isString()
    .withMessage('phone must be string')
    .bail(),
  validationErrorHandler,
];
