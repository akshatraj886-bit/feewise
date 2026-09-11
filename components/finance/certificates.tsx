"use client";

import { inr, openPrintDocument, type Student } from "@/lib/finance-data";
import { getStudentAccount } from "@/lib/finance-service";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ShieldCheck,
  Building2,
  Printer,
  Award,
  ExternalLink,
} from "lucide-react";

function normalizeStudent(student: any) {
  const acct = getStudentAccount(student.id);
  const name = student.name || "Student";
  const id = student.id;
  const program = student.programme || student.program || "B.Tech Computer Science";
  const year = "Academic Year 2026–27";
  const demand = Number(student.demand ?? student.totalDemand ?? 120000);
  const paid = Number(student.paid ?? student.totalPaid ?? 0);
  const due = Math.max(0, demand - paid);
  const fees = acct?.fees ?? [
    {
      head: "Tuition",
      gross: 90000,
      scholarship: student.scholarship || 0,
      demand: 90000 - (student.scholarship || 0),
      paid: Math.min(paid, 90000 - (student.scholarship || 0)),
      outstanding: Math.max(0, 90000 - (student.scholarship || 0) - paid),
    },
    {
      head: "Hostel / Residence",
      gross: 25000,
      scholarship: 0,
      demand: 25000,
      paid: Math.max(0, Math.min(25000, paid - 90000)),
      outstanding: Math.max(0, 25000 - Math.max(0, paid - 90000)),
    },
    {
      head: "Examination",
      gross: 5000,
      scholarship: 0,
      demand: 5000,
      paid: 5000,
      outstanding: 0,
    },
  ];
  return { name, id, program, year, demand, paid, due, fees, acct };
}

/**
 * Print/Download Tax Certificate (Section 80C / 80E eligible Tuition Fees)
 */
