import {serverConfig} from './server';
import mail from './mail';
import cloudinaryConfig from './cloudinary';
import {dbConfig} from './db';
import {smsConfig} from './sms';

const config = {
  ...serverConfig,
  ...mail,
  ...cloudinaryConfig,
  ...dbConfig,
  ...smsConfig,
};

export default config;
