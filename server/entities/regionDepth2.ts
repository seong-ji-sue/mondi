import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import CommonEntity from '../utils/commonEntity';
import Product from './product';
import RegionDepth1 from './regionDepth1';
import RegionDepth3 from './regionDepth3';

@Entity("region_depth2")
export default class RegionDepth2 extends CommonEntity {
  @Column("varchar", { length: 16 })
  name: string;

  @OneToMany(() => RegionDepth3, (regionDepth3) => regionDepth3.regionDepth2)
  regionDepth3s: RegionDepth3[];

  @ManyToOne(() => RegionDepth1, (regionDepth1) => regionDepth1.regionDepth2s)
  regionDepth1: RegionDepth1;

  @OneToMany(() => Product, (product) => product.regionDepth1)
  products: Product[];
}
