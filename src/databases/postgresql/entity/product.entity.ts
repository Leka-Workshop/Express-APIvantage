import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Transform } from 'class-transformer';
import { IProduct } from '../model/product.model';

@Entity()
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Transform((value) => value.value)
  name!: string;

  @Column({ default: 0 })
  @Transform((value) => value.value)
  price!: number;

  @Column({ nullable: true })
  @Transform((value) => value.value)
  description!: string;

  @Column({ default: new Date().toDateString() })
  @Transform((value) => value.value)
  datePublished!: string;

  @Column({ nullable: true })
  @Transform((value) => value.value)
  image!: string;
}
