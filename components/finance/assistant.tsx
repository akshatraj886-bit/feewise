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



  X,



  Minus,



  MessageCircleQuestion,



  Volume2,
  Calendar,
  Download,
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



import { inr, students } from "@/lib/finance-data";



import { queryFinanceAi, type AiChatMessage, type NavigationAction, type AgentContext } from "@/lib/ai-finance-engine";



import { useLiveFinance } from "@/context/live-finance-context";







export type ChatMessage = AiChatMessage;







// Admin / Finance Officer prompts (full institutional context)



export const quickPrompts = [



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







// Student Portal prompts — only personal, relevant queries for the logged-in student



export const studentQuickPrompts = [



  {



    icon: GraduationCap,



    label: "Mera Fee Balance",



    query: "Mera total fee kitna baki hai aur kya-kya bacha hai?",



    desc: "Current outstanding dues, what's paid, and what remains",



  },



  {



    icon: Receipt,



    label: "Payment History",



    query: "Mere saare payments dikhao with dates and amounts",



    desc: "All fee payments made so far this academic year",



  },



  {



    icon: Calendar,



    label: "Instalment Schedule",



    query: "Meri upcoming instalments kab-kab hain aur kitna dena hai?",



    desc: "Next due dates, amounts, and remaining instalments",



  },



  {



    icon: CheckCircle2,



    label: "Exam Eligibility",



    query: "Kya main exam de sakta hoon? Mera admit card ban sakta hai?",



    desc: "Check attendance, dues clearance, and exam entry status",



  },



  {



    icon: FileText,



    label: "Dues Breakdown",



    query: "Mere dues kyun hai? Fee head wise breakdown bao",



    desc: "Which fee heads are pending and why",



  },



  {



    icon: Download,



    label: "Fee Receipt",



    query: "Mera latest payment receipt kaise download karun?",



    desc: "Official receipt for your last payment",



  },



];







type SpeechResultEvent = {



  results: { [key: number]: { [key: number]: { transcript: string } } };



};



type SpeechErrorEvent = { error?: string };



type Recognition = {



  lang: string;



  continuous: boolean;



  interimResults: boolean;



  onresult: ((event: SpeechResultEvent) => void) | null;



  onerror: ((event: SpeechErrorEvent) => void) | null;



  onend: (() => void) | null;



  start: () => void;



  stop: () => void;



};







// =========================================================================



// 1. FLOATING CORNER POPUP AI ASSISTANT (Lower Corner Widget)



// =========================================================================



export function FloatingAiAssistant({



  isOpen: externalIsOpen,



  onOpenChange,



  onStudent,



  onRefund,



  onReconcile,



  onExpandToPage,



  onNavigate,



  userRole = "admin",



  currentStudentId,



  currentView,



  initialQuery,



}: {



  isOpen?: boolean;



  onOpenChange?: (open: boolean) => void;



  onStudent?: (studentId?: string) => void;



  onRefund?: () => void;



  onReconcile?: () => void;



  onExpandToPage?: (query?: string) => void;



  onNavigate?: (nav: NavigationAction) => void;



  userRole?: "admin" | "finance-officer" | "student";



  currentStudentId?: string;



  currentView?: string;



  initialQuery?: string | null;



}) {



  const [internalIsOpen, setInternalIsOpen] = useState(false);



  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;







  function setIsOpen(open: boolean) {



    if (onOpenChange) {



      onOpenChange(open);



    } else {



      setInternalIsOpen(open);



    }



  }







  const [messages, setMessages] = useState<ChatMessage[]>([]);



  const [input, setInput] = useState("");



  const liveFinance = useLiveFinance();



  const liveStudents = liveFinance?.students;



  const liveTransactions = liveFinance?.transactions;



  const [busy, setBusy] = useState(false);



  const [actionStatus, setActionStatus] = useState<string | null>(null);



  const [listening, setListening] = useState(false);



  const [apiKey, setApiKey] = useState("");



  const [showSettings, setShowSettings] = useState(false);



  const [showTeaser, setShowTeaser] = useState(true);



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



    if (isOpen) {



      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });



    }



  }, [messages, busy, isOpen]);







  // Handle incoming initial prompt



  useEffect(() => {



    if (initialQuery && initialQuery.trim()) {



      setIsOpen(true);



      setShowTeaser(false);



      submit(initialQuery.trim());



    }



  }, [initialQuery]);







  async function submit(question = input) {



    const q = question.trim();



    if (!q || busy) return;







    setMessages((prev) => [...prev, { role: "user", content: q }]);



    setInput("");



    setBusy(true);







    try {



      const context: AgentContext = {



        role: userRole,



        currentStudentId,



        currentView,



        liveStudents,



        liveTransactions,



      };



      const aiResponse = await queryFinanceAi(q, messages, apiKey, context);



      setMessages((prev) => [...prev, aiResponse]);







      // Execute autonomous UI navigation if commanded



      if (aiResponse.navigation) {



        const target = aiResponse.navigation.view;



        const sub = aiResponse.navigation.studentId



          ? ` (${aiResponse.navigation.studentId})`



          : aiResponse.navigation.transactionId



          ? ` (${aiResponse.navigation.transactionId})`



          : "";



        setActionStatus(`Opening ${target}${sub}…`);



        toast.info(`🚀 Navigating to ${target}${sub}…`);







        if (onNavigate) {



          onNavigate(aiResponse.navigation);



        } else if (onStudent && aiResponse.navigation.studentId) {



          onStudent(aiResponse.navigation.studentId);



        }







        setTimeout(() => {



          setActionStatus(`Done — ${target} opened.`);



          setTimeout(() => setActionStatus(null), 3500);



        }, 600);



      }



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



      toast.error("Voice input is not supported in this browser. Please use Chrome or Edge.");



      return;



    }



    const speech = new Speech();



    // hi-IN handles Hindi + Hinglish queries better than en-IN



    speech.lang = "hi-IN";



    speech.continuous = false;



    speech.interimResults = false;



    speech.onresult = (event) => {



      const transcript = event.results[0][0].transcript;



      setListening(false);



      // Auto-submit: no need to manually click send after speaking



      if (transcript.trim()) {



        setInput(transcript);



        submit(transcript);



      }



    };



    speech.onerror = (event: unknown) => {



      setListening(false);



      const err = (event as { error?: string })?.error;



      if (err === "not-allowed" || err === "permission-denied") {



        toast.error("Microphone access denied. Please allow mic permission in browser settings.");



      } else if (err === "no-speech") {



        toast.info("No speech detected. Please try again.");



      } else {



        toast.error("Voice recognition error. Please try again.");



      }



    };



    speech.onend = () => setListening(false);



    try {



      speech.start();



      setListening(true);



      toast.info("🎤 Listening… bolo apna sawaal (Hindi/English)", { duration: 3000 });



    } catch {



      setListening(false);



      toast.error("Could not start microphone. Please check browser permissions.");



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



        toast.info("API key removed. Using built-in offline finance reasoning engine.");



      }



    } catch {



      // Ignore localStorage errors



    }



    setShowSettings(false);



  }







  return (



    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">



      {/* ------------------------------------------------------------- */}



      {/* 1. EXPANDED RECTANGULAR CHAT WINDOW (Open State)              */}



      {/* ------------------------------------------------------------- */}



      {isOpen && (



        <div



          id="floating-ai-window"



          className="w-[calc(100vw-32px)] sm:w-[440px] md:w-[480px] h-[600px] max-h-[85vh] rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-6 duration-200 ring-1 ring-primary/20 text-card-foreground"



        >



          {/* Header Bar */}



          <div className="px-4 py-3.5 border-b bg-gradient-to-r from-primary/15 via-primary/5 to-card flex items-center justify-between gap-2 select-none">



            <div className="flex items-center gap-2.5">



              <div className="relative">



                <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md ring-2 ring-primary/30">



                  <Bot className="size-5" />



                </span>



                <span className="absolute -top-0.5 -right-0.5 size-3 bg-emerald-500 rounded-full border-2 border-card animate-pulse" />



              </div>



              <div>



                <div className="flex items-center gap-1.5">



                  <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-1">



                    finDeck AI Copilot



                  </h3>



                  <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-primary/10 text-primary border border-primary/20">



                    VFSTR AI



                  </span>



                </div>



                <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">



                  <span className="size-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />



                  Online • Financial Intelligence



                </p>



              </div>



            </div>







            {/* Header Action Buttons */}



            <div className="flex items-center gap-1">



              <Button



                variant="ghost"



                size="icon-xs"



                onClick={() => setShowSettings(!showSettings)}



                className={`size-7 text-muted-foreground hover:text-foreground cursor-pointer ${



                  apiKey ? "text-primary font-bold" : ""



                }`}



                title="AI Settings / API Key"



              >



                <Key className="size-3.5" />



              </Button>







              <Button



                variant="ghost"



                size="icon-xs"



                onClick={() => {



                  setMessages([]);



                  toast.info("Conversation cleared.");



                }}



                className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"



                title="Clear Chat"



              >



                <RotateCcw className="size-3.5" />



              </Button>







              {onExpandToPage && (



                <Button



                  variant="ghost"



                  size="icon-xs"



                  onClick={() => {



                    setIsOpen(false);



                    onExpandToPage();



                  }}



                  className="size-7 text-muted-foreground hover:text-primary cursor-pointer"



                  title="Expand to Full Page Workspace"



                >



                  <Maximize2 className="size-3.5" />



                </Button>



              )}







              {/* Close / Minimize Button */}



              <Button



                variant="ghost"



                size="icon-xs"



                onClick={() => setIsOpen(false)}



                className="size-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer rounded-lg"



                title="Close / Minimize Assistant"



              >



                <X className="size-4" />



              </Button>



            </div>



          </div>







          {/* Optional API Key Settings Overlay */}



          {showSettings && (



            <div className="p-3 bg-muted/60 border-b text-xs space-y-2 animate-in fade-in-0">



              <div className="flex items-center justify-between">



                <span className="font-semibold text-foreground flex items-center gap-1.5">



                  <Key className="size-3.5 text-primary" /> Google Gemini API Key



                </span>



                <span className="text-[10px] text-muted-foreground">Optional</span>



              </div>



              <p className="text-[11px] text-muted-foreground">



                Enter API key for live Gemini LLM queries, or leave blank to use the high-speed local VFSTR Finance reasoning engine.



              </p>



              <div className="flex items-center gap-2 pt-1">



                <input



                  type="password"



                  placeholder="Paste AIzaSy... key"



                  defaultValue={apiKey}



                  id="floating-api-key-input"



                  className="flex-1 h-8 px-2.5 text-xs rounded-lg border bg-background text-foreground"



                />



                <Button



                  size="sm"



                  onClick={() => {



                    const val =



                      (document.getElementById("floating-api-key-input") as HTMLInputElement)



                        ?.value || "";



                    saveApiKey(val);



                  }}



                  className="h-8 text-xs cursor-pointer"



                >



                  Save



                </Button>



              </div>



            </div>



          )}







          {/* Messages Scroll Area */}



          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scroll-smooth scrollbar-thin bg-card/50">



            {/* Empty State with Quick Starter Prompts */}



            {messages.length === 0 && (



              <div className="h-full flex flex-col items-center justify-center text-center p-2 space-y-4">



                <div className="size-12 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent flex items-center justify-center text-primary shadow-xs ring-1 ring-primary/20">



                  <Sparkles className="size-6" />



                </div>



                <div className="space-y-1 max-w-xs">



                  <h4 className="text-sm font-bold text-foreground">



                    Ask VFSTR Finance Copilot



                  </h4>



                  <p className="text-xs text-muted-foreground leading-relaxed">



                    Ask anything in <strong>English, Hindi or Hinglish</strong> about student fees, dues, loan NOCs, 80C tax certificates, and refund policies.



                  </p>



                </div>







                {/* Quick 1-Tap Question Chips */}



                <div className="flex flex-col gap-1.5 w-full text-left pt-1">



                  <p className="text-[11px] font-semibold text-muted-foreground px-1">



                    Suggested Inquiries:



                  </p>



                  {(userRole === "student" ? studentQuickPrompts : quickPrompts).slice(0, 4).map((p) => (



                    <button



                      key={p.label}



                      onClick={() => submit(p.query)}



                      className="p-2 rounded-xl border bg-card/80 hover:bg-primary/10 hover:border-primary/40 transition-all text-xs flex items-center justify-between group cursor-pointer shadow-2xs"



                    >



                      <span className="flex items-center gap-2 truncate">



                        <p.icon className="size-3.5 text-primary shrink-0" />



                        <span className="font-medium text-foreground truncate">{p.label}</span>



                      </span>



                      <ChevronRight className="size-3 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 shrink-0" />



                    </button>



                  ))}



                </div>



              </div>



            )}







            {/* Render Chat Messages */}



            {messages.map((message, index) => (



              <div



                key={index}



                className={`flex flex-col ${



                  message.role === "user" ? "items-end" : "items-start"



                }`}



              >



                <div className="flex items-center gap-1.5 mb-1 text-[11px] text-muted-foreground">



                  {message.role === "user" ? (



                    <span className="font-medium text-foreground">You</span>



                  ) : (



                    <span className="flex items-center gap-1 font-semibold text-primary">



                      <Sparkles className="size-3" /> finDeck Agent



                    </span>



                  )}



                </div>







                <div



                  className={`rounded-2xl p-3.5 text-xs leading-relaxed max-w-[90%] shadow-xs ${



                    message.role === "user"



                      ? "bg-primary text-primary-foreground font-medium rounded-tr-xs"



                      : "bg-card text-foreground border border-border/80 rounded-tl-xs shadow-xs"



                  }`}



                >



                  <p className="whitespace-pre-line leading-relaxed">{message.content}</p>







                  {/* Navigation Action Result Badge */}



                  {message.navigation && (



                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg w-fit">



                      <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />



                      <span>



                        Navigated to <strong>{message.navigation.view}</strong>



                        {message.navigation.studentId ? ` · ID: ${message.navigation.studentId}` : ""}



                        {message.navigation.transactionId ? ` · Txn: ${message.navigation.transactionId}` : ""}



                      </span>



                    </div>



                  )}







                  {/* Actions Bar for assistant responses */}



                  {message.role === "assistant" && (



                    <div className="mt-2.5 pt-2 border-t border-border/50 flex flex-wrap items-center gap-1.5">



                      {(message.kind === "breakdown" || message.kind === "student") &&



                        onStudent && (



                          <Button



                            size="sm"



                            variant="outline"



                            onClick={() => onStudent(message.navigation?.studentId)}



                            className="h-6 text-[11px] px-2 gap-1 text-primary cursor-pointer hover:bg-primary/10"



                          >



                            View Student <ArrowUpRight className="size-3" />



                          </Button>



                        )}



                      {message.kind === "reconcile" && onReconcile && (



                        <Button



                          size="sm"



                          variant="outline"



                          onClick={onReconcile}



                          className="h-6 text-[11px] px-2 gap-1 text-primary cursor-pointer hover:bg-primary/10"



                        >



                          Review Mismatch <ArrowUpRight className="size-3" />



                        </Button>



                      )}



                      {message.kind === "refund" && onRefund && (



                        <Button



                          size="sm"



                          variant="outline"



                          onClick={onRefund}



                          className="h-6 text-[11px] px-2 gap-1 text-primary cursor-pointer hover:bg-primary/10"



                        >



                          Review Refund <ArrowUpRight className="size-3" />



                        </Button>



                      )}



                      <Button



                        size="icon-xs"



                        variant="ghost"



                        onClick={() => {



                          navigator.clipboard.writeText(message.content);



                          toast.success("Copied to clipboard");



                        }}



                        title="Copy text"



                        className="size-6 text-muted-foreground hover:text-foreground cursor-pointer ml-auto"



                      >



                        <Copy className="size-3" />



                      </Button>



                    </div>



                  )}



                </div>



              </div>



            ))}







            {busy && (



              <div className="flex items-center gap-2 text-xs text-primary font-medium p-2.5 bg-primary/10 rounded-xl border border-primary/20 w-fit animate-pulse">



                <LoaderCircle className="size-3.5 animate-spin" />



                Thinking &amp; analyzing records…



              </div>



            )}



            <div ref={messagesEndRef} />



          </div>







          {/* Bottom Chat Input Bar */}



          <div className="p-3 border-t bg-card/90">



            {actionStatus && (



              <div className="mb-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium flex items-center gap-1.5 animate-in fade-in">



                <span className="size-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />



                {actionStatus}



              </div>



            )}



            <InputGroup className="h-10">



              <InputGroupInput



                placeholder="Ask finance, dues, loans, 80C, refund..."



                value={input}



                onChange={(e) => setInput(e.target.value)}



                onKeyDown={(e) => {



                  if (e.key === "Enter") {



                    e.preventDefault();



                    submit();



                  }



                }}



                className="text-xs"



                autoFocus



              />



              <InputGroupAddon align="inline-end">



                <InputGroupButton



                  aria-label="Voice input"



                  onClick={startVoice}



                  variant={listening ? "secondary" : "ghost"}



                  size="icon-xs"



                  className="cursor-pointer"



                  title="Voice input (English / Hindi)"



                >



                  <Mic className={`size-3.5 ${listening ? "text-destructive animate-pulse" : ""}`} />



                </InputGroupButton>



                <InputGroupButton



                  aria-label="Send prompt"



                  variant="default"



                  size="icon-xs"



                  disabled={!input.trim() || busy}



                  onClick={() => submit()}



                  className="cursor-pointer"



                >



                  <ArrowUp className="size-3.5" />



                </InputGroupButton>



              </InputGroupAddon>



            </InputGroup>



            <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1 pt-1.5">



              <span className="flex items-center gap-1">



                <ShieldCheck className="size-3 text-emerald-500" /> Secure University Engine



              </span>



              <span>English • हिन्दी • Hinglish</span>



            </div>



          </div>



        </div>



      )}







      {/* ------------------------------------------------------------- */}



      {/* 2. COLLAPSED FLOATING CORNER TRIGGER (Always Eye-Catching)   */}



      {/* ------------------------------------------------------------- */}



      {!isOpen && (



        <div className="flex flex-col items-end gap-2.5">



          {/* Welcome Teaser Bubble (auto displayed or dismissible) */}



          {showTeaser && (



            <div className="flex items-center gap-2 bg-card/95 backdrop-blur-md text-foreground border border-primary/30 shadow-xl px-3.5 py-2 rounded-2xl text-xs animate-in fade-in slide-in-from-bottom-2 duration-300 ring-1 ring-primary/20 max-w-[260px]">



              <span className="size-2 rounded-full bg-emerald-500 animate-ping shrink-0" />



              <p className="text-[11px] leading-snug">



                👋 <strong>Ask AI Assistant</strong> about fee dues, loans &amp; refunds!



              </p>



              <button



                onClick={(e) => {



                  e.stopPropagation();



                  setShowTeaser(false);



                }}



                className="text-muted-foreground hover:text-foreground cursor-pointer p-0.5"



                title="Dismiss"



              >



                <X className="size-3" />



              </button>



            </div>



          )}







          {/* Main Floating Trigger Button */}



          <button



            id="floating-ai-trigger"



            onClick={() => {



              setIsOpen(true);



              setShowTeaser(false);



            }}



            className="group relative flex items-center gap-3 pl-3.5 pr-4 py-2.5 rounded-full bg-gradient-to-r from-primary via-indigo-600 to-violet-600 text-primary-foreground shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-primary/25 ai-glow-button select-none"



            aria-label="Open AI Financial Assistant"



          >



            {/* Glowing Bot Avatar */}



            <div className="relative flex items-center justify-center size-8 rounded-full bg-white/20 backdrop-blur-xs text-white">



              <Bot className="size-5 group-hover:rotate-12 transition-transform duration-300" />



              {/* Green online dot */}



              <span className="absolute -top-0.5 -right-0.5 size-2.5 bg-emerald-400 rounded-full border-2 border-primary" />



            </div>







            {/* Label and Sparkles */}



            <div className="flex flex-col text-left">



              <span className="text-xs font-bold tracking-tight flex items-center gap-1.5 leading-none">



                Ask finDeck AI



                <Sparkles className="size-3 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />



              </span>



              <span className="text-[10px] text-white/80 font-normal leading-tight mt-0.5">



                Financial Intelligence



              </span>



            </div>



          </button>



        </div>



      )}



    </div>



  );



}







