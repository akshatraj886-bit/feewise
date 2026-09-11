"use client";

import { useState, useEffect } from "react";
import { inr, type Student, printReceiptPdf } from "@/lib/finance-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Smartphone,
  ChevronRight,
  Printer,
  Loader2,
  ExternalLink,
  Info,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  amount: number;
  onPaymentComplete: (txnDetails: {
    txnId: string;
    amount: number;
    channel: string;
    date: string;
  }) => void;
}

export function PaymentGatewayModal({
  isOpen,
  onClose,
  student,
  amount,
  onPaymentComplete,
}: PaymentGatewayModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [stage, setStage] = useState<"input" | "processing" | "otp" | "success">("input");
  const [processingMessage, setProcessingMessage] = useState("Connecting to Payment Gateway...");

  // UPI State
  const [upiId, setUpiId] = useState("");
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>("gpay");

  // Card State
  const [cardNumber, setCardNumber] = useState("4532 8921 4402 7819");
  const [cardName, setCardName] = useState(student.name.toUpperCase());
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvv, setCardCvv] = useState("892");

  // Netbanking State
  const [selectedBank, setSelectedBank] = useState("SBI");

  // OTP State
  const [otpCode, setOtpCode] = useState("842019");

  // Success State
  const [confirmedTxn, setConfirmedTxn] = useState<{
    txnId: string;
    date: string;
    channel: string;
    amount: number;
  } | null>(null);

  // 10-minute session countdown timer
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (!isOpen) {
      setStage("input");
      setTimeLeft(600);
      setConfirmedTxn(null);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  function handleStartPayment(channelName: string) {
    if (selectedMethod === "card") {
      setStage("otp");
      return;
    }

    executeProcessing(channelName);
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otpCode.length < 4) {
      toast.error("Please enter the 6-digit OTP sent to registered mobile");
      return;
    }
    executeProcessing("Card (3D Secure)");
  }

  function executeProcessing(channelName: string) {
    setStage("processing");
    setProcessingMessage("Contacting bank gateway and verifying limits...");

    setTimeout(() => {
      setProcessingMessage("Transferring funds via Reserve Bank payment protocol...");
    }, 1200);

    setTimeout(() => {
      setProcessingMessage("Stamping university treasury ledger & applying waterfall allocation...");
    }, 2200);

    setTimeout(() => {
      const txnId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
      const dateStr = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const details = {
        txnId,
        date: dateStr,
        channel: channelName,
        amount,
      };

      setConfirmedTxn(details);
      setStage("success");
      onPaymentComplete(details);
      toast.success(`Payment of ${inr(amount)} processed successfully!`);
    }, 3200);
  }

  const vpaAddress = `vfstr.${student.id.toLowerCase()}@sbi`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in-0">
      <div className="fixed inset-0" onClick={stage === "processing" ? undefined : onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-900 dark:text-slate-100 flex flex-col max-h-[92vh]">
        {/* GATEWAY TOP BAR */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black text-sm">
              VF
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight flex items-center gap-1.5 text-white">
                VFSTR University Payment Gateway
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[9px] h-4 py-0">
                  <Lock className="size-2.5 mr-0.5" /> 256-bit SSL
                </Badge>
              </div>
              <div className="text-[10px] text-slate-400">
                Merchant Ref: VFSTR-TREASURY-CHQ
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
              <Clock className="size-3" />
              <span>{timeFormatted}</span>
            </div>
            {stage !== "processing" && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-xs p-1 rounded hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* STUDENT & AMOUNT SUMMARY STRIP */}
        <div className="bg-slate-50 dark:bg-slate-800/60 px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400">Paying for: </span>
            <strong className="font-semibold text-slate-800 dark:text-slate-200">{student.name}</strong>
            <span className="text-slate-400 ml-1.5">({student.id})</span>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">{student.programme}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
              Total Payable Amount
            </span>
            <span className="text-lg sm:text-xl font-black text-primary font-mono">
              {inr(amount)}
            </span>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* STAGE: INPUT METHOD */}
          {stage === "input" && (
            <div className="space-y-5">
              {/* Payment Mode Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedMethod("upi")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedMethod === "upi"
                      ? "bg-white dark:bg-slate-700 text-primary shadow-xs border border-slate-200 dark:border-slate-600"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <QrCode className="size-3.5" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod("card")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedMethod === "card"
                      ? "bg-white dark:bg-slate-700 text-primary shadow-xs border border-slate-200 dark:border-slate-600"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <CreditCard className="size-3.5" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod("netbanking")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedMethod === "netbanking"
                      ? "bg-white dark:bg-slate-700 text-primary shadow-xs border border-slate-200 dark:border-slate-600"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="size-3.5" />
                  <span>NetBanking</span>
                </button>
              </div>

              {/* METHOD 1: UPI */}
              {selectedMethod === "upi" && (
                <div className="space-y-4 animate-in fade-in-50">
                  <div className="grid sm:grid-cols-2 gap-4 items-center">
                    {/* Left: Dynamic QR Code Box */}
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-center space-y-2">
                      <div className="size-40 sm:size-44 bg-white p-2.5 rounded-xl border-2 border-slate-900 shadow-md flex items-center justify-center relative group">
                        {/* High-res SVG QR Representation */}
                        <svg viewBox="0 0 100 100" className="size-full">
                          <rect width="100" height="100" fill="#ffffff" />
                          <rect x="5" y="5" width="30" height="30" fill="#0f172a" />
                          <rect x="10" y="10" width="20" height="20" fill="#ffffff" />
                          <rect x="15" y="15" width="10" height="10" fill="#0f172a" />

                          <rect x="65" y="5" width="30" height="30" fill="#0f172a" />
                          <rect x="70" y="10" width="20" height="20" fill="#ffffff" />
                          <rect x="75" y="15" width="10" height="10" fill="#0f172a" />

                          <rect x="5" y="65" width="30" height="30" fill="#0f172a" />
                          <rect x="10" y="70" width="20" height="20" fill="#ffffff" />
                          <rect x="15" y="75" width="10" height="10" fill="#0f172a" />

                          {/* Pattern Blocks */}
                          <rect x="42" y="8" width="6" height="6" fill="#0f172a" />
                          <rect x="52" y="8" width="6" height="6" fill="#0f172a" />
                          <rect x="42" y="20" width="16" height="6" fill="#0f172a" />
                          <rect x="42" y="32" width="6" height="14" fill="#0f172a" />
                          <rect x="10" y="42" width="25" height="6" fill="#0f172a" />
                          <rect x="10" y="52" width="12" height="6" fill="#0f172a" />
                          <rect x="28" y="52" width="7" height="7" fill="#0f172a" />
                          <rect x="42" y="52" width="16" height="8" fill="#0f172a" />
                          <rect x="65" y="42" width="8" height="16" fill="#0f172a" />
                          <rect x="78" y="42" width="17" height="6" fill="#0f172a" />
                          <rect x="80" y="55" width="15" height="15" fill="#0f172a" />
                          <rect x="65" y="65" width="8" height="25" fill="#0f172a" />
                          <rect x="78" y="75" width="17" height="6" fill="#0f172a" />
                          <rect x="42" y="70" width="16" height="20" fill="#0f172a" />
                        </svg>

                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-[11px] font-bold">
                          Scan to Pay {inr(amount)}
                        </div>
                      </div>

                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                        Scan with any UPI App
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="size-3" /> Auto-updates institutional ledger
                      </div>
                    </div>

                    {/* Right: UPI Apps & VPA Input */}
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Select Preferred UPI App:
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "gpay", name: "Google Pay", color: "border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300" },
                          { id: "phonepe", name: "PhonePe", color: "border-purple-500/40 bg-purple-50/50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300" },
                          { id: "paytm", name: "Paytm UPI", color: "border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300" },
                          { id: "bhim", name: "BHIM / Cred", color: "border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300" },
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => setSelectedUpiApp(app.id)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              selectedUpiApp === app.id
                                ? `${app.color} ring-2 ring-primary/40`
                                : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            <Smartphone className="size-3.5" />
                            <span>{app.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Or enter manual UPI ID */}
                      <div className="space-y-1 pt-1">
                        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                          Or enter your UPI ID:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okhdfcbank"
                            className="flex-1 h-9 px-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      </div>

                      {/* University VPA info */}
                      <div className="rounded-lg bg-slate-100 dark:bg-slate-800/80 p-2 text-[11px] flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span className="truncate">VPA: <strong>{vpaAddress}</strong></span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(vpaAddress);
                            setCopiedVpa(true);
                            setTimeout(() => setCopiedVpa(false), 2000);
                            toast.success("UPI VPA copied to clipboard!");
                          }}
                          className="text-primary hover:underline flex items-center gap-1 font-semibold shrink-0 cursor-pointer ml-2"
                        >
                          {copiedVpa ? <Check className="size-3" /> : <Copy className="size-3" />}
                          {copiedVpa ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer transition-all hover:scale-[1.01]"
                    onClick={() => handleStartPayment("UPI")}
                  >
                    Simulate UPI App Approval & Pay {inr(amount)}
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>
                </div>
              )}

              {/* METHOD 2: CARD */}
              {selectedMethod === "card" && (
                <div className="space-y-4 animate-in fade-in-50">
                  {/* Card Visual Mockup */}
                  <div className="rounded-2xl p-5 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 text-white shadow-xl relative overflow-hidden border border-slate-700">
                    <div className="absolute right-4 top-4 font-black tracking-wider text-sm opacity-80">
                      RUPAY / VISA
                    </div>
                    <div className="size-9 rounded-md bg-amber-400/80 border border-amber-300 mb-4" />
                    <div className="font-mono text-base tracking-widest font-bold mb-3">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <div>
                        <span className="text-[9px] uppercase opacity-70 block">Cardholder</span>
                        <span className="font-semibold tracking-wider">{cardName || "STUDENT NAME"}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase opacity-70 block">Expires</span>
                        <span className="font-semibold font-mono">{cardExpiry || "MM/YY"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Inputs */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="16-digit card number"
                        className="w-full h-9 px-3 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Valid Thru
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full h-9 px-3 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={3}
                          placeholder="•••"
                          className="w-full h-9 px-3 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 cursor-pointer transition-all hover:scale-[1.01]"
                    onClick={() => handleStartPayment("Card")}
                  >
                    Proceed to 3D Secure Verification & Pay {inr(amount)}
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>
                </div>
              )}

              {/* METHOD 3: NET BANKING */}
              {selectedMethod === "netbanking" && (
                <div className="space-y-4 animate-in fade-in-50">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Select Your Bank:
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "SBI", name: "State Bank of India", note: "Recommended" },
                      { id: "HDFC", name: "HDFC Bank", note: "Direct Gateway" },
                      { id: "ICICI", name: "ICICI Bank", note: "Instant" },
                      { id: "Axis", name: "Axis Bank", note: "Instant" },
                      { id: "Canara", name: "Canara Bank", note: "Standard" },
                      { id: "Andhra", name: "Union / Andhra Bank", note: "Local Branch" },
                    ].map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedBank === bank.id
                            ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/30"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div className="text-xs font-bold">{bank.id}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{bank.name}</div>
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">{bank.note}</span>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-xs text-slate-600 dark:text-slate-400 border flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary shrink-0" />
                    <span>You will be redirected to the secure portal of <strong>{selectedBank}</strong>.</span>
                  </div>

                  <Button
                    type="button"
                    className="w-full h-11 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white font-bold text-xs shadow-md cursor-pointer transition-all hover:scale-[1.01]"
                    onClick={() => handleStartPayment(`NetBanking (${selectedBank})`)}
                  >
                    Authorize on {selectedBank} NetBanking & Pay {inr(amount)}
                    <ExternalLink className="size-3.5 ml-1.5" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* STAGE: 3D SECURE OTP MODAL */}
          {stage === "otp" && (
            <div className="space-y-5 animate-in zoom-in-95 py-2">
              <div className="text-center space-y-1">
                <div className="size-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-2 border border-indigo-500/20">
                  <Lock className="size-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Verified by Visa / 3D Secure Authentication
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  A high-security one-time password has been sent to the registered mobile number ending in <strong>••91</strong>.
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-4 max-w-xs mx-auto">
                <div className="space-y-1.5 text-center">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Enter 6-Digit OTP:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full h-12 text-center font-mono text-xl tracking-widest font-black rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/40 outline-none"
                  />
                  <span className="text-[10px] text-emerald-600 font-medium">
                    Demo OTP auto-filled: 842019
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md cursor-pointer"
                >
                  Confirm &amp; Authorize {inr(amount)}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStage("input")}
                    className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
                  >
                    Cancel &amp; change payment method
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STAGE: PROCESSING SIMULATION */}
          {stage === "processing" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in-50">
              <div className="relative size-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
                <div className="size-16 rounded-full border-4 border-primary border-t-transparent animate-spin flex items-center justify-center">
                  <Loader2 className="size-8 text-primary animate-pulse" />
                </div>
              </div>

              <div className="space-y-1 max-w-sm">
                <h4 className="text-base font-bold text-foreground">
                  Processing Payment...
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {processingMessage}
                </p>
              </div>

              <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                Please do not refresh or close this window
              </div>
            </div>
          )}

          {/* STAGE: PAYMENT CONFIRMED SUCCESS */}
          {stage === "success" && confirmedTxn && (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-5 animate-in zoom-in-95">
              <div className="size-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="size-9" />
              </div>

              <div className="space-y-1">
                <Badge className="bg-emerald-600 text-white font-bold text-[11px]">
                  Transaction Successful
                </Badge>
                <h3 className="text-xl font-black text-foreground tracking-tight mt-1">
                  Payment of {inr(confirmedTxn.amount)} Confirmed!
                </h3>
                <p className="text-xs text-muted-foreground">
                  Amount successfully apportioned across your university fee ledger.
                </p>
              </div>

              {/* Receipt Summary Details Box */}
              <div className="w-full max-w-md bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono font-bold text-foreground">{confirmedTxn.txnId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date &amp; Time</span>
                  <span className="font-medium text-foreground">{confirmedTxn.date} · Real-time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Channel</span>
                  <span className="font-medium text-foreground">{confirmedTxn.channel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID</span>
                  <span className="font-mono font-semibold text-foreground">{student.id}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 font-bold">
                  <span>Amount Credited</span>
                  <span className="text-emerald-600 font-mono text-sm">{inr(confirmedTxn.amount)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <Button
                  className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-1.5 cursor-pointer shadow-md"
                  onClick={() =>
                    printReceiptPdf({
                      txnId: confirmedTxn.txnId,
                      id: confirmedTxn.txnId,
                      date: confirmedTxn.date,
                      method: confirmedTxn.channel,
                      channel: confirmedTxn.channel,
                      amount: confirmedTxn.amount,
                      ledger: confirmedTxn.amount,
                      studentId: student.id,
                      studentName: student.name,
                      programme: student.programme,
                    })
                  }
                >
                  <Printer className="size-3.5" />
                  Download Official PDF Receipt
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-10 rounded-xl text-xs font-semibold cursor-pointer"
                  onClick={onClose}
                >
                  Back to Student Portal
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* GATEWAY FOOTER */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Vignan University Treasury &amp; Comptroller
          </span>
          <span className="font-mono text-[10px]">
            Security Token: VFSTR-PAY-2026
          </span>
        </div>
      </div>
    </div>
  );
}
