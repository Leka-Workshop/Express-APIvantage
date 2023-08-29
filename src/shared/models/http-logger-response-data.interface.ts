export default interface IHTTPLoggerResponseData {
  request: IHTTPLoggerRequest;
  response: IHTTPLoggerResponse;
}

interface IHTTPLoggerRequest {
  headers: any;
  host?: string;
  baseUrl: string;
  url: string;
  method: string;
  body: any;
  params: any;
  query: any;
  clientIp?: string | string[];
}

interface IHTTPLoggerResponse {
  headers: any;
  statusCode: number;
  responseTime: string;
  body: any;
}
