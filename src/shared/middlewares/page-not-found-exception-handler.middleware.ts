import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../exceptions/http.exceptions';

export const pageNotFoundExceptionHandler = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  // this error will be handled by exception-handling middleware
  throw new NotFoundException('Page not found!');
};
