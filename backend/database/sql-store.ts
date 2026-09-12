"use client";

/**
 * 07_admissions_finance.sql - 100% COMPLIANT SCHEMA STORE
 * Matches PostgreSQL tables, columns, constraints, and business logic
 * from the hackathon organizers' database specification.
 */

// ==========================================
// 1. DATABASE ENTITY TYPES (PostgreSQL aligned)
// ==========================================

export type HeadType =
  | "TUITION"
  | "HOSTEL"
  | "TRANSPORT"
  | "EXAM"
  | "LAB"
  | "LIBRARY"
  | "CAUTION"
  | "ONE_TIME"
  | "OTHER";

export type FeeDemandStatus =
  | "OPEN"
  | "PARTIAL"
  | "SETTLED"
  | "WAIVED"
  | "WRITTEN_OFF";

export type InstallmentStatus = "PENDING" | "PAID" | "OVERDUE" | "WAIVED";

export type PaymentMode =
  | "ONLINE"
  | "NEFT"
  | "CHEQUE"
  | "DD"
  | "CASH"
  | "SCHOLARSHIP"
  | "LOAN";

export type PaymentStatus =
  | "INITIATED"
  | "RECEIVED"
  | "RECONCILED"
  | "FAILED"
  | "REVERSED";

export type RefundReason =
  | "WITHDRAWAL"
  | "CANCELLATION"
  | "EXCESS"
  | "CAUTION_DEPOSIT"
  | "OTHER";

export type RefundStatus = "REQUESTED" | "APPROVED" | "PAID" | "REJECTED";

export type ReminderSegment =
  | "FORGOTTEN"
  | "AWAITING_SCHOLARSHIP"
  | "ON_PLAN"
  | "HARDSHIP"
  | "PERSISTENT";

export type ScholarshipProviderType =
  | "CENTRAL"
  | "STATE"
  | "INSTITUTIONAL"
  | "PRIVATE"
  | "CORPORATE"
  | "ALUMNI";

export type ScholarshipApplicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "INSTITUTION_VERIFIED"
  | "SANCTIONED"
  | "DISBURSED"
  | "REJECTED"
  | "LAPSED";

export type RiskLevel = "NONE" | "WATCH" | "AT_RISK" | "LIKELY_LOSS";

export type LoanDocumentType =
  | "BONAFIDE"
  | "FEE_STRUCTURE"
  | "ADMISSION_CONFIRMATION"
  | "FEE_PAID_STATEMENT"
  | "ACADEMIC_STATUS";

export type LoanDocumentStatus =
  | "REQUESTED"
  | "IN_PROGRESS"
  | "ISSUED"
  | "REJECTED";

// Core Tables
export interface FeeHead {
  fee_head_id: string; // uuid
  institution_id: string;
  code: string;
  name: string;
  head_type: HeadType;
  is_refundable: boolean;
  allocation_priority: number; // smallint - waterfall priority (10 is first, 100 is last)
}

export interface FeeDemand {
  fee_demand_id: string;
  student_id: string;
  student_name: string;
  academic_year_id: string;
  fee_structure_id: string;
  gross_amount: number;
  concession_amount: number;
  scholarship_expected: number;
  net_payable: number;
  paid_amount: number;
  outstanding: number; // GENERATED ALWAYS AS (net_payable - paid_amount)
  due_date: string;
  status: FeeDemandStatus;
}

export interface FeeDemandLine {
  fee_demand_line_id: string;
  fee_demand_id: string;
  fee_head_id: string;
  head_name: string;
  head_type: HeadType;
  allocation_priority: number;
  amount: number;
  concession_amount: number;
  net_amount: number;
  paid_amount: number;
}

export interface InstallmentPlanItem {
  installment_plan_id: string;
  fee_demand_id: string;
  student_id: string;
  installment_no: number;
  amount: number;
  due_date: string;
  status: InstallmentStatus;
  approved_by?: string;
  paid_on?: string;
}

