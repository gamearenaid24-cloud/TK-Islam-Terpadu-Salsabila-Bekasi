/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Users, ShieldCheck, GraduationCap, ArrowRight, HeartHandshake, Sparkles, BookOpen, Clock, Calendar, MessageCircle, ChevronRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface HeroProps {
  onViewChange: (view: string) => void;
  articles: NewsArticle[];
}

export default function Hero({ onViewChange, articles }: HeroProps) {
  // Take last 3 articles for info list
  const recentArticles = articles.slice(0, 3);

  const stats = [
    { value: '145+', label: 'Siswa Aktif', icon: Users, color: 'text-emerald-700' },
    { value: '15', label: 'Guru Ahli', icon: GraduationCap, color: 'text-emerald-700' },
    { value: 'A', label: 'Akreditasi', icon: Award, color: 'text-emerald-700' },
    { value: '2015', label: 'Thn Berdiri', icon: ShieldCheck, color: 'text-emerald-700' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#090f1e] transition-colors islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main Grid Layout for High Density */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Hero & Core Strengths (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Hero Main Card */}
            <section className="relative min-h-[340px] bg-emerald-920 dark:bg-[#042419] bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl overflow-hidden shadow-md flex flex-col justify-between p-8 sm:p-10 border border-emerald-800/20">
              {/* Radial decor pattern */}
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-emerald-950 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" /> Pendaftaran T.A 2026/2027 Dibuka
                </span>
                
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                  Membentuk Generasi <span className="text-yellow-400">Qurani</span>, Cerdas, <br className="hidden sm:inline" />
                  Mandiri, dan Berakhlak Mulia
                </h2>
                
                <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl mb-6">
                  TKIT Salsabila Bekasi mengintegrasikan Kurikulum PAUD Nasional dengan pembelajaran Al-Qur'an tartil 
                  <strong className="text-yellow-300 font-semibold"> Metode Ummi</strong> dan stimulasi motorik kognitif lewat 
                  <strong className="text-yellow-300 font-semibold"> Metode Sentra</strong>.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => onViewChange('ppdb')}
                  className="bg-white hover:bg-yellow-400 text-emerald-950 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Daftar Sekarang <ArrowRight className="w-4 h-4 text-emerald-950" />
                </button>
                <button
                  onClick={() => onViewChange('kurikulum')}
                  className="bg-transparent border border-white/30 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  Lihat Kurikulum
                </button>
              </div>

              {/* Ambient radial lighting ball */}
              <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 bg-emerald-600 rounded-full blur-3xl opacity-20" />
            </section>

            {/* Core Features / Programs shortcuts */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900/60 p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors">
                <div>
                  <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-3">
                    📖
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Metode Ummi</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Sistem pembelajaran Al-Qur'an yang melatih makhraj & tartil lancar secara menyenangkan.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-yellow-200 dark:hover:border-yellow-900 transition-colors">
                <div>
                  <div className="w-9 h-9 bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-400 rounded-lg flex items-center justify-center mb-3">
                    🧩
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Metode Sentra</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Pembelajaran bermakna melalui BCCT (Sentra Balok, Imtaq, Persiapan, dan Bahan Alam).
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors">
                <div>
                  <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-3">
                    🧕
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Adab & Karakter</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Pembiasaan sholat dhuha berjamaah, wudhu tertib, dan akhlakul karimah setiap langkah.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Dynamic Statistics Card & Compact Info List (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* High Density Statistics Matrix */}
            <div className="bg-white dark:bg-[#0f172a] p-4.5 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs grid grid-cols-2 gap-4">
              {stats.map((st, idx) => {
                const IconComp = st.icon;
                return (
                  <div 
                    key={idx} 
                    className={`text-center py-2.5 ${
                      idx % 2 === 0 ? 'border-r border-slate-150 dark:border-slate-800' : ''
                    } ${idx >= 2 ? 'border-t border-slate-150 dark:border-slate-800' : ''}`}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1 text-slate-400">
                      <IconComp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">{st.label}</span>
                    </div>
                    <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 leading-none">
                      {st.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Info & Kegiatan List card */}
            <div className="bg-white dark:bg-[#0f172a] flex-1 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Info & Kegiatan Terbaru</h4>
                  <button
                    onClick={() => onViewChange('berita')}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                  >
                    Lihat Semua
                  </button>
                </div>

                {/* List elements - high density */}
                <div className="space-y-3.5">
                  {recentArticles.map((art) => (
                    <div 
                      key={art.id} 
                      onClick={() => onViewChange('berita')}
                      className="flex gap-3 cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/40 p-1.5 rounded-xl transition-all"
                    >
                      <div className="flex-shrink-0 w-11 h-11 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 rounded-lg flex items-center justify-center font-bold text-lg select-none">
                        📰
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {art.title}
                        </h5>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-semibold flex items-center gap-2">
                          <span>{art.date}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-350 dark:bg-slate-700" />
                          <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase">{art.category}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Hubungi / Whatsapp Card */}
              <div className="mt-6">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-4 border border-emerald-100/40 dark:border-emerald-900/40">
                  <p className="text-xs font-extrabold text-emerald-900 dark:text-emerald-450 flex items-center gap-1">
                    💬 Layanan Hubungi Kami
                  </p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400/80 mt-1 leading-snug">
                    Hubungi tim administrasi kami bila ada pertanyaan seputar berkas pendaftaran atau kurikulum.
                  </p>
                  <button
                    onClick={() => onViewChange('kontak')}
                    className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-2 rounded-lg cursor-pointer transition-transform duration-200 transform hover:scale-[1.01] flex items-center justify-center gap-1"
                  >
                    Kunjungi Kontak & Alamat <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
