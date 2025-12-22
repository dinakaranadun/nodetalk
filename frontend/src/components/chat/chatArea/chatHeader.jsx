import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react'
import { useGetUserQuery } from '../../../store/user/userSliceApi'

const ChatHeader = ({handleBackToList,user}) => {
  const {data:userInfo} = useGetUserQuery(user,{
    skip: !user, 
    refetchOnMountOrArgChange: true,
   });
   const userData = userInfo?.data;
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <button
                onClick={handleBackToList}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold capitalize">
                  {userData?.profilePic ? (
                        <img
                          src={userData?.profilePic}
                          alt={userData?.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        userData?.userName?.charAt(0)
                      )}
                </div>
                {userData?.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900 truncate capitalize">{userData?.userName}</h2>
                <p className="text-sm text-gray-500 truncate">
                  {userData?.online ? 'Active now' : 'Offline'}
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
  )
}

export default ChatHeader