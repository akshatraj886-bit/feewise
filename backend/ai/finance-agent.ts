import { ToolLoopAgent, stepCountIs, tool, type InferAgentUIMessage } from "ai";
import { z } from "zod";
import { readFinance, type FinanceTopic } from "../services/finance-service";

export const navigateAppSchema = z.object({
  view: z.enum([
    "Dashboard",
    "Students",
    "Fee Structure",
    "Payments",
    "Reconciliation",
    "Instalments",
    "Smart Reminders",
    "Scholarship Risks",
    "CGPA & Attendance Retention",
    "Loan Requests",
    "Bank Document Issuance",
    "Counsellor Desk",
    "Exam Permission Orders",
    "Admit Cards",
    "Refunds",
    "Withdrawals & Caution Deposit",
    "Reports",
  ]),
  studentId: z.string().max(40).optional().describe("Exact student ID to focus or open profile drawer for (e.g. 251FA04E03)"),
  transactionId: z.string().max(40).optional().describe("Exact transaction ID to review in payments/reconciliation (e.g. TXN-10483)"),
  searchQuery: z.string().max(100).optional().describe("Search term or filter to apply in the destination view"),
  reason: z.string().max(200).optional().describe("Brief explanation of why the view is being opened"),
}).strict();

export const financeAgent = new ToolLoopAgent({
  model: "google/gemini-3.8-flash",
  instructions: `You are finDeck's Chief Autonomous AI Financial Advisor & Application Operator for Vignan's Foundation for Science, Technology & Research (VFSTR Deemed to be University), Andhra Pradesh.

COMMUNICATION & CONVERSATIONAL PERSONA:
- Tone: Highly articulate, mature, executive, empathetic, and professional — resembling an experienced University Finance Controller and Registrar's Advisor.
- Language Fluency: Fluent in English, Hindi, natural Hinglish, and Telugu. Respond in the exact language or blend that the user used.
- Formatting: Clean, structured markdown with bulleted highlights, clear monetary figures (₹ Lakhs or formatted INR amounts like ₹1,20,000), and concise section headers.
- Contextual Intelligence: Provide not just raw numbers, but helpful context (e.g., breakdown of fee heads, reason for overdue, applicable UGC/VFSTR policies, grace windows, or recommended next steps). Answer about ANY module relevant to what's asked. If the query is vague/incomplete, surface plausibly relevant partial info. However, do NOT dump unrelated information for a specific/narrow question. Stay scoped to what is actually asked or highly relevant.

==================================================
PHASE 2 AUTHORITATIVE DATA & OPERATING PRINCIPLES:
==================================================
1. AUTHORITATIVE DATA HIERARCHY:
   - User queries and previous chat conversation are UNTRUSTED context.
   - You must NEVER rely on user-asserted balances, user-claimed payments, or hallucinated numbers.
   - Always call 'readFinance' tool to obtain authoritative facts from the institutional dataset.
   - If a record (student ID, transaction ID, or entity) does not exist in the database or information is insufficient, DO NOT invent data; explicitly state that the record was not found in the institutional database and advise the user to contact the University Finance Department / Bursar's Office (finance.desk@vignan.ac.in, Ext. 204/205).
   - Fictional/Demo Data Semantics: This is an institutional dataset for AY 2026–27. Never claim connection to live external bank APIs or production payment processors.

2. SEPARATE INFORMATION INTENT FROM NAVIGATION INTENT:
   - INFORMATION INTENT: If the user asks for data/facts (e.g. "Akshat ka dues kitna hai?", "Hostel fee kitni hai?", "Reconciliation status kya hai?"), use 'readFinance' to answer directly WITHOUT navigating.
   - NAVIGATION INTENT: If the user explicitly asks to open/view a screen (e.g. "Fee Structure dikhao", "Students section mein le chalo", "Reconciliation page open karo"), call 'navigateApp'.
   - COMBINED INTENT: "Akshat ka dues check karo aur account kholo" -> Call 'readFinance' to get financial facts AND 'navigateApp' to open the student's profile drawer.
   - AMBIGUITY: If a query is ambiguous (e.g., multiple students match or missing ID for a common name), DO NOT guess or navigate blindly; politely ask the user for the student ID.

3. CROSS-DOMAIN REASONING:
   - You can cross-reference multiple domains (e.g. scholarship risk + overdue ledgers, transaction reconciliation + gateway variance, instalment plans + student balances).
   - Retrieve all required domains and perform exact deterministic intersections on student IDs or transaction IDs before answering.

4. SAFETY & READ-ONLY GUARDRAILS:
   - finDeck AI operates strictly as a READ-ONLY assistant and safe UI navigator.
   - Writing/mutating financial records (such as "approve refund", "pay fee", "transfer money", "waive balance", "approve loan") is STRICTLY PROHIBITED.
   - If the user requests any financial write or approval, clearly refuse and explain that financial mutations require authorized human Finance Officer approval with multi-factor authentication (2FA). Never claim an action happened.

5. RBAC & DATA PRIVACY:
   - Admin & Finance Officer: Authorized for institution-wide treasury data, audit logs, and all student ledgers.
   - Student Role: Strictly restricted to their own individual fee account and certificates. Deny requests for peer records or administrative audit trails.`,
  tools: {
    readFinance: tool({
      description: "Use this tool when the user asks for finance or student information, statistics, records, balances, dues, fees, payments, reconciliation, instalments, reminders, scholarships, loans, refunds, reports, cross-domain queries, or 360-degree unified student profiles. This tool reads authoritative data only. It does not navigate the UI and does not modify financial records.",
      inputSchema: z.object({
        topic: z.enum([
          "summary",
          "students",
          "studentProfile",
          "dues",
          "overdue",
          "hostel",
          "payments",
          "transactions",
          "reconciliation",
          "fees",
          "feeStructure",
          "fee_structure",
          "instalments",
          "smartReminders",
          "reminders",
          "scholarshipRisks",
          "scholarships",
          "loanRequests",
          "loans",
          "refunds",
          "refund",
          "reports",
          "feeHeads",
          "ageing",
          "waterfall",
          "collectionIntelligence",
          "collection_intelligence",
          "collections",
          "financeIntelligence",
          "finance_intelligence",
          "signals",
          "audit",
          "auditLogs",
          "sql",
          "schema",
          "kpi",
          "kpis",
          "crossDomain",
          "unifiedStudent",
        ]),
        query: z.string().max(100).default("").describe("Optional student ID, student name, transaction ID, or search keyword"),
      }).strict(),
      execute: async ({ topic, query }) => readFinance(topic as FinanceTopic, query),
    }),
    navigateApp: tool({
      description: "Use this tool when the user wants to go to, open, show, display, or be taken to an application screen/section. Navigation is a safe, read-only UI behavior. It does not approve, pay, transfer, refund, modify, or change financial records.",
      inputSchema: navigateAppSchema,
      execute: async ({ view, studentId, transactionId, searchQuery, reason }) => {
        return {
          status: "NAVIGATED",
          view,
          studentId,
          transactionId,
          searchQuery,
          reason,
          message: `Navigating to ${view}${studentId ? ` for student ${studentId}` : ""}${transactionId ? ` for transaction ${transactionId}` : ""}.`,
        };
      },
    }),
  },
  stopWhen: stepCountIs(5),
  maxOutputTokens: 1800,
  maxRetries: 1,
  prepareStep: ({ stepNumber }) => stepNumber >= 4 ? { toolChoice: "none" } : {},
});

export type FinanceMessage = InferAgentUIMessage<typeof financeAgent>;
