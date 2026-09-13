import assert from "node:assert";
import {
  getStudentAcademicHistory,
  computeScholarshipEligibilityTimeline,
  getUnifiedStudentContext,
  readFinance,
} from "../backend/services/finance-service";
import { queryFinanceAi } from "../backend/ai/ai-finance-engine";

async function runStep3Tests() {
  console.log("==================================================");
  console.log("TESTING STEP 3: ACADEMIC HISTORY & AUTO-RECALCULATION");
  console.log("==================================================");

  // -------------------------------------------------------------
  // Test 1: Benchmark Students History & Discontinuation Logic
  // -------------------------------------------------------------
  console.log("\n[Test 1] Benchmark Student Timelines & Discontinuation Thresholds (7.0 Threshold):");

  // 1. Akshat Raj (251FA04E03) - Consistent High CGPA
  const akshatTimeline = computeScholarshipEligibilityTimeline("251FA04E03");
  assert.strictEqual(akshatTimeline.isDiscontinued, false, "Akshat scholarship must NOT be discontinued");
  assert.strictEqual(akshatTimeline.currentStatus, "Active", "Akshat current status should be Active");
  assert.strictEqual(akshatTimeline.history.length, 3, "Akshat has 3 semester records");
  assert.ok(akshatTimeline.history.every(s => s.cumulativeCgpa >= 8.5), "Akshat maintains CGPA >= 8.5");
  console.log("  ✔ Akshat Raj: Active (CGPA 8.63 >= 7.0, scholarship retained)");

  // 2. Ananya Sharma (251FA04E17) - Drops to 6.70 in Sem 3 -> Discontinued
  const ananyaTimeline = computeScholarshipEligibilityTimeline("251FA04E17");
  assert.strictEqual(ananyaTimeline.isDiscontinued, true, "Ananya scholarship MUST be discontinued");
  assert.strictEqual(ananyaTimeline.currentStatus, "Discontinued", "Ananya status should be Discontinued");
  assert.ok(ananyaTimeline.discontinuationReason?.includes("6.70"), "Discontinuation reason notes CGPA 6.70");
  assert.strictEqual(ananyaTimeline.discontinuationSemester?.semLabel, "Sem 3 (Jul–Nov 2026)", "Discontinued in Sem 3");
  const ananyaSem3 = ananyaTimeline.history.find(s => s.semNo === 3);
  assert.strictEqual(ananyaSem3?.scholarshipApplied, 0, "Sem 3 scholarship amount must be 0");
  assert.strictEqual(ananyaSem3?.netDemand, ananyaSem3?.grossFee, "Sem 3 net demand must equal gross fee");
  console.log("  ✔ Ananya Sharma: Auto-Discontinued (Sem 3 CGPA 6.70 < 7.0 -> Full gross fee applied)");

  // 3. Rohan Mehta (251FA04E21) - Reserved Quota Performer
  const rohanTimeline = computeScholarshipEligibilityTimeline("251FA04E21");
  assert.strictEqual(rohanTimeline.isDiscontinued, false, "Rohan scholarship must NOT be discontinued");
  assert.strictEqual(rohanTimeline.currentStatus, "Active", "Rohan status should be Active");
  console.log("  ✔ Rohan Mehta: Active (Maintains CGPA 7.97 >= 7.0, quota grant retained)");

  // 4. Annavarapu Yash (241FA04711) - 2nd Year Sem 3 CGPA 6.87 -> Discontinued
  const yashTimeline = computeScholarshipEligibilityTimeline("241FA04711");
  assert.strictEqual(yashTimeline.isDiscontinued, true, "Yash scholarship MUST be discontinued");
  assert.strictEqual(yashTimeline.currentStatus, "Discontinued", "Yash status should be Discontinued");
  assert.ok(yashTimeline.discontinuationReason?.includes("6.87"), "Reason notes CGPA 6.87");
  console.log("  ✔ Annavarapu Yash: Auto-Discontinued (Sem 3 CGPA 6.87 < 7.0 -> Scholarship revoked)");

  // 5. Kavya Reddy / Special State (251FA04E33) - Warning Zone (7.0 <= CGPA < 7.5) -> AtRisk, NOT discontinued
  const kavyaTimeline = computeScholarshipEligibilityTimeline("251FA04E33");
  assert.strictEqual(kavyaTimeline.isDiscontinued, false, "Kavya scholarship must NOT be discontinued");
  assert.strictEqual(kavyaTimeline.currentStatus, "AtRisk", "Kavya status should be AtRisk");
  assert.ok(kavyaTimeline.history[2].scholarshipApplied > 0, "Kavya retains scholarship in warning corridor");
  console.log("  ✔ Kavya Reddy: AtRisk warning zone (CGPA 7.40 in 7.0–7.5 range -> Scholarship retained)");

  // -------------------------------------------------------------
  // Test 2: Unified Student Context Integration
  // -------------------------------------------------------------
  console.log("\n[Test 2] Unified Student Context Integration:");
  const akshatUnified = getUnifiedStudentContext("251FA04E03");
  assert.strictEqual(akshatUnified.status, "matched");
  if (akshatUnified.status === "matched") {
    assert.ok(Array.isArray(akshatUnified.academicHistory), "academicHistory is an array");
    assert.strictEqual(akshatUnified.isScholarshipDiscontinued, false);
    assert.strictEqual(akshatUnified.scholarshipTimeline.currentStatus, "Active");
  }

  const ananyaUnified = getUnifiedStudentContext("251FA04E17");
  assert.strictEqual(ananyaUnified.status, "matched");
  if (ananyaUnified.status === "matched") {
    assert.strictEqual(ananyaUnified.isScholarshipDiscontinued, true);
    assert.ok(ananyaUnified.scholarshipEligibilityNote?.includes("Discontinued"), "Eligibility note alerts discontinuation");
  }
  console.log("  ✔ Unified context correctly exposes academicHistory, scholarshipTimeline, and isScholarshipDiscontinued");

  // -------------------------------------------------------------
  // Test 3: readFinance('academicHistory') Service API
  // -------------------------------------------------------------
  console.log("\n[Test 3] readFinance Topic 'academicHistory':");
  const readAnanya = readFinance("academicHistory", "251FA04E17");
  assert.ok(readAnanya.rows.some(r => r.label === "Scholarship Status" && r.value === "DISCONTINUED"));
  assert.ok(readAnanya.rows.some(r => r.label === "Discontinuation Reason" && r.value.includes("6.70")));

  const readAkshat = readFinance("academicHistory", "251FA04E03");
  assert.ok(readAkshat.rows.some(r => r.label === "Scholarship Status" && r.value === "ACTIVE"));
  console.log("  ✔ readFinance correctly outputs semester timeline rows and status for both active and discontinued students");

  // -------------------------------------------------------------
  // Test 4: AI Copilot Multilingual Intelligence
  // -------------------------------------------------------------
  console.log("\n[Test 4] AI Copilot Academic History & Discontinuation Reasoning:");

  const queries = [
    {
      label: "Ananya Discontinuation Cause (English)",
      q: "Why was Ananya Sharma's scholarship discontinued?",
      expected: ["6.70", "DISCONTINUED"],
    },
    {
      label: "Ananya CGPA & History (Hinglish)",
      q: "Ananya Sharma ka CGPA history kya hai aur scholarship kyu band hua?",
      expected: ["DISCONTINUED", "6.70"],
    },
    {
      label: "Akshat Academic Progression",
      q: "What is Akshat Raj's semester academic performance and CGPA?",
      expected: ["8.60", "ACTIVE"],
    },
    {
      label: "General Discontinued Scholarships Query",
      q: "Which students lost their scholarship this year?",
      expected: ["Ananya Sharma", "Annavarapu Yash"],
    },
  ];

  for (const tc of queries) {
    const res = await queryFinanceAi(tc.q);
    console.log(`  - Query: "${tc.q}"`);
    for (const exp of tc.expected) {
      assert.ok(
        res.content.toLowerCase().includes(exp.toLowerCase()),
        `Expected response to include "${exp}" for test "${tc.label}"`
      );
    }
    console.log(`    ✔ Passed: Matched [${tc.expected.join(", ")}]`);
  }

  console.log("\n==================================================");
  console.log("ALL STEP 3 TESTS PASSED PERFECTLY!");
  console.log("==================================================");
}

runStep3Tests().catch((err) => {
  console.error("Step 3 Test Failure:", err);
  process.exit(1);
});
