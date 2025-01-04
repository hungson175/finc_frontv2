import { MessageSquarePlus } from 'lucide-react'
import Link from 'next/link'

export function Sidebar() {
  return (
    <div className="w-80 border-r bg-gray-50 flex flex-col">
      <div className="p-4">
        <Link 
          href="/new" 
          className="flex items-center gap-3 rounded-md p-3 text-sm font-medium hover:bg-gray-100 border"
        >
          <MessageSquarePlus size={16} />
          New Chat
        </Link>
      </div>

      <div className="px-4 py-2">
        <h2 className="mb-2 text-xs font-semibold">Today</h2>
        <div className="space-y-1">
          <Link 
            href="#" 
            className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
          >
            ChatGPT Interface Design
          </Link>
          <Link 
            href="#" 
            className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
          >
            React Component Structure
          </Link>
        </div>
      </div>

      <div className="px-4 py-2">
        <h2 className="mb-2 text-xs font-semibold">Yesterday</h2>
        <div className="space-y-1">
          <Link 
            href="#" 
            className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
          >
            UI Development Tips
          </Link>
          <Link 
            href="#" 
            className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
          >
            Coding Best Practices
          </Link>
        </div>
      </div>
    </div>
  )
}

