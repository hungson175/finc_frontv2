'use client'

import { PaperclipIcon, SendHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useRef, useEffect } from 'react'

interface ChatInputProps {
  onSubmit: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!textareaRef.current?.value.trim() || isLoading) return
    onSubmit(textareaRef.current.value)
    textareaRef.current.value = ''
    textareaRef.current.style.height = 'auto'
  }

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="mx-auto max-w-4xl relative flex items-center">
        <Textarea
          ref={textareaRef}
          placeholder="Message ChatGPT..."
          className="min-h-[44px] w-full resize-none bg-transparent px-4 py-[10px] focus-visible:ring-0 focus-visible:ring-offset-0"
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            e.target.style.height = 'auto'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
        />
        <div className="absolute right-0 flex items-center gap-2 pr-4">
          <Button type="button" variant="ghost" size="icon" disabled={isLoading}>
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button type="submit" size="icon" disabled={isLoading}>
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  )
}

