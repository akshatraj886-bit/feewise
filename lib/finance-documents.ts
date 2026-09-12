import { inr, type Student, students } from "@/lib/finance-data";
import { getStudentAccount } from "@/lib/finance-service";

export type FinanceDocType = "bonafide" | "noc" | "reimbursement" | "statement" | "tax";

export interface FinanceDocMeta {
  type: FinanceDocType;
  title: string;
  badge: string;
  themeColor: string; // Tailwind/HEX badge color
  themeName: string;
  desc: string;
}

export const FINANCE_DOC_METAS: Record<FinanceDocType, FinanceDocMeta> = {
  bonafide: {
    type: "bonafide",
    title: "Bonafide Student Certificate",
    badge: "BONAFIDE CERTIFICATE",
    themeColor: "#1d4ed8",
    themeName: "Blue Theme",
    desc: "Official institutional enrollment and active student verification certificate for banks and external authorities.",
  },
  noc: {
    type: "noc",
    title: "No Objection Certificate (NOC)",
    badge: "NO OBJECTION CERTIFICATE",
    themeColor: "#15803d",
    themeName: "Green Theme",
    desc: "Institutional clearance and direct bank transfer mandate for nationalized education loan disbursement.",
  },
  reimbursement: {
    type: "reimbursement",
    title: "Fee Reimbursement Certificate",
    badge: "FEE REIMBURSEMENT CERTIFICATE",
    themeColor: "#6d28d9",
    themeName: "Purple Theme",
    desc: "Attestation for parent employer reimbursement, Children Education Allowance (CEA), or government scholarship claims.",
  },
  statement: {
    type: "statement",
    title: "Official Fee Statement & Ledger",
    badge: "OFFICIAL FEE STATEMENT",
    themeColor: "#1e3a8a",
    themeName: "Indigo Theme",
    desc: "Comprehensive head-wise approved fee demand, payments ledger, and verified balance record.",
  },
  tax: {
    type: "tax",
    title: "Tuition Fee Tax Certificate",
    badge: "TAX CERTIFICATE",
    themeColor: "#0f766e",
    themeName: "Teal Theme",
    desc: "Certificate for income tax deduction claims under Section 80C & 80E of the Indian Income Tax Act, 1961.",
  },
};

export interface GenerateDocOptions {
  logoUrl?: string;
  certRef?: string;
  docDate?: string;
  signatoryName?: string;
  signatoryRole?: string;
  sealSubtext?: string;
  footerNote?: string;
  purposeNote?: string;
}

interface NormalizedStudentDocData {
  student: Student;
  name: string;
  id: string;
  program: string;
  academicYear: string;
  category: string;
  totalDemand: number;
  totalPaid: number;
  totalDue: number;
  totalGross: number;
  feeStatus: string;
  fees: Array<{
    head: string;
    gross: number;
    demand: number;
    paid: number;
    outstanding: number;
    statusLabel: string;
    statusClass: string;
    provision: string;
  }>;
}

/**
 * Resolves student data and itemized head-wise fees from the authoritative database
 */
