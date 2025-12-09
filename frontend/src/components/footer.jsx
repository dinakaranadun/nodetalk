import { MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} NodeTalk. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-blue-600 transition">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-blue-600 transition">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;