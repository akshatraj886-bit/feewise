export const navigation = [
  "Dashboard",
  "Students",
  "Fee Structure",
  "Payments",
  "Reconciliation",
  "Instalments",
  "AI Assistant",
  "Smart Reminders",
  "Scholarship Risks",
  "Loan Requests",
  "Refunds",
  "Reports",
] as const;
export type View = (typeof navigation)[number];
export const inr = (amount: number) => "₹" + amount.toLocaleString("en-IN");
export const feeHeads = [
  { name: "Tuition", amount: 285.5, color: "var(--primary)" },
  { name: "Hostel", amount: 94.2, color: "var(--violet)" },
  { name: "Examination", amount: 38.6, color: "var(--chart-3)" },
  { name: "Transport", amount: 32.4, color: "var(--chart-4)" },
  { name: "Laboratory", amount: 21.5, color: "var(--chart-5)" },
  { name: "Library", amount: 8.4, color: "var(--muted-foreground)" },
];
export const collectionTrend = [
  { month: "April", collected: 46.5, demand: 58.2 },
  { month: "May", collected: 59.1, demand: 68.4 },
  { month: "June", collected: 74.3, demand: 85.6 },
  { month: "July", collected: 102.8, demand: 112.5 },
  { month: "August", collected: 71.2, demand: 88.4 },
  { month: "September", collected: 58.5, demand: 72.5 },
];
export const ageing = [
  { label: "0–30 days", amount: 31.5, color: "var(--primary)" },
  { label: "31–60 days", amount: 19.8, color: "var(--violet)" },
  { label: "61–90 days", amount: 13.4, color: "var(--warning)" },
  { label: "90+ days", amount: 8.5, color: "var(--destructive)" },
];
export const transactions = [
  {
    id: "TXN-10482",
    student: "251FA04E03",
    gateway: 30000,
    ledger: 30000,
    date: "11 Sep 2026",
    method: "UPI",
    status: "Matched",
  },
  {
    id: "TXN-10483",
    student: "251FA04E17",
    gateway: 25000,
    ledger: 20000,
    date: "11 Sep 2026",
    method: "Net banking",
    status: "Mismatch",
  },
  {
    id: "TXN-10484",
    student: "251FA04E21",
    gateway: 15000,
    ledger: 15000,
    date: "11 Sep 2026",
    method: "UPI",
    status: "Matched",
  },
  {
    id: "TXN-10485",
    student: "251FA04E36",
    gateway: 45000,
    ledger: 45000,
    date: "11 Sep 2026",
    method: "Debit card",
    status: "Matched",
  },
  {
    id: "TXN-10486",
    student: "251FA04E42",
    gateway: 18000,
    ledger: 18000,
    date: "10 Sep 2026",
    method: "UPI",
    status: "Matched",
  },
  {
    id: "TXN-10487",
    student: "251FA04E58",
    gateway: 40000,
    ledger: 40000,
    date: "09 Sep 2026",
    method: "Bank transfer",
    status: "Matched",
  },
  {
    id: "TXN-10488",
    student: "251FA04E21",
    gateway: 20000,
    ledger: 20000,
    date: "08 Sep 2026",
    method: "Counter collection",
    status: "Matched",
  },
  {
    id: "TXN-10489",
    student: "251FA04E03",
    gateway: 15000,
    ledger: 15000,
    date: "05 Sep 2026",
    method: "Bank transfer",
    status: "Matched",
  },
  {
    id: "TXN-10490",
    student: "251FA04E42",
    gateway: 30000,
    ledger: 30000,
    date: "03 Sep 2026",
    method: "Counter collection",
    status: "Matched",
  },
];
export type Transaction = (typeof transactions)[number];

