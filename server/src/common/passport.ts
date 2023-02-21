/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {PassportStatic} from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import bcrypt from 'bcryptjs';
import User from '../db/user/user';
import config from '../config';

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.server.secret,
};

export const passportService = (passport: PassportStatic) => {
  passport.use(
    new passportJwt.Strategy(options, async (payload, done) => {
      const user = await User.findById({_id: payload._id});
      if (!user) return done(null, false, {message: 'user does not exist'});

      return done(null, user, {message: 'user authenticated'});
    }),
  );

  passport.use(
    new passportLocal.Strategy(
      {
        usernameField: process.env.MODEL_EMAIL_FIELD,
        passwordField: process.env.MODEL_PASSWORD_FIELD,
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({email: username});
          if (!user)
            return done(null, false, {
              message: `${username} is not a registered account`,
            });
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return done(null, false, {
              message: `password is incorrect`,
            });

          return done(null, user, {message: 'authenticated successfully'});
        } catch (error) {
          return done(error, false, {message: 'Error processing your info'});
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {_id} = user;
    done(null, _id);
  });

  passport.deserializeUser(async (_id, done) => {
    try {
      const user = await User.findById({_id});

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  });
};
