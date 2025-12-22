import { MessageCircle, Sparkles } from "lucide-react";

const NoChatsFound = () => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
    <div className="relative">
      <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl opacity-60 animate-pulse" />
      <div className="relative bg-white/40 backdrop-blur-md rounded-full p-8 mb-6 border-2 border-white/60 shadow-xl">
        <MessageCircle className="w-16 h-16 text-purple-700" />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-white drop-shadow-lg mb-3">
      No conversations yet
    </h3>
    <p className="text-white/90 drop-shadow mb-8 max-w-sm text-sm font-medium">
      Your inbox is empty. Start connecting with friends and begin your first conversation
    </p>
    <button className="group relative px-8 py-3 bg-white/90 backdrop-blur-sm rounded-xl font-semibold text-purple-700 overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:bg-white shadow-lg">
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        Start Chatting
      </span>
    </button>
  </div>
);
export default NoChatsFound