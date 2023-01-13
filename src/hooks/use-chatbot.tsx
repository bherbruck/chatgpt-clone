import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useEffect, useState } from 'react'
import type { Message } from '../types'
import { createPrompt } from '../utils/create-prompt'
import { Config } from './use-config'

const STOP_MESSAGE = '[DONE]'

// this is super clunky, but it works
export const useChatbot = (config: Config) => {
  const { apiKey, ...openAIConfig } = config
  const [messages, setMessages] = useState<Message[]>([])
  const [receivedMessage, setReceivedMessage] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const send = (text: string) => {
    const sentMessage: Message = { from: 'Human', text: text }
    const newMessage: Message = { from: 'ChatGPT', text: '' }
    setMessages((oldMessages) => [...oldMessages, sentMessage, newMessage])
    const prompt = createPrompt([...messages, sentMessage, newMessage])
    const abortController = new AbortController()
    fetchEventSource('https://api.openai.com/v1/completions', {
      method: 'POST',
      signal: abortController.signal,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
        accept: 'text/event-stream',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        stream: true,
        ...openAIConfig,
      }),
      onopen: async () => setIsTyping(true),
      onclose: async () => setIsTyping(false),
      onerror: () => setIsTyping(false),
      onmessage: (event) => {
        if (event.data === STOP_MESSAGE) {
          abortController.abort()
          setReceivedMessage('')
          setIsTyping(false)
          return
        }
        setIsTyping(true)
        const data = JSON.parse(event.data)
        if (!data.choices) return
        const text: string = data.choices[0].text
        setReceivedMessage((oldReceivedMessage) => oldReceivedMessage + text)
      },
    })
  }

  useEffect(() => {
    if (receivedMessage === '') return
    // change the last message to the received message
    const newMessages = [...messages]
    newMessages[newMessages.length - 1].text = receivedMessage
    setMessages(newMessages)
  }, [receivedMessage])

  return { prompt: send, messages, setMessages, isTyping }
}
