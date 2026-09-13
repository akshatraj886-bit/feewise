import { students } from "../backend/database/finance-data";
import { getStudentDuesBreakdown, getStudentExamEligibility } from "../backend/services/finance-service";

let mismatchCount = 0;
let zeroWhenDueCount = 0;

for (const s of students) {
  const trueDue = s.demand - s.paid;
  const dues = getStudentDuesBreakdown(s.id);
  const exam = getStudentExamEligibility(s.id);

  if (trueDue > 0 && dues.totalOutstandingDue === 0) {
    zeroWhenDueCount++;
  }
  if (trueDue !== dues.totalOutstandingDue) {
    mismatchCount++;
    if (mismatchCount <= 10) {
      console.log(`Mismatch for ${s.id} (${s.name}): True Due = ${trueDue}, DuesBreakdown = ${dues.totalOutstandingDue}, Exam Outstanding = ${exam.outstandingDues}`);
    }
  }
}

console.log("\n==========================================");
console.log(`Total students: ${students.length}`);
console.log(`Total students with dues mismatch: ${mismatchCount}`);
console.log(`Total students showing ₹0 due when they actually have dues: ${zeroWhenDueCount}`);
console.log("==========================================");
