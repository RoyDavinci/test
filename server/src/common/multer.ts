import {NextFunction, Response, Request} from 'express';
import multer from 'multer';
import {logger} from '../utils/logger';

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, 'uploads/');
//   },
//   filename(req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

function uploadArray(req: Request, res: Response, next: NextFunction) {
  try {
    const upload = multer({
      limits: {fileSize: 1 * 1024 * 1024, fieldSize: 10 * 1024 * 1024},
    }).array('product', 10);

    return upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res
          .status(400)
          .json({message: 'Error occured on upload', error: err});
      }
      if (err) {
        return res
          .status(400)
          .json({message: 'Error occured on upload', error: err});
      }
      // Everything went fine.
      return next();
    });
  } catch (error) {
    return res.status(400).json({message: 'Error occured on upload', error});
  }
}

function uploadSingle(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info('here');
    const upload = multer({
      limits: {fileSize: 1 * 1024 * 1024, fieldSize: 10 * 1024 * 1024},
    }).single('image');
    logger.info('now here');
    return upload(req, res, err => {
      logger.info('in upload func');
      if (err instanceof multer.MulterError) {
        logger.info('A Multer error occurred when uploading');
        logger.info('multer error', err);
        return res
          .status(400)
          .json({message: 'Multer Error occured on upload ', error: err});
      }
      if (err) {
        logger.info('Another Multer error occurred when uploading');
        logger.info(err);
        return res
          .status(400)
          .json({message: 'Error occured on upload', error: err});
      }
      // Everything went fine.
      logger.info('running next');
      return next();
    });
  } catch (error) {
    logger.info('error', error);
    return res.status(400).json({message: 'Error occured on upload', error});
  }
}

export {uploadArray, uploadSingle};
