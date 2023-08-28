import { Request, Response } from 'express';
import { HTTPHeaders } from '../enums/http/http-headers.enum';
import IHTTPError from '../models/http-error';
import IHTTPLoggerResponseData from '../models/http-logger-response-data.interface';
import redactLogData from './redact-logger.helper';


const formatHTTPLoggerResponse = (
  req: Request,
  res: Response,
  responseBody: any,
  exception?: IHTTPError
): IHTTPLoggerResponseData => {
  const responseTimeInMS = '.';

  // if (req.requestStartTime) {
  //   console.log('req.requestStartTime :>> ', req.requestStartTime);
  //   const endTime = Date.now() - req.requestStartTime;
  //   responseTimeInMS = `${endTime / 1000}s`; // ms to s
  // }

  // console.log('responseBody :>> ', responseBody);

  return {
    request: {
      headers: req.headers,
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req?.params,
      query: req?.query,
      clientIp:
        req?.headers[HTTPHeaders.ForwardedFor] ?? req?.socket.remoteAddress,
    },
    response: {
      headers: res.getHeaders(),
      statusCode: exception?.statusCode || res.statusCode,
      responseTime: responseTimeInMS,
      body: redactLogData(responseBody),
    },
    error: exception
      ? {
          statusCode: exception.statusCode,
          message: exception.message,
          stackTrace: exception.stack,
        }
      : {},
  };
};

export default formatHTTPLoggerResponse;
