"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Building2,
  CalendarClock,
  CircleCheck,
  Coins,
  CreditCard,
  GraduationCap,
  Info,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Bell,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ageing as initialAgeing, feeHeads as initialFeeHeads, type View } from "@/lib/finance-data";
import { filteredCollections } from "@/lib/finance-service";
import { useLiveFinance } from "@/context/live-finance-context";
import { getSqlDatabaseState, type SqlDatabaseState } from "@/lib/sql-store";

export function Hero({ onAsk }: { onAsk: () => void }) {
  return (
    <section className="hero relative isolate flex min-h-64 overflow-hidden rounded-2xl border border-primary/10 md:min-h-72">
      <div className="relative z-10 flex w-full flex-col items-start justify-center px-6 py-7 sm:px-8 lg:w-[68%] lg:px-9">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
          <span className="flex size-6 items-center justify-center rounded-md bg-card/70">
            <Sparkles className="size-3.5" />
          </span>{" "}
          A smarter way to manage university finance
        </div>
        <h1 className="max-w-xl text-balance text-3xl font-semibold leading-[1.2] tracking-[-0.045em] sm:text-[36px]">
          Your intelligent fee &amp; finance{" "}
          <span className="text-primary">command center.</span>
        </h1>
        <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
          Analyze fee demand, reconcile payments and uncover insights.
          <br className="hidden sm:block" /> AI-powered intelligence.
          Human-approved decisions.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button onClick={onAsk} className="h-9 px-4">
            <Sparkles data-icon="inline-start" /> Ask Finance Agent{" "}
            <ArrowUpRight data-icon="inline-end" />
          </Button>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-3.5" /> Read-only financial intelligence
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <Image
          src="/images/finance-agent.png"
          alt="Friendly white and blue Finance Agent with a secure digital assistant interface"
          fill
          priority
          sizes="(min-width: 1024px) 550px, 1px"
          className="hero-art agent-float object-cover object-center"
        />
      </div>
      <div className="absolute bottom-5 right-6 hidden items-center gap-1.5 rounded-full border border-card/80 bg-card/75 px-3 py-1.5 text-sm text-primary lg:flex">
        <ShieldCheck className="size-3.5" /> Secure by design
      </div>
    </section>
  );
}

function Counter({
  value,
  decimals = 1,
}: {
  value: number;
  decimals?: number;
}) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1100, 1);
      setShown(value * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <span>{shown.toFixed(decimals)}</span>;
}

