/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, Filter, X, ZoomIn, Plus, Upload, Image, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';
import { GalleryCategory, GalleryItem } from '../types';

interface GalleryViewProps {
  items: GalleryItem[];
  onAddGalleryItem?: (item: GalleryItem) => void;
  isAdmin?: boolean;
}

export default function GalleryView({ items, onAddGalleryItem, isAdmin = false }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory | 'Semua'>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Upload Panel States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryCategory>('Belajar');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().substring(0, 10));
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorText('File harus berupa berkas gambar (JPEG, PNG, WEBP, dll).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onerror = () => {
        setErrorText('Gagal mengurai gambar yang diunggah.');
      };
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Optimally resize to maximum 720px wide or high
        const MAX_DIMENSION = 720;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality compression
          setNewImagePreview(compressedDataUrl);
          setErrorText('');
        } else {
          setErrorText('Gagal menginisialisasi canvas pengolah gambar.');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleOpenFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!newTitle.trim()) {
      setErrorText('Silakan berikan judul foto kegiatan.');
      return;
    }

    if (!newImagePreview) {
      setErrorText('Silakan pilih atau seret foto yang ingin diunggah.');
      return;
    }

    if (onAddGalleryItem) {
      const newGalleryItem: GalleryItem = {
        id: `g-${Date.now()}`,
        title: newTitle.trim(),
        category: newCategory,
        imageUrl: newImagePreview,
        date: newDate || new Date().toISOString().substring(0, 10),
      };

      onAddGalleryItem(newGalleryItem);
      
      // Highlight success transition animation
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setIsUploadOpen(false);
        setNewTitle('');
        setNewCategory('Belajar');
        setNewImagePreview(null);
      }, 1200);
    }
  };

  const filteredItems = activeFilter === 'Semua'
    ? items
    : items.filter(item => item.category === activeFilter);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-900/40 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Block with Interactive Add Button */}
        <div className="text-center max-w-3xl mx-auto space-y-3 relative mb-6">
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 font-bold text-xs uppercase tracking-widest text-[#059669] rounded-full">
            Dokumentasi Sekolah
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
            Galeri Kegiatan Sekolah
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kilas balik momen keceriaan, belajar aktif, dan prestasi ananda di TKIT Salsabila Bekasi.
          </p>

          {onAddGalleryItem && isAdmin && (
            <div className="pt-3">
              <button
                onClick={() => setIsUploadOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-emerald-200 dark:shadow-none transition-all duration-300 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Unggah Foto Kegiatan
              </button>
            </div>
          )}
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
          <div className="text-center py-16 bg-white dark:bg-slate-800/60 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <Camera className="w-12 h-12 text-slate-350 mx-auto mb-3" />
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Belum Ada Dokumentasi</h4>
            <p className="text-xs text-slate-400 mt-1">Saat ini galeri pada kategori "{activeFilter}" belum ditambahkan.</p>
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
                      
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500" 
                        />
                      ) : (
                        /* Interactive CSS themed fallback card */
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.grad} flex flex-col items-center justify-center p-4 text-center`}>
                          <span className="text-4xl drop-shadow mb-2 transform group-hover:scale-110 transition-transform duration-300">{theme.emoji}</span>
                          <span className="text-[10px] font-black uppercase text-yellow-300/80 tracking-widest">{item.category}</span>
                        </div>
                      )}

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
                          <Calendar className="w-3.5 h-3.5 text-slate-350" />
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

        {/* Photo Upload Modal Form Overlay */}
        <AnimatePresence>
          {isUploadOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full flex flex-col max-h-[90vh]"
              >
                {/* Header Banner */}
                <div className="bg-emerald-900 p-5 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-yellow-400" />
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base leading-none">Unggah Foto Dokumentasi</h3>
                      <p className="text-[10px] text-emerald-250 mt-1 font-semibold">Lampirkan kilas belajar santri ke website</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsUploadOpen(false)}
                    className="p-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-emerald-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {uploadSuccess ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="font-black text-slate-800 dark:text-slate-150">Alhamdulillah!</h4>
                    <p className="text-xs text-slate-500">Foto kegiatan berhasil ditambahkan ke galeri sistem.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitUpload} className="p-6 sm:p-8 overflow-y-auto space-y-4">
                    {errorText && (
                      <div className="bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs p-3 rounded-xl flex items-center gap-2 font-medium border border-red-100 dark:border-red-900/60">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorText}</span>
                      </div>
                    )}

                    {/* Judul Kegiatan */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                        Judul Kegiatan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Contoh: Belajar Huruf Hijaiyah dengan Kubus Pintar"
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600 placeholder:text-slate-400"
                        maxLength={120}
                        required
                      />
                    </div>

                    {/* Category & Date Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Dropdown Kategori */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                          Kategori Galeri
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as GalleryCategory)}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600 font-medium"
                        >
                          <option value="Belajar">Belajar</option>
                          <option value="Outing Class">Outing Class</option>
                          <option value="Lomba">Lomba</option>
                          <option value="Wisuda">Wisuda</option>
                          <option value="Kegiatan Keagamaan">Kegiatan Keagamaan</option>
                        </select>
                      </div>

                      {/* Tanggal Kegiatan */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                          Tanggal Kegiatan
                        </label>
                        <input
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600 font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Drag-and-drop Image Upload Frame */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                        Foto Kegiatan <span className="text-red-500">*</span>
                      </label>
                      
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleOpenFileSelector}
                        className={`h-40 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-4 transition-all duration-200 cursor-pointer overflow-hidden group relative ${
                          isDragging
                            ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                            : newImagePreview
                            ? 'border-emerald-600 bg-slate-55'
                            : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 bg-slate-50 dark:bg-slate-950/30'
                        }`}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />

                        {newImagePreview ? (
                          <>
                            <img
                              src={newImagePreview}
                              alt="Pratinjau unggahan"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                              <Upload className="w-6 h-6 mb-1 text-yellow-350" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">Ganti Foto</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center space-y-2 pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                              <Upload className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                Seret &amp; letakkan foto di sini, atau <span className="text-emerald-600 dark:text-emerald-400">pilih berkas</span>
                              </p>
                              <p className="text-[10px] text-slate-400 font-semibold">
                                Direkomendasikan format landscape aspek 4:3 / 16:9
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action buttons */}
                    <div className="pt-4 flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsUploadOpen(false)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Selesai / Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs rounded-xl tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" /> Simpan ke Galeri
                      </button>
                    </div>
                  </form>
                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
                <div className="relative aspect-video bg-slate-200 dark:bg-slate-950 overflow-hidden flex items-center justify-center">
                  {selectedPhoto.imageUrl ? (
                    <img 
                      src={selectedPhoto.imageUrl} 
                      alt={selectedPhoto.title} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${getThemedThumb(selectedPhoto.category).grad} flex flex-col items-center justify-center p-8`}>
                      <div className="text-6xl text-white drop-shadow mb-2">
                        {getThemedThumb(selectedPhoto.category).emoji}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <span className="absolute bottom-4 left-6 px-3 py-1 bg-emerald-600 text-white font-bold text-[10px] uppercase rounded-full z-10">
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
                      className="px-6 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Buka Tutup
                    </button>
                    <a
                      href="https://wa.me/622188983124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl inline-block text-center cursor-pointer"
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
