import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from '../config/config';
import logger from '../config/pino';
import ApiError from '../utils/ApiError';

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (
  err: { isOperational?: any; message: any; stack?: any; statusCode?: any },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  const response = {
    code: statusCode,
    message: message,
    stack: err?.stack,
    body: req?.body,
    query: req?.query,
    params: req?.params,
    headers: req?.headers,
  };
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  const responseToClient = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err?.stack }),
  };
  const code = statusCode && typeof statusCode == 'number' ? statusCode : 500;
  logger.error({ err: response });
  res.status(code).send(responseToClient);
};

export default {
  errorConverter,
  errorHandler,
};