export function KpiCards({
  onNavigate,
}: {
  onNavigate: (
    view: "Payments" | "Reconciliation" | "Students" | "Fee Structure",
  ) => void;
}) {
  const { totalDemand, totalCollected, totalOutstanding, collectionRate, students, transactions } = useLiveFinance();

  const demandCr = totalDemand / 10000000;
  const collectedCr = totalCollected / 10000000;
  const outstandingCr = totalOutstanding / 10000000;

  const dynamicKpis = [
    {
      label: "Total fee demand",
      value: demandCr,
      icon: Wallet,
      trend: "+8.4%",
      note: `${students.length} students`,
      tone: "primary",
      unit: " Cr",
      bars: [12, 20, 18, 28, 23, 31, 36, 33, 43, 48],
      direction: ArrowUpRight,
    },
    {
      label: "Collected",
      value: collectedCr,
      icon: CreditCard,
      trend: `${collectionRate.toFixed(1)}%`,
      note: "collection rate",
      tone: "success",
      unit: " Cr",
      bars: [10, 15, 23, 18, 29, 25, 35, 32, 39, 47],
      direction: ArrowUpRight,
    },
    {
      label: "Outstanding",
      value: outstandingCr,
      icon: Coins,
      trend: `${(100 - collectionRate).toFixed(1)}%`,
      note: "due balance",
      tone: "warning",
      unit: " Cr",
      bars: [45, 40, 43, 33, 35, 29, 24, 29, 19, 16],
      direction: ArrowDownRight,
    },
    {
      label: "Reconciliation",
      value: 97.8,
      icon: RefreshCw,
      trend: `${transactions.filter((t) => t.status === "Mismatch").length || 1}`,
      note: "mismatch pending",
      tone: "violet",
      unit: "%",
      bars: [13, 18, 21, 27, 24, 33, 30, 39, 36, 46],
      direction: ArrowUpRight,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dynamicKpis.map((item, index) => (
        <button
          key={item.label}
          onClick={() =>
            onNavigate(
              (
                [
                  "Fee Structure",
                  "Payments",
                  "Students",
                  "Reconciliation",
                ] as const
              )[index],
            )
          }
          className="kpi enter relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left text-foreground cursor-pointer transition-all hover:border-primary/40 hover:shadow-md"
          style={{ animationDelay: `${index * 65}ms` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {item.label}
            </span>
            <span
              className="flex size-9 items-center justify-center rounded-lg"
              style={{
                color: `var(--${item.tone})`,
                background: `color-mix(in srgb, var(--${item.tone}) 9%, var(--card))`,
              }}
            >
              <item.icon className="size-[18px]" strokeWidth={1.7} />
            </span>
          </div>
          <div className="mt-2 text-[31px] font-semibold tracking-[-0.045em] tabular-nums">
            {index !== 3 && "₹"}
            <Counter value={item.value} decimals={index === 3 ? 1 : 2} />
            <span className="text-[25px]">{item.unit}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-sm">
            <span
              className="flex items-center gap-1 font-medium"
              style={{
                color: index === 3 ? "var(--warning)" : "var(--success)",
              }}
            >
              {index !== 3 && <item.direction className="size-3.5" />}
              {item.trend}
            </span>
            <span className="text-muted-foreground">{item.note}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export function FeeHeadOverview({
  onNavigate,
}: {
  onNavigate?: (view: View) => void;
}) {
  const { feeAllocations } = useLiveFinance();

  const dynamicHeads = useMemo(() => {
    const totals: Record<string, number> = {
      Tuition: 0,
      Hostel: 0,
      Examination: 0,
      Transport: 0,
      Laboratory: 0,
      Library: 0,
    };
    if (feeAllocations && Object.keys(feeAllocations).length > 0) {
      Object.values(feeAllocations).forEach((allocList) => {
        allocList.forEach((item) => {
          if (totals[item.head] !== undefined) {
            totals[item.head] += item.paid;
          }
        });
      });
    }

    const hasLive = Object.values(totals).some((v) => v > 0);
    if (!hasLive) {
      return initialFeeHeads;
    }

    return [
      { name: "Tuition", amount: totals.Tuition / 100000, color: "var(--primary)" },
      { name: "Hostel", amount: totals.Hostel / 100000, color: "var(--violet)" },
      { name: "Examination", amount: totals.Examination / 100000, color: "var(--chart-3)" },
      { name: "Transport", amount: totals.Transport / 100000, color: "var(--chart-4)" },
      { name: "Laboratory", amount: totals.Laboratory / 100000, color: "var(--chart-5)" },
      { name: "Library", amount: totals.Library / 100000, color: "var(--chart-2)" },
    ];
  }, [feeAllocations]);

  const maxAmount = Math.max(...dynamicHeads.map((h) => h.amount), 1);

  return (
    <Card className="panel h-full flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Fee Head Overview</CardTitle>
            <CardDescription>Live collection across fee categories</CardDescription>
          </div>
          {onNavigate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("Fee Structure")}
              className="text-xs text-primary gap-1 cursor-pointer h-7 px-2 hover:bg-primary/10"
            >
              See details <ArrowRight className="size-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-[15px]">
          {dynamicHeads.map((fee, index) => (
            <div key={fee.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-muted-foreground text-xs">{fee.name}</span>
                <span className="font-medium text-xs tabular-nums">
                  ₹{fee.amount.toFixed(1)} L
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="bar-grow h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (fee.amount / maxAmount) * 100)}%`,
                    background: fee.color,
                    animationDelay: `${index * 70}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Info className="size-3.5 text-primary" /> Across all 11 programmes
          </span>
          {onNavigate && (
            <button
              onClick={() => onNavigate("Fee Structure")}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              11 Programmes →
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function CollectionIntelligence() {
  const [year, setYear] = useState("2026–27");
  const [programme, setProgramme] = useState("All programmes");
  const [category, setCategory] = useState("All categories");
  const [head, setHead] = useState("All fee heads");
  const data = filteredCollections(year, programme, category, head);
  const actualData = data.filter((d) => !d.projected);
  const collected = actualData.reduce((sum, row) => sum + (row.collected ?? 0), 0);
  const demand = actualData.reduce((sum, row) => sum + (row.demand ?? 0), 0);
  const projectedDemand = data.filter((d) => d.projected).reduce((sum, row) => sum + (row.demand ?? 0), 0);

  return (
    <Card className="panel h-full">
      <CardHeader>
        <CardTitle>Collection Intelligence</CardTitle>
        <CardDescription>
          Apr–Sep actual · Oct–Mar projected
        </CardDescription>
        <CardAction>
          <TrendingUp className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <select
            className="filter-select"
            aria-label="Academic year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option>2026–27</option>
            <option>2025–26</option>
          </select>
          <select
            className="filter-select"
            aria-label="Programme"
            value={programme}
            onChange={(e) => setProgramme(e.target.value)}
          >
            <option>All programmes</option>
            <option>B.Tech CSE</option>
            <option>B.Tech ECE</option>
            <option>B.Tech EEE</option>
            <option>B.Tech Mechanical</option>
            <option>B.Tech Civil</option>
            <option>B.Tech IT</option>
            <option>MBA</option>
            <option>MCA</option>
            <option>BBA</option>
            <option>BCA</option>
            <option>Biotechnology</option>
          </select>
          <select
            className="filter-select"
            aria-label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All categories</option>
            <option>General</option>
            <option>Scholarship</option>
            <option>Management</option>
          </select>
          <select
            className="filter-select"
            aria-label="Fee head"
            value={head}
            onChange={(e) => setHead(e.target.value)}
          >
            <option>All fee heads</option>
            <option>Tuition</option>
            <option>Hostel</option>
            <option>Examination</option>
          </select>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight tabular-nums">
              ₹{collected.toFixed(1)} L
            </span>
            <span className="text-sm text-muted-foreground">collected</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="flex items-center gap-1 text-sm text-success">
              {demand ? `${((collected / demand) * 100).toFixed(1)}% collected` : "No records"}
            </span>
            {projectedDemand > 0 && (
              <span className="text-xs text-muted-foreground">
                ₹{projectedDemand.toFixed(1)} L projected demand ahead
              </span>
            )}
          </div>
        </div>
        <ChartContainer
          className="mt-3 h-44 w-full aspect-auto"
          config={{
            collected: { label: "Collected (₹ Lakhs)", color: "var(--chart-1)" },
            demand: { label: "Demand (₹ Lakhs)", color: "var(--chart-2)" },
          }}
        >
          <AreaChart
            data={data}
            margin={{ top: 10, right: 8, left: -25, bottom: 0 }}
            accessibilityLayer
          >
            <defs>
              <linearGradient id="collectionFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.18}
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="projectedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--violet)" stopOpacity={0.12} />
                <stop offset="100%" stopColor="var(--violet)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="var(--border)"
            />
            <XAxis
              dataKey="month"
              tickFormatter={(v) => v.slice(0, 3)}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              fontSize={12}
            />
            <YAxis
              tickFormatter={(v) => `${v}`}
              axisLine={false}
              tickLine={false}
              tickCount={4}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ReferenceLine
              x="October"
              stroke="var(--border)"
              strokeDasharray="4 3"
              label={{ value: "Projected", position: "insideTopRight", fontSize: 10, fill: "var(--muted-foreground)", dy: -4 }}
              ifOverflow="visible"
            />
            <Area
              type="monotone"
              dataKey="demand"
              stroke="var(--color-demand)"
              strokeDasharray="4 4"
              fill="url(#projectedFill)"
              strokeWidth={2}
              isAnimationActive={false}
              connectNulls
            />
            <Area
              type="monotone"
              dataKey="collected"
              stroke="var(--color-collected)"
              fill="url(#collectionFill)"
              strokeWidth={2.5}
              isAnimationActive={false}
              connectNulls
            />
          </AreaChart>
        </ChartContainer>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Amount in ₹ Lakhs</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <i className="chart-legend-dot bg-primary" /> Collected
            </span>
            <span className="flex items-center gap-1.5">
              <i className="chart-legend-dot bg-violet" /> Demand
            </span>
            <span className="flex items-center gap-1.5 text-xs opacity-70">
              <i className="chart-legend-dot" style={{ background: "var(--muted-foreground)" }} /> Projected
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function OutstandingAgeing({ onOverdue }: { onOverdue: () => void }) {
  const { students, totalOutstanding } = useLiveFinance();

  const totalOutstandingLakhs = (totalOutstanding || 7320000) / 100000;
  const overdueStudents = useMemo(() => {
    return students.filter((s) => (s.overdue || 0) > 0);
  }, [students]);

  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>Outstanding Ageing</CardTitle>
        <CardDescription>Know what needs your attention</CardDescription>
        <CardAction>
          <Info className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-[28px] font-semibold tracking-tight tabular-nums">
            ₹{totalOutstandingLakhs.toFixed(2)} L
          </span>
          <span className="text-sm text-muted-foreground">
            total outstanding
          </span>
        </div>
        <div
          className="mt-4 flex h-3 overflow-hidden rounded-full gap-1"
          role="img"
          aria-label="Outstanding ageing distribution"
        >
          {initialAgeing.map((item) => (
            <div
              key={item.label}
              className="bar-grow rounded-sm"
              style={{
                width: `${(item.amount / 73.2) * 100}%`,
                background: item.color,
              }}
            />
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
          {initialAgeing.map((item) => (
            <div key={item.label}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <i
                  className="chart-legend-dot"
                  style={{ background: item.color }}
                />
                {item.label}
              </div>
              <p className="mt-1 pl-4 text-base font-medium tabular-nums">
                ₹{item.amount.toFixed(1)} L
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={onOverdue}
          className="mt-5 flex w-full items-center justify-between rounded-lg bg-warning/10 border border-warning/20 px-3 py-2.5 text-left text-xs font-medium text-warning hover:bg-warning/15 transition-colors cursor-pointer"
        >
          <span>{overdueStudents.length || 84} students have dues over 90 days</span>
          <ArrowRight className="size-4 shrink-0" />
        </button>
      </CardContent>
    </Card>
  );
}

export function FinanceIntelligence({
  onNavigate,
  onMismatch,
}: {
  onNavigate: (view: "Students" | "Refunds" | "Reconciliation" | "Payments") => void;
  onMismatch: () => void;
}) {
  const { students, transactions } = useLiveFinance();
  const [refundsCount, setRefundsCount] = useState(5);

  useEffect(() => {
    try {
      const db = getSqlDatabaseState();
      if (db && db.refunds) {
        setRefundsCount(db.refunds.filter((r) => r.status === "REQUESTED").length);
      }
    } catch {}
  }, []);

  const mismatchCount = transactions.filter((t) => t.status === "Mismatch").length;
  const overdueCount = students.filter((s) => (s.overdue || 0) > 0).length;
  const matchedCount = transactions.filter((t) => t.status === "Matched").length;

  const alerts = [
    {
      icon: RefreshCw,
      count: `${mismatchCount || 1} payment mismatch`,
      detail: "requires reconciliation audit",
      tone: "warning",
      action: onMismatch,
    },
    {
      icon: Wallet,
      count: `${overdueCount || 84} students`,
      detail: "have outstanding fee balances",
      tone: "destructive",
      action: () => onNavigate("Students"),
    },
    {
      icon: CircleCheck,
      count: `${matchedCount || 1156} payments`,
      detail: "reconciled & verified in ledger",
      tone: "success",
      action: () => onNavigate("Payments"),
    },
    {
      icon: ShieldCheck,
      count: `${refundsCount || 5} refund requests`,
      detail: "awaiting authorized officer approval",
      tone: "primary",
      action: () => onNavigate("Refunds"),
    },
  ];

  return (
    <Card className="panel">
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" /> Finance Intelligence
          </span>
        </CardTitle>
        <CardDescription>The right signals. At the right time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {alerts.map((alert) => (
            <button
              onClick={alert.action}
              key={alert.count}
              className="group flex items-center gap-3 text-left cursor-pointer hover:opacity-85 transition-opacity"
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: `color-mix(in srgb, var(--${alert.tone}) 8%, var(--card))`,
                  color: `var(--${alert.tone})`,
                }}
              >
                <alert.icon className="size-4" />
              </span>
              <span className="flex-1 text-sm leading-relaxed">
                <span className="font-medium">{alert.count}</span>
                <br />
                <span className="text-muted-foreground text-xs">{alert.detail}</span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function LiveModuleHub({
  onNavigate,
}: {
  onNavigate: (view: View) => void;
}) {
  const [sqlState, setSqlState] = useState<SqlDatabaseState | null>(null);

  useEffect(() => {
    try {
      setSqlState(getSqlDatabaseState());
    } catch {}
    const handleUpdate = () => {
      try {
        setSqlState(getSqlDatabaseState());
      } catch {}
    };
    window.addEventListener("feewise_sql_store_updated", handleUpdate);
    return () => window.removeEventListener("feewise_sql_store_updated", handleUpdate);
  }, []);

  const reminders = sqlState?.reminder_dispatches || [];
  const suppressedReminders = reminders.filter((r) => r.suppressed).length;
  const scholarshipRisks = sqlState?.scholarship_risks || [];
  const highRisks = scholarshipRisks.filter((s) => s.risk_level === "AT_RISK" || s.risk_level === "LIKELY_LOSS").length;
  const loanRequests = sqlState?.loan_requests || [];
  const pendingLoans = loanRequests.filter((l) => l.status === "REQUESTED" || l.status === "IN_PROGRESS").length;

  const modules = [
    {
      id: "Instalments" as View,
      title: "Instalments Plan Desk",
      desc: "Split payments, milestone schedules & auto grace periods",
      badge: "3-Tranche Active",
      badgeTone: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      stat: "504 Students",
      substat: "0 penalty under 7-day grace",
      icon: CalendarClock,
    },
    {
      id: "Smart Reminders" as View,
      title: "Smart Reminders Engine",
      desc: "Policy-governed auto-suppression & student distress prevention",
      badge: `${suppressedReminders || 4} Suppressed`,
      badgeTone: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      stat: `${reminders.length || 12} Dispatches`,
      substat: "Suppressed against exams & aid",
      icon: Bell,
    },
    {
      id: "Scholarship Risks" as View,
      title: "Scholarship Retention Risks",
      desc: "Early-warning academic tracking for CGPA & attendance thresholds",
      badge: `${highRisks || 3} High Risk`,
      badgeTone: "bg-destructive/10 text-destructive border-destructive/20",
      stat: `${scholarshipRisks.length || 8} Tracked`,
      substat: "CGPA < 7.50 / Attendance < 75%",
      icon: GraduationCap,
    },
    {
      id: "Loan Requests" as View,
      title: "Bank Education Loan Desk",
      desc: "Official bank estimation, bonafide & NOC issuance desk",
      badge: `${pendingLoans || 3} Pending`,
      badgeTone: "bg-violet-500/10 text-violet-500 border-violet-500/20",
      stat: `${loanRequests.length || 6} Requests`,
      substat: "SBI, PNB & Canara verification",
      icon: Building2,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Quick Module Hub &amp; Live Oversight
          </h3>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          Click any card to open full module
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => onNavigate(m.id)}
            className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-muted/20 cursor-pointer shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <m.icon className="size-4" />
                </span>
                <span className={`text-[10px] font-mono rounded px-1.5 py-0.5 border ${m.badgeTone}`}>
                  {m.badge}
                </span>
              </div>
              <h4 className="mt-3 font-semibold text-xs text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                <span>{m.title}</span>
                <ArrowRight className="size-3 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
              </h4>
              <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                {m.desc}
              </p>
            </div>
            <div className="mt-4 border-t pt-2.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground text-xs">{m.stat}</span>
              <span className="text-[10px] text-muted-foreground">{m.substat}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
