import CryptoJS from "crypto-js";
import { CRYPTO_SECRET } from "../env";

export const encryptAES = (message: string) => {
  return CryptoJS.AES.encrypt(message, CRYPTO_SECRET).toString();
};

export const decryptAES = (encrypted: string) => {
  return CryptoJS.AES.decrypt(encrypted, CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
};