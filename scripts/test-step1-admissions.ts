import { deriveFeeAndScholarshipAction } from "../backend/actions/scholarships";
import { queryFinanceAi } from "../backend/ai/ai-finance-engine";
import {  readFinance, getUnifiedStudentContext } from "../backend/services/finance-service";
import { admittedStudents, prospectiveStudents, allStudentsWithProspective } from "../backend/database/finance-data";

async function runAdmissionsTests() {
  console.log("==================================================");
  console.log("TESTING STEP 1: ADMISSION MODES & SCHOLARSHIPS");
  console.log("==================================================");

  // 1. Check data segregation counts
  console.log(`\n1. Data Segregation:`);
  console.log(`   - Admitted Students Count: ${admittedStudents.length}`);
  console.log(`   - Prospective Students Count: ${prospectiveStudents.length}`);
  console.log(`   - Combined Students Count: ${allStudentsWithProspective.length}`);

  if (admittedStudents.length !== 2524) {
    throw new Error(`Expected 2524 admitted students, got ${admittedStudents.length}`);
  }
  if (prospectiveStudents.length !== 24) {
    throw new Error(`Expected 24 prospective students, got ${prospectiveStudents.length}`);
  }

  // 2. Check deriveFeeAndScholarship for all 5 modes
  console.log(`\n2. Single Source of Truth Derivations:`);
  const modes = [
    { mode: "JEE Mains" as const, score: "97.5 %ile" },
    { mode: "V-SAT" as const, score: "Rank 50" },
    { mode: "EAMCET" as const, score: "Rank 4200" },
    { mode: "Reserved/Lower Caste Category" as const, score: "SC Quota" },
    { mode: "Special State Status" as const, score: "NE Quota" },
  ];

  for (const m of modes) {
    const res = await deriveFeeAndScholarshipAction("B.Tech CSE", m.mode, m.score);
    console.log(`   - Mode: ${m.mode} (${m.score}) -> Gross: ₹${res.grossFee}, Scholarship: ₹${res.scholarshipAmount}, Net: ₹${res.netPayable}`);
    console.log(`     Rule: ${res.eligibilityRule}`);
  }

  // 3. Check readFinance topic "admission"
  console.log(`\n3. readFinance('admission'):`);
  const admSummary = readFinance("admission" as any);
  console.log(`   - Summary Rows: ${admSummary.rows.length}`);
  const admAkshat = readFinance("admission" as any, "251FA04E03");
  console.log(`   - Akshat Result: Mode = ${admAkshat.rows.find(r => r.label === "Admission Mode")?.value}`);

  // 4. Test AI Queries (English / Hindi / Hinglish)
  console.log(`\n4. AI Copilot Multilingual Queries:`);

  const queries = [
    {
      label: "Akshat Admission Mode (English)",
      q: "What is Akshat Raj's admission mode and scholarship eligibility?",
      expected: ["V-SAT", "251FA04E03"],
    },
    {
      label: "Akshat Admission Mode (Hinglish)",
      q: "Akshat Raj ka admission mode kya hai aur usko kitna scholarship mila?",
      expected: ["V-SAT", "Admitted"],
    },
    {
      label: "JEE Mains Scholarship Rules (English)",
      q: "What scholarship does a JEE Mains student get?",
      expected: ["JEE Mains", "100%", "95"],
    },
    {
      label: "V-SAT Scholarship Rules (Hinglish)",
      q: "V-SAT scholarship eligibility criteria kya hai?",
      expected: ["V-SAT", "75%", "100"],
    },
    {
      label: "Reserved Category Policy (Hinglish)",
      q: "Reserved lower caste category students ke liye kya scholarship rules hain?",
      expected: ["100%", "Tuition"],
    },
    {
      label: "Special State Status Concession",
      q: "Special state status concession kitna milta hai?",
      expected: ["25%", "Regional"],
    },
    {
      label: "Prospective Students (Hinglish)",
      q: "Prospective students kitne hain aur unka status kya hai?",
      expected: ["24", "Prospective"],
    },
    {
      label: "All Admission Modes (English)",
      q: "What are the approved admission modes at VFSTR?",
      expected: ["V-SAT", "JEE Mains", "EAMCET"],
    },
  ];

  for (const t of queries) {
    const res = await queryFinanceAi(t.q);
    const passed = t.expected.every(k => res.content.toLowerCase().includes(k.toLowerCase()));
    if (!passed) {
      console.error(`❌ [FAIL] ${t.label}\nQuery: "${t.q}"\nGot response:\n${res.content}`);
      throw new Error(`Failed test ${t.label}`);
    } else {
      console.log(`   ✅ [PASS] ${t.label}`);
    }
  }

  console.log("\n==================================================");
  console.log("🎉 ALL ADMISSIONS AND SCHOLARSHIP TESTS PASSED!");
  console.log("==================================================");
}

runAdmissionsTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
