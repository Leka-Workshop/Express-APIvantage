import {
  IsInt,
  Length,
  IsUrl,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { IProduct } from '../../databases/postgresql/model/product.model';

/**
 * Base Class for Product validation
 */
export class BaseProductValidationSchema { }

export class CreateProductValidationSchema extends BaseProductValidationSchema implements IProduct {
  @Length(3, 50)
  @IsNotEmpty()
  name!: string;

  @Length(0, 300)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @Max(1000_000)
  @IsOptional()
  price?: number;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsDate()
  @IsOptional()
  datePublished!: string;
}

// Update Product is similar to Create Product, but every field is optional
export class UpdateProductValidationSchema
  extends CreateProductValidationSchema
{
  @Length(3, 50)
  @IsOptional()
  name!: string;
}

export class GetProductIdValidationSchema extends BaseProductValidationSchema {
  @IsInt()
  @Min(1)
  id!: number
}
