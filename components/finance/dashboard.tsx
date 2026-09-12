"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarClock,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  CircleHelp,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinDeckLogo } from "@/components/ui/findeck-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  navigation,
  initialAudit,
  downloadExcel,
  type AuditEntry,
  type Student,
  type Transaction,
  type View,
} from "@/lib/finance-data";
import { useLiveFinance } from "@/context/live-finance-context";
import {
  Hero,
  KpiCards,
  FeeHeadOverview,
  CollectionIntelligence,
  OutstandingAgeing,
  FinanceIntelligence,
} from "./overview";
import { FinanceAssistant, FullPageAiAssistant, FloatingAiAssistant } from "./assistant";
import { AuditLog, ReconciliationCenter, RefundApproval } from "./operations";
import { RefundDialog, StudentDrawer, TransactionDialog } from "./details";
import {
  FeeStructureView,
  InstalmentView,
  PaymentsView,
  ReportsView,
  StudentsView,
} from "./views";
import {
  SmartRemindersView,
  ScholarshipRenewalRiskView,
  BankLoanDeskView,
  SqlSchemaInspector,
} from "./organizer-views";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { type NavigationAction } from "@/lib/ai-finance-engine";

const navIcons = [
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  RefreshCw,
  CalendarClock,
  Sparkles,
  Bell,
  ShieldCheck,
  FileText,
  RotateCcw,
  ChartNoAxesCombined,
];
const viewDescriptions: Record<View, string> = {
  Dashboard: "A clearer picture. Smarter decisions. All in one place.",
  Students: "Every student. Every fee. One complete account.",
  "Fee Structure": "Transparent, versioned rules for every programme.",
  Payments: "Track every receipt from gateway to student ledger.",
  Reconciliation: "Bring your gateway and ledger into agreement.",
  "AI Assistant": "Natural language intelligence for dues, reconciliation, and policy rules.",
  Refunds: "Thoughtful reviews. Human-approved financial decisions.",
  Instalments: "Manage split-payment plans, track dues and print receipts.",
  "Smart Reminders": "Policy-governed reminder suppression and student distress prevention.",
  "Scholarship Risks": "Early-warning academic tracking for CGPA and attendance thresholds.",
  "Loan Requests": "Bank education loan document issuance and verification code tracking.",
  Reports: "Turn institutional finance data into clear, actionable reports.",
};

const primaryNavItems: View[] = [
  "Dashboard",
  "Students",
  "Fee Structure",
  "Payments",
  "Reconciliation",
  "Instalments",
];

const moreNavItems: { label: View; desc: string; badge?: string }[] = [
  { label: "Smart Reminders", desc: "Policy Auto-Suppression", badge: "Policy" },
  { label: "Scholarship Risks", desc: "CGPA & Attendance Retention", badge: "Warning" },
  { label: "Loan Requests", desc: "Bank Document Issuance", badge: "Bank Desk" },
  { label: "Refunds", desc: "Withdrawals & Caution Deposit", badge: "Approval" },
  { label: "Reports", desc: "Audit Ledger & SQL Dump", badge: "SQL Engine" },
];

