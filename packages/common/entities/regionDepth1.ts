import { Entity, Column, OneToMany } from 'typeorm';
import CommonEntity from '../utils/commonEntity';
import Product from './product';
import RegionDepth2 from './regionDepth2';

@Entity("region_depth1")
export default class RegionDepth1 extends CommonEntity {
  @Column("varchar", { length: 16 })
  name: string;

  @OneToMany(() => RegionDepth2, (regionDepth2) => regionDepth2.regionDepth1)
  regionDepth2s: RegionDepth2[];

  @OneToMany(() => Product, (product) => product.regionDepth1)
  products: Product[];
}