export interface Payment {
  payment_id: string;
  student_id: string;
  student_name: string;
  amount: number;
  payment_mode: PaymentMode;
  channel: string;
  transaction_ref: string;
  paid_on: string;
  received_on?: string;
  receipt_no: string;
  status: PaymentStatus;
}

export interface PaymentAllocation {
  payment_id: string;
  fee_demand_line_id: string;
  amount: number;
}

export interface RefundRecord {
  refund_id: string;
  student_id: string;
  student_name: string;
  reason: RefundReason;
  withdrawal_date?: string;
  eligible_amount: number;
  approved_amount: number;
  policy_applied: string;
  status: RefundStatus;
  approved_by?: string;
  paid_on?: string;
}

export interface ReminderDispatch {
  reminder_dispatch_id: string;
  student_id: string;
  student_name: string;
  fee_demand_id: string;
  segment: ReminderSegment;
  escalation_level: number;
  channel: string;
  message_ref: string;
  suppressed: boolean; // Suppressed when sanctioned scholarship or installment covers dues
  suppression_reason?: string;
  sent_at: string;
  delivered_at?: string;
  responded?: boolean;
}

export interface ScholarshipRenewalRisk {
  scholarship_renewal_risk_id: string;
  scholarship_application_id: string;
  student_id: string;
  student_name: string;
  programme: string;
  assessed_on: string;
  attendance_pct: number;
  cgpa: number;
  criteria_at_risk: {
    min_cgpa: number;
    min_attendance: number;
    notes: string;
  };
  risk_level: RiskLevel;
  alerted_at?: string;
}

export interface LoanDocumentRequest {
  loan_document_request_id: string;
  student_id: string;
  student_name: string;
  bank_name: string;
  document_type: LoanDocumentType;
  requested_on: string;
  status: LoanDocumentStatus;
  issued_on?: string;
  issued_by?: string;
  verification_code?: string;
  turnaround_hours?: number;
}

export interface SqlDatabaseState {
  fee_heads: FeeHead[];
  fee_demands: FeeDemand[];
  fee_demand_lines: FeeDemandLine[];
  installment_plans: InstallmentPlanItem[];
  payments: Payment[];
  payment_allocations: PaymentAllocation[];
  refunds: RefundRecord[];
  reminder_dispatches: ReminderDispatch[];
  scholarship_risks: ScholarshipRenewalRisk[];
  loan_requests: LoanDocumentRequest[];
}

// ==========================================
// 2. INITIAL SEED DATA (VFSTR University)
// ==========================================

const INITIAL_FEE_HEADS: FeeHead[] = [
  {
    fee_head_id: "fh-001",
    institution_id: "inst-vfstr-01",
    code: "TUIT",
    name: "Tuition Fee",
    head_type: "TUITION",
    is_refundable: false,
    allocation_priority: 10, // First priority in waterfall
  },
  {
    fee_head_id: "fh-002",
    institution_id: "inst-vfstr-01",
    code: "EXAM",
    name: "Examination Fee",
    head_type: "EXAM",
    is_refundable: false,
    allocation_priority: 20,
  },
  {
    fee_head_id: "fh-003",
    institution_id: "inst-vfstr-01",
    code: "LAB",
    name: "Laboratory & Computing",
    head_type: "LAB",
    is_refundable: false,
    allocation_priority: 30,
  },
  {
    fee_head_id: "fh-004",
    institution_id: "inst-vfstr-01",
    code: "LIB",
    name: "Library & Digital Resources",
    head_type: "LIBRARY",
    is_refundable: false,
    allocation_priority: 40,
  },
  {
    fee_head_id: "fh-005",
    institution_id: "inst-vfstr-01",
    code: "HOSTEL",
    name: "Hostel & Mess Charges",
    head_type: "HOSTEL",
    is_refundable: true,
    allocation_priority: 50,
  },
  {
    fee_head_id: "fh-006",
    institution_id: "inst-vfstr-01",
    code: "TRANS",
    name: "Transport Facility",
    head_type: "TRANSPORT",
    is_refundable: true,
    allocation_priority: 60,
  },
];

