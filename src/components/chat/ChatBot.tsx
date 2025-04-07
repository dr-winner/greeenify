
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Leaf, 
  X, 
  Send,
  User
} from 'lucide-react';
import { useAuthContext } from '@/hooks/useAuthContext';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, userName, requireAuth } = useAuthContext();

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = {
        id: Date.now().toString(),
        text: `Hello${userName ? ' ' + userName : ''}! How can I assist you with sustainable shopping today?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [userName, messages.length]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus on input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (!isOpen && !isAuthenticated) {
      requireAuth();
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input.trim()),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello! How can I help you with your eco-friendly shopping today?';
    } else if (lowerInput.includes('produce') || lowerInput.includes('buy')) {
      return 'We offer a wide variety of fresh, organic produce. Check out our shop page to see what\'s available this season!';
    } else if (lowerInput.includes('store') || lowerInput.includes('storage')) {
      return 'Our sustainable storage solutions help keep your bulk purchases fresh while reducing plastic waste. Visit the storage page for more details!';
    } else if (lowerInput.includes('farm') || lowerInput.includes('farmer')) {
      return 'We connect consumers directly with local farmers who use sustainable farming practices. Learn more about our partner farmers on our farmers page.';
    } else if (lowerInput.includes('organic') || lowerInput.includes('eco')) {
      return 'All our products are organic and sustainably sourced. We work hard to ensure our entire supply chain minimizes environmental impact.';
    } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
      return 'For customer support, please email support@greenify.com or call us at (233) 123-456-789. We\'re always happy to help!';
    } else {
      return 'I\'m here to help with all your sustainable shopping needs! Feel free to ask about our products, farmers, or eco-friendly practices. If you need specific information, check out our FAQ page.';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble button */}
      <Button 
        onClick={toggleChat}
        className="h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 text-white"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Leaf className="h-6 w-6" />}
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-green-100 flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <Leaf className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Greenify Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-green-700 h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat messages */}
          <ScrollArea className="flex-1 p-4 h-80 bg-green-50/30">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!msg.isUser && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-1">
                      <Leaf className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isUser 
                      ? 'bg-green-600 text-white rounded-br-none' 
                      : 'bg-white border border-green-100 text-gray-800 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.isUser && (
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center ml-2 mt-1">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="bg-white border border-green-100 text-gray-800 max-w-[80%] rounded-lg p-3 rounded-bl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="border-t border-green-100 p-2 flex bg-white">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sustainable shopping..."
              className="flex-1 focus-visible:ring-green-500"
            />
            <Button 
              type="submit" 
              size="icon"
              className="ml-2 bg-green-600 hover:bg-green-700"
              disabled={input.trim() === ''}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
