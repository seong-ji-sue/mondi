import express from "express";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../env";

export const authCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized request');
  }
  try {
    const auth = jwt.verify(token.split(' ')[1], ACCESS_JWT_SECRET);
    req.auth = auth;
    next();
  } catch (err) {
    return res.status(403).send('Invalid token');
  }
}

export const refreshCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized request');
  }
  try {
    const auth = jwt.verify(token.split(' ')[1], REFRESH_JWT_SECRET);
    req.auth = auth;
    next();
  } catch (err) {
    return res.status(403).send('Invalid token');
  }
}