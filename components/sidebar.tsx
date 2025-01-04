'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const router = useRouter()

  const handleNewChat = async () => {
    try {
      const response = await fetch('http://localhost:8000/reset_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        window.location.reload()
      } else {
        console.error('Failed to reset chat:', await response.text())
      }
    } catch (error) {
      console.error('Failed to reset chat:', error)
    }
  }

  return (
    <div className="flex h-full w-80 flex-col bg-gray-50 border-r">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-4">
          <Button
            onClick={handleNewChat}
            variant="outline"
            className="w-full justify-start"
          >
            <Plus className="mr-2 h-4 w-4" />
            New chat
          </Button>
        </div>
      </div>
    </div>
  )
}