export const students = [
  {
    id: "251FA04E03",
    name: "Akshat Raj",
    programme: "B.Tech CSE",
    category: "General",
    demand: 120000,
    paid: 92000,
    overdue: 24,
    initials: "AR",
    scholarship: 20000,
    concession: 0,
    instalmentPlan: "3-instalment",
  },
  {
    id: "251FA04E17",
    name: "Ananya Sharma",
    programme: "B.Tech CSE",
    category: "General",
    demand: 120000,
    paid: 120000,
    overdue: 0,
    initials: "AS",
    scholarship: 0,
    concession: 0,
    instalmentPlan: "lump-sum",
  },
  {
    id: "251FA04E21",
    name: "Rohan Mehta",
    programme: "MBA",
    category: "Scholarship",
    demand: 160000,
    paid: 115000,
    overdue: 96,
    initials: "RM",
    scholarship: 20000,
    concession: 5000,
    instalmentPlan: "2-instalment",
  },
  {
    id: "251FA04E36",
    name: "Ishita Nair",
    programme: "B.Tech ECE",
    category: "General",
    demand: 140000,
    paid: 140000,
    overdue: 0,
    initials: "IN",
    scholarship: 0,
    concession: 0,
    instalmentPlan: "lump-sum",
  },
  {
    id: "251FA04E42",
    name: "Aarav Desai",
    programme: "MBA",
    category: "General",
    demand: 180000,
    paid: 125000,
    overdue: 105,
    initials: "AD",
    scholarship: 0,
    concession: 0,
    instalmentPlan: "3-instalment",
  },
  {
    id: "251FA04E58",
    name: "Meera Iyer",
    programme: "B.Tech CSE",
    category: "Scholarship",
    demand: 120000,
    paid: 102000,
    overdue: 42,
    initials: "MI",
    scholarship: 20000,
    concession: 2000,
    instalmentPlan: "2-instalment",
  },
];
export type Student = (typeof students)[number];
export type AuditEntry = {
  time: string;
  user: string;
  action: string;
  entity: string;
  status: string;
};
export const initialAudit: AuditEntry[] = [
  {
    time: "10:24 AM",
    user: "Finance Admin",
    action: "Viewed payment",
    entity: "TXN-10483",
    status: "Success",
  },
  {
    time: "10:20 AM",
    user: "Finance Admin",
    action: "Prepared refund review",
    entity: "RF-2081",
    status: "Prepared",
  },
  {
    time: "10:17 AM",
    user: "Finance Agent",
    action: "Detected payment mismatch",
    entity: "TXN-10483",
    status: "Flagged",
  },
];
export const feeStructures = [
  {
    programme: "B.Tech CSE",
    year: "2026–27",
    category: "General",
    route: "Merit",
    head: "Tuition",
    amount: 90000,
    effective: "01 Apr 2026",
    version: "v3.0",
    active: true,
  },
  {
    programme: "B.Tech CSE",
    year: "2026–27",
    category: "General",
    route: "Merit",
    head: "Hostel",
    amount: 40000,
    effective: "01 Apr 2026",
    version: "v3.0",
    active: true,
  },
  {
    programme: "B.Tech CSE",
    year: "2026–27",
    category: "General",
    route: "Merit",
    head: "Examination",
    amount: 5000,
    effective: "01 Apr 2026",
    version: "v3.0",
    active: true,
  },
  {
    programme: "B.Tech ECE",
    year: "2026–27",
    category: "General",
    route: "Merit",
    head: "Tuition",
    amount: 90000,
    effective: "01 Apr 2026",
    version: "v3.0",
    active: true,
  },
  {
    programme: "MBA",
    year: "2026–27",
    category: "General",
    route: "Entrance",
    head: "Tuition",
    amount: 130000,
    effective: "01 Apr 2026",
    version: "v2.1",
    active: true,
  },
  {
    programme: "B.Tech CSE",
    year: "2025–26",
    category: "General",
    route: "Merit",
    head: "Tuition",
    amount: 85000,
    effective: "01 Apr 2025",
    version: "v2.0",
    active: false,
  },
];

// Instalment plans data
export type InstalmentStatus = "Paid" | "Pending" | "Overdue";
export type Instalment = {
  no: number;
  due: string;
  amount: number;
  paid: number;
  status: InstalmentStatus;
  paidOn?: string;
  method?: string;
};
export type InstalmentPlan = {
  studentId: string;
  planId: string;
  planType: string;
  academicYear: string;
  totalDemand: number;
  instalments: Instalment[];
};

