import { MessageCircle } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
        <div className="bg-blue-600 p-1.5 rounded-lg">
            <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            NodeTalk
        </span>
    </div>
  )
}

export default Logo
