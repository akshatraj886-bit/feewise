"use client";

import { useState, useEffect, useMemo } from "react";
import {
  getSqlDatabaseState,
  downloadSqlFile,
  resetSqlDatabase,
  type ReminderDispatch,
  type ScholarshipRenewalRisk,
  type LoanDocumentRequest,
  type SqlDatabaseState,
} from "@/lib/sql-store";
import { getSmartRemindersAction, dispatchFeeReminderAction, getScholarshipRisksAction, getLoanRequestsAction, issueLoanDocumentAction } from "@/backend/actions/more-modules";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  ShieldAlert,
  ShieldCheck,
  BellRing,
  Download,
  FileCheck,
  Clock,
  Building2,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  Database,
  RotateCcw,
  CheckCircle2,
  Send,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { openPrintDocument, students, inr } from "@/lib/finance-data";
import { computeScholarshipEligibilityTimeline, getStudentExamEligibility } from "@/lib/finance-service";
import { DocumentViewerModal } from "@/components/finance/document-viewer-modal";
import { type FinanceDocType } from "@/lib/finance-documents";

// =========================================================================
// 1. SMART REMINDER DISPATCH ENGINE (With Organizer Policy Auto-Suppression)
// =========================================================================
export function SmartRemindersView() {
  const [reminders, setReminders] = useState<ReminderDispatch[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("251FA04E03");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Suppressed" | "Delivered">("All");
  const [filterSegment, setFilterSegment] = useState<string>("All");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  async function reload() {
    setReminders(await getSmartRemindersAction());
  }

  useEffect(() => {
    reload();
    // window.addEventListener("feewise_sql_store_updated", reload);
    // return () => window.removeEventListener("feewise_sql_store_updated", reload);
  }, []);

  async function handleDispatch() {
    const res = await dispatchFeeReminderAction(selectedStudentId);
    if (res.suppressed) {
      toast.info("Reminder Auto-Suppressed by Policy!", {
        description: res.suppression_reason,
      });
    } else {
      toast.success("Fee Reminder Dispatched Successfully", {
        description: `Sent via ${res.channel} to ${res.student_name}`,
      });
    }
    reload();
  }

  const suppressedCount = reminders.filter((r) => r.suppressed).length;
  const deliveredCount = reminders.filter((r) => !r.suppressed).length;
  const suppressionRate = reminders.length
    ? Math.round((suppressedCount / reminders.length) * 100)
    : 0;

  const filteredReminders = useMemo(() => {
    return reminders.filter((r) => {
      if (filterStatus === "Suppressed" && !r.suppressed) return false;
      if (filterStatus === "Delivered" && r.suppressed) return false;
      if (filterSegment !== "All" && r.segment !== filterSegment) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = r.student_name.toLowerCase().includes(q);
        const matchesId = r.student_id.toLowerCase().includes(q);
        const matchesRef = r.message_ref.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesRef) return false;
      }
      return true;
    });
  }, [reminders, filterStatus, filterSegment, search]);

  const totalPages = Math.ceil(filteredReminders.length / pageSize) || 1;
  const paginatedReminders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredReminders.slice(start, start + pageSize);
  }, [filteredReminders, page, pageSize]);

  return (
    <div className="flex flex-col gap-6">
      {/* Hackathon SQL Highlight Alert */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          <ShieldCheck className="size-5 shrink-0 text-primary mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>finance.reminder_dispatch &middot; Policy Suppression Engine</span>
              <Badge variant="outline" className="bg-background text-[11px] font-mono">
                SQL Rule Implemented
              </Badge>
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Organizer Requirement:</strong>{" "}
              <em>
                &ldquo;Reminders MUST be suppressed where a sanctioned scholarship or approved
                installment plan covers the dues. This is the most common cause of avoidable distress
                in fee follow-up.&rdquo;
              </em>
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Dispatches</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-primary">
            {reminders.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">in ledger audit</p>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Auto-Suppressed</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-emerald-600">
            {suppressedCount}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">distress prevented</p>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Delivered Follow-ups</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-amber-600">
            {deliveredCount}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">persistent &amp; forgotten dues</p>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Suppression Rate</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-violet-600">
            {suppressionRate}%
          </p>
          <p className="mt-1 text-xs text-muted-foreground">policy compliance</p>
        </div>
      </div>

      {/* Action Bar: Evaluate & Dispatch */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-xl border">
        <div className="flex items-center gap-3">
          <BellRing className="size-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm">Proactive Reminder Evaluation</h3>
            <p className="text-xs text-muted-foreground">
              Simulate dispatch with automated distress-prevention rules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="h-9 rounded-md border bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="251FA04E03">Akshat Raj (Has 3-Instalment Plan)</option>
            <option value="251FA04E58">Meera Iyer (Awaiting Scholarship)</option>
            <option value="251FA04E21">Rohan Mehta (Persistent Dues)</option>
            <option value="251FA04E42">Aarav Desai (Hardship Segment)</option>
            <option value="251FA04645">Dharanikota Aaradhya (₹50k Due / 2-Instalment)</option>
            <option value="251FA04863">Kolla Yogesh (₹79.5k Due / 2-Instalment)</option>
            <option value="251FA04952">Gurrala Divya (₹1.45L Due / Lump-sum)</option>
          </select>
          <Button size="sm" onClick={handleDispatch} className="h-9 gap-1.5">
            <Send className="size-3.5" /> Evaluate &amp; Dispatch
          </Button>
        </div>
      </div>

      {/* Reminders Feed */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <span>Reminder Audit &amp; Dispatch Ledger</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {filteredReminders.length} Dispatches
                </Badge>
              </CardTitle>
              <CardDescription>
                Live view of fee reminders dispatched or suppressed in accordance with university policy
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value as any);
                  setPage(1);
                }}
                className="filter-select text-xs"
              >
                <option value="All">All Statuses</option>
                <option value="Suppressed">Auto-Suppressed</option>
                <option value="Delivered">Delivered</option>
              </select>
              <select
                value={filterSegment}
                onChange={(e) => {
                  setFilterSegment(e.target.value);
                  setPage(1);
                }}
                className="filter-select text-xs"
              >
                <option value="All">All Segments</option>
                <option value="ON_PLAN">ON_PLAN</option>
                <option value="AWAITING_SCHOLARSHIP">AWAITING_SCHOLARSHIP</option>
                <option value="PERSISTENT">PERSISTENT</option>
                <option value="HARDSHIP">HARDSHIP</option>
                <option value="FORGOTTEN">FORGOTTEN</option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <InputGroup className="w-full">
              <InputGroupAddon>
                <Search className="size-3.5 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search by student name, roll number, or message ref..."
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
          <div className="divide-y divide-border rounded-lg border overflow-hidden">
            {paginatedReminders.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No reminder dispatches match your search or filter criteria.
              </div>
            ) : (
              paginatedReminders.map((r) => (
                <div
                  key={r.reminder_dispatch_id}
                  className={`p-4 transition-colors ${
                    r.suppressed ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:bg-muted/40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {r.suppressed ? (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                          <ShieldCheck className="size-4" />
                        </span>
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                          <BellRing className="size-4" />
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{r.student_name}</span>
                          <span className="text-xs font-mono text-muted-foreground">({r.student_id})</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Channel: {r.channel} &middot; Ref: {r.message_ref} &middot; Sent: {r.sent_at}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[11px] font-mono uppercase">
                        Segment: {r.segment}
                      </Badge>
                      {r.suppressed ? (
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs">
                          🛡️ Auto-Suppressed
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Delivered
                        </Badge>
                      )}
                    </div>
                  </div>

                  {r.suppression_reason && (
                    <div className="mt-2.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
                      <span>{r.suppression_reason}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
              <span>
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredReminders.length)} of {filteredReminders.length}
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
    </div>
  );
}

// =========================================================================
// 2. SCHOLARSHIP RENEWAL RISK TRACKER (finance.scholarship_renewal_risk)
// =========================================================================
export function ScholarshipRenewalRiskView() {
  const [risks, setRisks] = useState<ScholarshipRenewalRisk[]>([]);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("All");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function reload() {
    setRisks(await getScholarshipRisksAction());
  }

  useEffect(() => {
    reload();
    // window.addEventListener("feewise_sql_store_updated", reload);
    // return () => window.removeEventListener("feewise_sql_store_updated", reload);
  }, []);

  function sendCounselorAlert(studentName: string) {
    toast.success(`Academic counselor alert sent for ${studentName}`, {
      description: "Mentoring session scheduled to safeguard scholarship criteria.",
    });
  }

  const atRiskCount = risks.filter((r) => r.risk_level === "AT_RISK").length;
  const likelyLossCount = risks.filter((r) => r.risk_level === "LIKELY_LOSS").length;
  const watchCount = risks.filter((r) => r.risk_level === "WATCH").length;
  const safeCount = risks.filter((r) => r.risk_level === "NONE").length;

  // Pre-compute expensive per-student data once when risks list changes, not on every render
  const riskMetaMap = useMemo(() => {
    const map = new Map<string, { isDiscontinued: boolean; isExamEligible: boolean }>();
    for (const r of risks) {
      const isDiscontinued = r.cgpa < 7.0 || computeScholarshipEligibilityTimeline(r.student_id).isDiscontinued;
      const isExamEligible = getStudentExamEligibility(r.student_id).isEligible;
      map.set(r.student_id, { isDiscontinued, isExamEligible });
    }
    return map;
  }, [risks]);

  const discontinuedCount = useMemo(() => risks.filter((r) => riskMetaMap.get(r.student_id)?.isDiscontinued).length, [risks, riskMetaMap]);
  const examIneligibleCount = useMemo(() => risks.filter((r) => !riskMetaMap.get(r.student_id)?.isExamEligible).length, [risks, riskMetaMap]);

  const filteredRisks = useMemo(() => {
    return risks.filter((r) => {
      const meta = riskMetaMap.get(r.student_id);
      if (filterLevel === "DISCONTINUED") {
        if (!meta?.isDiscontinued) return false;
      } else if (filterLevel === "EXAM_INELIGIBLE") {
        if (meta?.isExamEligible) return false;
      } else if (filterLevel !== "All") {
        if (r.risk_level !== filterLevel) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = r.student_name.toLowerCase().includes(q);
        const matchesId = r.student_id.toLowerCase().includes(q);
        const matchesProg = r.programme.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesProg) return false;
      }
      return true;
    });
  }, [risks, filterLevel, search, riskMetaMap]);

  const totalPages = Math.ceil(filteredRisks.length / pageSize) || 1;
  const paginatedRisks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRisks.slice(start, start + pageSize);
  }, [filteredRisks, page, pageSize]);

  return (
    <div className="flex flex-col gap-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-600 font-medium text-xs">Safe Renewal</CardDescription>
            <CardTitle className="text-2xl text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
              <span>{safeCount}</span>
              <ShieldCheck className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">&ge;75% att &amp; &ge;7.5 CGPA</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-amber-600 font-medium text-xs">Watchlist</CardDescription>
            <CardTitle className="text-2xl text-amber-700 dark:text-amber-300 flex items-center justify-between">
              <span>{watchCount}</span>
              <AlertTriangle className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Within 3% margin threshold</p>
          </CardContent>
        </Card>

        <Card className="border-rose-500/20 bg-rose-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-rose-600 font-medium text-xs">At Risk</CardDescription>
            <CardTitle className="text-2xl text-rose-700 dark:text-rose-300 flex items-center justify-between">
              <span>{atRiskCount}</span>
              <ShieldAlert className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Below renewal threshold</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-destructive font-medium text-xs">Likely Loss</CardDescription>
            <CardTitle className="text-2xl text-destructive flex items-center justify-between">
              <span>{likelyLossCount}</span>
              <AlertTriangle className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Critical double shortfall</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/30 bg-destructive/10">
          <CardHeader className="pb-2">
            <CardDescription className="text-destructive font-semibold text-xs">Discontinued</CardDescription>
            <CardTitle className="text-2xl text-destructive flex items-center justify-between">
              <span>{discontinuedCount}</span>
              <ShieldAlert className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">&lt; 7.0 CGPA threshold revoked</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <span>finance.scholarship_renewal_risk &middot; Early Warning Registry</span>
                <Badge variant="outline" className="font-mono text-xs">{filteredRisks.length} Students</Badge>
              </CardTitle>
              <CardDescription>
                Automated monitoring of student academic thresholds to prevent abrupt scholarship forfeiture
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: "All", val: "All" },
                { label: "Safe", val: "NONE" },
                { label: "Watchlist", val: "WATCH" },
                { label: "At Risk", val: "AT_RISK" },
                { label: "Likely Loss", val: "LIKELY_LOSS" },
                { label: "Discontinued", val: "DISCONTINUED" },
                { label: `Exam Ineligible (${examIneligibleCount})`, val: "EXAM_INELIGIBLE" },
              ].map((pill) => (
                <Button
                  key={pill.val}
                  variant={filterLevel === pill.val ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs px-2.5"
                  onClick={() => {
                    setFilterLevel(pill.val);
                    setPage(1);
                  }}
                >
                  {pill.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <InputGroup className="w-full">
              <InputGroupAddon>
                <Search className="size-3.5 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search scholarship student by name, roll number, or programme..."
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
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-muted/60 text-muted-foreground text-left border-b font-medium">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Programme</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">CGPA</th>
                  <th className="p-3">Risk Level</th>
                  <th className="p-3">Criteria Evaluation</th>
                  <th className="p-3">Exam Clearance</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedRisks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-xs text-muted-foreground">
                      No scholarship students match your search or filter.
                    </td>
                  </tr>
                ) : (
                  paginatedRisks.map((r) => {
                    const meta = riskMetaMap.get(r.student_id);
                    const isDiscontinued = meta?.isDiscontinued ?? (r.cgpa < 7.0);
                    const isExamEligible = meta?.isExamEligible ?? true;
                    return (
                    <tr key={r.scholarship_renewal_risk_id} className="hover:bg-muted/30">
                      <td className="p-3">
                        <div className="font-medium text-foreground">{r.student_name}</div>
                        <div className="text-xs font-mono text-muted-foreground">{r.student_id}</div>
                      </td>
                      <td className="p-3 text-muted-foreground">{r.programme}</td>
                      <td className="p-3">
                        <span
                          className={`font-semibold ${
                            r.attendance_pct < 75 ? "text-rose-600" : "text-foreground"
                          }`}
                        >
                          {r.attendance_pct}%
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-semibold ${
                            isDiscontinued
                              ? "text-destructive"
                              : r.cgpa < 7.5
                              ? "text-amber-600"
                              : "text-foreground"
                          }`}
                        >
                          {r.cgpa}
                        </span>
                      </td>
                      <td className="p-3">
                        {isDiscontinued ? (
                          <Badge className="bg-destructive text-white font-semibold text-xs">
                            Discontinued (&lt;7.0)
                          </Badge>
                        ) : r.risk_level === "NONE" ? (
                          <Badge className="bg-emerald-600 text-white font-normal text-xs">Safe</Badge>
                        ) : r.risk_level === "WATCH" ? (
                          <Badge className="bg-amber-600 text-white font-normal text-xs">Watchlist</Badge>
                        ) : r.risk_level === "AT_RISK" ? (
                          <Badge className="bg-rose-600 text-white font-normal text-xs">At Risk</Badge>
                        ) : (
                          <Badge className="bg-destructive text-white font-normal text-xs">Likely Loss</Badge>
                        )}
                      </td>
                      <td className="p-3 text-xs text-muted-foreground max-w-xs">
                        {isDiscontinued ? (
                          <span className="text-destructive font-medium">
                            ⚠️ Auto-Discontinued: CGPA {r.cgpa} &lt; 7.0 threshold. Full fee applied.
                          </span>
                        ) : (
                          r.criteria_at_risk.notes
                        )}
                      </td>
                      <td className="p-3">
                        {(() => {
                          if (isExamEligible) {
                            return (
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px] font-semibold whitespace-nowrap">
                                ✅ Cleared
                              </Badge>
                            );
                          }
                          const exam = getStudentExamEligibility(r.student_id);
                          return (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px] font-semibold whitespace-nowrap" title={exam.primaryReason}>
                              🚫 {exam.ineligibleCategory === "DuesOnly" ? "Dues" : exam.ineligibleCategory === "AttendanceOnly" ? "Attendance" : "Dues + Att"}
                            </Badge>
                          );
                        })()}
                      </td>
                      <td className="p-3 text-right">
                        {isDiscontinued ? (
                          <Badge variant="outline" className="text-destructive border-destructive/30 text-xs">
                            Fee Recalculated
                          </Badge>
                        ) : r.risk_level !== "NONE" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => sendCounselorAlert(r.student_name)}
                          >
                            Alert Counselor
                          </Button>
                        ) : (
                          <span className="text-muted-foreground text-xs font-mono">Compliant</span>
                        )}
                      </td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
              <span>
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredRisks.length)} of {filteredRisks.length}
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
    </div>
  );
}