export function normalizeStudentDocData(studentOrId: Student | string): NormalizedStudentDocData {
  let student: Student | undefined;
  if (typeof studentOrId === "string") {
    student = students.find((s) => s.id === studentOrId);
  } else {
    student = studentOrId;
  }

  const id = student?.id || "251FA04E03";
  const name = student?.name || "Student Scholar";
  const program = (student as any)?.programme || (student as any)?.program || "B.Tech Computer Science & Engineering";
  const academicYear = "Academic Year 2026–2027";
  const category = student?.category || "Regular";

  const totalDemand = Number(student?.demand ?? (student as any)?.totalDemand ?? 120000);
  const totalPaid = Number(student?.paid ?? (student as any)?.totalPaid ?? 0);
  const totalDue = Math.max(0, totalDemand - totalPaid);

  const acct = getStudentAccount(id);
  let itemizedFees: Array<{
    head: string;
    gross: number;
    demand: number;
    paid: number;
    outstanding: number;
    statusLabel: string;
    statusClass: string;
    provision: string;
  }> = [];

  if (acct?.fees && acct.fees.length > 0) {
    itemizedFees = acct.fees.map((f) => {
      const isTuition = f.head.toLowerCase().includes("tuition");
      const isCleared = f.outstanding === 0;
      return {
        head: f.head,
        gross: f.gross,
        demand: f.demand,
        paid: f.paid,
        outstanding: f.outstanding,
        statusLabel: isCleared ? "Cleared" : f.paid > 0 ? "Partial" : "Due",
        statusClass: isCleared ? "status-cleared" : "status-due",
        provision: isTuition
          ? "Sec 80C Higher Education Tuition"
          : "Institutional Facilities & Exam Services",
      };
    });
  } else {
    // Default fallback head allocation
    const tuitionGross = Math.round(totalDemand * 0.75);
    const scholarship = student?.scholarship || 0;
    const tuitionDemand = Math.max(0, tuitionGross - scholarship);
    const tuitionPaid = Math.min(totalPaid, tuitionDemand);

    const otherDemand = Math.max(0, totalDemand - tuitionDemand);
    const otherPaid = Math.max(0, totalPaid - tuitionPaid);

    itemizedFees = [
      {
        head: "Tuition Fee",
        gross: tuitionGross,
        demand: tuitionDemand,
        paid: tuitionPaid,
        outstanding: Math.max(0, tuitionDemand - tuitionPaid),
        statusLabel: tuitionPaid >= tuitionDemand ? "Cleared" : tuitionPaid > 0 ? "Partial" : "Due",
        statusClass: tuitionPaid >= tuitionDemand ? "status-cleared" : "status-due",
        provision: "Sec 80C Higher Education Tuition",
      },
      {
        head: "Hostel & Residence Charges",
        gross: Math.round(otherDemand * 0.6),
        demand: Math.round(otherDemand * 0.6),
        paid: Math.min(otherPaid, Math.round(otherDemand * 0.6)),
        outstanding: Math.max(0, Math.round(otherDemand * 0.6) - Math.min(otherPaid, Math.round(otherDemand * 0.6))),
        statusLabel: otherPaid >= Math.round(otherDemand * 0.6) ? "Cleared" : "Due",
        statusClass: otherPaid >= Math.round(otherDemand * 0.6) ? "status-cleared" : "status-due",
        provision: "Campus Residence & Amenities",
      },
      {
        head: "Statutory Examination Fee",
        gross: Math.round(otherDemand * 0.2),
        demand: Math.round(otherDemand * 0.2),
        paid: Math.max(0, Math.min(otherPaid - Math.round(otherDemand * 0.6), Math.round(otherDemand * 0.2))),
        outstanding: Math.max(0, Math.round(otherDemand * 0.2) - Math.max(0, Math.min(otherPaid - Math.round(otherDemand * 0.6), Math.round(otherDemand * 0.2)))),
        statusLabel: "Cleared",
        statusClass: "status-cleared",
        provision: "University Exam Board Assessment",
      },
      {
        head: "Library & Lab Consumables",
        gross: Math.max(0, otherDemand - Math.round(otherDemand * 0.8)),
        demand: Math.max(0, otherDemand - Math.round(otherDemand * 0.8)),
        paid: Math.max(0, otherPaid - Math.round(otherDemand * 0.8)),
        outstanding: Math.max(0, (otherDemand - Math.round(otherDemand * 0.8)) - Math.max(0, otherPaid - Math.round(otherDemand * 0.8))),
        statusLabel: "Cleared",
        statusClass: "status-cleared",
        provision: "Digital Resources & Lab Services",
      },
    ];
  }

  const totalGross = itemizedFees.reduce((acc, f) => acc + f.gross, 0) || totalDemand;
  const feeStatus = totalDue === 0 ? "FEES FULLY CLEARED" : "PARTIALLY PAID (ACTIVE DUES)";

  return {
    student: student || ({ id, name, program, demand: totalDemand, paid: totalPaid } as any),
    name,
    id,
    program,
    academicYear,
    category,
    totalDemand,
    totalPaid,
    totalDue,
    totalGross,
    feeStatus,
    fees: itemizedFees,
  };
}

/**
 * Returns the master CSS template matching finance-documents-templates.html exactly.
 * In addition to screen styles, print-color-adjust ensures background tints,
 * brand top borders, and table borders survive conversion to PDF.
 */
