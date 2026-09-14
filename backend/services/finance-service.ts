import {
  students,
  admittedStudents,
  prospectiveStudents,
  allStudentsWithProspective,
  transactions,
  feeStructures,
  feeHeads,
  ageing,
  inr,
  instalmentPlans,
  scholarshipSlabs,
  type ScholarshipSlab,
  type AdmissionMode,
  type AdmissionStatus,
  type Student,
} from "../database/finance-data";
import { feeAllocations } from "../database/fee-allocations";
import { scholarshipStatus } from "../database/scholarship-status";
import { paymentReceipts } from "../database/payment-receipts";
import { recordSqlPayment, getSqlDatabaseState } from "../database/sql-store";
import {
  type SemesterRecord,
  type CarriedForwardDuesItem,
  type SemesterCarryForwardResult,
  benchmarkSemesterHistories,
  computeSemesterCarryForward,
} from "../database/semester-academic-history";
import {
  type ExamPermissionRequest,
  type DigitalSignatureInfo,
  examPermissionRequestsStore,
  getStudentPermissionRequests,
  createPermissionRequest,
  getAllPermissionRequests,
  updatePermissionRequestStatus,
  getPermissionRequestById,
  getPendingPermissionRequestsCount,
  getPermissionRequestsSummary,
} from "../database/exam-permission-requests";

export {
  feeAllocations,
  scholarshipStatus,
  paymentReceipts,
  admittedStudents,
  prospectiveStudents,
  allStudentsWithProspective,
  scholarshipSlabs,
  type ScholarshipSlab,
  feeStructures,
  type SemesterRecord,
  type CarriedForwardDuesItem,
  type SemesterCarryForwardResult,
  computeSemesterCarryForward,
  type ExamPermissionRequest,
  type DigitalSignatureInfo,
  getStudentPermissionRequests,
  createPermissionRequest,
  getAllPermissionRequests,
  updatePermissionRequestStatus,
  getPermissionRequestById,
  getPendingPermissionRequestsCount,
  getPermissionRequestsSummary,
};

export const snapshot = {
  asOf: "2026-09-11T10:21:00+05:30", academicYear: "2026–27",
  scope: "Institutional financial ledger; multi-branch admissions & accounts covering 8 programmes.",
  demand: 254000000, collected: 217000000, outstanding: 37000000,
  reconciliationPercent: 99.2, reconciledToday: 1284, pendingTransactions: 127,
  mismatches: 23, refundRequests: 14, overdue90Students: 84,
};

type Allocation = { head: string; gross: number; scholarship: number; paid: number };
const allocations: Record<string, Allocation[]> = {
  "251FA04E03": [
    { head: "Tuition", gross: 90000, scholarship: 20000, paid: 55000 },
    { head: "Hostel", gross: 40000, scholarship: 0, paid: 30000 },
    { head: "Examination", gross: 5000, scholarship: 0, paid: 2000 },
    { head: "Library", gross: 2000, scholarship: 0, paid: 2000 },
    { head: "Laboratory", gross: 3000, scholarship: 0, paid: 3000 },
  ],
  "251FA04E17": [
    { head: "Tuition", gross: 90000, scholarship: 0, paid: 90000 },
    { head: "Transport", gross: 20000, scholarship: 0, paid: 20000 },
    { head: "Examination", gross: 5000, scholarship: 0, paid: 5000 },
    { head: "Library", gross: 2000, scholarship: 0, paid: 2000 },
    { head: "Laboratory", gross: 3000, scholarship: 0, paid: 3000 },
  ],
  "251FA04E21": [
    { head: "Tuition", gross: 130000, scholarship: 20000, paid: 80000 },
    { head: "Hostel", gross: 40000, scholarship: 0, paid: 25000 },
    { head: "Examination", gross: 10000, scholarship: 0, paid: 10000 },
  ],
  "251FA04E36": [
    { head: "Tuition", gross: 90000, scholarship: 0, paid: 90000 },
    { head: "Hostel", gross: 40000, scholarship: 0, paid: 40000 },
    { head: "Examination", gross: 5000, scholarship: 0, paid: 5000 },
    { head: "Laboratory", gross: 5000, scholarship: 0, paid: 5000 },
  ],
  "251FA04E42": [
    { head: "Tuition", gross: 130000, scholarship: 0, paid: 90000 },
    { head: "Hostel", gross: 40000, scholarship: 0, paid: 25000 },
    { head: "Examination", gross: 10000, scholarship: 0, paid: 10000 },
  ],
  "251FA04E58": [
    { head: "Tuition", gross: 90000, scholarship: 20000, paid: 62000 },
    { head: "Hostel", gross: 40000, scholarship: 0, paid: 30000 },
    { head: "Examination", gross: 5000, scholarship: 0, paid: 5000 },
    { head: "Library", gross: 2000, scholarship: 0, paid: 2000 },
    { head: "Laboratory", gross: 3000, scholarship: 0, paid: 3000 },
  ],
};
const historicalReceipts = [
  { student: "251FA04E03", id: "RCPT-6201", date: "15 Jul 2026", ledger: 62000 },
  { student: "251FA04E17", id: "RCPT-6202", date: "10 Jul 2026", ledger: 100000 },
  { student: "251FA04E21", id: "RCPT-6203", date: "12 Jul 2026", ledger: 100000 },
  { student: "251FA04E36", id: "RCPT-6204", date: "17 Jul 2026", ledger: 95000 },
  { student: "251FA04E42", id: "RCPT-6205", date: "18 Jul 2026", ledger: 107000 },
  { student: "251FA04E58", id: "RCPT-6206", date: "20 Jul 2026", ledger: 102000 },
];
export function getStudentAccount(id: string) {
  const student = students.find(s => s.id === id) || prospectiveStudents.find(s => s.id === id);
  if (!student) return null;

  let fees: {
    head: string;
    gross: number;
    scholarship: number;
    paid: number;
    demand: number;
    outstanding: number;
    status: string;
  }[];

  if (feeAllocations[id]) {
    fees = feeAllocations[id].map((f) => ({
      head: f.head,
      gross: f.gross,
      scholarship: f.head === "Tuition" ? (student.scholarship || 0) : 0,
      demand: f.gross,
      paid: f.paid,
      outstanding: f.outstanding,
      status: f.status,
    }));
  } else if (allocations[id]) {
    const userAlloc = allocations[id];
    fees = userAlloc.map(f => {
      const demand = f.gross - f.scholarship;
      const outstanding = Math.max(0, demand - f.paid);
      const status = outstanding === 0 ? "Fully Cleared" : f.paid > 0 ? "Partially Paid" : "Unpaid";
      return { ...f, demand, outstanding, status };
    });
  } else {
    const progHeads = feeStructures.filter(f => f.active && f.programme === student.programme);
    const activeHeads = progHeads.length > 0 ? progHeads : feeStructures.filter(f => f.active && f.programme === "B.Tech CSE");
    let remainingPaid = student.paid;
    fees = activeHeads.map(f => {
      const scholarship = f.head === "Tuition" ? (student.scholarship || 0) : 0;
      const concession = f.head === "Tuition" ? (student.concession || 0) : 0;
      const demand = Math.max(0, f.amount - scholarship - concession);
      const paid = Math.min(remainingPaid, demand);
      remainingPaid = Math.max(0, remainingPaid - paid);
      const outstanding = demand - paid;
      const status = outstanding === 0 ? "Fully Cleared" : paid > 0 ? "Partially Paid" : "Unpaid";
      return {
        head: f.head,
        gross: f.amount,
        scholarship,
        demand: f.amount,
        paid,
        outstanding,
        status,
      };
    });
  }

  const studentReceipts = paymentReceipts[id]
    ? paymentReceipts[id].map((r) => ({
        id: r.txnId,
        date: r.date,
        amount: r.amount,
        gateway: r.amount,
        method: `${r.channel} · Reconciled`,
        status: "Matched",
      }))
    : [];

  const legacyPayments = [
    ...transactions.filter(t => t.student === id).map(t => ({ id: t.id, date: t.date, amount: t.ledger, gateway: t.gateway, method: `${t.method} · ${t.status}`, status: t.status })),
    ...historicalReceipts.filter(t => t.student === id).map(t => ({ id: t.id, date: t.date, amount: t.ledger, gateway: t.ledger, method: "Bank transfer · Reconciled", status: "Matched" })),
  ];

  const payments = studentReceipts.length > 0 ? studentReceipts : legacyPayments;
  const scholarship = fees.reduce((sum, f) => sum + f.scholarship, 0);
  const scholarshipInfo = scholarshipStatus[id];
  const scholarshipPolicy = scholarshipInfo
    ? `Scholarship Renewal Status: ${scholarshipInfo.status} (Attendance: ${scholarshipInfo.attendance}%, CGPA: ${scholarshipInfo.cumulativeGPA}). Criteria: min ${scholarshipInfo.minAttendance}% attendance, min ${scholarshipInfo.minGPA} CGPA.`
    : scholarship
    ? `Merit award: ${inr(scholarship)} tuition credit; admission category is ${student.category}.`
    : "No scholarship award";

  return {
    ...student,
    academicYear: snapshot.academicYear,
    fees,
    payments,
    scholarship,
    scholarshipInfo,
    scholarshipPolicy,
    gross: fees.reduce((sum, f) => sum + f.gross, 0),
    outstanding: student.demand - student.paid,
    priorCycleSettled: id === "251FA04E03" ? 24100 : 0,
    reconciliation: payments.some(p => p.status === "Mismatch") ? "Unresolved gateway difference; only allocated ledger amounts count toward paid." : "No mismatch in available receipts",
  };
}
export function statementRows(id: string): (string | number)[][] {
  const account = getStudentAccount(id);
  if (!account) return [];
  return [
    ["Fictional demo statement", snapshot.academicYear, snapshot.asOf], ["Student", account.name, account.id],
    ["Head", "Gross", "Scholarship", "Demand", "Paid", "Outstanding"],
    ...account.fees.map(f => [f.head, f.gross, f.scholarship, f.demand, f.paid, f.outstanding]),
    ["Total", account.gross, account.scholarship, account.demand, account.paid, account.outstanding],
    ["Settled prior-cycle demand and payments (excluded above)", account.priorCycleSettled],
    ["Receipt", "Date", "Allocated to ledger", "Gateway", "Status"],
    ...account.payments.map(p => [p.id, p.date, p.amount, p.gateway, p.status]),
  ];
}
export const refund = {
  id: "RF-2081", student: "251FA04E17", policyId: "WD-2026", version: "2.1",
  eligibleDeposit: 20000, deduction: 1500, refundable: 20000 - 1500,
  basis: "Withdrawal before semester start; eligibility and withdrawal date require human verification.",
  scope: "Separate refundable deposit; not an additional fee payment or a reduction of current-year paid totals. Recommendation only; no money has moved.",
};