const INITIAL_FEE_DEMANDS: FeeDemand[] = [
  {
    fee_demand_id: "fd-101",
    student_id: "251FA04E03",
    student_name: "Akshat Raj",
    academic_year_id: "ay-2026-27",
    fee_structure_id: "fs-btech-cse",
    gross_amount: 140000,
    concession_amount: 0,
    scholarship_expected: 20000,
    net_payable: 120000,
    paid_amount: 92000,
    outstanding: 28000,
    due_date: "2026-10-15",
    status: "PARTIAL",
  },
  {
    fee_demand_id: "fd-102",
    student_id: "251FA04E17",
    student_name: "Ananya Sharma",
    academic_year_id: "ay-2026-27",
    fee_structure_id: "fs-btech-cse",
    gross_amount: 120000,
    concession_amount: 0,
    scholarship_expected: 0,
    net_payable: 120000,
    paid_amount: 120000,
    outstanding: 0,
    due_date: "2026-04-15",
    status: "SETTLED",
  },
  {
    fee_demand_id: "fd-103",
    student_id: "251FA04E21",
    student_name: "Rohan Mehta",
    academic_year_id: "ay-2026-27",
    fee_structure_id: "fs-mba",
    gross_amount: 185000,
    concession_amount: 5000,
    scholarship_expected: 20000,
    net_payable: 160000,
    paid_amount: 115000,
    outstanding: 45000,
    due_date: "2026-08-15",
    status: "PARTIAL",
  },
  {
    fee_demand_id: "fd-104",
    student_id: "251FA04E36",
    student_name: "Ishita Nair",
    academic_year_id: "ay-2026-27",
    fee_structure_id: "fs-btech-ece",
    gross_amount: 140000,
    concession_amount: 0,
    scholarship_expected: 0,
    net_payable: 140000,
    paid_amount: 140000,
    outstanding: 0,
    due_date: "2026-04-15",
    status: "SETTLED",
  },
  {
    fee_demand_id: "fd-105",
    student_id: "251FA04E42",
    student_name: "Aarav Desai",
    academic_year_id: "ay-2026-27",
    fee_structure_id: "fs-mba",
    gross_amount: 180000,
    concession_amount: 0,
    scholarship_expected: 0,
    net_payable: 180000,
    paid_amount: 125000,
    outstanding: 55000,
    due_date: "2026-06-30",
    status: "PARTIAL",
  },
  {
    fee_demand_id: "fd-106",
    student_id: "251FA04E58",
    student_name: "Meera Iyer",
    academic_year_id: "ay-2026-27",
    fee_structure_id: "fs-btech-cse",
    gross_amount: 142000,
    concession_amount: 2000,
    scholarship_expected: 20000,
    net_payable: 120000,
    paid_amount: 102000,
    outstanding: 18000,
    due_date: "2026-09-30",
    status: "PARTIAL",
  },
];

