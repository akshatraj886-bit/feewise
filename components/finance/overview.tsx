"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
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
import { ageing, feeHeads } from "@/lib/finance-data";
import { filteredCollections } from "@/lib/finance-service";

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
  decimals = 2,
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

const kpis = [
  {
    label: "Total fee demand",
    value: 485.6,
    icon: Wallet,
    trend: "+7.4%",
    note: "AY 2026–27 target",
    tone: "primary",
    bars: [14, 22, 19, 28, 25, 33, 38, 35, 44, 49],
    direction: ArrowUpRight,
  },
  {
    label: "Collected",
    value: 412.4,
    icon: CreditCard,
    trend: "84.92%",
    note: "collection rate",
    tone: "success",
    bars: [12, 17, 24, 20, 30, 27, 36, 34, 41, 48],
    direction: ArrowUpRight,
  },
  {
    label: "Outstanding",
    value: 73.2,
    icon: Coins,
    trend: "15.08%",
    note: "unrealized dues",
    tone: "warning",
    bars: [42, 38, 35, 31, 28, 26, 22, 25, 18, 14],
    direction: ArrowDownRight,
  },
  {
    label: "Reconciliation",
    value: 99.2,
    icon: RefreshCw,
    trend: "127",
    note: "gateway queue",
    tone: "violet",
    bars: [15, 20, 23, 29, 26, 35, 32, 40, 38, 48],
    direction: ArrowUpRight,
  },
];
export function KpiCards({
  onNavigate,
}: {
  onNavigate: (
    view: "Payments" | "Reconciliation" | "Students" | "Fee Structure",
  ) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((item, index) => (
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
          className="kpi enter relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left text-foreground"
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
            <Counter value={item.value} decimals={index === 3 ? 1 : 1} />
            <span className="text-[25px]">{index === 3 ? "%" : " L"}</span>
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

export function FeeHeadOverview() {
  return (
    <Card className="panel h-full">
      <CardHeader>
        <CardTitle>Fee Head Overview</CardTitle>
        <CardDescription>Collection across fee categories</CardDescription>
        <CardAction>
          <GraduationCap className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-[17px]">
          {feeHeads.map((fee, index) => (
            <div key={fee.name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{fee.name}</span>
                <span className="font-medium tabular-nums">
                  ₹{fee.amount.toFixed(1)} L
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="bar-grow h-full rounded-full"
                  style={{
                    width: `${(fee.amount / 285.5) * 100}%`,
                    background: fee.color,
                    animationDelay: `${index * 70}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Info className="size-3.5" /> ₹5.0 L in other fee heads (Registration, Caution Deposit &amp; Alumni)
        </p>
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
            <option>MBA</option>
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
            />
            <Area
              type="monotone"
              dataKey="demand"
              stroke="var(--color-demand)"
              strokeWidth={1.8}
              strokeDasharray="5 4"
              fill="transparent"
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
          <span className="text-[28px] font-semibold tracking-tight">
            ₹73.20 L
          </span>
          <span className="text-sm text-muted-foreground">
            total outstanding
          </span>
        </div>
        <div
          className="mt-4 flex h-3 overflow-hidden rounded-full gap-1"
          role="img"
          aria-label="Outstanding ageing: 0–30 days 31.50 lakh; 31–60 days 19.80 lakh; 61–90 days 13.40 lakh; 90+ days 8.50 lakh"
        >
          {ageing.map((item) => (
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
          {ageing.map((item) => (
            <div key={item.label}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <i
                  className="chart-legend-dot"
                  style={{ background: item.color }}
                />
                {item.label}
              </div>
              <p className="mt-1 pl-4 text-base font-medium">
                ₹{item.amount.toFixed(1)} L
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={onOverdue}
          className="mt-5 flex w-full items-center justify-between rounded-lg bg-warning/8 px-3 py-2.5 text-left text-sm text-warning"
        >
          <span>84 students have dues over 90 days</span>
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
  onNavigate: (view: "Students" | "Refunds" | "Reconciliation") => void;
  onMismatch: () => void;
}) {
  const alerts = [
    {
      icon: RefreshCw,
      count: "23 payment mismatches",
      detail: "require your review",
      tone: "warning",
      action: onMismatch,
    },
    {
      icon: Wallet,
      count: "84 students",
      detail: "have dues older than 90 days",
      tone: "destructive",
      action: () => onNavigate("Students"),
    },
    {
      icon: CircleCheck,
      count: "1,284 payments",
      detail: "reconciled today",
      tone: "success",
      action: () => onNavigate("Reconciliation"),
    },
    {
      icon: ShieldCheck,
      count: "14 refund requests",
      detail: "awaiting approval",
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
              className="group flex items-center gap-3 text-left"
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
                <span className="text-muted-foreground">{alert.detail}</span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
