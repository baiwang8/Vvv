import React from 'react';
import { Product, Language } from '../types';
import { ArrowLeft, Check, ShieldCheck, Download, Star } from 'lucide-react';
import { TRANSLATIONS } from '../i18n';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  language: Language;
  onBuyNow: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, language, onBuyNow }) => {
  const t = TRANSLATIONS[language].detail;
  const currencyPrefix = language === 'zh' ? '¥' : '$';
  const priceMultiplier = language === 'zh' ? 7.1 : 1;
  const finalPrice = Math.round(product.price * priceMultiplier);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
        {t.back}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-cyan-900/20 perspective-1000 group">
            <img src={product.image} alt={product.title} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="grid grid-cols-3 gap-4">
             {[1, 2, 3].map((_, i) => (
               <div key={i} className="rounded-lg overflow-hidden border border-slate-700 cursor-pointer opacity-70 hover:opacity-100 hover:border-cyan-500 transition-all transform hover:-translate-y-1">
                 <img src={`https://picsum.photos/400/300?random=${product.id}${i}`} alt="" className="w-full h-24 object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-cyan-900/50 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-cyan-500/20">
                {product.category}
              </span>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm font-bold">{product.rating}</span>
                <span className="ml-1 text-slate-500 text-sm">({product.sales} {t.sales})</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{product.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">{product.description}</p>
            
            <div className="flex items-center space-x-4 mb-8">
               <div className="flex items-center space-x-2">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.author}`} alt="Author" className="w-10 h-10 rounded-full border border-slate-600" />
                 <div>
                   <p className="text-sm text-slate-400">{t.createdBy}</p>
                   <p className="text-white font-medium hover:text-cyan-400 cursor-pointer">{product.author}</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700 mb-8 backdrop-blur-md">
             <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{t.license}</p>
                  <p className="text-3xl font-bold text-white">{currencyPrefix}{finalPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm flex items-center justify-end">
                    <Check className="w-4 h-4 mr-1" /> Available Now
                  </p>
                </div>
             </div>
             
             <div className="flex gap-4">
                <button 
                  onClick={() => onBuyNow(product)}
                  className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" /> {t.buy}
                </button>
                <button 
                   onClick={() => onAddToCart(product)}
                   className="px-4 py-4 border border-slate-600 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                >
                   + Cart
                </button>
             </div>
             <p className="text-center text-slate-500 text-xs mt-4">{t.secure}</p>
          </div>

          <div className="space-y-4">
             <h3 className="text-white font-semibold">{t.techStack}</h3>
             <div className="flex flex-wrap gap-2">
               {product.tags.map(tag => (
                 <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700 hover:border-cyan-500/50 transition-colors">
                   {tag}
                 </span>
               ))}
             </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
             <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>{t.verified}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;