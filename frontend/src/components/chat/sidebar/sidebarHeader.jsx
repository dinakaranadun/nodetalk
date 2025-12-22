import { Search } from 'lucide-react'
import React from 'react'

const SidebarHeader = () => {
  return (
   <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Messages</h1>
          
          {/* Search */}
        <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
         <input
             type="text"
             placeholder="Search conversations..."
             className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
        </div>
    </div>
  )
}

export default SidebarHeader
