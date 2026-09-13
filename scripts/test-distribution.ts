import { students } from "../backend/database/finance-data";

// Simple deterministic hash for student ID
function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Check how many students get carried-forward dues if condition is (hash % 100 < 40)
let count = 0;
for (const s of students) {
  const h = hashStr(s.id);
  // ~40% gets previous dues
  if (h % 100 < 40) {
    count++;
  }
}

console.log(`Total students: ${students.length}`);
console.log(`Students selected for carried-forward dues (40% threshold): ${count}`);
