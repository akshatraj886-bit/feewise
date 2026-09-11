"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  Check,
  CircleCheck,
  Clock3,
  FileCheck2,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  downloadCsv,
  inr,
  type Student,
  type Transaction,
} from "@/lib/finance-data";
import { Status } from "./operations";

export function StudentDrawer({
  student,
  onClose,
}: {
  student: Student | null;
  onClose: () => void;
}) {
  const isAkshat = student?.id === "251FA04E03";
  const fees = isAkshat
    ? ([
        ["Tuition", 90000],
        ["Examination", 5000],
        ["Hostel", 40000],
        ["Library", 2000],
        ["Laboratory", 3000],
      ] as const)
    : ([
        ["Programme tuition", (student?.demand ?? 0) - 40000],
        ["Hostel & institutional fees", 40000],
      ] as const);
  return (
    <Sheet
      open={!!student}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        className="w-full overflow-y-auto sm:max-w-[470px]"
        style={{ width: "min(100%, 470px)" }}
      >
        <SheetHeader className="border-b px-6 py-6">
          <SheetTitle>Student fee account</SheetTitle>
          <SheetDescription>
            Academic year 2026–27 · Fictional demo record
          </SheetDescription>
        </SheetHeader>
        {student && (
          <div className="px-6 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-lg font-semibold text-primary">
                {student.initials}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{student.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {student.id}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-muted p-4 text-sm">
              <div>
                <p className="text-muted-foreground">Programme</p>
                <p className="mt-1 font-medium">{student.programme}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="mt-1 font-medium">{student.category}</p>
              </div>
            </div>
            <h3 className="mt-6 font-semibold">Fee summary</h3>
            <div className="mt-3 flex flex-col gap-3">
              {fees.map(([head, amount]) => (
                <div key={head} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{head}</span>
                  <span className="tabular-nums">{inr(amount)}</span>
                </div>
              ))}
              {isAkshat && (
                <>
                  <div className="flex justify-between border-t pt-3 text-sm">
                    <span>Total</span>
                    <span>₹1,40,000</span>
                  </div>
                  <div className="flex justify-between text-sm text-success">
                    <span>Merit scholarship</span>
                    <span>−₹20,000</span>
                  </div>
                </>
              )}
              <div className="flex justify-between border-t pt-3 font-medium">
                <span>Final demand</span>
                <span>{inr(student.demand)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Paid</span>
                <span className="text-success">{inr(student.paid)}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-warning/8 p-3 font-medium text-warning">
                <span>Outstanding</span>
                <span>{inr(student.demand - student.paid)}</span>
              </div>
            </div>
            <h3 className="mt-6 font-semibold">Payment timeline</h3>
            <div className="mt-4 flex flex-col gap-5">
              {[
                {
                  date: "11 Sep 2026",
                  amount: Math.min(30000, student.paid),
                  method: "UPI · Gateway verified",
                },
                {
                  date: "15 Jul 2026",
                  amount: student.paid - Math.min(30000, student.paid),
                  method: "Bank transfer · Reconciled",
                },
              ].map((payment) => (
                <div key={payment.date} className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-success/8 text-success">
                    <Check className="size-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{payment.date}</span>
                      <span>{inr(payment.amount)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {payment.method}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="mt-7 w-full"
              variant="outline"
              onClick={() => {
                downloadCsv(`${student.id}-fee-statement-DEMO.csv`, [
                  ["DEMO — current academic year 2026–27"],
                  ["Student", student.name],
                  ["Student ID", student.id],
                  ...fees.map(([head, amount]) => [head, amount]),
                  ["Scholarship", isAkshat ? -20000 : 0],
                  ["Final demand", student.demand],
                  ["Paid", student.paid],
                  ["Outstanding", student.demand - student.paid],
                ]);
                toast.success("Demo fee statement downloaded");
              }}
            >
              <ArrowDownToLine data-icon="inline-start" /> Download fee
              statement
            </Button>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Read-only account · No real financial data
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function TransactionDialog({
  transaction,
  onClose,
  onPrepare,
  prepared,
}: {
  transaction: Transaction | null;
  onClose: () => void;
  onPrepare: () => void;
  prepared: boolean;
}) {
  return (
    <Dialog
      open={!!transaction}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Transaction review</DialogTitle>
          <DialogDescription>
            {transaction?.id} · Gateway-to-ledger reconciliation
          </DialogDescription>
        </DialogHeader>
        {transaction && (
          <>
            <div className="flex justify-between rounded-lg bg-muted p-4 text-sm">
              <span>Student {transaction.student}</span>
              <Status status={transaction.status} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ["Gateway", transaction.gateway],
                ["Ledger", transaction.ledger],
                ["Difference", transaction.gateway - transaction.ledger],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border p-3">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-2 text-lg font-semibold">
                    {inr(Number(value))}
                  </p>
                </div>
              ))}
            </div>
            {transaction.status === "Mismatch" ? (
              <>
                <div className="rounded-lg bg-warning/8 p-4 text-sm leading-relaxed text-warning">
                  <div className="mb-2 flex items-center gap-2 font-semibold">
                    <TriangleAlert className="size-4" /> ₹5,000 requires
                    investigation
                  </div>
                  The gateway records ₹25,000, but only ₹20,000 is allocated in
                  the ledger. Verify the settlement reference, bank statement
                  and fee-head allocation before proposing a correction.
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Preparing an investigation does not mark this transaction as
                  matched or modify the student balance. Financial corrections
                  require authenticated human approval.
                </p>
                <Button disabled={prepared} onClick={onPrepare}>
                  <FileCheck2 data-icon="inline-start" />
                  {prepared
                    ? "Investigation prepared"
                    : "Prepare investigation"}
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-success/8 p-4 text-sm text-success">
                <CircleCheck className="size-5" /> Gateway and ledger amounts
                match. No action required.
              </div>
            )}
            <p className="text-center text-sm text-muted-foreground">
              Demo review · No ledger changes are executed
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function RefundDialog({
  intent,
  onClose,
  onPrepare,
}: {
  intent: "review" | "approve" | "reject" | null;
  onClose: () => void;
  onPrepare: (decision: "approve" | "reject", reason: string) => void;
}) {
  const [decision, setDecision] = useState<"approve" | "reject">("approve");
  const [confirmed, setConfirmed] = useState(false);
  const [reason, setReason] = useState("");
  const chosen = intent === "review" ? decision : intent || "approve";
  function reset() {
    setConfirmed(false);
    setReason("");
    setDecision("approve");
    onClose();
  }
  return (
    <Dialog
      open={!!intent}
      onOpenChange={(open) => {
        if (!open) reset();
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" /> Review refund
              RF-2081
            </span>
          </DialogTitle>
          <DialogDescription>
            Ananya Sharma · 251FA04E17 · Withdrawal
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-xl border p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Eligible refundable deposit
            </span>
            <span>₹20,000</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-muted-foreground">Policy deduction</span>
            <span>−₹1,500</span>
          </div>
          <div className="mt-3 flex justify-between border-t pt-3 font-semibold">
            <span>Calculated refund</span>
            <span className="text-xl">₹18,500</span>
          </div>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="font-medium">Withdrawal before semester start</p>
          <p className="mt-1 text-muted-foreground">
            Demo policy WD-2026, version 2.1. Refund eligibility and the
            withdrawal date must be verified against institutional records.
          </p>
        </div>
        <div className="rounded-lg bg-warning/8 p-3 text-sm leading-relaxed text-warning">
          <p className="flex items-center gap-2 font-semibold">
            <LockKeyhole className="size-4" /> Human approval is required
          </p>
          <p className="mt-1">
            This demo has no authenticated finance session. You can prepare a
            review recommendation only. No refund is approved, rejected or paid
            by this action.
          </p>
        </div>
        {intent === "review" && (
          <label className="flex flex-col gap-2 text-sm font-medium">
            Review recommendation
            <select
              className="filter-select"
              value={decision}
              onChange={(e) =>
                setDecision(e.target.value as "approve" | "reject")
              }
            >
              <option value="approve">Recommend approval</option>
              <option value="reject">Recommend rejection</option>
            </select>
          </label>
        )}
        <label className="flex flex-col gap-2 text-sm font-medium">
          Review notes {chosen === "reject" ? "(required)" : "(optional)"}
          <textarea
            aria-label="Review notes"
            rows={2}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Explain your recommendation…"
            className="resize-none rounded-lg border bg-card p-3 text-sm font-normal outline-primary"
          />
        </label>
        <label className="flex cursor-pointer items-start gap-2 text-sm leading-relaxed">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-primary"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I understand this prepares a recommendation and does not authorize a
          financial transaction.
        </label>
        <Button
          disabled={!confirmed || (chosen === "reject" && !reason.trim())}
          onClick={() => {
            onPrepare(chosen, reason.trim());
            reset();
          }}
        >
          <FileCheck2 data-icon="inline-start" />
          Prepare {chosen === "approve" ? "approval" : "rejection"}{" "}
          recommendation
        </Button>
      </DialogContent>
    </Dialog>
  );
}
