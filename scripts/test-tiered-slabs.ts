import { 
  scholarshipSlabs, 
  feeStructures, 
  deriveFeeAndScholarship, 
  getUnifiedStudentContext,
  admittedStudents,
  prospectiveStudents,
  readFinance
} from "../backend/services/finance-service";
import { queryFinanceAi } from "../backend/ai/ai-finance-engine";

console.log("==================================================");
console.log("🧪 RUNNING TIERED SCHOLARSHIP & ROUTE FILTER SUITE");
console.log("==================================================");

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
    failed++;
  }
}

// ----------------------------------------------------
// TEST SUITE 1: Route Filter Logic on Fee Structures
// ----------------------------------------------------
console.log("\n--- TEST SUITE 1: Fee Structure Admission Route Filter ---");

const testModes = [
  "V-SAT",
  "JEE Mains",
  "EAMCET",
  "Reserved/Lower Caste Category",
  "Special State Status"
];

testModes.forEach(mode => {
  const filtered = feeStructures.filter(row => {
    const rLower = (row.route || "").toLowerCase();
    const mLower = mode.toLowerCase();
    if (mLower.includes("jee")) return rLower.includes("jee");
    if (mLower.includes("v-sat") || mLower.includes("vsat")) return rLower.includes("v-sat") || rLower.includes("vsat");
    if (mLower.includes("eamcet")) return rLower.includes("eamcet");
    if (mLower.includes("reserved")) return rLower.includes("reserved") || (row.category && (row.category.includes("SC") || row.category.includes("BC") || row.category.includes("OBC")));
    if (mLower.includes("special") || mLower.includes("state")) return rLower.includes("special") || rLower.includes("quota") || rLower.includes("state");
    return rLower.includes(mLower);
  });

  assert(filtered.length > 0, `Route filter '${mode}' yields ${filtered.length} row(s)`);
  
  // Verify no cross-contamination (e.g. JEE Mains does NOT include V-SAT only row)
  if (mode === "JEE Mains") {
    const hasVsat = filtered.some(r => r.route === "V-SAT");
    assert(!hasVsat, "JEE Mains filter does not leak V-SAT rows");
  }
  if (mode === "V-SAT") {
    const hasJee = filtered.some(r => r.route === "JEE Mains");
    assert(!hasJee, "V-SAT filter does not leak JEE Mains rows");
  }
});

// ----------------------------------------------------
// TEST SUITE 2: Multi-Tier Slab Structure Verification
// ----------------------------------------------------
console.log("\n--- TEST SUITE 2: Structured Multi-Tier Slabs ---");

assert(scholarshipSlabs.length >= 15, `Total structured slabs: ${scholarshipSlabs.length} (expected >= 15)`);

const vsatSlabs = scholarshipSlabs.filter(s => s.admissionMode === "V-SAT");
assert(vsatSlabs.length >= 4, `V-SAT has ${vsatSlabs.length} tiers (expected >= 4)`);

const jeeSlabs = scholarshipSlabs.filter(s => s.admissionMode === "JEE Mains");
assert(jeeSlabs.length >= 4, `JEE Mains has ${jeeSlabs.length} tiers (expected >= 4)`);

const eamcetSlabs = scholarshipSlabs.filter(s => s.admissionMode === "EAMCET");
assert(eamcetSlabs.length >= 4, `EAMCET has ${eamcetSlabs.length} tiers (expected >= 4)`);

const reservedSlabs = scholarshipSlabs.filter(s => s.admissionMode === "Reserved/Lower Caste Category");
assert(reservedSlabs.length >= 3, `Reserved Category has ${reservedSlabs.length} tiers (expected >= 3)`);

const specialSlabs = scholarshipSlabs.filter(s => s.admissionMode === "Special State Status");
assert(specialSlabs.length >= 3, `Special State Status has ${specialSlabs.length} tiers (expected >= 3)`);

// ----------------------------------------------------
// TEST SUITE 3: Single Derivation Function Across Tiers
// ----------------------------------------------------
console.log("\n--- TEST SUITE 3: Tiered Derivation Logic ---");

// Test V-SAT Rank Bands
const vsatT1 = deriveFeeAndScholarship("B.Tech (CSE)", "V-SAT", 25);
assert(vsatT1.slabPercent === 100, `V-SAT Rank 25 gets 100% waiver (got ${vsatT1.slabPercent}%)`);

