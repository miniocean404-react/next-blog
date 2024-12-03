interface MessageBody {
  id?: string | number
  role: "user" | "assistant" | "system" | "tool"
  content?: string | nuill
}
