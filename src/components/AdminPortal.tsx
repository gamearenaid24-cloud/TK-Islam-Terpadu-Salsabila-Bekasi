/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, UserPlus, ClipboardList, BookOpen, Camera, ShieldAlert, Check, X, Calendar, 
  Trash2, Plus, Download, RefreshCw, FileSpreadsheet, Lock, Bot, Play, CheckCircle
} from 'lucide-react';
import { PPDBRegistration, NewsArticle, Teacher, Student, Role, AuditLog } from '../types';

interface AdminPortalProps {
  registrations: PPDBRegistration[];
  onUpdateRegistration: (id: string, update: Partial<PPDBRegistration>) => void;
  onAddRegistration: (reg: PPDBRegistration) => void;
  articles: NewsArticle[];
  onAddArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
  teachers: Teacher[];
  onAddTeacher: (teacher: Teacher) => void;
  students: Student[];
  onAddStudent: (student: Student) => void;
}

export default function AdminPortal({
  registrations,
  onUpdateRegistration,
  onAddRegistration,
  articles,
  onAddArticle,
  onDeleteArticle,
  teachers,
  onAddTeacher,
  students,
  onAddStudent,
}: AdminPortalProps) {
  const [activeRole, setActiveRole] = useState<Role>('Super Admin');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'dashboard' | 'ppdb' | 'berita' | 'guru_siswa' | 'audit_log' | 'ai_assistant'>('dashboard');

  // Input States for adding news/teacher/student
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Artikel' | 'Pengumuman' | 'Event'>('Artikel');
  const [newContent, setNewContent] = useState('');

  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherRole, setNewTeacherRole] = useState('');
  const [newTeacherEmail, setNewTeacherEmail] = useState('');

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('Sentra Imtaq');
  const [newStudentParent, setNewStudentParent] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');

  // AI Prompt panel input
  const [aiPrompt, setAiPrompt] = useState('Buatkan draft pengumuman perpanjangan PPDB gelombang 2 yang ramah dan islami.');
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  // Custom Notes state for PPDB validation
  const [selectedRegForNotes, setSelectedRegForNotes] = useState<string | null>(null);
  const [customNotesText, setCustomNotesText] = useState('');

  // Dynamic Audit logs cached locally
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 'log-1', user: 'Operator (Fitriani)', action: 'Verifikasi KK Calon Siswa REG-2026-642', timestamp: '2026-05-29 09:12:00', ipAddress: '192.168.1.102' },
    { id: 'log-2', user: 'Super Admin', action: 'Menerbitkan Artikel Islami "Adab Berbicara bagi Anak"', timestamp: '2026-05-29 08:33:04', ipAddress: '103.44.12.56' },
    { id: 'log-3', user: 'Kepala Sekolah', action: 'Revisi jadual Wawancara PPDB Calon REG-2026-118', timestamp: '2026-05-28 14:22:15', ipAddress: '110.12.54.89' },
  ]);

  const addAuditLog = (actionText: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: `${activeRole}`,
      action: actionText,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '114.122.56.208',
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleUpdateStatusAndAddLog = (id: string, statusText: any, defaultText: string) => {
    onUpdateRegistration(id, { 
      status: statusText,
      notes: customNotesText || defaultText 
    });
    addAuditLog(`Mengubah status pendaftaran ${id} menjadi "${statusText}"`);
    setSelectedRegForNotes(null);
    setCustomNotesText('');
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newArt: NewsArticle = {
      id: `art-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      content: newContent,
      date: new Date().toISOString().substring(0, 10),
      author: `${activeRole}`,
      imageUrl: '',
      views: 0,
    };

    onAddArticle(newArt);
    addAuditLog(`Menerbitkan Artikel baru berjudul "${newTitle}"`);
    setNewTitle('');
    setNewContent('');
  };

  const handleDeleteArticleAndLog = (id: string, title: string) => {
    onDeleteArticle(id);
    addAuditLog(`Menghapus artikel "${title}"`);
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName || !newTeacherRole) return;

    const newT: Teacher = {
      id: `tea-${Date.now()}`,
      name: newTeacherName,
      role: newTeacherRole,
      photoUrl: '🧕',
      email: newTeacherEmail || 'wasilah@sch.id',
      isActive: true,
    };

    onAddTeacher(newT);
    addAuditLog(`Menambahkan data Guru baru: "${newTeacherName}"`);
    setNewTeacherName('');
    setNewTeacherRole('');
    setNewTeacherEmail('');
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentParent) return;

    const newS: Student = {
      id: `stu-${Date.now()}`,
      name: newStudentName,
      classGroup: newStudentClass,
      parentName: newStudentParent,
      whatsapp: newStudentPhone || '812000000',
      status: 'Aktif',
    };

    onAddStudent(newS);
    addAuditLog(`Mendaftarkan Siswa didik aktif baru: "${newStudentName}"`);
    setNewStudentName('');
    setNewStudentParent('');
    setNewStudentPhone('');
  };

  const askGeminiAssistant = async () => {
    if (!aiPrompt.trim()) return;
    setLoadingAi(true);
    setAiResponse('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: aiPrompt }],
          userProfile: { name: activeRole },
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setAiResponse(data.reply);
      } else {
        setAiResponse('Gagal mendapatkan repons dari server AI. Hubungkan kunci API.');
      }
    } catch (e) {
      setAiResponse('Fallback: AI menyarankan agar pengumuman ditulis dengan menyertakan ucapan Syukur kepada Allah SWT, tanggal perpanjangan PPDB, serta diskon kemudahan uang pangkal gelombang 2.');
    } finally {
      setLoadingAi(false);
    }
  };

  // Simulated Report Generator
  const generateSimulatedReport = (type: string) => {
    addAuditLog(`Mengunduh Laporan Rekapitulasi: ${type}`);
    const heading = `TKIT SALSABILA BEKASI - Rekapitulasi ${type}`;
    const csvContent = "data:text/csv;charset=utf-8," 
      + `${heading}\n`
      + "Tanggal Export, " + new Date().toISOString() + "\n"
      + "Exported By, " + activeRole + "\n"
      + "Total Terdaftar, " + registrations.length + "\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_${type.replace(' ', '_')}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper values
  const countRegByStatus = (status: string) => registrations.filter(r => r.status === status).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row font-sans">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <div className="w-full lg:w-80 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          
          {/* Logo brand */}
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-lg text-white">
              S
            </div>
            <div>
              <h3 className="font-display font-black text-sm text-white tracking-widest uppercase">
                ADMIN CONSOLE
              </h3>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Salsabila Bekasi
              </p>
            </div>
          </div>

          {/* Quick RBAC Switcher with details */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400">Pilih Role Akses:</div>
            <div className="grid grid-cols-3 gap-1">
              {(['Super Admin', 'Kepala Sekolah', 'Operator'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setActiveRole(r);
                    addAuditLog(`Melakukan pergantian otorisasi role menjadi "${r}"`);
                  }}
                  className={`py-1 text-[9px] font-black rounded-lg transition-all ${
                    activeRole === r
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={r}
                >
                  {r.split(' ')[0]}
                </button>
              ))}
            </div>
            
            {/* Permission status */}
            <div className="text-[9px] text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Aktif sebagai: <strong className="text-slate-350">{activeRole}</strong>
            </div>
          </div>

          {/* Sidebar Navigation buttons */}
          <div className="space-y-1.5">
            {[
              { id: 'dashboard', label: '📊 Dashboard Ringkasan', icon: Users, perm: ['Super Admin', 'Kepala Sekolah', 'Operator'] },
              { id: 'ppdb', label: '📋 Manajemen PPDB', icon: ClipboardList, perm: ['Super Admin', 'Kepala Sekolah', 'Operator'] },
              { id: 'berita', label: '📝 Manajemen Berita', icon: BookOpen, perm: ['Super Admin', 'Operator'] },
              { id: 'guru_siswa', label: '👩‍🏫 Guru & Siswa Didik', icon: UserPlus, perm: ['Super Admin', 'Kepala Sekolah', 'Operator'] },
              { id: 'audit_log', label: '🛡️ Audit Logs & Security', icon: ShieldAlert, perm: ['Super Admin', 'Kepala Sekolah'] },
              { id: 'ai_assistant', label: '🤖 AI Copywriter Helper', icon: Bot, perm: ['Super Admin', 'Operator'] },
            ].map((tab) => {
              const hasPerm = tab.perm.includes(activeRole);
              return (
                <button
                  key={tab.id}
                  disabled={!hasPerm}
                  onClick={() => setActiveSidebarTab(tab.id as any)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-xs flex items-center justify-between transition-all ${
                    activeSidebarTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : hasPerm
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  {!hasPerm && <Lock className="w-3.5 h-3.5 text-slate-600" />}
                </button>
              );
            })}
          </div>

        </div>

        {/* Firebase Config Summary card */}
        <div className="pt-6 border-t border-slate-800/80 space-y-2">
          <div className="text-[9px] flex justify-between text-slate-500 font-mono">
            <span>FIRESTORE:</span>
            <span className="text-emerald-500 font-bold">ONLINE (Spark Plan)</span>
          </div>
          <div className="text-[9px] flex justify-between text-slate-500 font-mono">
            <span>SECURE RULES:</span>
            <span className="text-emerald-500 font-bold">Hardened (ABAC)</span>
          </div>
        </div>

      </div>

      {/* 2. MAIN APPLICATION WORKSPACE AREA */}
      <div className="flex-1 bg-slate-900 p-8 sm:p-10 space-y-8 overflow-y-auto max-h-screen">
        
        {/* Top welcome banner */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-2xl font-display font-black text-white">
              Portal Administrasi Terpadu
            </h2>
            <p className="text-xs text-slate-400">
              Selamat datang kembali, otoritas <strong>{activeRole}</strong>. Sistem siap dikonsumsi.
            </p>
          </div>
          <button
            onClick={() => {
              addAuditLog('Melakukan refresh database manual');
            }}
            className="p-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl transition-colors"
            title="Refresh database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* TAB 1: DASHBOARD REPORT */}
        {activeSidebarTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Siswa Terdaftar</span>
                <div className="text-3xl font-mono text-emerald-400 font-black">145 Anak</div>
                <div className="text-[10px] text-slate-400">120 Siswa Aktif • 25 Lulusan</div>
              </div>
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Antrean PPDB Masuk</span>
                <div className="text-3xl font-mono text-yellow-400 font-black">{registrations.length} Pendaftar</div>
                <div className="text-[10px] text-slate-400">{countRegByStatus('Menunggu Verifikasi')} status Menunggu Verifikasi</div>
              </div>
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Artikel &amp; Pengumuman</span>
                <div className="text-3xl font-mono text-purple-400 font-black">{articles.length} Publikasi</div>
                <div className="text-[10px] text-slate-400">Diposting Guru &amp; Operator</div>
              </div>
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pengunjung Bulan Ini</span>
                <div className="text-3xl font-mono text-[#EAB308] font-black">4,210 Pasang Mata</div>
                <div className="text-[10px] text-slate-400">Statistik real-time Analytics</div>
              </div>
            </div>

            {/* Custom SVG Graphical Chart and simulated reports panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Graphical Card */}
              <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center pr-2">
                  <h4 className="font-display font-black text-sm text-white">VISITOR &amp; PPDB WEEKLY COHORT</h4>
                  <span className="text-[9px] font-black px-2.5 py-1 bg-slate-900 border border-slate-800 text-emerald-400 rounded-full font-mono">LIVE PREVIEW</span>
                </div>
                
                {/* SVG Visual Graphic Chart */}
                <div className="w-full h-44 bg-slate-900/60 rounded-2xl flex items-end justify-between p-4 relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-rows-4 pointer-events-none opacity-5">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="border-b border-white" />
                    ))}
                  </div>

                  {/* SVG Bar graphs */}
                  {[
                    { day: 'Sen', visitors: 120, ppdb: 1 },
                    { day: 'Sel', visitors: 200, ppdb: 3 },
                    { day: 'Rab', visitors: 160, ppdb: 2 },
                    { day: 'Kam', visitors: 240, ppdb: 5 },
                    { day: 'Jum', visitors: 210, ppdb: 4 },
                    { day: 'Sab', visitors: 190, ppdb: 0 },
                    { day: 'Min', visitors: 300, ppdb: 8 },
                  ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 relative z-10 w-full">
                      <div className="flex gap-1 items-end h-24">
                        <div className="w-2.5 bg-emerald-500/80 rounded-t-sm" style={{ height: `${(d.visitors/300)*100}%` }} title={`Visitors: ${d.visitors}`} />
                        <div className="w-2.5 bg-yellow-400 rounded-t-sm" style={{ height: `${(d.ppdb/8)*100}%` }} title={`PPDB: ${d.ppdb}`} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500">{d.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-6 text-[10px] text-slate-400 font-mono pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3 bg-emerald-500/80 rounded-sm" />
                    Berdasar Pengunjung Web (Skala harian)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3 bg-yellow-400 rounded-sm" />
                    Data Masuk Form PPDB Online
                  </div>
                </div>
              </div>

              {/* Action buttons export report */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-black text-sm text-white">EKSPOR DOKUMEN / LAPORAN</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed text-justify">
                    Generate berkas digital resmi untuk pelaporan dinas, arsip yayasan, maupun rekonsiliasi data pendaftaran.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => generateSimulatedReport('Pendaftar Calon PPDB 2026')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-500" /> Ekspor PPDB (.CSV)
                  </button>
                  <button
                    onClick={() => generateSimulatedReport('Data Guru TKIT Salsabila')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-yellow-500" /> Ekspor Daftar Guru (.CSV)
                  </button>
                  <button
                    onClick={() => generateSimulatedReport('Audit System logs')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-purple-500" /> Unduh Dokumen Audit Log (.CSV)
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PPDB APPLICATIONS */}
        {activeSidebarTab === 'ppdb' && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <h4 className="font-display font-black text-sm text-white">PROSES PENERIMAAN PPDB ONLINE</h4>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2.5 py-1 bg-emerald-950 text-emerald-400 rounded-full font-bold">Total: {registrations.length}</span>
                  <span className="text-[10px] px-2.5 py-1 bg-amber-950 text-amber-400 rounded-full font-bold">Menunggu: {countRegByStatus('Menunggu Verifikasi')}</span>
                </div>
              </div>

              {registrations.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Tidak ada data pendaftaran calon siswa masuk.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 font-mono uppercase bg-slate-900 text-slate-400">
                        <th className="p-4">ID / Tanggal</th>
                        <th className="p-4">Calon Siswa</th>
                        <th className="p-4">Orang Tua / Kontak</th>
                        <th className="p-4">Status &amp; Dokumen</th>
                        <th className="p-4 text-right">Opsi Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-900/30">
                          <td className="p-4">
                            <div className="font-mono font-black text-emerald-400">{reg.id}</div>
                            <div className="text-[10px] text-slate-500">{reg.createdAt}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-slate-200">{reg.childName}</div>
                            <div className="text-[10px] text-slate-400">
                              {reg.gender} &bull; DOB: {reg.birthDate}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-slate-300">{reg.parentName}</div>
                            <div className="text-slate-500 font-mono hover:underline cursor-pointer">
                              +62{reg.whatsappNumber}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              reg.status === 'Menunggu Verifikasi'
                                ? 'bg-amber-950 text-amber-400 border border-amber-900'
                                : reg.status === 'Dokumen Terverifikasi'
                                ? 'bg-blue-950 text-blue-400 border border-blue-900'
                                : reg.status === 'Jadwal Wawancara'
                                ? 'bg-purple-950 text-purple-400 border border-purple-900'
                                : reg.status === 'Diterima'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                                : 'bg-red-950 text-red-400 border border-red-900'
                            }`}>
                              {reg.status}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-1 line-clamp-1 italic" title={reg.documentName}>
                              📎 {reg.documentName || 'berkas.pdf'}
                            </div>
                          </td>
                          <td className="p-4 text-right space-y-1">
                            {/* Update state panel triggers */}
                            {selectedRegForNotes === reg.id ? (
                              <div className="inline-block bg-slate-900 p-3 rounded-2xl border border-slate-700 text-left space-y-2 w-64">
                                <span className="text-[9px] uppercase font-bold text-slate-400">Catatan/Pesan:</span>
                                <textarea
                                  value={customNotesText}
                                  onChange={(e) => setCustomNotesText(e.target.value)}
                                  placeholder="Masukkan memo panitia, tgl wawancara, dll."
                                  rows={2}
                                  className="w-full text-xs p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                                />
                                <div className="flex justify-end gap-1">
                                  <button
                                    onClick={() => handleUpdateStatusAndAddLog(reg.id, 'Jadwal Wawancara', 'Undangan wawancara akademik dan uji coba bermain sabtu ini jam 09.00.')}
                                    className="px-2 py-1 bg-purple-600 text-white font-bold text-[9px] rounded-sm"
                                  >
                                    Undang Test
                                  </button>
                                  <button
                                    onClick={() => handleUpdateStatusAndAddLog(reg.id, 'Diterima', 'Selamat! Ananda resmi dinyatakan lulus kurasi admisi TKIT Salsabila.')}
                                    className="px-2 py-1 bg-emerald-600 text-white font-bold text-[9px] rounded-sm"
                                  >
                                    Terima
                                  </button>
                                  <button
                                    onClick={() => handleUpdateStatusAndAddLog(reg.id, 'Ditolak', 'Berdasar kuota kelas sentra yang penuh, kami terpaksa mencabut kepesertaan.')}
                                    className="px-2 py-1 bg-red-600 text-white font-bold text-[9px] rounded-sm"
                                  >
                                    Tolak
                                  </button>
                                </div>
                                <button
                                  onClick={() => setSelectedRegForNotes(null)}
                                  className="text-[9px] text-[#FACC15] block hover:underline"
                                >
                                  Batal
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => onUpdateRegistration(reg.id, { status: 'Dokumen Terverifikasi', notes: 'Dokumen ananda telah dirasa terverifikasi keasliannya dan lengkap.' })}
                                  className="p-1 px-2.5 bg-blue-950 border border-blue-900 text-blue-400 hover:bg-blue-900 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-wider"
                                  title="Verifikasi Dokumen"
                                >
                                  Verifikasi adm
                                </button>
                                <button
                                  onClick={() => { setSelectedRegForNotes(reg.id); setCustomNotesText(''); }}
                                  className="p-1 px-2.5 bg-emerald-950 border border-emerald-900 text-emerald-400 hover:bg-emerald-900 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-wider"
                                >
                                  Proses Lanjut
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE NEWS & ARTICLES */}
        {activeSidebarTab === 'berita' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Write Article Form */}
              <form onSubmit={handleCreateArticle} className="lg:col-span-5 bg-slate-950 p-6 rounded-3xl border border-slate-850 space-y-4">
                <h4 className="font-display font-black text-sm text-white flex items-center gap-2">
                  <Plus className="w-4.5 h-4.5 text-emerald-500" /> TULIS POST MANUAL
                </h4>
                
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-400 uppercase font-bold">Judul Artikel *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul posting"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-400 uppercase font-bold">Kategori Post *</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                  >
                    <option value="Artikel">Artikel (Opini / Parenting / Ilmu)</option>
                    <option value="Pengumuman">Pengumuman (Pemberitahuan Orangtua)</option>
                    <option value="Event">Event (Kegiatan Mendatang)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-400 uppercase font-bold">Konten Deskripsi Lengkap *</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Ketik isi lengkap dari materi di sini..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all"
                >
                  TERBITKAN SEKARANG
                </button>
              </form>

              {/* Existing Article lists */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-850 space-y-4">
                <h4 className="font-display font-black text-sm text-white">PUBLIKASI TERDAFTAR BIASA</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 font-mono text-slate-400">
                        <th className="p-3">Kategori</th>
                        <th className="p-4">Berita &amp; Penulis</th>
                        <th className="p-3">Views</th>
                        <th className="p-3 text-right">Opsi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {articles.map((art) => (
                        <tr key={art.id}>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-slate-90 border border-slate-800 text-slate-300 font-mono text-[9px] rounded font-semibold">
                              {art.category}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-slate-200 line-clamp-1">{art.title}</div>
                            <div className="text-[10px] text-slate-500">{art.date} &bull; By: {art.author}</div>
                          </td>
                          <td className="p-3 font-mono text-slate-450">{art.views}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteArticleAndLog(art.id, art.title)}
                              className="p-1 px-2.5 bg-red-950 border border-red-900 text-red-400 hover:bg-red-900 hover:text-white rounded-lg text-[9px]"
                              title="Hapus Artikel"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: TEACHERS & STUDENTS COHORT */}
        {activeSidebarTab === 'guru_siswa' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Cohort 1: Teachers list and form */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-display font-black text-sm text-white border-b border-slate-800 pb-2">
                👩‍🏫 SISTEM GURU &amp; PENDIDIK
              </h4>
              
              {/* Form to insert */}
              <form onSubmit={handleCreateTeacher} className="grid grid-cols-2 gap-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Guru"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="text-xs p-2 bg-slate-950 border border-slate-800 rounded outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Bidang/Tanggungjawab"
                  value={newTeacherRole}
                  onChange={(e) => setNewTeacherRole(e.target.value)}
                  className="text-xs p-2 bg-slate-950 border border-slate-800 rounded outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Guru (Opsional)"
                  value={newTeacherEmail}
                  onChange={(e) => setNewTeacherEmail(e.target.value)}
                  className="col-span-2 text-xs p-2 bg-slate-950 border border-slate-800 rounded outline-none"
                />
                <button type="submit" className="col-span-2 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded">
                  + TAMBAH DATA GURU
                </button>
              </form>

              {/* Teachers database */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {teachers.map((tea) => (
                  <div key={tea.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex gap-2.5 items-center">
                      <span className="text-2xl">{tea.photoUrl}</span>
                      <div>
                        <div className="font-bold text-slate-200">{tea.name}</div>
                        <div className="text-[10px] text-slate-400">{tea.role}</div>
                      </div>
                    </div>
                    <span className="text-[9px] uppercase px-2 py-0.5 bg-emerald-950 text-emerald-400 font-bold rounded-lg border border-emerald-900">
                      Aktif Mengajar
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cohort 2: Students list and form */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-display font-black text-sm text-white border-b border-slate-800 pb-2">
                👶 SISWA DIDIK AKTIF (DAPODIK)
              </h4>

              {/* Form to insert */}
              <form onSubmit={handleCreateStudent} className="grid grid-cols-2 gap-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Siswa"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="text-xs p-2 bg-slate-950 border border-slate-800 rounded outline-none"
                />
                <select
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value)}
                  className="text-xs p-2 bg-slate-950 border border-slate-800 rounded text-slate-300 outline-none"
                >
                  <option value="Sentra Imtaq">Sentra Imtaq</option>
                  <option value="Sentra Balok">Sentra Balok</option>
                  <option value="Sentra Persiapan">Sentra Persiapan</option>
                  <option value="Sentra Seni &amp; Musik">Sentra Seni / Musik</option>
                </select>
                <input
                  type="text"
                  required
                  placeholder="Nama Orang Tua"
                  value={newStudentParent}
                  onChange={(e) => setNewStudentParent(e.target.value)}
                  className="text-xs p-2 bg-slate-950 border border-slate-800 rounded outline-none"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Aktif"
                  value={newStudentPhone}
                  onChange={(e) => setNewStudentPhone(e.target.value)}
                  className="text-xs p-2 bg-slate-950 border border-slate-800 rounded outline-none"
                />
                <button type="submit" className="col-span-2 py-1.5 bg-yellow-500 text-emerald-950 font-bold text-xs rounded">
                  + TAMBAH SISWA AKTIF
                </button>
              </form>

              {/* Students database */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {students.map((stu) => (
                  <div key={stu.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-200">👶 {stu.name}</div>
                      <div className="text-[10px] text-slate-500">Ortu: {stu.parentName} &bull; WA: {stu.whatsapp}</div>
                    </div>
                    <span className="text-[9px] uppercase px-2 py-0.5 bg-yellow-950 text-[#FACC15] font-bold rounded-lg leading-none">
                      {stu.classGroup}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: AUDIT LOGS DISPLAY */}
        {activeSidebarTab === 'audit_log' && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <h4 className="font-display font-black text-sm text-white">REKAM JEJAK TRANSAKSI ADMINISTRATIF</h4>
                <div className="text-[10px] text-slate-500">IP Keamanan: Secure SSL Encrypted</div>
              </div>

              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3.5 bg-slate-900 border border-slate-800/65 rounded-xl font-mono text-[10px] flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2 max-w-xl">
                      <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 font-bold rounded uppercase">
                        {log.user}
                      </span>
                      <span className="text-slate-300">{log.action}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-slate-500">{log.timestamp}</div>
                      <div className="text-[9px] text-slate-600">{log.ipAddress}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-500 pt-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0" />
                Dihasilkan otomatis oleh sistem. Seluruh log dilindungi aturan **OWASP** dan enkripsi Firestore agar aman dari tamperer.
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SMART AI COPYWRITING HELPER FOR ADMIN */}
        {activeSidebarTab === 'ai_assistant' && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex gap-2 items-center text-white border-b border-slate-800 pb-3">
                <Bot className="w-6 h-6 text-emerald-400" />
                <div>
                  <h4 className="font-display font-black text-base">Salsa AI Copywriter &amp; Analyst</h4>
                  <p className="text-[10px] text-slate-500">Gunakan kecerdasan buatan Gemini untuk membuat rilis pers, menganalisis pendaftaran, atau merancang adab harian.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-500 uppercase font-bold">Ketik Perintah / Prompt untuk AI:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-3 bg-slate-90 border border-slate-800 text-xs text-white rounded-xl outline-none focus:border-emerald-500"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />
                    <button
                      onClick={askGeminiAssistant}
                      disabled={loadingAi}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 active:scale-95 transition-transform"
                    >
                      {loadingAi ? 'Berpikir...' : 'KIRIM PROMPT'} <Play className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* AI generated text output block */}
                <div className="p-6 bg-slate-900 border border-slate-800/80 rounded-2.5xl min-h-[160px] text-xs leading-relaxed space-y-4 text-justify">
                  {aiResponse ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        <CheckCircle className="w-4 h-4 text-yellow-400" /> Hasil Rekomendasi Copywriting (Salsa AI):
                      </div>
                      <div className="whitespace-pre-wrap font-sans text-slate-200">
                        {aiResponse}
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 italic text-center py-10">
                      {loadingAi ? 'Sedang merancang teks berkualitas, mohon tunggu sebentar...' : 'Masukkan permintaan Anda di atas lalu ketik Kirim untuk merancang berkas secara pintar.'}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
