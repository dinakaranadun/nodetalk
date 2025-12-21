import  { useEffect, useState } from 'react';
import { MessageCircle, Send, MoreVertical, Phone, Video, Smile, Paperclip, ArrowLeft } from 'lucide-react';
import Sidebar from './sidebar';
import { useGetDMChannelQuery, useGetMyChannelsQuery } from '../../store/chat/chatSliceApi';

const ChatInterface = () => {
  const { data: chatsData } = useGetMyChannelsQuery();
  const [channelId, setChannelId] = useState(null);
  const { data: dmMessages, isLoading, isFetching} = useGetDMChannelQuery(channelId, {
    skip: !channelId, 
    refetchOnMountOrArgChange: true, 
  });
  const [message, setMessage] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const handleBackToList = () => {
    setChannelId(null);
    setShowSidebar(true);
  };

  const handleSendMessage = () => {
    // if (message.trim() && channelId) {
      
    // }
  };

  const chats = chatsData?.data;
  const currentChat = chats?.find(chat => chat.channelId === channelId);
  const currentMessages = dmMessages?.data || [];
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        selectedChat={channelId} 
        setSelectedChat={setChannelId} 
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar} 
        chats={chats}
      />

      {/* Chat Area */}
      <div className={`${channelId ? 'flex' : 'hidden'} flex-1 flex-col w-full`}>
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <button
                onClick={handleBackToList}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold capitalize">
                  {currentChat?.friend?.profilePic ? (
                        <img
                          src={currentChat?.friend?.profilePic}
                          alt={currentChat?.friend?.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        currentChat?.friend?.userName?.charAt(0)
                      )}
                </div>
                {currentChat?.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900 truncate">{currentChat?.friend?.userName}</h2>
                <p className="text-sm text-gray-500 truncate">
                  {currentChat?.online ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50">
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Loading messages...</p>
            </div>
          ) : channelId && currentMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No messages yet. Start the conversation!</p>
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

        {/* Input */}
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
      </div>

      {/* Empty state for desktop when no chat selected */}
      {!channelId && (
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</h3>
            <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;