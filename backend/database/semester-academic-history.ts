// ============================================================================
// Semester-wise Academic & Financial History Data Layer
// Authoritative records for past and current semesters per student.
// ============================================================================

export interface CarriedForwardDuesItem {
  fromSemNo: number;
  fromSemLabel: string;
  fromAcademicYear: string;
  originalDue: number;
  remainingDue: number;
}

export interface SemesterRecord {
  studentId: string;
  academicYear: string;        // e.g. "2024–25", "2025–26", "2026–27"
  yearNo: number;              // 1, 2, 3, 4
  semNo: number;               // 1 to 8
  semLabel: string;            // e.g. "Sem 1 (Jul–Nov 2024)"
  cgpa: number;                // Semester SGPA
  cumulativeCgpa: number;      // Cumulative CGPA up to this semester
  attendance: number;          // Attendance percentage (0-100)
  grossFee: number;            // Full tuition + institute gross fees
  scholarshipApplied: number;  // Scholarship waiver amount
  scholarshipPercent: number;  // % of scholarship applied
  netDemand: number;           // grossFee - scholarshipApplied
  paid: number;                // Amount cleared
  outstanding: number;         // Total remaining due (current semester + carried-forward)
  scholarshipStatus: "Active" | "AtRisk" | "Discontinued";
  discontinuationReason?: string;
  // Step 6 Carry-forward attributes:
  currentSemDemand?: number;          // Net demand strictly for this semester
  currentSemPaid?: number;            // Amount applied to current semester net demand
  currentSemOutstanding?: number;     // Remaining due strictly from this semester
  carriedForwardDues?: number;        // Sum of unpaid dues carried from prior semesters
  carriedForwardBreakdown?: CarriedForwardDuesItem[]; // Traceable line items per prior semester
}

export interface SemesterCarryForwardResult {
  studentId: string;
  history: SemesterRecord[];
  currentSemester: SemesterRecord | null;
  currentSemesterDue: number;
  carriedForwardDue: number;
  totalOutstandingDue: number;
  hasCarriedForward: boolean;
  activeCarryForwardBreakdown: CarriedForwardDuesItem[];
}

/**
 * Curated benchmark student semester history profiles
 * Demonstrates:
 * 1. 251FA04E03 (Akshat Raj): Continuous high academic performance (CGPA > 8.5) -> Active scholarship
 * 2. 251FA04E17 (Ananya Sharma): Dropped below 7.0 in Sem 3 (CGPA 6.70) -> Auto-Discontinued, full fee charged
 * 3. 251FA04E21 (Rohan Mehta): Maintained CGPA > 7.5 across semesters -> Active scholarship
 * 4. 241FA04711 (Annavarapu Yash): 2nd-year student with Sem 3 CGPA 6.87 (< 7.0 threshold) -> Auto-Discontinued
 * 5. 251FA04E33 (Kavya Reddy / Special State): CGPA in warning zone (7.0 - 7.5) -> AtRisk status, scholarship retained
 * 6. 241FA03104 (M.Tech / Higher Sem benchmark): Consistently high CGPA (9.01) -> Active scholarship
 */
