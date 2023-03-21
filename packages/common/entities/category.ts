import { Entity, Column } from 'typeorm';
import CommonEntity from '../utils/commonEntity';

@Entity("category")
export default class Category extends CommonEntity {
  @Column("varchar", { length: 16 })
  name: string;

  @Column("varchar", { length: 256 })
  imgUrl: string;
}
