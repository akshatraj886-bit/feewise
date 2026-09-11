"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
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
  students,
  transactions,
  initialAudit,
  downloadCsv,
  type AuditEntry,
  type Student,
  type Transaction,
  type View,
} from "@/lib/finance-data";
import {
  Hero,
  KpiCards,
  FeeHeadOverview,
  CollectionIntelligence,
  OutstandingAgeing,
  FinanceIntelligence,
} from "./overview";
import { FinanceAssistant } from "./assistant";
import { AuditLog, ReconciliationCenter, RefundApproval } from "./operations";
import { RefundDialog, StudentDrawer, TransactionDialog } from "./details";
import {
  FeeStructureView,
  PaymentsView,
  ReportsView,
  StudentsView,
} from "./views";
import { cn } from "@/lib/utils";

const navIcons = [
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  RefreshCw,
  RotateCcw,
  ChartNoAxesCombined,
];
const viewDescriptions: Record<View, string> = {
  Dashboard: "A clearer picture. Smarter decisions. All in one place.",
  Students: "Every student. Every fee. One complete account.",
  "Fee Structure": "Transparent, versioned rules for every programme.",
  Payments: "Track every receipt from gateway to student ledger.",
  Reconciliation: "Bring your gateway and ledger into agreement.",
  Refunds: "Thoughtful reviews. Human-approved financial decisions.",
  Reports: "Turn institutional finance data into clear, actionable reports.",
};

export function FinanceDashboard() {
  const [view, setView] = useState<View>("Dashboard");
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
        user: "Finance Admin (demo)",
        action,
        entity,
        status,
      },
      ...previous,
    ]);
  }
  function navigate(next: View, overdue = false) {
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
  function exportOverview() {
    downloadCsv("FEEWISE-finance-overview-DEMO.csv", [
      ["FEEWISE AI — Fictional demo data", "Academic year 2026–27"],
      ["Metric", "Value"],
      ["Total fee demand (INR)", 254000000],
      ["Collected (INR)", 217000000],
      ["Outstanding (INR)", 37000000],
      ["Reconciliation percentage", 97.8],
      ["Pending transactions", 127],
      ["Refund requests awaiting approval", 14],
      ["Students with 90+ days dues", 84],
    ]);
    log("Exported overview", "Academic year 2026–27");
    toast.success("Finance overview downloaded", {
      description: "Fictional demo snapshot · CSV format",
    });
  }
  function askAgent() {
    document
      .getElementById("finance-assistant")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("agent-input")?.focus({ preventScroll: true });
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="app-container flex min-h-20 items-center justify-between gap-5">
          <button
            onClick={() => navigate("Dashboard")}
            aria-label="FEEWISE AI dashboard"
            className="flex shrink-0 items-center gap-2.5 text-left"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
              <GraduationCap className="size-6" strokeWidth={1.65} />
            </span>
            <span>
              <span className="flex items-baseline gap-1.5 text-lg font-bold tracking-[-0.035em]">
                FEEWISE <span className="font-medium text-primary">AI</span>
              </span>
              <span className="block text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
                NORTHFIELD UNIVERSITY
              </span>
            </span>
          </button>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {navigation.map((item, index) => {
              const Icon = navIcons[index];
              return (
                <button
                  className="nav-link"
                  data-active={view === item}
                  aria-current={view === item ? "page" : undefined}
                  key={item}
                  onClick={() => navigate(item)}
                >
                  {index === 0 && <Icon className="size-4" />}
                  {item}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              aria-label="Notifications"
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell />
              {!notificationsRead && (
                <span className="absolute right-1.5 top-1 size-1.5 rounded-full bg-destructive ring-2 ring-card" />
              )}
            </Button>
            <div className="hidden h-7 w-px bg-border sm:block" />
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2.5 text-left"
              aria-label="Finance Admin profile"
            >
              <span className="relative flex size-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                FA
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card bg-success" />
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm font-medium">Finance Admin</span>
                <span className="block text-sm text-muted-foreground">
                  Administrator
                </span>
              </span>
              <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="app-container flex flex-wrap gap-1 border-t py-3 xl:hidden"
          >
            {navigation.map((item) => (
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
              <div className="order-2 flex min-w-0 flex-col gap-5 xl:order-1">
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
              <aside className="order-1 flex min-w-0 flex-col gap-5 xl:order-2">
                <FinanceAssistant
                  onStudent={() => openStudent(students[0])}
                  onRefund={() => setRefundIntent("review")}
                  onReconcile={() => reviewTransaction(transactions[1])}
                  onExport={(id) => log("Exported fee statement", id)}
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
            <AuditLog entries={audit} />
          </div>
        ) : (
          <div className="enter flex flex-col gap-5">
            {view === "Students" && (
              <StudentsView
                key={String(overdueOnly)}
                onStudent={openStudent}
                initialOverdue={overdueOnly}
                onExport={(report) => log("Exported report", report)}
              />
            )}
            {view === "Fee Structure" && <FeeStructureView onExport={(report) => log("Exported report", report)} />}
            {view === "Payments" && (
              <PaymentsView onReview={reviewTransaction} onExport={(report) => log("Exported report", report)} />
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
                <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
                  <RefundApproval
                    onReview={(intent = "review") => setRefundIntent(intent)}
                    status={refundStatus}
                  />
                  <Card className="panel">
                    <CardHeader>
                      <CardTitle>Designed for human oversight</CardTitle>
                      <CardDescription>
                        14 requests in the institutional summary · 1
                        representative demo request
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-5">
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
                            className="flex items-start gap-3"
                          >
                            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                            <div>
                              <h3 className="font-medium">{step.title}</h3>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {step.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <AuditLog entries={audit} full />
              </>
            )}
            {view === "Reports" && <ReportsView entries={audit} onExport={(report) => log("Exported report", report)} />}
          </div>
        )}
        <footer className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">FEEWISE AI</span>
            <span>·</span>
            <span>Agent 40 — Fee Management Agent</span>
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
        onExport={(id) => log("Exported fee statement", id)}
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
            <DialogTitle>Finance Admin</DialogTitle>
            <DialogDescription>
              Northfield University · Demo workspace
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl bg-secondary p-4 text-sm leading-relaxed text-primary">
            You are exploring an administrator-style demo, not an authenticated
            account. All records are fictional, actions are kept in memory, and
            refreshing the page resets this session.
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Real authentication, live data and financial transactions are
            intentionally not connected. No real money can move from this
            interface.
          </p>
        </DialogContent>
      </Dialog>
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Meet FEEWISE AI</DialogTitle>
            <DialogDescription>
              Agent 40 — Fee Management Agent
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
    </div>
  );
}
