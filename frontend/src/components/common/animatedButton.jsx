import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

const AnimatedGradientButton = ({
  to,
  children,
  icon = <ChevronRight className="w-5 h-5" />,
  className = "",
}) => {
  return (
    <Link
      to={to}
      className={`relative w-full rounded-2xl p-5 font-bold text-white overflow-hidden group shadow-xl block ${className}`}
    >
      {/* Animated background */}
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-size-[200%_100%] animate-[gradient_3s_ease_infinite] pointer-events-none" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon}
      </span>
    </Link>
  );
};

export default AnimatedGradientButton;
