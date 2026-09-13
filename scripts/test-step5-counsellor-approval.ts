import {
  getAllPermissionRequests,
  getPermissionRequestById,
  getPermissionRequestsSummary,
  updatePermissionRequestStatus,
  createPermissionRequest,
  getStudentExamEligibility,
} from "../backend/services/finance-service";
import { generateFinanceDocumentHtml } from "../lib/finance-documents";
import { students } from "../backend/database/finance-data";
import { queryFinanceAi } from "../backend/ai/ai-finance-engine";

async function runStep5Tests() {
  console.log("=================================================");
  console.log("🚀 STEP 5: COUNSELLOR DESK & DIGITAL SIGNATURE TEST");
  console.log("=================================================\n");

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, msg: string) {
    total++;
    if (condition) {
      console.log(`✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${msg}`);
      process.exitCode = 1;
    }
  }

  // 1. Initial State
  const initialSummary = getPermissionRequestsSummary();
  console.log(`1. Initial Summary: Total=${initialSummary.total}, Pending=${initialSummary.pendingCount}, Approved=${initialSummary.approvedCount}, Rejected=${initialSummary.rejectedCount}`);
  assert(initialSummary.total >= 3, "Initial requests store contains seeded records");
  assert(initialSummary.pendingCount >= 1, "Pending requests exist in the queue");

  // Verify REQ-2026-002 (Ananya Sharma - 251FA04E17) was seeded as Approved with letterRef and digital signature
  const req2 = getPermissionRequestById("REQ-2026-002");
  assert(!!req2, "Found REQ-2026-002");
  assert(req2?.status === "Approved", "REQ-2026-002 is Approved");
  assert(!!req2?.letterRef && req2.letterRef.startsWith("VFSTR/EPL/"), "REQ-2026-002 has institutional letterRef");
  assert(!!req2?.digitalSignature?.verificationCode, "REQ-2026-002 has digital signature verification code");

  // 2. Approve REQ-2026-001 (Akshat Raj - 251FA04E03)
  console.log("\n2. Testing Counsellor Approval on REQ-2026-001 (Akshat Raj)...");
  const approvedReq = updatePermissionRequestStatus("REQ-2026-001", {
    status: "Approved",
    reviewedBy: "Dr. K. Ramamurthy",
    counsellorNotes: "Provisional condonation granted subject to fee settlement milestone by 30th Sep 2026.",
    digitalSignature: {
      signatoryName: "Dr. K. Ramamurthy",
      signatoryRole: "Dean (Academic Affairs & Examination Clearance)",
      signatureImage: "/k-v-raman-signature.png",
      sealText: "VFSTR Academic Senate Seal · Office of the Dean",
    },
  });

  assert(approvedReq?.status === "Approved", "REQ-2026-001 status changed to Approved");
  assert(!!approvedReq?.letterRef, `REQ-2026-001 letterRef assigned: ${approvedReq?.letterRef}`);
  assert(Boolean(approvedReq?.letterRef?.startsWith("VFSTR/EPL/")), "letterRef matches institutional format VFSTR/EPL/YYYY/XXX");
  assert(approvedReq?.digitalSignature?.signatoryName === "Dr. K. Ramamurthy", "Digital signature signatory recorded");
  assert(!!approvedReq?.digitalSignature?.verificationCode, `Digital signature verification code: ${approvedReq?.digitalSignature?.verificationCode}`);

  // 3. Exam Clearance Integration for Akshat Raj (251FA04E03)
  console.log("\n3. Testing Exam Eligibility after Counsellor Approval...");
  const akshatEligibility = getStudentExamEligibility("251FA04E03");
  assert(akshatEligibility.isEligible === true, "Akshat Raj is now eligible to write semester exams");
  assert(akshatEligibility.isCondoned === true, "Akshat Raj exam status marked isCondoned === true");
  assert(akshatEligibility.condonationRef === approvedReq?.letterRef, "Condonation reference matches permission letterRef");
  assert(Boolean(akshatEligibility.statusDescription?.includes("Condonation Order")), "Status description reflects condonation order");

  // 4. Test Rejection Ground Validation
  console.log("\n4. Testing Counsellor Rejection with Mandatory Ground...");
  const tempReq = createPermissionRequest({
    studentId: "251FA04E42",
    studentName: "Aditya Verma",
    programme: "B.Tech Mechanical Engineering",
    reason: "Severe Fee Arrears Relief",
    supportingInfo: "Requesting exam entry without payment for third consecutive term.",
    snapshottedDues: 55000,
    snapshottedAttendance: 68.0,
  });

  const rejectedReq = updatePermissionRequestStatus(tempReq.id, {
    status: "Rejected",
    reviewedBy: "Priya Sharma (Chief Finance Officer)",
    counsellorNotes: "Unconditional fee waiver cannot be granted for third consecutive semester.",
    rejectionReason: "Outstanding fee balance exceeds threshold without valid bank education loan sanction letter.",
  });

  assert(rejectedReq?.status === "Rejected", "Temporary request status updated to Rejected");
  assert(!!rejectedReq?.rejectionReason, "Rejection ground recorded correctly");
  assert(!rejectedReq?.letterRef, "No permission letterRef generated for rejected request");

  // 5. Document Generator Verification
  console.log("\n5. Testing HTML Document Generator for Official Permission Letter...");
  const akshatStudent = students.find((s) => s.id === "251FA04E03") || {
    id: "251FA04E03",
    name: "Akshat Raj",
    programme: "B.Tech CSE",
  };
  const docHtml = generateFinanceDocumentHtml("exam_permission", akshatStudent as any, {
    permissionRequest: approvedReq!,
    certRef: approvedReq?.letterRef,
  });

  assert(docHtml.includes("EXAMINATION CONDONATION ORDER") || docHtml.includes("EXAMINATION CLEARANCE"), "Document has official examination title");
  assert(docHtml.includes(approvedReq?.letterRef || ""), "Document includes letterRef");
  assert(docHtml.includes("Akshat Raj"), "Document includes student name");
  assert(docHtml.includes("Dr. K. Ramamurthy"), "Document includes signatory name");
  assert(docHtml.includes("VFSTR/EPL/"), "Document includes institutional serial");

  // 6. AI Engine Queries
  console.log("\n6. Testing AI Finance Assistant Queries...");

  // Staff query: Pending requests count
  const staffQueryEn = await queryFinanceAi("how many pending permission requests are there?", [], undefined, { role: "admin" });
  console.log("Staff Query EN Content preview:\n", staffQueryEn.content.slice(0, 160) + "...\n");
  assert(staffQueryEn.content.includes("Pending") || staffQueryEn.content.includes("applications"), "Staff pending query returns request queue summary");
  assert(staffQueryEn.metadata?.pendingCount !== undefined, "Staff pending query returns metadata.pendingCount");

  // Staff query Hindi: Kitne permission requests pending hain
  const staffQueryHi = await queryFinanceAi("kitne permission requests pending hain?", [], undefined, { role: "finance-officer" });
  assert(staffQueryHi.content.includes("Pending") || staffQueryHi.content.includes("विचाराधीन"), "Staff Hindi query returns pending applications count");

  // Student query: What is the status of my permission letter (for Ananya Sharma 251FA04E17)
  const studentQuery = await queryFinanceAi("what is the status of my permission letter?", [], undefined, {
    role: "student",
    currentStudentId: "251FA04E17",
  });
  console.log("Student Query Content preview:\n", studentQuery.content.slice(0, 200) + "...\n");
  assert(studentQuery.content.includes("APPROVED") || studentQuery.content.includes("Approved"), "Student query detects APPROVED status");
  assert(studentQuery.content.includes("VFSTR/EPL/"), "Student query response cites official letterRef");
  assert(studentQuery.content.includes("PDF") || studentQuery.content.includes("download"), "Student query directs to PDF download in Portal");

  console.log(`\n=================================================`);
  console.log(`🏁 TEST RESULTS: ${passed}/${total} assertions passed!`);
  console.log(`=================================================\n`);
}

runStep5Tests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
