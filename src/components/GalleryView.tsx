/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, Filter, X, ZoomIn } from 'lucide-react';
import { GalleryCategory, GalleryItem } from '../types';

interface GalleryViewProps {
  items: GalleryItem[];
}

export default function GalleryView({ items }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory | 'Semua'>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories: (GalleryCategory | 'Semua')[] = [
    'Semua',
    'Belajar',
    'Outing Class',
    'Lomba',
    'Wisuda',
    'Kegiatan Keagamaan',
  ];

  // Map category to a gorgeous themed illustration gradient & emoji
  const getThemedThumb = (cat: GalleryCategory) => {
    switch (cat) {
      case 'Belajar':
        return { grad: 'from-blue-600 to-indigo-700', emoji: '✏️🧩' };
      case 'Outing Class':
        return { grad: 'from-orange-500 to-yellow-600', emoji: '🎡🚌' };
      case 'Lomba':
        return { grad: 'from-red-600 to-purple-700', emoji: '🏆🏁' };
      case 'Wisuda':
        return { grad: 'from-slate-700 to-slate-900', emoji: '🎓💐' };
      case 'Kegiatan Keagamaan':
        return { grad: 'from-emerald-600 to-teal-800', emoji: '🕌🕋' };
      default:
        return { grad: 'from-emerald-600 to-emerald-800', emoji: '🏫' };
    }
  };

  const filteredItems = activeFilter === 'Semua'
    ? items
    : items.filter(item => item.category === activeFilter);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-900/40 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 font-bold text-xs uppercase tracking-widest text-[#059669] rounded-full">
            Dokumentasi Sekolah
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
            Galeri Kegiatan Sekolah
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kilas balik momen keceriaan, belajar aktif, dan prestasi ananda di TKIT Salsabila Bekasi.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider mr-2">
            <Filter className="w-4 h-4 text-emerald-600" /> Filter Kategori:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 transform active:scale-95 ${
                activeFilter === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none'
                  : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:border-emerald-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid with staggered emergence layout */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Belum Ada Dokumentasi</h4>
            <p className="text-xs text-slate-400">Saat ini galeri pada kategori {activeFilter} masih kosong.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const theme = getThemedThumb(item.category);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/40 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedPhoto(item)}
                  >
                    {/* Interactive Thumbnail Photo area */}
                    <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                      
                      {/* Interactive CSS themed fallback card */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.grad} flex flex-col items-center justify-center p-4 text-center`}>
                        <span className="text-4xl drop-shadow mb-2 transform group-hover:scale-110 transition-transform duration-300">{theme.emoji}</span>
                        <span className="text-[10px] font-black uppercase text-yellow-300/80 tracking-widest">{item.category}</span>
                      </div>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-emerald-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-3 bg-white/20 backdrop-blur rounded-full text-white">
                          <ZoomIn className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata text area */}
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold rounded-full uppercase">
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          {item.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">
                        {item.title}
                      </h4>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox Popout Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full"
              >
                
                {/* Visual Banner */}
                <div className={`aspect-video bg-gradient-to-br ${getThemedThumb(selectedPhoto.category).grad} flex flex-col items-center justify-center p-8 relative`}>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="text-6xl text-white drop-shadow">
                    {getThemedThumb(selectedPhoto.category).emoji}
                  </div>
                  <span className="absolute bottom-4 left-6 px-3 py-1 bg-emerald-600 text-white font-bold text-[10px] uppercase rounded-full">
                    {selectedPhoto.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex gap-4 items-center text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-600" /> {selectedPhoto.date}
                    </span>
                    <span>&bull;</span>
                    <span>ID: {selectedPhoto.id}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white leading-snug">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                    Dokumentasi resmi pembelajaran {selectedPhoto.category} di TK Islam Terpadu Salsabila Bekasi. Seluruh materi pengajaran diabadikan sebagai bagian dari review kurikulum &amp; kebersamaan orang tua murid.
                  </p>
                  
                  <div className="pt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="px-6 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs rounded-xl"
                    >
                      Buka Tutup
                    </button>
                    <a
                      href="https://wa.me/622188983124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl inline-block text-center"
                    >
                      Dapatkan File Orinya via WA
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
