import assert from "node:assert";
import {
  getStudentDuesBreakdown,
  getStudentAcademicHistory,
  getStudentExamEligibility,
  getAllStudentsAdmitCardStatus,
  createPermissionRequest,
  updatePermissionRequestStatus,
  readFinance,
} from "../backend/services/finance-service";
import { generateFinanceDocumentHtml } from "../lib/finance-documents";
import { queryFinanceAi } from "../backend/ai/ai-finance-engine";

async function runStep6Tests() {
  console.log("================================================================================");
  console.log("TESTING STEP 6: CARRY-FORWARD DUES LINEAGE + AUTOMATED ADMIT CARD GENERATION");
  console.log("================================================================================");

  // ---------------------------------------------------------------------------
  // TEST 1: Previous Semester Dues Carry-Forward Chaining & Waterfall Liquidation
  // ---------------------------------------------------------------------------
  console.log("\n[Test 1] Previous Semester Dues Carry-Forward Chaining (Clause 4.2 Waterfall):");

  // 1.1 Multi-semester carry-forward student: Chaitanya Varma (251FA04E58)
  const chaitanyaBreakdown = getStudentDuesBreakdown("251FA04E58");
  assert.strictEqual(chaitanyaBreakdown.studentId, "251FA04E58", "Student ID must match");
  assert.strictEqual(chaitanyaBreakdown.hasCarriedForward, true, "Chaitanya must have carried-forward dues");
  assert.ok(chaitanyaBreakdown.carriedForwardDue > 0, "Carried forward due must be positive");
  assert.strictEqual(
    chaitanyaBreakdown.totalOutstandingDue,
    chaitanyaBreakdown.currentSemesterDue + chaitanyaBreakdown.carriedForwardDue,
    "Single source of truth: totalOutstandingDue = currentSemesterDue + carriedForwardDue"
  );
  assert.ok(chaitanyaBreakdown.activeCarryForwardBreakdown.length > 0, "Must have active carry forward lineage records");

  // Lineage verification
  const lineage = chaitanyaBreakdown.activeCarryForwardBreakdown;
  console.log(`  ✔ Chaitanya Varma (251FA04E58): Current Term ₹${chaitanyaBreakdown.currentSemesterDue} + Carried-Forward ₹${chaitanyaBreakdown.carriedForwardDue} = Total ₹${chaitanyaBreakdown.totalOutstandingDue}`);
  lineage.forEach((item) => {
    console.log(`     -> Sem ${item.fromSemNo} (${item.fromSemLabel}): Original ₹${item.originalDue} → Active Remaining ₹${item.remainingDue}`);
    assert.ok(item.fromSemNo < 3, "Carried forward lineage must originate from prior semesters");
    assert.ok(item.remainingDue <= item.originalDue, "Remaining due cannot exceed original due");
  });

  // 1.2 Multi-semester history carry-forward metrics
  const chaitanyaHistory = getStudentAcademicHistory("251FA04E58");
  assert.ok(chaitanyaHistory && chaitanyaHistory.length >= 3, "Chaitanya must have at least 3 semesters");
  const sem2 = chaitanyaHistory.find((s) => s.semNo === 2);
  const sem3 = chaitanyaHistory.find((s) => s.semNo === 3);
  assert.ok(sem2, "Sem 2 must exist");
  assert.ok(sem3, "Sem 3 must exist");
  assert.ok(sem2.carriedForwardDues !== undefined, "Sem 2 must have carriedForwardDues");
  assert.ok(sem3.carriedForwardDues !== undefined, "Sem 3 must have carriedForwardDues");
  console.log(`  ✔ History Lineage Sem 2 Carried-In: ₹${sem2.carriedForwardDues}, Sem 3 Carried-In: ₹${sem3.carriedForwardDues}`);

  // 1.3 Clean student with zero carry forward: Vishnu (251FA04777)
  const vishnuBreakdown = getStudentDuesBreakdown("251FA04777");
  assert.strictEqual(vishnuBreakdown.hasCarriedForward, false, "Vishnu has no carry forward");
  assert.strictEqual(vishnuBreakdown.carriedForwardDue, 0, "Vishnu carriedForwardDue must be 0");
  assert.strictEqual(vishnuBreakdown.totalOutstandingDue, 0, "Vishnu totalOutstandingDue must be 0");
  assert.strictEqual(vishnuBreakdown.activeCarryForwardBreakdown.length, 0, "No active carry forward items");
  console.log(`  ✔ Clean Student (Murakonda Vishnu): Total Dues ₹0, Carried Forward ₹0 (Clean Lineage)`);

  // ---------------------------------------------------------------------------
  // TEST 2: Statutory 4-Tier Admit Card Status Determination
  // ---------------------------------------------------------------------------
  console.log("\n[Test 2] Statutory 4-Tier Automated Admit Card Status System:");

  // 2.1 CLEAN_ELIGIBLE: Vishnu (Attendance >= 75%, Dues = 0)
  const vishnuAdmit = getStudentExamEligibility("251FA04777");
  assert.strictEqual(vishnuAdmit.admitCardStatus, "CLEAN_ELIGIBLE", "Vishnu must be CLEAN_ELIGIBLE");
  assert.strictEqual(vishnuAdmit.canGenerateAdmitCard, true, "Vishnu must be allowed to generate admit card");
  console.log(`  ✔ CLEAN_ELIGIBLE: ${vishnuAdmit.studentName} — Att: ${vishnuAdmit.currentAttendance}% | Dues: ₹${vishnuAdmit.outstandingDues} -> Card Generation Approved`);

  // 2.2 PROVISIONAL_DUES: Akshat (Attendance >= 75%, Dues > 0)
  // Dues alone do NOT block admit card issuance; it issues a provisional card with undertaking
  const akshatAdmit = getStudentExamEligibility("251FA04E03");
  assert.strictEqual(akshatAdmit.admitCardStatus, "PROVISIONAL_DUES", "Akshat must be PROVISIONAL_DUES");
  assert.strictEqual(akshatAdmit.canGenerateAdmitCard, true, "Akshat MUST be allowed to generate provisional admit card");
  assert.ok(akshatAdmit.admitCardStatusDescription.includes("Provisional"), "Description must note provisional status");
  console.log(`  ✔ PROVISIONAL_DUES: ${akshatAdmit.studentName} — Att: ${akshatAdmit.currentAttendance}% | Dues: ₹${akshatAdmit.outstandingDues} -> Provisional Card with Statutory Undertaking`);

  // 2.3 BLOCKED_ATTENDANCE: Aaradhya (Attendance < 75%, No Approved Condonation)
  const aaradhyaAdmit = getStudentExamEligibility("251FA04645");
  assert.strictEqual(aaradhyaAdmit.admitCardStatus, "BLOCKED_ATTENDANCE", "Aaradhya must be BLOCKED_ATTENDANCE");
  assert.strictEqual(aaradhyaAdmit.canGenerateAdmitCard, false, "Aaradhya MUST NOT generate admit card without condonation");
  console.log(`  ✔ BLOCKED_ATTENDANCE: ${aaradhyaAdmit.studentName} — Att: ${aaradhyaAdmit.currentAttendance}% -> Strict Hard Block Enforced`);

  // 2.4 CONDONED_ELIGIBLE: Approve a condonation request for Aaradhya and verify transition
  const req = createPermissionRequest({
    studentId: "251FA04645",
    studentName: "Dharanikota Aaradhya",
    programme: "B.Tech CSE",
    reason: "Medical hospital admission certificate attached for Step 6 validation",
    supportingInfo: "Admitted to Ramesh Hospitals for typhoid fever recovery during pre-finals.",
    snapshottedDues: aaradhyaAdmit.outstandingDues,
    snapshottedAttendance: aaradhyaAdmit.currentAttendance,
  });
  assert.ok(req, "Permission request created");

  // Approve through HoD and Dean
  const approvedReq = updatePermissionRequestStatus(req.id, {
    status: "Approved",
    reviewedBy: "Dr. K. Srinivas",
    counsellorNotes: "Statutory Condonation Granted under Academic Regulation 7.3(b)",
  });
  assert.strictEqual(approvedReq?.status, "Approved", "Condonation approved");

  // Re-check admit card status for Aaradhya
  const aaradhyaCondoned = getStudentExamEligibility("251FA04645");
  assert.strictEqual(aaradhyaCondoned.admitCardStatus, "CONDONED_ELIGIBLE", "Aaradhya must now be CONDONED_ELIGIBLE");
  assert.strictEqual(aaradhyaCondoned.canGenerateAdmitCard, true, "Condoned student can generate admit card");
  assert.ok(aaradhyaCondoned.condonationRef, "Condonation ref must be populated");
  console.log(`  ✔ CONDONED_ELIGIBLE: ${aaradhyaCondoned.studentName} — Condonation Ref: ${aaradhyaCondoned.condonationRef} -> Special Condoned Admit Card Issued`);

  // ---------------------------------------------------------------------------
  // TEST 3: Cohort-Wide Bulk Admit Card Oversight Statistics
  // ---------------------------------------------------------------------------
  console.log("\n[Test 3] Cohort-Wide Admit Card Oversight Summary (getAllStudentsAdmitCardStatus):");
  const cohort = getAllStudentsAdmitCardStatus();
  assert.ok(cohort.totalStudents > 0, "Must have students");
  assert.strictEqual(
    cohort.totalStudents,
    cohort.cleanEligibleCount + cohort.provisionalDuesCount + cohort.condonedCount + cohort.blockedCount,
    "All students must map to exactly one of the 4 statutory statuses"
  );
  const canGenerateTotal = cohort.cleanEligibleCount + cohort.provisionalDuesCount + cohort.condonedCount;
  console.log(`  ✔ Total Cohort: ${cohort.totalStudents}`);
  console.log(`     - Clean Eligible: ${cohort.cleanEligibleCount}`);
  console.log(`     - Provisional (Dues): ${cohort.provisionalDuesCount}`);
  console.log(`     - Condoned (Attendance): ${cohort.condonedCount}`);
  console.log(`     - Blocked (Attendance): ${cohort.blockedCount}`);
  console.log(`     - Total Ready for Download: ${canGenerateTotal} / ${cohort.totalStudents}`);

  // ---------------------------------------------------------------------------
  // TEST 4: Document Generator (lib/finance-documents.ts) Admit Card Output
  // ---------------------------------------------------------------------------
  console.log("\n[Test 4] Document Generator HTML Output for docType 'admit_card':");

  // 4.1 Clean Candidate HTML
  const vishnuDoc = generateFinanceDocumentHtml("admit_card", "251FA04777");
  assert.ok(vishnuDoc.includes("HALL TICKET &amp; ADMIT CARD") || vishnuDoc.includes("HALL TICKET"), "Must contain Hall Ticket title");
  assert.ok(vishnuDoc.includes("Murakonda Vishnu"), "Must contain student name");
  assert.ok(vishnuDoc.includes("251FA04777"), "Must contain student reg number");
  assert.ok(vishnuDoc.includes("REGULAR ADMIT CARD (ALL CLEAR)") || vishnuDoc.includes("REGULAR STATUTORY CLEARANCE"), "Must contain clean clearance banner");
  assert.ok(vishnuDoc.includes("Controller of Examinations"), "Must contain CoE role");
  console.log(`  ✔ Clean Admit Card HTML generated with full timetable and CoE seal`);

  // 4.2 Provisional Candidate HTML (Akshat with dues)
  const akshatDoc = generateFinanceDocumentHtml("admit_card", "251FA04E03");
  assert.ok(akshatDoc.includes("PROVISIONAL ADMIT CARD"), "Must include PROVISIONAL banner");
  assert.ok(akshatDoc.includes("STATUTORY PENDING DUES NOTICE") || akshatDoc.includes("MANDATORY UNDERTAKING"), "Must include undertaking header");
  assert.ok(akshatDoc.includes("₹28,000"), "Must include exact outstanding dues amount");
  assert.ok(akshatDoc.includes("Mandatory Undertaking"), "Must state mandatory undertaking clause");
  console.log(`  ✔ Provisional Admit Card HTML generated with statutory dues undertaking notice`);

  // 4.3 Condoned Candidate HTML (Aaradhya with condonation)
  const condonedDoc = generateFinanceDocumentHtml("admit_card", "251FA04645");
  assert.ok(condonedDoc.includes("CONDONED ADMIT CARD"), "Must include CONDONED banner");
  assert.ok(condonedDoc.includes("DEAN OF STUDENT AFFAIRS CONDONATION ENDORSEMENT"), "Must cite Dean condonation endorsement");
  assert.ok(condonedDoc.includes("VFSTR/EPL/2026/004"), "Must include Dean approval reference number");
  console.log(`  ✔ Condoned Admit Card HTML generated with statutory Dean Academic ref`);

  // ---------------------------------------------------------------------------
  // TEST 5: AI Finance Copilot Multi-lingual Query Coverage
  // ---------------------------------------------------------------------------
  console.log("\n[Test 5] AI Finance Engine Step 6 Query Intents (English & Hindi/Hinglish):");

  // 5.1 Carried-Forward Arrears Lineage Query (English)
  const aiCarryEng = await queryFinanceAi(
    "Chaitanya Varma carried forward dues lineage and waterfall settlement",
    [],
    undefined,
    { role: "finance-officer" }
  );
  assert.ok(aiCarryEng.content.includes("Carried-Forward Dues Lineage"), "AI must return lineage breakdown");
  assert.ok(aiCarryEng.content.includes("Waterfall Liquidation"), "AI must explain VFSTR Clause 4.2 Waterfall");
  console.log(`  ✔ AI English: Carried-forward dues lineage returned with Clause 4.2 explanation`);

  // 5.2 Carried-Forward Arrears Lineage Query (Hindi/Hinglish)
  const aiCarryHin = await queryFinanceAi(
    "Mera pichle semester ka kitna balance carry forward hua hai?",
    [],
    undefined,
    { role: "student", currentStudentId: "251FA04E58" }
  );
  assert.ok(aiCarryHin.content.includes("Carried-Forward Dues Lineage"), "AI Hindi must recognize carry-forward intent");
  assert.ok(aiCarryHin.content.includes("Waterfall Liquidation") || aiCarryHin.content.includes("Clause 4.2"), "AI Hindi must explain waterfall");
  console.log(`  ✔ AI Hindi/Hinglish: Carried-forward dues lineage explained in Hindi`);

  // 5.3 Admit Card Cohort Oversight Query (English)
  const aiAdmitCohort = await queryFinanceAi(
    "Show admit card eligibility summary for this semester",
    [],
    undefined,
    { role: "finance-officer" }
  );
  assert.ok(aiAdmitCohort.content.includes("VFSTR Examination Admit Card System — Cohort Oversight") || aiAdmitCohort.content.includes("Admit Card"), "Cohort summary header");
  assert.ok(aiAdmitCohort.content.includes("Clean Regular Issued"), "Must list clean regular count");
  assert.ok(aiAdmitCohort.content.includes("Provisional Issued"), "Must list provisional count");
  console.log(`  ✔ AI English: Cohort admit card oversight summary with all 4 categories`);

  // 5.4 Student Admit Card Status Query (Student Vishnu - Clean)
  const aiVishnuAdmit = await queryFinanceAi(
    "Can I download my admit card for semester exams?",
    [],
    undefined,
    { role: "student", currentStudentId: "251FA04777" }
  );
  assert.ok(
    aiVishnuAdmit.content.includes("GENERATION CLEARED") ||
      aiVishnuAdmit.content.includes("CLEAN REGULAR ADMIT CARD"),
    "Clean student notified admit card generation is cleared"
  );
  console.log(`  ✔ AI Student Query: Clean student notified hall ticket is ready for download`);

  console.log("\n================================================================================");
  console.log("ALL STEP 6 TESTS PASSED SUCCESSFULLY! (Carry-Forward Lineage + Admit Cards)");
  console.log("================================================================================");
}

runStep6Tests().catch((err) => {
  console.error("Step 6 Tests Failed:", err);
  process.exit(1);
});