export const FINANCE_DOCUMENTS_CSS = `
  :root{
    --ink:        #1a2233;
    --ink-soft:   #4b5568;
    --line:       #e1e4ec;
    --font-head:  'Source Serif Pro', Georgia, 'Times New Roman', serif;
    --font-body:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: #e9ebf1;
    font-family: var(--font-body);
    color: var(--ink-soft);
    -webkit-font-smoothing: antialiased;
  }

  /* Standalone Top Floating Action Bar (Suppressed in Print/PDF) */
  .doc-action-bar {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background: #0f172a;
    color: #f8fafc;
    padding: 10px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99999;
    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    font-size: 13px;
    font-family: var(--font-body);
  }
  .doc-action-bar .brand-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .doc-action-bar .brand-badge {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    background: #1e293b;
    border: 1px solid #334155;
    color: #38bdf8;
  }
  .doc-action-bar .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .doc-action-bar button {
    border: none;
    padding: 7px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    font-family: var(--font-body);
    transition: all 0.15s ease;
  }
  .btn-print-action {
    background: #2563eb;
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(37,99,235,0.3);
  }
  .btn-print-action:hover {
    background: #1d4ed8;
  }
  .btn-close-action {
    background: #334155;
    color: #f1f5f9;
  }
  .btn-close-action:hover {
    background: #475569;
  }

  .page-label{
    max-width:800px; margin:28px auto 6px; padding:0 4px;
    font-family: var(--font-body); font-size:12px; color:#6b7280;
    text-transform:uppercase; letter-spacing:.6px;
  }

  .sheet{
    width: 800px; max-width:100%; margin: 0 auto 28px;
    background: var(--bg-page);
    color: var(--ink-soft);
    padding: 44px 52px 36px;
    border: 1px solid var(--line);
    position: relative;
    border-top: 6px solid var(--brand);   /* the color-coding cue: top bar */
    box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  }

  /* ---------- Letterhead ---------- */
  .letterhead{ display:flex; align-items:flex-start; justify-content:space-between; gap:24px; padding-bottom:16px; border-bottom:1.5px solid var(--line); }
  .letterhead-left{ display:flex; gap:14px; align-items:flex-start; }
  .logo-slot{ width:52px; height:52px; flex:none; border-radius:6px; background:#fff; border:1px solid var(--line); display:flex; align-items:center; justify-content:center; font-size:10px; color:#9aa2b1; overflow:hidden; }
  .logo-slot img{ width:100%; height:100%; object-fit:contain; }
  .org-name{ font-family:var(--font-head); font-size:18px; color:var(--ink); font-weight:600; line-height:1.25; margin:0; }
  .org-sub{ font-size:11px; color:var(--ink-soft); margin-top:3px; line-height:1.5; }
  .doc-meta{ text-align:right; font-size:11px; color:var(--ink-soft); white-space:nowrap; }
  .doc-meta b{ color:var(--ink); }

  /* ---------- Type badge — shows which color-coded category this is ---------- */
  .type-badge{
    display:inline-block; margin-top:10px; padding:4px 12px;
    border-radius:3px; font-size:10.5px; font-weight:700; letter-spacing:.4px;
    background: var(--tint); color: var(--brand);
  }

  /* ---------- Title ---------- */
  .doc-title-wrap{ text-align:center; margin:24px 0 20px; }
  .doc-title{ font-family:var(--font-head); font-size:21px; color:var(--brand); margin:0; }
  .doc-subtitle{ font-size:12px; color:var(--ink-soft); margin-top:6px; }

  /* ---------- Info grid — light tint background = the "type color" cue ---------- */
  .info-grid{
    display:grid; grid-template-columns:1fr 1fr; gap:10px 32px;
    background: var(--tint); border:1px solid var(--tint-border);
    border-radius:4px; padding:15px 20px; margin-bottom:20px; font-size:12.5px;
  }
  .info-item span.label{ display:block; font-size:10px; color:#7c8291; margin-bottom:2px; text-transform:uppercase; letter-spacing:0.3px; }
  .info-item span.value{ color:var(--ink); font-weight:600; }

  .body-text{ font-size:13px; line-height:1.7; color:var(--ink-soft); margin-bottom:18px; text-align:justify; }
  .body-text b{ color:var(--ink); }

  /* ---------- Table ---------- */
  table.doc-table{ width:100%; border-collapse:collapse; margin-bottom:16px; font-size:12.5px; }
  table.doc-table th{ text-align:left; font-size:10px; color:#7c8291; text-transform:uppercase; letter-spacing:.4px; padding:8px 10px; border-bottom:2px solid var(--brand); }
  table.doc-table td{ padding:8px 10px; border-bottom:1px solid var(--line); color:var(--ink); }
  table.doc-table tr:last-child td{ border-bottom:none; }
  table.doc-table td.num, table.doc-table th.num{ text-align:right; font-variant-numeric: tabular-nums; }
  .status-cleared{ color:#1f7a4d; font-weight:600; }
  .status-due{ color:#b3541e; font-weight:600; }
  .row-total td{ border-top:2px solid var(--brand); font-weight:700; color:var(--brand); background:var(--tint); }

  .stat-strip{ display:flex; gap:12px; margin-bottom:20px; }
  .stat-card{ flex:1; border:1px solid var(--line); background:var(--tint); border-radius:4px; padding:11px 15px; }
  .stat-card .label{ font-size:10px; color:#7c8291; text-transform:uppercase; letter-spacing:0.3px; }
  .stat-card .amount{ font-family:var(--font-head); font-size:18px; color:var(--brand); margin-top:2px; font-weight:700; }

  /* ---------- Seal + signature ---------- */
  .cert-row{ display:flex; justify-content:space-between; align-items:flex-end; margin-top:30px; gap:24px; }
  .seal-box{ border:1px dashed var(--brand); background:var(--tint); border-radius:4px; padding:11px 16px; font-size:10.5px; color:var(--brand); text-align:center; line-height:1.6; min-width:210px; }
  .seal-box .seal-title{ font-weight:700; letter-spacing:.3px; }
  .signature{ text-align:right; font-size:12px; }
  .signature .sig-line{ width:180px; border-top:1px solid var(--ink); margin:0 0 6px auto; padding-top:6px; font-weight:600; color:var(--ink); }
  .signature .sig-role{ color:var(--ink-soft); font-size:11px; }

  .doc-footer{ margin-top:22px; padding-top:10px; border-top:1px solid var(--line); font-size:10px; color:#9aa2b1; text-align:center; line-height:1.6; }

  /* =====================================================================
     COLOR-CODED TYPES — CSS variable override blocks per document type
     ===================================================================== */
  .sheet[data-type="bonafide"]{      --brand:#1d4ed8; --tint:#eaf1fd; --tint-border:#d3e2fa; --bg-page:#fbfcff; }
  .sheet[data-type="noc"]{           --brand:#15803d; --tint:#e9f8ee; --tint-border:#cdedd8; --bg-page:#fbfdfc; }
  .sheet[data-type="reimbursement"]{ --brand:#6d28d9; --tint:#f3edfc; --tint-border:#e2d3f7; --bg-page:#fcfbff; }
  .sheet[data-type="statement"]{     --brand:#1e3a8a; --tint:#eceff9; --tint-border:#d6dcf2; --bg-page:#fbfbfe; }
  .sheet[data-type="tax"]{           --brand:#0f766e; --tint:#e6f7f5; --tint-border:#c8ece7; --bg-page:#fafefd; }

  /* Print and PDF Export Styles: Preserves exact colors, borders, and margins */
  @page {
    size: A4 portrait;
    margin: 12mm 14mm;
  }
  @media print {
    html, body {
      background: #ffffff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .sheet {
      border: 1px solid var(--line) !important;
      border-top: 6px solid var(--brand) !important;
      margin: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      box-shadow: none !important;
      padding: 36px 40px !important;
      page-break-after: always;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page-label, .doc-action-bar, .no-print {
      display: none !important;
    }
  }
`;

