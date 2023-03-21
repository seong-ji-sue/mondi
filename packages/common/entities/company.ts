import { Entity, Column, OneToMany } from 'typeorm';
import CommonEntity from '../utils/commonEntity';
import Product from './product';

@Entity("company")
export default class Company extends CommonEntity {
  @Column("varchar", { length: 64 })
  name: string;

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];
}
