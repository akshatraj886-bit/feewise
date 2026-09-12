"use client";

import { useState } from "react";
import {
  inr,
  students,
  transactions,
  feeAllocations,
  scholarshipStatus,
  paymentReceipts,
  instalmentPlans,
  printReceiptPdf,
  printStatementPdf,
  openPrintDocument,
  type Student,
} from "@/lib/finance-data";
import { getStudentAccount } from "@/lib/finance-service";
import { useAuth } from "@/lib/auth-context";
import { useLiveFinance } from "@/context/live-finance-context";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FeeCertificatesPanel } from "@/components/finance/certificates";
import { DocumentViewerModal } from "@/components/finance/document-viewer-modal";
import { type FinanceDocType, openFinanceDocument } from "@/lib/finance-documents";
import { PartialPaymentSimulator } from "@/components/finance/partial-payment-modal";
import { FloatingAiAssistant } from "@/components/finance/assistant";
import { type NavigationAction } from "@/lib/ai-finance-engine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  LogOut,
  CreditCard,
  FileText,
  Calendar,
  Award,
  History,
  CheckCircle2,
  AlertCircle,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building2,
  Send,
  Download,
  AlertTriangle,
  Clock,
} from "lucide-react";
import {
  getSqlDatabaseState,
  requestLoanDocument,
  type LoanDocumentRequest,
  type LoanDocumentType,
} from "@/lib/sql-store";
import { toast } from "sonner";

