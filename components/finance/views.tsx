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
  scholarshipSlabs,
  type ScholarshipSlab,
  type AuditEntry,
  type Student,
  type Transaction,
  type AdmissionMode,
  type AdmissionStatus,
} from "@/lib/finance-data";
import { useLiveFinance } from "@/context/live-finance-context";
import { getInstalments, deriveFeeAndScholarship, getStudentExamEligibility, getStudentDuesBreakdown } from "@/lib/finance-service";
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
  const [statusTab, setStatusTab] = useState<"All" | "Admitted" | "Prospective">("All");
  const [admissionModeFilter, setAdmissionModeFilter] = useState("All Admission Modes");
  const [filter, setFilter] = useState(
    initialOverdue ? "90+ days overdue" : "All students",
  );
  const [branchFilter, setBranchFilter] = useState("All branches");
  const [yearFilter, setYearFilter] = useState("All Years / Batches");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const allAdmissionModes = [
    "All Admission Modes",
    "V-SAT",
    "JEE Mains",
    "EAMCET",
    "Reserved/Lower Caste Category",
    "Special State Status",
    "Management",
  ];

  const allBranches = Array.from(new Set(students.map((s) => s.programme)));
  const allYears = Array.from(new Set(students.map((s) => s.yearLabel || "1st Year (AY 2025-26)"))).filter(Boolean);

  const rows = students.filter(
    (student) =>
      `${student.name} ${student.id} ${student.programme} ${student.admissionMode || ""} ${student.admissionStatus || ""} ${student.yearLabel || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (statusTab === "All" || (student.admissionStatus || "Admitted") === statusTab) &&
      (admissionModeFilter === "All Admission Modes" || (student.admissionMode || "V-SAT") === admissionModeFilter) &&
      (branchFilter === "All branches" || student.programme === branchFilter) &&
      (yearFilter === "All Years / Batches" || (student.yearLabel || "1st Year (AY 2025-26)") === yearFilter) &&
      (filter === "All students" ||
        (filter === "90+ days overdue"
          ? student.overdue > 90
          : filter === "Carried-Forward Dues"
            ? getStudentDuesBreakdown(student.id).hasCarriedForward
            : filter === "Outstanding"
              ? student.demand > student.paid
              : filter === "Exam Ineligible"
                ? !getStudentExamEligibility(student.id).isEligible
                : student.demand === student.paid)),
  );

  const totalPages = Math.ceil(rows.length / pageSize) || 1;
  const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize);

  const admittedCount = students.filter((s) => s.admissionStatus !== "Prospective").length;
  const prospectiveCount = students.filter((s) => s.admissionStatus === "Prospective").length;

  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Student accounts & Admission directory</CardTitle>
        <CardDescription>
          Review {admittedCount} enrolled fee accounts and {prospectiveCount} prospective counseling applicants across {allBranches.length} academic branches.
        </CardDescription>
        <CardAction>
          <Users className="size-5 text-primary" />
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* Admission Status Segregation Tabs */}
        <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-border/60 pb-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">
            Record Section:
          </div>
          <button
            type="button"
            onClick={() => { setStatusTab("All"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusTab === "All"
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "bg-secondary/60 hover:bg-secondary text-muted-foreground"
            }`}
          >
            All Records ({students.length})
          </button>
          <button
            type="button"
            onClick={() => { setStatusTab("Admitted"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              statusTab === "Admitted"
                ? "bg-emerald-600 text-white shadow-sm font-semibold"
                : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
            }`}
          >
            <span>🎓 Admitted (Enrolled)</span>
            <span className="rounded-full bg-emerald-700/30 px-1.5 py-0.2 text-[10px] font-bold">
              {admittedCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => { setStatusTab("Prospective"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              statusTab === "Prospective"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-400"
            }`}
          >
            <span>📋 Prospective / Intending</span>
            <span className="rounded-full bg-purple-700/30 px-1.5 py-0.2 text-[10px] font-bold">
              {prospectiveCount}
            </span>
          </button>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <InputGroup className="h-10 max-w-sm">
            <InputGroupInput
              aria-label="Search students"
              placeholder="Search name, student ID, programme or mode..."
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
              aria-label="Filter by Admission Mode"
              value={admissionModeFilter}
              onChange={(e) => {
                setAdmissionModeFilter(e.target.value);
                setPage(1);
              }}
            >
              {allAdmissionModes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <select
              className="filter-select"
              aria-label="Filter by Year / Batch"
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setPage(1);
              }}
            >
              {["All Years / Batches", ...allYears].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
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
                "Carried-Forward Dues",
                "90+ days overdue",
                "Exam Ineligible",
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
                "Admission Mode",
                "Scholarship",
                "Concession",
                "Demand",
                "Paid",
                "Outstanding",
                "Fee Status",
                "Exam Eligibility",
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
                      <span className="text-sm text-muted-foreground flex flex-wrap items-center gap-1.5">
                        <span>{student.id}</span>
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                          {(student.yearLabel || "1st Year").split(" ")[0]} · Sem {student.semester || 1}
                        </span>
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold border ${
                          student.admissionStatus === "Prospective"
                            ? "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30"
                            : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                        }`}>
                          {student.admissionStatus || "Admitted"}
                        </span>
                      </span>
                    </span>
                  </button>
                </td>
                <td data-label="Programme">{student.programme}</td>
                <td data-label="Admission Mode">
                  <div className="flex flex-col gap-0.5 items-start">
                    <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium bg-secondary text-foreground border border-border/70">
                      {student.admissionMode || "V-SAT"}
                    </span>
                    {student.entranceRank && (
                      <span className="text-[10px] text-muted-foreground truncate max-w-[130px]" title={String(student.entranceRank)}>
                        {student.entranceRank}
                      </span>
                    )}
                  </div>
                </td>
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
                  {(() => {
                    const dues = getStudentDuesBreakdown(student.id);
                    if (dues.hasCarriedForward) {
                      return (
                        <div className="flex flex-col gap-1 items-start">
                          <span className="font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                            {inr(dues.totalOutstandingDue)}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap" title={`Current Sem: ${inr(dues.currentSemesterDue)} + Prior Arrears: ${inr(dues.carriedForwardDue)}`}>
                            Cur: {inr(dues.currentSemesterDue)} + Past: {inr(dues.carriedForwardDue)}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <span className="tabular-nums">
                        {inr(student.demand - student.paid)}
                      </span>
                    );
                  })()}
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
                <td data-label="Exam Eligibility">
                  {(() => {
                    const eligibility = getStudentExamEligibility(student.id);
                    if (eligibility.isEligible) {
                      return (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[11px] font-semibold whitespace-nowrap">
                          ✅ Exam Cleared
                        </Badge>
                      );
                    }
                    if (eligibility.ineligibleCategory === "DuesOnly") {
                      return (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 text-[11px] font-semibold whitespace-nowrap" title={eligibility.primaryReason}>
                          🚫 Dues ({inr(eligibility.outstandingDues)})
                        </Badge>
                      );
                    }
                    if (eligibility.ineligibleCategory === "AttendanceOnly") {
                      return (
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/30 text-[11px] font-semibold whitespace-nowrap" title={eligibility.primaryReason}>
                          🚫 Att ({eligibility.currentAttendance.toFixed(1)}%)
                        </Badge>
                      );
                    }
                    return (
                      <Badge variant="destructive" className="text-[11px] font-semibold whitespace-nowrap" title={eligibility.primaryReason}>
                        🚫 Dues + Att
                      </Badge>
                    );
                  })()}
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
  const [admissionRouteFilter, setAdmissionRouteFilter] = useState("All routes");
  const [selectedSlabMode, setSelectedSlabMode] = useState("All");
  const [calcMode, setCalcMode] = useState<AdmissionMode>("JEE Mains");
  const [calcScoreInput, setCalcScoreInput] = useState("96.5 %ile");

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

  const allAdmissionRoutes = [
    "All routes",
    "V-SAT",
    "JEE Mains",
    "EAMCET",
    "Reserved/Lower Caste Category",
    "Special State Status",
    "Entrance / ICET",
    "GATE / PGECET",
    "Management",
  ];

  const filtered = feeStructures.filter((row) => {
    const matchesProg = programme === "All programmes" || row.programme === programme;
    const matchesVer =
      version === "All versions" ||
      (version === "Active versions" ? row.active : !row.active);
    const matchesRoute =
      admissionRouteFilter === "All routes" ||
      row.route === admissionRouteFilter ||
      row.route.toLowerCase().includes(admissionRouteFilter.toLowerCase()) ||
      (admissionRouteFilter === "V-SAT" && (row.route === "V-SAT" || row.route.includes("V-SAT"))) ||
      (admissionRouteFilter === "JEE Mains" && (row.route === "JEE Mains" || row.route.includes("JEE"))) ||
      (admissionRouteFilter === "EAMCET" && (row.route === "EAMCET" || row.route.includes("EAMCET"))) ||
      (admissionRouteFilter === "Reserved/Lower Caste Category" && (row.route === "Reserved/Lower Caste Category" || row.category.includes("Welfare") || row.category.includes("Reserved"))) ||
      (admissionRouteFilter === "Special State Status" && (row.route === "Special State Status" || row.route.includes("Special State"))) ||
      (admissionRouteFilter === "Entrance / ICET" && (row.route === "Entrance / ICET" || row.route.includes("ICET"))) ||
      (admissionRouteFilter === "GATE / PGECET" && (row.route === "GATE / PGECET" || row.route.includes("GATE"))) ||
      (admissionRouteFilter === "Management" && row.route === "Management");
    const matchesSearch =
      !searchHead ||
      row.head.toLowerCase().includes(searchHead.toLowerCase()) ||
      row.category.toLowerCase().includes(searchHead.toLowerCase()) ||
      row.route.toLowerCase().includes(searchHead.toLowerCase());
    return matchesProg && matchesVer && matchesRoute && matchesSearch;
  });

  // Calculate summary metrics for active selected programme and route
  const activeProgrammeRows = feeStructures.filter((row) => {
    const matchProg = programme === "All programmes" ? row.active : row.programme === programme && row.active;
    const matchRoute =
      admissionRouteFilter === "All routes"
        ? row.route === "V-SAT" ||
          row.route === "Entrance / ICET" ||
          row.route === "GATE / PGECET" ||
          row.route === "Merit / Direct" ||
          row.route === "EAMCET"
        : row.route === admissionRouteFilter || row.route.toLowerCase().includes(admissionRouteFilter.toLowerCase());
    return matchProg && matchRoute;
  });
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

        {/* Master Scholarship Slab Policy Table (Rule Table) */}
        <div className="mb-6 rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3 mb-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                <span>🏛️ Master Scholarship Slab Policy</span>
                <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30">
                  Single Source of Truth Rule Table
                </Badge>
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Official institutional multi-tier tuition waiver slabs per admission route. Auto-derived against {programme === "All programmes" ? "B.Tech CSE" : programme} base tuition ({inr(tuitionAmount || 90000)}).
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Active Policy:</span>
              <Badge variant="secondary" className="text-xs font-semibold">AY 2026–27 Verified</Badge>
            </div>
          </div>

          {/* Slab Mode Filter Tabs */}
          <div className="mb-3 flex flex-wrap gap-1.5 border-b border-border/40 pb-3">
            {[
              { id: "All", label: "All Slabs", count: scholarshipSlabs.length },
              { id: "V-SAT", label: "V-SAT", count: scholarshipSlabs.filter(s => s.admissionMode === "V-SAT").length },
              { id: "JEE Mains", label: "JEE Mains", count: scholarshipSlabs.filter(s => s.admissionMode === "JEE Mains").length },
              { id: "EAMCET", label: "EAMCET", count: scholarshipSlabs.filter(s => s.admissionMode === "EAMCET").length },
              { id: "Reserved/Lower Caste Category", label: "Reserved Category", count: scholarshipSlabs.filter(s => s.admissionMode === "Reserved/Lower Caste Category").length },
              { id: "Special State Status", label: "Special State", count: scholarshipSlabs.filter(s => s.admissionMode === "Special State Status").length },
              { id: "PG", label: "GATE & ICET", count: scholarshipSlabs.filter(s => s.admissionMode === "GATE / PGECET" || s.admissionMode === "ICET").length },
            ].map((tab) => {
              const active = selectedSlabMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedSlabMode(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded-full ${active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slab Table */}
          <div className="rounded-lg border border-border/70 overflow-hidden mb-4">
            <table className="w-full text-xs data-table mobile-cards">
              <thead className="bg-muted/60 text-muted-foreground border-b border-border/60">
                <tr>
                  <th className="py-2.5 px-3 text-left">Admission Mode</th>
                  <th className="py-2.5 px-3 text-left">Tier Name</th>
                  <th className="py-2.5 px-3 text-left">Score / Rank Criteria</th>
                  <th className="py-2.5 px-3 text-center">Tuition Waiver</th>
                  <th className="py-2.5 px-3 text-right">Tuition Relief (₹)</th>
                  <th className="py-2.5 px-3 text-right">Net Payable Demand (₹)</th>
                  <th className="py-2.5 px-3 text-left">Statutory Policy Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {scholarshipSlabs
                  .filter((slab) => {
                    if (selectedSlabMode === "All") return true;
                    if (selectedSlabMode === "PG") return slab.admissionMode === "GATE / PGECET" || slab.admissionMode === "ICET";
                    return slab.admissionMode === selectedSlabMode;
                  })
                  .map((slab) => {
                    const activeProg = programme === "All programmes" ? "B.Tech CSE" : programme;
                    const progTuition = tuitionAmount || 90000;
                    const progPackage = totalPackageAmount || 140000;
                    const waiverAmt = Math.round((progTuition * slab.waiverPercent) / 100);
                    const netPay = Math.max(0, progPackage - waiverAmt);
                    return (
                      <tr key={slab.id} className="hover:bg-muted/30 transition-colors">
                        <td data-label="Admission Mode" className="font-semibold text-foreground">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium bg-secondary border border-border/60">
                            {slab.admissionMode}
                          </span>
                        </td>
                        <td data-label="Tier Name" className="font-medium text-foreground">
                          {slab.tierName}
                        </td>
                        <td data-label="Criteria" className="font-semibold text-primary">
                          {slab.criteriaLabel}
                        </td>
                        <td data-label="Waiver %" className="text-center font-bold">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                              slab.waiverPercent === 100
                                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                                : slab.waiverPercent >= 50
                                ? "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                                : slab.waiverPercent > 0
                                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {slab.waiverPercent}% Waiver
                          </span>
                        </td>
                        <td data-label="Tuition Relief" className="text-right font-medium text-emerald-600">
                          {waiverAmt > 0 ? `−${inr(waiverAmt)}` : "—"}
                        </td>
                        <td data-label="Net Payable Demand" className="text-right font-bold text-foreground">
                          {inr(netPay)}
                        </td>
                        <td data-label="Description" className="text-muted-foreground text-[11px] max-w-xs">
                          {slab.description}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Interactive Live Derivation Tester */}
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <span>⚡ Live Derivation Tester:</span>
              </span>
              <select
                className="filter-select text-xs h-8"
                aria-label="Calculator Mode"
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as AdmissionMode)}
              >
                {["JEE Mains", "V-SAT", "EAMCET", "Reserved/Lower Caste Category", "Special State Status", "GATE / PGECET", "ICET"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input
                type="text"
                className="h-8 px-2.5 rounded-md border border-border/80 bg-background text-xs w-32 focus:outline-hidden focus:ring-1 focus:ring-primary"
                placeholder="Score (e.g. 96.5 %ile, 142)"
                value={calcScoreInput}
                onChange={(e) => setCalcScoreInput(e.target.value)}
              />
            </div>
            {(() => {
              const testProg = programme === "All programmes" ? "B.Tech CSE" : programme;
              const result = deriveFeeAndScholarship(testProg, calcMode, calcScoreInput);
              return (
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-muted-foreground">
                    Matched Tier: <strong className="text-foreground">{result.matchedSlab.tierName}</strong>
                  </span>
                  <span className="text-muted-foreground">
                    Waiver: <strong className="text-emerald-600">{result.slabPercent}% (−{inr(result.scholarshipAmount)})</strong>
                  </span>
                  <span className="text-muted-foreground">
                    Net Demand: <strong className="text-primary text-sm font-bold">{inr(result.netPayable)}</strong>
                  </span>
                </div>
              );
            })()}
          </div>
        </div>

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
              aria-label="Filter by admission route"
              value={admissionRouteFilter}
              onChange={(e) => setAdmissionRouteFilter(e.target.value)}
            >
              {allAdmissionRoutes.map((r) => (
                <option key={r} value={r}>
                  {r}
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
          ["Student", "Student ID", "Cohort / Year", "Semester", "Section", "Programme", "Scholarship", "Concession", "Demand", "Paid", "Outstanding"],
          ...students.map((s) => [
            s.name,
            s.id,
            s.yearLabel || "1st Year (AY 2025-26)",
            s.semester || 1,
            s.section || 1,
            s.programme,
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
