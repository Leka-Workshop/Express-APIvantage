import { Request, Response, NextFunction } from 'express';
import { dbLoggerService } from '../../services/logger/db-logger.service';
import { httpLoggerService } from '../../services/logger/http-logger.service';
import { ErrorMessages } from '../enums/messages/error-messages.enum';
import { IHTTPError } from '../models/extensions/errors.extension';

export const exceptionHandler = (
  error: IHTTPError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {

  const statusCode = error.statusCode || 500;
  const message = error.message || ErrorMessages.Generic;

  httpLoggerService.error({ req, res, error });
  dbLoggerService.error({ req, res, error });

  return res
    .status(statusCode)
    .send({ statusCode, message });
};
