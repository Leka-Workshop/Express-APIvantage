import { Router, Request, Response } from 'express';
import { useTypeORM } from '../../databases/postgresql/typeorm';
import { ProductEntity } from '../../databases/postgresql/entity/product.entity';
import { createProductValidator, getProductByIdValidator, updateProductValidator } from '../../shared/middlewares/product-validator.middleware';

const controller = Router();

controller

  .post('/', createProductValidator, async (req: Request, res: Response) => {
    try {
      const newProduct = await useTypeORM(ProductEntity).save(req.body);
      res.status(201).send(newProduct);
    } catch(e: unknown) {
      res.status(500).send({ message: 'Unable to save entry to DB!' })
    }
  })

  .get('/', async (req: Request, res: Response) => {
    try {
      const products = await useTypeORM(ProductEntity).find();
      res.send(products);
    } catch(e: unknown) {
      res.status(500).send({ message: 'Unable to retrieve data from DB!' })
    }
  })

  .get('/:id',getProductByIdValidator, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingProduct = await useTypeORM(ProductEntity).findOneBy({ id });

      if (!existingProduct) {
        return res.status(404).send({ message: `Product with id: ${id} was not found.` });
      }

      res.send(existingProduct);

    } catch (e: unknown) {
      res.status(500).send({ message: 'Unable to retrieve data from DB!' })
    }
  })

  .patch('/:id', getProductByIdValidator, updateProductValidator, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingProduct = await useTypeORM(ProductEntity).findOneBy({ id });

      if (!existingProduct) {
        return res.status(404).send({ message: `Product with id: ${id} was not found.` });
      }

      const changes: Partial<ProductEntity> = req.body;
      const productChanges = { ...existingProduct, ...changes };

      const updatedProduct = await useTypeORM(ProductEntity)
        .save(productChanges);

      res.send(updatedProduct);

    } catch(e: unknown) {
      res.status(500).send({ message: 'Unable to update entry in DB!' })
    }
  })

  .delete('/:id', getProductByIdValidator, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingProduct = await useTypeORM(ProductEntity).findOneBy({ id });

      if (!existingProduct) {
        return res.status(404).send({ message: `Product with id: ${id} was not found.` });
      }

      await useTypeORM(ProductEntity).remove(existingProduct);
      res.send({ message: 'Product removed!' });
    } catch(e: unknown) {
      res.status(500).send({ message: 'Unable to delete entry from DB!' })
    }
  })

export default controller;
