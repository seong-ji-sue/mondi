import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import CommonEntity from '../utils/commonEntity';
import Product from './product';
import RegionDepth2 from './regionDepth2';

@Entity("region_depth3")
export default class RegionDepth3 extends CommonEntity {
  @Column("varchar", { length: 16 })
  name: string;

  @ManyToOne(() => RegionDepth2, (regionDepth2) => regionDepth2.regionDepth3s)
  regionDepth2: RegionDepth2;

  @OneToMany(() => Product, (product) => product.regionDepth1)
  products: Product[];
}