export function StudentPortal() {
  const { user, logout, login } = useAuth();
  const {
    students: liveStudents,
    feeAllocations: liveFeeAllocations,
    paymentReceipts: livePaymentReceipts,
    getLiveStudentAccount,
  } = useLiveFinance();

  // Find the logged-in student, or default to first student
  const studentId = user?.studentId || liveStudents[0]?.id || "251FA04645";
  const [activeStudentId, setActiveStudentId] = useState(studentId);
  const [activeTab, setActiveTab] = useState<
    "overview" | "pay" | "breakdown" | "history" | "instalments" | "certificates" | "loans"
  >("overview");

  // Force re-render key when payment is made
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeViewerDoc, setActiveViewerDoc] = useState<{ type: FinanceDocType; options?: any } | null>(null);

  const student =
    liveStudents.find((s) => s.id === activeStudentId) || liveStudents[0];
  const account = getLiveStudentAccount(student.id) || getStudentAccount(student.id);
  const sqlState = getSqlDatabaseState();

  const prog = student.programme;
  const totalDemand = student.demand;
  const totalPaid = student.paid;
  const dueAmount = Math.max(0, totalDemand - totalPaid);
  const scholarshipAmount = student.scholarship || 0;
  const concessionAmount = student.concession || 0;

  const studentTransactions = transactions.filter(
    (t) => (t as any).student === student.id || (t as any).studentId === student.id
  );
  const studentPlan = instalmentPlans.find((p) => p.studentId === student.id);

  interface PortalFeeItem {
    head: string;
    gross: number;
    demand: number;
    paid: number;
    outstanding: number;
    status: string;
  }

  const alloc = liveFeeAllocations[student.id];
  const feeList: PortalFeeItem[] = alloc
    ? alloc.map((a) => ({
        head: a.head,
        gross: a.gross,
        demand: a.gross,
        paid: a.paid,
        outstanding: a.outstanding,
        status: a.status,
      }))
    : ((account?.fees as unknown as PortalFeeItem[]) ?? [
        { head: "Tuition", gross: 90000, demand: 90000 - scholarshipAmount, paid: Math.min(totalPaid, 90000 - scholarshipAmount), outstanding: Math.max(0, 90000 - scholarshipAmount - totalPaid), status: "Partially Paid" },
        { head: "Hostel", gross: 25000, demand: 25000, paid: Math.max(0, Math.min(25000, totalPaid - 90000)), outstanding: Math.max(0, 25000 - Math.max(0, totalPaid - 90000)), status: "Unpaid" },
        { head: "Examination", gross: 5000, demand: 5000, paid: 5000, outstanding: 0, status: "Fully Cleared" },
      ]);

  function handlePaymentSuccess() {
    setRefreshKey((k) => k + 1);
    setActiveTab("history");
  }

  function handleStudentNavigation(nav: NavigationAction) {
    if (nav.view === "Fee Structure") {
      setActiveTab("breakdown");
    } else if (nav.view === "Payments") {
      setActiveTab("history");
    } else if (nav.view === "Instalments") {
      setActiveTab("instalments");
    } else if (nav.view === "Loan Requests") {
      setActiveTab("loans");
    } else {
      setActiveTab("overview");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary/20 selection:text-primary" key={refreshKey}>
      {/* Ambient background glow cones matching login screen */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[550px] rounded-full bg-indigo-500/8 dark:bg-indigo-600/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 size-[450px] rounded-full bg-cyan-500/6 dark:bg-cyan-500/8 blur-[130px]" />
        <div className="absolute bottom-10 left-10 size-[500px] rounded-full bg-purple-500/6 dark:bg-purple-600/6 blur-[150px]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-card/80 dark:bg-[#07090e]/80 backdrop-blur-xl px-4 sm:px-8 py-3 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <img
            src="/vignan-logo.png"
            alt="Vignan's University"
            className="h-10 w-auto object-contain"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-foreground">
                VFSTR Student Portal
              </span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Student View
              </span>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Vignan&apos;s Foundation for Science, Technology & Research (Deemed to be University)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick student switcher for demo purposes */}
          <div className="hidden md:flex items-center gap-1 bg-muted/60 rounded-lg p-1 text-xs border">
            <span className="text-muted-foreground text-[11px] px-1 font-medium">Demo Student:</span>
            <select
              value={student.id}
              onChange={(e) => setActiveStudentId(e.target.value)}
              className="bg-transparent border-0 text-xs font-semibold text-foreground focus:ring-0 cursor-pointer"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.id})
                </option>
              ))}
            </select>
          </div>

          <ThemeToggle className="size-8" />

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground gap-1"
            onClick={logout}
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Student Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
        {/* Student Profile Card */}
        <div className="rounded-2xl border bg-card p-6 shadow-xs relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="size-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-xl shadow-md">
                {student.initials}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    {student.name}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      dueAmount === 0
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {dueAmount === 0 ? (
                      <>
                        <CheckCircle2 className="size-3" /> Fees Cleared
                      </>
                    ) : (
                      <>
                        <AlertCircle className="size-3" /> Dues Pending
                      </>
                    )}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    Roll No: <strong className="text-foreground">{student.id}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Program: <strong className="text-foreground">{prog}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Year: <strong className="text-foreground">2026–27</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Category: <strong className="text-foreground">{student.category}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => setActiveViewerDoc({ type: "statement" })}
              >
                <Printer className="size-3.5" />
                Fee Statement (PDF)
              </Button>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => setActiveTab("pay")}
              >
                <CreditCard className="size-3.5" />
                Pay Dues Online
              </Button>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t">
            <div className="space-y-0.5">
              <div className="text-[11px] text-muted-foreground uppercase font-medium">
                Total Annual Demand
              </div>
              <div className="text-lg font-bold text-foreground">
                {inr(totalDemand)}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[11px] text-muted-foreground uppercase font-medium">
                Total Paid
              </div>
              <div className="text-lg font-bold text-emerald-600">
                {inr(totalPaid)}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[11px] text-muted-foreground uppercase font-medium">
                Balance Outstanding
              </div>
              <div
                className={`text-lg font-bold ${
                  dueAmount > 0 ? "text-amber-600" : "text-emerald-600"
                }`}
              >
                {inr(dueAmount)}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[11px] text-muted-foreground uppercase font-medium">
                Scholarship / Waiver
              </div>
              <div className="text-lg font-bold text-primary">
                {scholarshipAmount + concessionAmount > 0
                  ? inr(scholarshipAmount + concessionAmount)
                  : "None Applied"}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b overflow-x-auto pb-px">
          {[
            { id: "overview", label: "Overview", icon: GraduationCap },
            { id: "pay", label: "Smart Partial Payment", icon: CreditCard },
            { id: "breakdown", label: "Fee Heads & Concessions", icon: FileText },
            { id: "history", label: "Receipts & History", icon: History },
            { id: "instalments", label: "Instalment Plan", icon: Calendar },
            { id: "certificates", label: "Official Certificates", icon: Award },
            { id: "loans", label: "Education Loan Desk", icon: Building2 },
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
                  isSelected
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <Icon className="size-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}

        {/* Tab: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Action Card if dues pending */}
            {dueAmount > 0 ? (
              <div className="rounded-2xl border border-amber-500/35 bg-amber-500/10 dark:bg-amber-500/10 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs">
                    <AlertCircle className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-200 tracking-tight">
                      Payment of {inr(dueAmount)} is Due
                    </h4>
                    <p className="text-xs text-amber-900/80 dark:text-amber-300/85 mt-0.5 leading-relaxed">
                      Pay in full or use our smart partial payment waterfall to clear tuition first.
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="h-9 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold text-xs shadow-md shadow-amber-500/20 shrink-0 cursor-pointer border-0 transition-all hover:scale-[1.02]"
                  onClick={() => setActiveTab("pay")}
                >
                  Pay Now / Split Payment
                </Button>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 dark:bg-emerald-500/10 backdrop-blur-xl p-4 sm:p-5 flex items-center gap-3.5 shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs">
                  <CheckCircle2 className="size-5" />
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-200 tracking-tight">
                    All University Dues are Cleared!
                  </h4>
                  <p className="text-xs text-emerald-900/80 dark:text-emerald-300/85 mt-0.5 leading-relaxed">
                    Your semester tuition and campus charges are fully paid. You can download fee certificates below.
                  </p>
                </div>
              </div>
            )}

            {/* Scholarship Renewal Status Card */}
            {scholarshipStatus[student.id] && (() => {
              const s = scholarshipStatus[student.id];
              const isSafe = s.status === "Safe";
              const isAtRisk = s.status === "At Risk";
              const isCritical = s.status === "Critical";

              const borderBg = isSafe
                ? "border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/10"
                : isAtRisk
                ? "border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/10"
                : "border-rose-500/30 bg-rose-500/10 dark:bg-rose-500/10";

              const iconBg = isSafe
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : isAtRisk
                ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30";

              const badgeClass = isSafe
                ? "bg-emerald-600 hover:bg-emerald-600 text-white font-semibold text-[11px]"
                : isAtRisk
                ? "bg-amber-600 hover:bg-amber-600 text-white font-semibold text-[11px]"
                : "bg-rose-600 hover:bg-rose-600 text-white font-semibold text-[11px]";

              return (
                <div
                  className={`rounded-2xl border ${borderBg} backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl mt-0.5 border ${iconBg} shadow-xs`}>
                      {isSafe ? (
                        <ShieldCheck className="size-5" />
                      ) : (
                        <AlertTriangle className="size-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                          Scholarship Renewal Status &middot; AY 2026–27
                        </h4>
                        <Badge className={badgeClass}>
                          {s.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isSafe
                          ? "Academic criteria satisfied (Attendance \u2265 75%, CGPA \u2265 7.5). Scholarship award renewal is safe."
                          : isAtRisk
                          ? "Academic criteria nearing the renewal threshold. Maintain attendance and grades to safeguard award."
                          : "Current metrics are below minimum renewal criteria. Immediate academic advisor review required."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs shrink-0 bg-background/80 dark:bg-background/60 backdrop-blur-md border rounded-xl px-4 py-2.5 shadow-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase tracking-wider font-semibold">Attendance</span>
                      <strong
                        className={
                          s.attendance >= s.minAttendance
                            ? "text-emerald-600 dark:text-emerald-400 font-bold text-sm"
                            : "text-rose-600 dark:text-rose-400 font-bold text-sm"
                        }
                      >
                        {s.attendance}%
                      </strong>
                      <span className="text-[10px] text-muted-foreground"> (Min {s.minAttendance}%)</span>
                    </div>
                    <div className="h-7 w-px bg-border" />
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase tracking-wider font-semibold">Cumulative GPA</span>
                      <strong
                        className={
                          s.cumulativeGPA >= s.minGPA
                            ? "text-emerald-600 dark:text-emerald-400 font-bold text-sm"
                            : "text-rose-600 dark:text-rose-400 font-bold text-sm"
                        }
                      >
                        {s.cumulativeGPA}
                      </strong>
                      <span className="text-[10px] text-muted-foreground"> (Min {s.minGPA})</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Quick Certificates Highlight */}
            <FeeCertificatesPanel student={student} />

            {/* Fee Heads Summary Table */}
            <div className="rounded-xl border bg-card p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Current Fee Breakdown
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1 text-primary"
                  onClick={() => setActiveTab("breakdown")}
                >
                  View Details <ChevronRight className="size-3.5" />
                </Button>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-muted/60 text-muted-foreground border-b">
                    <tr>
                      <th className="py-2.5 px-3 text-left">Fee Component</th>
                      <th className="py-2.5 px-3 text-right">Demanded</th>
                      <th className="py-2.5 px-3 text-right">Paid</th>
                      <th className="py-2.5 px-3 text-right">Outstanding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {feeList.map((f) => (
                      <tr key={f.head}>
                        <td className="py-2 px-3 font-medium text-foreground">{f.head}</td>
                        <td className="py-2 px-3 text-right text-muted-foreground">
                          {inr(f.demand)}
                        </td>
                        <td className="py-2 px-3 text-right font-medium text-emerald-600">
                          {inr(f.paid)}
                        </td>
                        <td className="py-2 px-3 text-right font-semibold text-foreground">
                          {inr(f.outstanding)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Smart Partial Payment */}
        {activeTab === "pay" && (
          <div className="space-y-6">
            <PartialPaymentSimulator
              student={student}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        )}

        {/* Tab: Fee Breakdown & Concessions */}
        {activeTab === "breakdown" && (
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
              <h3 className="text-base font-semibold text-foreground">
                Itemized Fee Structure & Scholarship Adjustments
              </h3>
              <p className="text-xs text-muted-foreground">
                Official institutional fee demand schedule approved for {prog} (2026–27).
              </p>

              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-muted/70 text-muted-foreground border-b">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold">Fee Category</th>
                      <th className="py-3 px-4 text-right font-semibold">Base Demand</th>
                      <th className="py-3 px-4 text-right font-semibold">Paid Amount</th>
                      <th className="py-3 px-4 text-right font-semibold">Balance Due</th>
                      <th className="py-3 px-4 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {feeList.map((fee) => (
                      <tr key={fee.head} className="hover:bg-muted/30">
                        <td className="py-3 px-4 font-semibold text-foreground">
                          {fee.head}
                        </td>
                        <td className="py-3 px-4 text-right text-muted-foreground">
                          {inr(fee.demand)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-emerald-600">
                          {inr(fee.paid)}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-foreground">
                          {inr(fee.outstanding)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {fee.outstanding === 0 ? (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[11px] font-medium">
                              <CheckCircle2 className="size-3" /> Fully Cleared
                            </span>
                          ) : fee.paid > 0 ? (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[11px] font-medium">
                              Partially Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-rose-100 text-rose-800 px-2 py-0.5 text-[11px] font-medium">
                              Unpaid
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/40 font-bold border-t">
                    <tr>
                      <td className="py-3 px-4 text-foreground">Total Fee Demand</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">
                        {inr(totalDemand)}
                      </td>
                      <td className="py-3 px-4 text-right text-emerald-600">
                        {inr(totalPaid)}
                      </td>
                      <td className="py-3 px-4 text-right text-rose-600">
                        {inr(dueAmount)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {scholarshipAmount > 0 && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-primary">
                      Merit Scholarship Award:
                    </span>{" "}
                    Merit Tuition Waiver (Academic Cohort 2026–27)
                  </div>
                  <span className="font-bold text-primary">
                    -{inr(scholarshipAmount)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Receipts & History */}
        {activeTab === "history" && (() => {
          const receipts = livePaymentReceipts[student.id] ?? paymentReceipts[student.id] ?? (studentTransactions.length > 0 ? studentTransactions.map(t => ({
            txnId: t.id,
            date: t.date,
            channel: t.method,
            amount: t.ledger || (t as any).amount || 0
          })) : []);

          return (
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Receipts & History
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Official transaction receipts verified with university treasury ref.
                    </p>
                  </div>
                </div>

                {receipts.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-xs">
                    No payments recorded yet
                  </div>
                ) : (
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/70 text-muted-foreground border-b">
                        <tr>
                          <th className="py-2.5 px-3 text-left font-semibold">Txn ID</th>
                          <th className="py-2.5 px-3 text-left font-semibold">Date</th>
                          <th className="py-2.5 px-3 text-left font-semibold">Payment Channel</th>
                          <th className="py-2.5 px-3 text-right font-semibold">Amount Paid</th>
                          <th className="py-2.5 px-3 text-center font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {receipts.map((rcpt, idx) => (
                          <tr key={`${rcpt.txnId}-${idx}`} className="hover:bg-muted/30">
                            <td className="py-2.5 px-3 font-mono font-medium text-foreground">
                              {rcpt.txnId}
                            </td>
                            <td className="py-2.5 px-3 text-muted-foreground">
                              {rcpt.date}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="inline-flex rounded bg-muted px-2 py-0.5 text-[11px] font-medium">
                                {rcpt.channel}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                              {inr(rcpt.amount)}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs gap-1"
                                onClick={() =>
                                  printReceiptPdf({
                                    txnId: rcpt.txnId,
                                    id: rcpt.txnId,
                                    date: rcpt.date,
                                    method: rcpt.channel,
                                    channel: rcpt.channel,
                                    amount: rcpt.amount,
                                    ledger: rcpt.amount,
                                    studentId: student.id,
                                    studentName: student.name,
                                    programme: student.programme,
                                  })
                                }
                              >
                                <Printer className="size-3" />
                                PDF Receipt
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Tab: Instalment Plan */}
        {activeTab === "instalments" && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Assigned Instalment Plan
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Scheduled milestone payments for semester charges.
                  </p>
                </div>
              </div>

              {!studentPlan ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-xs">
                  No instalment plan configured for this account. Your fees follow standard semester billing.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-muted/40 rounded-lg border">
                      <div className="text-[11px] text-muted-foreground">Plan ID</div>
                      <div className="font-mono font-bold text-xs">{studentPlan.planId}</div>
                    </div>
                    <div className="p-3 bg-muted/40 rounded-lg border">
                      <div className="text-[11px] text-muted-foreground">Total Plan Demand</div>
                      <div className="font-bold text-xs">{inr(studentPlan.totalDemand)}</div>
                    </div>
                    <div className="p-3 bg-muted/40 rounded-lg border">
                      <div className="text-[11px] text-muted-foreground">Paid so Far</div>
                      <div className="font-bold text-xs text-emerald-600">
                        {inr(studentPlan.instalments.reduce((sum, i) => sum + i.paid, 0))}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/40 rounded-lg border">
                      <div className="text-[11px] text-muted-foreground">Instalments Cleared</div>
                      <div className="font-bold text-xs">
                        {studentPlan.instalments.filter((i) => i.status === "Paid").length} of {studentPlan.instalments.length}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/70 text-muted-foreground border-b">
                        <tr>
                          <th className="py-2.5 px-3 text-left font-semibold">#</th>
                          <th className="py-2.5 px-3 text-left font-semibold">Due Date</th>
                          <th className="py-2.5 px-3 text-right font-semibold">Instalment Amount</th>
                          <th className="py-2.5 px-3 text-right font-semibold">Amount Paid</th>
                          <th className="py-2.5 px-3 text-center font-semibold">Status</th>
                          <th className="py-2.5 px-3 text-center font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {studentPlan.instalments.map((inst) => (
                          <tr key={inst.no} className="hover:bg-muted/30">
                            <td className="py-2.5 px-3 font-semibold text-foreground">
                              Instalment {inst.no}
                            </td>
                            <td className="py-2.5 px-3 text-muted-foreground">
                              {inst.due}
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-foreground">
                              {inr(inst.amount)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-semibold text-emerald-600">
                              {inr(inst.paid)}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              {inst.status === "Paid" ? (
                                <span className="inline-flex rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[11px] font-medium">
                                  Paid
                                </span>
                              ) : inst.status === "Overdue" ? (
                                <span className="inline-flex rounded bg-rose-100 text-rose-800 px-2 py-0.5 text-[11px] font-medium">
                                  Overdue
                                </span>
                              ) : (
                                <span className="inline-flex rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[11px] font-medium">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              {inst.status !== "Paid" ? (
                                <Button
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => setActiveTab("pay")}
                                >
                                  Pay Now
                                </Button>
                              ) : (
                                <span className="text-muted-foreground text-[11px]">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Official Certificates */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <FeeCertificatesPanel student={student} />
          </div>
        )}

        {/* Tab: Education Loan Desk */}
        {activeTab === "loans" && (
          <StudentLoanDesk
            student={student}
            onRequested={() => setRefreshKey((k) => k + 1)}
            onOpenDoc={(type, opts) => setActiveViewerDoc({ type, options: opts })}
          />
        )}
      </main>

      <FloatingAiAssistant
        userRole="student"
        currentStudentId={student.id}
        currentView="Student Portal"
        onNavigate={handleStudentNavigation}
      />

      {/* In-App Document Viewer Modal */}
      {activeViewerDoc && (
        <DocumentViewerModal
          isOpen={!!activeViewerDoc}
          onClose={() => setActiveViewerDoc(null)}
          docType={activeViewerDoc.type}
          student={student}
          options={activeViewerDoc.options}
        />
      )}
    </div>
  );
}

function StudentLoanDesk({
  student,
  onRequested,
  onOpenDoc,
}: {
  student: Student;
  onRequested: () => void;
  onOpenDoc?: (docType: FinanceDocType, options?: any) => void;
}) {
  const [bankName, setBankName] = useState("State Bank of India (SBI)");
  const [docType, setDocType] = useState<LoanDocumentType>("BONAFIDE");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const state = getSqlDatabaseState();
  const myRequests = state.loan_requests.filter(
    (r) => r.student_id === student.id
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      requestLoanDocument({
        student_id: student.id,
        student_name: student.name,
        bank_name: bankName,
        document_type: docType,
      });
      setIsSubmitting(false);
      toast.success("Education Loan Document Requested!", {
        description: `Your application for ${docType.replace(
          /_/g,
          " "
        )} has been submitted to the VFSTR Finance Desk.`,
      });
      onRequested();
    }, 400);
  }

  function handleDownloadOfficialDoc(req: LoanDocumentRequest) {
    const docTypeStr = String(req.document_type);
    let docType: FinanceDocType = "bonafide";
    if (docTypeStr.includes("NOC") || docTypeStr.includes("CLEARANCE")) {
      docType = "noc";
    } else if (docTypeStr.includes("FEE_STRUCTURE") || docTypeStr.includes("ESTIMATE") || docTypeStr.includes("STATEMENT")) {
      docType = "statement";
    } else if (docTypeStr.includes("PAID") || docTypeStr.includes("REIMBURSEMENT")) {
      docType = "reimbursement";
    }

    const opts = {
      certRef: req.verification_code || `VFSTR-LOAN-${req.student_id}`,
      sealSubtext: `${req.bank_name} Loan Clearance | Code: ${req.verification_code || "VFSTR-LOAN-VERIFIED"}`,
      purposeNote: `Official Bank Loan Processing for ${req.bank_name}`,
    };

    if (onOpenDoc) {
      onOpenDoc(docType, opts);
    } else {
      openFinanceDocument(docType, student, opts);
    }
  }

  return (
    <div className="space-y-6">
      {/* Loan Request Form */}
      <div className="rounded-xl border bg-card p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b pb-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Request Bank Education Loan Document
            </h3>
            <p className="text-xs text-muted-foreground">
              Official university certificates for nationalized and private bank loan processing
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Select Bank</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-9 rounded-md border bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
              <option value="HDFC Bank Education Loan">HDFC Bank Credila / Education Loan</option>
              <option value="Canara Bank Vidyanagar">Canara Bank</option>
              <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
              <option value="Union Bank of India">Union Bank of India</option>
              <option value="Bank of Baroda">Bank of Baroda</option>
              <option value="ICICI Bank Education Loans">ICICI Bank</option>
              <option value="Axis Bank Education Desk">Axis Bank</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Certificate / Document Type
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as LoanDocumentType)}
              className="w-full h-9 rounded-md border bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="BONAFIDE">Bonafide Student Certificate</option>
              <option value="FEE_STRUCTURE">Official 4-Year Fee Structure</option>
              <option value="ADMISSION_CONFIRMATION">Admission Confirmation Letter</option>
              <option value="FEE_PAID_STATEMENT">Fee Paid &amp; Dues Statement</option>
              <option value="ACADEMIC_STATUS">Academic Progress &amp; Clearance</option>
            </select>
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting} className="w-full h-9 gap-1.5 text-xs">
              <Send className="size-3.5" />
              {isSubmitting ? "Submitting..." : "Submit Loan Request"}
            </Button>
          </div>
        </form>
      </div>

      {/* Existing Requests Table */}
      <div className="rounded-xl border bg-card p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              My Loan Document Requests
            </h3>
            <p className="text-xs text-muted-foreground">
              Status tracking and instant download for verified documents
            </p>
          </div>
          <Badge variant="secondary" className="text-xs font-mono">
            {myRequests.length} Total
          </Badge>
        </div>

        {myRequests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs">
            No education loan documents requested yet. Use the form above to submit a new request.
          </div>
        ) : (
          <div className="divide-y divide-border rounded-lg border overflow-hidden">
            {myRequests.map((req) => (
              <div
                key={req.loan_document_request_id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {req.document_type.replace(/_/g, " ")}
                    </span>
                    <Badge
                      variant={req.status === "ISSUED" ? "default" : "outline"}
                      className={`text-[11px] ${
                        req.status === "ISSUED"
                          ? "bg-emerald-600 text-white"
                          : req.status === "IN_PROGRESS"
                          ? "border-amber-400 text-amber-700 bg-amber-50"
                          : "text-muted-foreground"
                      }`}
                    >
                      {req.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Building2 className="size-3.5" /> Bank: {req.bank_name} &middot; Requested:{" "}
                    {req.requested_on}
                  </p>
                  {req.verification_code && (
                    <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="size-3.5" /> Verification Code:{" "}
                      {req.verification_code}
                    </p>
                  )}
                </div>

                <div>
                  {req.status === "ISSUED" ? (
                    <Button
                      size="sm"
                      onClick={() => handleDownloadOfficialDoc(req)}
                      className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Download className="size-3.5" /> Download / Print Official Doc
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" /> In Review by Finance Officer
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
