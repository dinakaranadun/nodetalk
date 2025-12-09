import { useState } from "react";
import { MessageCircle, Shield, Zap, ArrowRight, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              NodeTalk
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition hover:cursor-pointer">Features</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition hover:cursor-pointer">About</a>
            <div className="flex items-center gap-4 ml-4">
              <button className="text-gray-900 font-medium hover:text-blue-600 transition hover:cursor-pointer">Sign In</button>
              <button className="relative px-5 py-2 rounded-full font-medium text-white overflow-hidden group hover:cursor-pointer">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-500 transition-opacity duration-500 ease-in-out"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
                <span className="relative">Get Started</span>
              </button>
            </div>
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
        <div className="md:hidden bg-white border-t border-gray-100 p-4 absolute w-full">
          <div className="flex flex-col space-y-4">
            <a href="#features" className="text-gray-600">Features</a>
            <button className="text-left text-gray-900 font-medium">Sign In</button>
            <button className="relative px-5 py-2 rounded-full font-medium text-white overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-500 transition-opacity duration-500 ease-in-out"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
                <span className="relative">Get Started</span>
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;