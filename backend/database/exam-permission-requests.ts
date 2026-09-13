// ============================================================================
// Exam Permission Request Data Layer (Step 4 & Step 5 Bridge)
// Single Source of Truth for Student-submitted exam permission letters.
// ============================================================================

export interface DigitalSignatureInfo {
  signatoryName: string;
  signatoryRole: string;
  signatureDate: string;
  signatureImage?: string;
  sealText: string;
  verificationCode: string;
}

export interface ExamPermissionRequest {
  id: string;                      // e.g. "REQ-2026-001"
  studentId: string;               // e.g. "251FA04E03"
  studentName: string;             // e.g. "Akshat Raj"
  programme: string;               // e.g. "B.Tech CSE"
  reason: string;                  // e.g. "Financial Hardship / Education Loan Disbursement Delay"
  supportingInfo: string;          // Detailed explanation / notes
  snapshottedDues: number;         // Due amount at the exact time of request
  snapshottedAttendance: number;   // Attendance % at the exact time of request
  submittedAt: string;             // ISO date or formatted timestamp
  status: "Pending" | "Approved" | "Rejected";
  rejectionReason?: string;        // Populated if counsellor rejects (Step 5)
  reviewedBy?: string;             // Name/Role of reviewer (e.g. "Academic Counsellor - Dr. M. Rao")
  reviewedAt?: string;             // Review timestamp
  counsellorNotes?: string;        // Notes/Conditions (e.g. "Allowed conditionally; clear dues before next sem")
  letterRef?: string;              // e.g. "VFSTR/EPL/2026/002"
  digitalSignature?: DigitalSignatureInfo;
}

/**
 * Benchmark in-memory store for exam permission requests.
 * Seeded with standard states to allow immediate testing of:
 * 1. Pending request (Akshat Raj - 251FA04E03)
 * 2. Approved request (Ananya Sharma - 251FA04E17 - conditionally approved)
 * 3. Rejected request (Annavarapu Yash - 241FA04711 - rejected due to multiple consecutive defaults)
 */
export const examPermissionRequestsStore: ExamPermissionRequest[] = [
  {
    id: "REQ-2026-001",
    studentId: "251FA04E03",
    studentName: "Akshat Raj",
    programme: "B.Tech CSE",
    reason: "Education Loan Disbursement Delay",
    supportingInfo: "SBI Scholar Loan application (Ref: SBI/EDU/2026/8921) is sanctioned and disbursement of ₹28,000 is scheduled for next week. Requesting provisional admit card for mid/end exams.",
    snapshottedDues: 28000,
    snapshottedAttendance: 91.0,
    submittedAt: "10 Sep 2026, 11:30 AM",
    status: "Pending",
  },
  {
    id: "REQ-2026-002",
    studentId: "251FA04E17",
    studentName: "Ananya Sharma",
    programme: "B.Tech CSE",
    reason: "Family Medical Emergency & Partial Fee Clearance",
    supportingInfo: "Father underwent surgery in August. ₹25,000 paid at counter; remaining ₹30,000 will be paid by end of month. Medical certificates submitted to Dean's office.",
    snapshottedDues: 30000,
    snapshottedAttendance: 77.0,
    submittedAt: "08 Sep 2026, 03:15 PM",
    status: "Approved",
    reviewedBy: "Dr. K. V. Raman (Dean of Student Affairs)",
    reviewedAt: "09 Sep 2026, 10:00 AM",
    counsellorNotes: "Approved conditionally based on medical proof and verified 77% attendance. Outstanding ₹30,000 must be cleared before semester results publication.",
    letterRef: "VFSTR/EPL/2026/002",
    digitalSignature: {
      signatoryName: "Dr. K. V. Raman",
      signatoryRole: "Dean of Student Affairs & Chief Academic Counsellor",
      signatureDate: "09 Sep 2026, 10:00 AM",
      signatureImage: "/k-v-raman-signature.png",
      sealText: "VFSTR Academic & Examination Clearance Seal",
      verificationCode: "VFSTR-EPL-2026-002-9812",
    },
  },
  {
    id: "REQ-2026-003",
    studentId: "241FA04711",
    studentName: "Annavarapu Yash",
    programme: "B.Tech ECE",
    reason: "Late fee waiver and exam entry request",
    supportingInfo: "Unable to pay dues due to personal reasons. Requesting permission to write exams without clearing ₹18,938 dues.",
    snapshottedDues: 18938,
    snapshottedAttendance: 90.2,
    submittedAt: "05 Sep 2026, 09:45 AM",
    status: "Rejected",
    reviewedBy: "Prof. S. N. Murthy (Academic Counsellor)",
    reviewedAt: "06 Sep 2026, 02:30 PM",
    rejectionReason: "Repeated non-payment over two consecutive assessment cycles without valid documentation or formal loan sanction letter. Student must pay at least 50% dues at the cashier counter to qualify for re-evaluation.",
    counsellorNotes: "Counselling session conducted on 6 Sep. Student advised to utilize partial counter payment.",
  },
];

