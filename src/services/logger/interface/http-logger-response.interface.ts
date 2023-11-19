
import { Response } from 'express';
import { HTTPStatusCode } from '../../../shared/enums/http/http-status-codes.enum';
import { IHTTPError } from '../../../shared/models/extensions/errors.extension';
import IExtendedRequest from '../../../shared/models/extensions/request.extension';

export default interface IHTTPLoggerResponseData {
  request: IHTTPLoggerRequest;
  response: IHTTPLoggerResponse;
  error: IHTTPLoggerError;
  customMetaData?: any
}

export interface IHTTPLogMetaData {
  req?: IExtendedRequest;
  res?: Response;
  responseBody?: any;
  error?: IHTTPError;
  customMetaData?: any;
}


interface IHTTPLoggerRequest {
  headers: any;
  host?: string;
  protocol: string;
  baseUrl: string;
  url: string;
  method: string;
  body: any;
  params: any;
  query: any;
  clientIp?: string | string[];
  requestDuration: string;
}

interface IHTTPLoggerResponse {
  headers: any;
  statusCode: HTTPStatusCode;
  body: any;
}

interface IHTTPLoggerError {
  name: string;
  statusCode: HTTPStatusCode;
  message: string;
  stackTrace: string;
}
