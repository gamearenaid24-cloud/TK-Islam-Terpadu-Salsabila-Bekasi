/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Calendar, Clock, MapPin, Mail, ArrowUpCircle } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: string) => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-yellow-400 relative overflow-hidden">
      
      {/* Decorative Top Arch Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-2 bg-yellow-400 rounded-b-full shadow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Mission Statement Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="font-display font-extrabold text-2xl text-white tracking-tight">
                TKIT SALSABILA BEKASI
              </div>
            </div>
            <p className="text-sm text-emerald-200/85 leading-relaxed">
              &ldquo;Membentuk Generasi Qurani, Cerdas, Mandiri, dan Berakhlak Mulia&rdquo;
            </p>
            <div className="pt-2">
              <span className="px-3 py-1 bg-yellow-400 text-emerald-950 text-xs font-bold rounded-full tracking-wide">
                NPSN: 69825989
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide border-b border-emerald-800 pb-2 mb-4">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              {['Beranda', 'Profil', 'Kurikulum', 'Galeri', 'Berita'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      onViewChange(item.toLowerCase() === 'kurikulum' ? 'kurikulum' : item.toLowerCase() === 'berita' ? 'berita' : item.toLowerCase());
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-yellow-300 hover:underline transition-all duration-200 text-left"
                  >
                    • {item === 'Kurikulum' ? 'Kurikulum & Program' : item === 'Berita' ? 'Berita & Event' : item}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onViewChange('ppdb');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-semibold text-yellow-400 hover:text-yellow-300 hover:underline text-left"
                >
                  • PPDB Online (Daftar)
                </button>
              </li>
            </ul>
          </div>

          {/* Operational Hours Column */}
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide border-b border-emerald-800 pb-2 mb-4">
              Jam Operasional
            </h3>
            <ul className="space-y-3 text-sm text-emerald-200/85">
              <li className="flex gap-3 items-start">
                <Calendar className="w-5 h-5 text-yellow-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Senin - Jumat</div>
                  <div className="text-xs text-emerald-200/70">Hari Belajar Aktif</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Clock className="w-5 h-5 text-yellow-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">07.30 - 13.00 WIB</div>
                  <div className="text-xs text-emerald-200/70">Waktu Pembelajaran</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-300">Sabtu - Minggu</div>
                  <div className="text-xs text-emerald-200/60">Libur Operasional</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide border-b border-emerald-800 pb-2 mb-4">
              Kontak & Alamat
            </h3>
            <ul className="space-y-3 text-xs text-emerald-200/85 leading-relaxed">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  Jl. Raya Pondok Ungu Permai Sektor 5 No.3 Blok F6, RT.04/RW.023, Bahagia, Babelan, Kabupaten Bekasi, Jawa Barat 17160
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="font-mono text-sm">(021) 88983124</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="font-mono">tkit.salsabila@gmail.sch.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="mt-12 pt-8 border-t border-emerald-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-300/70">
          <div>
            &copy; {new Date().getFullYear()} TK Islam Terpadu Salsabila Bekasi. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>PAUD &amp; RA Berakreditasi Baik</span>
            <span>Metode Sentra &bull; Metode Ummi</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="Ke Atas"
            >
              Back to Top <ArrowUpCircle className="w-4 h-4 text-yellow-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
