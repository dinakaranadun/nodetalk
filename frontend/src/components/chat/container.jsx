import { useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Sidebar from './sidebar';
import { useSendMessageMutation } from '../../store/chat/chatSliceApi';
import ChatHeader from './chatArea/chatHeader';
import MessagesArea from './chatArea/messagesArea';
import Input from './chatArea/input';
import toast from 'react-hot-toast';

const ChatInterface = () => {
  const [channelId, setChannelId] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null); 

  const [sendMessage] = useSendMessageMutation();

  const handleBackToList = () => {
    setChannelId(null);
    setUser(null);
    setShowSidebar(true);
  };

  const handleSendMessage = async(e) => {
    e?.preventDefault();
    
    if (!(message.trim() || fileInputRef.current?.files[0]) || !user) {
      return;
    }

    try {
      let requestData;
      if (fileInputRef.current?.files[0]) {
        const formData = new FormData();
        formData.append('content', message);
        formData.append('file', fileInputRef.current.files[0]);
        requestData = formData;
      } else {
        requestData = { content: message };
      }

      const response = await sendMessage({
        receiverId: user,
        data: requestData
      }).unwrap();
      
      if(response.success){
        console.log(`message sent to ${user}`);
        setMessage('');
        
        inputRef.current?.resetFile();
      }
    } catch (err) {
      toast.error(err?.data?.message || "Network error");
    }
  };


  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        selectedChat={channelId} 
        setSelectedChat={setChannelId} 
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar} 
        setUser={setUser}
        user={user}
      />

      {/* Chat Area */}
      <div
        className={`${
          user ? "flex" : "hidden"
        } flex-1 flex-col w-full h-full`}
      >
        {/* Chat Header */}
        <div className="sticky top-0 z-20 bg-white">
          <ChatHeader
            handleBackToList={handleBackToList}
            user={user}
            setUser={setUser}
            setChannelId={setChannelId}
          />
        </div>

        {/* Messages (ONLY THIS SCROLLS) */}
        <MessagesArea
          channelId={channelId}
        />

        {/* Input */}
        <div className="sticky bottom-0 z-20 bg-white">
          <Input
            ref={inputRef}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            fileRef={fileInputRef}
          />
        </div>
      </div>


      {/* Empty state */}
      {! user && (
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