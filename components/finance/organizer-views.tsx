"use client";

import { useState, useEffect } from "react";
import {
  getSqlDatabaseState,
  dispatchFeeReminder,
  issueLoanDocument,
  downloadSqlFile,
  resetSqlDatabase,
  type ReminderDispatch,
  type ScholarshipRenewalRisk,
  type LoanDocumentRequest,
  type SqlDatabaseState,
} from "@/lib/sql-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { toast } from "sonner";
import { openPrintDocument } from "@/lib/finance-data";

// =========================================================================
// 1. SMART REMINDER DISPATCH ENGINE (With Organizer Policy Auto-Suppression)
// =========================================================================
export function SmartRemindersView() {
  const [reminders, setReminders] = useState<ReminderDispatch[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("251FA04E03");

  function reload() {
    setReminders(getSqlDatabaseState().reminder_dispatches);
  }

  useEffect(() => {
    reload();
    window.addEventListener("feewise_sql_store_updated", reload);
    return () => window.removeEventListener("feewise_sql_store_updated", reload);
  }, []);

  function handleDispatch() {
    const res = dispatchFeeReminder(selectedStudentId);
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

      {/* Action Bar */}
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
          </select>
          <Button size="sm" onClick={handleDispatch} className="h-9 gap-1.5">
            <Send className="size-3.5" /> Evaluate &amp; Dispatch
          </Button>
        </div>
      </div>

      {/* Reminders Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>Reminder Audit &amp; Dispatch Ledger</span>
            <Badge variant="secondary" className="font-mono text-xs">
              {reminders.length} Dispatches Recorded
            </Badge>
          </CardTitle>
          <CardDescription>
            Live view of fee reminders dispatched or suppressed in accordance with university policy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border rounded-lg border overflow-hidden">
            {reminders.map((r) => (
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
            ))}
          </div>
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

  function reload() {
    setRisks(getSqlDatabaseState().scholarship_risks);
  }

  useEffect(() => {
    reload();
    window.addEventListener("feewise_sql_store_updated", reload);
    return () => window.removeEventListener("feewise_sql_store_updated", reload);
  }, []);

  function sendCounselorAlert(studentName: string) {
    toast.success(`Academic counselor alert sent for ${studentName}`, {
      description: "Mentoring session scheduled to safeguard scholarship criteria.",
    });
  }

  const atRiskCount = risks.filter((r) => r.risk_level === "AT_RISK" || r.risk_level === "LIKELY_LOSS").length;
  const watchCount = risks.filter((r) => r.risk_level === "WATCH").length;
  const safeCount = risks.filter((r) => r.risk_level === "NONE").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-600 font-medium text-xs">Safe Renewal</CardDescription>
            <CardTitle className="text-2xl text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
              <span>{safeCount} Students</span>
              <ShieldCheck className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Exceeding minimum 75% attendance &amp; 7.5 CGPA</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-amber-600 font-medium text-xs">Watchlist</CardDescription>
            <CardTitle className="text-2xl text-amber-700 dark:text-amber-300 flex items-center justify-between">
              <span>{watchCount} Student</span>
              <AlertTriangle className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Within 3% margin of retention criteria</p>
          </CardContent>
        </Card>

        <Card className="border-rose-500/20 bg-rose-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-rose-600 font-medium text-xs">High Risk</CardDescription>
            <CardTitle className="text-2xl text-rose-700 dark:text-rose-300 flex items-center justify-between">
              <span>{atRiskCount} Student</span>
              <ShieldAlert className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Critically below renewal threshold</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>finance.scholarship_renewal_risk &middot; Early Warning Registry</span>
            <Badge variant="outline" className="font-mono text-xs">AY 2026–27</Badge>
          </CardTitle>
          <CardDescription>
            Automated monitoring of student academic thresholds to prevent abrupt scholarship forfeiture
          </CardDescription>
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
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {risks.map((r) => (
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
                          r.cgpa < 7.5 ? "text-rose-600" : "text-foreground"
                        }`}
                      >
                        {r.cgpa}
                      </span>
                    </td>
                    <td className="p-3">
                      {r.risk_level === "NONE" && (
                        <Badge className="bg-emerald-600 text-white font-normal text-xs">Safe</Badge>
                      )}
                      {r.risk_level === "WATCH" && (
                        <Badge className="bg-amber-600 text-white font-normal text-xs">Watchlist</Badge>
                      )}
                      {r.risk_level === "AT_RISK" && (
                        <Badge className="bg-rose-600 text-white font-normal text-xs">At Risk</Badge>
                      )}
                      {r.risk_level === "LIKELY_LOSS" && (
                        <Badge className="bg-destructive text-white font-normal text-xs">Likely Loss</Badge>
                      )}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground max-w-xs">{r.criteria_at_risk.notes}</td>
                    <td className="p-3 text-right">
                      {r.risk_level !== "NONE" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => sendCounselorAlert(r.student_name)}
                        >
                          Alert Counselor
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

  function reload() {
    setRequests(getSqlDatabaseState().loan_requests);
  }

  useEffect(() => {
    reload();
    window.addEventListener("feewise_sql_store_updated", reload);
    return () => window.removeEventListener("feewise_sql_store_updated", reload);
  }, []);

  function handleIssue(reqId: string) {
    const updated = issueLoanDocument(reqId, "VFSTR Finance Officer");
    if (updated) {
      toast.success("Document Verified & Issued!", {
        description: `Verification Code: ${updated.verification_code}`,
      });
      reload();
    }
  }

  function printOfficialDoc(req: LoanDocumentRequest) {
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
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>finance.loan_document_request &middot; Education Loan Desk</span>
            <Badge variant="secondary" className="font-mono text-xs">
              {requests.length} Requests
            </Badge>
          </CardTitle>
          <CardDescription>
            Official certificates requested by students for submission to nationalized and private banks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border rounded-lg border overflow-hidden">
            {requests.map((req) => (
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
                    className="text-xs font-normal"
                  >
                    {req.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
    window.addEventListener("feewise_sql_store_updated", reload);
    return () => window.removeEventListener("feewise_sql_store_updated", reload);
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.fee_heads.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">finance.fee_head</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.fee_demands.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">finance.fee_demand</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.payments.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">finance.payment</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.reminder_dispatches.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">reminder_dispatch</div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-xl font-bold font-mono text-primary">{state.loan_requests.length}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">loan_doc_request</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
