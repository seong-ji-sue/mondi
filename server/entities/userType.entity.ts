import { Entity, Column, ManyToOne } from 'typeorm';
import CommonEntity from './common';
import User from './user.entity';

@Entity("user_type")
export default class UserType extends CommonEntity {
  @Column("varchar", { length: 64, unique: true })
  key: string;

  @Column("varchar", { length: 256, nullable: true })
  nickname: string | null;

  @Column("varchar", { length: 256, nullable: true })
  email: string | null;

  @ManyToOne(() => User, (user) => user.userTypes)
  user: User;
}
