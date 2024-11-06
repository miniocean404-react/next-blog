interface Answer {
  choices: Choice[]
  created: number
  id: string
  model: string
  object: string
  usage: null
}

interface Choice {
  delta: Delta
  index: number
}

interface Delta {
  content: string
  role: string
}

interface MessageBody {
  type: "send" | "receive"
  context: string
}
