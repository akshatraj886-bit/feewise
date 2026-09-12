import { students, transactions, feeHeads, ageing, instalmentPlans, inr, type Student, type Transaction, type View } from "../database/finance-data";
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
  type FinanceTopic
} from "../services/finance-service";

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
}

// Detect if query is in Hindi / Hinglish
export function isHinglishQuery(text: string): boolean {
  const hindiKeywords = [
    "kya", "hai", "kaise", "kitna", "kitni", "batao", "bata do", "fees", "baki", "mera", "meri",
    "bhai", "kaha", "kab", "milega", "chahiye", "kuch", "hoga", "konsa", "kisko", "kyun",
    "paisa", "rupaye", "maaf", "chhut", "rakha", "nahi", "tha", "raha", "dena", "dene",
    "kholo", "dikhao", "le chalo", "dikhaye", "open karo", "check karo", "bhejo"
  ];
  const lower = text.toLowerCase();
  const matched = hindiKeywords.filter(k => new RegExp(`\\b${k}\\b`, "i").test(lower));
  return matched.length >= 2 || /bhai|kya hai|kitna|kaise|batao|bata do|kholo|dikhao|le chalo/i.test(lower);
}

// Smart entity resolution for students using authoritative 5-tier resolution
export function findMentionedStudents(query: string): Student[] {
  const res = resolveStudentIdentity(query);
  if (res.status === "matched") return [res.student];
  if (res.status === "ambiguous") return res.candidates;
  return [];
}

// Smart entity resolution for transactions
export function findMentionedTransaction(query: string): Transaction | null {
  const lower = query.toLowerCase();
  for (const t of transactions) {
    if (lower.includes(t.id.toLowerCase()) || (t.id.replace("TXN-", "").length >= 4 && lower.includes(t.id.replace("TXN-", "")))) {
      return t;
    }
  }
  return null;
}

