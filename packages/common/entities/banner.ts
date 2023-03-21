import { Entity, Column } from 'typeorm';
import CommonEntity from '../utils/commonEntity';

@Entity("banner")
export default class Banner extends CommonEntity {
  @Column("varchar", { length: 256 })
  url: string;
}
