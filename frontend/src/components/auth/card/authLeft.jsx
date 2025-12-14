const AuthLeft = ({ title }) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome!</h1>
        <p className="text-blue-100 text-lg">
          {title} to continue your journey with us
        </p>
      </div>

      <div className="relative z-10">
        <blockquote className="text-white/90 text-lg italic mb-4">
          "The world connects through conversation — NodeTalk makes it easier."
        </blockquote>
        <p className="text-blue-200 font-medium">— NodeTalk</p>
        <p className="text-blue-200 text-sm mt-6">Join 1000+ happy users</p>
      </div>
    </div>
  );
};

export default AuthLeft;