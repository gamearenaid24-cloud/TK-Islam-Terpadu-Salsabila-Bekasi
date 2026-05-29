/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, MessageSquare, Star, Users, Plus, X, HandHeart, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddTestimonial: (item: Testimonial) => void;
}

const AVATAR_OPTIONS = ['👨‍💼', '👩‍💼', '👨', '👩', '🧑', '👧', '👵', '👴'];

export default function Testimonials({ testimonials, onAddTestimonial }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [cohort, setCohort] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [avatar, setAvatar] = useState('👩‍💼');
  const [tag, setTag] = useState<'Wali Murid' | 'Alumni' | 'Tokoh Wali'>('Wali Murid');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const listToUse = testimonials && testimonials.length > 0 ? testimonials : [];

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoPlay || listToUse.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, isAutoPlay, listToUse.length]);

  const handlePrev = () => {
    if (listToUse.length === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + listToUse.length) % listToUse.length);
  };

  const handleNext = () => {
    if (listToUse.length === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % listToUse.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !cohort.trim() || !text.trim()) {
      setErrorMessage('Harap isi semua kolom wajib yang bertanda bintang (*).');
      return;
    }

    const calculatedChildName = relation.toLowerCase().includes('ibu dari') || relation.toLowerCase().includes('ayah dari')
      ? relation.replace(/Ibu dari\s*/i, '').replace(/Ayah dari\s*/i, '').trim()
      : 'Ananda';

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim() || 'Wali Murid',
      childName: calculatedChildName,
      cohort: cohort.trim(),
      text: text.trim(),
      rating,
      avatar,
      tag,
    };

    onAddTestimonial(newTestimonial);

    // Show custom success screen with quick visual feedback
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      // Reset state
      setName('');
      setRelation('');
      setCohort('');
      setText('');
      setRating(5);
      setAvatar('👩‍💼');
      setTag('Wali Murid');
      // Set active test index to the new one (index 0) to immediately showcase their response
      setActiveIndex(0);
    }, 1500);
  };

  // Variants for slide animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  const current = listToUse[activeIndex];

  return (
    <section 
      id="testimonials-section"
      className="bg-slate-100 dark:bg-[#0c1830] py-12 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-200/60 dark:border-slate-800/40 transition-colors"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading with High Density Style */}
        <div className="text-center mb-8 relative">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" /> Testimoni Ayah & Bunda
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Kesan Tulus Orang Tua & Alumni
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-1 leading-normal mb-4">
            Kepercayaan tulus dari orang tua siswa adalah bahan bakar kami dalam terus meningkatkan kualitas pendidikan bimbingan generasi dhuha.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer shadow-sm shadow-emerald-200 dark:shadow-none"
          >
            <Plus className="w-4 h-4" /> Berikan Testimoni Anda
          </button>
        </div>

        {/* Dynamic Interactive Slider Frame */}
        {listToUse.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#0f1d3a] rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
            <Quote className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h5 className="font-bold text-slate-700 dark:text-slate-350">Belum Ada Testimoni</h5>
            <p className="text-xs text-slate-400">Klik tombol "Berikan Testimoni Anda" untuk mengawali review.</p>
          </div>
        ) : (
          <>
            <div className="relative min-h-[260px] bg-white dark:bg-[#0f1d3a] rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 dark:border-slate-800/80 overflow-hidden flex flex-col justify-between">
              
              {/* Decorative quote back icon */}
              <div className="absolute right-6 top-6 text-slate-100 dark:text-slate-800/35 pointer-events-none">
                <Quote className="w-24 h-24 stroke-[1.5]" />
              </div>

              {current && (
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={current.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex flex-col h-full justify-between"
                    >
                      {/* Rating & Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-0.5 text-yellow-450">
                          {[...Array(current.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current text-yellow-400" />
                          ))}
                          {[...Array(Math.max(0, 5 - current.rating))].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700" />
                          ))}
                        </div>
                        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                          current.tag === 'Alumni' 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' 
                            : 'bg-yellow-400/10 text-yellow-800 dark:text-yellow-405'
                        }`}>
                          {current.tag}
                        </span>
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-xs sm:text-sm text-slate-750 dark:text-slate-300 italic leading-relaxed mb-6 font-medium pr-4">
                        "{current.text}"
                      </p>

                      {/* Profile detail */}
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl select-none">
                          {current.avatar || '👩‍💼'}
                        </div>
                        <div>
                          <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                            {current.name}
                          </h5>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-normal mt-0.5">
                            {current.relation} • <span className="text-emerald-600 dark:text-emerald-400 font-bold">{current.cohort}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Manual Control Buttons */}
              {listToUse.length > 1 && (
                <div className="absolute right-4 bottom-6 sm:right-6 sm:bottom-8 z-25 flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 sm:p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#15264b] dark:hover:bg-[#1a2f5c] text-slate-650 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/60 transition-colors shadow-2xs cursor-pointer"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 sm:p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#15264b] dark:hover:bg-[#1a2f5c] text-slate-650 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/60 transition-colors shadow-2xs cursor-pointer"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>

            {/* Indicators Dots */}
            {listToUse.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {listToUse.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === activeIndex 
                        ? 'w-6 bg-emerald-600 dark:bg-emerald-500' 
                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Modal Window Form for adding testimonies */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full flex flex-col max-h-[90vh]"
              >
                {/* Header Banner */}
                <div className="bg-emerald-900 p-5 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <HandHeart className="w-5 h-5 text-yellow-400 animate-pulse" />
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base leading-none">Berikan Testimoni Anda</h3>
                      <p className="text-[10px] text-emerald-255 mt-1 font-semibold text-emerald-200">Bagikan kesan tulus untuk kemajuan TKIT Salsabila</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-emerald-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {submitSuccess ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce">
                      <Sparkles className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h4 className="font-black text-slate-800 dark:text-slate-100">Jazakumullah Khairan!</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                      Kesaksian tulus Ayah &amp; Bunda berhasil disimpan ke dalam sistem. Terima kasih atas dedikasi dan dukungan hangatnya.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-4">
                    {errorMessage && (
                      <div className="bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs p-3 rounded-xl flex items-center gap-2 font-medium border border-red-100 dark:border-red-900/40">
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Informative Label Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Nama Penulis */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                          Nama Anda <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Contoh: Bunda Shasmira"
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-150 focus:outline-none focus:border-emerald-600 font-medium"
                          required
                        />
                      </div>

                      {/* Hubungan / Wali Kenzie dll */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                          Hubungan Khusus / Status
                        </label>
                        <input
                          type="text"
                          value={relation}
                          onChange={(e) => setRelation(e.target.value)}
                          placeholder="Ibu dari Azka / Ayah dari Maryam / Alumni"
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-150 focus:outline-none focus:border-emerald-600 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Kategori tag */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                          Kategori Pengunjung
                        </label>
                        <select
                          value={tag}
                          onChange={(e) => setTag(e.target.value as any)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-150 focus:outline-none focus:border-emerald-600 font-medium"
                        >
                          <option value="Wali Murid">Wali Murid (Orang Tua Wali)</option>
                          <option value="Alumni">Siswa Alumni / Wali Alumni</option>
                          <option value="Tokoh Wali">Tokoh Wali / Masyarakat setempat</option>
                        </select>
                      </div>

                      {/* Tahun Cohort / Kelas pendukung */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                          Tahun Angkatan / Nama Sentra <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cohort}
                          onChange={(e) => setCohort(e.target.value)}
                          placeholder="Aktif Sentra Imtaq / Alumni 2024"
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-150 focus:outline-none focus:border-emerald-600 font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Rating & Avatar Selecting */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                          Pilih Karakter Avatar
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {AVATAR_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setAvatar(opt)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg border transition-all duration-200 cursor-pointer ${
                                avatar === opt 
                                  ? 'bg-emerald-100 border-emerald-600 dark:bg-emerald-950/60 scale-110' 
                                  : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:border-emerald-300'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                          Skor Rating (Bintang)
                        </label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((stars) => (
                            <button
                              key={stars}
                              type="button"
                              onClick={() => setRating(stars)}
                              className="p-1 cursor-pointer transition-transform duration-150 active:scale-95"
                            >
                              <Star 
                                className={`w-6 h-6 stroke-yellow-500 ${
                                  stars <= rating 
                                    ? 'fill-yellow-450 text-yellow-400' 
                                    : 'text-slate-300 dark:text-slate-700'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Isi Pesan Kesan */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                        Isi Testimoni / Kesan &amp; Pesan Anda <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Tuliskan pengalaman pembelajaran ananda selama di TKIT Salsabila..."
                        rows={4}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-150 focus:outline-none focus:border-emerald-600 font-medium placeholder:text-slate-400 resize-none"
                        maxLength={400}
                        required
                      />
                      <div className="text-[10px] text-slate-400 text-right">
                        {text.length}/400 Karakter maks
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Keluar / Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs rounded-xl tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        <HandHeart className="w-4 h-4 text-emerald-100" /> Simpan Testimoni
                      </button>
                    </div>

                  </form>
                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
