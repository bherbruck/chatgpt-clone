import { type FC, forwardRef, ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Markdown } from './markdown'

export type ChatMessageProps = ComponentProps<'div'> & {
  content: string
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ content, ...props }, ref) => {
    return (
      <div {...props}>
        <div className="m-auto w-full max-w-3xl p-4">
          <article className="prose w-full max-w-none text-left">
            <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
          </article>
        </div>
      </div>
    )
  }
)
