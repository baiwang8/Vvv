import React, { useState, useEffect, useRef } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, Language, Theme } from '../types';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Zap, Shield, TrendingUp, Layers, Hexagon, Code, Terminal, Crosshair, AlertTriangle, Target, Sparkles, ShieldCheck, Lock, Activity, ArrowUpRight, Blocks, Database, Cpu, DollarSign, BarChart2, Club, Heart, Diamond } from 'lucide-react';
import { TRANSLATIONS } from '../i18n';

interface HomeProps {
  onProductClick: (product: Product) => void;
  language: Language;
  theme: Theme;
}

const Home: React.FC<HomeProps> = ({ onProductClick, language, theme }) => {
  const t = TRANSLATIONS[language];
  const [rotation, setRotation] = useState(0);
  const [activeFilter, setActiveFilter] = useState(t.products.filters[0]);
  const [visibleCount, setVisibleCount] = useState(12);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const isMatrix = theme === 'matrix';
  const isCrimson = theme === 'crimson';
  const isAurora = theme === 'aurora';
  const isCyberSec = theme === 'cybersec';
  const isBlockchain = theme === 'blockchain';
  const isCasino = theme === 'casino';
  const isStock = theme === 'stock';

  // Filter Products
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
      if (activeFilter === t.products.filters[0]) return true;
      return p.category === activeFilter || p.tags.includes(activeFilter);
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Matrix Rain Effect
  useEffect(() => {
    if (!isMatrix || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = Math.floor(Math.random() * canvas.height);
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { clearInterval(interval); window.removeEventListener('resize', handleResize); };
  }, [isMatrix]);

  // 3D Carousel Logic
  const carouselItems = MOCK_PRODUCTS.slice(0, 5);
  const itemCount = carouselItems.length;
  const theta = 360 / itemCount;
  const radius = 450; 

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev - 0.2); 
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const currencyPrefix = language === 'zh' ? '¥' : '$';
  const priceMultiplier = language === 'zh' ? 7.1 : 1;

  // --- CASINO THEME RENDER ---
  if (isCasino) {
      const chips = Array(15).fill(0).map((_, i) => ({
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 5 + Math.random() * 5,
          color: i % 3 === 0 ? 'bg-red-600' : i % 3 === 1 ? 'bg-black' : 'bg-blue-600'
      }));

      return (
         <div className="pb-20 overflow-x-hidden bg-[#0a0505] min-h-screen text-[#d4af37] font-serif">
            <div className="fixed inset-0 bg-[#0a3515] opacity-100 -z-50" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/black-felt.png')"}}></div>
            <div className="relative min-h-[800px] flex flex-col justify-center items-center overflow-hidden mb-12 border-b-4 border-[#d4af37]">
               {chips.map((chip, i) => (
                   <div 
                      key={i}
                      className={`absolute w-12 h-12 rounded-full border-4 border-dashed border-white shadow-xl ${chip.color} animate-fall z-0 opacity-60`}
                      style={{
                          left: `${chip.left}%`,
                          animationDelay: `${chip.delay}s`,
                          animationDuration: `${chip.duration}s`
                      }}
                   >
                       <div className="absolute inset-2 border border-white rounded-full"></div>
                   </div>
               ))}
               <div className="text-center z-10 animate-fade-in-up bg-black/40 p-10 rounded-3xl border-2 border-[#d4af37] backdrop-blur-sm">
                  <div className="mb-4 flex justify-center space-x-2">
                     <Club className="w-8 h-8 text-[#d4af37] animate-bounce" />
                     <Diamond className="w-8 h-8 text-red-500 animate-bounce delay-100" />
                     <Heart className="w-8 h-8 text-red-500 animate-bounce delay-200" />
                  </div>
                  <div className="overflow-hidden h-24 mb-2">
                      <h1 className="text-6xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#b45309] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-slot-spin">
                         {t.hero.casinoTitle}
                      </h1>
                  </div>
                  <p className="text-2xl text-[#fcd34d] italic mb-10 max-w-2xl mx-auto font-serif text-shadow-glow">
                     {t.hero.casinoSubtitle}
                  </p>
                  <div className="flex justify-center gap-6">
                     <button className="px-10 py-4 bg-gradient-to-b from-[#d4af37] to-[#b45309] text-black font-bold uppercase tracking-widest rounded-full shadow-[0_0_30px_#d4af37] hover:scale-105 transition-transform border-4 border-[#5a0505]">
                        Start Playing
                     </button>
                  </div>
               </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold uppercase tracking-[0.2em] mb-4 text-[#d4af37] border-b-2 border-[#d4af37] inline-block pb-2">High Roller Suite</h2>
                  <div className="flex justify-center gap-4 mt-6">
                      {t.products.filters.map(cat => (
                          <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-6 py-2 rounded-full border border-[#d4af37] ${activeFilter === cat ? 'bg-[#d4af37] text-black' : 'text-[#d4af37] hover:bg-[#d4af37]/20'} transition-colors uppercase tracking-widest text-xs font-bold`}>
                              {cat}
                          </button>
                      ))}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {visibleProducts.map(product => (
                     <ProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={onProductClick}
                        currencyPrefix={currencyPrefix}
                        priceMultiplier={priceMultiplier}
                        theme={theme}
                     />
                  ))}
               </div>
               {visibleCount < filteredProducts.length && (
                  <div className="flex justify-center mt-12">
                      <button onClick={handleLoadMore} className="px-8 py-3 bg-[#1a0505] border border-[#d4af37] text-[#d4af37] font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all">
                          Deal More Cards
                      </button>
                  </div>
               )}
            </div>
         </div>
      );
  }

  // --- STOCK THEME RENDER ---
  if (isStock) {
      return (
         <div className="pb-20 overflow-x-hidden bg-[#0f172a] min-h-screen text-slate-200 font-sans">
            <div className="relative min-h-[600px] flex flex-col justify-center items-center overflow-hidden mb-12 border-b border-slate-700 bg-[#020617]">
               <div className="absolute inset-0 opacity-20 overflow-hidden">
                   <div className="absolute top-0 left-0 w-[200%] h-full flex animate-scroll-chart">
                       <div className="w-[50%] h-full border-r border-slate-600" style={{backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                          <svg className="w-full h-full" preserveAspectRatio="none">
                             <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points="0,400 100,350 200,380 300,300 400,320 500,250 600,280 700,200 800,220 900,150 1000,100 1100,120 1200,50 1300,80 1400,20 1500,50 1600,0" />
                          </svg>
                       </div>
                       <div className="w-[50%] h-full border-r border-slate-600" style={{backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                          <svg className="w-full h-full" preserveAspectRatio="none">
                             <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points="0,400 100,350 200,380 300,300 400,320 500,250 600,280 700,200 800,220 900,150 1000,100 1100,120 1200,50 1300,80 1400,20 1500,50 1600,0" />
                          </svg>
                       </div>
                   </div>
               </div>
               <div className="text-center z-10 animate-fade-in-up px-4 bg-[#0f172a]/80 p-10 rounded border border-slate-700 backdrop-blur-sm">
                  <div className="inline-block bg-blue-900/30 text-blue-400 px-4 py-1 rounded-sm text-xs font-bold mb-6 border border-blue-500/30">
                     MARKET STATUS: OPEN
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                     {t.hero.stockTitle}
                  </h1>
                  <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                     {t.hero.stockSubtitle}
                  </p>
                  <div className="flex justify-center gap-4">
                     <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-sm shadow-lg transition-colors">
                        Start Trading
                     </button>
                     <button className="px-8 py-3 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white font-bold rounded-sm transition-colors">
                        View Analytics
                     </button>
                  </div>
               </div>
               <div className="absolute bottom-0 w-full bg-[#1e293b] border-t border-slate-700 py-2 overflow-hidden flex whitespace-nowrap z-20">
                   <div className="animate-marquee flex gap-12 px-4 font-mono text-sm font-bold items-center">
                       {['REACT +2.4%', 'NODE -0.5%', 'VUE +1.2%', 'PYTHON +3.5%', 'JAVA -0.2%', 'GO +0.8%', 'RUST +4.2%', 'PHP -1.1%'].map((tick, i) => (
                           <div key={i} className="flex items-center space-x-2">
                               <span className="text-slate-400">{tick.split(' ')[0]}</span>
                               <span className={tick.includes('+') ? 'text-green-500' : 'text-red-500'}>
                                   {tick.split(' ')[1]}
                               </span>
                           </div>
                       ))}
                       {['REACT +2.4%', 'NODE -0.5%', 'VUE +1.2%', 'PYTHON +3.5%', 'JAVA -0.2%', 'GO +0.8%', 'RUST +4.2%', 'PHP -1.1%'].map((tick, i) => (
                           <div key={`dup-${i}`} className="flex items-center space-x-2">
                               <span className="text-slate-400">{tick.split(' ')[0]}</span>
                               <span className={tick.includes('+') ? 'text-green-500' : 'text-red-500'}>
                                   {tick.split(' ')[1]}
                               </span>
                           </div>
                       ))}
                   </div>
               </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                     <BarChart2 className="w-6 h-6 mr-2 text-blue-500" /> Market Assets
                  </h2>
                  <div className="flex gap-2">
                      {t.products.filters.map(cat => (
                          <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-4 py-1 text-sm font-bold rounded-sm transition-colors ${activeFilter === cat ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                              {cat}
                          </button>
                      ))}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleProducts.map(product => (
                     <ProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={onProductClick}
                        currencyPrefix={currencyPrefix}
                        priceMultiplier={priceMultiplier}
                        theme={theme}
                     />
                  ))}
               </div>
               {visibleCount < filteredProducts.length && (
                  <div className="flex justify-center mt-8">
                      <button onClick={handleLoadMore} className="px-6 py-2 bg-slate-800 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-bold rounded-sm transition-colors">
                          Load More Tickers
                      </button>
                  </div>
               )}
            </div>
         </div>
      );
  }

  // --- BLOCKCHAIN THEME RENDER ---
  if (isBlockchain) {
      return (
          <div className="pb-20 overflow-x-hidden bg-[#121212] min-h-screen text-[#eaeaea] font-mono">
              <div className="relative min-h-[700px] flex flex-col justify-center items-center overflow-hidden mb-12 border-b border-[#333]">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(247,147,26,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(247,147,26,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                  
                  {/* Floating Blocks */}
                  <div className="absolute top-20 left-20 animate-float">
                      <Blocks className="w-32 h-32 text-[#F7931A] opacity-10" />
                  </div>
                  
                  <div className="text-center z-10 px-4">
                      <div className="inline-block bg-[#F7931A]/10 text-[#F7931A] px-4 py-2 mb-6 border border-[#F7931A]/50 font-bold tracking-widest text-xs">
                          GENESIS BLOCK: ESTABLISHED 2024
                      </div>
                      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
                          DECENTRALIZED<br/>
                          <span className="text-[#F7931A]">CODE MARKET</span>
                      </h1>
                      <p className="text-xl text-[#888] mb-10 max-w-2xl mx-auto">
                          Trustless. Verified. Immutable. The first source code marketplace built on cryptographic proofs.
                      </p>
                      
                      <div className="flex justify-center gap-6">
                          <button className="px-8 py-3 bg-[#F7931A] text-black font-bold hover:bg-[#e68a15] transition-colors border border-[#F7931A]">
                              CONNECT WALLET
                          </button>
                          <button className="px-8 py-3 bg-transparent border border-[#333] text-[#F7931A] hover:border-[#F7931A] transition-colors">
                              READ WHITEPAPER
                          </button>
                      </div>
                  </div>
              </div>

              {/* Product List */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center mb-8 border-b border-[#333] pb-4">
                      <h2 className="text-2xl font-bold flex items-center">
                          <Database className="w-6 h-6 mr-3 text-[#F7931A]" />
                          SMART ASSETS
                      </h2>
                      <div className="flex gap-2">
                        {t.products.filters.map(cat => (
                            <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-4 py-2 text-xs font-bold transition-colors border border-[#333] ${activeFilter === cat ? 'bg-[#F7931A] text-black border-[#F7931A]' : 'bg-[#1a1a1a] text-[#888] hover:text-[#F7931A]'}`}>
                                {cat}
                            </button>
                        ))}
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {visibleProducts.map(product => (
                          <ProductCard 
                              key={product.id} 
                              product={product} 
                              onClick={onProductClick}
                              currencyPrefix={currencyPrefix}
                              priceMultiplier={priceMultiplier}
                              theme={theme}
                          />
                      ))}
                  </div>
                  {visibleCount < filteredProducts.length && (
                    <div className="flex justify-center mt-12">
                        <button onClick={handleLoadMore} className="px-8 py-3 border border-[#F7931A] text-[#F7931A] font-bold hover:bg-[#F7931A] hover:text-black transition-colors">
                            MINE NEXT BLOCK
                        </button>
                    </div>
                  )}
              </div>
          </div>
      );
  }

  // --- DEFAULT CYBERPUNK/MATRIX/ETC RENDER ---
  return (
    <div className={`pb-20 overflow-x-hidden ${
        isMatrix ? 'bg-black text-green-500 font-mono' : 
        isCrimson ? 'bg-[#050505] text-gray-300 font-sans' : 
        isAurora ? 'bg-slate-50 text-slate-800 font-sans' : 
        isCyberSec ? 'bg-[#020c1b] text-[#8892b0] font-mono' : 
        'bg-[#0B1121] text-white font-sans'
    }`}>
      {/* Matrix Canvas Overlay */}
      {isMatrix && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />}

      {/* Hero Section */}
      <div className={`relative min-h-[700px] flex flex-col justify-start pt-20 items-center overflow-hidden mb-12 ${!isMatrix && !isAurora && 'perspective-2000'}`}>
        
        {/* Dynamic Backgrounds */}
        {!isMatrix && !isAurora && !isCrimson && !isCyberSec && (
            <>
                <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-cyan-600/10 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
                <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[100px] -z-10 animate-float-delayed" />
                <div className="absolute bottom-0 w-[200vw] h-[1000px] -left-[50vw] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transform perspective-[1000px] rotateX(60deg) origin-top -z-15 opacity-30"></div>
            </>
        )}
        
        {isCrimson && (
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,0,0,0.05)_0,rgba(255,0,0,0.05)_1px,transparent_0,transparent_50%)] bg-[size:20px_20px]"></div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 text-center mb-10 max-w-4xl px-4 animate-fade-in-up mt-10">
          <div className={`inline-flex items-center space-x-2 py-1 px-3 rounded-full mb-6 transition-colors cursor-default ${
              isMatrix ? 'border border-green-500 bg-green-900/20 text-green-400' :
              isCrimson ? 'border border-red-600 bg-red-900/20 text-red-500 rounded-none transform skew-x-[-10deg]' :
              isAurora ? 'bg-white/80 border border-white text-indigo-500 shadow-sm' :
              isCyberSec ? 'border border-[#64ffda] bg-[#112240] text-[#64ffda] rounded font-mono' :
              'bg-slate-800/50 border border-slate-700/50 backdrop-blur-md text-cyan-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
                isMatrix ? 'bg-green-500' : isCrimson ? 'bg-red-500' : isAurora ? 'bg-indigo-500' : isCyberSec ? 'bg-[#64ffda]' : 'bg-cyan-400'
            } animate-pulse`}></span>
            <span className={isCrimson ? 'uppercase tracking-widest font-bold' : ''}>{t.hero.tag}</span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none drop-shadow-2xl ${
              isMatrix ? 'text-green-500 text-shadow-green font-mono' :
              isCrimson ? 'text-white uppercase font-black' :
              isAurora ? 'text-slate-900' :
              isCyberSec ? 'text-[#ccd6f6] font-mono' :
              'text-white'
          }`}>
            {t.hero.titlePrefix} <br />
            <span className={`text-transparent bg-clip-text ${
                isMatrix ? 'bg-gradient-to-r from-green-400 to-green-600' :
                isCrimson ? 'text-red-600' :
                isAurora ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                isCyberSec ? 'text-[#64ffda]' :
                'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x'
            }`}>
              {t.hero.titleSuffix}
            </span>
          </h1>
          
          <p className={`text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
              isMatrix ? 'text-green-800' :
              isCrimson ? 'text-gray-500 font-medium' :
              isAurora ? 'text-slate-500' :
              isCyberSec ? 'text-[#8892b0] font-mono text-sm' :
              'text-slate-400'
          }`}>
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className={`px-8 py-4 font-bold transition-all flex items-center ${
                isMatrix ? 'bg-green-600 text-black hover:bg-green-500 hover:shadow-[0_0_20px_#00ff00]' :
                isCrimson ? 'bg-red-700 text-white hover:bg-red-600 rounded-none skew-x-[-10deg]' :
                isAurora ? 'bg-indigo-600 text-white hover:bg-indigo-700 rounded-full shadow-lg shadow-indigo-200' :
                isCyberSec ? 'bg-transparent border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 rounded' :
                'bg-white text-slate-900 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105'
            }`}>
              {t.hero.explore} <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className={`px-8 py-4 font-semibold transition-all ${
                isMatrix ? 'border border-green-600 text-green-500 hover:bg-green-900/20' :
                isCrimson ? 'border border-red-800 text-red-500 hover:bg-red-900/20 rounded-none skew-x-[-10deg]' :
                isAurora ? 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 rounded-full' :
                isCyberSec ? 'text-[#8892b0] hover:text-[#64ffda]' :
                'bg-slate-800/40 text-white border border-slate-600 rounded-full hover:bg-slate-700/50'
            }`}>
              {t.hero.startSelling}
            </button>
          </div>
        </div>

        {/* 3D Carousel (Only for Cyberpunk/Default) */}
        {!isMatrix && !isAurora && !isCrimson && !isCyberSec && (
          <div className="relative w-full h-[500px] flex justify-center items-center mt-4 perspective-container hidden md:flex">
            <div 
              className="carousel-ring"
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              {carouselItems.map((product, index) => {
                const angle = theta * index;
                return (
                  <div 
                    key={product.id}
                    className="carousel-item"
                    style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
                    onClick={() => onProductClick(product)}
                  >
                    <div className="w-[280px] h-[360px] bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] group hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 cursor-pointer flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                         <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                         <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded border border-white/10">
                           {product.category}
                         </span>
                      </div>
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
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Stats / Trust */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-20 relative z-20">
          {[
            { icon: Zap, title: t.stats.instant, desc: t.stats.instantDesc, color: 'cyan' },
            { icon: Shield, title: t.stats.verified, desc: t.stats.verifiedDesc, color: 'purple' },
            { icon: TrendingUp, title: t.stats.seo, desc: t.stats.seoDesc, color: 'green' }
          ].map((stat, i) => (
            <div key={i} className={`p-6 flex items-center space-x-4 transition-all hover:-translate-y-2 ${
                isMatrix ? 'bg-black border border-green-800 hover:shadow-[0_0_15px_#00ff00]' :
                isCrimson ? 'bg-[#111] border border-red-900 hover:bg-red-900/10 skew-x-[-5deg]' :
                isAurora ? 'bg-white/50 backdrop-blur border border-white/50 shadow-sm hover:shadow-lg rounded-2xl' :
                isCyberSec ? 'bg-[#112240] border border-[#233554] hover:border-[#64ffda] rounded' :
                'glass-panel rounded-2xl border-t border-white/10 hover:bg-slate-800/80 hover:shadow-2xl'
            }`}>
              <div className={`p-4 rounded-xl ${
                  isMatrix ? 'bg-green-900/20 text-green-500' :
                  isCrimson ? 'bg-red-900/20 text-red-500 rounded-none' :
                  isAurora ? 'bg-indigo-50 text-indigo-500' :
                  isCyberSec ? 'text-[#64ffda] bg-transparent' :
                  `bg-${stat.color}-500/10 text-${stat.color}-400 ring-1 ring-${stat.color}-500/20`
              }`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`font-bold text-lg ${
                    isMatrix ? 'text-green-500' : isCrimson ? 'text-white uppercase' : isAurora ? 'text-slate-900' : isCyberSec ? 'text-[#ccd6f6]' : 'text-white'
                }`}>{stat.title}</h3>
                <p className={`text-sm ${
                    isMatrix ? 'text-green-800' : isCrimson ? 'text-gray-500' : isAurora ? 'text-slate-500' : isCyberSec ? 'text-[#8892b0]' : 'text-slate-400'
                }`}>{stat.desc}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <h2 className={`text-3xl font-bold flex items-center ${
              isMatrix ? 'text-green-500' : isCrimson ? 'text-white uppercase' : isAurora ? 'text-slate-900' : isCyberSec ? 'text-[#ccd6f6]' : 'text-white'
          }`}>
            {!isAurora && !isCyberSec && !isCrimson && <span className={`w-1 h-8 rounded-full mr-4 ${isMatrix ? 'bg-green-500' : 'bg-gradient-to-b from-cyan-400 to-blue-600'}`}></span>}
            {isCyberSec && <span className="text-[#64ffda] mr-4 text-xl">01.</span>}
            {t.products.featured}
          </h2>
          <div className={`flex flex-wrap gap-2 justify-center p-1 ${
              isMatrix ? 'bg-black border border-green-900' : isCrimson ? 'bg-transparent' : isAurora ? 'bg-slate-100 rounded-full' : isCyberSec ? 'bg-transparent' : 'bg-slate-800/50 rounded-full backdrop-blur-sm border border-slate-700/50'
          }`}>
            {t.products.filters.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat 
                    ? isMatrix ? 'bg-green-900/30 text-green-400 border border-green-500' 
                    : isCrimson ? 'bg-red-700 text-white skew-x-[-10deg]'
                    : isAurora ? 'bg-white text-indigo-600 shadow-sm rounded-full'
                    : isCyberSec ? 'text-[#64ffda] border-b-2 border-[#64ffda]'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/40 rounded-full'
                    : isMatrix ? 'text-green-800 hover:text-green-500'
                    : isCrimson ? 'text-gray-500 hover:text-red-500'
                    : isAurora ? 'text-slate-500 hover:text-slate-900'
                    : isCyberSec ? 'text-[#8892b0] hover:text-[#64ffda]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick}
              currencyPrefix={currencyPrefix}
              priceMultiplier={priceMultiplier}
              theme={theme}
            />
          ))}
        </div>
        
        {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-12">
               <button 
                 onClick={handleLoadMore}
                 className={`px-8 py-3 font-bold transition-all ${
                    isMatrix ? 'border border-green-500 text-green-500 hover:bg-green-900/20' :
                    isCrimson ? 'border-2 border-red-700 text-red-500 hover:bg-red-900/10 skew-x-[-10deg]' :
                    isAurora ? 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 rounded-full shadow-sm' :
                    isCyberSec ? 'border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 rounded' :
                    'bg-slate-800 text-white hover:bg-slate-700 rounded-full px-10'
                 }`}
               >
                 {t.products.loadMore}
               </button>
            </div>
        )}
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
        }
        .text-shadow-green {
            text-shadow: 0 0 5px #00ff00;
        }
        .text-shadow-glow {
            text-shadow: 0 0 10px rgba(34,211,238,0.5);
        }
        @keyframes scroll-chart {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-scroll-chart {
            animation: scroll-chart 20s linear infinite;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
        @keyframes fall {
            0% { transform: translateY(-100px) rotate(0deg); }
            100% { transform: translateY(800px) rotate(360deg); }
        }
        .animate-fall {
            animation: fall linear infinite;
        }
        @keyframes slot-spin {
            0% { transform: translateY(0); }
            20% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
        }
        .animate-slot-spin {
            animation: slot-spin 0.5s ease-out;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;