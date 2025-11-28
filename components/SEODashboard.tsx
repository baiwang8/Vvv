import React, { useState } from 'react';
import { Sparkles, Globe, Search, Copy, CheckCircle, ArrowRight } from 'lucide-react';
import { generateSEOData } from '../services/geminiService';
import { SEOOptimizationResult, Language } from '../types';
import { TRANSLATIONS } from '../i18n';

interface SEODashboardProps {
  language: Language;
}

const SEODashboard: React.FC<SEODashboardProps> = ({ language }) => {
  const t = TRANSLATIONS[language].seo;
  const [inputTitle, setInputTitle] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SEOOptimizationResult | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!inputTitle || !inputDesc) {
      setError(language === 'zh' ? '请提供标题和描述' : 'Please provide both a title and a description.');
      return;
    }
    setError('');
    setIsGenerating(true);
    setResult(null);

    try {
      const data = await generateSEOData(inputTitle, inputDesc, language);
      setResult(data);
    } catch (err) {
      setError(language === 'zh' ? '生成失败，请检查API Key' : 'Failed to generate SEO data. Ensure API key is set.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2" /> {t.sourceDetails}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">{t.projectName}</label>
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder={t.projectPlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">{t.rawDesc}</label>
              <textarea
                value={inputDesc}
                onChange={(e) => setInputDesc(e.target.value)}
                placeholder={t.descPlaceholder}
                rows={6}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all resize-none placeholder:text-slate-600"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center transition-all ${
                isGenerating 
                ? 'bg-slate-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" /> {t.generating}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" /> {t.generate}
                </>
              )}
            </button>
            
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 relative min-h-[400px] shadow-xl backdrop-blur-sm">
          {!result && !isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 opacity-50">
              <Search className="w-16 h-16 mb-4 stroke-1" />
              <p>{t.results}</p>
            </div>
          )}

          {isGenerating && (
             <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
               <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
               <p className="text-cyan-400 animate-pulse">{t.analyzing}</p>
             </div>
          )}

          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Google Preview Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm font-sans select-none transform transition-all hover:scale-[1.01] duration-300">
                <div className="text-xs text-slate-500 mb-1 flex items-center">
                  <span className="bg-slate-200 rounded-full w-4 h-4 mr-2"></span>
                  codenexus.com › product › {result.suggestedUrlSlug}
                </div>
                <div className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer mb-1 truncate">
                  {result.optimizedTitle}
                </div>
                <div className="text-sm text-[#4d5156] line-clamp-2">
                  {result.metaDescription}
                </div>
              </div>

              {/* Data Cards */}
              <div className="space-y-4">
                 <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2 block">{t.keywords}</span>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((kw, i) => (
                        <span key={i} className="text-xs bg-cyan-900/30 text-cyan-300 px-2 py-1 rounded border border-cyan-500/20">
                          #{kw}
                        </span>
                      ))}
                    </div>
                 </div>

                 <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 group cursor-pointer relative">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2 block">{t.shareSnippet}</span>
                    <p className="text-sm text-slate-300 italic">"{result.socialShareText}"</p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
                    </div>
                 </div>
              </div>
              
              <div className="flex justify-end">
                <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center font-medium">
                   {t.apply} <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SEODashboard;