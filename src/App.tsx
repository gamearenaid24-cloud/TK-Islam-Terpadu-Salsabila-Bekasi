/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Curriculum from './components/Curriculum';
import GalleryView from './components/GalleryView';
import NewsSection from './components/NewsSection';
import PPDBForm from './components/PPDBForm';
import AdminPortal from './components/AdminPortal';
import AdminLogin from './components/AdminLogin';
import ContactSection from './components/ContactSection';
import AIAssistant from './components/AIAssistant';
import Testimonials from './components/Testimonials';
import WhatsAppButton from './components/WhatsAppButton';

import { PPDBRegistration, NewsArticle, Teacher, Student, GalleryItem, Testimonial } from './types';

// Seed Initial News Articles
const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'art-1',
    title: 'Penerimaan Peserta Didik Baru (PPDB) Gelombang 1 Tahun Ajaran 2026/2027 Resmi Dibuka',
    category: 'Pengumuman',
    content: 'TK Islam Terpadu Salsabila Bekasi secara resmi membuka pintu pendaftaran untuk calon siswa didik baru tahun ajaran 2026/2027.\n\nDengan kuota terbatas di masing-masing rombongan belajar (Sentra Imtaq, Sentra Persiapan, dan Sentra Balok), Ayah & Bunda diimbau untuk segera mengisi formulir pendaftaran online yang tersedia di portal ini guna mendapatkan kuota wawancara gelombang pertama.\n\nPendaftaran gelombang kesatu akan berlangsung mulai tanggal 1 Mei s.d 30 Juni 2026. Persyaratan administrasi yang diperlukan meliputi scan akte kelahiran anak, fotokopi kartu keluarga, serta pasfoto ceria ananda.',
    date: '2026-05-29',
    author: 'Operator Sekolah',
    imageUrl: '',
    views: 124,
  },
  {
    id: 'art-2',
    title: 'Praktik Wudhu Teratur dan Sholat Dhuha Berjamaah: Pembiasaan Adab Harian Sejak Dini',
    category: 'Artikel',
    content: 'Pembiasaan ibadah harian merupakan salah satu pilar pendidikan karakter unggulan di TKIT Salsabila Bekasi.\n\nSetiap pagi pukul 08.00 WIB, sebelum memasuki ruang sentra masing-masing, ananda diajak berwudhu secara tertib dipandu oleh ustadah wali kelas. Pembiasaan praktik ibadah riil seperti sholat dhuha diajarkan dengan cara mencontoh (modeling) yang penuh kesabaran agar ananda menumbuhkan kecintaan terhadap ibadah fardhu & sunnah tanpa unsur paksaan.\n\nMelalui metode ini, ananda tidak hanya menghafal bacaan sholat, melainkan terlatih disiplin, menjaga kesucian diri, dan menghargai pentingnya thaharah.',
    date: '2026-05-24',
    author: 'Ustadah Rahmawati, S.Psi.',
    imageUrl: '',
    views: 89,
  },
  {
    id: 'art-3',
    title: 'Keseruan Kegiatan Outing Class di Taman Edukasi Satwa Babelan',
    category: 'Event',
    content: 'Pada hari Kamis yang lalu, ananda TKIT Salsabila Bekasi berpartisipasi dalam agenda luar kelas (outing class) bertema pengenalan ciptaan Allah SWT bergambar satwa.\n\nKegiatan ini diadakan di Taman Edukasi Satwa Babelan, di mana anak-anak dapat menyentuh kelinci secara lembut, memberi makan kambing hias, dan menatap beraneka jenis burung berkicau. Pembiasaan pembelajaran kontekstual seperti ini melatih kecerdasan naturalis ananda, mengajarkan kasih sayang terhadap sesama mahluk hidup, sekaligus berekreasi meningkatkan motorik kasar anak di alam terbuka bersama ustadah pendamping.',
    date: '2026-05-18',
    author: 'Ustadah Amelia, S.Pd.',
    imageUrl: '',
    views: 215,
  }
];

// Seed Initial Teachers (DAPODIK)
const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tea-1',
    name: 'Yuyun Sulaeman, S.Pd.I.',
    role: 'Kepala Sekolah (Mudirah)',
    photoUrl: '🧕',
    email: 'yuyun.sulaeman@salsabila.sch.id',
    isActive: true,
  },
  {
    id: 'tea-2',
    name: 'Ustadah Fitriani, S.Pd.',
    role: 'Wakil Kepala Sekolah & Tata Usaha',
    photoUrl: '👩‍🏫',
    email: 'fitriani.tu@salsabila.sch.id',
    isActive: true,
  },
  {
    id: 'tea-3',
    name: 'Ustadah Rahmawati, S.Psi.',
    role: 'Koordinator Sentra Imtaq & Qur\'an',
    photoUrl: '🧕',
    email: 'rahma.psi@salsabila.sch.id',
    isActive: true,
  },
  {
    id: 'tea-4',
    name: 'Ustadah Amelia, S.Pd.',
    role: 'Guru Sentra Persiapan & Kognitif',
    photoUrl: '👩‍🏫',
    email: 'amelia.spd@salsabila.sch.id',
    isActive: true,
  }
];

