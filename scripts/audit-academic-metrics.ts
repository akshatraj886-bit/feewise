import { students } from "../backend/database/finance-data";
import { scholarshipStatus } from "../backend/database/scholarship-status";
import { getSqlDatabaseState } from "../backend/database/sql-store";
import { benchmarkSemesterHistories } from "../backend/database/semester-academic-history";
import { getStudentExamEligibility } from "../backend/services/finance-service";

const sql = getSqlDatabaseState();

const testIds = ["251FA04E03", "251FA04645", "251FA04E17", "251FA04E21", "251FA04E58", "251FA04777"];

console.log("=== ATTENDANCE & CGPA COMPARISON ===");
for (const id of testIds) {
  const s = students.find(x => x.id === id);
  const stat = scholarshipStatus[id];
  const risk = sql.scholarship_risks.find(r => r.student_id === id);
  const exam = getStudentExamEligibility(id);
  const history = benchmarkSemesterHistories[id];
  const lastHist = history ? history[history.length - 1] : null;

  console.log(`\nStudent ${id} (${s?.name}):`);
  console.log(` - scholarship-status.ts: Att = ${stat?.attendance}%, CGPA = ${stat?.cumulativeGPA}`);
  console.log(` - sql-store scholarship_risks: Att = ${risk?.attendance_pct}%, CGPA = ${risk?.cgpa}`);
  console.log(` - exam eligibility: Att = ${exam?.currentAttendance}%`);
  console.log(` - semester history: Att = ${lastHist?.attendance}%, CGPA = ${lastHist?.cumulativeCgpa}`);
}
