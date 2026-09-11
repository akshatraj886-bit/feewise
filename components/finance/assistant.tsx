"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  FileText,
  LoaderCircle,
  Maximize2,
  Mic,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Message, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
} from "@/components/ui/message-scroller";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { downloadCsv, inr, students } from "@/lib/finance-data";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  kind?: string;
};
const initialMessages: ChatMessage[] = [
  {
    role: "user",
    content: "Why does student 251FA04E03 have ₹28,000 outstanding?",
  },
  {
    role: "assistant",
    content: "Student 251FA04E03 has a total fee demand of ₹1,44,100.",
    kind: "breakdown",
  },
];
const quickActions = [
  "Find overdue students",
  "Reconcile today’s payments",
  "Show hostel dues",
  "Calculate refund",
  "Generate fee statement",
];
function answerFor(question: string): ChatMessage {
  const text = question.toLowerCase();
  if (/approve|execute|transfer|pay refund|change balance/.test(text))
    return {
      role: "assistant",
      content:
        "I can calculate, explain, flag and prepare a recommendation, but I cannot change balances or execute financial transactions. An authenticated finance officer must approve any financial change. This demo is read-only and cannot move money.",
    };
  if (/overdue|older|90 day/.test(text))
    return {
      role: "assistant",
      content:
        "84 students have dues older than 90 days, totaling ₹74 lakh in the institutional demo summary. Two representative records are available below:\n\nRohan Mehta · 251FA04E21 · ₹45,000 · 96 days\nAarav Desai · 251FA04E42 · ₹55,000 · 105 days\n\nRecommended next step: review these accounts and prepare a collection follow-up. No notices have been sent.",
    };
  if (/reconcil|mismatch/.test(text))
    return {
      role: "assistant",
      content:
        "Today’s demo reconciliation summary:\n\n1,284 payments reconciled\n127 transactions pending\n23 mismatches require review\n\nTXN-10483: gateway ₹25,000 vs. ledger ₹20,000. A ₹5,000 difference needs investigation. Check the settlement reference before proposing a correction. I have not modified the ledger.",
      kind: "reconcile",
    };
  if (/hostel/.test(text))
    return {
      role: "assistant",
      content:
        "Hostel collections total ₹4.20 Cr in the demo summary. Akshat Raj (251FA04E03) has ₹10,000 outstanding against a ₹40,000 hostel fee. His remaining dues are tuition ₹15,000 and examination ₹3,000. No payment mismatch was detected.",
      kind: "student",
    };
  if (/refund|withdraw/.test(text))
    return {
      role: "assistant",
      content:
        "Refund RF-2081 · Ananya Sharma · 251FA04E17\n\nEligible deposit: ₹20,000\nPolicy deduction: ₹1,500\nCalculated refundable amount: ₹18,500\n\nPolicy: withdrawal before semester start. This is a recommendation only. An authenticated finance officer must verify eligibility and authorize any payout.",
      kind: "refund",
    };
  if (/statement|251fa04e03|akshat|outstanding/.test(text))
    return { ...initialMessages[1] };
  if (/collect|demand|summary|fees/.test(text))
    return {
      role: "assistant",
      content:
        "Your institutional demo snapshot:\n\nTotal fee demand: ₹25.40 Cr\nCollected: ₹21.70 Cr (85.4%)\nOutstanding: ₹3.70 Cr\nReconciliation: 97.8%\n\nThe priority is reviewing 23 mismatches and following up on ₹74 lakh in dues older than 90 days.",
    };
  return {
    role: "assistant",
    content:
      "This demo assistant answers from a curated fictional finance dataset, not a live AI model. Try asking about overdue students, today’s reconciliation, hostel dues, refund RF-2081, or student 251FA04E03. I won’t invent records outside this dataset.",
  };
}

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

