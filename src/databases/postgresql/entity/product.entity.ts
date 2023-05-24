import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import IProduct from '../model/product.model';

@Entity()
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 0 })
  price!: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: new Date().toDateString() })
  datePublished!: string;

  @Column({ nullable: true })
  image!: string;
}
