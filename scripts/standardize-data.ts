import fs from "fs";
import path from "path";

const baseDir = path.resolve(__dirname, "../backend/database");

console.log("🚀 Starting Registration Number Standardization & Branch Balancing...");

// Map ID function:
// 2404518 -> 241FA04518
// 2304711 -> 231FA04711
// 2204631 -> 221FA04631
// 25M4788 -> 251FAM4788
// 251FA... -> untouched
function mapId(oldId: string): string {
  if (oldId.startsWith("251FA")) return oldId;
  if (oldId.startsWith("24")) return "241FA" + oldId.slice(2);
  if (oldId.startsWith("23")) return "231FA" + oldId.slice(2);
  if (oldId.startsWith("22")) return "221FA" + oldId.slice(2);
  if (oldId.startsWith("25M")) return "251FAM" + oldId.slice(3);
  return oldId;
}

const targetUgProgrammes = [
  "B.Tech CSE",
  "B.Tech ECE",
  "B.Tech IT",
  "B.Tech EEE",
  "B.Tech Mechanical",
  "B.Tech Civil",
  "Biotechnology",
  "B.Pharmacy",
  "BBA",
  "MBA"
];

// Preserved core benchmark students
const preservedProgrammes: Record<string, string> = {
  "251FA04E03": "B.Tech CSE",
  "251FA04E17": "B.Tech CSE",
  "251FA04E21": "MBA",
  "251FA04645": "B.Tech CSE",
};

// 1. Process Batch files
const batchKeys = [
  { key: "year2-sem3", ug: true },
  { key: "year3-sem5", ug: true },
  { key: "year4-sem7", ug: true },
  { key: "mtech-year1-sem1", ug: false },
];

for (const b of batchKeys) {
  // 1a. finance-data-<key>.ts
  const fDataPath = path.join(baseDir, `finance-data-${b.key}.ts`);
  if (fs.existsSync(fDataPath)) {
    let content = fs.readFileSync(fDataPath, "utf-8");
    // Replace IDs: id: "2404518" -> id: "241FA04518"
    content = content.replace(/id:\s*"([^"]+)"/g, (match, id) => {
      return `id: "${mapId(id)}"`;
    });
    
    // If UG batch, balance branches evenly
    if (b.ug) {
      let progIdx = 0;
      content = content.replace(/programme:\s*"([^"]+)"/g, (match, currentProg) => {
        const nextProg = targetUgProgrammes[progIdx % targetUgProgrammes.length];
        progIdx++;
        return `programme: "${nextProg}"`;
      });
    }

    fs.writeFileSync(fDataPath, content, "utf-8");
    console.log(`✅ Updated finance-data-${b.key}.ts`);
  }

  // 1b. fee-allocations-<key>.ts
  const fAllocPath = path.join(baseDir, `fee-allocations-${b.key}.ts`);
  if (fs.existsSync(fAllocPath)) {
    let content = fs.readFileSync(fAllocPath, "utf-8");
    content = content.replace(/"([0-9A-Za-z]+)":\s*\[/g, (match, id) => {
      return `"${mapId(id)}": [`;
    });
    fs.writeFileSync(fAllocPath, content, "utf-8");
    console.log(`✅ Updated fee-allocations-${b.key}.ts`);
  }

  // 1c. scholarship-status-<key>.ts
  const fSchPath = path.join(baseDir, `scholarship-status-${b.key}.ts`);
  if (fs.existsSync(fSchPath)) {
    let content = fs.readFileSync(fSchPath, "utf-8");
    content = content.replace(/"([0-9A-Za-z]+)":\s*\{/g, (match, id) => {
      return `"${mapId(id)}": {`;
    });
    fs.writeFileSync(fSchPath, content, "utf-8");
    console.log(`✅ Updated scholarship-status-${b.key}.ts`);
  }

  // 1d. payment-receipts-<key>.ts
  const fRcptPath = path.join(baseDir, `payment-receipts-${b.key}.ts`);
  if (fs.existsSync(fRcptPath)) {
    let content = fs.readFileSync(fRcptPath, "utf-8");
    content = content.replace(/"([0-9A-Za-z]+)":\s*\[/g, (match, id) => {
      return `"${mapId(id)}": [`;
    });
    fs.writeFileSync(fRcptPath, content, "utf-8");
    console.log(`✅ Updated payment-receipts-${b.key}.ts`);
  }
}

// 2. Process Year 1 students in finance-data.ts to balance branches across B.Pharmacy, BBA, etc.
const fDataMain = path.join(baseDir, "finance-data.ts");
let mainContent = fs.readFileSync(fDataMain, "utf-8");

// Parse year1StudentsRaw block and balance programmes
let progIdx = 0;
mainContent = mainContent.replace(
  /(\{"id":"([^"]+)","name":"[^"]+",)"programme":"[^"]+"/g,
  (fullMatch, prefix, id) => {
    if (preservedProgrammes[id]) {
      return `${prefix}"programme":"${preservedProgrammes[id]}"`;
    }
    const assignedProg = targetUgProgrammes[progIdx % targetUgProgrammes.length];
    progIdx++;
    return `${prefix}"programme":"${assignedProg}"`;
  }
);

fs.writeFileSync(fDataMain, mainContent, "utf-8");
console.log("✅ Updated Year 1 student branch distribution in finance-data.ts");

console.log("\n🎉 ALL FILES SUCCESSFULLY STANDARDIZED WITH 1FA REGISTRATION NUMBERS AND BALANCED PROGRAMMES!");
