export type Message = {
  id?: string
  text: string
  from: 'Human' | 'ChatGPT'
}

export type Conversation = {
  id?: string
  name?: string
  messages: Message[]
}
