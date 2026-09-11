"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  ChevronRight,
  Copy,
  FileText,
  LoaderCircle,
  Maximize2,
  Mic,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Bot,
  HelpCircle,
  Key,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Waves,
  Landmark,
  Receipt,
  Scale,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { inr, printStatementPdf, students } from "@/lib/finance-data";
import { getStudentAccount } from "@/lib/finance-service";
import { queryFinanceAi, type AiChatMessage } from "@/lib/ai-finance-engine";

export type ChatMessage = AiChatMessage;

const quickPrompts = [
  {
    icon: GraduationCap,
    label: "Student Balance & Dues",
    query: "Why does student 251FA04645 (Dharanikota Aaradhya) have dues outstanding?",
    desc: "Check fee demand, paid sum, and scholarship deduction",
  },
  {
    icon: Waves,
    label: "Fee Waterfall Allocation",
    query: "How does the Fee Waterfall allocation work for partial fee payments?",
    desc: "Priority order: Tuition > Exam > Lab > Library > Transport > Hostel",
  },
  {
    icon: Receipt,
    label: "80C Tax Exemption Certificate",
    query: "How can parents claim Section 80C income tax deduction on tuition fees?",
    desc: "Income Tax Act 1961 guidelines & eligible fee components",
  },
  {
    icon: Landmark,
    label: "Bank Loan NOC & Estimation",
    query: "What documents are issued for SBI, Canara Bank, and HDFC education loans?",
    desc: "4-Year fee schedule, Bonafide letter, and verified bank mandate",
  },
  {
    icon: Scale,
    label: "UGC Fee Refund Norms",
    query: "What are the UGC and AICTE refund rules for admission withdrawal?",
    desc: "Percentage retention slabs, processing fee caps, and caution deposit",
  },
  {
    icon: FileText,
    label: "Reconciliation Mismatches",
    query: "Explain today's payment reconciliation status and the TXN-10483 mismatch",
    desc: "Gateway settlement difference of ₹5,000 requiring ledger investigation",
  },
];

type SpeechResultEvent = {
  results: { [key: number]: { [key: number]: { transcript: string } } };
};
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