export type StudentResolutionResult =
  | { status: "matched"; student: (typeof students)[number]; rank: "exact_id" | "exact_name" | "normalized_name" | "unique_token" }
  | { status: "ambiguous"; candidates: (typeof students)[number][] }
  | { status: "not_found" };

export const benchmarkHistoricalStudents: Student[] = [
  {
    id: "251FA04E58",
    name: "Chaitanya Varma",
    programme: "B.Tech CSE",
    category: "General",
    demand: 120000,
    paid: 72000,
    overdue: 48000,
    initials: "CV",
    scholarship: 20000,
    concession: 0,
    instalmentPlan: "3-instalment",
  },
  {
    id: "251FA04E42",
    name: "Aditya Verma",
    programme: "B.Tech ECE",
    category: "General",
    demand: 130000,
    paid: 75000,
    overdue: 55000,
    initials: "AV",
    scholarship: 0,
    concession: 0,
    instalmentPlan: "2-instalment",
  },
  {
    id: "251FA04E36",
    name: "Siddharth Nair",
    programme: "B.Tech Mechanical",
    category: "General",
    demand: 125000,
    paid: 80000,
    overdue: 45000,
    initials: "SN",
    scholarship: 0,
    concession: 0,
    instalmentPlan: "2-instalment",
  },
];

/**
 * Deterministic 5-Tier Student Identity Resolution:
 * Priority:
 * 1. Exact student ID (e.g. "251FA04E03")
 * 2. Exact full name (e.g. "Akshat Raj")
 * 3. Normalized full name (stripped punctuation/spaces)
 * 4. Unique name token (First/Last name when unambiguous)
 * 5. Ambiguous match -> Returns candidate list for clarification (DO NOT GUESS)
 */
export function resolveStudentIdentity(query: string, customPool?: Student[]): StudentResolutionResult {
  const raw = query.trim();
  if (!raw) return { status: "not_found" };
  const q = raw.toLowerCase();

  const searchPool = customPool && customPool.length > 0
    ? customPool
    : [...allStudentsWithProspective, ...benchmarkHistoricalStudents];

  // Tier 1: Exact Student ID match
  for (const s of searchPool) {
    if (q === s.id.toLowerCase() || q.includes(s.id.toLowerCase())) {
      return { status: "matched", student: s, rank: "exact_id" };
    }
  }

  // Tier 2: Exact Full Name match
  for (const s of searchPool) {
    if (q === s.name.toLowerCase() || q.includes(s.name.toLowerCase())) {
      return { status: "matched", student: s, rank: "exact_name" };
    }
  }

  // Tier 3: Normalized Full Name match (no whitespace/punctuation)
  const normQ = q.replace(/[^a-z0-9]/g, "");
  if (normQ.length >= 4) {
    for (const s of searchPool) {
      const normName = s.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (normQ.includes(normName) || normName.includes(normQ)) {
        return { status: "matched", student: s, rank: "normalized_name" };
      }
    }
  }

  // Tier 4: Token-based matching (First or Last name)
  const stopWords = new Set([
    "the", "for", "and", "student", "account", "kholo", "dikhao", "open", "show", "check",
    "batao", "ka", "ki", "ke", "dues", "due", "fees", "fee", "status", "profile", "mera", "meri", "mere", "apna", "apni",
    "detail", "details", "info", "information", "record", "records", "his", "her", "give", "me",
    "what", "is", "are", "how", "much", "many", "balance", "balances", "outstanding", "paid", "total",
    "payment", "receipt", "receipts", "about", "tell", "view", "karo", "please",
    "admission", "admissions", "admitted", "prospective", "intending", "mode", "modes",
    "scholarship", "scholarships", "concession", "eligibility", "counseling", "intake", "seat",
    "offer", "package", "rules", "rule", "slabs", "slab",
    "kitna", "kitni", "kitne", "paise", "paisa", "baki", "hai", "hain", "kiska", "kiski", "kisko", "kaha", "kab", "karein", "hoga", "hogi", "bhai", "kuch", "chahiye"
  ]);
  const tokens = q.split(/[^a-z0-9]+/).filter(t => t.length >= 3 && !stopWords.has(t));

  if (tokens.length >= 2) {
    // For multi-word queries (e.g. "Akshat Raj", "Rahul Sharma"), candidate must match ALL tokens
    const allTokenMatches = searchPool.filter(s => {
      const sLower = s.name.toLowerCase();
      return tokens.every(t => sLower.includes(t));
    });

    if (allTokenMatches.length === 1) {
      return { status: "matched", student: allTokenMatches[0], rank: "unique_token" };
    }
    if (allTokenMatches.length > 1) {
      return { status: "ambiguous", candidates: allTokenMatches };
    }
    return { status: "not_found" };
  }

  if (tokens.length === 1) {
    const singleToken = tokens[0];
    const matchedCandidates: Student[] = [];
    for (const s of searchPool) {
      const sTokens = s.name.toLowerCase().split(/\s+/);
      if (sTokens.some(st => st === singleToken)) {
        if (!matchedCandidates.some(m => m.id === s.id)) {
          matchedCandidates.push(s);
        }
      }
    }

    if (matchedCandidates.length === 1) {
      return { status: "matched", student: matchedCandidates[0], rank: "unique_token" };
    }
    if (matchedCandidates.length > 1) {
      // Prioritize exact first name match if unambiguous
      const firstNameMatches = matchedCandidates.filter(s =>
        s.name.toLowerCase().split(/\s+/)[0] === singleToken
      );
      if (firstNameMatches.length === 1) {
        return { status: "matched", student: firstNameMatches[0], rank: "unique_token" };
      }
      return { status: "ambiguous", candidates: matchedCandidates };
    }
  }

  return { status: "not_found" };
}

/**
 * Deterministic Cross-Domain Intersection: Scholarship Renewal Risk + Overdue Dues
 * Real intersection matched on stable student ID.
 */
export function getCrossDomainScholarshipAndOverdue() {
  const state = getSqlDatabaseState();
  const risks = state.scholarship_risks;
  const results: Array<{
    studentId: string;
    name: string;
    programme: string;
    cgpa: number;
    attendancePct: number;
    riskLevel: string;
    outstandingDues: number;
    overdueDays: number;
    scholarshipCreditAtRisk: number;
  }> = [];

  for (const r of risks) {
    const s = students.find(stud => stud.id === r.student_id);
    if (s && (s.overdue > 0 || (s.demand - s.paid) > 0)) {
      results.push({
        studentId: s.id,
        name: s.name,
        programme: s.programme,
        cgpa: r.cgpa,
        attendancePct: r.attendance_pct,
        riskLevel: r.risk_level,
        outstandingDues: s.demand - s.paid,
        overdueDays: s.overdue,
        scholarshipCreditAtRisk: s.scholarship,
      });
    }
  }
  return results;
}

/**
 * Deterministic Reconciliation Mismatch Analysis:
 * Calculates absolute differences |gateway - ledger| across transactions and sorts descending.
 */
export function getLargestReconciliationMismatch() {
  const mismatchRecords = transactions
    .filter(t => t.status === "Mismatch" || t.gateway !== t.ledger)
    .map(t => ({
      ...t,
      difference: Math.abs(t.gateway - t.ledger),
    }))
    .sort((a, b) => b.difference - a.difference);

  return {
    largestMismatch: mismatchRecords[0] || null,
    totalMismatchesFound: mismatchRecords.length,
    allMismatches: mismatchRecords,
  };
}

/**
 * Deterministic Proactive Institutional Signals
 */
export function getProactiveInstitutionalSignals() {
  const mismatchData = getLargestReconciliationMismatch();
  return {
    signals: [
      {
        tone: "warning",
        title: "23 Payment Mismatches",
        detail: `Requiring finance review (e.g. ${mismatchData.largestMismatch ? `${mismatchData.largestMismatch.id} with ${inr(mismatchData.largestMismatch.difference)} difference` : "mismatches logged"})`,
      },
      {
        tone: "destructive",
        title: "84 Students Overdue >90 Days",
        detail: "Representing ₹8.50 L in persistent aged receivables requiring intervention",
      },
      {
        tone: "success",
        title: "1,284 Payments Reconciled Today",
        detail: "99.2% automated zero-touch gateway-to-ledger matching",
      },
      {
        tone: "primary",
        title: "14 Refund Requests",
        detail: "Awaiting approval under UGC Policy WD-2026 guidelines",
      },
    ],
  };
}

export interface ScholarshipTimelineResult {
  studentId: string;
  isDiscontinued: boolean;
  currentStatus: "Active" | "AtRisk" | "Discontinued";
  discontinuationSemester?: SemesterRecord;
  discontinuationReason?: string;
  history: SemesterRecord[];
  originalScholarshipAmount: number;
  totalScholarshipRevoked: number;
  recalculatedDemand: number;
}

/**
 * Returns complete semester-by-semester academic and fee records for a student.
 * Single authoritative source of truth across StudentDrawer, Student Portal, and AI Engine.
 */
