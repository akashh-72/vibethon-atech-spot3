import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, BrainCircuit } from 'lucide-react';
import './TutorBot.css';

const AI_KNOWLEDGE = {
  "supervised": "Supervised learning is where the model learns from labeled data—like a student learning with an answer key.",
  "unsupervised": "Unsupervised learning finds hidden patterns in unlabeled data. It's like sorting a bowl of mixed legos without instructions.",
  "neural": "Neural networks are inspired by the human brain. They use layers of nodes to process complex data like images and speech.",
  "nlp": "Natural Language Processing (NLP) helps computers understand and generate human language. It powers things like Siri and ChatGPT.",
  "regression": "Regression predicts a continuous value—like predicting a house's price based on its size.",
  "classification": "Classification predicts a category—like deciding if an email is 'Spam' or 'Not Spam'.",
  "bias": "Bias occurs when an AI model makes unfair decisions due to flawed training data. It's a key part of AI Ethics.",
  "overfitting": "Overfitting is when a model learns the training data *too* well, but fails on new, unseen data. It's like memorizing a test instead of understanding the topic."
};

export default function TutorBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your AI Tutor. Ask me anything about AI or ML!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI Logic (Rule-based for reliability)
    setTimeout(() => {
      let botResponse = "That's a great question! While I'm still learning, you can ask me about Supervised Learning, Neural Networks, NLP, or Overfitting.";

      const lowerInput = input.toLowerCase();
      for (const [key, value] of Object.entries(AI_KNOWLEDGE)) {
        if (lowerInput.includes(key)) {
          botResponse = value;
          break;
        }
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="tutor-bot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="tutor-chat-window"
          >
            <div className="tutor-header">
              <div className="tutor-header-info">
                <div className="tutor-avatar">
                  <Bot size={18} />
                  <div className="online-indicator" />
                </div>
                <div>
                  <h4>AI Tutor</h4>
                  <span>Online & Ready to Help</span>
                </div>
              </div>
              <button className="tutor-close" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="tutor-messages" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`msg-group ${m.role}`}>
                  <div className="msg-bubble">
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="msg-group bot">
                  <div className="msg-bubble typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
            </div>

            <div className="tutor-input-area">
              <input
                type="text"
                placeholder="Ask about AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} disabled={!input.trim()}>
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`tutor-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <BrainCircuit size={24} />}
        {!isOpen && (
          <div className="tutor-ping">
            <Sparkles size={12} />
          </div>
        )}
      </motion.button>
    </div>
  );
}
