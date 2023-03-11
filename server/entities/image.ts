import { Entity, Column } from 'typeorm';
import CommonEntity from '../utils/commonEntity';

@Entity("image")
export default class Image extends CommonEntity {
  @Column("varchar", { length: 256 })
  url: string;
}