export function getStudentAcademicHistory(studentId: string): SemesterRecord[] {
  const normId = (studentId || "").toUpperCase().trim();
  let records: SemesterRecord[] = [];
  if (benchmarkSemesterHistories[normId]) {
    records = JSON.parse(JSON.stringify(benchmarkSemesterHistories[normId]));
  } else {
    // Fallback for any other enrolled student: synthesize 2 realistic semesters.
    // KEY FIX: Sem 1 is treated as the historical (already-paid) semester.
    // Sem 2 is the active semester. Payment split: Sem 1 fully paid, Sem 2 gets
    // whatever is left. This ensures totalOutstandingDue == student.demand - student.paid exactly.
    const student = allStudentsWithProspective.find(s => s.id.toUpperCase() === normId) || students.find(s => s.id.toUpperCase() === normId);
    if (!student) return [];

    const account = getStudentAccount(student.id);
    const gross = account ? account.gross : student.demand + (student.scholarship || 0);
    const scholarship = student.scholarship || 0;
    const paid = student.paid;
    const totalDue = Math.max(0, student.demand - student.paid);

    const riskStatus = scholarshipStatus[student.id];
    const gpa = riskStatus ? riskStatus.cumulativeGPA : 8.2;
    const att = riskStatus ? riskStatus.attendance : 88.0;

    const explicitClean = new Set(["251FA04E03", "251FA04777", "251FA04E17", "251FA04001"]);
    const explicitCarry = new Set(["251FA04E58", "251FA04E36", "251FA04E42"]);

    let _hashVal = 0;
    for (let i = 0; i < student.id.length; i++) {
      _hashVal = ((_hashVal << 5) - _hashVal + student.id.charCodeAt(i)) | 0;
    }
    const h = Math.abs(_hashVal);

    const isClean = explicitClean.has(normId) || totalDue === 0;
    const shouldHaveCarry = !isClean && (explicitCarry.has(normId) || (h % 100 < 46));

    const sem1Gross = Math.round(gross / 2);
    const sem2Gross = gross - sem1Gross;
    const sem1Scholarship = Math.round(scholarship / 2);
    const sem2Scholarship = gpa < 7.0 ? 0 : (scholarship - sem1Scholarship);

    // Ensure net demands match student.demand exactly so totalDue = student.demand - student.paid
    const effectiveDemand = gpa < 7.0 ? (sem1Gross - sem1Scholarship + sem2Gross) : student.demand;
    const sem1Net = Math.round(effectiveDemand / 2);
    const sem2Net = effectiveDemand - sem1Net;

    if (!shouldHaveCarry) {
      // Clean or standard without carry forward:
      // Sem 1 is historical and fully cleared; active Sem 2 bears the exact total remaining dues.
      const sem2Net = totalDue;

      records = [
        {
          studentId: student.id,
          academicYear: "2025–26",
          yearNo: 1,
          semNo: 1,
          semLabel: "Sem 1 (Jul–Nov 2025)",
          cgpa: Math.min(10, gpa + 0.2),
          cumulativeCgpa: Math.min(10, gpa + 0.2),
          attendance: Math.min(100, att + 2),
          grossFee: sem1Gross,
          scholarshipApplied: sem1Scholarship,
          scholarshipPercent: student.scholarshipPercent || (scholarship > 0 ? 50 : 0),
          netDemand: sem1Net,
          paid: sem1Net,
          outstanding: 0,
          scholarshipStatus: (gpa < 7.0) ? "Discontinued" : (gpa < 7.5 ? "AtRisk" : "Active"),
        },
        {
          studentId: student.id,
          academicYear: "2026–27",
          yearNo: 2,
          semNo: 2,
          semLabel: "Sem 2 (Jan–May 2026)",
          cgpa: gpa,
          cumulativeCgpa: gpa,
          attendance: att,
          grossFee: sem2Gross,
          scholarshipApplied: sem2Scholarship,
          scholarshipPercent: gpa < 7.0 ? 0 : (student.scholarshipPercent || (scholarship > 0 ? 50 : 0)),
          netDemand: sem2Net,
          paid: 0,
          outstanding: totalDue,
          scholarshipStatus: (gpa < 7.0) ? "Discontinued" : (gpa < 7.5 ? "AtRisk" : "Active"),
          discontinuationReason: gpa < 7.0 ? `CGPA ${gpa.toFixed(2)} < 7.0 minimum continuation threshold. Scholarship revoked.` : undefined,
        },
      ];
    } else {
      // Deterministic carry forward assigned (~1002 students):
      // Split totalDue into carriedDue and currentSemDue
      const possibleArrearAmounts = [6000, 8000, 10000, 12000, 15000, 18000, 20000, 22000, 25000];
      let desiredCarry = possibleArrearAmounts[h % possibleArrearAmounts.length];
      if (totalDue > 8000) {
        desiredCarry = Math.min(desiredCarry, Math.max(4000, Math.floor((totalDue * 0.4) / 1000) * 1000));
      } else if (totalDue > 1000) {
        desiredCarry = Math.max(500, Math.floor(totalDue / 2));
      } else {
        desiredCarry = Math.max(1, Math.floor(totalDue / 2));
      }
      desiredCarry = Math.min(desiredCarry, totalDue);

      const currentSemDue = totalDue - desiredCarry;

      // Originating prior semester based on student's current year
      let priorSemNo = 1;
      let priorSemLabel = "Sem 1 (Jul–Nov 2025)";
      let priorAcadYear = "2024–25";
      if (student.yearLabel?.includes("2nd Year") || student.semester === 3) {
        priorSemNo = 2; priorSemLabel = "Sem 2 (Jan–May 2026)"; priorAcadYear = "2025–26";
      } else if (student.yearLabel?.includes("3rd Year") || student.semester === 5) {
        priorSemNo = 4; priorSemLabel = "Sem 4 (Jan–May 2026)"; priorAcadYear = "2025–26";
      } else if (student.yearLabel?.includes("4th Year") || student.semester === 7) {
        priorSemNo = 6; priorSemLabel = "Sem 6 (Jan–May 2026)"; priorAcadYear = "2025–26";
      }

      records = [
        {
          studentId: student.id,
          academicYear: priorAcadYear,
          yearNo: Math.max(1, Math.ceil(priorSemNo / 2)),
          semNo: priorSemNo,
          semLabel: priorSemLabel,
          cgpa: Math.min(10, gpa + 0.3),
          cumulativeCgpa: Math.min(10, gpa + 0.3),
          attendance: Math.min(100, att + 3),
          grossFee: sem1Gross,
          scholarshipApplied: sem1Scholarship,
          scholarshipPercent: student.scholarshipPercent || (scholarship > 0 ? 50 : 0),
          netDemand: sem1Net,
          paid: Math.max(0, sem1Net - desiredCarry),
          outstanding: desiredCarry,
          scholarshipStatus: "Active" as const,
        },
        {
          studentId: student.id,
          academicYear: "2026–27",
          yearNo: 2,
          semNo: priorSemNo + 1,
          semLabel: `Sem ${priorSemNo + 1} (Jan–May 2027)`,
          cgpa: gpa,
          cumulativeCgpa: gpa,
          attendance: att,
          grossFee: sem2Gross,
          scholarshipApplied: sem2Scholarship,
          scholarshipPercent: gpa < 7.0 ? 0 : (student.scholarshipPercent || (scholarship > 0 ? 50 : 0)),
          netDemand: currentSemDue,
          paid: 0,
          outstanding: totalDue,
          scholarshipStatus: (gpa < 7.0) ? "Discontinued" : (gpa < 7.5 ? "AtRisk" : "Active"),
          discontinuationReason: gpa < 7.0 ? `CGPA ${gpa.toFixed(2)} < 7.0 minimum continuation threshold. Scholarship revoked.` : undefined,
        },
      ];
    }
  }

  return computeSemesterCarryForward(records).history;
}

/**
 * Single source of truth for student dues carry-forward breakdown.
 * Decomposes current semester dues from historical carried-forward arrears.
 */
export function getStudentDuesBreakdown(studentIdOrName: string): SemesterCarryForwardResult {
  const norm = (studentIdOrName || "").toUpperCase().trim();
  const res = resolveStudentIdentity(norm);
  const sId = res.status === "matched" ? res.student.id : norm;
  const history = getStudentAcademicHistory(sId);
  return computeSemesterCarryForward(history);
}

/**
 * Evaluates academic history and auto-recalculates scholarship eligibility.
 * Thresholds:
 * - CGPA >= 7.5: Active (Safe)
 * - 7.0 <= CGPA < 7.5: AtRisk (Warning, scholarship maintained)
 * - CGPA < 7.0: Discontinued (Scholarship revoked starting that semester, full fee applied)
 */
export function computeScholarshipEligibilityTimeline(studentId: string): ScholarshipTimelineResult {
  const normId = (studentId || "").toUpperCase().trim();
  const rawHistory = getStudentAcademicHistory(normId);
  let isDiscontinued = false;
  let discontinuationSem: SemesterRecord | undefined = undefined;
  let discontinuationReason: string | undefined = undefined;
  let totalRevoked = 0;
  let originalScholarship = 0;

  const processedHistory = rawHistory.map((sem) => {
    originalScholarship += sem.scholarshipApplied;
    
    // Check if scholarship was discontinued in this semester or an earlier semester
    if (!isDiscontinued && sem.cumulativeCgpa < 7.0) {
      isDiscontinued = true;
      discontinuationSem = sem;
      discontinuationReason = sem.discontinuationReason || `CGPA ${sem.cumulativeCgpa.toFixed(2)} in ${sem.semLabel} < 7.0 minimum continuation threshold. Scholarship revoked and full gross fee applied.`;
    }

    if (isDiscontinued) {
      const revokedAmt = sem.scholarshipApplied > 0 ? sem.scholarshipApplied : 0;
      totalRevoked += revokedAmt;
      const revisedNetDemand = sem.grossFee;
      const revisedOutstanding = Math.max(0, revisedNetDemand - sem.paid);

      return {
        ...sem,
        scholarshipApplied: 0,
        scholarshipPercent: 0,
        netDemand: revisedNetDemand,
        outstanding: revisedOutstanding,
        scholarshipStatus: "Discontinued" as const,
        discontinuationReason: sem.discontinuationReason || discontinuationReason,
      };
    } else if (sem.cumulativeCgpa < 7.5) {
      return {
        ...sem,
        scholarshipStatus: "AtRisk" as const,
      };
    } else {
      return {
        ...sem,
        scholarshipStatus: "Active" as const,
      };
    }
  });

  const latestSem = processedHistory[processedHistory.length - 1];
  const currentStatus: "Active" | "AtRisk" | "Discontinued" = isDiscontinued
    ? "Discontinued"
    : (latestSem ? latestSem.scholarshipStatus : "Active");

  const currentDemand = latestSem ? latestSem.netDemand : 0;

  return {
    studentId,
    isDiscontinued,
    currentStatus,
    discontinuationSemester: discontinuationSem,
    discontinuationReason,
    history: processedHistory,
    originalScholarshipAmount: originalScholarship,
    totalScholarshipRevoked: totalRevoked,
    recalculatedDemand: currentDemand,
  };
}

export type AdmitCardStatus = "CLEAN_ELIGIBLE" | "PROVISIONAL_DUES" | "CONDONED_ELIGIBLE" | "BLOCKED_ATTENDANCE";

export interface ExamEligibilityResult {
  studentId: string;
  studentName: string;
  programme: string;
  isEligible: boolean;
  status: "Eligible" | "Not Eligible";
  outstandingDues: number;
  currentAttendance: number;
  attendance: number;
  ineligibleCategory: "None" | "DuesOnly" | "AttendanceOnly" | "Both";
  ineligibilityReason: "None" | "DuesOnly" | "AttendanceOnly" | "Both";
  reasons: string[];
  primaryReason: string;
  statusDescription: string;
  cfoVerified: boolean;
  isCondoned?: boolean;
  condonationRef?: string;
  latestPermissionRequest?: ExamPermissionRequest;
  activePermissionRequest?: ExamPermissionRequest;
  allPermissionRequests: ExamPermissionRequest[];
  duesBreakdown?: SemesterCarryForwardResult;
  canGenerateAdmitCard: boolean;
  admitCardStatus: AdmitCardStatus;
  admitCardStatusDescription: string;
}

/**
 * Single Source of Truth for Student Examination Eligibility & Automated Admit Card Issuance (Steps 4, 5, 6 Core).
 * Evaluates dual statutory institutional criteria:
 * 1. Outstanding Dues: Unified across current demand + carried-forward arrears (VFSTR Clause 4.2).
 * 2. Current Attendance: Must maintain >= 75.0% attendance in current semester.
 * 
 * Statutory Admit Card rules:
 * - Attendance >= 75% and zero dues -> Clean regular admit card (CLEAN_ELIGIBLE)
 * - Attendance >= 75% and dues > 0 -> Provisional admit card issued with statutory undertaking (PROVISIONAL_DUES)
 * - Attendance < 75% and Approved Permission Request -> Condoned admit card with Dean ref (CONDONED_ELIGIBLE)
 * - Attendance < 75% and no Approved Permission Request -> Blocked strictly (BLOCKED_ATTENDANCE)
 */
