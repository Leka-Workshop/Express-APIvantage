import { NextFunction, Request, Response } from 'express';
import { httpLogger, httpLoggerDB } from '../../services/logger.service';
import { HTTPMethods } from '../enums/http/http-methods.enum';
import { SuccessMessages } from '../enums/messages/success-messages.enum';
import formatHTTPLoggerResponse from '../helpers/format-http-logger-response.helper';

// This middleware is called before sending response to the client
// It is used as a central place for logging and formating response message
const responseInterceptor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // used to calculate time between request and the response
  const requestStartTime = Date.now();

  // Save the original response method
  const originalSend = res.send;

  // Create a flag to track whether the response has been sent
  let responseSent = false;

  // Override the response method
  res.send = function (body: any): Response {
    // Log the response body or any other data you want to track
    if (!responseSent) {
      if (res.statusCode < 400) {
        httpLogger.info(
          getResponseMessage(req.method),
          formatHTTPLoggerResponse(req, res, body, null, requestStartTime)
        );

        httpLoggerDB.info(
          getResponseMessage(req.method),
          formatHTTPLoggerResponse(req, res, body, null, requestStartTime)
        );
      } else {
        httpLogger.error(
          body.message,
          formatHTTPLoggerResponse(req, res, body, null, requestStartTime)
        );

        httpLoggerDB.error(
          body.message,
          formatHTTPLoggerResponse(req, res, body, null, requestStartTime)
        );
      }

      responseSent = true;
    }

    // Call the original response method
    return originalSend.call(this, body);
  };

  // Continue processing the request
  next();
};

export default responseInterceptor;

function getResponseMessage(responseMethod: HTTPMethods | string): string {
  switch (responseMethod) {
    case HTTPMethods.POST:
      return SuccessMessages.CreateSuccess;
    case HTTPMethods.GET:
      return SuccessMessages.GetSuccess;
    case HTTPMethods.PUT || HTTPMethods.PATCH:
      return SuccessMessages.UpdateSuccess;
    case HTTPMethods.DELETE:
      return SuccessMessages.DeleteSuccess;
    default:
      return SuccessMessages.GenericSuccess;
  }
}
