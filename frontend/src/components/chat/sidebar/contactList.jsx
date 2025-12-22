import React from 'react'
import { useGetContactQuery } from '../../../store/chat/chatSliceApi'
import { MessageSquare} from 'lucide-react'
import UsersLoadingSkeleton from '../chatSkelton';
import NoChatsFound from '../noChatsFound';
import UserCard from './userCard';



const ContactList = ({ onlineUsers = [], setUser ,setSelectedChat}) => {
  const { data: contacts, isLoading: isUsersLoading, isError } = useGetContactQuery();

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="bg-white/40 backdrop-blur-md rounded-full p-6 mb-4 border-2 border-white/60 shadow-xl">
          <MessageSquare className="w-16 h-16 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-white drop-shadow-lg mb-2">
          Failed to load contacts
        </h3>
        <p className="text-white/90 drop-shadow text-sm font-medium">
          Please try again later
        </p>
      </div>
    );
  }

  const contactsData = contacts?.data || [];
  
  if (contactsData.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-3 p-1">
      {contactsData?.map((contact) => (
        <UserCard key={contact._id} data={contact} setSelectedUser={setUser} onlineUsers={onlineUsers} setSelectedChat={setSelectedChat}/>
      ))}
    </div>
  );
};

export default ContactList