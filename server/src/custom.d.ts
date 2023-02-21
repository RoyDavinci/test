import {IUser} from './db/user/user';

declare global {
  namespace Express {
    type User = IUser;
  }
}