const vsatT2 = deriveFeeAndScholarship("B.Tech (CSE)", "V-SAT", 100);
assert(vsatT2.slabPercent === 75, `V-SAT Rank 100 gets 75% waiver (got ${vsatT2.slabPercent}%)`);

const vsatT3 = deriveFeeAndScholarship("B.Tech (CSE)", "V-SAT", 250);
assert(vsatT3.slabPercent === 50, `V-SAT Rank 250 gets 50% waiver (got ${vsatT3.slabPercent}%)`);

const vsatT4 = deriveFeeAndScholarship("B.Tech (CSE)", "V-SAT", 800);
assert(vsatT4.slabPercent === 25, `V-SAT Rank 800 gets 25% waiver (got ${vsatT4.slabPercent}%)`);

// Test JEE Mains Percentiles
const jeeT1 = deriveFeeAndScholarship("B.Tech (CSE)", "JEE Mains", 99.2);
assert(jeeT1.slabPercent === 100, `JEE 99.2%ile gets 100% waiver (got ${jeeT1.slabPercent}%)`);

const jeeT2 = deriveFeeAndScholarship("B.Tech (CSE)", "JEE Mains", 96.5);
assert(jeeT2.slabPercent === 75, `JEE 96.5%ile gets 75% waiver (got ${jeeT2.slabPercent}%)`);

const jeeT3 = deriveFeeAndScholarship("B.Tech (CSE)", "JEE Mains", 92.0);
assert(jeeT3.slabPercent === 50, `JEE 92.0%ile gets 50% waiver (got ${jeeT3.slabPercent}%)`);

const jeeT4 = deriveFeeAndScholarship("B.Tech (CSE)", "JEE Mains", 86.0);
assert(jeeT4.slabPercent === 25, `JEE 86.0%ile gets 25% waiver (got ${jeeT4.slabPercent}%)`);

// Test EAMCET Ranks
const eamcetT1 = deriveFeeAndScholarship("B.Tech (CSE)", "EAMCET", 1500);
assert(eamcetT1.slabPercent === 100, `EAMCET Rank 1500 gets 100% waiver (got ${eamcetT1.slabPercent}%)`);

const eamcetT2 = deriveFeeAndScholarship("B.Tech (CSE)", "EAMCET", 3500);
assert(eamcetT2.slabPercent === 75, `EAMCET Rank 3500 gets 75% waiver (got ${eamcetT2.slabPercent}%)`);

const eamcetT3 = deriveFeeAndScholarship("B.Tech (CSE)", "EAMCET", 7500);
assert(eamcetT3.slabPercent === 50, `EAMCET Rank 7500 gets 50% waiver (got ${eamcetT3.slabPercent}%)`);

// Test Reserved Categories
const resSC = deriveFeeAndScholarship("B.Tech (CSE)", "Reserved/Lower Caste Category", undefined, "SC/ST Statutory Welfare");
assert(resSC.slabPercent === 100, `Reserved SC/ST gets 100% waiver (got ${resSC.slabPercent}%)`);

const resBC = deriveFeeAndScholarship("B.Tech (CSE)", "Reserved/Lower Caste Category", undefined, "BC-A/B State Welfare");
assert(resBC.slabPercent === 50, `Reserved BC-A/B gets 50% waiver (got ${resBC.slabPercent}%)`);

// Test Special State Status
const neQuota = deriveFeeAndScholarship("B.Tech (CSE)", "Special State Status", undefined, "NE Quota (Assam, Meghalaya, etc.)");
assert(neQuota.slabPercent === 30, `NE Quota gets 30% waiver (got ${neQuota.slabPercent}%)`);

const jkQuota = deriveFeeAndScholarship("B.Tech (CSE)", "Special State Status", undefined, "J&K Resident Quota");
assert(jkQuota.slabPercent === 25, `J&K Quota gets 25% waiver (got ${jkQuota.slabPercent}%)`);

// ----------------------------------------------------
// TEST SUITE 4: Consistency Across Sample Students
// ----------------------------------------------------
console.log("\n--- TEST SUITE 4: Cross-App Per-Student Consistency ---");

