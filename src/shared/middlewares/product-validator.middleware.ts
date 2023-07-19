import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';

import {
  CreateProductValidationSchema,
  GetProductIdValidationSchema,
  UpdateProductValidationSchema,
} from '../validators/product.class.validator';
import { ProductEntity } from '../../databases/postgresql/entity/product.entity';

export const createProductValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: 'Missing request body!' });
    }

    // we could also do this instead of manual mapping each field
    // const product = plainToClass(CreateProductValidationSchema, req.body);
    const product = new CreateProductValidationSchema();
    product.name = req.body.name;
    product.image = req.body.image;
    product.price = req.body.price;
    product.description = req.body.description;

    // checks a product instance against the schema validations
    await validateOrReject(product);

    // mapping CreateProductValidationSchema instance to ProductEntity instance
    req.body = plainToClass(ProductEntity, product);

    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};

export const updateProductValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params?.id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    if (!req.body) {
      return res.status(400).send({ message: 'Missing request body!' });
    }

    const product = new UpdateProductValidationSchema();
    product.name = req.body.name;
    product.image = req.body.image;
    product.price = req.body.price;
    product.description = req.body.description;

    await validateOrReject(product);

    // mapping UpdateProductValidationSchema instance to ProductEntity instance
    req.body = plainToClass(ProductEntity, product);

    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};

export const getProductByIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params?.id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const product = new GetProductIdValidationSchema();
    product.id = Number(req.params.id);

    await validateOrReject(product);

    next();
  } catch (e: any) {
    // extract generated message from the errors array
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};
