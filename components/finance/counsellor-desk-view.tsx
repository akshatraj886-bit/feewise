"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  getAllPermissionRequests,
  updatePermissionRequestStatus,
  type ExamPermissionRequest,
  inr,
  type Student,
  students,
} from "@/lib/finance-data";
import { getStudentExamEligibility } from "@/lib/finance-service";
import { DocumentViewerModal } from "@/components/finance/document-viewer-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  ArrowUpDown,
  Send,
  Eye,
  Download,
  GraduationCap,
  Calendar,
  UserCheck,
  Building,
  UserX,
  FileText,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface CounsellorDeskViewProps {
  onLog?: (action: string, entity: string, status?: string) => void;
}

export function CounsellorDeskView({ onLog }: CounsellorDeskViewProps) {
  const [requests, setRequests] = useState<ExamPermissionRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"Pending" | "All" | "Approved" | "Rejected">("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "dues">("newest");

  // Approval Modal State
  const [selectedForApproval, setSelectedForApproval] = useState<ExamPermissionRequest | null>(null);
  const [reviewerName, setReviewerName] = useState("Dr. K. V. Raman");
  const [reviewerRole, setReviewerRole] = useState("Dean of Student Affairs & Academic Counsellor");
  const [counsellorNotes, setCounsellorNotes] = useState("");
  const [isApproving, setIsApproving] = useState(false);

  // Rejection Modal State
  const [selectedForRejection, setSelectedForRejection] = useState<ExamPermissionRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionNotes, setRejectionNotes] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  // Document Viewer Modal State
  const [viewingLetter, setViewingLetter] = useState<{
    request: ExamPermissionRequest;
    student: Student | string;
  } | null>(null);

  function reloadRequests() {
    setRequests(getAllPermissionRequests());
  }

  useEffect(() => {
    reloadRequests();
    if (typeof window !== "undefined") {
      window.addEventListener("feewise_exam_permission_updated", reloadRequests);
      return () => window.removeEventListener("feewise_exam_permission_updated", reloadRequests);
    }
  }, []);

  // Summary Metrics
  const totalCount = requests.length;
  const pendingCount = useMemo(() => requests.filter((r) => r.status === "Pending").length, [requests]);
  const approvedCount = useMemo(() => requests.filter((r) => r.status === "Approved").length, [requests]);
  const rejectedCount = useMemo(() => requests.filter((r) => r.status === "Rejected").length, [requests]);

  // Filtered & Sorted Requests
  const filteredRequests = useMemo(() => {
    return requests
      .filter((r) => {
        if (activeTab !== "All" && r.status !== activeTab) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
          r.studentName.toLowerCase().includes(q) ||
          r.studentId.toLowerCase().includes(q) ||
          r.reason.toLowerCase().includes(q) ||
          r.programme.toLowerCase().includes(q) ||
          (r.supportingInfo && r.supportingInfo.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (sortBy === "dues") {
          return b.snapshottedDues - a.snapshottedDues;
        }
        if (sortBy === "oldest") {
          return a.id.localeCompare(b.id);
        }
        return b.id.localeCompare(a.id);
      });
  }, [requests, activeTab, searchQuery, sortBy]);

  // Open Approval Dialog with sensible default directives
  function openApproveDialog(req: ExamPermissionRequest) {
    setSelectedForApproval(req);
    setReviewerName("Dr. K. V. Raman");
    setReviewerRole("Dean of Student Affairs & Academic Counsellor");
    setCounsellorNotes(
      `Approved conditionally under Clause 8.2. Student is granted provisional exam hall ticket entry. Outstanding balance of ${inr(
        req.snapshottedDues
      )} must be settled before the announcement of semester end results.`
    );
  }

  // Execute Approval
  function handleConfirmApprove() {
    if (!selectedForApproval) return;
    setIsApproving(true);

    setTimeout(() => {
      const updated = updatePermissionRequestStatus(selectedForApproval.id, {
        status: "Approved",
        reviewedBy: `${reviewerName} (${reviewerRole})`,
        counsellorNotes: counsellorNotes.trim() || undefined,
      });

      if (updated) {
        if (onLog) {
          onLog("Approved exam permission letter", `${selectedForApproval.studentName} (${selectedForApproval.id})`, "Approved");
        }
        toast.success("Permission Request Approved!", {
          description: `Generated Official Condonation Order ${updated.letterRef} with Digital Signature.`,
        });
        reloadRequests();
      }

      setIsApproving(false);
      setSelectedForApproval(null);
    }, 400);
  }

  // Open Rejection Dialog
  function openRejectDialog(req: ExamPermissionRequest) {
    setSelectedForRejection(req);
    setRejectionReason("");
    setRejectionNotes("");
  }

  // Execute Rejection
  function handleConfirmReject() {
    if (!selectedForRejection || !rejectionReason.trim()) return;
    setIsRejecting(true);

    setTimeout(() => {
      const updated = updatePermissionRequestStatus(selectedForRejection.id, {
        status: "Rejected",
        reviewedBy: `${reviewerName} (${reviewerRole})`,
        rejectionReason: rejectionReason.trim(),
        counsellorNotes: rejectionNotes.trim() || undefined,
      });

      if (updated) {
        if (onLog) {
          onLog("Rejected exam permission letter", `${selectedForRejection.studentName} (${selectedForRejection.id})`, "Rejected");
        }
        toast.error("Permission Request Rejected", {
          description: `Recorded official rejection ground for ${selectedForRejection.studentName}.`,
        });
        reloadRequests();
      }

      setIsRejecting(false);
      setSelectedForRejection(null);
    }, 400);
  }

  // View Official Generated Permission Letter Modal
  function handleOpenLetterModal(req: ExamPermissionRequest) {
    const matchedStudent = students.find((s) => s.id === req.studentId) || req.studentId;
    setViewingLetter({
      request: req,
      student: matchedStudent,
    });
  }

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="rounded-2xl border bg-card p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <FileCheck2 className="size-5" />
              </span>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Academic Counsellor Desk · Examination Permission Review
              </h2>
              <Badge variant="outline" className="text-xs font-mono">
                VFSTR Clause 8.2
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dean of Student Affairs &amp; Academic Counselling Command Center. Review student exam permission petitions, evaluate live attendance and fee arrears, and issue digitally signed condonation orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border bg-muted/40 px-3.5 py-2 text-right">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold block">
                Active Authority
              </span>
              <span className="text-xs font-bold text-foreground">
                Dr. K. V. Raman · Dean of Student Affairs
              </span>
            </div>
          </div>
        </div>

        {/* 2. Key Summary KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t">
          {/* Card 1: Pending (Default Focus) */}
          <div
            onClick={() => setActiveTab("Pending")}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              activeTab === "Pending"
                ? "bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/30"
                : "bg-card hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Pending Action</span>
              {pendingCount > 0 && (
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-amber-500"></span>
                </span>
              )}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
                {pendingCount}
              </span>
              <span className="text-[11px] text-muted-foreground">Needs Review</span>
            </div>
          </div>

          {/* Card 2: Approved */}
          <div
            onClick={() => setActiveTab("Approved")}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              activeTab === "Approved"
                ? "bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/30"
                : "bg-card hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Approved Orders</span>
              <CheckCircle2 className="size-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                {approvedCount}
              </span>
              <span className="text-[11px] text-muted-foreground">Signed &amp; Issued</span>
            </div>
          </div>

          {/* Card 3: Rejected */}
          <div
            onClick={() => setActiveTab("Rejected")}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              activeTab === "Rejected"
                ? "bg-rose-500/10 border-rose-500/40 ring-1 ring-rose-500/30"
                : "bg-card hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Rejected Petitions</span>
              <XCircle className="size-4 text-destructive" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400">
                {rejectedCount}
              </span>
              <span className="text-[11px] text-muted-foreground">Withheld</span>
            </div>
          </div>

          {/* Card 4: Total */}
          <div
            onClick={() => setActiveTab("All")}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              activeTab === "All"
                ? "bg-primary/10 border-primary/40 ring-1 ring-primary/30"
                : "bg-card hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Total Registry</span>
              <FileText className="size-4 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {totalCount}
              </span>
              <span className="text-[11px] text-muted-foreground">Historical Letters</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter & Search Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border bg-muted/30">
          {(["Pending", "All", "Approved", "Rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-background text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "Pending" && `Pending (${pendingCount})`}
              {tab === "Approved" && `Approved (${approvedCount})`}
              {tab === "Rejected" && `Rejected (${rejectedCount})`}
              {tab === "All" && `All (${totalCount})`}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, ID, reason..."
              className="h-9 w-60 pl-8 text-xs bg-background"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 border rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="size-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="dues">Highest Dues</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Requests List Registry */}
      {filteredRequests.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center text-xs text-muted-foreground space-y-2">
          <FileCheck2 className="size-8 mx-auto text-muted-foreground/50" />
          <p className="font-semibold text-foreground">No examination permission requests match your criteria</p>
          <p>Switch filter tabs or clear your search query to inspect other petitions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => {
            // Pull live student eligibility data
            const liveEligibility = getStudentExamEligibility(req.studentId);

            return (
              <div
                key={req.id}
                className="rounded-2xl border bg-card p-5 shadow-xs hover:border-primary/30 transition-all space-y-4"
              >
                {/* Header Row: Student Identity & Request Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs shrink-0">
                      {req.studentName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-foreground">
                          {req.studentName}
                        </h3>
                        <span className="font-mono text-xs text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded-md">
                          {req.studentId}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          &middot; {req.programme}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Submitted: <strong>{req.submittedAt}</strong> &middot; Ref: <code>{req.id}</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs font-semibold ${
                        req.status === "Approved"
                          ? "bg-emerald-600 text-white"
                          : req.status === "Rejected"
                          ? "bg-rose-600 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {req.status === "Approved"
                        ? "✅ Approved & Condoned"
                        : req.status === "Rejected"
                        ? "❌ Rejected"
                        : "⏳ Pending Counsellor Review"}
                    </Badge>
                  </div>
                </div>

                {/* Body Row: Student Justification & Statement */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Reason &amp; Candidate Justification:
                  </span>
                  <div className="rounded-xl border bg-muted/30 p-3.5 space-y-1.5">
                    <strong className="text-xs text-foreground block font-semibold">
                      Category: {req.reason}
                    </strong>
                    <p className="text-xs text-foreground/90 leading-relaxed font-normal">
                      &ldquo;{req.supportingInfo}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Metrics Comparison Row: Snapshotted vs Live Single Source of Truth */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl border bg-muted/15 text-xs">
                  {/* Snapshotted Dues */}
                  <div>
                    <span className="text-muted-foreground text-[11px] block">Snapshotted Arrears</span>
                    <strong className="text-foreground text-sm font-bold">
                      {inr(req.snapshottedDues)}
                    </strong>
                  </div>

                  {/* Live Dues */}
                  <div>
                    <span className="text-muted-foreground text-[11px] block">Live Ledger Dues</span>
                    <strong
                      className={`text-sm font-bold ${
                        liveEligibility.outstandingDues > 0 ? "text-destructive" : "text-emerald-600"
                      }`}
                    >
                      {inr(liveEligibility.outstandingDues)}
                    </strong>
                  </div>

                  {/* Snapshotted Attendance */}
                  <div>
                    <span className="text-muted-foreground text-[11px] block">Snapshotted Att.</span>
                    <strong className="text-foreground text-sm font-bold">
                      {req.snapshottedAttendance.toFixed(1)}%
                    </strong>
                  </div>

                  {/* Live Attendance */}
                  <div>
                    <span className="text-muted-foreground text-[11px] block">Live Attendance</span>
                    <strong
                      className={`text-sm font-bold ${
                        liveEligibility.currentAttendance < 75.0 ? "text-destructive" : "text-emerald-600"
                      }`}
                    >
                      {liveEligibility.currentAttendance.toFixed(1)}%
                    </strong>
                  </div>
                </div>

                {/* Reviewer Details & Notes (If Approved or Rejected) */}
                {req.reviewedBy && (
                  <div className="p-3 rounded-xl border bg-muted/20 text-xs space-y-1">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Reviewed By: <strong className="text-foreground">{req.reviewedBy}</strong></span>
                      <span>Date: <strong>{req.reviewedAt}</strong></span>
                    </div>

                    {req.letterRef && (
                      <p className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold pt-0.5">
                        Official Condonation Order Ref: {req.letterRef}
                      </p>
                    )}

                    {req.rejectionReason && (
                      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-2.5 mt-1.5 text-xs">
                        <strong className="text-destructive block">Rejection Ground:</strong>
                        <p className="text-foreground/90 font-medium">{req.rejectionReason}</p>
                      </div>
                    )}

                    {req.counsellorNotes && (
                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 mt-1.5 text-xs">
                        <strong className="text-emerald-700 dark:text-emerald-400 block">Counsellor Terms:</strong>
                        <p className="text-foreground/90 font-medium">{req.counsellorNotes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t">
                  {req.status === "Pending" ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openRejectDialog(req)}
                        className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30 h-8 gap-1.5"
                      >
                        <UserX className="size-3.5" />
                        Reject with Ground
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openApproveDialog(req)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white h-8 gap-1.5 font-semibold"
                      >
                        <ShieldCheck className="size-3.5" />
                        Approve &amp; Sign Permission Letter
                      </Button>
                    </>
                  ) : req.status === "Approved" ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenLetterModal(req)}
                        className="text-xs gap-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 h-8 font-semibold"
                      >
                        <Eye className="size-3.5" />
                        View Signed Permission Letter
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleOpenLetterModal(req)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white h-8 gap-1.5 font-semibold"
                      >
                        <Download className="size-3.5" />
                        Print Official Condonation Order
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openApproveDialog(req)}
                      className="text-xs gap-1.5 text-muted-foreground hover:text-foreground h-8"
                    >
                      <ArrowUpDown className="size-3.5" />
                      Re-evaluate / Re-open Petition
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Interactive Approval Dialog */}
      <Dialog open={!!selectedForApproval} onOpenChange={(open) => !open && setSelectedForApproval(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden rounded-2xl bg-card border border-border shadow-2xl text-foreground">
          <div className="border-b bg-emerald-500/10 p-5 shrink-0">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                <ShieldCheck className="size-5 text-emerald-600" />
                Approve Examination Entry Permission
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Issue an official condonation order under VFSTR Ordinance Clause 8.2 with executive digital signature.
              </DialogDescription>
            </DialogHeader>
          </div>

          {selectedForApproval && (
            <div className="p-5 space-y-4 text-xs">
              {/* Candidate Info Strip */}
              <div className="rounded-xl border bg-muted/30 p-3 space-y-1">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>{selectedForApproval.studentName} ({selectedForApproval.studentId})</span>
                  <span className="text-muted-foreground font-semibold">{selectedForApproval.programme}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground text-[11px] pt-1 border-t">
                  <span>Dues Snapshot: <strong>{inr(selectedForApproval.snapshottedDues)}</strong></span>
                  <span>Attendance: <strong>{selectedForApproval.snapshottedAttendance.toFixed(1)}%</strong></span>
                </div>
              </div>

              {/* Reviewer Credentials */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground block">Signatory Name</label>
                  <Input
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="h-8 text-xs bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground block">Signatory Title</label>
                  <Input
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    className="h-8 text-xs bg-background"
                  />
                </div>
              </div>

              {/* Conditional Approval Notes */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground block">
                  Condonation Directives &amp; Cashier Conditions *
                </label>
                <textarea
                  value={counsellorNotes}
                  onChange={(e) => setCounsellorNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Enter directives (e.g. Cleared conditionally; dues must be paid before result declaration)..."
                />
              </div>

              {/* Live Digital Signature Representation Preview */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                    Digital Signature Representation
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Digital seal will be affixed with timestamp: {new Date().toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="border border-emerald-500/30 rounded-lg px-3 py-1 bg-background flex flex-col items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/k-v-raman-signature.png"
                    alt="Digital Stamp"
                    className="h-7 w-auto object-contain dark:invert"
                  />
                  <span className="text-[8px] font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest pt-0.5">
                    Dean Condonation Seal
                  </span>
                </div>
              </div>

              <DialogFooter className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedForApproval(null)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={isApproving}
                  onClick={handleConfirmApprove}
                  className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  <CheckCircle2 className="size-3.5" />
                  {isApproving ? "Generating Order..." : "Confirm & Sign Condonation Order"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 6. Interactive Rejection Dialog */}
      <Dialog open={!!selectedForRejection} onOpenChange={(open) => !open && setSelectedForRejection(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden rounded-2xl bg-card border border-border shadow-2xl text-foreground">
          <div className="border-b bg-destructive/10 p-5 shrink-0">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                <XCircle className="size-5 text-destructive" />
                Reject Exam Permission Petition
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                A formal rejection ground is mandatory under University Examination Regulations.
              </DialogDescription>
            </DialogHeader>
          </div>

          {selectedForRejection && (
            <div className="p-5 space-y-4 text-xs">
              {/* Candidate Info Strip */}
              <div className="rounded-xl border bg-muted/30 p-3 space-y-1">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>{selectedForRejection.studentName} ({selectedForRejection.studentId})</span>
                  <span className="text-muted-foreground font-semibold">{selectedForRejection.programme}</span>
                </div>
                <p className="text-[11px] text-muted-foreground pt-1 border-t">
                  Grounds cited: &ldquo;{selectedForRejection.reason}&rdquo;
                </p>
              </div>

              {/* Mandatory Rejection Ground */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground block">
                  Statutory Rejection Reason * (Minimum 10 characters)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                  required
                  className="w-full rounded-lg border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-destructive resize-none"
                  placeholder="State statutory reason for refusal (e.g. Consecutive non-payment default, insufficient documentary proof, minimum 75% attendance criteria not met)..."
                />
              </div>

              {/* Counsellor Next Steps / Guidance */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground block">
                  Student Guidance / Counter Advisement
                </label>
                <textarea
                  value={rejectionNotes}
                  onChange={(e) => setRejectionNotes(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Advise student on cashier counter partial settlement options or re-evaluation procedure..."
                />
              </div>

              <DialogFooter className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedForRejection(null)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={isRejecting || rejectionReason.trim().length < 10}
                  onClick={handleConfirmReject}
                  className="gap-1.5 text-xs font-semibold"
                >
                  <XCircle className="size-3.5" />
                  {isRejecting ? "Recording Decision..." : "Record Rejection & Withhold Hall Ticket"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 7. Official Document Viewer Modal (Step 5 Permission Letter) */}
      {viewingLetter && (
        <DocumentViewerModal
          isOpen={!!viewingLetter}
          onClose={() => setViewingLetter(null)}
          docType="exam_permission"
          student={viewingLetter.student}
          options={{
            permissionRequest: viewingLetter.request,
            certRef: viewingLetter.request.letterRef,
            signatoryName: viewingLetter.request.digitalSignature?.signatoryName || viewingLetter.request.reviewedBy,
            signatoryRole: viewingLetter.request.digitalSignature?.signatoryRole,
            docDate: viewingLetter.request.reviewedAt,
            sealSubtext: viewingLetter.request.digitalSignature?.sealText,
          }}
        />
      )}
    </div>
  );
}
