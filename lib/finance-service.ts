import { students, transactions, feeStructures, feeHeads, ageing, inr, instalmentPlans } from "./finance-data";
import { recordSqlPayment } from "./sql-store";

export const snapshot = {
  asOf: "2026-09-11T10:21:00+05:30", academicYear: "2026–27",
  scope: "Fictional institutional snapshot; six representative accounts and five recent transactions are not the full university ledger.",
  demand: 254000000, collected: 217000000, outstanding: 37000000,
  reconciliationPercent: 97.8, reconciledToday: 1284, pendingTransactions: 127,
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

export type FinanceLink = { kind: "student" | "transaction" | "refund"; id: string };
export type FinanceResult = { scope: string; data: unknown; rows: { label: string; value: string }[]; links: FinanceLink[] };
export function readFinance(topic: "summary" | "students" | "overdue" | "hostel" | "payments" | "refund" | "fees", query = ""): FinanceResult {
  const scope = `${snapshot.academicYear} · Demo snapshot ${snapshot.asOf}. ${snapshot.scope}`;
  const empty = { scope, data: { error: "No matching demo records. Ask for an available ID; do not substitute another record." }, rows: [], links: [] };
  const q = query.trim().toLowerCase();
  if (["students", "overdue", "hostel"].includes(topic)) {
    const accounts = students.filter(s => !q || `${s.name} ${s.id} ${s.programme}`.toLowerCase().includes(q))
      .map(s => getStudentAccount(s.id)!)
      .filter(s => topic === "overdue" ? s.overdue > 90 && s.outstanding > 0 : topic === "hostel" ? s.fees.some(f => f.head === "Hostel" && f.outstanding > 0) : true);
    if (!accounts.length) return empty;
    return { scope, data: accounts, rows: accounts.map(s => ({ label: `${s.name} · ${s.id}`, value: topic === "hostel" ? `${inr(s.fees.find(f => f.head === "Hostel")!.outstanding)} hostel due` : `${inr(s.outstanding)} outstanding` })), links: accounts.map(s => ({ kind: "student", id: s.id })) };
  }
  if (topic === "payments") {
    const records = transactions.filter(t => !q || `${t.id} ${t.student} ${t.status}`.toLowerCase().includes(q)).map(t => ({ ...t, difference: t.gateway - t.ledger }));
    if (!records.length) return empty;
    return { scope, data: records, rows: records.map(t => ({ label: t.id, value: `${inr(t.difference)} difference · ${t.status}` })), links: records.map(t => ({ kind: "transaction", id: t.id })) };
  }
  if (topic === "refund") {
    if (q && !`${refund.id} ${refund.student} ananya sharma`.toLowerCase().includes(q)) return empty;
    return { scope, data: refund, rows: [{ label: "Eligible deposit", value: inr(refund.eligibleDeposit) }, { label: "Policy deduction", value: inr(refund.deduction) }, { label: "Recommendation only", value: inr(refund.refundable) }], links: [{ kind: "refund", id: refund.id }] };
  }
  if (topic === "fees") return { scope, data: { coverage: "Selected published fee rules only; individual fee allocations and scholarships are in student accounts.", records: feeStructures.filter(f => !q || `${f.programme} ${f.head} ${f.year}`.toLowerCase().includes(q)) }, rows: [], links: [] };
  return { scope, data: { ...snapshot, feeHeads, ageing, refundPolicy: refund, feeHeadCoverage: "Listed fee heads total ₹20.70 Cr plus ₹1.00 Cr other heads = ₹21.70 Cr.", sampleTotals: { demand: students.reduce((n,s) => n+s.demand,0), paid: students.reduce((n,s) => n+s.paid,0) } }, rows: [{ label: "Institution demand", value: inr(snapshot.demand) }, { label: "Institution collected", value: inr(snapshot.collected) }, { label: "Institution outstanding", value: inr(snapshot.outstanding) }], links: [] };
}

// Each vector is an explicit fictional monthly aggregate in lakh rupees, not a filter multiplier.
// Months 0–5: Apr–Sep (actual). Months 6–11: Oct–Mar (projected).
const series = [
  { year: "2026–27", programme: "B.Tech CSE", category: "General", head: "Tuition", collected: [80,100,90,130,140,160,null,null,null,null,null,null], demand: [100,115,110,150,160,170,170,165,175,180,185,190] },
  { year: "2026–27", programme: "MBA", category: "General", head: "Tuition", collected: [40,55,50,65,80,110,null,null,null,null,null,null], demand: [55,65,65,80,90,120,118,115,122,125,128,130] },
  { year: "2026–27", programme: "B.Tech CSE", category: "Scholarship", head: "Tuition", collected: [15,20,24,23,30,28,null,null,null,null,null,null], demand: [20,25,30,30,35,30,30,30,32,33,34,35] },
  { year: "2026–27", programme: "B.Tech CSE", category: "General", head: "Hostel", collected: [30,40,40,60,60,70,null,null,null,null,null,null], demand: [40,45,50,70,70,75,74,72,76,78,80,82] },
  { year: "2026–27", programme: "MBA", category: "General", head: "Hostel", collected: [15,20,15,20,20,30,null,null,null,null,null,null], demand: [20,25,20,25,25,35,34,33,36,37,38,40] },
  { year: "2026–27", programme: "Other programmes", category: "General", head: "Other heads", collected: [60,75,66,97,90,122,null,null,null,null,null,null], demand: [75,90,80,105,110,130,128,125,132,135,138,140] },
  { year: "2025–26", programme: "B.Tech CSE", category: "General", head: "Tuition", collected: [70,90,85,110,130,145,null,null,null,null,null,null], demand: [90,110,95,140,155,160,158,155,162,165,168,170] },
  { year: "2025–26", programme: "MBA", category: "General", head: "Tuition", collected: [30,45,45,60,65,90,null,null,null,null,null,null], demand: [40,55,60,75,80,105,103,100,108,110,112,115] },
  { year: "2025–26", programme: "B.Tech CSE", category: "Scholarship", head: "Tuition", collected: [12,18,18,20,25,28,null,null,null,null,null,null], demand: [15,20,25,25,30,30,30,28,31,32,33,34] },
  { year: "2025–26", programme: "B.Tech CSE", category: "General", head: "Hostel", collected: [25,35,36,50,55,65,null,null,null,null,null,null], demand: [30,40,45,60,60,70,69,67,72,74,76,78] },
  { year: "2025–26", programme: "MBA", category: "General", head: "Hostel", collected: [12,15,15,18,20,25,null,null,null,null,null,null], demand: [15,20,20,25,25,30,29,28,31,32,33,34] },
  { year: "2025–26", programme: "Other programmes", category: "General", head: "Other heads", collected: [50,65,60,85,80,108,null,null,null,null,null,null], demand: [65,80,75,100,100,120,118,115,122,125,128,130] },
];
const MONTHS = ["April","May","June","July","August","September","October","November","December","January","February","March"];
export const collectionRecords = series.flatMap(s => s.collected.map((collected, month) => ({ year: s.year, programme: s.programme, category: s.category, head: s.head, month, collected: collected !== null ? collected * 100000 : null, demand: s.demand[month] !== null ? s.demand[month]! * 100000 : null })));
export function filteredCollections(year = "2026–27", programme = "All programmes", category = "All categories", head = "All fee heads") {
  const rows = collectionRecords.filter(r => r.year === year && (programme === "All programmes" || programme === r.programme) && (category === "All categories" || category === r.category) && (head === "All fee heads" || head === r.head));
  return MONTHS.map((month, index) => ({
    month,
    collected: rows.filter(r => r.month === index && r.collected !== null).reduce((sum,r) => sum + (r.collected ?? 0), 0) / 10000000 || null,
    demand: rows.filter(r => r.month === index && r.demand !== null).reduce((sum,r) => sum + (r.demand ?? 0), 0) / 10000000 || null,
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
