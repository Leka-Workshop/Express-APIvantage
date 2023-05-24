import { Router, Request, Response } from 'express';
import { useTypeORM } from '../../databases/postgresql/typeorm';
import { ProductEntity } from '../../databases/postgresql/entity/product.entity';

const controller = Router();

controller

  .post('/', async (req: Request, res: Response) => {
    const product = new ProductEntity();
    product.name = req.body.name;
    product.image = req.body.image;
    product.price = req.body.price;
    product.description = req.body.description;

    const newProduct = await useTypeORM(ProductEntity).save(product);
    res.status(201).send(newProduct);
  })

  .get('/', async (req: Request, res: Response) => {
    const products = await useTypeORM(ProductEntity).find();
    res.send(products);
  })

  .get('/:id',  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingProduct = await useTypeORM(ProductEntity).findOneBy({ id });

    if (!existingProduct) {
      return res.status(404).send({ message: `Product with id: ${id} was not found.` });
    }

    res.send(existingProduct);
  })

  .patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingProduct = await useTypeORM(ProductEntity).findOneBy({ id });

    if (!existingProduct) {
      return res.status(404).send({ message: `Product with id: ${id} was not found.` });
    }

    const changes: Partial<ProductEntity> = req.body;
    const productChanges = { ...existingProduct, ...changes };

    const updatedProduct = await useTypeORM(ProductEntity).save(productChanges);
    res.send(updatedProduct);
  })

  .delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingProduct = await useTypeORM(ProductEntity).findOneBy({ id });

    if (!existingProduct) {
      return res.status(404).send({ message: `Product with id: ${id} was not found.` });
    }

    await useTypeORM(ProductEntity).remove(existingProduct);
    res.send({ message: 'Product removed!' });
  })

export default controller;
