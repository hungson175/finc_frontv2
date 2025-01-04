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
          {role === 'assistant' && (
            <span className="flex h-full items-center justify-center font-semibold">AI</span>
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div className="prose prose-slate max-w-none">
            {role === 'assistant' ? (
              <ReactMarkdown 
                className="prose dark:prose-invert prose-sm"
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-4" {...props}/>,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold my-3" {...props}/>,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold my-2" {...props}/>,
                  ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props}/>,
                  li: ({node, ...props}) => <li className="my-1" {...props}/>,
                  p: ({node, ...props}) => <p className="my-2" {...props}/>
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              content
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

