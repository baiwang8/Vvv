import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import SEODashboard from './components/SEODashboard';
import CartDrawer from './components/CartDrawer';
import UserProfile from './pages/UserProfile';
import { Product, ViewState, Language } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(ViewState.DETAIL);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsCartOpen(true); // Open cart immediately after adding
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  let content;
  switch (currentView) {
    case ViewState.HOME:
      content = <Home onProductClick={handleProductClick} language={language} />;
      break;
    case ViewState.DETAIL:
      if (selectedProduct) {
        content = (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setCurrentView(ViewState.HOME)}
            onAddToCart={handleAddToCart}
            language={language}
          />
        );
      } else {
        content = <Home onProductClick={handleProductClick} language={language} />;
      }
      break;
    case ViewState.SELLER_DASHBOARD:
      content = <SEODashboard language={language} />;
      break;
    case ViewState.PROFILE:
      content = <UserProfile language={language} />;
      break;
    default:
      content = <Home onProductClick={handleProductClick} language={language} />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-200">
        <Navbar 
          onNavigate={handleNavigate} 
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cart.length} 
          language={language}
          onToggleLanguage={toggleLanguage}
        />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onRemove={handleRemoveFromCart}
          language={language}
        />

        <main className="flex-grow pt-16">
          {content}
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;