/* eslint-disable @typescript-eslint/no-throw-literal */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import http from 'http';
import debug from 'debug';
import passport from 'passport';
import {v2 as cloudinary} from 'cloudinary';
import {logger} from './utils/logger';
import {passportService} from './common/passport';
import config from './config';
import sessionInstance from './common/session';
import serviceNotFoundHandler from './common/serviceNotFoundHandler';
import {connect} from './db/mongoose';
import apiRouter from './routes/router';
import healthRouter from './controllers/health/health.service';

dotenv.config();

const app = express();
const serverDebugger = debug('text:server');

cloudinary.config({
  cloud_name: config.cloudinaryConfig.name,
  api_key: config.cloudinaryConfig.api_key,
  api_secret: config.cloudinaryConfig.api_secret,
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
app.use(sessionInstance);
passportService(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', healthRouter);
app.use('/api/v1', apiRouter);
mongoose.set('strictQuery', true);
app.use(serviceNotFoundHandler);
function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const PORT = normalizePort(process.env.PORT || '3900');

const server: http.Server = http.createServer(app);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason),
);

server.listen(PORT, () => {
  connect();
  if (config.isDevelopment)
    logger.info(`server PORT: http://localhost:${PORT}`);
});

function onError(error: {syscall: string; code: string}) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `PORT ${PORT}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    case 'ELIFECYCLE':
      logger.error(`${bind}this happened instaed`);
      process.exit(1);
      break;
    default:
      logger.info('this happened instead');
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  serverDebugger(`Listening on ${bind}`);
}

server.on('error', onError);
server.on('listening', onListening);
