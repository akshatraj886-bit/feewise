"use client";

import React, { useState } from "react";
import { type Student } from "@/lib/finance-data";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ShieldCheck,
  Building2,
  Printer,
  Award,
  ExternalLink,
  Eye,
  CreditCard,
  FileCheck,
} from "lucide-react";
import {
  type FinanceDocType,
  FINANCE_DOC_METAS,
  openFinanceDocument,
  generateFinanceDocumentHtml,
} from "@/lib/finance-documents";
import { DocumentViewerModal } from "@/components/finance/document-viewer-modal";

/**
 * Print/Download Tax Certificate (Section 80C / 80E eligible Tuition Fees)
 */
export function printTaxCertificate(student: Student) {
  openFinanceDocument("tax", student);
}

/**
 * Print/Download Loan NOC Certificate (No Objection Certificate for Bank Education Loan)
 */
export function printLoanNocCertificate(student: Student) {
  openFinanceDocument("noc", student);
}

/**
 * Print/Download Reimbursement Certificate (Employer / Government Scholarship Claim)
 */
export function printReimbursementCertificate(student: Student) {
  openFinanceDocument("reimbursement", student);
}

/**
 * Print/Download Bonafide Certificate
 */
export function printBonafideCertificate(student: Student) {
  openFinanceDocument("bonafide", student);
}

/**
 * Print/Download Fee Statement & Ledger
 */
export function printFeeStatement(student: Student) {
  openFinanceDocument("statement", student);
}

/**
 * Modern UI Component for rendering all 5 institutional finance documents
 * with in-app previewer modal and single-source-of-truth styling
 */
export function FeeCertificatesPanel({ student }: { student: Student }) {
  const [activeDocType, setActiveDocType] = useState<FinanceDocType | null>(null);

  const documents: Array<{
    type: FinanceDocType;
    title: string;
    desc: string;
    icon: any;
    cardClass: string;
    iconBg: string;
    badgeClass: string;
    btnClass: string;
    badge: string;
    themeName: string;
  }> = [
    {
      type: "bonafide",
      title: "Bonafide Student Certificate",
      desc: "Official full-time enrollment and bonafide scholar attestation for banks, visa, and external bodies.",
      icon: FileCheck,
      cardClass:
        "border-blue-200/80 bg-blue-50/70 dark:bg-blue-950/25 dark:border-blue-500/25 hover:border-blue-400 dark:hover:border-blue-400/50",
      iconBg:
        "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30",
      badgeClass:
        "bg-blue-100/90 dark:bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30",
      btnClass:
        "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-sm border-0",
      badge: "Identity / Trust",
      themeName: "Blue Theme",
    },
    {
      type: "noc",
      title: "Bank Loan NOC Certificate",
      desc: "Institutional clearance and direct bank transfer mandate for nationalized education loan disbursement.",
      icon: ShieldCheck,
      cardClass:
        "border-emerald-200/80 bg-emerald-50/70 dark:bg-emerald-950/25 dark:border-emerald-500/25 hover:border-emerald-400 dark:hover:border-emerald-400/50",
      iconBg:
        "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30",
      badgeClass:
        "bg-emerald-100/90 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30",
      btnClass:
        "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm border-0",
      badge: "Loan Clearance",
      themeName: "Green Theme",
    },
    {
      type: "reimbursement",
      title: "Fee Reimbursement Certificate",
      desc: "Itemized paid fee attestation for parent employer reimbursement, CEA allowance, or scholarship claim.",
      icon: CreditCard,
      cardClass:
        "border-purple-200/80 bg-purple-50/70 dark:bg-purple-950/25 dark:border-purple-500/25 hover:border-purple-400 dark:hover:border-purple-400/50",
      iconBg:
        "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30",
      badgeClass:
        "bg-purple-100/90 dark:bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30",
      btnClass:
        "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white shadow-sm border-0",
      badge: "Employer / Govt Claim",
      themeName: "Purple Theme",
    },
    {
      type: "statement",
      title: "Official Fee Statement & Ledger",
      desc: "Complete head-wise academic demands, scholarship concessions, and verified payments ledger.",
      icon: FileText,
      cardClass:
        "border-indigo-200/80 bg-indigo-50/70 dark:bg-indigo-950/25 dark:border-indigo-500/25 hover:border-indigo-400 dark:hover:border-indigo-400/50",
      iconBg:
        "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30",
      badgeClass:
        "bg-indigo-100/90 dark:bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30",
      btnClass:
        "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-sm border-0",
      badge: "Official Ledger",
      themeName: "Indigo Theme",
    },
    {
      type: "tax",
      title: "Tuition Fee Tax Certificate",
      desc: "Eligible for income tax deduction under Section 80C & 80E of ITA 1961 for parents and scholars.",
      icon: Building2,
      cardClass:
        "border-teal-200/80 bg-teal-50/70 dark:bg-teal-950/25 dark:border-teal-500/25 hover:border-teal-400 dark:hover:border-teal-400/50",
      iconBg:
        "bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30",
      badgeClass:
        "bg-teal-100/90 dark:bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30",
      btnClass:
        "bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white shadow-sm border-0",
      badge: "ITR / Sec 80C",
      themeName: "Teal Theme",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Award className="size-4" />
            </span>
            Official VFSTR University Fee Certificates & Documents
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Color-coded institutional documents generated from real student ledger records. Previews open inside portal; print anytime.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <span>5 Standard Color Themes Supported</span>
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => {
          const Icon = doc.icon;
          return (
            <div
              key={doc.type}
              className={`flex flex-col justify-between rounded-2xl border p-5 backdrop-blur-xl transition-all duration-200 shadow-xs hover:shadow-md ${doc.cardClass}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`flex size-9 items-center justify-center rounded-xl shadow-2xs ${doc.iconBg}`}>
                    <Icon className="size-5" />
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-2xs ${doc.badgeClass}`}>
                      {doc.badge}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-foreground tracking-tight">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {doc.desc}
                  </p>
                </div>
              </div>

              <div className="pt-5 flex items-center gap-2">
                <Button
                  size="sm"
                  className={`flex-1 gap-1.5 rounded-xl font-semibold text-xs cursor-pointer ${doc.btnClass}`}
                  onClick={() => setActiveDocType(doc.type)}
                >
                  <Eye className="size-3.5" />
                  Open Document
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl px-2.5 h-8 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                  onClick={() => openFinanceDocument(doc.type, student)}
                  title="Open full page in separate tab"
                >
                  <ExternalLink className="size-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-App Document Viewer Modal */}
      {activeDocType && (
        <DocumentViewerModal
          isOpen={!!activeDocType}
          onClose={() => setActiveDocType(null)}
          docType={activeDocType}
          student={student}
        />
      )}
    </div>
  );
}
