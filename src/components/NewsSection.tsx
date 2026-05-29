/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, Eye, ArrowRight, X, Sparkles, Megaphone, BellRing } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';

interface NewsSectionProps {
  articles: NewsArticle[];
}

export default function NewsSection({ articles }: NewsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'Semua'>('Semua');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const categories: (NewsCategory | 'Semua')[] = ['Semua', 'Artikel', 'Pengumuman', 'Event'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryTheme = (cat: NewsCategory) => {
    switch (cat) {
      case 'Pengumuman':
        return { bg: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400', emoji: '📢', label: 'PENTING' };
      case 'Event':
        return { bg: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400', emoji: '📅', label: 'EVENT' };
      default:
        return { bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400', emoji: '📝', label: 'ARTIKEL' };
    }
  };

  return (
    <div className="py-12 bg-white dark:bg-slate-900/20 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 bg-yellow-10s dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400 font-bold text-xs uppercase tracking-widest rounded-full">
            Berita &amp; Informasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
            Portal Informasi Sekolah
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Dapatkan liputan berita terkini, berkas pengumuman penting, dan jadwal event di TKIT Salsabila Bekasi.
          </p>
        </div>

        {/* Toolbar - Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-4 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 transform active:scale-95 ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berita atau info..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all dark:text-white"
            />
          </div>

        </div>

        {/* News Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Berita Tidak Ditemukan</h4>
            <p className="text-xs text-slate-400">Coba gunakan kata sandi pencarian atau filter kategori lainnya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const theme = getCategoryTheme(article.category);
              return (
                <motion.div
                  layout
                  key={article.id}
                  className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  
                  {/* Photo Visual / fallback ornament */}
                  <div className="relative h-44 bg-slate-100 dark:bg-slate-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-x-0 top-0 h-2 bg-emerald-600" />
                    <div className="p-8 text-center space-y-2">
                      <div className="text-4xl">{theme.emoji}</div>
                      <div className="text-[10px] tracking-widest font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                        {article.category}
                      </div>
                    </div>
                    
                    {/* Floating ribbon */}
                    <span className={`absolute top-4 left-4 px-2.5 py-1 text-[9px] font-black uppercase rounded-full ${theme.bg}`}>
                      {theme.label}
                    </span>
                  </div>

                  {/* Text panel */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex gap-4 items-center text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {article.date}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> {article.author}
                        </span>
                      </div>
                      
                      <h3 className="font-display font-bold text-base text-slate-950 dark:text-white line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 text-justify leading-relaxed">
                        {article.content}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-50 dark:border-slate-700/40 flex items-center justify-between">
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline inline-flex items-center gap-1.5">
                        Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                        <Eye className="w-3.5 h-3.5" /> {article.views} views
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

        {/* Complete Reading Overlay Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
              >
                
                {/* Visual Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                  <div className="space-y-1.5">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${getCategoryTheme(selectedArticle.category).bg}`}>
                      {selectedArticle.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-950 dark:text-white leading-tight mt-1">
                      {selectedArticle.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Meta details */}
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/30 flex flex-wrap gap-6 items-center text-xs text-slate-500 font-mono border-b border-light/10">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4 text-yellow-500" /> TKIT Salsabila Bekasi
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" /> {selectedArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-slate-400" /> Diposting oleh {selectedArticle.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-slate-400" /> {selectedArticle.views + 12} Views
                  </span>
                </div>

                {/* Long Text block */}
                <div className="p-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-justify font-sans">
                  {selectedArticle.content.split('\n\n').map((para, i) => (
                    <p key={i}>
                      {para}
                    </p>
                  ))}
                  
                  <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/25 p-4 border border-emerald-100 dark:border-emerald-900 text-xs flex gap-3 text-emerald-800 dark:text-emerald-300">
                    <BellRing className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
                    <div>
                      <strong>Informasi Sekolah:</strong> Bagi Ayah &amp; Bunda yang membutuhkan klarifikasi atau ingin mengajukan pertanyaan seputar berita/pengumuman di atas, silakan hubungi tim administrasi kami atau bicaralah dengan <strong>Salsa AI Assistant</strong> di pojok kanan bawah.
                    </div>
                  </div>
                </div>

                {/* Close Bottom Pane */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2 bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs rounded-xl"
                  >
                    Tutup Artikel
                  </button>
                  <a
                    href={`https://wa.me/622188983124?text=Saya%20ingin%20bertanya%20mengenai%20${encodeURIComponent(selectedArticle.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1 shadow-sm"
                  >
                    Tanyakan via WA
                  </a>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
