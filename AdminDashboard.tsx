import React, { useState, useEffect } from 'react';
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
  Bell,
  Search,
  MapPin,
  TrendingUp,
  ShieldAlert,
  HardDrive,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n';

interface AdminDashboardProps {
  language: Language;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language, onExit }) => {
  const t = TRANSLATIONS[language].admin;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  
  // Update time for the top bar
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currencyPrefix = language === 'zh' ? '¥' : '$';

  // Mock Live Logs
  const liveLogs = [
    { time: '10:42:01', msg: 'New user registration: @cyber_punk', type: 'info' },
    { time: '10:42:05', msg: 'Transaction verified: #TXN-9982', type: 'success' },
    { time: '10:42:12', msg: 'API Latency spike detected (120ms)', type: 'warning' },
    { time: '10:42:25', msg: 'System backup completed', type: 'info' },
    { time: '10:42:33', msg: 'Bot attack blocked: IP 192.168.x.x', type: 'danger' },
  ];

  // --- RENDER FUNCTIONS ---

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[600px] animate-fade-in">
       {/* Center Map / Main Visual */}
       <div className="lg:col-span-2 bg-[#0d1626] border border-cyan-900/30 rounded-xl relative overflow-hidden flex flex-col min-h-[400px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0d1626_90%)] z-10 pointer-events-none"></div>
          
          <div className="p-6 border-b border-cyan-900/30 flex justify-between items-center z-20 bg-[#0d1626]/80 backdrop-blur">
            <h3 className="text-cyan-400 font-bold uppercase tracking-widest flex items-center">
              <Globe className="w-4 h-4 mr-2" /> {t.widgets.mapTitle}
            </h3>
            <div className="flex space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs text-red-400">LIVE</span>
            </div>
          </div>

          {/* Simulated Map Area */}
          <div className="flex-1 relative flex items-center justify-center">
             {/* Grid Lines for Map */}
             <div className="absolute inset-0 w-full h-full opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    transform: 'perspective(500px) rotateX(20deg) scale(1.2)'
                  }}
             ></div>

             {/* World Map Silhouette (Simplified CSS/SVG) */}
             <div className="relative w-[80%] h-[60%] opacity-60">
                <svg viewBox="0 0 100 50" className="w-full h-full fill-cyan-900/40 stroke-cyan-500/50 stroke-[0.2]">
                   <path d="M10,20 Q15,10 25,15 T40,10 T60,15 T80,5 L90,10 L95,30 L80,40 L60,35 L40,45 L20,35 L10,40 Z" />
                   {/* Random Ping Dots */}
                   <circle cx="20" cy="25" r="1" className="fill-white animate-ping" />
                   <circle cx="45" cy="15" r="1" className="fill-white animate-ping" style={{animationDelay: '1s'}} />
                   <circle cx="70" cy="30" r="1" className="fill-white animate-ping" style={{animationDelay: '2s'}} />
                   <circle cx="85" cy="10" r="1" className="fill-white animate-ping" style={{animationDelay: '0.5s'}} />
                </svg>
                {/* Scanning Line */}
                <div className="absolute top-0 left-0 h-full w-1 bg-cyan-400/50 shadow-[0_0_20px_#22d3ee] animate-[scan_4s_linear_infinite]"></div>
             </div>
          </div>

          {/* Bottom Stats Overlay */}
          <div className="h-32 border-t border-cyan-900/30 bg-[#0a1120] grid grid-cols-3 divide-x divide-cyan-900/30 z-20">
             {[
               { label: t.widgets.requestRate, val: '45k/s' },
               { label: t.widgets.throughput, val: '1.2 GB/s' },
               { label: t.widgets.nodes, val: '842' },
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center justify-center p-4">
                  <span className="text-slate-500 text-xs uppercase mb-1">{item.label}</span>
                  <span className="text-2xl font-bold text-white">{item.val}</span>
               </div>
             ))}
          </div>
       </div>

       {/* Right Panel - Activity & System */}
       <div className="flex flex-col gap-6">
          
          {/* Live Activity Feed */}
          <div className="flex-1 bg-[#0d1626] border border-cyan-900/30 rounded-xl overflow-hidden flex flex-col min-h-[250px]">
             <div className="p-4 border-b border-cyan-900/30 bg-cyan-900/10">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">{t.widgets.liveLogs}</h3>
             </div>
             <div className="flex-1 p-4 font-mono text-xs space-y-3 overflow-hidden relative">
                {liveLogs.map((log, i) => (
                  <div key={i} className="flex items-start space-x-2 animate-fade-in-up" style={{animationDelay: `${i * 100}ms`}}>
                     <span className="text-slate-500">[{log.time}]</span>
                     <span className={`${log.type === 'danger' ? 'text-red-400' : log.type === 'warning' ? 'text-yellow-400' : log.type === 'success' ? 'text-green-400' : 'text-cyan-300'}`}>
                       {log.type.toUpperCase()}:
                     </span>
                     <span className="text-slate-300">{log.msg}</span>
                  </div>
                ))}
                {/* Gradient Fade for scrolling effect */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0d1626] to-transparent pointer-events-none"></div>
             </div>
          </div>

          {/* Product Performance Mini-Table */}
          <div className="h-1/2 bg-[#0d1626] border border-cyan-900/30 rounded-xl overflow-hidden flex flex-col min-h-[250px]">
             <div className="p-4 border-b border-cyan-900/30 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.widgets.topProducts}</h3>
                <button className="text-xs text-cyan-400 hover:text-cyan-300">View All</button>
             </div>
             <div className="flex-1 p-2 overflow-y-auto">
                <table className="w-full text-left text-xs">
                   <tbody className="divide-y divide-cyan-900/20">
                      {MOCK_PRODUCTS.slice(0, 4).map(p => (
                         <tr key={p.id} className="hover:bg-white/5">
                            <td className="p-2 text-white font-medium truncate max-w-[100px]">{p.title}</td>
                            <td className="p-2 text-slate-400">{p.sales} {t.table.sales}</td>
                            <td className="p-2 text-right text-cyan-400">{currencyPrefix}{p.price}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

       </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-[#0d1626] border border-cyan-900/30 rounded-xl overflow-hidden animate-fade-in h-full flex flex-col">
       <div className="p-6 border-b border-cyan-900/30 flex justify-between items-center bg-[#0a1120]">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Package className="w-5 h-5 mr-3 text-cyan-400" />
            {t.menu.products}
          </h3>
          <div className="flex space-x-4">
             <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input type="text" placeholder="Search ID..." className="bg-[#050b14] border border-cyan-900/50 rounded pl-10 pr-4 py-2 text-sm text-cyan-100 focus:border-cyan-400 outline-none" />
             </div>
             <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded">
                + ADD NEW
             </button>
          </div>
       </div>
       <div className="flex-1 overflow-auto">
          <table className="w-full text-left">
             <thead className="bg-[#050b14] text-xs uppercase text-slate-500 font-medium sticky top-0 z-10">
                <tr>
                   <th className="px-6 py-4">{t.table.product}</th>
                   <th className="px-6 py-4">Category</th>
                   <th className="px-6 py-4">{t.table.price}</th>
                   <th className="px-6 py-4">{t.table.sales}</th>
                   <th className="px-6 py-4">{t.table.status}</th>
                   <th className="px-6 py-4 text-right">{t.table.action}</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-cyan-900/10 text-sm">
                {MOCK_PRODUCTS.map((p) => (
                   <tr key={p.id} className="hover:bg-cyan-900/10 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center">
                            <img src={p.image} className="w-8 h-8 rounded border border-cyan-900/50 mr-3" alt="" />
                            <span className="text-white font-medium">{p.title}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{p.category}</td>
                      <td className="px-6 py-4 text-cyan-300 font-mono">{currencyPrefix}{p.price}</td>
                      <td className="px-6 py-4 text-slate-300">
                         <div className="flex items-center">
                            <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden mr-2">
                               <div className="h-full bg-cyan-500" style={{width: `${Math.min(p.sales/10, 100)}%`}}></div>
                            </div>
                            {p.sales}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-900/30 text-green-400 border border-green-500/20">ACTIVE</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-slate-500 hover:text-cyan-400"><MoreHorizontal className="w-4 h-4" /></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );

  const renderOrders = () => {
    // Mock orders extended for visualization
    const orders = Array(10).fill(0).map((_, i) => ({
       id: `ORD-${8832 + i}`,
       product: MOCK_PRODUCTS[i % MOCK_PRODUCTS.length].title,
       user: `user_${100+i}`,
       amount: MOCK_PRODUCTS[i % MOCK_PRODUCTS.length].price,
       status: i % 3 === 0 ? 'Processing' : 'Completed',
       time: `${i * 5 + 2} min ago`
    }));

    return (
      <div className="bg-[#0d1626] border border-cyan-900/30 rounded-xl overflow-hidden animate-fade-in h-full flex flex-col">
         <div className="p-6 border-b border-cyan-900/30 flex justify-between items-center bg-[#0a1120]">
            <h3 className="text-lg font-bold text-white flex items-center">
               <ShoppingBag className="w-5 h-5 mr-3 text-purple-400" />
               {t.menu.orders}
            </h3>
         </div>
         <div className="flex-1 overflow-auto p-6 grid grid-cols-1 gap-4">
            {orders.map((order, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-[#050b14] border border-cyan-900/20 rounded-lg hover:border-purple-500/50 transition-all">
                  <div className="flex items-center space-x-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'Completed' ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'}`}>
                        {order.status === 'Completed' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-sm">{order.id}</h4>
                        <p className="text-xs text-slate-500">{order.product}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center space-x-8 text-sm">
                     <div className="hidden md:block text-slate-400">{order.user}</div>
                     <div className="hidden md:block text-slate-500">{order.time}</div>
                     <div className="font-mono font-bold text-cyan-300 w-20 text-right">{currencyPrefix}{order.amount}</div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    );
  };

  const renderSystem = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full animate-fade-in">
       {/* CPU / MEM / DISK Circular Stats */}
       {[
          { label: 'CPU Usage', val: 42, color: '#22d3ee', icon: Cpu },
          { label: 'Memory', val: 68, color: '#a855f7', icon: Zap },
          { label: 'Storage', val: 24, color: '#10b981', icon: HardDrive },
       ].map((stat, i) => (
          <div key={i} className="bg-[#0d1626] border border-cyan-900/30 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="10" fill="none" />
                   <circle 
                     cx="80" cy="80" r="70" 
                     stroke={stat.color} 
                     strokeWidth="10" 
                     fill="none" 
                     strokeDasharray="440"
                     strokeDashoffset={440 - (440 * stat.val) / 100}
                     className="transition-all duration-1000 ease-out"
                   />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                   <stat.icon className="w-8 h-8 mb-1" style={{color: stat.color}} />
                   <span className="text-3xl font-bold text-white">{stat.val}%</span>
                </div>
             </div>
             <h3 className="text-slate-400 uppercase tracking-widest text-sm">{stat.label}</h3>
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
       ))}

       {/* Server Status List */}
       <div className="lg:col-span-3 bg-[#0d1626] border border-cyan-900/30 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center">
             <Server className="w-5 h-5 mr-2 text-cyan-400" /> Node Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {['US-East-1', 'EU-West-2', 'Asia-Pacific', 'SA-East'].map((region, i) => (
                <div key={i} className="bg-[#050b14] p-4 rounded border border-cyan-900/20 flex items-center justify-between">
                   <span className="text-slate-300 text-sm">{region}</span>
                   <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-400">ONLINE</span>
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-[#0d1626] border border-cyan-900/30 rounded-xl overflow-hidden animate-fade-in h-full p-6">
        <h3 className="text-lg font-bold text-white flex items-center mb-6">
            <Users className="w-5 h-5 mr-3 text-blue-400" />
            {t.menu.users}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
           {Array(24).fill(0).map((_, i) => (
              <div key={i} className="bg-[#050b14] border border-cyan-900/20 rounded-lg p-4 flex flex-col items-center hover:border-cyan-500/50 transition-all cursor-pointer group">
                 <div className="relative">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user_${i}`} className="w-12 h-12 rounded-full mb-3 bg-slate-800" alt="" />
                    <div className={`absolute bottom-3 right-0 w-3 h-3 rounded-full border-2 border-[#050b14] ${i % 5 === 0 ? 'bg-slate-500' : 'bg-green-500'}`}></div>
                 </div>
                 <span className="text-white text-xs font-bold mb-1">User_{100+i}</span>
                 <span className="text-slate-500 text-[10px] uppercase">{i % 3 === 0 ? 'Developer' : 'Buyer'}</span>
              </div>
           ))}
        </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#050b14] text-cyan-50 flex overflow-hidden font-mono selection:bg-cyan-500/30">
      
      {/* Sidebar - Control Panel */}
      <aside className="w-20 lg:w-64 bg-[#0a1120] border-r border-cyan-900/30 flex flex-col z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-cyan-900/30 relative overflow-hidden">
           <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
           <Activity className="w-8 h-8 text-cyan-400 mr-0 lg:mr-3" />
           <div className="hidden lg:block">
             <h1 className="text-xl font-bold tracking-wider text-white">NEXUS<span className="text-cyan-400">OS</span></h1>
             <p className="text-[10px] text-cyan-600 tracking-[0.2em] uppercase">{t.subtitle}</p>
           </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-8 space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: t.menu.overview },
            { id: 'monitoring', icon: Globe, label: t.menu.monitoring },
            { id: 'products', icon: Package, label: t.menu.products },
            { id: 'orders', icon: ShoppingBag, label: t.menu.orders },
            { id: 'users', icon: Users, label: t.menu.users },
            { id: 'system', icon: Server, label: t.menu.system },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 lg:px-6 py-4 transition-all border-l-4 ${
                activeTab === item.id 
                  ? 'border-cyan-400 bg-cyan-900/20 text-white shadow-[inset_10px_0_20px_rgba(34,211,238,0.1)]' 
                  : 'border-transparent text-slate-500 hover:text-cyan-300 hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'animate-pulse text-cyan-400' : ''}`} />
              <span className="hidden lg:block ml-4 font-medium tracking-wide">{item.label}</span>
              {activeTab === item.id && <div className="ml-auto hidden lg:block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-cyan-900/30">
           <button 
             onClick={onExit}
             className="w-full flex items-center justify-center lg:justify-start px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
           >
             <LogOut className="w-5 h-5 lg:mr-3" />
             <span className="hidden lg:block">{t.exit}</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050b14] to-[#050b14]">
        
        {/* Grid Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Top Header Bar */}
        <header className="h-20 border-b border-cyan-900/30 flex justify-between items-center px-8 bg-[#0a1120]/80 backdrop-blur-md z-10">
           <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center">
                <span className="w-2 h-8 bg-cyan-500 mr-4 rounded-sm"></span>
                {t.menu[activeTab as keyof typeof t.menu]}
              </h2>
              <span className="px-2 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded text-xs text-cyan-300">v2.5.0 STABLE</span>
           </div>

           <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6 text-sm text-cyan-500/80">
                 <div className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> {t.connected}</div>
                 <div className="flex items-center"><Cpu className="w-4 h-4 mr-2" /> 42ms {t.latency}</div>
              </div>
              <div className="h-8 w-px bg-cyan-900/50"></div>
              <div className="text-right">
                <div className="text-xl font-bold text-white tracking-widest">{currentTime.toLocaleTimeString()}</div>
                <div className="text-xs text-slate-500 uppercase">{currentTime.toLocaleDateString()}</div>
              </div>
           </div>
        </header>

        {/* Dashboard Content Grid */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto z-10">
          
          {/* Top Key Metrics Row - Always Visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             {[
               { label: t.widgets.revenue, value: '$842,291', trend: '+14%', color: 'cyan', icon: TrendingUp },
               { label: t.widgets.activeSessions, value: '4,291', trend: '+5%', color: 'purple', icon: Users },
               { label: t.widgets.serverLoad, value: '32%', trend: '-2%', color: 'green', icon: Server },
               { label: t.widgets.threats, value: '142', trend: '+12', color: 'red', icon: ShieldAlert },
             ].map((stat, i) => (
               <div key={i} className="relative bg-[#0d1626] border border-cyan-900/30 p-6 rounded-xl overflow-hidden group hover:border-cyan-500/50 transition-colors">
                  <div className={`absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity text-${stat.color}-400`}>
                    <stat.icon className="w-12 h-12" />
                  </div>
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-white mr-4 text-shadow-glow">{stat.value}</span>
                    <span className={`text-sm mb-1 ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.trend}</span>
                  </div>
                  {/* Animated Bar at bottom */}
                  <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
                    <div className={`h-full bg-${stat.color}-500 w-[70%] animate-pulse`}></div>
                  </div>
               </div>
             ))}
          </div>

          {/* Dynamic Content Area */}
          <div className="h-full pb-20">
             {activeTab === 'overview' && renderOverview()}
             {activeTab === 'monitoring' && renderOverview()} 
             {activeTab === 'products' && renderProducts()}
             {activeTab === 'orders' && renderOrders()}
             {activeTab === 'users' && renderUsers()}
             {activeTab === 'system' && renderSystem()}
          </div>
        </div>

      </main>

      <style>{`
        @keyframes scan {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(34,211,238,0.5);
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #050b14; 
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b; 
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #06b6d4; 
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;