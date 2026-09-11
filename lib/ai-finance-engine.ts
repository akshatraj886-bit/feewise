import { students, transactions, feeHeads, ageing, inr } from "./finance-data";
import { getStudentAccount, snapshot, refund } from "./finance-service";

export interface AiChatMessage {
  role: "user" | "assistant";
  content: string;
  kind?: "student" | "breakdown" | "reconcile" | "refund" | "tax" | "loan" | "waterfall" | "general";
  metadata?: Record<string, any>;
}

// Detect if query is in Hindi / Hinglish
function isHinglishQuery(text: string): boolean {
  const hindiKeywords = [
    "kya", "hai", "kaise", "kitna", "kitni", "batao", "bata do", "fees", "baki", "mera", "meri",
    "bhai", "kaha", "kab", "milega", "chahiye", "kuch", "hoga", "konsa", "kisko", "kyun",
    "paisa", "rupaye", "maaf", "chhut", "rakha", "nahi", "tha", "raha", "dena", "dene"
  ];
  const lower = text.toLowerCase();
  const matched = hindiKeywords.filter(k => new RegExp(`\\b${k}\\b`, "i").test(lower));
  return matched.length >= 2 || /bhai|kya hai|kitna|kaise|batao|bata do/i.test(lower);
}

// Extract mentioned student if any
function findMentionedStudent(query: string) {
  const lower = query.toLowerCase();
  // Check student IDs
  for (const s of students) {
    if (lower.includes(s.id.toLowerCase())) return s;
  }
  // Check student names
  for (const s of students) {
    const parts = s.name.toLowerCase().split(" ");
    if (parts.some(p => p.length > 2 && lower.includes(p))) return s;
  }
  return null;
}

// Extract mentioned transaction if any
function findMentionedTransaction(query: string) {
  const lower = query.toLowerCase();
  for (const t of transactions) {
    if (lower.includes(t.id.toLowerCase())) return t;
  }
  return null;
}

/**
 * Main Financial AI Intelligence Engine
 * Handles ANY financial query with deep contextual reasoning for Vignan University (VFSTR).
 */