// =========================================================================
// 1. DASHBOARD LAUNCHPAD WIDGET
// =========================================================================
// When user enters a query or clicks a prompt, it immediately opens the dedicated
// AI Assistant workspace and processes their query there!
export function FinanceAssistant({
  onStudent,
  onRefund,
  onReconcile,
  onExpandToPage,
}: {
  onStudent: () => void;
  onRefund: () => void;
  onReconcile: () => void;
  onExpandToPage?: (initialQuery?: string) => void;
}) {
  const [input, setInput] = useState("");

  function handleAsk(query = input) {
    if (!query.trim()) return;
    if (onExpandToPage) {
      onExpandToPage(query.trim());
    }
  }

  return (
    <Card
      id="finance-assistant"
      className="panel finance-assistant flex flex-col shadow-sm overflow-hidden border-primary/20 bg-gradient-to-b from-primary/5 via-card to-card"
    >
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <span className="assistant-mark">
              <Sparkles className="size-4 text-primary" />
            </span>
            <span>
              finDeck AI Assistant
              <span className="mt-0.5 flex items-center gap-1.5 text-xs font-normal text-success">
                <span className="online-dot" /> Online • VFSTR Finance
              </span>
            </span>
          </span>
          {onExpandToPage && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExpandToPage()}
              className="gap-1 text-xs h-7 text-primary hover:bg-primary/10 cursor-pointer"
              title="Open Dedicated Full Page"
            >
              <Maximize2 className="size-3" /> Full Page
            </Button>
          )}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-1">
          Ask any finance query to instantly open the full AI intelligence workspace.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3.5 p-4">
        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-muted-foreground">
            Popular Inquiries (Click to open):
          </p>
          <div className="flex flex-col gap-1.5">
            {quickPrompts.slice(0, 4).map((p) => (
              <button
                key={p.label}
                onClick={() => handleAsk(p.query)}
                className="w-full text-left px-2.5 py-2 rounded-lg border bg-card/80 hover:bg-primary/10 hover:border-primary/40 text-xs text-foreground flex items-center justify-between group transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <p.icon className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">{p.label}</span>
                </span>
                <ChevronRight className="size-3 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="pt-2 border-t">
          <InputGroup className="h-10">
            <InputGroupInput
              id="agent-input"
              aria-label="Ask the Finance Agent"
              placeholder="Ask anything about fees, dues, loans, GST, refund..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAsk();
                }
              }}
              className="text-xs"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Send message and open AI Workspace"
                variant="default"
                size="icon-xs"
                disabled={!input.trim()}
                onClick={() => handleAsk()}
                className="cursor-pointer"
              >
                <ArrowUp className="size-3.5" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Direct Workspace Link Button */}
        {onExpandToPage && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onExpandToPage()}
            className="w-full text-xs font-semibold text-primary gap-1.5 h-8 border border-primary/15 hover:bg-primary/10 cursor-pointer"
          >
            <Sparkles className="size-3.5" /> Open Dedicated AI Assistant Page
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// =========================================================================
// 2. DEDICATED FULL-PAGE AI ASSISTANT (Fresh Clean Slate + Universal Finance Engine)
// =========================================================================
export function FullPageAiAssistant({
  onStudent,
  onRefund,
  onReconcile,
  initialPrompt,
  onClearInitialPrompt,
}: {
  onStudent: () => void;
  onRefund: () => void;
  onReconcile: () => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}) {
  // Fresh, empty messages state by default — NO pre-asked mock questions!
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load saved API key from localStorage if present
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem("feewise_gemini_api_key");
      if (savedKey) setApiKey(savedKey);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Auto-scroll on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  // Handle incoming initial prompt from Dashboard navigation
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      submit(initialPrompt.trim());
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  async function submit(question = input) {
    const q = question.trim();
    if (!q || busy) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setInput("");
    setBusy(true);

    try {
      // Query the comprehensive AI Finance Engine
      const aiResponse = await queryFinanceAi(q, messages, apiKey);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error("AI execution error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a temporary processing issue. Please try again or rephrase your finance question.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function startVoice() {
    if (listening) return;
    const browser = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Speech = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Speech) {
      toast.info("Voice input is not supported in this browser.");
      return;
    }
    const speech = new Speech();
    speech.lang = "en-IN";
    speech.onresult = (event) => {
      setInput(event.results[0][0].transcript);
      setListening(false);
    };
    speech.onerror = () => setListening(false);
    speech.onend = () => setListening(false);
    try {
      speech.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }

  function saveApiKey(key: string) {
    setApiKey(key);
    try {
      if (key.trim()) {
        localStorage.setItem("feewise_gemini_api_key", key.trim());
        toast.success("Gemini API key saved! Live LLM responses active.");
      } else {
        localStorage.removeItem("feewise_gemini_api_key");
        toast.info("API key removed. Using built-in local finance reasoning engine.");
      }
    } catch {
      // Ignore localStorage errors
    }
    setShowSettings(false);
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <div className="rounded-2xl border bg-gradient-to-r from-primary/10 via-primary/5 to-background p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-xs">
              <Bot className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                VFSTR AI Finance Intelligence Workspace
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/30">
                  Universal Finance AI
                </span>
              </h2>
            </div>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Vignan&apos;s Foundation for Science, Technology &amp; Research AI Copilot. Responds to any queries about student ledgers, fee heads, waterfall allocations, loan NOCs, 80C tax certificates, UGC refund rules, and bank reconciliations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="gap-1.5 text-xs h-9 cursor-pointer"
            title="Configure Cloud LLM API Key"
          >
            <Key className="size-3.5 text-primary" />
            {apiKey ? "API Key Connected" : "AI Settings"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMessages([]);
              toast.info("Chat cleared. Ready for fresh queries.");
            }}
            className="gap-1.5 text-xs h-9 cursor-pointer text-muted-foreground hover:text-foreground"
            title="Start a fresh chat"
          >
            <RotateCcw className="size-3.5" /> Clear / New Chat
          </Button>
        </div>
      </div>

      {/* Optional Cloud LLM API Settings Bar */}
      {showSettings && (
        <Card className="border-primary/30 bg-card p-4 shadow-md animate-in fade-in-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Key className="size-4 text-primary" /> Optional Cloud LLM Key (Google Gemini)
              </h4>
              <p className="text-xs text-muted-foreground">
                Enter your Google Gemini API key to query live Google cloud models. Leave empty to use finDeck&apos;s high-performance built-in offline finance reasoning engine.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                defaultValue={apiKey}
                id="api-key-input"
                className="h-9 px-3 text-xs rounded-lg border bg-background text-foreground w-48 sm:w-64"
              />
              <Button
                size="sm"
                onClick={() => {
                  const val = (document.getElementById("api-key-input") as HTMLInputElement)?.value || "";
                  saveApiKey(val);
                }}
                className="h-9 text-xs cursor-pointer"
              >
                Save Key
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Main 2-Column AI Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        {/* Left Column: Quick Prompt Library */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <HelpCircle className="size-4 text-primary" />
                Prompt Library
              </CardTitle>
              <CardDescription className="text-xs">
                Click any topic to query instantly:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((p) => (
                <button
                  key={p.label}
                  disabled={busy}
                  onClick={() => submit(p.query)}
                  className="w-full text-left p-2.5 rounded-xl border text-xs font-medium hover:bg-primary/5 hover:border-primary/40 transition-colors flex items-start justify-between group cursor-pointer disabled:opacity-50"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <p.icon className="size-3.5 text-primary shrink-0" />
                      {p.label}
                    </span>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      {p.desc}
                    </p>
                  </div>
                  <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" />
                University Compliance &amp; Hindi
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[11px] text-muted-foreground leading-relaxed space-y-2">
              <p>
                🌐 <strong>Multilingual:</strong> You can ask in English, Hindi, or Hinglish (e.g. <em>&quot;Akshat ka kitna balance baki hai?&quot;</em>).
              </p>
              <p>
                🔒 <strong>Audit Safe:</strong> Financial modifications always require a designated officer signature and 2FA.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactive Chatroom */}
        <Card className="flex flex-col h-[620px] shadow-sm overflow-hidden border">
          <CardHeader className="py-3 px-5 border-b bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" />
                <span className="font-semibold text-sm">Interactive Financial Session</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {messages.length === 0 ? "Fresh Session" : `${messages.length} Messages`}
              </span>
            </div>
          </CardHeader>

          {/* Messages Viewport with Bidirectional Smooth Scroll */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth scrollbar-thin">
            {/* Fresh Clean Slate / Empty Welcome State */}
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xs">
                  <Sparkles className="size-7" />
                </div>
                <div className="space-y-1.5 max-w-lg">
                  <h3 className="text-lg font-bold text-foreground">
                    Welcome to finDeck Financial AI Copilot
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Trained on Vignan Foundation for Science, Technology &amp; Research finance databases, bylaws, and UGC fee regulations. Ask any question in English or Hindi.
                  </p>
                </div>

                {/* 4 Interactive Starter Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl text-left pt-2">
                  {quickPrompts.slice(0, 4).map((p) => (
                    <button
                      key={p.label}
                      onClick={() => submit(p.query)}
                      className="p-3 rounded-xl border bg-muted/40 hover:bg-primary/10 hover:border-primary/40 transition-colors text-xs flex items-center gap-2.5 group cursor-pointer"
                    >
                      <p.icon className="size-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <span className="font-semibold block text-foreground truncate">
                          {p.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate block">
                          {p.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 text-xs text-muted-foreground">
                  {message.role === "user" ? (
                    <span className="font-medium text-foreground">You</span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-semibold text-primary">
                      <Sparkles className="size-3.5" /> finDeck Finance Agent
                    </span>
                  )}
                </div>

                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed max-w-[88%] shadow-xs ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground font-medium rounded-tr-xs"
                      : "bg-card text-foreground border rounded-tl-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>

                  {/* Actions Bar for assistant responses */}
                  {message.role === "assistant" && (
                    <div className="mt-3 pt-2.5 border-t border-border/50 flex flex-wrap items-center gap-2.5">
                      {(message.kind === "breakdown" || message.kind === "student") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onStudent}
                          className="h-7 text-xs gap-1 text-primary cursor-pointer"
                        >
                          View Student Profile <ArrowUpRight className="size-3" />
                        </Button>
                      )}
                      {message.kind === "reconcile" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onReconcile}
                          className="h-7 text-xs gap-1 text-primary cursor-pointer"
                        >
                          Review Mismatch <ArrowUpRight className="size-3" />
                        </Button>
                      )}
                      {message.kind === "refund" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onRefund}
                          className="h-7 text-xs gap-1 text-primary cursor-pointer"
                        >
                          Review Refund Request <ArrowUpRight className="size-3" />
                        </Button>
                      )}
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        onClick={() => {
                          navigator.clipboard.writeText(message.content);
                          toast.success("Copied to clipboard");
                        }}
                        title="Copy response"
                        className="cursor-pointer"
                      >
                        <Copy className="size-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex items-center gap-2.5 text-xs text-primary font-medium p-3 bg-primary/5 rounded-xl border border-primary/20 w-fit">
                <LoaderCircle className="size-4 animate-spin" />
                Analyzing university records, fee schedules &amp; bylaws…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input */}
          <div className="p-4 border-t bg-card">
            <InputGroup className="h-12">
              <InputGroupInput
                placeholder="Ask about fee collection, student dues, loan NOC, 80C tax certificate, UGC refunds..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submit();
                  }
                }}
                className="text-sm"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Voice input"
                  onClick={startVoice}
                  variant={listening ? "secondary" : "ghost"}
                  size="icon-sm"
                  className="cursor-pointer"
                >
                  <Mic className="size-4" />
                </InputGroupButton>
                <InputGroupButton
                  aria-label="Send prompt"
                  variant="default"
                  size="icon-sm"
                  disabled={!input.trim() || busy}
                  onClick={() => submit()}
                  className="cursor-pointer"
                >
                  <ArrowUp className="size-4" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </Card>
      </div>
    </div>
  );
}
