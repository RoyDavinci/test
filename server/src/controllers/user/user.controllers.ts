/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-else-return
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import HTTP_STATUS_CODE from '../../constants/httpCodes';
import User from '../../db/user/user';
import {logger} from '../../utils/logger';
import config from '../../config';
import {sendEmail} from '../../common/sendMail';
import {verifyEmailHTML} from '../../common/verifyEmail';
import {emailLink} from '../../common/emailLink';
import {generateOtp} from '../../common/generateNumber';
import {PowerSmpp} from './user.interface';
import {forgotPasswordLink} from '../../common/forgotPasswordLinkHtml';
import {forgotPasswordHTML} from '../../common/forgotPasswordHtml';
import {streamUpload} from '../../utils/streamifier';

export const createUser = async (req: Request, res: Response) => {
  const {email, name, password, phone, interest} = req.body;
  try {
    const findUser = await User.find({$or: [{email}, {phone}]});
    if (findUser.length !== 0)
      return res
        .status(HTTP_STATUS_CODE.FORBIDDEN)
        .json({message: 'user already exists'});
    const hashedPassword = await bcrypt.hash(password, 10);
    const createNewUser = new User({
      email,
      name,
      phone,
      password: hashedPassword,
      interest,
    });
    const token = jwt.sign(
      {id: createNewUser._id, email: createNewUser.email},
      config.server.secret,
      {expiresIn: '3h'},
    );

    return createNewUser.save((err, result) => {
      if (err)
        return res
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json({message: 'an error occured', err});

      return res.status(HTTP_STATUS_CODE.CREATED).json({
        message: 'user created',
        user: {
          id: result._id,
          email: result.email,
          phone: result.phone,
          interest: result.interest,
          name: result.name,
          avatar: result.avatar,
          isVerified: result.isVerified,
        },
        token,
      });
    });
  } catch (error) {
    logger.info(error);

    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error});
  }
};

export const verifyByMail = async (req: Request, res: Response) => {
  const {email} = req.body;

  try {
    const findUser = await User.findOne({email});
    if (!findUser)
      return res.status(400).json({message: 'user not found', success: false});
    const token = jwt.sign(
      {id: findUser._id, email: findUser.email},
      config.server.secret,
    );
    try {
      await sendEmail(
        findUser.email,
        'Email Verification',
        verifyEmailHTML(emailLink(token)),
      );
    } catch (error) {
      logger.info(error);

      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({message: 'an error occured', error, success: false});
    }

    return res.status(200).json({message: 'email sent', success: true});
  } catch (error) {
    logger.info(error);

    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error, success: false});
  }
};

export const verifyEmailToken = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(400).json({message: 'user not authenticated'});
    const {email} = req.user;
    const findUser = await User.findOne({email});
    if (!findUser)
      return res.status(400).json({message: 'user not found', success: false});
    findUser.isVerified = true;
    return findUser.save((err, data) => {
      if (err)
        return res
          .status(400)
          .json({message: 'an error occured', err, success: false});
      return res.status(200).json({
        message: 'user verified',
        user: {
          id: data._id,
          email: data.email,
          phone: data.phone,
          interest: data.interest,
          name: data.name,
          avatar: data.avatar,
          isVerified: data.isVerified,
        },
        success: true,
      });
    });
  } catch (error) {
    logger.info(error);

    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error, success: false});
  }
};

export const verifyBySms = async (req: Request, res: Response) => {
  const {phone} = req.body;

  try {
    const findUser = await User.findOne({phone});
    if (!findUser)
      return res
        .status(400)
        .json({message: 'incorrect phone number', success: false});
    const otp = generateOtp();
    const {data} = await axios.get(
      `http://sms.approot.ng/api/v2/SendBulkSms?ApiKey=${config.sms.SMS_API_KEY}&ClientId=${config.sms.SMS_CLIENT_ID}&SenderId=${config.sms.SMS_SENDER_ID}&MobileNumber_Message=${phone}^${otp}`,
    );
    logger.info(data);
    const response = data as unknown as PowerSmpp;
    if (response.Data[0].MessageErrorDescription === 'Success') {
      findUser.otp = otp;
      return findUser.save((err, result) => {
        if (err)
          return res
            .status(400)
            .json({message: 'an error occured', err, success: false});

        return res
          .status(200)
          .json({message: 'otp updated', result, success: true});
      });
    }

    return res.status(500).json({message: 'an error occured'});
  } catch (error) {
    logger.info(error);

    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error, success: false});
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const {otp} = req.body;
  const {id} = req.params;

  try {
    const findUser = await User.findById(id);
    if (!findUser)
      return res.status(400).json({message: 'user not found', success: false});
    if (Number(otp) !== findUser.otp)
      return res
        .status(400)
        .json({message: 'please input correct otp sent to you'});
    findUser.isVerified = true;
    return findUser.save((err, data) => {
      if (err)
        return res
          .status(400)
          .json({message: 'an error occured', err, success: false});
      return res.status(200).json({
        message: 'user verified',
        user: {
          id: data._id,
          email: data.email,
          phone: data.phone,
          interest: data.interest,
          name: data.name,
          avatar: data.avatar,
          isVerified: data.isVerified,
        },
        success: true,
      });
    });
  } catch (error) {
    logger.info(error);
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error, success: false});
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const {email} = req.body;
  try {
    const findUser = await User.findOne({email});
    if (!findUser) return res.status(400).json({message: 'user not found'});
    const token = jwt.sign(
      {id: findUser._id, email: findUser.email},
      config.server.secret,
      {expiresIn: '3h'},
    );
    try {
      await sendEmail(
        findUser.email,
        'Email Verification',
        forgotPasswordHTML(forgotPasswordLink(token)),
      );
    } catch (error) {
      logger.info(error);

      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({message: 'an error occured', error});
    }

    return res.status(200).json({message: 'email sent'});
  } catch (error) {
    logger.info(error);
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error});
  }
};

