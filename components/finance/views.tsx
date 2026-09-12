"use client";

import { useState, useMemo } from "react";
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
  type AuditEntry,
  type Student,
  type Transaction,
} from "@/lib/finance-data";
import { useLiveFinance } from "@/context/live-finance-context";
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
  const { students } = useLiveFinance();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(
    initialOverdue ? "90+ days overdue" : "All students",
  );
  const [branchFilter, setBranchFilter] = useState("All branches");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const allBranches = Array.from(new Set(students.map((s) => s.programme)));

  const rows = students.filter(
    (student) =>
      `${student.name} ${student.id} ${student.programme}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (branchFilter === "All branches" || student.programme === branchFilter) &&
      (filter === "All students" ||
        (filter === "90+ days overdue"
          ? student.overdue > 90
          : filter === "Outstanding"
            ? student.demand > student.paid
            : student.demand === student.paid)),
  );

  const totalPages = Math.ceil(rows.length / pageSize) || 1;
  const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Student accounts</CardTitle>
        <CardDescription>
          Search and review {students.length} individual fee accounts across {allBranches.length} academic branches.
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="filter-select"
              aria-label="Filter by branch"
              value={branchFilter}
              onChange={(e) => {
                setBranchFilter(e.target.value);
                setPage(1);
              }}
            >
              {["All branches", ...allBranches].map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <select
              className="filter-select"
              aria-label="Student account filter"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
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
        </div>
        <div className="text-xs text-muted-foreground mb-3 flex items-center justify-between">
          <span>Showing {paginatedRows.length} of {rows.length} students {branchFilter !== "All branches" ? `(${branchFilter})` : ""}</span>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </Button>
              <span>Page {page} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
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
            {paginatedRows.map((student) => (
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
          Showing {rows.length} of {students.length} student accounts · Click a student to view
          their itemized fee statement.
        </p>
      </CardContent>
    </Card>
  );
}

export function FeeStructureView() {
  const { students } = useLiveFinance();
  const [programme, setProgramme] = useState("All programmes");
  const [version, setVersion] = useState("Active versions");
  const [searchHead, setSearchHead] = useState("");

  const allAvailableProgrammes = [
    "All programmes",
    "MBA",
    "B.Tech CSE",
    "B.Tech ECE",
    "B.Tech IT",
    "B.Tech EEE",
    "B.Tech Mechanical",
    "B.Tech Civil",
    "Biotechnology",
    "B.Pharmacy",
    "M.Tech",
    "BBA",
  ];

  const filtered = feeStructures.filter((row) => {
    const matchesProg = programme === "All programmes" || row.programme === programme;
    const matchesVer =
      version === "All versions" ||
      (version === "Active versions" ? row.active : !row.active);
    const matchesSearch =
      !searchHead ||
      row.head.toLowerCase().includes(searchHead.toLowerCase()) ||
      row.category.toLowerCase().includes(searchHead.toLowerCase()) ||
      row.route.toLowerCase().includes(searchHead.toLowerCase());
    return matchesProg && matchesVer && matchesSearch;
  });

  // Calculate summary metrics for active selected programme
  const activeProgrammeRows = feeStructures.filter(
    (row) => (programme === "All programmes" ? row.active : row.programme === programme && row.active)
  );
  const totalPackageAmount = activeProgrammeRows.reduce((sum, r) => sum + r.amount, 0);
  const tuitionAmount = activeProgrammeRows.filter((r) => r.head === "Tuition").reduce((sum, r) => sum + r.amount, 0);
  const hostelAmount = activeProgrammeRows.filter((r) => r.head === "Hostel").reduce((sum, r) => sum + r.amount, 0);
  const examAmount = activeProgrammeRows.filter((r) => r.head === "Examination").reduce((sum, r) => sum + r.amount, 0);
  const labAndLibrary = activeProgrammeRows
    .filter((r) => r.head === "Laboratory" || r.head === "Library")
    .reduce((sum, r) => sum + r.amount, 0);
  const otherHeads = activeProgrammeRows
    .filter((r) => !["Tuition", "Hostel", "Examination", "Laboratory", "Library"].includes(r.head))
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏛️ Approved Institutional Fee Structures & Head Segregation</span>
        </CardTitle>
        <CardDescription>
          Comprehensive fee schedules across all degree programmes with head-wise segregation (Tuition, Hostel, Examination, Labs, Library & Logistics).
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">AY 2026–27 Verified</Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        {/* Quick Programme Selector Tabs/Pills */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Select Degree Programme to View Full Fee Segregation:
          </div>
          <div className="flex flex-wrap gap-2">
            {allAvailableProgrammes.map((p) => {
              const isSelected = programme === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProgramme(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm font-semibold"
                      : "bg-secondary/40 text-foreground/80 hover:bg-secondary border-border/60"
                  }`}
                >
                  <span>{p}</span>
                  {p === "MBA" && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? "bg-primary-foreground/20 text-white" : "bg-primary/10 text-primary font-bold"}`}>
                      Postgrad
                    </span>
                  )}
                  {p === "B.Tech CSE" && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? "bg-primary-foreground/20 text-white" : "bg-emerald-500/10 text-emerald-600 font-bold"}`}>
                      Popular
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Programme Summary KPI Banner (When a specific programme is tapped) */}
        {programme !== "All programmes" && (
          <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3 mb-3">
              <div>
                <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                  <span>🎓 {programme}</span>
                  <Badge variant="outline" className="bg-background text-xs">
                    AY 2026–27 Schedule
                  </Badge>
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Complete annual fee package with mandatory and residential head segregation.
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground font-medium">Total Annual Package</div>
                <div className="text-xl font-extrabold text-primary">{inr(totalPackageAmount)}</div>
              </div>
            </div>

            {/* Head Breakdown KPI Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
              <div className="rounded-lg bg-background/80 p-2.5 border border-border/50">
                <div className="text-[11px] text-muted-foreground font-medium">Core Tuition</div>
                <div className="text-sm font-bold text-foreground mt-0.5">{inr(tuitionAmount)}</div>
                <div className="text-[10px] text-muted-foreground">
                  {totalPackageAmount > 0 ? `${Math.round((tuitionAmount / totalPackageAmount) * 100)}% of total` : ""}
                </div>
              </div>

              <div className="rounded-lg bg-background/80 p-2.5 border border-border/50">
                <div className="text-[11px] text-muted-foreground font-medium">Hostel & Boarding</div>
                <div className="text-sm font-bold text-violet-600 mt-0.5">{inr(hostelAmount)}</div>
                <div className="text-[10px] text-muted-foreground">Annual AC/Non-AC</div>
              </div>

              <div className="rounded-lg bg-background/80 p-2.5 border border-border/50">
                <div className="text-[11px] text-muted-foreground font-medium">Examination Fee</div>
                <div className="text-sm font-bold text-amber-600 mt-0.5">{inr(examAmount)}</div>
                <div className="text-[10px] text-muted-foreground">2 Semesters</div>
              </div>

              <div className="rounded-lg bg-background/80 p-2.5 border border-border/50">
                <div className="text-[11px] text-muted-foreground font-medium">Lab & Library</div>
                <div className="text-sm font-bold text-blue-600 mt-0.5">{inr(labAndLibrary)}</div>
                <div className="text-[10px] text-muted-foreground">E-Journals & Consumables</div>
              </div>

              <div className="rounded-lg bg-background/80 p-2.5 border border-border/50">
                <div className="text-[11px] text-muted-foreground font-medium">Transport & Other</div>
                <div className="text-sm font-bold text-emerald-600 mt-0.5">{inr(otherHeads)}</div>
                <div className="text-[10px] text-muted-foreground">Campus Transit & Reg.</div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="filter-select text-xs"
              aria-label="Fee structure programme"
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
            >
              {allAvailableProgrammes.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>

            <select
              className="filter-select text-xs"
              aria-label="Structure versions"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            >
              {["Active versions", "All versions", "Archived versions"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-64">
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-3.5 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search head (e.g. Tuition, Hostel)..."
                value={searchHead}
                onChange={(e) => setSearchHead(e.target.value)}
                className="text-xs h-8"
              />
            </InputGroup>
          </div>
        </div>

        {/* Segregated Fee Breakdown Table */}
        <table className="data-table mobile-cards">
          <thead>
            <tr>
              {[
                "Programme",
                "Academic Year",
                "Category",
                "Admission Route",
                "Fee Head",
                "Amount",
                "Effective Date",
                "Status",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td data-label="Programme" className="font-semibold text-foreground">
                  {row.programme}
                </td>
                <td data-label="Academic Year" className="text-muted-foreground">
                  {row.year}
                </td>
                <td data-label="Category">
                  <Badge variant="outline" className="text-xs font-normal">
                    {row.category}
                  </Badge>
                </td>
                <td data-label="Admission Route" className="text-xs text-muted-foreground">
                  {row.route}
                </td>
                <td data-label="Fee Head" className="font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    {row.head === "Tuition" && "🎓"}
                    {row.head === "Hostel" && "🏠"}
                    {row.head === "Examination" && "📝"}
                    {row.head === "Laboratory" && "🔬"}
                    {row.head === "Library" && "📚"}
                    {row.head === "Transport" && "🚌"}
                    {row.head === "Registration" && "📋"}
                    {row.head === "Placement & Alumni" && "💼"}
                    <span className="font-medium">{row.head}</span>
                  </span>
                </td>
                <td data-label="Amount" className="font-bold text-foreground">
                  {inr(row.amount)}
                </td>
                <td data-label="Effective Date" className="text-xs text-muted-foreground">
                  {row.effective}
                </td>
                <td data-label="Status">
                  <Badge variant={row.active ? "secondary" : "outline"} className="text-xs">
                    {row.version}
                    {!row.active && " · Archived"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
          {filtered.length > 0 && programme !== "All programmes" && (
            <tfoot>
              <tr className="bg-muted/40 font-bold border-t-2 border-border">
                <td colSpan={5} className="text-right py-3 pr-4 font-bold text-foreground">
                  Total {programme} Segregated Fee Package:
                </td>
                <td className="py-3 font-extrabold text-primary text-base">
                  {inr(filtered.reduce((sum, r) => sum + r.amount, 0))}
                </td>
                <td colSpan={2} className="py-3 text-xs text-muted-foreground">
                  ({filtered.length} Segregated Heads)
                </td>
              </tr>
            </tfoot>
          )}
        </table>

        {!filtered.length && (
          <div className="py-12 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No fee structures match the selected filter criteria.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-xs"
              onClick={() => {
                setProgramme("All programmes");
                setVersion("Active versions");
                setSearchHead("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}

        <div className="mt-5 flex items-start gap-2 rounded-lg bg-secondary/50 p-4 text-xs leading-relaxed text-muted-foreground border border-border/50">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>
            <strong>Bylaw Clause 4.2 Notice:</strong> All published fee structures are officially verified by the University Fee Regulatory Committee for AY 2026–27. Partial student payments are automatically apportioned in priority order: Tuition $\rightarrow$ Examination $\rightarrow$ Library $\rightarrow$ Laboratory $\rightarrow$ Transport $\rightarrow$ Hostel & Mess.
          </span>
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
  const { students, transactions } = useLiveFinance();
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("All methods");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const studentMap = useMemo(() => {
    const map = new Map<string, Student>();
    for (const s of students) map.set(s.id, s);
    return map;
  }, [students]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => {
      if (method !== "All methods" && t.method !== method) return false;
      if (statusFilter !== "All statuses" && t.status !== statusFilter) return false;
      if (!q) return true;

      const student = studentMap.get(t.student);
      const studentName = student?.name || "";
      const programme = student?.programme || "";
      const searchBlob = `${t.id} ${t.student} ${studentName} ${programme} ${t.method} ${t.status} ${t.date} ${t.gateway} ${t.ledger}`.toLowerCase();
      return searchBlob.includes(q);
    });
  }, [transactions, query, method, statusFilter, studentMap]);

  const totalPages = Math.ceil(rows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    return rows.slice((page - 1) * pageSize, page * pageSize);
  }, [rows, page, pageSize]);

  function handlePrintReceipt(t: Transaction) {
    const student = studentMap.get(t.student);
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

  const totalCollectedInView = rows.reduce((sum: number, t: Transaction) => sum + t.ledger, 0);

  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Payment ledger</CardTitle>
        <CardDescription>
          Complete transaction gateway records &amp; verified ledger allocations across all {students.length} students ({transactions.length} total entries)
        </CardDescription>
        <CardAction>
          <Button
            variant="outline"
            onClick={() => {
              downloadExcel("payments-all-students", [
                [
                  "Transaction",
                  "Student ID",
                  "Student Name",
                  "Programme",
                  "Gateway (INR)",
                  "Ledger (INR)",
                  "Method",
                  "Date",
                  "Status",
                ],
                ...rows.map((t: Transaction) => {
                  const s = studentMap.get(t.student);
                  return [
                    t.id,
                    t.student,
                    s?.name ?? "—",
                    s?.programme ?? "—",
                    t.gateway,
                    t.ledger,
                    t.method,
                    t.date,
                    t.status,
                  ];
                }),
              ], "Payments");
              toast.success("Payments exported as Excel (.xlsx)");
            }}
          >
            <ArrowDownToLine data-icon="inline-start" /> Export Excel (.xlsx)
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* Search & Filter Bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <InputGroup className="h-10 max-w-md w-full">
            <InputGroupInput
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              aria-label="Search payments"
              placeholder="Search by student name, roll number, TXN ID, date..."
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex flex-wrap items-center gap-2">
            <select
              className="filter-select text-xs"
              aria-label="Payment method"
              value={method}
              onChange={(e) => {
                setMethod(e.target.value);
                setPage(1);
              }}
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

            <select
              className="filter-select text-xs"
              aria-label="Transaction status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              {["All statuses", "Matched", "Mismatch"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Channel summary pills */}
        <div className="mb-4 flex flex-wrap gap-2">
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
                onClick={() => {
                  setMethod(method === label ? "All methods" : label);
                  setPage(1);
                }}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                  color,
                  method === label ? "ring-2 ring-primary/40 shadow-xs" : "opacity-85 hover:opacity-100",
                )}
              >
                {label} · {count} txns · {inr(total)}
              </button>
            );
          })}
        </div>

        {/* Pagination & Count Header */}
        <div className="text-xs text-muted-foreground mb-3 flex flex-wrap items-center justify-between gap-2">
          <span>
            Showing <strong>{paginatedRows.length}</strong> of <strong>{rows.length}</strong> transactions · Total Ledger Volume: <strong>{inr(totalCollectedInView)}</strong>
          </span>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </Button>
              <span>Page {page} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        <table className="data-table mobile-cards">
          <thead>
            <tr>
              {[
                "Transaction",
                "Student",
                "Programme",
                "Date",
                "Gateway",
                "Ledger",
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
            {paginatedRows.map((t: Transaction, index: number) => {
              const student = studentMap.get(t.student);
              return (
                <tr key={`${t.id}-${index}`} className="hover:bg-muted/30 transition-colors">
                  <td data-label="Transaction" className="font-mono text-xs font-semibold text-primary">
                    {t.id}
                  </td>
                  <td data-label="Student">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-primary">
                        {student?.initials || t.student.slice(-2)}
                      </span>
                      <div>
                        <div className="font-medium text-foreground text-xs leading-tight">
                          {student?.name || t.student}
                        </div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {t.student}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Programme" className="text-xs text-muted-foreground">
                    {student?.programme || "—"}
                  </td>
                  <td data-label="Date" className="text-xs text-muted-foreground whitespace-nowrap">
                    {t.date}
                  </td>
                  <td data-label="Gateway" className="tabular-nums text-xs font-medium">
                    {inr(t.gateway)}
                  </td>
                  <td data-label="Ledger" className="tabular-nums text-xs font-bold text-foreground">
                    {inr(t.ledger)}
                  </td>
                  <td data-label="Method">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      {t.method === "Bank transfer" && (
                        <span className="size-1.5 rounded-full bg-warning" />
                      )}
                      {t.method === "Counter collection" && (
                        <span className="size-1.5 rounded-full bg-destructive" />
                      )}
                      {t.method === "UPI" && (
                        <span className="size-1.5 rounded-full bg-primary" />
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
                      <Printer className="size-3.5 text-muted-foreground hover:text-primary" />
                    </Button>
                  </td>
                  <td data-label="Details">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Review ${t.id}`}
                      onClick={() => onReview(t)}
                    >
                      <ArrowUpRight className="size-3.5 text-muted-foreground hover:text-primary" />
                    </Button>
                  </td>
                </tr>
              );
            })}
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
  const { students } = useLiveFinance();
  const [selectedId, setSelectedId] = useState<string | null>("251FA04E03");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPlanType, setFilterPlanType] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filteredPlans = useMemo(() => {
    return instalmentPlans.filter((p) => {
      const student = students.find((s) => s.id === p.studentId);
      if (filterPlanType !== "All" && p.planType !== filterPlanType) return false;
      if (filterStatus !== "All" && !p.instalments.some((i) => i.status === filterStatus)) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesId = p.studentId.toLowerCase().includes(q);
        const matchesPlan = p.planId.toLowerCase().includes(q);
        const matchesName = student?.name.toLowerCase().includes(q);
        if (!matchesId && !matchesPlan && !matchesName) return false;
      }
      return true;
    });
  }, [students, filterPlanType, filterStatus, search]);

  const totalPages = Math.ceil(filteredPlans.length / pageSize) || 1;
  const paginatedPlans = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPlans.slice(start, start + pageSize);
  }, [filteredPlans, page, pageSize]);

  const selected = (selectedId
    ? instalmentPlans.find((p) => p.studentId === selectedId)
    : filteredPlans[0]) ?? null;
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
  const splitPlansCount = instalmentPlans.filter((p) => p.planType !== "Lump-sum").length;

  return (
    <div className="flex flex-col gap-5">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Active plans",
            value: instalmentPlans.length,
            unit: "institutional students",
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
            value: splitPlansCount,
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
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>
                  <span className="flex items-center gap-2">
                    <CalendarClock className="size-4 text-primary" />
                    Instalment plans
                  </span>
                </CardTitle>
                <CardDescription>
                  {filteredPlans.length} active plans · AY 2026–27
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  className="filter-select text-xs"
                  aria-label="Filter by plan type"
                  value={filterPlanType}
                  onChange={(e) => {
                    setFilterPlanType(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="All">All Types</option>
                  <option value="3-Instalment Plan">3-Instalment</option>
                  <option value="2-Instalment Plan">2-Instalment</option>
                  <option value="Lump-sum">Lump-sum</option>
                </select>
                <select
                  className="filter-select text-xs"
                  aria-label="Filter by instalment status"
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <InputGroup className="w-full">
                <InputGroupAddon>
                  <Search className="size-3.5 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Search by student name, roll number, or plan ID..."
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
            <div className="flex flex-col gap-2.5">
              {paginatedPlans.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No instalment plans match your search or filter.
                </div>
              ) : (
                paginatedPlans.map((plan) => {
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
                  const isSelected = selected?.studentId === plan.studentId;
                  return (
                    <button
                      key={plan.planId}
                      onClick={() => setSelectedId(plan.studentId)}
                      className={cn(
                        "rounded-xl border p-3.5 text-left transition-all hover:border-primary/40",
                        isSelected
                          ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                          : "bg-card hover:bg-muted/30",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm leading-snug">{student?.name ?? plan.studentId}</p>
                          <p className="text-xs text-muted-foreground">
                            {plan.studentId} · {plan.planType}
                          </p>
                        </div>
                        {hasOverdue ? (
                          <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/5 text-[11px] px-1.5 py-0">
                            Overdue
                          </Badge>
                        ) : pct >= 100 ? (
                          <Badge variant="outline" className="text-success border-success/30 bg-success/5 text-[11px] px-1.5 py-0">
                            100% Paid
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[11px] px-1.5 py-0">{pct}% paid</Badge>
                        )}
                      </div>
                      <div className="mt-2.5">
                        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                          <span>{inr(paid)} paid</span>
                          <span>{inr(plan.totalDemand)} total</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              pct >= 100 ? "bg-success" : hasOverdue ? "bg-destructive/80" : "bg-primary",
                            )}
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Pagination footer */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                <span>
                  Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredPlans.length)} of {filteredPlans.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2.5 text-xs"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </Button>
                  <span className="px-1 font-medium text-foreground">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2.5 text-xs"
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
  const { students, transactions } = useLiveFinance();
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
