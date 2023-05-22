import { UserInfoDTO } from "../../../server/dtos/user.dto";
import { dataSource } from "../../";
import User from "../../../server/entities/user.entity";
import { decryptAES } from "../../utils/crypto";
import { omit } from "lodash";

export const getUserInfo = async ({userId}: {userId: number}) => {
  const userRepository = dataSource.getRepository(User);
  const data = await userRepository.findOne({
    where: {id: userId}
  });

  if (!data) {
    return;
  }
  
  return omit(Object.entries(new UserInfoDTO(data))
    .reduce((map, [key, value]) => ({...map, [key]: decryptAES(value)}), {}), "id");
};