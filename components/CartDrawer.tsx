import React from 'react';
import { X, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../i18n';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  onRemove: (id: string) => void;
  language: Language;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, language }) => {
  const t = TRANSLATIONS[language].cart;
  const currencyPrefix = language === 'zh' ? '¥' : '$';
  const priceMultiplier = language === 'zh' ? 7.1 : 1;

  const total = cart.reduce((sum, item) => sum + (item.price * priceMultiplier), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900/95 border-l border-slate-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2 text-cyan-400" />
              {t.title} <span className="ml-2 text-sm font-normal text-slate-500">({cart.length})</span>
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">{t.empty}</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                >
                  {t.startShopping} &rarr;
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 animate-fade-in">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-cyan-400 font-bold">
                        {currencyPrefix}{Math.round(item.price * priceMultiplier)}
                      </span>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        title={t.remove}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-800/80 border-t border-slate-700 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400">{t.total}</span>
                <span className="text-2xl font-bold text-white tracking-tight">
                  {currencyPrefix}{Math.round(total)}
                </span>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold flex items-center justify-center shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                {t.checkout} <CreditCard className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;