/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Mail, Clock, Calendar, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Pendaftaran');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setSentSuccess(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setSentSuccess(false);
    }, 4500);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-900/40 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-[#059669] font-bold text-xs uppercase tracking-widest rounded-full">
            Lokasi &amp; Kontak
          </span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">
            Hubungi TKIT Salsabila Bekasi
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mempunyai pertanyaan seputar biaya masuk, jadwal KBM, atau orientasi sentra? Hubungi kami langsung.
          </p>
        </div>

        {/* Triple grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Contact cards (Col-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Map coordinate Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-lg text-[#059669] dark:text-emerald-400">
                Peta Koordinat Sekolah
              </h3>
              
              {/* Interactive Embedded Google Map */}
              <div className="relative w-full h-44 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-inner">
                <iframe
                  title="Peta Lokasi TKIT Salsabila Bekasi"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.115814571932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698ea45bf86dd5%3A0xc3fec8debb370ea8!2sPondok%20Ungu%20Permai%2C%20Kabupaten%20Bekasi%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1716982598900!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[15%] contrast-[95%] dark:invert-[90%] dark:hue-rotate-[180deg]"
                ></iframe>
              </div>

              {/* GPS Button link */}
              <a
                href="https://maps.google.com/?q=TK+Islam+Terpadu+Salsabila+Bekasi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#059669] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors inline-block text-center"
              >
                Buka GPS via Google Maps
              </a>
            </div>

            {/* Direct details item */}
            <div className="bg-slate-900 border border-slate-800 text-slate-250 p-6 rounded-3xl space-y-4">
              <h4 className="font-display font-black text-sm text-yellow-400 uppercase tracking-widest">Detail Kontak Resmi</h4>
              <ul className="space-y-3.5 text-xs">
                <li className="flex gap-3.5 items-start">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-sans">Alamat Sekolah:</strong>
                    Jl. Raya Pondok Ungu Permai Sektor 5 No.3 Blok F6, Bahagia, Babelan, Kabupaten Bekasi, 17160
                  </div>
                </li>
                <li className="flex gap-3.5 items-center">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-sans">Telepon Kantor:</strong>
                    <span className="font-mono text-sm">(021) 88983124</span>
                  </div>
                </li>
                <li className="flex gap-3.5 items-center">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-sans">Email Akademik:</strong>
                    <span className="font-mono">tkit.salsabila@gmail.sch.id</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Column 2: Send Message Form (Col-7) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-6">
              
              <div className="flex gap-2 items-center border-b border-light pb-3">
                <MessageSquare className="text-[#059669] w-5 h-5" />
                <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                  Kirim Pesan Cepat ke Panitia
                </h3>
              </div>

              {sentSuccess && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-2xl flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  Pesan Anda berhasil terkirim! Tim operator TKIT Salsabila akan memberikan respons secepatnya via Email atau WhatsApp.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-500 uppercase font-black">Nama Anda *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl outline-none focus:border-emerald-600 text-slate-800 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-500 uppercase font-black">Email Aktif</label>
                  <input
                    type="email"
                    placeholder="ahmad@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl outline-none focus:border-emerald-600 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Subject Category selector */}
              <div className="space-y-1">
                <label className="block text-[10px] text-slate-500 uppercase font-black">Topik Keperluan *</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { id: 'Biaya', label: 'Biaya Masuk' },
                    { id: 'Kurikulum', label: 'Tanya Kurikulum' },
                    { id: 'Operasional', label: 'Jam Operasional' },
                    { id: 'Lainnya', label: 'Keperluan Lainnya' },
                  ].map((subj) => (
                    <button
                      key={subj.id}
                      type="button"
                      onClick={() => setSubject(subj.label)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                        subject === subj.label
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-850 dark:hover:text-slate-200'
                      }`}
                    >
                      {subj.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message content */}
              <div className="space-y-1">
                <label className="block text-[10px] text-slate-500 uppercase font-black">Detail Pesan / Pertanyaan *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ketik rincian pertanyaan atau keluhan Anda di sini secara lengkap..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl outline-none focus:border-emerald-600 text-slate-800 dark:text-white shadow-inner"
                />
              </div>

              {/* Form buttons */}
              <div className="flex justify-between items-center flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Mendukung kepatuhan UU PDP &amp; ITE secara penuh.
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#059669] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow"
                >
                  KIRIM PESAN <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
