const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center gap-2 px-6 py-4 mx-auto max-w-7xl w-full">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            NodeTalk
          </span>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#features" className="text-gray-700 hover:text-blue-500 transition-colors duration-200 font-medium">
            Features
          </a>
          <a href="#contact" className="text-gray-700 hover:text-blue-500 transition-colors duration-200 font-medium">
            Contact
          </a>
          <button className="px-6 py-2  text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 border border-blue-200 hover:text-blue-500 hover:cursor-pointer ">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;