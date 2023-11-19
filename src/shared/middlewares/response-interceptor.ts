import { NextFunction, Response } from 'express';
import { dbLoggerService } from '../../services/logger/db-logger.service';
import { httpLoggerService } from '../../services/logger/http-logger.service';
import { HTTPStatusCode } from '../enums/http/http-status-codes.enum';
import IExtendedRequest from '../models/extensions/request.extension';

// This middleware is called before sending response to the client
// It is used as a central place for logging and formating response message
const responseInterceptor = (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  // used to calculate time between request and the response
  req.requestStartTime = Date.now();

  // Save the original response method
  const originalSend = res.send;

  // Create a flag to track whether the response has been sent
  let responseSent = false;

  // Override the response method
  res.send = function (responseBody: any): Response {
    // Log the response body or any other data you want to track
    // responseSent is used to block the same request from been sent twice
    if (!responseSent) {
      // Failed requests are logged from global middleware exception handler
      if (res.statusCode < HTTPStatusCode.BadRequest) {
        httpLoggerService.info({ req, res, responseBody })
        dbLoggerService.info({ req, res, responseBody });
      }
      responseSent = true;
    }

    // Call the original response method
    return originalSend.call(this, responseBody);
  };

  // Continue processing the request
  next();
};

export default responseInterceptor;
