import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageCircle, FiX, FiSend, FiUser, FiBot } = FiIcons;
const { HiOutlineSparkles } = HiIcons;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm your fashion assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Find me a dress",
    "Size guide",
    "Track my order",
    "Return policy",
    "Style recommendations",
    "Current offers"
  ];

  const botResponses = {
    "find me a dress": "I'd love to help you find the perfect dress! What occasion are you shopping for? Casual, formal, or party wear?",
    "size guide": "Our size guide varies by category. For dresses, we recommend measuring your bust, waist, and hips. Would you like specific measurements for a particular item?",
    "track my order": "To track your order, please provide your order number or email address. You can also check your order status in the 'My Orders' section of your account.",
    "return policy": "We offer a 30-day return policy for unworn items with tags. Free returns are available for orders over $50. Would you like help with a specific return?",
    "style recommendations": "I can help you create amazing outfits! What's your style preference - classic, trendy, bohemian, or minimalist?",
    "current offers": "We currently have 20% off on all dresses and free shipping on orders over $75. Plus, new customers get 15% off their first order!"
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = getBotResponse(message.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const getBotResponse = (message) => {
    // Simple keyword matching for demo
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // AI-style responses for various queries
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! Welcome to Worldofbrandsey. I'm here to help you find the perfect fashion pieces. What are you looking for today?";
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return "Our prices range from $25 for accessories to $300 for premium dresses. We often have sales and promotions. Would you like to see items in a specific price range?";
    }
    
    if (message.includes('shipping')) {
      return "We offer free standard shipping on orders over $75, which takes 3-5 business days. Express shipping (1-2 days) is available for $15. International shipping is also available!";
    }
    
    if (message.includes('material') || message.includes('fabric')) {
      return "We use high-quality materials including organic cotton, silk, leather, and sustainable fabrics. Each product page has detailed material information. What type of fabric are you interested in?";
    }

    // Default AI response
    return "That's a great question! While I'm still learning, I'd recommend browsing our collections or contacting our customer service team for detailed assistance. Is there anything specific about our products I can help you with?";
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SafeIcon icon={FiMessageCircle} className="text-2xl" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl border overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <SafeIcon icon={HiOutlineSparkles} className="text-2xl" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Fashion Assistant</h3>
                  <p className="text-xs opacity-90">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-64">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'user' 
                        ? 'bg-pink-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      <SafeIcon icon={msg.type === 'user' ? FiUser : FiBot} className="text-sm" />
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-pink-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-pink-100' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <SafeIcon icon={FiBot} className="text-sm text-gray-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t bg-gray-50">
              <div className="flex flex-wrap gap-1">
                {quickReplies.slice(0, 3).map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs px-2 py-1 bg-white border rounded-full hover:bg-pink-50 hover:border-pink-200 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <SafeIcon icon={FiSend} className="text-sm" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;