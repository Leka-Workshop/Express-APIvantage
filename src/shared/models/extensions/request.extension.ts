import { Request } from 'express';

export default interface IExtendedRequest extends Request {
  requestStartTime?: number;
}
