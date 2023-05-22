import { UserInfoDTO } from "../../../server/dtos/user.dto";
import { dataSource } from "../../";
import User from "../../../server/entities/user.entity";
import { decryptAES, encryptAES } from "../../utils/crypto";
import { omit, toPlainObject } from "lodash";
import { FindOptionsSelect } from "typeorm";

const peelUserInfo = (user: User) => omit(Object.entries(new UserInfoDTO(user))
  .reduce((map, [key, value]) => ({...map, [key]: decryptAES(value)}), {}), "id");

export const getUserInfo = async ({userId}: {userId: number}) => {
  const userRepository = dataSource.getRepository(User);
  const data = await userRepository.findOne({
    where: {id: userId}
  });

  if (!data) {
    return;
  }
  
  return peelUserInfo(data);
};

export const updateUserInfo = async ({userId, update}: {userId: number, update: Partial<UserInfoDTO>}) => {
  const userRepository = dataSource.getRepository(User);
  await userRepository.update({id: userId}, update);
  return update;
};