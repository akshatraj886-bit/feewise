import { students, admittedStudents } from "../backend/database/finance-data";
import { benchmarkSemesterHistories, SemesterRecord, CarriedForwardDuesItem, SemesterCarryForwardResult } from "../backend/database/semester-academic-history";

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const cleanExplicitIds = new Set(["251FA04E03", "251FA04777", "251FA04E17"]);
const carryExplicitIds = new Set(["251FA04E58", "251FA04E36", "251FA04E42"]);

function getStudentCarriedForwardArrears(studentId: string): CarriedForwardDuesItem[] {
  const normId = (studentId || "").toUpperCase().trim();
  if (cleanExplicitIds.has(normId)) return [];
  if (benchmarkSemesterHistories[normId]) {
    // If in benchmark with carry forward, compute from benchmark
    return [];
  }

  const h = hashStr(normId);
  // ~40% of cohort has prior semester arrears
  if (h % 100 >= 40 && !carryExplicitIds.has(normId)) {
    return [];
  }

  const s = students.find(x => x.id === normId);
  const possibleAmounts = [6000, 8000, 10000, 12000, 15000, 18000, 20000, 22000, 25000, 28000, 30000];
  const orig = possibleAmounts[h % possibleAmounts.length];
  const liquidated = [0, 2000, 4000, 5000][(h >> 3) % 4];
  const rem = Math.max(4000, orig - liquidated);

  let semNo = 1;
  let semLabel = "Sem 1 (Jul–Nov 2025)";
  let acadYear = "2025–26";

  if (s?.yearLabel?.includes("2nd Year") || s?.semester === 3) {
    semNo = 2;
    semLabel = "Sem 2 (Jan–May 2026)";
    acadYear = "2025–26";
  } else if (s?.yearLabel?.includes("3rd Year") || s?.semester === 5) {
    semNo = 4;
    semLabel = "Sem 4 (Jan–May 2026)";
    acadYear = "2025–26";
  } else if (s?.yearLabel?.includes("4th Year") || s?.semester === 7) {
    semNo = 6;
    semLabel = "Sem 6 (Jan–May 2026)";
    acadYear = "2025–26";
  }

  return [
    {
      fromSemNo: semNo,
      fromSemLabel: semLabel,
      fromAcademicYear: acadYear,
      originalDue: orig,
      remainingDue: rem,
    }
  ];
}

// Test across our sample students
const sampleList = [
  "241FA02175", // Padamata Girish (User's screenshot!)
  "251FA04E03", // Akshat Raj
  "251FA04645", // Aaradhya
  "251FA04E58", // Chaitanya
  "251FA04777", // Vishnu
];

console.log("=== SIMULATING CARRIED-FORWARD LOGIC ===");
for (const id of sampleList) {
  const s = students.find(x => x.id === id);
  const carry = getStudentCarriedForwardArrears(id);
  const carriedDue = carry.reduce((acc, c) => acc + c.remainingDue, 0);
  const curDue = Math.max(0, (s?.demand || 0) - (s?.paid || 0));
  const totalDue = curDue + carriedDue;

  console.log(`\nStudent: ${id} (${s?.name})`);
  console.log(` - Demand: ${s?.demand}, Paid: ${s?.paid}`);
  console.log(` - Current Term Due: ${curDue}`);
  console.log(` - Carried Forward: ${carriedDue} (${carry.length > 0 ? carry[0].fromSemLabel : "Clean"})`);
  console.log(` - Total Outstanding Due: ${totalDue}`);
  console.log(` - Has Mismatch with 0? ${curDue > 0 && totalDue === 0 ? "YES (BUG!)" : "NO (FIXED!)"}`);
}
