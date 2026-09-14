"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  allStudentsWithProspective as initialStudents,
  admittedStudents as defaultAdmittedStudents,
  prospectiveStudents as defaultProspectiveStudents,
  transactions as initialTransactions,
  type Student,
  type Transaction,
} from "@/lib/finance-data";
import {
  feeAllocations as initialFeeAllocations,
} from "@/backend/database/fee-allocations";
import {
  paymentReceipts as initialPaymentReceipts,
} from "@/backend/database/payment-receipts";
import { getStudentAccount as serviceGetStudentAccount } from "@/lib/finance-service";
import { getTransactionsAction, recordPaymentAction } from "@/backend/actions/payments";

interface LivePaymentPayload {
  studentId: string;
  amount: number;
  channel?: string;
}

interface LiveFinanceContextType {
  students: Student[];
  admittedStudents: Student[];
  prospectiveStudents: Student[];
  transactions: Transaction[];
  feeAllocations: typeof initialFeeAllocations;
  paymentReceipts: typeof initialPaymentReceipts;
  totalDemand: number;
  totalCollected: number;
  totalOutstanding: number;
  collectionRate: number;
  makeLivePayment: (payload: LivePaymentPayload) => Promise<any>;
  getLiveStudentAccount: (id: string) => any;
  resetAllData: () => void;
  lastUpdated: number;
  isLoading: boolean;
}

const STORAGE_KEY_STUDENTS = "findeck_live_students_v8";
const STORAGE_KEY_ALLOCATIONS = "findeck_live_allocations_v8";
const STORAGE_KEY_RECEIPTS = "findeck_live_receipts_v8";
const STORAGE_KEY_TRANSACTIONS = "findeck_live_transactions_v8";

const LiveFinanceContext = createContext<LiveFinanceContextType | null>(null);

