"use client";

import { Bot, Send, User, X } from 'lucide-react';
import { type FormEvent, useCallback, useEffect, useState } from 'react';
import { api } from '~/trpc/react';

export default function BreathingButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(messages));
  },[messages]);
  
  const getPrompt = api.llm.ask.useMutation({
    onSuccess: (res) => {
      const botMessage = { sender: 'bot', text: res.response };
      setMessages(prev => [...prev, botMessage]);
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);

    if (!inputValue.trim()) return;

    // Here you would handle the prompt submission
    getPrompt.mutate({ prompt: inputValue });
    setInputValue('');
  };

  const renderChatMessages = useCallback(() => {
    return (
      <>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-lg flex gap-2 items-start
                    ${message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
            >
              {message.sender === 'bot' && (
                <Bot size={18} className="mt-1" />
              )}
              <p>{message.text}</p>
              {message.sender === 'user' && (
                <User size={18} className="mt-1" />
              )}
            </div>
          </div>
        ))}
      </>
    )
  }, [messages])

  return (
    <div className="fixed bottom-6 right-6 flex items-center justify-center">
      {/* Chat menu - positioned to the left of the button */}
      {isMenuOpen && (
        <div className="absolute right-full bottom-8 h-96 mr-4 bg-white rounded-lg shadow-xl w-80 overflow flex flex-col transition-all duration-300">
          {/* Chat header */}
          <div className="bg-blue-500 text-white p-3 font-medium flex justify-between items-center">
            <span>Chat Assistant</span>
            <button
              onClick={toggleMenu}
              className="text-white hover:bg-blue-600 rounded-full p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat messages area */}
          <div className="flex-1 p-3 h-80 overflow-y-auto flex flex-col gap-3">
            {renderChatMessages()}
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 flex items-center justify-center transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Main breathing button with CSS animation */}
      <button
        onClick={toggleMenu}
        className={`bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg z-10 transition-all duration-300 ${!isMenuOpen ? 'animate-pulse-slow' : ''}`}
        style={{
          animation: isMenuOpen ? 'none' : 'breathing 4s ease-in-out infinite'
        }}
      >
        {isMenuOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes breathing {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: breathing 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}