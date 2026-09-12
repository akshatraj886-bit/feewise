"use client";

import { useState, useEffect, useMemo } from "react";
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
import {
  getSqlDatabaseState,
  updateRefundStatus,
  type RefundRecord,
} from "@/lib/sql-store";
import { toast } from "sonner";

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
  const [refunds, setRefunds] = useState<RefundRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string>("rf-2081");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterReason, setFilterReason] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  function reload() {
    setRefunds(getSqlDatabaseState().refunds);
  }

  useEffect(() => {
    reload();
    window.addEventListener("feewise_sql_store_updated", reload);
    return () => window.removeEventListener("feewise_sql_store_updated", reload);
  }, []);

  const filtered = useMemo(() => {
    return refunds.filter((r) => {
      if (filterStatus !== "All" && r.status !== filterStatus) return false;
      if (filterReason !== "All" && r.reason !== filterReason) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = r.student_name.toLowerCase().includes(q);
        const matchesId = r.student_id.toLowerCase().includes(q);
        const matchesRef = r.refund_id.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesRef) return false;
      }
      return true;
    });
  }, [refunds, filterStatus, filterReason, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const activeRefund = (refunds.find((r) => r.refund_id === selectedId) || filtered[0] || refunds[0]) ?? null;

  function handleAction(action: "approve" | "reject" | "review") {
    if (!activeRefund) return;
    if (action === "approve") {
      updateRefundStatus(activeRefund.refund_id, "APPROVED");
      toast.success(`Refund #${activeRefund.refund_id.toUpperCase()} Approved!`, {
        description: `Approved amount ₹${activeRefund.approved_amount.toLocaleString("en-IN")} authorized for ${activeRefund.student_name}.`,
      });
      reload();
    } else if (action === "reject") {
      updateRefundStatus(activeRefund.refund_id, "REJECTED");
      toast.error(`Refund #${activeRefund.refund_id.toUpperCase()} Rejected`, {
        description: `Rejection recorded under university policy rules.`,
      });
      reload();
    }
    onReview(action);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border bg-card p-3">
          <p className="text-xs text-muted-foreground">Total Requests</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-primary">{refunds.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-3">
          <p className="text-xs text-muted-foreground">Pending Approval</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-amber-600">
            {refunds.filter((r) => r.status === "REQUESTED").length}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-3">
          <p className="text-xs text-muted-foreground">Approved</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-emerald-600">
            {refunds.filter((r) => r.status === "APPROVED").length}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-3">
          <p className="text-xs text-muted-foreground">Disbursed / Paid</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-violet-600">
            {refunds.filter((r) => r.status === "PAID").length}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: Queue List */}
        <Card className="panel">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock3 className="size-4 text-warning" />
                  Refund Applications Queue
                </CardTitle>
                <CardDescription>
                  {filtered.length} applications in ledger
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  className="filter-select text-xs"
                  aria-label="Filter by refund status"
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="All">All Statuses</option>
                  <option value="REQUESTED">Requested</option>
                  <option value="APPROVED">Approved</option>
                  <option value="PAID">Paid</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                <select
                  className="filter-select text-xs"
                  aria-label="Filter by refund reason"
                  value={filterReason}
                  onChange={(e) => {
                    setFilterReason(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="All">All Reasons</option>
                  <option value="WITHDRAWAL">Withdrawal</option>
                  <option value="CAUTION_DEPOSIT">Caution Deposit</option>
                  <option value="EXCESS">Excess</option>
                  <option value="CANCELLATION">Cancellation</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <InputGroup className="w-full">
                <InputGroupAddon>
                  <Search className="size-3.5 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Search student, roll number, or #RF ID..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </InputGroup>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {paginated.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No refund requests match your search or filter.
                </div>
              ) : (
                paginated.map((r) => {
                  const isSelected = activeRefund?.refund_id === r.refund_id;
                  return (
                    <button
                      key={r.refund_id}
                      onClick={() => setSelectedId(r.refund_id)}
                      className={cn(
                        "rounded-xl border p-3 text-left transition-all hover:border-primary/40",
                        isSelected
                          ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                          : "bg-card hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-xs text-foreground">
                              {r.student_name}
                            </span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              ({r.student_id})
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            <span className="font-mono text-primary font-semibold">#{r.refund_id.toUpperCase()}</span> &middot; {r.reason.replace(/_/g, " ")}
                          </p>
                        </div>
                        <Badge
                          variant={r.status === "APPROVED" ? "default" : "outline"}
                          className={`text-[10px] px-1.5 py-0 ${
                            r.status === "APPROVED"
                              ? "bg-emerald-600 text-white"
                              : r.status === "REQUESTED"
                                ? "text-amber-600 border-amber-500/30 bg-amber-500/5"
                                : r.status === "PAID"
                                  ? "text-violet-600 border-violet-500/30 bg-violet-500/5"
                                  : "text-destructive border-destructive/30"
                          }`}
                        >
                          {r.status}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs border-t pt-2">
                        <span className="text-muted-foreground text-[11px]">Eligible: {inr(r.eligible_amount)}</span>
                        <span className="font-bold text-foreground">{inr(r.approved_amount)}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Pagination footer */}
            {totalPages > 1 && (
              <div className="mt-3 flex items-center justify-between border-t pt-2.5 text-xs text-muted-foreground">
                <span>
                  Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-[11px]"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </Button>
                  <span className="px-1 text-[11px] font-medium text-foreground">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-[11px]"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: Selected Refund Review & Calculation */}
        {activeRefund ? (
          <Card className="panel">
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-warning" /> Human Approval Required
                </span>
              </CardTitle>
              <CardDescription>
                AI prepares traceable policy calculation. Authorized officer approves.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  Refund Request <span className="text-primary font-mono">#{activeRefund.refund_id.toUpperCase()}</span>
                </span>
                <Badge
                  variant={activeRefund.status === "APPROVED" ? "default" : "outline"}
                  className={activeRefund.status === "APPROVED" ? "bg-emerald-600 text-white text-xs" : "text-xs"}
                >
                  {activeRefund.status}
                </Badge>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Student Name</span>
                  <span className="font-medium">{activeRefund.student_name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Roll Number</span>
                  <span className="font-mono text-xs">{activeRefund.student_id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reason Category</span>
                  <span>{activeRefund.reason.replace(/_/g, " ")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Original Eligible Fee</span>
                  <span>{inr(activeRefund.eligible_amount)}</span>
                </div>
                <div className="flex items-center justify-between border-y border-border py-3 text-sm">
                  <span className="text-muted-foreground font-medium">Calculated Net Refund</span>
                  <span className="text-xl font-bold tracking-tight text-primary">
                    {inr(activeRefund.approved_amount)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-muted-foreground font-medium">Regulatory Policy Applied:</span>
                  <span className="rounded-md bg-muted p-2 text-foreground font-mono text-[11px] leading-relaxed">
                    {activeRefund.policy_applied}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-warning/7 p-3 text-xs text-warning">
                <LockKeyhole className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  {activeRefund.status === "REQUESTED"
                    ? "Awaiting authenticated finance officer sign-off before ledger entry."
                    : `Action completed: ${activeRefund.status}`}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction("review")}
                  className="flex-1 text-xs"
                >
                  Review calculation
                </Button>
                {activeRefund.status === "REQUESTED" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleAction("approve")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction("reject")}
                      className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center p-8 text-center text-xs text-muted-foreground">
            Select a refund request from the queue to view policy calculation.
          </div>
        )}
      </div>
    </div>
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
