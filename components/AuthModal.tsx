import React, { useState } from 'react';
import { X, Mail, Lock, User, Shield, ArrowRight } from 'lucide-react';
import { Theme, Language } from '../types';
import { TRANSLATIONS } from '../i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
  theme: Theme;
  language: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, theme, language }) => {
  const t = TRANSLATIONS[language].auth;
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth delay
    setTimeout(() => {
        onLogin(email);
        onClose();
    }, 1000);
  };

  // Theme Configs
  const isMatrix = theme === 'matrix';
  const isCrimson = theme === 'crimson';
  const isAurora = theme === 'aurora';
  const isCyberSec = theme === 'cybersec';

  const getContainerStyles = () => {
    if (isMatrix) return 'bg-black border border-green-500 shadow-[0_0_50px_rgba(0,255,0,0.2)] font-mono text-green-500';
    if (isCrimson) return 'bg-[#111] border-2 border-red-800 shadow-2xl font-sans text-gray-200 clip-path-angled';
    if (isAurora) return 'bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl text-slate-800 rounded-3xl';
    if (isCyberSec) return 'bg-[#020c1b] border border-cyan-500/30 shadow-[0_0_40px_rgba(2,12,27,0.7)] text-blue-100 rounded-xl relative overflow-hidden';
    return 'bg-slate-900 border border-slate-700 shadow-2xl text-white rounded-2xl';
  };

  const getInputStyles = () => {
    if (isMatrix) return 'bg-black border border-green-800 text-green-500 placeholder-green-900 focus:border-green-400 focus:shadow-[0_0_10px_#00ff00]';
    if (isCrimson) return 'bg-[#000] border border-red-900 text-red-100 placeholder-red-900 focus:border-red-500 rounded-none';
    if (isAurora) return 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 rounded-xl';
    if (isCyberSec) return 'bg-[#112240] border border-[#233554] text-slate-200 focus:border-[#64ffda] rounded-lg';
    return 'bg-slate-800 border border-slate-600 text-white focus:border-cyan-500 rounded-lg';
  };

  const getButtonStyles = () => {
    if (isMatrix) return 'bg-green-900/20 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black';
    if (isCrimson) return 'bg-red-700 text-white border border-red-500 hover:bg-red-600 rounded-none skew-x-[-10deg]';
    if (isAurora) return 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-xl';
    if (isCyberSec) return 'bg-transparent border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 rounded-lg font-mono';
    return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg rounded-lg';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`w-full max-w-md p-8 relative z-10 animate-fade-in-up transition-all ${getContainerStyles()}`}>
        {isCyberSec && (
           <>
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#64ffda] to-transparent opacity-50"></div>
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#64ffda] rounded-full blur-[80px] opacity-10 pointer-events-none"></div>
           </>
        )}

        <button onClick={onClose} className="absolute top-4 right-4 hover:opacity-70">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8 text-center">
           <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${
              isMatrix ? 'border border-green-500 text-green-500' :
              isCrimson ? 'bg-red-900/20 text-red-600' :
              isAurora ? 'bg-indigo-100 text-indigo-600' :
              isCyberSec ? 'border border-[#64ffda] text-[#64ffda] bg-[#64ffda]/10' :
              'bg-cyan-500/10 text-cyan-400'
           }`}>
              <Shield className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-bold mb-2">
             {isLogin ? t.loginTitle : t.registerTitle}
           </h2>
           <p className="opacity-60 text-sm">SECURE_CONNECTION_ESTABLISHED</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
           <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">{t.email}</label>
              <div className="relative">
                 <Mail className="absolute left-3 top-3 w-5 h-5 opacity-40" />
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className={`w-full pl-10 pr-4 py-3 outline-none transition-all ${getInputStyles()}`}
                   placeholder="user@nexus.com"
                   required
                 />
              </div>
           </div>

           <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">{t.password}</label>
              <div className="relative">
                 <Lock className="absolute left-3 top-3 w-5 h-5 opacity-40" />
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className={`w-full pl-10 pr-4 py-3 outline-none transition-all ${getInputStyles()}`}
                   placeholder="••••••••"
                   required
                 />
              </div>
           </div>

           {!isLogin && (
             <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">{t.confirmPassword}</label>
                <div className="relative">
                   <Lock className="absolute left-3 top-3 w-5 h-5 opacity-40" />
                   <input 
                     type="password" 
                     className={`w-full pl-10 pr-4 py-3 outline-none transition-all ${getInputStyles()}`}
                     placeholder="••••••••"
                     required
                   />
                </div>
             </div>
           )}

           <button 
             type="submit" 
             className={`w-full py-3 font-bold uppercase tracking-widest transition-all mt-6 flex items-center justify-center group ${getButtonStyles()}`}
           >
             <span>{isLogin ? t.submitLogin : t.submitRegister}</span>
             <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
           </button>
        </form>

        <div className="mt-6 text-center">
           <button 
             onClick={() => setIsLogin(!isLogin)}
             className={`text-xs hover:underline ${
                isMatrix ? 'text-green-700 hover:text-green-500' :
                isCyberSec ? 'text-[#64ffda] opacity-70 hover:opacity-100' :
                'opacity-60 hover:opacity-100'
             }`}
           >
             {isLogin ? t.switchRegister : t.switchLogin}
           </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;