/**
 * Generates the repeatable rows HTML between ROW_START and ROW_END
 */
function buildRepeatableFeeRows(docType: FinanceDocType, rowTemplate: string, data: NormalizedStudentDocData): string {
  if (docType === "tax") {
    // For tax: Tuition + Non-tuition components
    const tuition = data.fees.find((f) => f.head.toLowerCase().includes("tuition"));
    const tuitionPaid = tuition ? tuition.paid : Math.round(data.totalPaid * 0.75);
    const otherPaid = Math.max(0, data.totalPaid - tuitionPaid);

    const rows = [
      {
        head: "Tuition Fee (Higher Education Section 80C)",
        provision: "Eligible for IT Exemption under Sec 80C / 80E",
        paid: inr(tuitionPaid),
      },
      {
        head: "Institutional Development, Labs & Campus Charges",
        provision: "Campus Academic Infrastructure & Statutory Fee",
        paid: inr(otherPaid),
      },
    ];

    return rows
      .map((r) =>
        rowTemplate
          .replace(/\{\{FEE_HEAD\}\}/g, r.head)
          .replace(/\{\{PROVISION\}\}/g, r.provision)
          .replace(/\{\{PAID_AMOUNT\}\}/g, r.paid)
      )
      .join("\n");
  }

  // For NOC, Reimbursement, Statement: Loop through every itemized fee head
  return data.fees
    .map((f) => {
      return rowTemplate
        .replace(/\{\{FEE_HEAD\}\}/g, f.head)
        .replace(/\{\{GROSS_AMOUNT\}\}/g, inr(f.gross))
        .replace(/\{\{DEMAND_AMOUNT\}\}/g, inr(f.demand))
        .replace(/\{\{PAID_AMOUNT\}\}/g, inr(f.paid))
        .replace(/\{\{BALANCE_AMOUNT\}\}/g, inr(f.outstanding))
        .replace(/\{\{STATUS_LABEL\}\}/g, f.statusLabel)
        .replace(/\{\{STATUS_CLASS\}\}/g, f.statusClass)
        .replace(/\{\{PROVISION\}\}/g, f.provision);
    })
    .join("\n");
}

/**
 * Returns raw HTML body for the specific docType sheet skeleton
 */
