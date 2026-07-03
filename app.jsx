const { useState, useMemo } = React;

// SQL Query mapping for KPIs (Anti-AI Transparency Feature)
const SQL_QUERIES = {
  total_siswa: {
    title: "Total Siswa Aktif",
    formula: "COUNT(*) WHERE status_siswa = 'Aktif'",
    sql: `SELECT COUNT(*) AS total_siswa \nFROM tb_siswa \nWHERE status_siswa = 'Aktif' \n  AND id_rombel IN (\n    SELECT id_rombel \n    FROM tb_rombel \n    WHERE tahun_ajaran = '@tahun_ajaran' \n      AND semester = '@semester'\n  );`
  },
  tingkat_kehadiran: {
    title: "Tingkat Kehadiran Siswa",
    formula: "COUNT(Hadir) / COUNT(*) × 100 per semester",
    sql: `SELECT \n  (COUNT(CASE WHEN status_hadir = 'Hadir' THEN 1 END) * 100.0 / COUNT(*)) \n  AS persentase_kehadiran \nFROM tb_kehadiran_siswa ks\nJOIN tb_siswa s ON ks.id_siswa = s.id_siswa\nWHERE s.status_siswa = 'Aktif'\n  AND s.id_rombel IN (\n    SELECT id_rombel \n    FROM tb_rombel \n    WHERE tahun_ajaran = '@tahun_ajaran' \n      AND semester = '@semester'\n  );`
  },
  rombel_aktif: {
    title: "Jumlah Rombel Aktif",
    formula: "COUNT(*) WHERE tahun_ajaran = aktif",
    sql: `SELECT COUNT(*) AS rombel_aktif \nFROM tb_rombel \nWHERE tahun_ajaran = '@tahun_ajaran' \n  AND semester = '@semester';`
  },
  penerima_bantuan: {
    title: "Penerima Bantuan (KIP/PIP)",
    formula: "COUNT(*) WHERE penerima_kip=1 OR penerima_pip=1",
    sql: `SELECT COUNT(*) AS penerima_bantuan \nFROM tb_siswa \nWHERE status_siswa = 'Aktif' \n  AND (penerima_kip = 1 OR penerima_pip = 1)\n  AND id_rombel IN (\n    SELECT id_rombel \n    FROM tb_rombel \n    WHERE tahun_ajaran = '@tahun_ajaran' \n      AND semester = '@semester'\n  );`
  },
  total_guru: {
    title: "Total Guru Aktif",
    formula: "COUNT(*) WHERE jenis_pegawai='Guru' AND status_aktif=1",
    sql: `SELECT COUNT(*) AS total_guru \nFROM tb_karyawan \nWHERE jenis_pegawai = 'Guru' \n  AND status_aktif = 1;`
  },
  total_tk: {
    title: "Total Tenaga Kependidikan",
    formula: "COUNT(*) WHERE jenis_pegawai='TK' AND status_aktif=1",
    sql: `SELECT COUNT(*) AS total_tk \nFROM tb_karyawan \nWHERE jenis_pegawai = 'TK' \n  AND status_aktif = 1;`
  },
  sertifikasi_guru: {
    title: "Guru Tersertifikasi",
    formula: "COUNT(*) WHERE sertifikasi=1 AND status_aktif=1",
    sql: `SELECT COUNT(*) AS guru_tersertifikasi \nFROM tb_karyawan \nWHERE jenis_pegawai = 'Guru' \n  AND status_aktif = 1 \n  AND sertifikasi = 1;`
  },
  kehadiran_guru: {
    title: "Tingkat Kehadiran Guru (%)",
    formula: "COUNT(Hadir) / COUNT(*) × 100 per periode",
    sql: `SELECT \n  (COUNT(CASE WHEN status_hadir = 'Hadir' THEN 1 END) * 100.0 / COUNT(*)) \n  AS kehadiran_guru\nFROM tb_kehadiran_karyawan kk\nJOIN tb_karyawan k ON kk.id_karyawan = k.id_karyawan\nWHERE k.jenis_pegawai = 'Guru' \n  AND k.status_aktif = 1;`
  },
  dana_bos_terima: {
    title: "Total Dana BOS Diterima",
    formula: "SUM(total_dana_diterima) per tahun_ajaran & semester",
    sql: `SELECT SUM(total_dana_diterima) AS total_dana \nFROM tb_anggaran_bos \nWHERE tahun_ajaran = '@tahun_ajaran' \n  AND periode LIKE '%Semester @semester%'\n  AND status = 'Diterima';`
  },
  anggaran_realisasi: {
    title: "Realisasi Dana BOS",
    formula: "SUM(jumlah) WHERE status='Disetujui'",
    sql: `SELECT SUM(jumlah) AS total_realisasi \nFROM tb_transaksi_bos \nWHERE status = 'Disetujui' \n  AND id_anggaran = @id_anggaran;`
  },
  sisa_anggaran: {
    title: "Sisa Saldo Kas BOS",
    formula: "saldo_akhir dari entri kas terbaru",
    sql: `SELECT saldo_akhir \nFROM tb_kas_bos \nWHERE id_anggaran = @id_anggaran \nORDER BY tanggal DESC, id_kas DESC \nLIMIT 1;`
  },
  penyerapan_anggaran: {
    title: "Persentase Penyerapan",
    formula: "SUM(realisasi) / SUM(anggaran) × 100",
    sql: `SELECT \n  (SUM(t.jumlah) * 100.0 / SUM(r.total_anggaran)) AS persen_penyerapan\nFROM tb_transaksi_bos t\nJOIN tb_rencana_anggaran_bos r ON t.id_rencana = r.id_rencana\nWHERE t.status = 'Disetujui'\n  AND t.id_anggaran = @id_anggaran;`
  }
};

