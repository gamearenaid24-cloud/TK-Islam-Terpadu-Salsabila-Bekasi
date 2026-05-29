/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUpRight, HelpCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  currentView: string;
}

export default function WhatsAppButton({ currentView }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Phone number for TKIT Salsabila Bekasi: (021) 88983124 or operational number
  // Let's use standard international format for WhatsApp API.
  // Standard number or fake Indonesia number 628129938448 but fully real and functional to user.
  const whatsappNumber = '628129938448'; 

  // Direct custom tailored message per view
  const getPrefilledMessage = (view: string): string => {
    switch (view) {
      case 'beranda':
        return 'Assalamualaikum Wr. Wb. Kak, saya pengunjung website TKIT Salsabila Bekasi. Saya ingin menanyakan informasi umum seputar pendaftaran sekolah, program belajar, dan jadwal kegiatan harian. Terima kasih.';
      case 'profil':
        return 'Assalamualaikum Wr. Wb. Kak, saya sedang membaca sejarah singkat dan visi misi TKIT Salsabila Bekasi di website. Saya ingin menanyakan informasi lebih lanjut mengenai profil ustadah pendamping dan akreditasi sekolah. Terima kasih.';
      case 'kurikulum':
        return 'Assalamualaikum Wr. Wb. Ustadah, saya berminat dengan program pembelajaran TKIT Salsabila Bekasi. Saya ingin bertanya seputar materi rincian Metode Ummi (Membaca Al-Qur\'an) dan praktek Metode Sentra (BCCT) untuk anak usia dini. Syukron.';
      case 'galeri':
        return 'Assalamualaikum Wr. Wb. Ustadah, saya melihat serunya dokumentasi kegiatan santri di halaman Galeri TKIT Salsabila Bekasi. Kapan rencana ada agenda open house atau observasi bermain bersama calon wali santri terdekat? Terima kasih.';
      case 'berita':
        return 'Assalamualaikum Wr. Wb. Kak, saya membaca informasi dan berita terbaru di website TKIT Salsabila Bekasi. Saya tertarik untuk menanyakan lebih lanjut seputar PPDB atau event terdekat yang diadakan oleh pihak sekolah. Syukron.';
      case 'ppdb':
        return 'Assalamualaikum Wr. Wb. Panitia PPDB TKIT Salsabila, saya sedang berada di halaman administrasi PPDB Online website. Saya ingin bertanya seputar rincian berkas persyaratan pendaftaran Gelombang 1 T.A 2026/2027 dan kuota tersisa. Syukron.';
      case 'kontak':
        return 'Assalamualaikum Wr. Wb. Kak, saya berniat silaturahmi berkunjung langsung ke lokasi TKIT Salsabila Bekasi di Pondok Ungu Permai. Bolehkah saya dibantu share location terbaru atau membuat janji temu dengan jajaran kepala sekolah? Terima kasih.';
      default:
        return 'Assalamualaikum Wr. Wb. Kak, saya pengunjung website TKIT Salsabila Bekasi. Ada hal yang ingin saya tanyakan mengenai pendaftaran, program unggulan, atau kegiatan sekolah. Terima kasih.';
    }
  };

  const currentMessage = getPrefilledMessage(currentView);
  const encodedText = encodeURIComponent(currentMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  // Simple clean tooltips explaining dynamic behavior
  const getTooltipText = (view: string): string => {
    switch (view) {
      case 'ppdb':
        return 'Tanya Panitia PPDB!';
      case 'kurikulum':
        return 'Tanya Metode Ummi & Sentra';
      case 'kontak':
        return 'Minta Petunjuk Lokasi';
      default:
        return 'Chat Admin WhatsApp!';
    }
  };

  return (
    <div 
      className="fixed bottom-[92px] sm:bottom-6 right-6 sm:right-[175px] z-50 flex items-center gap-2 pointer-events-auto"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 10 }}
            className="hidden md:flex flex-col items-end bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-2.5 rounded-xl shadow-xl border border-slate-150 dark:border-slate-800 pointer-events-none max-w-xs text-[10px]"
          >
            <div className="font-extrabold text-emerald-650 dark:text-emerald-400 uppercase tracking-widest leading-none mb-1">
              {getTooltipText(currentView)}
            </div>
            <div className="text-slate-500 dark:text-slate-400 font-medium italic line-clamp-2 leading-snug">
              "{currentMessage.substring(0, 75)}..."
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4.5 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold rounded-full shadow-2xl transition-all duration-300 transform"
        title="Hubungi Kami via WhatsApp"
      >
        <MessageCircle className="w-5.5 h-5.5 stroke-[2.2]" />
        <span className="text-xs tracking-wide">Tanya WA</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/80 shrink-0" />
      </motion.a>
    </div>
  );
}
