import {

  students,

  admittedStudents,

  prospectiveStudents,

  allStudentsWithProspective,

  transactions,

  feeHeads,

  ageing,

  instalmentPlans,

  inr,

  type Student,

  type Transaction,

  type View,

  type AdmissionMode,

  type AdmissionStatus,

} from "../database/finance-data";

import {

  getStudentAccount,

  snapshot,

  refund,

  readFinance,

  resolveStudentIdentity,

  getUnifiedStudentContext,


  getCrossDomainScholarshipAndOverdue,

  getLargestReconciliationMismatch,

  getProactiveInstitutionalSignals,

  computeScholarshipEligibilityTimeline,

  getStudentAcademicHistory,

  getStudentExamEligibility,

  getStudentDuesBreakdown,

  getAllStudentsAdmitCardStatus,

  type AdmitCardStatus,

  type CohortAdmitCardSummary,

  getStudentPermissionRequests,

  getAllPermissionRequests,

  getPermissionRequestsSummary,

  getPendingPermissionRequestsCount,

  type ExamEligibilityResult,

  type FinanceTopic

} from "../services/finance-service";
import { deriveFeeAndScholarshipAction } from "../actions/scholarships";

import { scholarshipStatus } from "../database/scholarship-status";



export type { View };



export interface NavigationAction {

  view: View;

  studentId?: string;

  transactionId?: string;

  searchQuery?: string;

  reason?: string;

}



export interface AiChatMessage {

  role: "user" | "assistant";

  content: string;

  kind?: "student" | "breakdown" | "reconcile" | "refund" | "tax" | "loan" | "waterfall" | "general" | "navigation" | "denied";

  navigation?: NavigationAction;

  actionSummary?: string;

  metadata?: Record<string, any>;

}



export interface AgentContext {

  role?: "admin" | "finance-officer" | "student";

  currentStudentId?: string;

  currentView?: string;

  liveStudents?: Student[];

  liveTransactions?: Transaction[];

}



// Detect if query is in Hindi / Hinglish

export function isHinglishQuery(text: string): boolean {

  const hindiKeywords = [

    "kya", "hai", "kaise", "kitna", "kitni", "batao", "bata do", "fees", "baki", "mera", "meri",

    "bhai", "kaha", "kab", "milega", "chahiye", "kuch", "hoga", "konsa", "kisko", "kyun",

    "paisa", "rupaye", "maaf", "chhut", "rakha", "nahi", "tha", "raha", "dena", "dene",

    "kholo", "dikhao", "le chalo", "dikhaye", "open karo", "check karo", "bhejo", "chalo", "jao"

  ];

  const lower = text.toLowerCase();

  const matched = hindiKeywords.filter(k => new RegExp(`\\b${k}\\b`, "i").test(lower));

  return matched.length >= 2 || /bhai|kya hai|kitna|kaise|batao|bata do|kholo|dikhao|le chalo|jao|chalo/i.test(lower);

}



// Detect if query is in Telugu

export function isTeluguQuery(text: string): boolean {

  const teluguKeywords = [

    "emiti", "entha", "ela", "cheppu", "kavali", "chupinchu", "ledu", "undhi", "undi",

    "epudu", "ekkada", "naa", "na", "neeku", "naku", "maa", "manadi", "fees", "balance",

    "kattu", "kattali", "open chey", "chudu", "vellu", "ra", "babu", "garu", "ayya"

  ];

  const lower = text.toLowerCase();

  const matched = teluguKeywords.filter(k => new RegExp(`\\b${k}\\b`, "i").test(lower));

  return matched.length >= 2 || /emiti|entha|ela|cheppu|chupinchu|open chey/i.test(lower);

}



// Smart entity resolution for students using authoritative 5-tier resolution

export function findMentionedStudents(query: string, customPool?: Student[]): Student[] {

  const pool = customPool && customPool.length > 0 ? customPool : allStudentsWithProspective;

  const res = resolveStudentIdentity(query, pool);

  if (res.status === "matched") return [res.student];

  if (res.status === "ambiguous") return res.candidates;

  return [];

}



// Smart entity resolution for transactions

export function findMentionedTransaction(query: string, customTxns?: Transaction[]): Transaction | null {

  const lower = query.toLowerCase();

  const txns = customTxns && customTxns.length > 0 ? customTxns : transactions;

  for (const t of txns) {

    if (lower.includes(t.id.toLowerCase()) || (t.id.replace("TXN-", "").length >= 4 && lower.includes(t.id.replace("TXN-", "")))) {

      return t;

    }

  }

  return null;

}



export interface NavigationIntentResult {

  wantsNav: boolean;

  targetView: View | null;

  studentId?: string;

  transactionId?: string;

}



// Check if query is explicitly asking to navigate/switch views or open student/transaction drawers

export function detectNavigationIntent(query: string, customPool?: Student[], customTxns?: Transaction[]): NavigationIntentResult {

  const lower = query.toLowerCase().trim();



  // 1. Navigation Action Verbs (English & Hindi/Hinglish)

  const explicitNavPhrase = /\b(show|kholo|khol do|kholna|le chalo|le chal|chalo|chal|jao|le jao|dikhao|dikhaye|dekhna hai|chalna hai|open karo|karo open|navigate karo|leke chalo|navigate|navigation|go to|take me to|switch to|redirect|visit|open|display|view screen|view page|head to)\b|desk pe|desk par|page pe|page par|section pe|section par|screen pe|screen par|tab pe|tab par/i.test(lower);



  // Pure data questions without navigation action

  const isPureInfoQuestion = /^(kya hai|what is|kitna|kitni|kaise|why|reason|explain|documents?|rules?|slabs?)\b/i.test(lower) && !explicitNavPhrase;



  // 2. Specific Entity Navigation (Student Drawer or Transaction Review)

  const pool = customPool && customPool.length > 0 ? customPool : allStudentsWithProspective;

  const matchedStudent = findMentionedStudents(query, pool)[0];

  const mentionedTxn = findMentionedTransaction(query, customTxns);



  // If asking to open or check a specific student's account/drawer/profile

  if (matchedStudent && (explicitNavPhrase || /\b(account|profile|drawer|ledger|record)\b/i.test(lower))) {

    return {

      wantsNav: true,

      targetView: "Students",

      studentId: matchedStudent.id,

    };

  }



  // If query mentions a specific transaction that does NOT exist, do NOT navigate to payments

  const rawTxnMatch = lower.match(/\b(txn-?\d+)\b/i);

  if (rawTxnMatch && !mentionedTxn) {

    return {

      wantsNav: false,

      targetView: null,

    };

  }



  // If asking to open a specific verified transaction

  if (mentionedTxn && (explicitNavPhrase || /\b(check|review|inspect|open|kholo|dikhao)\b/i.test(lower))) {

    return {

      wantsNav: true,

      targetView: "Payments",

      transactionId: mentionedTxn.id,

    };

  }



  // 3. View Detection

  let targetView: View | null = null;

  if (/fee structure|fees? structure|fee rules|fee heads|tuition fee heads|head wise fee|fee slabs|fee schedule/i.test(lower)) {

    targetView = "Fee Structure";

  } else if (/students? directory|students? section|students? list|students? page|students? portal|student directory|student accounts?|all students?|admissions? directory|prospective directory|baccho ka section|enrolled students/i.test(lower) || (/\b(students?)\b/i.test(lower) && explicitNavPhrase && !/scholarship risk|loan|reminder|dues|balance/i.test(lower))) {

    targetView = "Students";

  } else if (/reconciliation|reconcile|settlement center|settlement desk|bank mismatch|gateway mismatch|mismatch desk/i.test(lower)) {

    targetView = "Reconciliation";

  } else if (/payments? page|payments? section|transactions? list|transactions? page|receipts? ledger|receipts? section|payments? ledger|payments? desk/i.test(lower) || (/\b(payments?|transactions?|receipts?)\b/i.test(lower) && explicitNavPhrase)) {

    targetView = "Payments";

  } else if (/instalments?|installments?|split payments?|split plans?|instalment schedule|installment schedule|moratorium|emi plans?/i.test(lower)) {

    targetView = "Instalments";

  } else if (/smart reminders?|reminders? desk|reminders? page|reminders? section|distress suppression|automated notices?/i.test(lower) || (/\b(reminders?)\b/i.test(lower) && explicitNavPhrase)) {

    targetView = "Smart Reminders";

  } else if (/scholarship risks?|scholarship renewal|scholarships? desk|scholarships? section|scholarship page|cgpa risk/i.test(lower) || (/\b(scholarship risks?)\b/i.test(lower))) {

    targetView = "Scholarship Risks";

  } else if (/loan requests?|loan desk|loans? section|loans? page|bank loans?|education loans?|vidyalakshmi/i.test(lower) || (/\b(loans?)\b/i.test(lower) && explicitNavPhrase)) {

    targetView = "Loan Requests";

  } else if (/counsellor desk|counselor desk|counsellor|counselor|permissions? desk|permission requests?|condonation desk|permission letter/i.test(lower)) {

    targetView = "Counsellor Desk";

  } else if (/admit cards?|hall tickets?|exam clearance desk|exam hall ticket/i.test(lower)) {

    targetView = "Admit Cards";

  } else if (/refunds? page|refund desk|refunds? section|refund review|ugc refund|cancellations? desk/i.test(lower) || (/\b(refunds?)\b/i.test(lower) && explicitNavPhrase)) {

    targetView = "Refunds";

  } else if (/reports? page|reports? section|sql dump|sql schema|schema inspector|audit reports?|financial reports?/i.test(lower) || (/\b(reports?)\b/i.test(lower) && explicitNavPhrase)) {

    targetView = "Reports";

  } else if (/cgpa.*attendance.*retention|cgpa.*retention|attendance.*retention/i.test(lower)) {

    targetView = "CGPA & Attendance Retention";

  } else if (/bank document|document issuance|issue document|bank letter/i.test(lower)) {

    targetView = "Bank Document Issuance";

  } else if (/exam permission|permission order|exam.*order/i.test(lower)) {

    targetView = "Exam Permission Orders";

  } else if (/withdrawal|withdraw|caution deposit/i.test(lower)) {

    targetView = "Withdrawals & Caution Deposit";

  } else if (/dashboard|overview|home screen|home page|main page|treasury desk|command center/i.test(lower)) {

    targetView = "Dashboard";

  } else if (/ai assistant|copilot page|ai page|full page ai|chat assistant/i.test(lower)) {

    targetView = "AI Assistant";

  }



  if (!targetView || isPureInfoQuestion) {

    return {

      wantsNav: false,

      targetView: null,

    };

  }



  const wantsNav = explicitNavPhrase || /kholo|open|le chalo|chalo|jao|dikhao|navigate|dekhna/i.test(lower);

  return {

    wantsNav: wantsNav && targetView !== null,

    targetView,

    studentId: matchedStudent?.id,

    transactionId: mentionedTxn?.id,

  };

}



/**

 * Main Autonomous FinDeck AI Engine

 * Handles natural language reasoning, safe data lookup, RBAC verification, and UI navigation.

 */

