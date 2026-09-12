"use client";

import { useState, useMemo } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  LockKeyhole,
  Search,
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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useLiveFinance } from "@/context/live-finance-context";
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
  const { students, transactions: liveTransactions } = useLiveFinance();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const studentMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of students) map.set(s.id, s.name);
    return map;
  }, [students]);

  const filtered = useMemo(() => {
    if (!full) return liveTransactions.slice(0, 3);
    const q = search.trim().toLowerCase();
    return liveTransactions.filter((tx) => {
      if (statusFilter === "Mismatches" && tx.status !== "Mismatch") return false;
      if (statusFilter === "Matched" && tx.status !== "Matched") return false;
      if (!q) return true;
      const sName = studentMap.get(tx.student) || "";
      return `${tx.id} ${tx.student} ${sName} ${tx.method} ${tx.status} ${tx.gateway} ${tx.ledger}`
        .toLowerCase()
        .includes(q);
    });
  }, [liveTransactions, full, search, statusFilter, studentMap]);

  const totalPages = full ? Math.ceil(filtered.length / pageSize) || 1 : 1;
  const displayedRows = full
    ? filtered.slice((page - 1) * pageSize, page * pageSize)
    : filtered;

  const mismatchCount = liveTransactions.filter((t) => t.status === "Mismatch").length;
  const matchedCount = liveTransactions.filter((t) => t.status === "Matched").length;

  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Reconciliation Center</CardTitle>
        <CardDescription>
          {full
            ? `Audit and resolve payment variances across ${liveTransactions.length} recorded gateway transactions.`
            : "Every transaction, accounted for."}
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={onViewAll}>
            {full ? "View audit log" : "View all"}{" "}
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0">
        {full && (
          <div className="px-6 mb-4 flex flex-wrap items-center justify-between gap-3">
            <InputGroup className="h-9 max-w-sm w-full">
              <InputGroupInput
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                aria-label="Search reconciliation transactions"
                placeholder="Search Txn ID, student ID or name..."
                className="text-xs"
              />
              <InputGroupAddon>
                <Search className="size-3.5 text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("All");
                  setPage(1);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer",
                  statusFilter === "All"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                All ({liveTransactions.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("Mismatches");
                  setPage(1);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer",
                  statusFilter === "Mismatches"
                    ? "bg-destructive text-destructive-foreground border-destructive"
                    : "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20",
                )}
              >
                Mismatches ({mismatchCount})
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("Matched");
                  setPage(1);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer",
                  statusFilter === "Matched"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20",
                )}
              >
                Matched ({matchedCount})
              </button>
            </div>
          </div>
        )}

        {full && (
          <div className="px-6 mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {displayedRows.length} of {filtered.length} transactions
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs px-2"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </Button>
                <span>
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs px-2"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}

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
            {displayedRows.map((tx) => (
              <tr
                key={tx.id}
                className={cn(tx.status === "Mismatch" && "mismatch")}
              >
                <td data-label="Transaction">
                  <button
                    onClick={() => onReview(tx)}
                    className="font-medium hover:text-primary font-mono text-xs"
                  >
                    {tx.id}
                  </button>
                </td>
                <td data-label="Student">
                  <button
                    className="text-left text-muted-foreground hover:text-primary group"
                    onClick={() => onStudent(tx.student)}
                  >
                    <span className="font-medium text-foreground group-hover:text-primary text-xs block">
                      {studentMap.get(tx.student) || tx.student}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground block">
                      {tx.student}
                    </span>
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
        <Button variant="outline" onClick={() => onReview(liveTransactions.find(t => t.id === "TXN-10483") || liveTransactions[1])}>
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
