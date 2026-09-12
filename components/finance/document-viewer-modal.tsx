"use client";

import React, { useRef, useMemo, useState } from "react";
import { type Student } from "@/lib/finance-data";
import {
  type FinanceDocType,
  FINANCE_DOC_METAS,
  generateFinanceDocumentHtml,
  openFinanceDocument,
  type GenerateDocOptions,
} from "@/lib/finance-documents";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Printer,
  ExternalLink,
  X,
  FileCheck,
  ShieldCheck,
  Building2,
  FileText,
  CreditCard,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
} from "lucide-react";

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  docType: FinanceDocType;
  student: Student | string;
  options?: GenerateDocOptions;
}

export function DocumentViewerModal({
  isOpen,
  onClose,
  docType,
  student,
  options,
}: DocumentViewerModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zoom, setZoom] = useState(100);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const meta = FINANCE_DOC_METAS[docType] || FINANCE_DOC_METAS.bonafide;

  // Generate full HTML on demand
  const documentHtml = useMemo(() => {
    if (!isOpen) return "";
    return generateFinanceDocumentHtml(docType, student, options);
  }, [isOpen, docType, student, options]);

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
      } catch (err) {
        // Fallback to open in new tab and print
        openFinanceDocument(docType, student, options);
      }
    } else {
      openFinanceDocument(docType, student, options);
    }
  };

  const handleOpenInNewTab = () => {
    openFinanceDocument(docType, student, options);
  };

  const getDocIcon = () => {
    switch (docType) {
      case "bonafide":
        return <FileCheck className="size-4 text-blue-600 dark:text-blue-400" />;
      case "noc":
        return <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />;
      case "reimbursement":
        return <CreditCard className="size-4 text-purple-600 dark:text-purple-400" />;
      case "statement":
        return <FileText className="size-4 text-indigo-600 dark:text-indigo-400" />;
      case "tax":
        return <Building2 className="size-4 text-teal-600 dark:text-teal-400" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl h-[94vh] flex flex-col p-0 gap-0 overflow-hidden bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Top Control Bar */}
        <DialogHeader className="p-3.5 px-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="flex size-9 items-center justify-center rounded-lg border shadow-2xs"
              style={{
                borderColor: `${meta.themeColor}40`,
                backgroundColor: `${meta.themeColor}15`,
              }}
            >
              {getDocIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-sm font-bold text-foreground">
                  {meta.title}
                </DialogTitle>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: meta.themeColor }}
                >
                  {meta.themeName}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Authentic VFSTR University Template &middot; Single Source of Truth Preview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center border rounded-lg bg-slate-50 dark:bg-slate-800/80 p-0.5 text-xs text-muted-foreground">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setZoom((z) => Math.max(70, z - 10))}
                title="Zoom Out"
              >
                <ZoomOut className="size-3.5" />
              </Button>
              <span className="w-10 text-center font-medium text-[11px]">
                {zoom}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setZoom((z) => Math.min(130, z + 10))}
                title="Zoom In"
              >
                <ZoomIn className="size-3.5" />
              </Button>
            </div>

            {/* Open in Separate Tab */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold gap-1.5 hidden md:inline-flex bg-white dark:bg-slate-800"
              onClick={handleOpenInNewTab}
              title="Open full document in isolated browser tab"
            >
              <ExternalLink className="size-3.5" />
              Open in Tab
            </Button>

            {/* Print / Save as PDF Button */}
            <Button
              size="sm"
              className="h-8 text-xs font-semibold gap-1.5 shadow-sm text-white cursor-pointer"
              style={{ backgroundColor: meta.themeColor }}
              onClick={handlePrint}
            >
              <Printer className="size-3.5" />
              Print / Save as PDF
            </Button>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Document Canvas Body */}
        <div className="flex-1 overflow-auto bg-slate-200/70 dark:bg-slate-950 p-4 sm:p-6 flex justify-center items-start">
          <div
            className="transition-transform origin-top w-full max-w-[850px] shadow-xl rounded-lg overflow-hidden bg-white"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            <iframe
              ref={iframeRef}
              srcDoc={documentHtml}
              title={meta.title}
              className="w-full border-0 min-h-[920px] bg-transparent"
              style={{ height: "1050px" }}
              onLoad={() => setIsIframeLoaded(true)}
            />
          </div>
        </div>

        {/* Footer Info Strip */}
        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-5 py-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-emerald-500" />
            <span>Format: Standard A4 Portrait &middot; CSS Variables Color-Coded</span>
          </div>
          <div className="text-right">
            Click <strong>&quot;Print / Save as PDF&quot;</strong> above to export to local system.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
