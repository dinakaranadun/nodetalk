import { LogOut, User, Menu, X, ChevronRight } from 'lucide-react';
import ProfileImage from './renderProfilePic';
import { Link } from 'react-router';
import AnimatedGradientButton from '../common/animatedButton';



const MobileMenu = ({isAuthenticated,imageError,setImageError,setIsOpen,handleLogOut,user}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="md:hidden fixed inset-x-0 top-[73px] bottom-0 bg-white/95 backdrop-blur-xl z-50 overflow-y-auto">
          <div className="p-6 space-y-4">
            {isAuthenticated ? (
              <>
                {/* User Profile Card */}
                <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="ring-4 ring-white/30 rounded-full">
                      <ProfileImage 
                        user={user} 
                        imageError={imageError} 
                        onImageError={() => setImageError(true)} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-lg">{user?.userName}</p>
                      <p className="text-blue-100 text-sm">{user?.email}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/70" />
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-3">
                  {/* Account Settings */}
                  <button 
                    className="w-full flex items-center gap-4 bg-white rounded-2xl p-5 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">Account Settings</p>
                      <p className="text-sm text-gray-500">Manage your profile</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </button>

                  {/* Sign Out Button */}
                  <button 
                    className="w-full flex items-center gap-4 bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-red-200 hover:shadow-lg transition-all group"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogOut();
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LogOut className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">Sign Out</p>
                      <p className="text-sm text-gray-500">Log out of your account</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t-2 border-purple-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Quick Actions
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Help', 'Settings', 'Support'].map((item) => (
                      <button
                        key={item}
                        className="bg-white rounded-xl p-4 border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="text-sm font-medium text-gray-700">{item}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Unauthenticated Menu */}
                <div className="space-y-3">
                  <a 
                    href="#features" 
                    className="flex items-center justify-between bg-white rounded-2xl p-5 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all"
                  >
                    <span className="font-semibold text-gray-900">Features</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>
                  
                  <Link to='/auth/signIn'
                    className="w-full flex items-center justify-between bg-white rounded-2xl p-5 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
                  >
                    <span className="font-semibold text-gray-900">Sign In</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                  
                  <AnimatedGradientButton to="/auth/signUp">
                    Get Started
                  </AnimatedGradientButton>
                </div>

                {/* Welcome Message */}
                <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-purple-100">
                  <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Welcome! 👋
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sign in to unlock all features and personalize your experience.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
    </div>
  );
};

export default MobileMenu;