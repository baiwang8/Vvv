import React from 'react';
import { User, Mail, Calendar, Settings, LogOut, Download, Box, CreditCard } from 'lucide-react';
import { TRANSLATIONS } from '../i18n';
import { Language, Product } from '../types';

interface UserProfileProps {
  language: Language;
}

const UserProfile: React.FC<UserProfileProps> = ({ language }) => {
  const t = TRANSLATIONS[language].profile;

  // Mock data for purchased items
  const purchasedItems = [
    { id: 101, title: 'CryptoExchange Pro', date: '2024-03-15', price: '$499', image: 'https://picsum.photos/800/600?random=1' },
    { id: 102, title: 'SaaSKit Enterprise', date: '2024-02-20', price: '$199', image: 'https://picsum.photos/800/600?random=2' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar / User Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl sticky top-24">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] mb-4 shadow-lg shadow-cyan-500/30">
                 <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full" />
                 </div>
              </div>
              <h2 className="text-xl font-bold text-white">Alex Developer</h2>
              <p className="text-slate-400 text-sm">Full Stack Engineer</p>
            </div>

            <div className="space-y-4 border-t border-slate-700/50 pt-6">
              <div className="flex items-center text-slate-300 text-sm">
                <Mail className="w-4 h-4 mr-3 text-cyan-500" />
                alex@codenexus.com
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <Calendar className="w-4 h-4 mr-3 text-cyan-500" />
                {t.memberSince} Jan 2024
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button className="w-full py-2 px-4 rounded-lg bg-slate-700/50 text-white hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Settings className="w-4 h-4 mr-2" /> {t.settings}
              </button>
              <button className="w-full py-2 px-4 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 flex items-center justify-center transition-all">
                <LogOut className="w-4 h-4 mr-2" /> {t.logout}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-2xl">
               <div className="flex items-center justify-between mb-4">
                 <span className="text-slate-400 text-sm">Total Purchases</span>
                 <Box className="w-5 h-5 text-cyan-400" />
               </div>
               <span className="text-3xl font-bold text-white">12</span>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-2xl">
               <div className="flex items-center justify-between mb-4">
                 <span className="text-slate-400 text-sm">Total Spent</span>
                 <CreditCard className="w-5 h-5 text-purple-400" />
               </div>
               <span className="text-3xl font-bold text-white">$1,240</span>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-2xl">
               <div className="flex items-center justify-between mb-4">
                 <span className="text-slate-400 text-sm">Downloads</span>
                 <Download className="w-5 h-5 text-green-400" />
               </div>
               <span className="text-3xl font-bold text-white">48</span>
            </div>
          </div>

          {/* Recent Purchases */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <h3 className="text-lg font-bold text-white">{t.purchases}</h3>
            </div>
            <div className="divide-y divide-slate-700/50">
              {purchasedItems.map(item => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-slate-700/20 transition-colors">
                  <div className="w-full sm:w-24 h-16 rounded-lg overflow-hidden bg-slate-900">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-white font-medium text-lg">{item.title}</h4>
                    <p className="text-slate-400 text-sm">Purchased on {item.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-bold">{item.price}</span>
                    <button className="flex items-center px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white transition-all text-sm font-medium">
                      <Download className="w-4 h-4 mr-2" /> {t.download}
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Empty state placeholder if needed */}
              {purchasedItems.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                  No purchases yet. Start exploring!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;