import React from 'react';
import { Code2, Github, Twitter, Linkedin, Terminal, ShieldAlert, Sparkles, ShieldCheck, Blocks, Club, TrendingUp } from 'lucide-react';
import { Theme, Language } from '../types';
import { TRANSLATIONS } from '../i18n';

interface FooterProps {
  theme?: Theme;
  language?: Language;
}

const Footer: React.FC<FooterProps> = ({ theme = 'cyberpunk', language = 'en' }) => {
  const t = TRANSLATIONS[language].footer;
  const isMatrix = theme === 'matrix';
  const isCrimson = theme === 'crimson';
  const isAurora = theme === 'aurora';
  const isCyberSec = theme === 'cybersec';
  const isBlockchain = theme === 'blockchain';
  const isCasino = theme === 'casino';
  const isStock = theme === 'stock';

  // Helper to render columns safely
  const renderColumn = (title: string, items: string[], hoverClass: string) => (
    <div>
      <h4 className={`font-bold mb-4 ${
         isMatrix ? 'text-green-500 uppercase tracking-wider text-xs border-b border-green-900/50 pb-2 w-max' :
         isCrimson ? 'text-red-500 uppercase tracking-widest text-sm' :
         isAurora ? 'text-slate-900' :
         isCyberSec ? 'text-[#ccd6f6] font-mono uppercase text-xs tracking-wider' :
         isBlockchain ? 'text-[#eaeaea] font-mono uppercase text-xs tracking-wider border-l-2 border-[#F7931A] pl-2' :
         isCasino ? 'text-[#d4af37] uppercase tracking-widest font-serif' :
         isStock ? 'text-blue-400 uppercase tracking-wide text-xs font-semibold' :
         'text-white font-semibold'
      }`}>
        {title}
      </h4>
      <ul className={`space-y-2 text-sm ${
         isMatrix ? 'text-green-800 text-xs font-mono' :
         isCrimson ? 'text-gray-400 font-medium' :
         isCyberSec ? 'font-mono text-xs text-[#8892b0]' :
         isBlockchain ? 'font-mono text-xs text-[#888]' :
         isCasino ? 'text-[#a08040] font-serif' :
         isStock ? 'text-slate-400 font-mono text-xs' :
         'text-slate-400'
      }`}>
        {items.map((item, i) => (
          <li key={i} className={`cursor-pointer transition-colors ${hoverClass}`}>
            {isMatrix && '>_ '}
            {isCyberSec && '▹ '}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const getThemeData = () => {
     if (isMatrix) return t.themes.matrix;
     if (isCrimson) return t.themes.crimson;
     if (isAurora) return t.themes.aurora;
     if (isCyberSec) return t.themes.cybersec;
     if (isBlockchain) return t.themes.blockchain;
     if (isCasino) return t.themes.casino;
     if (isStock) return t.themes.stock;
     return t.themes.default;
  };

  const data = getThemeData();

  const getFooterClass = () => {
     if (isMatrix) return 'bg-black border-t border-green-900 text-green-700 font-mono';
     if (isCrimson) return 'bg-[#0f0f0f] border-t-4 border-red-900 text-gray-500';
     if (isAurora) return 'bg-slate-50 border-t border-slate-200 text-slate-600';
     if (isCyberSec) return 'bg-[#020c1b] border-t border-[#112240] text-[#8892b0]';
     if (isBlockchain) return 'bg-[#121212] border-t border-[#333] text-[#888]';
     if (isCasino) return 'bg-[#0a0505] border-t border-[#d4af37] text-[#d4af37]';
     if (isStock) return 'bg-[#0f172a] border-t border-slate-700 text-slate-400';
     return 'bg-slate-900 border-t border-slate-800 text-slate-500';
  };

  const getIcon = () => {
    if (isMatrix) return <Terminal className="text-green-500 w-6 h-6" />;
    if (isCrimson) return <ShieldAlert className="text-red-600 w-10 h-10" />;
    if (isAurora) return <Sparkles className="w-5 h-5 text-white" />;
    if (isCyberSec) return <ShieldCheck className="text-[#64ffda] w-8 h-8" />;
    if (isBlockchain) return <Blocks className="text-[#F7931A] w-8 h-8" />;
    if (isCasino) return <Club className="text-[#d4af37] w-8 h-8" />;
    if (isStock) return <TrendingUp className="text-blue-500 w-8 h-8" />;
    return <Code2 className="text-cyan-500 w-8 h-8" />;
  };

  return (
    <footer className={`${getFooterClass()} pt-12 pb-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className={isAurora ? "bg-indigo-600 p-2 rounded-xl mr-3" : "mr-3"}>
                 {getIcon()}
              </div>
              <span className={`text-xl font-bold ${
                 isMatrix ? 'text-green-500 tracking-tighter' :
                 isCrimson ? 'text-white tracking-widest uppercase' :
                 isAurora ? 'text-slate-900' :
                 isCyberSec ? 'text-[#ccd6f6] font-mono' :
                 isBlockchain ? 'text-[#eaeaea]' :
                 isCasino ? 'text-[#d4af37] font-serif' :
                 isStock ? 'text-white' :
                 'text-white'
              }`}>
                 CodeNexus
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">{data.desc}</p>
          </div>
          
          {renderColumn(data.col1, data.col1Items, 
             isMatrix ? 'hover:text-green-400' : isCrimson ? 'hover:text-white' : isAurora ? 'hover:text-indigo-600' : isCyberSec ? 'hover:text-[#64ffda]' : isBlockchain ? 'hover:text-[#F7931A]' : isCasino ? 'hover:text-white' : isStock ? 'hover:text-blue-400' : 'hover:text-cyan-400'
          )}
          
          {renderColumn(data.col2, data.col2Items, 
             isMatrix ? 'hover:text-green-400' : isCrimson ? 'hover:text-white' : isAurora ? 'hover:text-indigo-600' : isCyberSec ? 'hover:text-[#64ffda]' : isBlockchain ? 'hover:text-[#F7931A]' : isCasino ? 'hover:text-white' : isStock ? 'hover:text-blue-400' : 'hover:text-cyan-400'
          )}
          
          <div>
            <h4 className={`font-bold mb-4 ${
                isMatrix ? 'text-green-500 uppercase tracking-wider text-xs border-b border-green-900/50 pb-2 w-max' :
                isCrimson ? 'text-red-500 uppercase tracking-widest text-sm' :
                isAurora ? 'text-slate-900' :
                isCyberSec ? 'text-[#ccd6f6] font-mono uppercase text-xs tracking-wider' :
                isBlockchain ? 'text-[#eaeaea] font-mono uppercase text-xs tracking-wider border-l-2 border-[#F7931A] pl-2' :
                isCasino ? 'text-[#d4af37] uppercase tracking-widest font-serif' :
                isStock ? 'text-blue-400 uppercase tracking-wide text-xs font-semibold' :
                'text-white font-semibold'
            }`}>
                {data.col3}
            </h4>
             <div className="flex space-x-4">
                <a href="#" className={`transition-colors ${isAurora ? 'text-slate-400 hover:text-slate-900' : 'hover:text-white'}`}><Github className="w-5 h-5"/></a>
                <a href="#" className={`transition-colors ${isAurora ? 'text-slate-400 hover:text-slate-900' : 'hover:text-white'}`}><Twitter className="w-5 h-5"/></a>
                <a href="#" className={`transition-colors ${isAurora ? 'text-slate-400 hover:text-slate-900' : 'hover:text-white'}`}><Linkedin className="w-5 h-5"/></a>
             </div>
          </div>
        </div>
        
        <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm ${
            isMatrix ? 'border-green-900' : isCrimson ? 'border-gray-800' : isAurora ? 'border-slate-200' : isCyberSec ? 'border-[#112240]' : isBlockchain ? 'border-[#333]' : isCasino ? 'border-[#d4af37]/30' : isStock ? 'border-slate-700' : 'border-slate-800'
        }`}>
          <p>{t.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:underline">{t.privacy}</span>
            <span className="cursor-pointer hover:underline">{t.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
