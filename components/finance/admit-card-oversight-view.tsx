"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  type CohortAdmitCardSummary,
  type AdmitCardStatus,
  getStudentDuesBreakdown,
} from "@/lib/finance-service";
import { inr, type Student } from "@/lib/finance-data";
import { getAdmitCardStatusAction } from "@/backend/actions/more-modules";
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
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  XCircle,
  Clock,
  Search,
  Download,
  Eye,
  FileText,
  Building2,
  Calendar,
  AlertOctagon,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface AdmitCardOversightViewProps {
  onLog?: (action: string, entity: string, status?: string) => void;
}

export function AdmitCardOversightView({ onLog }: AdmitCardOversightViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | AdmitCardStatus | "HAS_CARRIED_FORWARD"
  >("ALL");
  const [selectedProgramme, setSelectedProgramme] = useState<string>("ALL");

  // Document Modal state
  const [viewerStudent, setViewerStudent] = useState<Student | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Inspector modal for blocked/undertaking students
  const [inspectedRecord, setInspectedRecord] = useState<any | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Compute live cohort summary — deferred so UI renders first, then data loads
  const [cohortSummary, setCohortSummary] = useState<CohortAdmitCardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load live status initially
    getAdmitCardStatusAction().then(res => {
      setCohortSummary(res);
      setIsLoading(false);
    });
  }, []);

  // Reload when exam permission status changes
  useEffect(() => {
    function reload() {
      getAdmitCardStatusAction().then(setCohortSummary);
    }
    window.addEventListener("feewise_exam_permission_updated", reload);
    return () => window.removeEventListener("feewise_exam_permission_updated", reload);
  }, []);

  const programmes = useMemo(() => {
    if (!cohortSummary) return [];
    const set = new Set<string>();
    cohortSummary.students.forEach((s) => {
      if (s.programme) set.add(s.programme);
    });
    return Array.from(set).sort();
  }, [cohortSummary]);

  const filteredStudents = useMemo(() => {
    if (!cohortSummary) return [];
    return cohortSummary.students.filter((item) => {
      // Search
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        item.studentName.toLowerCase().includes(query) ||
        item.studentId.toLowerCase().includes(query) ||
        item.programme.toLowerCase().includes(query);

      // Status Filter
      let matchStatus = true;
      if (statusFilter === "HAS_CARRIED_FORWARD") {
        matchStatus = (item.duesBreakdown?.carriedForwardDue || 0) > 0;
      } else if (statusFilter !== "ALL") {
        matchStatus = item.admitCardStatus === statusFilter;
      }

      // Programme
      const matchProg =
        selectedProgramme === "ALL" || item.programme === selectedProgramme;

      return matchQuery && matchStatus && matchProg;
    });
  }, [cohortSummary, searchQuery, statusFilter, selectedProgramme]);

  const handleOpenAdmitCard = (student: Student) => {
    setViewerStudent(student);
    setIsViewerOpen(true);
    onLog?.(
      "Generated Admit Card",
      `${student.name} (${student.id})`,
      "Generated"
    );
    toast.success(`Generated Admit Card for ${student.name}`);
  };

  const handleInspect = (record: any) => {
    setInspectedRecord(record);
    setIsInspectorOpen(true);
  };

  const handleExportCsv = () => {
    const headers = [
      "Student ID",
      "Student Name",
      "Programme",
      "Attendance %",
      "Current Sem Dues",
      "Carried Forward Dues",
      "Total Outstanding Dues",
      "Admit Card Status",
      "Eligibility Note",
    ];

    const rows = filteredStudents.map((s) => [
      s.studentId,
      `"${s.studentName}"`,
      `"${s.programme}"`,
      s.attendance.toFixed(1),
      s.duesBreakdown?.currentSemesterDue || 0,
      s.duesBreakdown?.carriedForwardDue || 0,
      s.outstandingDues,
      s.admitCardStatus,
      `"${s.admitCardStatusDescription}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `VFSTR_Admit_Card_Oversight_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      `Exported ${filteredStudents.length} candidate hall ticket records`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-sm">Loading admit card data…</span>
        </div>
      )}
      {!isLoading && cohortSummary && (<>
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Automated Examination Admit Card System
                <Badge className="bg-indigo-600/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
                  VFSTR Winter 2026–27
                </Badge>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Institutional examination gatekeeping with multi-semester dues
                carry-forward &amp; statutory Dean condonation tracking.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="flex items-center gap-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs"
          >
            <Download className="size-3.5" />
            Export Hall Ticket Roster
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Cohort */}
        <div
          onClick={() => setStatusFilter("ALL")}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === "ALL"
              ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 shadow-md"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold ${
                statusFilter === "ALL"
                  ? "text-slate-200 dark:text-slate-700"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Cohort Total
            </span>
            <GraduationCap className="size-4 opacity-70" />
          </div>
          <div className="text-2xl font-black">{cohortSummary.totalStudents}</div>
          <div
            className={`text-[11px] mt-1 ${
              statusFilter === "ALL"
                ? "text-slate-300 dark:text-slate-600"
                : "text-slate-400"
            }`}
          >
            All enrolled candidates
          </div>
        </div>

        {/* Clean Issued */}
        <div
          onClick={() => setStatusFilter("CLEAN_ELIGIBLE")}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === "CLEAN_ELIGIBLE"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold ${
                statusFilter === "CLEAN_ELIGIBLE"
                  ? "text-emerald-100"
                  : "text-emerald-700 dark:text-emerald-400"
              }`}
            >
              Clean Regular
            </span>
            <CheckCircle2 className="size-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {cohortSummary.cleanEligibleCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Att ≥ 75% &amp; ₹0 dues
          </div>
        </div>

        {/* Provisional (Dues Notice) */}
        <div
          onClick={() => setStatusFilter("PROVISIONAL_DUES")}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === "PROVISIONAL_DUES"
              ? "bg-amber-500 text-white border-amber-500 shadow-md"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold ${
                statusFilter === "PROVISIONAL_DUES"
                  ? "text-amber-100"
                  : "text-amber-700 dark:text-amber-400"
              }`}
            >
              Provisional (Dues)
            </span>
            <AlertTriangle className="size-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {cohortSummary.provisionalDuesCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Undertaking issued
          </div>
        </div>

        {/* Condoned (Dean Order) */}
        <div
          onClick={() => setStatusFilter("CONDONED_ELIGIBLE")}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === "CONDONED_ELIGIBLE"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold ${
                statusFilter === "CONDONED_ELIGIBLE"
                  ? "text-indigo-100"
                  : "text-indigo-700 dark:text-indigo-400"
              }`}
            >
              Condoned (Dean)
            </span>
            <ShieldCheck className="size-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {cohortSummary.condonedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Digitally signed condonation
          </div>
        </div>

        {/* Blocked (<75% Att) */}
        <div
          onClick={() => setStatusFilter("BLOCKED_ATTENDANCE")}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === "BLOCKED_ATTENDANCE"
              ? "bg-rose-600 text-white border-rose-600 shadow-md"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold ${
                statusFilter === "BLOCKED_ATTENDANCE"
                  ? "text-rose-100"
                  : "text-rose-700 dark:text-rose-400"
              }`}
            >
              Blocked
            </span>
            <XCircle className="size-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
            {cohortSummary.blockedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Att &lt; 75% &amp; unapproved
          </div>
        </div>

        {/* Carried-Forward Active */}
        <div
          onClick={() => setStatusFilter("HAS_CARRIED_FORWARD")}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === "HAS_CARRIED_FORWARD"
              ? "bg-purple-600 text-white border-purple-600 shadow-md"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold ${
                statusFilter === "HAS_CARRIED_FORWARD"
                  ? "text-purple-100"
                  : "text-purple-700 dark:text-purple-400"
              }`}
            >
              Carry-Over Debt
            </span>
            <Clock className="size-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
            {cohortSummary.carriedForwardArrearsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Prior semester arrears
          </div>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            <Input
              placeholder="Search by student name, roll number, or programme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs bg-slate-50 dark:bg-slate-950"
            />
          </div>

          <select
            value={selectedProgramme}
            onChange={(e) => setSelectedProgramme(e.target.value)}
            className="h-9 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Programmes ({programmes.length})</option>
            {programmes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Showing <span className="font-bold text-slate-900 dark:text-slate-100">{filteredStudents.length}</span> candidates
        </div>
      </div>

      {/* Main Student Roster Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Candidate Details</th>
                <th className="py-3 px-3">Attendance</th>
                <th className="py-3 px-3">Current Sem Dues</th>
                <th className="py-3 px-3">Carried-Forward Arrears</th>
                <th className="py-3 px-3">Total Outstanding</th>
                <th className="py-3 px-3">Admit Card Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No students match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((item) => {
                  const student = item.student;
                  const dues = item.duesBreakdown;
                  const hasCarry = (dues?.carriedForwardDue || 0) > 0;
                  const isBlocked = item.admitCardStatus === "BLOCKED_ATTENDANCE";

                  return (
                    <tr
                      key={item.studentId}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Candidate */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {item.studentName}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono mt-0.5">
                          <span>{item.studentId}</span>
                          <span>•</span>
                          <span className="truncate max-w-[160px] font-sans">
                            {item.programme}
                          </span>
                        </div>
                      </td>

                      {/* Attendance */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-semibold ${
                              item.attendance >= 75.0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {item.attendance.toFixed(1)}%
                          </span>
                          {item.attendance < 75.0 && (
                            <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border-none text-[9px] px-1 py-0">
                              Deficit
                            </Badge>
                          )}
                        </div>
                      </td>

                      {/* Current Sem Dues */}
                      <td className="py-3 px-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                        {dues ? inr(dues.currentSemesterDue) : inr(item.outstandingDues)}
                      </td>

                      {/* Carried Forward Arrears */}
                      <td className="py-3 px-3">
                        {hasCarry ? (
                          <div className="space-y-1">
                            <div className="font-mono font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1">
                              <Clock className="size-3" />
                              {inr(dues!.carriedForwardDue)}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {dues!.activeCarryForwardBreakdown.map((b, idx) => (
                                <Badge
                                  key={idx}
                                  className="bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-none text-[9px] px-1.5 py-0 font-mono"
                                >
                                  Sem {b.fromSemNo}: {inr(b.remainingDue)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11px]">
                            ₹0 (None)
                          </span>
                        )}
                      </td>

                      {/* Total Outstanding Dues */}
                      <td className="py-3 px-3">
                        <div
                          className={`font-mono font-bold ${
                            item.outstandingDues > 0
                              ? "text-amber-700 dark:text-amber-400"
                              : "text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {inr(item.outstandingDues)}
                        </div>
                        {item.outstandingDues === 0 && (
                          <span className="text-[10px] text-emerald-600 font-medium">
                            Cleared
                          </span>
                        )}
                      </td>

                      {/* Admit Card Status */}
                      <td className="py-3 px-3">
                        {item.admitCardStatus === "CLEAN_ELIGIBLE" && (
                          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 text-[10px] gap-1 py-0.5">
                            <CheckCircle2 className="size-3" />
                            Clean Regular
                          </Badge>
                        )}
                        {item.admitCardStatus === "PROVISIONAL_DUES" && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 text-[10px] gap-1 py-0.5">
                            <AlertTriangle className="size-3" />
                            Provisional (Dues)
                          </Badge>
                        )}
                        {item.admitCardStatus === "CONDONED_ELIGIBLE" && (
                          <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300 text-[10px] gap-1 py-0.5">
                            <ShieldCheck className="size-3" />
                            Condoned (Dean Order)
                          </Badge>
                        )}
                        {item.admitCardStatus === "BLOCKED_ATTENDANCE" && (
                          <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 text-[10px] gap-1 py-0.5">
                            <XCircle className="size-3" />
                            Blocked (&lt; 75%)
                          </Badge>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isBlocked ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleInspect(item)}
                              className="h-7 text-xs border-rose-200 text-rose-700 dark:border-rose-800 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                            >
                              <AlertOctagon className="size-3 mr-1" />
                              Inspect Block
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleOpenAdmitCard(student)}
                              className={`h-7 text-xs ${
                                item.admitCardStatus === "PROVISIONAL_DUES"
                                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                                  : item.admitCardStatus === "CONDONED_ELIGIBLE"
                                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
                              }`}
                            >
                              <GraduationCap className="size-3.5 mr-1" />
                              Generate Admit Card
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admit Card Document Viewer Modal */}
      {viewerStudent && (
        <DocumentViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          docType="admit_card"
          student={viewerStudent}
        />
      )}

      {/* Blocked / Undertaking Inspector Dialog */}
      <Dialog open={isInspectorOpen} onOpenChange={setIsInspectorOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <AlertOctagon className="size-5" />
              Statutory Examination Gatekeeping Block
            </DialogTitle>
            <DialogDescription>
              Candidate does not meet the minimum statutory criteria for clean or
              provisional hall ticket generation.
            </DialogDescription>
          </DialogHeader>

          {inspectedRecord && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border space-y-1.5">
                <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  {inspectedRecord.studentName} ({inspectedRecord.studentId})
                </div>
                <div className="text-slate-500">{inspectedRecord.programme}</div>
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg space-y-2 text-rose-800 dark:text-rose-300">
                <div className="font-bold flex items-center gap-1.5">
                  <XCircle className="size-4 text-rose-600" />
                  Statutory Attendance Deficit: {inspectedRecord.attendance.toFixed(1)}% &lt; 75.0%
                </div>
                <p className="leading-relaxed">
                  Under <b>VFSTR Examination Ordinance Clause 8.1</b>, a student
                  with attendance below 75.0% is strictly barred from appearing
                  in semester-end examinations unless a formal Condonation Petition
                  is reviewed and digitally approved by the Dean of Student Affairs.
                </p>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg space-y-1.5 text-amber-800 dark:text-amber-300">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="size-4 text-amber-600" />
                  Pending Fee Liabilities: {inr(inspectedRecord.outstandingDues)}
                </div>
                <p className="leading-relaxed text-[11px]">
                  While dues alone do not block examination entry (triggering a
                  Provisional Admit Card with Undertaking), the attendance breach
                  creates a total hard block until approved in Step 5 Counsellor Desk.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsInspectorOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </>)}
    </div>
  );
}
