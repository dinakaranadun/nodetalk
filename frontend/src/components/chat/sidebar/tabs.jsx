import { MessageCircle, User } from "lucide-react";

const SidebarTabs = ({ activeTab, setActiveTab }) => {
  const baseTab =
    "tab flex-1 flex items-center justify-center gap-1 rounded-xl transition-all duration-300 font-medium";

  return (
    <div className="tabs p-2 gap-2 bg-gray-100 backdrop-blur-md w-full flex rounded-2xl">
      
      {/* Chats */}
      <button
        onClick={() => setActiveTab("chats")}
        className={`${baseTab} ${
          activeTab === "chats"
            ? "bg-linear-to-r from-blue-600 to-purple-700 text-white shadow-lg scale-[1.03]"
            : "bg-gray-200 text-gray-700 hover:bg-white/80"
        }`}
      >
        Chats <MessageCircle size={18} />
      </button>

      {/* Contacts */}
      <button
        onClick={() => setActiveTab("contacts")}
        className={`${baseTab} ${
          activeTab === "contacts"
            ? "bg-linear-to-r from-purple-700 to-blue-600 text-white shadow-lg scale-[1.03]"
            : "bg-gray-200 text-gray-700 hover:bg-white/80"
        }`}
      >
        Contacts <User size={18} />
      </button>

    </div>
  );
};

export default SidebarTabs;
