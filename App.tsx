import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import SEODashboard from './components/SEODashboard';
import CartDrawer from './components/CartDrawer';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import CustomerSupport from './components/CustomerSupport';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import { Product, ViewState, Language, Theme, User, NavItem } from './types';
import { TRANSLATIONS } from './i18n';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('cyberpunk');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Payment System State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentEnabled, setPaymentEnabled] = useState(true);
  const [activePaymentProduct, setActivePaymentProduct] = useState<Product | null>(null);

  // Menu State - Populated with default items
  const [navItems, setNavItems] = useState<NavItem[]>([
      { id: '1', label: 'Documentation', link: '#', type: 'external' },
      { id: '2', label: 'License', link: '#', type: 'external' },
      { id: '3', label: 'Support', link: '#', type: 'external' }
  ]);

  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'cyberpunk') return 'matrix';
      if (prev === 'matrix') return 'crimson';
      if (prev === 'crimson') return 'aurora';
      if (prev === 'aurora') return 'cybersec';
      if (prev === 'cybersec') return 'blockchain';
      if (prev === 'blockchain') return 'casino';
      if (prev === 'casino') return 'stock';
      return 'cyberpunk';
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(ViewState.DETAIL);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLogin = (email: string) => {
    setUser({
      id: 'usr_123',
      email: email,
      name: email.split('@')[0],
      role: 'user'
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    if (currentView === ViewState.PROFILE) {
        setCurrentView(ViewState.HOME);
    }
  };

  // Payment Flow
  const handleCheckout = (product?: Product) => {
      if (!paymentEnabled) {
          alert(t.payment.maintenance);
          return;
      }
      setActivePaymentProduct(product || null); // null means cart checkout
      setIsPaymentModalOpen(true);
  };

  // Menu Management
  const handleAddNavItem = (item: NavItem) => {
      setNavItems([...navItems, item]);
  };
  const handleRemoveNavItem = (id: string) => {
      setNavItems(prev => prev.filter(i => i.id !== id));
  };

  const calculateTotal = () => {
      const multiplier = language === 'zh' ? 7.1 : 1;
      if (activePaymentProduct) {
          return Math.round(activePaymentProduct.price * multiplier);
      }
      return Math.round(cart.reduce((sum, item) => sum + item.price, 0) * multiplier);
  };

  // Content switching logic
  let content;
  switch (currentView) {
    case ViewState.HOME:
      content = <Home onProductClick={handleProductClick} language={language} theme={theme} />;
      break;
    case ViewState.DETAIL:
      if (selectedProduct) {
        content = (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setCurrentView(ViewState.HOME)}
            onAddToCart={handleAddToCart}
            language={language}
            onBuyNow={handleCheckout}
          />
        );
      } else {
        content = <Home onProductClick={handleProductClick} language={language} theme={theme} />;
      }
      break;
    case ViewState.SELLER_DASHBOARD:
      content = <SEODashboard language={language} />;
      break;
    case ViewState.PROFILE:
      content = <UserProfile language={language} />;
      break;
    case ViewState.ADMIN_DASHBOARD:
      content = (
        <AdminDashboard 
          language={language} 
          theme={theme}
          onExit={() => handleNavigate(ViewState.HOME)}
          navItems={navItems}
          onAddNavItem={handleAddNavItem}
          onRemoveNavItem={handleRemoveNavItem}
          paymentEnabled={paymentEnabled}
          onTogglePayment={() => setPaymentEnabled(!paymentEnabled)}
        />
      );
      break;
    default:
      content = <Home onProductClick={handleProductClick} language={language} theme={theme} />;
  }

  // If in Admin Dashboard, render full screen without standard nav/footer
  if (currentView === ViewState.ADMIN_DASHBOARD) {
    return (
      <div className={`${theme === 'matrix' ? 'font-mono' : theme === 'cybersec' ? 'font-mono' : 'font-sans'}`}>
        {content}
      </div>
    );
  }

  const getThemeClasses = () => {
    if (theme === 'matrix') return 'bg-black text-green-500 font-mono';
    if (theme === 'crimson') return 'bg-[#111] text-red-500 font-sans tracking-wide';
    if (theme === 'aurora') return 'bg-slate-50 text-slate-800 font-sans';
    if (theme === 'cybersec') return 'bg-[#020c1b] text-[#8892b0] font-mono';
    if (theme === 'blockchain') return 'bg-[#121212] text-[#eaeaea] font-mono';
    if (theme === 'casino') return 'bg-[#0a0a05] text-[#d4af37] font-serif';
    if (theme === 'stock') return 'bg-[#0f172a] text-slate-200 font-sans';
    return 'bg-slate-900 text-slate-200 font-sans';
  };

  // Standard Layout
  return (
    <div className={`min-h-screen ${getThemeClasses()} flex flex-col transition-colors duration-500`}>
      <Navbar 
        onNavigate={handleNavigate} 
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cart.length} 
        language={language}
        onToggleLanguage={toggleLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        navItems={navItems}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={handleRemoveFromCart}
        language={language}
        onCheckout={() => handleCheckout()}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        theme={theme}
        language={language}
      />

      <PaymentModal 
         isOpen={isPaymentModalOpen}
         onClose={() => setIsPaymentModalOpen(false)}
         amount={calculateTotal()}
         currencyPrefix={language === 'zh' ? '¥' : '$'}
         theme={theme}
         language={language}
      />

      <CustomerSupport theme={theme} language={language} />

      <main className="flex-grow pt-16">
        {content}
      </main>
      
      <Footer theme={theme} language={language} />
    </div>
  );
};

export default App;