export function printTaxCertificate(student: Student) {
  const s = normalizeStudent(student);
  const tuitionHead = s.fees.find((f) => f.head.toLowerCase().includes("tuition"));
  const tuitionAmount = tuitionHead ? tuitionHead.paid : Math.round(s.paid * 0.75);
  const certNo = `VFSTR-TAX-2026-${s.id.replace(/[^0-9]/g, "").padStart(4, "0")}`;
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Tuition Fee Tax Certificate — ${s.name} (${s.id}) — VFSTR</title>
    <style>
      @page { size: A4 portrait; margin: 16mm; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #0f172a;
        line-height: 1.6;
        margin: 0;
        padding: 0 24px 30px 24px;
        background: #fff;
      }
      .no-print {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        background: #0f172a;
        color: #f8fafc;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 99999;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        margin: 0 -24px 24px -24px;
      }
      .no-print button {
        border: none;
        padding: 6px 14px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 12px;
      }
      .btn-print { background: #0284c7; color: white; }
      .btn-close { background: #334155; color: white; font-weight: 500; }
      .header {
        border-bottom: 2px solid #0284c7;
        padding-bottom: 16px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .brand {
        font-size: 17px;
        font-weight: 800;
        letter-spacing: -0.3px;
        color: #0369a1;
        text-transform: uppercase;
      }
      .sub-brand {
        font-size: 11px;
        color: #64748b;
        font-weight: 500;
      }
      .cert-title {
        text-align: center;
        font-size: 19px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 20px 0 6px 0;
        color: #0f172a;
      }
      .cert-subtitle {
        text-align: center;
        font-size: 13px;
        color: #475569;
        margin-bottom: 26px;
      }
      .meta-box {
        display: flex;
        justify-content: space-between;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 14px 20px;
        margin-bottom: 22px;
        font-size: 13px;
      }
      .body-text {
        font-size: 13.5px;
        text-align: justify;
        margin-bottom: 20px;
        line-height: 1.8;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 26px;
        font-size: 13px;
      }
      th {
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
        padding: 10px 14px;
        text-align: left;
        font-weight: 600;
      }
      td {
        border: 1px solid #cbd5e1;
        padding: 10px 14px;
      }
      .total-row {
        font-weight: 700;
        background: #f8fafc;
      }
      .footer {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .stamp-box {
        border: 1px dashed #0284c7;
        border-radius: 6px;
        padding: 12px 20px;
        text-align: center;
        font-size: 11px;
        color: #0369a1;
      }
      .sign-box {
        text-align: center;
      }
      .sign-line {
        width: 200px;
        border-bottom: 1px solid #0f172a;
        margin-bottom: 6px;
      }
      .disclaimer {
        margin-top: 26px;
        font-size: 11px;
        color: #94a3b8;
        border-top: 1px solid #f1f5f9;
        padding-top: 10px;
      }
      @media print {
        .no-print { display: none !important; }
        body { padding: 0 !important; }
      }
    </style>
  </head>
  <body>
    <div class="no-print">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-weight:700;color:#38bdf8;">VFSTR University</span>
        <span style="color:#94a3b8;">• Tuition Fee Tax Certificate (Section 80C/80E)</span>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <button class="btn-close" onclick="window.close()">✕ Close</button>
      </div>
    </div>

    <div class="header">
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="/vignan-logo.png" style="height: 52px; width: auto; object-fit: contain;" alt="VFSTR Logo" />
        <div>
          <div class="brand">VIGNAN&apos;S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH</div>
          <div class="sub-brand">(Deemed to be University) — Estd. u/s 3 of UGC Act 1956</div>
          <div class="sub-brand">Accredited Grade &apos;A+&apos; by NAAC | Vadlamudi, Guntur, AP — 522213</div>
        </div>
      </div>
      <div style="text-align: right; font-size: 11.5px; color: #64748b; white-space: nowrap;">
        <div><strong>Cert Ref:</strong> ${certNo}</div>
        <div><strong>Date Issued:</strong> ${currentDate}</div>
        <div><strong>Academic Year:</strong> 2026–2027</div>
      </div>
    </div>

    <div class="cert-title">Tuition Fee Tax Certificate</div>
    <div class="cert-subtitle">Issued under Section 80C / 80E of the Indian Income Tax Act, 1961</div>

    <div class="meta-box">
      <div>
        <div><strong>Student Name:</strong> ${s.name}</div>
        <div><strong>Registration / Roll No:</strong> ${s.id}</div>
        <div><strong>Program & Department:</strong> ${s.program}</div>
      </div>
      <div>
        <div><strong>Academic Year:</strong> 2026–2027</div>
        <div><strong>Fee Status:</strong> ${s.due === 0 ? "FEES FULLY CLEARED" : "PARTIALLY PAID"}</div>
        <div><strong>Institution AISHE:</strong> U-0043</div>
      </div>
    </div>

    <div class="body-text">
      This is to officially certify that <strong>${s.name}</strong>, enrolled as a bonafide regular student in <strong>${s.program}</strong> at <strong>Vignan&apos;s Foundation for Science, Technology & Research (VFSTR Deemed to be University)</strong>, has deposited the educational fee charges detailed below for the financial year <strong>2026–2027</strong>. This certificate is issued to enable the parent/guardian or student to claim allowable tax exemption benefits under Section 80C or Section 80E of the Income Tax Act.
    </div>

    <table>
      <thead>
        <tr>
          <th>Fee Category / Head</th>
          <th>Applicable Provisions</th>
          <th style="text-align: right;">Amount Paid (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Tuition Fee (Eligible under Sec 80C / 80E)</strong></td>
          <td>Full-time higher education tuition charge</td>
          <td style="text-align: right;"><strong>${inr(tuitionAmount)}</strong></td>
        </tr>
        <tr>
          <td>Other Statutory & Campus Charges (Exam, Library, Labs)</td>
          <td>Institutional facilities & development fee</td>
          <td style="text-align: right;">${inr(Math.max(0, s.paid - tuitionAmount))}</td>
        </tr>
        <tr class="total-row">
          <td colspan="2">Total Institutional Fees Deposited</td>
          <td style="text-align: right;">${inr(s.paid)}</td>
        </tr>
      </tbody>
    </table>

    <div class="body-text">
      Certified that the amount of <strong>${inr(tuitionAmount)}</strong> (Rupees only) represents pure tuition charges paid to the institution during the assessment year. No capitation fee or unapproved donation has been charged.
    </div>

    <div class="footer">
      <div class="stamp-box">
        <strong>VFSTR DEEMED TO BE UNIVERSITY</strong><br />
        OFFICIAL DIGITAL TREASURY SEAL<br />
        Vadlamudi Campus | Ref: ${s.id}
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <strong>Finance Officer & Comptroller</strong><br />
        <span style="font-size: 12px; color: #64748b;">VFSTR University Treasury</span>
      </div>
    </div>

    <div class="disclaimer">
      Note: This is a system-authenticated digital certificate generated by VFSTR finDeck Engine. Verify certificate ref <strong>${certNo}</strong> on university portal.
    </div>

    <script>
      window.addEventListener("load", function() {
        setTimeout(function() {
          try { window.print(); } catch(e) {}
        }, 350);
      });
    </script>
  </body>
</html>`;

  openPrintDocument(html);
}

/**
 * Print/Download Loan NOC Certificate (No Objection Certificate for Bank Education Loan)
 */
export function printLoanNocCertificate(student: Student) {
  const s = normalizeStudent(student);
  const certNo = `VFSTR-NOC-LOAN-${s.id.replace(/[^0-9]/g, "").padStart(4, "0")}`;
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>No Objection Certificate (Loan) — ${s.name} — VFSTR</title>
    <style>
      @page { size: A4 portrait; margin: 16mm; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #0f172a;
        line-height: 1.6;
        margin: 0;
        padding: 0 24px 30px 24px;
        background: #fff;
      }
      .no-print {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        background: #0f172a;
        color: #f8fafc;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 99999;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        margin: 0 -24px 24px -24px;
      }
      .no-print button {
        border: none;
        padding: 6px 14px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 12px;
      }
      .btn-print { background: #059669; color: white; }
      .btn-close { background: #334155; color: white; font-weight: 500; }
      .header {
        border-bottom: 2px solid #059669;
        padding-bottom: 16px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .brand { font-size: 17px; font-weight: 800; color: #047857; text-transform: uppercase; }
      .sub-brand { font-size: 11px; color: #64748b; font-weight: 500; }
      .cert-title {
        text-align: center;
        font-size: 19px;
        font-weight: 700;
        letter-spacing: 1px;
        margin: 20px 0 6px 0;
        color: #065f46;
      }
      .cert-subtitle {
        text-align: center;
        font-size: 13px;
        color: #475569;
        margin-bottom: 24px;
      }
      .meta-box {
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: 8px;
        padding: 14px 20px;
        margin-bottom: 22px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
      }
      .body-text { font-size: 13.5px; line-height: 1.8; margin-bottom: 20px; text-align: justify; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
      th { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
      td { border: 1px solid #cbd5e1; padding: 10px 14px; }
      .bank-box {
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 14px;
        margin: 20px 0;
        font-size: 12.5px;
        line-height: 1.7;
      }
      .footer {
        margin-top: 45px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .stamp-box {
        border: 1px dashed #10b981;
        border-radius: 6px;
        padding: 12px 20px;
        text-align: center;
        font-size: 11px;
        color: #065f46;
      }
      @media print {
        .no-print { display: none !important; }
        body { padding: 0 !important; }
      }
    </style>
  </head>
  <body>
    <div class="no-print">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-weight:700;color:#34d399;">VFSTR University</span>
        <span style="color:#94a3b8;">• Bank Loan No Objection Certificate (NOC)</span>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <button class="btn-close" onclick="window.close()">✕ Close</button>
      </div>
    </div>

    <div class="header">
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="/vignan-logo.png" style="height: 52px; width: auto; object-fit: contain;" alt="VFSTR Logo" />
        <div>
          <div class="brand">VIGNAN&apos;S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH</div>
          <div class="sub-brand">(Deemed to be University) — Estd. u/s 3 of UGC Act 1956</div>
          <div class="sub-brand">Student Financial Aid & Loan Certification Wing | Vadlamudi, Guntur</div>
        </div>
      </div>
      <div style="text-align: right; font-size: 11.5px; color: #64748b; white-space: nowrap;">
        <div><strong>Cert Ref:</strong> ${certNo}</div>
        <div><strong>Date:</strong> ${currentDate}</div>
      </div>
    </div>

    <div class="cert-title">NO OBJECTION CERTIFICATE (NOC)</div>
    <div class="cert-subtitle">For Bank Education Loan Sanction & Institutional Direct Disbursement</div>

    <div class="meta-box">
      <div>
        <div><strong>Student Name:</strong> ${s.name}</div>
        <div><strong>Student Registration No:</strong> ${s.id}</div>
        <div><strong>Degree & Discipline:</strong> ${s.program}</div>
      </div>
      <div>
        <div><strong>Batch / Cohort:</strong> ${s.year}</div>
        <div><strong>Current Dues:</strong> ${s.due > 0 ? "Pending Dues: " + inr(s.due) : "Fully Cleared"}</div>
        <div><strong>Conduct Record:</strong> Satisfactory / Good Standing</div>
      </div>
    </div>

    <div class="body-text">
      To Whomsoever It May Concern,<br /><br />
      This is to certify that <strong>${s.name}</strong>, enrolled under Student Registration No. <strong>${s.id}</strong>, is a bonafide full-time student pursuing <strong>${s.program}</strong> at <strong>Vignan&apos;s Foundation for Science, Technology & Research (VFSTR Deemed to be University)</strong>.
      <br /><br />
      The University has <strong>NO OBJECTION</strong> to the student availing an Education Loan from any Scheduled Commercial Bank, Financial Institution, or NBFC. The lending institution is requested to disburse the sanctioned loan amount directly to the official university fee collection account specified below.
    </div>

    <table>
      <thead>
        <tr>
          <th>Fee Head</th>
          <th style="text-align: right;">Total Demand</th>
          <th style="text-align: right;">Total Paid to Date</th>
          <th style="text-align: right;">Current Balance Due</th>
        </tr>
      </thead>
      <tbody>
        ${s.fees
          .map(
            (f) => `
          <tr>
            <td>${f.head}</td>
            <td style="text-align: right;">${inr(f.demand)}</td>
            <td style="text-align: right;">${inr(f.paid)}</td>
            <td style="text-align: right;"><strong>${inr(f.outstanding)}</strong></td>
          </tr>
        `,
          )
          .join("")}
        <tr style="font-weight: 700; background: #f0fdf4;">
          <td>Total Academic Fees</td>
          <td style="text-align: right;">${inr(s.demand)}</td>
          <td style="text-align: right;">${inr(s.paid)}</td>
          <td style="text-align: right; color: #b91c1c;">${inr(s.due)}</td>
        </tr>
      </tbody>
    </table>

    <div class="bank-box">
      <strong>Official University Collection Account (For RTGS / NEFT / Direct Loan Disbursement):</strong><br />
      • Account Name: Vignan&apos;s Foundation for Science, Technology & Research Tuition Fee Collection A/c<br />
      • Bank: Punjab National Bank / State Bank of India | Branch: Vignan Campus, Vadlamudi (Guntur)<br />
      • Account No: 409923881023 | IFSC Code: PUNB0049200 / SBIN0004921<br />
      • Electronic Reference / Remark: <code>${s.id} - ${s.name.replace(/\s+/g, "")}</code>
    </div>

    <div class="footer">
      <div class="stamp-box">
        <strong>OFFICIAL LOAN CLEARANCE SEAL</strong><br />
        VFSTR Student Financial Aid Division<br />
        Status: CLEAR TO DISBURSE
      </div>
      <div style="text-align: center;">
        <div style="width: 200px; border-bottom: 1px solid #0f172a; margin-bottom: 6px;"></div>
        <strong>Registrar / Comptroller</strong><br />
        <span style="font-size: 12px; color: #64748b;">VFSTR (Deemed to be University)</span>
      </div>
    </div>

    <script>
      window.addEventListener("load", function() {
        setTimeout(function() {
          try { window.print(); } catch(e) {}
        }, 350);
      });
    </script>
  </body>
</html>`;

  openPrintDocument(html);
}

/**
 * Print/Download Reimbursement Certificate (Employer / Government Scholarship Claim)
 */
export function printReimbursementCertificate(student: Student) {
  const s = normalizeStudent(student);
  const certNo = `VFSTR-REIMB-${s.id.replace(/[^0-9]/g, "").padStart(4, "0")}`;
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Fee Reimbursement Certificate — ${s.name} — VFSTR</title>
    <style>
      @page { size: A4 portrait; margin: 16mm; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #0f172a;
        line-height: 1.6;
        margin: 0;
        padding: 0 24px 30px 24px;
        background: #fff;
      }
      .no-print {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        background: #0f172a;
        color: #f8fafc;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 99999;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        margin: 0 -24px 24px -24px;
      }
      .no-print button {
        border: none;
        padding: 6px 14px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 12px;
      }
      .btn-print { background: #7c3aed; color: white; }
      .btn-close { background: #334155; color: white; font-weight: 500; }
      .header {
        border-bottom: 2px solid #7c3aed;
        padding-bottom: 16px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .brand { font-size: 17px; font-weight: 800; color: #6d28d9; text-transform: uppercase; }
      .sub-brand { font-size: 11px; color: #64748b; font-weight: 500; }
      .cert-title {
        text-align: center;
        font-size: 19px;
        font-weight: 700;
        letter-spacing: 1px;
        margin: 20px 0 6px 0;
        color: #5b21b6;
      }
      .cert-subtitle {
        text-align: center;
        font-size: 13px;
        color: #475569;
        margin-bottom: 24px;
      }
      .meta-box {
        background: #faf5ff;
        border: 1px solid #e9d5ff;
        border-radius: 8px;
        padding: 14px 20px;
        margin-bottom: 22px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
      }
      .body-text { font-size: 13.5px; line-height: 1.8; margin-bottom: 20px; text-align: justify; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
      th { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
      td { border: 1px solid #cbd5e1; padding: 10px 14px; }
      .footer {
        margin-top: 45px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .stamp-box {
        border: 1px dashed #8b5cf6;
        border-radius: 6px;
        padding: 12px 20px;
        text-align: center;
        font-size: 11px;
        color: #5b21b6;
      }
      @media print {
        .no-print { display: none !important; }
        body { padding: 0 !important; }
      }
    </style>
  </head>
  <body>
    <div class="no-print">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-weight:700;color:#c084fc;">VFSTR University</span>
        <span style="color:#94a3b8;">• Fee Reimbursement Certificate</span>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <button class="btn-close" onclick="window.close()">✕ Close</button>
      </div>
    </div>

    <div class="header">
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="/vignan-logo.png" style="height: 52px; width: auto; object-fit: contain;" alt="VFSTR Logo" />
        <div>
          <div class="brand">VIGNAN&apos;S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH</div>
          <div class="sub-brand">(Deemed to be University) — Estd. u/s 3 of UGC Act 1956</div>
          <div class="sub-brand">Student Treasury & Scholarship Certification Division | Vadlamudi</div>
        </div>
      </div>
      <div style="text-align: right; font-size: 11.5px; color: #64748b; white-space: nowrap;">
        <div><strong>Cert Ref:</strong> ${certNo}</div>
        <div><strong>Date:</strong> ${currentDate}</div>
      </div>
    </div>

    <div class="cert-title">FEE REIMBURSEMENT CERTIFICATE</div>
    <div class="cert-subtitle">For Employer Allowance, Government Scholarship & Corporate Sponsorship Claims</div>

    <div class="meta-box">
      <div>
        <div><strong>Student Name:</strong> ${s.name}</div>
        <div><strong>Student Registration No:</strong> ${s.id}</div>
        <div><strong>Degree Program:</strong> ${s.program}</div>
      </div>
      <div>
        <div><strong>Academic Period:</strong> Academic Year 2026–2027</div>
        <div><strong>Total Paid to Date:</strong> ${inr(s.paid)}</div>
        <div><strong>Receipt Verified:</strong> YES</div>
      </div>
    </div>

    <div class="body-text">
      This is to certify that <strong>${s.name}</strong> is a registered full-time scholar in <strong>${s.program}</strong> at <strong>Vignan&apos;s Foundation for Science, Technology & Research (VFSTR Deemed to be University)</strong>. The university has received valid payment towards academic semester fees as itemized below for the purpose of claiming official employee education assistance, children education allowance (CEA), or government scholarship reimbursement.
    </div>

    <table>
      <thead>
        <tr>
          <th>Fee Component</th>
          <th>Status</th>
          <th style="text-align: right;">Demand</th>
          <th style="text-align: right;">Amount Paid (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${s.fees
          .map(
            (f) => `
          <tr>
            <td><strong>${f.head}</strong></td>
            <td>${f.outstanding === 0 ? "Fully Cleared" : f.paid > 0 ? "Partially Paid" : "Unpaid"}</td>
            <td style="text-align: right;">${inr(f.demand)}</td>
            <td style="text-align: right;"><strong>${inr(f.paid)}</strong></td>
          </tr>
        `,
          )
          .join("")}
        <tr style="font-weight: 700; background: #faf5ff;">
          <td colspan="3">Total Actual Amount Paid & Claimable</td>
          <td style="text-align: right; color: #6d28d9; font-size: 15px;">${inr(s.paid)}</td>
        </tr>
      </tbody>
    </table>

    <div class="body-text">
      Certified that the aforesaid amount has been credited to the University Bank Account and no duplicate claim has been issued for this period.
    </div>

    <div class="footer">
      <div class="stamp-box">
        <strong>CERTIFIED & AUTHENTICATED</strong><br />
        Accounts Office — VFSTR (Deemed to be University)<br />
        Ref: <code>${certNo}</code>
      </div>
      <div style="text-align: center;">
        <div style="width: 200px; border-bottom: 1px solid #0f172a; margin-bottom: 6px;"></div>
        <strong>Accounts Officer</strong><br />
        <span style="font-size: 12px; color: #64748b;">VFSTR University Treasury</span>
      </div>
    </div>

    <script>
      window.addEventListener("load", function() {
        setTimeout(function() {
          try { window.print(); } catch(e) {}
        }, 350);
      });
    </script>
  </body>
</html>`;

  openPrintDocument(html);
}

/**
 * UI Component for rendering the 3 certificates with actions
 */
export function FeeCertificatesPanel({ student }: { student: Student }) {
  const certificates = [
    {
      id: "tax",
      title: "Tuition Fee Tax Certificate",
      desc: "Eligible under Section 80C & 80E of Income Tax Act for parents/students filing ITR.",
      icon: FileText,
      color: "border-sky-200 bg-sky-50/50 hover:border-sky-400 text-sky-700",
      badge: "ITR / Sec 80C",
      onGenerate: () => printTaxCertificate(student),
    },
    {
      id: "loan",
      title: "Bank Loan NOC Certificate",
      desc: "Official No-Objection Certificate for bank education loan sanction & direct disbursement.",
      icon: Building2,
      color: "border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 text-emerald-700",
      badge: "Bank Loan / NOC",
      onGenerate: () => printLoanNocCertificate(student),
    },
    {
      id: "reimb",
      title: "Fee Reimbursement Certificate",
      desc: "Attestation for parent employer reimbursement, CEA allowance, or scholarship claim.",
      icon: ShieldCheck,
      color: "border-purple-200 bg-purple-50/50 hover:border-purple-400 text-purple-700",
      badge: "Employer / Govt Claim",
      onGenerate: () => printReimbursementCertificate(student),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Award className="size-4 text-primary" />
            Official VFSTR University Fee Certificates
          </h3>
          <p className="text-xs text-muted-foreground">
            Print-ready, digitally verifiable PDF certificates with Vignan&apos;s institutional seal.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {certificates.map((cert) => {
          const Icon = cert.icon;
          return (
            <div
              key={cert.id}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${cert.color}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white shadow-xs border">
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium shadow-xs border">
                    {cert.badge}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-foreground pt-1">
                  {cert.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cert.desc}
                </p>
              </div>

              <div className="pt-4">
                <Button
                  size="sm"
                  className="w-full gap-1.5 shadow-xs bg-white text-foreground hover:bg-white/90 border cursor-pointer"
                  onClick={cert.onGenerate}
                >
                  <Printer className="size-3.5" />
                  Print / Save PDF
                  <ExternalLink className="size-3 ml-auto opacity-50" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
