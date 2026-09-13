import {
  queryFinanceAi,
  detectNavigationIntent,
  findMentionedStudents,
  type AgentContext,
} from "../backend/ai/ai-finance-engine";
import { allStudentsWithProspective } from "../backend/database/finance-data";

async function runTests() {
  console.log("===============================================================");
  console.log("🧪 TESTING UNIFIED DATABASE GROUNDING & AUTONOMOUS NAVIGATION");
  console.log("===============================================================\n");

  console.log(`✅ Total Authoritative Database Count: ${allStudentsWithProspective.length} students.`);
  if (allStudentsWithProspective.length < 500) {
    throw new Error(`Expected at least 500 students, found ${allStudentsWithProspective.length}`);
  }

  // -------------------------------------------------------------
  // Test 1: Navigation Intent Detection across multiple views & languages
  // -------------------------------------------------------------
  console.log("\n--- TEST 1: Autonomous Navigation Intent Detection ---");
  const navTestCases = [
    { query: "students section me chalo", expectedView: "Students" },
    { query: "bhai fee structure kholo", expectedView: "Fee Structure" },
    { query: "reconciliation dikhao", expectedView: "Reconciliation" },
    { query: "payments me le jao", expectedView: "Payments" },
    { query: "instalments section open karo", expectedView: "Instalments" },
    { query: "smart reminders desk pe jao", expectedView: "Smart Reminders" },
    { query: "scholarship risks kholo", expectedView: "Scholarship Risks" },
    { query: "counsellor desk dikhao", expectedView: "Counsellor Desk" },
    { query: "admit card section me chalo", expectedView: "Admit Cards" },
    { query: "loan requests page open karo", expectedView: "Loan Requests" },
    { query: "refunds page pe le chal", expectedView: "Refunds" },
    { query: "reports kholo", expectedView: "Reports" },
    { query: "dashboard pe chalo", expectedView: "Dashboard" },
    { query: "Akshat Raj ka account kholo", expectedView: "Students", expectedStudentId: "251FA04E03" },
    { query: "Dharanikota Aaradhya ka profile dikhao", expectedView: "Students", expectedStudentId: "251FA04645" },
    { query: "TXN-10483 review karo", expectedView: "Payments", expectedTxnId: "TXN-10483" },
  ];

  for (const tc of navTestCases) {
    const res = detectNavigationIntent(tc.query, allStudentsWithProspective);
    const passView = res.wantsNav && res.targetView === tc.expectedView;
    const passStudent = !tc.expectedStudentId || res.studentId === tc.expectedStudentId;
    const passTxn = !tc.expectedTxnId || res.transactionId === tc.expectedTxnId;

    if (passView && passStudent && passTxn) {
      console.log(`  ✅ [PASS] "${tc.query}" -> View: ${res.targetView}${res.studentId ? ` (Student: ${res.studentId})` : ""}${res.transactionId ? ` (Txn: ${res.transactionId})` : ""}`);
    } else {
      console.error(`  ❌ [FAIL] "${tc.query}" -> Expected View: ${tc.expectedView}, got: ${res.targetView} (wantsNav: ${res.wantsNav}, studentId: ${res.studentId})`);
      process.exit(1);
    }
  }

  // -------------------------------------------------------------
  // Test 2: Student Identity Resolution from Real Database
  // -------------------------------------------------------------
  console.log("\n--- TEST 2: Student Identity Resolution from Unified Database ---");
  const studentChecks = [
    { query: "Akshat Raj ka dues", expectedId: "251FA04E03", expectedName: "Akshat Raj" },
    { query: "251FA04645", expectedId: "251FA04645", expectedName: "Dharanikota Aaradhya" },
    { query: "Jonnalagadda Mounika", expectedId: "251FA04852", expectedName: "Jonnalagadda Mounika" },
    { query: "Chaitanya Varma", expectedId: "251FA04E58", expectedName: "Chaitanya Varma" },
  ];

  for (const sc of studentChecks) {
    const matches = findMentionedStudents(sc.query, allStudentsWithProspective);
    if (matches.length > 0 && matches[0].id === sc.expectedId) {
      console.log(`  ✅ [PASS] "${sc.query}" -> Matched: ${matches[0].name} (${matches[0].id})`);
    } else {
      console.error(`  ❌ [FAIL] "${sc.query}" -> Expected ${sc.expectedName} (${sc.expectedId}), got: ${matches[0]?.name}`);
      process.exit(1);
    }
  }

  // -------------------------------------------------------------
  // Test 3: Non-Existent Student returns Zero-Hallucination / Not Found
  // -------------------------------------------------------------
  console.log("\n--- TEST 3: Zero-Hallucination for Non-Existent Student ---");
  const fakeStudentQuery = "Rahul Sharma ka fees kitna hai?";
  const fakeMatches = findMentionedStudents(fakeStudentQuery, allStudentsWithProspective);
  if (fakeMatches.length === 0) {
    console.log(`  ✅ [PASS] "${fakeStudentQuery}" correctly NOT matched to any student in database.`);
  } else {
    console.error(`  ❌ [FAIL] Fake student falsely matched:`, fakeMatches);
    process.exit(1);
  }

  // -------------------------------------------------------------
  // Test 4: queryFinanceAi Execution with Live Grounding & Navigation
  // -------------------------------------------------------------
  console.log("\n--- TEST 4: Engine Query Response Execution ---");
  const context: AgentContext = {
    role: "admin",
    liveStudents: allStudentsWithProspective,
  };

  // 4a. Real student query
  const resReal = await queryFinanceAi("Akshat Raj ka dues kitna hai", [], "", context);
  console.log("  Response for real student (Akshat Raj):");
  console.log("  " + resReal.content.split("\n")[0]);
  if (!resReal.content.includes("Akshat") || !resReal.content.includes("251FA04E03")) {
    console.error("  ❌ Real student details missing from response!");
    process.exit(1);
  }
  console.log("  ✅ Real student data verified.");

  // 4b. Non-existent student query (must state not found, not hallucinate)
  const resFake = await queryFinanceAi("Rahul Sharma ka fees kitna hai batao", [], "", context);
  console.log("  Response for non-existent student (Rahul Sharma):");
  console.log("  " + resFake.content.split("\n")[0]);
  if (!resFake.content.toLowerCase().includes("nahi") && !resFake.content.toLowerCase().includes("not found")) {
    console.error("  ❌ Fake student was not correctly rejected as not found!");
    process.exit(1);
  }
  console.log("  ✅ Non-existent student correctly rejected without hallucination.");

  // 4c. Navigation query (must return navigation object, no manual clicking steps)
  const resNav = await queryFinanceAi("students section me chalo", [], "", context);
  console.log("  Navigation payload for 'students section me chalo':", resNav.navigation);
  if (!resNav.navigation || resNav.navigation.view !== "Students") {
    console.error("  ❌ Navigation payload missing or target view incorrect!");
    process.exit(1);
  }
  if (/step 1|click on sidebar|left sidebar/i.test(resNav.content)) {
    console.error("  ❌ Response contained manual UI steps instead of direct navigation!");
    process.exit(1);
  }
  console.log("  ✅ Navigation executed autonomously without manual clicking steps.");

  // 4d. Student Drawer navigation query ("Akshat Raj ka account kholo")
  const resDrawer = await queryFinanceAi("Akshat Raj ka account kholo", [], "", context);
  console.log("  Navigation payload for 'Akshat Raj ka account kholo':", resDrawer.navigation);
  if (!resDrawer.navigation || resDrawer.navigation.view !== "Students" || resDrawer.navigation.studentId !== "251FA04E03") {
    console.error("  ❌ Student drawer navigation failed!");
    process.exit(1);
  }
  console.log("  ✅ Student account drawer navigation executed autonomously.");

  console.log("\n===============================================================");
  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
  console.log("===============================================================");
}

runTests().catch((err) => {
  console.error("❌ Test failed with error:", err);
  process.exit(1);
});