export async function queryFinanceAi(
  userQuery: string,
  history: AiChatMessage[] = [],
  apiKey?: string
): Promise<AiChatMessage> {
  const query = userQuery.trim();
  const lower = query.toLowerCase();
  const inHindi = isHinglishQuery(query);

  // If user provided a custom API key, try calling live Gemini API
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await callLiveGeminiApi(query, history, apiKey.trim());
      if (response) return response;
    } catch (err) {
      console.warn("Live API call failed, falling back to local finance intelligence engine:", err);
    }
  }

  // 1. Guardrail against unauthenticated financial executions
  if (/^(approve|pay|transfer|execute|send money|wipe dues|delete record|clear balance)/i.test(lower)) {
    if (inHindi) {
      return {
        role: "assistant",
        content: "⚠️ **Security Guardrail Active:** Main ek AI Assistant hoon. Main audit, ledger calculations, aur policy recommendations kar sakta hoon, lekin financial balance change karne ya payout karne ke liye ek authenticated Finance Officer ka digital signature aur 2-Factor Authentication zaroori hota hai.",
      };
    }
    return {
      role: "assistant",
      content: "⚠️ **Security & Audit Guardrail Active:**\nAs an AI Financial Intelligence Assistant, I can calculate, analyze, verify policy criteria, and prepare recommendations. However, executing actual fund transfers, balance modifications, or ledger adjustments requires authenticated human authorization from a designated Finance Officer with 2FA.",
    };
  }

  // 2. Specific Student Ledger & Dues Inquiry
  const student = findMentionedStudent(query);
  if (student || /student balance|student dues|outstanding for|account of/i.test(lower)) {
    const targetStudent = student || students[0];
    const account = getStudentAccount(targetStudent.id);

    if (inHindi) {
      const due = targetStudent.demand - targetStudent.paid;
      let text = `📋 **Student Financial Details: ${targetStudent.name} (${targetStudent.id})**\n\n`;
      text += `• **Programme:** ${targetStudent.programme} (${targetStudent.category} Category)\n`;
      text += `• **Total Fee Demand (AY 2026–27):** ${inr(targetStudent.demand)}\n`;
      text += `• **Total Amount Paid:** ${inr(targetStudent.paid)}\n`;
      text += `• **Outstanding Due (Baki Raashi):** **${inr(due)}**\n`;
      if (targetStudent.scholarship > 0) {
        text += `• **Sanctioned Scholarship:** ${inr(targetStudent.scholarship)} (Tuition Credit Applied)\n`;
      }
      text += `• **Active Plan:** ${targetStudent.instalmentPlan}\n`;
      text += `• **Overdue Status:** ${targetStudent.overdue > 0 ? `${targetStudent.overdue} Din Overdue` : "On Schedule (No Overdue)"}\n\n`;
      text += `💡 **Fee Head Breakdown:**\n`;
      if (account?.fees) {
        account.fees.forEach(f => {
          text += `  - ${f.head}: Demand ${inr(f.demand)}, Paid ${inr(f.paid)}, Due ${inr(f.outstanding)}\n`;
        });
      }
      return {
        role: "assistant",
        content: text,
        kind: "student",
        metadata: { studentId: targetStudent.id, name: targetStudent.name },
      };
    }

    const due = targetStudent.demand - targetStudent.paid;
    let text = `### 📋 Student Ledger: ${targetStudent.name} (${targetStudent.id})\n\n`;
    text += `* **Programme & Branch:** ${targetStudent.programme}\n`;
    text += `* **Academic Year:** ${snapshot.academicYear}\n`;
    text += `* **Net Demand:** ${inr(targetStudent.demand)} (Gross less ${inr(targetStudent.scholarship)} scholarship award)\n`;
    text += `* **Paid to Date:** ${inr(targetStudent.paid)}\n`;
    text += `* **Net Outstanding:** **${inr(due)}**\n`;
    text += `* **Payment Plan:** ${targetStudent.instalmentPlan} · Overdue: ${targetStudent.overdue} days\n\n`;
    text += `#### Fee Component Breakdown:\n`;
    if (account?.fees) {
      account.fees.forEach(f => {
        text += `* **${f.head}:** Gross ${inr(f.gross)} | Paid ${inr(f.paid)} | **Due ${inr(f.outstanding)}**\n`;
      });
    }
    text += `\n*Note: To download the formal Statement of Account, Tax Certificate, or Loan NOC, visit the Student Profile or click 'View Account'.*`;

    return {
      role: "assistant",
      content: text,
      kind: "breakdown",
      metadata: { studentId: targetStudent.id, name: targetStudent.name },
    };
  }

  // 3. Fee Waterfall & Partial Payment Allocation
  if (/waterfall|priority|partial payment|head allocation|aportionment|order of payment|distribut/i.test(lower)) {
    if (inHindi) {
      return {
        role: "assistant",
        content: `🌊 **VFSTR Fee Waterfall Allocation Policy (Clause 6.3)**:\n\nJab koi student aadhi ya partial fees jama karta hai, toh university ka automated rule paise ko is priority order me allocate karta hai:\n\n1. **Tuition Fee** (Sabse pehle clear hoti hai taaki academic eligibility bani rahe)\n2. **Examination Fee** (Hall ticket release ke liye zaroori)\n3. **Laboratory Fee** (Practical sessions & consumables)\n4. **Library & Digital Resources** (Books & journals access)\n5. **Transport Fee** (Bus pass clearance)\n6. **Hostel & Mess Fee** (Accommodation charges)\n\n*Udaharan:* Agar kisi student ka Tuition ₹50,000 aur Hostel ₹30,000 baki hai, aur woh ₹50,000 deta hai, toh pehle poora ₹50,000 Tuition me chala jayega aur Hostel ka ₹30,000 baki rahega. Isse exam admit card block nahi hota.`,
        kind: "waterfall",
      };
    }
    return {
      role: "assistant",
      content: `### 🌊 Priority Waterfall Order for Partial Payments (Clause 6.3)\n\nUnder university financial bylaws, partial payments are automatically apportioned across heads in strict priority sequence:\n\n1. **Tuition Fee** (Primary academic instruction)\n2. **Examination Fee** (Assessment registration & admit card release)\n3. **Laboratory Fee** (Practical equipment & consumables)\n4. **Library & E-Resources** (Resource center access)\n5. **Transport Fee** (Campus bus network transit pass)\n6. **Hostel & Mess Fee** (Boarding & lodging services)\n\n**Key Benefit:** This prevents students from being debarred from end-semester examinations when partial installments are submitted on time, even if ancillary heads remain pending.`,
      kind: "waterfall",
    };
  }

  // 4. Tax Exemption / Section 80C Certificates
  if (/tax|80c|it deduction|income tax|tax certificate|financial year|fy 2026/i.test(lower)) {
    if (inHindi) {
      return {
        role: "assistant",
        content: `📄 **Income Tax Section 80C Fee Exemption Rules:**\n\n• **Eligible Component:** Income Tax Act 1961 ke Section 80C ke tahat kewal **Tuition Fee** par tax deduction milta hai. (Hostel, Transport, aur Exam fees isme shamil nahi hoti).\n• **Maximum Limit:** ₹1,50,000 tak ki deduction claim ki ja sakti hai parent ya legal guardian ke dwara.\n• **University Certificate:** Vignan University ka official 80C Tax Certificate portal par instantly available hai. Isme student ka naam, parent ka PAN, payment receipt numbers, aur aggregate tuition fee verified format me hoti hai.\n• **Download Kaise Karein:** Student Profile me jakar **"Tax Certificate (80C)"** par click karein.`,
        kind: "tax",
      };
    }
    return {
      role: "assistant",
      content: `### 📄 Income Tax Certificate (Section 80C Compliance)\n\n* **Applicable Section:** Section 80C of the Income Tax Act, 1961.\n* **Eligible Fee Heads:** Exclusively the **Tuition Fee** component paid for full-time higher education of a dependent child.\n* **Exclusions:** Development charges, Hostel/Mess charges, Transport charges, and Examination fees are not eligible for 80C deduction.\n* **Maximum Annual Limit:** Up to ₹1,50,000 aggregate under Section 80C for the parent/legal guardian.\n* **How to Issue:** Students or finance officers can generate the digital PDF certificate bearing the Controller of Finance digital seal directly from the Student Profile action menu.`,
      kind: "tax",
    };
  }

  // 5. Education Loan & Bank NOC
  if (/loan|bank|noc|estimation|vidya lakshmi|sbi|hdfc|canara|bonafide/i.test(lower)) {
    if (inHindi) {
      return {
        role: "assistant",
        content: `🏦 **Education Loan Bank NOC & Fee Estimation Assistance:**\n\nUniversity students ko education loan ke liye 3 zaroori documents finance desk se milti hain:\n\n1. **Fee Estimation Letter:** Course ke pure 4 saal (ya 2 saal) ka semester-wise fee schedule bank format me.\n2. **Bank No-Objection Certificate (NOC):** Bank ko likha gaya formal letter jisme university ke verified bank account details (IFSC, Account Number, Branch) aur student enrollment verify hoti hai.\n3. **Bonafide Student Certificate:** Academic registrar dwara certified status.\n\n• **Supported Banks:** SBI Scholar Loan Scheme, HDFC Credila, Canara Bank, Andhra Pragathi Grameena Bank (APGVB), aur Vidya Lakshmi Portal.\n• **Download:** Kisi bhi student ke profile me jakar **"Loan NOC"** button par click karke PDF le sakte hain.`,
        kind: "loan",
      };
    }
    return {
      role: "assistant",
      content: `### 🏦 Education Loan Clearance & Bank NOC Protocol\n\nVFSTR provides institutional documentation compliant with major educational lenders (SBI Scholar Loan, Canara Bank, HDFC Credila, Union Bank, and Vidya Lakshmi portal):\n\n1. **Fee Estimation Schedule:** Certified 4-year expenditure projection including Tuition, Lab, Hostel, and Caution Deposit.\n2. **Bank NOC & University Mandate:** Official No-Objection Certificate specifying the authorized VFSTR Fee Collection Account with verified IFSC and Branch details for direct RTGS/NEFT disbursement.\n3. **Bonafide Verification:** Confirmation of admission category, branch, and student registration number.\n\n*Direct issuance is accessible via the Student Account view under the 'Certificates' tab.*`,
      kind: "loan",
    };
  }

  // 6. UGC & AICTE Refund Policy
  if (/refund|withdraw|cancellation|deduct|ugc policy|return money/i.test(lower)) {
    if (inHindi) {
      return {
        role: "assistant",
        content: `🔄 **UGC / AICTE Mandatory Fee Refund Guidelines:**\n\nUniversity admission withdrawal par UGC ke standard refund rules follow karti hai:\n\n• **15+ Din Pehle (Semester shuru hone se):** **100% Refund** (Kewal maximum ₹1,000 processing charges deduct honge).\n• **15 Din ke Andar:** **90% Refund** total fees ka.\n• **15 se 30 Din:** **80% Refund** aggregate fee demand ka.\n• **30 se 60 Din:** **50% Refund**.\n• **60 Din ke Baad:** 0% (Koi refund nahi, kewal Caution Deposit wapas hoti hai).\n• **Caution Deposit:** Caution Deposit hamesha **100% refundable** hoti hai subject to department no-dues clearance.\n\n*Demo Case:* Ananya Sharma (RF-2081) ka ₹20,000 deposit par ₹1,500 policy deduction ke baad **₹18,500** net refund approved hai.`,
        kind: "refund",
      };
    }
    return {
      role: "assistant",
      content: `### 🔄 University Fee Refund Regulations (UGC / AICTE Norms)\n\nRefund calculations are governed by the statutory fee retention guidelines:\n\n* **> 15 Days Before Last Date of Admission:** **100% refund** (subject to a maximum processing deduction of ₹1,000).\n* **Within 15 Days Before Last Date:** **90% refund** of aggregate fees.\n* **Less than 15 Days After Last Date:** **80% refund**.\n* **16 to 30 Days After Last Date:** **50% refund**.\n* **> 30 Days After Last Date:** **0% fee refund**.\n* **Caution Deposit:** **100% refundable** upon submission of library, lab, and hostel no-dues certificates.\n\n*Pending Workflow:* Case **RF-2081** (Ananya Sharma) has an eligible deposit of ₹20,000 with ₹1,500 deduction, yielding **₹18,500 net refund** awaiting digital authorization.`,
      kind: "refund",
    };
  }

  // 7. Payment Gateway, UTR & Bank Reconciliation Mismatches
  if (/reconcil|mismatch|gateway|difference|discrepan|settlement|txn-|utr/i.test(lower)) {
    const txn = findMentionedTransaction(query);
    if (inHindi) {
      return {
        role: "assistant",
        content: `📊 **Payment Gateway & Bank Reconciliation Summary:**\n\n• **Today's Reconciled Payments:** 1,284 transactions verified via automated webhook.\n• **Reconciliation Rate:** 97.8% matched.\n• **Pending Settlement:** 127 transactions (T+1 clearing window me).\n• **Mismatches Needing Review:** 23 cases.\n\n🔍 **High-Priority Mismatch:**\n• **TXN-10483 (Ananya Sharma):** Gateway par ₹25,000 record hua hai, par ledger me sirf ₹20,000 allocate hua. ₹5,000 ka difference hai. Isko investigate karke journal voucher create karna zaroori hai.`,
        kind: "reconcile",
      };
    }
    return {
      role: "assistant",
      content: `### 📊 Institutional Reconciliation & Gateway Audit\n\n* **Today's Total Reconciled:** 1,284 transactions cleared successfully.\n* **Overall Cycle Success Rate:** 97.8%.\n* **Pending Settlements:** 127 transactions awaiting bank statement UTR matching.\n* **Flagged Discrepancies:** 23 mismatches flagged for manual review.\n\n**Highlighted Case: TXN-10483 (Ananya Sharma)**\n* Gateway Reported: ₹25,000\n* Internal Ledger Booked: ₹20,000\n* **Discrepancy: ₹5,000 difference** (Potential gateway service fee withholding or split merchant settlement). Requires investigation before posting adjustment entry.`,
      kind: "reconcile",
    };
  }

  // 8. Overdue Dues & Ageing Summary
  if (/overdue|ageing|delay|pending dues|defaulter|outstanding list/i.test(lower)) {
    if (inHindi) {
      return {
        role: "assistant",
        content: `⏳ **Outstanding Dues & Ageing Analysis:**\n\n• **0–30 Days:** ₹1.42 Cr (Recent cycle, reminder stage)\n• **31–60 Days:** ₹91 Lakh (First escalation notice)\n• **61–90 Days:** ₹63 Lakh (Parent counseling stage)\n• **90+ Days (Critical):** ₹74 Lakh (84 accounts across the university)\n\n*Sample 90+ Days Accounts:*\n1. **Rohan Mehta (251FA04E21):** ₹45,000 outstanding (96 days overdue)\n2. **Aarav Desai (251FA04E42):** ₹55,000 outstanding (105 days overdue)\n\n📌 *Recommendation:* Critical accounts ko installment schedule offer karein ya scholarship status verify karein.`,
      };
    }
    return {
      role: "assistant",
      content: `### ⏳ Outstanding Fee Ageing Matrix\n\n* **0–30 Days:** ₹1.42 Cr (Current cycle demand, within grace period)\n* **31–60 Days:** ₹91 Lakh (Soft automated reminders active)\n* **61–90 Days:** ₹63 Lakh (Escalated notice stage)\n* **90+ Days:** ₹74 Lakh across 84 student accounts (High risk)\n\n**Representative Chronic Accounts:**\n* **Rohan Mehta (251FA04E21):** ₹45,000 balance · 96 days overdue\n* **Aarav Desai (251FA04E42):** ₹55,000 balance · 105 days overdue\n\n*Action Suggested:* Initiate parent outreach or offer a 3-part deferred payment structure.`,
    };
  }

  // 9. Hostel & Mess Fee Queries
  if (/hostel|mess|boarding|room rent|food|lodging/i.test(lower)) {
    if (inHindi) {
      return {
        role: "assistant",
        content: `🏢 **VFSTR Hostel & Mess Finance Details:**\n\n• **Annual Hostel & Mess Fee:** ₹40,000 se ₹85,000 (Room type: Non-AC / AC, 3-Sharing / 2-Sharing par depend karta hai).\n• **Total Campus Collection:** ₹4.20 Crore collected across all residential blocks.\n• **Waterfall Priority:** Hostel fees priority waterfall me **Rank 6** par aati hai (Tuition, Exam, Lab, Library, aur Transport ke baad).\n• **Clearance Status:** Hostel room allocation ke liye pichle semester ka no-dues certificate zaroori hota hai.`,
      };
    }
    return {
      role: "assistant",
      content: `### 🏢 Hostel & Residential Living Fee Structure\n\n* **Total Institutional Hostel Collections:** ₹4.20 Crore booked for AY 2026–27.\n* **Standard Fee Structure:**\n  * 3-Sharing Standard (Non-AC): ₹40,000 / year (including mess charges)\n  * 2-Sharing Premium (AC): ₹85,000 / year\n* **Waterfall Hierarchy:** Under Clause 6.3, Hostel & Mess fees occupy Rank 6 (last priority), ensuring tuition and academic exam fees are cleared first.\n* **Hostel No-Dues:** Required at the end of each semester before vacating or room renewal.`,
    };
  }

  // 10. GST on Educational Services
  if (/gst|tax on fees|service tax|exempt/i.test(lower)) {
    if (inHindi) {
      return {
        role: "assistant",
        content: `⚖️ **GST on Higher Education (VFSTR Policy):**\n\n• **Tuition Fee:** **0% GST (NIL Rated)** — Central Tax Notification No. 12/2017 ke tahat UGC-recognized degree programs ki education fees par koi GST nahi lagta.\n• **Hostel / Mess:** ₹1,000/day se kam accommodation charges par standard educational exemption lagu hoti hai.\n• **Commercial Transport / Outsourced Canteen:** Outsourced vendors par standard 5% ya 18% GST rules applicable hote hain.`,
      };
    }
    return {
      role: "assistant",
      content: `### ⚖️ GST Applicability on University Fees\n\n* **Core Academic Tuition:** **EXEMPT (0% GST)** pursuant to Notification No. 12/2017 - Central Tax (Rate). Services provided by an educational institution to its students and faculty are exempt from Goods and Services Tax.\n* **Hostel Accommodation:** Exempt where daily charges do not exceed statutory hospitality limits.\n* **Third-Party Services:** Commercial transportation leases and third-party laboratory accreditations carry standard B2B GST credits handled in institutional accounts.`,
    };
  }

  // 11. General / Comprehensive Finance Guidance
  if (inHindi) {
    return {
      role: "assistant",
      content: `🎓 **VFSTR finDeck Finance AI Assistant:**\n\nAap university ke finance se juda koi bhi sawal pooch sakte hain. Main in cheezon me madad kar sakta hoon:\n\n• **Student Balance & Due Date:** Kisi bhi student ka naam ya roll number daalkar unka pura ledger dekhein.\n• **Fee Waterfall Rule:** Partial payments ka priority allocation samjhein.\n• **Certificates:** 80C Tax Exemption Certificate aur Bank Loan NOC download karne ka process.\n• **UGC Refund Policy:** Admission withdrawal par deduction aur net refundable amount calculate karein.\n• **Bank Reconciliation:** Gateway transactions aur ledger mismatches ka audit karein.\n• **Installment Schemes:** 3-part payment plans aur distress reminder suppression rules.\n\n*Aap apna sawal neeche type karein ya quick suggestions me se select karein!*`,
    };
  }

  return {
    role: "assistant",
    content: `### 🎓 finDeck Financial Intelligence Copilot\n\nI am equipped with complete institutional knowledge of the **Vignan Foundation for Science, Technology & Research (VFSTR)** finance systems, accounting ledger, and regulatory frameworks.\n\n**Ask me anything regarding:**\n* **Student Account Statements:** Real-time balances, scholarships, paid amounts, and due dates.\n* **Waterfall Apportionment:** How payments distribute across Tuition, Exam, Lab, Transport, and Hostel.\n* **Tax Deductions (Section 80C):** Guidelines and instant PDF certificate generation.\n* **Education Loan Desk:** Bank NOCs, 4-year fee estimation schedules for SBI, Canara, and HDFC.\n* **UGC Refund Slabs:** Percentage retention rules and caution deposit return policies.\n* **Reconciliation & Gateway Audit:** Resolving UPI/NEFT mismatches and settlement batches.\n\n*Type your question below or click any starter prompt to begin.*`,
  };
}

