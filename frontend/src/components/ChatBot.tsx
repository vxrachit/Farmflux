import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';
import { askAgriBot } from '../services/chatbotService';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function ChatBot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getTranslation(language, 'chatbotWelcome'),
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
 
    setMessages(prev => {
      const firstMsg = prev[0];
      return [
        {
          ...firstMsg,
          text: getTranslation(language, 'chatbotWelcome'),
        },
        ...prev.slice(1),
      ];
    });
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
         const response = await askAgriBot(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get chatbot response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getTranslation(language, 'chatbotError'),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Button */}
      <motion.button
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${
          isOpen ? 'bg-red-500' : 'bg-green-600'
        } text-white focus:outline-none`}
        onClick={handleToggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-20 right-0 w-80 h-96 sm:w-96 bg-white rounded-lg shadow-2xl flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-4 bg-green-600 text-white rounded-t-lg">
              <h3 className="font-medium">{getTranslation(language, 'chatbotTitle')}</h3>
              <p className="text-xs text-green-100">{getTranslation(language, 'chatbotSubtitle')}</p>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 flex ${
                    msg.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      msg.isUser
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.isUser ? (
                      <p className="text-sm">{msg.text}</p>
                    ) : (
                      <div className="markdown-content text-sm">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                    <p className="text-xs mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-3 py-2">
                    <div className="flex items-center">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span className="ml-2 text-sm">{getTranslation(language, 'thinking')}</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={getTranslation(language, 'typeMessage')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-2 rounded-r-lg hover:bg-green-700 focus:outline-none disabled:opacity-50"
                disabled={isLoading || !inputValue.trim()}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;
