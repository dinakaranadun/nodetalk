import { MessageCircle, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Real-time Sync",
      desc: "Instant message delivery powered by Socket.io. Never miss a beat in your conversation."
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "End-to-End Secure",
      desc: "Your data is encrypted. We prioritize your privacy and security above all else."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      title: "Clean Interface",
      desc: "A distraction-free design that helps you focus on what matters: the conversation."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why choose NodeTalk?</h2>
          <p className="mt-4 text-gray-500">Fast, secure, and designed for the modern web.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;