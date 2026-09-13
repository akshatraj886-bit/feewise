import { students } from "../backend/database/finance-data";

const idCounts: Record<string, number> = {};
const duplicates: string[] = [];

for (const s of students) {
  idCounts[s.id] = (idCounts[s.id] || 0) + 1;
  if (idCounts[s.id] === 2) {
    duplicates.push(s.id);
  }
}

console.log("Total students in array:", students.length);
console.log("Unique IDs count:", Object.keys(idCounts).length);
console.log("Duplicate IDs count:", duplicates.length);
if (duplicates.length > 0) {
  console.log("Duplicate IDs:", duplicates);
  for (const dup of duplicates) {
    const matches = students.filter(s => s.id === dup);
    console.log(`Matches for ${dup}:`, matches.map(m => ({ name: m.name, programme: m.programme })));
  }
}