export const instalmentPlans: InstalmentPlan[] = [
  {
    studentId: "251FA04E03",
    planId: "INST-3001",
    planType: "3-Instalment Plan",
    academicYear: "2026–27",
    totalDemand: 120000,
    instalments: [
      { no: 1, due: "15 Apr 2026", amount: 40000, paid: 40000, status: "Paid", paidOn: "12 Apr 2026", method: "UPI" },
      { no: 2, due: "15 Jul 2026", amount: 40000, paid: 40000, status: "Paid", paidOn: "10 Jul 2026", method: "Bank transfer" },
      { no: 3, due: "15 Oct 2026", amount: 40000, paid: 12000, status: "Pending" },
    ],
  },
  {
    studentId: "251FA04E21",
    planId: "INST-3002",
    planType: "2-Instalment Plan",
    academicYear: "2026–27",
    totalDemand: 160000,
    instalments: [
      { no: 1, due: "15 Apr 2026", amount: 80000, paid: 80000, status: "Paid", paidOn: "14 Apr 2026", method: "Net banking" },
      { no: 2, due: "15 Aug 2026", amount: 80000, paid: 35000, status: "Overdue" },
    ],
  },
  {
    studentId: "251FA04E42",
    planId: "INST-3003",
    planType: "3-Instalment Plan",
    academicYear: "2026–27",
    totalDemand: 180000,
    instalments: [
      { no: 1, due: "15 Apr 2026", amount: 60000, paid: 60000, status: "Paid", paidOn: "11 Apr 2026", method: "Counter collection" },
      { no: 2, due: "15 Jul 2026", amount: 60000, paid: 60000, status: "Paid", paidOn: "13 Jul 2026", method: "UPI" },
      { no: 3, due: "15 Oct 2026", amount: 60000, paid: 5000, status: "Overdue" },
    ],
  },
  {
    studentId: "251FA04E58",
    planId: "INST-3004",
    planType: "2-Instalment Plan",
    academicYear: "2026–27",
    totalDemand: 120000,
    instalments: [
      { no: 1, due: "15 Apr 2026", amount: 60000, paid: 60000, status: "Paid", paidOn: "14 Apr 2026", method: "Bank transfer" },
      { no: 2, due: "15 Aug 2026", amount: 60000, paid: 42000, status: "Pending" },
    ],
  },
  {
    studentId: "251FA04E17",
    planId: "INST-3005",
    planType: "Lump-sum",
    academicYear: "2026–27",
    totalDemand: 120000,
    instalments: [
      { no: 1, due: "15 Apr 2026", amount: 120000, paid: 120000, status: "Paid", paidOn: "10 Apr 2026", method: "Net banking" },
    ],
  },
  {
    studentId: "251FA04E36",
    planId: "INST-3006",
    planType: "Lump-sum",
    academicYear: "2026–27",
    totalDemand: 140000,
    instalments: [
      { no: 1, due: "15 Apr 2026", amount: 140000, paid: 140000, status: "Paid", paidOn: "08 Apr 2026", method: "UPI" },
    ],
  },
];

/**
 * Downloads data as a formatted .xlsx Excel file using SheetJS.
 * @param name  Filename (without extension — .xlsx is appended automatically)
 * @param rows  2D array where the first row is treated as the header row
 * @param sheetName  Optional worksheet name
 */
export async function downloadExcel(
  name: string,
  rows: (string | number)[][],
  sheetName = "Report",
) {
  // Dynamically import SheetJS so it doesn't bloat the initial bundle
  const XLSX = await import("xlsx");

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Auto-size columns (approximate based on content length)
  const colWidths = rows[0].map((_, colIdx) =>
    Math.min(
      40,
      Math.max(
        10,
        ...rows.map((row) => String(row[colIdx] ?? "").length + 2),
      ),
    ),
  );
  ws["!cols"] = colWidths.map((w) => ({ wch: w }));

  // Style header row — bold + light indigo background
  const headerLen = rows[0].length;
  for (let c = 0; c < headerLen; c++) {
    const cellAddr = XLSX.utils.encode_cell({ r: 0, c });
    if (!ws[cellAddr]) continue;
    ws[cellAddr].s = {
      font: { bold: true, color: { rgb: "1E1B4B" } },
      fill: { fgColor: { rgb: "EEF2FF" } },
      alignment: { horizontal: "left", vertical: "center", wrapText: false },
      border: {
        bottom: { style: "thin", color: { rgb: "C7D2FE" } },
      },
    };
  }

  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // Write and trigger download
  const baseName = name.replace(/\.(csv|xlsx|xls)$/i, "");
  XLSX.writeFile(wb, `${baseName}.xlsx`);
}

/**
 * Opens a formatted PDF fee statement in a new browser tab (print-ready).
 */
