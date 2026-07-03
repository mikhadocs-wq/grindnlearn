# School Information Dashboard
## SMP Negeri 1 Pembangunan

An interactive, client-side school administration and budgeting dashboard for **SMP Negeri 1 Pembangunan**. This application is designed to monitor student demographics, staff attendance, teaching schedules, and public funding (Bantuan Operasional Sekolah - BOS) allocation and absorption with high transparency and a clean "Anti-AI" human-designed aesthetic.

---

## 🚀 Installation & Execution Steps

This project is built as a lightweight, zero-dependency frontend application. It loads React 18 and Babel Standalone dynamically from CDNs to compile JSX on the fly, eliminating the need for complex local bundlers (like Webpack or Vite) or node package installations.

To run the application locally, you must serve it via a local HTTP web server (rather than opening the `index.html` file directly from your disk, which triggers browser CORS issues on CDN assets and JS file modules).

### Option A: Using Python (Recommended & Built-in)
If you have Python installed, you can launch a server instantly from your terminal:
```bash
# Navigate to the project directory
cd C:\Users\dell\Desktop\Docx

# Start the built-in HTTP server
python -m http.server 8000
```
Then, open your browser and navigate to: `http://localhost:8000`

### Option B: Using Node.js `serve` package
If you have Node.js installed, you can use the `serve` library without permanent installation:
```bash
# Run serve dynamically using npx
npx serve -l 3000
```
Then, open your browser and navigate to: `http://localhost:3000`

### Option C: Using VS Code Live Server Extension
1. Open the project folder `C:\Users\dell\Desktop\Docx` in VS Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Click the **Go Live** button at the bottom-right corner of the status bar.
4. VS Code will automatically open your default browser to `http://127.0.0.1:5500`.

---

## 🏗️ Code Architecture

The project features a modular design with dedicated files separating UI layout, schema-based state management, and brand styles:

```
C:\Users\dell\Desktop\Docx\
├── index.html     # Entry point containing CDNs, SEO headers, and layout anchors
├── app.jsx        # Core React Application logic, computed views, and layouts
├── script.js      # Relational Mock Database containing 13 schemas/tables
├── style.css      # Custom design tokens, styling utility classes, and transitions
└── design.md      # International design principles used for theme styling
```

