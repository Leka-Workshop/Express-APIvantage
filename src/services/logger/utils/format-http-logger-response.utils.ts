import { HTTPHeaders } from '../../../shared/enums/http/http-headers.enum';
import { HTTPStatusCode } from '../../../shared/enums/http/http-status-codes.enum';
import IHTTPLoggerResponseData, { IHTTPLogMetaData } from '../interface/http-logger-response.interface';
import redactLogData from './redact-logs.utils';


const formatHTTPLoggerResponse = (context: IHTTPLogMetaData): IHTTPLoggerResponseData => {
  let requestDuration = '.';

  if (context.req?.requestStartTime) {
    const endTime = Date.now() - context.req.requestStartTime;
    requestDuration = `${endTime / 1000}s`;
  }

  return {
    request: {
      headers: context?.req?.headers,
      host: context?.req?.headers.host,
      protocol: context?.req?.protocol as string,
      baseUrl: context?.req?.baseUrl as string,
      url: context?.req?.url as string,
      method: context?.req?.method as string,
      body: context?.req?.body,
      params: context?.req?.params,
      query: context?.req?.query,
      clientIp:
      context.req?.headers[HTTPHeaders.ForwardedFor] ?? context.req?.socket.remoteAddress,
      requestDuration,
    },
    response: {
      headers: context?.res?.getHeaders(),
      statusCode: context?.error?.statusCode ?? context?.res?.statusCode as HTTPStatusCode,
      body: redactLogData(context.responseBody)
    },
    error: {
      name: context?.error?.name as string,
      statusCode: context?.error?.statusCode as HTTPStatusCode,
      message: context?.error?.message as string,
      stackTrace: context?.error?.stack as string
    },
    customMetaData: context?.customMetaData
  };
};

export default formatHTTPLoggerResponse;
