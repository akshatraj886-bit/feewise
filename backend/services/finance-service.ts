import { students, transactions, feeStructures, feeHeads, ageing, inr, instalmentPlans } from "../database/finance-data";
import { recordSqlPayment, getSqlDatabaseState } from "../database/sql-store";

export const snapshot = {
  asOf: "2026-09-11T10:21:00+05:30", academicYear: "2026–27",
  scope: "Institutional Treasury Snapshot (in ₹ Lakhs) · VFSTR Main Campus & Off-Campuses. 1,450+ student batch ledger.",
  demand: 48560000, collected: 41240000, outstanding: 7320000,
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
  const student = students.find(s => s.id === id);
  if (!student) return null;
  const fees = allocations[id].map(f => ({ ...f, demand: f.gross - f.scholarship, outstanding: f.gross - f.scholarship - f.paid }));
  const payments = [
    ...transactions.filter(t => t.student === id).map(t => ({ id: t.id, date: t.date, amount: t.ledger, gateway: t.gateway, method: `${t.method} · ${t.status}`, status: t.status })),
    ...historicalReceipts.filter(t => t.student === id).map(t => ({ id: t.id, date: t.date, amount: t.ledger, gateway: t.ledger, method: "Bank transfer · Reconciled", status: "Matched" })),
  ];
  const scholarship = fees.reduce((sum, f) => sum + f.scholarship, 0);
  return { ...student, academicYear: snapshot.academicYear, fees, payments, scholarship,
    scholarshipPolicy: scholarship ? "Merit award SCH-2026: ₹20,000 tuition credit; admission category is separate from the award." : "No scholarship award",
    gross: fees.reduce((sum, f) => sum + f.gross, 0), outstanding: student.demand - student.paid,
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

/**
 * Deterministic 5-Tier Student Identity Resolution:
 * Priority:
 * 1. Exact student ID (e.g. "251FA04E03")
 * 2. Exact full name (e.g. "Akshat Raj")
 * 3. Normalized full name (stripped punctuation/spaces)
 * 4. Unique name token (First/Last name when unambiguous)
 * 5. Ambiguous match -> Returns candidate list for clarification (DO NOT GUESS)
 */
export function resolveStudentIdentity(query: string): StudentResolutionResult {
  const raw = query.trim();
  if (!raw) return { status: "not_found" };
  const q = raw.toLowerCase();

  // Tier 1: Exact Student ID match
  for (const s of students) {
    if (q === s.id.toLowerCase() || q.includes(s.id.toLowerCase())) {
      return { status: "matched", student: s, rank: "exact_id" };
    }
  }

  // Tier 2: Exact Full Name match
  for (const s of students) {
    if (q === s.name.toLowerCase() || q.includes(s.name.toLowerCase())) {
      return { status: "matched", student: s, rank: "exact_name" };
    }
  }

  // Tier 3: Normalized Full Name match (no whitespace/punctuation)
  const normQ = q.replace(/[^a-z0-9]/g, "");
  if (normQ.length >= 4) {
    for (const s of students) {
      const normName = s.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (normQ.includes(normName) || normName.includes(normQ)) {
        return { status: "matched", student: s, rank: "normalized_name" };
      }
    }
  }

  // Tier 4: Token-based matching (First or Last name)
  const stopWords = new Set([
    "the", "for", "and", "student", "account", "kholo", "dikhao", "open", "show", "check",
    "batao", "ka", "ki", "ke", "dues", "due", "fees", "fee", "status", "profile", "mera", "meri",
    "detail", "details", "info", "information", "record", "records", "his", "her", "give", "me"
  ]);
  const tokens = q.split(/[\s,.'"-]+/).filter(t => t.length >= 3 && !stopWords.has(t));

  const matchedCandidates: (typeof students)[number][] = [];
  for (const s of students) {
    const sTokens = s.name.toLowerCase().split(/\s+/);
    // Check if any significant token matches student's first/last name
    if (tokens.some(t => sTokens.some(st => st === t || (st.length > 3 && t.length > 3 && (st.startsWith(t) || t.startsWith(st)))))) {
      if (!matchedCandidates.some(m => m.id === s.id)) {
        matchedCandidates.push(s);
      }
    }
  }

  if (matchedCandidates.length === 1) {
    return { status: "matched", student: matchedCandidates[0], rank: "unique_token" };
  }
  if (matchedCandidates.length > 1) {
    return { status: "ambiguous", candidates: matchedCandidates };
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
  | "unifiedStudent";

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
    const accounts = students
      .filter(s => !q || `${s.name} ${s.id} ${s.programme} ${s.category}`.toLowerCase().includes(q))
      .map(s => getStudentAccount(s.id)!)
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
        label: `${s.name} · ${s.id}`,
        value: t === "hostel"
          ? `${inr(s.fees.find(f => f.head === "Hostel")!.outstanding)} hostel due`
          : `${inr(s.outstanding)} outstanding (Paid: ${inr(s.paid)} / Demand: ${inr(s.demand)})`,
      })),
      links: accounts.map(s => ({ kind: "student", id: s.id })),
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
  const rows = collectionRecords.filter(r => r.year === year && (programme === "All programmes" || programme === r.programme) && (category === "All categories" || category === r.category) && (head === "All fee heads" || head === r.head));
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

  const allocs = allocations[studentId];
  if (allocs) {
    let remaining = amount;
    const priorityOrder = ["Tuition", "Examination", "Library", "Laboratory", "Transport", "Hostel"];
    const sortedAllocs = [...allocs].sort((a, b) => {
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
    heads: allocs?.map((a) => ({ head: a.head, amount: a.paid })),
  };
}