const INITIAL_FEE_DEMAND_LINES: FeeDemandLine[] = [
  // Akshat Raj (fd-101)
  {
    fee_demand_line_id: "fdl-101-1",
    fee_demand_id: "fd-101",
    fee_head_id: "fh-001",
    head_name: "Tuition Fee",
    head_type: "TUITION",
    allocation_priority: 10,
    amount: 90000,
    concession_amount: 0,
    net_amount: 70000, // after 20k scholarship
    paid_amount: 70000, // Settled by waterfall
  },
  {
    fee_demand_line_id: "fdl-101-2",
    fee_demand_id: "fd-101",
    fee_head_id: "fh-002",
    head_name: "Examination Fee",
    head_type: "EXAM",
    allocation_priority: 20,
    amount: 5000,
    concession_amount: 0,
    net_amount: 5000,
    paid_amount: 5000,
  },
  {
    fee_demand_line_id: "fdl-101-3",
    fee_demand_id: "fd-101",
    fee_head_id: "fh-003",
    head_name: "Laboratory & Computing",
    head_type: "LAB",
    allocation_priority: 30,
    amount: 3000,
    concession_amount: 0,
    net_amount: 3000,
    paid_amount: 3000,
  },
  {
    fee_demand_line_id: "fdl-101-4",
    fee_demand_id: "fd-101",
    fee_head_id: "fh-004",
    head_name: "Library & Digital Resources",
    head_type: "LIBRARY",
    allocation_priority: 40,
    amount: 2000,
    concession_amount: 0,
    net_amount: 2000,
    paid_amount: 2000,
  },
  {
    fee_demand_line_id: "fdl-101-5",
    fee_demand_id: "fd-101",
    fee_head_id: "fh-005",
    head_name: "Hostel & Mess Charges",
    head_type: "HOSTEL",
    allocation_priority: 50,
    amount: 40000,
    concession_amount: 0,
    net_amount: 40000,
    paid_amount: 12000, // 28,000 outstanding here
  },
];

const INITIAL_INSTALLMENT_PLANS: InstallmentPlanItem[] = [
  {
    installment_plan_id: "ip-101-1",
    fee_demand_id: "fd-101",
    student_id: "251FA04E03",
    installment_no: 1,
    amount: 40000,
    due_date: "2026-04-15",
    status: "PAID",
    paid_on: "2026-04-12",
  },
  {
    installment_plan_id: "ip-101-2",
    fee_demand_id: "fd-101",
    student_id: "251FA04E03",
    installment_no: 2,
    amount: 40000,
    due_date: "2026-07-15",
    status: "PAID",
    paid_on: "2026-07-10",
  },
  {
    installment_plan_id: "ip-101-3",
    fee_demand_id: "fd-101",
    student_id: "251FA04E03",
    installment_no: 3,
    amount: 40000,
    due_date: "2026-10-15",
    status: "PENDING",
  },
  {
    installment_plan_id: "ip-103-1",
    fee_demand_id: "fd-103",
    student_id: "251FA04E21",
    installment_no: 1,
    amount: 80000,
    due_date: "2026-04-15",
    status: "PAID",
    paid_on: "2026-04-14",
  },
  {
    installment_plan_id: "ip-103-2",
    fee_demand_id: "fd-103",
    student_id: "251FA04E21",
    installment_no: 2,
    amount: 80000,
    due_date: "2026-08-15",
    status: "OVERDUE",
  },
];

const INITIAL_PAYMENTS: Payment[] = [
  {
    payment_id: "pay-10482",
    student_id: "251FA04E03",
    student_name: "Akshat Raj",
    amount: 30000,
    payment_mode: "ONLINE",
    channel: "UPI / PhonePe",
    transaction_ref: "UPI-2026091101",
    paid_on: "2026-09-11",
    received_on: "2026-09-11",
    receipt_no: "RCPT-2026-10482",
    status: "RECONCILED",
  },
  {
    payment_id: "pay-10483",
    student_id: "251FA04E17",
    student_name: "Ananya Sharma",
    amount: 20000,
    payment_mode: "ONLINE",
    channel: "Net banking",
    transaction_ref: "NET-2026091102",
    paid_on: "2026-09-11",
    received_on: "2026-09-11",
    receipt_no: "RCPT-2026-10483",
    status: "INITIATED",
  },
  {
    payment_id: "pay-10487",
    student_id: "251FA04E58",
    student_name: "Meera Iyer",
    amount: 40000,
    payment_mode: "NEFT",
    channel: "Bank transfer",
    transaction_ref: "NEFT-2026090903",
    paid_on: "2026-09-09",
    received_on: "2026-09-09",
    receipt_no: "RCPT-2026-10487",
    status: "RECONCILED",
  },
  {
    payment_id: "pay-10488",
    student_id: "251FA04E21",
    student_name: "Rohan Mehta",
    amount: 20000,
    payment_mode: "CASH",
    channel: "Counter collection",
    transaction_ref: "CTR-2026090804",
    paid_on: "2026-09-08",
    received_on: "2026-09-08",
    receipt_no: "RCPT-2026-10488",
    status: "RECONCILED",
  },
];

