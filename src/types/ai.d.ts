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
  id?: string | number
  type: "send" | "receive"
  content: string
}
