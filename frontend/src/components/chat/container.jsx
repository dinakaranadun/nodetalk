import  { useState } from 'react';
import { MessageCircle, Send,  Smile, Paperclip } from 'lucide-react';
import Sidebar from './sidebar';
import { useGetDMChannelQuery } from '../../store/chat/chatSliceApi';
import ChatHeader from './chatArea/chatHeader';
import MessagesArea from './chatArea/messagesArea';
import Input from './chatArea/input';

const ChatInterface = () => {
  const [channelId, setChannelId] = useState(null);
  const [user,setUser] = useState(null);
  const { data: dmMessages, isLoading, isFetching} = useGetDMChannelQuery(channelId, {
    skip: !channelId, 
    refetchOnMountOrArgChange: true, 
  });
  const [message, setMessage] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const handleBackToList = () => {
    setChannelId(null);
    setUser(null);
    setShowSidebar(true);
  };
  const handleSendMessage = () => {
    // if (message.trim() && channelId) {
      
    // }
  };

  const currentChat = dmMessages?.data.find(chat => chat.channelId === channelId);
  const currentMessages = dmMessages?.data || [];
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden min-h-fit">
      {/* Sidebar */}
      <Sidebar 
        selectedChat={channelId} 
        setSelectedChat={setChannelId} 
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar} 
        setUser = {setUser}
        user = {user}
      />

      {/* Chat Area */}
      <div className={`${(channelId || user) ? 'flex' : 'hidden'} flex-1 flex-col w-full `}>
        {/* Chat Header */}
        <ChatHeader handleBackToList={handleBackToList} currentChat={currentChat} user={user}/>

        {/* Messages */}
        <MessagesArea isLoading={isLoading} isFetching={isFetching} currentMessages={currentMessages} channelId={channelId}/>

        {/* Input */}
        <Input message={message} setMessage={setMessage} handleSendMessage={handleSendMessage}/>
      </div>

      {/* Empty state */}
      {!(channelId || user) && (
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