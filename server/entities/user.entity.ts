import { Entity, Column, ManyToMany } from 'typeorm';
import CommonEntity from './common';
import Survey from './survey.entity';

@Entity("user")
export default class User extends CommonEntity {
  @Column("varchar", { length: 64, unique: true })
  key: string;

  @Column("varchar", { length: 256 })
  nickname: string;

  @Column("varchar", { length: 256 })
  email: string;

  @Column("varchar", { length: 256 })
  phoneNumber: string;

  @Column("varchar", { length: 256, nullable: true, default: "" })
  name: string;

  @Column("varchar", { length: 256, nullable: true, default: "" })
  birthyear: string;

  @Column("varchar", { length: 256, nullable: true, default: "" })
  birthday: string;

  @Column("varchar", { length: 256, nullable: true, default: "" })
  gender: string;

  @ManyToMany(() => Survey, (survey) => survey.users)
  surveys: Survey[];
}
