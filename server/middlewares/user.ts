import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import { dataSource } from "../";
import UserType from "../../server/entities/userType.entity";
import { ACCESS_JWT_SECRET } from "../../server/env";

export const parseUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next();
    }

    const {type = '', id = ''} = jwt.verify(token.split(' ')[1], ACCESS_JWT_SECRET) as any;
    const userTypeRepository = dataSource.getRepository(UserType);
    const userType = await userTypeRepository.findOne({
      where: {key: [type, id].join('_')},
      select: ["id", "user"],
      relations: ["user"]
    });

    if (isEmpty(userType) || isEmpty(userType.user)) {
      return res.status(401).send();
    }

    req.auth = {...req.auth, user: userType.user};
    next();
  } catch (err) {
    console.error(err);
    res.status(403).send();
  }
}