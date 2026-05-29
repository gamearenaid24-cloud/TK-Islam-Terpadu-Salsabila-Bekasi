/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Quote, Landmark, Target, Sparkles, Award, Star, Heart, CheckCircle } from 'lucide-react';

export default function Profile() {
  const visions = [
    'Membentuk kepribadian anak mushlih (sholeh) sejak dini.',
    'Menumbuhkan kecintaan yang mendalam terhadap membaca & menghafal Al-Qur\'an.',
    'Mengembangkan minat, rasa ingin tahu ilmiah, dan cara berpikir yang mandiri.',
    'Membiasakan peradaban akhlak mulia dan adab Islami harian anak.'
  ];

  const missions = [
    {
      title: 'Optimalisasi Kurikulum Khas Salsabila',
      desc: 'Menyelenggarakan stimulasi terpadu antara Kurikulum PAUD Nasional, nilai-nilai keagamaan melalui Metode Sentra (BCCT), dan pembelajaran Al-Qur\'an intensif Metode Ummi.',
    },
    {
      title: 'Pendidikan Karakter & Adab Berkelanjutan',
      desc: 'Membiasakan akhlakul karimah melalui teladan guru, bercerita kisah islami, pelaksanaan ibadah harian teratur, dan pembiasaan adab-adab praktis sehari-hari.',
    },
    {
      title: 'Kolaborasi Sinergis Rumah & Sekolah',
      desc: 'Membangun sinergi yang aktif melalui Kelas Orang Tua (Parenting Class), konsultasi tumbuh kembang anak berkala, dan pelibatan komite orang tua.',
    },
    {
      title: 'Fasilitasi Kreativitas & Potensi Unik Anak',
      desc: 'Menyediakan lingkungan bermain yang edukatif, memicu imajinasi, eksplorasi seni, fisik motorik halus dan kasar, serta melatih pemecahan masalah sederhana.',
    },
  ];

  const staffList = [
    {
      name: 'Yuyun Sulaeman, S.Pd.I.',
      role: 'Kepala Sekolah (Mudirah)',
      roleId: 'Kepala Sekolah',
      desc: 'Merancang visi akademis & keselarasan pengajaran Islami TKIT Salsabila.',
      emoji: '🧕',
    },
    {
      name: 'Ustadah Fitriani, S.Pd.',
      role: 'Wakil Kepala Sekolah & Tata Usaha',
      roleId: 'Operator',
      desc: 'Mengelola administrasi sekolah, perizinan DAPODIK, dan kemitraan PPDB.',
      emoji: '👩‍🏫',
    },
    {
      name: 'Ustadah Rahmawati, S.Psi.',
      role: 'Koordinator Sentra Imtaq & Qur\'an',
      roleId: 'Guru',
      desc: 'Spesialis pengajaran Metode Ummi & pembentukan karakter islami ananda.',
      emoji: '🧕',
    },
    {
      name: 'Ustadah Amelia, S.Pd.',
      role: 'Guru Sentra Persiapan & Kognitif',
      roleId: 'Guru',
      desc: 'Mengarahkan kemampuan numerasi, literasi dasar, dan kemandirian.',
      emoji: '👩‍🏫',
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900/40 py-12 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 font-bold text-xs uppercase tracking-widest text-[#059669] rounded-full">
            Tentang Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
            Profil TKIT Salsabila Bekasi
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mengenal secara dekat lembaga pendidikan Islam anak usia dini unggulan di Babelan, Bekasi.
          </p>
        </div>

        {/* Welcome Section (Sambutan Kepala Sekolah) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-100 dark:border-slate-700/80 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          
          {/* Avatar side */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="w-40 h-40 rounded-full border-4 border-emerald-100 bg-emerald-50 dark:bg-emerald-900 flex items-center justify-center text-6xl shadow-inner relative">
              🧕
              <div className="absolute -bottom-1 -right-1 p-2 bg-yellow-400 rounded-full border-2 border-white dark:border-slate-800" title="Kepala Sekolah">
                <Award className="w-5 h-5 text-emerald-950" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">Yuyun Sulaeman, S.Pd.I.</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Kepala Sekolah TKIT Salsabila</p>
            </div>
          </div>

          {/* Letter Side */}
          <div className="lg:col-span-8 space-y-4 relative">
            <Quote className="absolute -top-6 -left-6 w-12 h-12 text-emerald-200/50 dark:text-slate-700/50 pointer-events-none" />
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#059669] dark:text-emerald-400">
              Sambutan Kepala Sekolah
            </h3>
            <div className="space-y-4 text-justify text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              <p>
                <strong>Assalamu'alaikum Warahmatullahi Wabarakatuh,</strong>
              </p>
              <p>
                Segala puji bagi Allah SWT atas limpahan rahmat, hidayah, dan karunia-Nya. Shalawat serta salam senantiasa tercurah kepada uswatun hasanah kita Rasulullah SAW. Selamat datang di portal resmi TK Islam Terpadu Salsabila Bekasi.
              </p>
              <p>
                Anak usia dini adalah masa emas (the golden age) di mana fondasi keimanan, akhlak, kognitif, dan kepribadian dibangun. Di TKIT Salsabila, kami berkomitmen mendampingi proses tumbuh kembang buah hati Ayah dan Bunda dengan pendekatan yang ramah anak, islami, dan kontekstual. Dengan perpaduan pembelajaran Al-Qur'an tartil Metode Ummi dan Metode Sentra, kami berikhtiar agar setiap ananda tumbuh gembira, mandiri, dan berkarakter Qurani sejak dini.
              </p>
              <p>
                Kemitraan yang terarah antara rumah dan sekolah adalah kunci keberhasilan pendidikan. Terima kasih atas kepercayaan Ayah dan Bunda yang telah melimpahkan bimbingan pendidikan ananda kepada kami. Mari melangkah bersama mencetak generasi emas masa depan bangsa.
              </p>
              <p className="font-semibold text-[#059669] dark:text-emerald-400">
                Wassalamu'alaikum Warahmatullahi Wabarakatuh.
              </p>
            </div>
          </div>
        </div>

        {/* History (Sejarah) Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 order-2 md:order-1">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <Landmark className="w-5 h-5 text-yellow-500" />
              <h3 className="font-display font-extrabold text-2xl">Sejarah Pendirian</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 text-justify leading-relaxed">
              TK Islam Terpadu Salsabila Bekasi didirikan pada tahun **2012** di bawah naungan Yayasan Pendidikan Islam Salsabila Bekasi. Pendirian lembaga ini didasari atas kepedulian masyarakat dan tokoh agama akan pentingnya lembaga PAUD berkualitas tinggi yang tidak hanya melatih kognitif anak secara unggul, tetapi juga menanamkan adab-adab Islami dan kecintaan terhadap mushaf Al-Qur'an sejak balita.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 text-justify leading-relaxed">
              Selama lebih dari **14 tahun** berkiprah, TKIT Salsabila Bekasi terus bertransformasi. Berawal dari 15 siswa pertama, kini sekolah dipercaya mendidik lebih dari 140 siswa setiap tahunnya. Dengan akreditasi 'A' yang disandang, kurikulum kami disempurnakan dengan memadukan standard Dinas Pendidikan, metode Quran Ummi, rujukan karakter islami terpadu, serta sarana bermain sentra komprehensif.
            </p>
          </div>
          <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-8 rounded-3xl space-y-4 order-1 md:order-2 flex flex-col justify-center">
            <span className="text-yellow-400 text-3xl font-display font-black">14+ Tahun</span>
            <h4 className="font-bold text-lg">Konsistensi &amp; Dedikasi</h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Kami secara konsisten melayani generasi Bekasi Utara (Pondok Ungu, Babelan) dengan standard pendidikan bermutu tinggi tanpa mengorbankan keceriaan dunia bermain anak.
            </p>
            <div className="pt-2 border-t border-emerald-500/50 flex gap-4 text-xs">
              <div>
                <div className="font-bold text-yellow-300">NPSN Resmi</div>
                <div>69825989</div>
              </div>
              <div className="w-[1px] bg-emerald-500" />
              <div>
                <div className="font-bold text-yellow-300">Izin Kemenkumham</div>
                <div>Terdaftar Lengkap</div>
              </div>
            </div>
          </div>
        </div>

        {/* Visi & Misi section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Visi Card */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-emerald-100/40 space-y-6">
            <div className="flex gap-3 items-center text-emerald-800 dark:text-emerald-400">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-emerald-600 font-bold">Visi Kami</div>
                <h3 className="font-display font-black text-xl leading-none">Generasi Qurani</h3>
              </div>
            </div>
            
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2 italic leading-relaxed text-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-emerald-100/30">
              &ldquo;Membentuk Generasi Qurani yang Cerdas, Mandiri, dan Berakhlak Mulia sejak Usia Emas.&rdquo;
            </p>

            <ul className="space-y-3 pt-2">
              {visions.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Misi Card */}
          <div className="bg-yellow-50/45 dark:bg-yellow-950/10 p-8 rounded-3xl border border-yellow-200/30 space-y-6">
            <div className="flex gap-3 items-center text-yellow-800 dark:text-yellow-400">
              <div className="p-3 bg-yellow-500 text-emerald-950 rounded-2xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-yellow-600 font-bold">Misi Kami</div>
                <h3 className="font-display font-black text-xl leading-none">Langkah Strategis</h3>
              </div>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scroll scroll-smooth">
              {missions.map((m, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-yellow-100/30 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400 text-[10px] text-emerald-950 font-bold">
                      {i + 1}
                    </span>
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Struktur Organisasi (Organization Chart) Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
              Struktur Organisasi Sekolah
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pendidik dan Tenaga Kependidikan Profesional Mitra Belajar Terbaik bagi Ananda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staffList.map((staff, i) => (
              <motion.div
                key={staff.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-6 rounded-3xl shadow-xs text-center space-y-3 hover:scale-[1.01] transition-transform"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-3xl mx-auto flex items-center justify-center border border-emerald-100 dark:border-emerald-900">
                  {staff.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    {staff.name}
                  </h4>
                  <span className="inline-block mt-1 px-3 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] uppercase rounded-full">
                    {staff.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed-snug text-center">
                  {staff.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
