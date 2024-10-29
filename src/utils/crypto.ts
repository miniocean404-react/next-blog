import CryptoJS from "crypto-js"

export function hashPassword(password: string, salt: string) {
  const passwordSalt = password + salt
  return CryptoJS.SHA256(passwordSalt).toString()
}

export function generateSalt() {
  return CryptoJS.lib.WordArray.random(16).toString()
}
