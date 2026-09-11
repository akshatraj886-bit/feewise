"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CalendarClock,
  Check,
  Clock3,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
  ShieldCheck,
  TriangleAlert,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  downloadExcel,
  feeStructures,
  inr,
  instalmentPlans,
  printReceiptPdf,
  students,
  transactions,
  type AuditEntry,
  type Student,
  type Transaction,
} from "@/lib/finance-data";
import { getInstalments } from "@/lib/finance-service";
import { Status, AuditLog } from "./operations";
import { CollectionIntelligence, FeeHeadOverview } from "./overview";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function StudentsView({
  onStudent,
  initialOverdue = false,
}: {
  onStudent: (student: Student) => void;
  initialOverdue?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(
    initialOverdue ? "90+ days overdue" : "All students",
  );
  const rows = students.filter(
    (student) =>
      `${student.name} ${student.id} ${student.programme}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "All students" ||
        (filter === "90+ days overdue"
          ? student.overdue > 90
          : filter === "Outstanding"
            ? student.demand > student.paid
            : student.demand === student.paid)),
  );
  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Student accounts</CardTitle>
        <CardDescription>
          Search and review individual fee accounts. Six representative demo
          records.
        </CardDescription>
        <CardAction>
          <Users className="size-5 text-primary" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <InputGroup className="h-10 max-w-sm">
            <InputGroupInput
              aria-label="Search students"
              placeholder="Search name, student ID or programme..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <select
            className="filter-select"
            aria-label="Student account filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {[
              "All students",
              "Outstanding",
              "90+ days overdue",
              "Fully paid",
            ].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <table className="data-table mobile-cards">
          <thead>
            <tr>
              {[
                "Student",
                "Programme",
                "Scholarship",
                "Concession",
                "Demand",
                "Paid",
                "Outstanding",
                "Status",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((student) => (
              <tr key={student.id}>
                <td data-label="Student">
                  <button
                    className="flex items-center gap-3 text-left"
                    onClick={() => onStudent(student)}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary font-medium text-primary">
                      {student.initials}
                    </span>
                    <span>
                      <span className="block font-medium hover:text-primary">
                        {student.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {student.id}
                      </span>
                    </span>
                  </button>
                </td>
                <td data-label="Programme">{student.programme}</td>
                <td data-label="Scholarship">
                  {student.scholarship > 0 ? (
                    <span className="text-success font-medium">
                      −{inr(student.scholarship)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm">None</span>
                  )}
                </td>
                <td data-label="Concession">
                  {student.concession > 0 ? (
                    <span className="text-primary font-medium">
                      −{inr(student.concession)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm">None</span>
                  )}
                </td>
                <td data-label="Demand">{inr(student.demand)}</td>
                <td data-label="Paid">{inr(student.paid)}</td>
                <td data-label="Outstanding">
                  {inr(student.demand - student.paid)}
                </td>
                <td data-label="Status">
                  <span>
                    <Status
                      status={
                        student.demand === student.paid
                          ? "Paid"
                          : student.overdue > 90
                            ? "Overdue"
                            : "Outstanding"
                      }
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No demo accounts match your search. Try another name or filter.
          </div>
        )}
        <p className="mt-5 text-sm text-muted-foreground">
          Showing {rows.length} of 6 demo accounts · Click a student to view
          their fee statement.
        </p>
      </CardContent>
    </Card>
  );
}

export function FeeStructureView() {
  const [programme, setProgramme] = useState("All programmes");
  const [version, setVersion] = useState("Active versions");
  const filtered = feeStructures.filter(
    (row) =>
      (programme === "All programmes" || row.programme === programme) &&
      (version === "All versions" ||
        (version === "Active versions" ? row.active : !row.active)),
  );
  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Versioned fee structures</CardTitle>
        <CardDescription>
          Effective-dated rules keep every student fee calculation traceable.
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Read only</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-5 flex flex-wrap gap-3">
          <select
            className="filter-select"
            aria-label="Fee structure programme"
            value={programme}
            onChange={(e) => setProgramme(e.target.value)}
          >
            {["All programmes", "B.Tech CSE", "B.Tech ECE", "MBA"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select
            className="filter-select"
            aria-label="Structure versions"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          >
            {["Active versions", "All versions", "Archived versions"].map(
              (o) => (
                <option key={o}>{o}</option>
              ),
            )}
          </select>
        </div>
        <table className="data-table mobile-cards">
          <thead>
            <tr>
              {[
                "Programme",
                "Academic year",
                "Category",
                "Admission route",
                "Fee head",
                "Amount",
                "Effective from",
                "Version",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i}>
                <td data-label="Programme" className="font-medium">
                  {row.programme}
                </td>
                <td data-label="Academic year">{row.year}</td>
                <td data-label="Category">{row.category}</td>
                <td data-label="Admission route">{row.route}</td>
                <td data-label="Fee head">{row.head}</td>
                <td data-label="Amount">{inr(row.amount)}</td>
                <td data-label="Effective from">{row.effective}</td>
                <td data-label="Version">
                  <span>
                    <Badge variant={row.active ? "secondary" : "outline"}>
                      {row.version}
                      {!row.active && " · Archived"}
                    </Badge>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <p className="py-8 text-center text-muted-foreground">
            No fee structures match these filters.
          </p>
        )}
        <div className="mt-5 flex items-start gap-2 rounded-lg bg-secondary p-4 text-sm leading-relaxed text-primary">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" />
          Published fee versions are immutable in this demo. New versions and
          retroactive balance adjustments require authenticated finance
          approval.
        </div>
      </CardContent>
    </Card>
  );
}

export function PaymentsView({
  onReview,
}: {
  onReview: (transaction: Transaction) => void;
}) {
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("All methods");
  const rows = transactions.filter(
    (t) =>
      (method === "All methods" || t.method === method) &&
      `${t.id} ${t.student}`.toLowerCase().includes(query.toLowerCase()),
  );

  function handlePrintReceipt(t: Transaction) {
    const student = students.find((s) => s.id === t.student);
    printReceiptPdf({
      receiptNo: `RCPT-${t.id.replace("TXN-", "")}`,
      studentId: t.student,
      studentName: student?.name ?? t.student,
      programme: student?.programme ?? "—",
      date: t.date,
      amount: t.ledger,
      method: t.method,
      txnId: t.id,
      note:
        t.status === "Mismatch"
          ? "⚠ Gateway-ledger difference unresolved. Receipt shows ledger-allocated amount only."
          : undefined,
    });
    toast.success("PDF receipt opened in new tab — print or save as PDF");
  }

  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Payment ledger</CardTitle>
        <CardDescription>
          Gateway receipts and their corresponding ledger allocations
        </CardDescription>
        <CardAction>
          <Button
            variant="outline"
            onClick={() => {
              downloadExcel("payments-DEMO", [
                [
                  "Transaction",
                  "Student",
                  "Gateway",
                  "Ledger",
                  "Method",
                  "Status",
                ],
                ...rows.map((t) => [
                  t.id,
                  t.student,
                  t.gateway,
                  t.ledger,
                  t.method,
                  t.status,
                ]),
              ], "Payments");
              toast.success("Payments exported as Excel (.xlsx)");
            }}
          >
            <ArrowDownToLine data-icon="inline-start" /> Export Excel (.xlsx)
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-5 flex flex-wrap justify-between gap-3">
          <InputGroup className="h-10 max-w-sm">
            <InputGroupInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search payments"
              placeholder="Search transaction or student ID..."
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <select
            className="filter-select"
            aria-label="Payment method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            {[
              "All methods",
              "UPI",
              "Net banking",
              "Debit card",
              "Bank transfer",
              "Counter collection",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Channel summary pills */}
        <div className="mb-5 flex flex-wrap gap-2">
          {[
            { label: "UPI", color: "bg-primary/10 text-primary" },
            { label: "Net banking", color: "bg-violet/10 text-violet" },
            { label: "Debit card", color: "bg-success/10 text-success" },
            { label: "Bank transfer", color: "bg-warning/10 text-warning" },
            { label: "Counter collection", color: "bg-destructive/10 text-destructive" },
          ].map(({ label, color }) => {
            const count = transactions.filter((t) => t.method === label).length;
            const total = transactions
              .filter((t) => t.method === label)
              .reduce((s, t) => s + t.ledger, 0);
            return (
              <button
                key={label}
                onClick={() => setMethod(method === label ? "All methods" : label)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                  color,
                  method === label ? "ring-2 ring-primary/30" : "opacity-80 hover:opacity-100",
                )}
              >
                {label} · {count} txn · {inr(total)}
              </button>
            );
          })}
        </div>

        <table className="data-table mobile-cards">
          <thead>
            <tr>
              {[
                "Transaction",
                "Student",
                "Date",
                "Amount",
                "Method",
                "Status",
                "Receipt",
                "Details",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id}>
                <td data-label="Transaction" className="font-medium">
                  {t.id}
                </td>
                <td data-label="Student">{t.student}</td>
                <td data-label="Date">{t.date}</td>
                <td data-label="Amount">{inr(t.gateway)}</td>
                <td data-label="Method">
                  <span className="inline-flex items-center gap-1.5">
                    {t.method === "Bank transfer" && (
                      <span className="size-1.5 rounded-full bg-warning" />
                    )}
                    {t.method === "Counter collection" && (
                      <span className="size-1.5 rounded-full bg-destructive" />
                    )}
                    {t.method}
                  </span>
                </td>
                <td data-label="Status">
                  <span>
                    <Status status={t.status} />
                  </span>
                </td>
                <td data-label="Receipt">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Print receipt for ${t.id}`}
                    onClick={() => handlePrintReceipt(t)}
                  >
                    <Printer />
                  </Button>
                </td>
                <td data-label="Details">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Review ${t.id}`}
                    onClick={() => onReview(t)}
                  >
                    <ArrowUpRight />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <p className="py-8 text-center text-muted-foreground">
            No payments match your filters.
          </p>
        )}
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary p-3 text-sm text-muted-foreground">
          <Printer className="mt-0.5 size-4 shrink-0 text-primary" />
          Click the printer icon on any row to open a print-ready PDF receipt in
          a new tab. No real financial data is included in demo receipts.
        </div>
      </CardContent>
    </Card>
  );
}

function InstalmentStatusBadge({ status }: { status: string }) {
  const critical = status === "Overdue";
  const good = status === "Paid";
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

export function InstalmentView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const plans = instalmentPlans.filter((p) => {
    if (filterStatus === "All") return true;
    return p.instalments.some((i) => i.status === filterStatus);
  });

  const selected = selectedId
    ? instalmentPlans.find((p) => p.studentId === selectedId)
    : null;
  const selectedStudent = selected
    ? students.find((s) => s.id === selected.studentId)
    : null;

  const totalOverdue = instalmentPlans.reduce(
    (sum, p) =>
      sum +
      p.instalments
        .filter((i) => i.status === "Overdue")
        .reduce((s, i) => s + (i.amount - i.paid), 0),
    0,
  );
  const totalPending = instalmentPlans.reduce(
    (sum, p) =>
      sum +
      p.instalments
        .filter((i) => i.status === "Pending")
        .reduce((s, i) => s + (i.amount - i.paid), 0),
    0,
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Active plans",
            value: instalmentPlans.length,
            unit: "students",
            color: "primary",
          },
          {
            label: "Overdue amount",
            value: inr(totalOverdue),
            unit: "requires follow-up",
            color: "destructive",
          },
          {
            label: "Pending amount",
            value: inr(totalPending),
            unit: "due this cycle",
            color: "warning",
          },
          {
            label: "Instalment plans",
            value: instalmentPlans.filter((p) => p.planType !== "Lump-sum")
              .length,
            unit: "split-payment students",
            color: "violet",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border bg-card p-4"
          >
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p
              className="mt-1 text-2xl font-semibold tracking-tight"
              style={{ color: `var(--${kpi.color})` }}
            >
              {kpi.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.unit}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        {/* Plans list */}
        <Card className="panel">
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <CalendarClock className="size-4 text-primary" />
                Instalment plans
              </span>
            </CardTitle>
            <CardDescription>
              {instalmentPlans.length} active plans · AY 2026–27
            </CardDescription>
            <CardAction>
              <select
                className="filter-select"
                aria-label="Filter by instalment status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {["All", "Paid", "Pending", "Overdue"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {plans.map((plan) => {
                const student = students.find(
                  (s) => s.id === plan.studentId,
                );
                const paid = plan.instalments.reduce(
                  (s, i) => s + i.paid,
                  0,
                );
                const pct = Math.round((paid / plan.totalDemand) * 100);
                const hasOverdue = plan.instalments.some(
                  (i) => i.status === "Overdue",
                );
                return (
                  <button
                    key={plan.planId}
                    onClick={() =>
                      setSelectedId(
                        selectedId === plan.studentId
                          ? null
                          : plan.studentId,
                      )
                    }
                    className={cn(
                      "rounded-xl border p-4 text-left transition-all hover:border-primary/30",
                      selectedId === plan.studentId
                        ? "border-primary/40 bg-secondary/50"
                        : "bg-card",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{student?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.studentId} · {plan.planType}
                        </p>
                      </div>
                      {hasOverdue ? (
                        <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/5">
                          Overdue
                        </Badge>
                      ) : (
                        <Badge variant="secondary">{pct}% paid</Badge>
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                        <span>{inr(paid)} paid</span>
                        <span>{inr(plan.totalDemand)} total</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Instalment schedule detail */}
        <Card className="panel">
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <FileText className="size-4 text-muted-foreground" />
                {selected
                  ? `${selectedStudent?.name} — Schedule`
                  : "Select a plan"}
              </span>
            </CardTitle>
            <CardDescription>
              {selected
                ? `${selected.planId} · ${selected.planType} · ${selected.academicYear}`
                : "Click a student plan on the left to view their instalment schedule"}
            </CardDescription>
            {selected && (
              <CardAction>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    downloadExcel(`${selected.planId}-schedule`, [
                      ["Plan", "Student", "Type", "Academic year", "Total demand"],
                      [selected.planId, selected.studentId, selected.planType, selected.academicYear, selected.totalDemand],
                      ["#", "Due date", "Amount", "Paid", "Balance", "Status", "Paid on", "Method"],
                      ...selected.instalments.map((i) => [
                        i.no,
                        i.due,
                        i.amount,
                        i.paid,
                        i.amount - i.paid,
                        i.status,
                        i.paidOn ?? "—",
                        i.method ?? "—",
                      ]),
                    ], "Instalment Schedule");
                    toast.success("Instalment schedule exported as Excel");
                  }}
                >
                  <ArrowDownToLine className="size-4" /> Export
                </Button>
              </CardAction>
            )}
          </CardHeader>
          <CardContent>
            {!selected ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <CalendarClock className="size-10 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  Select a student plan from the list to view their instalment
                  schedule and payment history.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Student info */}
                <div className="flex gap-4 rounded-xl bg-muted p-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Programme</p>
                    <p className="mt-1 font-medium">
                      {selectedStudent?.programme}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Scholarship</p>
                    <p className="mt-1 font-medium text-success">
                      {selectedStudent?.scholarship
                        ? `−${inr(selectedStudent.scholarship)}`
                        : "None"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Concession</p>
                    <p className="mt-1 font-medium text-primary">
                      {selectedStudent?.concession
                        ? `−${inr(selectedStudent.concession)}`
                        : "None"}
                    </p>
                  </div>
                </div>

                {/* Instalment rows */}
                {selected.instalments.map((inst) => (
                  <div
                    key={inst.no}
                    className={cn(
                      "rounded-xl border p-4",
                      inst.status === "Overdue"
                        ? "border-destructive/20 bg-destructive/5"
                        : inst.status === "Paid"
                          ? "border-success/20 bg-success/5"
                          : "bg-card",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex size-7 items-center justify-center rounded-full text-sm font-semibold",
                            inst.status === "Overdue"
                              ? "bg-destructive/15 text-destructive"
                              : inst.status === "Paid"
                                ? "bg-success/15 text-success"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {inst.no}
                        </span>
                        <div>
                          <p className="text-sm font-medium">
                            Instalment {inst.no}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Due: {inst.due}
                          </p>
                        </div>
                      </div>
                      <InstalmentStatusBadge status={inst.status} />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">{inr(inst.amount)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Paid</p>
                        <p className="font-medium text-success">
                          {inr(inst.paid)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Balance</p>
                        <p
                          className={cn(
                            "font-medium",
                            inst.amount - inst.paid > 0
                              ? inst.status === "Overdue"
                                ? "text-destructive"
                                : "text-warning"
                              : "text-success",
                          )}
                        >
                          {inr(inst.amount - inst.paid)}
                        </p>
                      </div>
                    </div>
                    {inst.paidOn && (
                      <div className="mt-3 flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
                        <Check className="size-3 text-success" />
                        Paid on {inst.paidOn} via {inst.method}
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="ml-auto"
                          aria-label="Print receipt"
                          onClick={() => {
                            printReceiptPdf({
                              receiptNo: `RCPT-INST-${selected.planId}-${inst.no}`,
                              studentId: selected.studentId,
                              studentName: selectedStudent?.name ?? selected.studentId,
                              programme: selectedStudent?.programme ?? "—",
                              date: inst.paidOn!,
                              amount: inst.paid,
                              method: inst.method!,
                              txnId: `${selected.planId}-INST${inst.no}`,
                            });
                            toast.success("PDF receipt opened — print or save as PDF");
                          }}
                        >
                          <Printer className="size-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex items-start gap-2 rounded-lg bg-secondary p-3 text-sm text-primary">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  Instalment modifications require authenticated human approval.
                  This view is read-only.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ReportsView({ entries }: { entries: AuditEntry[] }) {
  const reports = [
    {
      title: "Outstanding balances",
      description: "Student-level demand, collections and dues",
      download: () =>
        downloadExcel("outstanding-balances", [
          ["Student", "Student ID", "Scholarship", "Concession", "Demand", "Paid", "Outstanding"],
          ...students.map((s) => [
            s.name,
            s.id,
            s.scholarship,
            s.concession,
            s.demand,
            s.paid,
            s.demand - s.paid,
          ]),
        ], "Outstanding Balances"),
    },
    {
      title: "Reconciliation report",
      description: "Gateway and ledger mismatch analysis",
      download: () =>
        downloadExcel("reconciliation-report", [
          ["Transaction", "Gateway", "Ledger", "Difference", "Status"],
          ...transactions.map((t) => [
            t.id,
            t.gateway,
            t.ledger,
            t.gateway - t.ledger,
            t.status,
          ]),
        ], "Reconciliation"),
    },
    {
      title: "Instalment schedules",
      description: "All student instalment plans and payment status",
      download: () =>
        downloadExcel("instalment-schedules", [
          ["Plan", "Student", "Type", "Total demand", "Instalment #", "Due", "Amount", "Paid", "Balance", "Status"],
          ...instalmentPlans.flatMap((p) =>
            p.instalments.map((i) => [
              p.planId,
              p.studentId,
              p.planType,
              p.totalDemand,
              i.no,
              i.due,
              i.amount,
              i.paid,
              i.amount - i.paid,
              i.status,
            ]),
          ),
        ], "Instalments"),
    },
    {
      title: "Audit trail",
      description: "All activity in your current demo session",
      download: () =>
        downloadExcel("audit-trail", [
          ["Time", "User", "Action", "Entity", "Status"],
          ...entries.map((e) => [e.time, e.user, e.action, e.entity, e.status]),
        ], "Audit Trail"),
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => (
          <Card key={report.title} className="panel">
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="size-5 text-primary" />
                  {report.title}
                </span>
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => {
                  report.download();
                  toast.success("Demo report downloaded");
                }}
              >
                <ArrowDownToLine data-icon="inline-start" /> Download Excel (.xlsx)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        <CollectionIntelligence />
        <FeeHeadOverview />
      </div>
      <AuditLog entries={entries} full />
    </div>
  );
}
