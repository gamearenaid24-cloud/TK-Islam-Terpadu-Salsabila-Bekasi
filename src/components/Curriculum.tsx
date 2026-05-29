/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, Sparkles, Heart, HeartPulse, BrainCircuit, MessageSquareCode, Smile, Palette, BookMarked, Eye, Flame, Trees, Church } from 'lucide-react';

export default function Curriculum() {
  
  // 1. 6 PAUD National Curriculum Domains requested by the user
  const paudDomains = [
    {
      title: 'Nilai Agama dan Moral',
      desc: 'Mengenal rukun Islam & iman, pembiasaan basmalah & hamdalah, adab makan/tidur, serta pembentukan karakter awal anak yang bertuhan.',
      icon: BookMarked,
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900',
    },
    {
      title: 'Fisik Motorik',
      desc: 'Latihan motorik kasar (berlari, melompat, keseimbangan) dan motorik halus (mewarnai, menulis dasar, meronce, melipat) demi kebugaran tubuh.',
      icon: HeartPulse,
      color: 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 border-orange-100 dark:border-orange-900',
    },
    {
      title: 'Kognitif',
      desc: 'Pengembangan logika matematika, pengurutan pola, pemecahan masalah sederhana, pengenalan warna, ukuran, bentuk geometri di sentra kognitif.',
      icon: BrainCircuit,
      color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900',
    },
    {
      title: 'Bahasa',
      desc: 'Pengembangan kemampuan bercerita, menyimak dongeng, keaksaraan awal, membaca tartil Metode Ummi, berekspresi secara verbal.',
      icon: MessageSquareCode,
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-100 dark:border-purple-900',
    },
    {
      title: 'Sosial Emosional',
      desc: 'Melatih kemampuan berbagi (utsarah), empati, sabar menunggu giliran, kemandirian memakai sepatu/baju, percaya diri, dan kerja kelompok.',
      icon: Smile,
      color: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400 border-pink-100 dark:border-pink-900',
    },
    {
      title: 'Seni',
      desc: 'Mengeksplorasi kreativitas lewat anyaman, mewarnai pasir, seni musik sederhana rebana religi, lukisan jari (finger painting), mengasah estetika islami.',
      icon: Palette,
      color: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400 border-yellow-105 dark:border-yellow-900',
    },
  ];

  // 2. Flagship Programs requested by the user
  const flagshipPrograms = [
    {
      title: 'Metode Ummi',
      desc: 'Pembelajaran Al-Qur\'an intensif yang menyenangkan, tartil, berfokus pada pelafalan tajwid yang murni sejak dini.',
      icon: '📖',
    },
    {
      title: 'Hafalan Al-Qur\'an',
      desc: 'Hafalan rutin surat-surat pendek dalam Juz 30 (Surat An-Nas s.d An-Naba\') serta doa harian bermakna.',
      icon: '🕌',
    },
    {
      title: 'Pendidikan Karakter',
      desc: 'Menanamkan adab islami harian, kebiasaan menolong, berterima kasih, kebersihan diri, dan pembentukan watak luhur.',
      icon: '🤝',
    },
    {
      title: 'Parenting Class',
      desc: 'Pertemuan bulanan pakar psikologi & orang tua untuk mengasuh anak selaras dan harmonis antara rumah dan sekolah.',
      icon: '👨‍👩‍👧',
    },
    {
      title: 'Praktik Ibadah',
      desc: 'Latihan berwudhu, pembiasaan sholat fardhu & dhuha berjamaah di mushola sekolah demi penanaman habitus harian.',
      icon: '🕋',
    },
    {
      title: 'Kreativitas Anak',
      desc: 'Kegiatan cooking class harian, outing class menyenangkan, panggung ekspresi, karsa seni daur ulang, melatih mental ceria.',
      icon: '🎨',
    },
  ];

  // 3. School Facilities requested by the user
  const facilities = [
    {
      title: 'Ruang Kelas Nyaman',
      desc: 'Dilengkapi pendingin udara (AC), karpet bersih, meja ergonomis, pencahayaan alami melimpah, dan dekorasi Islami ramah anak.',
      icon: '🏫',
      bg: 'from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50',
    },
    {
      title: 'Perpustakaan Anak',
      desc: 'Koleksi ratusan buku dongeng bergambar, ensiklopedia Islami balita, buku rabaan, serta area baca santai beralaskan bantal empuk.',
      icon: '📚',
      bg: 'from-yellow-50 to-yellow-10 w dark:from-yellow-950/40 dark:to-yellow-900/40',
    },
    {
      title: 'Media Pembelajaran Interaktif',
      desc: 'Pemanfaatan Smart Board, modul visual, proyektor animasi sejarah nabi, dan kaset audio-murattal Metode Ummi yang interaktif.',
      icon: '🖥️',
      bg: 'from-indigo-50 to-indigo-100 dark:from-slate-800 dark:to-slate-850',
    },
    {
      title: 'Area Bermain Edukatif',
      desc: 'Taman bermain indoor & outdoor aman (ayunan, perosotan, jembatan tali, rumah pasir) berlapis lantai karet protektif antirambut.',
      icon: '🎠',
      bg: 'from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/30',
    },
    {
      title: 'Lingkungan Belajar Islami',
      desc: 'Suasana asri bertema pepohonan, poster doa sehari-hari, tidak bising, terjaga kebersihan wudhu, membiasakan salam di setiap sudut.',
      icon: '🌴',
      bg: 'from-teal-50 to-teal-100 dark:from-teal-950/45 dark:to-teal-900/45',
    },
    {
      title: 'Sarana Ibadah (Masjid)',
      desc: 'Masjid/Mushola representatif yang bersih untuk mempermudah latihan adab masjid, sholat dhuha, sholat berjamaah anak.',
      icon: '🕌',
      bg: 'from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/40',
    },
  ];

  return (
    <div className="py-12 bg-white dark:bg-slate-900/20 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* SECTION 1: PAUD Curriculum Domains */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-[#059669] font-bold text-xs uppercase tracking-widest rounded-full">
              Kurikulum Nasional
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
              6 Aspek Tumbuh Kembang PAUD
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Mendidik ananda secara holistik mencakup seluruh kemampuan fisik, nalar, moral, dan kreativitasnya selaras dengan standard Pendidikan Anak Usia Dini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paudDomains.map((domain, i) => {
              const IconComp = domain.icon;
              return (
                <motion.div
                  key={domain.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className={`bg-white dark:bg-slate-800 border p-6 rounded-3xl space-y-4 shadow-xs transition-hover hover:-translate-y-1 hover:shadow-md flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${domain.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      {domain.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                      {domain.desc}
                    </p>
                  </div>
                  <div className="text-[10px] text-right font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                    Kurikulum Nasional &bull; OK
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Flagship Programs / Program Unggulan */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 bg-yellow-10s dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400 font-bold text-xs uppercase tracking-widest rounded-full">
              Nilai Tambah &amp; Khasan
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
              Program Unggulan Salsabila
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Program pembiasaan khusus untuk mengokohkan karakter, hafalan mutqin, kepribadian Qurani, dan kesiapan hidup bersosialisasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flagshipPrograms.map((prog, i) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="bg-emerald-800 text-white p-6 rounded-3xl space-y-4 shadow-sm relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Decorative Pattern Background */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-600 rounded-bl-full opacity-40 group-hover:scale-125 transition-transform" />
                
                <div className="space-y-3 relative z-10">
                  <div className="text-4xl">{prog.icon}</div>
                  <h3 className="font-display font-bold text-lg text-yellow-300">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-emerald-100 text-justify leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-700/50 text-[10px] uppercase font-bold tracking-widest text-[#FACC15] relative z-10">
                  TKIT Salsabila Flagship • 🕌
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 3: School Facilities */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 font-bold text-xs uppercase tracking-widest rounded-full">
              Prasarana Menyenangkan
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
              Fasilitas Pembelajaran Edukatif
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Membangun ruang tumbuh kembang anak secara nyaman, higienis, ber-AC, aman, dan menyejukkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac, i) => (
              <motion.div
                key={fac.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className={`bg-gradient-to-br ${fac.bg} border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:scale-[1.01] transition-transform`}
              >
                <div>
                  <div className="text-4xl mb-3">{fac.icon}</div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-slate-850">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed text-justify mt-1">
                    {fac.desc}
                  </p>
                </div>
                <div className="text-[10px] text-right uppercase text-slate-500 font-bold tracking-wide">
                  Tersedia untuk Ananda • Aman &amp; Steril
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
