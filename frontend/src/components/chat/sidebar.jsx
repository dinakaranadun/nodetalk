import {  User } from 'lucide-react';
import { useState } from 'react'
import SidebarHeader from './sidebar/sidebarHeader';
import SidebarTabs from './sidebar/tabs';
import formatChatDate from '../../utils/formatDate';
import ChatList from './sidebar/chatList';
import ContactsList from './sidebar/contactList';
 

const Sidebar = ({showSidebar}) => {
  const [activeTab, setActiveTab] = useState('chats');

  // const handleChatSelect = (chatId) => {
  //   setSelectedChat(chatId);
  //   setShowSidebar(false);
  // };

  
  return (
    <div className={`${showSidebar ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 bg-white border-r border-gray-200 flex-col`}>
        {/* Sidebar Header */}
        <SidebarHeader/>

        {/* Tabs */}
        <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-5 inset-0 z-0 bg-gradient-to-br from-blue-500 to-purple-500 m-1  rounded-2xl shadow-2xl">
          {activeTab === 'chats' ? <ChatList /> : <ContactsList />}
        </div>

      </div>
  )
}

export default Sidebar
