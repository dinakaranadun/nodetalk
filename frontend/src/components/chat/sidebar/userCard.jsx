import formatChatDate from "../../../utils/formatDate";

const UserCard = ({ data, setSelectedUser, onlineUsers,setSelectedChat }) => {
  const userName = data.friend?.userName || data.userName || 'Unknown';
  const profilePic = data.friend?.profilePic || data.profilePic ;
  const userId = data.friend?._id || data._id ;
  const channelId = data.channelId || null;
  const isOnline = onlineUsers.includes(userId);
  const firstLetter = userName[0]?.toUpperCase() || '?';
  const date = data.updatedAt;

  return (
    <div
      className="group relative bg-white/25 backdrop-blur-md p-4 rounded-2xl cursor-pointer border border-white/40 hover:border-white/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-white/35 overflow-hidden"
      onClick={() => {setSelectedUser(userId),setSelectedChat(channelId)}}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-center gap-4">
        <div className="relative">
          <div className="size-14 rounded-full relative">
            {profilePic  ? (
              <img
                src={profilePic}
                alt={userName}
                className="w-full h-full rounded-full object-cover ring-4 ring-white/50 group-hover:ring-white/80 transition-all shadow-lg"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-white/50 group-hover:ring-white/80 transition-all">
                {firstLetter}
              </div>
            )}
          </div>
          {isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 size-5 bg-green-500 rounded-full border-[3px] border-white shadow-lg animate-pulse" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold truncate text-base drop-shadow-md group-hover:drop-shadow-lg transition-all">
            {userName}
          </h4>
          <p className="text-white/80 text-xs mt-0.5 font-medium drop-shadow">
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-xs text-white/80" >{formatChatDate(date)}</div>
          
        </div>
      </div>
    </div>
  );
};

export default UserCard