export function getStudentExamEligibility(studentIdOrName: string): ExamEligibilityResult {
  const norm = (studentIdOrName || "").toUpperCase().trim();
  const res = resolveStudentIdentity(norm);
  const student = res.status === "matched"
    ? res.student
    : (allStudentsWithProspective.find(s => s.id.toUpperCase() === norm) || students.find(s => s.id.toUpperCase() === norm));

  const sId = student ? student.id : norm;
  const sName = student ? student.name : "Unknown Student";
  const programme = student ? student.programme : "B.Tech";

  const history = getStudentAcademicHistory(sId);
  const latestSem = history[history.length - 1];

  // Single source of truth for dues: check breakdown
  const duesBreakdown = getStudentDuesBreakdown(sId);
  const account = getStudentAccount(sId);
  const dues = duesBreakdown.totalOutstandingDue > 0
    ? duesBreakdown.totalOutstandingDue
    : (latestSem ? latestSem.outstanding : (account ? account.outstanding : (student ? Math.max(0, student.demand - student.paid) : 0)));

  // Single source of truth for attendance: latest semester attendance or scholarshipStatus
  const attendance = latestSem
    ? latestSem.attendance
    : (scholarshipStatus[sId]?.attendance ?? 85.0);

  const reasons: string[] = [];
  let category: "None" | "DuesOnly" | "AttendanceOnly" | "Both" = "None";

  const hasDues = dues > 0;
  const hasLowAtt = attendance < 75.0;

  if (hasDues && hasLowAtt) {
    category = "Both";
    reasons.push(`Outstanding dues of ${inr(dues)}`);
    reasons.push(`Attendance: ${attendance.toFixed(1)}% (below mandatory 75% requirement)`);
  } else if (hasDues) {
    category = "DuesOnly";
    reasons.push(`Outstanding dues of ${inr(dues)}`);
  } else if (hasLowAtt) {
    category = "AttendanceOnly";
    reasons.push(`Attendance: ${attendance.toFixed(1)}% (below mandatory 75% requirement)`);
  }

  const allRequests = getStudentPermissionRequests(sId);
  const latestPermissionRequest = allRequests[0];
  const hasApprovedPermission = latestPermissionRequest?.status === "Approved";

  const isEligible = reasons.length === 0 || hasApprovedPermission;
  const status: "Eligible" | "Not Eligible" = isEligible ? "Eligible" : "Not Eligible";
  const primaryReason = hasApprovedPermission && reasons.length > 0
    ? `Provisional Examination Entry Cleared via Dean Condonation Order (${latestPermissionRequest?.letterRef || latestPermissionRequest?.id})`
    : isEligible
    ? "Eligible for Examination (Dues Cleared & Attendance >= 75%)"
    : reasons.join(" and ");

  // Step 6: Automated statutory Admit Card status determination
  let canGenerateAdmitCard = false;
  let admitCardStatus: AdmitCardStatus = "CLEAN_ELIGIBLE";
  let admitCardStatusDescription = "";

  if (hasApprovedPermission && (hasLowAtt || hasDues)) {
    admitCardStatus = "CONDONED_ELIGIBLE";
    canGenerateAdmitCard = true;
    admitCardStatusDescription = `Condoned Admit Card Issued via Dean Order (${latestPermissionRequest?.letterRef || latestPermissionRequest?.id})`;
  } else if (hasLowAtt) {
    admitCardStatus = "BLOCKED_ATTENDANCE";
    canGenerateAdmitCard = false;
    admitCardStatusDescription = `Admit Card Blocked: Statutory Attendance Breach (${attendance.toFixed(1)}% < 75.0%). Permission Condonation Required.`;
  } else if (hasDues) {
    admitCardStatus = "PROVISIONAL_DUES";
    canGenerateAdmitCard = true;
    admitCardStatusDescription = `Provisional Admit Card Issued (Outstanding Dues: ${inr(dues)} — Mandatory Undertaking Clause Applied)`;
  } else {
    admitCardStatus = "CLEAN_ELIGIBLE";
    canGenerateAdmitCard = true;
    admitCardStatusDescription = "Clean Regular Admit Card Issued (Attendance >= 75%, Dues Fully Cleared)";
  }

  return {
    studentId: sId,
    studentName: sName,
    programme,
    isEligible,
    status,
    outstandingDues: dues,
    currentAttendance: attendance,
    attendance,
    ineligibleCategory: category,
    ineligibilityReason: category,
    reasons,
    primaryReason,
    statusDescription: primaryReason,
    cfoVerified: isEligible,
    isCondoned: hasApprovedPermission,
    condonationRef: hasApprovedPermission ? (latestPermissionRequest?.letterRef || latestPermissionRequest?.id) : undefined,
    latestPermissionRequest,
    activePermissionRequest: latestPermissionRequest,
    allPermissionRequests: allRequests,
    duesBreakdown,
    canGenerateAdmitCard,
    admitCardStatus,
    admitCardStatusDescription,
  };
}

export interface CohortAdmitCardSummary {
  totalStudents: number;
  cleanEligibleCount: number;
  provisionalDuesCount: number;
  condonedCount: number;
  blockedCount: number;
  carriedForwardArrearsCount: number;
  totalOutstandingCohortDues: number;
  students: (ExamEligibilityResult & {
    student: Student;
  })[];
}


/**
 * Bulk admit card generation oversight for Finance Department.
 * Analyzes entire student roster for clean, provisional, condoned, and blocked admit card statuses.
 * Result is cached at module level so the 2500+ student loop only runs once per session.
 */
let _admitCardSummaryCache: CohortAdmitCardSummary | null = null;

export function invalidateAdmitCardCache() {
  _admitCardSummaryCache = null;
}

// Invalidate cache whenever exam permission state changes
if (typeof window !== "undefined") {
  window.addEventListener("feewise_exam_permission_updated", invalidateAdmitCardCache);
}

export function getAllStudentsAdmitCardStatus(): CohortAdmitCardSummary {
  if (_admitCardSummaryCache) return _admitCardSummaryCache;

  const results = students.map((s) => {
    const elig = getStudentExamEligibility(s.id);
    return {
      ...elig,
      student: s,
    };
  });

  const cleanEligibleCount = results.filter((r) => r.admitCardStatus === "CLEAN_ELIGIBLE").length;
  const provisionalDuesCount = results.filter((r) => r.admitCardStatus === "PROVISIONAL_DUES").length;
  const condonedCount = results.filter((r) => r.admitCardStatus === "CONDONED_ELIGIBLE").length;
  const blockedCount = results.filter((r) => r.admitCardStatus === "BLOCKED_ATTENDANCE").length;
  const carriedForwardArrearsCount = results.filter((r) => (r.duesBreakdown?.carriedForwardDue || 0) > 0).length;
  const totalOutstandingCohortDues = results.reduce((sum, r) => sum + r.outstandingDues, 0);

  _admitCardSummaryCache = {
    totalStudents: results.length,
    cleanEligibleCount,
    provisionalDuesCount,
    condonedCount,
    blockedCount,
    carriedForwardArrearsCount,
    totalOutstandingCohortDues,
    students: results,
  };
  return _admitCardSummaryCache;
}


/**
 * Unified 360-Degree Student Financial Context Constructor
 * Strictly preserves academic-year boundaries and distinguishes current-year from prior-cycle balances.
 */
export function getUnifiedStudentContext(studentIdOrName: string) {
  const res = resolveStudentIdentity(studentIdOrName);
  if (res.status !== "matched") {
    return { status: res.status, candidates: res.status === "ambiguous" ? res.candidates : [] };
  }

  const student = res.student;
  const account = getStudentAccount(student.id);
  if (!account) return { status: "not_found" as const };

  const sqlState = getSqlDatabaseState();
  const plan = instalmentPlans.find(p => p.studentId === student.id) || null;
  const scholarshipRisk = sqlState.scholarship_risks.find(r => r.student_id === student.id) || null;
  const loanRequests = sqlState.loan_requests.filter(r => r.student_id === student.id);
  const reminders = sqlState.reminder_dispatches.filter(r => r.student_id === student.id);
  const refundInfo = refund.student === student.id ? refund : null;

  const hostelFee = account.fees.find(f => f.head === "Hostel");
  const scholarshipTimeline = computeScholarshipEligibilityTimeline(student.id);
  const examEligibility = getStudentExamEligibility(student.id);

  return {
    status: "matched" as const,
    resolutionRank: res.rank,
    student,
    account,
    academicYear: snapshot.academicYear,
    currentYearDemand: account.demand,
    currentYearPaid: account.paid,
    currentYearOutstanding: account.outstanding,
    grossDemand: account.gross,
    scholarshipConcession: account.scholarship,
    priorCycleSettled: account.priorCycleSettled,
    hostelOutstanding: hostelFee ? hostelFee.outstanding : 0,
    instalmentPlan: plan,
    scholarshipRisk,
    loanRequests,
    reminders,
    refundInfo,
    reconciliationNote: account.reconciliation,
    payments: account.payments,
    admissionMode: student.admissionMode,
    admissionStatus: student.admissionStatus,
    entranceRank: student.entranceRank,
    entranceScoreValue: student.entranceScoreValue,
    entranceQuotaCategory: student.entranceQuotaCategory,
    scholarshipSlabId: student.scholarshipSlabId,
    scholarshipPercent: student.scholarshipPercent,
    scholarshipEligibilityNote: scholarshipTimeline.isDiscontinued
      ? `⚠️ Scholarship Discontinued: ${scholarshipTimeline.discontinuationReason}`
      : student.scholarshipEligibilityNote,
    academicHistory: scholarshipTimeline.history,
    scholarshipTimeline,
    isScholarshipDiscontinued: scholarshipTimeline.isDiscontinued,
    examEligibility,
    duesBreakdown: examEligibility.duesBreakdown,
    canGenerateAdmitCard: examEligibility.canGenerateAdmitCard,
    admitCardStatus: examEligibility.admitCardStatus,
    admitCardStatusDescription: examEligibility.admitCardStatusDescription,
  };
}

/**
 * Single Source of Truth: Auto-derives applicable fee structure, scholarship amount,
 * eligibility criteria, and net payable based on Degree Programme + Admission Mode + Entrance Score.
 * Reads directly from authoritative `feeStructures` and `scholarshipSlabs` tables.
 */