export const benchmarkSemesterHistories: Record<string, SemesterRecord[]> = {
  // 1. Akshat Raj - Consistent Merit Performer (V-SAT Rank 142)
  "251FA04E03": [
    {
      studentId: "251FA04E03",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2025)",
      cgpa: 8.60,
      cumulativeCgpa: 8.60,
      attendance: 92.5,
      grossFee: 60000,
      scholarshipApplied: 10000,
      scholarshipPercent: 75,
      netDemand: 50000,
      paid: 50000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E03",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2026)",
      cgpa: 8.75,
      cumulativeCgpa: 8.68,
      attendance: 94.0,
      grossFee: 60000,
      scholarshipApplied: 10000,
      scholarshipPercent: 75,
      netDemand: 50000,
      paid: 50000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E03",
      academicYear: "2026–27",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2026)",
      cgpa: 8.55,
      cumulativeCgpa: 8.63,
      attendance: 91.0,
      grossFee: 60000,
      scholarshipApplied: 10000,
      scholarshipPercent: 75,
      netDemand: 50000,
      paid: 22000,
      outstanding: 28000,
      scholarshipStatus: "Active",
    },
  ],

  // 2. Ananya Sharma - JEE Mains 92.4%ile, CGPA dropped to 6.70 in Sem 3 -> Discontinued
  "251FA04E17": [
    {
      studentId: "251FA04E17",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2025)",
      cgpa: 8.20,
      cumulativeCgpa: 8.20,
      attendance: 88.0,
      grossFee: 55000,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 40000,
      paid: 40000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E17",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2026)",
      cgpa: 7.20,
      cumulativeCgpa: 7.70,
      attendance: 81.5,
      grossFee: 55000,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 40000,
      paid: 40000,
      outstanding: 0,
      scholarshipStatus: "AtRisk", // Warning zone (7.0 - 7.5)
    },
    {
      studentId: "251FA04E17",
      academicYear: "2026–27",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2026)",
      cgpa: 6.70,
      cumulativeCgpa: 6.70,
      attendance: 77.0,
      grossFee: 55000,
      scholarshipApplied: 0,
      scholarshipPercent: 0,
      netDemand: 55000, // Full fee charged
      paid: 25000,
      outstanding: 30000,
      scholarshipStatus: "Discontinued",
      discontinuationReason: "CGPA 6.70 in Sem 3 < 7.0 minimum continuation threshold. Scholarship revoked and full fee applied.",
    },
  ],

  // 3. Rohan Mehta - Reserved/Lower Caste Category (BC-A/B)
  "251FA04E21": [
    {
      studentId: "251FA04E21",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2025)",
      cgpa: 7.85,
      cumulativeCgpa: 7.85,
      attendance: 87.0,
      grossFee: 55000,
      scholarshipApplied: 10000,
      scholarshipPercent: 50,
      netDemand: 45000,
      paid: 45000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E21",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2026)",
      cgpa: 7.95,
      cumulativeCgpa: 7.90,
      attendance: 89.5,
      grossFee: 55000,
      scholarshipApplied: 10000,
      scholarshipPercent: 50,
      netDemand: 45000,
      paid: 45000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E21",
      academicYear: "2026–27",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2026)",
      cgpa: 8.10,
      cumulativeCgpa: 7.97,
      attendance: 90.0,
      grossFee: 55000,
      scholarshipApplied: 10000,
      scholarshipPercent: 50,
      netDemand: 45000,
      paid: 35000,
      outstanding: 10000,
      scholarshipStatus: "Active",
    },
  ],

  // 4. Annavarapu Yash - 2nd Year (AY 2024-25), Sem 3 CGPA 6.87 -> Discontinued
  "241FA04711": [
    {
      studentId: "241FA04711",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2025)",
      cgpa: 7.60,
      cumulativeCgpa: 7.60,
      attendance: 92.0,
      grossFee: 61500,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 46500,
      paid: 46500,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "241FA04711",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2026)",
      cgpa: 7.15,
      cumulativeCgpa: 7.38,
      attendance: 91.0,
      grossFee: 61500,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 46500,
      paid: 46500,
      outstanding: 0,
      scholarshipStatus: "AtRisk", // At risk zone
    },
    {
      studentId: "241FA04711",
      academicYear: "2026–27",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2026)",
      cgpa: 6.87,
      cumulativeCgpa: 6.87,
      attendance: 90.2,
      grossFee: 61500,
      scholarshipApplied: 0,
      scholarshipPercent: 0,
      netDemand: 61500, // Discontinued -> full fee charged
      paid: 42562,
      outstanding: 18938,
      scholarshipStatus: "Discontinued",
      discontinuationReason: "CGPA 6.87 in Sem 3 < 7.0 minimum continuation threshold. Scholarship revoked and full fee applied.",
    },
  ],

  // 5. Kavya Reddy / Special State Status - AtRisk (7.0 <= CGPA < 7.5) but NOT discontinued
  "251FA04E33": [
    {
      studentId: "251FA04E33",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2025)",
      cgpa: 7.80,
      cumulativeCgpa: 7.80,
      attendance: 84.0,
      grossFee: 50000,
      scholarshipApplied: 15000,
      scholarshipPercent: 30,
      netDemand: 35000,
      paid: 35000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E33",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2026)",
      cgpa: 7.15,
      cumulativeCgpa: 7.48,
      attendance: 82.0,
      grossFee: 50000,
      scholarshipApplied: 15000,
      scholarshipPercent: 30,
      netDemand: 35000,
      paid: 35000,
      outstanding: 0,
      scholarshipStatus: "AtRisk", // Above 7.0, so retained!
    },
    {
      studentId: "251FA04E33",
      academicYear: "2026–27",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2026)",
      cgpa: 7.25,
      cumulativeCgpa: 7.40,
      attendance: 83.5,
      grossFee: 50000,
      scholarshipApplied: 15000,
      scholarshipPercent: 30,
      netDemand: 35000,
      paid: 25000,
      outstanding: 10000,
      scholarshipStatus: "AtRisk", // Still above 7.0, scholarship retained!
    },
  ],

  // 6. 241FA03104 - Higher Semester Consistent High Performer
  "241FA03104": [
    {
      studentId: "241FA03104",
      academicYear: "2024–25",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2024)",
      cgpa: 8.95,
      cumulativeCgpa: 8.95,
      attendance: 94.0,
      grossFee: 55000,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 40000,
      paid: 40000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "241FA03104",
      academicYear: "2024–25",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2025)",
      cgpa: 9.10,
      cumulativeCgpa: 9.02,
      attendance: 95.0,
      grossFee: 55000,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 40000,
      paid: 40000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "241FA03104",
      academicYear: "2025–26",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2025)",
      cgpa: 9.05,
      cumulativeCgpa: 9.03,
      attendance: 93.0,
      grossFee: 55000,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 40000,
      paid: 40000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "241FA03104",
      academicYear: "2025–26",
      yearNo: 2,
      semNo: 4,
      semLabel: "Sem 4 (Jan–May 2026)",
      cgpa: 8.90,
      cumulativeCgpa: 9.00,
      attendance: 92.5,
      grossFee: 55000,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 40000,
      paid: 40000,
      outstanding: 0,
      scholarshipStatus: "Active",
    },
    {
      studentId: "241FA03104",
      academicYear: "2026–27",
      yearNo: 3,
      semNo: 5,
      semLabel: "Sem 5 (Jul–Nov 2026)",
      cgpa: 9.01,
      cumulativeCgpa: 9.01,
      attendance: 93.4,
      grossFee: 55000,
      scholarshipApplied: 15000,
      scholarshipPercent: 50,
      netDemand: 40000,
      paid: 30000,
      outstanding: 10000,
      scholarshipStatus: "Active",
    },
  ],

  // (251FA04645 was previously here, but removed so it pulls real outstanding dues from finance-data)

  // 8. 251FA04E58 (Chaitanya Varma) - Benchmark: Chained Carry-Forward Across Consecutive Semesters
  // Sem 1 dues carried into Sem 2, Sem 2 dues carried into Sem 3 -> Final outstanding ₹18,000
  "251FA04E58": [
    {
      studentId: "251FA04E58",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2025)",
      cgpa: 8.10,
      cumulativeCgpa: 8.10,
      attendance: 89.0,
      grossFee: 50000,
      scholarshipApplied: 10000,
      scholarshipPercent: 20,
      netDemand: 40000,
      paid: 32000,
      outstanding: 8000, // Unpaid ₹8,000 carried into Sem 2
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E58",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2026)",
      cgpa: 8.25,
      cumulativeCgpa: 8.18,
      attendance: 90.5,
      grossFee: 50000,
      scholarshipApplied: 10000,
      scholarshipPercent: 20,
      netDemand: 40000,
      paid: 30000, // ₹8,000 clears Sem 1 carry; ₹22,000 to Sem 2 -> Sem 2 unpaid ₹18,000
      outstanding: 18000,
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E58",
      academicYear: "2026–27",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2026)",
      cgpa: 8.05,
      cumulativeCgpa: 8.14,
      attendance: 88.5,
      grossFee: 50000,
      scholarshipApplied: 10000,
      scholarshipPercent: 20,
      netDemand: 40000,
      paid: 10000, // ₹10,000 liquidates portion of Sem 2 carry (leaving ₹8,000 Sem 2 carry unpaid) + ₹40,000 Sem 3 demand unpaid
      outstanding: 48000,
      scholarshipStatus: "Active",
    },
  ],

  // 9. 251FA04E42 (Aditya Verma) - Benchmark: Multi-Semester Simultaneous Debt Chain (Sem 1 + Sem 2 -> Sem 3)
  "251FA04E42": [
    {
      studentId: "251FA04E42",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2025)",
      cgpa: 7.60,
      cumulativeCgpa: 7.60,
      attendance: 82.0,
      grossFee: 65000,
      scholarshipApplied: 0,
      scholarshipPercent: 0,
      netDemand: 65000,
      paid: 45000,
      outstanding: 20000, // Unpaid ₹20,000
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E42",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2026)",
      cgpa: 7.40,
      cumulativeCgpa: 7.50,
      attendance: 80.0,
      grossFee: 65000,
      scholarshipApplied: 0,
      scholarshipPercent: 0,
      netDemand: 65000,
      paid: 5000, // ₹5,000 clears part of Sem 1 (leaving ₹15k Sem 1 + ₹65k Sem 2)
      outstanding: 80000,
      scholarshipStatus: "AtRisk",
    },
    {
      studentId: "251FA04E42",
      academicYear: "2026–27",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2026)",
      cgpa: 7.30,
      cumulativeCgpa: 7.43,
      attendance: 79.0,
      grossFee: 65000,
      scholarshipApplied: 0,
      scholarshipPercent: 0,
      netDemand: 65000,
      paid: 90000, // Clears ₹15k Sem 1 + ₹65k Sem 2 + ₹10k Sem 3 -> Sem 3 current unpaid ₹55,000
      outstanding: 55000,
      scholarshipStatus: "AtRisk",
    },
  ],

  // 10. 251FA04E36 (Siddharth Nair) - Benchmark: Active Carried-Forward Arrears in Current Semester
  // Demonstrates Sem 2 carried forward dues (₹20,000) active alongside current Sem 3 dues (₹25,000) -> Total ₹45,000
  "251FA04E36": [
    {
      studentId: "251FA04E36",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 1,
      semLabel: "Sem 1 (Jul–Nov 2025)",
      cgpa: 8.40,
      cumulativeCgpa: 8.40,
      attendance: 90.0,
      grossFee: 50000,
      scholarshipApplied: 0,
      scholarshipPercent: 0,
      netDemand: 50000,
      paid: 38000,
      outstanding: 12000, // ₹12,000 carried to Sem 2
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E36",
      academicYear: "2025–26",
      yearNo: 1,
      semNo: 2,
      semLabel: "Sem 2 (Jan–May 2026)",
      cgpa: 8.35,
      cumulativeCgpa: 8.38,
      attendance: 91.5,
      grossFee: 50000,
      scholarshipApplied: 0,
      scholarshipPercent: 0,
      netDemand: 50000,
      paid: 42000, // ₹12,000 clears Sem 1 carry; ₹30,000 to Sem 2 -> Sem 2 unpaid ₹20,000 carried to Sem 3
      outstanding: 20000,
      scholarshipStatus: "Active",
    },
    {
      studentId: "251FA04E36",
      academicYear: "2026–27",
      yearNo: 2,
      semNo: 3,
      semLabel: "Sem 3 (Jul–Nov 2026)",
      cgpa: 8.20,
      cumulativeCgpa: 8.32,
      attendance: 89.0,
      grossFee: 50000,
      scholarshipApplied: 0,
      scholarshipPercent: 0,
      netDemand: 25000,
      paid: 0,
      outstanding: 45000,
      scholarshipStatus: "Active",
    },
  ],
};

