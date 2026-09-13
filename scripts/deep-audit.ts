import { students } from "../backend/database/finance-data";
import {
  getStudentAccount,
  getStudentDuesBreakdown,
  getStudentExamEligibility,
  computeScholarshipEligibilityTimeline,
  deriveFeeAndScholarship,
  getAllStudentsAdmitCardStatus,
  benchmarkHistoricalStudents,
} from "../backend/services/finance-service";
import { getSqlDatabaseState } from "../backend/database/sql-store";
import { feeAllocations } from "../backend/database/fee-allocations";
import { paymentReceipts } from "../backend/database/payment-receipts";
import { scholarshipStatus } from "../backend/database/scholarship-status";
import { instalmentPlans } from "../backend/database/instalment-plans";

const testStudentIds = ["251FA04E03", "251FA04645", "251FA04E58", "251FA04777"];

console.log("==================================================");
console.log("CANONICAL DATA AUDIT FOR 4 REPRESENTATIVE STUDENTS");
console.log("==================================================");

for (const id of testStudentIds) {
  const student = students.find(s => s.id === id) || benchmarkHistoricalStudents.find(b => b.id === id);
  console.log(`\n---------------- STUDENT: ${id} (${student?.name}) ----------------`);
  if (!student) {
    console.log("❌ STUDENT NOT FOUND IN STUDENTS / BENCHMARK ARRAY!");
    continue;
  }
  console.log("1. Base record in finance-data.ts:");
  console.log(`   - Programme: ${student.programme}`);
  console.log(`   - Demand: ${student.demand}, Paid: ${student.paid}, Overdue: ${student.overdue}`);
  console.log(`   - Scholarship: ${student.scholarship}, Concession: ${student.concession}`);
  console.log(`   - Admission Mode: ${student.admissionMode}, Rank: ${student.entranceRank}`);

  console.log("2. getStudentDuesBreakdown:");
  const dues = getStudentDuesBreakdown(id);
  console.log(`   - Current Sem Due: ${dues.currentSemesterDue}`);
  console.log(`   - Carried Forward: ${dues.carriedForwardDue} (hasCarriedForward: ${dues.hasCarriedForward})`);
  console.log(`   - Total Outstanding Due: ${dues.totalOutstandingDue}`);

  console.log("3. getStudentExamEligibility:");
  const exam = getStudentExamEligibility(id);
  console.log(`   - Eligible: ${exam.isEligible}`);
  console.log(`   - Category: ${exam.ineligibleCategory}`);
  console.log(`   - Current Attendance: ${exam.currentAttendance}%`);
  console.log(`   - Outstanding Dues: ${exam.outstandingDues}`);

  console.log("4. computeScholarshipEligibilityTimeline:");
  const timeline = computeScholarshipEligibilityTimeline(id);
  console.log(`   - Current Status: ${timeline?.currentStatus}`);
  const latestSem = timeline?.history?.[timeline.history.length - 1];
  console.log(`   - Latest CGPA: ${latestSem?.cgpa}`);
  console.log(`   - Latest Attendance: ${latestSem?.attendance}%`);

  console.log("5. getStudentAccount:");
  const acct = getStudentAccount(id);
  console.log(`   - Account Outstanding: ${acct?.outstanding}`);
  console.log(`   - Account Gross: ${acct?.gross}`);
  console.log(`   - Account Scholarship: ${acct?.scholarship}`);
  console.log(`   - Fees heads count: ${acct?.fees?.length}`);
  if (acct?.fees) {
    const feeSum = acct.fees.reduce((s, f) => s + f.demand, 0);
    const feePaid = acct.fees.reduce((s, f) => s + f.paid, 0);
    const feeOut = acct.fees.reduce((s, f) => s + f.outstanding, 0);
    console.log(`   - Fees Head Sums -> Demand: ${feeSum}, Paid: ${feePaid}, Outstanding: ${feeOut}`);
  }

  console.log("6. feeAllocations directly:");
  const alloc = feeAllocations[id];
  console.log(`   - feeAllocations exists: ${Boolean(alloc)}`);
  if (alloc) {
    const allocGross = alloc.reduce((s, a) => s + a.gross, 0);
    const allocPaid = alloc.reduce((s, a) => s + a.paid, 0);
    const allocOut = alloc.reduce((s, a) => s + a.outstanding, 0);
    console.log(`   - Alloc Sums -> Gross: ${allocGross}, Paid: ${allocPaid}, Outstanding: ${allocOut}`);
  }

  console.log("7. instalmentPlans directly:");
  const plan = instalmentPlans.find(p => p.studentId === id);
  console.log(`   - Plan exists: ${Boolean(plan)} (${plan?.planType})`);
  if (plan) {
    const planTotal = plan.instalments.reduce((s, i) => s + i.amount, 0);
    const planPaid = plan.instalments.reduce((s, i) => s + i.paid, 0);
    console.log(`   - Plan Sums -> Amount: ${planTotal}, Paid: ${planPaid}`);
  }

  console.log("8. sql-store entities:");
  const sql = getSqlDatabaseState();
  const risk = sql.scholarship_risks.find(r => r.student_id === id);
  console.log(`   - Scholarship Risk: ${risk ? `${risk.risk_level} (CGPA: ${risk.cgpa}, Att: ${risk.attendance_pct}%)` : "None"}`);
  const loan = sql.loan_requests.find(l => l.student_id === id);
  console.log(`   - Loan Request: ${loan ? `${loan.document_type} (${loan.status})` : "None"}`);
  const rem = sql.reminder_dispatches.find(r => r.student_id === id);
  console.log(`   - Reminder: ${rem ? `Segment: ${rem.segment}, Suppressed: ${rem.suppressed}` : "None"}`);
  const ref = sql.refunds.find(r => r.student_id === id);
  console.log(`   - Refund: ${ref ? `${ref.reason} (${ref.status}, ₹${ref.eligible_amount})` : "None"}`);
}