export function deriveFeeAndScholarship(
  programme: string,
  mode: AdmissionMode,
  rankOrScore?: number | string,
  subQuotaOrCategory?: string
) {
  // 1. Locate relevant fee structure rows for programme and route
  const activeRows = feeStructures.filter(
    (f) => f.programme === programme && f.active
  );
  const routeRows = activeRows.filter(
    (f) => f.route === mode || f.route.toLowerCase().includes(mode.toLowerCase())
  );
  const targetRows =
    routeRows.length > 0
      ? routeRows
      : activeRows.length > 0
      ? activeRows
      : feeStructures.filter((f) => f.programme === "B.Tech CSE" && f.active);

  const tuitionItem = targetRows.find((f) => f.head === "Tuition");
  const tuitionAmount = tuitionItem ? tuitionItem.amount : 90000;
  const grossFee = targetRows.reduce((sum, f) => sum + f.amount, 0);

  // 2. Lookup matching slab from scholarshipSlabs (Single Source of Truth)
  const modeSlabs = scholarshipSlabs.filter((s) => s.admissionMode === mode);

  let matchedSlab: ScholarshipSlab = modeSlabs[modeSlabs.length - 1] || {
    id: "default",
    admissionMode: mode,
    tierName: "Standard Admission",
    criteriaLabel: "General",
    waiverPercent: 0,
    description: "Standard tuition fee",
  };

  const rawStr = String(rankOrScore ?? "");
  const numMatch = rawStr.match(/([0-9]+(\.[0-9]+)?)/);
  const numVal = numMatch ? parseFloat(numMatch[1]) : undefined;
  const subStr = (subQuotaOrCategory ? subQuotaOrCategory + " " + rawStr : rawStr).toLowerCase();

  switch (mode) {
    case "JEE Mains": {
      const pct = numVal !== undefined ? numVal : 80;
      for (const slab of modeSlabs) {
        if (slab.minScore !== undefined && slab.maxScore !== undefined) {
          if (pct >= slab.minScore && pct <= slab.maxScore) {
            matchedSlab = slab;
            break;
          }
        }
      }
      break;
    }
    case "V-SAT":
    case "EAMCET": {
      const rank = numVal !== undefined ? numVal : 5000;
      for (const slab of modeSlabs) {
        if (slab.minScore !== undefined && slab.maxScore !== undefined) {
          if (rank >= slab.minScore && rank <= slab.maxScore) {
            matchedSlab = slab;
            break;
          }
        }
      }
      break;
    }
    case "Reserved/Lower Caste Category": {
      if (subStr.includes("bc-a") || subStr.includes("bc-b") || subStr.includes("bca") || subStr.includes("bcb") || subStr.includes("bc a") || subStr.includes("bc b")) {
        matchedSlab = modeSlabs.find((s) => s.id === "res-bc-ab") || modeSlabs[0];
      } else if (subStr.includes("bc-c") || subStr.includes("bc-d") || subStr.includes("bc-e") || subStr.includes("bcc") || subStr.includes("bcd") || subStr.includes("bce") || subStr.includes("backward")) {
        matchedSlab = modeSlabs.find((s) => s.id === "res-bc-cde") || modeSlabs[0];
      } else if (subStr.includes("ews") || subStr.includes("income") || subStr.includes("economically")) {
        matchedSlab = modeSlabs.find((s) => s.id === "res-ews") || modeSlabs[0];
      } else if (subStr.includes("sc") || subStr.includes("st") || subStr.includes("statutory") || subStr.includes("welfare")) {
        matchedSlab = modeSlabs.find((s) => s.id === "res-sc-st") || modeSlabs[0];
      } else {
        matchedSlab = modeSlabs.find((s) => s.id === "res-sc-st") || modeSlabs[0];
      }
      break;
    }
    case "Special State Status": {
      if (subStr.includes("ne") || subStr.includes("north") || subStr.includes("assam") || subStr.includes("meghalaya")) {
        matchedSlab = modeSlabs.find((s) => s.id === "spec-ne") || modeSlabs[0];
      } else if (subStr.includes("j&k") || subStr.includes("jk") || subStr.includes("kashmir") || subStr.includes("pmsss") || subStr.includes("ladakh")) {
        matchedSlab = modeSlabs.find((s) => s.id === "spec-jk") || modeSlabs[0];
      } else if (subStr.includes("island") || subStr.includes("andaman") || subStr.includes("lakshadweep")) {
        matchedSlab = modeSlabs.find((s) => s.id === "spec-island") || modeSlabs[0];
      } else {
        matchedSlab = modeSlabs.find((s) => s.id === "spec-jk") || modeSlabs[0];
      }
      break;
    }
    case "GATE / PGECET": {
      const score = numVal !== undefined ? numVal : 550;
      matchedSlab = score >= 650 ? modeSlabs[0] : modeSlabs[1] || modeSlabs[0];
      break;
    }
    case "ICET": {
      const rank = numVal !== undefined ? numVal : 1500;
      matchedSlab = rank <= 1000 ? modeSlabs[0] : modeSlabs[1] || modeSlabs[0];
      break;
    }
    case "Management":
    default: {
      matchedSlab = modeSlabs.find((s) => s.id === "mgmt-std") || matchedSlab;
      break;
    }
  }

  const slabPercent = matchedSlab.waiverPercent;
  const scholarshipAmount = Math.round((tuitionAmount * slabPercent) / 100);
  const netPayable = Math.max(0, grossFee - scholarshipAmount);
  const eligibilityRule = `${matchedSlab.tierName} (${matchedSlab.criteriaLabel}): ${slabPercent}% Tuition Waiver (${inr(scholarshipAmount)})`;

  return {
    programme,
    admissionMode: mode,
    grossFee,
    tuitionAmount,
    otherHeadsAmount: grossFee - tuitionAmount,
    scholarshipAmount,
    slabPercent,
    matchedSlab,
    eligibilityRule,
    netPayable,
    heads: targetRows.map((f) => ({ head: f.head, amount: f.amount })),
  };
}

export type FinanceTopic =
  | "summary"
  | "students"
  | "studentProfile"
  | "dues"
  | "overdue"
  | "hostel"
  | "payments"
  | "transactions"
  | "reconciliation"
  | "fees"
  | "feeStructure"
  | "fee_structure"
  | "instalments"
  | "smartReminders"
  | "reminders"
  | "scholarshipRisks"
  | "scholarships"
  | "loanRequests"
  | "loans"
  | "refunds"
  | "refund"
  | "reports"
  | "feeHeads"
  | "ageing"
  | "waterfall"
  | "collectionIntelligence"
  | "collection_intelligence"
  | "collections"
  | "financeIntelligence"
  | "finance_intelligence"
  | "signals"
  | "audit"
  | "auditLogs"
  | "sql"
  | "schema"
  | "kpi"
  | "kpis"
  | "crossDomain"
  | "unifiedStudent"
  | "admission"
  | "admissionMode"
  | "admission_mode"
  | "admissions"
  | "prospective"
  | "prospectiveStudents"
  | "academicHistory"
  | "academic_history"
  | "semesterHistory"
  | "semester_history"
  | "examEligibility"
  | "exam_eligibility"
  | "examPermission"
  | "exam_permission"
  | "permissionRequests"
  | "permission_requests";

export type FinanceLink = { kind: "student" | "transaction" | "refund"; id: string };
export type FinanceResult = { scope: string; data: unknown; rows: { label: string; value: string }[]; links: FinanceLink[] };

