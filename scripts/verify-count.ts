import { students } from "../backend/database/finance-data";
import { benchmarkSemesterHistories } from "../backend/database/semester-academic-history";

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Explicit benchmark states to preserve test suite harmony:
// Akshat Raj: current due only, carried = 0
// Vishnu: all clean, carried = 0
// Ananya: all clean, carried = 0
// Chaitanya: carried = 8000
// Siddharth: carried = 20000
// Aditya: carried = 20000
const explicitClean = new Set(["251FA04E03", "251FA04777", "251FA04E17"]);
const explicitCarry = new Set(["251FA04E58", "251FA04E36", "251FA04E42"]);

let count = 0;
for (const s of students) {
  if (explicitClean.has(s.id)) continue;
  if (explicitCarry.has(s.id)) {
    count++;
    continue;
  }
  const h = hashStr(s.id);
  if (h % 100 < 40) {
    count++;
  }
}

console.log(`Total students with carried-forward dues: ${count} (out of ${students.length})`);