export function printStatementPdf(opts: any) {
  let data = opts;
  if (!opts.fees && (opts.id || opts.studentId)) {
    const sId = opts.id || opts.studentId;
    const student = students.find((s) => s.id === sId);
    if (student) {
      data = {
        studentName: student.name,
        studentId: student.id,
        programme: student.programme,
        category: student.category,
        academicYear: "2026–27",
        fees: [
          { head: "Tuition", gross: 90000, scholarship: student.scholarship, demand: 90000 - student.scholarship, paid: Math.min(student.paid, 90000 - student.scholarship), outstanding: Math.max(0, 90000 - student.scholarship - student.paid) },
          { head: "Hostel / Residence", gross: 25000, scholarship: 0, demand: 25000, paid: Math.max(0, Math.min(25000, student.paid - (90000 - student.scholarship))), outstanding: Math.max(0, 25000 - Math.max(0, student.paid - (90000 - student.scholarship))) },
          { head: "Examination & Labs", gross: 5000, scholarship: 0, demand: 5000, paid: 5000, outstanding: 0 },
        ],
        scholarship: student.scholarship,
        concession: student.concession,
        gross: student.demand + student.scholarship,
        demand: student.demand,
        paid: student.paid,
        outstanding: Math.max(0, student.demand - student.paid),
        payments: [
          { id: `RCPT-${student.id.slice(-4)}`, date: "15 Jul 2026", amount: student.paid, method: "Digital Payment", status: "Matched" },
        ],
        priorCycleSettled: 0,
      };
    }
  }

  const feeRows = (data.fees || [])
    .map(
      (f: any) => `<tr>
      <td>${f.head}</td>
      <td class="num">${inr(f.gross)}</td>
      <td class="num ${f.scholarship ? "green" : "dim"}">${f.scholarship ? "−" + inr(f.scholarship) : "—"}</td>
      <td class="num bold">${inr(f.demand)}</td>
      <td class="num green">${inr(f.paid)}</td>
      <td class="num ${f.outstanding > 0 ? "warn" : "green"}">${inr(f.outstanding)}</td>
    </tr>`,
    )
    .join("");

  const payRows = (data.payments || [])
    .map(
      (p: any) => `<tr>
      <td class="mono">${p.id}</td>
      <td>${p.date}</td>
      <td class="num bold">${inr(p.amount)}</td>
      <td>${p.method}</td>
      <td><span class="badge ${p.status === "Matched" || p.status === "Success" ? "badge-green" : p.status === "Mismatch" ? "badge-red" : "badge-blue"}">${p.status}</span></td>
    </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Fee Statement — ${opts.studentName}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',system-ui,sans-serif;background:#f8fafc;padding:32px 16px;color:#1e293b}
    .page{background:#fff;max-width:780px;margin:0 auto;border-radius:16px;box-shadow:0 4px 32px rgba(0,0,0,.08);padding:40px 44px}
    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px}
    .logo-row{display:flex;align-items:center;gap:12px}
    .logo{width:44px;height:44px;border-radius:12px;background:#6366f1;display:flex;align-items:center;justify-content:center}
    .logo svg{width:24px;height:24px;fill:#fff}
    .brand{font-size:18px;font-weight:700;letter-spacing:-.03em}
    .sub{font-size:10px;letter-spacing:.1em;color:#64748b;text-transform:uppercase;margin-top:2px}
    .doc-title{font-size:22px;font-weight:700;letter-spacing:-.04em}
    .doc-sub{font-size:12px;color:#64748b;margin-top:4px}
    .divider{border:none;border-top:1px solid #e2e8f0;margin:20px 0}
    .info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px 24px;background:#f8fafc;border-radius:12px;padding:16px 20px;margin-bottom:24px}
    .info-label{font-size:11px;color:#64748b;letter-spacing:.04em;text-transform:uppercase}
    .info-value{font-size:14px;font-weight:600;margin-top:3px}
    h2{font-size:14px;font-weight:700;letter-spacing:-.01em;margin-bottom:10px;color:#1e293b}
    table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px}
    th{background:#eef2ff;color:#312e81;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.05em;padding:8px 10px;text-align:left;border-bottom:2px solid #c7d2fe}
    td{padding:8px 10px;border-bottom:1px solid #f1f5f9}
    tr:last-child td{border-bottom:none}
    .num{text-align:right;font-variant-numeric:tabular-nums}
    .bold{font-weight:700}
    .green{color:#16a34a}
    .warn{color:#d97706;font-weight:600}
    .dim{color:#94a3b8}
    .mono{font-family:monospace;font-size:12px}
    .total-row td{font-weight:700;border-top:2px solid #e2e8f0;background:#f8fafc}
    .summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
    .summary-card{border-radius:10px;padding:14px 16px}
    .summary-card.blue{background:#eef2ff;border:1px solid #c7d2fe}
    .summary-card.green{background:#f0fdf4;border:1px solid #bbf7d0}
    .summary-card.warn{background:#fffbeb;border:1px solid #fde68a}
    .summary-label{font-size:11px;color:#64748b;margin-bottom:4px}
    .summary-value{font-size:22px;font-weight:800;letter-spacing:-.04em}
    .summary-value.blue{color:#4338ca}
    .summary-value.green{color:#15803d}
    .summary-value.warn{color:#b45309}
    .badge{display:inline-block;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:600}
    .badge-green{background:#f0fdf4;color:#16a34a}
    .badge-red{background:#fef2f2;color:#dc2626}
    .badge-blue{background:#eff6ff;color:#2563eb}
    .footer{margin-top:24px;text-align:center;font-size:11px;color:#94a3b8;line-height:1.6}
    @media print{.no-print{display:none!important}body{padding:0!important}.page{box-shadow:none;border-radius:0;max-width:100%;padding:24px 32px}}
  </style>
</head>
<body>
  <div class="no-print" style="position:sticky;top:0;left:0;right:0;background:#0f172a;color:#f8fafc;padding:10px 24px;display:flex;justify-content:space-between;align-items:center;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.12);margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-weight:700;color:#38bdf8;">VFSTR University</span>
      <span style="color:#94a3b8;font-size:12px;">• Official Student Fee Statement</span>
    </div>
    <div style="display:flex;gap:10px;">
      <button onclick="window.print()" style="background:#0284c7;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:600;font-size:12px;">🖨️ Print / Save as PDF</button>
      <button onclick="window.close()" style="background:#334155;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:500;font-size:12px;">✕ Close</button>
    </div>
  </div>
  <div class="page">
    <div class="header">
      <div class="logo-row">
        <img src="/vignan-logo.png" style="height:44px;max-width:180px;object-fit:contain" alt="VFSTR" />
        <div><div class="brand">VFSTR UNIVERSITY</div><div class="sub">Vignan&apos;s Foundation for Science, Technology & Research</div></div>
      </div>
      <div style="text-align:right">
        <div class="doc-title">Official Fee Statement</div>
        <div class="doc-sub">Academic Year ${data.academicYear || "2026–27"} · VFSTR Treasury</div>
      </div>
    </div>
    <div class="info-grid">
      <div><div class="info-label">Student name</div><div class="info-value">${data.studentName}</div></div>
      <div><div class="info-label">Student ID</div><div class="info-value">${data.studentId}</div></div>
      <div><div class="info-label">Programme</div><div class="info-value">${data.programme}</div></div>
      <div><div class="info-label">Category</div><div class="info-value">${data.category}</div></div>
      <div><div class="info-label">Academic year</div><div class="info-value">${data.academicYear}</div></div>
      <div><div class="info-label">Generated on</div><div class="info-value">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div></div>
    </div>
    <div class="summary-grid">
      <div class="summary-card blue"><div class="summary-label">Final demand</div><div class="summary-value blue">${inr(data.demand)}</div></div>
      <div class="summary-card green"><div class="summary-label">Total paid</div><div class="summary-value green">${inr(data.paid)}</div></div>
      <div class="summary-card ${data.outstanding > 0 ? "warn" : "green"}"><div class="summary-label">Outstanding</div><div class="summary-value ${data.outstanding > 0 ? "warn" : "green"}">${inr(data.outstanding)}</div></div>
    </div>
    <h2>Fee Breakdown</h2>
    <table>
      <thead><tr><th>Fee head</th><th class="num">Gross</th><th class="num">Scholarship</th><th class="num">Demand</th><th class="num">Paid</th><th class="num">Outstanding</th></tr></thead>
      <tbody>${feeRows}</tbody>
      <tfoot>
        <tr class="total-row">
          <td>Total</td>
          <td class="num">${inr(data.gross)}</td>
          <td class="num green">${data.scholarship ? "−" + inr(data.scholarship) : "—"}</td>
          <td class="num">${inr(data.demand)}</td>
          <td class="num green">${inr(data.paid)}</td>
          <td class="num ${data.outstanding > 0 ? "warn" : "green"}">${inr(data.outstanding)}</td>
        </tr>
      </tfoot>
    </table>
    ${data.priorCycleSettled ? `<p style="font-size:12px;color:#64748b;margin:-12px 0 20px">+ ₹${data.priorCycleSettled.toLocaleString("en-IN")} settled prior-cycle demand (excluded from above)</p>` : ""}
    <h2>Payment History</h2>
    <table>
      <thead><tr><th>Receipt / TXN</th><th>Date</th><th class="num">Amount</th><th>Method</th><th>Status</th></tr></thead>
      <tbody>${payRows || "<tr><td colspan='5' style='color:#94a3b8;text-align:center;padding:16px'>No payment records</td></tr>"}</tbody>
    </table>
    <div class="footer">
      Official Fee Statement · Vignan&apos;s Foundation for Science, Technology & Research (VFSTR Deemed to be University)<br/>
      Office of the Comptroller of Finance & Accounts · Vadlamudi Campus, Guntur
    </div>
  </div>
  <script>
    window.addEventListener("load", function() {
      setTimeout(function() {
        try { window.print(); } catch (e) {}
      }, 350);
    });
  </script>
</body>
</html>`;

  openPrintDocument(html);
}

/**
 * Safely opens a printable document in an isolated new window without freezing the parent application.
 * Uses a Blob URL + rel="noopener noreferrer" to detach completely from the parent tab's thread and event loop.
 */
export function openPrintDocument(html: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 180000);
}


