import { Link, useNavigate } from 'react-router';
import { MessageCircle, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <MessageCircle className="w-24 h-24 text-indigo-900" strokeWidth={1.5} />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              !
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-indigo-900 mb-4">404</h1>
        
        {/* Message */}
        <h2 className="text-3xl font-semibold text-gray-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-200 mb-8 text-lg">
          Oops! The conversation you're looking for doesn't exist. 
          It might have been deleted or the link is broken.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/chats"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-br from-blue-500 to-purple-700 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Go to Chats
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 border-2 border-indigo-600 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center text-gray-100 hover:text-indigo-600 transition-colors duration-200 hover:cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back to previous page
        </button>
      </div>
    </div>
  );
};

export default NotFound;