// Seed Initial Students (Cohort 2026)
const INITIAL_STUDENTS: Student[] = [
  {
    id: 'st-001',
    name: 'Ahmad Al-Fatih',
    classGroup: 'Sentra Imtaq',
    parentName: 'Muhammad Ridwan',
    whatsapp: '8129938448',
    status: 'Aktif',
  },
  {
    id: 'st-002',
    name: 'Siti Humaira Khadijah',
    classGroup: 'Sentra Seni &amp; Musik',
    parentName: 'Bambang Hermanto',
    whatsapp: '8571210884',
    status: 'Aktif',
  },
  {
    id: 'st-003',
    name: 'Farhan Az-Zuhri',
    classGroup: 'Sentra Balok',
    parentName: 'Hendra Wijaya',
    whatsapp: '811442199',
    status: 'Aktif',
  },
  {
    id: 'st-004',
    name: 'Zahra Salsabila',
    classGroup: 'Sentra Persiapan',
    parentName: 'Supriyanto',
    whatsapp: '8139556112',
    status: 'Aktif',
  }
];

// Seed Initial PPDB Applications
const INITIAL_REGISTRATIONS: PPDBRegistration[] = [
  {
    id: 'REG-2026-642',
    childName: 'Muhammad Salman Al-Farisi',
    birthDate: '2021-03-12',
    gender: 'Laki-laki',
    parentName: 'Hafizuddin',
    whatsappNumber: '8123456789',
    address: 'Pondok Ungu Permai Sektor 5, Blok F4 No. 12, Bahagia, Babelan, Bekasi',
    documentName: 'Akte_Lahir_Salman.pdf',
    status: 'Dokumen Terverifikasi',
    createdAt: '2026-05-28',
    notes: 'Scan akta lahir dan KK dinyatakan valid. Direkomendasikan untuk uji coba bermain di kelas sentra sabtu ini.',
  },
  {
    id: 'REG-2026-118',
    childName: 'Aisyah Az-Zahra',
    birthDate: '2021-08-25',
    gender: 'Perempuan',
    parentName: 'Budi Santoso',
    whatsappNumber: '8569876543',
    address: 'Jl. Raya Babelan Gang Masjid No. 22, Babelan, Bekasi',
    documentName: 'Pas_Foto_Aisyah.jpg',
    status: 'Jadwal Wawancara',
    createdAt: '2026-05-27',
    notes: 'Jadwal wawancara dengan Mudirah Ibu Yuyun dijadwalkan sabtu ini pukul 09.30 WIB di ruang perpustakaan.',
  },
  {
    id: 'REG-2026-004',
    childName: 'Kenzie Ibrahim',
    birthDate: '2021-11-04',
    gender: 'Laki-laki',
    parentName: 'Aris Munandar',
    whatsappNumber: '8192233445',
    address: 'Cluster Salsabila Regency Blok A No. 1, Bahagia, Babelan, Bekasi',
    documentName: 'Kartu_Keluarga_Kenzie.pdf',
    status: 'Menunggu Verifikasi',
    createdAt: '2026-05-29',
    notes: 'Berkas masuk via portal online. Masih mengantre validasi dokumen administrasi awal oleh Ibu Fitriani.',
  }
];

