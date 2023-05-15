import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import CommonEntity from './common';
import Survey from './servey.entity';
import UserType from './userType.entity';

@Entity("user")
export default class User extends CommonEntity {
  @Column("varchar", { length: 256, nullable: true })
  name: string | null;

  @Column("varchar", { length: 256 })
  phoneNumberCode: string;

  @Column("varchar", { length: 256 })
  phoneNumber: string;

  @Column("varchar", { length: 256, unique: true })
  phoneNumberHash: string;

  @Column("varchar", { length: 256, nullable: true })
  birthyear: string | null;

  @Column("varchar", { length: 256, nullable: true })
  birthday: string | null;

  @Column("varchar", { length: 256, nullable: true })
  gender: string | null;

  @OneToMany(() => UserType, (userType) => userType.user)
  userTypes: UserType[];

  @ManyToMany(() => Survey, (survey) => survey.users)
  surveys: Survey[];
}
