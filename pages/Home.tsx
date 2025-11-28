import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, Language } from '../types';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Zap, Shield, TrendingUp, ChevronLeft, ChevronRight, Layers, Hexagon, Code } from 'lucide-react';
import { TRANSLATIONS } from '../i18n';

interface HomeProps {
  onProductClick: (product: Product) => void;
  language: Language;
}

const Home: React.FC<HomeProps> = ({ onProductClick, language }) => {
  const t = TRANSLATIONS[language];
  const [rotation, setRotation] = useState(0);
  const [activeFilter, setActiveFilter] = useState(t.products.filters[0]);
  
  // 3D Carousel Logic
  const carouselItems = MOCK_PRODUCTS.slice(0, 5);
  const itemCount = carouselItems.length;
  const theta = 360 / itemCount;
  const radius = 450; // Increased radius for better spacing

  useEffect(() => {
    // Auto-rotate slowly
    const interval = setInterval(() => {
      setRotation(prev => prev - 0.2); 
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const rotateCarousel = (dir: 'next' | 'prev') => {
    setRotation(prev => dir === 'next' ? prev - theta : prev + theta);
  };

  const currencyPrefix = language === 'zh' ? '¥' : '$';
  const priceMultiplier = language === 'zh' ? 7.1 : 1;

  return (
    <div className="pb-20 overflow-x-hidden">
      {/* 3D Hero Section */}
      <div className="relative min-h-[850px] flex flex-col justify-start pt-20 items-center overflow-hidden mb-12 perspective-2000">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#0B1121] -z-20"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-cyan-600/10 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[100px] -z-10 animate-float-delayed" />
        
        {/* Sci-Fi Grid Floor */}
        <div className="absolute bottom-0 w-[200vw] h-[1000px] -left-[50vw] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transform perspective-[1000px] rotateX(60deg) origin-top -z-15 opacity-30"></div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <Layers className="absolute top-20 left-10 text-cyan-500/10 w-24 h-24 animate-float" />
            <Hexagon className="absolute bottom-40 right-20 text-purple-500/10 w-32 h-32 animate-spin-slow" />
            <Code className="absolute top-40 right-1/4 text-blue-500/10 w-16 h-16 animate-float-delayed" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center mb-10 max-w-4xl px-4 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 py-1 px-3 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md text-cyan-400 text-sm font-medium mb-6 hover:border-cyan-500/50 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{t.hero.tag}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none drop-shadow-2xl">
            {t.hero.titlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">
              {t.hero.titleSuffix}
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all flex items-center">
              {t.hero.explore} <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-slate-800/40 text-white border border-slate-600 rounded-full font-semibold hover:bg-slate-700/50 hover:border-cyan-500/50 transition-all backdrop-blur-md">
              {t.hero.startSelling}
            </button>
          </div>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative w-full h-[500px] flex justify-center items-center mt-4 perspective-container hidden md:flex">
          <div 
            className="carousel-ring"
            style={{ 
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {carouselItems.map((product, index) => {
              const angle = theta * index;
              return (
                <div 
                  key={product.id}
                  className="carousel-item"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                  onClick={() => onProductClick(product)}
                >
                  {/* Card Front */}
                  <div className="w-[280px] h-[360px] bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] group hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 cursor-pointer flex flex-col">
                    
                    {/* Image Area */}
                    <div className="h-48 overflow-hidden relative">
                       <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                       <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded border border-white/10">
                         {product.category}
                       </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-slate-400 text-xs">{product.sales} sold</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                          {currencyPrefix}{Math.round(product.price * priceMultiplier)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reflection Effect */}
                  <div className="absolute top-[102%] left-0 w-full h-full transform scale-y-[-1] opacity-20 pointer-events-none mask-gradient-reflection blur-sm">
                     <div className="w-[280px] h-[360px] bg-slate-800 rounded-2xl overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover" alt="" />
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Floor Spotlight */}
          <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-[100%] pointer-events-none -z-10"></div>
        </div>
        
        {/* Mobile Fallback for Carousel */}
        <div className="md:hidden w-full px-4 mt-8 flex space-x-4 overflow-x-auto pb-8 snap-x">
           {carouselItems.map(product => (
             <div key={product.id} className="min-w-[280px] snap-center" onClick={() => onProductClick(product)}>
                <ProductCard product={product} onClick={onProductClick} currencyPrefix={currencyPrefix} priceMultiplier={priceMultiplier} />
             </div>
           ))}
        </div>
      </div>

      {/* Stats / Trust */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-20 -mt-10 relative z-20">
          {[
            { icon: Zap, title: t.stats.instant, desc: t.stats.instantDesc, color: 'cyan' },
            { icon: Shield, title: t.stats.verified, desc: t.stats.verifiedDesc, color: 'purple' },
            { icon: TrendingUp, title: t.stats.seo, desc: t.stats.seoDesc, color: 'green' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex items-center space-x-4 hover:bg-slate-800/80 transition-all hover:-translate-y-2 hover:shadow-2xl border-t border-white/10">
              <div className={`p-4 bg-${stat.color}-500/10 rounded-xl text-${stat.color}-400 ring-1 ring-${stat.color}-500/20`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{stat.title}</h3>
                <p className="text-slate-400 text-sm">{stat.desc}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full mr-4"></span>
            {t.products.featured}
          </h2>
          <div className="flex flex-wrap gap-2 justify-center bg-slate-800/50 p-1 rounded-full backdrop-blur-sm border border-slate-700/50">
            {t.products.filters.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/40' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick}
              currencyPrefix={currencyPrefix}
              priceMultiplier={priceMultiplier}
            />
          ))}
        </div>
      </div>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .perspective-container { perspective: 1500px; }
        .carousel-ring {
          position: relative;
          width: 300px;
          height: 400px;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .carousel-item {
          position: absolute;
          width: 280px;
          height: 360px;
          left: 10px;
          top: 20px;
          backface-visibility: visible;
          /* Use hardware acceleration */
          will-change: transform;
        }
        .mask-gradient-reflection {
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
        }
      `}</style>
    </div>
  );
};

export default Home;