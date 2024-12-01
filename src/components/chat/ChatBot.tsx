import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Loader2 } from 'lucide-react';
import { SearchResults } from './SearchResults';
import { useTemplateSearch } from '../../hooks/useTemplateSearch';
import { templates } from '../templates/data/templates';
import { useRandomMovement } from '../../hooks/useRandomMovement';
import { useRandomThoughts } from '../../hooks/useRandomThoughts';
import { ThinkingDots } from './ThinkingDots';
import { ChatMessage } from './ChatMessage';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE = {
  id: '0',
  type: 'bot' as const,
  content: "👋 Hi! I'm your template assistant. I can help you find the perfect template or answer questions about our templates. What are you looking to build?",
  timestamp: new Date()
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { searchResults, search } = useTemplateSearch(templates);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { position, startMovement, stopMovement } = useRandomMovement();
  const { currentThought } = useRandomThoughts();

  useEffect(() => {
    if (!isOpen) {
      startMovement();
    } else {
      stopMovement();
    }
    return () => stopMovement();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSearchResults(false);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(async () => {
      await search(input);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: 'bot' as const,
        content: `I found some great templates matching "${input}"! Here are some options that might work for you:`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setShowSearchResults(true);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {!isOpen && (
        <div 
          className="fixed transition-all duration-300 ease-out"
          style={{
            bottom: `${position.y}px`,
            right: `${position.x}px`,
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-105 animate-pulse"
            >
              <Bot className="w-6 h-6" />
            </button>
            {currentThought && (
              <div className="max-w-[200px] text-sm bg-white dark:bg-dark-200 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full shadow-sm border border-primary-100 dark:border-dark-300">
                {currentThought}
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] bg-white dark:bg-dark-200 rounded-2xl shadow-2xl border border-primary-100 dark:border-dark-300 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-[length:200%_100%] animate-gradient p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-dark-100 p-2 rounded-full animate-bounce">
                <Bot className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Template Assistant</h3>
                <p className="text-xs text-primary-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-primary-600/50 rounded-full p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && <ThinkingDots />}
            {showSearchResults && <SearchResults results={searchResults} />}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-primary-100 dark:border-dark-300">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about templates..."
                className="flex-1 px-4 py-2 rounded-full border border-primary-100 dark:border-dark-300 dark:bg-dark-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}