// =========================================================================



// 3. DASHBOARD OVERVIEW CHAMBER (Sidebar Launchpad)



// =========================================================================



// Embeds seamlessly in the dashboard overview sidebar and connects directly



// to the floating popup or full page workspace!



export function FinanceAssistant({



  onStudent,



  onRefund,



  onReconcile,



  onExpandToPage,



  onOpenFloating,



}: {



  onStudent: () => void;



  onRefund: () => void;



  onReconcile: () => void;



  onExpandToPage?: (initialQuery?: string) => void;



  onOpenFloating?: (query?: string) => void;



}) {



  const [input, setInput] = useState("");







  function handleAsk(query = input) {



    const q = query.trim();



    if (!q) return;



    if (onOpenFloating) {



      onOpenFloating(q);



    } else if (onExpandToPage) {



      onExpandToPage(q);



    }



  }







  return (



    <Card



      id="finance-assistant"



      className="panel finance-assistant flex flex-col shadow-sm overflow-hidden border-primary/25 bg-gradient-to-b from-primary/10 via-card to-card relative group"



    >



      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />







      <CardHeader className="pb-3 border-b">



        <CardTitle className="flex items-center justify-between">



          <span className="flex items-center gap-2.5">



            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-xs">



              <Bot className="size-4" />



            </span>



            <span>



              <span className="text-sm font-bold text-foreground">finDeck AI Assistant</span>



              <span className="mt-0.5 flex items-center gap-1.5 text-[11px] font-normal text-emerald-500">



                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />



                Online • VFSTR Copilot



              </span>



            </span>



          </span>







          <div className="flex items-center gap-1.5">



            {onOpenFloating && (



              <Button



                variant="outline"



                size="sm"



                onClick={() => onOpenFloating()}



                className="gap-1 text-xs h-7 text-primary hover:bg-primary/10 cursor-pointer border-primary/30"



                title="Open floating AI popup"



              >



                <Sparkles className="size-3" /> Popup



              </Button>



            )}



            {onExpandToPage && (



              <Button



                variant="ghost"



                size="sm"



                onClick={() => onExpandToPage()}



                className="gap-1 text-xs h-7 text-muted-foreground hover:text-foreground cursor-pointer"



                title="Open Dedicated Full Page"



              >



                <Maximize2 className="size-3" />



              </Button>



            )}



          </div>



        </CardTitle>



        <CardDescription className="text-xs text-muted-foreground mt-1">



          Instant natural language answers for student dues, fee waterfalls, 80C certificates, and loan NOCs.



        </CardDescription>



      </CardHeader>







      <CardContent className="flex flex-col gap-3.5 p-4">



        {/* Quick Suggestion Chips */}



        <div className="space-y-1.5">



          <p className="text-[11px] font-semibold text-muted-foreground">



            Popular Finance Inquiries:



          </p>



          <div className="flex flex-col gap-1.5">



            {quickPrompts.slice(0, 4).map((p) => (



              <button



                key={p.label}



                onClick={() => handleAsk(p.query)}



                className="w-full text-left px-2.5 py-2 rounded-lg border bg-card/80 hover:bg-primary/10 hover:border-primary/40 text-xs text-foreground flex items-center justify-between group transition-all cursor-pointer"



              >



                <span className="flex items-center gap-2 truncate">



                  <p.icon className="size-3.5 text-primary shrink-0" />



                  <span className="truncate">{p.label}</span>



                </span>



                <ChevronRight className="size-3 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 shrink-0" />



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



              placeholder="Ask anything about fees, dues, loans, refund..."



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







        {/* Action Button */}



        <Button



          variant="secondary"



          size="sm"



          onClick={() => {



            if (onOpenFloating) onOpenFloating();



            else if (onExpandToPage) onExpandToPage();



          }}



          className="w-full text-xs font-semibold text-primary gap-1.5 h-8 border border-primary/20 hover:bg-primary/10 cursor-pointer"



        >



          <Sparkles className="size-3.5" /> Open AI Assistant



        </Button>



      </CardContent>



    </Card>



  );



}







// =========================================================================



// 4. DEDICATED FULL-PAGE AI ASSISTANT (Fresh Slate + Universal Finance)



// =========================================================================



export function FullPageAiAssistant({



  onStudent,



  onRefund,



  onReconcile,



  onNavigate,



  userRole = "admin",



  currentStudentId,



  currentView,



  initialPrompt,



  onClearInitialPrompt,



}: {



  onStudent: (studentId?: string) => void;



  onRefund: () => void;



  onReconcile: () => void;



  onNavigate?: (nav: NavigationAction) => void;



  userRole?: "admin" | "finance-officer" | "student";



  currentStudentId?: string;



  currentView?: string;



  initialPrompt?: string | null;



  onClearInitialPrompt?: () => void;



}) {



  const [messages, setMessages] = useState<ChatMessage[]>([]);



  const [input, setInput] = useState("");



  const liveFinance = useLiveFinance();



  const liveStudents = liveFinance?.students;



  const liveTransactions = liveFinance?.transactions;



  const [busy, setBusy] = useState(false);



  const [actionStatus, setActionStatus] = useState<string | null>(null);



  const [listening, setListening] = useState(false);



  const [apiKey, setApiKey] = useState("");



  const [showSettings, setShowSettings] = useState(false);



  const messagesEndRef = useRef<HTMLDivElement | null>(null);







  useEffect(() => {



    try {



      const savedKey = localStorage.getItem("feewise_gemini_api_key");



      if (savedKey) setApiKey(savedKey);



    } catch {



      // Ignore



    }



  }, []);







  useEffect(() => {



    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });



  }, [messages, busy]);







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



      const context: AgentContext = {



        role: userRole,



        currentStudentId,



        currentView,



        liveStudents,



        liveTransactions,



      };



      const aiResponse = await queryFinanceAi(q, messages, apiKey, context);



      setMessages((prev) => [...prev, aiResponse]);







      // Execute autonomous navigation if commanded



      if (aiResponse.navigation) {



        const target = aiResponse.navigation.view;



        const sub = aiResponse.navigation.studentId



          ? ` (${aiResponse.navigation.studentId})`



          : aiResponse.navigation.transactionId



          ? ` (${aiResponse.navigation.transactionId})`



          : "";



        setActionStatus(`Opening ${target}${sub}…`);



        toast.info(`🚀 Navigating to ${target}${sub}…`);







        if (onNavigate) {



          onNavigate(aiResponse.navigation);



        } else if (onStudent && aiResponse.navigation.studentId) {



          onStudent(aiResponse.navigation.studentId);



        }







        setTimeout(() => {



          setActionStatus(`Done — ${target} opened.`);



          setTimeout(() => setActionStatus(null), 3500);



        }, 600);



      }



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



      toast.error("Voice input is not supported in this browser. Please use Chrome or Edge.");



      return;



    }



    const speech = new Speech();



    // hi-IN handles Hindi + Hinglish queries better than en-IN



    speech.lang = "hi-IN";



    speech.continuous = false;



    speech.interimResults = false;



    speech.onresult = (event) => {



      const transcript = event.results[0][0].transcript;



      setListening(false);



      // Auto-submit: voice query sent immediately without manual button press



      if (transcript.trim()) {



        setInput(transcript);



        submit(transcript);



      }



    };



    speech.onerror = (event: unknown) => {



      setListening(false);



      const err = (event as { error?: string })?.error;



      if (err === "not-allowed" || err === "permission-denied") {



        toast.error("Microphone access denied. Please allow mic permission in browser settings.");



      } else if (err === "no-speech") {



        toast.info("No speech detected. Please try again.");



      } else {



        toast.error("Voice recognition error. Please try again.");



      }



    };



    speech.onend = () => setListening(false);



    try {



      speech.start();



      setListening(true);



      toast.info("🎤 Listening… bolo apna sawaal (Hindi/English)", { duration: 3000 });



    } catch {



      setListening(false);



      toast.error("Could not start microphone. Please check browser permissions.");



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



      // Ignore



    }



    setShowSettings(false);



  }







  return (



    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">



      {/* Header Banner */}



      <div className="rounded-2xl border bg-gradient-to-r from-primary/15 via-primary/5 to-background p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">



        <div className="space-y-1">



          <div className="flex items-center gap-2.5">



            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-xs">



              <Bot className="size-5" />



            </span>



            <div>



              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">



                VFSTR AI Finance Intelligence Workspace



                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">



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







      {/* Cloud LLM API Settings Bar */}



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



                  const val =



                    (document.getElementById("api-key-input") as HTMLInputElement)?.value || "";



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







          {/* Messages Viewport */}



          <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth scrollbar-thin">



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







                  {/* Navigation Action Result Badge */}



                  {message.navigation && (



                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg w-fit">



                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />



                      <span>



                        Navigated to <strong>{message.navigation.view}</strong>



                        {message.navigation.studentId ? ` · Student ID: ${message.navigation.studentId}` : ""}



                        {message.navigation.transactionId ? ` · Txn Ref: ${message.navigation.transactionId}` : ""}



                      </span>



                    </div>



                  )}







                  {message.role === "assistant" && (



                    <div className="mt-3 pt-2.5 border-t border-border/50 flex flex-wrap items-center gap-2.5">



                      {(message.kind === "breakdown" || message.kind === "student") && (



                        <Button



                          size="sm"



                          variant="outline"



                          onClick={() => onStudent(message.navigation?.studentId)}



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



            {actionStatus && (



              <div className="mb-2.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2 animate-in fade-in">



                <span className="size-2 rounded-full bg-emerald-500 animate-ping shrink-0" />



                {actionStatus}



              </div>



            )}



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



