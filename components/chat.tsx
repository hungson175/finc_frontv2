'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { streamingResponse } from '@/app/actions'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (input: string) => {
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Create assistant message with empty content
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: ''
    }
    setMessages(prev => [...prev, assistantMessage])

    try {
      // Get the streaming response
      const response = await streamingResponse(input)
      const reader = response.getReader()
      const decoder = new TextDecoder()
      let streamedContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Decode the streamed content
        const chunk = decoder.decode(value, { stream: true })
        streamedContent += chunk

        // Update the assistant message with the streamed content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content: streamedContent }
              : msg
          )
        )
      }
    } catch (error) {
      console.error('Error:', error)
      // Update the assistant message with an error message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: 'An error occurred while processing your request.' }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}

