import to from 'await-to-js';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '../exceptions/http.exceptions';
import {
  changePasswordValidationSchema,
  createUserValidationSchema,
  updateUserValidationSchema,
  getUserIdValidationSchema,
} from '../validators/user.joi.validator';

export const createUserValidator = asyncHandler(async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.body)
    throw new BadRequestException('Missing request body!');

  // the validateAsync method is built into Joi
  const [error] = await to(createUserValidationSchema.validateAsync(req.body));

  if (error)
    throw new BadRequestException(error.message);

  next();
});

export const updateUserValidator = asyncHandler(async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.params?.id)
    throw new BadRequestException('Required parameter "id" is missing!');

  if (!req.body)
    throw new BadRequestException('Missing request body!');

  if (req.body.password || req.body.new_password)
    throw new BadRequestException('Invalid change requested!');

  const [error] = await to(updateUserValidationSchema.validateAsync(req.body));

  if (error)
    throw new BadRequestException(error.message);

  next();
});

export const changePasswordValidator = asyncHandler(async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.body)
    throw new BadRequestException('Missing request body!');

  const [error] = await to(changePasswordValidationSchema.validateAsync(req.body));

  if (error)
    throw new BadRequestException(error.message);

  next();
});

export const getUserByIdValidator = asyncHandler(async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.params?.id)
    throw new BadRequestException('Required parameter "id" is missing!');

  const [error] = await to(getUserIdValidationSchema.validateAsync(req.params));

  if (error)
    throw new BadRequestException(error.message);

  next();
});
