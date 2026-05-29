/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: 'Assalamu\'alaikum! Saya **Salsa AI**, asisten virtual pintar TKIT Salsabila Bekasi. Ada yang bisa saya bantu terkait info PPDB, kegiatan sekolah, Metode Ummi atau Sentra PAUD?',
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertBadge, setAlertBadge] = useState(true);

  const endMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endMsgRef.current) {
      endMsgRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;

    const userText = inputVal;
    setInputVal('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userText }].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'model', content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'model', content: 'Afwan, sistem AI sedang berkonsentrasi tinggi. Silakan ulangi pertanyaan Anda beberapa saat lagi.' }]);
      }
    } catch {
      // Offline fallback tailored to TKIT Salsabila metadata as requested
      let fallbackText = 'Afwan Ayah/Bunda, saya mendeteksi gangguan koneksi. ';
      const queryLower = userText.toLowerCase();

      if (queryLower.includes('alamat') || queryLower.includes('lokasi')) {
        fallbackText += 'Lokasi TKIT Salsabila Bekasi berada di Jl. Raya Pondok Ungu Permai Sektor 5 No.3 Blok F6, RT.04/RW.023, Bahagia, Babelan, Kabupaten Bekasi.';
      } else if (queryLower.includes('npsn')) {
        fallbackText += 'NPSN resmi TKIT Salsabila Bekasi adalah **69825989**.';
      } else if (queryLower.includes('biaya') || queryLower.includes('ppdb') || queryLower.includes('daftar')) {
        fallbackText += 'PPDB Online telah dibuka! Anda dapat mendaftar langsung melalui menu **"PPDB Online"** di web ini. Biaya/formulir dapat dikoordinasikan langsung ke WA panitia di (021) 88983124.';
      } else if (queryLower.includes('jam') || queryLower.includes('operasional') || queryLower.includes('hari')) {
        fallbackText += 'Jam belajar aktif TKIT Salsabila adalah hari Senin - Jumat pukul 07.30 - 13.00 WIB.';
      } else if (queryLower.includes('metode') || queryLower.includes('ummi') || queryLower.includes('sentra')) {
        fallbackText += 'Kami menggabungkan Metode Sentra (BCCT) untuk melatih kognitif/perkembangan anak dan Metode Ummi untuk melatih kelancaran membaca Al-Quran s.d hafalan juz 30 secara tartil.';
      } else {
        fallbackText += 'Untuk informasi lebih detail mengenai pendaftaran & biaya, mohon menghubungi kantor sekretariat di **(021) 88983124** atau bicaralah langsung di jam operasional Senin - Jumat.';
      }

      setMessages((prev) => [...prev, { role: 'model', content: fallbackText }]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    'Berapa NPSN Salsabila?',
    'Apakah ada metode Ummi?',
    'Bagaimana cara mendaftar PPDB?',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => { setIsOpen(true); setAlertBadge(false); }}
            className="flex items-center gap-2 px-4.5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-full shadow-2xl transition-all duration-300 pointer-events-auto transform hover:scale-105 active:scale-95"
          >
            <Bot className="w-6 h-6 animate-pulse text-yellow-300" />
            <span className="text-xs tracking-wide">Salsa AI</span>
            
            {alertBadge && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 text-[8px] text-white font-black items-center justify-center">1</span>
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl w-80 max-w-[90vw] h-[460px] flex flex-col justify-between"
          >
            {/* Header chat bubble */}
            <div className="bg-emerald-950 text-[#FACC15] p-4 flex justify-between items-center border-b border-yellow-400">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <div>
                  <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">Salsa AI Assistant</h4>
                  <div className="text-[9px] text-[#34D399] flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-bounce" /> Online &bull; Siaga Membantu
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 px-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth bg-slate-50 dark:bg-slate-950 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed text-justify shadow-xs ${
                      m.role === 'user'
                        ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700/60'
                    }`}
                  >
                    {m.content.split('\n\n').map((p, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                        {p.replace(/\*\*(.*?)\*\*/g, '$1')}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none p-3 border border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[9px] tracking-widest leading-none">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-spin" /> Sedang Menulis...
                  </div>
                </div>
              )}

              <div ref={endMsgRef} />
            </div>

            {/* Simulated Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-1 flex-wrap shrink-0">
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setInputVal(q)}
                    className="text-[9px] py-1 px-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-850 dark:text-slate-400 rounded-full border border-slate-150 dark:border-slate-800 text-left cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Form input */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0">
              <input
                type="text"
                required
                disabled={loading}
                placeholder="Tulis pertanyaan Anda..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl outline-none focus:border-emerald-600 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 cursor-pointer transition-transform duration-200 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