export function readFinance(
  topic: FinanceTopic,
  query = "",
  role: "admin" | "finance-officer" | "student" = "admin",
  currentStudentId?: string
): FinanceResult {
  const scope = `${snapshot.academicYear} · Institutional Snapshot ${snapshot.asOf}. ${snapshot.scope}`;
  const empty = { scope, data: { error: "No matching records found in university dataset. Please verify the ID or name." }, rows: [], links: [] };
  const q = query.trim().toLowerCase();

  // Normalize topic aliases
  const t = topic.toLowerCase();

  // RBAC Enforcement: Student role can ONLY access their own records
  if (role === "student") {
    if (["summary", "reminders", "smartreminders", "reports", "reconciliation"].includes(t)) {
      return {
        scope,
        data: { error: "Access Denied: Student accounts cannot access institution-wide treasury data or administrative audit logs." },
        rows: [],
        links: [],
      };
    }
    // If student queries student records, restrict strictly to their own ID
    if (["students", "studentprofile", "dues", "overdue", "hostel", "instalments", "scholarships", "scholarshiprisks", "loans", "loanrequests"].includes(t)) {
      const allowedId = currentStudentId || students[0].id;
      if (q && !allowedId.toLowerCase().includes(q) && !students.find(s => s.id === allowedId)?.name.toLowerCase().includes(q)) {
        return {
          scope,
          data: { error: "Access Denied: You are only authorized to view your own student fee account and certificates." },
          rows: [],
          links: [],
        };
      }
      const account = getStudentAccount(allowedId);
      if (!account) return empty;
      return {
        scope,
        data: account,
        rows: [
          { label: "Student", value: `${account.name} (${account.id})` },
          { label: "Net demand", value: inr(account.demand) },
          { label: "Paid to date", value: inr(account.paid) },
          { label: "Outstanding balance", value: inr(account.outstanding) },
          { label: "Active plan", value: account.instalmentPlan },
        ],
        links: [{ kind: "student", id: account.id }],
      };
    }
  }

  // 1. Student Profile & Ledger Accounts
  if (["students", "studentprofile", "dues", "overdue", "hostel"].includes(t)) {
    const searchSource = allStudentsWithProspective;
    const accounts = searchSource
      .filter(s => !q || `${s.name} ${s.id} ${s.programme} ${s.category} ${s.admissionMode || ""}`.toLowerCase().includes(q))
      .map(s => getStudentAccount(s.id)!)
      .filter(Boolean)
      .filter(s =>
        t === "overdue"
          ? s.overdue > 90 && s.outstanding > 0
          : t === "hostel"
          ? s.fees.some(f => f.head === "Hostel" && f.outstanding > 0)
          : true
      );
    if (!accounts.length) return empty;
    return {
      scope,
      data: accounts.length === 1 ? accounts[0] : accounts,
      rows: accounts.map(s => ({
        label: `${s.name} · ${s.id} (${s.admissionStatus || "Admitted"})`,
        value: t === "hostel"
          ? `${inr(s.fees.find(f => f.head === "Hostel")!.outstanding)} hostel due`
          : `${inr(s.outstanding)} outstanding (Paid: ${inr(s.paid)} / Demand: ${inr(s.demand)})`,
      })),
      links: accounts.map(s => ({ kind: "student", id: s.id })),
    };
  }

  // 1.1 Admission Modes & Scholarships
  if (["admission", "admissionmode", "admission_mode", "admissions"].includes(t)) {
    if (q) {
      const res = resolveStudentIdentity(q);
      if (res.status === "matched") {
        const s = res.student;
        const account = getStudentAccount(s.id);
        const derivation = deriveFeeAndScholarship(s.programme, s.admissionMode || "V-SAT", s.entranceRank);
        return {
          scope,
          data: { student: s, account, derivation },
          rows: [
            { label: "Student", value: `${s.name} (${s.id})` },
            { label: "Admission Mode", value: s.admissionMode || "V-SAT" },
            { label: "Admission Status", value: s.admissionStatus || "Admitted" },
            { label: "Entrance Rank / Score", value: String(s.entranceRank || "N/A") },
            { label: "Applicable Programme Fee", value: inr(derivation.grossFee) },
            { label: "Sanctioned Scholarship", value: inr(s.scholarship || derivation.scholarshipAmount) },
            { label: "Scholarship Tier", value: derivation.matchedSlab.tierName },
            { label: "Tuition Waiver", value: `${derivation.slabPercent}%` },
            { label: "Eligibility Rule", value: s.scholarshipEligibilityNote || derivation.eligibilityRule },
            { label: "Net Payable / Demand", value: inr(s.demand) },
            { label: "Current Balance Due", value: inr(s.demand - s.paid) },
          ],
          links: [{ kind: "student", id: s.id }],
        };
      }
    }

    // General summary of Admission Modes and policy rules
    return {
      scope,
      data: {
        admissionModes: [
          { mode: "V-SAT", desc: "Vignan's Scholastic Aptitude Test (Multi-tier Slabs: Rank 1–50: 100%, 51–150: 75%, 151–500: 50%, 501–1,500: 25%, 1,501–3,000: 10% tuition waiver)" },
          { mode: "JEE Mains", desc: "National Entrance (>98%ile: 100%, 95–97.99%ile: 75%, 90–94.99%ile: 50%, 85–89.99%ile: 25%, 80–84.99%ile: 15% tuition waiver)" },
          { mode: "EAMCET", desc: "State Engineering/Pharmacy Entrance (Rank <2k: 100%, 2k–5k: 75%, 5k–10k: 50%, 10k–20k: 25%, >20k: AP JVD reimbursement)" },
          { mode: "Reserved/Lower Caste Category", desc: "Statutory Post-Matric Social Welfare Quota (SC/ST: 100% statutory waiver, BC-A/B: 50%, BC-C/D/E: 35%, EWS: 25%)" },
          { mode: "Special State Status", desc: "North-Eastern States & J&K Domicile (NE: 30%, J&K: 25%, Islands: 20%, Border: 15% regional tuition concession)" },
        ],
        admittedCount: admittedStudents.length,
        prospectiveCount: prospectiveStudents.length,
        slabs: scholarshipSlabs,
      },
      rows: [
        { label: "Admission Modes Supported", value: "V-SAT, JEE Mains, EAMCET, Reserved/Lower Caste Category, Special State Status" },
        { label: "Admitted Students (Enrolled)", value: `${admittedStudents.length} students with active fee ledgers` },
        { label: "Prospective Students (Intending)", value: `${prospectiveStudents.length} applicant leads in counseling pool` },
        { label: "Source of Truth", value: "VFSTR Approved Multi-Tier Scholarship Slabs (scholarshipSlabs) & Fee Schedules" },
      ],
      links: [],
    };
  }

  // 1.2 Prospective / Intending Students
  if (["prospective", "prospectivestudents"].includes(t)) {
    const list = prospectiveStudents.filter(s =>
      !q || `${s.name} ${s.id} ${s.programme} ${s.admissionMode}`.toLowerCase().includes(q)
    );
    return {
      scope,
      data: list,
      rows: list.map(s => ({
        label: `${s.name} · ${s.id} (${s.admissionMode})`,
        value: `${s.programme} · Net Payable: ${inr(s.demand - s.scholarship - s.paid)} (Base: ${inr(s.demand)} | Scholarship: ${inr(s.scholarship)})`,
      })),
      links: list.map(s => ({ kind: "student", id: s.id })),
    };
  }

  // 2. Payments & Gateway Transactions
  if (["payments", "transactions"].includes(t)) {
    const records = transactions
      .filter(txn => !q || `${txn.id} ${txn.student} ${txn.status} ${txn.method}`.toLowerCase().includes(q))
      .map(txn => ({ ...txn, difference: txn.gateway - txn.ledger }));
    if (!records.length) return empty;
    return {
      scope,
      data: records,
      rows: records.map(txn => ({
        label: `${txn.id} (${txn.student})`,
        value: `${inr(txn.gateway)} via ${txn.method} · Difference: ${inr(txn.difference)} · ${txn.status}`,
      })),
      links: records.map(txn => ({ kind: "transaction", id: txn.id })),
    };
  }

  // 3. Payment Reconciliation & Mismatch Audits
  if (["reconciliation"].includes(t)) {
    const mismatches = transactions.filter(txn => txn.status === "Mismatch");
    return {
      scope,
      data: {
        reconciliationPercent: snapshot.reconciliationPercent,
        reconciledToday: snapshot.reconciledToday,
        pendingTransactions: snapshot.pendingTransactions,
        mismatchCases: mismatches,
      },
      rows: [
        { label: "Automated Reconciliation", value: `${snapshot.reconciliationPercent}%` },
        { label: "Reconciled Today", value: `${snapshot.reconciledToday} transactions` },
        { label: "Pending Gateway Queue", value: `${snapshot.pendingTransactions} transactions` },
        { label: "Active Mismatches", value: `${mismatches.length} (e.g., TXN-10483 with ₹5,000 variance)` },
      ],
      links: mismatches.map(txn => ({ kind: "transaction", id: txn.id })),
    };
  }

  // 4. Admission Withdrawals & UGC Refund Norms
  if (["refund", "refunds"].includes(t)) {
    if (q && !`${refund.id} ${refund.student} ananya sharma`.toLowerCase().includes(q)) return empty;
    return {
      scope,
      data: refund,
      rows: [
        { label: "Eligible deposit", value: inr(refund.eligibleDeposit) },
        { label: "Policy deduction", value: inr(refund.deduction) },
        { label: "Recommendation only", value: inr(refund.refundable) },
      ],
      links: [{ kind: "refund", id: refund.id }],
    };
  }

  // 5. Official Fee Structures
  if (["fees", "feestructure", "fee_structure"].includes(t)) {
    return {
      scope,
      data: {
        coverage: "Official university approved fee structures across B.Tech, MBA, M.Tech, and Pharmacy programs.",
        records: feeStructures.filter(f => !q || `${f.programme} ${f.head} ${f.year}`.toLowerCase().includes(q)),
      },
      rows: feeStructures.slice(0, 8).map(f => ({ label: `${f.programme} Year ${f.year} (${f.head})`, value: inr(f.amount) })),
      links: [],
    };
  }

  // 6. Split-Payment Instalment Plans
  if (["instalments"].includes(t)) {
    const plans = instalmentPlans.filter(p => !q || p.studentId.toLowerCase().includes(q) || p.planId.toLowerCase().includes(q));
    if (!plans.length) return empty;
    return {
      scope,
      data: plans,
      rows: plans.map(p => {
        const s = students.find(stud => stud.id === p.studentId);
        const name = s?.name || p.studentId;
        return {
          label: `${name} (${p.studentId}) · ${p.planType}`,
          value: `${p.instalments.filter(i => i.status === "Paid").length}/${p.instalments.length} Paid (Demand: ${inr(p.totalDemand)})`,
        };
      }),
      links: plans.map(p => ({ kind: "student", id: p.studentId })),
    };
  }

  // 7. Smart Reminders & Distress Suppression
  if (["reminders", "smartreminders"].includes(t)) {
    const state = getSqlDatabaseState();
    const dispatches = state.reminder_dispatches.filter(d => !q || `${d.student_id} ${d.student_name} ${d.channel}`.toLowerCase().includes(q));
    return {
      scope,
      data: {
        description: "Smart Reminder Engine: policy-governed reminder suppression preventing distress while optimizing collection velocity.",
        suppressionPolicies: [
          "Suppress if active bank loan application in progress",
          "Suppress if recent bereavement or medical hardship reported",
          "Suppress if partial payment made in last 7 days",
          "Maximum 1 reminder per 14 days per student",
        ],
        dispatches,
      },
      rows: [
        { label: "Policy Model", value: "Smart Suppression Active" },
        { label: "Total Dispatched", value: `${dispatches.length} reminders recorded` },
        { label: "Distress Guardrails", value: "4 active criteria" },
      ],
      links: dispatches.map(d => ({ kind: "student", id: d.student_id })),
    };
  }

  // 8. Scholarship Renewal Risks
  if (["scholarships", "scholarshiprisks"].includes(t)) {
    const state = getSqlDatabaseState();
    const risks = state.scholarship_risks.filter(r => !q || `${r.student_id} ${r.student_name} ${r.programme} ${r.risk_level}`.toLowerCase().includes(q));
    return {
      scope,
      data: {
        policy: "Scholarship Renewal Criteria: Minimum 7.50 CGPA and 75% semester attendance required for annual scholarship continuation.",
        risks,
      },
      rows: risks.map(r => ({
        label: `${r.student_name} (${r.student_id})`,
        value: `CGPA: ${r.cgpa} (Min: ${r.criteria_at_risk.min_cgpa}) · Attendance: ${r.attendance_pct}% · Risk: ${r.risk_level}`,
      })),
      links: risks.map(r => ({ kind: "student", id: r.student_id })),
    };
  }

  // 9. Bank Education Loan Requests
  if (["loans", "loanrequests"].includes(t)) {
    const state = getSqlDatabaseState();
    const requests = state.loan_requests.filter(r => !q || `${r.student_id} ${r.student_name} ${r.bank_name} ${r.document_type}`.toLowerCase().includes(q));
    return {
      scope,
      data: {
        description: "Bank Education Loan Desk: official verified bonafide and fee estimation documents for SBI, HDFC, Canara, and other nationalized banks.",
        requests,
      },
      rows: requests.map(r => ({
        label: `${r.student_name} · ${r.bank_name}`,
        value: `${r.document_type.replace(/_/g, " ")} (${r.status})`,
      })),
      links: requests.map(r => ({ kind: "student", id: r.student_id })),
    };
  }

  // 10. Fee Heads Breakdown
  if (["feeheads"].includes(t)) {
    return {
      scope,
      data: feeHeads,
      rows: feeHeads.map(fh => ({ label: fh.name, value: `₹${fh.amount.toFixed(1)} L` })),
      links: [],
    };
  }

  // 11. Outstanding Ageing Distribution
  if (["ageing"].includes(t)) {
    return {
      scope,
      data: ageing,
      rows: ageing.map(ag => ({ label: ag.label, value: `₹${ag.amount.toFixed(1)} L` })),
      links: [],
    };
  }

  // 12. Institutional Reports & Treasury Analytics
  if (["reports"].includes(t)) {
    return {
      scope,
      data: {
        summary: "VFSTR University Financial Audit & Treasury Summary (AY 2026–27)",
        demand: inr(snapshot.demand),
        collected: inr(snapshot.collected),
        outstanding: inr(snapshot.outstanding),
        reconciliation: `${snapshot.reconciliationPercent}% (${snapshot.reconciledToday} reconciled, ${snapshot.pendingTransactions} pending)`,
        mismatches: snapshot.mismatches,
        refundQueue: snapshot.refundRequests,
        feeHeads,
        ageing,
      },
      rows: [
        { label: "Total Demand", value: inr(snapshot.demand) },
        { label: "Total Collected", value: inr(snapshot.collected) },
        { label: "Outstanding Dues", value: inr(snapshot.outstanding) },
        { label: "Reconciliation Rate", value: `${snapshot.reconciliationPercent}%` },
      ],
      links: [],
    };
  }

  // 13. Fee Waterfall Priority
  if (["waterfall"].includes(t)) {
    return {
      scope,
      data: {
        priorityOrder: ["Tuition", "Examination", "Library", "Laboratory", "Transport", "Hostel"],
        rules: "Clause 4.2 of University Finance Bylaws dictates partial payments allocate strictly in order of academic necessity.",
      },
      rows: [
        { label: "Rank 1", value: "Tuition Fee" },
        { label: "Rank 2", value: "Examination Fee" },
        { label: "Rank 3", value: "Library Fee" },
        { label: "Rank 4", value: "Laboratory Fee" },
        { label: "Rank 5", value: "Transport Fee" },
        { label: "Rank 6", value: "Hostel & Mess Fee" },
      ],
      links: [],
    };
  }

  // 14. Collection Intelligence (Actuals vs Projections & Slicing)
  if (["collectionintelligence", "collection_intelligence", "collections"].includes(t)) {
    const collData = filteredCollections();
    const actualData = collData.filter(d => !d.projected);
    const totCollected = actualData.reduce((sum, row) => sum + (row.collected ?? 0), 0);
    const totDemand = actualData.reduce((sum, row) => sum + (row.demand ?? 0), 0);
    const projDemand = collData.filter(d => d.projected).reduce((sum, row) => sum + (row.demand ?? 0), 0);
    return {
      scope,
      data: {
        description: "Collection Intelligence: Multi-dimensional predictive fee tracking (Apr–Sep actuals vs Oct–Mar projections).",
        actualCollected: `₹${totCollected.toFixed(1)} L`,
        actualDemand: `₹${totDemand.toFixed(1)} L`,
        realizationRate: `${((totCollected / totDemand) * 100).toFixed(2)}%`,
        projectedDemandAhead: `₹${projDemand.toFixed(1)} L`,
        monthlySeries: collData,
        filterDimensions: ["Academic Year (2026–27, 2025–26)", "Programme (B.Tech CSE, MBA)", "Category (General, Scholarship)", "Fee Head (Tuition, Hostel)"],
      },
      rows: [
        { label: "Realized Collection (Apr–Sep)", value: `₹${totCollected.toFixed(1)} Lakhs` },
        { label: "Collection Realization Rate", value: `${((totCollected / totDemand) * 100).toFixed(2)}%` },
        { label: "Projected Demand (Oct–Mar)", value: `₹${projDemand.toFixed(1)} Lakhs` },
        { label: "Peak Inflow Month", value: "July (₹41.0 L in B.Tech CSE)" },
      ],
      links: [],
    };
  }

  // 15. Finance Intelligence & Actionable Signals
  if (["financeintelligence", "finance_intelligence", "signals"].includes(t)) {
    return {
      scope,
      data: {
        description: "Finance Intelligence: Proactive institutional warning signals for financial decision-makers.",
        signals: [
          { type: "warning", signal: "23 payment mismatches", detail: "Require review (e.g. TXN-10483 with ₹5,000 difference)" },
          { type: "critical", signal: "84 students", detail: "Have dues older than 90 days (₹8.50 L chronic dues)" },
          { type: "success", signal: "1,284 payments", detail: "Reconciled today automatically" },
          { type: "primary", signal: "14 refund requests", detail: "Awaiting approval under UGC WD-2026 policy" },
        ],
      },
      rows: [
        { label: "Payment Mismatches", value: "23 cases requiring review" },
        { label: "Chronic Overdue (>90d)", value: "84 students (₹8.50 L)" },
        { label: "Reconciled Today", value: "1,284 transactions (99.2% rate)" },
        { label: "Pending Refund Reviews", value: "14 requests awaiting approval" },
      ],
      links: [],
    };
  }

  // 16. SQL Schema & Relational Store
  if (["sql", "schema"].includes(t)) {
    const state = getSqlDatabaseState();
    return {
      scope,
      data: {
        database: "PostgreSQL · admissions_finance",
        tables: [
          "finance.student_fee_ledger",
          "finance.fee_component",
          "finance.waterfall_allocation_policy",
          "finance.reminder_dispatch",
          "finance.scholarship_renewal_risk",
          "finance.loan_document_request",
        ],
        activeRemindersCount: state.reminder_dispatches.length,
        scholarshipRisksCount: state.scholarship_risks.length,
        loanRequestsCount: state.loan_requests.length,
      },
      rows: [
        { label: "Database Engine", value: "PostgreSQL (finance schema)" },
        { label: "Core Tables", value: "6 relational tables" },
        { label: "Reminders Logged", value: `${state.reminder_dispatches.length} records` },
        { label: "Active Scholarship Risks", value: `${state.scholarship_risks.length} flagged accounts` },
      ],
      links: [],
    };
  }

  // 17. Core KPIs & Treasury Metrics
  if (["kpi", "kpis"].includes(t)) {
    return {
      scope,
      data: {
        totalDemand: inr(snapshot.demand),
        collected: inr(snapshot.collected),
        outstanding: inr(snapshot.outstanding),
        reconciliationPercent: `${snapshot.reconciliationPercent}%`,
      },
      rows: [
        { label: "Total Fee Demand", value: "₹485.60 L (+7.4% AY target)" },
        { label: "Net Collected", value: "₹412.40 L (84.92% realization rate)" },
        { label: "Outstanding Dues", value: "₹73.20 L (15.08% unrealized)" },
        { label: "Reconciliation", value: "99.2% (127 gateway queue)" },
      ],
      links: [],
    };
  }

  // 18. Cross-Domain Intersections (Scholarship Risk + Overdue / Largest Mismatch)
  if (["crossdomain", "cross_domain"].includes(t)) {
    const scholarshipOverdue = getCrossDomainScholarshipAndOverdue();
    const mismatchData = getLargestReconciliationMismatch();
    return {
      scope,
      data: {
        scholarshipOverdueIntersection: scholarshipOverdue,
        largestMismatch: mismatchData.largestMismatch,
        allMismatches: mismatchData.allMismatches,
      },
      rows: [
        ...scholarshipOverdue.map(s => ({
          label: `${s.name} (${s.studentId})`,
          value: `Risk: ${s.riskLevel} (CGPA: ${s.cgpa}, Att: ${s.attendancePct}%) · Overdue: ${inr(s.outstandingDues)} (${s.overdueDays}d)`,
        })),
        ...(mismatchData.largestMismatch ? [{
          label: `Largest Mismatch: ${mismatchData.largestMismatch.id}`,
          value: `Difference: ${inr(mismatchData.largestMismatch.difference)} (Gateway: ${inr(mismatchData.largestMismatch.gateway)} vs Ledger: ${inr(mismatchData.largestMismatch.ledger)})`,
        }] : []),
      ],
      links: scholarshipOverdue.map(s => ({ kind: "student" as const, id: s.studentId })),
    };
  }

  // 19. Unified 360-Degree Student Financial Profile
  if (["unifiedstudent", "unified_student"].includes(t)) {
    const unified = getUnifiedStudentContext(q || (role === "student" ? (currentStudentId || "251FA04E03") : "251FA04E03"));
    if (unified.status !== "matched") {
      return empty;
    }
    return {
      scope,
      data: unified,
      rows: [
        { label: "Student", value: `${unified.student.name} (${unified.student.id}) · ${unified.student.programme}` },
        { label: "AY 2026–27 Net Demand", value: inr(unified.currentYearDemand) },
        { label: "Paid to Date", value: inr(unified.currentYearPaid) },
        { label: "Outstanding Dues", value: inr(unified.currentYearOutstanding) },
        { label: "Instalment Plan", value: unified.instalmentPlan ? `${unified.instalmentPlan.planType} (${unified.instalmentPlan.instalments.filter(i => i.status === "Paid").length}/${unified.instalmentPlan.instalments.length} Paid)` : "Lump-sum / None" },
        { label: "Scholarship Concession", value: unified.scholarshipConcession ? inr(unified.scholarshipConcession) : "None" },
        { label: "Scholarship Risk", value: unified.scholarshipRisk ? `${unified.scholarshipRisk.risk_level} (CGPA: ${unified.scholarshipRisk.cgpa}, Att: ${unified.scholarshipRisk.attendance_pct}%)` : "Low / Compliant" },
        { label: "Prior Cycle Settled", value: inr(unified.priorCycleSettled) },
      ],
      links: [{ kind: "student" as const, id: unified.student.id }],
    };
  }

  // 20. Semester-wise Academic & Scholarship Eligibility History
  if (["academichistory", "academic_history", "semesterhistory", "semester_history"].includes(t)) {
    const rawTarget = query.trim() || (role === "student" ? (currentStudentId || "251FA04E03") : "251FA04E03");
    const resolved = resolveStudentIdentity(rawTarget);
    const targetId = resolved.status === "matched" ? resolved.student.id : rawTarget.toUpperCase();
    const studentName = resolved.status === "matched" ? resolved.student.name : targetId;
    const timeline = computeScholarshipEligibilityTimeline(targetId);

    return {
      scope,
      data: timeline,
      rows: [
        { label: "Student", value: `${studentName} (${timeline.studentId})` },
        { label: "Scholarship Status", value: timeline.currentStatus.toUpperCase() },
        ...(timeline.isDiscontinued ? [
          { label: "Discontinuation Reason", value: timeline.discontinuationReason || "CGPA fell below 7.0 minimum threshold" },
          { label: "Discontinuation Semester", value: timeline.discontinuationSemester?.semLabel || "N/A" },
          { label: "Total Scholarship Revoked", value: inr(timeline.totalScholarshipRevoked) },
        ] : []),
        ...timeline.history.map(sem => ({
          label: `${sem.semLabel} (${sem.academicYear})`,
          value: `CGPA: ${sem.cumulativeCgpa.toFixed(2)} | Gross: ${inr(sem.grossFee)} | Scholarship: ${inr(sem.scholarshipApplied)} | Net: ${inr(sem.netDemand)} | Paid: ${inr(sem.paid)} | Status: ${sem.scholarshipStatus}`
        }))
      ],
      links: [{ kind: "student" as const, id: timeline.studentId }]
    };
  }

  // 21. Exam Eligibility & Attendance / Dues Status
  if (["exameligibility", "exam_eligibility"].includes(t)) {
    const rawTarget = query.trim() || (role === "student" ? (currentStudentId || "251FA04E03") : "251FA04E03");
    const eligibility = getStudentExamEligibility(rawTarget);
    return {
      scope,
      data: eligibility,
      rows: [
        { label: "Student", value: `${eligibility.studentName} (${eligibility.studentId})` },
        { label: "Exam Eligibility", value: eligibility.status.toUpperCase() },
        { label: "Current Attendance", value: `${eligibility.currentAttendance.toFixed(1)}% ${eligibility.currentAttendance >= 75 ? "(Satisfied >= 75%)" : "(Deficient < 75%)"}` },
        { label: "Outstanding Dues", value: inr(eligibility.outstandingDues) },
        { label: "Status Reason", value: eligibility.primaryReason },
        ...(eligibility.latestPermissionRequest ? [
          { label: "Permission Request", value: `${eligibility.latestPermissionRequest.id} · Status: ${eligibility.latestPermissionRequest.status}` }
        ] : []),
      ],
      links: [{ kind: "student" as const, id: eligibility.studentId }],
    };
  }

  // 22. Exam Permission Requests & Letters
  if (["exampermission", "exam_permission", "permissionrequests", "permission_requests"].includes(t)) {
    const rawTarget = query.trim() || (role === "student" ? (currentStudentId || "251FA04E03") : "");
    const requests = rawTarget ? getStudentPermissionRequests(rawTarget) : getAllPermissionRequests();
    return {
      scope,
      data: requests,
      rows: requests.slice(0, 10).map((r) => ({
        label: `${r.id} · ${r.studentName} (${r.studentId})`,
        value: `Status: ${r.status} | Reason: ${r.reason} | Submitted: ${r.submittedAt}${r.rejectionReason ? ` | Rejection: ${r.rejectionReason}` : ""}`
      })),
      links: requests.map((r) => ({ kind: "student" as const, id: r.studentId })),
    };
  }

  // Default: Institutional Snapshot Summary
  return {
    scope,
    data: {
      ...snapshot,
      feeHeads,
      ageing,
      refundPolicy: refund,
      feeHeadCoverage: "Listed fee heads total ₹480.60 L plus ₹5.00 L other heads (Registration, Caution Deposit & Alumni) = ₹485.60 L.",
      sampleTotals: { demand: students.reduce((n, s) => n + s.demand, 0), paid: students.reduce((n, s) => n + s.paid, 0) },
    },
    rows: [
      { label: "Institution demand", value: inr(snapshot.demand) },
      { label: "Institution collected", value: inr(snapshot.collected) },
      { label: "Institution outstanding", value: inr(snapshot.outstanding) },
      { label: "Reconciliation", value: `${snapshot.reconciliationPercent}%` },
    ],
    links: [],
  };
}

