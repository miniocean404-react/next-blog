export function localUTCDate(data: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "long",
    timeStyle: "long",
    timeZone: "Asia/Shanghai",
  }).format(data)
}
