"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  FileSpreadsheet,
  Search,
  ShieldCheck,
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
  downloadCsv,
  feeStructures,
  inr,
  students,
  transactions,
  type AuditEntry,
  type Student,
  type Transaction,
} from "@/lib/finance-data";
import { Status, AuditLog } from "./operations";
import { CollectionIntelligence, FeeHeadOverview } from "./overview";
import { toast } from "sonner";

type OnExport = (report: string) => void;

export function StudentsView({
  onStudent,
  onExport,
  initialOverdue = false,
}: {
  onStudent: (student: Student) => void;
  onExport: OnExport;
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
          <Button variant="outline" disabled={!rows.length} onClick={() => {
            downloadCsv("student-accounts-DEMO.csv", [
              ["Student", "Student ID", "Programme", "Demand", "Paid", "Outstanding", "Days overdue"],
              ...rows.map((student) => [student.name, student.id, student.programme, student.demand, student.paid, student.demand - student.paid, student.overdue]),
            ]);
            onExport("Filtered student accounts");
            toast.success("Filtered demo accounts exported");
          }}>
            <ArrowDownToLine data-icon="inline-start" /> Export
          </Button>
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

export function FeeStructureView({ onExport }: { onExport: OnExport }) {
  const [programme, setProgramme] = useState("All programmes");
  const [version, setVersion] = useState("Active versions");
  const [year, setYear] = useState("All academic years");
  const [head, setHead] = useState("All fee heads");
  const filtered = feeStructures.filter(
    (row) =>
      (programme === "All programmes" || row.programme === programme) &&
      (year === "All academic years" || row.year === year) &&
      (head === "All fee heads" || row.head === head) &&
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
          <Button variant="outline" disabled={!filtered.length} onClick={() => {
            downloadCsv("fee-structures-DEMO.csv", [
              ["Programme", "Academic year", "Category", "Admission route", "Fee head", "Amount", "Effective from", "Version", "Status"],
              ...filtered.map((row) => [row.programme, row.year, row.category, row.route, row.head, row.amount, row.effective, row.version, row.active ? "Active" : "Archived"]),
            ]);
            onExport("Filtered fee structures");
            toast.success("Filtered demo fee structures exported");
          }}>
            <ArrowDownToLine data-icon="inline-start" /> Export
          </Button>
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
            aria-label="Structure academic year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          >
            {["All academic years", ...new Set(feeStructures.map((row) => row.year))].map((option) => <option key={option}>{option}</option>)}
          </select>
          <select className="filter-select" aria-label="Structure fee head" value={head} onChange={(event) => setHead(event.target.value)}>
            {["All fee heads", ...new Set(feeStructures.map((row) => row.head))].map((option) => <option key={option}>{option}</option>)}
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
  onExport,
}: {
  onReview: (transaction: Transaction) => void;
  onExport: OnExport;
}) {
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("All methods");
  const [status, setStatus] = useState("All statuses");
  const rows = transactions.filter(
    (t) =>
      (status === "All statuses" || t.status === status) &&
      (method === "All methods" || t.method === method) &&
      `${t.id} ${t.student}`.toLowerCase().includes(query.toLowerCase()),
  );
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
              downloadCsv("payments-DEMO.csv", [
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
              ]);
              onExport("Filtered payments");
              toast.success("Filtered demo payments exported");
            }}
          >
            <ArrowDownToLine data-icon="inline-start" /> Export
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
            aria-label="Payment status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {["All statuses", "Matched", "Mismatch"].map((option) => <option key={option}>{option}</option>)}
          </select>
          <select
            className="filter-select"
            aria-label="Payment method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            {["All methods", "UPI", "Net banking", "Debit card"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
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
                <td data-label="Method">{t.method}</td>
                <td data-label="Status">
                  <span>
                    <Status status={t.status} />
                  </span>
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
      </CardContent>
    </Card>
  );
}

export function ReportsView({ entries, onExport }: { entries: AuditEntry[]; onExport: OnExport }) {
  const reports = [
    {
      title: "Outstanding balances",
      description: "Student-level demand, collections and dues",
      download: () =>
        downloadCsv("outstanding-DEMO.csv", [
          ["Student", "Student ID", "Demand", "Paid", "Outstanding"],
          ...students.map((s) => [
            s.name,
            s.id,
            s.demand,
            s.paid,
            s.demand - s.paid,
          ]),
        ]),
    },
    {
      title: "Reconciliation report",
      description: "Gateway and ledger mismatch analysis",
      download: () =>
        downloadCsv("reconciliation-DEMO.csv", [
          ["Transaction", "Gateway", "Ledger", "Difference", "Status"],
          ...transactions.map((t) => [
            t.id,
            t.gateway,
            t.ledger,
            t.gateway - t.ledger,
            t.status,
          ]),
        ]),
    },
    {
      title: "Audit trail",
      description: "All activity in your current demo session",
      download: () =>
        downloadCsv("audit-DEMO.csv", [
          ["Time", "User", "Action", "Entity", "Status"],
          ...entries.map((e) => [e.time, e.user, e.action, e.entity, e.status]),
        ]),
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 md:grid-cols-3">
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
                  onExport(report.title);
                  toast.success("Demo report downloaded");
                }}
              >
                <ArrowDownToLine data-icon="inline-start" /> Download CSV
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