export function FinanceAssistant({
  onStudent,
  onRefund,
  onReconcile,
}: {
  onStudent: () => void;
  onRefund: () => void;
  onReconcile: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [listening, setListening] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognition = useRef<Recognition | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      recognition.current?.stop();
    },
    [],
  );
  function submit(question = input) {
    if (!question.trim() || busy) return;
    setMessages((previous) => [
      ...previous,
      { role: "user", content: question.trim() },
    ]);
    setInput("");
    setBusy(true);
    timer.current = setTimeout(() => {
      setMessages((previous) => [...previous, answerFor(question)]);
      setBusy(false);
    }, 750);
  }
  function startVoice() {
    if (listening) {
      recognition.current?.stop();
      return;
    }
    const browser = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Speech = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Speech) {
      toast.info(
        "Voice input is not supported in this browser. Please type your question.",
      );
      return;
    }
    const speech = new Speech();
    speech.lang = "en-IN";
    speech.continuous = false;
    speech.interimResults = false;
    speech.onresult = (event) => {
      setInput(event.results[0][0].transcript);
      setListening(false);
    };
    speech.onerror = () => {
      setListening(false);
      toast.info("Microphone unavailable. You can still type your question.");
    };
    speech.onend = () => setListening(false);
    recognition.current = speech;
    try {
      speech.start();
      setListening(true);
    } catch {
      setListening(false);
      toast.info("Voice input could not start. Please type your question.");
    }
  }
  function statement() {
    const student = students[0];
    downloadCsv("Akshat-Raj-fee-statement-DEMO.csv", [
      ["DEMO — current academic year 2026–27"],
      ["Student", "Student ID", "Final demand", "Paid", "Outstanding"],
      [
        student.name,
        student.id,
        student.demand,
        student.paid,
        student.demand - student.paid,
      ],
    ]);
    toast.success("Demo fee statement downloaded");
  }
  return (
    <Card
      id="finance-assistant"
      className={cn(
        "panel finance-assistant flex flex-col",
        expanded ? "min-h-[760px]" : "h-full min-h-[580px]",
      )}
    >
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2.5">
            <span className="assistant-mark">
              <Sparkles className="size-5" />
            </span>
            <span>
              Finance Assistant
              <span className="mt-1 flex items-center gap-1.5 text-sm font-normal text-success">
                <span className="online-dot" /> Here to help
              </span>
            </span>
          </span>
        </CardTitle>
        <CardAction>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Reset conversation"
              onClick={() => {
                if (timer.current) clearTimeout(timer.current);
                setMessages(initialMessages);
                setBusy(false);
                toast.info("Conversation reset");
              }}
            >
              <RotateCcw />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={expanded ? "Collapse assistant" : "Expand assistant"}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <X /> : <Maximize2 />}
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <div className="-mt-2 border-b border-primary/8 px-[22px] pb-4 text-sm text-muted-foreground">
        Ask anything about fees, payments and reconciliation.
      </div>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <div
          className={cn("min-h-0 flex-1", expanded ? "h-[530px]" : "h-[368px]")}
        >
          <MessageScrollerProvider>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent className="gap-5 pr-1 pb-3">
                  {messages.map((message, index) => (
                    <MessageScrollerItem key={index}>
                      <Message
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <MessageContent>
                          {message.role === "user" ? (
                            <>
                              <span className="self-end text-sm text-muted-foreground">
                                You
                              </span>
                              <Bubble
                                variant="secondary"
                                className="max-w-[94%]"
                              >
                                <BubbleContent>{message.content}</BubbleContent>
                              </Bubble>
                            </>
                          ) : (
                            <>
                              <span className="flex items-center gap-1.5 text-sm font-medium">
                                <Sparkles className="size-3.5 text-primary" />{" "}
                                Finance Agent{" "}
                                <span className="font-normal text-muted-foreground">
                                  · Demo
                                </span>
                              </span>
                              <Bubble variant="ghost" className="w-full">
                                <BubbleContent>
                                  <p className="whitespace-pre-line leading-relaxed">
                                    {message.content}
                                  </p>
                                  {message.kind === "breakdown" && (
                                    <div className="mt-3 flex flex-col gap-2.5">
                                      <div className="rounded-lg border border-border bg-card p-3">
                                        <div className="flex items-center justify-between text-sm">
                                          <span className="text-muted-foreground">
                                            Payments recorded
                                          </span>
                                          <span className="font-medium">
                                            ₹1,16,100
                                          </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-sm">
                                          <span className="text-muted-foreground">
                                            Outstanding
                                          </span>
                                          <span className="font-semibold text-warning">
                                            ₹28,000
                                          </span>
                                        </div>
                                        <div className="mt-3 flex flex-col gap-2 border-t pt-3">
                                          {[
                                            ["Tuition", "₹15,000"],
                                            ["Hostel", "₹10,000"],
                                            ["Examination", "₹3,000"],
                                          ].map(([name, value]) => (
                                            <div
                                              key={name}
                                              className="flex items-center justify-between text-sm"
                                            >
                                              <span className="text-muted-foreground">
                                                {name}
                                              </span>
                                              <span>{value}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      <p className="flex items-center gap-1.5 text-sm text-success">
                                        <ShieldCheck className="size-4" /> No
                                        payment mismatch detected.
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        Normal collection follow-up is
                                        recommended.
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        Cumulative totals include ₹24,100 of
                                        settled prior-cycle fees. Current cycle:
                                        ₹1,20,000 demand, ₹92,000 paid.
                                      </p>
                                    </div>
                                  )}
                                  {(message.kind === "breakdown" ||
                                    message.kind === "student") && (
                                    <button
                                      onClick={onStudent}
                                      className="mt-3 flex items-center gap-1 text-sm font-medium text-primary"
                                    >
                                      View student account{" "}
                                      <ArrowUpRight className="size-3.5" />
                                    </button>
                                  )}
                                  {message.kind === "reconcile" && (
                                    <Button
                                      variant="link"
                                      onClick={onReconcile}
                                    >
                                      Review mismatch <ArrowUpRight />
                                    </Button>
                                  )}
                                  {message.kind === "refund" && (
                                    <Button variant="link" onClick={onRefund}>
                                      Review refund calculation <ArrowUpRight />
                                    </Button>
                                  )}
                                </BubbleContent>
                              </Bubble>
                              <div className="flex items-center gap-1">
                                <Button
                                  aria-label="Copy assistant response"
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={async () => {
                                    try {
                                      await navigator.clipboard.writeText(
                                        message.kind === "breakdown"
                                          ? message.content +
                                              "\nPayments recorded: ₹1,16,100\nOutstanding: ₹28,000\nTuition ₹15,000; Hostel ₹10,000; Examination ₹3,000.\nIncludes ₹24,100 settled prior-cycle fees."
                                          : message.content,
                                      );
                                      toast.success("Response copied");
                                    } catch {
                                      toast.error(
                                        "Clipboard unavailable in this browser",
                                      );
                                    }
                                  }}
                                >
                                  <Copy />
                                </Button>
                                <Button
                                  aria-label="Mark response helpful"
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() =>
                                    toast.success(
                                      "Feedback noted for this demo session",
                                    )
                                  }
                                >
                                  <ThumbsUp />
                                </Button>
                                <span className="ml-1 text-sm text-muted-foreground">
                                  Based on demo finance records
                                </span>
                              </div>
                            </>
                          )}
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                  {busy && (
                    <MessageScrollerItem>
                      <div
                        role="status"
                        className="flex items-center gap-2 text-sm text-primary"
                      >
                        <LoaderCircle className="size-4 animate-spin" />{" "}
                        Reviewing finance records…
                      </div>
                    </MessageScrollerItem>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>
            </MessageScroller>
          </MessageScrollerProvider>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action}
              disabled={busy}
              onClick={() =>
                action === "Generate fee statement"
                  ? statement()
                  : submit(action)
              }
              className="rounded-md border border-primary/12 bg-card px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-50"
            >
              {action}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <InputGroup className="h-12">
            <InputGroupInput
              id="agent-input"
              aria-label="Ask the Finance Agent"
              placeholder="Ask the Finance Agent..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing || event.keyCode === 229)
                  return;
                if (event.key === "Enter") {
                  event.preventDefault();
                  submit();
                }
              }}
            />
            <InputGroupAddon align="inline-start">
              <Sparkles className="text-primary" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label={listening ? "Stop microphone" : "Use microphone"}
                onClick={startVoice}
                variant={listening ? "secondary" : "ghost"}
                size="icon-sm"
              >
                <Mic />
              </InputGroupButton>
              <InputGroupButton
                aria-label="Send message"
                variant="default"
                size="icon-sm"
                disabled={!input.trim() || busy}
                onClick={() => submit()}
              >
                <ArrowUp />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
          <ShieldCheck className="size-3.5 shrink-0" /> AI recommends. You stay
          in control.
        </p>
      </CardContent>
    </Card>
  );
}