/**
 * Deterministically computes automatic dues carry-forward across a student's semester history.
 * Under institutional policy (VFSTR Clause 4.2 Waterfall):
 * 1. Prior semester unpaid balances carry forward into the subsequent semester.
 * 2. In any semester, payments first liquidate oldest carried-forward liabilities.
 * 3. Any remaining payment is applied to the current semester's net fee demand.
 * 4. Carried forward amounts retain full historical lineage (e.g. fromSemNo, fromSemLabel, originalDue, remainingDue).
 */
export function computeSemesterCarryForward(rawHistory: SemesterRecord[]): SemesterCarryForwardResult {
  if (!rawHistory || rawHistory.length === 0) {
    return {
      studentId: "",
      history: [],
      currentSemester: null,
      currentSemesterDue: 0,
      carriedForwardDue: 0,
      totalOutstandingDue: 0,
      hasCarriedForward: false,
      activeCarryForwardBreakdown: [],
    };
  }

  const studentId = rawHistory[0].studentId;
  const sorted = [...rawHistory].sort((a, b) =>
    a.yearNo !== b.yearNo ? a.yearNo - b.yearNo : a.semNo - b.semNo
  );

  let priorUnpaidQueue: CarriedForwardDuesItem[] = [];

  const processedHistory: SemesterRecord[] = sorted.map((sem) => {
    // Clone prior unpaid items for this semester
    const semCarryItems: CarriedForwardDuesItem[] = priorUnpaidQueue.map((item) => ({ ...item }));
    const totalCarriedIn = semCarryItems.reduce((acc, i) => acc + i.remainingDue, 0);

    let paymentRemaining = sem.paid;

    // 1. Waterflow payment into carried-forward arrears first (oldest first)
    for (const item of semCarryItems) {
      if (paymentRemaining <= 0) break;
      const alloc = Math.min(item.remainingDue, paymentRemaining);
      item.remainingDue -= alloc;
      paymentRemaining -= alloc;
    }

    // 2. Remaining payment applies to current semester netDemand
    const currentPaid = Math.min(sem.netDemand, paymentRemaining);
    const currentUnpaid = Math.max(0, sem.netDemand - currentPaid);

    // Active carried-forward remaining in this semester
    const remainingCarried = semCarryItems
      .filter((i) => i.remainingDue > 0)
      .reduce((acc, i) => acc + i.remainingDue, 0);

    const effectiveTotalOutstanding = currentUnpaid + remainingCarried;

    // Update priorUnpaidQueue for the next semester:
    // Retain still-unpaid items from this carry, and if this semester has currentUnpaid > 0, add it!
    priorUnpaidQueue = semCarryItems
      .filter((i) => i.remainingDue > 0)
      .map((i) => ({ ...i }));

    if (currentUnpaid > 0) {
      priorUnpaidQueue.push({
        fromSemNo: sem.semNo,
        fromSemLabel: sem.semLabel,
        fromAcademicYear: sem.academicYear,
        originalDue: currentUnpaid,
        remainingDue: currentUnpaid,
      });
    }

    const activeBreakdown = semCarryItems.filter((i) => i.remainingDue > 0);

    return {
      ...sem,
      currentSemDemand: sem.netDemand,
      currentSemPaid: currentPaid,
      currentSemOutstanding: currentUnpaid,
      carriedForwardDues: totalCarriedIn,
      carriedForwardBreakdown: activeBreakdown,
      // If the record had an explicit pre-seeded outstanding (like Sem 3 pre-seeds), respect it while maintaining carry breakdown
      outstanding: effectiveTotalOutstanding > 0 ? effectiveTotalOutstanding : sem.outstanding,
    };
  });

  const latest = processedHistory[processedHistory.length - 1];
  const activeBreakdown = latest?.carriedForwardBreakdown || [];
  const carriedForwardDue = activeBreakdown.reduce((sum, item) => sum + item.remainingDue, 0);
  const currentSemesterDue = latest
    ? (latest.currentSemOutstanding ?? Math.max(0, latest.outstanding - carriedForwardDue))
    : 0;
  const totalOutstandingDue = currentSemesterDue + carriedForwardDue;

  return {
    studentId,
    history: processedHistory,
    currentSemester: latest || null,
    currentSemesterDue,
    carriedForwardDue,
    totalOutstandingDue,
    hasCarriedForward: carriedForwardDue > 0,
    activeCarryForwardBreakdown: activeBreakdown,
  };
}
