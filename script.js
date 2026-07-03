/**
  Mock Database for Dashboard Informasi Sekolah
  Represents tables: tb_siswa, tb_rombel, tb_kehadiran_siswa, tb_tahun_ajaran,
  tb_karyawan, tb_kehadiran_karyawan, tb_jadwal_mengajar, tb_kompetensi_guru,
  tb_anggaran_bos, tb_komponen_bos, tb_rencana_anggaran_bos, tb_transaksi_bos, tb_kas_bos.
*/

window.MOCK_DATA = {
  tb_tahun_ajaran: [
    { id_tahun_ajaran: 1, label: "2024/2025", semester: "1", tgl_mulai: "2024-07-15", tgl_selesai: "2024-12-20", is_aktif: 1 },
    { id_tahun_ajaran: 2, label: "2024/2025", semester: "2", tgl_mulai: "2025-01-06", tgl_selesai: "2025-06-20", is_aktif: 0 }
  ],

  tb_rombel: [
    { id_rombel: 1, nama_rombel: "VII A", jenjang: "VII", tahun_ajaran: "2024/2025", semester: "1", id_wali_kelas: 1, kapasitas: 32 },
    { id_rombel: 2, nama_rombel: "VII B", jenjang: "VII", tahun_ajaran: "2024/2025", semester: "1", id_wali_kelas: 2, kapasitas: 32 },
    { id_rombel: 3, nama_rombel: "VIII A", jenjang: "VIII", tahun_ajaran: "2024/2025", semester: "1", id_wali_kelas: 3, kapasitas: 32 },
    { id_rombel: 4, nama_rombel: "VIII B", jenjang: "VIII", tahun_ajaran: "2024/2025", semester: "1", id_wali_kelas: 4, kapasitas: 32 },
    { id_rombel: 5, nama_rombel: "IX A", jenjang: "IX", tahun_ajaran: "2024/2025", semester: "1", id_wali_kelas: 5, kapasitas: 32 },
    { id_rombel: 6, nama_rombel: "IX B", jenjang: "IX", tahun_ajaran: "2024/2025", semester: "1", id_wali_kelas: 6, kapasitas: 32 }
  ],

  tb_siswa: [
    // Rombel VII A
    { id_siswa: 1, nisn: "0102938401", nis_lokal: "242507001", nama_lengkap: "Aditya Pratama", jenis_kelamin: "L", tanggal_lahir: "2012-04-12", tempat_lahir: "Jakarta", id_rombel: 1, tahun_masuk: 2024, status_siswa: "Aktif", penerima_kip: true, penerima_pip: false, nama_wali: "Bambang Pratama", no_hp_wali: "081234567890", created_at: "2024-07-10 08:00:00" },
    { id_siswa: 2, nisn: "0105829102", nis_lokal: "242507002", nama_lengkap: "Anisa Rahmawati", jenis_kelamin: "P", tanggal_lahir: "2012-08-22", tempat_lahir: "Bogor", id_rombel: 1, tahun_masuk: 2024, status_siswa: "Aktif", penerima_kip: false, penerima_pip: true, nama_wali: "Hadi Rahmawan", no_hp_wali: "081398765432", created_at: "2024-07-10 08:15:00" },
    { id_siswa: 3, nisn: "0103948503", nis_lokal: "242507003", nama_lengkap: "Budi Santosa Jr.", jenis_kelamin: "L", tanggal_lahir: "2012-01-05", tempat_lahir: "Bandung", id_rombel: 1, tahun_masuk: 2024, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Budi Santosa", no_hp_wali: "085712345678", created_at: "2024-07-10 08:30:00" },
    { id_siswa: 4, nisn: "0104859204", nis_lokal: "242507004", nama_lengkap: "Citra Lestari", jenis_kelamin: "P", tanggal_lahir: "2012-11-30", tempat_lahir: "Depok", id_rombel: 1, tahun_masuk: 2024, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Indra Lestari", no_hp_wali: "082187654321", created_at: "2024-07-10 08:45:00" },
    { id_siswa: 5, nisn: "0107293805", nis_lokal: "242507005", nama_lengkap: "Daniel Christian", jenis_kelamin: "L", tanggal_lahir: "2012-05-15", tempat_lahir: "Jakarta", id_rombel: 1, tahun_masuk: 2024, status_siswa: "Aktif", penerima_kip: true, penerima_pip: true, nama_wali: "Thomas Christian", no_hp_wali: "081909876543", created_at: "2024-07-10 09:00:00" },

    // Rombel VII B
    { id_siswa: 6, nisn: "0101928306", nis_lokal: "242507051", nama_lengkap: "Eka Putri Prasetya", jenis_kelamin: "P", tanggal_lahir: "2012-09-09", tempat_lahir: "Tangerang", id_rombel: 2, tahun_masuk: 2024, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Agus Prasetya", no_hp_wali: "085211223344", created_at: "2024-07-11 08:00:00" },
    { id_siswa: 7, nisn: "0108392807", nis_lokal: "242507052", nama_lengkap: "Fajar Ramadhan", jenis_kelamin: "L", tanggal_lahir: "2012-07-24", tempat_lahir: "Bekasi", id_rombel: 2, tahun_masuk: 2024, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Rudi Ramadhan", no_hp_wali: "081122334455", created_at: "2024-07-11 08:20:00" },
    { id_siswa: 8, nisn: "0109483708", nis_lokal: "242507053", nama_lengkap: "Gita Cahyani", jenis_kelamin: "P", tanggal_lahir: "2012-02-18", tempat_lahir: "Jakarta", id_rombel: 2, tahun_masuk: 2024, status_siswa: "Aktif", penerima_kip: false, penerima_pip: true, nama_wali: "Slamet Cahyono", no_hp_wali: "081299887766", created_at: "2024-07-11 08:40:00" },
    { id_siswa: 9, nisn: "0102837409", nis_lokal: "242507054", nama_lengkap: "Hendra Wijaya", jenis_kelamin: "L", tanggal_lahir: "2012-03-14", tempat_lahir: "Surabaya", id_rombel: 2, tahun_masuk: 2024, status_siswa: "Keluar", penerima_kip: false, penerima_pip: false, nama_wali: "Dedi Wijaya", no_hp_wali: "081344556677", created_at: "2024-07-11 09:00:00" }, // Status Keluar

    // Rombel VIII A
    { id_siswa: 10, nisn: "0119283710", nis_lokal: "232408001", nama_lengkap: "Indra Lesmana", jenis_kelamin: "L", tanggal_lahir: "2011-06-10", tempat_lahir: "Bandung", id_rombel: 3, tahun_masuk: 2023, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Yayan Lesmana", no_hp_wali: "085677889900", created_at: "2023-07-12 08:00:00" },
    { id_siswa: 11, nisn: "0118374611", nis_lokal: "232408002", nama_lengkap: "Kartika Sari", jenis_kelamin: "P", tanggal_lahir: "2011-10-21", tempat_lahir: "Yogyakarta", id_rombel: 3, tahun_masuk: 2023, status_siswa: "Aktif", penerima_kip: true, penerima_pip: false, nama_wali: "Gatot Sudaryo", no_hp_wali: "081822334455", created_at: "2023-07-12 08:30:00" },
    { id_siswa: 12, nisn: "0112837412", nis_lokal: "232408003", nama_lengkap: "Lutfi Hakim", jenis_kelamin: "L", tanggal_lahir: "2011-01-19", tempat_lahir: "Cirebon", id_rombel: 3, tahun_masuk: 2023, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Lukman Hakim", no_hp_wali: "082166778899", created_at: "2023-07-12 09:00:00" },
    { id_siswa: 13, nisn: "0114859313", nis_lokal: "232408004", nama_lengkap: "Mega Utami", jenis_kelamin: "P", tanggal_lahir: "2011-12-05", tempat_lahir: "Jakarta", id_rombel: 3, tahun_masuk: 2023, status_siswa: "Aktif", penerima_kip: false, penerima_pip: true, nama_wali: "Rahmat Utami", no_hp_wali: "087811223344", created_at: "2023-07-12 09:30:00" },

    // Rombel VIII B
    { id_siswa: 14, nisn: "0112398414", nis_lokal: "232408051", nama_lengkap: "Naufal Althaf", jenis_kelamin: "L", tanggal_lahir: "2011-04-03", tempat_lahir: "Sukabumi", id_rombel: 4, tahun_masuk: 2023, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Irwan Naufal", no_hp_wali: "089911223344", created_at: "2023-07-13 08:00:00" },
    { id_siswa: 15, nisn: "0115829315", nis_lokal: "232408052", nama_lengkap: "Olivia Putri", jenis_kelamin: "P", tanggal_lahir: "2011-08-14", tempat_lahir: "Jakarta", id_rombel: 4, tahun_masuk: 2023, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Yusuf Putri", no_hp_wali: "081288990011", created_at: "2023-07-13 08:30:00" },
    { id_siswa: 16, nisn: "0113948516", nis_lokal: "232408053", nama_lengkap: "Pratama Yudha", jenis_kelamin: "L", tanggal_lahir: "2011-03-25", tempat_lahir: "Bogor", id_rombel: 4, tahun_masuk: 2023, status_siswa: "Aktif", penerima_kip: true, penerima_pip: false, nama_wali: "Sugeng Yudha", no_hp_wali: "081377889900", created_at: "2023-07-13 09:00:00" },
    { id_siswa: 17, nisn: "0117392817", nis_lokal: "232408054", nama_lengkap: "Rania Amanda", jenis_kelamin: "P", tanggal_lahir: "2011-05-28", tempat_lahir: "Malang", id_rombel: 4, tahun_masuk: 2023, status_siswa: "Aktif", penerima_kip: false, penerima_pip: true, nama_wali: "Darmawan Amanda", no_hp_wali: "085299001122", created_at: "2023-07-13 09:30:00" },

    // Rombel IX A
    { id_siswa: 18, nisn: "0103847518", nis_lokal: "222309001", nama_lengkap: "Setyo Adi", jenis_kelamin: "L", tanggal_lahir: "2010-02-12", tempat_lahir: "Solo", id_rombel: 5, tahun_masuk: 2022, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Joko Adi", no_hp_wali: "081199887766", created_at: "2022-07-14 08:00:00" },
    { id_siswa: 19, nisn: "0104829319", nis_lokal: "222309002", nama_lengkap: "Tania Safira", jenis_kelamin: "P", tanggal_lahir: "2010-10-09", tempat_lahir: "Semarang", id_rombel: 5, tahun_masuk: 2022, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Aris Safira", no_hp_wali: "081233445566", created_at: "2022-07-14 08:30:00" },
    { id_siswa: 20, nisn: "0102938420", nis_lokal: "222309003", nama_lengkap: "Wahyu Hidayat", jenis_kelamin: "L", tanggal_lahir: "2010-06-25", tempat_lahir: "Jakarta", id_rombel: 5, tahun_masuk: 2022, status_siswa: "Aktif", penerima_kip: true, penerima_pip: true, nama_wali: "Mulyono Hidayat", no_hp_wali: "081366778899", created_at: "2022-07-14 09:00:00" },
    { id_siswa: 21, nisn: "0105829121", nis_lokal: "222309004", nama_lengkap: "Yulia Ningsih", jenis_kelamin: "P", tanggal_lahir: "2010-07-18", tempat_lahir: "Surabaya", id_rombel: 5, tahun_masuk: 2022, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Sumardi Ningsih", no_hp_wali: "085799008877", created_at: "2022-07-14 09:30:00" },

    // Rombel IX B
    { id_siswa: 22, nisn: "0101928322", nis_lokal: "222309051", nama_lengkap: "Zackaria Malik", jenis_kelamin: "L", tanggal_lahir: "2010-08-30", tempat_lahir: "Medan", id_rombel: 6, tahun_masuk: 2022, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Malik Ibrahim", no_hp_wali: "082144556677", created_at: "2022-07-15 08:00:00" },
    { id_siswa: 23, nisn: "0108392823", nis_lokal: "222309052", nama_lengkap: "Zahra Aulia", jenis_kelamin: "P", tanggal_lahir: "2010-12-14", tempat_lahir: "Bandung", id_rombel: 6, tahun_masuk: 2022, status_siswa: "Aktif", penerima_kip: false, penerima_pip: true, nama_wali: "Sobirin Aulia", no_hp_wali: "087855667788", created_at: "2022-07-15 08:30:00" },
    { id_siswa: 24, nisn: "0109483724", nis_lokal: "222309053", nama_lengkap: "Rian Kurniawan", jenis_kelamin: "L", tanggal_lahir: "2010-03-05", tempat_lahir: "Jakarta", id_rombel: 6, tahun_masuk: 2022, status_siswa: "Aktif", penerima_kip: false, penerima_pip: false, nama_wali: "Taufik Kurniawan", no_hp_wali: "089988776655", created_at: "2022-07-15 09:00:00" },
    { id_siswa: 25, nisn: "0109283725", nis_lokal: "222309054", nama_lengkap: "Fitri Handayani", jenis_kelamin: "P", tanggal_lahir: "2010-05-01", tempat_lahir: "Depok", id_rombel: 6, tahun_masuk: 2022, status_siswa: "Lulus", penerima_kip: false, penerima_pip: false, nama_wali: "Heri Handayani", no_hp_wali: "081211223344", created_at: "2022-07-15 09:30:00" } // Status Lulus
  ],

  tb_karyawan: [
    { id_karyawan: 1, nip: "197805122005011002", nuptk: "1029384756281902", nama_lengkap: "Budi Santoso, S.Pd.", jenis_kelamin: "L", tanggal_lahir: "1978-05-12", jabatan: "Guru Matematika", status_kepegawaian: "PNS", jenis_pegawai: "Guru", bidang_studi: "Matematika", sertifikasi: true, no_sertifikat: "SRTF-2010-001928", tgl_mulai_kerja: "2005-01-05", status_aktif: true, no_hp: "081234567001" },
    { id_karyawan: 2, nip: "198210152009042003", nuptk: "2039485716293847", nama_lengkap: "Siti Aminah, M.Pd.", jenis_kelamin: "P", tanggal_lahir: "1982-10-15", jabatan: "Guru Bahasa Inggris", status_kepegawaian: "PNS", jenis_pegawai: "Guru", bidang_studi: "Bahasa Inggris", sertifikasi: true, no_sertifikat: "SRTF-2014-002938", tgl_mulai_kerja: "2009-04-01", status_aktif: true, no_hp: "081398765002" },
    { id_karyawan: 3, nip: "", nuptk: "3029485726190283", nama_lengkap: "Rian Hidayat, S.Si.", jenis_kelamin: "L", tanggal_lahir: "1989-07-24", jabatan: "Guru IPA", status_kepegawaian: "GTT", jenis_pegawai: "Guru", bidang_studi: "Fisika/Kimia", sertifikasi: false, no_sertifikat: "", tgl_mulai_kerja: "2018-07-15", status_aktif: true, no_hp: "085712345003" },
    { id_karyawan: 4, nip: "197503142000031001", nuptk: "4029384726394857", nama_lengkap: "Drs. Eko Prasetyo", jenis_kelamin: "L", tanggal_lahir: "1975-03-14", jabatan: "Guru IPS", status_kepegawaian: "PNS", jenis_pegawai: "Guru", bidang_studi: "IPS", sertifikasi: true, no_sertifikat: "SRTF-2008-000293", tgl_mulai_kerja: "2000-03-01", status_aktif: true, no_hp: "082187654004" },
    { id_karyawan: 5, nip: "", nuptk: "", nama_lengkap: "Dewi Lestari, S.Hum.", jenis_kelamin: "P", tanggal_lahir: "1993-11-12", jabatan: "Guru Bahasa Indonesia", status_kepegawaian: "Honorer", jenis_pegawai: "Guru", bidang_studi: "Bahasa Indonesia", sertifikasi: false, no_sertifikat: "", tgl_mulai_kerja: "2021-07-12", status_aktif: true, no_hp: "081909876005" },
    { id_karyawan: 6, nip: "", nuptk: "6029384716290384", nama_lengkap: "Ahmad Fauzi, S.Pd.", jenis_kelamin: "L", tanggal_lahir: "1991-02-28", jabatan: "Guru PJOK", status_kepegawaian: "GTT", jenis_pegawai: "Guru", bidang_studi: "Olahraga", sertifikasi: false, no_sertifikat: "", tgl_mulai_kerja: "2019-01-10", status_aktif: true, no_hp: "085211223006" },
    { id_karyawan: 7, nip: "", nuptk: "", nama_lengkap: "Sri Wahyuni, A.Md.", jenis_kelamin: "P", tanggal_lahir: "1988-08-05", jabatan: "Kepala TU", status_kepegawaian: "PTT", jenis_pegawai: "TK", bidang_studi: "Administrasi", sertifikasi: false, no_sertifikat: "", tgl_mulai_kerja: "2012-07-10", status_aktif: true, no_hp: "081122334007" },
    { id_karyawan: 8, nip: "", nuptk: "", nama_lengkap: "Bambang Hermawan", jenis_kelamin: "L", tanggal_lahir: "1995-12-15", jabatan: "Staf Administrasi & Operator Dapodik", status_kepegawaian: "Honorer", jenis_pegawai: "TK", bidang_studi: "IT/Komputer", sertifikasi: false, no_sertifikat: "", tgl_mulai_kerja: "2022-01-05", status_aktif: true, no_hp: "081299887008" },
    { id_karyawan: 9, nip: "197001011995031002", nuptk: "9029384726384920", nama_lengkap: "H. Mulyadi, M.Pd.", jenis_kelamin: "L", tanggal_lahir: "1970-01-01", jabatan: "Kepala Sekolah", status_kepegawaian: "PNS", jenis_pegawai: "Guru", bidang_studi: "Manajemen Sekolah", sertifikasi: true, no_sertifikat: "SRTF-2005-000012", tgl_mulai_kerja: "1995-03-01", status_aktif: true, no_hp: "081344556009" },
    { id_karyawan: 10, nip: "", nuptk: "", nama_lengkap: "Linda Permata, S.Pd.", jenis_kelamin: "P", tanggal_lahir: "1990-04-18", jabatan: "Guru Seni Budaya", status_kepegawaian: "GTT", jenis_pegawai: "Guru", bidang_studi: "Seni Musik", sertifikasi: false, no_sertifikat: "", tgl_mulai_kerja: "2017-07-15", status_aktif: false, no_hp: "087811223010" } // status_aktif = false
  ],

  tb_kompetensi_guru: [
    { id_kompetensi: 1, id_karyawan: 1, pendidikan_terakhir: "S1", jurusan: "Pendidikan Matematika", institusi: "Universitas Negeri Jakarta", tahun_lulus: 2000, is_linier: true, no_sertifikat: "SRTF-2010-001928", tgl_sertifikat: "2010-08-20", tunjangan_sertifikasi: 4500000.00 },
    { id_kompetensi: 2, id_karyawan: 2, pendidikan_terakhir: "S2", jurusan: "Pendidikan Bahasa Inggris", institusi: "Universitas Pendidikan Indonesia", tahun_lulus: 2008, is_linier: true, no_sertifikat: "SRTF-2014-002938", tgl_sertifikat: "2014-11-15", tunjangan_sertifikasi: 4800000.00 },
    { id_kompetensi: 3, id_karyawan: 4, pendidikan_terakhir: "S1", jurusan: "Pendidikan Sejarah", institusi: "Universitas Negeri Yogyakarta", tahun_lulus: 1998, is_linier: true, no_sertifikat: "SRTF-2008-000293", tgl_sertifikat: "2008-06-10", tunjangan_sertifikasi: 4200000.00 },
    { id_kompetensi: 4, id_karyawan: 9, pendidikan_terakhir: "S2", jurusan: "Administrasi Pendidikan", institusi: "Universitas Indonesia", tahun_lulus: 2004, is_linier: true, no_sertifikat: "SRTF-2005-000012", tgl_sertifikat: "2005-12-01", tunjangan_sertifikasi: 5500000.00 }
  ],

  tb_jadwal_mengajar: [
    // Budi Santoso (Guru 1) - Beban JP
    { id_jadwal: 1, id_karyawan: 1, id_rombel: 1, mata_pelajaran: "Matematika", hari: "Senin", jam_ke: 1, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 2, id_karyawan: 1, id_rombel: 1, mata_pelajaran: "Matematika", hari: "Senin", jam_ke: 2, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 3, id_karyawan: 1, id_rombel: 2, mata_pelajaran: "Matematika", hari: "Selasa", jam_ke: 3, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 4, id_karyawan: 1, id_rombel: 2, mata_pelajaran: "Matematika", hari: "Selasa", jam_ke: 4, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 5, id_karyawan: 1, id_rombel: 3, mata_pelajaran: "Matematika", hari: "Rabu", jam_ke: 1, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 6, id_karyawan: 1, id_rombel: 4, mata_pelajaran: "Matematika", hari: "Kamis", jam_ke: 5, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 7, id_karyawan: 1, id_rombel: 5, mata_pelajaran: "Matematika", hari: "Jumat", jam_ke: 2, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 8, id_karyawan: 1, id_rombel: 6, mata_pelajaran: "Matematika", hari: "Sabtu", jam_ke: 3, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    // Siti Aminah (Guru 2)
    { id_jadwal: 9, id_karyawan: 2, id_rombel: 1, mata_pelajaran: "Bahasa Inggris", hari: "Senin", jam_ke: 3, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 10, id_karyawan: 2, id_rombel: 2, mata_pelajaran: "Bahasa Inggris", hari: "Selasa", jam_ke: 1, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 11, id_karyawan: 2, id_rombel: 3, mata_pelajaran: "Bahasa Inggris", hari: "Rabu", jam_ke: 3, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 12, id_karyawan: 2, id_rombel: 4, mata_pelajaran: "Bahasa Inggris", hari: "Kamis", jam_ke: 1, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 13, id_karyawan: 2, id_rombel: 5, mata_pelajaran: "Bahasa Inggris", hari: "Jumat", jam_ke: 4, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    // Rian Hidayat (Guru 3)
    { id_jadwal: 14, id_karyawan: 3, id_rombel: 1, mata_pelajaran: "IPA", hari: "Selasa", jam_ke: 5, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 15, id_karyawan: 3, id_rombel: 2, mata_pelajaran: "IPA", hari: "Rabu", jam_ke: 5, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 16, id_karyawan: 3, id_rombel: 3, mata_pelajaran: "IPA", hari: "Kamis", jam_ke: 3, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 17, id_karyawan: 3, id_rombel: 4, mata_pelajaran: "IPA", hari: "Jumat", jam_ke: 1, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" },
    { id_jadwal: 18, id_karyawan: 3, id_rombel: 5, mata_pelajaran: "IPA", hari: "Sabtu", jam_ke: 1, durasi_menit: 40, tahun_ajaran: "2024/2025", semester: "1" }
  ],

  tb_kehadiran_karyawan: [
    // Today's attendance for active employees (date: e.g. 2026-07-03)
    { id_kehadiran: 1, id_karyawan: 1, tanggal: "2026-07-03", jam_masuk: "06:45:00", jam_pulang: "14:05:00", status_hadir: "Hadir", keterangan: "" },
    { id_kehadiran: 2, id_karyawan: 2, tanggal: "2026-07-03", jam_masuk: "06:50:00", jam_pulang: "14:00:00", status_hadir: "Hadir", keterangan: "" },
    { id_kehadiran: 3, id_karyawan: 3, tanggal: "2026-07-03", jam_masuk: "07:15:00", jam_pulang: "14:15:00", status_hadir: "Hadir", keterangan: "Terlambat 15 menit" },
    { id_kehadiran: 4, id_karyawan: 4, tanggal: "2026-07-03", jam_masuk: "06:30:00", jam_pulang: "14:00:00", status_hadir: "Hadir", keterangan: "" },
    { id_kehadiran: 5, id_karyawan: 5, tanggal: "2026-07-03", jam_masuk: "", jam_pulang: "", status_hadir: "Izin", keterangan: "Menghadiri wisuda anak" }, // Izin
    { id_kehadiran: 6, id_karyawan: 6, tanggal: "2026-07-03", jam_masuk: "", jam_pulang: "", status_hadir: "Sakit", keterangan: "Demam tinggi, istirahat dokter" }, // Sakit
    { id_kehadiran: 7, id_karyawan: 7, tanggal: "2026-07-03", jam_masuk: "06:55:00", jam_pulang: "15:00:00", status_hadir: "Hadir", keterangan: "" },
    { id_kehadiran: 8, id_karyawan: 8, tanggal: "2026-07-03", jam_masuk: "06:40:00", jam_pulang: "15:30:00", status_hadir: "Hadir", keterangan: "" },
    { id_kehadiran: 9, id_karyawan: 9, tanggal: "2026-07-03", jam_masuk: "06:35:00", jam_pulang: "16:00:00", status_hadir: "Hadir", keterangan: "" }
  ],

  // In real life this would be huge, so we pre-aggregate student attendance trends for 6 months
  // and keep a smaller table of daily attendance logs.
  tb_kehadiran_siswa: [
    // Attendance logs for 23 active students today (2026-07-03)
    { id_kehadiran: 1, id_siswa: 1, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:40:00", metode: "RFID" },
    { id_kehadiran: 2, id_siswa: 2, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:42:00", metode: "RFID" },
    { id_kehadiran: 3, id_siswa: 3, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:55:00", metode: "RFID" },
    { id_kehadiran: 4, id_siswa: 4, tanggal: "2026-07-03", status_hadir: "Sakit", keterangan: "Flu berat", jam_masuk: "", metode: "Manual" },
    { id_kehadiran: 5, id_siswa: 5, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:41:00", metode: "RFID" },
    { id_kehadiran: 6, id_siswa: 6, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:50:00", metode: "RFID" },
    { id_kehadiran: 7, id_siswa: 7, tanggal: "2026-07-03", status_hadir: "Izin", keterangan: "Acara keluarga", jam_masuk: "", metode: "Manual" },
    { id_kehadiran: 8, id_siswa: 8, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:35:00", metode: "RFID" },
    { id_kehadiran: 9, id_siswa: 10, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:48:00", metode: "Fingerprint" },
    { id_kehadiran: 10, id_siswa: 11, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:38:00", metode: "Fingerprint" },
    { id_kehadiran: 11, id_siswa: 12, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:52:00", metode: "Fingerprint" },
    { id_kehadiran: 12, id_siswa: 13, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:49:00", metode: "Fingerprint" },
    { id_kehadiran: 13, id_siswa: 14, tanggal: "2026-07-03", status_hadir: "Alpha", keterangan: "Tanpa keterangan", jam_masuk: "", metode: "Manual" },
    { id_kehadiran: 14, id_siswa: 15, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:43:00", metode: "RFID" },
    { id_kehadiran: 15, id_siswa: 16, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:45:00", metode: "RFID" },
    { id_kehadiran: 16, id_siswa: 17, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:46:00", metode: "RFID" },
    { id_kehadiran: 17, id_siswa: 18, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:30:00", metode: "RFID" },
    { id_kehadiran: 18, id_siswa: 19, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:31:00", metode: "RFID" },
    { id_kehadiran: 19, id_siswa: 20, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:54:00", metode: "RFID" },
    { id_kehadiran: 20, id_siswa: 21, tanggal: "2026-07-03", status_hadir: "Sakit", keterangan: "Pusing", jam_masuk: "", metode: "Manual" },
    { id_kehadiran: 21, id_siswa: 22, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:48:00", metode: "RFID" },
    { id_kehadiran: 22, id_siswa: 23, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:50:00", metode: "RFID" },
    { id_kehadiran: 23, id_siswa: 24, tanggal: "2026-07-03", status_hadir: "Hadir", keterangan: "", jam_masuk: "06:55:00", metode: "RFID" }
  ],

  // Metadata: pre-aggregated attendance rates over last 6 months for chart rendering
  student_attendance_trend_6months: [
    { month: "Januari", rate: 95.8 },
    { month: "Februari", rate: 94.2 },
    { month: "Maret", rate: 96.1 },
    { month: "April", rate: 93.5 },
    { month: "Mei", rate: 95.0 },
    { month: "Juni", rate: 94.5 }
  ],

  // Staff attendance rate trend over last 6 months
  staff_attendance_trend_6months: [
    { month: "Januari", rate: 98.2 },
    { month: "Februari", rate: 97.5 },
    { month: "Maret", rate: 99.0 },
    { month: "April", rate: 96.8 },
    { month: "Mei", rate: 98.5 },
    { month: "Juni", rate: 97.8 }
  ],

  // BOS Budget Segment
  tb_anggaran_bos: [
    { id_anggaran: 1, tahun_ajaran: "2024/2025", periode: "Semester 1", total_dana_diterima: 90000000.00, tgl_penerimaan: "2024-07-20", no_rekening: "010-098-7654", sumber_dana: "BOS Reguler", status: "Diterima" },
    { id_anggaran: 2, tahun_ajaran: "2024/2025", periode: "Semester 2", total_dana_diterima: 90000000.00, tgl_penerimaan: "2025-01-25", no_rekening: "010-098-7654", sumber_dana: "BOS Reguler", status: "Pending" }
  ],

  tb_komponen_bos: [
    { id_komponen: 1, kode_komponen: "K1", nama_komponen: "PPDB (Penerimaan Peserta Didik Baru)", deskripsi: "Pembiayaan untuk pelaksanaan administrasi pendaftaran siswa baru, brosur, map, spanduk, konsumsi panitia, dan pendaftaran ulang.", is_aktif: true },
    { id_komponen: 2, kode_komponen: "K2", nama_komponen: "Pengembangan Perpustakaan", deskripsi: "Penyediaan buku teks utama, buku panduan guru, buku bacaan referensi, pemeliharaan buku, dan digitalisasi perpustakaan.", is_aktif: true },
    { id_komponen: 3, kode_komponen: "K3", nama_komponen: "Kegiatan Pembelajaran & Ekstrakurikuler", deskripsi: "Penyediaan alat tulis kantor (ATK) kelas, alat peraga, praktikum IPA, pelaksanaan ekskul olahraga, seni, pramuka, dan lomba.", is_aktif: true },
    { id_komponen: 4, kode_komponen: "K4", nama_komponen: "Evaluasi Pembelajaran", deskripsi: "Pembiayaan ulangan harian, Asesmen Nasional (ANBK), ujian sekolah, cetak soal, penggandaan materi ujian, dan konsumsi koreksi.", is_aktif: true },
    { id_komponen: 5, kode_komponen: "K5", nama_komponen: "Pengelolaan Administrasi Sekolah", deskripsi: "Penyediaan ATK kantor, koordinasi dinas, cetak rapor, penggandaan surat-menyurat, honor operator dapodik, dan pembelian software.", is_aktif: true },
    { id_komponen: 6, kode_komponen: "K6", nama_komponen: "Pengembangan Profesi Pendidik", deskripsi: "Kegiatan KKG/MGMP tingkat sekolah/kabupaten, seminar pendidikan, pelatihan metode mengajar, publikasi ilmiah, dan transportasi dinas guru.", is_aktif: true },
    { id_komponen: 7, kode_komponen: "K7", nama_komponen: "Langganan Daya dan Jasa", deskripsi: "Pembayaran tagihan rutin listrik sekolah, telepon sekolah, langganan internet Wifi bulanan, dan tagihan air bersih PDAM.", is_aktif: true },
    { id_komponen: 8, kode_komponen: "K8", nama_komponen: "Pemeliharaan Sarana Sekolah", deskripsi: "Pengecatan kelas, perbaikan atap bocor, pintu/jendela rusak, servis berkala komputer lab, perbaikan toilet, taman, dan sarana olahraga.", is_aktif: true }
  ],

  tb_rencana_anggaran_bos: [
    { id_rencana: 1, id_anggaran: 1, id_komponen: 1, uraian_kegiatan: "Panitia PPDB & Spanduk", volume: 1.00, satuan: "Paket", harga_satuan: 5000000.00, total_anggaran: 5000000.00, tahun_ajaran: "2024/2025", semester: "1" },
    { id_rencana: 2, id_anggaran: 1, id_komponen: 2, uraian_kegiatan: "Pembelian Buku Kurikulum Merdeka", volume: 300.00, satuan: "Buku", harga_satuan: 50000.00, total_anggaran: 15000000.00, tahun_ajaran: "2024/2025", semester: "1" },
    { id_rencana: 3, id_anggaran: 1, id_komponen: 3, uraian_kegiatan: "Praktikum IPA & Perlengkapan Pramuka", volume: 1.00, satuan: "Paket", harga_satuan: 12000000.00, total_anggaran: 12000000.00, tahun_ajaran: "2024/2025", semester: "1" },
    { id_rencana: 4, id_anggaran: 1, id_komponen: 4, uraian_kegiatan: "Cetak Soal Asesmen Ganjil", volume: 1.00, satuan: "Kegiatan", harga_satuan: 8000000.00, total_anggaran: 8000000.00, tahun_ajaran: "2024/2025", semester: "1" },
    { id_rencana: 5, id_anggaran: 1, id_komponen: 5, uraian_kegiatan: "ATK Kantor & Cetak Rapor Digital", volume: 1.00, satuan: "Paket", harga_satuan: 18000000.00, total_anggaran: 18000000.00, tahun_ajaran: "2024/2025", semester: "1" },
    { id_rencana: 6, id_anggaran: 1, id_komponen: 6, uraian_kegiatan: "MGMP Guru & Diklat Metodologi", volume: 6.00, satuan: "Guru/Bulan", harga_satuan: 1000000.00, total_anggaran: 6000000.00, tahun_ajaran: "2024/2025", semester: "1" },
    { id_rencana: 7, id_anggaran: 1, id_komponen: 7, uraian_kegiatan: "Listrik, Air & Internet Wifi (6 Bln)", volume: 6.00, satuan: "Bulan", harga_satuan: 1666667.00, total_anggaran: 10000000.00, tahun_ajaran: "2024/2025", semester: "1" },
    // Plan Pemeliharaan: IDR 16,000,000
    { id_rencana: 8, id_anggaran: 1, id_komponen: 8, uraian_kegiatan: "Servis AC Lab & Pengecatan Ruang Kelas VII", volume: 1.00, satuan: "Paket", harga_satuan: 16000000.00, total_anggaran: 16000000.00, tahun_ajaran: "2024/2025", semester: "1" }
  ],

  tb_transaksi_bos: [
    // PPDB (K1) - Budget 5M
    { id_transaksi: 1, id_rencana: 1, id_komponen: 1, id_anggaran: 1, tanggal_transaksi: "2024-07-25", uraian: "Pembayaran Spanduk & Konsumsi Rapat PPDB", jumlah: 4500000.00, no_bukti: "SPJ-PPDB-001", penerima: "Percetakan Prima & RM Lestari", metode_bayar: "Transfer", status: "Disetujui" },
    
    // Perpustakaan (K2) - Budget 15M
    { id_transaksi: 2, id_rencana: 2, id_komponen: 2, id_anggaran: 1, tanggal_transaksi: "2024-08-10", uraian: "Pembelian Buku Kurikulum Merdeka PAI & PKn", jumlah: 10000000.00, no_bukti: "SPJ-PERPUS-001", penerima: "Penerbit Erlangga", metode_bayar: "Transfer", status: "Disetujui" },
    { id_transaksi: 3, id_rencana: 2, id_komponen: 2, id_anggaran: 1, tanggal_transaksi: "2024-11-05", uraian: "Pembelian Buku Cerita Fiksi Penunjang Minat Baca", jumlah: 5000000.00, no_bukti: "SPJ-PERPUS-002", penerima: "Toko Buku Gramedia", metode_bayar: "Transfer", status: "Disetujui" },
    
    // Pembelajaran (K3) - Budget 12M
    { id_transaksi: 4, id_rencana: 3, id_komponen: 3, id_anggaran: 1, tanggal_transaksi: "2024-08-15", uraian: "Pembelian Alat Peraga IPA (Mikroskop Slide)", jumlah: 8000000.00, no_bukti: "SPJ-BELAJAR-001", penerima: "CV Alkesindo Utama", metode_bayar: "Transfer", status: "Disetujui" },
    { id_transaksi: 5, id_rencana: 3, id_komponen: 3, id_anggaran: 1, tanggal_transaksi: "2024-09-20", uraian: "Transportasi Lomba Pramuka Tingkat Kwartir", jumlah: 2500000.00, no_bukti: "SPJ-BELAJAR-002", penerima: "Rental Mobil Lancar", metode_bayar: "Tunai", status: "Disetujui" },
    
    // Evaluasi (K4) - Budget 8M
    { id_transaksi: 6, id_rencana: 4, id_komponen: 4, id_anggaran: 1, tanggal_transaksi: "2024-12-05", uraian: "Cetak Naskah Soal & Lembar Jawab Asesmen Ganjil", jumlah: 7800000.00, no_bukti: "SPJ-EVAL-001", penerima: "Foto Copy Sentosa", metode_bayar: "Transfer", status: "Disetujui" },
    
    // Pengelolaan (K5) - Budget 18M
    { id_transaksi: 7, id_rencana: 5, id_komponen: 5, id_anggaran: 1, tanggal_transaksi: "2024-08-01", uraian: "Pembelian Kertas HVS & Tinta Printer Kantor (3 Bln)", jumlah: 6000000.00, no_bukti: "SPJ-ADM-001", penerima: "Toko ATK Jaya", metode_bayar: "Tunai", status: "Disetujui" },
    { id_transaksi: 8, id_rencana: 5, id_komponen: 5, id_anggaran: 1, tanggal_transaksi: "2024-11-28", uraian: "Honorarium Operator Dapodik & Administrasi Semester 1", jumlah: 10000000.00, no_bukti: "SPJ-ADM-002", penerima: "Bambang Hermawan", metode_bayar: "Transfer", status: "Disetujui" },
    
    // Profesi Guru (K6) - Budget 6M
    { id_transaksi: 9, id_rencana: 6, id_komponen: 6, id_anggaran: 1, tanggal_transaksi: "2024-09-10", uraian: "Penyelenggaraan IHT Implementasi Kurikulum Merdeka", jumlah: 5000000.00, no_bukti: "SPJ-GURU-001", penerima: "LPMP Narasumber", metode_bayar: "Transfer", status: "Disetujui" },
    
    // Daya & Jasa (K7) - Budget 10M
    { id_transaksi: 10, id_rencana: 7, id_komponen: 7, id_anggaran: 1, tanggal_transaksi: "2024-08-31", uraian: "Pembayaran Rekening Listrik & Wifi Agustus 2024", jumlah: 1500000.00, no_bukti: "SPJ-JASA-001", penerima: "PLN & Telkom Speedy", metode_bayar: "Transfer", status: "Disetujui" },
    { id_transaksi: 11, id_rencana: 7, id_komponen: 7, id_anggaran: 1, tanggal_transaksi: "2024-09-30", uraian: "Pembayaran Rekening Listrik & Wifi September 2024", jumlah: 1550000.00, no_bukti: "SPJ-JASA-002", penerima: "PLN & Telkom Speedy", metode_bayar: "Transfer", status: "Disetujui" },
    { id_transaksi: 12, id_rencana: 7, id_komponen: 7, id_anggaran: 1, tanggal_transaksi: "2024-10-31", uraian: "Pembayaran Rekening Listrik & Wifi Oktober 2024", jumlah: 1600000.00, no_bukti: "SPJ-JASA-003", penerima: "PLN & Telkom Speedy", metode_bayar: "Transfer", status: "Disetujui" },
    
    // Pemeliharaan (K8) - Budget 16M
    // Transaksi 1: 10M (Disetujui)
    { id_transaksi: 13, id_rencana: 8, id_komponen: 8, id_anggaran: 1, tanggal_transaksi: "2024-08-20", uraian: "Servis Berkala & Pengisian Freon AC Lab (5 Unit)", jumlah: 10000000.00, no_bukti: "SPJ-HAR-001", penerima: "CV Multi Teknik", metode_bayar: "Transfer", status: "Disetujui" },
    // Transaksi 2: 7M (Disetujui) -> Total K8 becomes 17M. Exceeds 16M budget (106.25%) -> Triggers alert!
    { id_transaksi: 14, id_rencana: 8, id_komponen: 8, id_anggaran: 1, tanggal_transaksi: "2024-10-15", uraian: "Pengecatan Dinding Ruang Kelas VII A & VII B", jumlah: 7000000.00, no_bukti: "SPJ-HAR-002", penerima: "Mandor Sipil H. Jaja", metode_bayar: "Tunai", status: "Disetujui" },

    // PENDING TRANSACTIONS (Can be approved by user in the frontend!)
    { id_transaksi: 15, id_rencana: 3, id_komponen: 3, id_anggaran: 1, tanggal_transaksi: "2024-12-18", uraian: "Pembelian Piala & Piagam Lomba Akhir Semester", jumlah: 1500000.00, no_bukti: "SPJ-BELAJAR-003-P", penerima: "Toko Piala Berkah", metode_bayar: "Tunai", status: "Pending" },
    { id_transaksi: 16, id_rencana: 7, id_komponen: 7, id_anggaran: 1, tanggal_transaksi: "2024-11-30", uraian: "Pembayaran Rekening Listrik & Wifi November 2024", jumlah: 1620000.00, no_bukti: "SPJ-JASA-004-P", penerima: "PLN & Telkom Speedy", metode_bayar: "Transfer", status: "Pending" },
    { id_transaksi: 17, id_rencana: 2, id_komponen: 2, id_anggaran: 1, tanggal_transaksi: "2024-12-10", uraian: "Langganan Aplikasi e-Library Premium (1 Tahun)", jumlah: 2500000.00, no_bukti: "SPJ-PERPUS-003-P", penerima: "Aksaramaya Digital", metode_bayar: "Transfer", status: "Pending" },
    
    // REJECTED TRANSACTION
    { id_transaksi: 18, id_rencana: 5, id_komponen: 5, id_anggaran: 1, tanggal_transaksi: "2024-09-05", uraian: "Kunjungan Studi Banding Non-Dinas Ke Bali", status: "Ditolak", jumlah: 15000000.00, no_bukti: "SPJ-ADM-003-R", penerima: "Travel Wisata Indah", metode_bayar: "Transfer" }
  ],

  // Kas BOS Daily Balances (tb_kas_bos)
  tb_kas_bos: [
    { id_kas: 1, id_anggaran: 1, tanggal: "2024-07-20", saldo_awal: 0.00, total_masuk: 90000000.00, total_keluar: 0.00, saldo_akhir: 90000000.00, catatan: "Penerimaan dana BOS Semester 1" },
    { id_kas: 2, id_anggaran: 1, tanggal: "2024-07-25", saldo_awal: 90000000.00, total_masuk: 0.00, total_keluar: 4500000.00, saldo_akhir: 85500000.00, catatan: "PPDB Spanduk & Konsumsi" },
    { id_kas: 3, id_anggaran: 1, tanggal: "2024-08-01", saldo_awal: 85500000.00, total_masuk: 0.00, total_keluar: 6000000.00, saldo_akhir: 79500000.00, catatan: "ATK HVS & Tinta Printer" },
    { id_kas: 4, id_anggaran: 1, tanggal: "2024-08-10", saldo_awal: 79500000.00, total_masuk: 0.00, total_keluar: 10000000.00, saldo_akhir: 69500000.00, catatan: "Buku Kurikulum Merdeka Erlangga" },
    { id_kas: 5, id_anggaran: 1, tanggal: "2024-08-15", saldo_awal: 69500000.00, total_masuk: 0.00, total_keluar: 8000000.00, saldo_akhir: 61500000.00, catatan: "Alat peraga praktikum IPA" },
    { id_kas: 6, id_anggaran: 1, tanggal: "2024-08-20", saldo_awal: 61500000.00, total_masuk: 0.00, total_keluar: 10000000.00, saldo_akhir: 51500000.00, catatan: "Servis AC Lab" },
    { id_kas: 7, id_anggaran: 1, tanggal: "2024-08-31", saldo_awal: 51500000.00, total_masuk: 0.00, total_keluar: 1500000.00, saldo_akhir: 50000000.00, catatan: "Bayar Listrik & Wifi Agustus" },
    { id_kas: 8, id_anggaran: 1, tanggal: "2024-09-10", saldo_awal: 50000000.00, total_masuk: 0.00, total_keluar: 5000000.00, saldo_akhir: 45000000.00, catatan: "Penyelenggaraan IHT Guru" },
    { id_kas: 9, id_anggaran: 1, tanggal: "2024-09-20", saldo_awal: 45000000.00, total_masuk: 0.00, total_keluar: 2500000.00, saldo_akhir: 42500000.00, catatan: "Sewa mobil Lomba Pramuka" },
    { id_kas: 10, id_anggaran: 1, tanggal: "2024-09-30", saldo_awal: 42500000.00, total_masuk: 0.00, total_keluar: 1550000.00, saldo_akhir: 40950000.00, catatan: "Bayar Listrik & Wifi September" },
    { id_kas: 11, id_anggaran: 1, tanggal: "2024-10-15", saldo_awal: 40950000.00, total_masuk: 0.00, total_keluar: 7000000.00, saldo_akhir: 33950000.00, catatan: "Pengecatan Kelas VII" },
    { id_kas: 12, id_anggaran: 1, tanggal: "2024-10-31", saldo_awal: 33950000.00, total_masuk: 0.00, total_keluar: 1600000.00, saldo_akhir: 32350000.00, catatan: "Bayar Listrik & Wifi Oktober" },
    { id_kas: 13, id_anggaran: 1, tanggal: "2024-11-05", saldo_awal: 32350000.00, total_masuk: 0.00, total_keluar: 5000000.00, saldo_akhir: 27350000.00, catatan: "Buku Cerita Gramedia" },
    { id_kas: 14, id_anggaran: 1, tanggal: "2024-11-28", saldo_awal: 27350000.00, total_masuk: 0.00, total_keluar: 10000000.00, saldo_akhir: 17350000.00, catatan: "Honor Operator & TU Sem 1" },
    { id_kas: 15, id_anggaran: 1, tanggal: "2024-12-05", saldo_awal: 17350000.00, total_masuk: 0.00, total_keluar: 7800000.00, saldo_akhir: 9550000.00, catatan: "Cetak Soal PAS Ganjil" }
  ]
};