// Check if query is explicitly asking to navigate/switch views
export function detectNavigationIntent(query: string): { wantsNav: boolean; targetView: View | null } {
  const lower = query.toLowerCase().trim();

  // Pure information indicators (data questions):
  const isInfoQuestion = /kya hai|kitna|kitni|batao|bata do|tell me|what is|how much|kaun|who are|which|kaise|why|reason|explain|documents?|difference|mismatch|summary|list|breakdown|risk|efficiency|order|waterfall|limit|schedule|history/i.test(lower);
  
  // Specific navigation phrases:
  const explicitNavPhrase = /kaha hai|where is|le chalo|take me to|go to|navigate to|switch to|open karo|kholo|page kholo|section kholo|open page|open desk|desk pe|desk par|screen dikhao|open\b|^show\b/i.test(lower);

  // Target view detection:
  let targetView: View | null = null;
  if (/fee structure page|fee structure section|fee rules page|published fee schedule/i.test(lower) || (/fee structure/i.test(lower) && explicitNavPhrase)) targetView = "Fee Structure";
  else if (/students directory|students section|student list page|students page/i.test(lower) || (/\bstudents\b/i.test(lower) && explicitNavPhrase && !/scholarship risk|loan|reminder|dues|balance/i.test(lower))) targetView = "Students";
  else if (/reconciliation center|reconciliation desk|reconciliation page|settlement center/i.test(lower) || (/reconciliation/i.test(lower) && explicitNavPhrase)) targetView = "Reconciliation";
  else if (/payments page|transactions list page|receipts ledger|payments section/i.test(lower) || (/\bpayments\b/i.test(lower) && explicitNavPhrase)) targetView = "Payments";
  else if (/instalments page|instalments section|split payment page/i.test(lower) || (/\binstalments\b/i.test(lower) && explicitNavPhrase)) targetView = "Instalments";
  else if (/smart reminders page|smart reminders section|reminders desk/i.test(lower) || (/\bsmart reminders\b/i.test(lower) && explicitNavPhrase)) targetView = "Smart Reminders";
  else if (/scholarship risks page|scholarship risks section/i.test(lower) || (/\bscholarship risks\b/i.test(lower) && explicitNavPhrase)) targetView = "Scholarship Risks";
  else if (/loan requests page|loan desk|loan section/i.test(lower) || (/\bloan requests\b/i.test(lower) && explicitNavPhrase)) targetView = "Loan Requests";
  else if (/refunds page|refund desk|refunds section/i.test(lower) || (/\brefunds\b/i.test(lower) && explicitNavPhrase)) targetView = "Refunds";
  else if (/reports page|reports section|sql dump page/i.test(lower) || (/\breports\b/i.test(lower) && explicitNavPhrase)) targetView = "Reports";
  else if (/dashboard|overview|home screen/i.test(lower)) targetView = "Dashboard";

  if (!targetView) {
    const wantsNav = explicitNavPhrase;
    return { wantsNav, targetView: null };
  }

  // If asking for information/data about that section and no explicit navigation phrase was used:
  if (isInfoQuestion && !explicitNavPhrase && !/kholo|open\b|le chalo/i.test(lower)) {
    return { wantsNav: false, targetView: null };
  }

  // If navigation or UI display is requested:
  const wantsNav = explicitNavPhrase || /kholo|open\b|le chalo|switch to|navigate|go to/i.test(lower);
  return { wantsNav, targetView: wantsNav ? targetView : null };
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

  // If user provided a custom API key, or if GEMINI_API_KEY is configured in env
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
  // 1. RBAC SECURITY ENFORCEMENT
  // =========================================================================
  if (isStudentRole) {
    // Prohibit student from asking for other students or institutional macro audit logs
    const requestedOtherStudent = findMentionedStudents(query).some(s => s.id !== currentStudentId);
    const askedForMacroReport = /all students|saare students|university report|macro treasury|audit log|schema inspector|other students|unauthorized/i.test(lower);

    if (requestedOtherStudent || askedForMacroReport) {
      if (inHindi) {
        return {
          role: "assistant",
          content: "🔒 **Access Restricted (RBAC Policy):**\nAap Student Portal me authenticated hain. Data privacy aur security regulations ke tahat aap keval apna student fee record aur certificates dekh sakte hain. Anya students ya university-level audit reports ka access restricted hai.",
          kind: "denied",
        };
      }
      return {
        role: "assistant",
        content: "🔒 **Access Restricted (RBAC Policy):**\nYou are currently logged in as a student. Under institutional data privacy policy, students are authorized to access only their own individual fee schedule, dues, and certificates. University-wide audit logs and peer accounts are restricted.",
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
      content: "⚠️ **Security & Audit Guardrail Active:**\nI am a read-only Autonomous Finance Copilot. While I can calculate, analyze, verify policy criteria, and navigate the application, executing actual fund transfers, payments, balance adjustments, or refund approvals strictly requires authenticated authorization from a designated Finance Officer with 2FA.",
      kind: "denied",
    };
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
  const resolution = resolveStudentIdentity(query);
  const isPersonalQuery = isStudentRole || /mera due|mera balance|my dues|my balance|mera account|my fee/i.test(lower);
  
  let targetStudent: Student | null = null;
  if (isPersonalQuery) {
    targetStudent = students.find(s => s.id === currentStudentId) || students[0];
  } else if (resolution.status === "matched") {
    targetStudent = resolution.student;
  } else if (resolution.status === "ambiguous") {
    const list = resolution.candidates.map(s => `• **${s.name}** (ID: \`${s.id}\` · ${s.programme})`).join("\n");
    if (inHindi) {
      return {
        role: "assistant",
        content: `🔍 **Multiple Matching Student Records Found:**\nAapke search ke mutabik ek se zyada students mile hain:\n\n${list}\n\nKripya specific student ID mention karein (jaise: *"Student ${resolution.candidates[0].id} ka dues batao"*).`,
      };
    }
    return {
      role: "assistant",
      content: `🔍 **Ambiguous Student Query:**\nMultiple student records matched your request:\n\n${list}\n\nPlease specify the exact Student ID (e.g. *"Open ledger for ${resolution.candidates[0].id}"*).`,
    };
  }

  // Check navigation intent
  const { wantsNav, targetView } = detectNavigationIntent(query);

  // =========================================================================
  // 4. SPECIFIC STUDENT INQUIRIES & DEEP ATTRIBUTE REASONING
  // =========================================================================
  if (targetStudent) {
    const account = getStudentAccount(targetStudent.id);
    const due = targetStudent.demand - targetStudent.paid;

    // 4.1 Specific Question: Payment History / Receipts of this Student
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

    // 4.2 Specific Question: Hostel Fee of this Student
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
    if (/scholarship|concession|waiver|discount|chhut|maaf/i.test(lower)) {
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
            content: `📋 **${targetStudent.name} (${targetStudent.id}) ka 360° Complete Financial Profile:**\n\n• **Programme & Batch:** ${targetStudent.programme} (${targetStudent.category}) · AY ${unified.academicYear}\n• **Gross Fee Demand:** ${inr(unified.grossDemand)}\n• **Sanctioned Scholarship:** ${unified.scholarshipConcession > 0 ? inr(unified.scholarshipConcession) : "None"}\n• **Net Demand (After Scholarship):** ${inr(unified.currentYearDemand)}\n• **Paid to Date:** **${inr(unified.currentYearPaid)}**\n• **Current Outstanding Due:** **${inr(unified.currentYearOutstanding)}**\n• **Instalment Plan:** ${unified.instalmentPlan ? `${unified.instalmentPlan.planType} (Total Demand: ${inr(unified.instalmentPlan.totalDemand)})` : "Lump-sum / None"}\n• **Overdue Aging:** ${targetStudent.overdue > 0 ? `⚠️ ${targetStudent.overdue} din overdue` : "✅ On Schedule"}\n• **Scholarship Renewal Risk:** ${unified.scholarshipRisk ? `🚨 ${unified.scholarshipRisk.risk_level} (CGPA: ${unified.scholarshipRisk.cgpa}, Attendance: ${unified.scholarshipRisk.attendance_pct}%)` : "✅ Good Standing (Low Risk)"}\n• **Bank Loan Desk:** ${unified.loanRequests.length > 0 ? unified.loanRequests.map(l => `${l.bank_name} (${l.status})`).join(", ") : "No active loan application"}\n• **Settled Prior-Cycle Balance:** ${inr(unified.priorCycleSettled)}`,
            kind: "student",
            metadata: { studentId: targetStudent.id, due: unified.currentYearOutstanding },
          };
        }
        return {
          role: "assistant",
          content: `### 📋 Unified 360° Financial Status: ${targetStudent.name} (${targetStudent.id})\n\n* **Academic Faculty & Year:** ${targetStudent.programme} (${targetStudent.category}) · AY ${unified.academicYear}\n* **Gross Fee Demand:** ${inr(unified.grossDemand)}\n* **Scholarship Concession:** ${unified.scholarshipConcession > 0 ? inr(unified.scholarshipConcession) : "None"}\n* **Net Fee Demand:** ${inr(unified.currentYearDemand)}\n* **Amount Paid to Date:** **${inr(unified.currentYearPaid)}**\n* **Current Outstanding Balance:** **${inr(unified.currentYearOutstanding)}**\n* **Instalment Structure:** ${unified.instalmentPlan ? `${unified.instalmentPlan.planType}` : "Standard Lump-sum"}\n* **Overdue Aging:** ${targetStudent.overdue > 0 ? `⚠️ ${targetStudent.overdue} days overdue` : "✅ Current (On Schedule)"}\n* **Scholarship Renewal Risk:** ${unified.scholarshipRisk ? `🚨 ${unified.scholarshipRisk.risk_level} (CGPA: ${unified.scholarshipRisk.cgpa}, Attendance: ${unified.scholarshipRisk.attendance_pct}%)` : "✅ Compliant (Low Risk)"}\n* **Education Loan Desk:** ${unified.loanRequests.length > 0 ? unified.loanRequests.map(l => `${l.bank_name} (${l.status})`).join(", ") : "None pending"}\n* **Prior-Cycle Settled:** ${inr(unified.priorCycleSettled)}`,
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
  if (wantsNav && targetView && !isCombinedInfoAndNav) {
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
      navigation: { view: targetView, reason: `User requested to open ${targetView}` },
      actionSummary: `Opening ${targetView}…`,
    };
  }

  // =========================================================================
  // 7. DATA / TOPIC INQUIRIES (readFinance - Pure Information Without Navigation)
  // =========================================================================

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
  if (/reconciliation status|unreconciled|mismatch|reconcile status|reconciliation/i.test(lower)) {
    const hasNavRequest = /kholo|open\b|le chalo|navigate|page kholo/i.test(lower);
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
  const matchedStudents = findMentionedStudents(prompt);
  let liveDataSnippet = "";

  if (matchedStudents.length > 0) {
    const student = matchedStudents[0];
    const unified = getUnifiedStudentContext(student.id);
    if (unified.status === "matched") {
      liveDataSnippet += `\n\nAUTHORITATIVE LIVE DATABASE RECORD FOR ${student.name} (${student.id}):
- Name: ${student.name}
- Roll / Student ID: ${student.id}
- Programme: ${student.programme}
- Category: ${student.category}
- Net Annual Demand: ${inr(unified.currentYearDemand)}
- Merit Scholarship Credit: ${inr(unified.scholarshipDeduction)}
- Total Verified Paid: ${inr(unified.currentYearPaid)}
- Total Outstanding Balance Due: ${inr(unified.currentYearOutstanding)}
- Overdue Days: ${student.overdue || 0} days
- Active Instalment Schedule: ${unified.instalmentPlan ? `${unified.instalmentPlan.planType} (Status: ${unified.instalmentPlan.status})` : "Standard lump-sum (No active split plan)"}
- Bank Education Loan Desk: ${unified.loanRequest ? `${unified.loanRequest.bank} — ${unified.loanRequest.status} (${inr(unified.loanRequest.amount)})` : "No active loan application"}
- Scholarship Renewal Risk: ${unified.scholarshipRisk ? `FLAGGED: ${unified.scholarshipRisk.reason} (CGPA: ${student.cgpa || "N/A"}, Attendance: ${student.attendance || 0}%)` : "Good standing (Above threshold)"}`;
    }
  }

  const systemPrompt = `You are finDeck's Chief Autonomous AI Financial Advisor & Universal Application Operator for Vignan's Foundation for Science, Technology & Research (VFSTR Deemed to be University), Andhra Pradesh.

COMMUNICATION PERSONA & LANGUAGE:
- You are an all-knowing, executive, highly intelligent 24/7 financial copilot and interactive guide for the entire finDeck platform.
- You understand English, Hindi, and natural Hinglish fluently. Always respond in the exact tone, language, or mix that the user asks (e.g. pure Hindi, natural Hinglish, or crisp professional English).
- Format responses with clean, structured markdown: bullet points, bold key figures, formatted currency (e.g. ₹1,20,000 or ₹485.60 Lakhs), and direct answers.

COMPLETE APPLICATION & PLATFORM KNOWLEDGE:
1. Dashboard: Executive Treasury Command Center with Real-time Demand vs Collection KPIs, Collection Intelligence (monthly trends), Outstanding Ageing buckets (0-30, 31-60, 61-90, 90+ days), Refund Applications Queue, and Quick Live Module Hub.
2. Students Portal & Ledger: 504 enrolled students across 11 programmes (B.Tech CSE, ECE, Mech, Civil, Biotech, MBA, MCA, B.Pharm, etc.), individual fee demand breakdowns, and 5 standardized institutional PDF documents (Bonafide Certificate, Bank Loan NOC, Tuition Fee Reimbursement, Statement of Fees, Section 80C Tax Exemption).
3. Fee Structure Desk: Head-wise fee breakdown (Tuition, Hostel, Examination, Library, Laboratory, Transport, Caution Deposit). Waterfall Allocation Policy priority: 1. Tuition > 2. Exam > 3. Lab > 4. Library > 5. Transport > 6. Hostel.
4. Payment Gateway & Reconciliation: 1,157 payment transactions, UTR ledger matching, automated 99.2% reconciliation rate, and discrepancy investigation (such as TXN-10483 with ₹5,000 gateway variance).
5. Instalments & Split Plans: 2-instalment and 3-instalment plans with automated 7-day payment moratoria and distress suppression.
6. Smart Reminders: Automated multi-channel dispatches (SMS, WhatsApp, Email) with ethical distress suppression (paused during active bank loans, medical freezes, or recent partial payments).
7. Scholarship Renewal Risks: Academic threshold monitoring (requires minimum 7.50 CGPA and 75% semester attendance) for merit scholarships.
8. Education Bank Loan Desk: Bonafide and 4-year fee estimation certificate generation for nationalized banks (SBI, Canara, HDFC, PNB).
9. Refund Approvals: UGC WD-2026 guidelines for withdrawal retention slabs (>=15 days before: 100% refund, <15 days: 90%, <=15 days after: 80%, <=30 days: 50%, caution deposit 100% refunded).
10. Database: Connected to production MongoDB Atlas (feewise_db, 9 collections, 504 students, 1157 transactions).

SECURITY & GUARDRAILS:
- You operate strictly in READ-ONLY mode. If the user asks to execute a payment, waive dues, transfer funds, or approve a refund/loan, explain that financial mutations require authenticated Finance Officer authorization with 2-Factor Authentication (2FA).
- Navigation: If the user asks to go to, open, or view a section (e.g., "reconciliation dikhao", "loan desk kholo", "students section me chalo"), you helpfully explain and navigate them there.
${liveDataSnippet}`;

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
        body: JSON.stringify({ contents, generationConfig: { maxOutputTokens: 1400, temperature: 0.3 } }),
      });

      if (!res.ok) continue;
      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) continue;

      const { wantsNav, targetView } = detectNavigationIntent(prompt);
      const matched = findMentionedStudents(prompt);

      return {
        role: "assistant",
        content: text,
        navigation: wantsNav && targetView ? { view: targetView, studentId: matched[0]?.id } : undefined,
      };
    } catch {
      // Try next model if fetch fails
    }
  }

  return null;
}