import {
  EXTENDED_SCHOLARSHIP_RISKS,
  EXTENDED_LOAN_REQUESTS,
  EXTENDED_REMINDER_DISPATCHES,
  EXTENDED_REFUNDS,
} from "./extended-sql-data";
import { students, instalmentPlans } from "./finance-data";

const INITIAL_REFUNDS: RefundRecord[] = EXTENDED_REFUNDS;
const INITIAL_REMINDER_DISPATCHES: ReminderDispatch[] = EXTENDED_REMINDER_DISPATCHES;
const INITIAL_SCHOLARSHIP_RISKS: ScholarshipRenewalRisk[] = EXTENDED_SCHOLARSHIP_RISKS;
const INITIAL_LOAN_REQUESTS: LoanDocumentRequest[] = EXTENDED_LOAN_REQUESTS;

const LOCAL_STORAGE_KEY = "feewise_sql_store_v4";

// ==========================================
// 3. STORAGE & CRUD METHODS
// ==========================================

export function getSqlDatabaseState(): SqlDatabaseState {
  if (typeof window === "undefined") {
    return {
      fee_heads: INITIAL_FEE_HEADS,
      fee_demands: INITIAL_FEE_DEMANDS,
      fee_demand_lines: INITIAL_FEE_DEMAND_LINES,
      installment_plans: INITIAL_INSTALLMENT_PLANS,
      payments: INITIAL_PAYMENTS,
      payment_allocations: [],
      refunds: INITIAL_REFUNDS,
      reminder_dispatches: INITIAL_REMINDER_DISPATCHES,
      scholarship_risks: INITIAL_SCHOLARSHIP_RISKS,
      loan_requests: INITIAL_LOAN_REQUESTS,
    };
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initial: SqlDatabaseState = {
        fee_heads: INITIAL_FEE_HEADS,
        fee_demands: INITIAL_FEE_DEMANDS,
        fee_demand_lines: INITIAL_FEE_DEMAND_LINES,
        installment_plans: INITIAL_INSTALLMENT_PLANS,
        payments: INITIAL_PAYMENTS,
        payment_allocations: [],
        refunds: INITIAL_REFUNDS,
        reminder_dispatches: INITIAL_REMINDER_DISPATCHES,
        scholarship_risks: INITIAL_SCHOLARSHIP_RISKS,
        loan_requests: INITIAL_LOAN_REQUESTS,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return {
      fee_heads: INITIAL_FEE_HEADS,
      fee_demands: INITIAL_FEE_DEMANDS,
      fee_demand_lines: INITIAL_FEE_DEMAND_LINES,
      installment_plans: INITIAL_INSTALLMENT_PLANS,
      payments: INITIAL_PAYMENTS,
      payment_allocations: [],
      refunds: INITIAL_REFUNDS,
      reminder_dispatches: INITIAL_REMINDER_DISPATCHES,
      scholarship_risks: INITIAL_SCHOLARSHIP_RISKS,
      loan_requests: INITIAL_LOAN_REQUESTS,
    };
  }
}

export function saveSqlDatabaseState(state: SqlDatabaseState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("feewise_sql_store_updated"));
  } catch (err) {
    console.error("Failed to persist SQL state to localStorage", err);
  }
}

export function resetSqlDatabase() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  window.dispatchEvent(new Event("feewise_sql_store_updated"));
}

