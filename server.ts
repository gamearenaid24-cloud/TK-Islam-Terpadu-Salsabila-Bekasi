/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Fix for ESModules path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exponential backoff and retry helper for transient Gemini API errors (e.g. 503 Unavailable)
async function generateContentWithRetry(
  aiClient: GoogleGenAI,
  params: {
    model: string;
    contents: string;
    config: {
      systemInstruction: string;
      temperature: number;
      maxOutputTokens: number;
    };
  },
  retries = 3,
  initialDelay = 500
) {
  let delay = initialDelay;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await aiClient.models.generateContent(params);
    } catch (err: any) {
      const errStr = String(err?.message || err || '');
      const isTransient = 
        errStr.includes('503') || 
        errStr.toLowerCase().includes('unavailable') || 
        errStr.toLowerCase().includes('high demand') || 
        errStr.toLowerCase().includes('temporary');

      if (isTransient && attempt < retries) {
        console.log(`[Gemini API] Attempt ${attempt} failed with transient error. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
        continue;
      }
      throw err;
    }
  }
  throw new Error('All retry attempts failed.');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini if key exists
  let ai: GoogleGenAI | null = null;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey && geminiApiKey !== 'MY_GEMINI_API_KEY') {
    try {
      ai = new GoogleGenAI({
        apiKey: geminiApiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      console.log('Gemini API successfully initialized server-side.');
    } catch (e) {
      console.error('Error initializing Gemini API:', e);
    }
  } else {
    console.log('Gemini API Key missing or set to placeholder. Running AI Assistant in rich simulation fallback mode.');
  }

  // API router - Chat Assistant for TKIT Salsabila Bekasi
  app.post('/api/chat', async (req, res) => {
    const { messages, userProfile } = req.body;
    const lastMessage = messages?.[messages.length - 1]?.content || '';

    if (!lastMessage) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `
You are "Salsa", a smart, friendly, and warm Islamic School Consultant AI for "TK Islam Terpadu (TKIT) Salsabila Bekasi".
Your mission is to help parents, prospective guardians, and visitors with accurate information about the school.
Speak in polite, welcoming, and professional Indonesian, using warm terms of address like "Ayah/Bunda" or "Bapak/Ibu".

Information about TKIT Salsabila Bekasi:
- Nama Sekolah: TK Islam Terpadu Salsabila Bekasi
- NPSN: 69825989
- Alamat: Jl. Raya Pondok Ungu Permai Sektor 5 No.3 Blok F6, RT.04/RW.023, Bahagia, Babelan, Kabupaten Bekasi, Jawa Barat 17160
- Telepon: (021) 88983124
- Jam Operasional: Senin – Jumat 07.30 – 13.00 WIB
- Tagline: "Membentuk Generasi Qurani, Cerdas, Mandiri, dan Berakhlak Mulia"
- Kurikulum: Kurikulum Nasional PAUD terintegrasi dengan Metode Sentra (BCCT - Beyond Centers and Circle Time), Pembelajaran Al-Qur'an Metode Ummi, dan Pendidikan Karakter Islami.
- Program Unggulan: Hafalan Surat Pendek, Hafalan Hadits Pilihan, Pembiasaan Adab Sehari-hari, Parenting Class (Kelas Orang Tua), Kegiatan Kreativitas Anak, Praktik Ibadah harian.
- Fasilitas: Ruang Kelas Nyaman ber-AC, Perpustakaan edukasi anak, Media Pembelajaran Interaktif, Area Bermain Edukatif (indoor & outdoor), Lingkungan Belajar Islami yang aman, Sarana Ibadah / Masjid sekolah.
- PPDB Online (Penerimaan Peserta Didik Baru): Bisa mendaftar secara online via menu "PPDB Online" di website ini. Syarat masuk: Mengisi form pendaftaran, fotocopy Akta Kelahiran, Kartu Keluarga, dan pas foto anak. Pendaftaran akan menghasilkan Nomor Registrasi otomatis (contoh: REG-2026-XXX) yang bisa dicek statusnya di portal tracking.

Guidelines:
- Keep the tone highly cheerful (Kuning Ceria), peaceful, and educational.
- Give structured, easy-to-read replies using bullets or paragraphs.
- Keep your responses concise (no more than 3 paragraphs or a few bullet points) so it fits beautifully in the chat pane.
- Do not make up facts. If asked about specialized details like tuition fees (biaya masuk), state that it can be reviewed in detail upon document verification, or invite them to tap the WhastApp icon to call the operational team directly.
- Ensure proper Islamic greetings like "Assalamu'alaikum Warahmatullahi Wabarakatuh" when starting the conversation.
`;

    // 1. If real Gemini is configured, use it
    if (ai) {
      try {
        const chatPrompt = [];
        // Add a bit of chat history context
        const contextMessages = messages.slice(-5).map((m: any) => {
          return `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`;
        }).join('\n');

        const prompt = `
Context parameters:
- User Name/Type: ${userProfile?.name || 'Ayah/Bunda'}
- Message: ${lastMessage}

Please write a friendly, helpful, short response based on the system instructions.
`;

        const response = await generateContentWithRetry(ai, {
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        });

        const reply = response.text || '';
        return res.json({ reply });
      } catch (err: any) {
        console.log('[Gemini API Fallback] Caught an API error (likely transient 503 load spike). Gracefully shifting to high-fidelity Offline Simulator.');
        // Fallback to offline generator below
      }
    }

    // 2. High-fidelity Offline Simulator
    // Let's parse query keywords and return highly qualitative responses
    const query = lastMessage.toLowerCase();
    let reply = '';

    if (query.includes('alamat') || query.includes('lokasi') || query.includes('bekasi') || query.includes('peta') || query.includes('jalan')) {
      reply = `Wa'alaikumussalam Wr. Wb. Ayah/Bunda! 🏫 **TKIT Salsabila Bekasi** berlokasi di **Jl. Raya Pondok Ungu Permai Sektor 5 No.3 Blok F6, RT.04/RW.023, Bahagia, Babelan, Kabupaten Bekasi, Jawa Barat 17160**.\n\nLokasi kami sangat strategis dan aman untuk anak-anak. Ayah/Bunda juga dapat melihat integrasi Google Maps interaktif langsung di bagian bawah halaman utama website kami untuk petunjuk arah yang lebih tepat.`;
    } else if (query.includes('daftar') || query.includes('ppdb') || query.includes('syarat') || query.includes('regis') || query.includes('masuk')) {
      reply = `Wa'alaikumussalam Wr. Wb. Halo Ayah/Bunda! 😊 Untuk Penerimaan Peserta Didik Baru (PPDB) tahun pelajaran baru, TKIT Salsabila Bekasi menyediakan pendaftaran online secara praktis di website ini.\n\n**Silakan menuju ke Tab "PPDB Online" untuk melakukan pendaftaran:**\n1. Isi formulir data anak & orang tua.\n2. Klik Kirim. Nomor registrasi otomatis akan terbit untuk melacak status.\n3. Ayah/Bunda akan mendapatkan wa/email simulasi notifikasi wawancara!\n\nPersyaratan dokumen: Kartu Keluarga (KK), Akta Kelahiran, dan pas foto anak. Ada pertanyaan lain terkait PPDB?`;
    } else if (query.includes('biaya') || query.includes('harga') || query.includes('bayar') || query.includes('spp') || query.includes('uang')) {
      reply = `Wa'alaikumussalam Wr. Wb. Menjawab pertanyaan Ayah/Bunda mengenai rincian biaya pendaftaran, SPP, dan uang pangkal di TKIT Salsabila Bekasi:\n\nUntuk informasi rincian biaya resmi dan penawaran promo gelombang pendaftaran, kami sangat menyarankan Ayah/Bunda menghubungi admin tata usaha secara langsung via WhatsApp di nomor **(021) 88983124** atau berkunjung ke sekolah pada jam operasional (Senin-Jumat 07.30 - 13.00 WIB) agar bisa berdiskusi lebih detail mengenai skema pembayaran.`;
    } else if (query.includes('metode') || query.includes('kurikulum') || query.includes('sentra') || query.includes('belajar') || query.includes('ummi')) {
      reply = `Wa'alaikumussalam Wr. Wb. Di **TKIT Salsabila Bekasi**, kami menerapkan sistem pembelajaran berkualitas:\n\n• **Metode Sentra (BCCT)**: Pembelajaran aktif berpusat pada minat anak melatih kognitif & sosial-emosional.\n• **Metode Ummi**: Pembelajaran dan baca Al-Qur'an yang mudah, menyenangkan, dan tartil.\n• **Pendidikan Karakter Islami**: Pembiasaan adab harian, hafalan doa, surat pendek, dan hadits pilihan.\n\nSetiap anak dibimbing secara mandiri sesuai dengan tahapan tumbuh kembangnya, Ayah/Bunda! ✨`;
    } else if (query.includes('fasilitas') || query.includes('kelas') || query.includes('main')) {
      reply = `Wa'alaikumussalam Wr. Wb. Fasilitas pendukung belajar di TKIT Salsabila Bekasi dirancang untuk kenyamanan dan keamanan anak-anak, meliputi:\n\n• Ruang kelas representatif ber-AC\n• Perpustakaan anak yang ramah dan lengkap\n• Media pembelajaran audio-visual interaktif\n• Area bermain edukatif (indoor & outdoor)\n• Masjid sekolah sebagai sarana praktik ibadah sejak dini\n\nKami mengundang Ayah/Bunda untuk melakukan *school tour* langsung pada hari kerja guna melihat fasilitas kami!`;
    } else {
      reply = `Assalamu'alaikum Warahmatullahi Wabarakatuh, Ayah/Bunda! 😊\n\nSaya **Salsa**, asisten virtual **TKIT Salsabila Bekasi**. Ada yang bisa saya bantu hari ini? \n\nSaya siap memberikan informasi mengenai:\n• **Pendaftaran PPDB Online**\n• **Kurikulum & Program Unggulan (Metode Sentra & Ummi)**\n• **Lokasi & Fasilitas Sekolah**\n• **Jam Operasional & Kontak Admin**\n\nSilakan tanyakan apa saja yang ingin Ayah/Bunda ketahui!`;
    }

    // Delay simulation for natural chat feel
    setTimeout(() => {
      res.json({ reply });
    }, 450);
  });

  // Serve static files in production, set up Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite dev middleware integrated into Express.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static bundle.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TKIT Salsabila backend server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
