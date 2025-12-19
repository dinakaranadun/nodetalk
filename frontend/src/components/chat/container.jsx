import React from "react";
import { MessageCircle, Users } from "lucide-react";

const ChatContainer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:grid grid-cols-4 gap-4 py-4 min-h-screen">

        {/* Sidebar */}
        <div className="col-span-1 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-xl flex flex-col">

          {/* Tabs */}
          <div className="tabs tabs-bordered w-full flex p-2">
            <input
              type="radio"
              name="chat_tabs"
              className="tab flex-1 text-center font-semibold text-white"
              aria-label="Chats"
              defaultChecked
            />
            <div className="tab-content mt-2 p-2">

              {/* Chat list */}
              <div className="space-y-2 overflow-y-auto h-[calc(100vh-120px)] pr-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">User {i + 1}</p>
                      <p className="text-xs text-white/70 truncate">
                        Last message preview...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <input
              type="radio"
              name="chat_tabs"
              className="tab flex-1 text-center font-semibold text-white"
              aria-label="Groups"
            />
            <div className="tab-content mt-2 p-2">
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-white/10 flex items-center gap-3">
                  <Users size={18} />
                  <span className="text-sm">React Devs</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 flex items-center gap-3">
                  <Users size={18} />
                  <span className="text-sm">Friends</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-3 rounded-2xl bg-base-100 shadow-xl flex flex-col">

          {/* Chat Header */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20"></div>
            <div>
              <p className="font-semibold">User Name</p>
              <p className="text-xs text-gray-500">online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-base-200">
            <div className="chat chat-start">
              <div className="chat-bubble">Hello 👋</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-primary">
                Hi! How are you?
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
