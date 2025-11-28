import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Activity, 
  Server,
  Globe,
  Wifi,
  Cpu,
  LogOut,
  TrendingUp,
  ShieldAlert,
  Zap,
  MoreHorizontal,
  ChevronLeft,
  Menu,
  PlusCircle,
  Upload,
  FileText,
  DollarSign,
  Layers,
  Terminal,
  Code,
  Crosshair,
  Target,
  Sparkles,
  Settings as SettingsIcon,
  Mail,
  MessageCircle,
  Save,
  ShieldCheck,
  CreditCard,
  ToggleLeft,
  ToggleRight,
  List,
  Plus,
  Trash,
  Blocks
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Language, Theme, NavItem, ViewState } from '../types';
import { TRANSLATIONS } from '../i18n';

interface AdminDashboardProps {
  language: Language;
  onExit: () => void;
  theme: Theme;
  // Menu Props
  navItems?: NavItem[];
  onAddNavItem?: (item: NavItem) => void;
  onRemoveNavItem?: (id: string) => void;
  // Payment Props
  paymentEnabled?: boolean;
  onTogglePayment?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    language, 
    onExit, 
    theme,
    navItems = [],
    onAddNavItem,
    onRemoveNavItem,
    paymentEnabled = false,
    onTogglePayment
}) => {
  const t = TRANSLATIONS[language].admin;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Menu Management State
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newMenuLink, setNewMenuLink] = useState('');
  
  const isMatrix = theme === 'matrix';
  const isCrimson = theme === 'crimson';
  const isAurora = theme === 'aurora';
  const isCyberSec = theme === 'cybersec';
  const isBlockchain = theme === 'blockchain';

  // Matrix Transaction Stream State
  const [transactionLog, setTransactionLog] = useState<string[]>([]);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate Matrix Transaction Logs
  useEffect(() => {
    if ((!isMatrix && !isCrimson) || activeTab !== 'overview') return;

    const actions = isCrimson 
      ? ['ASSET SECURED', 'TARGET ACQUIRED', 'FUNDS TRANSFERRED', 'PROTOCOL 9 ENGAGED']
      : ['INIT_TX', 'AUTH_USER', 'VERIFY_FUNDS', 'DECRYPT_ASSET', 'GIT_CLONE', 'CLOSE_SESSION'];
    
    const users = ['OPERATIVE_7', 'SHADOW_4', 'VIPER', 'GHOST', 'ONYX'];
    
    const interval = setInterval(() => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const id = Math.floor(Math.random() * 99999).toString(16).toUpperCase();
      const amount = (Math.random() * 500).toFixed(2);
      
      const log = isCrimson 
        ? `[ALERT] ${action} // ${user} // ${id} // $${amount}`
        : `[${new Date().toLocaleTimeString()}] ${action} :: ${user} -> PROD_${id} :: $${amount} [OK]`;
      
      setTransactionLog(prev => [log, ...prev].slice(0, 20)); // Keep last 20 lines
    }, 800);

    return () => clearInterval(interval);
  }, [isMatrix, isCrimson, activeTab]);

  const currencyPrefix = language === 'zh' ? '¥' : '$';

  // --- STYLING CONSTANTS ---
  const getThemeColors = () => {
    if (isMatrix) return {
      bgMain: 'bg-black',
      bgPanel: 'bg-black',
      border: 'border-green-800',
      borderHighlight: 'border-green-500',
      textPrimary: 'text-green-500',
      textSecondary: 'text-green-800',
      accent: 'text-green-400',
      shadow: 'shadow-[0_0_15px_rgba(0,255,0,0.2)]'
    };
    if (isCrimson) return {
      bgMain: 'bg-[#111]',
      bgPanel: 'bg-[#1a1a1a]',
      border: 'border-red-900',
      borderHighlight: 'border-red-600',
      textPrimary: 'text-gray-200',
      textSecondary: 'text-gray-600',
      accent: 'text-red-600',
      shadow: 'shadow-none'
    };
    if (isAurora) return {
      bgMain: 'bg-slate-50',
      bgPanel: 'bg-white',
      border: 'border-slate-200',
      borderHighlight: 'border-indigo-400',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-500',
      accent: 'text-indigo-500',
      shadow: 'shadow-sm'
    };
    if (isCyberSec) return {
       bgMain: 'bg-[#020c1b]',
       bgPanel: 'bg-[#112240]',
       border: 'border-[#233554]',
       borderHighlight: 'border-[#64ffda]',
       textPrimary: 'text-[#ccd6f6]',
       textSecondary: 'text-[#8892b0]',
       accent: 'text-[#64ffda]',
       shadow: 'shadow-[0_0_20px_rgba(2,12,27,0.7)]'
    };
    if (isBlockchain) return {
        bgMain: 'bg-[#121212]',
        bgPanel: 'bg-[#1a1a1a]',
        border: 'border-[#333]',
        borderHighlight: 'border-[#F7931A]',
        textPrimary: 'text-[#eaeaea]',
        textSecondary: 'text-[#888]',
        accent: 'text-[#F7931A]',
        shadow: 'shadow-md'
    };
    return {
      bgMain: 'bg-[#050b14]',
      bgPanel: 'bg-[#0d1626]',
      border: 'border-cyan-900/30',
      borderHighlight: 'border-cyan-500/50',
      textPrimary: 'text-white',
      textSecondary: 'text-slate-400',
      accent: 'text-cyan-400',
      shadow: ''
    };
  };

  const colors = getThemeColors();

  const handleAddMenu = () => {
      if(newMenuLabel && newMenuLink && onAddNavItem) {
          onAddNavItem({
              id: Date.now().toString(),
              label: newMenuLabel,
              link: newMenuLink,
              type: newMenuLink.startsWith('http') ? 'external' : 'view',
              view: !newMenuLink.startsWith('http') ? ViewState.HOME : undefined // Simplified for demo
          });
          setNewMenuLabel('');
          setNewMenuLink('');
      }
  };

  // --- COMPONENT RENDERERS ---

  const renderOverview = () => {
    return (
      <div className={`grid grid-cols-12 gap-6 h-full animate-fade-in pb-20 ${isCyberSec ? 'font-mono' : ''}`}>
         
         {/* CENTRAL HUB (Globe/Map) */}
         <div className={`col-span-12 lg:col-span-8 ${colors.bgPanel} border ${colors.border} rounded-xl relative overflow-hidden flex flex-col min-h-[500px] shadow-sm`}>
            {isCyberSec && (
               <div className="absolute inset-0 bg-[#020c1b]/50 pointer-events-none z-10" style={{backgroundImage: 'radial-gradient(circle, transparent 20%, #020c1b 90%)'}}></div>
            )}
            
            <div className={`p-4 border-b border-dashed border-opacity-30 border-current flex justify-between items-center z-20`}>
               <h3 className={`${colors.accent} font-bold uppercase tracking-widest flex items-center`}>
                 <Globe className="w-4 h-4 mr-2" /> {t.widgets.mapTitle}
               </h3>
               <div className="flex space-x-2">
                  <span className={`w-2 h-2 rounded-full ${isAurora ? 'bg-indigo-500' : isCyberSec ? 'bg-[#64ffda]' : isBlockchain ? 'bg-[#F7931A]' : 'bg-red-500'} animate-pulse`}></span>
                  <span className={`text-xs ${isAurora ? 'text-indigo-400' : isCyberSec ? 'text-[#64ffda]' : isBlockchain ? 'text-[#F7931A]' : 'text-red-400'}`}>LIVE STREAM</span>
               </div>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
               {/* Simplified Globe for all themes */}
               <div className="relative w-64 h-64">
                  <div className={`absolute inset-0 rounded-full border-2 ${isAurora ? 'border-indigo-300' : isCyberSec ? 'border-[#64ffda] opacity-20' : 'border-cyan-500'} animate-pulse`}></div>
                  <div className={`absolute inset-4 rounded-full border border-dashed ${isAurora ? 'border-purple-300' : isCyberSec ? 'border-[#64ffda] opacity-40' : 'border-purple-500'} animate-spin-slow`}></div>
                  <div className={`absolute inset-10 rounded-full border ${isAurora ? 'border-blue-300' : isCyberSec ? 'border-[#64ffda] opacity-60' : 'border-blue-500'}`}></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="text-center z-10">
                        <div className={`text-4xl font-bold ${colors.textPrimary}`}>45.2k</div>
                        <div className={`text-xs ${colors.textSecondary} uppercase`}>{t.widgets.activeSessions}</div>
                     </div>
                  </div>
               </div>

               <div className={`absolute inset-0 bg-[linear-gradient(${isAurora ? 'rgba(0,0,0,0.02)' : isCyberSec ? 'rgba(100,255,218,0.05)' : 'rgba(255,255,255,0.02)'}_1px,transparent_1px),linear-gradient(90deg,${isAurora ? 'rgba(0,0,0,0.02)' : isCyberSec ? 'rgba(100,255,218,0.05)' : 'rgba(255,255,255,0.02)'}_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none`}></div>
            </div>

            <div className={`h-24 border-t ${colors.border} grid grid-cols-4 divide-x ${colors.border} z-20 bg-opacity-50`}>
               {[
                 { l: 'REQ/S', v: '8,922' },
                 { l: 'BW', v: '4.2 TB' },
                 { l: 'ERR', v: '0.01%' },
                 { l: 'NODES', v: '142' }
               ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center justify-center">
                     <span className={`text-[10px] ${colors.textSecondary} mb-1`}>{s.l}</span>
                     <span className={`text-lg font-bold ${colors.textPrimary}`}>{s.v}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* SIDE PANELS */}
         <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className={`${colors.bgPanel} border ${colors.border} rounded-xl p-4 flex-1 min-h-[200px] flex flex-col`}>
               <div className="flex justify-between items-center mb-4">
                 <h4 className={`${isCyberSec ? 'text-[#64ffda]' : 'text-red-400'} font-bold flex items-center`}>
                   <ShieldAlert className="w-4 h-4 mr-2" /> SECURITY
                 </h4>
               </div>
               <div className="flex-1 bg-black/5 rounded border border-dashed border-opacity-20 border-current p-2 font-mono text-xs overflow-hidden relative">
                  <div className="text-slate-500 space-y-1">
                     <p>> SCANNING PORT 443...</p>
                     <p className={isAurora ? 'text-slate-700' : isCyberSec ? 'text-[#8892b0]' : 'text-white'}>> DETECTED IP 192.168.1.42</p>
                     <p>> BLOCKING ATTACK VECTOR...</p>
                     <p>> FIREWALL: <span className="text-green-500">ACTIVE</span></p>
                     <p>> ENCRYPTION: AES-256</p>
                  </div>
               </div>
            </div>

            <div className={`${colors.bgPanel} border ${colors.border} rounded-xl p-4 flex-1`}>
               <h4 className={`${colors.textPrimary} font-bold mb-4 flex items-center`}>
                  <Server className="w-4 h-4 mr-2" /> SERVER LOAD
               </h4>
               <div className="space-y-4">
                  {[
                    { n: 'CPU_CORE_0', v: 45 },
                    { n: 'CPU_CORE_1', v: 62 },
                    { n: 'MEMORY', v: 28 }
                  ].map((item, i) => (
                     <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                           <span className={colors.textSecondary}>{item.n}</span>
                           <span className={colors.textPrimary}>{item.v}%</span>
                        </div>
                        <div className={`w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden`}>
                           <div className={`h-full ${isAurora ? 'bg-indigo-500' : isCyberSec ? 'bg-[#64ffda]' : isBlockchain ? 'bg-[#F7931A]' : 'bg-cyan-500'}`} style={{ width: `${item.v}%` }}></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className={`${colors.bgPanel} border ${colors.border} rounded-xl p-8 animate-fade-in max-w-4xl mx-auto ${isCyberSec ? 'font-mono' : ''}`}>
       <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-8 flex items-center border-b ${colors.border} pb-4`}>
         <SettingsIcon className="w-6 h-6 mr-3" /> {t.settings.title}
       </h2>

       {/* Payment Config (New) */}
       <div className="mb-10">
          <h3 className={`${colors.accent} font-bold mb-4 flex items-center text-sm uppercase tracking-wider`}>
             <CreditCard className="w-4 h-4 mr-2" /> {t.settings.paymentSection}
          </h3>
          <div className={`p-4 border ${colors.border} rounded flex items-center justify-between`}>
             <div>
                 <div className={`font-bold ${colors.textPrimary}`}>{t.settings.enablePayment}</div>
                 <div className={`text-xs ${colors.textSecondary} mt-1`}>Accept USDT/ETH payments securely.</div>
             </div>
             <button onClick={onTogglePayment} className={`text-2xl ${paymentEnabled ? 'text-green-500' : colors.textSecondary}`}>
                 {paymentEnabled ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
             </button>
          </div>
       </div>

       {/* Menu Config (New) */}
       <div className="mb-10">
          <h3 className={`${colors.accent} font-bold mb-4 flex items-center text-sm uppercase tracking-wider`}>
             <List className="w-4 h-4 mr-2" /> {t.settings.menuSection}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input 
                 type="text" 
                 placeholder={t.settings.menuLabel} 
                 value={newMenuLabel}
                 onChange={(e) => setNewMenuLabel(e.target.value)}
                 className={`bg-black/5 border ${colors.border} rounded p-2 ${colors.textPrimary} outline-none`}
              />
              <input 
                 type="text" 
                 placeholder={t.settings.menuLink} 
                 value={newMenuLink}
                 onChange={(e) => setNewMenuLink(e.target.value)}
                 className={`bg-black/5 border ${colors.border} rounded p-2 ${colors.textPrimary} outline-none`}
              />
              <button 
                  onClick={handleAddMenu}
                  className={`bg-black/10 border ${colors.border} text-${isMatrix ? 'green-500' : 'cyan-500'} hover:bg-white/5 p-2 rounded flex items-center justify-center`}
              >
                  <Plus className="w-4 h-4 mr-2" /> {t.settings.addMenuItem}
              </button>
          </div>

          <div className={`border ${colors.border} rounded overflow-hidden`}>
              {navItems.map(item => (
                  <div key={item.id} className={`p-3 border-b ${colors.border} last:border-0 flex justify-between items-center bg-black/5`}>
                      <div>
                          <span className={`font-bold ${colors.textPrimary} mr-4`}>{item.label}</span>
                          <span className={`text-xs ${colors.textSecondary} font-mono`}>{item.link}</span>
                      </div>
                      <button 
                          onClick={() => onRemoveNavItem && onRemoveNavItem(item.id)}
                          className="text-red-500 hover:text-red-400"
                      >
                          <Trash className="w-4 h-4" />
                      </button>
                  </div>
              ))}
              {navItems.length === 0 && (
                  <div className={`p-4 text-center ${colors.textSecondary} text-sm`}>No custom menu items.</div>
              )}
          </div>
       </div>

       {/* SMTP Config */}
       <div className="mb-10">
          <h3 className={`${colors.accent} font-bold mb-4 flex items-center text-sm uppercase tracking-wider`}>
             <Mail className="w-4 h-4 mr-2" /> {t.settings.smtpSection}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary} mb-2`}>{t.settings.host}</label>
                <input type="text" className={`w-full bg-black/5 border ${colors.border} rounded p-3 ${colors.textPrimary} focus:border-current outline-none`} placeholder="smtp.gmail.com" />
             </div>
             <div>
                <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary} mb-2`}>{t.settings.port}</label>
                <input type="text" className={`w-full bg-black/5 border ${colors.border} rounded p-3 ${colors.textPrimary} focus:border-current outline-none`} placeholder="587" />
             </div>
             <div>
                <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary} mb-2`}>{t.settings.user}</label>
                <input type="text" className={`w-full bg-black/5 border ${colors.border} rounded p-3 ${colors.textPrimary} focus:border-current outline-none`} placeholder="user@domain.com" />
             </div>
             <div>
                <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary} mb-2`}>{t.settings.pass}</label>
                <input type="password" className={`w-full bg-black/5 border ${colors.border} rounded p-3 ${colors.textPrimary} focus:border-current outline-none`} placeholder="••••••••" />
             </div>
          </div>
       </div>

       <div className="flex justify-end">
          <button className={`px-6 py-3 rounded font-bold text-sm shadow-lg transition-all flex items-center ${
             isMatrix 
               ? 'bg-green-600 text-black hover:bg-green-500' 
               : isCrimson
                 ? 'bg-red-700 text-white hover:bg-red-600 skew-x-[-10deg]'
                 : isAurora
                   ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                   : isCyberSec
                     ? 'bg-transparent border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'
                     : isBlockchain
                       ? 'bg-[#F7931A] text-black hover:opacity-80'
               : 'bg-cyan-600 text-white hover:bg-cyan-500'
          }`}>
             <Save className="w-4 h-4 mr-2" /> {t.settings.save}
          </button>
       </div>
    </div>
  );

  const renderPublish = () => (
    // ... Existing publish logic
    <div className={`${colors.bgPanel} border ${colors.border} rounded-xl p-8 animate-fade-in max-w-4xl mx-auto`}>
       <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-6 flex items-center`}>
         <PlusCircle className="w-6 h-6 mr-3" /> {t.publish.title}
       </h2>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
             <div>
                <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary} mb-2`}>{t.publish.productName}</label>
                <input type="text" className={`w-full bg-black/5 border ${colors.border} rounded p-3 ${colors.textPrimary} focus:border-current outline-none`} placeholder="e.g. Matrix Admin Template" />
             </div>
             {/* ... Inputs ... */}
              <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary} mb-2`}>{t.publish.category}</label>
                  <select className={`w-full bg-black/5 border ${colors.border} rounded p-3 ${colors.textPrimary} outline-none`}>
                     <option>SaaS</option>
                     <option>Mobile</option>
                     <option>Crypto</option>
                  </select>
               </div>
               <div>
                  <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary} mb-2`}>{t.publish.price}</label>
                  <div className="relative">
                    <DollarSign className={`absolute left-3 top-3 w-4 h-4 ${colors.textSecondary}`} />
                    <input type="number" className={`w-full bg-black/5 border ${colors.border} rounded p-3 pl-10 ${colors.textPrimary} focus:border-current outline-none`} placeholder="49.00" />
                  </div>
               </div>
             </div>

             <div>
                <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary} mb-2`}>{t.publish.description}</label>
                <textarea rows={5} className={`w-full bg-black/5 border ${colors.border} rounded p-3 ${colors.textPrimary} focus:border-current outline-none resize-none`} placeholder="Describe your product features..."></textarea>
             </div>
          </div>

          <div className="space-y-6">
             <label className={`block text-xs uppercase tracking-wider ${colors.textSecondary}`}>{t.publish.upload}</label>
             <div className={`border-2 border-dashed ${colors.border} rounded-xl h-64 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-black/5 transition-colors group`}>
                <div className={`p-4 rounded-full bg-black/5 mb-4 group-hover:scale-110 transition-transform`}>
                   <Upload className={`w-8 h-8 ${colors.accent}`} />
                </div>
                <p className={`${colors.textPrimary} font-medium mb-1`}>{t.publish.dragDrop}</p>
                <p className={`text-xs ${colors.textSecondary}`}>ZIP, RAR (Max 500MB)</p>
             </div>

             <div className={`p-4 rounded border ${colors.border} bg-black/5 flex items-center`}>
                <FileText className={`w-5 h-5 mr-3 ${colors.textSecondary}`} />
                <div className="flex-1">
                   <div className={`text-sm ${colors.textPrimary}`}>Documentation.pdf</div>
                   <div className={`text-xs ${colors.textSecondary}`}>Optional</div>
                </div>
                <button className={`text-xs ${colors.accent} hover:underline`}>Add</button>
             </div>

             <button className={`w-full py-4 rounded font-bold text-lg shadow-lg transition-all ${
               isMatrix 
                 ? 'bg-green-600 text-black hover:bg-green-500 hover:shadow-[0_0_15px_#00ff00]' 
                 : isCrimson
                   ? 'bg-red-700 text-white hover:bg-red-600 rounded-none transform skew-x-[-10deg]'
                   : isAurora
                     ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                     : isCyberSec
                       ? 'bg-transparent border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'
                       : isBlockchain
                         ? 'bg-[#F7931A] text-black hover:opacity-80'
                 : 'bg-cyan-600 text-white hover:bg-cyan-500'
             }`}>
                {t.publish.submit}
             </button>
          </div>
       </div>
    </div>
  );

  return (
    <div className={`h-screen w-full ${colors.bgMain} ${colors.textPrimary} flex overflow-hidden ${isMatrix ? 'font-mono' : isCrimson ? 'font-sans' : isCyberSec ? 'font-mono' : 'font-sans'} selection:${isMatrix ? 'bg-green-900' : isCrimson ? 'bg-red-900' : isAurora ? 'bg-indigo-200' : isCyberSec ? 'bg-[#233554]' : isBlockchain ? 'bg-[#F7931A]/30' : 'bg-cyan-900'}`}>
      
      {/* Sidebar - Collapsible */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} ${colors.bgPanel} backdrop-blur-md border-r ${colors.border} flex flex-col z-20 transition-all duration-300`}>
        {/* Header Toggle */}
        <div className={`h-20 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-6'} border-b ${colors.border}`}>
           {!isSidebarCollapsed && (
             <div className="flex items-center">
                {isAurora ? <Sparkles className="w-6 h-6 text-indigo-500 mr-2" /> : isCyberSec ? <ShieldCheck className="w-6 h-6 text-[#64ffda] mr-2" /> : isBlockchain ? <Blocks className="w-6 h-6 text-[#F7931A] mr-2" /> : <Activity className={`w-6 h-6 ${colors.accent} mr-2`} />}
                <span className="font-bold tracking-wider">NEXUS<span className={colors.accent}>OS</span></span>
             </div>
           )}
           <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className={`${colors.textSecondary} hover:${colors.textPrimary}`}>
              {isSidebarCollapsed ? <Menu className="w-6 h-6" /> : <ChevronLeft className="w-5 h-5" />}
           </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6 space-y-1">
          {[
            { id: 'overview', icon: LayoutDashboard, label: t.menu.overview },
            { id: 'products', icon: Package, label: t.menu.products },
            { id: 'publish', icon: PlusCircle, label: t.menu.publish },
            { id: 'orders', icon: ShoppingBag, label: t.menu.orders },
            { id: 'users', icon: Users, label: t.menu.users },
            { id: 'settings', icon: SettingsIcon, label: t.menu.settings },
            { id: 'monitoring', icon: Globe, label: t.menu.monitoring },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-4 transition-all border-l-4 ${
                activeTab === item.id 
                  ? `${colors.borderHighlight} ${isAurora ? 'bg-indigo-50' : 'bg-white/5'} ${colors.textPrimary}` 
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-black/5'
              }`}
              title={item.label}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? colors.accent : ''}`} />
              {!isSidebarCollapsed && <span className="ml-4 font-medium tracking-wide text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t ${colors.border}`}>
           <button 
             onClick={onExit}
             className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} px-2 py-2 text-red-400 hover:bg-red-500/10 rounded transition-colors`}
           >
             <LogOut className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
             {!isSidebarCollapsed && <span>{t.exit}</span>}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
             style={{
               backgroundImage: `linear-gradient(${isMatrix ? '#003300' : isCrimson ? '#330000' : isAurora ? '#e2e8f0' : isCyberSec ? '#112240' : isBlockchain ? '#333' : '#0f172a'} 1px, transparent 1px), linear-gradient(90deg, ${isMatrix ? '#003300' : isCrimson ? '#330000' : isAurora ? '#e2e8f0' : isCyberSec ? '#112240' : isBlockchain ? '#333' : '#0f172a'} 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
        </div>

        {/* Header */}
        <header className={`h-20 border-b ${colors.border} flex justify-between items-center px-8 bg-black/5 backdrop-blur-sm z-10`}>
           <div className="flex items-center">
              <h2 className="text-xl font-bold uppercase tracking-widest flex items-center">
                <Layers className={`w-5 h-5 mr-3 ${colors.accent}`} />
                {t.menu[activeTab as keyof typeof t.menu]}
              </h2>
           </div>

           <div className="flex items-center space-x-6 text-xs">
              <div className="hidden md:flex items-center space-x-4">
                 <div className={`flex items-center ${colors.textSecondary}`}><Wifi className="w-4 h-4 mr-2" /> {t.connected}</div>
                 <div className={`flex items-center ${colors.textSecondary}`}><Cpu className="w-4 h-4 mr-2" /> 42ms {t.latency}</div>
              </div>
              <div className={`h-8 w-px ${colors.border}`}></div>
              <div className="text-right">
                <div className={`text-lg font-bold ${colors.textPrimary}`}>{currentTime.toLocaleTimeString()}</div>
                <div className={colors.textSecondary}>{currentTime.toLocaleDateString()}</div>
              </div>
           </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 p-8 overflow-y-auto z-10 relative">
          
          {/* Top Metrics (Visible on overview) */}
          {(activeTab === 'overview' || activeTab === 'monitoring') && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { l: t.widgets.revenue, v: '$842k', t: '+14%', i: TrendingUp, c: isMatrix ? 'text-green-500' : isCrimson ? 'text-red-500' : isAurora ? 'text-amber-500' : isCyberSec ? 'text-[#64ffda]' : isBlockchain ? 'text-[#F7931A]' : 'text-cyan-400' },
                { l: t.widgets.activeSessions, v: '4,291', t: '+5%', i: Users, c: isMatrix ? 'text-green-500' : isCrimson ? 'text-white' : isAurora ? 'text-indigo-500' : isCyberSec ? 'text-[#ccd6f6]' : isBlockchain ? 'text-[#eaeaea]' : 'text-purple-400' },
                { l: t.widgets.serverLoad, v: '32%', t: '-2%', i: Server, c: isMatrix ? 'text-green-500' : isCrimson ? 'text-white' : isAurora ? 'text-green-500' : isCyberSec ? 'text-[#64ffda]' : isBlockchain ? 'text-[#888]' : 'text-green-400' },
                { l: t.widgets.threats, v: '142', t: '+12', i: ShieldAlert, c: 'text-red-500' },
              ].map((s, i) => (
                <div key={i} className={`${colors.bgPanel} border ${colors.border} p-5 rounded-xl hover:border-current transition-colors shadow-sm`}>
                    <div className="flex justify-between items-start mb-2">
                       <span className={`text-[10px] uppercase ${colors.textSecondary}`}>{s.l}</span>
                       <s.i className={`w-4 h-4 ${s.c}`} />
                    </div>
                    <div className="flex items-baseline">
                       <span className={`text-2xl font-bold ${colors.textPrimary} mr-2`}>{s.v}</span>
                       <span className={`text-xs ${s.t.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{s.t}</span>
                    </div>
                </div>
              ))}
            </div>
          )}

          {/* Dynamic Views */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'monitoring' && renderOverview()} 
          {activeTab === 'publish' && renderPublish()}
          {activeTab === 'settings' && renderSettings()}
          
          {(activeTab === 'products' || activeTab === 'orders' || activeTab === 'users' || activeTab === 'system') && (
             <div className="flex items-center justify-center h-64 border-2 border-dashed border-opacity-20 border-current rounded-xl">
                <p className={colors.textSecondary}>MODULE [{activeTab.toUpperCase()}] LOADED...</p>
             </div>
          )}

        </div>
      </main>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${isMatrix || isCrimson ? '#000' : isAurora ? '#f1f5f9' : isCyberSec ? '#020c1b' : isBlockchain ? '#1a1a1a' : '#050b14'}; }
        ::-webkit-scrollbar-thumb { background: ${isMatrix ? '#003300' : isCrimson ? '#330000' : isAurora ? '#cbd5e1' : isCyberSec ? '#112240' : isBlockchain ? '#333' : '#1e293b'}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${isMatrix ? '#005500' : isCrimson ? '#550000' : isAurora ? '#94a3b8' : isCyberSec ? '#233554' : isBlockchain ? '#F7931A' : '#334155'}; }
        .blink { animation: blink 1s infinite; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;