// 1. Akshat Raj (251FA04E03, V-SAT)
const akshatCtx = getUnifiedStudentContext("251FA04E03");
assert(akshatCtx !== null && akshatCtx.status === "matched", "Akshat Raj exists in unified context");
if (akshatCtx && akshatCtx.status === "matched") {
  assert(akshatCtx.student.admissionMode === "V-SAT", `Akshat mode is V-SAT (got ${akshatCtx.student.admissionMode})`);
  assert(akshatCtx.student.entranceScoreValue === 142, `Akshat V-SAT rank is 142 (got ${akshatCtx.student.entranceScoreValue})`);
  assert(akshatCtx.student.scholarshipPercent === 75, `Akshat scholarship % is 75% (got ${akshatCtx.student.scholarshipPercent}%)`);
  assert(akshatCtx.currentYearDemand === 120000, `Akshat net demand is ₹1,20,000 (got ₹${akshatCtx.currentYearDemand})`);
  
  // Verify instalments sum to net demand
  if (akshatCtx.instalmentPlan) {
    const instSum = akshatCtx.instalmentPlan.instalments.reduce((acc, m) => acc + m.amount, 0);
    assert(instSum === akshatCtx.currentYearDemand, `Akshat instalment milestone sum (₹${instSum}) matches net fee (₹${akshatCtx.currentYearDemand})`);
  }
}

// 2. Ananya Sharma (251FA04E17, JEE Mains)
const ananyaCtx = getUnifiedStudentContext("251FA04E17");
assert(ananyaCtx !== null && ananyaCtx.status === "matched", "Ananya Sharma exists in unified context");
if (ananyaCtx && ananyaCtx.status === "matched") {
  assert(ananyaCtx.student.admissionMode === "JEE Mains", `Ananya mode is JEE Mains (got ${ananyaCtx.student.admissionMode})`);
  assert(ananyaCtx.student.entranceScoreValue === 92.4, `Ananya JEE %ile is 92.4 (got ${ananyaCtx.student.entranceScoreValue})`);
  assert(ananyaCtx.student.scholarshipPercent === 50, `Ananya scholarship % is 50% (got ${ananyaCtx.student.scholarshipPercent}%)`);
}

// 3. Rohan Mehta (251FA04E21, Reserved Category)
const rohanCtx = getUnifiedStudentContext("251FA04E21");
assert(rohanCtx !== null && rohanCtx.status === "matched", "Rohan Mehta exists in unified context");
if (rohanCtx && rohanCtx.status === "matched") {
  assert(rohanCtx.student.admissionMode === "Reserved/Lower Caste Category", `Rohan mode is Reserved/Lower Caste Category (got ${rohanCtx.student.admissionMode})`);
  assert(rohanCtx.student.entranceQuotaCategory === "BC-A/B", `Rohan quota is BC-A/B (got ${rohanCtx.student.entranceQuotaCategory})`);
  assert(rohanCtx.student.scholarshipPercent === 50, `Rohan scholarship % is 50% (got ${rohanCtx.student.scholarshipPercent}%)`);
}

// 4. Special State Student
const specialStateStudent = admittedStudents.find(s => s.admissionMode === "Special State Status");
assert(!!specialStateStudent, `Found Special State student: ${specialStateStudent?.name} (${specialStateStudent?.id})`);
if (specialStateStudent) {
  const ssCtx = getUnifiedStudentContext(specialStateStudent.id);
  assert(ssCtx !== null && ssCtx.status === "matched" && ssCtx.student.scholarshipPercent !== undefined, `Special State student has derived scholarship percent: ${ssCtx?.status === "matched" ? ssCtx.student.scholarshipPercent : 0}%`);
}

// ----------------------------------------------------
// TEST SUITE 5: AI Engine Derivation Harmony
// ----------------------------------------------------
console.log("\n--- TEST SUITE 5: AI Engine Derivation Harmony ---");

async function runAiTests() {
  const aiRes1 = await queryFinanceAi("What scholarship does a JEE Mains student get?");
  assert(aiRes1.content.includes("98") || aiRes1.content.includes("95") || aiRes1.content.includes("100%"), "AI outputs multi-tier JEE slab (>98%ile -> 100%)");

  const aiRes2 = await queryFinanceAi("V-SAT scholarship eligibility criteria kya hai?");
  assert(aiRes2.content.includes("V-SAT") && (aiRes2.content.includes("75%") || aiRes2.content.includes("100%")), "AI outputs multi-tier V-SAT slab");

  const aiRes3 = await queryFinanceAi("What is Akshat Raj's admission mode and scholarship eligibility?");
  assert(aiRes3.content.includes("V-SAT") && aiRes3.content.includes("251FA04E03"), "AI correctly reports Akshat's V-SAT admission info");

  console.log("\n==================================================");
  console.log(`RESULTS: Passed: ${passed} | Failed: ${failed}`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runAiTests();

