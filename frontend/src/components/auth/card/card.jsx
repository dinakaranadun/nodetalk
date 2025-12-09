import { useState } from "react";
import { KeyRound, Mail } from "lucide-react";
import FormInput from "../../common/formInput";

const Card = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in with:", { email, password, rememberMe });
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden mx-auto">
        {/* Left Side - Decorative Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full translate-y-48 -translate-x-48"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg opacity-90">Sign in to continue your journey with us</p>
          </div>

          <div className="relative z-10 space-y-6">
            <blockquote className="border-l-4 border-white pl-4 italic text-lg">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."
              <footer className="text-sm mt-2 opacity-80">— Winston Churchill</footer>
            </blockquote>
          </div>

          <div className="relative z-10 flex items-center space-x-2">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-300 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-purple-300 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-indigo-300 border-2 border-white"></div>
            </div>
            <p className="text-sm">Join 10,000+ happy users</p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
            <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>

            {/* Google Sign In Button */}
            <button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-gray-700">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign in with email</span>
              </div>
            </div>

            {/* Email & Password Form */}
            <div className="space-y-4 w-full">
              <FormInput
                icon={<Mail className="text-blue-500" />}
                placeholder="Enter your email"
                type="email"
                required={true}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormInput
                icon={<KeyRound className="text-purple-500" />}
                placeholder="Enter your password"
                type="password"
                required={true}
                minLength={8}
                title="Password must be at least 8 characters"
                hint="Must be at least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" 
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm mt-6 text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline font-semibold">
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;