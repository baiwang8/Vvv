import React from 'react';
import { Code2, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Code2 className="text-cyan-500 w-8 h-8" />
              <span className="ml-2 text-xl font-bold text-white">CodeNexus</span>
            </div>
            <p className="text-slate-400 text-sm">
              The premium marketplace for high-quality source code, scripts, and plugins. Powered by AI.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">Popular Scripts</li>
              <li className="hover:text-cyan-400 cursor-pointer">New Arrivals</li>
              <li className="hover:text-cyan-400 cursor-pointer">SaaS Kits</li>
              <li className="hover:text-cyan-400 cursor-pointer">Mobile Apps</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Sellers</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">Start Selling</li>
              <li className="hover:text-cyan-400 cursor-pointer">Seller Dashboard</li>
              <li className="hover:text-cyan-400 cursor-pointer">AI SEO Tools</li>
              <li className="hover:text-cyan-400 cursor-pointer">API Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5"/></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5"/></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2024 CodeNexus Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
