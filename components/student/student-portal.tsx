"use client";

import { useState } from "react";
import {
  inr,
  students,
  transactions,
  instalmentPlans,
  printReceiptPdf,
  printStatementPdf,
  openPrintDocument,
  type Student,
} from "@/lib/finance-data";
import { getStudentAccount } from "@/lib/finance-service";
import { useAuth } from "@/lib/auth-context";
import { FeeCertificatesPanel } from "@/components/finance/certificates";
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

  // Find the logged-in student, or default to first student
  const studentId = user?.studentId || students[0]?.id || "251FA04E03";
  const [activeStudentId, setActiveStudentId] = useState(studentId);
  const [activeTab, setActiveTab] = useState<
    "overview" | "pay" | "breakdown" | "history" | "instalments" | "certificates" | "loans"
  >("overview");

  // Force re-render key when payment is made
  const [refreshKey, setRefreshKey] = useState(0);

  const student =
    students.find((s) => s.id === activeStudentId) || students[0];
  const account = getStudentAccount(student.id);
  const sqlState = getSqlDatabaseState();
  const scholarshipRisk = sqlState.scholarship_risks.find(
    (r) => r.student_id === student.id
  );

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

  const feeList = account?.fees ?? [
    { head: "Tuition", gross: 90000, demand: 90000 - scholarshipAmount, paid: Math.min(totalPaid, 90000 - scholarshipAmount), outstanding: Math.max(0, 90000 - scholarshipAmount - totalPaid) },
    { head: "Hostel", gross: 25000, demand: 25000, paid: Math.max(0, Math.min(25000, totalPaid - 90000)), outstanding: Math.max(0, 25000 - Math.max(0, totalPaid - 90000)) },
    { head: "Examination", gross: 5000, demand: 5000, paid: 5000, outstanding: 0 },
  ];

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
    <div className="min-h-screen bg-muted/20 text-foreground flex flex-col" key={refreshKey}>
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
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

          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
            onClick={() => login("admin")}
          >
            <ShieldCheck className="size-3.5 text-primary" />
            <span className="hidden sm:inline">Switch to Admin</span>
          </Button>

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
                onClick={() => printStatementPdf(student)}
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
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                    <AlertCircle className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900">
                      Payment of {inr(dueAmount)} is Due
                    </h4>
                    <p className="text-xs text-amber-800/80">
                      Pay in full or use our smart partial payment waterfall to clear tuition first.
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-amber-700 hover:bg-amber-800 text-white shrink-0"
                  onClick={() => setActiveTab("pay")}
                >
                  Pay Now / Split Payment
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="size-5" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-900">
                    All University Dues are Cleared!
                  </h4>
                  <p className="text-xs text-emerald-800/80">
                    Your semester tuition and campus charges are fully paid. You can download fee certificates below.
                  </p>
                </div>
              </div>
            )}

            {/* Scholarship Renewal & Academic Threshold Status (finance.scholarship_renewal_risk) */}
            {scholarshipRisk && (
              <div
                className={`rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  scholarshipRisk.risk_level === "NONE"
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : scholarshipRisk.risk_level === "WATCH"
                    ? "border-amber-500/20 bg-amber-500/5"
                    : "border-rose-500/20 bg-rose-500/5"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl mt-0.5 ${
                      scholarshipRisk.risk_level === "NONE"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : scholarshipRisk.risk_level === "WATCH"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-rose-500/10 text-rose-600"
                    }`}
                  >
                    {scholarshipRisk.risk_level === "NONE" ? (
                      <ShieldCheck className="size-5" />
                    ) : (
                      <AlertTriangle className="size-5" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-foreground">
                        Scholarship Renewal Status &middot; AY 2026–27
                      </h4>
                      <Badge
                        className={
                          scholarshipRisk.risk_level === "NONE"
                            ? "bg-emerald-600 text-white text-[11px]"
                            : scholarshipRisk.risk_level === "WATCH"
                            ? "bg-amber-600 text-white text-[11px]"
                            : "bg-rose-600 text-white text-[11px]"
                        }
                      >
                        {scholarshipRisk.risk_level === "NONE"
                          ? "Criteria Met (Safe)"
                          : scholarshipRisk.risk_level === "WATCH"
                          ? "Watchlist"
                          : "At Risk of Forfeiture"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {scholarshipRisk.criteria_at_risk.notes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0 bg-background/80 border rounded-lg px-3 py-2">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Attendance</span>
                    <strong
                      className={
                        scholarshipRisk.attendance_pct >= 75
                          ? "text-emerald-600 font-bold"
                          : "text-rose-600 font-bold"
                      }
                    >
                      {scholarshipRisk.attendance_pct}%
                    </strong>
                    <span className="text-[10px] text-muted-foreground"> (Min 75%)</span>
                  </div>
                  <div className="h-6 w-px bg-border" />
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Cumulative GPA</span>
                    <strong
                      className={
                        scholarshipRisk.cgpa >= 7.5
                          ? "text-emerald-600 font-bold"
                          : "text-rose-600 font-bold"
                      }
                    >
                      {scholarshipRisk.cgpa}
                    </strong>
                    <span className="text-[10px] text-muted-foreground"> (Min 7.5)</span>
                  </div>
                </div>
              </div>
            )}

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
        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Payment Receipts & Ledger
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    All digital receipts verified with university treasury ref.
                  </p>
                </div>
              </div>

              {studentTransactions.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-xs">
                  No payment transactions found yet. Use the Pay Dues tab to make a payment.
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
                      {studentTransactions.map((txn) => (
                        <tr key={txn.id} className="hover:bg-muted/30">
                          <td className="py-2.5 px-3 font-mono font-medium text-foreground">
                            {txn.id}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground">
                            {txn.date}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex rounded bg-muted px-2 py-0.5 text-[11px] font-medium">
                              {txn.method}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                            {inr(txn.ledger || (txn as any).amount || 0)}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs gap-1"
                              onClick={() => printReceiptPdf(txn)}
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
        )}

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
          />
        )}
      </main>

      <FloatingAiAssistant
        userRole="student"
        currentStudentId={student.id}
        currentView="Student Portal"
        onNavigate={handleStudentNavigation}
      />
    </div>
  );
}

function StudentLoanDesk({
  student,
  onRequested,
}: {
  student: Student;
  onRequested: () => void;
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
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>VFSTR - ${req.document_type} for ${req.bank_name}</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; line-height: 1.6; margin: 0; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #991b1b; padding-bottom: 12px; margin-bottom: 20px; }
    .logo { max-height: 70px; margin-bottom: 8px; }
    .title { font-size: 18px; font-weight: bold; color: #991b1b; margin: 0; }
    .subtitle { font-size: 12px; color: #64748b; margin: 3px 0 0; }
    .doc-title { font-size: 16px; font-weight: bold; text-align: center; margin: 25px 0 15px; text-decoration: underline; }
    .content-box { border: 1px solid #cbd5e1; border-radius: 6px; padding: 18px; background: #f8fafc; margin: 20px 0; }
    .field-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
    .field-label { font-weight: 600; color: #475569; }
    .field-val { color: #0f172a; font-weight: 500; }
    .stamp-box { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 50px; }
    .verification-code { font-family: monospace; font-size: 12px; border: 1px dashed #94a3b8; padding: 6px 12px; border-radius: 4px; background: #fff; }
    .signature { text-align: center; }
    .signature-line { width: 180px; border-top: 1px solid #334155; margin-bottom: 4px; }
  </style>
</head>
<body>
  <div class="header">
    <img src="/vignan-logo.png" class="logo" alt="VFSTR Logo" />
    <div class="title">VIGNAN'S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH</div>
    <div class="subtitle">(Deemed to be University estd. u/s 3 of UGC Act 1956) &middot; Vadlamudi, Guntur &middot; AP - 522213</div>
  </div>

  <div class="doc-title">OFFICIAL ${req.document_type.replace(/_/g, " ")} FOR EDUCATION LOAN</div>

  <p>To,</p>
  <p><strong>The Branch Manager</strong><br/>${req.bank_name}</p>

  <p>This is to formally certify that the following student is a bona fide scholar of this University and has requested this documentation for processing of Education Loan assistance:</p>

  <div class="content-box">
    <div class="field-row"><span class="field-label">Student Name:</span><span class="field-val">${req.student_name}</span></div>
    <div class="field-row"><span class="field-label">Registration / Roll No:</span><span class="field-val">${req.student_id}</span></div>
    <div class="field-row"><span class="field-label">Document Purpose:</span><span class="field-val">${req.document_type}</span></div>
    <div class="field-row"><span class="field-label">Assigned Bank:</span><span class="field-val">${req.bank_name}</span></div>
    <div class="field-row"><span class="field-label">Date of Request:</span><span class="field-val">${req.requested_on}</span></div>
    <div class="field-row"><span class="field-label">Date of Issuance:</span><span class="field-val">${req.issued_on || new Date().toISOString().split("T")[0]}</span></div>
  </div>

  <p style="font-size: 13px; color: #475569;">
    All academic and financial credentials have been verified against university records. The university acknowledges that fee remittances from the loan account may be directly deposited into the University Registrar account via RTGS/NEFT.
  </p>

  <div class="stamp-box">
    <div class="verification-code">
      <strong>Digital Verification:</strong> ${req.verification_code || "VFSTR-LOAN-PENDING"}
    </div>
    <div class="signature">
      <div class="signature-line"></div>
      <div style="font-size: 13px; font-weight: bold;">Finance &amp; Accounts Officer</div>
      <div style="font-size: 11px; color: #64748b;">VFSTR Deemed to be University</div>
    </div>
  </div>
</body>
</html>`;
    openPrintDocument(html);
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
