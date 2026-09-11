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
  Printer,
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
  inr,
  printReceiptPdf,
  printStatementPdf,
  students,
  type Student,
  type Transaction,
} from "@/lib/finance-data";
import { Status } from "./operations";
import { getStudentAccount, refund } from "@/lib/finance-service";
import { FeeCertificatesPanel } from "./certificates";
import { PartialPaymentSimulator } from "./partial-payment-modal";
import { useAuth, canApprove } from "@/lib/auth-context";

export function StudentDrawer({
  student,
  onClose,
}: {
  student: Student | null;
  onClose: () => void;
}) {
  const account = student ? getStudentAccount(student.id) : null;
  const fees = account?.fees.map(f => [f.head, f.gross] as const) ?? [];
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
              {!!account?.scholarship && (
                <>
                  <div className="flex justify-between border-t pt-3 text-sm">
                    <span>Gross total</span>
                    <span>{inr(account.gross)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-success">
                    <span>Merit scholarship</span>
                    <span>−{inr(account.scholarship)}</span>
                  </div>
                </>
              )}
              {!!student.concession && (
                <div className="flex justify-between text-sm text-primary">
                  <span>Concession</span>
                  <span>−{inr(student.concession)}</span>
                </div>
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
              {account?.payments.map((payment) => (
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
                      {payment.id} · {payment.method}
                      {payment.gateway !== payment.amount && ` · Gateway ${inr(payment.gateway)}; unresolved difference excluded from paid` }
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3">
              <Button
                className="w-full"
                onClick={() => {
                  if (!account) return;
                  printStatementPdf({
                    studentName: student.name,
                    studentId: student.id,
                    programme: student.programme,
                    category: student.category,
                    academicYear: account.academicYear,
                    fees: account.fees,
                    scholarship: account.scholarship,
                    concession: student.concession,
                    gross: account.gross,
                    demand: student.demand,
                    paid: student.paid,
                    outstanding: account.outstanding,
                    payments: account.payments,
                    priorCycleSettled: account.priorCycleSettled,
                  });
                  toast.success("Fee statement PDF opened — print or save as PDF");
                }}
              >
                <ArrowDownToLine data-icon="inline-start" /> Download Fee Statement (PDF)
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  const latest = account?.payments[0];
                  printReceiptPdf({
                    receiptNo: latest?.id ?? `RCPT-${student.id}`,
                    studentId: student.id,
                    studentName: student.name,
                    programme: student.programme,
                    date: latest?.date ?? new Date().toLocaleDateString("en-IN"),
                    amount: student.paid,
                    method: latest?.method?.split(" · ")[0] ?? "—",
                    txnId: latest?.id ?? "—",
                    heads: account?.fees.map((f) => ({ head: f.head, amount: f.paid })),
                  });
                  toast.success("PDF receipt opened — print or save as PDF");
                }}
              >
                <Printer data-icon="inline-start" /> Print PDF receipt
              </Button>
            </div>

            {/* Official Fee Certificates */}
            <div className="mt-8 pt-6 border-t">
              <FeeCertificatesPanel student={student} />
            </div>

            {/* Counter Collection & Priority Partial Payment */}
            <div className="mt-8 pt-6 border-t">
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Counter Collection & Priority Allocation
                </h4>
                <p className="text-xs text-muted-foreground">
                  Simulate or record a cashier payment with automated priority head distribution.
                </p>
              </div>
              <PartialPaymentSimulator student={student} />
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              finDeck Finance Engine · Real-time priority allocations & certificates
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
  const { user } = useAuth();
  const isAdmin = canApprove(user?.role || "admin");

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
        {!isAdmin ? (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs leading-relaxed text-amber-900">
            <p className="flex items-center gap-2 font-semibold text-amber-800">
              <LockKeyhole className="size-4" /> Finance Officer Role Restriction
            </p>
            <p className="mt-1 text-amber-700">
              You are signed in as <strong>{user?.name || "Finance Officer"}</strong>. You may prepare and submit a recommendation for review. Final authorization requires <strong>Administrator</strong> credentials.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs leading-relaxed text-emerald-900">
            <p className="flex items-center gap-2 font-semibold text-emerald-800">
              <ShieldCheck className="size-4" /> Administrator Authorized Session
            </p>
            <p className="mt-1 text-emerald-700">
              You have full institutional authorization to review and prepare recommendations for financial execution.
            </p>
          </div>
        )}
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
