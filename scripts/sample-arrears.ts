import { students } from "../backend/database/finance-data";

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const withCarry: string[] = [];
const withoutCarry: string[] = [];

for (const s of students) {
  const h = hashStr(s.id);
  if (h % 100 < 40) {
    withCarry.push(s.id);
  } else {
    withoutCarry.push(s.id);
  }
}

console.log(`With Carried Arrears: ${withCarry.length}`);
console.log(`Without Carried Arrears: ${withoutCarry.length}`);
console.log("Sample 5 with arrears:");
for (let i = 0; i < 5; i++) {
  const s = students.find(x => x.id === withCarry[i]);
  console.log(` - ${s?.id}: ${s?.name} (${s?.programme})`);
}
