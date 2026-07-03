# Kolaborasi Pengembangan dengan Gemini (Antigravity)
## Proyek: Dashboard Informasi Sekolah (SMP Negeri 1 Pembangunan)

Dokumen ini merinci bagaimana kecerdasan buatan **Gemini (Antigravity)** merancang, menyusun, dan mendokumentasikan aplikasi *Dashboard Informasi Sekolah* berdasarkan instruksi dan berkas panduan yang Anda sediakan.

---

## 🤖 1. Peran & Proses AI Agent

Aplikasi ini dibangun secara kolaboratif melalui beberapa tahap analisis dan eksekusi otomatis oleh AI:

1. **Analisis Kebutuhan**: Gemini memetakan dokumen biner [schema-dashboard-sekolah.docx](file:///C:/Users/dell/Desktop/schema-dashboard-sekolah.docx) menggunakan skrip ekstraksi python kustom untuk membaca dan menyusun kembali 13 tabel relasional ke dalam format JavaScript array yang siap pakai di [script.js](file:///C:/Users/dell/Desktop/Docx/script.js).
2. **Penerapan Gaya Visual**: Gemini menerapkan arsitektur warna dan batasan desain dari [design.md](file:///C:/Users/dell/Desktop/Docx/design.md) (Off-white background, charcoal elements, warm amber accent, serta border-grid tipis) untuk membuat antarmuka bersih yang nyaman dipandang dalam waktu lama (*anti-fatigue*).
3. **Eksekusi Multi-Agent**: Untuk mempercepat dokumentasi proyek, agen utama Gemini membagi tugas dan meluncurkan sub-agen asinkron (`self` subagent) secara paralel untuk menulis [README.md](file:///C:/Users/dell/Desktop/Docx/README.md) selagi server lokal dipersiapkan.

---

## 🏗️ 2. Arsitektur "No-Build" & Keunggulan Teknis

Gemini memilih pendekatan arsitektur **No-Build React Application** untuk proyek ini. Berikut adalah keputusan desain teknis utama:

* **React & Babel Standalone via CDN**: Aplikasi dijalankan langsung menggunakan browser-side compiler tanpa memerlukan konfigurasi bundler rumit seperti Vite, Webpack, atau instalasi folder `node_modules` yang membengkak. Hal ini membuat repositori tetap ringan dan mudah dipindahkan.
* **Custom SVG Drawing**: Untuk visualisasi grafik, Gemini menghindari pustaka grafik eksternal (seperti Chart.js atau Recharts) yang dapat memperlambat pemuatan halaman. Bagan tren kehadiran digambar langsung menggunakan elemen native `<svg>`, `<polyline>`, dan `<polygon>` yang dikalkulasi secara dinamis dalam state React.
* **Integrasi State Relasional**: Logika update kas BOS (RKAS) mereproduksi sistem manajemen basis data relasional. Ketika pengguna menyetujui transaksi *Pending*, state React melakukan pembaruan silang ke entri buku kas (`tb_kas_bos`) dan komponen pengeluaran secara terpadu.

---

## 🎨 3. Penerapan Estetika Kemanusiaan (Anti-AI Aesthetic)

Aplikasi ini sengaja menghindari gaya visual template AI generik (seperti ilustrasi vektor gradasi warna-warni atau bayangan tebal). Gemini mengimplementasikan panduan dari [design.md](file:///C:/Users/dell/Desktop/Docx/design.md) sebagai berikut:

* **Clean Grid Borders**: Menggunakan border abu-abu tipis (`#E4E4E7`) sebagai pemisah kartu informasi, memberikan kesan struktural, terorganisir, dan dibuat manual.
* **Accent Yellow secara Terukur (10%)**: Warna Amber `#F59E0B` hanya digunakan pada elemen krusial seperti penanda aktif navbar, tombol kirim/CTA, dan highlight data penting.
* **Monochrome Icons & Smooth Hovers**: Ikon sosial media di bagian footer bermula dari abu-abu monokrom, dan hanya berubah menjadi kuning Amber ketika kursor menyentuh ikon (tidak menggunakan warna asli *brand* media sosial untuk menjaga konsistensi).

---

## 🔍 4. Logika Transparansi Database (Fitur Unggulan)

Salah satu fitur unik yang dibuat oleh Gemini untuk mendukung transparansi adalah **SQL Logic Query Overlay**. 
Karena aplikasi ini disajikan di layer frontend, pengguna umum mungkin tidak mengetahui cara kerja kueri data di belakang layar. Gemini merancang dialog pop-up kustom pada setiap kartu metrik yang merinci formula matematika dan kueri SQL asli (dengan parameter dinamis seperti `@tahun_ajaran` yang terisi otomatis berdasarkan filter aktif) agar pengembang database dapat mereplikasi logika ini di backend nyata mereka.

---

## 🚀 5. Cara Mengembangkan Lebih Lanjut Bersama Gemini

Jika Anda ingin melanjutkan pengembangan proyek ini dengan Gemini, berikut beberapa prompt yang bisa Anda gunakan sebagai inspirasi:

1. **Menambahkan Backend Database**:
   > *"Berdasarkan mock data di script.js, bantu saya membuat REST API sederhana menggunakan Express.js dan MySQL untuk menyimpan data siswa dan transaksi BOS secara permanen."*
2. **Fitur Ekspor Laporan**:
   > *"Tambahkan tombol ekspor laporan di tab Anggaran BOS agar bendahara sekolah bisa mengunduh file spreadsheet Excel berisi rekonsiliasi kas bulanan."*
3. **Sistem Autentikasi Pengguna**:
   > *"Buat halaman login multi-role di mana Guru hanya bisa mengabsen kelas mereka, sementara Bendahara BOS memiliki otorisasi penuh untuk menyetujui anggaran."*
