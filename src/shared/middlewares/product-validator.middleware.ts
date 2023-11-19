import to from 'await-to-js';
import asyncHandler from 'express-async-handler';
import { validateOrReject, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import {
  BaseProductValidationSchema,
  CreateProductValidationSchema,
  GetProductIdValidationSchema,
  UpdateProductValidationSchema,
} from '../validators/product.class.validator';
import { ProductEntity } from '../../databases/postgresql/entity/product.entity';
import { BadRequestException } from '../exceptions/http.exceptions';

export const createProductValidator = asyncHandler(async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.body)
    throw new BadRequestException('Missing request body!');

  // we could also do this instead of manual mapping each field
  // const product = plainToClass(CreateProductValidationSchema, req.body);
  const product = new CreateProductValidationSchema();
  product.name = req.body.name;
  product.image = req.body.image;
  product.price = req.body.price;
  product.description = req.body.description;

  // validate request body using await-to-js
  await validateProduct(product);

  // mapping CreateProductValidationSchema instance to ProductEntity instance
  req.body = plainToClass(ProductEntity, product);

  next();
});

export const updateProductValidator = asyncHandler(async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.params?.id)
    throw new BadRequestException('Required parameter "id" is missing!');

  if (!req.body)
    throw new BadRequestException('Missing request body!');

  const product = new UpdateProductValidationSchema();
  product.name = req.body.name;
  product.image = req.body.image;
  product.price = req.body.price;
  product.description = req.body.description;

  await validateProduct(product);

  // mapping UpdateProductValidationSchema instance to ProductEntity instance
  req.body = plainToClass(ProductEntity, product);

  next();
});

export const getProductByIdValidator = asyncHandler(async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.params?.id)
    throw new BadRequestException('Required parameter "id" is missing!');

  const product = new GetProductIdValidationSchema();
  product.id = Number(req.params.id);

  await validateProduct(product);

  next();
});

async function validateProduct(product: BaseProductValidationSchema): Promise<void> {
  const [error] = await to(validateOrReject(product));

  if (error && error instanceof Array) {
    const err: ValidationError[] = error;
    const message = err[0].constraints ? Object.values(err[0].constraints)[0] : '';
    throw new BadRequestException(message);
  }
}
