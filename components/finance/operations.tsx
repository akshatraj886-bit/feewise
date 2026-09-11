"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  inr,
  transactions,
  type AuditEntry,
  type Transaction,
} from "@/lib/finance-data";
import { cn } from "@/lib/utils";

export function Status({ status }: { status: string }) {
  const critical = ["Mismatch", "Flagged", "Overdue"].includes(status);
  const good = ["Matched", "Success", "Paid"].includes(status);
  return (
    <span
      className={cn(
        "status-badge",
        critical ? "status-critical" : good ? "status-good" : "status-info",
      )}
    >
      {good ? (
        <Check className="size-3" />
      ) : critical ? (
        <TriangleAlert className="size-3" />
      ) : (
        <Clock3 className="size-3" />
      )}
      {status}
    </span>
  );
}

export function ReconciliationCenter({
  onReview,
  onViewAll,
  onStudent,
  full = false,
  reviewed = false,
}: {
  onReview: (transaction: Transaction) => void;
  onViewAll: () => void;
  onStudent: (id: string) => void;
  full?: boolean;
  reviewed?: boolean;
}) {
  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Reconciliation Center</CardTitle>
        <CardDescription>Every transaction, accounted for.</CardDescription>
        <CardAction>
          <Button variant="link" onClick={onViewAll}>
            {full ? "View audit log" : "View all"}{" "}
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <table className="data-table mobile-cards">
          <thead>
            <tr>
              {[
                "Transaction",
                "Student",
                "Gateway",
                "Ledger",
                "Difference",
                "Status",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, full ? undefined : 3).map((tx) => (
              <tr
                key={tx.id}
                className={cn(tx.status === "Mismatch" && "mismatch")}
              >
                <td data-label="Transaction">
                  <button
                    onClick={() => onReview(tx)}
                    className="font-medium hover:text-primary"
                  >
                    {tx.id}
                  </button>
                </td>
                <td data-label="Student">
                  <button
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => onStudent(tx.student)}
                  >
                    {tx.student}
                  </button>
                </td>
                <td data-label="Gateway" className="tabular-nums">
                  {inr(tx.gateway)}
                </td>
                <td data-label="Ledger" className="tabular-nums">
                  {inr(tx.ledger)}
                </td>
                <td
                  data-label="Difference"
                  className={cn(
                    "tabular-nums",
                    tx.gateway !== tx.ledger && "font-medium text-destructive",
                  )}
                >
                  {inr(tx.gateway - tx.ledger)}
                </td>
                <td data-label="Status">
                  <span>
                    <Status status={tx.status} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="online-dot" />{" "}
          {reviewed
            ? "TXN-10483 investigation prepared"
            : "Last reconciled today, 10:21 AM"}
        </span>
        <Button variant="outline" onClick={() => onReview(transactions[1])}>
          Review mismatch <ArrowRight data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export function RefundApproval({
  onReview,
  status = "Awaiting approval",
}: {
  onReview: (intent?: "review" | "approve" | "reject") => void;
  status?: string;
}) {
  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-warning" /> Human Approval
            Required
          </span>
        </CardTitle>
        <CardDescription>
          AI prepares. An authorized human approves.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="font-medium">
            Refund Request <span className="text-primary">#RF-2081</span>
          </span>
          <span className="status-badge status-attention">
            <Clock3 className="size-3" /> Pending
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Student</span>
            <span>251FA04E17</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Reason</span>
            <span>Withdrawal</span>
          </div>
          <div className="flex items-center justify-between border-y border-border py-3 text-sm">
            <span className="text-muted-foreground">Calculated refund</span>
            <span className="text-xl font-semibold tracking-tight">
              ₹18,500
            </span>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Policy</span>
            <span>Withdrawal before semester start</span>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-warning/7 p-3 text-sm text-warning">
          <LockKeyhole className="mt-0.5 size-3.5 shrink-0" />
          <span>
            {status === "Awaiting approval"
              ? "Awaiting authenticated finance approval"
              : status}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => onReview("review")}
            className="flex-1"
          >
            Review calculation
          </Button>
          <Button onClick={() => onReview("approve")}>Approve</Button>
          <Button variant="outline" onClick={() => onReview("reject")}>
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function AuditLog({
  entries,
  full = false,
}: {
  entries: AuditEntry[];
  full?: boolean;
}) {
  return (
    <Card id="audit-log" className="panel">
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            <FileCheck2 className="size-4 text-muted-foreground" /> Audit &amp;
            Activity
          </span>
        </CardTitle>
        <CardDescription>
          A transparent trail of every finance action
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Session demo</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <table className="data-table mobile-cards">
          <thead>
            <tr>
              {["Timestamp", "User", "Action", "Entity", "Status"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.slice(0, full ? undefined : 3).map((entry, index) => (
              <tr key={index}>
                <td data-label="Timestamp" className="text-muted-foreground">
                  {entry.time}
                </td>
                <td data-label="User">{entry.user}</td>
                <td data-label="Action">{entry.action}</td>
                <td data-label="Entity" className="text-muted-foreground">
                  {entry.entity}
                </td>
                <td data-label="Status">
                  <span>
                    <Status status={entry.status} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
