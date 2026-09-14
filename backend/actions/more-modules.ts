"use server";

import { getDatabase, isMongoConfigured } from "@/lib/mongodb";
import { getSqlDatabaseState, saveSqlDatabaseState } from "../database/sql-store";
import type { LoanDocumentRequest, RefundRecord, ReminderDispatch, ScholarshipRenewalRisk } from "../database/sql-store";
import { dispatchFeeReminder } from "../database/sql-store";

import { transactions as localTransactions } from "../database/finance-data";
import { getTransactionsAction } from "./payments";

async function syncMongoToLocal() {
  if (await isMongoConfigured()) {
    try {
      const liveTxns = await getTransactionsAction();
      if (liveTxns && liveTxns.length > 0) {
        localTransactions.length = 0;
        localTransactions.push(...liveTxns);
      }
    } catch (e) {
      console.warn("Failed to sync mongo to local transactions", e);
    }
  }
}


// ==========================================
// 1. LOAN REQUESTS
// ==========================================
export async function getLoanRequestsAction(): Promise<LoanDocumentRequest[]> {
  try {
    if (await isMongoConfigured()) {
      const db = (await getDatabase())!;
      const records = await db.collection("loan_requests").find({}).toArray();
      if (records.length > 0) {
        return records.map((r: any) => {
          const { _id, ...rest } = r;
          return rest as LoanDocumentRequest;
        });
      }
    }
  } catch (error) {
    console.warn("MongoDB fetch failed for loan requests, falling back to local array.", error);
  }
  return getSqlDatabaseState().loan_requests;
}

export async function requestLoanDocumentAction(data: {
  student_id: string;
  student_name: string;
  bank_name: string;
  document_type: LoanDocumentRequest["document_type"];
}): Promise<LoanDocumentRequest> {
  const newReq: LoanDocumentRequest = {
    loan_document_request_id: "req-" + Math.floor(10000 + Math.random() * 90000),
    student_id: data.student_id,
    student_name: data.student_name,
    bank_name: data.bank_name,
    document_type: data.document_type,
    requested_on: new Date().toISOString().split("T")[0],
    status: "REQUESTED",
  };

  try {
    if (await isMongoConfigured()) {
      const db = (await getDatabase())!;
      await db.collection("loan_requests").insertOne(newReq);
    } else {
      throw new Error("Mongo not configured");
    }
  } catch (err) {
    console.warn("MongoDB insert failed for loan request, saving to local array.", err);
    const state = getSqlDatabaseState();
    state.loan_requests.unshift(newReq);
    saveSqlDatabaseState(state);
  }
  return newReq;
}

export async function issueLoanDocumentAction(
  request_id: string,
  verification_code: string
): Promise<void> {
  try {
    if (await isMongoConfigured()) {
      const db = (await getDatabase())!;
      const result = await db.collection("loan_requests").updateOne(
        { loan_document_request_id: request_id },
        { $set: { status: "ISSUED", verification_code, turnaround_hours: Math.floor(Math.random() * 24) + 1 } }
      );
      if (result.matchedCount === 0) throw new Error("Not found in Mongo");
    } else {
      throw new Error("Mongo not configured");
    }
  } catch (err) {
    console.warn("MongoDB update failed for loan request, updating local array.", err);
    const state = getSqlDatabaseState();
    const req = state.loan_requests.find((l: any) => l.loan_document_request_id === request_id);
    if (req) {
      req.status = "ISSUED";
      req.verification_code = verification_code;
      req.turnaround_hours = Math.floor(Math.random() * 24) + 1;
      saveSqlDatabaseState(state);
    }
  }
}

// ==========================================
// 2. REFUNDS
// ==========================================
export async function getRefundsAction(): Promise<RefundRecord[]> {
  try {
    if (await isMongoConfigured()) {
      const db = (await getDatabase())!;
      const records = await db.collection("refunds").find({}).toArray();
      if (records.length > 0) {
        return records.map((r: any) => {
          const { _id, ...rest } = r;
          return rest as RefundRecord;
        });
      }
    }
  } catch (error) {
    console.warn("MongoDB fetch failed for refunds, falling back to local array.", error);
  }
  return getSqlDatabaseState().refunds;
}

export async function updateRefundStatusAction(
  refund_id: string,
  new_status: "APPROVED" | "PAID" | "REJECTED"
): Promise<void> {
  const processed_on = new Date().toISOString().split("T")[0];
  try {
    if (await isMongoConfigured()) {
      const db = (await getDatabase())!;
      const result = await db.collection("refunds").updateOne(
        { refund_id },
        { $set: { status: new_status, processed_on } }
      );
      if (result.matchedCount === 0) throw new Error("Not found in Mongo");
    } else {
      throw new Error("Mongo not configured");
    }
  } catch (err) {
    console.warn("MongoDB update failed for refund, updating local array.", err);
    const state = getSqlDatabaseState();
    const r = state.refunds.find((rf: any) => rf.refund_id === refund_id);
    if (r) {
      r.status = new_status;
      // Note: we can't assign processed_on to RefundRecord if it doesn't exist on the type, but let's ignore or cast
      (r as any).processed_on = processed_on;
      saveSqlDatabaseState(state);
    }
  }
}

// ==========================================
// 3. SMART REMINDERS
// ==========================================
export async function getSmartRemindersAction(): Promise<ReminderDispatch[]> {
  try {
    if (await isMongoConfigured()) {
      const db = (await getDatabase())!;
      const records = await db.collection("reminder_dispatches").find({}).toArray();
      if (records.length > 0) {
        return records.map((r: any) => {
          const { _id, ...rest } = r;
          return rest as ReminderDispatch;
        });
      }
    }
  } catch (error) {
    console.warn("MongoDB fetch failed for reminders, falling back to local array.", error);
  }
  return getSqlDatabaseState().reminder_dispatches;
}


export async function dispatchFeeReminderAction(student_id: string): Promise<ReminderDispatch> {
  await syncMongoToLocal();
  // First run local logic to build the reminder object (this handles the complex suppression logic safely)
  const newReminder = dispatchFeeReminder(student_id);
  
  try {
    if (await isMongoConfigured()) {
      const db = (await getDatabase())!;
      await db.collection("reminder_dispatches").insertOne(newReminder);
    }
  } catch (err) {
    console.warn("MongoDB insert failed for reminder, already saved in local.", err);
  }
  
  return newReminder;
}

// ==========================================
// 4. SCHOLARSHIP RISKS
// ==========================================
export async function getScholarshipRisksAction(): Promise<ScholarshipRenewalRisk[]> {
  try {
    if (await isMongoConfigured()) {
      const db = (await getDatabase())!;
      const records = await db.collection("scholarship_risks").find({}).toArray();
      if (records.length > 0) {
        return records.map((r: any) => {
          const { _id, ...rest } = r;
          return rest as ScholarshipRenewalRisk;
        });
      }
    }
  } catch (error) {
    console.warn("MongoDB fetch failed for scholarship risks, falling back to local array.", error);
  }
  return getSqlDatabaseState().scholarship_risks;
}

// ==========================================
// 5. OVERSIGHT & ADMIT CARDS
// ==========================================
import { getAllStudentsAdmitCardStatus } from "../services/finance-service";
export async function getAdmitCardStatusAction() {
  await syncMongoToLocal();
  return getAllStudentsAdmitCardStatus();
}
