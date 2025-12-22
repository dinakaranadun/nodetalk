
const MessagesArea = ({isLoading,isFetching,currentMessages}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50">
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Loading messages...</p>
            </div>
          ) :  currentMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Say Hi...👋</p>
            </div>
          ) : (
            currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
  )
}

export default MessagesArea