// =========================================================================
// 3. BANK LOAN DOCUMENT REQUEST DESK (finance.loan_document_request)
// =========================================================================
export function BankLoanDeskView() {
  const [requests, setRequests] = useState<LoanDocumentRequest[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterDocType, setFilterDocType] = useState<string>("All");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  async function reload() {
    setRequests(await getLoanRequestsAction());
  }

  useEffect(() => {
    reload();
    // window.addEventListener("feewise_sql_store_updated", reload);
    // return () => window.removeEventListener("feewise_sql_store_updated", reload);
  }, []);

  async function handleIssue(reqId: string) {
    await issueLoanDocumentAction(reqId, "VFSTR Finance Officer");
    toast.success("Document Verified & Issued!");
    reload();
  }

  const [viewerDoc, setViewerDoc] = useState<{
    docType: FinanceDocType;
    studentId: string;
    options?: any;
  } | null>(null);

  function printOfficialDoc(req: LoanDocumentRequest) {
    const docTypeStr = String(req.document_type);
    let docType: FinanceDocType = "bonafide";
    if (docTypeStr.includes("NOC") || docTypeStr.includes("CLEARANCE")) {
      docType = "noc";
    } else if (docTypeStr.includes("FEE_STRUCTURE") || docTypeStr.includes("ESTIMATE") || docTypeStr.includes("STATEMENT")) {
      docType = "statement";
    } else if (docTypeStr.includes("PAID") || docTypeStr.includes("REIMBURSEMENT")) {
      docType = "reimbursement";
    }

    setViewerDoc({
      docType,
      studentId: req.student_id,
      options: {
        certRef: req.verification_code || `VFSTR-LOAN-${req.student_id}`,
        sealSubtext: `${req.bank_name} Loan Mandate | Code: ${req.verification_code || "VFSTR-LOAN-VERIFIED"}`,
        purposeNote: `Bank Education Loan Processing for ${req.bank_name}`,
      },
    });
  }

  const issuedCount = requests.filter((r) => r.status === "ISSUED").length;
  const inProgressCount = requests.filter((r) => r.status === "IN_PROGRESS").length;
  const requestedCount = requests.filter((r) => r.status === "REQUESTED").length;

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (filterStatus !== "All" && r.status !== filterStatus) return false;
      if (filterDocType !== "All" && r.document_type !== filterDocType) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = r.student_name.toLowerCase().includes(q);
        const matchesId = r.student_id.toLowerCase().includes(q);
        const matchesBank = r.bank_name.toLowerCase().includes(q);
        const matchesCode = (r.verification_code || "").toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesBank && !matchesCode) return false;
      }
      return true;
    });
  }, [requests, filterStatus, filterDocType, search]);

  const totalPages = Math.ceil(filteredRequests.length / pageSize) || 1;
  const paginatedRequests = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRequests.slice(start, start + pageSize);
  }, [filteredRequests, page, pageSize]);

  return (
    <div className="flex flex-col gap-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Requests</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-primary">{requests.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">bank document queue</p>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Issued Certificates</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-emerald-600">{issuedCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">verified with digital code</p>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">In Verification</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-amber-600">{inProgressCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">desk processing</p>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Pending Action</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-rose-600">{requestedCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">awaiting officer sign-off</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <span>finance.loan_document_request &middot; Education Loan Desk</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {filteredRequests.length} Requests
                </Badge>
              </CardTitle>
              <CardDescription>
                Official certificates requested by students for submission to nationalized and private banks
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setPage(1);
                }}
                className="filter-select text-xs"
              >
                <option value="All">All Statuses</option>
                <option value="REQUESTED">Requested</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ISSUED">Issued</option>
              </select>
              <select
                value={filterDocType}
                onChange={(e) => {
                  setFilterDocType(e.target.value);
                  setPage(1);
                }}
                className="filter-select text-xs"
              >
                <option value="All">All Document Types</option>
                <option value="BONAFIDE">Bonafide</option>
                <option value="FEE_STRUCTURE">Fee Structure</option>
                <option value="ADMISSION_CONFIRMATION">Admission Confirmation</option>
                <option value="FEE_PAID_STATEMENT">Fee Paid Statement</option>
                <option value="ACADEMIC_STATUS">Academic Status</option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <InputGroup className="w-full">
              <InputGroupAddon>
                <Search className="size-3.5 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search by student name, roll number, bank, or verification code..."
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
          <div className="divide-y divide-border rounded-lg border overflow-hidden">
            {paginatedRequests.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No bank loan document requests match your search or filter.
              </div>
            ) : (
              paginatedRequests.map((req) => (
                <div
                  key={req.loan_document_request_id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{req.student_name}</span>
                      <span className="text-xs font-mono text-muted-foreground">({req.student_id})</span>
                      <Badge variant="outline" className="text-[11px]">
                        {req.document_type.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Building2 className="size-3.5" /> {req.bank_name} &middot; Requested: {req.requested_on}
                    </p>
                    {req.verification_code && (
                      <p className="text-xs font-mono text-primary flex items-center gap-1">
                        <FileCheck className="size-3.5" /> Verification Code: {req.verification_code} (Turnaround: {req.turnaround_hours}h)
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === "REQUESTED" && (
                      <Button size="sm" onClick={() => handleIssue(req.loan_document_request_id)} className="h-8 text-xs gap-1.5">
                        <FileCheck className="size-3.5" /> Issue Official Doc
                      </Button>
                    )}
                    {req.status === "IN_PROGRESS" && (
                      <Button size="sm" variant="outline" onClick={() => handleIssue(req.loan_document_request_id)} className="h-8 text-xs gap-1.5">
                        <Clock className="size-3.5" /> Finalize &amp; Issue
                      </Button>
                    )}
                    {req.status === "ISSUED" && (
                      <Button size="sm" variant="secondary" onClick={() => printOfficialDoc(req)} className="h-8 text-xs gap-1.5">
                        <Download className="size-3.5" /> View / Print PDF
                      </Button>
                    )}
                    <Badge
                      variant={req.status === "ISSUED" ? "default" : "outline"}
                      className={`text-xs font-normal ${
                        req.status === "ISSUED"
                          ? "bg-emerald-600 text-white"
                          : req.status === "IN_PROGRESS"
                            ? "text-amber-600 border-amber-500/30"
                            : ""
                      }`}
                    >
                      {req.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
              <span>
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredRequests.length)} of {filteredRequests.length}
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

      {/* In-App Document Viewer Modal */}
      {viewerDoc && (
        <DocumentViewerModal
          isOpen={!!viewerDoc}
          onClose={() => setViewerDoc(null)}
          docType={viewerDoc.docType}
          student={viewerDoc.studentId}
          options={viewerDoc.options}
        />
      )}
    </div>
  );
}

// =========================================================================
// 4. SQL SCHEMA INSPECTOR & EXPORTER (Proof for Judges)
// =========================================================================
export function SqlSchemaInspector() {
  const [state, setState] = useState<SqlDatabaseState>(getSqlDatabaseState());

  function reload() {
    setState(getSqlDatabaseState());
  }

  useEffect(() => {
    reload();
    // window.addEventListener("feewise_sql_store_updated", reload);
    // return () => window.removeEventListener("feewise_sql_store_updated", reload);
  }, []);

  function handleReset() {
    if (confirm("Reset local database to original schema seed data?")) {
      resetSqlDatabase();
      toast.success("Database restored to default hackathon seed state.");
      reload();
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Database className="size-4 text-primary" />
            07_admissions_finance.sql &middot; Active Database Engine
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleReset} className="h-8 text-xs gap-1">
              <RotateCcw className="size-3.5" /> Reset DB
            </Button>
            <Button size="sm" onClick={downloadSqlFile} className="h-8 text-xs gap-1.5 bg-primary">
              <Download className="size-3.5" /> Export PostgreSQL DUMP (.sql)
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Live representation of tables defined in the hackathon organizer schema, stored locally and synchronized across views
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.fee_heads.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">finance.fee_head</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{students.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">finance.fee_demand</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.scholarship_risks.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">scholarship_risk</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.loan_requests.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">loan_doc_request</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.reminder_dispatches.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">reminder_dispatch</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.refunds.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">finance.refund</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