export const login = async (req: Request, res: Response) => {
  const {username, userpassword} = req.body;
  try {
    const findUser = await User.find({
      $or: [{email: username}, {phone: username}],
    });
    if (findUser.length <= 0)
      return res
        .status(400)
        .json({message: 'incorrect email or phone', success: false});
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {_id, email, isVerified, phone, password, interest, name, avatar} =
      findUser[0];
    const checkPassword = await bcrypt.compare(userpassword, password);
    if (!checkPassword)
      return res
        .status(400)
        .json({message: 'incorrect password', success: false});

    const token = jwt.sign({id: _id, email}, config.server.secret);
    return req.logIn(findUser[0], err => {
      if (err)
        return res
          .status(400)
          .json({message: 'an error occured', err, success: false});
      return res.status(200).json({
        message: 'user login successful',
        user: {
          id: _id,
          email,
          phone,
          interest,
          name,
          avatar,
          isVerified,
        },
        token,
        success: true,
      });
    });
  } catch (error) {
    logger.info(error);
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error, success: false});
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    logger.info(req.user);
    if (req.session) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      req.session.destroy(() => {});
      res.clearCookie('connect.sid');
    }
    return req.logOut(err => {
      if (err) {
        logger.info(err);
        return res.status(400).json({message: 'an error occured on signout'});
      }
      return res
        .status(200)
        .json({success: true, message: 'signed out successfully'});
    });
  } catch (error) {
    logger.info(error);
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error});
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const {email, password, name} = req.body;
  const {id} = req.params;
  logger.info('welcome');

  try {
    logger.info('here');
    const findUser = await User.findById(id);
    if (!findUser)
      return res.status(400).json({message: 'user not found', success: false});
    logger.info('yes user');
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        if (req.file) {
          const result = await streamUpload(req.file.buffer);
          if (result.message)
            return res.status(result.http_code).json({
              message: 'error using cloudinary upload',
              error: result.message,
              success: false,
            });
          const user = await User.findByIdAndUpdate(
            id,
            {avatar: result.secure_url, password: hashedPassword, name, email},
            {new: true},
          );
          return res.status(200).json({
            message: 'user updated',
            user: {
              id: user?._id,
              email: user?.email,
              phone: user?.phone,
              interest: user?.interest,
              name: user?.name,
              avatar: user?.avatar,
              isVerified: user?.isVerified,
            },
            success: true,
          });
        }
      } catch (error) {
        logger.info(error);
        return res
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json({message: 'an error occured', error, success: false});
      }
      logger.info('password no file');
      const user = await User.findByIdAndUpdate(
        id,
        {password: hashedPassword, name, email},
        {new: true},
      );
      return res.status(200).json({
        message: 'user updated',
        user: {
          id: user?._id,
          email: user?.email,
          phone: user?.phone,
          interest: user?.interest,
          name: user?.name,
          avatar: user?.avatar,
          isVerified: user?.isVerified,
        },
        success: true,
      });
    }
    logger.info('no password');
    if (req.file) {
      logger.info('so file');
      try {
        const result = await streamUpload(req.file.buffer);
        if (result.message)
          return res.status(result.http_code).json({
            message: 'error using cloudinary upload',
            error: result.message,
            success: false,
          });
        const user = await User.findByIdAndUpdate(
          id,
          {avatar: result.secure_url, name, email},
          {new: true},
        );
        return res.status(200).json({
          message: 'user updated',
          user: {
            id: user?._id,
            email: user?.email,
            phone: user?.phone,
            interest: user?.interest,
            name: user?.name,
            avatar: user?.avatar,
            isVerified: user?.isVerified,
          },
          success: true,
        });
      } catch (error) {
        logger.info(error);
        return res
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json({message: 'an error occured', error, success: false});
      }
    }
    const user = await User.findByIdAndUpdate(id, {name, email}, {new: true});
    logger.info('yaay nothing');
    return res.status(200).json({
      message: 'user updated',
      user: {
        id: user?._id,
        email: user?.email,
        phone: user?.phone,
        interest: user?.interest,
        name: user?.name,
        avatar: user?.avatar,
        isVerified: user?.isVerified,
      },
      success: true,
    });
  } catch (error) {
    logger.info(error);
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error, success: false});
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  try {
    const findUser = await User.findOne({email});
    if (!findUser) return res.status(400).json({message: 'user not found'});
    const hashedPassword = await bcrypt.hash(password, 10);
    findUser.password = hashedPassword;
    return findUser.save((err, data) => {
      if (err) return res.status(400).json({err});
      return res.status(200).json({data});
    });
  } catch (error) {
    logger.info('here', error);
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({message: 'an error occured', error, success: false});
  }
};
