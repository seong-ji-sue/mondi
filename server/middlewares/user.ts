import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import { dataSource } from "../";
import { ACCESS_JWT_SECRET } from "../../server/env";
import User from "../entities/user.entity";

export const parseUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next();
    }

    const {type = '', id = ''} = jwt.verify(token.split(' ')[1], ACCESS_JWT_SECRET) as Token.JWT;
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {key: [type, id].join('_')},
      select: ["id"]
    });

    if (isEmpty(user)) {
      return res.status(401).send();
    }

    req.auth = {...req.auth, user};
    next();
  } catch (err) {
    console.error(err);
    res.status(403).send();
  }
}