// Seed Dynamic Photo Gallery items (categories requested: Belajar, Outing Class, Lomba, Wisuda, Kegiatan Keagamaan)
const INITIAL_GALLERY: GalleryItem[] = [
  { id: 'g-1', title: 'Belajar Konstruksi di Sentra Balok', category: 'Belajar', imageUrl: '', date: '2026-05-27' },
  { id: 'g-2', title: 'Outing Class Edukasi Satwa Air', category: 'Outing Class', imageUrl: '', date: '2026-05-18' },
  { id: 'g-3', title: 'Juara 1 Lomba Menggambar Sekecamatan', category: 'Lomba', imageUrl: '', date: '2026-04-12' },
  { id: 'g-4', title: 'Uji Syukur Pelepasan Siswa Didik Angkatan XII', category: 'Wisuda', imageUrl: '', date: '2025-06-21' },
  { id: 'g-5', title: 'Simulasi Manasik Haji Guru & Murid', category: 'Kegiatan Keagamaan', imageUrl: '', date: '2026-03-04' },
  { id: 'g-6', title: 'Eksperimen Bahan Alam di Sentra Sains', category: 'Belajar', imageUrl: '', date: '2026-05-22' },
  { id: 'g-7', title: 'Uji Kerapihan Membaca Metode Ummi', category: 'Kegiatan Keagamaan', imageUrl: '', date: '2025-11-15' },
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
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

export default function App() {
  const [currentView, setCurrentView] = useState<string>('beranda');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminLogged, setIsAdminLogged] = useState<boolean>(() => {
    const saved = localStorage.getItem('salsabila_admin_logged');
    return saved === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Synchronized States using LocalStorage Fallback so it is dynamic
  const [registrations, setRegistrations] = useState<PPDBRegistration[]>(() => {
    const saved = localStorage.getItem('salsabila_ppdb');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('salsabila_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('salsabila_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('salsabila_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('salsabila_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('salsabila_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('salsabila_ppdb', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('salsabila_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('salsabila_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('salsabila_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('salsabila_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('salsabila_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Dark Mode side effects
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddRegistration = (newReg: PPDBRegistration) => {
    setRegistrations([newReg, ...registrations]);
  };

  const handleUpdateRegistration = (id: string, update: Partial<PPDBRegistration>) => {
    setRegistrations(prev =>
      prev.map(item => (item.id === id ? { ...item, ...update } : item))
    );
  };

  const handleAddArticle = (newArt: NewsArticle) => {
    setArticles([newArt, ...articles]);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleAddTeacher = (newTea: Teacher) => {
    setTeachers([newTea, ...teachers]);
  };

  const handleAddStudent = (newStu: Student) => {
    setStudents([newStu, ...students]);
  };

  const handleAddGalleryItem = (newGallery: GalleryItem) => {
    setGalleryItems([newGallery, ...galleryItems]);
  };

  const handleAddTestimonial = (newTest: Testimonial) => {
    setTestimonials([newTest, ...testimonials]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Universal Sticky Header Navigation */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setIsAdminMode(false); // Disable layout blocking if they select ordinary menus
          setCurrentView(view);
        }}
        isAdminMode={isAdminMode}
        isAdminLogged={isAdminLogged}
        onToggleAdminMode={() => {
          if (isAdminLogged) {
            if (isAdminMode) {
              setIsAdminMode(false);
            } else {
              setIsAdminMode(false);
              setIsAdminLogged(false);
              localStorage.setItem('salsabila_admin_logged', 'false');
            }
          } else {
            setIsLoginModalOpen(true);
          }
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => {
          setIsDarkMode(!isDarkMode);
        }}
      />

      {/* Dynamic Content Frame */}
      <main className="flex-1">
        {isAdminMode ? (
          /* Secure Master Admin Workspace Panel */
          <AdminPortal
            registrations={registrations}
            onUpdateRegistration={handleUpdateRegistration}
            onAddRegistration={handleAddRegistration}
            articles={articles}
            onAddArticle={handleAddArticle}
            onDeleteArticle={handleDeleteArticle}
            teachers={teachers}
            onAddTeacher={handleAddTeacher}
            students={students}
            onAddStudent={handleAddStudent}
          />
        ) : (
          /* Public Web Pages */
          <div>
            {currentView === 'beranda' && (
              <div>
                {/* Hero / statistics promo */}
                <Hero onViewChange={setCurrentView} articles={articles} />
                <Testimonials testimonials={testimonials} onAddTestimonial={handleAddTestimonial} />
              </div>
            )}

            {currentView === 'profil' && (
              <Profile />
            )}

            {currentView === 'kurikulum' && (
              <Curriculum />
            )}

            {currentView === 'galeri' && (
              <GalleryView items={galleryItems} onAddGalleryItem={handleAddGalleryItem} isAdmin={isAdminLogged} />
            )}

            {currentView === 'berita' && (
              <NewsSection articles={articles} />
            )}

            {currentView === 'ppdb' && (
              <PPDBForm
                onRegister={handleAddRegistration}
                allRegistrations={registrations}
              />
            )}

            {currentView === 'kontak' && (
              <ContactSection />
            )}
          </div>
        )}
      </main>

      {/* Universal Footer section (Except in full admin console mode for layout comfort) */}
      {!isAdminMode && (
        <Footer onViewChange={setCurrentView} />
      )}

      {/* Universal Floating intelligent Salsa AI assistant */}
      <AIAssistant />

      {/* Persistent WhatsApp Chat button with dynamic pre-filled content */}
      <WhatsAppButton currentView={currentView} />

      {/* Admin Login Modal with registered email validation */}
      {isLoginModalOpen && (
        <AdminLogin
          onLoginSuccess={(email) => {
            setIsAdminLogged(true);
            setIsAdminMode(true);
            localStorage.setItem('salsabila_admin_logged', 'true');
            setIsLoginModalOpen(false);
          }}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}

    </div>
  );
}
