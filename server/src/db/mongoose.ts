import mongoose from 'mongoose';
import config from '../config';
import {logger} from '../utils/logger';

export function connect() {
  try {
    mongoose.connect(config.database_url, error => {
      if (error) {
        logger.error(error);
        process.exit(1);
      }
      logger.info('new mongoose connection');
    });
  } catch (error) {
    logger.info(error);
    process.exit(1);
  }
}
