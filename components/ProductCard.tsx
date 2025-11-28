import React, { useRef, useState } from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  currencyPrefix?: string;
  priceMultiplier?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, currencyPrefix = '$', priceMultiplier = 1 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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