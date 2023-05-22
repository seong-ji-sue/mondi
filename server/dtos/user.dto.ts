import { pick } from "lodash";
import User from "../../server/entities/user.entity";

type UserInfoDTOType = Pick<User, "id" | "name" | "email" | "phoneNumber">;

export class UserInfoDTO implements UserInfoDTOType {
  constructor(user: User) {
    Object.assign(this, pick(user, ["id", "name", "email", "phoneNumber"]));
  }

  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}