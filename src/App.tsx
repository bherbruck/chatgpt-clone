import { useState } from 'react'
import { ChatMessage } from './components/chat-message'
import { useChatbot } from './hooks/use-chatbot'
import { useScrollBottom } from './hooks/use-scroll-bottom'
import { useConfig } from './hooks/use-config'
import { useModal } from './hooks/use-modal'
import { ConfigModal } from './components/config-modal'
import { Bars3Icon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import TextareaAutosize from 'react-textarea-autosize'

function App() {
  const [messageText, setMessageText] = useState('')
  const { config, setConfig } = useConfig()
  const { messages, prompt: sendMessage } = useChatbot(config)
  const scrollRef = useScrollBottom([messages])
  const configModal = useModal(config.apiKey.length === 0)

  const sendPrompt = (text: string) => {
    if (messageText.trim().length === 0) return
    sendMessage(text)
    setMessageText('')
  }

  return (
    <div className="absolute inset-0 flex">
      <div className="flex w-full flex-col items-center">
        <div className="navbar bg-base-300">
          <div className="navbar-start">
            <button
              className="btn-ghost btn-square btn"
              onClick={() => alert('Not implemented (yet)')}
            >
              <Bars3Icon className="h-8 w-8" />
            </button>
          </div>
          <div className="navbar-center">ChatGPT Clone</div>
          <div className="navbar-end">
            <button
              className="btn-ghost btn-square btn"
              onClick={configModal.open}
            >
              <Cog6ToothIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="w-full flex-1 overflow-y-scroll bg-base-200"
        >
          {messages.map(
            (message, index) =>
              message.text.length > 0 && (
                <ChatMessage
                  key={index}
                  content={message.text}
                  className={
                    message.from === 'Human' ? 'bg-base-200' : 'bg-base-100'
                  }
                />
              )
          )}
        </div>
        <div className="w-full">
          <div className="flex h-full flex-col p-4">
            <div className="input-group m-auto w-full max-w-3xl">
              <div className="input-bordered input h-auto w-full px-4 py-2">
                <TextareaAutosize
                  className="m-0 w-full resize-none bg-transparent align-middle focus:outline-none"
                  minRows={1}
                  maxRows={8}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendPrompt(messageText)
                    }
                  }}
                />
              </div>
              <button
                className="btn h-full"
                onClick={() => sendPrompt(messageText)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfigModal
        modal={configModal}
        config={config}
        onChange={(c) => setConfig(c)}
      />
    </div>
  )
}

export default App