function getSheetTemplate(docType: FinanceDocType): string {
  switch (docType) {
    case "bonafide":
      return `
<div class="page-label">Type: Bonafide Certificate</div>
<div class="sheet" data-type="bonafide">
  <div class="letterhead">
    <div class="letterhead-left">
      <div class="logo-slot"><img src="{{LOGO_URL}}" alt="logo" onerror="this.parentElement.textContent='VFSTR'"></div>
      <div>
        <p class="org-name">{{ORG_NAME}}</p>
        <div class="org-sub">{{ORG_TAGLINE}}<br>{{ORG_DEPARTMENT}}</div>
      </div>
    </div>
    <div class="doc-meta"><div><b>Ref:</b> {{CERT_REF}}</div><div><b>Date:</b> {{DOC_DATE}}</div></div>
  </div>
  <div class="doc-title-wrap">
    <span class="type-badge">BONAFIDE CERTIFICATE</span>
    <h1 class="doc-title">{{DOC_TITLE}}</h1>
    <div class="doc-subtitle">{{DOC_SUBTITLE}}</div>
  </div>
  <div class="info-grid">
    <div class="info-item"><span class="label">Student Name</span><span class="value">{{STUDENT_NAME}}</span></div>
    <div class="info-item"><span class="label">Academic Year</span><span class="value">{{ACADEMIC_YEAR}}</span></div>
    <div class="info-item"><span class="label">Registration No.</span><span class="value">{{REG_NO}}</span></div>
    <div class="info-item"><span class="label">Program</span><span class="value">{{PROGRAM}}</span></div>
  </div>
  <p class="body-text">{{BODY_PARAGRAPH}}</p>
  <div class="cert-row">
    <div class="seal-box"><div class="seal-title">{{ORG_SHORT_NAME}} — VERIFIED</div>{{SEAL_SUBTEXT}}</div>
    <div class="signature"><div class="sig-line">{{SIGNATORY_NAME}}</div><div class="sig-role">{{SIGNATORY_ROLE}}</div></div>
  </div>
  <div class="doc-footer">{{FOOTER_NOTE}}</div>
</div>`;

    case "noc":
      return `
<div class="page-label">Type: No Objection Certificate (NOC)</div>
<div class="sheet" data-type="noc">
  <div class="letterhead">
    <div class="letterhead-left">
      <div class="logo-slot"><img src="{{LOGO_URL}}" alt="logo" onerror="this.parentElement.textContent='VFSTR'"></div>
      <div>
        <p class="org-name">{{ORG_NAME}}</p>
        <div class="org-sub">{{ORG_TAGLINE}}<br>{{ORG_DEPARTMENT}}</div>
      </div>
    </div>
    <div class="doc-meta"><div><b>Ref:</b> {{CERT_REF}}</div><div><b>Date:</b> {{DOC_DATE}}</div></div>
  </div>
  <div class="doc-title-wrap">
    <span class="type-badge">NO OBJECTION CERTIFICATE</span>
    <h1 class="doc-title">{{DOC_TITLE}}</h1>
    <div class="doc-subtitle">{{DOC_SUBTITLE}}</div>
  </div>
  <div class="info-grid">
    <div class="info-item"><span class="label">Student Name</span><span class="value">{{STUDENT_NAME}}</span></div>
    <div class="info-item"><span class="label">Batch / Cohort</span><span class="value">{{ACADEMIC_YEAR}}</span></div>
    <div class="info-item"><span class="label">Registration No.</span><span class="value">{{REG_NO}}</span></div>
    <div class="info-item"><span class="label">Current Dues</span><span class="value">{{TOTAL_DUE}}</span></div>
  </div>
  <p class="body-text">{{BODY_PARAGRAPH}}</p>
  <table class="doc-table">
    <thead><tr><th>Fee Head</th><th class="num">Demand</th><th class="num">Paid</th><th class="num">Balance</th></tr></thead>
    <tbody>
      <!-- ROW_START -->
      <tr><td>{{FEE_HEAD}}</td><td class="num">{{DEMAND_AMOUNT}}</td><td class="num">{{PAID_AMOUNT}}</td><td class="num">{{BALANCE_AMOUNT}}</td></tr>
      <!-- ROW_END -->
      <tr class="row-total"><td>Total</td><td class="num">{{TOTAL_DEMAND}}</td><td class="num">{{TOTAL_PAID}}</td><td class="num">{{TOTAL_DUE}}</td></tr>
    </tbody>
  </table>
  <div class="cert-row">
    <div class="seal-box"><div class="seal-title">CLEAR TO DISBURSE</div>{{SEAL_SUBTEXT}}</div>
    <div class="signature"><div class="sig-line">{{SIGNATORY_NAME}}</div><div class="sig-role">{{SIGNATORY_ROLE}}</div></div>
  </div>
  <div class="doc-footer">{{FOOTER_NOTE}}</div>
</div>`;

    case "reimbursement":
      return `
<div class="page-label">Type: Fee Reimbursement Certificate</div>
<div class="sheet" data-type="reimbursement">
  <div class="letterhead">
    <div class="letterhead-left">
      <div class="logo-slot"><img src="{{LOGO_URL}}" alt="logo" onerror="this.parentElement.textContent='VFSTR'"></div>
      <div>
        <p class="org-name">{{ORG_NAME}}</p>
        <div class="org-sub">{{ORG_TAGLINE}}<br>{{ORG_DEPARTMENT}}</div>
      </div>
    </div>
    <div class="doc-meta"><div><b>Ref:</b> {{CERT_REF}}</div><div><b>Date:</b> {{DOC_DATE}}</div></div>
  </div>
  <div class="doc-title-wrap">
    <span class="type-badge">FEE REIMBURSEMENT CERTIFICATE</span>
    <h1 class="doc-title">{{DOC_TITLE}}</h1>
    <div class="doc-subtitle">{{DOC_SUBTITLE}}</div>
  </div>
  <div class="info-grid">
    <div class="info-item"><span class="label">Student Name</span><span class="value">{{STUDENT_NAME}}</span></div>
    <div class="info-item"><span class="label">Academic Period</span><span class="value">{{ACADEMIC_YEAR}}</span></div>
    <div class="info-item"><span class="label">Registration No.</span><span class="value">{{REG_NO}}</span></div>
    <div class="info-item"><span class="label">Total Paid to Date</span><span class="value">{{TOTAL_PAID}}</span></div>
  </div>
  <p class="body-text">{{BODY_PARAGRAPH}}</p>
  <table class="doc-table">
    <thead><tr><th>Fee Component</th><th>Status</th><th class="num">Demand</th><th class="num">Amount Paid</th></tr></thead>
    <tbody>
      <!-- ROW_START -->
      <tr><td>{{FEE_HEAD}}</td><td class="{{STATUS_CLASS}}">{{STATUS_LABEL}}</td><td class="num">{{DEMAND_AMOUNT}}</td><td class="num">{{PAID_AMOUNT}}</td></tr>
      <!-- ROW_END -->
      <tr class="row-total"><td colspan="3">Total Claimable</td><td class="num">{{TOTAL_PAID}}</td></tr>
    </tbody>
  </table>
  <div class="cert-row">
    <div class="seal-box"><div class="seal-title">CERTIFIED &amp; AUTHENTICATED</div>{{SEAL_SUBTEXT}}</div>
    <div class="signature"><div class="sig-line">{{SIGNATORY_NAME}}</div><div class="sig-role">{{SIGNATORY_ROLE}}</div></div>
  </div>
  <div class="doc-footer">{{FOOTER_NOTE}}</div>
</div>`;

    case "statement":
      return `
<div class="page-label">Type: Official Fee Statement</div>
<div class="sheet" data-type="statement">
  <div class="letterhead">
    <div class="letterhead-left">
      <div class="logo-slot"><img src="{{LOGO_URL}}" alt="logo" onerror="this.parentElement.textContent='VFSTR'"></div>
      <div>
        <p class="org-name">{{ORG_NAME}}</p>
        <div class="org-sub">{{ORG_TAGLINE}}<br>{{ORG_DEPARTMENT}}</div>
      </div>
    </div>
    <div class="doc-meta"><div><b>Ref:</b> {{CERT_REF}}</div><div><b>Date:</b> {{DOC_DATE}}</div></div>
  </div>
  <div class="doc-title-wrap">
    <span class="type-badge">OFFICIAL FEE STATEMENT</span>
    <h1 class="doc-title">{{DOC_TITLE}}</h1>
    <div class="doc-subtitle">{{DOC_SUBTITLE}}</div>
  </div>
  <div class="info-grid">
    <div class="info-item"><span class="label">Student Name</span><span class="value">{{STUDENT_NAME}}</span></div>
    <div class="info-item"><span class="label">Programme</span><span class="value">{{PROGRAM}}</span></div>
    <div class="info-item"><span class="label">Student ID</span><span class="value">{{REG_NO}}</span></div>
    <div class="info-item"><span class="label">Academic Year</span><span class="value">{{ACADEMIC_YEAR}}</span></div>
  </div>
  <div class="stat-strip">
    <div class="stat-card"><div class="label">Final Demand</div><div class="amount">{{TOTAL_DEMAND}}</div></div>
    <div class="stat-card"><div class="label">Total Paid</div><div class="amount">{{TOTAL_PAID}}</div></div>
    <div class="stat-card"><div class="label">Outstanding</div><div class="amount">{{TOTAL_DUE}}</div></div>
  </div>
  <table class="doc-table">
    <thead><tr><th>Fee Head</th><th class="num">Gross</th><th class="num">Demand</th><th class="num">Paid</th><th class="num">Outstanding</th></tr></thead>
    <tbody>
      <!-- ROW_START -->
      <tr><td>{{FEE_HEAD}}</td><td class="num">{{GROSS_AMOUNT}}</td><td class="num">{{DEMAND_AMOUNT}}</td><td class="num">{{PAID_AMOUNT}}</td><td class="num">{{BALANCE_AMOUNT}}</td></tr>
      <!-- ROW_END -->
      <tr class="row-total"><td>Total</td><td class="num">{{TOTAL_GROSS}}</td><td class="num">{{TOTAL_DEMAND}}</td><td class="num">{{TOTAL_PAID}}</td><td class="num">{{TOTAL_DUE}}</td></tr>
    </tbody>
  </table>
  <div class="cert-row">
    <div class="seal-box"><div class="seal-title">OFFICIAL LEDGER SEAL</div>{{SEAL_SUBTEXT}}</div>
    <div class="signature"><div class="sig-line">{{SIGNATORY_NAME}}</div><div class="sig-role">{{SIGNATORY_ROLE}}</div></div>
  </div>
  <div class="doc-footer">{{FOOTER_NOTE}}</div>
</div>`;

    case "tax":
      return `
<div class="page-label">Type: Tuition Fee Tax Certificate</div>
<div class="sheet" data-type="tax">
  <div class="letterhead">
    <div class="letterhead-left">
      <div class="logo-slot"><img src="{{LOGO_URL}}" alt="logo" onerror="this.parentElement.textContent='VFSTR'"></div>
      <div>
        <p class="org-name">{{ORG_NAME}}</p>
        <div class="org-sub">{{ORG_TAGLINE}}<br>{{ORG_DEPARTMENT}}</div>
      </div>
    </div>
    <div class="doc-meta"><div><b>Ref:</b> {{CERT_REF}}</div><div><b>Date Issued:</b> {{DOC_DATE}}</div></div>
  </div>
  <div class="doc-title-wrap">
    <span class="type-badge">TAX CERTIFICATE</span>
    <h1 class="doc-title">{{DOC_TITLE}}</h1>
    <div class="doc-subtitle">{{DOC_SUBTITLE}}</div>
  </div>
  <div class="info-grid">
    <div class="info-item"><span class="label">Student Name</span><span class="value">{{STUDENT_NAME}}</span></div>
    <div class="info-item"><span class="label">Academic Year</span><span class="value">{{ACADEMIC_YEAR}}</span></div>
    <div class="info-item"><span class="label">Registration No.</span><span class="value">{{REG_NO}}</span></div>
    <div class="info-item"><span class="label">Fee Status</span><span class="value">{{FEE_STATUS}}</span></div>
  </div>
  <p class="body-text">{{BODY_PARAGRAPH}}</p>
  <table class="doc-table">
    <thead><tr><th>Fee Category</th><th>Applicable Provision</th><th class="num">Amount Paid</th></tr></thead>
    <tbody>
      <!-- ROW_START -->
      <tr><td>{{FEE_HEAD}}</td><td>{{PROVISION}}</td><td class="num">{{PAID_AMOUNT}}</td></tr>
      <!-- ROW_END -->
      <tr class="row-total"><td colspan="2">Total Institutional Fees Deposited</td><td class="num">{{TOTAL_PAID}}</td></tr>
    </tbody>
  </table>
  <div class="cert-row">
    <div class="seal-box"><div class="seal-title">DIGITAL TREASURY SEAL</div>{{SEAL_SUBTEXT}}</div>
    <div class="signature"><div class="sig-line">{{SIGNATORY_NAME}}</div><div class="sig-role">{{SIGNATORY_ROLE}}</div></div>
  </div>
  <div class="doc-footer">{{FOOTER_NOTE}}</div>
</div>`;
  }
}