/**
 * Retrieve all permission requests for a given student ID (case-insensitive)
 */
export function getStudentPermissionRequests(studentId: string): ExamPermissionRequest[] {
  const norm = (studentId || "").toUpperCase().trim();
  return examPermissionRequestsStore.filter(
    (r) => r.studentId.toUpperCase().trim() === norm
  );
}

/**
 * Create a new exam permission letter submission from a student
 */
export function createPermissionRequest(
  data: Omit<ExamPermissionRequest, "id" | "submittedAt" | "status">
): ExamPermissionRequest {
  const count = examPermissionRequestsStore.length + 1;
  const id = `REQ-2026-${String(count).padStart(3, "0")}`;
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const newRequest: ExamPermissionRequest = {
    id,
    ...data,
    submittedAt: formattedDate,
    status: "Pending",
  };

  examPermissionRequestsStore.unshift(newRequest);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("feewise_exam_permission_updated", { detail: newRequest }));
  }

  return newRequest;
}

/**
 * Update request status (Used for Step 5 review/approval workflow or tests)
 * Automatically generates letterRef and digital signature when approved.
 */
export function updatePermissionRequestStatus(
  requestId: string,
  update: {
    status: "Approved" | "Rejected";
    rejectionReason?: string;
    reviewedBy?: string;
    counsellorNotes?: string;
    letterRef?: string;
    digitalSignature?: Partial<DigitalSignatureInfo>;
  }
): ExamPermissionRequest | null {
  const req = examPermissionRequestsStore.find((r) => r.id === requestId);
  if (!req) return null;

  req.status = update.status;
  if (update.rejectionReason !== undefined) req.rejectionReason = update.rejectionReason;
  if (update.reviewedBy !== undefined) req.reviewedBy = update.reviewedBy;
  if (update.counsellorNotes !== undefined) req.counsellorNotes = update.counsellorNotes;

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  req.reviewedAt = formattedDate;

  if (update.status === "Approved") {
    const cleanNum = req.id.replace("REQ-2026-", "").replace("REQ-", "");
    req.letterRef = update.letterRef || `VFSTR/EPL/2026/${cleanNum}`;
    
    req.digitalSignature = {
      signatoryName: update.digitalSignature?.signatoryName || update.reviewedBy || "Dr. K. V. Raman",
      signatoryRole: update.digitalSignature?.signatoryRole || "Dean of Student Affairs & Chief Academic Counsellor",
      signatureDate: update.digitalSignature?.signatureDate || formattedDate,
      signatureImage: update.digitalSignature?.signatureImage || "/k-v-raman-signature.png",
      sealText: update.digitalSignature?.sealText || "VFSTR Academic & Examination Clearance Seal",
      verificationCode: update.digitalSignature?.verificationCode || `VFSTR-EPL-2026-${cleanNum}-${Math.floor(1000 + Math.random() * 9000)}`,
    };
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("feewise_exam_permission_updated", { detail: req }));
  }

  return req;
}

/**
 * Return all permission requests across the institution (for counsellor dashboard in Step 5)
 */
export function getAllPermissionRequests(): ExamPermissionRequest[] {
  return [...examPermissionRequestsStore];
}

/**
 * Get a specific permission request by ID
 */
export function getPermissionRequestById(id: string): ExamPermissionRequest | null {
  const norm = (id || "").toUpperCase().trim();
  return examPermissionRequestsStore.find((r) => r.id.toUpperCase().trim() === norm) || null;
}

/**
 * Get total pending permission requests count (for counsellor badge & AI queries)
 */
export function getPendingPermissionRequestsCount(): number {
  return examPermissionRequestsStore.filter((r) => r.status === "Pending").length;
}

/**
 * Get institutional summary of all permission requests
 */
export function getPermissionRequestsSummary() {
  const all = examPermissionRequestsStore;
  const pending = all.filter((r) => r.status === "Pending");
  const approved = all.filter((r) => r.status === "Approved");
  const rejected = all.filter((r) => r.status === "Rejected");
  return {
    total: all.length,
    pendingCount: pending.length,
    approvedCount: approved.length,
    rejectedCount: rejected.length,
    pendingRequests: pending,
    approvedRequests: approved,
    rejectedRequests: rejected,
  };
}
