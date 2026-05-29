/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, CheckCircle2, Search, ArrowRight, User, Calendar, Phone, MapPin, Sparkles, Upload, FileCheck, CircleAlert, Building, MessageSquareShare } from 'lucide-react';
import { PPDBRegistration, Gender } from '../types';

interface PPDBFormProps {
  onRegister: (registration: PPDBRegistration) => void;
  allRegistrations: PPDBRegistration[];
}

export default function PPDBForm({ onRegister, allRegistrations }: PPDBFormProps) {
  const [activeTab, setActiveTab] = useState<'pendaftaran' | 'tracking'>('pendaftaran');
  const [childName, setChildName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender>('Laki-laki');
  const [parentName, setParentName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  
  // Simulated File Upload states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);

  // Success states
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  // Tracking states
  const [trackCode, setTrackCode] = useState('');
  const [trackedRecord, setTrackedRecord] = useState<PPDBRegistration | null | undefined>(undefined);

  // Simulated Push Notification Logs
  const [notificationLog, setNotificationLog] = useState<string[]>([]);

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    const sizeInKb = (file.size / 1024).toFixed(1);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile({ name: file.name, size: `${sizeInKb} KB` });
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !birthDate || !parentName || !whatsappNumber || !address) {
      alert('Mohon isi semua kolom bertanda bintang (*).');
      return;
    }

    // Auto generate registration number (e.g., REG-2026-003)
    const randomNum = Math.floor(100 + Math.random() * 900);
    const regId = `REG-${new Date().getFullYear()}-${randomNum}`;

    const newReg: PPDBRegistration = {
      id: regId,
      childName,
      birthDate,
      gender,
      parentName,
      whatsappNumber,
      address,
      documentName: uploadedFile?.name || 'Akte_Keluarga_Scan.pdf',
      status: 'Menunggu Verifikasi',
      createdAt: new Date().toISOString().substring(0, 10),
    };

    onRegister(newReg);
    setSubmittedCode(regId);

    // Emit live simulation notifications
    const waLog = `[WHATSAPP NOTIFICATION] Dikirim ke ${whatsappNumber}: "Assalamu'alaikum Ibu/Bapak ${parentName}, Pendaftaran atas nama ${childName} telah diterima dengan nomor urut: ${regId}. Silakan pantau status pendaftaran secara langsung di portal kami."`;
    const emailLog = `[SYSTEM MESSAGE] Nomor Pendaftaran ${regId} diterbitkan. Audit log terdaftar di Cloud Firestore secara aman.`;
    setNotificationLog([waLog, emailLog]);

    // Cleanup form
    setChildName('');
    setBirthDate('');
    setParentName('');
    setWhatsappNumber('');
    setAddress('');
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackCode.trim()) return;
    const record = allRegistrations.find(r => r.id.toUpperCase() === trackCode.trim().toUpperCase());
    setTrackedRecord(record);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-900/40 islamic-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 font-bold text-xs uppercase tracking-widest text-[#059669] rounded-full">
            PPDB ONLINE
          </span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">
            Penerimaan Peserta Didik Baru
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Daftarkan ananda secara online atau pantau status kelolosan administrasi di sini.
          </p>
        </div>

        {/* Tab triggers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => { setActiveTab('pendaftaran'); setSubmittedCode(null); }}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-all focus:outline-hidden ${
              activeTab === 'pendaftaran'
                ? 'border-b-4 border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            📋 Formulir Pendaftaran Online
          </button>
          <button
            onClick={() => { setActiveTab('tracking'); setTrackedRecord(undefined); }}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-all focus:outline-hidden ${
              activeTab === 'tracking'
                ? 'border-b-4 border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            🔍 Lacak Status PPDB Ananda
          </button>
        </div>

        {/* TAB 1: Registration Form */}
        {activeTab === 'pendaftaran' && (
          <div className="space-y-6">
            {!submittedCode ? (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                  <ClipboardList className="text-emerald-600 w-5 h-5" />
                  <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                    Data Calon Siswa Baru
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Child's Name */}
                  <div className="space-y-1.5Col">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                      Nama Lengkap Anak *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap calon siswa"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-600 outline-none transition-colors dark:text-white"
                    />
                  </div>

                  {/* DOB */}
                  <div className="space-y-1.5Col">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                      Tanggal Lahir Anak *
                    </label>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-600 outline-none transition-colors dark:text-white"
                    />
                  </div>

                  {/* Gender Selector */}
                  <div className="space-y-1.5Col">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                      Jenis Kelamin *
                    </label>
                    <div className="flex gap-4">
                      {['Laki-laki', 'Perempuan'].map((g) => (
                        <label key={g} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            checked={gender === g}
                            onChange={() => setGender(g as Gender)}
                            className="text-emerald-600 focus:ring-emerald-600"
                          />
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Parent's Name */}
                  <div className="space-y-1.5Col">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                      Nama Orang Tua/Wali *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama ayah atau ibu"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-600 outline-none transition-colors dark:text-white"
                    />
                  </div>

                  {/* Whatsapp */}
                  <div className="space-y-1.5Col">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-200">
                      Nomor WhatsApp Orang Tua *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
                        +62
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="812345678"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full pl-12 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-600 outline-none transition-colors dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-200">
                    Alamat Lengkap Rumah *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Masukkan alamat domisili saat ini lengkap dengan RT/RW"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-600 outline-none transition-colors dark:text-white"
                  />
                </div>

                {/* Upload Section requested */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-200">
                    Upload Dokumen Berkas (Kartu Keluarga / Akta Lahir)
                  </label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-5/50 dark:bg-slate-900/30 transition-all duration-300 flex flex-col items-center justify-center space-y-3"
                  >
                    <input
                      type="file"
                      id="ppdb-file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                    <label htmlFor="ppdb-file" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 rounded-full text-emerald-600 shrink-0">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Klik untuk unggah</span>
                        <span className="text-xs text-slate-500"> atau sürükle-bırak PDF/Materi Gambar berkas scan</span>
                      </div>
                      <p className="text-[10px] text-slate-400">Maks. 5 MB (Akte Kelahiran atau KK)</p>
                    </label>
                  </div>

                  {/* Upload logs/progress loader */}
                  {isUploading && (
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl space-y-2">
                      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-bold">
                        <span>Sedang Mengunggah Dokumen...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}

                  {uploadedFile && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileCheck className="text-emerald-600 w-5 h-5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{uploadedFile.name}</p>
                          <p className="text-[10px] text-slate-500">{uploadedFile.size} • Siap Dilampirkan</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-xs font-semibold text-red-500 hover:underline"
                      >
                        Batal
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-4 flex justify-between gap-4 flex-wrap items-center">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 max-w-sm">
                    <CircleAlert className="w-4 h-4 text-yellow-500 shrink-0" />
                    Data yang diisi terjaga kerahasiaannya di bawah Firebase Cloud Security.
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md active:scale-95"
                  >
                    Kirim Formulir Pendaftaran
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 text-center space-y-6 shadow-sm">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-4xl">
                  🎉
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                    Pendaftaran Berhasil Terikrar!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Formulir pendaftaran calon siswa telah masuk ke database administrasi sekolah. Berikut adalah nomor pendaftaran unik ananda:
                  </p>
                </div>

                {/* Massive Code display */}
                <div className="p-6 bg-slate-90 rounded-2xl border border-emerald-100 dark:border-slate-700 inline-block font-mono font-black text-2xl tracking-wider text-emerald-700 dark:text-[#EAB308]">
                  {submittedCode}
                </div>

                <div className="text-xs text-slate-500 max-w-sm mx-auto bg-slate-50 p-4 rounded-xl border border-slate-100">
                  ⚠️ <strong>SIMPAN KODE INI!</strong> Gunakan kode di atas untuk memantau status atau tanggal wawancara di tab <strong>"Lacak Pendaftaran"</strong>.
                </div>

                {/* Generated simulation log */}
                <div className="text-left space-y-2 mt-4 border-t border-slate-100 pt-4">
                  <h4 className="font-bold text-xs uppercase text-slate-400">Aktivitas Sistem &amp; Log Notifikasi (Simulasi):</h4>
                  <div className="space-y-1.5">
                    {notificationLog.map((log, i) => (
                      <div key={i} className="font-mono text-[10px] p-2.5 bg-slate-900 text-slate-300 rounded-lg flex items-start gap-2">
                        <MessageSquareShare className="w-4 h-4 shrink-0 text-yellow-400 mt-0.5" />
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setActiveTab('tracking');
                      setTrackCode(submittedCode || '');
                      setTrackedRecord(allRegistrations.find(r => r.id === submittedCode));
                    }}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-750 text-white font-bold text-xs inline-flex items-center gap-2 rounded-xl"
                  >
                    Buka Pelacakan Langsung <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Status Tracker */}
        {activeTab === 'tracking' && (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-light pb-3">
              <ClipboardList className="text-emerald-700 w-5 h-5" />
              <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                Cek Status Calon Siswa Baru
              </h3>
            </div>

            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Masukkan Nomor Registrasi (misal: REG-2026-642)"
                value={trackCode}
                onChange={(e) => setTrackCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl outline-none text-sm dark:text-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-slate-900 hover:bg-slate-950 text-white dark:bg-emerald-600 font-bold rounded-xl text-sm"
              >
                Cari Data
              </button>
            </form>

            <AnimatePresence mode="wait">
              {trackedRecord === null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl"
                >
                  Kolom pencarian: Nomor Pendaftaran tidak terdaftar atau salah ketik. Pastikan formatnya benar (contoh: REG-2026-X).
                </motion.div>
              )}

              {trackedRecord && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-2.5xl space-y-6"
                >
                  <div className="flex justify-between items-start gap-4 flex-wrap pb-4 border-b border-slate-150">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Kode Registrasi</span>
                      <h4 className="font-mono text-xl font-black text-emerald-800 dark:text-yellow-300">{trackedRecord.id}</h4>
                    </div>
                    {/* Status badges */}
                    <div>
                      <span className="block text-[10px] text-slate-400 text-right uppercase tracking-widest font-mono">Status PPDB</span>
                      <span className={`inline-block mt-1 px-4 py-1 rounded-full text-xs font-bold ${
                        trackedRecord.status === 'Menunggu Verifikasi'
                          ? 'bg-amber-100 text-amber-700'
                          : trackedRecord.status === 'Dokumen Terverifikasi'
                          ? 'bg-blue-100 text-blue-700'
                          : trackedRecord.status === 'Jadwal Wawancara'
                          ? 'bg-purple-100 text-purple-700'
                          : trackedRecord.status === 'Diterima'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {trackedRecord.status}
                      </span>
                    </div>
                  </div>

                  {/* Profile data list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="flex gap-2.5 items-center">
                      <User className="w-4 animate-pulse text-emerald-600 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400">Nama Calon Siswa</div>
                        <div className="font-bold text-slate-900 dark:text-white">{trackedRecord.childName}</div>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Calendar className="w-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400">Tanggal Lahir</div>
                        <div className="font-bold text-slate-900 dark:text-white">{trackedRecord.birthDate}</div>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <User className="w-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400">Orang Tua / Wali</div>
                        <div className="font-bold text-slate-900 dark:text-white">{trackedRecord.parentName}</div>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Phone className="w-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400">Kontak WhatsApp</div>
                        <div className="font-semibold text-slate-900 dark:text-white">{trackedRecord.whatsappNumber}</div>
                      </div>
                    </div>
                  </div>

                  {/* Operational details notes */}
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                    <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300">Catatan &amp; Pesan Panitia:</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {trackedRecord.notes || 'Berkas pendaftaran ananda sedang dalam proses kurasi administrasi awal oleh Operator Sekolah. Harap memastikan nomor WhatsApp Anda yang terdaftar selalu aktif.'}
                    </p>
                  </div>

                  {/* Stage flow visuals */}
                  <div className="pt-4">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-3 tracking-widest">Tahapan Alur PPDB Online</div>
                    <div className="grid grid-cols-5 gap-1 text-center">
                      {[
                        { label: 'Register', active: true },
                        { label: 'Verifikasi', active: trackedRecord.status !== 'Menunggu Verifikasi' },
                        { label: 'Wawancara', active: ['Jadwal Wawancara', 'Diterima', 'Ditolak'].includes(trackedRecord.status) },
                        { label: 'Lulus', active: trackedRecord.status === 'Diterima' },
                        { label: 'KBM', active: trackedRecord.status === 'Diterima' },
                      ].map((step, i) => (
                        <div key={i} className="space-y-1">
                          <div className={`h-2 rounded-full ${step.active ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
                          <div className="text-[9px] font-semibold text-slate-500">{step.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
