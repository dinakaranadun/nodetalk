import { User } from "lucide-react";

const ProfileImage = ({ user, imageError, onImageError, size = "w-10 h-10" }) => {
  if (imageError || !user?.profilePic) {
    return (
      <div className={`${size} rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center`}>
        <User className="w-5 h-5 text-white" />
      </div>
    );
  }
  
  return (
    <img 
      src={user.profilePic} 
      alt={user.userName}
      className={`${size} rounded-full object-cover`}
      onError={onImageError}
      referrerPolicy="no-referrer"
    />
  );
};

export default ProfileImage;