import { Paperclip, Send, Smile } from 'lucide-react'

const Input = ({message,setMessage,handleSendMessage}) => {
  return (
    <div className="bg-white border-t border-gray-200 p-3 sm:p-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 sm:px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
     </div>
  )
}

export default Input
