'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const websocketRef = useRef<WebSocket | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize WebSocket connection
  useEffect(() => {
    // Create WebSocket connection
    websocketRef.current = new WebSocket('ws://localhost:8000/ws/chat')

    // Connection opened
    websocketRef.current.addEventListener('open', (event) => {
      console.log('Connected to WebSocket')
    })

    // Connection closed
    websocketRef.current.addEventListener('close', (event) => {
      console.log('Disconnected from WebSocket')
    })

    // Clean up on unmount
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close()
      }
    }
  }, [])

  const handleSubmit = async (input: string) => {
    if (!input.trim() || isLoading || !websocketRef.current) return

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
      let streamedContent = ''

      // Set up message handler for this conversation
      const messageHandler = (event: MessageEvent) => {
        const token = event.data
        
        // Check if streaming has ended
        if (token === '[END_STREAMING_asdf321]') {
          setIsLoading(false)
          // Remove the message handler after streaming is complete
          if (websocketRef.current) {
            websocketRef.current.removeEventListener('message', messageHandler)
          }
          return
        }

        // Append new token to streamed content
        streamedContent += token

        // Update the assistant message with the streamed content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content: streamedContent }
              : msg
          )
        )
      }

      // Add message handler
      websocketRef.current.addEventListener('message', messageHandler)

      // Send the user's message through WebSocket
      websocketRef.current.send(input)

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