### Data Flow & State Lifecycle
1. **HTML Initialization**: [index.html](file:///C:/Users/dell/Desktop/Docx/index.html) loads CDN links for React 18, React DOM 18, and Babel Standalone. It then loads [script.js](file:///C:/Users/dell/Desktop/Docx/script.js) followed by [app.jsx](file:///C:/Users/dell/Desktop/Docx/app.jsx).
2. **Mock Database Loading**: [script.js](file:///C:/Users/dell/Desktop/Docx/script.js) executes, registering `window.MOCK_DATA` containing relational datasets.
3. **State Hydration**: In [app.jsx](file:///C:/Users/dell/Desktop/Docx/app.jsx), the main `App` component hydrates its local React state `db` with `window.MOCK_DATA`.
4. **Calculations**: React computation hooks (`useMemo`) calculate metrics, filters, and charts dynamically based on state mutations (e.g., adding a student, approving transactions).
5. **Re-rendering**: All interactive clicks, modal submissions, and navigation choices trigger updates to `db` state, prompting smooth virtual DOM updates.

---

## 🗄️ Database Schemas & Relations

The mock database represents 13 interconnected tables (relations) defined inside [script.js](file:///C:/Users/dell/Desktop/Docx/script.js):

| Table Name | Description | Key Fields & Relations |
| :--- | :--- | :--- |
| `tb_tahun_ajaran` | School academic year | `id_tahun_ajaran`, `label`, `semester`, `is_aktif` |
| `tb_rombel` | Academic class groups | `id_rombel`, `nama_rombel`, `id_wali_kelas` ➔ `tb_karyawan` |
| `tb_siswa` | Active/graduated students | `id_siswa`, `nisn`, `id_rombel` ➔ `tb_rombel`, `penerima_kip`, `penerima_pip` |
| `tb_kehadiran_siswa` | Student attendance logs | `id_kehadiran`, `id_siswa` ➔ `tb_siswa`, `status_hadir` (Hadir/Sakit/Izin/Alpha) |
| `tb_karyawan` | Teachers and staff | `id_karyawan`, `nip`, `nuptk`, `jenis_pegawai` (Guru/TK), `status_aktif` |
| `tb_kehadiran_karyawan` | Staff daily attendance | `id_kehadiran`, `id_karyawan` ➔ `tb_karyawan`, `jam_masuk`, `status_hadir` |
| `tb_jadwal_mengajar` | Teaching subject schedule | `id_jadwal`, `id_karyawan` ➔ `tb_karyawan`, `id_rombel` ➔ `tb_rombel` |
| `tb_kompetensi_guru` | Teacher education profiles | `id_kompetensi`, `id_karyawan` ➔ `tb_karyawan`, `tunjangan_sertifikasi` |
| `tb_anggaran_bos` | Received budget segments | `id_anggaran`, `tahun_ajaran`, `total_dana_diterima`, `status` |
| `tb_komponen_bos` | Official BOS categories | `id_komponen`, `kode_komponen` (K1-K8), `nama_komponen` |
| `tb_rencana_anggaran` | RKAS planning items | `id_rencana`, `id_anggaran`, `id_komponen`, `total_anggaran` |
| `tb_transaksi_bos` | Spend transactions ledger | `id_transaksi`, `id_rencana` ➔ `tb_rencana`, `jumlah`, `status` (Disetujui/Pending) |
| `tb_kas_bos` | Financial ledger balances | `id_kas`, `id_anggaran`, `saldo_awal`, `total_keluar`, `saldo_akhir` |

---

## 🎨 Interactive Features

The application incorporates several custom interactive subsystems:

### 1. SQL Logic Query Overlay
To reinforce transparency and combat "black box AI" behaviors, each KPI metric card displays an **SQL info icon**. Clicking it opens a modal overlay showing the raw database query behind that card.
* **Dynamic Interpolation**: The application parses parameters (such as `@tahun_ajaran`, `@semester`, and `@id_anggaran`) dynamically in the JSX display depending on the active filter choices.
* **Location**: Defined in `SQL_QUERIES` dictionary and mapped in the `openSqlModal` method in [app.jsx](file:///C:/Users/dell/Desktop/Docx/app.jsx).

### 2. Live Transaction Approval
Under the **Keuangan BOS** tab, users can view all pending invoices and payment requests.
* **Ledger Flow**: When a user clicks **Setujui** (Approve) on a transaction:
  1. The transaction `status` updates from `"Pending"` to `"Disetujui"`.
  2. A new ledger entry is created in `tb_kas_bos` referencing the updated balance.
  3. Sisa Saldo (Remaining Cash) and penyerapan (spending absorption rate) automatically recalculate.
* **Reject Option**: Clicking **Tolak** (Reject) updates the status to `"Ditolak"`, releasing the reservation without adjusting the cash ledger.

### 3. Budget Exceed Warning
The dashboard continuously checks financial compliance by matching actual transaction spending (`tb_transaksi_bos`) against the allocated RKAS budget plans (`tb_rencana_anggaran_bos`).
* **Warning States**:
  * **Normal (Green)**: Spending is below 80% of the plan.
  * **Warning (Orange)**: Spending has reached 80% - 100% of the allocated amount.
  * **Danger/Exceeded (Red)**: Actual transaction total is strictly greater than the planned budget.
* **Exceed Banner Alert**: When any component is in a danger state, a warning banner listing the exact overdrawn components and overspend amounts appears at the top of the Keuangan BOS dashboard to alert school administrators.

### 4. Custom SVG Charts
To prevent dashboard bloat and slow package loading, all visualization elements are built using native, lightweight SVG components:
* **Line Chart**: Draws the 6-month historical trends of student and teacher attendance. Plots grids, points, text labels, and smooth line paths (`M` / `L` nodes) using custom calculations inside `renderAttendanceChart`.
* **Donut Chart**: Computes the angle ratios (`strokeDasharray` offsets) for student gender distribution dynamically based on the filtered database state.

---

## 🎨 Design Guidelines
This dashboard strictly adheres to the international **60-30-10 design rule** to ensure a high-contrast, professional, and eye-strain-free user interface:
* **60% Dominant (Clean Slate)**: `#FAFAFA` Off-White background.
* **30% Secondary (Charcoal Contrast)**: `#18181B` deep dark grey for sidebars, primary text, and headers.
* **10% Accent (Warm Amber)**: `#F59E0B` warm mustard yellow for CTA highlights and active states.
* **Typography**: Plus Jakarta Sans for titles; Inter for body copy.