// Helper to call live Gemini API if key is supplied
async function callLiveGeminiApi(prompt: string, history: AiChatMessage[], apiKey: string): Promise<AiChatMessage | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const systemPrompt = `You are finDeck AI Finance Assistant for Vignan's Foundation for Science, Technology & Research (VFSTR Deemed to be University), Andhra Pradesh.
You answer questions about student fees, ledger balances, partial payment priority waterfall (Tuition > Exam > Lab > Library > Transport > Hostel), Section 80C tax certificates, bank loan NOCs (SBI, Canara, HDFC), UGC refund regulations, and payment reconciliation.
Current institutional snapshot: AY 2026–27. Total demand: ₹25.40 Cr, collected: ₹21.70 Cr, outstanding: ₹3.70 Cr.
Answer professionally, concisely, with INR (₹) amounts. Support English and Hindi/Hinglish fluently.`;

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    ...history.slice(-4).map(h => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }]
    })),
    { role: "user", parts: [{ text: prompt }] }
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents, generationConfig: { maxOutputTokens: 1000, temperature: 0.3 } }),
  });

  if (!res.ok) {
    console.error("Gemini API error:", await res.text());
    return null;
  }

  const data = await res.json();
  const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (candidateText) {
    return {
      role: "assistant",
      content: candidateText,
      kind: "general",
    };
  }
  return null;
}
