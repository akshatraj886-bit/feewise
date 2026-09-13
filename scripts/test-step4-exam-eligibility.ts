import assert from "node:assert";
import {
  getStudentExamEligibility,
  getStudentPermissionRequests,
  createPermissionRequest,
  updatePermissionRequestStatus,
  getAllPermissionRequests,
  getUnifiedStudentContext,
  readFinance,
} from "../backend/services/finance-service";
import { queryFinanceAi } from "../backend/ai/ai-finance-engine";

async function runStep4Tests() {
  console.log("================================================================================");
  console.log("TESTING STEP 4: ATTENDANCE & DUES EXAM-ELIGIBILITY + ONLINE PERMISSION FLOW");
  console.log("================================================================================");

  // -------------------------------------------------------------
  // Test 1: Dual Statutory Criteria & All 4 Ineligibility Categories
  // -------------------------------------------------------------
  console.log("\n[Test 1] Single Source of Truth Exam Eligibility Checks Across 4 Categories:");

  // 1.1 Category: Eligible (Dues = 0, Attendance >= 75.0%)
  const vishnu = getStudentExamEligibility("251FA04777");
  assert.strictEqual(vishnu.isEligible, true, "Vishnu must be eligible for exams");
  assert.strictEqual(vishnu.status, "Eligible", "Status must be 'Eligible'");
  assert.strictEqual(vishnu.ineligibleCategory, "None", "Ineligibility category must be None");
  assert.strictEqual(vishnu.outstandingDues, 0, "Vishnu has 0 dues");
  assert.ok(vishnu.currentAttendance >= 75.0, "Vishnu attendance >= 75%");
  assert.strictEqual(vishnu.cfoVerified, true, "CFO verification flag must be true");
  console.log(`  ✔ Eligible (Murakonda Vishnu): Dues ₹0, Attendance ${vishnu.currentAttendance}% -> Exam Cleared`);

  // 1.2 Category: DuesOnly (Dues > 0, Attendance >= 75.0%)
  const akshat = getStudentExamEligibility("251FA04E03");
  assert.strictEqual(akshat.isEligible, false, "Akshat must be NOT eligible due to outstanding dues");
  assert.strictEqual(akshat.status, "Not Eligible", "Status must be 'Not Eligible'");
  assert.strictEqual(akshat.ineligibleCategory, "DuesOnly", "Category must be DuesOnly");
  assert.strictEqual(akshat.ineligibilityReason, "DuesOnly", "ineligibilityReason alias must match");
  assert.strictEqual(akshat.outstandingDues, 28000, "Akshat dues must be 28,000");
  assert.ok(akshat.currentAttendance >= 75.0, `Akshat attendance (${akshat.currentAttendance}%) is compliant`);
  console.log(`  ✔ Ineligible: DuesOnly (Akshat Raj): Dues ₹${akshat.outstandingDues}, Attendance ${akshat.currentAttendance}% -> Withheld`);

  // 1.3 Category: AttendanceOnly (Dues = 0, Attendance < 75.0%)
  const aaradhya = getStudentExamEligibility("251FA04645");
  assert.strictEqual(aaradhya.isEligible, false, "Aaradhya must be NOT eligible due to short attendance");
  assert.strictEqual(aaradhya.status, "Not Eligible", "Status must be 'Not Eligible'");
  assert.strictEqual(aaradhya.ineligibleCategory, "AttendanceOnly", "Category must be AttendanceOnly");
  assert.strictEqual(aaradhya.outstandingDues, 0, "Aaradhya dues must be 0");
  assert.ok(aaradhya.currentAttendance < 75.0, `Aaradhya attendance (${aaradhya.currentAttendance}%) must be < 75.0%`);
  console.log(`  ✔ Ineligible: AttendanceOnly (Dharanikota Aaradhya): Dues ₹0, Attendance ${aaradhya.currentAttendance}% -> Withheld`);

  // 1.4 Category: Both (Dues > 0, Attendance < 75.0%)
  const spoorthi = getStudentExamEligibility("251FA04001");
  assert.strictEqual(spoorthi.isEligible, false, "Spoorthi must be NOT eligible due to dual criteria breach");
  assert.strictEqual(spoorthi.status, "Not Eligible", "Status must be 'Not Eligible'");
  assert.strictEqual(spoorthi.ineligibleCategory, "Both", "Category must be Both");
  assert.ok(spoorthi.outstandingDues > 0, "Spoorthi has positive dues");
  assert.ok(spoorthi.currentAttendance < 75.0, "Spoorthi attendance is below 75%");
  console.log(`  ✔ Ineligible: Both (Jampani Spoorthi): Dues ₹${spoorthi.outstandingDues}, Attendance ${spoorthi.currentAttendance}% -> Withheld (Dual)`);

  // -------------------------------------------------------------
  // Test 2: Permission Request Submission, Snapshotting & Tracking
  // -------------------------------------------------------------
  console.log("\n[Test 2] Permission Requests Seed Data & Mutation Lifecycle:");

  // 2.1 Seeded requests check
  const akshatRequests = getStudentPermissionRequests("251FA04E03");
  assert.ok(akshatRequests.length >= 1, "Akshat must have at least 1 permission request");
  const req1 = akshatRequests.find(r => r.id === "REQ-2026-001");
  assert.ok(req1, "REQ-2026-001 exists");
  assert.strictEqual(req1?.status, "Pending", "REQ-2026-001 status is Pending");
  assert.strictEqual(req1?.snapshottedDues, 28000, "Snapshotted dues match");
  console.log(`  ✔ Seeded Pending Request: REQ-2026-001 for 251FA04E03 (Status: Pending, Snapshotted Dues: ₹${req1?.snapshottedDues})`);

  const ananyaRequests = getStudentPermissionRequests("251FA04E17");
  const req2 = ananyaRequests.find(r => r.id === "REQ-2026-002");
  assert.ok(req2, "REQ-2026-002 exists");
  assert.strictEqual(req2?.status, "Approved", "REQ-2026-002 is Approved");
  console.log(`  ✔ Seeded Approved Request: REQ-2026-002 for 251FA04E17 (Status: Approved by ${req2?.reviewedBy})`);

  const yashRequests = getStudentPermissionRequests("241FA04711");
  const req3 = yashRequests.find(r => r.id === "REQ-2026-003");
  assert.ok(req3, "REQ-2026-003 exists");
  assert.strictEqual(req3?.status, "Rejected", "REQ-2026-003 is Rejected");
  assert.ok(req3?.rejectionReason, "Rejection reason recorded");
  console.log(`  ✔ Seeded Rejected Request: REQ-2026-003 for 241FA04711 (Status: Rejected, Reason: ${req3?.rejectionReason})`);

  // 2.2 Create new permission request with live snapshotting
  const newReq = createPermissionRequest({
    studentId: "251FA04645",
    studentName: "Dharanikota Aaradhya",
    programme: "B.Tech CSE",
    reason: "Medical Illness / Hospitalization During Semester",
    supportingInfo: "Admitted to Apollo Hospital with acute typhoid for 14 days. Medical discharge summary attached.",
    snapshottedDues: 0,
    snapshottedAttendance: 71.0,
  });
  assert.ok(newReq.id.startsWith("REQ-"), "New request receives REQ- prefix");
  assert.strictEqual(newReq.status, "Pending", "New request status defaults to Pending");
  assert.strictEqual(newReq.snapshottedAttendance, 71.0, "Snapshotted attendance preserved");
  console.log(`  ✔ Created New Request: ${newReq.id} for Aaradhya (Snapshot: Att ${newReq.snapshottedAttendance}%, Dues ₹${newReq.snapshottedDues})`);

  // 2.3 Status update
  const updatedReq = updatePermissionRequestStatus(newReq.id, {
    status: "Approved",
    reviewedBy: "Dr. K. Rama Rao (Dean Student Affairs)",
    counsellorNotes: "Hospital records verified with Chief Medical Officer. Medical leave condoned.",
  });
  assert.ok(updatedReq, "Updated request returned");
  assert.strictEqual(updatedReq?.status, "Approved", "Status transitioned to Approved");
  assert.strictEqual(updatedReq?.reviewedBy, "Dr. K. Rama Rao (Dean Student Affairs)", "Reviewer recorded");
  console.log(`  ✔ Updated Request: ${newReq.id} transitioned to Approved by ${updatedReq?.reviewedBy}`);

  // -------------------------------------------------------------
  // Test 3: Unified Student Context & ReadFinance Topic Integration
  // -------------------------------------------------------------
  console.log("\n[Test 3] Unified Student Context & FinanceTopic Dispatch:");

  const unifiedAkshat = getUnifiedStudentContext("251FA04E03");
  assert.strictEqual(unifiedAkshat.status, "matched");
  assert.ok(unifiedAkshat.examEligibility, "unified context includes examEligibility");
  assert.strictEqual(unifiedAkshat.examEligibility.isEligible, false, "Unified context reflects ineligibility");
  console.log(`  ✔ Unified Context: 251FA04E03 examEligibility.isEligible === false (Dues: ₹${unifiedAkshat.examEligibility.outstandingDues})`);

  const topicRes = readFinance("examEligibility", "251FA04E03");
  const topicData = topicRes.data as any;
  assert.strictEqual(topicData.studentId, "251FA04E03");
  assert.strictEqual(topicData.ineligibleCategory, "DuesOnly");
  console.log(`  ✔ readFinance("examEligibility", "251FA04E03") successfully returned authoritative audit state`);

  const permRes = readFinance("permissionRequests", "251FA04E03");
  const permData = permRes.data as any[];
  assert.ok(Array.isArray(permData), "permissionRequests topic returns array");
  assert.ok(permData.length >= 1, "contains student's requests");
  console.log(`  ✔ readFinance("permissionRequests", "251FA04E03") returned ${permData.length} records`);

  // -------------------------------------------------------------
  // Test 4: Autonomous Multilingual AI Copilot Queries
  // -------------------------------------------------------------
  console.log("\n[Test 4] Autonomous AI Copilot Intent Matching (English & Hinglish):");

  // 4.1 English: Ineligible Student Check
  const aiAkshat = await queryFinanceAi("Is Akshat Raj eligible for exams?");
  assert.ok(aiAkshat.content.includes("NOT ELIGIBLE"), "AI flags Akshat as Not Eligible");
  assert.ok(aiAkshat.content.includes("28,000"), "AI mentions outstanding dues of 28,000");
  assert.ok(aiAkshat.content.includes("REQ-2026-001"), "AI mentions pending permission request REQ-2026-001");
  console.log("  ✔ AI Copilot (English): 'Is Akshat Raj eligible for exams?' -> Correctly detailed dues blocker & pending request");

  // 4.2 Hinglish: Student Portal Self Inquiry
  const aiSelfHindi = await queryFinanceAi(
    "Kya main exam me baith sakta hu?",
    [],
    undefined,
    { role: "student", currentStudentId: "251FA04E03" }
  );
  assert.ok(aiSelfHindi.content.includes("Radd") || aiSelfHindi.content.includes("Not Eligible") || aiSelfHindi.content.includes("Withheld"), "AI responds with withheld status");
  assert.ok(aiSelfHindi.content.includes("28,000"), "Mentions 28,000 dues");
  assert.ok(aiSelfHindi.content.includes("Student Portal"), "Directs student to Student Portal");
  console.log("  ✔ AI Copilot (Hinglish): 'Kya main exam me baith sakta hu?' -> Responded with clear Hindi guidance & dues remedy");

  // 4.3 English: Eligible Student Check
  const aiVishnu = await queryFinanceAi("Is Murakonda Vishnu eligible for exams?");
  assert.ok(aiVishnu.content.includes("ELIGIBLE"), "AI flags Vishnu as Eligible");
  assert.ok(aiVishnu.content.includes("Hall Ticket"), "AI confirms hall ticket released");
  console.log("  ✔ AI Copilot (English): 'Is Murakonda Vishnu eligible for exams?' -> Verified eligible with hall ticket cleared");

  // 4.4 English: Permission Request Status Inquiry
  const aiPerm = await queryFinanceAi(
    "What is the status of my permission request?",
    [],
    undefined,
    { role: "student", currentStudentId: "251FA04E03" }
  );
  assert.ok(aiPerm.content.includes("REQ-2026-001"), "Identifies REQ-2026-001");
  assert.ok(aiPerm.content.includes("PENDING"), "Identifies status as PENDING");
  console.log("  ✔ AI Copilot: 'What is the status of my permission request?' -> Returned request status and snapshot");

  // 4.5 Institutional Macro Query: Cohort Ineligibility Audit
  const aiCohort = await queryFinanceAi("Which students are not eligible for exams?");
  assert.ok(aiCohort.content.includes("Audit") || aiCohort.content.includes("Cohort"), "AI provides audit header");
  assert.ok(aiCohort.content.includes("Withheld") || aiCohort.content.includes("Ineligible"), "AI reports withheld count");
  console.log("  ✔ AI Copilot: 'Which students are not eligible for exams?' -> Returned comprehensive institutional roster");

  console.log("\n================================================================================");
  console.log("🎉 ALL STEP 4 EXAM ELIGIBILITY & PERMISSION WORKFLOW TESTS PASSED!");
  console.log("================================================================================\n");
}

runStep4Tests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
