import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createProductValidator,
  getProductByIdValidator,
  updateProductValidator,
} from '../../shared/middlewares/product-validator.middleware';
import { SuccessMessages } from '../../shared/enums/messages/success-messages.enum';
import * as productService from '../../services/product/product.service';

const controller = Router();

controller

  // POST /api/typeorm/product
  .post(
    '/',
    createProductValidator,
    asyncHandler(async (req: Request, res: Response) => {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).send(newProduct);
    })
  )

  // GET /api/typeorm/product
  .get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
      const products = await productService.retrieveProducts();
      res.send(products);
    })
  )

  // GET /api/typeorm/product/:id
  .get(
    '/:id',
    getProductByIdValidator,
    asyncHandler(async (req: Request, res: Response) => {
      const existingProduct = await productService.retrieveProductById(Number(req.params.id));
      res.send(existingProduct);
    })
  )

  // PATCH /api/typeorm/product/:id
  .patch(
    '/:id',
    getProductByIdValidator,
    updateProductValidator,
    asyncHandler(async (req: Request, res: Response) => {
      const existingProduct = await productService.updatedProduct(
        Number(req.params.id),
        req.body
      );
      res.send(existingProduct);
    })
  )

  // DELETE /api/typeorm/product/:id
  .delete(
    '/:id',
    getProductByIdValidator,
    asyncHandler(async (req: Request, res: Response) => {
      await productService.deleteProduct(Number(req.params.id));
      res.send({ message: SuccessMessages.ProductRemoveSuccess });
    })
  );

export default controller;
