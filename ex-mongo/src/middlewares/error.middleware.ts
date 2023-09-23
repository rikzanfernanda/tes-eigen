import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Internal server error';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

    if (status === 409) {
      res.status(status).json({
        status,
        message,
        errors: error.errors,
      });
    } else {
      res.status(status).json({
        status,
        message,
      });
    }
  } catch (error) {
    next(error);
  }
};
