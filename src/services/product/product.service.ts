import to from 'await-to-js';
import { ProductEntity } from '../../databases/postgresql/entity/product.entity';
import { IProduct } from '../../databases/postgresql/model/product.model';
import { useTypeORM } from '../../databases/postgresql/typeorm';
import { ErrorMessages } from '../../shared/enums/messages/error-messages.enum';
import {
  InternalServerErrorException,
  NotFoundException,
} from '../../shared/exceptions/http.exceptions';
import { ProductResponseDTO } from '../../shared/models/DTO/productDTO';

// POST /api/typeorm/product
export const createProduct = async (
  product: IProduct
): Promise<ProductResponseDTO> => {
  const [error, newProduct] = await to(useTypeORM(ProductEntity).save(product));

  // by this point all mandatory fields should be validated
  // this check is only if something fails on the databse level
  if (error) {
    throw new InternalServerErrorException(ErrorMessages.CreateFail);
  }

  const productDTO = ProductResponseDTO.toResponse(newProduct);
  return productDTO;
};

// GET /api/typeorm/product
export const retrieveProducts = async (): Promise<ProductResponseDTO[]> => {
  const [error, products] = await to(useTypeORM(ProductEntity).find());

  if (error) {
    throw new InternalServerErrorException(ErrorMessages.GetFail);
  }

  if (!products?.length) {
    return [];
  }

  const productsDTO = products.map((product) =>
    ProductResponseDTO.toResponse(product as IProduct)
  );
  return productsDTO;
};

// GET /api/typeorm/product/:id
export const retrieveProductById = async (
  id: number
): Promise<ProductResponseDTO> => {
  const [error, existingProduct] = await to(
    useTypeORM(ProductEntity).findOneBy({ id })
  );

  if (error) {
    throw new InternalServerErrorException(ErrorMessages.GetFail);
  }

  if (!existingProduct) {
    throw new NotFoundException(`Product with id: ${id} was not found!`);
  }

  const productDTO = ProductResponseDTO.toResponse(existingProduct as IProduct);
  return productDTO;
};

// PATCH /api/typeorm/product/:id
export const updatedProduct = async (
  id: number,
  changes: Partial<IProduct>
): Promise<ProductResponseDTO> => {
  const [getError, existingProduct] = await to(
    useTypeORM(ProductEntity).findOneBy({ id })
  );

  if (getError) {
    throw new InternalServerErrorException(ErrorMessages.GetFail);
  }

  if (!existingProduct) {
    throw new NotFoundException(`Product with id: ${id} was not found!`);
  }

  const productChanges = { ...existingProduct, ...changes };
  const [updateError, updatedProduct] = await to(
    useTypeORM(ProductEntity).save(productChanges)
  );

  if (updateError) {
    throw new InternalServerErrorException(ErrorMessages.UpdateFail);
  }

  const productDTO = ProductResponseDTO.toResponse(updatedProduct as IProduct);
  return productDTO;
};

// DELETE /api/typeorm/product/:id
export const deleteProduct = async (id: number): Promise<void> => {
  const [getError, existingProduct] = await to(
    useTypeORM(ProductEntity).findOneBy({ id })
  );

  if (getError) {
    throw new InternalServerErrorException(ErrorMessages.GetFail);
  }

  if (!existingProduct) {
    throw new NotFoundException(`Product with id: ${id} was not found!`);
  }

  const [deleteError] = await to(
    useTypeORM(ProductEntity).remove(existingProduct)
  );

  if (deleteError) {
    throw new InternalServerErrorException(ErrorMessages.DeleteFail);
  }
};
