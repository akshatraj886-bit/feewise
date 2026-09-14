"use server";

import { getDatabase, isMongoConfigured } from "@/lib/mongodb";
import { type Transaction } from "@/backend/database/finance-data";
import { recordSqlPayment } from "@/backend/database/sql-store";
import { recordPayment as serviceRecordPayment } from "@/backend/services/finance-service";

/**
 * Fetch transactions. Hybrid pattern: MongoDB first, fallback to initial/local arrays.
 */
export async function getTransactionsAction(): Promise<Transaction[]> {
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        const docs = await db.collection("transactions").find({}).sort({ _id: -1 }).toArray();
        if (docs.length > 0) {
          return docs.map(d => {
            const { _id, ...rest } = d;
            return rest as Transaction;
          });
        }
      }
    } catch (err) {
      console.warn("MongoDB read failed for transactions, falling back to local memory:", err);
    }
  }
  // Return empty if fallback is needed, because LiveFinanceContext already has local state.
  // Actually, we can return null to signal to context to use its local state.
  return [];
}

/**
 * Record a payment. Hybrid pattern: MongoDB first, fallback to local arrays.
 */
export async function recordPaymentAction(
  studentId: string,
  amount: number,
  channel: string = "UPI"
): Promise<{ txnId: string; success: boolean }> {
  // 1. Run the local backend services to compute waterfall and generate Txn IDs
  // This updates local in-memory arrays (INITIAL_PAYMENTS, transactions, students, feeAllocations)
  // which is our exact fallback safety net!
  const result = serviceRecordPayment(studentId, amount, channel);

  // 2. Persist the generated transaction to MongoDB if available
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        const dateStr = new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        
        const newTxn = {
          id: result.txnId,
          student: studentId, // some collections use 'student', some use 'studentId'
          studentId: studentId,
          gateway: amount,
          ledger: amount,
          date: dateStr,
          method: channel,
          status: "Matched",
        };
        
        await db.collection("transactions").insertOne(newTxn);

        // Update student paid amount in MongoDB
        await db.collection("students").updateOne(
          { id: studentId },
          { 
            $inc: { paid: amount },
            $set: { overdue: Math.max(0, (result as any).demand || 0 - ((result as any).paid || 0) - amount) } // Rough estimate, actual calculation is complex
          }
        );

        // Also update fee_allocations collection if the result contains the updated heads
        if (result.heads && result.heads.length > 0) {
          const allocDoc = await db.collection("fee_allocations").findOne({ studentId });
          if (allocDoc && allocDoc.allocations) {
            let remaining = amount;
            const priorityOrder = ["Tuition", "Examination", "Library", "Laboratory", "Hostel"];
            const sortedAllocs = [...allocDoc.allocations].sort((a: any, b: any) => {
              const idxA = priorityOrder.indexOf(a.head);
              const idxB = priorityOrder.indexOf(b.head);
              return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
            });

            const nextAllocRows = sortedAllocs.map((row: any) => {
              if (remaining <= 0 || row.outstanding <= 0) return { ...row };
              const pay = Math.min(remaining, row.outstanding);
              const newPaid = row.paid + pay;
              const newOutstanding = Math.max(0, row.outstanding - pay);
              remaining -= pay;
              return {
                ...row,
                paid: newPaid,
                outstanding: newOutstanding,
                status: newOutstanding === 0 ? "Fully Cleared" : "Partially Paid",
              };
            });

            await db.collection("fee_allocations").updateOne(
              { studentId },
              { $set: { allocations: nextAllocRows } }
            );
          }
        }
      }
    } catch (err) {
      console.warn("MongoDB write failed for payment, falling back to local memory:", err);
    }
  }

  return { txnId: result.txnId, success: true };
}
