import { ArrowRight, MessageCircle } from "lucide-react";
import {Link} from 'react-router'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Connect Instantly with <span className=" bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">NodeTalk</span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto lg:mx-0">
              Experience seamless, real-time messaging built for speed and privacy.
              Join thousands of developers and teams chatting on the modern web.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to='/auth/signUp' className="btn btn-primary relative overflow-hidden group rounded-full px-8 py-6 text-white border-0 ">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-500 transition-opacity duration-500 ease-in-out"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
                <span className="relative flex items-center gap-2">
                    Start Chatting Free 
                    <ArrowRight className="w-5 h-5 " />
                </span>
              </Link>

              <button className="btn btn-outline rounded-full px-8 py-6">
                View GitHub
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">

            <div className="absolute top-0 right-0 -z-10 bg-blue-200 w-72 h-72 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 left-0 -z-10 bg-purple-200 w-72 h-72 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            {/* Chat Card */}
            <div className="card bg-base-100 shadow-2xl border border-gray-100 rounded-2xl p-4 transform rotate-2 hover:rotate-0 transition duration-500">

              {/* Header */}
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-4">
                <div className="avatar">
                  <div className="w-10 rounded-full bg-blue-200 text-blue-600 font-bold flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div>
                  <div className="font-bold text-gray-900">NodeTalk</div>
                  <div className="badge badge-success badge-xs">online</div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%] text-sm text-gray-700">
                    Hey! Have you tried the new NodeTalk update?
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-primary text-white rounded-2xl rounded-tr-none py-3 px-4 max-w-[80%] text-sm shadow-md">
                    Yes! The UI is incredibly smooth. 🚀
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%] text-sm text-gray-700">
                    Awesome!
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="mt-6 bg-gray-50 rounded-full h-12 flex items-center px-4 justify-between">
                <div className="w-24 h-2 bg-gray-300 rounded-full"></div>

                <button className="btn btn-primary btn-sm rounded-full min-h-0 h-8 w-8 p-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
