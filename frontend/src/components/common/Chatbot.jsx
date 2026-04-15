import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { CHATBOT_RULES, INITIAL_MESSAGE, QUICK_ACTIONS, DEFAULT_RESPONSE } from '../../data/chatbotRules';
import './Chatbot.css';

/**
 * Helper to render simple markdown-like bold text **text**
 */
const renderMessage = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} style={{ color: 'var(--accent-primary)' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: INITIAL_MESSAGE, sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const findBotResponse = (text) => {
    const lowerText = text.toLowerCase();
    for (const rule of CHATBOT_RULES) {
      if (rule.keywords.some(keyword => lowerText.includes(keyword))) {
        return rule.response;
      }
    }
    return DEFAULT_RESPONSE;
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    
    // Add user message
    const userMsg = { 
      id: Date.now(), 
      text: userText, 
      sender: 'user', 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = findBotResponse(userText);
      const botMsg = { 
        id: Date.now() + 1, 
        text: response, 
        sender: 'bot', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (action) => {
    // Add user message directly
    const userMsg = { 
      id: Date.now(), 
      text: action, 
      sender: 'user', 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = findBotResponse(action);
      const botMsg = { 
        id: Date.now() + 1, 
        text: response, 
        sender: 'bot', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      {/* Trigger Button */}
      {!isOpen && (
        <button 
          className="chatbot-trigger" 
          onClick={() => setIsOpen(true)}
          aria-label="Open support chat"
        >
          <MessageSquare size={28} />
          <span className="notification-ping" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window animate-scale-in">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Sparkles size={18} />
              </div>
              <div className="chatbot-header-text">
                <h3>Nova AI</h3>
                <div className="chatbot-status">
                  <span className="status-dot" />
                  Online Assistance
                </div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message message-${msg.sender}`}>
                {renderMessage(msg.text)}
              </div>
            ))}
            
            {isTyping && (
              <div className="message message-bot typing-indicator">
                <span></span><span></span><span></span>
              </div>
            )}
            
            {/* Quick Actions (only show after bot messages if it's the latest) */}
            {!isTyping && messages[messages.length - 1].sender === 'bot' && (
              <div className="quick-actions">
                {QUICK_ACTIONS.map((action, i) => (
                  <button 
                    key={i} 
                    className="action-chip"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Ask Nova something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              type="submit" 
              className="chatbot-send"
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
