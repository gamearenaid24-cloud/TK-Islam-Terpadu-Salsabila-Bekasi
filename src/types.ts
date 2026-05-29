/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'Super Admin' | 'Kepala Sekolah' | 'Operator';

export type Gender = 'Laki-laki' | 'Perempuan';

export type PPDBStatus = 'Menunggu Verifikasi' | 'Dokumen Terverifikasi' | 'Jadwal Wawancara' | 'Diterima' | 'Ditolak';

export interface PPDBRegistration {
  id: string; // Auto-generated e.g., REG-2026-001
  childName: string;
  birthDate: string;
  gender: Gender;
  parentName: string;
  whatsappNumber: string;
  address: string;
  documentUrl?: string; // Optional URL/filename
  documentName?: string;
  status: PPDBStatus;
  createdAt: string;
  notes?: string;
}

export type NewsCategory = 'Artikel' | 'Pengumuman' | 'Event';

export interface NewsArticle {
  id: string;
  title: string;
  category: NewsCategory;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
  views: number;
}

export type GalleryCategory = 'Belajar' | 'Outing Class' | 'Lomba' | 'Wisuda' | 'Kegiatan Keagamaan';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  date: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  email: string;
  isActive: boolean;
}

export interface Student {
  id: string;
  name: string;
  classGroup: string; // e.g. Sentra Imtaq, Sentra Balok
  parentName: string;
  whatsapp: string;
  status: 'Aktif' | 'Lulus' | 'Mutasi';
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  ipAddress: string;
}

export interface VisitorStat {
  date: string;
  count: number;
}
