import { useState } from "react";
import { MessageCircle, Menu, X, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, selectIsAuthenticated, selectUser } from "../../store/auth/authSlice";
import { useSignOutMutation } from "../../store/auth/authSliceApi";
import toast from "react-hot-toast";
import MobileMenu from "../navbar/mobileMenu";
import ProfileImage from "../navbar/renderProfilePic";
import Logo from "./logo";

const Navbar = () => {
  const [signOut] = useSignOutMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await signOut().unwrap();
      dispatch(clearCredentials());
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.data?.message || "Network error");
    }
  };



  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo/>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <div className="relative">
                <div 
                  className="cursor-pointer ring-2 ring-blue-500 ring-offset-2 rounded-full"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                   <ProfileImage 
                    user={user} 
                    imageError={imageError} 
                    onImageError={() => setImageError(true)} 
                  />
                </div>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    <div className="p-3 border-b border-gray-100  bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600">
                      <div className="flex items-center gap-3">
                        <div className="ring-2 ring-blue-400 ring-offset-2 rounded-full">
                           <ProfileImage 
                              user={user} 
                              imageError={imageError} 
                              onImageError={() => setImageError(true)} 
                            />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{user?.userName}</p>
                          <p className="text-xs text-white">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <Link 
                        to="/account" 
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Account Settings</span>
                      </Link>
                      
                      <button 
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 group cursor-pointer"
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogOut();
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 ml-4">
                  <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition hover:cursor-pointer">Features</a>
                  <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition hover:cursor-pointer">About</a>
                  <Link to='/auth/signIn' className="text-gray-900 font-medium hover:text-blue-600 transition hover:cursor-pointer">Sign In</Link>
                  <Link to='/auth/signUp' className="relative px-5 py-2 rounded-full font-medium text-white overflow-hidden group hover:cursor-pointer">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-500 transition-opacity duration-500 ease-in-out"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
                    <span className="relative">Get Started</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <MobileMenu isAuthenticated={isAuthenticated} imageError={imageError} setImageError={setImageError} setIsOpen={setIsOpen} handleLogOut={handleLogOut} user={user}/>
      )}
    </nav>
  );
};

export default Navbar;