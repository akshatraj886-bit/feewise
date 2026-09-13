import { benchmarkSemesterHistories, computeSemesterCarryForward } from "../backend/database/semester-academic-history";

for (const [id, history] of Object.entries(benchmarkSemesterHistories)) {
  const res = computeSemesterCarryForward(history);
  console.log(`Student ${id}: Cur=${res.currentSemesterDue}, Carry=${res.carriedForwardDue}, Total=${res.totalOutstandingDue}, HasCarry=${res.hasCarriedForward}`);
}