/**
 * Returns contextual body paragraphs for each document category
 */
function getBodyParagraph(docType: FinanceDocType, data: NormalizedStudentDocData, options?: GenerateDocOptions): string {
  switch (docType) {
    case "bonafide":
      return `This is to formally certify that <b>${data.name}</b>, registered under Student ID <b>${data.id}</b>, is a bona fide regular student pursuing full-time <b>${data.program}</b> at Vignan's Foundation for Science, Technology & Research (VFSTR Deemed to be University) for the <b>${data.academicYear}</b>. The student maintains a satisfactory academic standing and good moral conduct in the university. This certificate is issued upon the scholar's request for official identity attestation and educational purposes.`;

    case "noc":
      return `To Whomsoever It May Concern: This is to certify that <b>${data.name}</b> (Reg No: <b>${data.id}</b>) is a registered full-time student in <b>${data.program}</b>. The University has <b>NO OBJECTION</b> to the student availing an Education Loan from any Scheduled Commercial Bank or Financial Institution. Educational loan disbursements may be credited directly to the official University Fee Collection Account via RTGS/NEFT/Direct Bank Transfer with electronic reference <code>${data.id}</code>.`;

    case "reimbursement":
      return `This is to officially attest that <b>${data.name}</b>, pursuing <b>${data.program}</b> (Reg No: <b>${data.id}</b>), has deposited the itemized semester educational fee charges for <b>${data.academicYear}</b>. All remittances listed below have been verified against university treasury ledgers. This document is authenticated to facilitate official employee education reimbursement, Children Education Allowance (CEA), or government scholarship claim.`;

    case "statement":
      return `Official Institutional Account Statement & Ledger for <b>${data.name}</b> (${data.id}) enrolled in <b>${data.program}</b>. Reflects all academic fee apportionments, scholarship credits, payments received, and net balances as verified by the University Office of Comptroller of Finance & Accounts.`;

    case "tax":
      return `This is to officially certify that <b>${data.name}</b>, enrolled as a bona fide student in <b>${data.program}</b> (Reg No: <b>${data.id}</b>), has deposited the tuition charges detailed below for <b>${data.academicYear}</b>. This certificate is issued to enable the parent, guardian, or student to claim legitimate tax exemption benefits under <b>Section 80C</b> or <b>Section 80E</b> of the Indian Income Tax Act, 1961. Certified that no capitation fee or donation has been collected.`;
  }
}

