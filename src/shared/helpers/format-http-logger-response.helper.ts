import { Request, Response } from 'express';
import { HTTPHeaders } from '../enums/http/http-headers.enum';
import IHTTPError from '../models/http-error';
import IHTTPLoggerResponseData from '../models/http-logger-response-data.interface';
import redactLogData from './redact-logger.helper';


const formatHTTPLoggerResponse = (
  req: Request,
  res: Response,
  responseBody: any,
  exception?: IHTTPError | null,
  requestStartTime?: number
): IHTTPLoggerResponseData => {
  let responseTimeInMS = '.';

  if (requestStartTime) {
    const endTime = Date.now() - requestStartTime;
    responseTimeInMS = `${endTime / 1000}s`; // ms to s
  }

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
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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
