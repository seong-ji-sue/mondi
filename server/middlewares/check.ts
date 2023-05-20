import express from "express";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../env";
import { dataSource } from "..";
import User from "../entities/user.entity";
import { isEmpty } from "lodash";

export const authCheck = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized request');
  }
  try {
    const auth = jwt.verify(token.split(' ')[1], ACCESS_JWT_SECRET) as Token.JWT;
    const { type = '', id = '' } = auth;
    const userRepository = dataSource.getRepository(User);
    // TODO: 탈퇴된 유저 처리.
    const user = await userRepository.findOne({
      where: { key: [type, id].join('_') },
      select: ["id"]
    });

    if (isEmpty(user)) {
      return res.status(401).send('Unauthorized request');
    }

    req.auth = { ...auth, user };
    next();
  } catch (err) {
    return res.status(403).send('Invalid token');
  }
}

export const refreshCheck = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized request');
  }
  try {
    const auth = jwt.verify(token.split(' ')[1], REFRESH_JWT_SECRET) as Token.JWT;
    const { type = '', id = '' } = auth;
    const userRepository = dataSource.getRepository(User);
    // TODO: 탈퇴된 유저 처리.
    const user = await userRepository.findOne({
      where: { key: [type, id].join('_') },
      select: ["id"]
    });

    if (isEmpty(user)) {
      return res.status(401).send('Unauthorized request');
    }
    req.auth = { ...auth, user };
    next();
  } catch (err) {
    return res.status(403).send('Invalid token');
  }
}