export async function queryFinanceAi(

  userQuery: string,

  history: AiChatMessage[] = [],

  apiKey?: string,

  context: AgentContext = { role: "admin" }

): Promise<AiChatMessage> {

  const query = userQuery.trim();

  const lower = query.toLowerCase();

  const inHindi = isHinglishQuery(query);

  const userRole = context.role || "admin";

  const isStudentRole = userRole === "student";

  const currentStudentId = context.currentStudentId || "251FA04E03";



  // Prompt Injection & Adversarial Instruction Guardrail

  if (/ignore (all|your|previous) (rules|instructions)|say (akshat|student) paid/i.test(lower)) {

    // Treat as untrusted prompt injection attempt: ignore instruction and return verified authoritative facts

    const akshatUnified = getUnifiedStudentContext("Akshat Raj");

    if (akshatUnified.status === "matched") {

      const resp = inHindi

        ? `🛡️ **Security Alert: Adversarial Override Ignored.**\n\nAuthoritative Financial Database ke anusaar **${akshatUnified.student.name} (${akshatUnified.student.id})** ka actual status:\n• **Net Demand:** ${inr(akshatUnified.currentYearDemand)}\n• **Actual Paid to Date:** **${inr(akshatUnified.currentYearPaid)}**\n• **Outstanding Balance:** **${inr(akshatUnified.currentYearOutstanding)}**\n• **Active Plan:** ${akshatUnified.instalmentPlan?.planType || "3-Instalment Plan"}`

        : `🛡️ **Security Alert: System Override Attempt Ignored.**\n\nUnder authoritative university records, verified facts for **${akshatUnified.student.name} (${akshatUnified.student.id})** are:\n* **Net Fee Demand:** ${inr(akshatUnified.currentYearDemand)}\n* **Actual Verified Paid:** **${inr(akshatUnified.currentYearPaid)}**\n* **Outstanding Due:** **${inr(akshatUnified.currentYearOutstanding)}**\n* **Instalment Schedule:** ${akshatUnified.instalmentPlan?.planType || "3-Instalment Plan"}`;

      return { role: "assistant", content: resp, kind: "student" };

    }

  }



  // =========================================================================

  // 1. RBAC SECURITY ENFORCEMENT (Role Gatekeeper)

  // =========================================================================

  if (isStudentRole) {

    // Prohibit student from asking for other students or institutional macro audit logs

    const requestedOtherStudent = findMentionedStudents(query).some(s => s.id !== currentStudentId);

    const asksAboutPeers = /other student|dusre bache|dusre student|classmate|sabka|all student|total student|everyone|peers|any other|kisi aur/i.test(lower);

    const asksMacroTreasury = /macro|treasury|total collection|total revenue|kitna paisa|kitna revenue|kitna kamaya|university report|audit log|schema inspector|reconciliation mismatch|all refund|admin|officer/i.test(lower);



    if (requestedOtherStudent || asksAboutPeers || asksMacroTreasury) {

      const inTelugu = isTeluguQuery(query);

      if (inTelugu) {

        return {

          role: "assistant",

          content: `🔒 **Access Restricted (Student Privacy Policy):**\n\nNenu mee gurinchi matrame details chupinchagalanu, vere students gurinchi kaadu. University privacy rules prakaram, meeru mee details matrame chuskovachu. Finance vishayalu chudadaniki permission ledu.`,

          kind: "denied",

        };

      } else if (inHindi) {

        return {

          role: "assistant",

          content: `🔒 **Access Restricted (Student Privacy Policy):**\n\nMain sirf aapka khud ka data dikha sakta hoon, kisi aur student ka data access karne ki permission nahi hai. University bylaws ke mutabiq aapko sirf apni details dekhne ka access hai.`,

          kind: "denied",

        };

      }

      return {

        role: "assistant",

        content: `🔒 **Access Restricted (Student Data Privacy Policy):**\n\nI can only show your own data. I am not permitted to access or reveal another student's data. Under university privacy policy, you only have access to your personal financial records.`,

        kind: "denied",

      };

    }

  }



  // =========================================================================

  // 2. STRICT FINANCIAL WRITE GUARDRAILS (Read-Only Safety & Mutation Requests)

  // =========================================================================

  const hasWriteOperation = /\b(approve|pay\b|transfer\b|execute|send money|wipe dues|delete record|clear balance|modify fee|waive)\b|refund approve|loan approve|fee payment/i.test(lower) && !/explain|how to pay|how is paid|payment history|payment receipts|payment method|payment mode|payment allocation|overdue payments|payment reconciliation/i.test(lower);

  const hasNavPhrase = /kholo|open|le chalo|dikhao|show|go to/i.test(lower);



  // Special Combined Guardrail Case: e.g., "refund page kholo aur refund approve kar do"

  if (hasWriteOperation && (hasNavPhrase || /refund page|loan desk|payments page/i.test(lower))) {

    let targetNavView: View | undefined;

    if (/refund/i.test(lower)) targetNavView = "Refunds";

    else if (/loan/i.test(lower)) targetNavView = "Loan Requests";

    else if (/payment/i.test(lower)) targetNavView = "Payments";



    if (inHindi) {

      return {

        role: "assistant",

        content: `⚠️ **Security Guardrail (Read-Only AI):**\nMain aapko **${targetNavView || "requested"}** screen par le ja raha hoon taaki aap details review kar sakein.\n\n❌ **Refund/Financial Action Denied:** finDeck AI autonomous fund transfer, payment execution ya refund approval perform nahi kar sakta. University Financial Bylaws ke anusaar financial transactions ke liye authorized Finance Officer ka digital signature aur 2FA zaroori hai.`,

        kind: targetNavView === "Refunds" ? "refund" : "general",

        navigation: targetNavView ? { view: targetNavView, reason: `Navigated to ${targetNavView} for manual review` } : undefined,

        actionSummary: targetNavView ? `Opening ${targetNavView} for manual review…` : undefined,

      };

    }

    return {

      role: "assistant",

      content: `⚠️ **Security Guardrail (Read-Only AI):**\nNavigating you to **${targetNavView || "the requested"}** screen for human verification.\n\n❌ **Financial Mutation Blocked:** finDeck AI operates strictly as a read-only copilot and cannot approve refunds, process payments, or disburse funds. All financial approvals require an authorized human Finance Officer with multi-factor authentication (2FA).`,

      kind: targetNavView === "Refunds" ? "refund" : "general",

      navigation: targetNavView ? { view: targetNavView, reason: `Navigated to ${targetNavView} for manual review` } : undefined,

      actionSummary: targetNavView ? `Opening ${targetNavView} for manual review…` : undefined,

    };

  }



  if (hasWriteOperation) {

    if (inHindi) {

      return {

        role: "assistant",

        content: "⚠️ **Security & Audit Guardrail Active:**\nMain finDeck ka read-only AI Assistant hoon. Main calculations, audit reconciliation aur automated navigation kar sakta hoon, lekin financial transactions (jaise payment, refund approval, transfer, ya balance change) perform karna allowed nahi hai. Iske liye ek authenticated Finance Officer ka 2FA authorization zaroori hai.",

        kind: "denied",

      };

    }

    return {

      role: "assistant",

      content: "⚠️ **Security & Audit Guardrail Active:**\nI operate strictly as finDeck's read-only AI Assistant. I can assist with calculations, reconciliation audits, and automated UI navigation, but I am prohibited from executing financial transactions (such as payments, refunds, transfers, or balance alterations). Financial mutations require an authorized Finance Officer with 2FA verification.",

      kind: "denied",

    };

  }



  // =========================================================================

  // 3. LIVE GEMINI LLM INTEGRATION (Role-Aware Context)

  // =========================================================================

  const effectiveKey = (

    (apiKey && apiKey.trim().length > 10 ? apiKey.trim() : "") ||

    (typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "") : "") ||

    (typeof window !== "undefined" ? (localStorage.getItem("feewise_gemini_api_key") || "") : "")

  ).trim();



  if (effectiveKey && effectiveKey.length > 10) {

    try {

      const response = await callLiveGeminiApi(query, history, effectiveKey, context);

      if (response) return response;

    } catch (err) {

      console.warn("Live Gemini API call error, falling back to local autonomous engine:", err);

    }

  }



  // =========================================================================

  // 3. CROSS-DOMAIN ANALYTICAL QUERIES (Intersections, Mismatches & Signals)

  // =========================================================================



  // 3.1 Intersection: High Scholarship Risk + Overdue Dues

  if (/high.*scholarship risk.*overdue|scholarship risk.*overdue|scholarship risk.*due|kis.*overdue bhi hai|kaunse students.*risk.*overdue/i.test(lower)) {

    const intersections = getCrossDomainScholarshipAndOverdue();

    if (intersections.length === 0) {

      const msg = inHindi

        ? "✅ Current institutional records mein koi bhi aisa student nahi hai jo Scholarship Risk aur Overdue Dues dono mein flagged ho."

        : "✅ In current institutional datasets, no students simultaneously satisfy both scholarship renewal risk and active overdue criteria.";

      return { role: "assistant", content: msg, kind: "general" };

    }



    const rows = intersections.map(s =>

      `• **${s.name}** (\`${s.studentId}\` · ${s.programme}):\n  - **Scholarship Risk:** 🚨 **${s.riskLevel}** (CGPA: ${s.cgpa} / Min: 7.50 · Attendance: ${s.attendancePct}% / Min: 75%)\n  - **Outstanding Due:** **${inr(s.outstandingDues)}** (${s.overdueDays} din overdue)\n  - **Scholarship at Risk:** ${inr(s.scholarshipCreditAtRisk)} tuition credit`

    ).join("\n\n");



    if (inHindi) {

      return {

        role: "assistant",

        content: `🎯 **Cross-Domain Analysis: Scholarship Risk + Overdue Ledgers:**\n\nAuthoritative records ke anusaar yeh student(s) dono conditions satisfy karte hain:\n\n${rows}\n\n💡 *Bursar & Academic Council ko immediate joint advisory report dispatch ki gayi hai.*`,

        kind: "general",

      };

    }

    return {

      role: "assistant",

      content: `### 🎯 Cross-Domain Analysis: High Scholarship Risk + Overdue Ledgers\n\nCross-referencing the active scholarship risk registry against student overdue ledgers:\n\n${rows}\n\n*Joint academic counseling and bursar intervention recommended before semester registration.*`,

      kind: "general",

    };

  }



  // 3.2 Largest Reconciliation Mismatch

  if (/sabse bada mismatch|largest mismatch|biggest mismatch|highest difference|maximum mismatch/i.test(lower)) {

    const mismatchData = getLargestReconciliationMismatch();

    if (!mismatchData.largestMismatch) {

      const msg = inHindi ? "✅ Koi gateway settlement mismatch nahi mila." : "✅ No gateway reconciliation mismatches detected.";

      return { role: "assistant", content: msg, kind: "reconcile" };

    }



    const m = mismatchData.largestMismatch;

    const studentObj = students.find(s => s.id === m.student);

    if (inHindi) {

      return {

        role: "assistant",

        content: `⚖️ **Largest Reconciliation Mismatch in Queue:**\n\n• **Transaction ID:** **${m.id}** (Student: ${studentObj ? studentObj.name : m.student})\n• **Gateway Amount Captured:** ${inr(m.gateway)}\n• **Ledger Settled Amount:** ${inr(m.ledger)}\n• **Discrepancy (Variance):** ⚠️ **${inr(m.difference)}** (Sabse bada difference)\n• **Payment Method & Date:** ${m.method} · ${m.date}\n• **Status:** **${m.status}** (Requires manual clearance)`,

        kind: "reconcile",

        metadata: { transactionId: m.id, difference: m.difference },

      };

    }

    return {

      role: "assistant",

      content: `### ⚖️ Largest Reconciliation Mismatch in Settlement Queue\n\n* **Transaction ID:** **${m.id}** (Student: ${studentObj ? studentObj.name : m.student} / \`${m.student}\`)\n* **Gateway Amount Captured:** ${inr(m.gateway)}\n* **Ledger Settled Amount:** ${inr(m.ledger)}\n* **Variance:** ⚠️ **${inr(m.difference)}** (Highest discrepancy in queue)\n* **Payment Method & Timestamp:** ${m.method} · ${m.date}\n* **Audit Status:** **${m.status}** (Awaiting manual audit clearance)`,

      kind: "reconcile",

      metadata: { transactionId: m.id, difference: m.difference },

    };

  }



  // 3.3 Proactive Institutional Issues & Signals ("Finance mein kya important hai?")

  if (/kya important hai|major issues|where is money stuck|what should i look at|signals|institutional signals/i.test(lower) && !/collection intelligence/i.test(lower)) {

    const sigs = getProactiveInstitutionalSignals().signals;

    const bulletList = sigs.map(s => `• **${s.title}:** ${s.detail}`).join("\n");

    if (inHindi) {

      return {

        role: "assistant",

        content: `🚨 **VFSTR Finance Command Center — Today's Key Focus Areas:**\n\n${bulletList}\n\n💡 *Specific case inspect karne ke liye transaction ID ya student name bolein (e.g. "TXN-10483 review karo").*`,

        kind: "general",

      };

    }

    return {

      role: "assistant",

      content: `### 🚨 VFSTR Finance Command Center — Priority Insights\n\n${bulletList}\n\n*You can inspect any specific discrepancy by stating the ID or student name.*`,

      kind: "general",

    };

  }



  // =========================================================================

  // 4. SMART ENTITY RESOLUTION (Student Profile, Specific Heads & Dues)

  // =========================================================================

  const studentPool = (context.liveStudents && context.liveStudents.length > 0)

    ? context.liveStudents

    : allStudentsWithProspective;

  // PRIVACY LOCK: Student role => always resolve to the logged-in student only.

  // Name/ID-based resolution to any other student is strictly blocked.

  let targetStudent: Student | null = null;



  if (isStudentRole) {

    // Hard lock — only ever the authenticated student's own record

    const selfRes = resolveStudentIdentity(currentStudentId, studentPool);

    targetStudent = selfRes.status === "matched"

      ? selfRes.student

      : (studentPool.find(s => s.id === currentStudentId) || null);

  } else {

    const resolution = resolveStudentIdentity(query, studentPool);

    const isPersonalQuery = /mera due|mera balance|my dues|my balance|mera account|my fee|am i eligible|can i write|kya main|mera exam|meri eligibility|my exam|my permission|mera permission|can i give/i.test(lower);



    if (resolution.status === "matched") {

      targetStudent = resolution.student;

    } else if (isPersonalQuery && currentStudentId) {

      const selfRes2 = resolveStudentIdentity(currentStudentId, studentPool);

      targetStudent = selfRes2.status === "matched" ? selfRes2.student : (studentPool.find(s => s.id === currentStudentId) || studentPool[0]);

    } else if (resolution.status === "ambiguous") {

      const list = resolution.candidates.map(s => `• **${s.name}** (ID: \`${s.id}\` · ${s.programme})`).join("\n");

      const inTelugu = isTeluguQuery(query);

      if (inTelugu) {

        return {

          role: "assistant",

          content: `🔍 **Multiple Matching Student Records Found:**\nMeeru vetukutunna peru to chala students unnaru. Meeru evari gurinchi adugutunnaru?\n\n${list}\n\nDaya chesi correct Student ID ivvandi (e.g. *"Student ${resolution.candidates[0].id} dues entha?"*).`,

        };

      } else if (inHindi) {

        return {

          role: "assistant",

          content: `🔍 **Multiple Matching Student Records Found:**\nAapke search ke mutabik ek se zyada students mile hain. Kya aapka matlab inmein se kisi ek se tha?\n\n${list}\n\nKripya specific student ID mention karein (jaise: *"Student ${resolution.candidates[0].id} ka dues batao"*).`,

        };

      }

      return {

        role: "assistant",

        content: `🔍 **Ambiguous Student Query:**\nMultiple student records matched your request. Did you mean one of the following?\n\n${list}\n\nPlease specify the exact Student ID (e.g. *"Open ledger for ${resolution.candidates[0].id}"*).`,

      };

    }

  }



  // Check navigation intent

  const navResult = detectNavigationIntent(query, studentPool, context.liveTransactions);

  const { wantsNav, targetView } = navResult;



  // =========================================================================

  // 4. SPECIFIC STUDENT INQUIRIES & DEEP ATTRIBUTE REASONING

  // =========================================================================

  if (targetStudent) {

    const account = getStudentAccount(targetStudent.id);

    const due = targetStudent.demand - targetStudent.paid;



    // 4.0a Specific Question: Exam Eligibility, Automated Admit Cards & Clearance (Steps 4 & 6)

    if (/exam.*eligib|eligib.*exam|hall ticket|admit card|exam me baith|baith sakta|appear.*exam|give.*exam|write.*exam|clearance.*exam|withheld.*exam|exam.*withheld|why.*not.*eligib|can i generate.*admit card/i.test(lower)) {

      const eligibility = getStudentExamEligibility(targetStudent.id);

      const permRequests = getStudentPermissionRequests(targetStudent.id);

      const pendingReq = permRequests.find(r => r.status === "Pending");

      const approvedReq = permRequests.find(r => r.status === "Approved");

      const duesBreak = eligibility.duesBreakdown;



      if (inHindi) {

        let resp = eligibility.canGenerateAdmitCard

          ? `✅ **Admit Card & Exam Status: Manyata Prapt (${eligibility.admitCardStatus})**\n\n`

          : `🚫 **Admit Card & Exam Status: Radd / Blocked (${eligibility.admitCardStatus})**\n\n`;



        resp += `• **Student:** **${targetStudent.name}** (\`${targetStudent.id}\` · ${targetStudent.programme})\n`;

        resp += `• **Statutory Exam Eligibility:** **${eligibility.isEligible ? "Eligible" : "Not Eligible / Withheld"}**\n`;

        resp += `• **Admit Card Status:** ${

          eligibility.admitCardStatus === "CLEAN_ELIGIBLE"

            ? "✅ **Regular Clean Admit Card Available** (Zero Dues & Attendance ≥ 75%)"

            : eligibility.admitCardStatus === "PROVISIONAL_DUES"

            ? "⚠️ **Provisional Admit Card Available** (Pending Dues Notice & Undertaking Clause)"

            : eligibility.admitCardStatus === "CONDONED_ELIGIBLE"

            ? `✅ **Condoned Admit Card Available** (Dean Order Ref: \`${eligibility.condonationRef}\`)`

            : "🚫 **Admit Card Strictly Blocked** (Attendance < 75% without Condonation)"

        }\n`;

        resp += `• **Attendance:** **${eligibility.attendance.toFixed(1)}%** ${eligibility.attendance >= 75.0 ? "(Qualified: Min 75.0% Required ✅)" : "(Shortfall: Mandatory 75.0% se kam ❌)"}\n`;

        resp += `• **Total Outstanding Dues:** **${inr(eligibility.outstandingDues)}**\n`;



        if (duesBreak?.hasCarriedForward) {

          resp += `  - Current Semester Dues: ${inr(duesBreak.currentSemesterDue)}\n`;

          resp += `  - Carried-Forward Prior Arrears: ${inr(duesBreak.carriedForwardDue)}\n`;

        }



        resp += `• **Audit Decision:** ${eligibility.admitCardStatusDescription}\n`;



        if (eligibility.admitCardStatus === "PROVISIONAL_DUES") {

          resp += `\n💡 **Dues Undertaking Rule:** Dues hone ke bawajood aapka admit card block nahi hota. Provisional Admit Card issue ho gaya hai, jisme results undertaking clause stamped hai. Student Portal se aap admit card download kar sakte hain.\n`;

        } else if (eligibility.admitCardStatus === "BLOCKED_ATTENDANCE") {

          resp += `\n📌 **Remedy / Nivaaran:**\n`;

          resp += `Attendance 75% se kam hone ke karan admit card blocked hai. Student Portal ke **Exam Clearance** tab se online Condonation Petition submit karein taaki Dean of Student Affairs condone kar sakein.\n`;

        }



        if (pendingReq) {

          resp += `\n⏳ **Active Request:** Aapka permission letter (\`${pendingReq.id}\`) abhi **Pending** hai. Student Portal se tracking check karein.\n`;

        }



        return {

          role: "assistant",

          content: resp,

          kind: "student",

          metadata: {

            studentId: targetStudent.id,

            isEligible: eligibility.isEligible,

            canGenerateAdmitCard: eligibility.canGenerateAdmitCard,

            admitCardStatus: eligibility.admitCardStatus,

            attendance: eligibility.attendance,

            outstandingDues: eligibility.outstandingDues,

          },

        };

      } else {

        let resp = eligibility.canGenerateAdmitCard

          ? `### ✅ Admit Card & Exam Clearance: GENERATION CLEARED\n\n`

          : `### 🚫 Admit Card & Exam Clearance: GENERATION BLOCKED\n\n`;



        resp += `* **Student:** **${targetStudent.name}** (\`${targetStudent.id}\` · ${targetStudent.programme})\n`;

        resp += `* **Statutory Exam Eligibility:** **${eligibility.isEligible ? "ELIGIBLE" : "NOT ELIGIBLE"}** (${eligibility.status})\n`;

        resp += `* **Admit Card Status:** ${

          eligibility.admitCardStatus === "CLEAN_ELIGIBLE"

            ? "**CLEAN REGULAR ADMIT CARD (ALL CLEAR)** ✅ (Official Hall Ticket Released & Ready for Download)"

            : eligibility.admitCardStatus === "PROVISIONAL_DUES"

            ? "**PROVISIONAL ADMIT CARD ISSUED (DUES UNDERTAKING)** ⚠️"

            : eligibility.admitCardStatus === "CONDONED_ELIGIBLE"

            ? `**CONDONED ADMIT CARD ISSUED (DEAN ORDER ${eligibility.condonationRef})** ✅`

            : "**STRICTLY BLOCKED (ATTENDANCE BREACH)** 🚫"

        }\n`;

        resp += `* **Attendance Check:** **${eligibility.attendance.toFixed(1)}%** ${eligibility.attendance >= 75.0 ? "(Threshold: ≥ 75.0% Met ✅)" : "(Below Mandatory 75.0% Requirement ❌)"}\n`;

        resp += `* **Total Outstanding Dues:** **${inr(eligibility.outstandingDues)}**\n`;



        if (duesBreak?.hasCarriedForward) {

          resp += `  * Current Semester Due: ${inr(duesBreak.currentSemesterDue)}\n`;

          resp += `  * Historical Carried-Forward Arrears: ${inr(duesBreak.carriedForwardDue)}\n`;

        }



        resp += `* **Institutional Decision:** ${eligibility.admitCardStatusDescription}\n`;



        if (eligibility.admitCardStatus === "PROVISIONAL_DUES") {

          resp += `\n**Institutional Policy Note (VFSTR Ordinance 4.2 / 8.2):**\nOutstanding fees alone do *not* block your exam participation. Your provisional admit card is ready to view and download from Student Portal, stamped with a mandatory undertaking requiring dues settlement prior to semester result declaration.\n`;

        } else if (eligibility.admitCardStatus === "BLOCKED_ATTENDANCE") {

          resp += `\n**Statutory Resolution Protocol:**\nYour attendance is below 75.0%, creating a strict regulatory block. Please file an online Condonation Request via the Student Portal Exam tab for Dean of Student Affairs review.\n`;

        }



        if (pendingReq) {

          resp += `\n⏳ **Pending Permission Request:** Request \`${pendingReq.id}\` is currently registered and undergoing administrative review.\n`;

        }



        return {

          role: "assistant",

          content: resp,

          kind: "student",

          metadata: {

            studentId: targetStudent.id,

            isEligible: eligibility.isEligible,

            canGenerateAdmitCard: eligibility.canGenerateAdmitCard,

            admitCardStatus: eligibility.admitCardStatus,

            attendance: eligibility.attendance,

            outstandingDues: eligibility.outstandingDues,

          },

        };

      }

    }



    // 4.0b Specific Question: Carried-Forward Dues Lineage & Waterfall Settlement (Step 6)

    if (/carried.*forward|carry.*forward|prior.*sem.*due|previous.*sem.*due|purane semester|purani dues|pichle semester|carry.*arrear/i.test(lower)) {

      const breakdown = getStudentDuesBreakdown(targetStudent.id);

      if (inHindi) {

        let resp = `### 📋 Carried-Forward Dues Lineage — **${targetStudent.name}** (\`${targetStudent.id}\`)\n\n`;

        resp += `• **Current Semester Demand Due:** **${inr(breakdown.currentSemesterDue)}**\n`;

        resp += `• **Carried-Forward Prior Arrears:** **${inr(breakdown.carriedForwardDue)}**\n`;

        resp += `• **Total Authoritative Outstanding:** **${inr(breakdown.totalOutstandingDue)}**\n\n`;



        if (breakdown.hasCarriedForward) {

          resp += `📜 **Semester-wise Lineage (VFSTR Clause 4.2 Waterfall):**\n`;

          breakdown.activeCarryForwardBreakdown.forEach((item, idx) => {

            resp += `${idx + 1}. **Sem ${item.fromSemNo} (${item.fromSemLabel}):** Original Due: ${inr(item.originalDue)} → **Remaining Arrear: ${inr(item.remainingDue)}**\n`;

          });

          resp += `\n💡 **Waterfall Liquidation:** University Ordinance Clause 4.2 ke anusaar, aapki koi bhi payment sabse pehle purane carried-forward debt ko settle karti hai.`;

        } else {

          resp += `✅ **No Carried-Forward Dues:** Pichle semesters ka koi balance baki nahi hai.`;

        }

        return { role: "assistant", content: resp, kind: "breakdown" };

      } else {

        let resp = `### 📋 Carried-Forward Dues Lineage — **${targetStudent.name}** (\`${targetStudent.id}\`)\n\n`;

        resp += `* **Current Semester Net Demand Due:** **${inr(breakdown.currentSemesterDue)}**\n`;

        resp += `* **Historical Carried-Forward Arrears:** **${inr(breakdown.carriedForwardDue)}**\n`;

        resp += `* **Authoritative Total Outstanding:** **${inr(breakdown.totalOutstandingDue)}**\n\n`;



        if (breakdown.hasCarriedForward) {

          resp += `**Active Carried-Forward Arrears Lineage (VFSTR Policy Clause 4.2):**\n`;

          breakdown.activeCarryForwardBreakdown.forEach((item, idx) => {

            resp += `* **Sem ${item.fromSemNo} (${item.fromSemLabel} · ${item.fromAcademicYear}):** Original Arrear: ${inr(item.originalDue)} → **Active Outstanding: ${inr(item.remainingDue)}**\n`;

          });

          resp += `\n**Statutory Waterfall Liquidation:** Remittances are credited first to liquidate the oldest carried-forward liabilities before being applied to current term net demand.`;

        } else {

          resp += `✅ **No Historical Arrears:** All previous semester balances have been fully settled.`;

        }

        return { role: "assistant", content: resp, kind: "breakdown" };

      }

    }



    // 4.0b Specific Question: Permission Letter / Request Status

    if (/permission.*(request|letter|status)|status.*permission|mera permission|application.*exam|permission.*approve|permission.*pending/i.test(lower)) {

      const permRequests = getStudentPermissionRequests(targetStudent.id);

      if (permRequests.length === 0) {

        if (inHindi) {

          return {

            role: "assistant",

            content: `📄 **${targetStudent.name} (${targetStudent.id}) ke liye koi Exam Permission Request nahi mili.**\n\nAgar aapka attendance short hai (< 75%) ya dues pending hain, to aap **Student Portal -> Exam Hall Ticket & Permissions** tab se online letter submit kar sakte hain.`,

            kind: "student",

          };

        }

        return {

          role: "assistant",

          content: `### 📄 Exam Permission Letter Records: ${targetStudent.name} (${targetStudent.id})\n\nNo permission requests have been filed for this student record.\n\nStudents facing exam ineligibility due to attendance shortfall (< 75.0%) or outstanding fee balances can submit a formal permission letter through the **Student Portal -> Exam Hall Ticket & Permissions** tab.`,

          kind: "student",

        };

      }



      if (inHindi) {

        let resp = `📄 **${targetStudent.name} (${targetStudent.id}) ke Permission Requests:**\n\n`;

        permRequests.forEach(r => {

          const statusIcon = r.status === "Approved" ? "🟢" : r.status === "Rejected" ? "🔴" : "🟡";

          resp += `• **Request ID:** \`${r.id}\` | Status: ${statusIcon} **${r.status.toUpperCase()}**\n`;

          resp += `  - Reason: ${r.reason}\n`;

          resp += `  - Submitted On: ${r.submittedAt} (Snapshot: Dues ${inr(r.snapshottedDues)}, Att ${r.snapshottedAttendance}%)\n`;

          if (r.letterRef) resp += `  - 📜 **Official Letter Ref:** \`${r.letterRef}\`\n`;

          if (r.digitalSignature) resp += `  - ✍️ **Digital Signature:** ${r.digitalSignature.signatoryName} (${r.digitalSignature.signatoryRole}) · Code: \`${r.digitalSignature.verificationCode}\`\n`;

          if (r.status === "Approved") resp += `  - 📥 **PDF Letter:** Official permission letter digitally signed & ready to download in Student Portal Exam tab.\n`;

          if (r.reviewedBy) resp += `  - Reviewed By: ${r.reviewedBy} on ${r.reviewedAt}\n`;

          if (r.rejectionReason) resp += `  - ❌ **Rejection Note:** ${r.rejectionReason}\n`;

          if (r.counsellorNotes) resp += `  - 📝 **Counsellor Remarks:** ${r.counsellorNotes}\n`;

          resp += `\n`;

        });

        return {

          role: "assistant",

          content: resp.trim(),

          kind: "student",

          metadata: { studentId: targetStudent.id, requestsCount: permRequests.length },

        };

      } else {

        let resp = `### 📄 Exam Permission Request History: ${targetStudent.name} (${targetStudent.id})\n\n`;

        permRequests.forEach(r => {

          const statusIcon = r.status === "Approved" ? "🟢" : r.status === "Rejected" ? "🔴" : "🟡";

          resp += `* **Request Ref:** \`${r.id}\` — ${statusIcon} **${r.status.toUpperCase()}**\n`;

          resp += `  * **Category/Reason:** ${r.reason}\n`;

          resp += `  * **Filing Date:** ${r.submittedAt} (Snapshotted Arrears: ${inr(r.snapshottedDues)}, Attendance: ${r.snapshottedAttendance}%)\n`;

          if (r.letterRef) resp += `  * 📜 **Official Letter Ref:** \`${r.letterRef}\`\n`;

          if (r.digitalSignature) resp += `  * ✍️ **Digital Signature:** ${r.digitalSignature.signatoryName} (${r.digitalSignature.signatoryRole}) · Verification Code: \`${r.digitalSignature.verificationCode}\`\n`;

          if (r.status === "Approved") resp += `  * 📥 **PDF Document:** Official permission order digitally signed and available for download in the Student Portal Exam tab.\n`;

          if (r.reviewedBy) resp += `  * **Reviewed By:** ${r.reviewedBy} (${r.reviewedAt})\n`;

          if (r.rejectionReason) resp += `  * ❌ **Rejection Ground:** ${r.rejectionReason}\n`;

          if (r.counsellorNotes) resp += `  * 📝 **Administrative Notes:** ${r.counsellorNotes}\n`;

          resp += `\n`;

        });

        return {

          role: "assistant",

          content: resp.trim(),

          kind: "student",

          metadata: { studentId: targetStudent.id, requestsCount: permRequests.length },

        };

      }

    }



    // 4.1 Specific Question: Academic History, CGPA, and Scholarship Discontinuation

    if (/cgpa|gpa|semester|academic.*history|semester.*history|performance|discontinu|revok|band ho gaya|kyu band|why.*discontinu/i.test(lower)) {

      const timeline = computeScholarshipEligibilityTimeline(targetStudent.id);

      if (inHindi) {

        let resp = `📊 **${targetStudent.name} (${targetStudent.id}) ka Academic & Scholarship History:**\n\n`;

        resp += `• **Scholarship Status:** ${timeline.isDiscontinued ? "❌ **DISCONTINUED (Radd)**" : timeline.currentStatus === "AtRisk" ? "⚠️ **AT RISK (Warning Zone)**" : "✅ **ACTIVE (Surakshit)**"}\n`;

        if (timeline.isDiscontinued) {

          resp += `• **Discontinuation Reason:** ⚠️ ${timeline.discontinuationReason}\n`;

          resp += `• **Discontinuation Semester:** ${timeline.discontinuationSemester?.semLabel || "N/A"}\n`;

          resp += `• **Revoked Financial Aid:** ${inr(timeline.totalScholarshipRevoked)}\n`;

          resp += `• **Recalculated Fee:** Full gross fee charged (${inr(timeline.recalculatedDemand)})\n\n`;

        } else {

          resp += `• **Continuation Criteria:** Minimum CGPA 7.0 required to retain scholarship.\n\n`;

        }

        resp += `**Semester-wise Academic & Fee Breakdown:**\n`;

        timeline.history.forEach(s => {

          resp += `• **${s.semLabel} (${s.academicYear}):** SGPA ${s.cgpa.toFixed(2)} | Cumulative CGPA **${s.cumulativeCgpa.toFixed(2)}** | Attendance ${s.attendance}% | Gross Fee ${inr(s.grossFee)} | Scholarship ${inr(s.scholarshipApplied)} | Net Demand ${inr(s.netDemand)} | Status: **${s.scholarshipStatus}**\n`;

        });

        return {

          role: "assistant",

          content: resp,

          kind: "student",

          metadata: { studentId: targetStudent.id, isDiscontinued: timeline.isDiscontinued },

        };

      } else {

        let resp = `### 📊 Academic History & Scholarship Timeline: ${targetStudent.name} (${targetStudent.id})\n\n`;

        resp += `* **Scholarship Status:** ${timeline.isDiscontinued ? "❌ **DISCONTINUED**" : timeline.currentStatus === "AtRisk" ? "⚠️ **AT RISK (Warning Zone: 7.0–7.5)**" : "✅ **ACTIVE (Compliant)**"}\n`;

        if (timeline.isDiscontinued) {

          resp += `* **Discontinuation Reason:** ⚠️ ${timeline.discontinuationReason}\n`;

          resp += `* **Effective From:** ${timeline.discontinuationSemester?.semLabel || "N/A"}\n`;

          resp += `* **Revoked Financial Aid:** ${inr(timeline.totalScholarshipRevoked)}\n`;

          resp += `* **Recalculated Fee:** Full gross fee applied (${inr(timeline.recalculatedDemand)})\n\n`;

        } else {

          resp += `* **Continuation Criteria:** Minimum cumulative CGPA of 7.0 required to retain scholarship.\n\n`;

        }

        resp += `**Semester-by-Semester Records:**\n`;

        timeline.history.forEach(s => {

          resp += `* **${s.semLabel} (${s.academicYear}):** SGPA ${s.cgpa.toFixed(2)} | Cumulative CGPA **${s.cumulativeCgpa.toFixed(2)}** | Attendance ${s.attendance}% | Gross Fee ${inr(s.grossFee)} | Scholarship ${inr(s.scholarshipApplied)} | Net ${inr(s.netDemand)} | Status: **${s.scholarshipStatus}**\n`;

        });

        return {

          role: "assistant",

          content: resp,

          kind: "student",

          metadata: { studentId: targetStudent.id, isDiscontinued: timeline.isDiscontinued },

        };

      }

    }



    // 4.2 Specific Question: Payment History / Receipts of this Student

    if (/payment|paid|receipt|transaction|kab diya|kitna diya|history/i.test(lower)) {

      const studentTxns = transactions.filter(t => t.student === targetStudent.id);

      const txnList = studentTxns.length > 0

        ? studentTxns.map(t => `• **${t.id}:** ${inr(t.gateway)} via ${t.method} (${t.date}) — **${t.status}**`).join("\n")

        : `• Recent historical bank settlements total ${inr(targetStudent.paid)}.`;



      if (inHindi) {

        return {

          role: "assistant",

          content: `💳 **${targetStudent.name} (${targetStudent.id}) ki Payment History:**\n\n• **Total Paid Amount:** **${inr(targetStudent.paid)}**\n• **Net Demand:** ${inr(targetStudent.demand)}\n• **Remaining Due:** **${inr(due)}**\n\n**Verified Transactions:**\n${txnList}`,

          kind: "breakdown",

          metadata: { studentId: targetStudent.id, paid: targetStudent.paid },

        };

      }

      return {

        role: "assistant",

        content: `### 💳 Payment & Receipt Ledger: ${targetStudent.name} (${targetStudent.id})\n\n* **Total Amount Paid:** **${inr(targetStudent.paid)}**\n* **Total Net Demand:** ${inr(targetStudent.demand)}\n* **Remaining Balance:** **${inr(due)}**\n\n**Recent Receipts:**\n${txnList}`,

        kind: "breakdown",

        metadata: { studentId: targetStudent.id, paid: targetStudent.paid },

      };

    }



    // 4.3 Specific Question: Hostel Fee of this Student

    if (/hostel|room|mess|boarding/i.test(lower)) {

      const hostelFee = account?.fees.find(f => f.head === "Hostel");

      const hostelGross = hostelFee ? hostelFee.gross : 40000;

      const hostelPaid = hostelFee ? hostelFee.paid : (targetStudent.paid > 90000 ? Math.min(hostelGross, targetStudent.paid - 90000) : 0);

      const hostelDue = hostelGross - hostelPaid;



      if (inHindi) {

        return {

          role: "assistant",

          content: `🏠 **${targetStudent.name} (${targetStudent.id}) ka Hostel & Mess Fee Status:**\n\n• **Hostel Gross Demand:** ${inr(hostelGross)} / year\n• **Hostel Paid to Date:** ${inr(hostelPaid)}\n• **Hostel Outstanding Due:** **${inr(hostelDue)}**\n• **Waterfall Policy:** Clause 4.2 ke anusaar student ka partial payment pehle Tuition aur Exam clear karta hai, isliye Hostel head Rank 6 priority par settle hota hai.`,

          kind: "breakdown",

          metadata: { studentId: targetStudent.id, hostelDue },

        };

      }

      return {

        role: "assistant",

        content: `### 🏠 Hostel & Mess Fee Status: ${targetStudent.name} (${targetStudent.id})\n\n* **Hostel Annual Demand:** ${inr(hostelGross)}\n* **Amount Allocated/Paid:** ${inr(hostelPaid)}\n* **Outstanding Hostel Due:** **${inr(hostelDue)}**\n* **Apportionment Note:** Under VFSTR Clause 4.2, partial payments prioritize academic heads (Tuition & Exam) first, with residential board settled at Rank 6.`,

        kind: "breakdown",

        metadata: { studentId: targetStudent.id, hostelDue },

      };

    }



    // 4.3 Specific Question: Scholarship / Concession of this Student

    if (/scholarship|concession|waiver|discount|chhut|maaf/i.test(lower) && !/admission mode|mode kya hai|kis mode/i.test(lower)) {

      if (inHindi) {

        return {

          role: "assistant",

          content: `🎓 **${targetStudent.name} (${targetStudent.id}) ka Scholarship Status:**\n\n• **Sanctioned Scholarship:** **${inr(targetStudent.scholarship)}**\n• **Fee Concession:** ${targetStudent.concession > 0 ? inr(targetStudent.concession) : "N/A (No direct concession)"}\n• **Award Category:** ${targetStudent.scholarship > 0 ? "Merit/Need-based Award (Tuition Credit)" : "General Category (No Active Scholarship)"}\n• **Renewal Criteria:** Scholarship continuation ke liye semester mein minimum **7.50 CGPA** aur **75% Attendance** zaroori hai.`,

          kind: "student",

          metadata: { studentId: targetStudent.id, scholarship: targetStudent.scholarship },

        };

      }

      return {

        role: "assistant",

        content: `### 🎓 Scholarship & Concession Details: ${targetStudent.name} (${targetStudent.id})\n\n* **Sanctioned Merit Award:** **${inr(targetStudent.scholarship)}** (Applied as direct tuition credit)\n* **Institutional Concession:** ${targetStudent.concession > 0 ? inr(targetStudent.concession) : "None"}\n* **Net Fee Relief:** ${inr(targetStudent.scholarship + targetStudent.concession)}\n* **Renewal Policy:** Continuation requires meeting the minimum academic thresholds of **7.50 CGPA** and **>= 75% Attendance**.`,

        kind: "student",

        metadata: { studentId: targetStudent.id, scholarship: targetStudent.scholarship },

      };

    }



    // 4.3b Specific Question: Admission Mode & Applicable Fee Structure of this Student

    if (/admission mode|admission status|kaise admit|kis mode|kis basis|admitted hai ya prospective|admission quota|entrance rank|counseling|admission/i.test(lower)) {

      const mode = targetStudent.admissionMode || "V-SAT";

      const status = targetStudent.admissionStatus || "Admitted";

      const rank = targetStudent.entranceRank || "Merit Verified";

      const note = targetStudent.scholarshipEligibilityNote || "Eligible for institutional tuition schedule";

      const derivation = await deriveFeeAndScholarshipAction(targetStudent.programme, mode, rank);



      if (inHindi) {

        return {

          role: "assistant",

          content: `🎓 **${targetStudent.name} (${targetStudent.id}) ka Admission & Scholarship Status:**\n\n• **Admission Mode:** **${mode}**\n• **Admission Status:** **${status}** (${status === "Admitted" ? "Enrolled & Active Ledger" : "Prospective Counseling Lead"})\n• **Entrance Score / Quota:** ${rank}\n• **Applicable Fee Structure:** ${inr(derivation.grossFee)} / year (Tuition: ${inr(derivation.tuitionAmount)})\n• **Sanctioned Scholarship:** **${inr(targetStudent.scholarship || derivation.scholarshipAmount)}**\n• **Eligibility Criteria:** ${note}\n• **Net Annual Demand:** **${inr(targetStudent.demand)}** (Paid: ${inr(targetStudent.paid)} · Outstanding: **${inr(due)}**)`,

          kind: "student",

          metadata: { studentId: targetStudent.id, admissionMode: mode, admissionStatus: status },

        };

      }

      return {

        role: "assistant",

        content: `### 🎓 Admission Mode & Scholarship Details: ${targetStudent.name} (${targetStudent.id})\n\n* **Admission Mode:** **${mode}**\n* **Admission Status:** **${status}** (${status === "Admitted" ? "Enrolled Student" : "Prospective / Intending Applicant"})\n* **Entrance Score / Rank:** ${rank}\n* **Applicable Programme Fee:** ${inr(derivation.grossFee)}/yr (Tuition: ${inr(derivation.tuitionAmount)})\n* **Sanctioned Scholarship:** **${inr(targetStudent.scholarship || derivation.scholarshipAmount)}**\n* **Scholarship Rule:** ${note}\n* **Net Annual Demand:** **${inr(targetStudent.demand)}** (Paid: ${inr(targetStudent.paid)} | Current Due: **${inr(due)}**)`,

        kind: "student",

        metadata: { studentId: targetStudent.id, admissionMode: mode, admissionStatus: status },

      };

    }



    // 4.4 Specific Question: Overdue / Due Date / Delay of this Student

    if (/overdue|delay|late|baki din|kitne din|fine/i.test(lower)) {

      if (inHindi) {

        return {

          role: "assistant",

          content: `⏳ **${targetStudent.name} (${targetStudent.id}) ka Overdue Analysis:**\n\n• **Current Outstanding Due:** **${inr(due)}**\n• **Overdue Ageing:** **${targetStudent.overdue} din** overdue\n• **Risk Assessment:** ${targetStudent.overdue > 90 ? "⚠️ **High Aging (>90 Days):** Automated reminder flagged; bursar review required." : targetStudent.overdue > 0 ? "⚠️ **Moderate Overdue:** 7-day grace window elapsed." : "✅ **Current:** No overdue balance."}\n• **Active Plan:** ${targetStudent.instalmentPlan}`,

          kind: "student",

          metadata: { studentId: targetStudent.id, overdue: targetStudent.overdue },

        };

      }

      return {

        role: "assistant",

        content: `### ⏳ Overdue & Aging Analysis: ${targetStudent.name} (${targetStudent.id})\n\n* **Outstanding Balance:** **${inr(due)}**\n* **Aging Duration:** **${targetStudent.overdue} days** overdue\n* **Status Level:** ${targetStudent.overdue > 90 ? "⚠️ High Overdue (>90 Days) — Critical recovery queue" : targetStudent.overdue > 0 ? "⚠️ Pending milestone due" : "✅ Settled / On Schedule"}\n* **Active Instalment Structure:** ${targetStudent.instalmentPlan}`,

        kind: "student",

        metadata: { studentId: targetStudent.id, overdue: targetStudent.overdue },

      };

    }



    // 4.5 Specific Question: Unified Complete Financial Status (360° Profile)

    if (/complete.*status|full.*status|all.*detail|complete.*financial|poora.*status|sab.*detail|profile.*summary|360/i.test(lower)) {

      const unified = getUnifiedStudentContext(targetStudent.id);

      if (unified.status === "matched") {

        if (inHindi) {

          return {

            role: "assistant",

            content: `📋 **${targetStudent.name} (${targetStudent.id}) ka 360° Complete Financial Profile:**\n\n• **Programme & Batch:** ${targetStudent.programme} (${targetStudent.category}) · AY ${unified.academicYear}\n• **Gross Fee Demand:** ${inr(unified.grossDemand)}\n• **Sanctioned Scholarship:** ${unified.scholarshipConcession > 0 ? inr(unified.scholarshipConcession) : "None"}\n• **Net Demand (After Scholarship):** ${inr(unified.currentYearDemand)}\n• **Paid to Date:** **${inr(unified.currentYearPaid)}**\n• **Current Outstanding Due:** **${inr(unified.currentYearOutstanding)}**\n• **Exam Clearance:** ${unified.examEligibility?.isEligible ? "✅ Cleared (Eligible)" : `🚫 Withheld (${unified.examEligibility?.ineligibilityReason})`}\n• **Instalment Plan:** ${unified.instalmentPlan ? `${unified.instalmentPlan.planType} (Total Demand: ${inr(unified.instalmentPlan.totalDemand)})` : "Lump-sum / None"}\n• **Overdue Aging:** ${targetStudent.overdue > 0 ? `⚠️ ${targetStudent.overdue} din overdue` : "✅ On Schedule"}\n• **Scholarship Renewal Risk:** ${unified.scholarshipRisk ? `🚨 ${unified.scholarshipRisk.risk_level} (CGPA: ${unified.scholarshipRisk.cgpa}, Attendance: ${unified.scholarshipRisk.attendance_pct}%)` : "✅ Good Standing (Low Risk)"}\n• **Bank Loan Desk:** ${unified.loanRequests.length > 0 ? unified.loanRequests.map(l => `${l.bank_name} (${l.status})`).join(", ") : "No active loan application"}\n• **Settled Prior-Cycle Balance:** ${inr(unified.priorCycleSettled)}`,

            kind: "student",

            metadata: { studentId: targetStudent.id, due: unified.currentYearOutstanding },

          };

        }

        return {

          role: "assistant",

          content: `### 📋 Unified 360° Financial Status: ${targetStudent.name} (${targetStudent.id})\n\n* **Academic Faculty & Year:** ${targetStudent.programme} (${targetStudent.category}) · AY ${unified.academicYear}\n* **Gross Fee Demand:** ${inr(unified.grossDemand)}\n* **Scholarship Concession:** ${unified.scholarshipConcession > 0 ? inr(unified.scholarshipConcession) : "None"}\n* **Net Fee Demand:** ${inr(unified.currentYearDemand)}\n* **Amount Paid to Date:** **${inr(unified.currentYearPaid)}**\n* **Current Outstanding Balance:** **${inr(unified.currentYearOutstanding)}**\n* **Exam Clearance:** ${unified.examEligibility?.isEligible ? "✅ Cleared (Eligible)" : `🚫 Withheld (${unified.examEligibility?.ineligibilityReason})`}\n* **Instalment Structure:** ${unified.instalmentPlan ? `${unified.instalmentPlan.planType}` : "Standard Lump-sum"}\n* **Overdue Aging:** ${targetStudent.overdue > 0 ? `⚠️ ${targetStudent.overdue} days overdue` : "✅ Current (On Schedule)"}\n* **Scholarship Renewal Risk:** ${unified.scholarshipRisk ? `🚨 ${unified.scholarshipRisk.risk_level} (CGPA: ${unified.scholarshipRisk.cgpa}, Attendance: ${unified.scholarshipRisk.attendance_pct}%)` : "✅ Compliant (Low Risk)"}\n* **Education Loan Desk:** ${unified.loanRequests.length > 0 ? unified.loanRequests.map(l => `${l.bank_name} (${l.status})`).join(", ") : "None pending"}\n* **Prior-Cycle Settled:** ${inr(unified.priorCycleSettled)}`,

          kind: "student",

          metadata: { studentId: targetStudent.id, due: unified.currentYearOutstanding },

        };

      }

    }



    // 4.6 Specific Question: Dues + Instalment Plan Combined Query

    if ((/due|dues|baki/i.test(lower) && /instalment|installment|plan/i.test(lower)) || /instalment.*active/i.test(lower)) {

      const plan = instalmentPlans.find(p => p.studentId === targetStudent.id);

      if (inHindi) {

        return {

          role: "assistant",

          content: `📊 **${targetStudent.name} (${targetStudent.id}) ka Dues & Instalment Plan Status:**\n\n• **Total Outstanding Due:** **${inr(due)}** (Net Demand: ${inr(targetStudent.demand)} | Paid: ${inr(targetStudent.paid)})\n• **Instalment Plan:** ${plan ? `✅ **Active (${plan.planType})**` : "❌ Koi active instalment plan nahi hai"}\n${plan ? `• **Milestones:** ${plan.instalments.map(i => `Tranche ${i.no}: ${inr(i.amount)} (${i.status}) due ${i.due}`).join(" | ")}` : ""}\n• **Grace Period:** 7 din ka policy grace period applicable hai.`,

          kind: "student",

          metadata: { studentId: targetStudent.id, due, hasPlan: !!plan },

        };

      }

      return {

        role: "assistant",

        content: `### 📊 Dues & Instalment Plan: ${targetStudent.name} (${targetStudent.id})\n\n* **Outstanding Balance:** **${inr(due)}** (Net Demand: ${inr(targetStudent.demand)} | Amount Paid: ${inr(targetStudent.paid)})\n* **Active Instalment Structure:** ${plan ? `✅ **Active (${plan.planType})**` : "No structured instalment plan active"}\n${plan ? `* **Milestone Schedule:** ${plan.instalments.map(i => `Tranche ${i.no}: ${inr(i.amount)} (${i.status}) due ${i.due}`).join(" | ")}` : ""}\n* **Moratorium Policy:** 7-day automated grace window before fine calculation.`,

        kind: "student",

        metadata: { studentId: targetStudent.id, due, hasPlan: !!plan },

      };

    }



    // 4.7 Navigation / Account Open Requested

    const wantsAccountOpen = /kholo|open\b|profile kholo|account kholo|view profile|open account|focus/i.test(lower);

    if (wantsAccountOpen) {

      const actionMessage = inHindi

        ? `Main **${targetStudent.name} (${targetStudent.id})** ka profile drawer open kar raha hoon.`

        : `Opening student profile drawer for **${targetStudent.name} (${targetStudent.id})**.`;



      let text = inHindi

        ? `📋 **Student Financial Ledger: ${targetStudent.name} (${targetStudent.id})**\n\n`

        : `### 📋 Student Ledger: ${targetStudent.name} (${targetStudent.id})\n\n`;



      if (inHindi) {

        text += `• **Programme:** ${targetStudent.programme} (${targetStudent.category})\n`;

        text += `• **Total Net Demand:** ${inr(targetStudent.demand)} (Gross less sanctioned scholarship)\n`;

        text += `• **Total Paid:** ${inr(targetStudent.paid)}\n`;

        text += `• **Outstanding Due (Baki Raashi):** **${inr(due)}**\n`;

        if (targetStudent.scholarship > 0) text += `• **Sanctioned Scholarship:** ${inr(targetStudent.scholarship)}\n`;

        text += `• **Active Payment Plan:** ${targetStudent.instalmentPlan}\n`;

        text += `• **Overdue Aging:** ${targetStudent.overdue > 0 ? `${targetStudent.overdue} din overdue` : "Current (No overdue)"}\n\n`;

        text += `🚀 *${actionMessage}*`;

      } else {

        text += `* **Programme & Faculty:** ${targetStudent.programme} (${targetStudent.category})\n`;

        text += `* **Academic Cycle:** ${snapshot.academicYear}\n`;

        text += `* **Net Fee Demand:** ${inr(targetStudent.demand)}\n`;

        text += `* **Amount Paid:** ${inr(targetStudent.paid)}\n`;

        text += `* **Outstanding Balance:** **${inr(due)}**\n`;

        if (targetStudent.scholarship > 0) text += `* **Scholarship Sanctioned:** ${inr(targetStudent.scholarship)}\n`;

        text += `* **Payment Plan:** ${targetStudent.instalmentPlan}\n`;

        text += `* **Overdue Status:** ${targetStudent.overdue > 0 ? `${targetStudent.overdue} days overdue` : "Current (On schedule)"}\n\n`;

        text += `🚀 *${actionMessage}*`;

      }



      return {

        role: "assistant",

        content: text,

        kind: "student",

        navigation: {

          view: "Students",

          studentId: targetStudent.id,

          reason: `Viewing ledger account for ${targetStudent.name}`,

        },

        actionSummary: `Opening ${targetStudent.name}'s account…`,

        metadata: { studentId: targetStudent.id, name: targetStudent.name, due },

      };

    }



    // 4.8 Default General Info of this Student (Information Only - No Navigation)

    if (inHindi) {

      return {

        role: "assistant",

        content: `📋 **${targetStudent.name} (${targetStudent.id}) ka Complete Fee Status:**\n\n• **Programme:** ${targetStudent.programme} (${targetStudent.category})\n• **Total Fee Demand:** ${inr(targetStudent.demand)}\n• **Total Paid:** ${inr(targetStudent.paid)}\n• **Outstanding Due (Baki Raashi):** **${inr(due)}**\n• **Scholarship Sanctioned:** ${targetStudent.scholarship > 0 ? inr(targetStudent.scholarship) : "None"}\n• **Overdue Status:** ${targetStudent.overdue > 0 ? `⚠️ ${targetStudent.overdue} din overdue` : "✅ On Schedule (No overdue)"}\n• **Active Plan:** ${targetStudent.instalmentPlan}`,

        kind: "student",

        metadata: { studentId: targetStudent.id, name: targetStudent.name, due },

      };

    }

    return {

      role: "assistant",

      content: `### 📋 Complete Fee Status: ${targetStudent.name} (${targetStudent.id})\n\n* **Programme & Faculty:** ${targetStudent.programme} (${targetStudent.category})\n* **Academic Term:** ${snapshot.academicYear}\n* **Net Demand:** ${inr(targetStudent.demand)}\n* **Total Amount Paid:** ${inr(targetStudent.paid)}\n* **Outstanding Balance Due:** **${inr(due)}**\n* **Scholarship Credit:** ${targetStudent.scholarship > 0 ? inr(targetStudent.scholarship) : "None"}\n* **Overdue Aging:** ${targetStudent.overdue > 0 ? `⚠️ ${targetStudent.overdue} days overdue` : "✅ Current (No overdue)"}\n* **Instalment Schedule:** ${targetStudent.instalmentPlan}`,

      kind: "student",

      metadata: { studentId: targetStudent.id, name: targetStudent.name, due },

    };

  }



  // =========================================================================

  // 4.7 COHORT & MULTI-STUDENT QUERIES (List All, Highest Dues, Overdue List)

  // =========================================================================



  // 4.7.1 All Students Directory List

  if (/all students|saare students|sabhi students|student list|students list|poore students/i.test(lower) && !wantsNav) {

    const list = students.map(s => `• **${s.name}** (\`${s.id}\`) — ${s.programme} | Demand: ${inr(s.demand)} | Paid: ${inr(s.paid)} | Due: **${inr(s.demand - s.paid)}** (${s.overdue > 0 ? `${s.overdue}d overdue` : "Settled"})`).join("\n");

    if (inHindi) {

      return {

        role: "assistant",

        content: `👥 **VFSTR University Enrolled Students (Batch AY 2026–27):**\n\n${list}\n\n💡 *Kisi bhi student ka account kholne ke liye bolein: "Akshat Raj ka account kholo".*`,

        kind: "student",

      };

    }

    return {

      role: "assistant",

      content: `### 👥 Enrolled Student Ledgers (AY 2026–27)\n\n${list}\n\n*To view full account drawer, say: "Open account for Akshat Raj".*`,

      kind: "student",

    };

  }



  // 4.7.2 Overdue Students / Defaulters List

  if (/overdue student|defaulter|kin ka overdue|kiska baki hai|overdue list|90 din se zyada/i.test(lower) && !wantsNav) {

    const overdueList = students

      .filter(s => s.overdue > 0 && s.demand - s.paid > 0)

      .sort((a, b) => b.overdue - a.overdue)

      .map(s => `• **${s.name}** (\`${s.id}\` · ${s.programme}): **${inr(s.demand - s.paid)}** outstanding (**${s.overdue} din overdue**)`);



    if (inHindi) {

      return {

        role: "assistant",

        content: `⚠️ **High Overdue Student Ledgers:**\n\n${overdueList.join("\n")}\n\n📌 **Policy Note:** 90+ din overdue wale accounts bursar automated recovery protocol mein flagged hain.`,

        kind: "student",

      };

    }

    return {

      role: "assistant",

      content: `### ⚠️ Overdue Student Ledgers\n\n${overdueList.join("\n")}\n\n*Accounts exceeding 90 days are escalated to the Bursar Automated Recovery Queue.*`,

      kind: "student",

    };

  }



  // 4.7.3 Highest Due / Maximum Outstanding

  if (/highest due|sabse zyada due|maximum due|sabse bada due|highest balance/i.test(lower)) {

    const sorted = [...students].sort((a, b) => (b.demand - b.paid) - (a.demand - a.paid));

    const highest = sorted[0];

    const second = sorted[1];



    if (inHindi) {

      return {

        role: "assistant",

        content: `📊 **Highest Outstanding Due in University Records:**\n\n1. 🥇 **${highest.name}** (\`${highest.id}\` · ${highest.programme}): **${inr(highest.demand - highest.paid)}** outstanding (${highest.overdue} din overdue)\n2. 🥈 **${second.name}** (\`${second.id}\` · ${second.programme}): **${inr(second.demand - second.paid)}** outstanding (${second.overdue} din overdue)\n\n💡 *Action:* Aap inka record review karne ke liye *"Aarav Desai ka account kholo"* bol sakte hain.`,

        kind: "student",

      };

    }

    return {

      role: "assistant",

      content: `### 📊 Highest Outstanding Accounts\n\n1. 🥇 **${highest.name}** (\`${highest.id}\` · ${highest.programme}): **${inr(highest.demand - highest.paid)}** outstanding (${highest.overdue} days overdue)\n2. 🥈 **${second.name}** (\`${second.id}\` · ${second.programme}): **${inr(second.demand - second.paid)}** outstanding (${second.overdue} days overdue)`,

      kind: "student",

    };

  }



  // 4.7.4 Programme / Branch Wise Filter (B.Tech, MBA, ECE)

  if (/b\.tech student|mba student|cse student|ece student/i.test(lower) && !wantsNav) {

    const isMba = /mba/i.test(lower);

    const progStudents = students.filter(s => isMba ? s.programme.includes("MBA") : s.programme.includes("B.Tech"));

    const list = progStudents.map(s => `• **${s.name}** (\`${s.id}\`): Demand: ${inr(s.demand)}, Paid: ${inr(s.paid)}, Due: **${inr(s.demand - s.paid)}**`).join("\n");



    if (inHindi) {

      return {

        role: "assistant",

        content: `🎓 **${isMba ? "MBA" : "B.Tech"} Programme Student List:**\n\n${list}`,

        kind: "student",

      };

    }

    return {

      role: "assistant",

      content: `### 🎓 ${isMba ? "MBA" : "B.Tech"} Enrolled Students\n\n${list}`,

      kind: "student",

    };

  }



  // 4.7.5 Discontinued Scholarships / Revoked Aid List

  if (/discontinu.*scholarship|scholarship.*discontinu|lost.*scholarship|revoked.*scholarship|kiska scholarship band|scholarship radd/i.test(lower)) {

    const discontinuedIds = ["251FA04E17", "241FA04711"];

    const list = discontinuedIds.map(id => {

      const s = allStudentsWithProspective.find(st => st.id === id) || students.find(st => st.id === id);

      const timeline = computeScholarshipEligibilityTimeline(id);

      return {

        id,

        name: s ? s.name : id,

        programme: s ? s.programme : "B.Tech",

        reason: timeline.discontinuationReason || "CGPA < 7.0 minimum threshold",

        revoked: timeline.totalScholarshipRevoked,

      };

    });



    if (inHindi) {

      return {

        role: "assistant",

        content: `⚠️ **Auto-Discontinued Scholarships (CGPA < 7.0 Policy):**\n\nUniversity bylaws ke mutabiq agar kisi student ka cumulative CGPA **7.0 se kam** hota hai toh scholarship turant band ho jaati hai aur full gross tuition demand apply hoti hai:\n\n${list.map((item, idx) => `${idx + 1}. **${item.name}** (\`${item.id}\` · ${item.programme}):\n   • **Karan:** ${item.reason}\n   • **Revoked Amount:** ${inr(item.revoked)} (Full gross fee charged)`).join("\n\n")}`,

        kind: "student",

      };

    }

    return {

      role: "assistant",

      content: `### ⚠️ Auto-Discontinued Scholarships (CGPA < 7.0 Policy)\n\nUnder university regulations, students whose cumulative CGPA falls below the **7.0 minimum threshold** have their scholarship automatically discontinued and full fee restored:\n\n${list.map((item, idx) => `${idx + 1}. **${item.name}** (\`${item.id}\` · ${item.programme}):\n   * **Reason:** ${item.reason}\n   * **Revoked Financial Aid:** ${inr(item.revoked)} (Full gross fee charged)`).join("\n\n")}`,

      kind: "student",

    };

  }



  // 4.7.6 Institutional Exam Ineligibility Roster & Clearance Audit

  if (/exam ineligib|not eligible.*exam|kaun.*exam.*nahi|ineligible.*exam|who.*ineligible.*exam|exam clearance report|hall ticket report/i.test(lower) && !wantsNav) {

    const allEligibility = students.map(s => getStudentExamEligibility(s.id));

    const ineligible = allEligibility.filter(e => !e.isEligible);

    const duesOnly = ineligible.filter(e => e.ineligibilityReason === "DuesOnly");

    const attOnly = ineligible.filter(e => e.ineligibilityReason === "AttendanceOnly");

    const both = ineligible.filter(e => e.ineligibilityReason === "Both");



    if (inHindi) {

      let resp = `📋 **VFSTR University Exam Eligibility & Clearance Audit:**\n\n`;

      resp += `• **Total Students Assessed:** ${allEligibility.length}\n`;

      resp += `• **Exam Eligible (Cleared):** **${allEligibility.length - ineligible.length}** students ✅\n`;

      resp += `• **Exam Withheld (Not Eligible):** **${ineligible.length}** students 🚫\n`;

      resp += `  - Outstanding Dues Only: ${duesOnly.length}\n`;

      resp += `  - Short Attendance Only (<75%): ${attOnly.length}\n`;

      resp += `  - Both Dues + Short Attendance: ${both.length}\n\n`;

      resp += `**Ineligible Students Roster:**\n`;

      ineligible.forEach(e => {

        const flag = e.ineligibilityReason === "DuesOnly" ? "🚫 Dues" : e.ineligibilityReason === "AttendanceOnly" ? "🚫 Att" : "🚫 Dues+Att";

        resp += `• **${e.studentName}** (\`${e.studentId}\` · ${e.programme}): [${flag}] — Dues: ${inr(e.outstandingDues)} | Att: ${e.attendance.toFixed(1)}%\n`;

      });

      return {

        role: "assistant",

        content: resp,

        kind: "student",

        metadata: { totalIneligible: ineligible.length },

      };

    } else {

      let resp = `### 📋 VFSTR Institutional Exam Eligibility Audit\n\n`;

      resp += `* **Total Cohort Evaluated:** ${allEligibility.length} enrolled students\n`;

      resp += `* **Exam Cleared:** **${allEligibility.length - ineligible.length}** (${(((allEligibility.length - ineligible.length) / allEligibility.length) * 100).toFixed(1)}%) ✅\n`;

      resp += `* **Hall Tickets Withheld:** **${ineligible.length}** students 🚫\n`;

      resp += `  * **Dues Defaulters Only:** ${duesOnly.length}\n`;

      resp += `  * **Attendance Shortfall Only (<75.0%):** ${attOnly.length}\n`;

      resp += `  * **Dual Disqualification (Dues + Attendance):** ${both.length}\n\n`;

      resp += `**Detailed Ineligibility Roster:**\n`;

      ineligible.forEach(e => {

        const tag = e.ineligibilityReason === "DuesOnly" ? "Fee Arrears" : e.ineligibilityReason === "AttendanceOnly" ? "Short Attendance" : "Dual Disqualification";

        resp += `* **${e.studentName}** (\`${e.studentId}\` · ${e.programme}) — **${tag}** | Arrears: **${inr(e.outstandingDues)}** | Attendance: **${e.attendance.toFixed(1)}%**\n`;

      });

      return {

        role: "assistant",

        content: resp,

        kind: "student",

        metadata: { totalIneligible: ineligible.length },

      };

    }

  }



  // 4.7.7 Institutional Exam Permission Requests & Counsellor Desk Audit

  if (/pending.*permission|permission.*pending|how many.*permission|kitne.*permission|permission.*request.*kitne|counsellor desk|counselor desk|permission letters? list|all permission requests?|permission.*summary/i.test(lower)) {

    const summary = getPermissionRequestsSummary();

    const pendingRequests = summary.pendingRequests;

    const wantsDeskNav = wantsNav || /kholo|open|review|check|le chalo|go to|take me/i.test(lower);



    if (inHindi) {

      let text = `📋 **VFSTR Counsellor Desk — Exam Permission Requests Audit:**\n\n`;

      text += `• **Total Permission Requests:** **${summary.total}**\n`;

      text += `• **Pending Review (विचाराधीन):** **${summary.pendingCount}** requests ⏳\n`;

      text += `• **Approved Condonations (स्वीकृत):** **${summary.approvedCount}** orders ✅\n`;

      text += `• **Rejected Applications (अस्वीकृत):** **${summary.rejectedCount}** requests ❌\n\n`;



      if (pendingRequests.length > 0) {

        text += `**⏳ Pending Review Applications Queue:**\n`;

        pendingRequests.forEach(r => {

          text += `• **${r.id}:** **${r.studentName}** (\`${r.studentId}\` · ${r.programme}) — *${r.reason}*\n`;

          text += `  - Snapshotted Dues: ${inr(r.snapshottedDues)} | Attendance: ${r.snapshottedAttendance.toFixed(1)}% | Submitted: ${r.submittedAt}\n`;

        });

        text += `\n💡 *Review aur digital signature approval ke liye aap bol sakte hain: "Counsellor desk kholo".*`;

      } else {

        text += `✅ *Filhal koi bhi permission request pending nahi hai. Sabhi applications review ho chuki hain.*`;

      }



      if (wantsDeskNav) {

        text += `\n\n🚀 *Main Counsellor Desk open kar raha hoon.*`;

      }



      return {

        role: "assistant",

        content: text,

        kind: "student",

        navigation: wantsDeskNav

          ? { view: "Counsellor Desk", reason: "Review pending exam permission requests" }

          : undefined,

        actionSummary: wantsDeskNav ? "Opening Counsellor Desk…" : undefined,

        metadata: { pendingCount: summary.pendingCount, totalCount: summary.total },

      };

    } else {

      let text = `### 📋 VFSTR Counsellor Desk — Exam Permission Applications\n\n`;

      text += `* **Total Requests Submitted:** **${summary.total}**\n`;

      text += `* **Pending Review Queue:** **${summary.pendingCount}** applications ⏳\n`;

      text += `* **Approved Condonation Orders:** **${summary.approvedCount}** orders ✅\n`;

      text += `* **Rejected Applications:** **${summary.rejectedCount}** applications ❌\n\n`;



      if (pendingRequests.length > 0) {

        text += `**Pending Applications Awaiting Review:**\n`;

        pendingRequests.forEach((r) => {

          text += `* **\`${r.id}\`:** **${r.studentName}** (\`${r.studentId}\` · ${r.programme}) — *${r.reason}*\n`;

          text += `  * Dues at Submission: **${inr(r.snapshottedDues)}** | Attendance: **${r.snapshottedAttendance.toFixed(1)}%** | Filed: ${r.submittedAt}\n`;

        });

        text += `\n*To review and execute digital signature approval, say: "Open Counsellor Desk".*`;

      } else {

        text += `✅ *All submitted permission requests have been processed. No pending applications.*`;

      }



      if (wantsDeskNav) {

        text += `\n\n🚀 *Navigating to Counsellor Desk.*`;

      }



      return {

        role: "assistant",

        content: text,

        kind: "student",

        navigation: wantsDeskNav

          ? { view: "Counsellor Desk", reason: "Review pending exam permission requests" }

          : undefined,

        actionSummary: wantsDeskNav ? "Opening Counsellor Desk…" : undefined,

        metadata: { pendingCount: summary.pendingCount, totalCount: summary.total },

      };

    }

  }



  // 4.7.8 Institutional Automated Admit Card System & Cohort Hall Ticket Oversight (Step 6)

  if (/admit card.*summary|how many.*admit card|cohort.*admit card|blocked.*admit card|provisional.*admit card|clean.*admit card|admit card.*roster|hall ticket.*summary/i.test(lower)) {

    const summary = getAllStudentsAdmitCardStatus();

    const wantsAdmitNav = wantsNav || /kholo|open|review|check|le chalo|go to|take me/i.test(lower);



    if (inHindi) {

      let text = `📋 **VFSTR Examination Admit Card & Hall Ticket Oversight:**\n\n`;

      text += `• **Total Enrolled Cohort:** **${summary.totalStudents}** candidates\n`;

      text += `• **Clean Regular Issued:** **${summary.cleanEligibleCount}** (Zero Dues & Attendance ≥ 75%) ✅\n`;

      text += `• **Provisional Issued (Dues Notice):** **${summary.provisionalDuesCount}** (Mandatory Undertaking Applied) ⚠️\n`;

      text += `• **Condoned Issued (Dean Order):** **${summary.condonedCount}** (Authorized via Step 5) 🎓\n`;

      text += `• **Admit Card Blocked:** **${summary.blockedCount}** (Statutory Attendance < 75%) 🚫\n`;

      text += `• **Carried-Forward Arrears Active:** **${summary.carriedForwardArrearsCount}** students\n`;

      text += `• **Total Outstanding Cohort Dues:** **${inr(summary.totalOutstandingCohortDues)}**\n\n`;

      text += `💡 *Detailed roster aur individual admit cards inspect karne ke liye aap bol sakte hain: "Admit Cards page kholo".*`;



      return {

        role: "assistant",

        content: text,

        kind: "student",

        navigation: wantsAdmitNav

          ? { view: "Admit Cards", reason: "Inspect cohort admit card generation roster" }

          : undefined,

        actionSummary: wantsAdmitNav ? "Opening Admit Cards Oversight…" : undefined,

        metadata: {

          totalStudents: summary.totalStudents,

          cleanCount: summary.cleanEligibleCount,

          provisionalCount: summary.provisionalDuesCount,

          condonedCount: summary.condonedCount,

          blockedCount: summary.blockedCount,

        },

      };

    } else {

      let text = `### 📋 VFSTR Examination Admit Card System — Cohort Oversight\n\n`;

      text += `* **Total Cohort Evaluated:** **${summary.totalStudents}** enrolled candidates\n`;

      text += `* **Clean Regular Issued:** **${summary.cleanEligibleCount}** (Full clearance: ₹0 Dues & Attendance ≥ 75.0%) ✅\n`;

      text += `* **Provisional Issued (Pending Dues Notice):** **${summary.provisionalDuesCount}** (Results Undertaking Stamped) ⚠️\n`;

      text += `* **Condoned Issued (Dean Executive Order):** **${summary.condonedCount}** (Authorized via Step 5 Counsellor Desk) 🎓\n`;

      text += `* **Statutorily Blocked:** **${summary.blockedCount}** (Attendance < 75.0% without approved condonation) 🚫\n`;

      text += `* **Prior Arrears Active:** **${summary.carriedForwardArrearsCount}** candidates carrying forward previous semester debt\n`;

      text += `* **Total Outstanding Cohort Liability:** **${inr(summary.totalOutstandingCohortDues)}**\n\n`;

      text += `*To view, filter, and generate official hall tickets for any candidate, say: "Open Admit Cards page".*`;



      return {

        role: "assistant",

        content: text,

        kind: "student",

        navigation: wantsAdmitNav

          ? { view: "Admit Cards", reason: "Inspect cohort admit card generation roster" }

          : undefined,

        actionSummary: wantsAdmitNav ? "Opening Admit Cards Oversight…" : undefined,

        metadata: {

          totalStudents: summary.totalStudents,

          cleanCount: summary.cleanEligibleCount,

          provisionalCount: summary.provisionalDuesCount,

          condonedCount: summary.condonedCount,

          blockedCount: summary.blockedCount,

        },

      };

    }

  }



  // =========================================================================

  // 5. TRANSACTION LOOKUP & RECONCILIATION

  // =========================================================================

  const mentionedTxn = findMentionedTransaction(query);

  if (mentionedTxn) {

    const diff = mentionedTxn.gateway - mentionedTxn.ledger;

    const wantsTxnOpen = /kholo|open|review|check/i.test(lower);

    const studentObj = students.find(s => s.id === mentionedTxn.student);



    if (inHindi) {

      let text = `💳 **Transaction Record: ${mentionedTxn.id}**\n\n`;

      text += `• **Student Name:** ${studentObj ? studentObj.name : "N/A"} (ID: \`${mentionedTxn.student}\`)\n`;

      text += `• **Gateway Amount Captured:** ${inr(mentionedTxn.gateway)}\n`;

      text += `• **Ledger Settled Amount:** ${inr(mentionedTxn.ledger)}\n`;

      text += `• **Reconciliation Status:** **${mentionedTxn.status}** ${diff !== 0 ? `(⚠️ **Variance: ${inr(Math.abs(diff))}**) — Bank clearance gap` : "✅ (Fully Reconciled)"}\n`;

      text += `• **Payment Channel & Date:** ${mentionedTxn.method} · ${mentionedTxn.date}\n`;

      if (wantsTxnOpen) text += `\n🚀 *Main Reconciliation review workspace open kar raha hoon.*`;



      return {

        role: "assistant",

        content: text,

        kind: "reconcile",

        navigation: wantsTxnOpen

          ? { view: "Reconciliation", transactionId: mentionedTxn.id, reason: `Inspecting transaction ${mentionedTxn.id}` }

          : undefined,

        actionSummary: wantsTxnOpen ? `Opening ${mentionedTxn.id} in Reconciliation…` : undefined,

        metadata: { transactionId: mentionedTxn.id },

      };

    }



    let text = `### 💳 Transaction Record: ${mentionedTxn.id}\n\n`;

    text += `* **Student:** ${studentObj ? studentObj.name : "N/A"} (\`${mentionedTxn.student}\`)\n`;

    text += `* **Gateway Capture:** ${inr(mentionedTxn.gateway)}\n`;

    text += `* **Ledger Settlement:** ${inr(mentionedTxn.ledger)}\n`;

    text += `* **Reconciliation Status:** **${mentionedTxn.status}** ${diff !== 0 ? `(⚠️ **Variance: ${inr(diff)}**)` : "✅ (Matched)"}\n`;

    text += `* **Channel & Timestamp:** ${mentionedTxn.method} · ${mentionedTxn.date}\n`;

    if (wantsTxnOpen) text += `\n🚀 *Opening Reconciliation review workspace.*`;



    return {

      role: "assistant",

      content: text,

      kind: "reconcile",

      navigation: wantsTxnOpen

        ? { view: "Reconciliation", transactionId: mentionedTxn.id, reason: `Inspecting transaction ${mentionedTxn.id}` }

        : undefined,

      actionSummary: wantsTxnOpen ? `Opening ${mentionedTxn.id} in Reconciliation…` : undefined,

      metadata: { transactionId: mentionedTxn.id },

    };

  }



  // 5.1 All Transactions Summary

  if (/transactions list|payment list|recent transactions|payments list|all transactions|transactions/i.test(lower) && !wantsNav) {

    const list = transactions.map(t => `• **${t.id}:** ${inr(t.gateway)} via ${t.method} (${t.date}) — **${t.status}** [Student: \`${t.student}\`]`).join("\n");

    if (inHindi) {

      return {

        role: "assistant",

        content: `💳 **Recent Gateway Payment Transactions:**\n\n${list}\n\n💡 *TXN-10483 me ₹5,000 ka gateway vs ledger mismatch hai.*`,

        kind: "reconcile",

      };

    }

    return {

      role: "assistant",

      content: `### 💳 Gateway Payment Transactions Queue\n\n${list}`,

      kind: "reconcile",

    };

  }



  // =========================================================================

  // 6. VIEW-SPECIFIC NAVIGATION REQUESTS (Single-Intent Navigation)

  // =========================================================================

  const isCombinedInfoAndNav = /status|batao|tell me|kitna|kitni|mismatch|summary|overview|breakdown/i.test(lower);

  if (wantsNav && targetView && !(isCombinedInfoAndNav && /reconciliation/i.test(lower))) {

    const navDescriptions: Record<View, { hi: string; en: string }> = {

      "Fee Structure": {

        hi: "Sure — Main **Fee Structure** section open kar raha hoon jahan sabhi degree programmes ki published fee schedules hain.",

        en: "Navigating to **Fee Structure** where verified schedules for all degree programmes are published.",

      },

      Students: {

        hi: "Sure — Main **Students Directory** open kar raha hoon jahan sabhi student accounts aur ledgers hain.",

        en: "Navigating to the **Students** directory with full student account records.",

      },

      Reconciliation: {

        hi: "Sure — Main **Reconciliation** center open kar raha hoon jahan payment gateway aur bank settlement mismatches hain.",

        en: "Navigating to **Reconciliation Center** to inspect gateway settlements and audit mismatches.",

      },

      Payments: {

        hi: "Sure — Main **Payments** ledger open kar raha hoon jahan sabhi receipts aur payment modes hain.",

        en: "Navigating to **Payments** tracking gateway receipts to student ledger credits.",

      },

      Instalments: {

        hi: "Sure — Main **Instalments** section open kar raha hoon jahan split-payment milestone plans hain.",

        en: "Navigating to **Instalments** to manage structured split-payment plans.",

      },

      "Smart Reminders": {

        hi: "Sure — Main **Smart Reminders** section open kar raha hoon jahan policy-governed reminder suppression rules hain.",

        en: "Navigating to **Smart Reminders** governance desk.",

      },

      "Scholarship Risks": {

        hi: "Sure — Main **Scholarship Risks** early-warning dashboard open kar raha hoon.",

        en: "Navigating to **Scholarship Renewal Risk** early-warning tracker.",

      },

      "Loan Requests": {

        hi: "Sure — Main **Education Loan Desk** open kar raha hoon jahan bank NOCs aur estimation schedules hain.",

        en: "Navigating to **Bank Education Loan Desk** for document issuance and verification.",

      },

      Refunds: {

        hi: "Sure — Main **Refunds** desk open kar raha hoon jahan UGC admission withdrawal policies hain.",

        en: "Navigating to **Refunds & Withdrawals** review desk.",

      },

      Reports: {

        hi: "Sure — Main **Institutional Reports & SQL Schema** open kar raha hoon.",

        en: "Navigating to **Reports & Institutional Analytics**.",

      },

      "Counsellor Desk": {

        hi: "Sure — Main **Counsellor Desk** open kar raha hoon jahan exam permission letters aur digital signature condonation orders review ho sakte hain.",

        en: "Navigating to **Counsellor Desk** to review exam permission applications and authorize digital signature condonations.",

      },

      "Admit Cards": {

        hi: "Sure — Main **Admit Cards Oversight System** open kar raha hoon jahan automated hall ticket generation, dues carry-forward, aur provisional clearance status hain.",

        en: "Navigating to the **Admit Cards System** for automated hall ticket gatekeeping and carry-forward dues oversight.",

      },

      Dashboard: {

        hi: "Sure — Main **Finance Overview Dashboard** open kar raha hoon.",

        en: "Navigating to the main **Finance Dashboard**.",

      },

      "AI Assistant": {

        hi: "Sure — Main **AI Assistant Workspace** open kar raha hoon.",

        en: "Navigating to the **AI Assistant Workspace**.",

      },

    };



    const msg = inHindi ? navDescriptions[targetView].hi : navDescriptions[targetView].en;

    return {

      role: "assistant",

      content: `🚀 ${msg}`,

      kind: "navigation",

      navigation: {

        view: targetView,

        studentId: navResult.studentId,

        transactionId: navResult.transactionId,

        reason: `User requested to open ${targetView}`,

      },

      actionSummary: `Opening ${targetView}…`,

    };

  }



  // =========================================================================

  // 7. DATA / TOPIC INQUIRIES (readFinance - Pure Information Without Navigation)

  // =========================================================================



  // 7.0a Specific Scholarship Policy by Admission Mode (JEE Mains / V-SAT / EAMCET / Reserved / Special State)

  const isModeScholarship = (

    (/scholarship|waiver|concession|discount|kitna|kitni/i.test(lower) && /jee|v-sat|vsat|eamcet|reserved|caste|special state|north-east/i.test(lower)) ||

    /jee.*scholarship|v-sat.*scholarship|vsat.*scholarship|eamcet.*scholarship|reserved.*scholarship/i.test(lower)

  ) && !/waterfall|80c|suppression|risk/i.test(lower);



  if (isModeScholarship) {

    const isJee = /jee/i.test(lower);

    const isVsat = /v-sat|vsat/i.test(lower);

    const isEamcet = /eamcet/i.test(lower);

    const isSpecialState = /special state|north-east|j&k|ladakh/i.test(lower);

    const isReserved = !isSpecialState && /reserved|caste|\bsc\b|\bst\b|\bbc\b/i.test(lower);



    if (inHindi) {

      if (isJee) {

        return {

          role: "assistant",

          content: `🎯 **JEE Mains Tiered Scholarship Slabs (AY 2026–27):**\n\n• **Tier 1 (>98.0 %ile):** **100% Tuition Fee Waiver** (Full tuition ₹90,000/yr waiver for >95–98%ile top national rankers)\n• **Tier 2 (95.0 – 97.99 %ile):** **75% Tuition Fee Waiver** (₹67,500/yr tuition relief)\n• **Tier 3 (90.0 – 94.99 %ile):** **50% Tuition Fee Waiver** (₹45,000/yr tuition relief)\n• **Tier 4 (85.0 – 89.99 %ile):** **25% Tuition Fee Waiver** (₹22,500/yr tuition relief)\n• **Tier 5 (80.0 – 84.99 %ile):** **15% Tuition Fee Waiver** (₹13,500/yr tuition relief)\n• **Renewal Requirement:** Minimum 7.50 CGPA aur 75% Attendance har semester mandatory hai.`,

          kind: "breakdown",

        };

      }

      if (isVsat) {

        return {

          role: "assistant",

          content: `🎯 **V-SAT (Vignan Scholastic Aptitude Test) Multi-Tier Slabs:**\n\n• **Tier 1 (Rank 1 – 50):** **100% Tuition Fee Waiver**\n• **Tier 2 (Rank 51 – 150):** **75% Tuition Fee Scholarship** (Rank 100 students ko 75% relief milta hai)\n• **Tier 3 (Rank 151 – 500):** **50% Tuition Fee Scholarship** (₹45,000/yr relief)\n• **Tier 4 (Rank 501 – 1,500):** **25% Tuition Fee Scholarship** (₹22,500/yr relief)\n• **Tier 5 (Rank 1,501 – 3,000):** **10% Tuition Fee Scholarship**\n• **Renewal Rule:** Continuation ke liye 7.50 CGPA & 75% attendance audit pass karna zaroori hai.`,

          kind: "breakdown",

        };

      }

      if (isEamcet) {

        return {

          role: "assistant",

          content: `🎯 **EAMCET / AP EAPCET Tiered Scholarship Policy:**\n\n• **Tier 1 (Rank < 2,000):** **100% Tuition Fee Waiver**\n• **Tier 2 (Rank 2,001 – 5,000):** **75% Tuition Fee Scholarship**\n• **Tier 3 (Rank 5,001 – 10,000):** **50% Tuition Fee Scholarship** (₹45,000/yr for B.Tech / ₹42,500/yr for B.Pharmacy)\n• **Tier 4 (Rank 10,001 – 20,000):** **25% Tuition Fee Scholarship**\n• **State Fee Reimbursement (JVD Scheme):** Eligible candidates ko ₹35,000 tak state social welfare credit milta hai.`,

          kind: "breakdown",

        };

      }

      if (isSpecialState) {

        return {

          role: "assistant",

          content: `🎯 **Special State Status Tiered Concession Policy:**\n\n• **North-Eastern States Quota (NE Quota):** **30% Regional Tuition Concession**\n• **Jammu & Kashmir / Ladakh Quota (J&K Quota):** **25% Regional Tuition Concession**\n• **Island Territories Quota (A&N / Lakshadweep):** **20% Regional Tuition Concession**\n• **Remote Border Areas Quota:** **15% Regional Tuition Concession**\n• **Documentation:** Valid State Domicile Certificate admission verification ke waqt required hota hai.`,

          kind: "breakdown",

        };

      }

      if (isReserved) {

        return {

          role: "assistant",

          content: `🎯 **Reserved / Lower Caste Category (SC / ST / BC) Statutory Welfare Slabs:**\n\n• **SC / ST Statutory Welfare Scheme:** Government rules ke tahat **100% Tuition Fee Waiver** (Full tuition reimbursement)\n• **BC-A / BC-B Welfare Scheme:** **50% Tuition Fee Waiver / Grant**\n• **BC-C / BC-D / BC-E Welfare Scheme:** **35% Tuition Fee Concession**\n• **EWS (Income < ₹1.5L Criteria):** **25% Tuition Subsidy**\n• **Student Net Payable:** Non-tuition statutory heads (examination, lab, hostel) fee ledger ke tahat payable rehte hain.`,

          kind: "breakdown",

        };

      }

    } else {

      if (isJee) {

        return {

          role: "assistant",

          content: `### 🎯 JEE Mains Multi-Tier Scholarship Policy (AY 2026–27)\n\nUnder university regulations, JEE Mains qualifiers receive tiered tuition waivers based on their NTA percentile:\n\n* **Tier 1 (> 98.0 %ile):** **100% Tuition Fee Waiver** (Candidates >95%ile eligible for top tier scholarship)\n* **Tier 2 (95.0 – 97.99 %ile):** **75% Tuition Fee Waiver** (₹67,500/yr tuition relief on B.Tech)\n* **Tier 3 (90.0 – 94.99 %ile):** **50% Tuition Fee Waiver** (₹45,000/yr tuition relief)\n* **Tier 4 (85.0 – 89.99 %ile):** **25% Tuition Fee Waiver** (₹22,500/yr tuition relief)\n* **Tier 5 (80.0 – 84.99 %ile):** **15% Tuition Fee Waiver** (₹13,500/yr tuition relief)\n\n*Renewal Thresholds: Minimum 7.50 Cumulative GPA and >= 75% attendance each semester.*`,

          kind: "breakdown",

        };

      }

      if (isVsat) {

        return {

          role: "assistant",

          content: `### 🎯 V-SAT Multi-Tier Scholarship Slabs (AY 2026–27)\n\nInstitutional merit entrance scholars receive tuition waivers according to verified V-SAT ranks:\n\n* **Tier 1 (Rank 1 – 50):** **100% Tuition Fee Waiver** (Full tuition covered)\n* **Tier 2 (Rank 51 – 150):** **75% Tuition Fee Scholarship** (Ranks through 100 receive 75% tuition relief: ₹67,500/yr)\n* **Tier 3 (Rank 151 – 500):** **50% Tuition Fee Scholarship** (₹45,000/yr relief)\n* **Tier 4 (Rank 501 – 1,500):** **25% Tuition Fee Scholarship** (₹22,500/yr relief)\n* **Tier 5 (Rank 1,501 – 3,000):** **10% Tuition Fee Scholarship**\n\n*Renewal Policy: Minimum 7.50 CGPA and 75% academic attendance required annually.*`,

          kind: "breakdown",

        };

      }

      if (isEamcet) {

        return {

          role: "assistant",

          content: `### 🎯 EAMCET / AP EAPCET Tiered Scholarship Structure\n\nState convener counseling intake offers tiered institutional grants:\n\n* **Tier 1 (Rank < 2,000):** **100% Tuition Fee Waiver**\n* **Tier 2 (Rank 2,001 – 5,000):** **75% Tuition Fee Scholarship**\n* **Tier 3 (Rank 5,001 – 10,000):** **50% Tuition Fee Scholarship** (₹45,000/yr on B.Tech)\n* **Tier 4 (Rank 10,001 – 20,000):** **25% Tuition Fee Scholarship**\n* **Ranks > 20,000:** Eligible for AP State JVD Post-Matric Fee Reimbursement scheme.`,

          kind: "breakdown",

        };

      }

      if (isSpecialState) {

        return {

          role: "assistant",

          content: `### 🎯 Special State Status Regional Concession Slabs\n\nRegional concessions applicable on base tuition fees for designated domicile applicants:\n\n* **NE Quota (Assam, Meghalaya, etc.):** **30% Regional Tuition Concession**\n* **J&K Quota (Jammu & Kashmir / Ladakh):** **25% Regional Tuition Concession**\n* **Island Quota (Andaman & Nicobar, Lakshadweep):** **20% Regional Tuition Concession**\n* **Border Area Domicile:** **15% Regional Tuition Concession**\n\n*Requires submission of valid state resident/domicile certificate at counseling.*`,

          kind: "breakdown",

        };

      }

      if (isReserved) {

        return {

          role: "assistant",

          content: `### 🎯 Reserved / Lower Caste Category Statutory Welfare Slabs\n\nStructured statutory welfare and social justice slabs:\n\n* **SC / ST Statutory Welfare Scheme:** **100% Tuition Fee Waiver** under government welfare reimbursement\n* **BC-A / BC-B Backward Classes Scheme:** **50% Tuition Fee Waiver**\n* **BC-C / BC-D / BC-E Scheme:** **35% Tuition Fee Waiver**\n* **EWS Scheme (Annual Income < ₹1.5 Lakhs):** **25% Tuition Fee Subsidy**\n\n*Statutory non-tuition components (examination, lab, hostel) remain payable per official fee schedule.*`,

          kind: "breakdown",

        };

      }

    }

    return {

      role: "assistant",

      content: `### 🎯 VFSTR Master Scholarship Slab Policy (AY 2026–27)\n\n* **JEE Mains:** Tier 1 (>98%ile): 100% Tuition Waiver (>95%ile threshold) · Tier 2 (95–98%ile): 75% · Tier 3 (90–95%ile): 50% · Tier 4 (85–90%ile): 25% · Tier 5 (80–85%ile): 15%.\n* **V-SAT:** Tier 1 (Rank 1–50): 100% · Tier 2 (Rank 51–150 / 100): 75% · Tier 3 (Rank 151–500): 50% · Tier 4 (Rank 501–1500): 25% · Tier 5 (Rank 1501–3000): 10%.\n* **EAMCET:** Rank <2k: 100% · Rank 2k–5k: 75% · Rank 5k–10k: 50% · Rank 10k–20k: 25% · Rank >20k: JVD Reimbursement.\n* **Reserved Category:** SC/ST: 100% Tuition Waiver · BC-A/B: 50% · BC-C/D/E: 35% · EWS: 25%.\n* **Special State Status:** NE Quota: 30% · J&K Quota: 25% Regional Concession · Islands: 20% · Border: 15%.\n\n*Continuing renewal mandates maintaining >= 7.50 CGPA and >= 75% Attendance.*`,

      kind: "breakdown",

    };

  }



  // 7.0b Admission Modes Overview & Segregation Slabs

  if (/admission mode|admission modes|kaunse admission mode|modes of admission|admission routes|admitted vs prospective/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `🏛️ **VFSTR University Approved Admission Modes (AY 2026–27):**\n\nUniversity mein total **5 Institutional Admission Modes** ke through seats allocate hoti hain:\n\n1. **V-SAT (Vignan's Scholastic Aptitude Test):** Institutional merit entrance. Top 100 ranks ko 75% tuition scholarship, 101–1,000 ranks ko 50%, aur 1,001–2,000 ranks ko 25% tuition fee waiver.\n2. **JEE Mains:** National entrance quota. >95%ile par **100% Tuition Waiver**, 90–95%ile par **50%**, aur 85–90%ile par **25%** scholarship milti hai.\n3. **EAMCET / AP EAPCET:** State engineering & pharmacy counseling quota. Top 10,000 rankers ko 50% tuition scholarship aur eligible students ko State JVD Post-Matric Fee Reimbursement milta hai.\n4. **Reserved/Lower Caste Category (SC / ST / BC):** Statutory Social Welfare scheme ke tahat eligible students ko 100% tuition waiver / state reimbursement sanction hota hai.\n5. **Special State Status:** North-Eastern States (Assam, Arunachal, Manipur, etc.) aur J&K / Ladakh ke students ko **25% Regional Tuition Concession** diya jata hai.\n\n📊 **Database Status:** **${admittedStudents.length} Admitted** (Enrolled) students aur **${prospectiveStudents.length} Prospective** (Intending) applicant leads system mein segregated track ho rahe hain.`,

        kind: "breakdown",

      };

    }

    return {

      role: "assistant",

      content: `### 🏛️ VFSTR University Approved Admission Modes & Policies (AY 2026–27)\n\nUnder university statutes, student admissions and fee structures are governed by **5 Primary Admission Modes**:\n\n1. **V-SAT (Vignan's Scholastic Aptitude Test):** Institutional entrance examination. Slabs: Top 100 ranks receive 75% tuition scholarship, ranks 101–1,000 receive 50%, and ranks 1,001–2,000 receive 25% tuition waiver.\n2. **JEE Mains:** National competitive entrance. Slabs: >95%ile earns **100% Tuition Waiver**, 90–95%ile earns **50%**, and 85–90%ile earns **25%** scholarship.\n3. **EAMCET / AP EAPCET:** State engineering and pharmacy convener quota. Slabs: Rank < 10,000 receives 50% tuition scholarship, plus state JVD fee reimbursement.\n4. **Reserved/Lower Caste Category (SC / ST / BC):** Statutory social welfare fee grant providing 100% tuition waiver for eligible candidates.\n5. **Special State Status:** Domicile quota for North-Eastern States, J&K, and Ladakh granting **25% Regional Tuition Concession**.\n\n*Enrollment Breakdown: ${admittedStudents.length} Admitted (Enrolled) students · ${prospectiveStudents.length} Prospective (Intending) counseling applicants.*`,

      kind: "breakdown",

    };

  }



  // 7.0c Prospective / Intending Students Inquiry

  if (/prospective student|prospective students|intending student|intending students|counseling pool|prospective kitne/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `📋 **Prospective (Intending) Students Overview (AY 2026–27):**\n\n• **Total Prospective Leads in Counseling:** **${prospectiveStudents.length} candidates**\n• **Data Segregation:** Prospective records enrolled students ke verified ledger se alag **Counseling Pool** me maintained hain.\n• **Auto-Derived Fee Structure:** In sabhi candidates ka prospective fee package degree fee structure aur unke admission mode (JEE / V-SAT / EAMCET / Reserved / Special State) ke adhaar par auto-derive hota hai.\n• **Top Prospective Candidates:**\n  - **Aaditya Vikram Verma (PR-2026-001):** B.Tech CSE · JEE 97.4 %ile → 100% Tuition Waiver (₹90,000 scholarship)\n  - **Sneha Reddy K. (PR-2026-002):** B.Tech CSE · V-SAT Rank 42 → 75% Tuition Scholarship (₹67,500 scholarship)\n  - **Tarun Kumar Madhav (PR-2026-003):** B.Tech ECE · EAMCET Rank 4,320 → 50% Tuition Scholarship (₹45,000)\n  - **Pooja Venkatesh (PR-2026-004):** B.Tech IT · Reserved SC Quota → 100% Tuition Waiver (₹90,000)\n  - **Tashi Tsering Dorjee (PR-2026-005):** B.Tech Mech · Special State Quota → 25% Concession (₹20,000)\n\n💡 *Finance Department dashboard ke 'Students' tab me 'Prospective / Intending' filter select karke poori list dekhi ja sakti hai.*`,

        kind: "breakdown",

      };

    }

    return {

      role: "assistant",

      content: `### 📋 Prospective (Intending) Counseling Leads Overview (AY 2026–27)\n\n* **Active Prospective Applicants:** **${prospectiveStudents.length} candidates** in the university counseling pipeline.\n* **Ledger Segregation:** Prospective candidates are segregated from enrolled student accounts to maintain institutional treasury audit integrity.\n* **Auto-Derivation Engine:** Each candidate's prospective demand and eligible scholarship is auto-derived from the approved fee schedule and their admission mode entrance score.\n* **Notable Applicants:**\n  * **Aaditya Vikram Verma (PR-2026-001):** B.Tech CSE · JEE 97.4 %ile → 100% Tuition Waiver (₹90k waiver)\n  * **Sneha Reddy K. (PR-2026-002):** B.Tech CSE · V-SAT Rank 42 → 75% Tuition Scholarship (₹67.5k waiver)\n  * **Tarun Kumar Madhav (PR-2026-003):** B.Tech ECE · EAMCET Rank 4,320 → 50% Tuition Scholarship (₹45k waiver)\n  * **Pooja Venkatesh (PR-2026-004):** B.Tech IT · Reserved Category (SC) → 100% Statutory Waiver (₹90k waiver)\n  * **Tashi Tsering Dorjee (PR-2026-005):** B.Tech Mech · Special State Quota (Arunachal) → 25% Regional Concession (₹20k waiver)\n\n*Filter by "Prospective / Intending" in the Finance Department Students view to inspect itemized offers.*`,

      kind: "breakdown",

    };

  }



  // 7.1 Fee Structure & Breakdown

  if (/fee structure|tuition fee|hostel fee|kitni fees|kitna fee|fees schedule|b\.tech fee|mba fee|tuition|hostel/i.test(lower) && !/waterfall|80c|suppression/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `🏛️ **VFSTR Approved Fee Structure (AY 2026–27):**\n\n• **B.Tech (CSE/ECE/Mech):** Tuition: ₹90,000/yr | Hostel: ₹40,000/yr | Exam: ₹5,000 | Library: ₹2,000 | Lab: ₹3,000 → **Total: ₹1,40,000/yr**\n• **MBA (Finance/HR/Marketing):** Tuition: ₹1,30,000/yr | Hostel: ₹40,000/yr | Exam: ₹10,000 → **Total: ₹1,80,000/yr**\n• **B.Pharmacy:** Tuition: ₹85,000/yr | Hostel: ₹40,000/yr | Lab: ₹8,000 → **Total: ₹1,33,000/yr**\n• **M.Tech:** Tuition: ₹1,00,000/yr | Hostel: ₹40,000/yr → **Total: ₹1,40,000/yr**\n\n💡 *Note:* Merit scholarship awardees ko ₹20,000/yr tak ka direct tuition deduction milta hai.`,

        kind: "breakdown",

      };

    }

    return {

      role: "assistant",

      content: `### 🏛️ VFSTR Official Fee Structure (AY 2026–27)\n\n* **B.Tech (CSE / ECE / Mech):** Tuition: ₹90,000/yr | Hostel: ₹40,000/yr | Exam: ₹5,000 | Lab: ₹3,000 | Library: ₹2,000 → **Total: ₹1,40,000/yr**\n* **MBA (Finance / HR / Mkt):** Tuition: ₹1,30,000/yr | Hostel: ₹40,000/yr | Exam: ₹10,000 → **Total: ₹1,80,000/yr**\n* **B.Pharmacy:** Tuition: ₹85,000/yr | Hostel: ₹40,000/yr | Lab: ₹8,000 → **Total: ₹1,33,000/yr**\n* **M.Tech:** Tuition: ₹1,00,000/yr | Hostel: ₹40,000/yr → **Total: ₹1,40,000/yr**\n\n*Merit awardees receive up to ₹20,000/yr direct tuition deduction.*`,

      kind: "breakdown",

    };

  }



  // 7.2 Pending Instalments

  if (/pending instalment|pending installment|instalment options|kitni instalment|instalments pending|instalment|installment/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `📅 **Active Fee Instalment Status & Options:**\n\n• **Approved Plans:** 2-Instalment (50%-50%) aur 3-Instalment (Tranche milestones: 15 Apr, 15 Jul, 15 Oct).\n• **Akshat Raj (251FA04E03):** 3-Instalment Plan (₹40,000 x 3). Tranche 1 Paid (₹40,000), Tranches 2 & 3 Pending (₹80,000 outstanding).\n• **Riya Verma / Ananya Sharma:** 2-Instalment / Lump-sum (Fully Settled).\n• **Rohan Mehta (251FA04E21):** 2-Instalment Plan (₹60,000 x 2). Tranche 1 Paid, Tranche 2 Pending (₹45,000 due).\n• **Grace Window:** Due date ke baad 7 din ka automatic grace period milta hai bina late fine ke.`,

        kind: "general",

      };

    }

    return {

      role: "assistant",

      content: `### 📅 Pending Fee Instalments Overview\n\n* **Available Plans:** 2-Tranche (Semi-Annual) and 3-Tranche (Apr 15, Jul 15, Oct 15).\n* **Akshat Raj (251FA04E03):** 3-Instalment Plan (₹1,20,000 total). Tranche 1 Settled; Tranches 2 & 3 Pending (₹80,000 outstanding).\n* **Rohan Mehta (251FA04E21):** 2-Instalment Plan. Tranche 2 Pending (₹45,000 due).\n* **Grace Policy:** 7-day automatic moratorium before late fee computation.`,

      kind: "general",

    };

  }



  // 7.3 Scholarship Risks

  if (/scholarship risk|cgpa warning|attendance risk|scholarship risk wale students|kaunse students scholarship risk|attendance kiski kam/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `🎓 **Scholarship Renewal Risk Tracker:**\n\nVFSTR policy ke mutabik scholarship renew rakhne ke liye **7.50 CGPA** aur **75% Attendance** mandatory hai:\n\n• **Rohan Mehta (251FA04E21):** CGPA 7.10 (Criteria: 7.50) · Attendance 72% → 🚨 **HIGH RISK** (Scholarship credit ₹20,000 at risk).\n• **Ananya Sharma (251FA04E17):** Attendance 74.2% → ⚠️ **MEDIUM RISK** (Borderline attendance advisory issued).\n• **Proactive Action:** Dono students ko Faculty Mentorship aur Academic Advisory assign ki gayi hai taaki audit se pehle recover kar sakein.`,

        kind: "general",

      };

    }

    return {

      role: "assistant",

      content: `### 🎓 Scholarship Renewal Risk Early-Warning Tracker\n\nUnder university policy, annual renewal requires minimum **7.50 CGPA** and **>= 75% Attendance**:\n\n* **Rohan Mehta (251FA04E21):** CGPA 7.10 / Min 7.50 · Attendance: 72% → 🚨 **HIGH RISK** (₹20,000 scholarship credit at risk).\n* **Ananya Sharma (251FA04E17):** Attendance: 74.2% → ⚠️ **MEDIUM RISK** (Attendance borderline advisory issued).\n* **Intervention:** Faculty mentorship scheduled to support academic recovery before audit.`,

      kind: "general",

    };

  }



  // 7.4 Pending Loan Requests & Available Loan Documents

  if (/pending loan|loan requests|loan request ki hai|kaunse students ne loan|loan request|bank loan|loan document|available.*document|education loan/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `🏦 **Bank Education Loan Desk & Available Documents:**\n\n• **Official Loan Documents Issued by University:**\n  1. **Fee Estimation Schedule:** Year-wise approved fee breakdown for loan disbursement.\n  2. **Bonafide Student Certificate:** Enrollment & bonafide status verification for banks.\n  3. **Bank NOC & University Account Mandate:** Direct account transfer mandate for SBI Scholar Loan, HDFC Credila, Canara Bank, etc.\n\n• **Active Student Applications:**\n  - **Akshat Raj (251FA04E03):** SBI Scholar Loan — *Fee Estimation Schedule* (Status: **Pending Verification**).\n  - **Aarav Desai (251FA04E42):** HDFC Credila — *Bank NOC & University Account Mandate* (Status: **Issued / Verified**).\n  - **Meera Iyer (251FA04E58):** Canara Bank — *Bonafide Student Certificate* (Status: **Pending Verification**).\n\n💡 *Note:* Pending loan verification wale students ke automated fee reminders suppress rehte hain.`,

        kind: "loan",

      };

    }

    return {

      role: "assistant",

      content: `### 🏦 Bank Education Loan Desk & Available Documents\n\n* **Official Loan Documents Available for Issuance:**\n  1. **Fee Estimation Schedule:** Official year-wise signed fee breakdown for loan sanction.\n  2. **Bonafide Student Certificate:** Verifiable institutional enrollment certificate.\n  3. **Bank NOC & Account Mandate:** Institutional direct disbursement mandate for SBI Scholar Loan, HDFC Credila, Canara Bank, etc.\n\n* **Active Student Applications Queue:**\n  * **Akshat Raj (251FA04E03):** SBI Scholar Loan — *Fee Estimation Schedule* (**Pending Verification**).\n  * **Aarav Desai (251FA04E42):** HDFC Credila — *Bank NOC & Account Mandate* (**Issued & Verified**).\n  * **Meera Iyer (251FA04E58):** Canara Bank — *Bonafide Certificate* (**Pending Verification**).\n\n*Note: Students with pending loan verification have automated reminder distress-suppression enabled.*`,

      kind: "loan",

    };

  }



  // 7.5 Reconciliation Status & Combined Reconciliation Navigation

  if (/reconciliation status|unreconciled|reconcile status/i.test(lower) || (/reconciliation/i.test(lower) && (/status|batao|rate|mismatch|detail|queue/i.test(lower) || /aur.*kholo/i.test(lower)))) {

    const hasNavRequest = /kholo|open\b|le chalo|navigate|page kholo|show|dikhao/i.test(lower);

    if (inHindi) {

      return {

        role: "assistant",

        content: `⚖️ **University Payment Reconciliation Status:**\n\n• **Reconciliation Rate:** **99.2%**\n• **Reconciled Today:** 1,284 transactions settled.\n• **Pending Queue:** 127 gateway transactions awaiting batch settlement.\n• **Active Discrepancies:** 23 mismatches, including **TXN-10483** (Gateway: ₹25,000, Ledger: ₹20,000 — ⚠️ ₹5,000 difference).${hasNavRequest ? "\n\n🚀 *Main Reconciliation center open kar raha hoon.*" : ""}`,

        kind: "reconcile",

        navigation: hasNavRequest ? { view: "Reconciliation", reason: "Inspecting reconciliation center" } : undefined,

        actionSummary: hasNavRequest ? "Opening Reconciliation…" : undefined,

      };

    }

    return {

      role: "assistant",

      content: `### ⚖️ University Reconciliation Status\n\n* **Reconciliation Efficiency:** **99.2%**\n* **Settled Today:** 1,284 gateway transactions.\n* **Pending Queue:** 127 transactions awaiting bank batch clearance.\n* **Flagged Discrepancies:** 23 mismatches (e.g. **TXN-10483** with ₹5,000 gateway-to-ledger variance).${hasNavRequest ? "\n\n🚀 *Navigating to Reconciliation Center.*" : ""}`,

      kind: "reconcile",

      navigation: hasNavRequest ? { view: "Reconciliation", reason: "Inspecting reconciliation center" } : undefined,

      actionSummary: hasNavRequest ? "Opening Reconciliation…" : undefined,

    };

  }



  // 7.6 Collection Intelligence & Predictive Monthly Trends

  if (/collection intelligence|collection efficiency|collection forecast|monthly trend|collection graph|actual vs project|apr.*sep|oct.*mar|collection analytics|projection|collection report|monthly collection|reports data|treasury report|total collection|total revenue|realization rate/i.test(lower) && !/tax|80c/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `📈 **Institutional Collection Intelligence & Predictive Analytics (AY 2026–27):**\n\n**Collection Intelligence** university ke fee inflows ko actual real-time collections aur upcoming tranches ke predictive demand ke roop me track karta hai:\n\n• **Apr–Sep Actual Realized:** **₹412.40 Lakhs** collected (**84.92%** collection efficiency)\n• **Oct–Mar Projected Demand:** **₹178.60 Lakhs** anticipated across upcoming semester instalments\n• **Gross Annual Demand:** **₹485.60 Lakhs**\n• **Outstanding Receivables:** **₹73.20 Lakhs** (15.08%)\n• **Peak Inflow Velocity:** July me highest collection register hui (₹41.0 L in B.Tech CSE Tuition) admission aur semester opening cycle ke dauran.\n• **Multi-Dimensional Filters:** Is data ko Academic Year (\`2026–27\` vs \`2025–26\`), Programme (\`B.Tech CSE\`, \`MBA\`), Category (\`General\`, \`Scholarship\`), aur Fee Head (\`Tuition\`, \`Hostel\`) ke hisab se dynamically filter aur analyze kiya ja sakta hai.`,

        kind: "breakdown",

      };

    }

    return {

      role: "assistant",

      content: `### 📈 Institutional Collection Intelligence & Predictive Analytics (AY 2026–27)\n\n**Collection Intelligence** provides predictive multi-dimensional tracking of realized fee collections against upcoming tranche forecasts:\n\n* **Apr–Sep Actual Collections:** **₹412.40 Lakhs** realized (**84.92%** collection efficiency)\n* **Oct–Mar Projected Demand:** **₹178.60 Lakhs** anticipated across subsequent instalments\n* **Total Gross Demand:** **₹485.60 Lakhs** (with ₹73.20 Lakhs / 15.08% unrealized outstanding)\n* **Peak Collection Velocity:** July recorded peak inflow (₹41.0 L in B.Tech CSE Tuition) driven by semester registration.\n* **Dynamic Slicing Dimensions:** Sliced across Academic Year (*2026–27*, *2025–26*), Degree Programme (*B.Tech CSE*, *MBA*), Category (*General*, *Scholarship*), and Fee Head (*Tuition*, *Hostel*).`,

      kind: "breakdown",

    };

  }



  // 7.7 Finance Intelligence & Proactive Signals

  if (/finance intelligence|institutional signals|dashboard signals|actionable signals|live alerts|alerts|signals/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `⚡ **VFSTR Finance Intelligence — Live Actionable Signals:**\n\n**Finance Intelligence** dashboard 4 proactive alerts monitor karta hai taaki financial discrepancies aur student risks escalate na hon:\n\n1. ⚠️ **23 Payment Mismatches (Warning):** Gateway settlement aur student ledger me difference hai (jaise **TXN-10483** me ₹5,000 variance) jo human finance review require karta hai.\n2. 🚨 **84 Students Overdue >90 Days (Critical):** In students ke paas ₹8.50 L ke chronic dues hain jinke liye structured follow-up ya instalment intervention needed hai.\n3. ✅ **1,284 Payments Reconciled Today (Success):** Automated zero-touch matching system ne aaj 1,284 gateway receipts ko 99.2% efficiency par reconcile kiya hai.\n4. 🛡️ **14 Refund Requests (Primary):** UGC Policy WD-2026 ke tahat admission withdrawal ke 14 refund cases Finance Officer ke approval queue me pending hain.`,

        kind: "reconcile",

      };

    }

    return {

      role: "assistant",

      content: `### ⚡ VFSTR Finance Intelligence — Proactive Institutional Signals\n\n**Finance Intelligence** monitors 4 real-time operational signals designed for rapid executive decision-making:\n\n1. **⚠️ 23 Payment Mismatches (Warning):** Requiring reconciliation review (e.g. **TXN-10483** with a ₹5,000 gateway-to-ledger variance).\n2. **🚨 84 Overdue Students (>90 Days) (Critical):** Representing ₹8.50 Lakhs in persistent aged receivables requiring structured engagement.\n3. **✅ 1,284 Payments Reconciled Today (Success):** Seamless zero-touch transaction matching achieving 99.2% automated accuracy.\n4. **🛡️ 14 Refund Requests (Primary):** Admission withdrawal cases awaiting Finance Officer review under UGC Policy WD-2026 guidelines.`,

      kind: "reconcile",

    };

  }



  // 7.8 Fee Head Overview & Distribution

  if (/fee head overview|fee heads|heads overview|heads breakdown|tuition kitna|hostel kitna|exam kitna|transport kitna|library kitna|lab kitna/i.test(lower)) {

    const headList = feeHeads.map(h => `• **${h.name} Fee:** ₹${h.amount.toFixed(1)} Lakhs`).join("\n");

    if (inHindi) {

      return {

        role: "assistant",

        content: `🏛️ **Fee Head Overview & Distribution (AY 2026–27):**\n\n${headList}\n• **Registration, Caution Deposit & Alumni:** ₹5.00 Lakhs\n\n📊 **Total Gross Fee Demand:** **₹485.60 Lakhs**\n• Core Tuition accounts for 58.8% (₹285.5 L), followed by Hostel & Boarding at 19.4% (₹94.2 L).`,

        kind: "breakdown",

      };

    }

    return {

      role: "assistant",

      content: `### 🏛️ Fee Head Overview & Distribution (AY 2026–27)\n\n${headList}\n* **Registration, Caution Deposit & Alumni:** ₹5.00 Lakhs\n\n* **Total Gross Demand:** **₹485.60 Lakhs**\n* Core Tuition represents 58.8% (₹285.5 L), with Residential & Hostel fees accounting for 19.4% (₹94.2 L).`,

      kind: "breakdown",

    };

  }



  // 7.9 Outstanding Ageing Distribution

  if (/outstanding ageing|ageing analysis|ageing|aging|brackets|0-30|31-60|61-90|90\+|overdue brackets/i.test(lower)) {

    const ageList = ageing.map(a => `• **${a.label}:** ₹${a.amount.toFixed(1)} Lakhs`).join("\n");

    if (inHindi) {

      return {

        role: "assistant",

        content: `⏳ **Outstanding Ageing Distribution (Total ₹73.20 L Receivables):**\n\n${ageList}\n\n💡 **Critical Insight:** 84 students ke dues 90+ days puraane hain (₹8.50 L), jinke liye policy-governed smart reminders aur instalment plans active hain.`,

        kind: "breakdown",

      };

    }

    return {

      role: "assistant",

      content: `### ⏳ Outstanding Ageing Distribution\n\nTotal unrealized dues: **₹73.20 Lakhs** (15.08% of gross demand)\n\n${ageList}\n\n* **Operational Focus:** 84 students hold overdue accounts in the 90+ days bracket (₹8.50 L).`,

      kind: "breakdown",

    };

  }



  // 7.10 Audit Log & Real-Time Event Tracking

  if (/audit log|audit trail|system log|activity log|audit records|audit/i.test(lower) && !/reconciliation/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `📋 **VFSTR Financial Audit Log & Activity Trail:**\n\n• **Immutable Event Logging:** finDeck system har administrative action (view switch, payment review, refund decision, AI navigation) ko real-time audit log me record karta hai.\n• **Recent Logged Actions:**\n  - AI Agent Autonomous Navigation (Fee Structure, Students, Reconciliation)\n  - Mismatch inspection for TXN-10483\n  - Refund recommendation prepared for RF-2081 (Ananya Sharma)\n  - Split-payment instalment dispatch evaluated for Akshat Raj (251FA04E03)\n• **Compliance:** Complete ISO 27001 aur NAAC financial audit compliance audit trails provide karta hai.`,

        kind: "general",

      };

    }

    return {

      role: "assistant",

      content: `### 📋 Financial Audit Log & Real-Time Activity Trail\n\n* **Immutable Event Stream:** finDeck records every privileged operation, role switch, mismatch review, refund decision, and AI navigation in the centralized institutional audit trail.\n* **Recent Audit Records:**\n  * *AI Agent Navigated:* Switched to Fee Structure & Student Profiles\n  * *Mismatch Inspected:* TXN-10483 (₹5,000 ledger variance flagged)\n  * *Refund Evaluated:* RF-2081 (Ananya Sharma ₹18,500 net calculation)\n  * *Distress Suppression:* Reminder evaluated for Akshat Raj (Suppressed via active 3-Instalment plan)\n* **Compliance:** Fully verifiable audit trail designed for statutory academic and treasury audits.`,

      kind: "general",

    };

  }



  // 7.11 SQL Schema Inspector & Relational Database Store

  if (/sql schema|database schema|relational database|tables|ddl|sql store|sql inspector/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `🗄️ **PostgreSQL Relational Schema (finance schema):**\n\nVFSTR finDeck enterprise-grade relational database tables par chalta hai:\n\n1. **finance.student_fee_ledger:** Core student records, gross demand, paid amount, overdue days, instalment plan link.\n2. **finance.fee_component:** Breakdown by fee head (Tuition, Hostel, Lab, etc.) along with merit scholarship credits.\n3. **finance.waterfall_allocation_policy:** Partial payment priority allocation hierarchy (Tuition > Exam > Lab > Library > Transport > Hostel).\n4. **finance.reminder_dispatch:** Automated reminder history with policy suppression reason codes.\n5. **finance.scholarship_renewal_risk:** Academic tracking for students at risk of losing scholarship (CGPA < 7.50 / Attendance < 75%).\n6. **finance.loan_document_request:** Official bonafide & fee estimation certificate issuance desk for bank education loans.`,

        kind: "general",

      };

    }

    return {

      role: "assistant",

      content: `### 🗄️ PostgreSQL Database Schema Inspector (admissions_finance)\n\nfinDeck is backed by a normalized relational data model structured within the \`finance\` schema:\n\n1. **\`finance.student_fee_ledger\`:** Student demographics, total demand, allocated credits, outstanding balance, and active instalment plans.\n2. **\`finance.fee_component\`:** Head-wise fee apportionments (Tuition, Hostel, Transport, etc.) and merit awards.\n3. **\`finance.waterfall_allocation_policy\`:** Strict academic prioritization hierarchy for partial payment clearance.\n4. **\`finance.reminder_dispatch\`:** Proactive distress-suppression dispatch logs with reason codes.\n5. **\`finance.scholarship_renewal_risk\`:** CGPA (<7.50) and Attendance (<75%) threshold monitoring.\n6. **\`finance.loan_document_request\`:** Verifiable Bonafide and Fee Estimation schedules for nationalized banks.`,

      kind: "general",

    };

  }



  // 7.12 Official Institutional Certificates (Section 80C, Bonafide, No Dues)

  if (/certificate|certificates|80c|tax certificate|income tax|tax exemption|bonafide|no dues/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `📄 **VFSTR Official Student & Fee Certificates:**\n\n• **Section 80C Tuition Fee Certificate:** Income Tax Act 1961 ke Section 80C ke tahat ₹1,50,000 tak Tuition fee deduction claim karne ke liye digital verified certificate.\n• **Bank Bonafide & Fee Estimation Schedule:** SBI, HDFC, Canara Bank aur nationalized banks ke education loan sanction ke liye official signed estimate.\n• **Provisional No-Dues Clearance:** Semester registration, hall ticket release aur convocation degree dispatch ke liye 1-click clearance.\n\n💡 *Download:* Student Profile me *"Certificates"* tab se 1-click verified PDF download kiya ja sakta hai.`,

        kind: "tax",

      };

    }

    return {

      role: "assistant",

      content: `### 📄 Institutional Fee & Academic Certificates\n\n* **Section 80C Tax Exemption Certificate:** Verifiable digital receipt certifying core **Tuition fee** payments up to **₹1,50,000** for income tax exemption under Section 80C of ITA 1961.\n* **Bank Bonafide & Fee Estimation Schedule:** Official institutional schedule required for nationalized bank educational loan sanctions (SBI, HDFC Credila, Canara Bank).\n* **Provisional No-Dues Clearance:** Real-time clearance verification for semester exam hall tickets and graduation clearance.\n\n*Instant PDF generation available in the Student Drawer under 'Certificates'.*`,

      kind: "tax",

    };

  }



  // 7.13 Fee Priority Waterfall Allocation

  if (/waterfall|partial payment|priority|sequence|order of fees|clause 4\.2|allocation order/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `🌊 **VFSTR Fee Waterfall Allocation Algorithm (Clause 4.2):**\n\nJab koi student partial amount (jaise ₹30,000) pay karta hai, toh University Bylaws ke Clause 4.2 ke anusaar payment is priority order me allocate hota hai:\n\n1. **Tuition Fee (Rank 1):** Academic teaching & faculty credits.\n2. **Examination Fee (Rank 2):** Semester end & continuous evaluation.\n3. **Library Fee (Rank 3):** E-resources & journals.\n4. **Laboratory Fee (Rank 4):** Lab infrastructure & consumables.\n5. **Transport Fee (Rank 5):** University bus fleet logistics.\n6. **Hostel & Mess Fee (Rank 6):** Boarding & lodging.\n\n💡 *Example:* Agar student ₹30,000 deta hai toh pehle Tuition clear hoga, phir baaki heads.`,

        kind: "waterfall",

      };

    }

    return {

      role: "assistant",

      content: `### 🌊 Fee Priority Waterfall Allocation (Clause 4.2)\n\nUnder University Financial Clause 4.2, partial fee payments are apportioned in strict order of academic necessity:\n\n1. **Rank 1: Tuition Fee** (Academic instruction and course credits)\n2. **Rank 2: Examination Fee** (Semester evaluation and grade processing)\n3. **Rank 3: Library Fee** (Digital databases, IEEE, ScienceDirect)\n4. **Rank 4: Laboratory Fee** (Equipment usage and consumables)\n5. **Rank 5: Transport Fee** (Campus logistics)\n6. **Rank 6: Hostel & Mess Fee** (Residential board)\n\n*This ensures student academic eligibility is cleared with highest priority.*`,

      kind: "waterfall",

    };

  }



  // 7.14 Smart Reminders & Suppression Policies

  if (/smart reminder|suppression|distress|reminder policy|reminder rules|reminder/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `🔔 **Smart Reminders & Distress Suppression Engine:**\n\nUniversity ka reminder system 4 strict suppression policies par kaam karta hai taaki genuine student distress avoid ho:\n\n1. **Active Education Loan:** Agar student ka bank loan application in-progress ho toh reminders suppress rehte hain.\n2. **Recent Hardship:** Bereavement ya medical emergency report hone par 30 din ka freeze lagta hai.\n3. **Recent Payment:** Agar pichhle 7 dino me koi partial payment kiya ho toh automatic suppression active hoti hai.\n4. **Frequency Cap:** Kisi bhi student ko 14 dino me 1 se zyada reminder dispatch nahi kiya jata.`,

        kind: "general",

      };

    }

    return {

      role: "assistant",

      content: `### 🔔 Smart Reminders & Distress Suppression Policies\n\nVFSTR operates a policy-governed reminder suppression engine to safeguard students facing genuine hardships:\n\n* **Active Bank Loan:** Suppressed when an educational loan application is pending verification.\n* **Compassionate Freeze:** 30-day automatic hold on fee reminders for reported medical/family hardship.\n* **Recent Payment Grace:** 7-day moratorium following any verified partial payment.\n* **Cadence Guardrail:** Strictly capped at maximum 1 reminder dispatch per 14-day window.`,

      kind: "general",

    };

  }



  // 7.15 UGC Fee Refund Norms

  if (/refund|withdrawal|ugc policy|refund rules|caution deposit return/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `⚖️ **UGC & AICTE Admission Refund Norms (Policy WD-2026):**\n\n• **15 din pehle withdrawal:** 100% Fee Refund (Max ₹1,000 processing deduction).\n• **Less than 15 days before:** 90% Refund.\n• **Within 15 days after date:** 80% Refund.\n• **Within 30 days after date:** 50% Refund.\n• **Caution Deposit:** 100% refundable upon submission of clear No-Dues certificate.\n\n📌 *Example:* RF-2081 (Ananya Sharma) — Eligible deposit ₹20,000 me se policy deduction ₹1,500 karke net recommendation ₹18,500 prepare ki gayi hai.`,

        kind: "refund",

      };

    }

    return {

      role: "assistant",

      content: `### ⚖️ UGC & AICTE Fee Refund Regulations\n\nUnder UGC Notification Policy WD-2026 for institutional admission withdrawals:\n\n* **>= 15 Days Before Formally Notified Last Date:** 100% refund (capped ₹1,000 processing fee).\n* **< 15 Days Before Last Date:** 90% aggregate fee refund.\n* **<= 15 Days After Last Date:** 80% aggregate fee refund.\n* **<= 30 Days After Last Date:** 50% aggregate fee refund.\n* **Caution Deposit:** 100% refunded upon No-Dues clearance.\n\n*Representative case:* RF-2081 (Ananya Sharma) — ₹20,000 deposit yields ₹18,500 net recommendation.`,

      kind: "refund",

    };

  }



  // 7.16 General Institutional Summary, Total Outstanding & Core KPIs

  if (/kitne student|total students|how many students|total demand|total collected|snapshot|overview|stats|summary|kpi|kpis|total outstanding|outstanding dues|total dues|total baki/i.test(lower)) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `📊 **VFSTR University Financial Snapshot & Core KPIs (AY 2026–27):**\n\n• **Total Enrolled Students:** 1,450+ student accounts across B.Tech, MBA & Pharmacy.\n• **Total Fee Demand:** **₹485.60 L** (+7.4% target)\n• **Total Collected:** **₹412.40 L** (84.92% collection rate)\n• **Outstanding Dues:** **₹73.20 L** (15.08% unrealized receivables)\n• **Reconciliation Rate:** **99.2%** (1,284 reconciled today, 127 pending gateway queue)\n• **Active Signals:** 23 payment mismatches, 14 refund requests awaiting review.`,

      };

    }

    return {

      role: "assistant",

      content: `### 📊 VFSTR Financial Snapshot & Core KPIs (AY 2026–27)\n\n* **Student Enrollment:** 1,450+ active student accounts across all faculties.\n* **Total Fee Demand:** **₹485.60 L** (+7.4% target)\n* **Total Collected:** **₹412.40 L** (84.92% collection rate)\n* **Outstanding Dues:** **₹73.20 L** (15.08% unrealized balance)\n* **Automated Reconciliation:** **99.2%** (1,284 settled today, 127 in gateway queue)\n* **Active Signals:** 23 mismatches, 14 pending refund reviews.`,

    };

  }



  // =========================================================================

  // 12. GREETINGS & CAPABILITIES (When user says hi / hello / help)

  // =========================================================================

  const isGreeting = /^(hi|hello|hey|namaste|pranam|help|kya kar sakte ho|who are you|capabilities|kaise ho|what can you do)[\s!?.]*$/i.test(lower);



  if (isGreeting) {

    if (inHindi) {

      return {

        role: "assistant",

        content: `🎓 **Namaste! Main VFSTR finDeck ka Autonomous Financial AI Advisor hoon.**\n\nMain university fee governance, student ledgers, policy compliance aur application automation mein poori tarah trained hoon. Main aapki in mamlon mein madad kar sakta hoon:\n\n• 📊 **Financial & Ledger Inquiries:** *"Akshat Raj ka dues kitna hai?"*, *"Collection Intelligence kya batata hai?"*, *"Finance Intelligence ke signals kya hain?"*, *"Fee waterfall priority kaise allocate hoti hai?"*, *"Section 80C tax certificate kaise claim karein?"*\n• 🧭 **Intelligent App Navigation:** *"Fee Structure screen dikhao"*, *"Students directory kholo"*, *"Akshat Raj ka profile drawer open karo"*, *"TXN-10483 audit review kholo"*\n• ⚡ **Combined Operations:** *"Akshat Raj ka ledger check karo aur uska account open karo"*\n• 🛡️ **Institutional Policies:** Split-payment instalment plans, smart reminder distress suppression, aur UGC refund retention rules.\n\n*Aap mujhse Hindi, Hinglish ya English mein koi bhi sawaal pooch sakte hain.*`,

      };

    }



    return {

      role: "assistant",

      content: `### 🎓 Welcome to VFSTR finDeck — Autonomous Financial Command Center\n\nI am your **Chief Autonomous AI Financial Advisor and Application Operator** for Vignan's Foundation for Science, Technology & Research (VFSTR Deemed to be University), AP. I operate seamlessly across verified institutional ledgers and UI navigation:\n\n* **📊 Real-Time Financial Lookups:** Instant access to student ledgers, Collection Intelligence analytics, Finance Intelligence signals, fee heads, and overdue aging.\n* **🧭 Autonomous UI Navigation:** Deep-link navigation across views and auto-opening of student profiles (e.g. *“Open Akshat Raj's account”* or *“Inspect TXN-10483”*).\n* **⚖️ Policy Governance & Compliance:** Instant calculations for UGC Refund Norms (WD-2026), Section 80C ITA 1961 tax certificates, fee waterfall priorities, and smart reminder distress suppression.\n* **🔒 Enterprise Security & RBAC:** Safe read-only execution with strict multi-factor guardrails on financial mutations.\n\n*How may I assist you with university fee management today?*`,

    };

  }



  // =========================================================================

  // 13. OUT-OF-DATABASE / INSUFFICIENT INFORMATION FALLBACK

  // =========================================================================

  if (inHindi) {

    return {

      role: "assistant",

      content: `🔍 **Record / Information Not Found in Database:**\n\nMain yeh information fetch nahi kar pa raha hoon kyunki yeh record ya topic **VFSTR finDeck University Finance Database** mein exist nahi karta hai ya mere paas iski complete information available nahi hai.\n\n🏛️ **Recommendation:**\nKripya official clarification, physical verification ya manual record update ke liye ek baar **University Finance Department / Accounts Section** se contact karein:\n• **Office Location:** Finance & Accounts Helpdesk, Administrative Block, 1st Floor (VFSTR Campus)\n• **Official Email:** \`finance.desk@vignan.ac.in\` | \`bursar@vignan.ac.in\`\n• **Helpdesk Ext:** +91-863-2344700 (Ext. 204 / 205)\n• **Timings:** Monday to Friday, 9:00 AM – 5:00 PM\n\n💡 *Aap mujhse verified financial records ke baare mein pooch sakte hain:*\n• *"Akshat Raj ka dues kitna hai?"*\n• *"Collection Intelligence kya batata hai?"*\n• *"Fee Structure screen dikhao"*\n• *"Reconciliation status kya hai?"*\n• *"Scholarship risk wale students kaun hain?"*`,

    };

  }



  return {

    role: "assistant",

    content: `🔍 **Information Not Found in Institutional Database:**\n\nI cannot retrieve complete or verified details for this query because the requested record does not exist in the active **VFSTR finDeck University Finance Database** or sufficient information is not available.\n\n🏛️ **Recommended Next Step:**\nPlease **contact the University Finance Department / Bursar's Office** for official records, manual verification, or offline ledger assistance:\n* **Office Location:** Finance & Accounts Office, Administrative Block, 1st Floor (VFSTR Campus)\n* **Official Email:** \`finance.desk@vignan.ac.in\` / \`bursar@vignan.ac.in\`\n* **Helpdesk Phone:** +91-863-2344700 (Ext. 204 / 205)\n* **Office Hours:** Monday – Friday, 9:00 AM to 5:00 PM IST\n\n💡 *You may query me for any indexed institutional operations, including:*\n* *"What does Collection Intelligence show?"*\n* *"Check outstanding dues for Akshat Raj"*\n* *"Show official Fee Structure"*\n* *"What is the reconciliation status?"*\n* *"Show pending scholarship risks"*`,

  };

}



