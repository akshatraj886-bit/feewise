"use client";

import { useState, useEffect } from "react";
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
import {
  getStudentAccount,
  computeScholarshipEligibilityTimeline,
  getStudentExamEligibility,
  getStudentDuesBreakdown,
  benchmarkHistoricalStudents,
  type ExamPermissionRequest,
  type ExamEligibilityResult,
} from "@/lib/finance-service";
import { useAuth } from "@/lib/auth-context";
import { useLiveFinance } from "@/context/live-finance-context";
import { getStudentPermissionRequestsAction, createPermissionRequestAction } from "@/backend/actions/exam-permissions";
import { getLoanRequestsAction, requestLoanDocumentAction } from "@/backend/actions/more-modules";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Info,
  FileCheck2,
  XCircle,
} from "lucide-react";
import {
  getSqlDatabaseState,
  requestLoanDocument,
  type LoanDocumentRequest,
  type LoanDocumentType,
} from "@/lib/sql-store";
import { toast } from "sonner";

export function StudentPortal() {
  const { user, logout } = useAuth();
  const {
    students: liveStudents,
    feeAllocations: liveFeeAllocations,
    paymentReceipts: livePaymentReceipts,
    getLiveStudentAccount,
  } = useLiveFinance();

  // Confidential student authentication: resolve strictly from user context
  const authenticatedStudentId = (user?.studentId || user?.id || "251FA04645").trim().toUpperCase();
  const [activeTab, setActiveTab] = useState<
    "overview" | "exam" | "pay" | "breakdown" | "history" | "instalments" | "certificates" | "loans"
  >("overview");

  // Force re-render key when payment is made
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeViewerDoc, setActiveViewerDoc] = useState<{ type: FinanceDocType; options?: any } | null>(null);

  const allPortalStudents = [
    ...liveStudents,
    ...benchmarkHistoricalStudents.filter((b) => !liveStudents.some((l) => l.id === b.id)),
    ...students.filter(
      (s) => !liveStudents.some((l) => l.id === s.id) && !benchmarkHistoricalStudents.some((b) => b.id === s.id)
    ),
  ];

  const student: Student =
    allPortalStudents.find((s) => s.id.toUpperCase() === authenticatedStudentId) || {
      id: authenticatedStudentId,
      name: user?.name || `Student (${authenticatedStudentId})`,
      programme: "B.Tech Computer Science & Engineering",
      category: "Regular",
      demand: 115000,
      paid: 115000,
      overdue: 0,
      initials: (user?.name || authenticatedStudentId).slice(0, 2).toUpperCase(),
      scholarship: 0,
      concession: 0,
      instalmentPlan: "None",
      admissionMode: "V-SAT",
      entranceRank: 1204,
      scholarshipPercent: 0,
      scholarshipEligibilityNote: "Regular Admission",
    };
  const account = getLiveStudentAccount(student.id) || getStudentAccount(student.id);
  // const sqlState = getSqlDatabaseState();

  // Step 4 & 6: Single Source of Truth Exam Eligibility, Dues Carry-Forward, & Automated Admit Cards
  const examEligibility = getStudentExamEligibility(student.id);
  const duesBreakdown = getStudentDuesBreakdown(student.id);
  const [permissionRequests, setPermissionRequests] = useState<ExamPermissionRequest[]>([]);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isAdmitCardModalOpen, setIsAdmitCardModalOpen] = useState(false);
  const [permissionReason, setPermissionReason] = useState("Education Loan Disbursement Delay");
  const [supportingInfo, setSupportingInfo] = useState("");
  const [isSubmittingPermission, setIsSubmittingPermission] = useState(false);

  async function fetchPermissions() {
    const reqs = await getStudentPermissionRequestsAction(student.id);
    setPermissionRequests(reqs);
  }

  useEffect(() => {
    fetchPermissions();
  }, [student.id, refreshKey]);

  useEffect(() => {
    window.addEventListener("feewise_exam_permission_updated", fetchPermissions);
    return () => {
      window.removeEventListener("feewise_exam_permission_updated", fetchPermissions);
    };
  }, [student.id]);

  const handleSubmitPermissionLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportingInfo.trim() || supportingInfo.trim().length < 15) {
      toast.error("Please provide detailed supporting explanation (at least 15 characters).");
      return;
    }
    setIsSubmittingPermission(true);
    try {
      const newReq = {
        id: `REQ-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        studentId: student.id,
        studentName: student.name,
        programme: student.programme,
        reason: permissionReason,
        supportingInfo: supportingInfo.trim(),
        snapshottedDues: examEligibility.outstandingDues,
        snapshottedAttendance: examEligibility.currentAttendance,
        submittedAt: new Date().toLocaleString("en-IN", { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: "Pending" as const,
      };
      await createPermissionRequestAction(newReq);
      await fetchPermissions();
      setIsPermissionModalOpen(false);
      setSupportingInfo("");
      toast.success(`Permission request ${newReq.id} submitted! Forwarded to Academic Counsellor.`);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("feewise_exam_permission_updated"));
      }
    } catch (err) {
      toast.error("Failed to submit permission request. Please try again.");
    } finally {
      setIsSubmittingPermission(false);
    }
  };

  const prog = student.programme;
  const totalDemand = student.demand;
  const totalPaid = student.paid;
  const dueAmount = duesBreakdown.totalOutstandingDue > 0 ? duesBreakdown.totalOutstandingDue : Math.max(0, totalDemand - totalPaid);
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
    } else if (nav.view === "Admit Cards" || nav.view === "Counsellor Desk") {
      setActiveTab("exam");
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
          {/* Confidential Authenticated Student Identity Badge */}
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 text-xs text-emerald-800 dark:text-emerald-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono font-bold tracking-wide">
              {student.id}
            </span>
            <span className="hidden sm:inline font-semibold text-foreground">
              · {student.name}
            </span>
            <span className="hidden md:inline rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              Confidential Session
            </span>
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
                  {student.admissionMode && (
                    <>
                      <span>•</span>
                      <span>
                        Route: <strong className="text-primary font-semibold">{student.admissionMode}</strong> ({student.entranceRank || "Merit"})
                      </span>
                    </>
                  )}
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
              {duesBreakdown.hasCarriedForward && (
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                  (Incl. {inr(duesBreakdown.carriedForwardDue)} carried over)
                </div>
              )}
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
            { id: "exam", label: "Exam Hall Ticket & Permissions", icon: ShieldCheck, hasWarning: !examEligibility.isEligible },
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
                {t.hasWarning && (
                  <span className="size-2 rounded-full bg-destructive animate-pulse" />
                )}
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
                      Pay in full or use our flexible partial payment option to clear fees.
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

            {/* Previous Semester Dues & Balance Summary */}
            <div
              className={`rounded-2xl border p-5 sm:p-6 shadow-sm space-y-4 ${
                duesBreakdown.hasCarriedForward
                  ? "border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-primary/5 to-background dark:from-amber-950/25 dark:via-primary/5 dark:to-card"
                  : "border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-background dark:from-emerald-950/20 dark:to-card"
              }`}
            >
              {/* Header with Title & Status Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/60 pb-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${
                      duesBreakdown.hasCarriedForward
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 shadow-xs"
                        : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-xs"
                    }`}
                  >
                    <History className="size-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                        Previous Semester Pending Dues
                      </h3>
                      <Badge
                        className={
                          duesBreakdown.hasCarriedForward
                            ? "bg-amber-600 text-white font-semibold text-[10px]"
                            : "bg-emerald-600 text-white font-semibold text-[10px]"
                        }
                      >
                        {duesBreakdown.hasCarriedForward ? "Arrears Pending" : "All Previous Cleared"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Summary of outstanding balance and cleared fees from previous semesters.
                    </p>
                  </div>
                </div>

                {duesBreakdown.hasCarriedForward && (
                  <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1 border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10">
                    Previous Dues: {inr(duesBreakdown.carriedForwardDue)}
                  </Badge>
                )}
              </div>

              {/* THREE-BOX SUMMARY DISPLAY */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {/* 1. Current Semester Due */}
                <div className="rounded-xl border border-border/80 bg-card p-3.5 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                    <span>Current Semester Due</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted font-bold">Active Term</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-foreground mt-2">
                    {inr(duesBreakdown.currentSemesterDue)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Tuition &amp; university fees for active semester
                  </div>
                </div>

                {/* 2. Carried-Forward Prior Dues */}
                <div
                  className={`rounded-xl border p-3.5 flex flex-col justify-between shadow-2xs ${
                    duesBreakdown.hasCarriedForward
                      ? "border-amber-500/40 bg-amber-500/10 dark:bg-amber-950/25"
                      : "border-border/80 bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span
                      className={
                        duesBreakdown.hasCarriedForward
                          ? "text-amber-950 dark:text-amber-200 font-bold"
                          : "text-muted-foreground"
                      }
                    >
                      Previous Semester Dues
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        duesBreakdown.hasCarriedForward
                          ? "bg-amber-600 text-white"
                          : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                      }`}
                    >
                      {duesBreakdown.hasCarriedForward ? "Pending Balance" : "Fully Cleared"}
                    </span>
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-black mt-2 ${
                      duesBreakdown.hasCarriedForward
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {inr(duesBreakdown.carriedForwardDue)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {duesBreakdown.hasCarriedForward
                      ? `Unpaid dues from ${duesBreakdown.activeCarryForwardBreakdown.map((b) => b.fromSemLabel).join(", ")}`
                      : "No unpaid dues from prior semesters"}
                  </div>
                </div>

                {/* 3. Total Outstanding Payable */}
                <div
                  className={`rounded-xl border p-3.5 flex flex-col justify-between shadow-2xs ${
                    duesBreakdown.totalOutstandingDue > 0
                      ? "border-primary/40 bg-primary/5 dark:bg-primary/10"
                      : "border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/30"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span
                      className={
                        duesBreakdown.totalOutstandingDue > 0
                          ? "text-foreground font-bold"
                          : "text-emerald-950 dark:text-emerald-200 font-bold"
                      }
                    >
                      Total Amount Outstanding
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-foreground/10 text-foreground font-mono">
                      Current + Previous
                    </span>
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-black mt-2 ${
                      duesBreakdown.totalOutstandingDue > 0
                        ? "text-primary dark:text-primary"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {inr(duesBreakdown.totalOutstandingDue)}
                  </div>
                  <div className="text-[11px] font-semibold mt-1 text-foreground/80">
                    {duesBreakdown.totalOutstandingDue > 0
                      ? `${inr(duesBreakdown.currentSemesterDue)} (Current) + ${inr(duesBreakdown.carriedForwardDue)} (Previous) = ${inr(duesBreakdown.totalOutstandingDue)}`
                      : "Account fully cleared · ₹0 Outstanding"}
                  </div>
                </div>
              </div>

              {/* SEMESTER-BY-SEMESTER DUES AUDIT TABLE OR VERIFIED STATUS */}
              {duesBreakdown.hasCarriedForward ? (
                <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2.5 border-b border-border/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      Detailed Previous Semester Dues Breakdown
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      Academic Records
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/40 text-muted-foreground border-b text-[11px]">
                        <tr>
                          <th className="py-2.5 px-4 text-left font-semibold">Semester</th>
                          <th className="py-2.5 px-4 text-left font-semibold">Academic Year</th>
                          <th className="py-2.5 px-4 text-right font-semibold">Semester Fee</th>
                          <th className="py-2.5 px-4 text-right font-semibold">Amount Paid</th>
                          <th className="py-2.5 px-4 text-right font-semibold">Remaining Due</th>
                          <th className="py-2.5 px-4 text-center font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {duesBreakdown.activeCarryForwardBreakdown.map((item, idx) => {
                          const liquidated = Math.max(0, item.originalDue - item.remainingDue);
                          return (
                            <tr key={idx} className="hover:bg-muted/20">
                              <td className="py-3 px-4 font-bold text-foreground">
                                {item.fromSemLabel}
                              </td>
                              <td className="py-3 px-4 text-muted-foreground">
                                {item.fromAcademicYear}
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                                {inr(item.originalDue)}
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-emerald-600 font-semibold">
                                {liquidated > 0 ? `−${inr(liquidated)}` : "₹0"}
                              </td>
                              <td className="py-3 px-4 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                                {inr(item.remainingDue)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <Badge className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-[10px] font-bold">
                                  Pending
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 bg-muted/30 border-t text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
                    <Info className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Note:</strong> Any fee payment you make will automatically clear your <strong>{duesBreakdown.activeCarryForwardBreakdown[0]?.fromSemLabel}</strong> pending balance ({inr(duesBreakdown.activeCarryForwardBreakdown[0]?.remainingDue)}) first before being credited to your current semester fees.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-3.5 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>All Clear:</strong> All previous semesters have zero unpaid liabilities. No pending balance carried forward to current semester.
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                    Previous Dues = ₹0
                  </span>
                </div>
              )}
            </div>

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

            {/* Carried-Forward Arrears Active Banner (Step 6) */}
            {duesBreakdown.hasCarriedForward && (
              <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-300">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-foreground">
                          Previous Semester Dues Carried Forward
                        </h4>
                        <Badge className="bg-purple-600 text-white text-[10px] font-mono">
                          Total Carried: {inr(duesBreakdown.carriedForwardDue)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Current semester fee: {inr(duesBreakdown.currentSemesterDue)} · Total outstanding across all cycles: {inr(duesBreakdown.totalOutstandingDue)}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 shrink-0 border-purple-300 dark:border-purple-800 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-950/60"
                    onClick={() => setActiveTab("breakdown")}
                  >
                    View Lineage Breakdown
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 border-t border-purple-200/50 dark:border-purple-800/50">
                  {duesBreakdown.activeCarryForwardBreakdown.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 font-mono text-xs border border-purple-200 dark:border-purple-800"
                    >
                      <span className="font-sans font-semibold text-purple-700 dark:text-purple-400">Sem {item.fromSemNo} ({item.fromAcademicYear}):</span>
                      <strong>{inr(item.remainingDue)}</strong>
                      <span className="text-[10px] text-muted-foreground">(Original: {inr(item.originalDue)})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Exam Hall Ticket & Examination Eligibility Card (Step 4 & 6) */}
            {(() => {
              const isEligible = examEligibility.isEligible;
              const pendingReq = permissionRequests.find(r => r.status === "Pending");
              const approvedReq = permissionRequests.find(r => r.status === "Approved");

              return (
                <div
                  className={`rounded-2xl border backdrop-blur-xl p-5 shadow-sm transition-all ${
                    examEligibility.admitCardStatus === "BLOCKED_ATTENDANCE"
                      ? "border-rose-500/35 bg-rose-500/10 dark:bg-rose-500/10"
                      : examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                      ? "border-amber-500/35 bg-amber-500/10 dark:bg-amber-500/10"
                      : "border-emerald-500/35 bg-emerald-500/10 dark:bg-emerald-500/10"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    {/* Left: Status Icon & Details */}
                    <div className="flex items-start gap-4">
                      <span
                        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border shadow-xs ${
                          examEligibility.admitCardStatus === "BLOCKED_ATTENDANCE"
                            ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30"
                            : examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        {examEligibility.admitCardStatus === "BLOCKED_ATTENDANCE" ? (
                          <AlertTriangle className="size-6" />
                        ) : examEligibility.admitCardStatus === "PROVISIONAL_DUES" ? (
                          <Clock className="size-6" />
                        ) : (
                          <CheckCircle2 className="size-6" />
                        )}
                      </span>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold text-foreground tracking-tight">
                            {examEligibility.admitCardStatus === "CLEAN_ELIGIBLE"
                              ? "✅ Clean Regular Admit Card Issued"
                              : examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                              ? "⚠️ Provisional Admit Card Issued (Pending Dues Notice)"
                              : examEligibility.admitCardStatus === "CONDONED_ELIGIBLE"
                              ? "✅ Condoned Admit Card Issued via Dean Order"
                              : "⛔ Exam Admit Card Blocked (Attendance < 75%)"}
                          </h4>
                          <Badge
                            className={`text-[11px] font-semibold ${
                              examEligibility.admitCardStatus === "BLOCKED_ATTENDANCE"
                                ? "bg-destructive text-white"
                                : examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                                ? "bg-amber-600 text-white"
                                : "bg-emerald-600 text-white"
                            }`}
                          >
                            {examEligibility.admitCardStatus === "BLOCKED_ATTENDANCE"
                              ? "Admit Card Blocked"
                              : examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                              ? "Provisional Hall Ticket"
                              : "Admit Card Cleared"}
                          </Badge>
                          {pendingReq && (
                            <Badge variant="outline" className="bg-amber-500/15 text-amber-600 border-amber-500/30 text-[10px] font-semibold">
                              ⏳ Permission Request Pending ({pendingReq.id})
                            </Badge>
                          )}
                          {approvedReq && (
                            <Badge variant="outline" className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30 text-[10px] font-semibold">
                              ✅ Condonation Approved by Dean ({approvedReq.letterRef || approvedReq.id})
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {examEligibility.admitCardStatus === "CLEAN_ELIGIBLE"
                            ? "All university fee dues are cleared (₹0 outstanding) and attendance satisfies the statutory 75% criterion. Clean admit card is authorized for all scheduled examinations."
                            : examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                            ? `Outstanding dues of ${inr(examEligibility.outstandingDues)} do not block your exam entry. A provisional admit card has been issued with a mandatory undertaking clause.`
                            : examEligibility.admitCardStatus === "CONDONED_ELIGIBLE"
                            ? `Examination entry authorized under Dean Condonation Order (${examEligibility.condonationRef}). Hall ticket is cleared.`
                            : `Under VFSTR Examination Bylaws (Section 4.2), admit cards are blocked due to statutory attendance deficit (${examEligibility.currentAttendance.toFixed(1)}% < 75%). Counsellor condonation is required.`}
                        </p>

                        {/* Snapshot stats strip */}
                        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground">Semester Attendance:</span>
                            <strong
                              className={
                                examEligibility.currentAttendance >= 75
                                  ? "text-emerald-600 font-bold"
                                  : "text-destructive font-bold"
                              }
                            >
                              {examEligibility.currentAttendance.toFixed(1)}%
                            </strong>
                            <span className="text-[10px] text-muted-foreground">
                              (Min 75.0% required)
                            </span>
                          </div>
                          <div className="h-3.5 w-px bg-border hidden sm:block" />
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground">Outstanding Dues:</span>
                            <strong
                              className={
                                examEligibility.outstandingDues <= 0
                                  ? "text-emerald-600 font-bold"
                                  : "text-amber-600 font-bold"
                              }
                            >
                              {inr(examEligibility.outstandingDues)}
                            </strong>
                            {duesBreakdown.hasCarriedForward && (
                              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                                ({inr(duesBreakdown.carriedForwardDue)} carried over)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
                      {examEligibility.canGenerateAdmitCard ? (
                        <Button
                          size="sm"
                          className={`h-9 px-4 rounded-xl text-xs font-semibold gap-1.5 text-white shadow-xs ${
                            examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                              ? "bg-amber-600 hover:bg-amber-700"
                              : examEligibility.admitCardStatus === "CONDONED_ELIGIBLE"
                              ? "bg-indigo-600 hover:bg-indigo-700"
                              : "bg-emerald-600 hover:bg-emerald-700"
                          }`}
                          onClick={() => setIsAdmitCardModalOpen(true)}
                        >
                          <GraduationCap className="size-4" />
                          {examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                            ? "View Provisional Admit Card"
                            : examEligibility.admitCardStatus === "CONDONED_ELIGIBLE"
                            ? "View Condoned Admit Card"
                            : "Download Admit Card (PDF)"}
                        </Button>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            className="h-9 px-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs gap-1.5"
                            onClick={() => setIsPermissionModalOpen(true)}
                          >
                            <Send className="size-3.5" />
                            Submit Permission Letter
                          </Button>
                          {permissionRequests.length > 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-9 px-3 text-xs"
                              onClick={() => setActiveTab("exam")}
                            >
                              Track Requests ({permissionRequests.length})
                            </Button>
                          )}
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 px-3 text-xs"
                        onClick={() => setActiveTab("exam")}
                      >
                        Exam Centre &amp; Rules
                      </Button>
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

        {/* Tab: Exam Hall Ticket & Permission Requests (Step 4) */}
        {activeTab === "exam" && (
          <div className="space-y-6">
            {/* 1. Official Hall Ticket Verification Card */}
            <div className="rounded-2xl border bg-card p-6 shadow-xs relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b">
                <div className="flex items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
                    <FileCheck2 className="size-7" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-foreground tracking-tight">
                        Semester End Examination Hall Ticket
                      </h2>
                      <Badge
                        className={`text-xs font-semibold ${
                          examEligibility.isEligible
                            ? "bg-emerald-600 text-white"
                            : "bg-destructive text-white"
                        }`}
                      >
                        {examEligibility.isEligible ? "✅ Hall Ticket Validated" : "🚫 Hall Ticket Withheld"}
                      </Badge>
                      <Badge variant="outline" className="font-mono text-xs font-semibold">
                        AY 2026–27
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Vignan&apos;s Foundation for Science, Technology &amp; Research &middot; Office of the Controller of Examinations
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {examEligibility.canGenerateAdmitCard ? (
                    <Button
                      size="sm"
                      className={`gap-1.5 text-xs font-semibold text-white shadow-xs ${
                        examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                          ? "bg-amber-600 hover:bg-amber-700"
                          : examEligibility.admitCardStatus === "CONDONED_ELIGIBLE"
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                      onClick={() => setIsAdmitCardModalOpen(true)}
                    >
                      <GraduationCap className="size-3.5" />
                      {examEligibility.admitCardStatus === "PROVISIONAL_DUES"
                        ? "View Provisional Admit Card (Dues Notice)"
                        : examEligibility.admitCardStatus === "CONDONED_ELIGIBLE"
                        ? "View Condoned Admit Card (Dean Order)"
                        : "Download & Print Admit Card (PDF)"}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="gap-1.5 bg-primary text-primary-foreground text-xs font-semibold shadow-xs"
                      onClick={() => setIsPermissionModalOpen(true)}
                    >
                      <Send className="size-3.5" />
                      Apply for Exam Condonation
                    </Button>
                  )}
                  {examEligibility.admitCardStatus === "BLOCKED_ATTENDANCE" && (
                    <Badge variant="outline" className="border-rose-300 text-rose-700 dark:border-rose-800 dark:text-rose-400 text-xs py-1">
                      ⛔ Blocked: Att &lt; 75%
                    </Badge>
                  )}
                </div>
              </div>

              {/* Student Examination Identity Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px] font-medium">Candidate Name</span>
                  <strong className="text-foreground text-sm font-semibold">{student.name}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] font-medium">Registration / Roll No</span>
                  <strong className="text-foreground text-sm font-mono font-semibold">{student.id}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] font-medium">Degree &amp; Programme</span>
                  <strong className="text-foreground text-sm font-semibold">{student.programme}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px] font-medium">Examination Cycle</span>
                  <strong className="text-foreground text-sm font-semibold">Semester 3 (Regular)</strong>
                </div>
              </div>

              {/* Statutory Admit Card Status Notice Banner (Step 6) */}
              {examEligibility.admitCardStatus === "PROVISIONAL_DUES" && (
                <div className="mt-4 p-3.5 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
                  <Clock className="size-4 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <strong className="font-semibold block">Provisional Admit Card Issued with Undertaking Clause</strong>
                    <span>
                      Under VFSTR Examination Ordinance 4.2 / 8.2, pending fee dues of {inr(examEligibility.outstandingDues)} do not prevent you from taking your semester exams. Your admit card has been provisionally issued with a results undertaking clause. You must settle dues before the announcement of semester results.
                    </span>
                  </div>
                </div>
              )}
              {examEligibility.admitCardStatus === "CONDONED_ELIGIBLE" && (
                <div className="mt-4 p-3.5 rounded-xl border border-indigo-300 bg-indigo-50 dark:bg-indigo-950/30 dark:border-indigo-900 text-indigo-800 dark:text-indigo-300 text-xs flex items-start gap-3">
                  <ShieldCheck className="size-4 shrink-0 mt-0.5 text-indigo-600" />
                  <div>
                    <strong className="font-semibold block">Dean Condonation Order Active ({examEligibility.condonationRef})</strong>
                    <span>
                      Attendance condonation has been granted by the Dean of Student Affairs with digital counsellor approval. Examination entry is fully cleared.
                    </span>
                  </div>
                </div>
              )}
              {examEligibility.admitCardStatus === "BLOCKED_ATTENDANCE" && (
                <div className="mt-4 p-3.5 rounded-xl border border-rose-300 bg-rose-50 dark:bg-rose-950/30 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-3">
                  <AlertTriangle className="size-4 shrink-0 mt-0.5 text-rose-600" />
                  <div>
                    <strong className="font-semibold block">Admit Card Blocked — Statutory Attendance Breach</strong>
                    <span>
                      Candidate attendance ({examEligibility.currentAttendance.toFixed(1)}%) is below the mandatory 75.0% threshold. Examination entry is prohibited under Ordinance Clause 8.1 unless a formal Condonation Request is approved by the Dean of Student Affairs.
                    </span>
                  </div>
                </div>
              )}

              {/* Statutory Dual Clearance Evaluator */}
              <div className="mt-5 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Statutory University Examination Clearance Checks
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Criterion 1: Attendance */}
                  <div
                    className={`rounded-xl border p-4 transition-all ${
                      examEligibility.currentAttendance >= 75
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-destructive/20 bg-destructive/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        {examEligibility.currentAttendance >= 75 ? (
                          <CheckCircle2 className="size-4 text-emerald-600" />
                        ) : (
                          <XCircle className="size-4 text-destructive" />
                        )}
                        Criterion 1: Semester Attendance
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          examEligibility.currentAttendance >= 75
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]"
                            : "bg-destructive/10 text-destructive border-destructive/30 text-[10px]"
                        }
                      >
                        {examEligibility.currentAttendance >= 75 ? "Compliant" : "Deficient (<75%)"}
                      </Badge>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-2xl font-bold tabular-nums text-foreground">
                        {examEligibility.currentAttendance.toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Mandatory Cutoff: <strong>75.0%</strong>
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {examEligibility.currentAttendance >= 75
                        ? "Your attendance meets the minimum classroom engagement threshold prescribed by UGC & VFSTR academic bylaws."
                        : "Attendance is below the mandatory 75% cutoff. A Dean / Counsellor permission order is required to condone the shortfall."}
                    </p>
                  </div>

                  {/* Criterion 2: Financial Dues */}
                  <div
                    className={`rounded-xl border p-4 transition-all ${
                      examEligibility.outstandingDues <= 0
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-destructive/20 bg-destructive/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        {examEligibility.outstandingDues <= 0 ? (
                          <CheckCircle2 className="size-4 text-emerald-600" />
                        ) : (
                          <XCircle className="size-4 text-destructive" />
                        )}
                        Criterion 2: Institutional Fee Clearance
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          examEligibility.outstandingDues <= 0
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]"
                            : "bg-destructive/10 text-destructive border-destructive/30 text-[10px]"
                        }
                      >
                        {examEligibility.outstandingDues <= 0 ? "Zero Dues" : "Balance Due"}
                      </Badge>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-2xl font-bold tabular-nums text-foreground">
                        {inr(examEligibility.outstandingDues)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Required Outstanding: <strong>₹0</strong>
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {examEligibility.outstandingDues <= 0
                        ? "All semester tuition, hostel, and institutional laboratory fees are settled in full. No dues pending in accounts ledger."
                        : "Outstanding fee balance must be settled at the cashier counter / online gateway before the commencement of examination."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Authorized Digital Signature Verification Stamp */}
              <div className="mt-5 p-4 rounded-xl border bg-muted/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-primary/10 border flex items-center justify-center text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Authorized Examination Clearance Authority
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Priya Sharma &middot; Chief Finance Officer &middot; VFSTR Finance &amp; Accounts Division
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="border border-border/80 rounded-lg px-3 py-1 bg-background flex flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/k-v-raman-signature.png"
                      alt="Dr. K. V. Raman Signature"
                      className="h-8 w-auto object-contain dark:invert"
                    />
                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest border-t pt-0.5 mt-0.5 w-full text-center">
                      Digitally Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Permission Requests History & Real-Time Status Tracker */}
            <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <History className="size-4 text-primary" />
                    Online Exam Permission Requests &amp; Letters
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Real-time status tracking for Dean / Academic Counsellor exam permission applications.
                  </p>
                </div>

                <Button
                  size="sm"
                  className="h-8 text-xs font-semibold gap-1.5"
                  onClick={() => setIsPermissionModalOpen(true)}
                >
                  <Send className="size-3.5" />
                  New Permission Letter
                </Button>
              </div>

              {permissionRequests.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground border rounded-xl bg-muted/20">
                  No permission letters submitted. If your hall ticket is withheld due to dues or attendance, submit an online request above.
                </div>
              ) : (
                <div className="space-y-3">
                  {permissionRequests.map((req) => (
                    <div
                      key={req.id}
                      className="rounded-xl border p-4 space-y-3 hover:bg-muted/15 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-foreground bg-muted px-2 py-0.5 rounded-md">
                            {req.id}
                          </span>
                          <span className="font-semibold text-sm text-foreground">
                            {req.reason}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-muted-foreground">
                            Submitted: {req.submittedAt}
                          </span>
                          <Badge
                            className={`text-xs font-semibold ${
                              req.status === "Approved"
                                ? "bg-emerald-600 text-white"
                                : req.status === "Rejected"
                                ? "bg-destructive text-white"
                                : "bg-amber-500 text-white"
                            }`}
                          >
                            {req.status === "Approved"
                              ? "✅ Approved"
                              : req.status === "Rejected"
                              ? "❌ Rejected"
                              : "⏳ Pending Review"}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-xs text-foreground/90 leading-relaxed">
                        {req.supportingInfo}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 text-muted-foreground">
                        <div>
                          <span>Snapshotted Dues: </span>
                          <strong className="text-foreground">{inr(req.snapshottedDues)}</strong>
                        </div>
                        <div>
                          <span>Snapshotted Attendance: </span>
                          <strong className="text-foreground">{req.snapshottedAttendance.toFixed(1)}%</strong>
                        </div>
                        {req.reviewedBy && (
                          <div className="col-span-2">
                            <span>Reviewed By: </span>
                            <strong className="text-foreground">{req.reviewedBy} ({req.reviewedAt})</strong>
                          </div>
                        )}
                      </div>

                      {/* Rejection Remarks Banner if Rejected */}
                      {req.status === "Rejected" && req.rejectionReason && (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 space-y-1 text-xs">
                          <span className="font-semibold text-destructive flex items-center gap-1.5">
                            <XCircle className="size-3.5 shrink-0" />
                            Counsellor Rejection Reason:
                          </span>
                          <p className="text-foreground/90 leading-relaxed font-medium">
                            {req.rejectionReason}
                          </p>
                          {req.counsellorNotes && (
                            <p className="text-muted-foreground text-[11px] pt-1">
                              <strong>Counsellor Notes:</strong> {req.counsellorNotes}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Approval Conditions Banner if Approved */}
                      {req.status === "Approved" && req.counsellorNotes && (
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1 text-xs">
                          <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                            <CheckCircle2 className="size-3.5 shrink-0" />
                            Approval Order &amp; Conditions:
                          </span>
                          <p className="text-foreground/90 leading-relaxed font-medium">
                            {req.counsellorNotes}
                          </p>
                        </div>
                      )}

                      {/* Official Downloadable Permission Letter for Approved Requests */}
                      {req.status === "Approved" && (
                        <div className="pt-2 border-t flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs">
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-mono">
                              Ref: {req.letterRef || "VFSTR/EPL/2026/001"}
                            </Badge>
                            {req.digitalSignature && (
                              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <ShieldCheck className="size-3.5 text-emerald-600" />
                                Digitally Signed ({req.digitalSignature.verificationCode})
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="h-8 text-xs font-semibold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                            onClick={() => {
                              setActiveViewerDoc({
                                type: "exam_permission",
                                options: {
                                  permissionRequest: req,
                                  certRef: req.letterRef || "VFSTR/EPL/2026/001",
                                },
                              });
                            }}
                          >
                            <Download className="size-3.5" />
                            View / Print Official Permission Letter (PDF)
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 6: Automated Examination Admit Card Document Viewer Modal */}
            <DocumentViewerModal
              isOpen={isAdmitCardModalOpen}
              onClose={() => setIsAdmitCardModalOpen(false)}
              docType="admit_card"
              student={student}
            />
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
                      {student.admissionMode ? `${student.admissionMode} Scholarship Award:` : "Merit Scholarship Award:"}
                    </span>{" "}
                    {student.scholarshipEligibilityNote || `Tuition Waiver (${student.scholarshipPercent || 25}% Sanctioned Relief)`}
                  </div>
                  <span className="font-bold text-primary">
                    -{inr(scholarshipAmount)}
                  </span>
                </div>
              )}

              {/* Previous Semester Dues Carried Forward Lineage Card (Step 6) */}
              {duesBreakdown.hasCarriedForward && (
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-purple-600 dark:text-purple-400" />
                      <h4 className="text-sm font-bold text-foreground">
                        Previous Semester Pending Dues Breakdown
                      </h4>
                    </div>
                    <Badge className="bg-purple-600 text-white font-mono text-xs">
                      Previous Dues: {inr(duesBreakdown.carriedForwardDue)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Unsettled balances from previous academic semesters. Any payment will automatically settle previous dues first before being applied to current semester fees.
                  </p>
                  <div className="rounded-lg border overflow-hidden bg-card">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/70 text-muted-foreground border-b">
                        <tr>
                          <th className="py-2.5 px-3 text-left font-semibold">Originating Semester</th>
                          <th className="py-2.5 px-3 text-left font-semibold">Academic Cycle</th>
                          <th className="py-2.5 px-3 text-right font-semibold">Original Carried Over</th>
                          <th className="py-2.5 px-3 text-right font-semibold">Current Remaining Due</th>
                          <th className="py-2.5 px-3 text-center font-semibold">Priority Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {duesBreakdown.activeCarryForwardBreakdown.map((item, idx) => (
                          <tr key={idx} className="hover:bg-muted/30">
                            <td className="py-2.5 px-3 font-semibold text-foreground">
                              Sem {item.fromSemNo} ({item.fromSemLabel})
                            </td>
                            <td className="py-2.5 px-3 text-muted-foreground font-mono">
                              {item.fromAcademicYear}
                            </td>
                            <td className="py-2.5 px-3 text-right text-muted-foreground font-mono">
                              {inr(item.originalDue)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-purple-700 dark:text-purple-300 font-mono">
                              {inr(item.remainingDue)}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800 text-[10px]">
                                Priority #{idx + 1} (Oldest Arrear)
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-muted/40 font-bold border-t">
                        <tr>
                          <td colSpan={3} className="py-2.5 px-3 text-foreground">
                            Total Previous Dues
                          </td>
                          <td className="py-2.5 px-3 text-right text-purple-700 dark:text-purple-300 font-mono">
                            {inr(duesBreakdown.carriedForwardDue)}
                          </td>
                          <td className="py-2.5 px-3 text-center text-[11px] text-muted-foreground">
                            Pending Due
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
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
          const timeline = computeScholarshipEligibilityTimeline(student.id);

          return (
            <div className="space-y-5">
              {/* Academic Progression & Scholarship Discontinuation Notice */}
              {timeline.isDiscontinued ? (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
                    <AlertTriangle className="size-4 shrink-0" />
                    Official Notice: Scholarship Discontinued
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                    {timeline.discontinuationReason}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-destructive/20 text-xs">
                    <div>
                      <span className="text-muted-foreground">Discontinued Starting: </span>
                      <span className="font-semibold text-foreground">{timeline.discontinuationSemester?.semLabel || "Current Academic Year"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Revoked Scholarship Benefit: </span>
                      <span className="font-bold text-destructive">−{inr(timeline.totalScholarshipRevoked)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground italic">
                    Under university policy, fee demands for affected semesters have been auto-adjusted to standard gross institutional rates. Contact the Academic Bursar for appeals.
                  </p>
                </div>
              ) : timeline.currentStatus === "AtRisk" ? (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-xs space-y-1 text-xs text-amber-700 dark:text-amber-300">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <AlertTriangle className="size-4 shrink-0" />
                    Academic Standing Advisory: Scholarship at Warning Threshold
                  </div>
                  <p className="text-muted-foreground">
                    Your scholarship is currently active, but your cumulative CGPA is within the warning corridor (7.0–7.5). Please maintain a CGPA of 7.0 or higher to ensure continuous scholarship renewal.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-xs space-y-1 text-xs text-emerald-700 dark:text-emerald-300">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <ShieldCheck className="size-4 shrink-0" />
                    Academic Standing: Scholarship Fully Active & Compliant
                  </div>
                  <p className="text-muted-foreground">
                    Congratulations on meeting the university&apos;s merit criteria (CGPA ≥ 7.50 and Attendance ≥ 75%). Your scholarship tuition credit is active.
                  </p>
                </div>
              )}

              {/* Semester-wise Academic & Fee Progression Table */}
              <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Semester Academic &amp; Fee Ledger
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Authoritative semester-by-semester SGPA, cumulative CGPA, attendance, and scholarship fee deductions.
                  </p>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/70 text-muted-foreground border-b">
                      <tr>
                        <th className="py-2.5 px-3 text-left font-semibold">Semester</th>
                        <th className="py-2.5 px-3 text-left font-semibold">Academic Year</th>
                        <th className="py-2.5 px-3 text-center font-semibold">Cumulative CGPA</th>
                        <th className="py-2.5 px-3 text-center font-semibold">Attendance</th>
                        <th className="py-2.5 px-3 text-right font-semibold">Gross Fee</th>
                        <th className="py-2.5 px-3 text-right font-semibold">Scholarship</th>
                        <th className="py-2.5 px-3 text-right font-semibold">Net Demand</th>
                        <th className="py-2.5 px-3 text-right font-semibold">Paid</th>
                        <th className="py-2.5 px-3 text-center font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {timeline.history.map((sem, idx) => (
                        <tr key={`${sem.semLabel}-${idx}`} className="hover:bg-muted/30">
                          <td className="py-2.5 px-3 font-semibold text-foreground">
                            {sem.semLabel}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground">
                            AY {sem.academicYear}
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold">
                            <span className={sem.cumulativeCgpa < 7.0 ? "text-destructive" : sem.cumulativeCgpa < 7.5 ? "text-amber-600" : "text-foreground"}>
                              {sem.cumulativeCgpa.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-normal ml-1">(SGPA {sem.cgpa.toFixed(2)})</span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-medium">
                            {sem.attendance}%
                          </td>
                          <td className="py-2.5 px-3 text-right text-muted-foreground">
                            {inr(sem.grossFee)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-medium text-emerald-600">
                            {sem.scholarshipApplied > 0 ? `−${inr(sem.scholarshipApplied)}` : "₹0"}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-foreground">
                            {inr(sem.netDemand)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-medium text-emerald-600">
                            {inr(sem.paid)}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <Badge
                              variant="outline"
                              className={
                                sem.scholarshipStatus === "Discontinued"
                                  ? "bg-destructive/10 text-destructive border-destructive/30 font-semibold text-[10px]"
                                  : sem.scholarshipStatus === "AtRisk"
                                  ? "bg-amber-500/10 text-amber-600 border-amber-500/30 font-semibold text-[10px]"
                                  : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-semibold text-[10px]"
                              }
                            >
                              {sem.scholarshipStatus}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Receipts Table */}
              <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Official Receipts &amp; Payment History
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

      {/* Online Permission Request Letter Submission Modal (Step 4) */}
      <Dialog open={isPermissionModalOpen} onOpenChange={setIsPermissionModalOpen}>
        <DialogContent
          className="w-[92vw] max-w-xl p-0 overflow-hidden rounded-2xl bg-card border border-border shadow-2xl text-foreground"
        >
          <div className="border-b bg-muted/40 p-5 shrink-0">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <FileCheck2 className="size-5 text-primary" />
                Submit Exam Entry Permission Letter
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Official application to the Academic Counsellor and Dean of Student Affairs for exam entry condonation.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmitPermissionLetter} className="p-5 space-y-4">
            {/* Live Student Snapshot Info Box */}
            <div className="rounded-xl border bg-muted/30 p-3.5 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-semibold text-foreground">
                <span>{student.name} ({student.id})</span>
                <span className="text-muted-foreground">{student.programme}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground pt-1 border-t border-border/60">
                <span>
                  Current Dues: <strong className="text-destructive">{inr(examEligibility.outstandingDues)}</strong>
                </span>
                <span>
                  Current Attendance: <strong className={examEligibility.currentAttendance < 75 ? "text-destructive" : "text-emerald-600"}>{examEligibility.currentAttendance.toFixed(1)}%</strong>
                </span>
              </div>
            </div>

            {/* Reason Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Reason for Examination Permission Request *
              </label>
              <select
                value={permissionReason}
                onChange={(e) => setPermissionReason(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Education Loan Disbursement Delay">Education Loan Disbursement Delay (Sanction letter available)</option>
                <option value="Family Financial Hardship / Agriculture Delay">Family Financial Hardship / Crop Harvest / Business Delay</option>
                <option value="Medical Illness / Hospitalization During Semester">Medical Illness / Hospitalization During Semester</option>
                <option value="Family Bereavement / Emergency">Family Bereavement / Serious Emergency</option>
                <option value="Other Exceptional Circumstances">Other Exceptional Circumstances</option>
              </select>
            </div>

            {/* Detailed Explanation Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Detailed Explanation &amp; Supporting Remarks *
              </label>
              <textarea
                value={supportingInfo}
                onChange={(e) => setSupportingInfo(e.target.value)}
                placeholder="Explain why you could not clear dues / attend classes on time, and mention when dues will be settled or provide medical details..."
                rows={4}
                required
                className="w-full rounded-lg border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
              <p className="text-[10px] text-muted-foreground">
                Minimum 15 characters. This statement will be snapshotted along with your current ledger balance and forwarded to the counsellor.
              </p>
            </div>

            <DialogFooter className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsPermissionModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmittingPermission || !supportingInfo.trim() || supportingInfo.trim().length < 15}
                className="gap-1.5 text-xs font-semibold"
              >
                <Send className="size-3.5" />
                {isSubmittingPermission ? "Submitting..." : "Submit Permission Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
  const [myRequests, setMyRequests] = useState<LoanDocumentRequest[]>([]);
  const [loadingReqs, setLoadingReqs] = useState(true);

  async function loadRequests() {
    setLoadingReqs(true);
    const reqs = await getLoanRequestsAction();
    setMyRequests(reqs.filter((r) => r.student_id === student.id));
    setLoadingReqs(false);
  }

  useEffect(() => {
    loadRequests();
  }, [student.id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    requestLoanDocumentAction({
      student_id: student.id,
      student_name: student.name,
      bank_name: bankName,
      document_type: docType,
    }).then(() => {
      loadRequests();
      setIsSubmitting(false);
      toast.success("Education Loan Document Requested!", {
        description: `Your application for ${docType.replace(
          /_/g,
          " "
        )} has been submitted to the VFSTR Finance Desk.`,
      });
      onRequested();
    });
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