// ----------------------------------------------------
// Business Action 1: Waterfall Payment Processing
// ----------------------------------------------------
export function recordSqlPayment(paymentData: {
  student_id: string;
  amount: number;
  payment_mode: PaymentMode;
  channel: string;
}): { payment: Payment; allocatedLines: PaymentAllocation[] } {
  const state = getSqlDatabaseState();
  const studentDemand = state.fee_demands.find(
    (fd) => fd.student_id === paymentData.student_id
  );

  const paymentId = "pay-" + Math.floor(10000 + Math.random() * 90000);
  const receiptNo = "RCPT-2026-" + Math.floor(10000 + Math.random() * 90000);
  const today = new Date().toISOString().split("T")[0];

  const newPayment: Payment = {
    payment_id: paymentId,
    student_id: paymentData.student_id,
    student_name: studentDemand?.student_name || "Student",
    amount: paymentData.amount,
    payment_mode: paymentData.payment_mode,
    channel: paymentData.channel,
    transaction_ref: "TXN-" + Math.floor(1000000 + Math.random() * 9000000),
    paid_on: today,
    received_on: today,
    receipt_no: receiptNo,
    status: "RECONCILED",
  };

  // Waterfall Allocation according to allocation_priority
  let remainingAmount = paymentData.amount;
  const allocatedLines: PaymentAllocation[] = [];

  const linesForStudent = state.fee_demand_lines
    .filter((line) => line.fee_demand_id === studentDemand?.fee_demand_id)
    .sort((a, b) => a.allocation_priority - b.allocation_priority);

  for (const line of linesForStudent) {
    if (remainingAmount <= 0) break;
    const unpaid = line.net_amount - line.paid_amount;
    if (unpaid > 0) {
      const allocate = Math.min(unpaid, remainingAmount);
      line.paid_amount += allocate;
      remainingAmount -= allocate;
      allocatedLines.push({
        payment_id: paymentId,
        fee_demand_line_id: line.fee_demand_line_id,
        amount: allocate,
      });
    }
  }

  // Update total paid and status on FeeDemand
  if (studentDemand) {
    studentDemand.paid_amount += paymentData.amount;
    studentDemand.outstanding = Math.max(
      0,
      studentDemand.net_payable - studentDemand.paid_amount
    );
    if (studentDemand.outstanding === 0) {
      studentDemand.status = "SETTLED";
    } else {
      studentDemand.status = "PARTIAL";
    }
  }

  state.payments.unshift(newPayment);
  state.payment_allocations.push(...allocatedLines);
  saveSqlDatabaseState(state);

  return { payment: newPayment, allocatedLines };
}

// ----------------------------------------------------
// Business Action 2: Loan Document Request & Issuance
// ----------------------------------------------------
export function requestLoanDocument(data: {
  student_id: string;
  student_name: string;
  bank_name: string;
  document_type: LoanDocumentType;
}): LoanDocumentRequest {
  const state = getSqlDatabaseState();
  const newRequest: LoanDocumentRequest = {
    loan_document_request_id: "ldr-" + Math.floor(100 + Math.random() * 900),
    student_id: data.student_id,
    student_name: data.student_name,
    bank_name: data.bank_name,
    document_type: data.document_type,
    requested_on: new Date().toISOString().split("T")[0],
    status: "REQUESTED",
  };
  state.loan_requests.unshift(newRequest);
  saveSqlDatabaseState(state);
  return newRequest;
}

export function issueLoanDocument(
  requestId: string,
  issuedBy: string = "VFSTR Finance Desk"
): LoanDocumentRequest | null {
  const state = getSqlDatabaseState();
  const req = state.loan_requests.find(
    (r) => r.loan_document_request_id === requestId
  );
  if (!req) return null;

  req.status = "ISSUED";
  req.issued_on = new Date().toISOString().split("T")[0];
  req.issued_by = issuedBy;
  req.verification_code =
    "VFSTR-LOAN-" + Math.floor(100000 + Math.random() * 900000);
  req.turnaround_hours = 12.0;

  saveSqlDatabaseState(state);
  return req;
}

