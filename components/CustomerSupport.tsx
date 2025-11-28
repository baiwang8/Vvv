import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Minimize2 } from 'lucide-react';
import { Theme, Language } from '../types';
import { TRANSLATIONS } from '../i18n';

interface CustomerSupportProps {
  theme: Theme;
  language: Language;
}

const CustomerSupport: React.FC<CustomerSupportProps> = ({ theme, language }) => {
  const t = TRANSLATIONS[language].chat;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: t.welcome, isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isMatrix = theme === 'matrix';
  const isCrimson = theme === 'crimson';
  const isAurora = theme === 'aurora';

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
      const newHistory = [...prev];
      if (newHistory.length > 0 && newHistory[0].isBot) {
        newHistory[0].text = t.welcome;
      }
      return newHistory;
    });
  }, [language, t.welcome]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { text: inputValue, isBot: false }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const responses = language === 'zh' 
        ? ['好的，我正在为您查询。', '请问您需要什么类型的源码？', '您可以查看我们的热门榜单。']
        : ['I see, let me check that for you.', 'What kind of source code are you looking for?', 'You can check our trending section.'];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
    }, 1000);
  };

  const getContainerStyles = () => {
    if (isMatrix) return 'bg-black border border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)] font-mono text-green-500';
    if (isCrimson) return 'bg-[#111] border-2 border-red-800 shadow-2xl font-sans text-gray-200 rounded-none clip-path-angled';
    if (isAurora) return 'bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-indigo-500/20 text-slate-800 rounded-3xl';
    return 'bg-slate-900/90 backdrop-blur-lg border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-slate-200 rounded-xl';
  };

  const getButtonStyles = () => {
    if (isMatrix) return 'bg-black text-green-500 border border-green-500 hover:bg-green-900/30';
    if (isCrimson) return 'bg-red-700 text-white border-2 border-red-900 hover:bg-red-600 rounded-none transform rotate-45';
    if (isAurora) return 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white hover:scale-110 shadow-lg shadow-indigo-500/30 rounded-full';
    return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/50 rounded-full';
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className={`w-80 sm:w-96 h-[500px] mb-4 flex flex-col overflow-hidden transition-all animate-fade-in-up ${getContainerStyles()}`}>
          {/* Header */}
          <div className={`p-4 flex justify-between items-center ${
            isMatrix ? 'bg-green-900/20 border-b border-green-800' :
            isCrimson ? 'bg-red-900/20 border-b border-red-800' :
            isAurora ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100' :
            'bg-slate-800/50 border-b border-slate-700'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                isMatrix ? 'bg-green-500' : isCrimson ? 'bg-red-500' : isAurora ? 'bg-green-400' : 'bg-cyan-400'
              }`}></div>
              <div>
                <h3 className={`font-bold ${
                  isMatrix ? 'text-green-400' : isCrimson ? 'text-red-500 uppercase' : isAurora ? 'text-slate-900' : 'text-white'
                }`}>{t.title}</h3>
                <p className={`text-[10px] ${
                  isMatrix ? 'text-green-700' : isCrimson ? 'text-red-800' : isAurora ? 'text-slate-500' : 'text-slate-400'
                }`}>{t.subtitle}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={`p-1 hover:bg-white/10 rounded transition-colors`}>
              {isCrimson ? <Minimize2 className="w-4 h-4" /> : <X className="w-5 h-5" />}
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
            isAurora ? 'bg-white/50' : ''
          }`}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 text-sm ${
                  msg.isBot 
                    ? isMatrix 
                      ? 'bg-green-900/20 text-green-400 border border-green-800 rounded-none' 
                      : isCrimson
                        ? 'bg-red-950/30 text-red-100 border-l-2 border-red-600 rounded-none'
                        : isAurora
                          ? 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-2xl rounded-tl-none'
                          : 'bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none border border-slate-700'
                    : isMatrix
                      ? 'bg-green-500 text-black font-bold rounded-none'
                      : isCrimson
                        ? 'bg-red-800 text-white rounded-none border-r-2 border-white/20'
                        : isAurora
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 rounded-2xl rounded-tr-none'
                          : 'bg-cyan-600 text-white rounded-2xl rounded-tr-none'
                }`}>
                  {msg.isBot && isMatrix && <span className="mr-2 text-green-700">{'>'}</span>}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 ${
             isMatrix ? 'border-t border-green-800' : 
             isCrimson ? 'border-t border-red-800 bg-red-900/10' : 
             isAurora ? 'border-t border-slate-100 bg-white' :
             'border-t border-slate-700 bg-slate-800/30'
          }`}>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.placeholder}
                className={`flex-1 bg-transparent border-none outline-none text-sm ${
                  isMatrix ? 'text-green-500 placeholder-green-800' :
                  isCrimson ? 'text-red-100 placeholder-red-900' :
                  isAurora ? 'text-slate-800 placeholder-slate-400' :
                  'text-white placeholder-slate-500'
                }`}
              />
              <button onClick={handleSend} className={`${
                isMatrix ? 'text-green-500 hover:text-white' :
                isCrimson ? 'text-red-500 hover:text-white' :
                isAurora ? 'text-indigo-500 hover:text-indigo-700' :
                'text-cyan-400 hover:text-white'
              }`}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 flex items-center justify-center transition-all duration-300 shadow-2xl ${getButtonStyles()}`}
      >
        {isOpen ? (
          <X className={`w-6 h-6 ${isCrimson ? '-rotate-45' : ''}`} />
        ) : (
          <MessageCircle className={`w-6 h-6 ${isCrimson ? '-rotate-45' : ''}`} />
        )}
      </button>
    </div>
  );
};

export default CustomerSupport;