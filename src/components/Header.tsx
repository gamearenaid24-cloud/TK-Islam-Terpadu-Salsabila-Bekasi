/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Landmark, GraduationCap, School, ShieldCheck, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isAdminMode: boolean;
  isAdminLogged?: boolean;
  onToggleAdminMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({
  currentView,
  onViewChange,
  isAdminMode,
  isAdminLogged = false,
  onToggleAdminMode,
  isDarkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'kurikulum', label: 'Kurikulum & Program' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'berita', label: 'Berita & Info' },
    { id: 'ppdb', label: 'PPDB Online', highlight: true },
  ];

  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 flex flex-col transition-all">
      {/* Main Navigation */}
      <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo Brand Brand */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavClick('beranda')}>
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-600 text-white font-bold text-lg sm:text-xl shadow-xs">
                S
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full border border-white dark:border-slate-900 animate-pulse" />
              </div>
              <div>
                <h1 className="font-display font-black text-sm sm:text-base text-emerald-950 dark:text-white leading-none">
                  TKIT Salsabila Bekasi
                </h1>
                <p className="text-[9px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                  Islam Terpadu • Bekasi Regency
                </p>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-200 ${
                    currentView === item.id
                      ? item.highlight
                        ? 'bg-yellow-400 text-emerald-950 shadow-xs'
                        : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                      : item.highlight
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs font-bold transition-all'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {item.id === 'ppdb' && (
                    <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
                  )}
                </button>
              ))}

              <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1.5" />

              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleNavClick('kontak')}
                className="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                Hubungi Kami
              </button>

              <button
                onClick={onToggleAdminMode}
                className={`ml-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase font-black tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  isAdminLogged 
                    ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                    : 'bg-yellow-400 hover:bg-yellow-300 text-emerald-950'
                }`}
              >
                {isAdminLogged ? (isAdminMode ? 'Mode Siswa' : 'Logout Admin') : 'Admin Portal'}
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden gap-1.5">
              <button
                onClick={onToggleDarkMode}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                id="mobile-menu-btn"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                  currentView === item.id
                    ? item.highlight
                      ? 'bg-yellow-400 text-emerald-950 font-bold'
                      : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                    : item.highlight
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  onToggleAdminMode();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold rounded-xl text-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                {isAdminMode ? 'KELUAR DARI PORTAL ADMIN' : 'LOGIN PORTAL ADMINISTRATOR'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