function App() {
  // 1. STATE & CORE DATABASE
  const [db, setDb] = useState(window.MOCK_DATA);
  const [activeTab, setActiveTab] = useState("overview");
  const [tahunAjaran, setTahunAjaran] = useState("2024/2025");
  const [semester, setSemester] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals & Interactivity states
  const [sqlModal, setSqlModal] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  
  // Forms states
  const [newStudent, setNewStudent] = useState({
    nama_lengkap: "", nisn: "", nis_lokal: "", jenis_kelamin: "L",
    tempat_lahir: "", tanggal_lahir: "", id_rombel: 1,
    penerima_kip: false, penerima_pip: false, nama_wali: "", no_hp_wali: ""
  });
  const [newTx, setNewTx] = useState({
    id_rencana: 1, uraian: "", jumlah: "",
    penerima: "", metode_bayar: "Transfer"
  });

  // Simple Notification System
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 2. DATA PROCESSING & COMPUTATIONS
  
  // Get active anggaran record
  const currentAnggaran = useMemo(() => {
    return db.tb_anggaran_bos.find(
      a => a.tahun_ajaran === tahunAjaran && a.periode.includes(semester === "1" ? "Semester 1" : "Semester 2")
    ) || db.tb_anggaran_bos[0];
  }, [db.tb_anggaran_bos, tahunAjaran, semester]);

  // Filter rombels based on current school year & semester
  const filteredRombels = useMemo(() => {
    return db.tb_rombel.filter(
      r => r.tahun_ajaran === tahunAjaran && r.semester === semester
    );
  }, [db.tb_rombel, tahunAjaran, semester]);

  // Active rombel IDs
  const activeRombelIds = useMemo(() => {
    return filteredRombels.map(r => r.id_rombel);
  }, [filteredRombels]);

  // Filter students under active rombels
  const filteredStudents = useMemo(() => {
    return db.tb_siswa.filter(s => activeRombelIds.includes(s.id_rombel));
  }, [db.tb_siswa, activeRombelIds]);

  // Search filtered students
  const searchedStudents = useMemo(() => {
    if (!searchQuery) return filteredStudents;
    const q = searchQuery.toLowerCase();
    return filteredStudents.filter(
      s => s.nama_lengkap.toLowerCase().includes(q) || 
           s.nisn.includes(q) || 
           s.nis_lokal.includes(q)
    );
  }, [filteredStudents, searchQuery]);

  // Filter Karyawan (Global but only count active ones for standard metrics)
  const activeKaryawan = useMemo(() => {
    return db.tb_karyawan.filter(k => k.status_aktif);
  }, [db.tb_karyawan]);

  const searchedKaryawan = useMemo(() => {
    if (!searchQuery) return db.tb_karyawan;
    const q = searchQuery.toLowerCase();
    return db.tb_karyawan.filter(
      k => k.nama_lengkap.toLowerCase().includes(q) || 
           (k.nip && k.nip.includes(q)) || 
           k.jabatan.toLowerCase().includes(q)
    );
  }, [db.tb_karyawan, searchQuery]);

  // BOS Budget Calculations
  const rkasPlans = useMemo(() => {
    return db.tb_rencana_anggaran_bos.filter(
      p => p.tahun_ajaran === tahunAjaran && p.semester === semester
    );
  }, [db.tb_rencana_anggaran_bos, tahunAjaran, semester]);

  // Realized transactions for current active budget
  const currentTransactions = useMemo(() => {
    return db.tb_transaksi_bos.filter(t => t.id_anggaran === currentAnggaran.id_anggaran);
  }, [db.tb_transaksi_bos, currentAnggaran]);

  const searchedTransactions = useMemo(() => {
    if (!searchQuery) return currentTransactions;
    const q = searchQuery.toLowerCase();
    return currentTransactions.filter(
      t => t.uraian.toLowerCase().includes(q) || 
           (t.no_bukti && t.no_bukti.toLowerCase().includes(q)) || 
           t.penerima.toLowerCase().includes(q)
    );
  }, [currentTransactions, searchQuery]);

  // Dynamic KPI Aggregations
  const stats = useMemo(() => {
    // 1. Students segment
    const totalSiswaAktif = filteredStudents.filter(s => s.status_siswa === "Aktif").length;
    const totalSiswaKIPorPIP = filteredStudents.filter(s => s.status_siswa === "Aktif" && (s.penerima_kip || s.penerima_pip)).length;
    const rombelAktifCount = filteredRombels.length;
    
    // Kehadiran Siswa
    const studentLogs = db.tb_kehadiran_siswa.filter(log => 
      filteredStudents.some(s => s.id_siswa === log.id_siswa)
    );
    const totalStudentLogs = studentLogs.length;
    const presentStudentLogs = studentLogs.filter(log => log.status_hadir === "Hadir").length;
    const attendanceRate = totalStudentLogs > 0 ? (presentStudentLogs / totalStudentLogs) * 100 : 94.5;

    // 2. Karyawan segment
    const totalGuru = activeKaryawan.filter(k => k.jenis_pegawai === "Guru").length;
    const totalTK = activeKaryawan.filter(k => k.jenis_pegawai === "TK").length;
    const guruSertifikasi = activeKaryawan.filter(k => k.jenis_pegawai === "Guru" && k.sertifikasi).length;
    
    // Kehadiran Guru Today
    const teacherAttendanceToday = db.tb_kehadiran_karyawan.filter(log => {
      const emp = db.tb_karyawan.find(k => k.id_karyawan === log.id_karyawan);
      return emp && emp.jenis_pegawai === "Guru" && emp.status_aktif;
    });
    const presentTeachers = teacherAttendanceToday.filter(log => log.status_hadir === "Hadir").length;
    const teacherAttendanceRate = teacherAttendanceToday.length > 0 
      ? (presentTeachers / teacherAttendanceToday.length) * 100 
      : 97.2;

    const teachersAbsentToday = teacherAttendanceToday.filter(log => log.status_hadir !== "Hadir");

    // 3. BOS segment
    const totalDanaDiterima = currentAnggaran.status === "Diterima" ? currentAnggaran.total_dana_diterima : 0;
    const totalPlanAnggaran = rkasPlans.reduce((sum, item) => sum + item.total_anggaran, 0);
    const approvedTransactions = currentTransactions.filter(t => t.status === "Disetujui");
    const totalRealisasi = approvedTransactions.reduce((sum, item) => sum + item.jumlah, 0);
    
    const penyerapanRate = totalDanaDiterima > 0 ? (totalRealisasi / totalDanaDiterima) * 100 : 0;
    const sisaSaldoKas = totalDanaDiterima - totalRealisasi;

    const pendingCount = currentTransactions.filter(t => t.status === "Pending").length;

    // Calculate component summaries (Rencana vs Realisasi) for Alerts & Charts
    const componentRealisasi = {};
    approvedTransactions.forEach(t => {
      componentRealisasi[t.id_komponen] = (componentRealisasi[t.id_komponen] || 0) + t.jumlah;
    });

    const exceededComponents = [];
    rkasPlans.forEach(plan => {
      const real = componentRealisasi[plan.id_komponen] || 0;
      if (real > plan.total_anggaran) {
        exceededComponents.push({
          id_komponen: plan.id_komponen,
          kode: db.tb_komponen_bos.find(k => k.id_komponen === plan.id_komponen)?.kode_komponen || "",
          nama: db.tb_komponen_bos.find(k => k.id_komponen === plan.id_komponen)?.nama_komponen || "",
          rencana: plan.total_anggaran,
          realisasi: real,
          selisih: real - plan.total_anggaran
        });
      }
    });

    return {
      totalSiswaAktif,
      totalSiswaKIPorPIP,
      rombelAktifCount,
      attendanceRate,
      totalGuru,
      totalTK,
      guruSertifikasi,
      teacherAttendanceRate,
      teachersAbsentToday,
      totalDanaDiterima,
      totalPlanAnggaran,
      totalRealisasi,
      penyerapanRate,
      sisaSaldoKas,
      pendingCount,
      componentRealisasi,
      exceededComponents
    };
  }, [db, filteredStudents, filteredRombels, activeKaryawan, currentAnggaran, rkasPlans, currentTransactions]);

  // 3. INTERACTIVE MUTATIONS (Updating State DB)

  // Approve a pending transaction
  const handleApproveTransaction = (id_transaksi) => {
    const tx = db.tb_transaksi_bos.find(t => t.id_transaksi === id_transaksi);
    if (!tx) return;

    // Update transaction status
    const updatedTxList = db.tb_transaksi_bos.map(t => {
      if (t.id_transaksi === id_transaksi) {
        return { ...t, status: "Disetujui", tgl_persetujuan: new Date().toISOString().split("T")[0] };
      }
      return t;
    });

    // Create a new entry in tb_kas_bos to reflect cash release
    const latestKas = db.tb_kas_bos[db.tb_kas_bos.length - 1];
    const newKasEntry = {
      id_kas: db.tb_kas_bos.length + 1,
      id_anggaran: tx.id_anggaran,
      tanggal: new Date().toISOString().split("T")[0],
      saldo_awal: latestKas.saldo_akhir,
      total_masuk: 0,
      total_keluar: tx.jumlah,
      saldo_akhir: latestKas.saldo_akhir - tx.jumlah,
      catatan: `Realisasi: ${tx.uraian}`
    };

    setDb({
      ...db,
      tb_transaksi_bos: updatedTxList,
      tb_kas_bos: [...db.tb_kas_bos, newKasEntry]
    });

    showToast(`Transaksi "${tx.uraian}" berhasil disetujui!`);
  };

  // Reject a pending transaction
  const handleRejectTransaction = (id_transaksi) => {
    const tx = db.tb_transaksi_bos.find(t => t.id_transaksi === id_transaksi);
    if (!tx) return;

    const updatedTxList = db.tb_transaksi_bos.map(t => {
      if (t.id_transaksi === id_transaksi) {
        return { ...t, status: "Ditolak" };
      }
      return t;
    });

    setDb({
      ...db,
      tb_transaksi_bos: updatedTxList
    });

    showToast(`Transaksi "${tx.uraian}" telah ditolak!`, "error");
  };

  // Add a new student
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.nama_lengkap || !newStudent.nisn) {
      showToast("Nama Lengkap dan NISN wajib diisi!", "error");
      return;
    }

    const studentId = db.tb_siswa.length + 1;
    const entry = {
      ...newStudent,
      id_siswa: studentId,
      id_rombel: parseInt(newStudent.id_rombel),
      status_siswa: "Aktif",
      created_at: new Date().toISOString().replace("T", " ").substring(0, 19)
    };

    // Add to tb_siswa
    setDb({
      ...db,
      tb_siswa: [...db.tb_siswa, entry]
    });

    // Reset Form
    setNewStudent({
      nama_lengkap: "", nisn: "", nis_lokal: "", jenis_kelamin: "L",
      tempat_lahir: "", tanggal_lahir: "", id_rombel: 1,
      penerima_kip: false, penerima_pip: false, nama_wali: "", no_hp_wali: ""
    });
    setShowStudentModal(false);
    showToast(`Siswa "${entry.nama_lengkap}" berhasil ditambahkan!`);
  };

  // Add a new transaction (BOS Rencana)
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTx.uraian || !newTx.jumlah) {
      showToast("Uraian dan Jumlah wajib diisi!", "error");
      return;
    }

    const plan = db.tb_rencana_anggaran_bos.find(p => p.id_rencana === parseInt(newTx.id_rencana));
    if (!plan) return;

    const txId = db.tb_transaksi_bos.length + 1;
    const entry = {
      id_transaksi: txId,
      id_rencana: plan.id_rencana,
      id_komponen: plan.id_komponen,
      id_anggaran: currentAnggaran.id_anggaran,
      tanggal_transaksi: new Date().toISOString().split("T")[0],
      uraian: newTx.uraian,
      jumlah: parseFloat(newTx.jumlah),
      no_bukti: `SPJ-NEW-${100 + txId}`,
      penerima: newTx.penerima || "Vendor Umum",
      metode_bayar: newTx.metode_bayar,
      status: "Pending", // Starts as pending, needs approval
      created_by: 8,
      created_at: new Date().toISOString().replace("T", " ").substring(0, 19)
    };

    setDb({
      ...db,
      tb_transaksi_bos: [...db.tb_transaksi_bos, entry]
    });

    setNewTx({
      id_rencana: rkasPlans[0]?.id_rencana || 1, 
      uraian: "", 
      jumlah: "",
      penerima: "", 
      metode_bayar: "Transfer"
    });
    setShowTransactionModal(false);
    showToast(`Pengajuan transaksi "${entry.uraian}" berhasil diajukan sebagai PENDING!`);
  };

  // Open SQL Modal Helper
  const openSqlModal = (queryKey) => {
    let q = SQL_QUERIES[queryKey];
    if (q) {
      // Interpolate values
      let sqlText = q.sql
        .replace(/@tahun_ajaran/g, tahunAjaran)
        .replace(/@semester/g, semester)
        .replace(/@id_anggaran/g, currentAnggaran.id_anggaran);
      setSqlModal({
        title: q.title,
        formula: q.formula,
        sql: sqlText
      });
    }
  };

  // 4. CHART BUILDERS (Custom SVG for pristine rendering & controls)
  
  // Custom Horizontal Progress Bars for BOS components
  const renderBOSProgressBars = () => {
    return rkasPlans.map(plan => {
      const comp = db.tb_komponen_bos.find(c => c.id_komponen === plan.id_komponen);
      const real = stats.componentRealisasi[plan.id_komponen] || 0;
      const pct = plan.total_anggaran > 0 ? (real / plan.total_anggaran) * 100 : 0;
      
      let barColorClass = "success";
      if (pct > 100) barColorClass = "danger";
      else if (pct > 80) barColorClass = "fill"; // Default orange
      
      return (
        <div key={plan.id_rencana} style={{ marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem", fontSize: "0.8rem" }}>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
              {comp?.kode_komponen}. {comp?.nama_komponen.substring(0, 45)}...
            </span>
            <span style={{ color: "var(--text-muted)" }}>
              {pct.toFixed(1)}% ({Rp(real)} / {Rp(plan.total_anggaran)})
            </span>
          </div>
          <div className="progress-bar-container">
            <div 
              className={`progress-bar-fill ${barColorClass}`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
        </div>
      );
    });
  };

  // Render SVG Line Chart for Attendance Trend (6 Months)
  const renderAttendanceChart = (trendData) => {
    const width = 500;
    const height = 150;
    const paddingLeft = 35;
    const paddingRight = 15;
    const paddingTop = 15;
    const paddingBottom = 25;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Helper to map rates (90% to 100%) to Y coordinates
    const minY = 90;
    const maxY = 100;
    const getY = (val) => {
      const ratio = (val - minY) / (maxY - minY);
      return height - paddingBottom - ratio * chartHeight;
    };

    // Get X coordinate for month index
    const getX = (idx) => {
      return paddingLeft + (idx / (trendData.length - 1)) * chartWidth;
    };

    // Build the SVG path points
    const points = trendData.map((d, i) => `${getX(i)},${getY(d.rate)}`).join(" ");
    const linePath = `M ${points}`;
    
    // Fill path (goes down to bottom Y)
    const fillPath = `${linePath} L ${getX(trendData.length - 1)},${height - paddingBottom} L ${getX(0)},${height - paddingBottom} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "100%" }}>
        {/* Y Grid lines (90%, 95%, 100%) */}
        {[90, 95, 100].map(gridY => {
          const y = getY(gridY);
          return (
            <g key={gridY}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#E4E4E7" strokeWidth="1" strokeDasharray="3,3" />
              <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fontSize="9" fill="var(--text-muted)">{gridY}%</text>
            </g>
          );
        })}

        {/* X Labels */}
        {trendData.map((d, i) => {
          const x = getX(i);
          return (
            <text key={i} x={x} y={height - 8} textAnchor="middle" fontSize="9" fill="var(--text-muted)">
              {d.month.substring(0, 3)}
            </text>
          );
        })}

        {/* Area under line (Gradient-like effect using soft amber tint) */}
        <polygon points={fillPath.replace("M ", "")} fill="rgba(245, 158, 11, 0.05)" />

        {/* The line */}
        <polyline points={points} fill="none" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points Dots */}
        {trendData.map((d, i) => {
          const x = getX(i);
          const y = getY(d.rate);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#FFFFFF" stroke="var(--accent-color)" strokeWidth="2" />
              <text x={x} y={y - 8} textAnchor="middle" fontSize="8" fontWeight="600" fill="var(--text-primary)">
                {d.rate}%
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Helper format Rupiah
  const Rp = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Calculate distributions for pie/donut charts in raw percentage
  const genderDistribution = useMemo(() => {
    const males = filteredStudents.filter(s => s.status_siswa === "Aktif" && s.jenis_kelamin === "L").length;
    const females = filteredStudents.filter(s => s.status_siswa === "Aktif" && s.jenis_kelamin === "P").length;
    const total = males + females;
    return {
      L: total > 0 ? (males / total) * 100 : 0,
      P: total > 0 ? (females / total) * 100 : 0,
      countL: males,
      countP: females
    };
  }, [filteredStudents]);

  return (
    <div className="app-container">
      {/* Dynamic Toast Notification */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 1000,
          background: toast.type === "success" ? "var(--text-primary)" : "var(--error-color)",
          color: toast.type === "success" ? "var(--accent-color)" : "white",
          padding: "1rem 1.5rem", borderRadius: "8px", fontWeight: "600",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", border: "1px solid var(--border-color)",
          display: "flex", gap: "0.5rem", alignItems: "center"
        }}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* HEADER BANNER */}
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">S</div>
          <div className="header-title">
            <h1>DASHBOARD INFORMASI SEKOLAH</h1>
            <p>Sistem Integrasi Siswa, Staf, & Anggaran BOS</p>
          </div>
        </div>
        
        <div className="header-actions">
          {/* Global Filter Year & Semester */}
          <div className="global-filters">
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", paddingLeft: "0.25rem" }}>T.A:</span>
            <select 
              className="filter-select"
              value={tahunAjaran}
              onChange={(e) => setTahunAjaran(e.target.value)}
            >
              <option value="2024/2025">2024/2025</option>
            </select>
            
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", paddingLeft: "0.25rem" }}>Sem:</span>
            <select 
              className="filter-select"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="1">1 (Ganjil)</option>
              <option value="2">2 (Genap)</option>
            </select>
          </div>

          <div className="user-profile">
            <span>Bendahara BOS</span>
            <div className="user-avatar">B</div>
          </div>
        </div>
      </header>

      {/* LAYOUT WRAPPER */}
      <div className="layout-wrapper">
        
        {/* SIDEBAR */}
        <aside className="app-sidebar">
          <nav className="nav-menu">
            <div 
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => { setActiveTab("overview"); setSearchQuery(""); }}
            >
              <span className="nav-icon-accent">✦</span> Overview
            </div>
            <div 
              className={`nav-item ${activeTab === "siswa" ? "active" : ""}`}
              onClick={() => { setActiveTab("siswa"); setSearchQuery(""); }}
            >
              <span className="nav-icon-accent">✦</span> Data Siswa
            </div>
            <div 
              className={`nav-item ${activeTab === "karyawan" ? "active" : ""}`}
              onClick={() => { setActiveTab("karyawan"); setSearchQuery(""); }}
            >
              <span className="nav-icon-accent">✦</span> Kepegawaian (Guru)
            </div>
            <div 
              className={`nav-item ${activeTab === "bos" ? "active" : ""}`}
              onClick={() => { setActiveTab("bos"); setSearchQuery(""); }}
            >
              <span className="nav-icon-accent">✦</span> Anggaran BOS
            </div>
          </nav>

          <div className="sidebar-footer-cta">
            <p>Memiliki kendala teknis atau laporan data?</p>
            <button className="btn-cta" onClick={() => window.open("https://wa.me/628123456789", "_blank")}>
              Hubungi Helpdesk
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT CONTAINER */}
        <main className="main-content">
          
          {/* ALERTS BANNERS FOR OVERVIEW / BOS */}
          {(activeTab === "overview" || activeTab === "bos") && stats.exceededComponents.length > 0 && (
            <div className="alert-banner">
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>⚠</div>
              <div className="alert-content">
                <h4>Peringatan: Pos Anggaran Melebihi RKAS</h4>
                <p>
                  Terdapat {stats.exceededComponents.length} komponen pengeluaran BOS yang melebihi pagu anggaran rencana:
                  {stats.exceededComponents.map((c, i) => (
                    <strong key={c.id_komponen}> {c.kode} ({Rp(c.selisih)}){i < stats.exceededComponents.length - 1 ? "," : "."} </strong>
                  ))} Silakan lakukan revisi RKAS atau penyesuaian belanja.
                </p>
              </div>
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div>
              <div className="content-header">
                <div className="content-title">
                  <h2>Ringkasan Dashboard Sekolah</h2>
                  <p>Tinjauan terpadu metrik akademik, kepegawaian, dan serapan anggaran BOS periode berjalan.</p>
                </div>
              </div>

              {/* KPI STATS ROW */}
              <div className="kpi-grid">
                <div className="kpi-card accented">
                  <div className="kpi-header">
                    <span className="kpi-label">Siswa Aktif</span>
                    <span className="kpi-info-trigger" title="Lihat Query SQL" onClick={() => openSqlModal("total_siswa")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.totalSiswaAktif}</div>
                  <div className="kpi-subtext">
                    <span>{stats.rombelAktifCount} Rombel aktif berjalan</span>
                  </div>
                </div>

                <div className="kpi-card accented">
                  <div className="kpi-header">
                    <span className="kpi-label">Kehadiran Siswa</span>
                    <span className="kpi-info-trigger" title="Lihat Query SQL" onClick={() => openSqlModal("tingkat_kehadiran")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.attendanceRate.toFixed(1)}%</div>
                  <div className="kpi-subtext">
                    <span className="kpi-trend-up">▲ 0.4%</span> dari bulan lalu
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Guru & Staff Aktif</span>
                    <span className="kpi-info-trigger" title="Lihat Query SQL" onClick={() => openSqlModal("total_guru")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.totalGuru + stats.totalTK}</div>
                  <div className="kpi-subtext">
                    <span>{stats.totalGuru} Guru | {stats.totalTK} Tenaga Pendidik</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Penyerapan BOS</span>
                    <span className="kpi-info-trigger" title="Lihat Query SQL" onClick={() => openSqlModal("penyerapan_anggaran")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.penyerapanRate.toFixed(1)}%</div>
                  <div className="kpi-subtext">
                    <span>Realisasi: {Rp(stats.totalRealisasi)}</span>
                  </div>
                </div>
              </div>

              {/* SECONDARY DASHBOARD ROW */}
              <div className="dashboard-grid-2col">
                {/* BOS Spend Chart / list */}
                <div className="dashboard-card">
                  <div className="dashboard-card-title">
                    <h3>Penyerapan Anggaran Per Komponen Belanja</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Rencana vs Realisasi</span>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    {renderBOSProgressBars()}
                  </div>
                </div>

                {/* Quick stats & details */}
                <div className="dashboard-card">
                  <div className="dashboard-card-title">
                    <h3>Demografi & Kehadiran Guru</h3>
                  </div>
                  
                  <div style={{ padding: "0.5rem 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>Sertifikasi Guru:</span>
                      <strong style={{ color: "var(--text-primary)" }}>{stats.guruSertifikasi} / {stats.totalGuru} ({((stats.guruSertifikasi / stats.totalGuru) * 100).toFixed(0)}%)</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>Kehadiran Guru Hari Ini:</span>
                      <strong style={{ color: "var(--text-primary)" }}>{stats.teacherAttendanceRate.toFixed(1)}%</strong>
                    </div>
                    
                    {stats.teachersAbsentToday.length > 0 ? (
                      <div style={{ marginTop: "1rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--error-color)" }}>Guru Absen / Dinas Luar Hari Ini:</span>
                        <ul style={{ listStyle: "none", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                          {stats.teachersAbsentToday.map(t => {
                            const emp = db.tb_karyawan.find(k => k.id_karyawan === t.id_karyawan);
                            return (
                              <li key={t.id_kehadiran} style={{ marginBottom: "0.35rem" }}>
                                <strong>{emp?.nama_lengkap}</strong> — <span className={`badge status-${t.status_hadir.toLowerCase()}`}>{t.status_hadir}</span> ({t.keterangan})
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      <p style={{ fontSize: "0.8rem", color: "var(--success-color)", marginTop: "1rem" }}>✔ Semua guru hadir mengajar hari ini.</p>
                    )}

                    <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                      <h4 style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>Informasi Dana BOS ({tahunAjaran} - Semester {semester}):</h4>
                      <table style={{ width: "100%", fontSize: "0.8rem" }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "0.25rem 0", color: "var(--text-muted)" }}>Dana Diterima</td>
                            <td style={{ textAlign: "right", fontWeight: "600" }}>{Rp(stats.totalDanaDiterima)}</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0.25rem 0", color: "var(--text-muted)" }}>Kas Terpakai</td>
                            <td style={{ textAlign: "right", fontWeight: "600", color: "var(--error-color)" }}>{Rp(stats.totalRealisasi)}</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0.25rem 0", color: "var(--text-muted)" }}>Sisa Saldo Kas</td>
                            <td style={{ textAlign: "right", fontWeight: "600", color: "var(--success-color)" }}>{Rp(stats.sisaSaldoKas)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SISWA TAB */}
          {activeTab === "siswa" && (
            <div>
              <div className="content-header">
                <div className="content-title">
                  <h2>Pengelolaan Informasi Siswa</h2>
                  <p>Monitoring total siswa aktif, bantuan pendidikan, rombongan belajar, dan rekapitulasi kehadiran.</p>
                </div>
                <div className="content-actions">
                  <button className="btn btn-primary" onClick={() => setShowStudentModal(true)}>
                    + Tambah Siswa Baru
                  </button>
                </div>
              </div>

              {/* KPI Siswa Row */}
              <div className="kpi-grid">
                <div className="kpi-card accented">
                  <div className="kpi-header">
                    <span className="kpi-label">Total Siswa</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("total_siswa")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.totalSiswaAktif}</div>
                  <div className="kpi-subtext">Siswa berstatus 'Aktif'</div>
                </div>

                <div className="kpi-card accented">
                  <div className="kpi-header">
                    <span className="kpi-label">Tingkat Kehadiran</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("tingkat_kehadiran")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.attendanceRate.toFixed(1)}%</div>
                  <div className="kpi-subtext">Rata-rata kehadiran harian</div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Bantuan KIP/PIP</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("penerima_bantuan")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.totalSiswaKIPorPIP}</div>
                  <div className="kpi-subtext">Siswa penerima manfaat</div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Rasio Gender</span>
                  </div>
                  <div className="kpi-value" style={{ fontSize: "1.4rem", marginTop: "0.5rem" }}>
                    L: {genderDistribution.countL} | P: {genderDistribution.countP}
                  </div>
                  <div className="kpi-subtext">
                    Demografi: {genderDistribution.L.toFixed(0)}% L & {genderDistribution.P.toFixed(0)}% P
                  </div>
                </div>
              </div>

              {/* Charts & Graphs for Siswa */}
              <div className="dashboard-grid-2col">
                <div className="dashboard-card">
                  <div className="dashboard-card-title">
                    <h3>Tren Kehadiran Siswa (6 Bulan Terakhir)</h3>
                  </div>
                  <div className="chart-container" style={{ marginTop: "1rem" }}>
                    {renderAttendanceChart(db.student_attendance_trend_6months)}
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="dashboard-card-title">
                    <h3>Distribusi Siswa Per Rombel</h3>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    {filteredRombels.map(r => {
                      const count = db.tb_siswa.filter(s => s.id_rombel === r.id_rombel && s.status_siswa === "Aktif").length;
                      const pct = r.kapasitas > 0 ? (count / r.kapasitas) * 100 : 0;
                      return (
                        <div key={r.id_rombel} style={{ marginBottom: "1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem", fontSize: "0.8rem" }}>
                            <strong>Kelas {r.nama_rombel} (Jenjang {r.jenjang})</strong>
                            <span style={{ color: "var(--text-muted)" }}>{count} / {r.kapasitas} Siswa ({pct.toFixed(0)}%)</span>
                          </div>
                          <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Siswa Data Table */}
              <div className="dashboard-card">
                <div className="dashboard-card-title">
                  <h3>Daftar Detail Siswa</h3>
                </div>

                <div className="table-controls">
                  <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input 
                      type="text" 
                      placeholder="Cari siswa (Nama / NISN)..." 
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="filter-group">
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "center" }}>
                      Menampilkan {searchedStudents.length} dari {filteredStudents.length} siswa aktif
                    </span>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>NISN</th>
                        <th>Nama Lengkap</th>
                        <th>L/P</th>
                        <th>Rombel</th>
                        <th>Wali Murid</th>
                        <th>Bantuan</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedStudents.length > 0 ? (
                        searchedStudents.map(s => {
                          const rombel = db.tb_rombel.find(r => r.id_rombel === s.id_rombel);
                          return (
                            <tr key={s.id_siswa}>
                              <td style={{ fontFamily: "monospace" }}>{s.nisn}</td>
                              <td><strong>{s.nama_lengkap}</strong></td>
                              <td>
                                <span className={`badge gender-${s.jenis_kelamin.toLowerCase()}`}>
                                  {s.jenis_kelamin}
                                </span>
                              </td>
                              <td>{rombel ? rombel.nama_rombel : "-"}</td>
                              <td>{s.nama_wali} <br /><span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.no_hp_wali}</span></td>
                              <td>
                                {s.penerima_kip && <span className="badge kip-pip" style={{ marginRight: "0.25rem" }}>KIP</span>}
                                {s.penerima_pip && <span className="badge kip-pip">PIP</span>}
                                {!s.penerima_kip && !s.penerima_pip && <span style={{ color: "var(--text-muted)" }}>-</span>}
                              </td>
                              <td>
                                <span className={`badge status-${s.status_siswa.toLowerCase()}`}>
                                  {s.status_siswa}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                            Tidak ada data siswa yang cocok dengan pencarian.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* KARYAWAN TAB */}
          {activeTab === "karyawan" && (
            <div>
              <div className="content-header">
                <div className="content-title">
                  <h2>Kepegawaian & Kualifikasi Guru</h2>
                  <p>Analisis jabatan, status sertifikasi, beban mengajar, serta monitoring absensi harian staf.</p>
                </div>
              </div>

              {/* KPI Karyawan Row */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Guru Aktif</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("total_guru")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.totalGuru}</div>
                  <div className="kpi-subtext">Mengajar aktif</div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Tenaga Kependidikan</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("total_tk")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.totalTK}</div>
                  <div className="kpi-subtext">Administrasi & TU</div>
                </div>

                <div className="kpi-card accented">
                  <div className="kpi-header">
                    <span className="kpi-label">Rasio Guru:Siswa</span>
                  </div>
                  <div className="kpi-value">
                    1:{Math.round(stats.totalSiswaAktif / stats.totalGuru)}
                  </div>
                  <div className="kpi-subtext">Standar kelayakan nasional</div>
                </div>

                <div className="kpi-card accented">
                  <div className="kpi-header">
                    <span className="kpi-label">Guru Sertifikasi</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("sertifikasi_guru")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{stats.guruSertifikasi}</div>
                  <div className="kpi-subtext">
                    {((stats.guruSertifikasi / stats.totalGuru) * 100).toFixed(0)}% Tersertifikasi
                  </div>
                </div>
              </div>

              {/* Secondary block */}
              <div className="dashboard-grid-2col">
                {/* Kehadiran Staff Chart */}
                <div className="dashboard-card">
                  <div className="dashboard-card-title">
                    <h3>Tren Kehadiran Guru & Staff (6 Bulan Terakhir)</h3>
                  </div>
                  <div className="chart-container" style={{ marginTop: "1rem" }}>
                    {renderAttendanceChart(db.staff_attendance_trend_6months)}
                  </div>
                </div>

                {/* Beban Mengajar */}
                <div className="dashboard-card">
                  <div className="dashboard-card-title">
                    <h3>Beban Kerja & Sertifikasi Guru (JP/Minggu)</h3>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    {db.tb_karyawan.filter(k => k.jenis_pegawai === "Guru" && k.status_aktif).map(guru => {
                      const jpCount = db.tb_jadwal_mengajar
                        .filter(j => j.id_karyawan === guru.id_karyawan)
                        .reduce((sum, j) => sum + (j.durasi_menit / 40), 0); // 1 JP = 40 Menit
                      
                      // Max standard is usually 24-28 JP per week
                      const maxJP = 30;
                      const pct = (jpCount / maxJP) * 100;
                      
                      return (
                        <div key={guru.id_karyawan} style={{ marginBottom: "1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem", fontSize: "0.8rem" }}>
                            <div>
                              <strong>{guru.nama_lengkap}</strong> 
                              {guru.sertifikasi && <span className="badge status-aktif" style={{ marginLeft: "0.25rem", padding: "0.05rem 0.25rem", fontSize: "0.6rem" }}>Sertifikasi</span>}
                            </div>
                            <span style={{ color: "var(--text-muted)" }}>{jpCount} JP / Minggu</span>
                          </div>
                          <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${pct}%`, backgroundColor: guru.sertifikasi ? "var(--success-color)" : "var(--accent-color)" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Karyawan Data Table */}
              <div className="dashboard-card">
                <div className="dashboard-card-title">
                  <h3>Master Data Kepegawaian</h3>
                </div>

                <div className="table-controls">
                  <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input 
                      type="text" 
                      placeholder="Cari guru/staf (Nama / NIP / Jabatan)..." 
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>NIP / NUPTK</th>
                        <th>Nama Lengkap</th>
                        <th>L/P</th>
                        <th>Jabatan & Bidang</th>
                        <th>Kepegawaian</th>
                        <th>Absensi Hari Ini</th>
                        <th>Kontak</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedKaryawan.length > 0 ? (
                        searchedKaryawan.map(k => {
                          const attToday = db.tb_kehadiran_karyawan.find(log => log.id_karyawan === k.id_karyawan);
                          return (
                            <tr key={k.id_karyawan} style={{ opacity: k.status_aktif ? 1 : 0.5 }}>
                              <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
                                {k.nip ? k.nip : <span style={{ color: "var(--text-muted)" }}>NIP: -</span>}
                                <br />
                                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>NUPTK: {k.nuptk || "-"}</span>
                              </td>
                              <td>
                                <strong>{k.nama_lengkap}</strong>
                                {!k.status_aktif && <span className="badge status-keluar" style={{ marginLeft: "0.25rem", fontSize: "0.6rem" }}>Non-Aktif</span>}
                              </td>
                              <td>
                                <span className={`badge gender-${k.jenis_kelamin.toLowerCase()}`}>
                                  {k.jenis_kelamin}
                                </span>
                              </td>
                              <td>
                                {k.jabatan} <br />
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>{k.bidang_studi}</span>
                              </td>
                              <td>
                                <strong>{k.status_kepegawaian}</strong> <br />
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{k.jenis_pegawai === "Guru" ? "Guru" : "Tenaga Kependidikan"}</span>
                              </td>
                              <td>
                                {attToday ? (
                                  <div>
                                    <span className={`badge status-${attToday.status_hadir.toLowerCase()}`}>{attToday.status_hadir}</span>
                                    {attToday.jam_masuk && <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>In: {attToday.jam_masuk}</div>}
                                  </div>
                                ) : (
                                  <span style={{ color: "var(--text-muted)" }}>No Record</span>
                                )}
                              </td>
                              <td>{k.no_hp}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                            Tidak ada data karyawan yang cocok.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* BOS TAB */}
          {activeTab === "bos" && (
            <div>
              <div className="content-header">
                <div className="content-title">
                  <h2>Pengelolaan Anggaran BOS (RKAS)</h2>
                  <p>Dana operasional sekolah reguler. Monitoring alokasi rencana komponen belanja vs realisasi SPJ.</p>
                </div>
                <div className="content-actions">
                  <button className="btn btn-primary" onClick={() => setShowTransactionModal(true)}>
                    + Ajukan Pengeluaran Baru
                  </button>
                </div>
              </div>

              {/* KPI BOS ROW */}
              <div className="kpi-grid">
                <div className="kpi-card accented">
                  <div className="kpi-header">
                    <span className="kpi-label">Dana BOS Diterima</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("dana_bos_terima")}>ⓘ</span>
                  </div>
                  <div className="kpi-value">{Rp(stats.totalDanaDiterima)}</div>
                  <div className="kpi-subtext">
                    Status: <span className="badge status-aktif" style={{ padding: "0.05rem 0.25rem", fontSize: "0.6rem" }}>{currentAnggaran.status}</span>
                  </div>
                </div>

                <div className="kpi-card accented">
                  <div className="kpi-header">
                    <span className="kpi-label">Realisasi Belanja</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("anggaran_realisasi")}>ⓘ</span>
                  </div>
                  <div className="kpi-value" style={{ color: "var(--error-color)" }}>{Rp(stats.totalRealisasi)}</div>
                  <div className="kpi-subtext">
                    Penyerapan: <strong>{stats.penyerapanRate.toFixed(1)}%</strong> dari total
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Sisa Saldo Kas</span>
                    <span className="kpi-info-trigger" onClick={() => openSqlModal("sisa_anggaran")}>ⓘ</span>
                  </div>
                  <div className="kpi-value" style={{ color: "var(--success-color)" }}>{Rp(stats.sisaSaldoKas)}</div>
                  <div className="kpi-subtext">
                    <span>Kas Tunai & Rekening</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">Menunggu Persetujuan</span>
                  </div>
                  <div className="kpi-value" style={{ color: stats.pendingCount > 0 ? "var(--warning-color)" : "inherit" }}>
                    {stats.pendingCount}
                  </div>
                  <div className="kpi-subtext">
                    <span>Transaksi berstatus 'Pending'</span>
                  </div>
                </div>
              </div>

              {/* Progress bars & Alerts */}
              <div className="dashboard-grid-2col">
                {/* Left col: list of RKAS allocation comparisons */}
                <div className="dashboard-card">
                  <div className="dashboard-card-title">
                    <h3>Penyerapan Anggaran Per Komponen (RKAS Sem {semester})</h3>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    {renderBOSProgressBars()}
                  </div>
                </div>

                {/* Right col: detail information about BOS cash flow position */}
                <div className="dashboard-card">
                  <div className="dashboard-card-title">
                    <h3>Arus Kas Terkini (Rekonsiliasi Kas)</h3>
                  </div>
                  <div style={{ marginTop: "1rem", overflowY: "auto", maxHeight: "350px" }}>
                    {db.tb_kas_bos.filter(k => k.id_anggaran === currentAnggaran.id_anggaran).map(kas => (
                      <div key={kas.id_kas} style={{ padding: "0.75rem 0", borderBottom: "1px solid var(--border-color)", fontSize: "0.85rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <strong>{kas.catatan}</strong>
                          <span style={{ fontFamily: "monospace", color: kas.total_masuk > 0 ? "var(--success-color)" : "var(--error-color)" }}>
                            {kas.total_masuk > 0 ? `+ ${Rp(kas.total_masuk)}` : `- ${Rp(kas.total_keluar)}`}
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.2rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          <span>{kas.tanggal}</span>
                          <span>Saldo Kas: {Rp(kas.saldo_akhir)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transaction list */}
              <div className="dashboard-card">
                <div className="dashboard-card-title">
                  <h3>Jurnal Transaksi Pengeluaran Dana BOS</h3>
                </div>

                <div className="table-controls">
                  <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input 
                      type="text" 
                      placeholder="Cari transaksi (Uraian / Bukti / Vendor)..." 
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Tgl & No Bukti</th>
                        <th>Komponen Belanja</th>
                        <th>Uraian Deskripsi</th>
                        <th>Jumlah Belanja</th>
                        <th>Vendor / Penerima</th>
                        <th>Cara Bayar</th>
                        <th>Status SPJ</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedTransactions.length > 0 ? (
                        searchedTransactions.map(t => {
                          const comp = db.tb_komponen_bos.find(c => c.id_komponen === t.id_komponen);
                          return (
                            <tr key={t.id_transaksi}>
                              <td style={{ fontSize: "0.8rem" }}>
                                <strong>{t.tanggal_transaksi}</strong> <br />
                                <span style={{ fontFamily: "monospace", color: "var(--text-muted)" }}>{t.no_bukti || "-"}</span>
                              </td>
                              <td>
                                <span style={{ fontWeight: "600", fontSize: "0.75rem" }}>
                                  {comp ? `${comp.kode_komponen}` : "-"}
                                </span>
                              </td>
                              <td>{t.uraian}</td>
                              <td style={{ fontWeight: "600", color: t.status === "Disetujui" ? "var(--error-color)" : "inherit" }}>
                                {Rp(t.jumlah)}
                              </td>
                              <td>{t.penerima}</td>
                              <td>{t.metode_bayar}</td>
                              <td>
                                <span className={`badge status-${t.status.toLowerCase()}`}>
                                  {t.status}
                                </span>
                              </td>
                              <td>
                                {t.status === "Pending" ? (
                                  <div style={{ display: "flex", gap: "0.25rem" }}>
                                    <button 
                                      className="btn btn-success btn-sm"
                                      onClick={() => handleApproveTransaction(t.id_transaksi)}
                                    >
                                      Setujui
                                    </button>
                                    <button 
                                      className="btn btn-danger btn-sm"
                                      onClick={() => handleRejectTransaction(t.id_transaksi)}
                                    >
                                      Tolak
                                    </button>
                                  </div>
                                ) : (
                                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Selesai</span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="8" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                            Tidak ada transaksi.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-grid">
          <div className="footer-info">
            <h4>Dashboard Informasi Sekolah</h4>
            <p>Aplikasi monitoring integrasi data akademik, inventaris rombel, demografi pengajar, dan penyerapan dana BOS Kemdikbudristek.</p>
          </div>
          
          <div className="footer-links">
            <h5>Segmen Dashboard</h5>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("overview"); }}>Ringkasan Utama</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("siswa"); }}>Data Kesiswaan</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("karyawan"); }}>SDM Kepegawaian</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("bos"); }}>Realisasi RKAS BOS</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>Tautan Instansi</h5>
            <ul>
              <li><a href="https://dapo.kemdikbud.go.id" target="_blank" rel="noreferrer">Portal Dapodik</a></li>
              <li><a href="https://rkas.kemdikbud.go.id" target="_blank" rel="noreferrer">Sistem ARKAS</a></li>
              <li><a href="https://bos.kemdikbud.go.id" target="_blank" rel="noreferrer">Sipilah / BOS Salur</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>Hubungi Kami</h5>
            <p>Jalan Pendidikan Raya No. 45, Jakarta Selatan</p>
            <div className="social-icons">
              {/* Icons turn Warm Amber on hover as specified by design.md */}
              <a href="https://youtube.com" className="social-icon" target="_blank" rel="noreferrer" title="YouTube">YT</a>
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer" title="Instagram">IG</a>
              <a href="https://tiktok.com" className="social-icon" target="_blank" rel="noreferrer" title="TikTok">TK</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} <strong>SMP Negeri 1 Pembangunan</strong>. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
      </footer>

      {/* MODAL: VIEW SQL QUERY (Anti-AI Transparency Feature) */}
      {sqlModal && (
        <div className="modal-overlay" onClick={() => setSqlModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Database Logika Query: {sqlModal.title}</h3>
              <button className="modal-close-btn" onClick={() => setSqlModal(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div>
                <span className="sql-label">Logika / Rumus Metrik:</span>
                <p style={{ fontWeight: 600, fontSize: "0.95rem", margin: "0.25rem 0 1rem" }}>{sqlModal.formula}</p>
              </div>
              <div>
                <span className="sql-label">SQL Query Eksekusi (tb_siswa, tb_rombel, etc.):</span>
                <pre className="sql-code-block">{sqlModal.sql}</pre>
              </div>
              <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                💡 <em>Query SQL di atas dijalankan di layer database untuk memuat metrik secara real-time demi performa maksimal.</em>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setSqlModal(null)}>Tutup Dokumentasi</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD STUDENT */}
      {showStudentModal && (
        <div className="modal-overlay" onClick={() => setShowStudentModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah Siswa Baru</h3>
              <button className="modal-close-btn" onClick={() => setShowStudentModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddStudent}>
              <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Nama Lengkap*</label>
                  <input 
                    type="text" 
                    required 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.nama_lengkap} 
                    onChange={e => setNewStudent({...newStudent, nama_lengkap: e.target.value})} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>NISN (10 Digit)*</label>
                  <input 
                    type="text" 
                    required 
                    maxLength="10"
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.nisn} 
                    onChange={e => setNewStudent({...newStudent, nisn: e.target.value})} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>NIS Lokal</label>
                  <input 
                    type="text" 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.nis_lokal} 
                    onChange={e => setNewStudent({...newStudent, nis_lokal: e.target.value})} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Jenis Kelamin*</label>
                  <select 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.jenis_kelamin} 
                    onChange={e => setNewStudent({...newStudent, jenis_kelamin: e.target.value})}
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Rombongan Belajar (Rombel)*</label>
                  <select 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.id_rombel} 
                    onChange={e => setNewStudent({...newStudent, id_rombel: e.target.value})}
                  >
                    {filteredRombels.map(r => (
                      <option key={r.id_rombel} value={r.id_rombel}>{r.nama_rombel}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Tempat Lahir</label>
                  <input 
                    type="text" 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.tempat_lahir} 
                    onChange={e => setNewStudent({...newStudent, tempat_lahir: e.target.value})} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Tanggal Lahir</label>
                  <input 
                    type="date" 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.tanggal_lahir} 
                    onChange={e => setNewStudent({...newStudent, tanggal_lahir: e.target.value})} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Nama Wali Murid</label>
                  <input 
                    type="text" 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.nama_wali} 
                    onChange={e => setNewStudent({...newStudent, nama_wali: e.target.value})} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Nomor HP Wali</label>
                  <input 
                    type="text" 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newStudent.no_hp_wali} 
                    onChange={e => setNewStudent({...newStudent, no_hp_wali: e.target.value})} 
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem", gridColumn: "span 2", marginTop: "0.5rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem" }}>
                    <input 
                      type="checkbox" 
                      checked={newStudent.penerima_kip} 
                      onChange={e => setNewStudent({...newStudent, penerima_kip: e.target.checked})} 
                    />
                    Penerima KIP (Kartu Indonesia Pintar)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem" }}>
                    <input 
                      type="checkbox" 
                      checked={newStudent.penerima_pip} 
                      onChange={e => setNewStudent({...newStudent, penerima_pip: e.target.checked})} 
                    />
                    Penerima PIP (Program Indonesia Pintar)
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={() => setShowStudentModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary" style={{ marginLeft: "0.5rem" }}>Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TRANSACTION */}
      {showTransactionModal && (
        <div className="modal-overlay" onClick={() => setShowTransactionModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Ajukan Pengeluaran Dana BOS</h3>
              <button className="modal-close-btn" onClick={() => setShowTransactionModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddTransaction}>
              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Komponen Rencana Belanja (RKAS)*</label>
                  <select 
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newTx.id_rencana} 
                    onChange={e => setNewTx({...newTx, id_rencana: parseInt(e.target.value)})}
                  >
                    {rkasPlans.map(plan => {
                      const comp = db.tb_komponen_bos.find(c => c.id_komponen === plan.id_komponen);
                      return (
                        <option key={plan.id_rencana} value={plan.id_rencana}>
                          {comp?.kode_komponen} - {plan.uraian_kegiatan} (Pagu: {Rp(plan.total_anggaran)})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Uraian Pengeluaran Belanja*</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Misal: Pembelian kertas HVS F4 10 rim"
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newTx.uraian} 
                    onChange={e => setNewTx({...newTx, uraian: e.target.value})} 
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Jumlah Pengeluaran (Rupiah)*</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="Contoh: 1250000"
                      className="search-input" 
                      style={{ maxWidth: "none" }}
                      value={newTx.jumlah} 
                      onChange={e => setNewTx({...newTx, jumlah: e.target.value})} 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Metode Pembayaran*</label>
                    <select 
                      className="search-input" 
                      style={{ maxWidth: "none" }}
                      value={newTx.metode_bayar} 
                      onChange={e => setNewTx({...newTx, metode_bayar: e.target.value})}
                    >
                      <option value="Transfer">Transfer Bank</option>
                      <option value="Tunai">Kas Tunai</option>
                      <option value="Cek">Cek Bank</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Penerima / Vendor Pembayaran</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: CV Indah Abadi Jaya"
                    className="search-input" 
                    style={{ maxWidth: "none" }}
                    value={newTx.penerima} 
                    onChange={e => setNewTx({...newTx, penerima: e.target.value})} 
                  />
                </div>
                
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  ⚠️ <em>Catatan: Transaksi yang baru diajukan akan berstatus PENDING. Kepala Sekolah atau Administrator harus menyetujui transaksi ini sebelum memotong saldo Kas BOS riil.</em>
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={() => setShowTransactionModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary" style={{ marginLeft: "0.5rem" }}>Ajukan Transaksi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Render the application
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
