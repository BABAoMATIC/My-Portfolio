import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone,
  Download,
  Github,
  Mail,
  CheckCircle
} from 'lucide-react';

interface ChatbotProps {
  isDarkMode: boolean;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'action';
  actions?: QuickAction[];
}

interface QuickAction {
  text: string;
  action: string;
  icon?: React.ReactNode;
}

const Chatbot: React.FC<ChatbotProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Nishit's AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
      type: 'text',
      actions: [
        { text: "View Projects", action: "projects", icon: <Github className="w-4 h-4" /> },
        { text: "Download Resume", action: "resume", icon: <Download className="w-4 h-4" /> },
        { text: "Contact Info", action: "contact", icon: <Mail className="w-4 h-4" /> },
        { text: "Talk to Nishit", action: "whatsapp", icon: <Phone className="w-4 h-4" /> }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (action: string) => {
    let response = '';
    let actions: QuickAction[] = [];

    switch (action) {
      case 'projects':
        response = "Here are some of Nishit's featured projects:\n\n• E-Commerce Platform (React, Node.js, MongoDB)\n• Data Analytics Dashboard (Python, React, D3.js)\n• Machine Learning Model (Python, Scikit-learn)\n• Mobile Task Manager (React Native)\n• Real-time Chat Application (Socket.io)\n• Weather Analytics Platform (Python, React)\n\nWould you like to know more about any specific project?";
        actions = [
          { text: "E-Commerce Details", action: "ecommerce" },
          { text: "Data Analytics Details", action: "analytics" },
          { text: "ML Model Details", action: "ml" },
          { text: "View All Projects", action: "all_projects" }
        ];
        break;
      case 'resume':
        response = "I can help you download Nishit's resume! His resume includes:\n\n• Full Stack Development experience\n• Data Analysis and Machine Learning skills\n• 50+ completed projects\n• 20+ Gold medals in Karate\n• Columbia University ML certification\n• Multiple technical certifications\n\nWould you like me to provide the download link?";
        actions = [
          { text: "Download Now", action: "download_resume" },
          { text: "View Certifications", action: "certifications" }
        ];
        break;
      case 'contact':
        response = "Here's how you can reach Nishit:\n\n📧 Email: nishit.bhardwaj@email.com\n📱 Phone: +1 (555) 123-4567\n📍 Location: New York, NY\n\nSocial Media:\n• LinkedIn: Professional updates and networking\n• GitHub: Code repositories and projects\n• Instagram: Personal insights and behind-the-scenes\n\nWould you like to start a conversation?";
        actions = [
          { text: "Send Email", action: "email" },
          { text: "Call Now", action: "call" },
          { text: "WhatsApp Chat", action: "whatsapp" }
        ];
        break;
      case 'whatsapp':
        response = "Great! I can connect you directly with Nishit via WhatsApp. He's usually available for:\n\n• Project discussions\n• Technical consultations\n• Collaboration opportunities\n• General inquiries\n\nWould you like me to open WhatsApp for you?";
        actions = [
          { text: "Open WhatsApp", action: "open_whatsapp" },
          { text: "Schedule a Call", action: "schedule" }
        ];
        break;
      case 'ecommerce':
        response = "The E-Commerce Platform is a full-stack solution featuring:\n\n• User authentication and authorization\n• Product catalog with search and filters\n• Shopping cart and checkout process\n• Payment integration with Stripe\n• Admin dashboard for inventory management\n• Order tracking and management\n• Responsive design for all devices\n\nTech Stack: React, Node.js, MongoDB, Express, JWT, Stripe\n\nThis project demonstrates expertise in modern web development and e-commerce solutions.";
        break;
      case 'analytics':
        response = "The Data Analytics Dashboard provides:\n\n• Real-time data processing and visualization\n• Interactive charts and graphs using D3.js\n• Custom reporting and data export\n• User management and role-based access\n• API integration for multiple data sources\n• Responsive design for desktop and mobile\n\nTech Stack: Python, React, D3.js, Pandas, Flask, PostgreSQL\n\nThis showcases advanced data visualization and business intelligence capabilities.";
        break;
      case 'ml':
        response = "The Machine Learning Model includes:\n\n• Customer behavior prediction algorithms\n• Data preprocessing and feature engineering\n• Model training and validation\n• Performance metrics and evaluation\n• API endpoints for model inference\n• Comprehensive documentation\n\nTech Stack: Python, Scikit-learn, Pandas, NumPy, Matplotlib, Jupyter\n\nThis demonstrates expertise in machine learning and predictive analytics.";
        break;
      case 'download_resume':
        response = "Perfect! I'll help you download Nishit's resume. The resume includes all his technical skills, project experience, and achievements.";
        actions = [
          { text: "Download PDF", action: "download_pdf" }
        ];
        break;
      case 'download_pdf':
        const link = document.createElement('a');
        link.href = '/assets/Nishit bhardwaj resume.pdf';
        link.download = 'Nishit_Bhardwaj_Resume.pdf';
        link.click();
        response = "✅ Resume download started! The file contains Nishit's complete professional profile, including his technical skills, project portfolio, and achievements.";
        break;
      case 'open_whatsapp':
        const message = encodeURIComponent("Hi Nishit! I'd like to discuss a potential opportunity.");
        window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
        response = "✅ WhatsApp opened! You can now chat directly with Nishit. He typically responds within a few hours during business hours.";
        break;
      case 'email':
        window.open('mailto:nishit.bhardwaj@email.com?subject=Project Inquiry', '_blank');
        response = "✅ Email client opened! You can now send Nishit a direct email about your project or inquiry.";
        break;
      case 'call':
        window.open('tel:+15551234567', '_blank');
        response = "✅ Phone dialer opened! You can now call Nishit directly to discuss your project or opportunity.";
        break;
      default:
        response = "I understand you're interested in that topic. Let me provide you with more information or connect you with Nishit directly. How else can I help you?";
        actions = [
          { text: "View Projects", action: "projects" },
          { text: "Contact Info", action: "contact" },
          { text: "Talk to Nishit", action: "whatsapp" }
        ];
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: action,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate typing
    setIsTyping(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date(),
        type: 'text',
        actions: actions.length > 0 ? actions : undefined
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that. Based on Nishit's portfolio, I can provide more specific information.",
        "I'd be happy to help you with that! Nishit has extensive experience in that area. Would you like me to connect you directly with him?",
        "Excellent inquiry! Nishit has worked on similar projects and would love to discuss this with you. Should I help you get in touch?",
        "That sounds interesting! Nishit has the expertise you're looking for. Would you like to see his relevant projects or connect directly?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
        type: 'text',
        actions: [
          { text: "View Projects", action: "projects" },
          { text: "Contact Info", action: "contact" },
          { text: "Talk to Nishit", action: "whatsapp" }
        ]
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-xl hover:shadow-neon-purple/50'
            : 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-xl hover:shadow-neon-purple/50'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-6 z-40 w-80 h-96 rounded-2xl shadow-2xl ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
            }`}
          >
            {/* Header */}
            <div className={`p-4 rounded-t-2xl border-b ${
              isDarkMode ? 'border-white/10' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Nishit's Assistant</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-64 scrollbar-hide">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser 
                          ? 'bg-neon-purple' 
                          : 'bg-gradient-to-r from-neon-purple to-neon-cyan'
                      }`}>
                        {message.isUser ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white'
                          : isDarkMode
                          ? 'bg-gray-700 text-gray-100'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.isUser && (
                            <CheckCircle className="w-3 h-3 opacity-70" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Quick Actions */}
                {messages.length > 0 && messages[messages.length - 1].actions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2"
                  >
                    {messages[messages.length - 1].actions?.map((action, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickAction(action.action)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                          isDarkMode
                            ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {action.icon && <span className="mr-1">{action.icon}</span>}
                        {action.text}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${
              isDarkMode ? 'border-white/10' : 'border-gray-200'
            }`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-3 py-2 rounded-lg text-sm border transition-colors ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-neon-purple'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-neon-purple'
                  } focus:outline-none focus:ring-2 focus:ring-neon-purple/20`}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
