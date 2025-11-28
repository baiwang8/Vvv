import React from 'react';
import { ShoppingCart, Code2, Search, Bell, User, Globe } from 'lucide-react';
import { ViewState, Language } from '../types';
import { TRANSLATIONS } from '../i18n';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  onCartClick: () => void;
  cartCount: number;
  language: Language;
  onToggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onCartClick, cartCount, language, onToggleLanguage }) => {
  const t = TRANSLATIONS[language].nav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate(ViewState.HOME)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 transform group-hover:rotate-12">
              <Code2 className="text-white w-6 h-6" />
            </div>
            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              {t.home}
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-50 blur transition duration-500"></div>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="relative w-full bg-slate-900 text-slate-200 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4 z-10" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button 
              onClick={onToggleLanguage}
              className="flex items-center space-x-1 text-slate-300 hover:text-cyan-400 transition-colors bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 hover:border-cyan-500/50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{language === 'en' ? 'EN' : '中文'}</span>
            </button>

            <button 
              onClick={() => onNavigate(ViewState.SELLER_DASHBOARD)}
              className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t.sell}
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              <button 
                onClick={onCartClick}
                className="text-slate-400 hover:text-white transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-[10px] flex items-center justify-center text-white rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => onNavigate(ViewState.PROFILE)}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:scale-105"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;