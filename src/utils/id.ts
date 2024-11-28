import { customAlphabet } from "nanoid"

export const genVerificationCode = (digit: number = 6) => {
  const nanoid = customAlphabet("1234567890", digit)
  return nanoid()
}
