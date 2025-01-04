import { Copy, ThumbsDown, ThumbsUp, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={`py-8 ${role === 'user' ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-6 flex gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0">
          {role === 'assistant' && <span className="flex h-full items-center justify-center font-semibold">AI</span>}
        </div>
        <div className="flex-1 space-y-4">
          <div className="prose prose-slate max-w-none">
            {role === 'assistant' ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              content
            )}
          </div>
          {role === 'assistant' && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full w-7 h-7">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full w-7 h-7">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full w-7 h-7">
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full w-7 h-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

