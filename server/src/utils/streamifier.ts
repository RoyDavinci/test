import {
  UploadApiErrorResponse,
  UploadApiResponse,
  UploadStream,
  v2 as cloudinary,
} from 'cloudinary';
import streamifier from 'streamifier';
import {logger} from './logger';

export const streamUpload = (
  req: Buffer,
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  logger.info('gotten to stream upload');

  return new Promise((resolve, reject) => {
    const stream: UploadStream = cloudinary.uploader.upload_stream(
      {timeout: 60000},
      (error, result) => {
        if (result) {
          return resolve(result);
        }

        return reject(error);
      },
    );
    if (!req) return {message: 'please pass a file'};

    return streamifier.createReadStream(req).pipe(stream);
  });
};

export const testUpload = (file: Buffer) => {
  if (!file) return {message: 'please pass a file'};
  const stream: UploadStream = cloudinary.uploader.upload_stream(
    {
      timeout: 60000,
    },
    (
      error: UploadApiErrorResponse | undefined,
      result: UploadApiResponse | undefined,
    ) => {
      if (result) {
        streamifier.createReadStream(file).pipe(stream);
        logger.log('result', result);
        return result;
      }
      logger.log('error', error);
      return error;
    },
  );
  // logger.info(response);
  return streamifier.createReadStream(file).pipe(stream);
  // return {message: 'successful', success: true, response};
};
