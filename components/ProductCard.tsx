import React, { useRef, useState } from 'react';
import { Star, ShoppingBag, Terminal, Hash, ChevronRight, Crosshair, AlertTriangle, ArrowUpRight, ShieldCheck, Lock, Link, Box, Layers, Cpu, Zap, Scan, Code, Database, Crown, TrendingUp, TrendingDown, DollarSign, Club, Heart, Diamond, Spade } from 'lucide-react';
import { Product, Theme } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  currencyPrefix?: string;
  priceMultiplier?: number;
  theme?: Theme;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick, 
  currencyPrefix = '$', 
  priceMultiplier = 1,
  theme = 'cyberpunk'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const isMatrix = theme === 'matrix';
  const isCrimson = theme === 'crimson';
  const isAurora = theme === 'aurora';
  const isCyberSec = theme === 'cybersec';
  const isBlockchain = theme === 'blockchain';
  const isCasino = theme === 'casino';
  const isStock = theme === 'stock';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position relative to center
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10 deg
    const rotateX = ((centerY - y) / centerY) * 10; // Max 10 deg inverted

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const finalPrice = Math.round(product.price * priceMultiplier);

  // --- CASINO THEME RENDER (3D FLIP CARD) ---
  if (isCasino) {
    const suits = [Spade, Heart, Club, Diamond];
    const SuitIcon = suits[Math.floor(Math.random() * suits.length)];
    const isRed = SuitIcon === Heart || SuitIcon === Diamond;
    const colorClass = isRed ? 'text-red-600' : 'text-black';

    return (
      <div 
        onClick={() => onClick(product)}
        className="group relative w-full h-[450px] cursor-pointer"
        style={{ perspective: '1000px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isHovering ? 'rotate-y-180' : ''}`}>
           {/* FRONT OF CARD (Product Image) */}
           <div className="absolute inset-0 backface-hidden bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col border border-gray-300">
              {/* Card Corner Index */}
              <div className={`absolute top-2 left-2 flex flex-col items-center ${colorClass}`}>
                 <span className="text-2xl font-serif font-bold leading-none">A</span>
                 <SuitIcon className="w-4 h-4" />
              </div>
              
              <div className="mt-12 mx-4 h-48 relative rounded overflow-hidden border border-gray-200">
                 <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
              </div>

              <div className="p-4 text-center mt-2">
                 <h3 className="text-black font-serif text-xl font-bold mb-1 tracking-tight">{product.title}</h3>
                 <p className="text-gray-500 text-xs italic">{product.category}</p>
                 <div className="mt-4 text-[#d4af37] font-bold text-2xl">{currencyPrefix}{finalPrice}</div>
              </div>
              
              {/* Bottom Right Index */}
              <div className={`absolute bottom-2 right-2 flex flex-col items-center rotate-180 ${colorClass}`}>
                 <span className="text-2xl font-serif font-bold leading-none">A</span>
                 <SuitIcon className="w-4 h-4" />
              </div>
           </div>

           {/* BACK OF CARD (Details + Bet) */}
           <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#b45309] rounded-xl overflow-hidden shadow-2xl">
              {/* Pattern Background */}
              <div className="absolute inset-2 border-2 border-[#fcd34d] rounded-lg bg-[#92400e] flex flex-col items-center justify-center text-center p-6">
                 <div className="absolute inset-0 bg-[radial-gradient(#fcd34d_1px,transparent_1px)] bg-[size:10px_10px] opacity-20"></div>
                 
                 <Club className="w-16 h-16 text-[#fcd34d] mb-4 drop-shadow-md animate-pulse" />
                 
                 <h3 className="text-white font-serif text-xl font-bold mb-4 relative z-10">{product.title}</h3>
                 <p className="text-[#fcd34d]/80 text-xs mb-8 line-clamp-3 relative z-10 font-medium">"{product.description}"</p>
                 
                 <button className="relative z-10 bg-gradient-to-b from-[#fcd34d] to-[#d4af37] text-black font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:scale-105 transition-transform shadow-lg border border-white/20">
                    Place Bet
                 </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- STOCK THEME RENDER (TRADING TERMINAL) ---
  if (isStock) {
    const isUp = Math.random() > 0.4;
    return (
      <div 
        onClick={() => onClick(product)}
        className="group bg-[#1e293b] border border-slate-600 hover:border-blue-500 transition-all duration-300 cursor-pointer overflow-hidden relative flex flex-col h-full shadow-lg hover:shadow-blue-900/20"
      >
        {/* Header Strip */}
        <div className="bg-[#0f172a] p-3 border-b border-slate-600 flex justify-between items-center">
           <div className="flex items-center space-x-2">
              <span className="font-bold text-white font-mono text-lg">{product.title.substring(0, 3).toUpperCase()}</span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">EQ</span>
           </div>
           <div className={`flex items-center text-xs font-bold font-mono ${isUp ? 'text-green-500 bg-green-900/20 px-2 py-0.5 rounded' : 'text-red-500 bg-red-900/20 px-2 py-0.5 rounded'}`}>
              {isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {isUp ? '+' : ''}{(Math.random() * 5).toFixed(2)}%
           </div>
        </div>
        
        {/* Main Chart Area */}
        <div className="h-44 relative bg-[#0b1121] p-0 flex items-end overflow-hidden group-hover:bg-[#0f172a] transition-colors">
           {/* Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

           {/* Simulated Chart Line */}
           <svg className="w-full h-3/4 absolute bottom-0 left-0" preserveAspectRatio="none">
              <polyline 
                 fill="none" 
                 stroke={isUp ? '#22c55e' : '#ef4444'} 
                 strokeWidth="2" 
                 points={`0,${80 + Math.random()*20} 20,${70 + Math.random()*20} 40,${60 + Math.random()*20} 60,${70 + Math.random()*20} 80,${50 + Math.random()*20} 100,${40 + Math.random()*20} 120,${60 + Math.random()*20} 140,${30 + Math.random()*20} 160,${50 + Math.random()*20} 180,${20 + Math.random()*20} 200,${40 + Math.random()*20} 220,${10 + Math.random()*20} 240,${30 + Math.random()*20} 260,${5 + Math.random()*20} 300,${20 + Math.random()*20}`} 
                 className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]"
              />
              <linearGradient id={`chartGradient-${product.id}`} x1="0" x2="0" y1="0" y2="1">
                 <stop offset="0%" stopColor={isUp ? '#22c55e' : '#ef4444'} stopOpacity="0.3" />
                 <stop offset="100%" stopColor={isUp ? '#22c55e' : '#ef4444'} stopOpacity="0" />
              </linearGradient>
              <polygon 
                 fill={`url(#chartGradient-${product.id})`} 
                 points={`0,200 0,${80 + Math.random()*20} 20,${70 + Math.random()*20} 40,${60 + Math.random()*20} 60,${70 + Math.random()*20} 80,${50 + Math.random()*20} 100,${40 + Math.random()*20} 120,${60 + Math.random()*20} 140,${30 + Math.random()*20} 160,${50 + Math.random()*20} 180,${20 + Math.random()*20} 200,${40 + Math.random()*20} 220,${10 + Math.random()*20} 240,${30 + Math.random()*20} 260,${5 + Math.random()*20} 300,${20 + Math.random()*20} 300,200`} 
              />
           </svg>
           
           {/* Price Overlay */}
           <div className="absolute top-4 right-4 text-right">
              <div className="text-xs text-slate-500 mb-1">LAST PRICE</div>
              <div className={`text-2xl font-bold font-mono ${isUp ? 'text-green-500' : 'text-red-500'}`}>{currencyPrefix}{finalPrice}</div>
           </div>
        </div>

        {/* Info Area */}
        <div className="p-4 flex-1 bg-slate-800 border-t border-slate-600 flex flex-col justify-between">
           <div>
               <h3 className="text-sm font-bold text-white mb-1 truncate">{product.title}</h3>
               <p className="text-xs text-slate-400 line-clamp-2 mb-3">{product.description}</p>
           </div>
           
           <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-3 border-t border-slate-700 pt-2">
              <div className="flex justify-between"><span>BID</span><span className="text-white font-mono">{Math.round(finalPrice * 0.99)}</span></div>
              <div className="flex justify-between"><span>ASK</span><span className="text-white font-mono">{Math.round(finalPrice * 1.01)}</span></div>
           </div>

           <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-sm text-xs uppercase tracking-wider transition-colors flex items-center justify-center">
              Execute Order
           </button>
        </div>
      </div>
    );
  }

  // --- BLOCKCHAIN THEME RENDER (HOLOGRAPHIC SCANNER) ---
  if (isBlockchain) {
      return (
        <div 
            onClick={() => onClick(product)}
            className="group relative w-full h-[380px] bg-[#111] border border-[#333] hover:border-[#F7931A] transition-colors cursor-pointer overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(247,147,26,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(247,147,26,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* Scan Line Effect - Visible on Hover */}
            <div className={`absolute left-0 w-full h-1 bg-[#F7931A] shadow-[0_0_20px_#F7931A] z-20 transition-all duration-300 ${isHovering ? 'animate-scan opacity-100' : 'top-0 opacity-0'}`}></div>
            
            {/* Holographic Overlay on Hover */}
            <div className={`absolute inset-0 bg-[#F7931A]/5 z-10 pointer-events-none transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Image Section */}
            <div className="h-48 relative overflow-hidden border-b border-[#333] group-hover:border-[#F7931A]/50 transition-colors">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                />
                
                {/* Encrypted Overlay - Fades out on hover */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                    <Lock className="w-8 h-8 text-[#555]" />
                </div>

                <div className="absolute top-2 right-2 bg-black/80 border border-[#F7931A] text-[#F7931A] text-[10px] px-2 py-0.5 font-mono">
                    ERC-721
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 relative z-10 font-mono">
                <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] text-[#555] group-hover:text-[#F7931A] uppercase tracking-widest transition-colors">
                        Block #{product.id.padStart(4, '0')}
                    </div>
                    {isHovering && <Scan className="w-4 h-4 text-[#F7931A] animate-pulse" />}
                </div>

                <h3 className="text-[#eaeaea] text-lg font-bold leading-tight mb-4 truncate group-hover:text-white">
                    {product.title}
                </h3>

                {/* Technical Specs - Reveal on Hover */}
                <div className={`space-y-2 text-xs transition-all duration-300 ${isHovering ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'}`}>
                    <div className="flex justify-between border-b border-[#333] pb-1">
                        <span className="text-[#666]">Hash:</span>
                        <span className="text-[#888]">0x...{product.id}F9</span>
                    </div>
                    <div className="flex justify-between border-b border-[#333] pb-1">
                        <span className="text-[#666]">Nodes:</span>
                        <span className="text-[#888]">{product.sales} Active</span>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center pt-4 border-t border-[#333] group-hover:border-[#F7931A]/30 transition-colors">
                    <span className="text-xl font-bold text-[#F7931A]">{currencyPrefix}{finalPrice}</span>
                    <button className="bg-transparent border border-[#F7931A] text-[#F7931A] hover:bg-[#F7931A] hover:text-black px-3 py-1 text-xs font-bold uppercase transition-all">
                        Mint
                    </button>
                </div>
            </div>
        </div>
      );
  }

  // --- CYBERSEC THEME RENDER ---
  if (isCyberSec) {
    return (
      <div 
        ref={cardRef}
        onClick={() => onClick(product)}
        className="group relative bg-[#112240] rounded-xl overflow-hidden cursor-pointer flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(2,12,27,0.7)] border border-[#233554] hover:border-[#64ffda]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-48 overflow-hidden bg-[#0a192f] p-4 flex items-center justify-center">
           <div className="absolute inset-0 bg-[#0a192f] opacity-80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-60"></div>
           <img 
               src={product.image} 
               alt={product.title} 
               className="w-full h-full object-cover rounded mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
           />
           <div className="absolute top-4 right-4 text-[#64ffda] bg-[#112240] p-1.5 rounded-full border border-[#64ffda]">
              <ShieldCheck className="w-4 h-4" />
           </div>
           <div className="absolute bottom-4 left-4 font-mono text-xs text-[#64ffda] bg-[#112240]/80 px-2 py-1 rounded border border-[#233554]">
             SECURE_ASSET
           </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
           <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[#ccd6f6] text-lg leading-tight group-hover:text-[#64ffda] transition-colors">{product.title}</h3>
           </div>
           
           <p className="text-[#8892b0] text-sm mb-4 line-clamp-2 leading-relaxed">
             {product.description}
           </p>

           <div className="mt-auto pt-4 border-t border-[#233554] flex items-center justify-between font-mono">
              <div className="flex flex-wrap gap-2 text-[10px] text-[#64ffda]">
                 {product.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="flex items-center before:content-['#']">
                      {tag}
                   </span>
                 ))}
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-lg font-bold text-[#ccd6f6]">{currencyPrefix}{finalPrice}</span>
                 <Lock className="w-4 h-4 text-[#8892b0] group-hover:text-[#64ffda] transition-colors" />
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- AURORA THEME RENDER ---
  if (isAurora) {
    return (
      <div 
        ref={cardRef}
        onClick={() => onClick(product)}
        className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] border border-slate-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-56 overflow-hidden p-2">
           <div className="w-full h-full rounded-2xl overflow-hidden relative">
             <img 
               src={product.image} 
               alt={product.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
               {product.category}
             </div>
           </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
           <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">{product.title}</h3>
           </div>
           
           <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
             {product.description}
           </p>

           <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center space-x-1 text-slate-400 text-xs font-medium">
                 <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                 <span className="text-slate-700">{product.rating}</span>
                 <span>• {product.sales} sold</span>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-xl font-bold text-slate-900">{currencyPrefix}{finalPrice}</span>
                 <button className="bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 p-2 rounded-xl transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- CRIMSON THEME RENDER ---
  if (isCrimson) {
    return (
      <div 
        ref={cardRef}
        onClick={() => onClick(product)}
        className="group relative h-full flex flex-col cursor-pointer transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
        }}
      >
        {/* Background & Border */}
        <div className="absolute inset-0 bg-[#161616] border-[2px] border-red-900/50 group-hover:border-red-600 transition-colors z-0"></div>
        
        {/* Striped Warning BG */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,0,0,0.05)_25%,rgba(255,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(255,0,0,0.05)_75%,rgba(255,0,0,0.05)_100%)] bg-[size:20px_20px] opacity-20 z-0"></div>

        {/* Header - Image */}
        <div className="relative h-48 overflow-hidden z-10 border-b-2 border-red-900/50">
          <img 
             src={product.image} 
             alt={product.title} 
             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 grayscale hover:grayscale-0" 
          />
          <div className="absolute top-0 right-0 bg-red-600 text-black text-[10px] font-black px-3 py-1 uppercase" style={{ clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%)"}}>
             CONFIDENTIAL
          </div>
          
          {/* Target Overlay */}
          {isHovering && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 border border-red-500 rounded-full animate-ping opacity-50 absolute"></div>
                <Crosshair className="w-8 h-8 text-red-500 animate-spin-slow" />
             </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col z-10 text-gray-300">
           <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-red-500 text-lg group-hover:text-white uppercase leading-tight">{product.title}</h3>
           </div>
           
           <p className="text-xs text-gray-500 line-clamp-2 mb-4 font-mono uppercase tracking-tight">
             // {product.description}
           </p>

           <div className="mt-auto">
              <div className="flex items-center justify-between border-t border-red-900/30 pt-3">
                 <div className="flex items-center space-x-2 text-xs text-red-800">
                    <AlertTriangle className="w-3 h-3" />
                    <span>LEVEL 4 CLEARANCE</span>
                 </div>
                 <div className="text-xl font-black text-white bg-red-900/20 px-2 py-0.5 border-l-2 border-red-600">
                    {currencyPrefix}{finalPrice}
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- MATRIX THEME RENDER ---
  if (isMatrix) {
    return (
      <div 
        ref={cardRef}
        onClick={() => onClick(product)}
        className="group relative bg-black border border-green-900 hover:border-green-400 transition-all duration-100 cursor-pointer overflow-hidden font-mono h-full flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>

        {/* Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,50,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-20"></div>

        {/* Image Area */}
        <div className="relative h-48 border-b border-green-900/50 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale contrast-125 sepia hover:sepia-0"
          />
          <div className="absolute top-2 left-2 bg-black/80 border border-green-700 px-2 py-0.5 text-[10px] text-green-500">
            CAT: {product.category.toUpperCase()}
          </div>
          {isHovering && (
             <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                <span className="bg-black text-green-500 border border-green-500 px-2 py-1 text-xs animate-pulse">>> ACCESS_DATA</span>
             </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col relative z-20">
          <div className="mb-2">
            <h3 className="text-green-500 text-sm font-bold truncate group-hover:text-green-300">
              {isHovering ? `> ${product.title}` : product.title}
            </h3>
            <p className="text-green-800 text-xs mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-green-900/50 flex items-center justify-between">
             <div className="flex items-center space-x-2 text-[10px] text-green-700">
                <Hash className="w-3 h-3" />
                <span>ID: {product.id.padStart(4, '0')}</span>
             </div>
             <div className="flex items-center">
                <span className="text-lg text-green-400 font-bold mr-3">{currencyPrefix}{finalPrice}</span>
                <button className="bg-green-900/20 hover:bg-green-500 hover:text-black text-green-500 border border-green-700 p-1.5 transition-colors">
                   <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- DEFAULT CYBERPUNK RENDER ---
  return (
    <div 
      style={{ perspective: '1000px' }}
      className="h-full"
    >
      <div 
        ref={cardRef}
        className="group relative bg-slate-800/40 rounded-xl overflow-hidden border border-slate-700 cursor-pointer flex flex-col h-full transition-all duration-200 ease-out"
        style={{
          transform: isHovering 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          boxShadow: isHovering 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(6, 182, 212, 0.2)' 
            : 'none'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(product)}
      >
        {/* Shine Effect */}
        <div 
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style={{
                background: `radial-gradient(circle at ${50 - rotation.y * 3}% ${50 + rotation.x * 3}%, rgba(255,255,255,0.1), transparent 40%)`
            }}
        />

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
          <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-cyan-400 border border-cyan-500/20 z-20">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col transform-style-3d">
          <div className="flex justify-between items-start mb-2 transform translate-z-10">
            <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </div>
          
          <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-800 px-2 py-1 rounded-sm border border-slate-700 group-hover:border-cyan-500/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50 relative z-20">
            <div className="flex items-center space-x-1">
               <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
               <span className="text-sm font-medium text-slate-300">{product.rating}</span>
               <span className="text-xs text-slate-500">({product.sales})</span>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-xl font-bold text-white tracking-tight text-shadow-glow">
                 {currencyPrefix}{finalPrice}
               </span>
               <button className="bg-cyan-500/10 hover:bg-cyan-500 hover:text-white text-cyan-400 p-2 rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/40">
                  <ShoppingBag className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;