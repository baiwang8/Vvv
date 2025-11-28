import React, { useState } from 'react';
import { ShoppingCart, Code2, Search, Bell, User, Globe, Shield, Palette, Crosshair, Sparkles, Lock, Link, Menu, ChevronDown, Blocks, X, DollarSign, Club } from 'lucide-react';
import { ViewState, Language, Theme, User as UserType, NavItem } from '../types';
import { TRANSLATIONS } from '../i18n';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  onCartClick: () => void;
  cartCount: number;
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  user: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
  navItems?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onCartClick, 
  cartCount, 
  language, 
  onToggleLanguage,
  theme,
  onToggleTheme,
  user,
  onAuthClick,
  onLogout,
  navItems = []
}) => {
  const t = TRANSLATIONS[language].nav;
  const isMatrix = theme === 'matrix';
  const isCrimson = theme === 'crimson';
  const isAurora = theme === 'aurora';
  const isCyberSec = theme === 'cybersec';
  const isBlockchain = theme === 'blockchain';
  const isCasino = theme === 'casino';
  const isStock = theme === 'stock';
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavClasses = () => {
    if (isMatrix) return 'bg-black border-green-800 shadow-[0_0_15px_rgba(0,255,0,0.2)]';
    if (isCrimson) return 'bg-[#0f0f0f] border-red-900 shadow-md border-b-2';
    if (isAurora) return 'bg-white/70 backdrop-blur-xl border-white/20 shadow-sm border-b';
    if (isCyberSec) return 'bg-[#0a192f]/90 backdrop-blur-md border-b border-[#233554] shadow-lg';
    if (isBlockchain) return 'bg-[#121212] border-b-2 border-[#333] shadow-md';
    if (isCasino) return 'bg-[#0a3515] border-b-4 border-[#d4af37] shadow-xl'; // Dark Green Felt
    if (isStock) return 'bg-[#0f172a] border-b border-slate-600 shadow-md';
    return 'glass-panel border-white/10';
  };

  const getLogoClasses = () => {
    if (isMatrix) return 'bg-green-900/30 border border-green-500 shadow-[0_0_10px_#00ff00] rounded-lg';
    if (isCrimson) return 'bg-red-950 border border-red-600 rounded-none skew-x-[-10deg]';
    if (isAurora) return 'bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 rounded-xl';
    if (isCyberSec) return 'bg-[#112240] border border-[#64ffda] text-[#64ffda] rounded-lg shadow-[0_0_10px_rgba(100,255,218,0.2)]';
    if (isBlockchain) return 'bg-[#1a1a1a] border border-[#F7931A] text-[#F7931A] rounded-none';
    if (isCasino) return 'bg-[#2a0a0a] border-2 border-[#d4af37] text-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]';
    if (isStock) return 'bg-blue-600 text-white rounded-sm shadow-md';
    return 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20 rounded-lg';
  };

  const getLinkClasses = () => {
      if (isMatrix) return 'text-green-600 hover:text-green-400 font-mono';
      if (isCrimson) return 'text-red-600 hover:text-red-400 font-bold uppercase';
      if (isAurora) return 'text-slate-600 hover:text-indigo-600 font-medium';
      if (isCyberSec) return 'text-[#8892b0] hover:text-[#64ffda] font-mono';
      if (isBlockchain) return 'text-[#888] hover:text-[#F7931A] font-mono font-bold tracking-tight';
      if (isCasino) return 'text-[#d4af37] hover:text-white font-serif tracking-wider font-bold shadow-black drop-shadow-md';
      if (isStock) return 'text-slate-400 hover:text-white font-sans font-semibold tracking-tight';
      return 'text-slate-300 hover:text-white font-medium';
  };

  const getLabel = (label: string) => {
    const key = label.toLowerCase();
    // @ts-ignore
    return t[key] || label;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavClasses()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            
            {/* Left Section: Logo + Menu (Strictly Grouped) */}
            <div className="flex items-center gap-6 md:gap-8 mr-auto">
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 -ml-2 rounded-md transition-colors ${getLinkClasses()}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logo */}
              <div 
                className="flex items-center cursor-pointer group flex-shrink-0"
                onClick={() => onNavigate(ViewState.HOME)}
              >
                <div className={`w-10 h-10 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 ${getLogoClasses()}`}>
                  {isCrimson ? (
                    <Crosshair className="w-6 h-6 text-red-500 skew-x-[10deg]" />
                  ) : isAurora ? (
                    <Sparkles className="w-5 h-5 text-white" />
                  ) : isCyberSec ? (
                    <Shield className="w-5 h-5 text-[#64ffda]" />
                  ) : isBlockchain ? (
                    <Blocks className="w-5 h-5 text-[#F7931A]" />
                  ) : isCasino ? (
                    <Club className="w-5 h-5 text-[#d4af37]" />
                  ) : isStock ? (
                    <DollarSign className="w-6 h-6 text-white" />
                  ) : (
                    <Code2 className={`w-6 h-6 ${isMatrix ? 'text-green-400' : 'text-white'}`} />
                  )}
                </div>
                <span className={`ml-3 text-xl font-bold tracking-tight hidden sm:block ${
                  isMatrix 
                    ? 'text-green-500 font-mono tracking-widest text-shadow-green' 
                    : isCrimson
                      ? 'text-red-600 font-black uppercase tracking-wider'
                      : isAurora
                        ? 'text-slate-800 tracking-tight'
                        : isCyberSec
                          ? 'text-[#ccd6f6] font-mono tracking-tighter'
                          : isBlockchain
                            ? 'text-[#F7931A] tracking-tighter'
                            : isCasino 
                              ? 'text-[#d4af37] font-serif tracking-widest drop-shadow-md'
                              : isStock
                                ? 'text-blue-400 font-sans tracking-tight uppercase'
                      : 'bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400'
                }`}>
                  {t.home}
                </span>
              </div>

              {/* Desktop Menu - Strictly Horizontal Next to Logo */}
              <div className="hidden lg:flex items-center space-x-6">
                 <button 
                    className={`${getLinkClasses()} flex items-center transition-transform hover:translate-y-[-1px] text-sm uppercase`}
                    onClick={() => onNavigate(ViewState.HOME)}
                 >
                    {t.products}
                 </button>

                 {navItems.map(item => (
                    <button 
                       key={item.id} 
                       className={`${getLinkClasses()} flex items-center transition-transform hover:translate-y-[-1px] text-sm uppercase`}
                       onClick={() => {
                           if(item.type === 'view' && item.view) onNavigate(item.view);
                           else window.open(item.link, '_blank');
                       }}
                    >
                       {getLabel(item.label)}
                    </button>
                 ))}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              {/* Theme Toggle */}
              <button 
                onClick={onToggleTheme}
                className={`flex items-center justify-center p-2 transition-all ${
                   isMatrix
                     ? 'text-green-500 border border-green-800 hover:bg-green-900/20 hover:text-green-300 rounded-full'
                     : isCrimson
                       ? 'text-red-600 border border-red-900 hover:bg-red-900/20 hover:text-red-400 rounded-none transform skew-x-[-10deg]'
                       : isAurora
                         ? 'text-slate-500 border border-slate-200 bg-white hover:text-indigo-600 hover:border-indigo-200 rounded-full shadow-sm'
                         : isCyberSec
                           ? 'text-[#64ffda] border border-[#64ffda] hover:bg-[#64ffda]/10 rounded-lg'
                           : isBlockchain
                             ? 'text-[#F7931A] border border-[#F7931A] hover:bg-[#F7931A]/10 rounded-sm'
                             : isCasino
                               ? 'text-[#d4af37] border border-[#d4af37] hover:bg-[#d4af37]/10 rounded-full'
                               : isStock
                                 ? 'text-blue-400 border border-blue-600 hover:bg-blue-600/10 rounded-sm'
                       : 'text-slate-300 border border-slate-700 bg-slate-800/50 hover:text-purple-400 hover:border-purple-500/50 rounded-full'
                }`}
                title="Switch Theme"
              >
                <Palette className={`w-4 h-4 ${isCrimson ? 'transform skew-x-[10deg]' : ''}`} />
              </button>

              {/* Lang Toggle */}
              <button 
                onClick={onToggleLanguage}
                className={`flex items-center space-x-1 px-3 py-1.5 border transition-colors hidden sm:flex ${
                  isMatrix
                    ? 'text-green-500 border-green-800 hover:border-green-500 hover:bg-green-900/20 rounded-full'
                    : isCrimson
                      ? 'text-red-600 border-red-900 hover:bg-red-900/20 hover:border-red-600 rounded-none skew-x-[-10deg]'
                      : isAurora
                        ? 'text-slate-500 bg-white border-slate-200 hover:border-indigo-300 hover:text-indigo-600 rounded-full shadow-sm'
                        : isCyberSec
                          ? 'text-[#ccd6f6] border-[#233554] hover:text-[#64ffda] hover:border-[#64ffda] rounded-lg'
                          : isBlockchain
                            ? 'text-[#eaeaea] border-[#333] hover:text-[#F7931A] hover:border-[#F7931A] rounded-sm'
                            : isCasino
                              ? 'text-[#d4af37] border-[#d4af37] hover:text-white hover:bg-[#d4af37] rounded-full'
                              : isStock
                                ? 'text-slate-300 border-slate-600 hover:text-blue-400 hover:border-blue-400 rounded-sm'
                      : 'text-slate-300 hover:text-cyan-400 bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 rounded-full'
                }`}
              >
                <Globe className={`w-4 h-4 ${isCrimson ? 'skew-x-[10deg]' : ''}`} />
                <span className={`text-xs font-bold uppercase ${isCrimson ? 'skew-x-[10deg]' : ''}`}>{language === 'en' ? 'EN' : '中文'}</span>
              </button>

              {/* Admin Button */}
              <button 
                onClick={() => onNavigate(ViewState.ADMIN_DASHBOARD)}
                className={`flex items-center space-x-1 text-xs font-bold px-3 py-1.5 border transition-colors hidden sm:flex ${
                  isMatrix
                    ? 'text-black bg-green-600 border-green-500 hover:bg-green-500 hover:shadow-[0_0_10px_#00ff00] rounded-full'
                    : isCrimson
                       ? 'text-white bg-red-700 border-red-500 hover:bg-red-600 rounded-none skew-x-[-10deg]'
                       : isAurora
                         ? 'text-white bg-slate-900 border-slate-900 hover:bg-slate-800 rounded-full shadow-lg shadow-slate-200'
                         : isCyberSec
                           ? 'text-[#0a192f] bg-[#64ffda] border-[#64ffda] hover:opacity-90 rounded-lg font-mono'
                           : isBlockchain
                             ? 'text-black bg-[#F7931A] border-[#F7931A] hover:opacity-90 rounded-sm'
                             : isCasino
                               ? 'text-black bg-[#d4af37] border-[#d4af37] hover:opacity-90 rounded-full'
                               : isStock
                                 ? 'text-white bg-blue-600 border-blue-600 hover:bg-blue-500 rounded-sm'
                    : 'text-slate-300 hover:text-purple-400 bg-purple-500/10 border-purple-500/20 rounded-full'
                }`}
                title={t.admin}
              >
                <Shield className={`w-4 h-4 ${isCrimson ? 'skew-x-[10deg]' : ''}`} />
                <span className={isCrimson ? 'skew-x-[10deg]' : ''}>ADMIN</span>
              </button>

              {/* Cart */}
              <button 
                onClick={onCartClick}
                className={`transition-colors relative p-2 ${
                  isMatrix ? 'text-green-600 hover:text-green-400' : isCrimson ? 'text-red-600 hover:text-red-400' : isAurora ? 'text-slate-400 hover:text-indigo-500' : isCyberSec ? 'text-[#8892b0] hover:text-[#64ffda]' : isBlockchain ? 'text-[#aaa] hover:text-[#F7931A]' : isCasino ? 'text-[#d4af37] hover:text-white' : isStock ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center text-white font-bold ${
                    isMatrix ? 'bg-green-700 rounded-full' : isCrimson ? 'bg-red-600 rounded-none' : isAurora ? 'bg-indigo-600 rounded-full' : isCyberSec ? 'bg-[#112240] text-[#64ffda] border border-[#64ffda] rounded-full' : isBlockchain ? 'bg-[#F7931A] text-black rounded-sm' : isCasino ? 'bg-[#d4af37] text-black rounded-full' : isStock ? 'bg-blue-500 text-white rounded-sm' : 'bg-cyan-500 rounded-full'
                  }`}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User / Auth */}
              <div className="relative group">
                <button 
                  onClick={user ? () => onNavigate(ViewState.PROFILE) : onAuthClick}
                  className={`w-8 h-8 flex items-center justify-center shadow-lg overflow-hidden border transition-all hover:scale-105 ${
                    isMatrix 
                      ? 'bg-black border-green-500 text-green-500 rounded-full' 
                      : isCrimson
                        ? 'bg-red-950 border-red-600 text-red-500 rounded-none skew-x-[-10deg]'
                        : isAurora
                          ? 'bg-white border-slate-200 text-indigo-500 rounded-full'
                          : isCyberSec
                            ? 'bg-[#112240] border-[#64ffda] text-[#64ffda] rounded-lg'
                            : isBlockchain
                              ? 'bg-[#1a1a1a] border-[#F7931A] text-[#F7931A] rounded-sm'
                              : isCasino
                                ? 'bg-[#0f0a0a] border-[#d4af37] text-[#d4af37] rounded-full'
                                : isStock
                                  ? 'bg-[#0f172a] border-blue-500 text-blue-500 rounded-sm'
                      : 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white border-white/10 rounded-full'
                  }`}
                  title={user ? user.name : t.login}
                >
                  {user ? <User className={`w-5 h-5 ${isCrimson ? 'skew-x-[10deg]' : ''}`} /> : <Lock className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 transform origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'} ${
            isMatrix ? 'bg-black border-b border-green-800' :
            isCrimson ? 'bg-[#111] border-b border-red-900' :
            isAurora ? 'bg-white border-b border-slate-200' :
            isCyberSec ? 'bg-[#0a192f] border-b border-[#233554]' :
            isBlockchain ? 'bg-[#1a1a1a] border-b border-[#333]' :
            isCasino ? 'bg-[#0a3515] border-b border-[#d4af37]' :
            isStock ? 'bg-[#0f172a] border-b border-slate-600' :
            'bg-slate-900 border-b border-slate-800'
        }`}>
           <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              <div className="pb-4 border-b border-white/10">
                 <div className={`font-bold opacity-70 mb-2 px-2 uppercase text-xs tracking-wider ${getLinkClasses()}`}>{t.products}</div>
                 <div className="space-y-2">
                     {['All Products', 'SaaS Kits', 'Crypto', 'Mobile Apps', 'AI Tools'].map(item => (
                         <button key={item} className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 transition-colors ${getLinkClasses()}`}>
                             {item}
                         </button>
                     ))}
                 </div>
              </div>
              
              <div className="pb-4 border-b border-white/10">
                 <div className={`font-bold opacity-70 mb-2 px-2 uppercase text-xs tracking-wider ${getLinkClasses()}`}>Menu</div>
                 <div className="space-y-2">
                    {navItems.map(item => (
                        <button 
                           key={item.id}
                           onClick={() => {
                               setIsMobileMenuOpen(false);
                               if(item.type === 'view' && item.view) onNavigate(item.view);
                               else window.open(item.link, '_blank');
                           }}
                           className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 transition-colors ${getLinkClasses()}`}
                        >
                           {getLabel(item.label)}
                        </button>
                    ))}
                 </div>
              </div>

              <div className="flex gap-4 px-2">
                  <button onClick={onToggleLanguage} className={`flex-1 py-2 border rounded text-xs font-bold uppercase flex items-center justify-center gap-2 opacity-80 hover:opacity-100 border-current ${getLinkClasses()}`}>
                     <Globe className="w-4 h-4" /> {language === 'en' ? 'EN' : '中文'}
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); onNavigate(ViewState.ADMIN_DASHBOARD); }} className={`flex-1 py-2 border rounded text-xs font-bold uppercase flex items-center justify-center gap-2 opacity-80 hover:opacity-100 border-current ${getLinkClasses()}`}>
                     <Shield className="w-4 h-4" /> Admin
                  </button>
               </div>
            </div>
         </div>
      </nav>
    </>
  );
};

export default Navbar;