// Each vector is an explicit fictional monthly aggregate in lakh rupees, not a filter multiplier.
// Months 0–5: Apr–Sep (actual). Months 6–11: Oct–Mar (projected).
const series = [
  { year: "2026–27", programme: "B.Tech CSE", category: "General", head: "Tuition", collected: [18.5, 23.5, 29.5, 41.0, 28.5, 23.5, null, null, null, null, null, null], demand: [23.0, 27.5, 34.0, 45.0, 35.5, 29.0, 29.0, 28.0, 30.0, 31.0, 32.0, 33.0] },
  { year: "2026–27", programme: "MBA", category: "General", head: "Tuition", collected: [9.5, 12.0, 15.0, 21.0, 14.5, 12.0, null, null, null, null, null, null], demand: [12.0, 14.0, 17.5, 23.0, 18.0, 15.0, 14.5, 14.0, 15.0, 15.5, 16.0, 16.5] },
  { year: "2026–27", programme: "B.Tech CSE", category: "Scholarship", head: "Tuition", collected: [3.8, 4.8, 6.0, 8.2, 5.8, 4.8, null, null, null, null, null, null], demand: [4.8, 5.5, 7.0, 9.0, 7.2, 6.0, 5.8, 5.6, 6.0, 6.2, 6.4, 6.6] },
  { year: "2026–27", programme: "B.Tech CSE", category: "General", head: "Hostel", collected: [7.2, 9.2, 11.5, 16.0, 11.0, 9.2, null, null, null, null, null, null], demand: [9.0, 10.8, 13.5, 17.5, 14.0, 11.5, 11.0, 10.5, 11.5, 12.0, 12.5, 13.0] },
  { year: "2026–27", programme: "MBA", category: "General", head: "Hostel", collected: [3.5, 4.6, 5.8, 8.0, 5.5, 4.5, null, null, null, null, null, null], demand: [4.5, 5.4, 6.8, 8.8, 7.0, 5.6, 5.4, 5.2, 5.8, 6.0, 6.2, 6.5] },
  { year: "2026–27", programme: "Other programmes", category: "General", head: "Other heads", collected: [4.0, 5.0, 6.5, 8.6, 5.9, 4.5, null, null, null, null, null, null], demand: [4.9, 5.2, 6.8, 9.2, 6.7, 5.4, 5.2, 5.0, 5.5, 5.6, 5.8, 6.0] },
  { year: "2025–26", programme: "B.Tech CSE", category: "General", head: "Tuition", collected: [16.0, 20.5, 26.0, 36.5, 25.0, 21.0, null, null, null, null, null, null], demand: [20.0, 24.0, 30.0, 40.0, 31.0, 26.0, 25.0, 24.5, 26.5, 27.0, 28.0, 29.0] },
  { year: "2025–26", programme: "MBA", category: "General", head: "Tuition", collected: [8.0, 10.5, 13.0, 18.5, 13.0, 10.5, null, null, null, null, null, null], demand: [10.5, 12.5, 15.0, 20.5, 16.0, 13.0, 12.5, 12.0, 13.0, 13.5, 14.0, 14.5] },
  { year: "2025–26", programme: "B.Tech CSE", category: "Scholarship", head: "Tuition", collected: [3.2, 4.2, 5.2, 7.2, 5.0, 4.2, null, null, null, null, null, null], demand: [4.2, 4.8, 6.0, 8.0, 6.2, 5.2, 5.0, 4.8, 5.2, 5.4, 5.6, 5.8] },
  { year: "2025–26", programme: "B.Tech CSE", category: "General", head: "Hostel", collected: [6.2, 8.0, 10.0, 14.0, 9.5, 8.0, null, null, null, null, null, null], demand: [7.8, 9.5, 11.8, 15.5, 12.0, 10.0, 9.5, 9.0, 10.0, 10.5, 11.0, 11.5] },
  { year: "2025–26", programme: "MBA", category: "General", head: "Hostel", collected: [3.0, 4.0, 5.0, 7.0, 4.8, 4.0, null, null, null, null, null, null], demand: [3.8, 4.6, 5.8, 7.8, 6.0, 4.8, 4.6, 4.5, 5.0, 5.2, 5.4, 5.6] },
  { year: "2025–26", programme: "Other programmes", category: "General", head: "Other heads", collected: [3.5, 4.4, 5.6, 7.5, 5.2, 4.0, null, null, null, null, null, null], demand: [4.2, 4.5, 6.0, 8.0, 5.8, 4.8, 4.5, 4.4, 4.8, 5.0, 5.2, 5.4] },
];
const MONTHS = ["April","May","June","July","August","September","October","November","December","January","February","March"];
export const collectionRecords = series.flatMap(s => s.collected.map((collected, month) => ({ year: s.year, programme: s.programme, category: s.category, head: s.head, month, collected: collected !== null ? collected * 100000 : null, demand: s.demand[month] !== null ? s.demand[month]! * 100000 : null })));
export function filteredCollections(year = "2026–27", programme = "All programmes", category = "All categories", head = "All fee heads") {
  const isKnownSeries = programme === "B.Tech CSE" || programme === "MBA";
  const rows = collectionRecords.filter(r =>
    r.year === year &&
    (programme === "All programmes" || programme === r.programme || (!isKnownSeries && r.programme === "Other programmes")) &&
    (category === "All categories" || category === r.category) &&
    (head === "All fee heads" || head === r.head)
  );
  return MONTHS.map((month, index) => ({
    month,
    collected: rows.filter(r => r.month === index && r.collected !== null).reduce((sum,r) => sum + (r.collected ?? 0), 0) / 100000 || null,
    demand: rows.filter(r => r.month === index && r.demand !== null).reduce((sum,r) => sum + (r.demand ?? 0), 0) / 100000 || null,
    projected: index >= 6,
  }));
}
export function getInstalments(studentId: string) {
  return instalmentPlans.find(p => p.studentId === studentId) ?? null;
}

