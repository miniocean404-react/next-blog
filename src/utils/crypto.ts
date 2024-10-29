import { hashSync, compareSync } from "bcryptjs"

export function hashPassword(password: string | number, salt: number) {
  return hashSync(password.toString(), salt)
}

export function isEqualHashPassword(password: string, hash: string) {
  return compareSync(password, hash)
}