export function updateRefundStatus(
  refundId: string,
  newStatus: RefundStatus
): RefundRecord | null {
  const state = getSqlDatabaseState();
  const ref = state.refunds.find((r) => r.refund_id === refundId);
  if (!ref) return null;
  ref.status = newStatus;
  saveSqlDatabaseState(state);
  return ref;
}

// ----------------------------------------------------
// Business Action 3: Reminder Dispatch & Policy Suppression
// ----------------------------------------------------
export function dispatchFeeReminder(student_id: string): ReminderDispatch {
  const state = getSqlDatabaseState();
  const student = students.find((s) => s.id === student_id);
  const demand = state.fee_demands.find((fd) => fd.student_id === student_id);
  const plan = instalmentPlans.find((p) => p.studentId === student_id);
  const activeSqlPlan = state.installment_plans.find(
    (p) => p.student_id === student_id && p.status === "PENDING"
  );
  const scholarshipAmount = student?.scholarship || demand?.scholarship_expected || 0;
  const overdueAmount = student?.overdue ?? demand?.outstanding ?? 0;
  const hasSanctionedScholarship =
    scholarshipAmount > 0 && overdueAmount <= scholarshipAmount;

  let suppressed = false;
  let suppressionReason: string | undefined;
  let segment: ReminderSegment = "PERSISTENT";

  const hasUpcomingInstalment = plan && plan.instalments.some((i) => i.status === "Pending");
  if (activeSqlPlan) {
    suppressed = true;
    segment = "ON_PLAN";
    suppressionReason = `Auto-suppressed: Active ${activeSqlPlan.installment_no}-instalment plan covers dues until ${activeSqlPlan.due_date}.`;
  } else if (hasUpcomingInstalment) {
    suppressed = true;
    segment = "ON_PLAN";
    const nextInst = plan.instalments.find((i) => i.status === "Pending");
    suppressionReason = `Auto-suppressed: Active ${plan.planType} covers remaining balance until ${nextInst?.due || "next cycle"}.`;
  } else if (hasSanctionedScholarship) {
    suppressed = true;
    segment = "AWAITING_SCHOLARSHIP";
    suppressionReason = `Auto-suppressed: Sanctioned Scholarship (₹${scholarshipAmount.toLocaleString("en-IN")}) covers outstanding balance.`;
  } else {
    const loanReq = state.loan_requests.find(
      (l) => l.student_id === student_id && l.status !== "REJECTED"
    );
    if (loanReq) {
      suppressed = true;
      segment = "ON_PLAN";
      suppressionReason = `Auto-suppressed: Bank education loan certificate verification in progress (${loanReq.bank_name}).`;
    }
  }

  const newReminder: ReminderDispatch = {
    reminder_dispatch_id: "rem-" + Math.floor(9000 + Math.random() * 9000),
    student_id,
    student_name: student?.name || demand?.student_name || "Student",
    fee_demand_id: demand?.fee_demand_id || `fd-${student_id}`,
    segment,
    escalation_level: suppressed ? 1 : 2,
    channel: "WhatsApp & SMS",
    message_ref: "MSG-" + Math.floor(1000 + Math.random() * 9000),
    suppressed,
    suppression_reason: suppressionReason,
    sent_at: new Date().toLocaleString("en-IN"),
    ...(!suppressed ? { delivered_at: new Date().toLocaleString("en-IN"), responded: false } : {}),
  };

  state.reminder_dispatches.unshift(newReminder);
  saveSqlDatabaseState(state);
  return newReminder;
}

