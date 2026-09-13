import { students } from "../backend/database/finance-data";

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const carryStudents = students.filter(s => hashStr(s.id) % 100 < 40);
console.log(`Found ${carryStudents.length} carry students. First 5:`);
carryStudents.slice(0, 5).forEach(s => {
  console.log(`- ${s.id} (${s.name}): Demand=${s.demand}, Paid=${s.paid}, CurDue=${s.demand - s.paid}`);
});
