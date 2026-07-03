## 6. Detailed Design Guidelines (Brand Colors & Anti-AI Aesthetic)

Desain ini dirancang menggunakan aturan keseimbangan warna internasional untuk memastikan web terlihat profesional, bersih, mudah dibaca dalam waktu lama, dan bebas dari kesan template AI generik.

### A. Color Palette Architecture (60-30-10 Rule)
*   **Dominant Color - 60% (Clean Slate):** Menggunakan **Off-White** (`#FAFAFA` atau `#F4F4F5`) sebagai latar belakang utama halaman. Warna ini jauh lebih empuk dan nyaman di mata untuk jangka panjang dibanding warna putih pekat kertas (`#FFFFFF`).
*   **Secondary Color - 30% (Bold Contrast):** Menggunakan **Pitch Black / Charcoal** (`#18181B`) untuk area teks utama, judul, navbar, serta beberapa blok section strategis (misal: area Footer dibuat hitam penuh untuk memberikan kesan "jangkar" yang solid di bawah).
*   **Accent Color - 10% (Intentional Yellow):** Menggunakan warna **Warm Amber/Mustard Yellow** (`#F59E0B` atau `#EAB308`). 
    *   *Aturan Pakai:* Kuning HANYA digunakan pada elemen interaktif penting seperti tombol CTA (WhatsApp), *highlight* kata kunci penting di judul, atau indikator slider yang sedang aktif. Tidak boleh digunakan sebagai latar belakang section besar agar mata pengunjung tidak lelah.

### B. Typography & Readability
*   **Heading Font:** **Plus Jakarta Sans** atau **Inter** (Bold/Extra Bold). Judul dibuat hitam pekat dengan *line-height* yang pas agar memiliki dampak visual yang kuat tanpa perlu dekorasi berlebihan.
*   **Body Font:** **Inter** atau **Geist Sans** dengan warna abu-abu sangat gelap (`#3F3F46`). Ini memberikan kontras yang cukup tinggi untuk dibaca, tapi tidak sekaku warna hitam pekat, sehingga membaca artikel statis menjadi sangat nyaman.

### C. Layout & "Human-Touch" Elements
*   **Grid Border Layout:** Menggunakan garis batas yang sangat tipis dan halus (`border-zinc-200` atau `#E4E4E7`) untuk memisahkan konten statis atau elemen *card*. Gaya arsitektural ini memberikan kesan rapi, struktural, dan dikerjakan manual oleh desainer profesional.
*   **Image Strategy:** Slider dan galeri wajib menggunakan foto asli dengan filter warna yang *warm* atau *desaturated* agar menyatu dengan skema warna web, bukan ilustrasi vector AI yang penuh gradasi warna-warni.
*   **Micro-Interactions:** Sudut elemen dibuat tegas tapi halus (`rounded-lg` / 8px). Efek *hover* pada tombol dibuat elegan (misal: tombol kuning saat disentuh kursor berubah menjadi hitam dengan transisi halus 0.3 detik).

### D. Social Media & Contact Alignment
*   **Monochrome Icons:** Semua ikon media sosial (YouTube, Instagram, TikTok) di area contact person dipasang dengan warna dasar hitam atau abu-abu gelap. Ketika di-*hover* oleh user, baru mereka berubah warna menjadi Kuning Brand (bukan warna asli medsosnya). Ini menjaga konsistensi visual agar tetap rapi dan tidak ramai seperti pasar malam.