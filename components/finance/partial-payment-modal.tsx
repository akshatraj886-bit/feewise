"use client";

import { useState, useMemo } from "react";
import { inr, type Student, printReceiptPdf } from "@/lib/finance-data";
import { getStudentAccount, recordPayment } from "@/lib/finance-service";
import { allocatePayment, PAYMENT_PRIORITY } from "@/lib/partial-payment";
import { useLiveFinance } from "@/context/live-finance-context";
import { PaymentGatewayModal } from "./payment-gateway-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Coins,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Printer,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export function PartialPaymentSimulator({
  student,
  onPaymentSuccess,
}: {
  student: Student;
  onPaymentSuccess?: () => void;
}) {
  const { makeLivePayment, getLiveStudentAccount } = useLiveFinance();
  const liveAccount = getLiveStudentAccount(student.id) || getStudentAccount(student.id);

  const totalOutstanding = Math.max(
    0,
    (student.demand ?? (student as any).totalDemand ?? 120000) -
      (student.paid ?? (student as any).totalPaid ?? 0)
  );

  const [paymentInput, setPaymentInput] = useState<string>(
    totalOutstanding > 0 ? String(Math.round(totalOutstanding / 2)) : "25000"
  );
  const [selectedChannel, setSelectedChannel] = useState<
    "UPI" | "NetBanking" | "Debit Card" | "Bank Transfer"
  >("UPI");
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);

  const numAmount = Math.max(0, Number(paymentInput) || 0);

  // Run priority allocation
  const allocation = useMemo(() => {
    const feeList = liveAccount?.fees ?? [
      { head: "Tuition", demand: 90000, paid: 55000, outstanding: 35000 },
      { head: "Examination", demand: 5000, paid: 2000, outstanding: 3000 },
      { head: "Hostel", demand: 40000, paid: 30000, outstanding: 10000 },
    ];
    return allocatePayment(feeList, numAmount);
  }, [liveAccount?.fees, numAmount]);

  function handleQuickPreset(percentage: number) {
    const val = Math.round((totalOutstanding * percentage) / 100);
    setPaymentInput(String(val));
  }

  function handleOpenGateway() {
    if (numAmount <= 0) {
      toast.error("Please enter a valid payment amount greater than ₹0.");
      return;
    }
    setIsGatewayOpen(true);
  }

  function handleGatewaySuccess(txnDetails: {
    txnId: string;
    amount: number;
    channel: string;
    date: string;
  }) {
    try {
      makeLivePayment({
        studentId: student.id,
        amount: txnDetails.amount,
        channel: txnDetails.channel,
      });
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    } catch (err: any) {
      console.error("Live payment update notice:", err);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <Coins className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Smart Partial Payment Allocation
            </h3>
            <p className="text-xs text-muted-foreground">
              Institutional priority waterfall: clears essential fee heads first.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs bg-muted/60 px-2.5 py-1 rounded-md">
          <span className="text-muted-foreground">Total Balance Due:</span>
          <span className="font-bold text-foreground">{inr(totalOutstanding)}</span>
        </div>
      </div>

      {/* Priority Waterfall Flow Diagram */}
      <div className="bg-muted/40 rounded-lg p-3 border">
        <div className="text-[11px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wider flex items-center gap-1">
          <SlidersHorizontal className="size-3" />
          Strict Fee Head Settlement Priority
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {PAYMENT_PRIORITY.map((head, idx) => (
            <div key={head} className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-0.5 font-medium shadow-2xs border text-[11px]">
                <span className="text-primary font-bold">{idx + 1}.</span> {head}
              </span>
              {idx < PAYMENT_PRIORITY.length - 1 && (
                <ArrowRight className="size-3 text-muted-foreground/60" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Amount Input & Presets */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-medium text-foreground">Enter Payment Amount (₹)</label>
          {totalOutstanding > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground mr-1">Quick:</span>
              <button
                type="button"
                onClick={() => handleQuickPreset(25)}
                className="rounded border px-1.5 py-0.5 text-[10px] font-medium hover:bg-muted"
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset(50)}
                className="rounded border px-1.5 py-0.5 text-[10px] font-medium hover:bg-muted"
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset(75)}
                className="rounded border px-1.5 py-0.5 text-[10px] font-medium hover:bg-muted"
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => setPaymentInput(String(totalOutstanding))}
                className="rounded border bg-primary/10 text-primary border-primary/30 px-1.5 py-0.5 text-[10px] font-semibold hover:bg-primary/20"
              >
                Full Due
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
            ₹
          </span>
          <Input
            type="number"
            value={paymentInput}
            onChange={(e) => setPaymentInput(e.target.value)}
            className="pl-8 text-base font-semibold"
            placeholder="e.g. 35000"
          />
        </div>
      </div>

      {/* Allocation Breakdown Table */}
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-muted/70 text-muted-foreground border-b">
            <tr>
              <th className="py-2 px-3 text-left font-medium">Fee Head</th>
              <th className="py-2 px-3 text-right font-medium">Due Now</th>
              <th className="py-2 px-3 text-right font-medium text-primary">Allocated</th>
              <th className="py-2 px-3 text-right font-medium">Remaining</th>
              <th className="py-2 px-3 text-center font-medium">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allocation.lines.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No outstanding dues for this student.
                </td>
              </tr>
            ) : (
              allocation.lines.map((line) => (
                <tr
                  key={line.head}
                  className={
                    line.allocated > 0
                      ? line.cleared
                        ? "bg-emerald-50/40 font-medium"
                        : "bg-sky-50/30"
                      : "opacity-70"
                  }
                >
                  <td className="py-2 px-3">
                    <div className="font-semibold text-foreground">{line.head}</div>
                  </td>
                  <td className="py-2 px-3 text-right text-muted-foreground">
                    {inr(line.outstanding)}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-emerald-700">
                    {line.allocated > 0 ? inr(line.allocated) : "—"}
                  </td>
                  <td className="py-2 px-3 text-right text-foreground">
                    {inr(line.remaining)}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {line.cleared ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-100/80 px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="size-3" /> Fully Cleared
                      </span>
                    ) : line.allocated > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-sky-700 font-semibold bg-sky-100/80 px-1.5 py-0.5 rounded">
                        Partially Cleared
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">Unpaid</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Allocation Summary & Channel Selection */}
      <div className="grid sm:grid-cols-2 gap-3 pt-1">
        <div className="rounded-lg bg-muted/40 border p-3 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Amount:</span>
            <span className="font-semibold">{inr(numAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dues Settled:</span>
            <span className="font-semibold text-emerald-600">
              {inr(allocation.totalAllocated)}
            </span>
          </div>
          {allocation.advance > 0 && (
            <div className="flex justify-between border-t pt-1 text-primary">
              <span>Advance Balance (Credit):</span>
              <span className="font-bold">{inr(allocation.advance)}</span>
            </div>
          )}
          <div className="flex justify-between border-t pt-1 text-muted-foreground">
            <span>Remaining Dues After Payment:</span>
            <span className="font-bold text-foreground">
              {inr(Math.max(0, totalOutstanding - allocation.totalAllocated))}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground block">
            Select Payment Method
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(
              [
                "UPI",
                "NetBanking",
                "Debit Card",
                "Bank Transfer",
              ] as const
            ).map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setSelectedChannel(ch)}
                className={`text-xs py-1.5 px-2 rounded-md border font-medium text-center transition-colors ${
                  selectedChannel === ch
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted text-foreground"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <Button
            className="w-full mt-2 gap-2 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer transition-all hover:scale-[1.01]"
            onClick={handleOpenGateway}
            disabled={numAmount <= 0}
          >
            <CheckCircle2 className="size-4" />
            Proceed to Payment Gateway ({inr(numAmount)})
            <ExternalLink className="size-3.5 ml-1" />
          </Button>
        </div>
      </div>

      <PaymentGatewayModal
        isOpen={isGatewayOpen}
        onClose={() => setIsGatewayOpen(false)}
        student={student}
        amount={numAmount}
        onPaymentComplete={handleGatewaySuccess}
      />
    </div>
  );
}

