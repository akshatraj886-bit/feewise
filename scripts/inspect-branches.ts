import { students } from "../backend/database/finance-data";

const byCohortAndBranch: Record<string, Record<string, number>> = {};
for (const s of students) {
  const cohort = s.yearLabel || "Unknown";
  if (!byCohortAndBranch[cohort]) byCohortAndBranch[cohort] = {};
  byCohortAndBranch[cohort][s.programme] = (byCohortAndBranch[cohort][s.programme] || 0) + 1;
}

console.log("Distribution of students by Cohort and Programme:");
for (const [cohort, progs] of Object.entries(byCohortAndBranch)) {
  console.log(`\n=== ${cohort} ===`);
  for (const [prog, count] of Object.entries(progs)) {
    console.log(`  ${prog}: ${count}`);
  }
}
