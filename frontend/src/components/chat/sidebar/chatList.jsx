import React from 'react'
import { useGetMyChannelsQuery } from '../../../store/chat/chatSliceApi'
import { MessageSquare} from 'lucide-react'
import UsersLoadingSkeleton from '../chatSkelton';
import NoChatsFound from '../noChatsFound';
import UserCard from './userCard';


const ChatsList = ({ setUser ,setSelectedChat }) => {
  const { data: chats, isLoading: isUsersLoading, isError } = useGetMyChannelsQuery();

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="bg-white/40 backdrop-blur-md rounded-full p-6 mb-4 border-2 border-white/60 shadow-xl">
          <MessageSquare className="w-16 h-16 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-white drop-shadow-lg mb-2">
          Failed to load chats
        </h3>
        <p className="text-white/90 drop-shadow text-sm font-medium">
          Please try again later
        </p>
      </div>
    );
  }

  const chatData = chats?.data || [];
  
  if (chatData.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-3 p-1">
      {chatData?.map((chat) => (
        <UserCard key={chat.channelId} data={chat} setSelectedUser={setUser}  setSelectedChat={setSelectedChat}/>
      ))}
    </div>
  );
};

export default ChatsList