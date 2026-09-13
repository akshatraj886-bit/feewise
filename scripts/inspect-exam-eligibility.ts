import { students } from "../backend/database/finance-data";
import { scholarshipStatus } from "../backend/database/scholarship-status";
import { getStudentAcademicHistory } from "../backend/services/finance-service";

const zeroDues = students.filter((s) => s.demand - s.paid <= 0);
console.log("Total students with 0 dues:", zeroDues.length);

console.log("\n--- Students with 0 Dues ---");
for (const s of zeroDues.slice(0, 5)) {
  const h = getStudentAcademicHistory(s.id);
  const latest = h[h.length - 1];
  console.log(
    `ID: ${s.id} | Name: ${s.name} | Paid: ${s.paid}/${s.demand} | Att: ${latest?.attendance ?? scholarshipStatus[s.id]?.attendance ?? "N/A"}%`
  );
}

const lowAtt = students.filter((s) => {
  const h = getStudentAcademicHistory(s.id);
  const latest = h[h.length - 1];
  const att = latest?.attendance ?? scholarshipStatus[s.id]?.attendance;
  return att !== undefined && att < 75;
});

console.log("\nTotal students with Attendance < 75%:", lowAtt.length);
for (const s of lowAtt.slice(0, 5)) {
  const h = getStudentAcademicHistory(s.id);
  const latest = h[h.length - 1];
  console.log(
    `ID: ${s.id} | Name: ${s.name} | Dues: ${s.demand - s.paid} | Att: ${latest?.attendance ?? scholarshipStatus[s.id]?.attendance}%`
  );
}