/** Opens a print-ready PDF receipt in a new browser tab */
export function printReceiptPdf(opts: any) {
  const receiptNo = opts.receiptNo ?? (opts.id ? `RCPT-${String(opts.id).replace("TXN-", "")}` : "RCPT-001");
  const studentId = opts.studentId ?? opts.student ?? "—";
  const student = students.find((s) => s.id === studentId);
  const studentName = opts.studentName ?? student?.name ?? "Student";
  const programme = opts.programme ?? student?.programme ?? "Undergraduate";
  const date = opts.date ?? new Date().toLocaleDateString("en-IN");
  const amount = opts.amount ?? opts.ledger ?? 0;
  const method = opts.method ?? "Digital Transfer";
  const txnId = opts.txnId ?? opts.id ?? "—";

  const headRows = opts.heads
    ? opts.heads
        .map(
          (h: any) =>
            `<tr><td style="padding:6px 0;color:#64748b">${h.head}</td><td style="padding:6px 0;text-align:right;font-variant-numeric:tabular-nums">${inr(h.amount)}</td></tr>`,
        )
        .join("")
    : `<tr><td style="padding:6px 0;color:#64748b">Fee payment</td><td style="padding:6px 0;text-align:right">${inr(amount)}</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Fee Receipt ${receiptNo}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',system-ui,sans-serif;background:#f8fafc;display:flex;justify-content:center;padding:40px 16px}
    .card{background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,.08);max-width:480px;width:100%;padding:36px}
    .header{display:flex;align-items:center;gap:12px;margin-bottom:24px}
    .logo{width:44px;height:44px;border-radius:12px;background:#6366f1;display:flex;align-items:center;justify-content:center}
    .logo svg{width:24px;height:24px;fill:#fff}
    .brand{font-size:16px;font-weight:700;letter-spacing:-.03em}
    .sub{font-size:10px;letter-spacing:.05em;color:#64748b;text-transform:uppercase;margin-top:2px}
    .divider{border:none;border-top:1px solid #e2e8f0;margin:20px 0}
    .badge{display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;color:#16a34a;border-radius:999px;padding:4px 12px;font-size:12px;font-weight:600;margin-bottom:20px}
    .dot{width:6px;height:6px;border-radius:50%;background:#16a34a}
    .receipt-no{font-size:22px;font-weight:700;letter-spacing:-.04em;color:#1e293b}
    .label{font-size:12px;color:#64748b;margin-bottom:4px}
    .value{font-size:14px;font-weight:500;color:#1e293b}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}
    table{width:100%;border-collapse:collapse;font-size:14px}
    .total-row td{font-weight:700;border-top:1px solid #e2e8f0;padding-top:10px;padding-bottom:0}
    .amount-box{background:#f8fafc;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;margin-top:20px}
    .amount-label{font-size:13px;color:#64748b}
    .amount-value{font-size:26px;font-weight:700;letter-spacing:-.05em;color:#6366f1}
    .footer{margin-top:24px;font-size:12px;color:#94a3b8;text-align:center;line-height:1.6}
    .method-badge{background:#ede9fe;color:#7c3aed;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600}
    @media print{.no-print{display:none!important}body{padding:0!important}.card{box-shadow:none;border-radius:0;max-width:100%}}
  </style>
</head>
<body style="display:flex;flex-direction:column;align-items:center;padding:0 16px 40px 16px;">
  <div class="no-print" style="position:sticky;top:0;left:0;right:0;width:100%;max-width:600px;background:#0f172a;color:#f8fafc;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.12);margin-bottom:24px;border-radius:0 0 10px 10px;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-weight:700;color:#818cf8;">VFSTR University</span>
      <span style="color:#94a3b8;font-size:12px;">• Official Fee Receipt</span>
    </div>
    <div style="display:flex;gap:10px;">
      <button onclick="window.print()" style="background:#6366f1;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:600;font-size:12px;">🖨️ Print / Save as PDF</button>
      <button onclick="window.close()" style="background:#334155;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:500;font-size:12px;">✕ Close</button>
    </div>
  </div>
  <div class="card">
    <div class="header">
      <img src="/vignan-logo.png" style="height:46px;max-width:160px;object-fit:contain" alt="VFSTR" />
      <div>
        <div class="brand">VFSTR UNIVERSITY</div>
        <div class="sub">Vignan&apos;s Foundation for Science, Technology & Research</div>
      </div>
    </div>
    <div class="badge"><span class="dot"></span> Payment confirmed</div>
    <div class="receipt-no">${receiptNo}</div>
    <hr class="divider"/>
    <div class="grid">
      <div>
        <div class="label">Student name</div>
        <div class="value">${studentName}</div>
      </div>
      <div>
        <div class="label">Student ID</div>
        <div class="value">${studentId}</div>
      </div>
      <div>
        <div class="label">Programme</div>
        <div class="value">${programme}</div>
      </div>
      <div>
        <div class="label">Academic year</div>
        <div class="value">2026–27</div>
      </div>
      <div>
        <div class="label">Date</div>
        <div class="value">${date}</div>
      </div>
      <div>
        <div class="label">Transaction ID</div>
        <div class="value" style="font-family:monospace">${txnId}</div>
      </div>
      <div>
        <div class="label">Payment method</div>
        <div class="value"><span class="method-badge">${method}</span></div>
      </div>
    </div>
    <hr class="divider"/>
    <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:10px">Fee breakdown</div>
    <table>
      <thead>
        <tr>
          <th style="padding-bottom:8px;color:#64748b;font-weight:600;font-size:12px;text-transform:uppercase">Allocation head</th>
          <th style="padding-bottom:8px;text-align:right;color:#64748b;font-weight:600;font-size:12px;text-transform:uppercase">Amount</th>
        </tr>
      </thead>
      <tbody>${headRows}</tbody>
      <tfoot>
        <tr class="total-row">
          <td style="padding-top:10px">Total paid</td>
          <td style="text-align:right;font-variant-numeric:tabular-nums">${inr(opts.amount)}</td>
        </tr>
      </tfoot>
    </table>
    <div class="amount-box">
      <div class="amount-label">Amount paid</div>
      <div class="amount-value">${inr(amount)}</div>
    </div>
    <div style="margin-top:16px;display:flex;align-items:center;gap:8px">
      <div class="label" style="margin:0">Payment method</div>
      <div class="method-badge">${method}</div>
    </div>
    ${opts.note ? `<div style="margin-top:16px;background:#fefce8;border-radius:8px;padding:10px 14px;font-size:12px;color:#854d0e">${opts.note}</div>` : ""}
    <div class="footer">
      Official Fee Receipt · Vignan&apos;s Foundation for Science, Technology & Research (VFSTR Deemed to be University)<br/>
      Comptroller of Finance & Accounts · Vadlamudi, Guntur
    </div>
  </div>
  <script>
    window.addEventListener("load", function() {
      setTimeout(function() {
        try { window.print(); } catch (e) {}
      }, 350);
    });
  </script>
</body>
</html>`;

  openPrintDocument(html);
}
