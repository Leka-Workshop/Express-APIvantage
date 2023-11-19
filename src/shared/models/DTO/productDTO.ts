import { IProduct } from '../../../databases/postgresql/model/product.model';

export class ProductResponseDTO {
  id?: number;
  name!: string;
  description?: string;
  datePublished!: string;
  price?: number;
  image?: string

  static toResponse(product: IProduct): ProductResponseDTO {
    const productDTO = new ProductResponseDTO();
    productDTO.id = product.id;
    productDTO.name = product.name;
    productDTO.price = product.price;
    productDTO.description = product.description;
    productDTO.datePublished = product.datePublished;
    productDTO.image = product.image;

    return productDTO;
  }
}
