import CryptoJS from "crypto-js";
import { CRYPTO_SECRET } from "server/env";

export const encryptAES = (message: string) => {
  return CryptoJS.AES.encrypt(message, CRYPTO_SECRET).toString();
};

export const decryptAES = (encrypted: string) => {
  return CryptoJS.AES.decrypt(encrypted, CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
};

export const encryptSHA512 = (message: string) => {
  return CryptoJS.SHA512(message).toString();
}