export function recordPayment(
  studentId: string,
  amount: number,
  channel: string = "UPI"
) {
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error("Student not found: " + studentId);

  // Waterfall priority: Tuition -> Examination -> Library -> Laboratory -> Hostel
  if (feeAllocations[studentId]) {
    let remaining = amount;
    const priorityOrder = ["Tuition", "Examination", "Library", "Laboratory", "Hostel"];
    const sortedAllocs = [...feeAllocations[studentId]].sort((a, b) => {
      const idxA = priorityOrder.indexOf(a.head);
      const idxB = priorityOrder.indexOf(b.head);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

    for (const item of sortedAllocs) {
      if (item.outstanding <= 0) continue;
      const pay = Math.min(remaining, item.outstanding);
      item.paid += pay;
      item.outstanding -= pay;
      item.status = item.outstanding === 0 ? "Fully Cleared" : "Partially Paid";
      remaining -= pay;
      if (remaining <= 0) break;
    }
  } else if (allocations[studentId]) {
    let remaining = amount;
    const priorityOrder = ["Tuition", "Examination", "Library", "Laboratory", "Transport", "Hostel"];
    const sortedAllocs = [...allocations[studentId]].sort((a, b) => {
      const idxA = priorityOrder.indexOf(a.head);
      const idxB = priorityOrder.indexOf(b.head);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

    for (const item of sortedAllocs) {
      const due = item.gross - item.scholarship - item.paid;
      if (due <= 0) continue;
      const pay = Math.min(remaining, due);
      item.paid += pay;
      remaining -= pay;
      if (remaining <= 0) break;
    }
  }

  student.paid = Math.min(student.demand, student.paid + amount);
  student.overdue = Math.max(0, student.demand - student.paid);

  const txnId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const txn = {
    id: txnId,
    student: studentId,
    gateway: amount,
    ledger: amount,
    date: dateStr,
    method: channel,
    status: "Matched",
  };
  transactions.unshift(txn as any);

  if (!paymentReceipts[studentId]) {
    paymentReceipts[studentId] = [];
  }
  paymentReceipts[studentId].unshift({
    txnId,
    date: dateStr,
    channel,
    amount,
  });

  try {
    recordSqlPayment({
      student_id: studentId,
      amount,
      payment_mode: channel.toLowerCase().includes("bank") ? "NEFT" : "ONLINE",
      channel,
    });
  } catch (err) {
    console.error("SQL store payment sync notice:", err);
  }

  return {
    receiptNo: `RCPT-${txnId.replace("TXN-", "")}`,
    studentId: student.id,
    studentName: student.name,
    programme: student.programme,
    date: dateStr,
    amount,
    method: channel,
    txnId,
    heads: feeAllocations[studentId]?.map(a => ({ head: a.head, amount: a.paid })) || allocations[studentId]?.map((a) => ({ head: a.head, amount: a.paid })),
  };
}