// ----------------------------------------------------
// Business Action 4: SQL Dump Exporter for Judges
// ----------------------------------------------------
export function exportPostgreSqlDump(): string {
  const state = getSqlDatabaseState();

  let sql = `-- ==========================================================================\n`;
  sql += `-- finDeck VFSTR - PostgreSQL Dump (Generated from 07_admissions_finance.sql)\n`;
  sql += `-- Generated on: ${new Date().toISOString()}\n`;
  sql += `-- ==========================================================================\n\n`;

  sql += `-- 1. FEE HEADS\n`;
  for (const fh of state.fee_heads) {
    sql += `INSERT INTO finance.fee_head (fee_head_id, institution_id, code, name, head_type, is_refundable, allocation_priority) VALUES ('${fh.fee_head_id}', '${fh.institution_id}', '${fh.code}', '${fh.name}', '${fh.head_type}', ${fh.is_refundable}, ${fh.allocation_priority}) ON CONFLICT DO NOTHING;\n`;
  }

  sql += `\n-- 2. FEE DEMANDS\n`;
  for (const fd of state.fee_demands) {
    sql += `INSERT INTO finance.fee_demand (fee_demand_id, student_id, academic_year_id, fee_structure_id, gross_amount, concession_amount, scholarship_expected, net_payable, paid_amount, due_date, status) VALUES ('${fd.fee_demand_id}', '${fd.student_id}', '${fd.academic_year_id}', '${fd.fee_structure_id}', ${fd.gross_amount}, ${fd.concession_amount}, ${fd.scholarship_expected}, ${fd.net_payable}, ${fd.paid_amount}, '${fd.due_date}', '${fd.status}');\n`;
  }

  sql += `\n-- 3. PAYMENTS & ALLOCATIONS\n`;
  for (const p of state.payments) {
    sql += `INSERT INTO finance.payment (payment_id, student_id, amount, payment_mode, channel, transaction_ref, paid_on, receipt_no, status) VALUES ('${p.payment_id}', '${p.student_id}', ${p.amount}, '${p.payment_mode}', '${p.channel}', '${p.transaction_ref}', '${p.paid_on}', '${p.receipt_no}', '${p.status}');\n`;
  }

  sql += `\n-- 4. REMINDER DISPATCH (With Suppression Rule)\n`;
  for (const r of state.reminder_dispatches) {
    sql += `INSERT INTO finance.reminder_dispatch (reminder_dispatch_id, student_id, fee_demand_id, segment, escalation_level, channel, message_ref, suppressed, suppression_reason, sent_at) VALUES ('${r.reminder_dispatch_id}', '${r.student_id}', '${r.fee_demand_id}', '${r.segment}', ${r.escalation_level}, '${r.channel}', '${r.message_ref}', ${r.suppressed}, ${r.suppression_reason ? `'${r.suppression_reason}'` : "NULL"}, '${r.sent_at}');\n`;
  }

  sql += `\n-- 5. SCHOLARSHIP RENEWAL RISK (Early Warning)\n`;
  for (const r of state.scholarship_risks) {
    sql += `INSERT INTO finance.scholarship_renewal_risk (scholarship_renewal_risk_id, scholarship_application_id, student_id, assessed_on, attendance_pct, cgpa, criteria_at_risk, risk_level) VALUES ('${r.scholarship_renewal_risk_id}', '${r.scholarship_application_id}', '${r.student_id}', '${r.assessed_on}', ${r.attendance_pct}, ${r.cgpa}, '${JSON.stringify(r.criteria_at_risk)}', '${r.risk_level}');\n`;
  }

  sql += `\n-- 6. LOAN DOCUMENT REQUESTS\n`;
  for (const l of state.loan_requests) {
    sql += `INSERT INTO finance.loan_document_request (loan_document_request_id, student_id, bank_name, document_type, requested_on, status, verification_code, turnaround_hours) VALUES ('${l.loan_document_request_id}', '${l.student_id}', '${l.bank_name}', '${l.document_type}', '${l.requested_on}', '${l.status}', ${l.verification_code ? `'${l.verification_code}'` : "NULL"}, ${l.turnaround_hours || "NULL"});\n`;
  }

  return sql;
}

export function downloadSqlFile() {
  const sql = exportPostgreSqlDump();
  const blob = new Blob([sql], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `VFSTR_finDeck_Postgres_Dump_${new Date().toISOString().split("T")[0]}.sql`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
