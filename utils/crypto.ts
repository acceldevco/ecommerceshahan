import CryptoJS from "crypto-js";
import crypto from "crypto";
export function decrypt(params: any): any {
  const bytes = CryptoJS.AES.decrypt(params, "admin");
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decrypted;
}
export function encrypt(params: any) {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(params),
    "admin"
  ).toString();
  return encrypted;
}
export function CSRF() {
  return crypto.randomBytes(32).toString("hex");
}