import { NextRequest, NextResponse } from "next/server";
import { transactions } from "@/backend/database/finance-data";
import { getDatabase, isMongoConfigured } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const txnId = searchParams.get("id");
    const studentId = searchParams.get("studentId");

    if (isMongoConfigured()) {
      const db = await getDatabase();
      if (db) {
        const col = db.collection("payments");
        if (txnId) {
          const doc = await col.findOne({ id: txnId });
          return NextResponse.json({ source: "mongodb", transaction: doc });
        }
        if (studentId) {
          const docs = await col.find({ student: studentId }).toArray();
          return NextResponse.json({ source: "mongodb", transactions: docs });
        }
        const allDocs = await col.find({}).sort({ date: -1 }).limit(100).toArray();
        if (allDocs.length > 0) {
          return NextResponse.json({ source: "mongodb", transactions: allDocs });
        }
      }
    }

    if (txnId) {
      const txn = transactions.find((t) => t.id === txnId);
      return NextResponse.json({ source: "local-store", transaction: txn || null });
    }

    if (studentId) {
      const studentTxns = transactions.filter((t) => t.student === studentId);
      return NextResponse.json({ source: "local-store", transactions: studentTxns });
    }

    return NextResponse.json({ source: "local-store", transactions: transactions.slice(0, 50) });
  } catch (error) {
    console.error("[Payments API GET Error]:", error);
    return NextResponse.json({ error: "Failed to fetch payments." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, amount, method, feeHead, referenceNo } = body;

    if (!studentId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment parameters. studentId and positive amount required." },
        { status: 400 }
      );
    }

    const newTxn = {
      id: `TXN-${Date.now().toString().slice(-6)}`,
      student: studentId,
      gateway: Number(amount),
      ledger: Number(amount),
      method: method || "UPI / QR Instant",
      date: new Date().toISOString().split("T")[0],
      status: "Settled",
      feeHead: feeHead || "Tuition Fee",
      referenceNo: referenceNo || `GATEWAY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };

    if (isMongoConfigured()) {
      const db = await getDatabase();
      if (db) {
        await db.collection("payments").insertOne(newTxn);
        // Also update student record if present
        await db.collection("students").updateOne(
          { id: studentId },
          { $inc: { paid: Number(amount) } }
        );
      }
    }

    return NextResponse.json({
      success: true,
      transaction: newTxn,
      receiptNumber: `RCPT-${newTxn.id.replace("TXN-", "")}`,
    });
  } catch (error) {
    console.error("[Payments API POST Error]:", error);
    return NextResponse.json({ error: "Failed to process payment." }, { status: 500 });
  }
}
