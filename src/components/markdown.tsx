import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type MarkdownProps = {
  content: string
}

export const Markdown: FC<MarkdownProps> = ({ content }) => (
  <article className="prose text-left">
    <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
  </article>
)
