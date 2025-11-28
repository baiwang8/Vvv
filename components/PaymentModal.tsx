import React, { useState, useEffect } from 'react';
import { X, Clock, Copy, AlertTriangle, CheckCircle, Wallet } from 'lucide-react';
import { Theme, Language } from '../types';
import { TRANSLATIONS } from '../i18n';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currencyPrefix: string;
  theme: Theme;
  language: Language;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, currencyPrefix, theme, language }) => {
  const t = TRANSLATIONS[language].payment;
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [copied, setCopied] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Mock Wallet Address
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    setIsPaid(true);
    setTimeout(() => {
        setIsPaid(false);
        onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  // Theme Styles
  const isMatrix = theme === 'matrix';
  const isCrimson = theme === 'crimson';
  const isAurora = theme === 'aurora';
  const isCyberSec = theme === 'cybersec';
  const isBlockchain = theme === 'blockchain';

  const getContainerStyles = () => {
    if (isMatrix) return 'bg-black border-2 border-green-500 shadow-[0_0_50px_rgba(0,255,0,0.3)] font-mono text-green-500';
    if (isCrimson) return 'bg-[#111] border-4 border-red-900 shadow-2xl font-sans text-gray-200 clip-path-angled';
    if (isAurora) return 'bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl text-slate-800 rounded-3xl';
    if (isCyberSec) return 'bg-[#0a192f] border border-[#64ffda] shadow-[0_0_50px_rgba(100,255,218,0.2)] text-[#ccd6f6] rounded-xl font-mono';
    if (isBlockchain) return 'bg-[#1a1a1a] border-2 border-[#F7931A] shadow-[0_0_40px_rgba(247,147,26,0.2)] text-[#eaeaea] rounded-none';
    return 'bg-slate-900 border border-cyan-500/50 shadow-2xl shadow-cyan-500/20 text-white rounded-2xl';
  };

  const getHighlightColor = () => {
     if (isMatrix) return 'text-green-400';
     if (isCrimson) return 'text-red-500';
     if (isAurora) return 'text-indigo-600';
     if (isCyberSec) return 'text-[#64ffda]';
     if (isBlockchain) return 'text-[#F7931A]';
     return 'text-cyan-400';
  };

  const getButtonStyles = () => {
      if (isMatrix) return 'bg-green-700 text-black hover:bg-green-500 font-bold';
      if (isCrimson) return 'bg-red-700 text-white hover:bg-red-600 font-black uppercase rounded-none skew-x-[-10deg]';
      if (isAurora) return 'bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl shadow-lg';
      if (isCyberSec) return 'bg-[#112240] border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 rounded font-mono';
      if (isBlockchain) return 'bg-[#F7931A] text-black font-bold hover:bg-[#e68a15] rounded-sm';
      return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg rounded-xl';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className={`w-full max-w-lg relative z-10 animate-fade-in-up transition-all overflow-hidden ${getContainerStyles()}`}>
         
         {/* Decorative Header Lines */}
         {isBlockchain && (
             <div className="absolute top-0 left-0 w-full h-2 bg-[#F7931A] flex">
                 <div className="w-1/3 h-full bg-[#1a1a1a]"></div>
                 <div className="w-1/3 h-full bg-[#F7931A]"></div>
             </div>
         )}
         
         {/* Close Button */}
         <button onClick={onClose} className={`absolute top-4 right-4 hover:opacity-70 p-1 ${isCrimson ? 'bg-red-900/50' : ''}`}>
           <X className="w-5 h-5" />
         </button>

         <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
               <h2 className={`text-2xl font-bold mb-2 uppercase flex items-center justify-center`}>
                  <Wallet className={`w-6 h-6 mr-2 ${getHighlightColor()}`} />
                  {t.title}
               </h2>
               <div className={`text-4xl font-mono font-bold ${getHighlightColor()}`}>
                 {currencyPrefix}{amount}
               </div>
               <p className="text-xs opacity-60 mt-1">{t.amount} (USDT)</p>
            </div>

            {isPaid ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <CheckCircle className={`w-20 h-20 mb-4 ${isMatrix ? 'text-green-500' : 'text-green-500'}`} />
                    <p className="text-xl font-bold">Payment Verified!</p>
                    <p className="text-sm opacity-60">Redirecting...</p>
                </div>
            ) : (
                <>
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* QR Code Column */}
                        <div className="flex flex-col items-center justify-center">
                            <div className={`p-2 bg-white rounded-lg mb-2 ${isMatrix ? 'border-2 border-green-500' : ''}`}>
                                {/* Mock QR Code */}
                                <img 
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`} 
                                    alt="Payment QR" 
                                    className="w-36 h-36"
                                />
                            </div>
                            <p className="text-xs uppercase font-bold tracking-wider opacity-70">{t.scan}</p>
                        </div>

                        {/* Details Column */}
                        <div className="flex flex-col justify-center space-y-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold opacity-50 block mb-1">{t.network}</label>
                                <div className={`px-3 py-2 rounded text-sm font-bold flex items-center ${isAurora ? 'bg-slate-100 text-slate-900' : 'bg-white/5'}`}>
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                    Ethereum (ERC20)
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-[10px] uppercase font-bold opacity-50 block mb-1">{t.timeRemaining}</label>
                                <div className={`flex items-center text-lg font-mono font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : ''}`}>
                                    <Clock className="w-4 h-4 mr-2" />
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wallet Address */}
                    <div className="mb-6">
                        <label className="text-[10px] uppercase font-bold opacity-50 block mb-1">{t.address}</label>
                        <div className={`flex items-center justify-between p-3 rounded ${isAurora ? 'bg-slate-100 border border-slate-200' : 'bg-white/5 border border-white/10'}`}>
                            <code className={`text-xs truncate mr-2 ${isMatrix ? 'text-green-400' : ''}`}>{walletAddress}</code>
                            <button 
                                onClick={handleCopy}
                                className={`flex items-center text-xs font-bold px-2 py-1 rounded transition-all ${
                                    copied 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-white/10 hover:bg-white/20'
                                }`}
                            >
                                {copied ? t.copied : <><Copy className="w-3 h-3 mr-1" /> {t.copy}</>}
                            </button>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className={`flex items-start p-4 rounded mb-8 text-xs leading-relaxed ${
                        isCrimson ? 'bg-red-900/30 border border-red-800 text-red-100' :
                        isMatrix ? 'bg-green-900/20 border border-green-800 text-green-300' :
                        'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500'
                    }`}>
                        <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                        {t.warning}
                    </div>

                    {/* Action */}
                    <button 
                        onClick={handleConfirm}
                        className={`w-full py-4 text-center transition-all ${getButtonStyles()}`}
                    >
                        {t.confirm}
                    </button>
                </>
            )}
         </div>
      </div>
    </div>
  );
};

export default PaymentModal;