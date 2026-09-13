"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  Check,
  CircleCheck,
  Clock3,
  FileCheck2,
  GraduationCap,
  History,
  LockKeyhole,
  Printer,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  inr,
  printReceiptPdf,
  printStatementPdf,
  students,
  type Student,
  type Transaction,
} from "@/lib/finance-data";
import { Status } from "./operations";
import { getStudentAccount, refund, computeScholarshipEligibilityTimeline, getStudentExamEligibility, getStudentDuesBreakdown } from "@/lib/finance-service";
import { FeeCertificatesPanel } from "./certificates";
import { PartialPaymentSimulator } from "./partial-payment-modal";
import { useAuth, canApprove } from "@/lib/auth-context";

export function StudentDrawer({
  student,
  onClose,
}: {
  student: Student | null;
  onClose: () => void;
}) {
  const [profileTab, setProfileTab] = useState<"account" | "history" | "services">("account");
  const account = student ? getStudentAccount(student.id) : null;
  const timeline = student ? computeScholarshipEligibilityTimeline(student.id) : null;
  const examEligibility = student ? getStudentExamEligibility(student.id) : null;
  const duesBreakdown = student ? getStudentDuesBreakdown(student.id) : null;

  return (
    <Dialog
      open={!!student}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="!w-[90vw] !max-w-[90vw] sm:!max-w-[90vw] md:!max-w-[90vw] lg:!max-w-[90vw] xl:!max-w-[90vw] !h-[88vh] !max-h-[88vh] flex flex-col p-0 overflow-hidden rounded-2xl bg-card border border-border shadow-2xl text-foreground"
        style={{ width: "90vw", maxWidth: "90vw", height: "88vh", maxHeight: "88vh" }}
      >
        {student && (
          <div className="flex flex-col w-full h-full max-h-[88vh] overflow-hidden">
            {/* 1. TOP HEADER BANNER */}
            <div className="border-b bg-muted/40 px-6 py-5 shrink-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: Avatar + Identity */}
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-xl border border-primary/20 shadow-xs">
                    {student.initials}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        {student.name}
                      </h2>
                      <Badge variant="outline" className="font-mono text-xs font-semibold px-2 py-0.5 bg-background">
                        {student.id}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          student.admissionStatus === "Prospective"
                            ? "bg-purple-500/10 text-purple-600 border-purple-500/30 font-semibold text-xs"
                            : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-semibold text-xs"
                        }
                      >
                        {student.admissionStatus || "Admitted"}
                      </Badge>
                      {timeline?.isDiscontinued ? (
                        <Badge variant="destructive" className="font-semibold text-xs animate-pulse">
                          ⚠️ Scholarship Discontinued (&lt; 7.0 CGPA)
                        </Badge>
                      ) : timeline?.currentStatus === "AtRisk" ? (
                        <Badge className="bg-amber-500/15 text-amber-600 border border-amber-500/30 text-xs font-semibold">
                          ⚠️ At Risk (CGPA 7.0–7.5)
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 text-xs font-semibold">
                          ✅ Active Scholarship
                        </Badge>
                      )}
                      {examEligibility?.isEligible ? (
                        <Badge className="bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 text-xs font-semibold">
                          ✅ Exam Eligible
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="font-semibold text-xs" title={examEligibility?.primaryReason}>
                          🚫 Exam Withheld ({examEligibility?.ineligibleCategory === "DuesOnly" ? "Dues" : examEligibility?.ineligibleCategory === "AttendanceOnly" ? "Attendance <75%" : "Dues + Att"})
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{student.programme}</span>
                      <span>&bull;</span>
                      <span>Route: <strong className="text-foreground">{student.admissionMode || "V-SAT"}</strong></span>
                      <span>&bull;</span>
                      <span>Score/Quota: <strong className="text-foreground">{student.entranceRank || student.category}</strong></span>
                      <span>&bull;</span>
                      <span>AY 2026–27</span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Action Buttons */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs gap-1.5"
                    onClick={() => {
                      if (!account) return;
                      printStatementPdf({
                        studentName: student.name,
                        studentId: student.id,
                        programme: student.programme,
                        category: student.category,
                        academicYear: account.academicYear,
                        fees: account.fees,
                        scholarship: account.scholarship,
                        concession: student.concession,
                        gross: account.gross,
                        demand: student.demand,
                        paid: student.paid,
                        outstanding: account.outstanding,
                        payments: account.payments,
                        priorCycleSettled: account.priorCycleSettled,
                      });
                      toast.success("Fee statement PDF opened");
                    }}
                  >
                    <ArrowDownToLine className="size-3.5" />
                    Statement (PDF)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs gap-1.5"
                    onClick={() => {
                      const latest = account?.payments[0];
                      printReceiptPdf({
                        receiptNo: latest?.id ?? `RCPT-${student.id}`,
                        studentId: student.id,
                        studentName: student.name,
                        programme: student.programme,
                        date: latest?.date ?? new Date().toLocaleDateString("en-IN"),
                        amount: student.paid,
                        method: latest?.method?.split(" · ")[0] ?? "—",
                        txnId: latest?.id ?? "—",
                        heads: account?.fees.map((f) => ({ head: f.head, amount: f.paid })),
                      });
                      toast.success("Receipt PDF opened");
                    }}
                  >
                    <Printer className="size-3.5" />
                    Receipt (PDF)
                  </Button>
                </div>
              </div>

              {/* Key Metrics Banner */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="rounded-xl border bg-card p-3 shadow-2xs">
                  <p className="text-[11px] text-muted-foreground font-medium">Gross Total Fee</p>
                  <p className="text-base sm:text-lg font-bold tabular-nums text-foreground mt-0.5">
                    {inr(account?.gross || student.demand)}
                  </p>
                </div>

                <div className="rounded-xl border bg-card p-3 shadow-2xs">
                  <p className="text-[11px] text-muted-foreground font-medium">Scholarship Benefit</p>
                  <p className={`text-base sm:text-lg font-bold tabular-nums mt-0.5 ${timeline?.isDiscontinued ? "text-destructive" : "text-emerald-600"}`}>
                    {timeline?.isDiscontinued
                      ? "₹0 (Revoked)"
                      : account?.scholarship
                      ? `−${inr(account.scholarship)}`
                      : student.scholarship
                      ? `−${inr(student.scholarship)}`
                      : "₹0 (None)"}
                  </p>
                  {student.scholarshipPercent !== undefined && student.scholarshipPercent > 0 && !timeline?.isDiscontinued && (
                    <span className="text-[10px] text-emerald-600 font-medium">({student.scholarshipPercent}% waiver)</span>
                  )}
                </div>

                <div className="rounded-xl border bg-card p-3 shadow-2xs">
                  <p className="text-[11px] text-muted-foreground font-medium">Net Payable Demand</p>
                  <p className="text-base sm:text-lg font-bold tabular-nums text-foreground mt-0.5">
                    {inr(student.demand)}
                  </p>
                </div>

                <div className="rounded-xl border bg-card p-3 shadow-2xs">
                  <p className="text-[11px] text-muted-foreground font-medium">Paid to Date</p>
                  <p className="text-base sm:text-lg font-bold tabular-nums text-emerald-600 mt-0.5">
                    {inr(student.paid)}
                  </p>
                </div>

                <div className={`rounded-xl border p-3 shadow-2xs ${(duesBreakdown?.totalOutstandingDue ?? (student.demand - student.paid)) > 0 ? "bg-destructive/5 border-destructive/20" : "bg-emerald-500/5 border-emerald-500/20"}`}>
                  <p className="text-[11px] text-muted-foreground font-medium">Total Outstanding</p>
                  <p className={`text-base sm:text-lg font-bold tabular-nums mt-0.5 ${(duesBreakdown?.totalOutstandingDue ?? (student.demand - student.paid)) > 0 ? "text-destructive" : "text-emerald-600"}`}>
                    {inr(duesBreakdown?.totalOutstandingDue ?? (student.demand - student.paid))}
                  </p>
                  {duesBreakdown?.hasCarriedForward && (
                    <div className="mt-1 flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        Cur: {inr(duesBreakdown.currentSemesterDue)} + Past Arrears: {inr(duesBreakdown.carriedForwardDue)}
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        Prior Term Arrears Included
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Tabs Bar */}
              <div className="mt-4 flex rounded-lg bg-muted p-1 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setProfileTab("account")}
                  className={`flex-1 rounded-md py-2 transition-all flex items-center justify-center gap-1.5 ${
                    profileTab === "account"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <GraduationCap className="size-3.5" />
                  Fee Account &amp; Breakdown
                </button>
                <button
                  type="button"
                  onClick={() => setProfileTab("history")}
                  className={`flex-1 rounded-md py-2 transition-all flex items-center justify-center gap-1.5 ${
                    profileTab === "history"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Clock3 className="size-3.5" />
                  Academic History &amp; Scholarship Ledger
                  {timeline?.isDiscontinued && (
                    <span className="size-2 rounded-full bg-destructive animate-pulse" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setProfileTab("services")}
                  className={`flex-1 rounded-md py-2 transition-all flex items-center justify-center gap-1.5 ${
                    profileTab === "services"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileCheck2 className="size-3.5" />
                  Certificates &amp; Counter Pay
                </button>
              </div>
            </div>

            {/* 2. SCROLLABLE TAB CONTENT BODY */}
            <div className="flex-1 overflow-y-auto p-6">
              {profileTab === "account" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column: Detailed Fee Heads Breakdown (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <FileCheck2 className="size-4 text-primary" />
                        Itemized Fee Heads (AY 2026–27)
                      </h3>
                      <span className="text-xs text-muted-foreground">Standard Waterfall Hierarchy</span>
                    </div>

                    <div className="rounded-xl border bg-card overflow-hidden">
                      <table className="w-full text-xs">
                        <thead className="bg-muted/60 text-muted-foreground border-b font-medium text-left">
                          <tr>
                            <th className="py-2.5 px-3">Fee Head</th>
                            <th className="py-2.5 px-3 text-right">Gross Amount</th>
                            <th className="py-2.5 px-3 text-right">Paid</th>
                            <th className="py-2.5 px-3 text-right">Outstanding</th>
                            <th className="py-2.5 px-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {account?.fees.map((f) => (
                            <tr key={f.head} className="hover:bg-muted/20">
                              <td className="py-2.5 px-3 font-medium text-foreground">{f.head}</td>
                              <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">{inr(f.gross)}</td>
                              <td className="py-2.5 px-3 text-right tabular-nums font-medium text-emerald-600">{inr(f.paid)}</td>
                              <td className={`py-2.5 px-3 text-right tabular-nums font-semibold ${f.outstanding > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                                {inr(f.outstanding)}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] font-medium ${
                                    f.status === "Fully Cleared"
                                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                                      : f.status === "Partially Paid"
                                      ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                                      : "bg-destructive/10 text-destructive border-destructive/30"
                                  }`}
                                >
                                  {f.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Fee Total Footer Summary */}
                      <div className="bg-muted/30 border-t p-3.5 space-y-1.5 text-xs">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Gross Institutional Total</span>
                          <span className="tabular-nums font-medium text-foreground">{inr(account?.gross || 0)}</span>
                        </div>
                        {!!account?.scholarship && (
                          <div className="flex justify-between text-emerald-600 font-medium">
                            <span>Sanctioned Merit Scholarship</span>
                            <span className="tabular-nums">−{inr(account.scholarship)}</span>
                          </div>
                        )}
                        {!!student.concession && (
                          <div className="flex justify-between text-primary font-medium">
                            <span>Special Concession</span>
                            <span className="tabular-nums">−{inr(student.concession)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-border/60 pt-1.5 font-bold text-sm text-foreground">
                          <span>Final Net Demand</span>
                          <span className="tabular-nums">{inr(student.demand)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-600">
                          <span>Total Paid</span>
                          <span className="tabular-nums font-medium">{inr(student.paid)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Current Term Outstanding</span>
                          <span className="tabular-nums font-semibold text-foreground">{inr(student.demand - student.paid)}</span>
                        </div>
                        {duesBreakdown?.hasCarriedForward && (
                          <div className="flex justify-between text-amber-700 dark:text-amber-300 font-semibold bg-amber-500/15 p-2 rounded-lg border border-amber-500/30">
                            <span>+ Prior Semester Arrears (Clause 4.2)</span>
                            <span className="tabular-nums font-bold">+{inr(duesBreakdown.carriedForwardDue)}</span>
                          </div>
                        )}
                        <div className="flex justify-between rounded-lg bg-destructive/10 p-2 font-bold text-destructive">
                          <span>Total Outstanding Due</span>
                          <span className="tabular-nums">{inr(duesBreakdown?.totalOutstandingDue ?? (student.demand - student.paid))}</span>
                        </div>
                      </div>
                    </div>

                    {/* VFSTR Clause 4.2 Waterfall Arrears Carry-Forward Audit Card */}
                    {duesBreakdown?.hasCarriedForward ? (
                      <div className="rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <History className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <h4 className="text-xs font-bold text-foreground">
                              Previous Semesters Arrears Breakdown
                            </h4>
                          </div>
                          <Badge variant="outline" className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 text-[10px] font-bold">
                            Prior Arrears Active
                          </Badge>
                        </div>

                        {/* 3-Box Mathematical Formula */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="rounded-lg bg-card/90 border border-border p-2.5 text-center shadow-2xs">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Current Term Net Due</p>
                            <p className="text-base font-black text-foreground mt-0.5 tabular-nums">
                              {inr(duesBreakdown.currentSemesterDue)}
                            </p>
                          </div>
                          <div className="rounded-lg bg-amber-500/15 border border-amber-500/30 p-2.5 text-center shadow-2xs">
                            <p className="text-[10px] text-amber-700 dark:text-amber-300 uppercase font-bold tracking-wider">+ Past Sem Arrears</p>
                            <p className="text-base font-black text-amber-600 dark:text-amber-400 mt-0.5 tabular-nums">
                              +{inr(duesBreakdown.carriedForwardDue)}
                            </p>
                          </div>
                          <div className="rounded-lg bg-destructive/15 border border-destructive/30 p-2.5 text-center shadow-2xs">
                            <p className="text-[10px] text-destructive uppercase font-bold tracking-wider">= Total Payable</p>
                            <p className="text-base font-black text-destructive mt-0.5 tabular-nums">
                              {inr(duesBreakdown.totalOutstandingDue)}
                            </p>
                          </div>
                        </div>

                        {/* Semester Breakdown Table */}
                        <div className="rounded-lg border border-border/80 bg-background/90 overflow-hidden">
                          <table className="w-full text-[11px]">
                            <thead className="bg-muted/60 text-muted-foreground border-b font-medium text-left">
                              <tr>
                                <th className="py-2 px-2.5">Originating Sem</th>
                                <th className="py-2 px-2.5 text-right">Original Due</th>
                                <th className="py-2 px-2.5 text-right">Remaining Arrears</th>
                                <th className="py-2 px-2.5 text-center">Settlement Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                              {duesBreakdown.activeCarryForwardBreakdown.map((item, idx) => (
                                <tr key={idx} className="hover:bg-muted/30">
                                  <td className="py-2 px-2.5 font-medium text-foreground">
                                    {item.fromSemLabel} <span className="text-muted-foreground text-[10px]">({item.fromAcademicYear})</span>
                                  </td>
                                  <td className="py-2 px-2.5 text-right tabular-nums text-muted-foreground">
                                    {inr(item.originalDue)}
                                  </td>
                                  <td className="py-2 px-2.5 text-right tabular-nums font-bold text-amber-600 dark:text-amber-400">
                                    {inr(item.remainingDue)}
                                  </td>
                                  <td className="py-2 px-2.5 text-center">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                                      Priority #{idx + 1}: Oldest Debt First
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          ⚖️ <strong>Institutional Arrears Policy:</strong> Any fee payment collected from this student will clear the ₹{duesBreakdown.carriedForwardDue.toLocaleString("en-IN")} carried-forward arrears before being applied to current term fees.
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                          <CircleCheck className="size-4 shrink-0 text-emerald-500" />
                          <span>Prior Academic Terms: <strong>All Previous Semesters Cleared (Carried-Forward = ₹0)</strong></span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-semibold">Clean Record</span>
                      </div>
                    )}

                    {student.scholarshipEligibilityNote && (
                      <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs text-primary flex items-start gap-2">
                        <GraduationCap className="size-4 shrink-0 mt-0.5 text-primary" />
                        <div>
                          <span className="font-semibold">Scholarship Policy Note: </span>
                          <span>{student.scholarshipEligibilityNote}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Payment & Transaction Ledger (5 cols) */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Clock3 className="size-4 text-primary" />
                        Payment Timeline &amp; Receipts
                      </h3>
                      <span className="text-xs text-muted-foreground">{account?.payments.length || 0} Transactions</span>
                    </div>

                    <div className="rounded-xl border bg-card p-4 space-y-3">
                      {account?.payments && account.payments.length > 0 ? (
                        <div className="space-y-3">
                          {account.payments.map((payment) => (
                            <div key={payment.id} className="rounded-lg border p-3 flex items-start gap-3 hover:bg-muted/20 transition-colors">
                              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                                <Check className="size-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-bold text-sm text-emerald-600 tabular-nums">{inr(payment.amount)}</span>
                                  <span className="text-[11px] text-muted-foreground">{payment.date}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  <span className="font-mono font-medium text-foreground">{payment.id}</span> &bull; {payment.method}
                                </p>
                                {payment.gateway !== payment.amount && (
                                  <p className="text-[11px] text-amber-600 mt-1 font-medium">
                                    Gateway: {inr(payment.gateway)} (Variance logged in reconciliation)
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground text-center py-6">No payment transactions recorded yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {profileTab === "history" && (
                <div className="space-y-5">
                  {/* Notice Banner */}
                  {timeline?.isDiscontinued ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-5 shadow-xs space-y-2">
                      <div className="flex items-center gap-2 font-semibold text-sm text-destructive">
                        <TriangleAlert className="size-4 shrink-0" />
                        Scholarship Discontinued (CGPA &lt; 7.0 Continuation Threshold)
                      </div>
                      <p className="text-xs text-foreground/90 font-medium leading-relaxed">
                        {timeline.discontinuationReason}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-destructive/20 text-xs">
                        <div>
                          <span className="text-muted-foreground">Effective From: </span>
                          <span className="font-semibold text-foreground">{timeline.discontinuationSemester?.semLabel || "Current Academic Year"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Revoked Aid: </span>
                          <span className="font-bold text-destructive">−{inr(timeline.totalScholarshipRevoked)}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground italic">
                        The system has automatically updated fee demand to the standard non-subsidized gross tuition schedule for affected cycles without manual intervention.
                      </p>
                    </div>
                  ) : timeline?.currentStatus === "AtRisk" ? (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-xs space-y-1 text-xs text-amber-700 dark:text-amber-300">
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        <TriangleAlert className="size-4 shrink-0" />
                        Scholarship At Risk (CGPA 7.0–7.5 Warning Corridor)
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        The student maintains their scholarship concession, but cumulative CGPA is within the warning margin. If academic performance falls below 7.0, the scholarship will be auto-revoked.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-xs space-y-1 text-xs text-emerald-700 dark:text-emerald-300">
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        <ShieldCheck className="size-4 shrink-0" />
                        Active Scholarship (Compliant Standing)
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Meets university continuation criteria (Cumulative CGPA ≥ 7.0 and Attendance ≥ 75%).
                      </p>
                    </div>
                  )}

                  {/* Full-width Semester Progression Table */}
                  <div className="rounded-xl border bg-card p-5 space-y-4 shadow-xs">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Semester-by-Semester Academic &amp; Fee Progression Ledger
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Complete historical breakdown of SGPA, cumulative CGPA, attendance, gross tuition, scholarship deductions, and fee clearance.
                      </p>
                    </div>

                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-xs">
                        <thead className="bg-muted/70 text-muted-foreground border-b font-medium text-left">
                          <tr>
                            <th className="py-2.5 px-3">Semester</th>
                            <th className="py-2.5 px-3">Academic Year</th>
                            <th className="py-2.5 px-3 text-center">Cumulative CGPA</th>
                            <th className="py-2.5 px-3 text-center">Attendance</th>
                            <th className="py-2.5 px-3 text-right">Gross Fee</th>
                            <th className="py-2.5 px-3 text-right">Scholarship</th>
                            <th className="py-2.5 px-3 text-right">Net Demand</th>
                            <th className="py-2.5 px-3 text-right">Paid</th>
                            <th className="py-2.5 px-3 text-right">Outstanding</th>
                            <th className="py-2.5 px-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {timeline?.history.map((sem, idx) => (
                            <tr key={`${sem.semLabel}-${idx}`} className="hover:bg-muted/20">
                              <td className="py-2.5 px-3 font-semibold text-foreground">{sem.semLabel}</td>
                              <td className="py-2.5 px-3 text-muted-foreground">AY {sem.academicYear}</td>
                              <td className="py-2.5 px-3 text-center">
                                <span className={`font-bold ${sem.cumulativeCgpa < 7.0 ? "text-destructive" : sem.cumulativeCgpa < 7.5 ? "text-amber-600" : "text-foreground"}`}>
                                  {sem.cumulativeCgpa.toFixed(2)}
                                </span>
                                <span className="text-[10px] text-muted-foreground ml-1">(SGPA {sem.cgpa.toFixed(2)})</span>
                              </td>
                              <td className="py-2.5 px-3 text-center font-medium">{sem.attendance}%</td>
                              <td className="py-2.5 px-3 text-right text-muted-foreground">{inr(sem.grossFee)}</td>
                              <td className="py-2.5 px-3 text-right font-medium text-emerald-600">
                                {sem.scholarshipApplied > 0 ? `−${inr(sem.scholarshipApplied)} (${sem.scholarshipPercent}%)` : "₹0 (Revoked)"}
                              </td>
                              <td className="py-2.5 px-3 text-right font-bold text-foreground">{inr(sem.netDemand)}</td>
                              <td className="py-2.5 px-3 text-right font-medium text-emerald-600">{inr(sem.paid)}</td>
                              <td className={`py-2.5 px-3 text-right font-semibold ${sem.outstanding > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                                {inr(sem.outstanding)}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] font-semibold ${
                                    sem.scholarshipStatus === "Discontinued"
                                      ? "bg-destructive/10 text-destructive border-destructive/30"
                                      : sem.scholarshipStatus === "AtRisk"
                                      ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                                      : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                                  }`}
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
                </div>
              )}

              {profileTab === "services" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Official Fee Certificates Panel */}
                  <div className="rounded-xl border bg-card p-5 space-y-3 shadow-xs">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <FileCheck2 className="size-4 text-primary" />
                      Official Fee Certificates &amp; Attestations
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Issue verifiable institutional certificates with digital signature.
                    </p>
                    <FeeCertificatesPanel student={student} />
                  </div>

                  {/* Right: Partial Payment & Priority Allocation Simulator */}
                  <div className="rounded-xl border bg-card p-5 space-y-3 shadow-xs">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <Clock3 className="size-4 text-primary" />
                      Cashier Counter Collection Simulator
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Record or simulate counter payments with automated priority head distribution.
                    </p>
                    <PartialPaymentSimulator student={student} />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t bg-muted/30 px-6 py-3 shrink-0 flex items-center justify-between text-xs text-muted-foreground">
              <span>finDeck Centralized Student Profile &amp; Financial Ledger</span>
              <Button size="sm" variant="ghost" onClick={onClose} className="h-7 text-xs">
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function TransactionDialog({
  transaction,
  onClose,
  onPrepare,
  prepared,
}: {
  transaction: Transaction | null;
  onClose: () => void;
  onPrepare: () => void;
  prepared: boolean;
}) {
  return (
    <Dialog
      open={!!transaction}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Transaction review</DialogTitle>
          <DialogDescription>
            {transaction?.id} · Gateway-to-ledger reconciliation
          </DialogDescription>
        </DialogHeader>
        {transaction && (
          <>
            <div className="flex justify-between rounded-lg bg-muted p-4 text-sm">
              <span>Student {transaction.student}</span>
              <Status status={transaction.status} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ["Gateway", transaction.gateway],
                ["Ledger", transaction.ledger],
                ["Difference", transaction.gateway - transaction.ledger],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border p-3">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-2 text-lg font-semibold">
                    {inr(Number(value))}
                  </p>
                </div>
              ))}
            </div>
            {transaction.status === "Mismatch" ? (
              <>
                <div className="rounded-lg bg-warning/8 p-4 text-sm leading-relaxed text-warning">
                  <div className="mb-2 flex items-center gap-2 font-semibold">
                    <TriangleAlert className="size-4" /> ₹5,000 requires
                    investigation
                  </div>
                  The gateway records ₹25,000, but only ₹20,000 is allocated in
                  the ledger. Verify the settlement reference, bank statement
                  and fee-head allocation before proposing a correction.
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Preparing an investigation does not mark this transaction as
                  matched or modify the student balance. Financial corrections
                  require authenticated human approval.
                </p>
                <Button disabled={prepared} onClick={onPrepare}>
                  <FileCheck2 data-icon="inline-start" />
                  {prepared
                    ? "Investigation prepared"
                    : "Prepare investigation"}
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-success/8 p-4 text-sm text-success">
                <CircleCheck className="size-5" /> Gateway and ledger amounts
                match. No action required.
              </div>
            )}
            <p className="text-center text-sm text-muted-foreground">
              Demo review · No ledger changes are executed
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function RefundDialog({
  intent,
  onClose,
  onPrepare,
}: {
  intent: "review" | "approve" | "reject" | null;
  onClose: () => void;
  onPrepare: (decision: "approve" | "reject", reason: string) => void;
}) {
  const [decision, setDecision] = useState<"approve" | "reject">("approve");
  const [confirmed, setConfirmed] = useState(false);
  const [reason, setReason] = useState("");
  const chosen = intent === "review" ? decision : intent || "approve";
  function reset() {
    setConfirmed(false);
    setReason("");
    setDecision("approve");
    onClose();
  }
  const { user } = useAuth();
  const isAdmin = canApprove(user?.role || "admin");

  return (
    <Dialog
      open={!!intent}
      onOpenChange={(open) => {
        if (!open) reset();
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" /> Review refund
              RF-2081
            </span>
          </DialogTitle>
          <DialogDescription>
            Ananya Sharma · 251FA04E17 · Withdrawal
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-xl border p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Eligible refundable deposit
            </span>
            <span>₹20,000</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-muted-foreground">Policy deduction</span>
            <span>−₹1,500</span>
          </div>
          <div className="mt-3 flex justify-between border-t pt-3 font-semibold">
            <span>Calculated refund</span>
            <span className="text-xl">₹18,500</span>
          </div>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="font-medium">Withdrawal before semester start</p>
          <p className="mt-1 text-muted-foreground">
            Demo policy WD-2026, version 2.1. Refund eligibility and the
            withdrawal date must be verified against institutional records.
          </p>
        </div>
        {!isAdmin ? (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs leading-relaxed text-amber-900">
            <p className="flex items-center gap-2 font-semibold text-amber-800">
              <LockKeyhole className="size-4" /> Finance Officer Role Restriction
            </p>
            <p className="mt-1 text-amber-700">
              You are signed in as <strong>{user?.name || "Finance Officer"}</strong>. You may prepare and submit a recommendation for review. Final authorization requires <strong>Administrator</strong> credentials.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs leading-relaxed text-emerald-900">
            <p className="flex items-center gap-2 font-semibold text-emerald-800">
              <ShieldCheck className="size-4" /> Administrator Authorized Session
            </p>
            <p className="mt-1 text-emerald-700">
              You have full institutional authorization to review and prepare recommendations for financial execution.
            </p>
          </div>
        )}
        {intent === "review" && (
          <label className="flex flex-col gap-2 text-sm font-medium">
            Review recommendation
            <select
              className="filter-select"
              value={decision}
              onChange={(e) =>
                setDecision(e.target.value as "approve" | "reject")
              }
            >
              <option value="approve">Recommend approval</option>
              <option value="reject">Recommend rejection</option>
            </select>
          </label>
        )}
        <label className="flex flex-col gap-2 text-sm font-medium">
          Review notes {chosen === "reject" ? "(required)" : "(optional)"}
          <textarea
            aria-label="Review notes"
            rows={2}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Explain your recommendation…"
            className="resize-none rounded-lg border bg-card p-3 text-sm font-normal outline-primary"
          />
        </label>
        <label className="flex cursor-pointer items-start gap-2 text-sm leading-relaxed">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-primary"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I understand this prepares a recommendation and does not authorize a
          financial transaction.
        </label>
        <Button
          disabled={!confirmed || (chosen === "reject" && !reason.trim())}
          onClick={() => {
            onPrepare(chosen, reason.trim());
            reset();
          }}
        >
          <FileCheck2 data-icon="inline-start" />
          Prepare {chosen === "approve" ? "approval" : "rejection"}{" "}
          recommendation
        </Button>
      </DialogContent>
    </Dialog>
  );
}