// Live Gemini API caller with elevated institutional system prompt & dynamic data grounding

async function callLiveGeminiApi(prompt: string, history: AiChatMessage[], apiKey: string, context: AgentContext): Promise<AiChatMessage | null> {

  const isStudent = context.role === "student";

  const studentPool = (context.liveStudents && context.liveStudents.length > 0)

    ? context.liveStudents

    : allStudentsWithProspective;

  const currentStudentId = context.currentStudentId || "251FA04E03";



  let systemPrompt = "";



  if (isStudent) {

    const student = studentPool.find(s => s.id === currentStudentId) || studentPool[0];

    const unified = getUnifiedStudentContext(student.id);

    const sStat = scholarshipStatus[student.id];



    const demandVal = unified.status === "matched" ? unified.currentYearDemand : student.demand;

    const scholarshipVal = unified.status === "matched" ? unified.scholarshipConcession : student.scholarship;

    const paidVal = unified.status === "matched" ? unified.currentYearPaid : student.paid;

    const outstandingVal = unified.status === "matched" ? unified.currentYearOutstanding : student.overdue;

    const planDesc = unified.status === "matched" && unified.instalmentPlan

      ? `${unified.instalmentPlan.planType} (${unified.instalmentPlan.instalments.filter(i => i.status === "Paid").length}/${unified.instalmentPlan.instalments.length} Paid)`

      : "Standard lump-sum";

    const loanDesc = unified.status === "matched" && unified.loanRequests.length > 0

      ? `${unified.loanRequests[0].bank_name} (${unified.loanRequests[0].status})`

      : "No active loan application";

    const attVal = sStat?.attendance ?? (unified.status === "matched" && unified.scholarshipRisk ? unified.scholarshipRisk.attendance_pct : 85);

    const gpaVal = sStat?.cumulativeGPA ?? (unified.status === "matched" && unified.scholarshipRisk ? unified.scholarshipRisk.cgpa : 8.0);



    systemPrompt = `You are finDeck's Dedicated Personal Student Fee & Document Copilot for student ${student.name} (ID: ${student.id}).



STUDENT IDENTITY & AUTHORITATIVE PERSONAL FINANCIAL RECORD:

- Student Name: ${student.name}

- Roll No / ID: ${student.id}

- Enrolled Programme: ${student.programme} (${student.category})

- Net Annual Demand: ${inr(demandVal)}

- Merit Scholarship Credit: ${inr(scholarshipVal)}

- Total Amount Paid to Date: ${inr(paidVal)}

- Current Outstanding Balance Due: ${inr(outstandingVal)}

- Overdue Days: ${student.overdue || 0} days

- Active Instalment Plan: ${planDesc}

- Bank Education Loan Application: ${loanDesc}

- Attendance: ${attVal}%, CGPA: ${gpaVal}



STRICT ROLE-BASED ACCESS CONTROL (RBAC) & PRIVACY POLICY:

1. You are interacting with a STUDENT (${student.name}, ${student.id}).

2. Under university bylaws and data privacy regulations, this student is AUTHORIZED to view ONLY their OWN fee details, payment receipts, instalment schedules, and certificates (Bonafide, NOC, Reimbursement, Statement of Fees, Section 80C Tax Exemption).

3. You DO NOT have access to, and MUST NEVER discuss or mention any other student's fee details, attendance, scores, or loan status.

4. You DO NOT have access to university-wide macro figures, total revenue, audit trails, reconciliation mismatches, or administrator controls.

5. If the user asks about other students or administrative financial matters, politely refuse: "As a student, you can only access your own individual fee account. Access to other student profiles and administrative finance logs is restricted to the CEO Administrator and Finance Officer."

6. Tone & Language: Highly empathetic, helpful, clear, and polite. Respond in the exact language or blend (Telugu, Hindi, Hinglish, English) used by the student.`;

  } else {

    // 1. Authoritative Institutional Metrics from Unified Live Database

    const totalStudentsCount = studentPool.length;

    const admittedCount = studentPool.filter(s => s.admissionStatus !== "Prospective").length;

    const prospectiveCount = studentPool.filter(s => s.admissionStatus === "Prospective").length;

    const allBranches = Array.from(new Set(studentPool.map(s => s.programme)));



    // 2. Real Top Overdue Students from Live Database

    const topOverdueStudents = [...studentPool]

      .filter(s => (s.overdue || 0) > 0)

      .sort((a, b) => (b.overdue || 0) - (a.overdue || 0))

      .slice(0, 6)

      .map(s => `• **${s.name}** (\`${s.id}\` · ${s.programme} · ${s.admissionMode || "V-SAT"}): Overdue **${inr(s.overdue)}** (Demand: ${inr(s.demand)}, Paid: ${inr(s.paid)})`)

      .join("\n");



    // 3. Dynamic Student Query Grounding

    const matchedStudents = findMentionedStudents(prompt, studentPool);

    let liveDataSnippet = "";



    if (matchedStudents.length > 0) {

      liveDataSnippet += `\n\nAUTHORITATIVE LIVE DATABASE RECORD FOR MATCHED STUDENT(S):`;

      for (const student of matchedStudents.slice(0, 3)) {

        const unified = getUnifiedStudentContext(student.id);

        const planText = unified.status === "matched" && unified.instalmentPlan

          ? `${unified.instalmentPlan.planType} (${unified.instalmentPlan.instalments.filter(i => i.status === "Paid").length}/${unified.instalmentPlan.instalments.length} Paid)`

          : (student.instalmentPlan || "Standard lump-sum");

        const loanText = unified.status === "matched" && unified.loanRequests.length > 0

          ? `${unified.loanRequests[0].bank_name} — ${unified.loanRequests[0].status}`

          : "No active loan application";

        const riskText = unified.status === "matched" && unified.scholarshipRisk

          ? `FLAGGED: ${unified.scholarshipRisk.risk_level} (CGPA: ${unified.scholarshipRisk.cgpa}, Attendance: ${unified.scholarshipRisk.attendance_pct}%)`

          : "Good standing (Above threshold)";



        liveDataSnippet += `\n• Student: **${student.name}** (Roll / Student ID: \`${student.id}\`)

  - Programme: ${student.programme} | Batch: ${student.yearLabel || "1st Year"}

  - Admission Mode: ${student.admissionMode || "V-SAT"} | Status: ${student.admissionStatus || "Admitted"}

  - Net Annual Demand: ${inr(student.demand)}

  - Total Verified Paid: ${inr(student.paid)}

  - Total Outstanding Overdue: **${inr(student.overdue)}**

  - Sanctioned Scholarship: ${inr(student.scholarship || 0)} | Concession: ${inr(student.concession || 0)}

  - Active Instalment Plan: ${planText}

  - Bank Education Loan: ${loanText}

  - Academic / Scholarship Risk: ${riskText}`;

      }

    } else {

      // Check if user is asking about a student name that does not exist in the database

      const stopWords = new Set([

        "kya", "hai", "kaise", "kitna", "kitni", "batao", "bata", "do", "fees", "fee", "baki", "mera", "meri",

        "bhai", "kaha", "kab", "milega", "chahiye", "kuch", "hoga", "konsa", "kisko", "kyun", "paisa", "rupaye",

        "maaf", "chhut", "rakha", "nahi", "tha", "raha", "dena", "dene", "kholo", "dikhao", "le", "chalo", "dikhaye",

        "open", "karo", "check", "bhejo", "chalo", "jao", "student", "students", "tell", "me", "about", "what",

        "is", "the", "due", "dues", "balance", "total", "who", "are", "which", "how", "much", "show", "give", "list",

        "section", "page", "drawer", "profile", "account", "status", "detail", "details", "info"

      ]);

      const potentialNameTokens = prompt.toLowerCase().split(/[\s,.'"?!\-]+/).filter(t => t.length >= 3 && !stopWords.has(t));

      if (potentialNameTokens.length > 0 && /student|roll|fees|due|balance|kiska|naam|record|profile|account/i.test(prompt)) {

        liveDataSnippet += `\n\nAUTHORITATIVE DATABASE SEARCH RESULT:

Zero records matching "${potentialNameTokens.join(" ")}" found in the VFSTR official student database (${totalStudentsCount} total registered students).

CRITICAL DIRECTIVE: You MUST explicitly and clearly state that this student DOES NOT EXIST in the university database. DO NOT make up or hallucinate any imaginary student or figures.`;

      }

    }



    // 4. Branch / Programme specific real students snippet if mentioned

    const mentionedBranch = allBranches.find(b =>

      new RegExp(`\\b${b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "i").test(prompt) ||

      (b.includes("CSE") && /\bcse\b/i.test(prompt)) ||

      (b.includes("ECE") && /\bece\b/i.test(prompt)) ||

      (b.includes("MBA") && /\bmba\b/i.test(prompt)) ||

      (b.includes("MCA") && /\bmca\b/i.test(prompt)) ||

      (b.includes("Biotechnology") && /\bbiotech\b/i.test(prompt))

    );

    if (mentionedBranch) {

      const branchStudents = studentPool.filter(s => s.programme === mentionedBranch).slice(0, 5);

      liveDataSnippet += `\n\nREAL VERIFIED STUDENTS IN ${mentionedBranch} (${branchStudents.length} sample of ${studentPool.filter(s => s.programme === mentionedBranch).length} enrolled):

${branchStudents.map(s => `• ${s.name} (\`${s.id}\`) - Demand: ${inr(s.demand)}, Paid: ${inr(s.paid)}, Overdue: ${inr(s.overdue)}`).join("\n")}`;

    }



    systemPrompt = `You are finDeck's Chief Autonomous AI Financial Advisor & Universal Application Operator for Vignan's Foundation for Science, Technology & Research (VFSTR Deemed to be University), Andhra Pradesh.



COMMUNICATION PERSONA & LANGUAGE:

- You are an all-knowing, executive, highly intelligent 24/7 financial copilot and interactive operator for the entire finDeck platform.

- You understand English, Hindi, and natural Hinglish fluently. Always respond in the exact tone, language, or mix that the user asks (e.g. pure Hindi, natural Hinglish, or crisp professional English).

- Format responses with clean, structured markdown: bullet points, bold key figures, formatted currency (e.g. ₹1,20,000 or ₹485.60 Lakhs), and direct answers.



CRITICAL ZERO-HALLUCINATION & STRICT GROUNDING MANDATE:

1. You MUST ONLY cite real students present in the verified database context below.

2. You are STRICTLY FORBIDDEN from inventing, fabricating, or guessing ANY student names, roll numbers, or amounts.

3. If a student requested by the user does not exist in the database, explicitly tell the user: "Yeh student university database mein record nahi hai" / "This student does not exist in the official university records".

4. Never make up names like 'Rahul Sharma' or arbitrary roll numbers.



AUTONOMOUS APPLICATION-WIDE UI NAVIGATION:

1. You have DIRECT AUTONOMOUS NAVIGATION ACCESS across all 14 screens and modules in this application:

   - Dashboard (Executive Treasury Command Center, Real-time KPIs, Ageing, Collection Intelligence)

   - Students (Student Accounts Directory, ${admittedCount} Admitted + ${prospectiveCount} Prospective records, Profile Drawer)

   - Fee Structure (Tuition, Hostel, Exam, Lab, Transport, Library & Caution Deposit Slabs, Waterfall Priority)

   - Payments (1,157 Transactions Ledger, Gateway Receipts, UTR Matching)

   - Reconciliation (Gateway Settlement & Mismatch Center)

   - Instalments (2- & 3-Instalment Plans & 7-Day Moratoria)

   - AI Assistant (Dedicated Full-Page Assistant Workspace)

   - Smart Reminders (Automated Multi-Channel Notice Dispatch & Distress Suppression)

   - Scholarship Risks (Academic Threshold Monitoring: Min 7.50 CGPA & 75% Attendance)

   - Loan Requests (Education Bank Loan Desk, SBI/HDFC/PNB NOC & Estimation Certificates)

   - Refunds (UGC Withdrawal Retention Slabs: WD-2026 Guidelines)

   - Reports (Relational SQL Schema Inspector & Audit Analytics)

   - Counsellor Desk (Attendance Shortfall Condonations & Dean Clearances)

   - Admit Cards (Hall Ticket Generation Oversight & Provisional Dues Clearance)



2. NAVIGATION EXECUTION BEHAVIOR:

   - When the user asks to open, view, go to, or navigate to ANY section or student profile (e.g. "students section me chalo", "fee structure kholo", "Akshat Raj ka account kholo", "reconciliation dikhao"):

     a) The application system WILL IMMEDIATELY AND DIRECTLY navigate the user to that view or open the student drawer.

     b) NEVER give manual clicking steps (DO NOT say "Click on the left sidebar", "Go to menu", "Step 1: click Students").

     c) Instead, confirm directly and proactively that you are opening / navigating them there now (e.g., "Main aapko Students section mein navigate kar raha hoon..." or "Navigating to Fee Structure now...").

     d) If opening a student's account, state that you are opening their student drawer now.



AUTHORITATIVE INSTITUTIONAL DATABASE OVERVIEW:

- Total Student Records in Database: ${totalStudentsCount} (${admittedCount} Enrolled/Admitted + ${prospectiveCount} Prospective Counseling)

- Academic Branches: ${allBranches.join(", ")}

- Top Overdue Students in Database:

${topOverdueStudents}

${liveDataSnippet}`;

  }



  const contents = [

    { role: "user", parts: [{ text: systemPrompt }] },

    ...history.slice(-4).map(h => ({

      role: h.role === "user" ? "user" : "model",

      parts: [{ text: h.content }]

    })),

    { role: "user", parts: [{ text: prompt }] }

  ];



  const candidateModels = ["gemini-3.6-flash", "gemini-2.5-flash"];



  for (const modelName of candidateModels) {

    try {

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const res = await fetch(url, {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ contents, generationConfig: { maxOutputTokens: 1400, temperature: 0.2 } }),

      });



      if (!res.ok) continue;

      const json = await res.json();

      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) continue;



      const navResult = detectNavigationIntent(prompt, studentPool, context.liveTransactions);

      const matched = findMentionedStudents(prompt, studentPool);

      const targetStudentId = navResult.studentId || (navResult.wantsNav && navResult.targetView === "Students" ? matched[0]?.id : undefined);



      return {

        role: "assistant",

        content: text,

        kind: navResult.wantsNav && navResult.targetView ? "navigation" : (targetStudentId ? "student" : "general"),

        navigation: navResult.wantsNav && navResult.targetView ? {

          view: navResult.targetView,

          studentId: targetStudentId,

          transactionId: navResult.transactionId,

          reason: `Autonomous navigation to ${navResult.targetView}`,

        } : undefined,

        actionSummary: navResult.wantsNav && navResult.targetView ? `Opening ${navResult.targetView}…` : undefined,

      };

    } catch {

      // Try next model if fetch fails

    }

  }



  return null;

}

