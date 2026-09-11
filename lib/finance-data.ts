export const navigation = [
  "Dashboard",
  "Students",
  "Fee Structure",
  "Payments",
  "Reconciliation",
  "Refunds",
  "Reports",
] as const;
export type View = (typeof navigation)[number];
export const inr = (amount: number) => "₹" + amount.toLocaleString("en-IN");
export const feeHeads = [
  { name: "Tuition", amount: 12.4, color: "var(--primary)" },
  { name: "Hostel", amount: 4.2, color: "var(--violet)" },
  { name: "Examination", amount: 1.8, color: "var(--chart-3)" },
  { name: "Transport", amount: 1.1, color: "var(--chart-4)" },
  { name: "Laboratory", amount: 0.8, color: "var(--chart-5)" },
  { name: "Library", amount: 0.4, color: "var(--muted-foreground)" },
];
export const collectionTrend = [
  { month: "April", collected: 2.4, demand: 3.1 },
  { month: "May", collected: 3.1, demand: 3.65 },
  { month: "June", collected: 2.85, demand: 3.55 },
  { month: "July", collected: 3.95, demand: 4.6 },
  { month: "August", collected: 4.2, demand: 4.9 },
  { month: "September", collected: 5.2, demand: 5.6 },
];
export const ageing = [
  { label: "0–30 days", amount: 1.42, color: "var(--primary)" },
  { label: "31–60 days", amount: 0.91, color: "var(--violet)" },
  { label: "61–90 days", amount: 0.63, color: "var(--warning)" },
  { label: "90+ days", amount: 0.74, color: "var(--destructive)" },
];
export const transactions = [
  {
    id: "TXN-10482",
    student: "251FA04E03",
    gateway: 30000,
    ledger: 30000,
    date: "11 Sep 2026",
    method: "UPI",
    status: "Matched",
  },
  {
    id: "TXN-10483",
    student: "251FA04E17",
    gateway: 25000,
    ledger: 20000,
    date: "11 Sep 2026",
    method: "Net banking",
    status: "Mismatch",
  },
  {
    id: "TXN-10484",
    student: "251FA04E21",
    gateway: 15000,
    ledger: 15000,
    date: "11 Sep 2026",
    method: "UPI",
    status: "Matched",
  },
  {
    id: "TXN-10485",
    student: "251FA04E36",
    gateway: 45000,
    ledger: 45000,
    date: "11 Sep 2026",
    method: "Debit card",
    status: "Matched",
  },
  {
    id: "TXN-10486",
    student: "251FA04E42",
    gateway: 18000,
    ledger: 18000,
    date: "10 Sep 2026",
    method: "UPI",
    status: "Matched",
  },
];
export type Transaction = (typeof transactions)[number];
export const students = [
  {
    id: "251FA04E03",
    name: "Akshat Raj",
    programme: "B.Tech CSE",
    category: "General",
    demand: 120000,
    paid: 92000,
    overdue: 24,
    initials: "AR",
  },
  {
    id: "251FA04E17",
    name: "Ananya Sharma",
    programme: "B.Tech CSE",
    category: "General",
    demand: 120000,
    paid: 120000,
    overdue: 0,
    initials: "AS",
  },
  {
    id: "251FA04E21",
    name: "Rohan Mehta",
    programme: "MBA",
    category: "Scholarship",
    demand: 160000,
    paid: 115000,
    overdue: 96,
    initials: "RM",
  },
  {
    id: "251FA04E36",
    name: "Ishita Nair",
    programme: "B.Tech ECE",
    category: "General",
    demand: 140000,
    paid: 140000,
    overdue: 0,
    initials: "IN",
  },
  {
    id: "251FA04E42",
    name: "Aarav Desai",
    programme: "MBA",
    category: "General",
    demand: 180000,
    paid: 125000,
    overdue: 105,
    initials: "AD",
  },
  {
    id: "251FA04E58",
    name: "Meera Iyer",
    programme: "B.Tech CSE",
    category: "Scholarship",
    demand: 120000,
    paid: 102000,
    overdue: 42,
    initials: "MI",
  },
];
export type Student = (typeof students)[number];
export type AuditEntry = {
  time: string;
  user: string;
  action: string;
  entity: string;
  status: string;
};
export const initialAudit: AuditEntry[] = [
  {
    time: "10:24 AM",
    user: "Finance Admin",
    action: "Viewed payment",
    entity: "TXN-10483",
    status: "Success",
  },
  {
    time: "10:20 AM",
    user: "Finance Admin",
    action: "Prepared refund review",
    entity: "RF-2081",
    status: "Prepared",
  },
  {
    time: "10:17 AM",
    user: "Finance Agent",
    action: "Detected payment mismatch",
    entity: "TXN-10483",
    status: "Flagged",
  },
];
export const feeStructures = [
  {
    programme: "B.Tech CSE",
    year: "2026–27",
    category: "General",
    route: "Merit",
    head: "Tuition",
    amount: 90000,
    effective: "01 Apr 2026",
    version: "v3.0",
    active: true,
  },
  {
    programme: "B.Tech CSE",
    year: "2026–27",
    category: "General",
    route: "Merit",
    head: "Hostel",
    amount: 40000,
    effective: "01 Apr 2026",
    version: "v3.0",
    active: true,
  },
  {
    programme: "B.Tech CSE",
    year: "2026–27",
    category: "General",
    route: "Merit",
    head: "Examination",
    amount: 5000,
    effective: "01 Apr 2026",
    version: "v3.0",
    active: true,
  },
  {
    programme: "B.Tech ECE",
    year: "2026–27",
    category: "General",
    route: "Merit",
    head: "Tuition",
    amount: 90000,
    effective: "01 Apr 2026",
    version: "v3.0",
    active: true,
  },
  {
    programme: "MBA",
    year: "2026–27",
    category: "General",
    route: "Entrance",
    head: "Tuition",
    amount: 130000,
    effective: "01 Apr 2026",
    version: "v2.1",
    active: true,
  },
  {
    programme: "B.Tech CSE",
    year: "2025–26",
    category: "General",
    route: "Merit",
    head: "Tuition",
    amount: 85000,
    effective: "01 Apr 2025",
    version: "v2.0",
    active: false,
  },
];
export function downloadCsv(name: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) =>
      row
        .map((value) => '"' + String(value).replace(/"/g, '""') + '"')
        .join(","),
    )
    .join("\n");
  const url = URL.createObjectURL(
    new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
