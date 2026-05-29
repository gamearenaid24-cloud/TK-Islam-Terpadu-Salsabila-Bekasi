/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ShieldAlert, X, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (email: string) => void;
  onClose: () => void;
}

export default function AdminLogin({ onLoginSuccess, onClose }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const ADMIN_EMAIL = 'gamearena.id24@gmail.com';
  // Let's accept both "admin123" and "salsabila2026" as convenient school system passwords
  const ALLOWED_PASSWORDS = ['admin123', 'salsabila2026'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const normalizedEmail = email.trim().toLowerCase();
    
    if (!normalizedEmail) {
      setErrorMsg('Silakan masukkan email administrator.');
      return;
    }

    if (normalizedEmail !== ADMIN_EMAIL) {
      setErrorMsg('Akses ditolak. Email tidak terdaftar sebagai Administrator Utama.');
      return;
    }

    if (!password) {
      setErrorMsg('Silakan masukkan kata sandi.');
      return;
    }

    if (!ALLOWED_PASSWORDS.includes(password)) {
      setErrorMsg('Kata sandi salah. Silakan coba lagi.');
      return;
    }

    // Success transition
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess(normalizedEmail);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white dark:bg-[#0f1d3a] rounded-3xl overflow-hidden shadow-2xl max-w-md w-full border border-slate-100 dark:border-slate-800"
      >
        {/* Color Accent Top Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 p-6 text-white relative overflow-hidden">
          {/* Subtle islamic star asset outline */}
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4 font-mono select-none text-9xl">
            🕌
          </div>

          <div className="flex justify-between items-start relative z-10">
            <div>
              <span className="px-2 py-0.5 bg-emerald-900/40 text-yellow-300 font-black text-[9px] uppercase tracking-widest rounded-full">
                Sistem Kredensial
              </span>
              <h3 className="font-display font-black text-lg mt-1.5 leading-tight">
                Portal Otentikasi Admin
              </h3>
              <p className="text-[10px] text-emerald-200 mt-1 font-medium">
                Gunakan email terdaftar untuk mengelola database Salsabila
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-emerald-900/30 hover:bg-emerald-900/60 text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Login Berhasil!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Otoritas Anda terverifikasi. Membuka Control Panel Salsabila...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {errorMsg && (
              <div className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs p-3 rounded-2xl flex items-start gap-2.5 font-medium border border-rose-100 dark:border-rose-900/40">
                <ShieldAlert className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email Address Field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black tracking-wider text-slate-500 dark:text-slate-400">
                Alamat Email Terdaftar <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com / gamearena.id24@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600 font-medium placeholder:text-slate-400/80"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                Sesuai email Anda: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{ADMIN_EMAIL}</strong>
              </p>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black tracking-wider text-slate-500 dark:text-slate-400">
                Kata Sandi <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi admin"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                Petunjuk sandi defaults: <strong className="text-slate-600 dark:text-slate-300 font-bold">salsabila2026</strong> atau <strong className="text-slate-600 dark:text-slate-300 font-bold">admin123</strong>
              </p>
            </div>

            {/* Form button actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-sm shadow-emerald-200 dark:shadow-none"
              >
                Masuk ke Console
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-705 dark:text-slate-200 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Batalkan
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