/**
 * Main Template Generator: compiles the exact HTML string using the unified reference template.
 * - Single source of truth layout
 * - Color-coded by data-type
 * - Dynamic token substitution
 * - Repeatable rows loop between ROW_START and ROW_END
 * - NO automatic window.print() listener (includes clean top action bar with print button)
 */
export function generateFinanceDocumentHtml(
  docType: FinanceDocType,
  studentOrId: Student | string,
  options?: GenerateDocOptions
): string {
  const data = normalizeStudentDocData(studentOrId);
  const meta = FINANCE_DOC_METAS[docType];

  const currentDate =
    options?.docDate ||
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const certRef =
    options?.certRef ||
    `VFSTR-${docType.toUpperCase()}-2026-${data.id.replace(/[^0-9]/g, "").padStart(4, "0")}`;

  const logoUrl = options?.logoUrl || "/vignan-logo.png";
  const orgName = "VIGNAN'S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH";
  const orgShortName = "VFSTR UNIVERSITY";
  const orgTagline = "(Deemed to be University estd. u/s 3 of UGC Act 1956)";
  const orgDepartment = "Student Financial Aid & University Treasury · Vadlamudi, Guntur · AP 522213";
  const signatoryName = options?.signatoryName || "Dr. K. Ramaswamy, Ph.D.";
  const signatoryRole = options?.signatoryRole || "Comptroller of Finance & Accounts";
  const sealSubtext = options?.sealSubtext || "Vadlamudi Campus | Digital Authentication Seal";
  const footerNote =
    options?.footerNote ||
    `This is an authentic digitally generated document from VFSTR finDeck Central Financial Core. Verify reference: ${certRef} on vfstr.feewise.edu.in`;

  // Get sheet snippet
  let sheetHtml = getSheetTemplate(docType);

  // Repeatable rows replacement (if template contains <!-- ROW_START -->)
  const rowRegex = /<!--\s*ROW_START\s*-->([\s\S]*?)<!--\s*ROW_END\s*-->/;
  const match = sheetHtml.match(rowRegex);
  if (match) {
    const rowTemplate = match[1];
    const generatedRows = buildRepeatableFeeRows(docType, rowTemplate, data);
    sheetHtml = sheetHtml.replace(rowRegex, generatedRows);
  }

  // Token substitutions
  const tokens: Record<string, string> = {
    "{{LOGO_URL}}": logoUrl,
    "{{ORG_NAME}}": orgName,
    "{{ORG_SHORT_NAME}}": orgShortName,
    "{{ORG_TAGLINE}}": orgTagline,
    "{{ORG_DEPARTMENT}}": orgDepartment,
    "{{CERT_REF}}": certRef,
    "{{DOC_DATE}}": currentDate,
    "{{DOC_TITLE}}": meta.title.toUpperCase(),
    "{{DOC_SUBTITLE}}":
      docType === "tax"
        ? "Issued under Section 80C / 80E of the Indian Income Tax Act, 1961"
        : docType === "noc"
        ? "For Bank Education Loan Sanction & Institutional Direct Disbursement"
        : docType === "reimbursement"
        ? "For Employer Allowance, Government Scholarship & Corporate Sponsorship Claims"
        : docType === "statement"
        ? "Head-wise Academic Demands, Credits & Verified Settlements Ledger"
        : "Official Attestation of Regular Full-Time Enrollment & Good Standing",
    "{{STUDENT_NAME}}": data.name,
    "{{REG_NO}}": data.id,
    "{{PROGRAM}}": data.program,
    "{{ACADEMIC_YEAR}}": data.academicYear,
    "{{TOTAL_DEMAND}}": inr(data.totalDemand),
    "{{TOTAL_PAID}}": inr(data.totalPaid),
    "{{TOTAL_DUE}}": inr(data.totalDue),
    "{{TOTAL_GROSS}}": inr(data.totalGross),
    "{{FEE_STATUS}}": data.feeStatus,
    "{{BODY_PARAGRAPH}}": getBodyParagraph(docType, data, options),
    "{{SIGNATORY_NAME}}": signatoryName,
    "{{SIGNATORY_ROLE}}": signatoryRole,
    "{{SEAL_SUBTEXT}}": sealSubtext,
    "{{FOOTER_NOTE}}": footerNote,
  };

  for (const [token, val] of Object.entries(tokens)) {
    sheetHtml = sheetHtml.split(token).join(val);
  }

  // Build full standalone HTML document with embedded CSS and top action bar
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title} — ${data.name} (${data.id}) — VFSTR University</title>
  <style>
${FINANCE_DOCUMENTS_CSS}
  </style>
</head>
<body>

  <!-- Floating Document Action Bar (Shown on-screen, hidden on print/PDF) -->
  <div class="doc-action-bar no-print">
    <div class="brand-info">
      <span class="brand-badge">${meta.badge}</span>
      <span style="font-weight:600;color:#f8fafc;">${meta.title}</span>
      <span style="color:#64748b;">• ${data.name} (${data.id})</span>
    </div>
    <div class="actions">
      <button class="btn-print-action" onclick="window.print()">
        🖨️ Print / Save as PDF
      </button>
      <button class="btn-close-action" onclick="window.close()">
        ✕ Close
      </button>
    </div>
  </div>

  ${sheetHtml}

</body>
</html>`;
}

/**
 * Safely opens the generated finance document in an isolated new browser window/tab
 * without freezing parent state, and WITHOUT automatic print popup.
 */
export function openFinanceDocument(
  docType: FinanceDocType,
  studentOrId: Student | string,
  options?: GenerateDocOptions
) {
  if (typeof window === "undefined") return;
  const html = generateFinanceDocumentHtml(docType, studentOrId, options);
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
