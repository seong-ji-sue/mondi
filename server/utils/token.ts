
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../env";

export const generateAccessToken = (payload: string | Buffer | object) => {
  return jwt.sign(payload, ACCESS_JWT_SECRET, { expiresIn: '1h' });
}

export const generateRefreshToken = (payload: string | Buffer | object) => {
  return jwt.sign(payload, REFRESH_JWT_SECRET, { expiresIn: '90d' });
}
