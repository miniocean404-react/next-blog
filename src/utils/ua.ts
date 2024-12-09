import { UAParser } from "ua-parser-js"

export const getDeviceType = (ua?: string) => {
  const { device } = UAParser()
  return device.type
}
