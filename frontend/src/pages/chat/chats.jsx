import React from 'react'
import Navbar from '../../components/common/navbar'
import ChatInterface from '../../components/chat/container'

const Chats = () => {
  return (
    <div className="flex overflow-auto flex-col">
      <Navbar />
      <div className="flex-1  max-h-full">
        <ChatInterface />
      </div>
    </div>
  )
}

export default Chats
