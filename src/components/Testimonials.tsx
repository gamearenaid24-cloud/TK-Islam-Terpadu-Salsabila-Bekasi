/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, MessageSquare, Star, Users } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  relation: string;
  childName: string;
  cohort: string;
  text: string;
  rating: number;
  avatar: string;
  tag: 'Wali Murid' | 'Alumni' | 'Tokoh Wali';
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Bunda Safira',
    relation: 'Ibu dari Kenzi Ibrahim',
    childName: 'Kenzi Ibrahim',
    cohort: 'Alumni Sentra Balok 2025',
    text: 'MasyaAllah, berkat bimbingan intensif Metode Ummi di TKIT Salsabila, Kenzi sudah hafal sebagian Juz 30 dan sangat lancar melafazkan doa harian sebelum menginjak usia SD. Karakter kemandiriannya sangat terlatih melalui permainan konstruksi Sentra Balok!',
    rating: 5,
    avatar: '👩‍💼',
    tag: 'Alumni',
  },
  {
    id: 'test-2',
    name: 'Ayah Hanif',
    relation: 'Ayah dari Naura Salsabila',
    childName: 'Naura Salsabila',
    cohort: 'Siswa Aktif Sentra Imtaq',
    text: 'Metode Sentra (BCCT) yang diterapkan benar-benar membuat anak saya gembira setiap pagi dan selalu bersemangat untuk sekolah. Kurikulumnya sangat islami, praktik wudhu tertib dan shalat dhuha dibiasakan secara ramah anak tanpa paksaan.',
    rating: 5,
    avatar: '👨‍💼',
    tag: 'Wali Murid',
  },
  {
    id: 'test-3',
    name: 'Bunda Zulfa',
    relation: 'Ibu dari Rayyan Al-Fatih',
    childName: 'Rayyan Al-Fatih',
    cohort: 'Alumni Sentra Persiapan 2024',
    text: 'Ustadah di TKIT Salsabila luar biasa sabar dan komunikatif. Laporan portofolio perkembangan kognitif dan pembentukan akhlak anak disampaikan teratur dan personal. Suasana belajarnya hangat, terasa seperti keluarga kedua bagi ananda.',
    rating: 5,
    avatar: '👩',
    tag: 'Wali Murid',
  },
  {
    id: 'test-4',
    name: 'Ayah Irwan Wijaya',
    relation: 'Ayah dari Fatimah Azzahra',
    childName: 'Fatimah Azzahra',
    cohort: 'Siswa Aktif Sentra Seni',
    text: 'Pilihan terbaik untuk pondasi akhlak anak usia dini di Bekasi Barat dan Babelan. Integrasi iman, ilmu, dan kreativitas tersaji sempurna. Anak jadi lebih sopan dalam bertutur kata dan gemar membantu orang tua di rumah.',
    rating: 5,
    avatar: '👨',
    tag: 'Wali Murid',
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, isAutoPlay]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
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

  const current = TESTIMONIALS[activeIndex];

  return (
    <section 
      id="testimonials-section"
      className="bg-slate-100 dark:bg-[#0c1830] py-10 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-200/60 dark:border-slate-800/40 transition-colors"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading with High Density Style */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" /> Testimoni Ayah & Bunda
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Kesan Tulus Orang Tua & Alumni
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-1 leading-normal">
            Kepercayaan tulus dari orang tua siswa adalah bahan bakar kami dalam terus meningkatkan kualitas pendidikan bimbingan generasi dhuha.
          </p>
        </div>

        {/* Dynamic Interactive Slider Frame */}
        <div className="relative min-h-[260px] bg-white dark:bg-[#0f1d3a] rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 dark:border-slate-800/80 overflow-hidden flex flex-col justify-between">
          
          {/* Decorative quote back icon */}
          <div className="absolute right-6 top-6 text-slate-100 dark:text-slate-800/35 pointer-events-none">
            <Quote className="w-24 h-24 stroke-[1.5]" />
          </div>

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
                  </div>
                  <span className={`text-[10px] lowercase font-black uppercase px-2 py-0.5 rounded ${
                    current.tag === 'Alumni' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' 
                      : 'bg-yellow-105 text-yellow-800 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {current.tag}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 italic leading-relaxed mb-6 font-medium pr-4">
                  "{current.text}"
                </p>

                {/* Profile detail */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl select-none">
                    {current.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                      {current.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                      {current.relation} • <span className="text-emerald-600 dark:text-emerald-405 font-bold">{current.cohort}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Manual Control Buttons */}
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

        </div>

        {/* Indicators Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {TESTIMONIALS.map((_, index) => (
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

      </div>
    </section>
  );
}
