// src/utils/cryptoUtils.js
import CryptoJS from "crypto-js";

export const encrypt = (text) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY; // Make sure to set this in your environment variables
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipherText) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY; // Use the same key for decryption
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
