"use server"

import { signOut } from "./core"

export const logout = async () => {
  await signOut()
}