export function FinanceDashboard() {
  const { user, login, logout } = useAuth();
  const currentRole = user?.role || "admin";
  const userName = user?.name || "Finance Admin";
  const userInitials = user?.avatar || "FA";
  const roleTitle = currentRole === "admin" ? "CEO Administrator" : "Finance Officer";

  const [view, setView] = useState<View>("Dashboard");
  const { students, transactions } = useLiveFinance();
  const [moreOpen, setMoreOpen] = useState(false);
  const isMoreActive = moreNavItems.some((item) => item.label === view);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [refundIntent, setRefundIntent] = useState<
    "review" | "approve" | "reject" | null
  >(null);
  const [refundStatus, setRefundStatus] = useState("Awaiting approval");
  const [investigationPrepared, setInvestigationPrepared] = useState(false);
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [audit, setAudit] = useState<AuditEntry[]>(initialAudit);
  const [helpOpen, setHelpOpen] = useState(false);
  function log(action: string, entity: string, status = "Success") {
    setAudit((previous) => [
      {
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: `${userName} (${roleTitle})`,
        action,
        entity,
        status,
      },
      ...previous,
    ]);
  }
  const [pendingAiQuery, setPendingAiQuery] = useState<string | null>(null);
  const [floatingAiOpen, setFloatingAiOpen] = useState(false);
  const [floatingAiQuery, setFloatingAiQuery] = useState<string | null>(null);

  function handleOpenFloatingAi(query?: string) {
    if (query && query.trim()) {
      setFloatingAiQuery(query.trim());
    }
    setFloatingAiOpen(true);
  }

  function handleAskAi(query?: string) {
    if (query && query.trim()) {
      setFloatingAiQuery(query.trim());
    }
    setFloatingAiOpen(true);
  }

  function navigate(next: View, overdue = false) {
    if (next !== "AI Assistant") {
      setPendingAiQuery(null);
    }
    setView(next);
    setOverdueOnly(overdue);
    setMenuOpen(false);
    setNotificationsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function openStudent(student: Student) {
    setSelectedStudent(student);
    log("Viewed student account", student.id);
  }
  function openStudentId(id: string) {
    const student = students.find((s) => s.id === id);
    if (student) openStudent(student);
  }
  function reviewTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction);
    log("Viewed payment", transaction.id);
  }
  function handleAutonomousNavigation(nav: NavigationAction) {
    if (!nav || typeof nav !== "object") return;

    // 1. View Navigation with boundary validation
    if (nav.view && navigation.includes(nav.view)) {
      navigate(nav.view);
    } else if (nav.view) {
      console.warn(`[finDeck AI] Unknown navigation target view: "${nav.view}".`);
    }

    // 2. Focused Student Drawer Resolution
    if (nav.studentId) {
      const student = students.find(
        (s) => s.id.toLowerCase() === nav.studentId?.toLowerCase()
      );
      if (student) {
        openStudent(student);
      } else {
        console.warn(`[finDeck AI] Student ID "${nav.studentId}" not found in local records.`);
      }
    }

    // 3. Focused Payment Transaction Dialog Resolution
    if (nav.transactionId) {
      const txn = transactions.find(
        (t) => t.id.toLowerCase() === nav.transactionId?.toLowerCase()
      );
      if (txn) {
        reviewTransaction(txn);
      } else {
        console.warn(`[finDeck AI] Transaction "${nav.transactionId}" not found in gateway queue.`);
      }
    }

    // 4. Record in Audit Log
    const logDetails = [
      nav.view,
      nav.studentId ? `Student ${nav.studentId}` : null,
      nav.transactionId ? `Txn ${nav.transactionId}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    log("AI Agent Navigated", logDetails || "Switched View");
  }
  function exportOverview() {
    downloadExcel("finDeck-finance-overview", [
      ["finDeck AI — Fictional demo data", "Academic year 2026–27"],
      ["Metric", "Value"],
      ["Total fee demand (INR)", 48560000],
      ["Collected (INR)", 41240000],
      ["Outstanding (INR)", 7320000],
      ["Reconciliation percentage", 99.2],
      ["Pending transactions", 127],
      ["Refund requests awaiting approval", 14],
      ["Students with 90+ days dues", 84],
    ], "Finance Overview");
    log("Exported overview", "Academic year 2026–27");
    toast.success("Finance overview exported as Excel", {
      description: "Fictional demo snapshot · .xlsx format",
    });
  }
  function askAgent() {
    setFloatingAiOpen(true);
  }
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary">
      {/* Ambient background glow cones matching login screen */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[600px] rounded-full bg-indigo-500/8 dark:bg-indigo-600/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 size-[500px] rounded-full bg-cyan-500/6 dark:bg-cyan-500/8 blur-[130px]" />
        <div className="absolute bottom-10 left-10 size-[500px] rounded-full bg-purple-500/6 dark:bg-purple-600/6 blur-[150px]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-border/80 bg-card/80 dark:bg-[#07090e]/80 backdrop-blur-xl transition-colors">
        <div className="app-container flex min-h-20 items-center justify-between gap-5">
          <button
            onClick={() => navigate("Dashboard")}
            aria-label="finDeck Finance Dashboard"
            className="flex shrink-0 items-center gap-2.5 text-left cursor-pointer"
          >
            <FinDeckLogo
              size={38}
              subtitle="VFSTR • Vignan's Foundation"
            />
          </button>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 xl:flex"
          >
            {primaryNavItems.map((item) => {
              const index = navigation.indexOf(item);
              const Icon = navIcons[index];
              return (
                <button
                  className="nav-link text-xs px-2.5 py-1.5 font-medium cursor-pointer"
                  data-active={view === item}
                  aria-current={view === item ? "page" : undefined}
                  key={item}
                  onClick={() => navigate(item)}
                >
                  {item === "Dashboard" && (
                    <Icon className="size-3.5 mr-1 inline" />
                  )}
                  {item}
                </button>
              );
            })}

            {/* More Modules Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                className="nav-link text-xs px-2.5 py-1.5 font-medium flex items-center gap-1 cursor-pointer"
                data-active={isMoreActive}
                aria-expanded={moreOpen}
              >
                <span>{isMoreActive ? view : "More Modules"}</span>
                <ChevronDown
                  className={`size-3 transition-transform duration-200 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMoreOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-1.5 w-64 rounded-xl border bg-card/95 backdrop-blur-md p-1.5 shadow-xl z-50 animate-in fade-in-0 zoom-in-95">
                    {moreNavItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          navigate(item.label);
                          setMoreOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex flex-col gap-0.5 transition-colors cursor-pointer ${
                          view === item.label
                            ? "bg-primary/10 text-primary font-semibold"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-xs">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] rounded px-1.5 py-0.5 bg-muted font-mono text-muted-foreground">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle className="size-8" />
            <Button
              aria-label="Notifications"
              variant="ghost"
              size="icon"
              className="relative size-8"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell className="size-4" />
              {!notificationsRead && (
                <span className="absolute right-1 top-1 size-1.5 rounded-full bg-destructive ring-2 ring-card" />
              )}
            </Button>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <div className="hidden lg:flex items-center gap-2 bg-muted/60 dark:bg-[#0c111d]/70 backdrop-blur-md px-3 py-1 rounded-full text-xs border border-border/80 dark:border-white/10 shadow-2xs">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-muted-foreground text-[11px] font-medium">Role:</span>
              <span className="font-semibold text-foreground">
                {roleTitle}
              </span>
            </div>
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2 text-left cursor-pointer hover:opacity-85 transition-opacity"
              aria-label={`${userName} profile`}
            >
              <span className="relative flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
                {userInitials}
                <span className="absolute bottom-0 right-0 size-2 rounded-full border-2 border-card bg-success" />
              </span>
              <span className="hidden xl:block">
                <span className="block text-xs font-medium">{userName}</span>
              </span>
              <ChevronDown className="hidden size-3 text-muted-foreground xl:block" />
            </button>

            {/* Direct 1-Click Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 px-2.5 cursor-pointer"
              title="Log Out of finDeck"
            >
              <LogOut className="size-3.5 text-destructive" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden size-8"
              aria-label="Open navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="app-container flex flex-wrap gap-1 border-t py-3 xl:hidden"
          >
            {navigation
              .filter((item) => item !== "AI Assistant")
              .map((item) => (
                <button
                  key={item}
                  className="nav-link"
                  data-active={view === item}
                  onClick={() => navigate(item)}
                >
                  {item}
                </button>
              ))}
          </nav>
        )}
      </header>
      <main className="app-container py-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-[23px] font-semibold tracking-tight">
                {view === "Dashboard" ? "Finance overview" : view}
              </h2>
              <Badge variant="secondary">AGENT 40</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {viewDescriptions[view]}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex h-9 items-center gap-2 rounded-lg border bg-card px-3 text-sm text-muted-foreground">
              <CalendarDays className="size-4" /> AY 2026–27
            </div>
            <Button
              variant="outline"
              className="h-9 px-3"
              onClick={exportOverview}
            >
              <ArrowDownToLine data-icon="inline-start" /> Export overview
            </Button>
          </div>
        </div>
        {view === "Dashboard" ? (
          <div className="flex flex-col gap-5">
            <Hero onAsk={askAgent} />
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <p className="flex items-center gap-1.5 text-sm font-medium">
                <span className="online-dot" /> Your financial snapshot
              </p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <RefreshCw className="size-3.5" /> Last synchronized: Today,
                10:21 AM{" "}
                <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-sm">
                  Demo data
                </span>
              </p>
            </div>
            <KpiCards onNavigate={navigate} />
            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.95fr)_minmax(340px,1fr)]">
              <div className="flex min-w-0 flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.45fr)]">
                  <FeeHeadOverview />
                  <CollectionIntelligence />
                </div>
                <ReconciliationCenter
                  onReview={reviewTransaction}
                  onStudent={openStudentId}
                  onViewAll={() => navigate("Reconciliation")}
                  reviewed={investigationPrepared}
                />
                <div className="grid items-stretch gap-5 md:grid-cols-2">
                  <OutstandingAgeing
                    onOverdue={() => navigate("Students", true)}
                  />
                  <RefundApproval
                    onReview={(intent = "review") => setRefundIntent(intent)}
                    status={refundStatus}
                  />
                </div>
              </div>
              <aside className="flex min-w-0 flex-col gap-5">
                <FinanceAssistant
                  onStudent={() => openStudent(students[0])}
                  onRefund={() => setRefundIntent("review")}
                  onReconcile={() => reviewTransaction(transactions[1])}
                  onExpandToPage={(query) => handleAskAi(query)}
                  onOpenFloating={(query) => handleOpenFloatingAi(query)}
                />
                <FinanceIntelligence
                  onNavigate={(next) => navigate(next, next === "Students")}
                  onMismatch={() => reviewTransaction(transactions[1])}
                />
                <div className="flex items-start gap-2.5 rounded-xl border border-primary/10 bg-secondary/45 p-4 text-primary">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium">
                      Intelligence with accountability
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Your agent can analyze, explain and recommend. Financial
                      changes always need an authenticated human.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
            <SqlSchemaInspector />
            <AuditLog entries={audit} />
          </div>
        ) : (
          <div className="enter flex flex-col gap-5">
            {view === "Students" && (
              <StudentsView
                key={String(overdueOnly)}
                onStudent={openStudent}
                initialOverdue={overdueOnly}
              />
            )}
            {view === "Fee Structure" && <FeeStructureView />}
            {view === "Payments" && (
              <PaymentsView onReview={reviewTransaction} />
            )}
            {view === "Reconciliation" && (
              <>
                <KpiCards onNavigate={navigate} />
                <ReconciliationCenter
                  full
                  onReview={reviewTransaction}
                  onStudent={openStudentId}
                  onViewAll={() =>
                    document
                      .getElementById("audit-log")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  reviewed={investigationPrepared}
                />
                <AuditLog entries={audit} full />
              </>
            )}
            {view === "Refunds" && (
              <>
                <RefundApproval
                  onReview={(intent = "review") => setRefundIntent(intent)}
                  status={refundStatus}
                />
                <Card className="panel">
                  <CardHeader>
                    <CardTitle>Designed for human oversight</CardTitle>
                    <CardDescription>
                      20 requests in the institutional summary · Full traceable calculation engine
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        {
                          title: "Calculate & explain",
                          text: "The agent checks policy rules and prepares a traceable calculation.",
                        },
                        {
                          title: "Review & recommend",
                          text: "A finance officer verifies the supporting documents and records a recommendation.",
                        },
                        {
                          title: "Authenticate & authorize",
                          text: "A real authenticated approval is required before any financial change. Payouts are not enabled in this demo.",
                        },
                      ].map((step) => (
                        <div
                          key={step.title}
                          className="flex items-start gap-3 rounded-xl border p-4 bg-card"
                        >
                          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                          <div>
                            <h3 className="font-medium text-sm">{step.title}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {step.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <AuditLog entries={audit} full />
              </>
            )}
            {view === "AI Assistant" && (
              <FullPageAiAssistant
                onStudent={(id) => (id ? openStudentId(id) : openStudent(students[0]))}
                onRefund={() => setRefundIntent("review")}
                onReconcile={() => reviewTransaction(transactions[1])}
                initialPrompt={pendingAiQuery}
                onClearInitialPrompt={() => setPendingAiQuery(null)}
                onNavigate={handleAutonomousNavigation}
                userRole={currentRole}
                currentView={view}
              />
            )}
            {view === "Instalments" && <InstalmentView />}
            {view === "Smart Reminders" && <SmartRemindersView />}
            {view === "Scholarship Risks" && <ScholarshipRenewalRiskView />}
            {view === "Loan Requests" && <BankLoanDeskView />}
            {view === "Reports" && (
              <>
                <ReportsView entries={audit} />
                <SqlSchemaInspector />
              </>
            )}
          </div>
        )}
        <footer className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-foreground">fin<span className="text-primary">Deck</span> AI</span>
            <span>·</span>
            <span>VFSTR University Finance Command Center</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <LockKeyhole className="size-3.5" /> Fictional demo · Session-only
              data
            </span>
            <button
              aria-label="About this demo"
              onClick={() => setHelpOpen(true)}
              className="hover:text-primary"
            >
              <CircleHelp className="size-4" />
            </button>
          </div>
        </footer>
      </main>
      <StudentDrawer
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
      <TransactionDialog
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        prepared={investigationPrepared}
        onPrepare={() => {
          setInvestigationPrepared(true);
          log("Prepared mismatch investigation", "TXN-10483", "Prepared");
          toast.success("Investigation prepared", {
            description: "No ledger changes made. Human review required.",
          });
        }}
      />
      <RefundDialog
        intent={refundIntent}
        onClose={() => setRefundIntent(null)}
        onPrepare={(decision, reason) => {
          setRefundStatus(
            `${decision === "approve" ? "Approval" : "Rejection"} recommended · Authentication required`,
          );
          log(
            `Prepared ${decision === "approve" ? "approval" : "rejection"} recommendation${reason ? `: ${reason}` : ""}`,
            "RF-2081",
            "Prepared",
          );
          toast.success("Review recommendation prepared", {
            description: "No refund has been authorized or executed.",
          });
        }}
      />
      <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <SheetContent>
          <SheetHeader className="border-b p-6">
            <SheetTitle>Finance notifications</SheetTitle>
            <SheetDescription>
              Today’s signals from your demo workspace
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 px-4">
            {[
              {
                title: "23 payment mismatches need review",
                detail: "Start with TXN-10483 · ₹5,000 difference",
                action: () => {
                  setNotificationsOpen(false);
                  reviewTransaction(transactions[1]);
                },
              },
              {
                title: "84 student accounts are overdue",
                detail: "Dues older than 90 days",
                action: () => navigate("Students", true),
              },
              {
                title: "14 refunds are awaiting approval",
                detail: "Human authentication required",
                action: () => navigate("Refunds"),
              },
            ].map((notification) => (
              <button
                key={notification.title}
                onClick={notification.action}
                className="rounded-xl p-4 text-left transition-colors hover:bg-muted"
              >
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.detail}
                </p>
              </button>
            ))}
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => {
                setNotificationsRead(true);
                toast.success("Notifications marked as read");
              }}
              disabled={notificationsRead}
            >
              <Check data-icon="inline-start" />
              {notificationsRead
                ? "All notifications read"
                : "Mark all as read"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{userName}</DialogTitle>
            <DialogDescription>
              {roleTitle} · Vignan&apos;s University (VFSTR) Treasury
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl bg-secondary p-4 text-sm leading-relaxed text-primary">
            Current session role: <strong>{roleTitle}</strong>. 
            {currentRole === "admin"
              ? " You have full treasury privileges including refund approvals and fee structures."
              : " Operational role. Refund approvals require Administrator authorization."}
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/20 p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Officer / Staff ID:</span>
              <span className="font-mono font-bold text-foreground">{user?.id || "STAFF-01"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-medium text-foreground">University Finance Treasury</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Access Privacy:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Check className="size-3 text-emerald-700" /> Account-Locked Session
              </span>
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border/60 leading-relaxed">
            🔒 <strong>Strict RBAC Privacy Enforced:</strong> On-the-fly role switching is strictly disabled to prevent unauthorized account crossover. To access a different portal, please Sign Out and log in with that portal&apos;s verified credentials.
          </div>
          <div className="pt-2 border-t flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Session ID: {user?.id || "DEMO"}</span>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs"
              onClick={() => {
                logout();
                setProfileOpen(false);
              }}
            >
              Log Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Meet finDeck AI</DialogTitle>
            <DialogDescription>
              finDeck — Autonomous University Fee &amp; Finance Command Center
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A university finance demonstration with fictional Indian university
            data, a scripted finance assistant, interactive reports, and human
            review recommendations. Aggregate institutional figures and a small
            set of representative student records are provided for
            demonstration.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Use the navigation to explore student accounts, versioned fees,
            payments and reports. Ask the assistant a suggested question or
            review a reconciliation mismatch to see the audit trail update.
          </p>
          <Badge variant="secondary">
            No live AI · No real payments · No authentication
          </Badge>
        </DialogContent>
      </Dialog>
      <FloatingAiAssistant
        isOpen={floatingAiOpen}
        onOpenChange={setFloatingAiOpen}
        initialQuery={floatingAiQuery}
        onStudent={(id) => (id ? openStudentId(id) : openStudent(students[0]))}
        onRefund={() => setRefundIntent("review")}
        onReconcile={() => reviewTransaction(transactions[1])}
        onExpandToPage={(query) => handleAskAi(query)}
        onNavigate={handleAutonomousNavigation}
        userRole={currentRole}
        currentView={view}
      />
    </div>
  );
}
