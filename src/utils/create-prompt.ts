import { Message } from '../types'

const currentIsoDate = new Date().toISOString().split('T')[0]

const INSTRUCTIONS = `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Knowledge cutoff: 2021-09 Current date: ${currentIsoDate}\n\n`

export const createPrompt = (
  messages: Message[],
  instructions = INSTRUCTIONS
): string =>
  messages.reduce<string>((acc, cur) => {
    return acc + `[${cur.from}]\n${cur.text}\n\n`
  }, INSTRUCTIONS)
