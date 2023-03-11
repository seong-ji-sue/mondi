import { Entity, Column, ManyToOne, ManyToMany, JoinTable, VirtualColumn } from 'typeorm';
import CommonEntity from '../utils/commonEntity';
import Category from './category';
import Company from './company';
import Image from './image';
import RegionDepth1 from './regionDepth1';
import RegionDepth2 from './regionDepth2';
import RegionDepth3 from './regionDepth3';

@Entity("product")
export default class Product extends CommonEntity {
  @Column("varchar", { length: 64 })
  title: string;

  @Column("int")
  cost: number;

  @Column("int")
  discountCost: number;

  @Column("int")
  numOfPeople: number;
  
  @Column("text")
  detailContent: string;

  @Column("varchar", { length: 32 })
  companyName: string;

  @Column("varchar", { length: 256 })
  companyMapUrl: string;

  @Column("datetime")
  startDate: Date;

  @Column("datetime")
  endDate: Date;

  /**
   * 1 모집중
   * 2 오픈예정
   * 3 마감
   */
  @VirtualColumn({
    query: () => `CASE
      WHEN product.startDate > NOW() THEN 2
      WHEN product.startDate < NOW() AND product.endDate > NOW() THEN 1
      ELSE 3
      END`
  })
  state: number;

  @ManyToOne(() => RegionDepth1, (regionDepth1) => regionDepth1.products)
  regionDepth1?: RegionDepth1;

  @ManyToOne(() => RegionDepth2, (regionDepth2) => regionDepth2.products)
  regionDepth2?: RegionDepth2;

  @ManyToOne(() => RegionDepth3, (regionDepth3) => regionDepth3.products)
  regionDepth3?: RegionDepth3;

  @ManyToOne(() => Company, (company) => company.products)
  company?: Company;

  @ManyToMany(() => Category)
  @JoinTable({ name: "product_category" })
  categories: Category[]

  @ManyToMany(() => Image)
  @JoinTable({ name: "product_image" })
  images: Image[]
}
