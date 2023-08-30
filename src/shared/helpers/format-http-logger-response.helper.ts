import { Request, Response } from 'express';
import { HTTPHeaders } from '../enums/http/http-headers.enum';
import IHTTPLoggerResponseData from '../models/http-logger-response-data.interface';
import redactLogData from './redact-logger.helper';


const formatHTTPLoggerResponse = (
  req: Request,
  res: Response,
  responseBody: any,
  requestStartTime?: number
): IHTTPLoggerResponseData => {
  let requestDurationInMs = '.';

  if (requestStartTime) {
    const endTime = Date.now() - requestStartTime;
    requestDurationInMs = `${endTime / 1000}s`; // ms to s
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
      statusCode: res.statusCode,
      requestDurationInMs,
      body: redactLogData(responseBody),
    }
  };
};

export default formatHTTPLoggerResponse;