export function LiveFinanceProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [feeAllocations, setFeeAllocations] = useState(initialFeeAllocations);
  const [paymentReceipts, setPaymentReceipts] = useState(initialPaymentReceipts);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted state from localStorage on mount with cache invalidation
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        // Purge old stale caches from previous demo versions
      const staleKeys = [
        "findeck_live_students",
        "findeck_live_transactions",
        "findeck_live_students_v2",
        "findeck_live_allocations_v2",
        "findeck_live_receipts_v2",
        "findeck_live_transactions_v2",
        "findeck_live_students_v3",
        "findeck_live_transactions_v3",
        "findeck_live_students_v4",
        "findeck_live_allocations_v4",
        "findeck_live_receipts_v4",
        "findeck_live_transactions_v4",
        "findeck_live_students_v5",
        "findeck_live_allocations_v5",
        "findeck_live_receipts_v5",
        "findeck_live_transactions_v5",
        "findeck_live_students_v6",
        "findeck_live_allocations_v6",
        "findeck_live_receipts_v6",
        "findeck_live_transactions_v6",
      ];
      for (const k of staleKeys) {
        localStorage.removeItem(k);
      }

      const savedStudents = localStorage.getItem(STORAGE_KEY_STUDENTS);
      const savedAllocs = localStorage.getItem(STORAGE_KEY_ALLOCATIONS);
      const savedReceipts = localStorage.getItem(STORAGE_KEY_RECEIPTS);
      const savedTxns = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);

      if (savedStudents) {
        const parsed = JSON.parse(savedStudents);
        const isValid = Array.isArray(parsed) &&
          parsed.length === initialStudents.length &&
          parsed.every((s: any) => s && typeof s.id === "string" && s.id.includes("1FA"));
        if (isValid) {
          setStudents(parsed);
        } else {
          setStudents(initialStudents);
          localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(initialStudents));
        }
      } else {
        setStudents(initialStudents);
      }

      if (savedAllocs) {
        const parsed = JSON.parse(savedAllocs);
        if (parsed && typeof parsed === "object" && !parsed["2404518"] && parsed["241FA04518"]) {
          setFeeAllocations(parsed);
        } else {
          setFeeAllocations(initialFeeAllocations);
          localStorage.setItem(STORAGE_KEY_ALLOCATIONS, JSON.stringify(initialFeeAllocations));
        }
      } else {
        setFeeAllocations(initialFeeAllocations);
      }

      if (savedReceipts) {
        const parsed = JSON.parse(savedReceipts);
        if (parsed && typeof parsed === "object" && !parsed["2404518"] && parsed["241FA04518"]) {
          setPaymentReceipts(parsed);
        } else {
          setPaymentReceipts(initialPaymentReceipts);
          localStorage.setItem(STORAGE_KEY_RECEIPTS, JSON.stringify(initialPaymentReceipts));
        }
      } else {
        setPaymentReceipts(initialPaymentReceipts);
      }

      if (savedTxns) {
        const parsed = JSON.parse(savedTxns);
        if (Array.isArray(parsed) && parsed.length >= initialTransactions.length) {
          const seen = new Set<string>();
          const deduplicated = parsed.filter((t) => {
            if (!t || !t.id || seen.has(t.id)) return false;
            seen.add(t.id);
            return true;
          });
          setTransactions(deduplicated);
        } else {
          setTransactions(initialTransactions);
        }
      } else {
        setTransactions(initialTransactions);
        }

        // Hybrid fetch: try to get real transactions from MongoDB
        const realTxns = await getTransactionsAction();
        if (realTxns && realTxns.length > 0) {
          setTransactions(realTxns);
        }
      } catch (e) {
        console.warn("Live finance local storage restore error:", e);
        setStudents(initialStudents);
        setTransactions(initialTransactions);
        setFeeAllocations(initialFeeAllocations);
        setPaymentReceipts(initialPaymentReceipts);
      } finally {
        setIsLoaded(true);
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // Save to localStorage whenever state changes after initial load
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
      localStorage.setItem(STORAGE_KEY_ALLOCATIONS, JSON.stringify(feeAllocations));
      localStorage.setItem(STORAGE_KEY_RECEIPTS, JSON.stringify(paymentReceipts));
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.warn("Live finance local storage save error:", e);
    }
  }, [students, feeAllocations, paymentReceipts, transactions, isLoaded]);

  // Segregated subsets for Admitted (enrolled) vs Prospective (intending) students
  const admittedStudents = useMemo(
    () => students.filter((s) => s.admissionStatus !== "Prospective"),
    [students]
  );
  const prospectiveStudents = useMemo(
    () => students.filter((s) => s.admissionStatus === "Prospective"),
    [students]
  );

  // Compute live institutional treasury totals strictly across enrolled/admitted students
  const { totalDemand, totalCollected, totalOutstanding, collectionRate } = useMemo(() => {
    const demand = admittedStudents.reduce((sum, s) => sum + (s.demand || 0), 0);
    const collected = admittedStudents.reduce((sum, s) => sum + (s.paid || 0), 0);
    const outstanding = Math.max(0, demand - collected);
    const rate = demand > 0 ? (collected / demand) * 100 : 0;
    return {
      totalDemand: demand,
      totalCollected: collected,
      totalOutstanding: outstanding,
      collectionRate: rate,
    };
  }, [admittedStudents]);

  // Execute a live payment and synchronize across all heads, receipts, and students
  async function makeLivePayment({ studentId, amount, channel = "UPI" }: LivePaymentPayload) {
    // 1. Run core waterfall service & MongoDB persist via Server Action
    const res = await recordPaymentAction(studentId, amount, channel);

    // 2. Clone and update student
    const updatedStudents = students.map((s) => {
      if (s.id === studentId) {
        const newPaid = Math.min(s.demand, s.paid + amount);
        const newOverdue = Math.max(0, s.demand - newPaid);
        return { ...s, paid: newPaid, overdue: newOverdue };
      }
      return s;
    });

    // 3. Clone and update fee allocations for this student
    const currentAlloc = feeAllocations[studentId];
    let updatedAllocs = { ...feeAllocations };

    if (currentAlloc) {
      let remaining = amount;
      const priorityOrder = ["Tuition", "Examination", "Library", "Laboratory", "Hostel"];
      const sorted = [...currentAlloc].sort((a, b) => {
        const idxA = priorityOrder.indexOf(a.head);
        const idxB = priorityOrder.indexOf(b.head);
        return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
      });

      const nextAllocRows = sorted.map((row) => {
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

      updatedAllocs[studentId] = nextAllocRows;
    }

    // 4. Update payment receipts
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newRcpt = {
      txnId: res.txnId,
      date: dateStr,
      channel,
      amount,
    };

    const currentRcpts = paymentReceipts[studentId] ? [...paymentReceipts[studentId]] : [];
    currentRcpts.unshift(newRcpt);
    const updatedReceipts = {
      ...paymentReceipts,
      [studentId]: currentRcpts,
    };

    // 5. Update transactions
    const newTxn: Transaction = {
      id: res.txnId,
      student: studentId,
      gateway: amount,
      ledger: amount,
      date: dateStr,
      method: channel,
      status: "Matched",
    };
    const updatedTxns = [newTxn, ...transactions.filter((t) => t.id !== res.txnId)];

    setStudents(updatedStudents);
    setFeeAllocations(updatedAllocs);
    setPaymentReceipts(updatedReceipts);
    setTransactions(updatedTxns);
    setLastUpdated(Date.now());

    // Dispatch custom browser event so any decoupled component reacts
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("findeck_live_update", {
          detail: { studentId, amount, txnId: res.txnId },
        })
      );
    }

    return res;
  }

  function getLiveStudentAccount(id: string) {
    const student = students.find((s) => s.id === id);
    if (!student) return null;
    const baseAccount = serviceGetStudentAccount(id);
    const alloc = feeAllocations[id];
    const rcpts = paymentReceipts[id] || [];

    const fees = alloc
      ? alloc.map((a) => ({
          head: a.head,
          gross: a.gross,
          demand: a.gross,
          paid: a.paid,
          outstanding: a.outstanding,
          status: a.status,
          scholarship: a.head === "Tuition" ? student.scholarship || 0 : 0,
        }))
      : baseAccount?.fees;

    const payments = rcpts.length > 0
      ? rcpts.map((r) => ({
          id: r.txnId,
          date: r.date,
          amount: r.amount,
          gateway: r.amount,
          method: `${r.channel} · Reconciled`,
          status: "Matched",
        }))
      : baseAccount?.payments || [];

    return {
      ...baseAccount,
      ...student,
      fees,
      payments,
      outstanding: Math.max(0, student.demand - student.paid),
    };
  }

  function resetAllData() {
    localStorage.removeItem(STORAGE_KEY_STUDENTS);
    localStorage.removeItem(STORAGE_KEY_ALLOCATIONS);
    localStorage.removeItem(STORAGE_KEY_RECEIPTS);
    localStorage.removeItem(STORAGE_KEY_TRANSACTIONS);
    setStudents(initialStudents);
    setFeeAllocations(initialFeeAllocations);
    setPaymentReceipts(initialPaymentReceipts);
    setTransactions(initialTransactions);
    setLastUpdated(Date.now());
  }

  return (
    <LiveFinanceContext.Provider
      value={{
        students,
        admittedStudents,
        prospectiveStudents,
        transactions,
        feeAllocations,
        paymentReceipts,
        totalDemand,
        totalCollected,
        totalOutstanding,
        collectionRate,
        makeLivePayment,
        getLiveStudentAccount,
        resetAllData,
        lastUpdated,
        isLoading,
      }}
    >
      {children}
    </LiveFinanceContext.Provider>
  );
}

export function useLiveFinance() {
  const ctx = useContext(LiveFinanceContext);
  if (!ctx) {
    throw new Error("useLiveFinance must be used within a LiveFinanceProvider");
  }
  return ctx;
}
