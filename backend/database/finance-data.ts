export const navigation = [
  "Dashboard",
  "Students",
  "Fee Structure",
  "Payments",
  "Reconciliation",
  "Instalments",
  "AI Assistant",
  "Smart Reminders",
  "Scholarship Risks",
  "Loan Requests",
  "Refunds",
  "Reports",
] as const;
export type View = (typeof navigation)[number];
export const inr = (amount: number) => "₹" + amount.toLocaleString("en-IN");
export const feeHeads = [
  { name: "Tuition", amount: 285.5, color: "var(--primary)" },
  { name: "Hostel", amount: 94.2, color: "var(--violet)" },
  { name: "Examination", amount: 38.6, color: "var(--chart-3)" },
  { name: "Transport", amount: 32.4, color: "var(--chart-4)" },
  { name: "Laboratory", amount: 21.5, color: "var(--chart-5)" },
  { name: "Library", amount: 8.4, color: "var(--muted-foreground)" },
];
export const collectionTrend = [
  { month: "April", collected: 46.5, demand: 58.2 },
  { month: "May", collected: 59.1, demand: 68.4 },
  { month: "June", collected: 74.3, demand: 85.6 },
  { month: "July", collected: 102.8, demand: 112.5 },
  { month: "August", collected: 71.2, demand: 88.4 },
  { month: "September", collected: 58.5, demand: 72.5 },
];
export const ageing = [
  { label: "0–30 days", amount: 31.5, color: "var(--primary)" },
  { label: "31–60 days", amount: 19.8, color: "var(--violet)" },
  { label: "61–90 days", amount: 13.4, color: "var(--warning)" },
  { label: "90+ days", amount: 8.5, color: "var(--destructive)" },
];
export const transactions = [
  {"id":"TXN-10482","student":"251FA04E03","gateway":30000,"ledger":30000,"date":"11 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10483","student":"251FA04E17","gateway":25000,"ledger":20000,"date":"11 Sep 2026","method":"Net banking","status":"Mismatch"},
  {"id":"TXN-10484","student":"251FA04E21","gateway":15000,"ledger":15000,"date":"11 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10485","student":"251FA04E36","gateway":45000,"ledger":45000,"date":"11 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10486","student":"251FA04E42","gateway":18000,"ledger":18000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10487","student":"251FA04E58","gateway":40000,"ledger":40000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10488","student":"251FA04E21","gateway":20000,"ledger":20000,"date":"08 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10489","student":"251FA04E03","gateway":15000,"ledger":15000,"date":"05 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10490","student":"251FA04E42","gateway":30000,"ledger":30000,"date":"03 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10491","student":"251FA04E03","gateway":26000,"ledger":26000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10492","student":"251FA04E03","gateway":21000,"ledger":21000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10493","student":"251FA04E17","gateway":40000,"ledger":40000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10494","student":"251FA04E17","gateway":35000,"ledger":35000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10495","student":"251FA04E17","gateway":25000,"ledger":25000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10496","student":"251FA04E21","gateway":44000,"ledger":44000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10497","student":"251FA04E21","gateway":36000,"ledger":36000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10498","student":"251FA04645","gateway":36000,"ledger":36000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10499","student":"251FA04645","gateway":29000,"ledger":29000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10500","student":"251FA04852","gateway":53000,"ledger":53000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10501","student":"251FA04852","gateway":46000,"ledger":46000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10502","student":"251FA04852","gateway":33000,"ledger":33000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10503","student":"251FA04863","gateway":36000,"ledger":36000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10504","student":"251FA04863","gateway":29500,"ledger":29500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10505","student":"251FA04261","gateway":39000,"ledger":39000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10506","student":"251FA04261","gateway":34000,"ledger":34000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10507","student":"251FA04261","gateway":24000,"ledger":24000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10508","student":"251FA04001","gateway":37000,"ledger":37000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10509","student":"251FA04001","gateway":32000,"ledger":32000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10510","student":"251FA04001","gateway":23000,"ledger":23000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10511","student":"251FA04777","gateway":58000,"ledger":58000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10512","student":"251FA04777","gateway":51000,"ledger":51000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10513","student":"251FA04777","gateway":36000,"ledger":36000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10514","student":"251FA04430","gateway":43500,"ledger":43500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10515","student":"251FA04430","gateway":35500,"ledger":35500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10516","student":"251FA04219","gateway":45000,"ledger":45000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10517","student":"251FA04219","gateway":39500,"ledger":39500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10518","student":"251FA04219","gateway":28000,"ledger":28000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10519","student":"251FA04381","gateway":43000,"ledger":43000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10520","student":"251FA04381","gateway":37500,"ledger":37500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10521","student":"251FA04381","gateway":26500,"ledger":26500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10522","student":"251FA04163","gateway":43000,"ledger":43000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10523","student":"251FA04163","gateway":37500,"ledger":37500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10524","student":"251FA04163","gateway":26500,"ledger":26500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10525","student":"251FA04940","gateway":52000,"ledger":52000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10526","student":"251FA04940","gateway":45500,"ledger":45500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10527","student":"251FA04940","gateway":32000,"ledger":32000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10528","student":"251FA04378","gateway":41500,"ledger":41500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10529","student":"251FA04378","gateway":36500,"ledger":36500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10530","student":"251FA04378","gateway":26000,"ledger":26000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10531","student":"251FA04069","gateway":58000,"ledger":58000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10532","student":"251FA04069","gateway":51000,"ledger":51000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10533","student":"251FA04069","gateway":36000,"ledger":36000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10534","student":"251FA04485","gateway":58000,"ledger":58000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10535","student":"251FA04485","gateway":51000,"ledger":51000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10536","student":"251FA04485","gateway":36000,"ledger":36000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10537","student":"251FA04119","gateway":58000,"ledger":58000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10538","student":"251FA04119","gateway":51000,"ledger":51000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10539","student":"251FA04119","gateway":36000,"ledger":36000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10540","student":"251FA04493","gateway":35000,"ledger":35000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10541","student":"251FA04493","gateway":31000,"ledger":31000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10542","student":"251FA04493","gateway":22000,"ledger":22000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10543","student":"251FA04208","gateway":53000,"ledger":53000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10544","student":"251FA04208","gateway":46000,"ledger":46000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10545","student":"251FA04208","gateway":33000,"ledger":33000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10546","student":"251FA04394","gateway":27500,"ledger":27500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10547","student":"251FA04464","gateway":20500,"ledger":20500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10548","student":"251FA04464","gateway":17000,"ledger":17000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10549","student":"251FA04140","gateway":58000,"ledger":58000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10550","student":"251FA04140","gateway":51000,"ledger":51000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10551","student":"251FA04140","gateway":36000,"ledger":36000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10552","student":"251FA04263","gateway":38000,"ledger":38000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10553","student":"251FA04263","gateway":31500,"ledger":31500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10554","student":"251FA04928","gateway":41000,"ledger":41000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10555","student":"251FA04928","gateway":36000,"ledger":36000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10556","student":"251FA04928","gateway":25500,"ledger":25500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10557","student":"251FA04564","gateway":54000,"ledger":54000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10558","student":"251FA04564","gateway":47000,"ledger":47000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10559","student":"251FA04564","gateway":33500,"ledger":33500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10560","student":"251FA04085","gateway":58000,"ledger":58000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10561","student":"251FA04085","gateway":51000,"ledger":51000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10562","student":"251FA04085","gateway":36000,"ledger":36000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10563","student":"251FA04529","gateway":44500,"ledger":44500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10564","student":"251FA04529","gateway":39000,"ledger":39000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10565","student":"251FA04529","gateway":28000,"ledger":28000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10566","student":"251FA04978","gateway":33500,"ledger":33500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10567","student":"251FA04978","gateway":29500,"ledger":29500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10568","student":"251FA04978","gateway":21000,"ledger":21000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10569","student":"251FA04387","gateway":49500,"ledger":49500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10570","student":"251FA04387","gateway":43500,"ledger":43500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10571","student":"251FA04387","gateway":31000,"ledger":31000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10572","student":"251FA04348","gateway":500,"ledger":500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10573","student":"251FA04719","gateway":51500,"ledger":51500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10574","student":"251FA04719","gateway":45000,"ledger":45000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10575","student":"251FA04719","gateway":32500,"ledger":32500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10576","student":"251FA04511","gateway":35500,"ledger":35500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10577","student":"251FA04511","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10578","student":"251FA04885","gateway":47000,"ledger":47000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10579","student":"251FA04885","gateway":41500,"ledger":41500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10580","student":"251FA04885","gateway":29500,"ledger":29500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10581","student":"251FA04909","gateway":37000,"ledger":37000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10582","student":"251FA04909","gateway":32000,"ledger":32000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10583","student":"251FA04909","gateway":23000,"ledger":23000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10584","student":"251FA04644","gateway":46500,"ledger":46500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10585","student":"251FA04644","gateway":41000,"ledger":41000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10586","student":"251FA04644","gateway":29000,"ledger":29000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10587","student":"251FA04853","gateway":28500,"ledger":28500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10588","student":"251FA04853","gateway":23000,"ledger":23000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10589","student":"251FA04064","gateway":58000,"ledger":58000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10590","student":"251FA04064","gateway":51000,"ledger":51000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10591","student":"251FA04064","gateway":36000,"ledger":36000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10592","student":"251FA04418","gateway":57500,"ledger":57500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10593","student":"251FA04418","gateway":50500,"ledger":50500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10594","student":"251FA04418","gateway":36000,"ledger":36000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10595","student":"251FA04897","gateway":58000,"ledger":58000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10596","student":"251FA04897","gateway":51000,"ledger":51000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10597","student":"251FA04897","gateway":36000,"ledger":36000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10598","student":"251FA04416","gateway":36000,"ledger":36000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10599","student":"251FA04416","gateway":29500,"ledger":29500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10600","student":"251FA04346","gateway":37000,"ledger":37000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10601","student":"251FA04346","gateway":32500,"ledger":32500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10602","student":"251FA04346","gateway":23000,"ledger":23000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10603","student":"251FA04455","gateway":45500,"ledger":45500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10604","student":"251FA04455","gateway":40000,"ledger":40000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10605","student":"251FA04455","gateway":28500,"ledger":28500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10606","student":"251FA04953","gateway":44500,"ledger":44500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10607","student":"251FA04953","gateway":39000,"ledger":39000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10608","student":"251FA04953","gateway":28000,"ledger":28000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10609","student":"251FA04575","gateway":35000,"ledger":35000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10610","student":"251FA04575","gateway":30500,"ledger":30500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10611","student":"251FA04575","gateway":22000,"ledger":22000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10612","student":"251FA04741","gateway":33000,"ledger":33000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10613","student":"251FA04428","gateway":45000,"ledger":45000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10614","student":"251FA04428","gateway":39000,"ledger":39000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10615","student":"251FA04428","gateway":28000,"ledger":28000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10616","student":"251FA04684","gateway":36000,"ledger":36000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10617","student":"251FA04684","gateway":29500,"ledger":29500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10618","student":"251FA04282","gateway":34000,"ledger":34000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10619","student":"251FA04282","gateway":29500,"ledger":29500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10620","student":"251FA04282","gateway":21500,"ledger":21500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10621","student":"251FA04028","gateway":34500,"ledger":34500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10622","student":"251FA04028","gateway":30500,"ledger":30500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10623","student":"251FA04028","gateway":21500,"ledger":21500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10624","student":"251FA04496","gateway":42500,"ledger":42500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10625","student":"251FA04496","gateway":37500,"ledger":37500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10626","student":"251FA04496","gateway":26500,"ledger":26500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10627","student":"251FA04400","gateway":500,"ledger":500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10628","student":"251FA04379","gateway":52500,"ledger":52500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10629","student":"251FA04379","gateway":46000,"ledger":46000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10630","student":"251FA04379","gateway":32500,"ledger":32500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10631","student":"251FA04712","gateway":44000,"ledger":44000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10632","student":"251FA04712","gateway":38500,"ledger":38500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10633","student":"251FA04712","gateway":28000,"ledger":28000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10634","student":"251FA04449","gateway":1000,"ledger":1000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10635","student":"251FA04025","gateway":49500,"ledger":49500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10636","student":"251FA04025","gateway":43500,"ledger":43500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10637","student":"251FA04025","gateway":31000,"ledger":31000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10638","student":"251FA04060","gateway":53000,"ledger":53000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10639","student":"251FA04060","gateway":46500,"ledger":46500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10640","student":"251FA04060","gateway":33500,"ledger":33500,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10641","student":"251FA04108","gateway":58000,"ledger":58000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10642","student":"251FA04108","gateway":50500,"ledger":50500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10643","student":"251FA04108","gateway":36000,"ledger":36000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10644","student":"251FA04784","gateway":40500,"ledger":40500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10645","student":"251FA04784","gateway":35500,"ledger":35500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10646","student":"251FA04784","gateway":25500,"ledger":25500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10647","student":"251FA04854","gateway":35000,"ledger":35000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10648","student":"251FA04854","gateway":28500,"ledger":28500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10649","student":"251FA04701","gateway":34000,"ledger":34000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10650","student":"251FA04701","gateway":30000,"ledger":30000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10651","student":"251FA04701","gateway":21500,"ledger":21500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10652","student":"251FA04018","gateway":58000,"ledger":58000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10653","student":"251FA04018","gateway":51000,"ledger":51000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10654","student":"251FA04018","gateway":36000,"ledger":36000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10655","student":"251FA04610","gateway":44000,"ledger":44000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10656","student":"251FA04610","gateway":38500,"ledger":38500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10657","student":"251FA04610","gateway":27500,"ledger":27500,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10658","student":"251FA04223","gateway":34000,"ledger":34000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10659","student":"251FA04223","gateway":30000,"ledger":30000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10660","student":"251FA04223","gateway":21500,"ledger":21500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10661","student":"251FA04426","gateway":23000,"ledger":23000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10662","student":"251FA04426","gateway":18500,"ledger":18500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10663","student":"251FA04002","gateway":52500,"ledger":52500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10664","student":"251FA04002","gateway":46000,"ledger":46000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10665","student":"251FA04002","gateway":33000,"ledger":33000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10666","student":"251FA04427","gateway":34000,"ledger":34000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10667","student":"251FA04427","gateway":27500,"ledger":27500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10668","student":"251FA04704","gateway":37000,"ledger":37000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10669","student":"251FA04704","gateway":32500,"ledger":32500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10670","student":"251FA04704","gateway":23500,"ledger":23500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10671","student":"251FA04569","gateway":43000,"ledger":43000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10672","student":"251FA04569","gateway":35000,"ledger":35000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10673","student":"251FA04095","gateway":31000,"ledger":31000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10674","student":"251FA04095","gateway":25500,"ledger":25500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10675","student":"251FA04034","gateway":43500,"ledger":43500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10676","student":"251FA04034","gateway":36000,"ledger":36000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10677","student":"251FA04495","gateway":40000,"ledger":40000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10678","student":"251FA04495","gateway":35000,"ledger":35000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10679","student":"251FA04495","gateway":24500,"ledger":24500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10680","student":"251FA04925","gateway":40500,"ledger":40500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10681","student":"251FA04925","gateway":35500,"ledger":35500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10682","student":"251FA04925","gateway":25000,"ledger":25000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10683","student":"251FA04676","gateway":56000,"ledger":56000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10684","student":"251FA04676","gateway":49000,"ledger":49000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10685","student":"251FA04676","gateway":35500,"ledger":35500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10686","student":"251FA04894","gateway":20000,"ledger":20000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10687","student":"251FA04894","gateway":16000,"ledger":16000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10688","student":"251FA04919","gateway":58000,"ledger":58000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10689","student":"251FA04919","gateway":50500,"ledger":50500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10690","student":"251FA04919","gateway":36000,"ledger":36000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10691","student":"251FA04868","gateway":41500,"ledger":41500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10692","student":"251FA04868","gateway":34000,"ledger":34000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10693","student":"251FA04178","gateway":33000,"ledger":33000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10694","student":"251FA04935","gateway":36000,"ledger":36000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10695","student":"251FA04935","gateway":29500,"ledger":29500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10696","student":"251FA04443","gateway":35000,"ledger":35000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10697","student":"251FA04443","gateway":29000,"ledger":29000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10698","student":"251FA04770","gateway":21000,"ledger":21000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10699","student":"251FA04770","gateway":17500,"ledger":17500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10700","student":"251FA04539","gateway":1500,"ledger":1500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10701","student":"251FA04765","gateway":46500,"ledger":46500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10702","student":"251FA04765","gateway":41000,"ledger":41000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10703","student":"251FA04765","gateway":29000,"ledger":29000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10704","student":"251FA04145","gateway":500,"ledger":500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10705","student":"251FA04147","gateway":36000,"ledger":36000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10706","student":"251FA04147","gateway":29000,"ledger":29000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10707","student":"251FA04197","gateway":44000,"ledger":44000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10708","student":"251FA04197","gateway":38500,"ledger":38500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10709","student":"251FA04197","gateway":27000,"ledger":27000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10710","student":"251FA04810","gateway":40500,"ledger":40500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10711","student":"251FA04810","gateway":35500,"ledger":35500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10712","student":"251FA04810","gateway":25000,"ledger":25000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10713","student":"251FA04093","gateway":53000,"ledger":53000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10714","student":"251FA04093","gateway":46000,"ledger":46000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10715","student":"251FA04093","gateway":33000,"ledger":33000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10716","student":"251FA04434","gateway":35000,"ledger":35000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10717","student":"251FA04434","gateway":31000,"ledger":31000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10718","student":"251FA04434","gateway":22000,"ledger":22000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10719","student":"251FA04473","gateway":51500,"ledger":51500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10720","student":"251FA04473","gateway":45000,"ledger":45000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10721","student":"251FA04473","gateway":32000,"ledger":32000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10722","student":"251FA04802","gateway":28000,"ledger":28000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10723","student":"251FA04802","gateway":22500,"ledger":22500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10724","student":"251FA04806","gateway":1000,"ledger":1000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10725","student":"251FA04019","gateway":35000,"ledger":35000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10726","student":"251FA04019","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10727","student":"251FA04713","gateway":35000,"ledger":35000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10728","student":"251FA04713","gateway":30500,"ledger":30500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10729","student":"251FA04713","gateway":22000,"ledger":22000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10730","student":"251FA04063","gateway":1500,"ledger":1500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10731","student":"251FA04763","gateway":45000,"ledger":45000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10732","student":"251FA04763","gateway":39000,"ledger":39000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10733","student":"251FA04763","gateway":28000,"ledger":28000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10734","student":"251FA04484","gateway":24500,"ledger":24500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10735","student":"251FA04484","gateway":20000,"ledger":20000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10736","student":"251FA04089","gateway":42000,"ledger":42000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10737","student":"251FA04089","gateway":37000,"ledger":37000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10738","student":"251FA04089","gateway":26500,"ledger":26500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10739","student":"251FA04934","gateway":26500,"ledger":26500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10740","student":"251FA04934","gateway":22000,"ledger":22000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10741","student":"251FA04554","gateway":48500,"ledger":48500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10742","student":"251FA04554","gateway":42500,"ledger":42500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10743","student":"251FA04554","gateway":30500,"ledger":30500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10744","student":"251FA04370","gateway":39000,"ledger":39000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10745","student":"251FA04370","gateway":34000,"ledger":34000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10746","student":"251FA04370","gateway":24500,"ledger":24500,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10747","student":"251FA04334","gateway":53500,"ledger":53500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10748","student":"251FA04334","gateway":47000,"ledger":47000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10749","student":"251FA04334","gateway":33500,"ledger":33500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10750","student":"251FA04527","gateway":57500,"ledger":57500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10751","student":"251FA04527","gateway":50500,"ledger":50500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10752","student":"251FA04527","gateway":36000,"ledger":36000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10753","student":"251FA04562","gateway":42000,"ledger":42000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10754","student":"251FA04562","gateway":34000,"ledger":34000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10755","student":"251FA04144","gateway":36500,"ledger":36500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10756","student":"251FA04144","gateway":30000,"ledger":30000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10757","student":"251FA04942","gateway":32500,"ledger":32500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10758","student":"251FA04942","gateway":28500,"ledger":28500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10759","student":"251FA04942","gateway":20500,"ledger":20500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10760","student":"251FA04487","gateway":52000,"ledger":52000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10761","student":"251FA04487","gateway":45500,"ledger":45500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10762","student":"251FA04487","gateway":33000,"ledger":33000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10763","student":"251FA04401","gateway":42000,"ledger":42000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10764","student":"251FA04401","gateway":34000,"ledger":34000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10765","student":"251FA04037","gateway":23500,"ledger":23500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10766","student":"251FA04037","gateway":19500,"ledger":19500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10767","student":"251FA04725","gateway":38500,"ledger":38500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10768","student":"251FA04725","gateway":34000,"ledger":34000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10769","student":"251FA04725","gateway":24000,"ledger":24000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10770","student":"251FA04241","gateway":43000,"ledger":43000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10771","student":"251FA04241","gateway":38000,"ledger":38000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10772","student":"251FA04241","gateway":27000,"ledger":27000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10773","student":"251FA04161","gateway":41000,"ledger":41000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10774","student":"251FA04161","gateway":35500,"ledger":35500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10775","student":"251FA04161","gateway":25500,"ledger":25500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10776","student":"251FA04318","gateway":57500,"ledger":57500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10777","student":"251FA04318","gateway":50500,"ledger":50500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10778","student":"251FA04318","gateway":36000,"ledger":36000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10779","student":"251FA04651","gateway":21000,"ledger":21000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10780","student":"251FA04651","gateway":17500,"ledger":17500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10781","student":"251FA04129","gateway":24000,"ledger":24000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10782","student":"251FA04129","gateway":19500,"ledger":19500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10783","student":"251FA04278","gateway":41000,"ledger":41000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10784","student":"251FA04278","gateway":36000,"ledger":36000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10785","student":"251FA04278","gateway":25500,"ledger":25500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10786","student":"251FA04749","gateway":43500,"ledger":43500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10787","student":"251FA04749","gateway":38000,"ledger":38000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10788","student":"251FA04749","gateway":27000,"ledger":27000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10789","student":"251FA04146","gateway":30500,"ledger":30500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10790","student":"251FA04332","gateway":23500,"ledger":23500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10791","student":"251FA04332","gateway":19000,"ledger":19000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10792","student":"251FA04687","gateway":57000,"ledger":57000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10793","student":"251FA04687","gateway":50000,"ledger":50000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10794","student":"251FA04687","gateway":36000,"ledger":36000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10795","student":"251FA03886","gateway":34500,"ledger":34500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10796","student":"251FA03886","gateway":30500,"ledger":30500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10797","student":"251FA03886","gateway":21500,"ledger":21500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10798","student":"251FA03011","gateway":34500,"ledger":34500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10799","student":"251FA03011","gateway":30000,"ledger":30000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10800","student":"251FA03011","gateway":21500,"ledger":21500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10801","student":"251FA03398","gateway":40500,"ledger":40500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10802","student":"251FA03398","gateway":35500,"ledger":35500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10803","student":"251FA03398","gateway":25500,"ledger":25500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10804","student":"251FA03219","gateway":56500,"ledger":56500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10805","student":"251FA03219","gateway":49500,"ledger":49500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10806","student":"251FA03219","gateway":35000,"ledger":35000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10807","student":"251FA03187","gateway":52500,"ledger":52500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10808","student":"251FA03187","gateway":46000,"ledger":46000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10809","student":"251FA03187","gateway":33000,"ledger":33000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10810","student":"251FA03861","gateway":58000,"ledger":58000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10811","student":"251FA03861","gateway":51000,"ledger":51000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10812","student":"251FA03861","gateway":36500,"ledger":36500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10813","student":"251FA03986","gateway":35000,"ledger":35000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10814","student":"251FA03986","gateway":29000,"ledger":29000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10815","student":"251FA03218","gateway":25000,"ledger":25000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10816","student":"251FA03218","gateway":20000,"ledger":20000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10817","student":"251FA03943","gateway":42000,"ledger":42000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10818","student":"251FA03943","gateway":36500,"ledger":36500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10819","student":"251FA03943","gateway":26000,"ledger":26000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10820","student":"251FA03193","gateway":35500,"ledger":35500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10821","student":"251FA03193","gateway":31000,"ledger":31000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10822","student":"251FA03193","gateway":22500,"ledger":22500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10823","student":"251FA03891","gateway":40000,"ledger":40000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10824","student":"251FA03891","gateway":32500,"ledger":32500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10825","student":"251FA03569","gateway":34000,"ledger":34000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10826","student":"251FA03569","gateway":28000,"ledger":28000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10827","student":"251FA03979","gateway":35000,"ledger":35000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10828","student":"251FA03979","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10829","student":"251FA03898","gateway":42500,"ledger":42500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10830","student":"251FA03898","gateway":35000,"ledger":35000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10831","student":"251FA03009","gateway":29500,"ledger":29500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10832","student":"251FA03009","gateway":24500,"ledger":24500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10833","student":"251FA03286","gateway":37000,"ledger":37000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10834","student":"251FA03286","gateway":30000,"ledger":30000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10835","student":"251FA03975","gateway":40500,"ledger":40500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10836","student":"251FA03975","gateway":33000,"ledger":33000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10837","student":"251FA03300","gateway":1500,"ledger":1500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10838","student":"251FA03350","gateway":35000,"ledger":35000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10839","student":"251FA03350","gateway":30500,"ledger":30500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10840","student":"251FA03350","gateway":22000,"ledger":22000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10841","student":"251FA03031","gateway":45500,"ledger":45500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10842","student":"251FA03031","gateway":39500,"ledger":39500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10843","student":"251FA03031","gateway":28500,"ledger":28500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10844","student":"251FA03492","gateway":500,"ledger":500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10845","student":"251FA03474","gateway":45500,"ledger":45500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10846","student":"251FA03474","gateway":40000,"ledger":40000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10847","student":"251FA03474","gateway":28500,"ledger":28500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10848","student":"251FA03982","gateway":53500,"ledger":53500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10849","student":"251FA03982","gateway":46500,"ledger":46500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10850","student":"251FA03982","gateway":33500,"ledger":33500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10851","student":"251FA03520","gateway":52000,"ledger":52000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10852","student":"251FA03520","gateway":45500,"ledger":45500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10853","student":"251FA03520","gateway":32000,"ledger":32000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10854","student":"251FA03797","gateway":39000,"ledger":39000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10855","student":"251FA03797","gateway":32000,"ledger":32000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10856","student":"251FA03159","gateway":52000,"ledger":52000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10857","student":"251FA03159","gateway":45500,"ledger":45500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10858","student":"251FA03159","gateway":32500,"ledger":32500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10859","student":"251FA03544","gateway":21500,"ledger":21500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10860","student":"251FA03544","gateway":17500,"ledger":17500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10861","student":"251FA03209","gateway":20500,"ledger":20500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10862","student":"251FA03209","gateway":16500,"ledger":16500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10863","student":"251FA03811","gateway":35500,"ledger":35500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10864","student":"251FA03811","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10865","student":"251FA03692","gateway":32500,"ledger":32500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10866","student":"251FA03692","gateway":26500,"ledger":26500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10867","student":"251FA03608","gateway":51500,"ledger":51500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10868","student":"251FA03608","gateway":45000,"ledger":45000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10869","student":"251FA03608","gateway":32500,"ledger":32500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10870","student":"251FA03121","gateway":36000,"ledger":36000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10871","student":"251FA03121","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10872","student":"251FA03293","gateway":36500,"ledger":36500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10873","student":"251FA03293","gateway":29500,"ledger":29500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10874","student":"251FA03658","gateway":52000,"ledger":52000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10875","student":"251FA03658","gateway":45500,"ledger":45500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10876","student":"251FA03658","gateway":33000,"ledger":33000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10877","student":"251FA03735","gateway":40000,"ledger":40000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10878","student":"251FA03735","gateway":35000,"ledger":35000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10879","student":"251FA03735","gateway":25000,"ledger":25000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10880","student":"251FA03694","gateway":52500,"ledger":52500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10881","student":"251FA03694","gateway":46000,"ledger":46000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10882","student":"251FA03694","gateway":33000,"ledger":33000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10883","student":"251FA03122","gateway":54000,"ledger":54000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10884","student":"251FA03122","gateway":47000,"ledger":47000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10885","student":"251FA03122","gateway":33500,"ledger":33500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10886","student":"251FA03418","gateway":37500,"ledger":37500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10887","student":"251FA03418","gateway":32500,"ledger":32500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10888","student":"251FA03418","gateway":23500,"ledger":23500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10889","student":"251FA03207","gateway":53000,"ledger":53000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10890","student":"251FA03207","gateway":46500,"ledger":46500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10891","student":"251FA03207","gateway":33000,"ledger":33000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10892","student":"251FA03406","gateway":43500,"ledger":43500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10893","student":"251FA03406","gateway":36000,"ledger":36000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10894","student":"251FA03573","gateway":40500,"ledger":40500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10895","student":"251FA03573","gateway":35500,"ledger":35500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10896","student":"251FA03573","gateway":25500,"ledger":25500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10897","student":"251FA03565","gateway":36500,"ledger":36500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10898","student":"251FA03565","gateway":30000,"ledger":30000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10899","student":"251FA03784","gateway":35500,"ledger":35500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10900","student":"251FA03784","gateway":29000,"ledger":29000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10901","student":"251FA03177","gateway":44000,"ledger":44000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10902","student":"251FA03177","gateway":38500,"ledger":38500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10903","student":"251FA03177","gateway":27000,"ledger":27000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10904","student":"251FA03895","gateway":35500,"ledger":35500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10905","student":"251FA03895","gateway":31000,"ledger":31000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10906","student":"251FA03895","gateway":22000,"ledger":22000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10907","student":"251FA03438","gateway":34000,"ledger":34000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10908","student":"251FA03438","gateway":29500,"ledger":29500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10909","student":"251FA03438","gateway":21000,"ledger":21000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10910","student":"251FA03973","gateway":34500,"ledger":34500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10911","student":"251FA03973","gateway":28500,"ledger":28500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10912","student":"251FA03894","gateway":36000,"ledger":36000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10913","student":"251FA03894","gateway":29500,"ledger":29500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10914","student":"251FA03556","gateway":47500,"ledger":47500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10915","student":"251FA03556","gateway":41500,"ledger":41500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10916","student":"251FA03556","gateway":29500,"ledger":29500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10917","student":"251FA03499","gateway":33500,"ledger":33500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10918","student":"251FA03499","gateway":29500,"ledger":29500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10919","student":"251FA03499","gateway":21000,"ledger":21000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10920","student":"251FA03880","gateway":44000,"ledger":44000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10921","student":"251FA03880","gateway":36000,"ledger":36000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10922","student":"251FA03788","gateway":34500,"ledger":34500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10923","student":"251FA03788","gateway":28500,"ledger":28500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10924","student":"251FA03705","gateway":58000,"ledger":58000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10925","student":"251FA03705","gateway":51000,"ledger":51000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10926","student":"251FA03705","gateway":36000,"ledger":36000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10927","student":"251FA03356","gateway":36000,"ledger":36000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10928","student":"251FA03356","gateway":29500,"ledger":29500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10929","student":"251FA03361","gateway":35500,"ledger":35500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10930","student":"251FA03361","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10931","student":"251FA03244","gateway":40500,"ledger":40500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10932","student":"251FA03244","gateway":35500,"ledger":35500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10933","student":"251FA03244","gateway":25000,"ledger":25000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10934","student":"251FA03810","gateway":38000,"ledger":38000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10935","student":"251FA03810","gateway":33000,"ledger":33000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10936","student":"251FA03810","gateway":23500,"ledger":23500,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10937","student":"251FA03366","gateway":41000,"ledger":41000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10938","student":"251FA03366","gateway":35500,"ledger":35500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10939","student":"251FA03366","gateway":25500,"ledger":25500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10940","student":"251FA03998","gateway":54000,"ledger":54000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10941","student":"251FA03998","gateway":47500,"ledger":47500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10942","student":"251FA03998","gateway":34000,"ledger":34000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10943","student":"251FA03164","gateway":40500,"ledger":40500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10944","student":"251FA03164","gateway":33500,"ledger":33500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10945","student":"251FA03377","gateway":44500,"ledger":44500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10946","student":"251FA03377","gateway":39000,"ledger":39000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10947","student":"251FA03377","gateway":28000,"ledger":28000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10948","student":"251FA03329","gateway":53500,"ledger":53500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10949","student":"251FA03329","gateway":46500,"ledger":46500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10950","student":"251FA03329","gateway":33500,"ledger":33500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10951","student":"251FA03229","gateway":58500,"ledger":58500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10952","student":"251FA03229","gateway":51000,"ledger":51000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10953","student":"251FA03229","gateway":36500,"ledger":36500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10954","student":"251FA03359","gateway":41500,"ledger":41500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10955","student":"251FA03359","gateway":33500,"ledger":33500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10956","student":"251FA03025","gateway":23500,"ledger":23500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10957","student":"251FA03025","gateway":19500,"ledger":19500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10958","student":"251FA03576","gateway":36000,"ledger":36000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10959","student":"251FA03576","gateway":29000,"ledger":29000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10960","student":"251FA03575","gateway":49000,"ledger":49000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10961","student":"251FA03575","gateway":42500,"ledger":42500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10962","student":"251FA03575","gateway":30500,"ledger":30500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10963","student":"251FA03704","gateway":54000,"ledger":54000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10964","student":"251FA03704","gateway":47500,"ledger":47500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10965","student":"251FA03704","gateway":33500,"ledger":33500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10966","student":"251FA03058","gateway":1000,"ledger":1000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10967","student":"251FA03052","gateway":34000,"ledger":34000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10968","student":"251FA03052","gateway":28000,"ledger":28000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10969","student":"251FA03949","gateway":32500,"ledger":32500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10970","student":"251FA03949","gateway":28500,"ledger":28500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10971","student":"251FA03949","gateway":20000,"ledger":20000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10972","student":"251FA03311","gateway":58500,"ledger":58500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10973","student":"251FA03311","gateway":51000,"ledger":51000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10974","student":"251FA03311","gateway":36500,"ledger":36500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10975","student":"251FA03113","gateway":44000,"ledger":44000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10976","student":"251FA03113","gateway":36000,"ledger":36000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10977","student":"251FA03271","gateway":54000,"ledger":54000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10978","student":"251FA03271","gateway":47500,"ledger":47500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10979","student":"251FA03271","gateway":33500,"ledger":33500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10980","student":"251FA03324","gateway":49000,"ledger":49000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10981","student":"251FA03324","gateway":42500,"ledger":42500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10982","student":"251FA03324","gateway":30500,"ledger":30500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10983","student":"251FA03476","gateway":35500,"ledger":35500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10984","student":"251FA03476","gateway":31000,"ledger":31000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10985","student":"251FA03476","gateway":22000,"ledger":22000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10986","student":"251FA03956","gateway":43500,"ledger":43500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10987","student":"251FA03956","gateway":38000,"ledger":38000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10988","student":"251FA03956","gateway":27500,"ledger":27500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10989","student":"251FA03242","gateway":33500,"ledger":33500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-10990","student":"251FA03013","gateway":26500,"ledger":26500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10991","student":"251FA03013","gateway":21500,"ledger":21500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10992","student":"251FA03043","gateway":33500,"ledger":33500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10993","student":"251FA03043","gateway":27000,"ledger":27000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10994","student":"251FA03728","gateway":28000,"ledger":28000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10995","student":"251FA03023","gateway":35000,"ledger":35000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-10996","student":"251FA03023","gateway":30500,"ledger":30500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-10997","student":"251FA03023","gateway":22000,"ledger":22000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-10998","student":"251FA03446","gateway":24500,"ledger":24500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-10999","student":"251FA03820","gateway":23000,"ledger":23000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11000","student":"251FA03820","gateway":19000,"ledger":19000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11001","student":"251FA03670","gateway":500,"ledger":500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11002","student":"251FA03401","gateway":34000,"ledger":34000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11003","student":"251FA03401","gateway":28000,"ledger":28000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11004","student":"251FA03069","gateway":43500,"ledger":43500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11005","student":"251FA03069","gateway":35500,"ledger":35500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11006","student":"251FA03352","gateway":49000,"ledger":49000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11007","student":"251FA03352","gateway":43000,"ledger":43000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11008","student":"251FA03352","gateway":31000,"ledger":31000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11009","student":"251FA03543","gateway":58500,"ledger":58500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11010","student":"251FA03543","gateway":51000,"ledger":51000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11011","student":"251FA03543","gateway":36500,"ledger":36500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11012","student":"251FA03707","gateway":37500,"ledger":37500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11013","student":"251FA03707","gateway":31000,"ledger":31000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11014","student":"251FA03027","gateway":42500,"ledger":42500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11015","student":"251FA03027","gateway":35000,"ledger":35000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11016","student":"251FA03839","gateway":54000,"ledger":54000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11017","student":"251FA03839","gateway":47000,"ledger":47000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11018","student":"251FA03839","gateway":33500,"ledger":33500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11019","student":"251FA03940","gateway":29500,"ledger":29500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11020","student":"251FA03940","gateway":24500,"ledger":24500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11021","student":"251FA03620","gateway":38000,"ledger":38000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11022","student":"251FA03620","gateway":33000,"ledger":33000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11023","student":"251FA03620","gateway":23500,"ledger":23500,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11024","student":"251FA03362","gateway":50000,"ledger":50000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11025","student":"251FA03362","gateway":43500,"ledger":43500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11026","student":"251FA03362","gateway":31000,"ledger":31000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11027","student":"251FA03365","gateway":41000,"ledger":41000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11028","student":"251FA03365","gateway":35500,"ledger":35500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11029","student":"251FA03365","gateway":25500,"ledger":25500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11030","student":"251FA03116","gateway":52500,"ledger":52500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11031","student":"251FA03116","gateway":46000,"ledger":46000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11032","student":"251FA03116","gateway":32500,"ledger":32500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11033","student":"251FA02424","gateway":1500,"ledger":1500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11034","student":"251FA02402","gateway":40000,"ledger":40000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11035","student":"251FA02402","gateway":35000,"ledger":35000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11036","student":"251FA02402","gateway":25000,"ledger":25000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11037","student":"251FA02253","gateway":39500,"ledger":39500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11038","student":"251FA02253","gateway":32000,"ledger":32000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11039","student":"251FA02576","gateway":47500,"ledger":47500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11040","student":"251FA02576","gateway":41500,"ledger":41500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11041","student":"251FA02576","gateway":30000,"ledger":30000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11042","student":"251FA02739","gateway":54000,"ledger":54000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11043","student":"251FA02739","gateway":47500,"ledger":47500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11044","student":"251FA02739","gateway":34000,"ledger":34000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11045","student":"251FA02189","gateway":46000,"ledger":46000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11046","student":"251FA02189","gateway":40000,"ledger":40000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11047","student":"251FA02189","gateway":28500,"ledger":28500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11048","student":"251FA02661","gateway":56000,"ledger":56000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11049","student":"251FA02661","gateway":49000,"ledger":49000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11050","student":"251FA02661","gateway":35500,"ledger":35500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11051","student":"251FA02312","gateway":52000,"ledger":52000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11052","student":"251FA02312","gateway":45500,"ledger":45500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11053","student":"251FA02312","gateway":32000,"ledger":32000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11054","student":"251FA02068","gateway":39000,"ledger":39000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11055","student":"251FA02068","gateway":31500,"ledger":31500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11056","student":"251FA02504","gateway":32500,"ledger":32500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11057","student":"251FA02504","gateway":28500,"ledger":28500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11058","student":"251FA02504","gateway":20000,"ledger":20000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11059","student":"251FA02966","gateway":34000,"ledger":34000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11060","student":"251FA02966","gateway":28000,"ledger":28000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11061","student":"251FA02393","gateway":41000,"ledger":41000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11062","student":"251FA02393","gateway":36000,"ledger":36000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11063","student":"251FA02393","gateway":25500,"ledger":25500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11064","student":"251FA02149","gateway":43000,"ledger":43000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11065","student":"251FA02149","gateway":37500,"ledger":37500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11066","student":"251FA02149","gateway":27000,"ledger":27000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11067","student":"251FA02185","gateway":54500,"ledger":54500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11068","student":"251FA02185","gateway":47500,"ledger":47500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11069","student":"251FA02185","gateway":34000,"ledger":34000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11070","student":"251FA02006","gateway":42000,"ledger":42000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11071","student":"251FA02006","gateway":34000,"ledger":34000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11072","student":"251FA02963","gateway":40000,"ledger":40000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11073","student":"251FA02963","gateway":33000,"ledger":33000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11074","student":"251FA02717","gateway":33500,"ledger":33500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11075","student":"251FA02717","gateway":29500,"ledger":29500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11076","student":"251FA02717","gateway":21000,"ledger":21000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11077","student":"251FA02672","gateway":36000,"ledger":36000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11078","student":"251FA02672","gateway":29500,"ledger":29500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11079","student":"251FA02197","gateway":23500,"ledger":23500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11080","student":"251FA02197","gateway":19000,"ledger":19000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11081","student":"251FA02571","gateway":39500,"ledger":39500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11082","student":"251FA02571","gateway":32000,"ledger":32000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11083","student":"251FA02067","gateway":43500,"ledger":43500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11084","student":"251FA02067","gateway":35500,"ledger":35500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11085","student":"251FA02552","gateway":36000,"ledger":36000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11086","student":"251FA02552","gateway":31500,"ledger":31500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11087","student":"251FA02552","gateway":22000,"ledger":22000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11088","student":"251FA02992","gateway":40000,"ledger":40000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11089","student":"251FA02992","gateway":33000,"ledger":33000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11090","student":"251FA02235","gateway":52000,"ledger":52000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11091","student":"251FA02235","gateway":45500,"ledger":45500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11092","student":"251FA02235","gateway":32500,"ledger":32500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11093","student":"251FA02718","gateway":42000,"ledger":42000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11094","student":"251FA02718","gateway":37000,"ledger":37000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11095","student":"251FA02718","gateway":26500,"ledger":26500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11096","student":"251FA02793","gateway":25000,"ledger":25000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11097","student":"251FA02793","gateway":20000,"ledger":20000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11098","student":"251FA02061","gateway":42000,"ledger":42000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11099","student":"251FA02061","gateway":37000,"ledger":37000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11100","student":"251FA02061","gateway":26000,"ledger":26000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11101","student":"251FA02984","gateway":34500,"ledger":34500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11102","student":"251FA02236","gateway":22000,"ledger":22000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11103","student":"251FA02236","gateway":18000,"ledger":18000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11104","student":"251FA02752","gateway":35000,"ledger":35000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11105","student":"251FA02752","gateway":30500,"ledger":30500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11106","student":"251FA02752","gateway":21500,"ledger":21500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11107","student":"251FA02039","gateway":52000,"ledger":52000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11108","student":"251FA02039","gateway":45500,"ledger":45500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11109","student":"251FA02039","gateway":32500,"ledger":32500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11110","student":"251FA02946","gateway":52000,"ledger":52000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11111","student":"251FA02946","gateway":45500,"ledger":45500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11112","student":"251FA02946","gateway":32500,"ledger":32500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11113","student":"251FA02762","gateway":28000,"ledger":28000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11114","student":"251FA02762","gateway":22500,"ledger":22500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11115","student":"251FA02509","gateway":50500,"ledger":50500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11116","student":"251FA02509","gateway":44500,"ledger":44500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11117","student":"251FA02509","gateway":31500,"ledger":31500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11118","student":"251FA02664","gateway":34500,"ledger":34500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11119","student":"251FA02323","gateway":47500,"ledger":47500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11120","student":"251FA02323","gateway":41500,"ledger":41500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11121","student":"251FA02323","gateway":30000,"ledger":30000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11122","student":"251FA02261","gateway":44000,"ledger":44000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11123","student":"251FA02261","gateway":38500,"ledger":38500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11124","student":"251FA02261","gateway":28000,"ledger":28000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11125","student":"251FA02031","gateway":44000,"ledger":44000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11126","student":"251FA02031","gateway":36000,"ledger":36000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11127","student":"251FA02614","gateway":36000,"ledger":36000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11128","student":"251FA02614","gateway":31500,"ledger":31500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11129","student":"251FA02614","gateway":23000,"ledger":23000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11130","student":"251FA02828","gateway":54000,"ledger":54000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11131","student":"251FA02828","gateway":47500,"ledger":47500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11132","student":"251FA02828","gateway":34000,"ledger":34000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11133","student":"251FA02919","gateway":36000,"ledger":36000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11134","student":"251FA02919","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11135","student":"251FA02543","gateway":43000,"ledger":43000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11136","student":"251FA02543","gateway":35500,"ledger":35500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11137","student":"251FA02823","gateway":34500,"ledger":34500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11138","student":"251FA02534","gateway":39500,"ledger":39500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11139","student":"251FA02534","gateway":34500,"ledger":34500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11140","student":"251FA02534","gateway":24500,"ledger":24500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11141","student":"251FA02662","gateway":1000,"ledger":1000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11142","student":"251FA02539","gateway":43000,"ledger":43000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11143","student":"251FA02539","gateway":35000,"ledger":35000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11144","student":"251FA02319","gateway":35000,"ledger":35000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11145","student":"251FA02319","gateway":30500,"ledger":30500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11146","student":"251FA02319","gateway":22000,"ledger":22000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11147","student":"251FA02784","gateway":34000,"ledger":34000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11148","student":"251FA02784","gateway":27500,"ledger":27500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11149","student":"251FA02501","gateway":42500,"ledger":42500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11150","student":"251FA02501","gateway":34500,"ledger":34500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11151","student":"251FA02176","gateway":34500,"ledger":34500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11152","student":"251FA02176","gateway":28000,"ledger":28000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11153","student":"251FA02887","gateway":35000,"ledger":35000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11154","student":"251FA02887","gateway":31000,"ledger":31000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11155","student":"251FA02887","gateway":22000,"ledger":22000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11156","student":"251FA05512","gateway":34500,"ledger":34500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11157","student":"251FA05512","gateway":28000,"ledger":28000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11158","student":"251FA05468","gateway":33000,"ledger":33000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11159","student":"251FA05468","gateway":29000,"ledger":29000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11160","student":"251FA05468","gateway":21000,"ledger":21000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11161","student":"251FA05824","gateway":55000,"ledger":55000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11162","student":"251FA05824","gateway":48000,"ledger":48000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11163","student":"251FA05824","gateway":34500,"ledger":34500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11164","student":"251FA05104","gateway":43000,"ledger":43000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11165","student":"251FA05104","gateway":37500,"ledger":37500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11166","student":"251FA05104","gateway":27000,"ledger":27000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11167","student":"251FA05487","gateway":41000,"ledger":41000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11168","student":"251FA05487","gateway":36000,"ledger":36000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11169","student":"251FA05487","gateway":25500,"ledger":25500,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11170","student":"251FA05984","gateway":41500,"ledger":41500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11171","student":"251FA05984","gateway":36000,"ledger":36000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11172","student":"251FA05984","gateway":26000,"ledger":26000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11173","student":"251FA05827","gateway":33000,"ledger":33000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11174","student":"251FA05319","gateway":21500,"ledger":21500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11175","student":"251FA05133","gateway":42000,"ledger":42000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11176","student":"251FA05133","gateway":34000,"ledger":34000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11177","student":"251FA05991","gateway":43500,"ledger":43500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11178","student":"251FA05991","gateway":38000,"ledger":38000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11179","student":"251FA05991","gateway":27000,"ledger":27000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11180","student":"251FA05948","gateway":41000,"ledger":41000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11181","student":"251FA05948","gateway":35500,"ledger":35500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11182","student":"251FA05948","gateway":25500,"ledger":25500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11183","student":"251FA05682","gateway":1500,"ledger":1500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11184","student":"251FA05154","gateway":23000,"ledger":23000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11185","student":"251FA05154","gateway":19000,"ledger":19000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11186","student":"251FA05687","gateway":42000,"ledger":42000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11187","student":"251FA05687","gateway":37000,"ledger":37000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11188","student":"251FA05687","gateway":26500,"ledger":26500,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11189","student":"251FA05828","gateway":1500,"ledger":1500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11190","student":"251FA05373","gateway":41000,"ledger":41000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11191","student":"251FA05373","gateway":36000,"ledger":36000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11192","student":"251FA05373","gateway":25500,"ledger":25500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11193","student":"251FA05474","gateway":41000,"ledger":41000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11194","student":"251FA05474","gateway":35500,"ledger":35500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11195","student":"251FA05474","gateway":25500,"ledger":25500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11196","student":"251FA05708","gateway":28000,"ledger":28000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11197","student":"251FA05708","gateway":23000,"ledger":23000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11198","student":"251FA05232","gateway":40500,"ledger":40500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11199","student":"251FA05232","gateway":35500,"ledger":35500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11200","student":"251FA05232","gateway":25000,"ledger":25000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11201","student":"251FA05067","gateway":29000,"ledger":29000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11202","student":"251FA05067","gateway":24000,"ledger":24000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11203","student":"251FA05640","gateway":48500,"ledger":48500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11204","student":"251FA05640","gateway":42500,"ledger":42500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11205","student":"251FA05640","gateway":30000,"ledger":30000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11206","student":"251FA05622","gateway":49500,"ledger":49500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11207","student":"251FA05622","gateway":43500,"ledger":43500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11208","student":"251FA05622","gateway":31000,"ledger":31000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11209","student":"251FA05102","gateway":44000,"ledger":44000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11210","student":"251FA05102","gateway":38500,"ledger":38500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11211","student":"251FA05102","gateway":28000,"ledger":28000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11212","student":"251FA05041","gateway":1500,"ledger":1500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11213","student":"251FA05539","gateway":46000,"ledger":46000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11214","student":"251FA05539","gateway":40000,"ledger":40000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11215","student":"251FA05539","gateway":28500,"ledger":28500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11216","student":"251FA05500","gateway":54500,"ledger":54500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11217","student":"251FA05500","gateway":48000,"ledger":48000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11218","student":"251FA05500","gateway":34000,"ledger":34000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11219","student":"251FA05506","gateway":49000,"ledger":49000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11220","student":"251FA05506","gateway":42500,"ledger":42500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11221","student":"251FA05506","gateway":30500,"ledger":30500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11222","student":"251FA05129","gateway":44500,"ledger":44500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11223","student":"251FA05129","gateway":39000,"ledger":39000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11224","student":"251FA05129","gateway":27500,"ledger":27500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11225","student":"251FA05053","gateway":38500,"ledger":38500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11226","student":"251FA05053","gateway":33500,"ledger":33500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11227","student":"251FA05053","gateway":24000,"ledger":24000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11228","student":"251FA05874","gateway":22500,"ledger":22500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11229","student":"251FA05874","gateway":18000,"ledger":18000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11230","student":"251FA05250","gateway":42000,"ledger":42000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11231","student":"251FA05250","gateway":34000,"ledger":34000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11232","student":"251FA05871","gateway":23500,"ledger":23500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11233","student":"251FA05871","gateway":19000,"ledger":19000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11234","student":"251FA05005","gateway":1000,"ledger":1000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11235","student":"251FA05609","gateway":27000,"ledger":27000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11236","student":"251FA05609","gateway":22000,"ledger":22000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11237","student":"251FA05501","gateway":37500,"ledger":37500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11238","student":"251FA05501","gateway":32500,"ledger":32500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11239","student":"251FA05501","gateway":23500,"ledger":23500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11240","student":"251FA05788","gateway":26000,"ledger":26000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11241","student":"251FA05788","gateway":21000,"ledger":21000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11242","student":"251FA05473","gateway":53500,"ledger":53500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11243","student":"251FA05473","gateway":46500,"ledger":46500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11244","student":"251FA05473","gateway":33500,"ledger":33500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11245","student":"251FA05738","gateway":50500,"ledger":50500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11246","student":"251FA05738","gateway":44000,"ledger":44000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11247","student":"251FA05738","gateway":31500,"ledger":31500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11248","student":"251FA05842","gateway":1000,"ledger":1000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11249","student":"251FA05069","gateway":54500,"ledger":54500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11250","student":"251FA05069","gateway":48000,"ledger":48000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11251","student":"251FA05069","gateway":34000,"ledger":34000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11252","student":"251FA05848","gateway":27000,"ledger":27000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11253","student":"251FA05762","gateway":33000,"ledger":33000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11254","student":"251FA05762","gateway":28500,"ledger":28500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11255","student":"251FA05762","gateway":20500,"ledger":20500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11256","student":"251FA05103","gateway":32500,"ledger":32500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11257","student":"251FA05103","gateway":28500,"ledger":28500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11258","student":"251FA05103","gateway":20000,"ledger":20000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11259","student":"251FA05597","gateway":40500,"ledger":40500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11260","student":"251FA05597","gateway":35500,"ledger":35500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11261","student":"251FA05597","gateway":25500,"ledger":25500,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11262","student":"251FA05249","gateway":39000,"ledger":39000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11263","student":"251FA05249","gateway":34000,"ledger":34000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11264","student":"251FA05249","gateway":24000,"ledger":24000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11265","student":"251FA05176","gateway":53500,"ledger":53500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11266","student":"251FA05176","gateway":46500,"ledger":46500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11267","student":"251FA05176","gateway":33500,"ledger":33500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11268","student":"251FA05980","gateway":500,"ledger":500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11269","student":"251FA05734","gateway":55000,"ledger":55000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11270","student":"251FA05734","gateway":48000,"ledger":48000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11271","student":"251FA05734","gateway":34000,"ledger":34000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11272","student":"251FA05296","gateway":32500,"ledger":32500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11273","student":"251FA05296","gateway":28500,"ledger":28500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11274","student":"251FA05296","gateway":20000,"ledger":20000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11275","student":"251FA05394","gateway":34000,"ledger":34000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11276","student":"251FA05394","gateway":27500,"ledger":27500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11277","student":"251FA05858","gateway":19500,"ledger":19500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11278","student":"251FA05858","gateway":16000,"ledger":16000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11279","student":"251FA05028","gateway":32000,"ledger":32000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11280","student":"251FA05805","gateway":55000,"ledger":55000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11281","student":"251FA05805","gateway":48500,"ledger":48500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11282","student":"251FA05805","gateway":34500,"ledger":34500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11283","student":"251FA05614","gateway":55000,"ledger":55000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11284","student":"251FA05614","gateway":48500,"ledger":48500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11285","student":"251FA05614","gateway":34500,"ledger":34500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11286","student":"251FA05651","gateway":25500,"ledger":25500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11287","student":"251FA05651","gateway":20500,"ledger":20500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11288","student":"251FA05411","gateway":23000,"ledger":23000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11289","student":"251FA05411","gateway":19000,"ledger":19000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11290","student":"251FA05055","gateway":54500,"ledger":54500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11291","student":"251FA05055","gateway":47500,"ledger":47500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11292","student":"251FA05055","gateway":34000,"ledger":34000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11293","student":"251FA05401","gateway":33500,"ledger":33500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11294","student":"251FA05401","gateway":27000,"ledger":27000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11295","student":"251FA05947","gateway":34500,"ledger":34500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11296","student":"251FA05947","gateway":30500,"ledger":30500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11297","student":"251FA05947","gateway":21500,"ledger":21500,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11298","student":"251FA05706","gateway":46500,"ledger":46500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11299","student":"251FA05706","gateway":40500,"ledger":40500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11300","student":"251FA05706","gateway":29000,"ledger":29000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11301","student":"251FA05761","gateway":33000,"ledger":33000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11302","student":"251FA05761","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11303","student":"251FA05761","gateway":21000,"ledger":21000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11304","student":"251FA05696","gateway":28000,"ledger":28000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11305","student":"251FA05696","gateway":23000,"ledger":23000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11306","student":"251FA06967","gateway":37000,"ledger":37000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11307","student":"251FA06967","gateway":30000,"ledger":30000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11308","student":"251FA06325","gateway":23500,"ledger":23500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11309","student":"251FA06325","gateway":19000,"ledger":19000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11310","student":"251FA06254","gateway":33000,"ledger":33000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11311","student":"251FA06254","gateway":29000,"ledger":29000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11312","student":"251FA06254","gateway":20500,"ledger":20500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11313","student":"251FA06081","gateway":35000,"ledger":35000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11314","student":"251FA06784","gateway":29500,"ledger":29500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11315","student":"251FA06784","gateway":24000,"ledger":24000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11316","student":"251FA06619","gateway":55000,"ledger":55000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11317","student":"251FA06619","gateway":48000,"ledger":48000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11318","student":"251FA06619","gateway":34500,"ledger":34500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11319","student":"251FA06902","gateway":500,"ledger":500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11320","student":"251FA06563","gateway":37000,"ledger":37000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11321","student":"251FA06563","gateway":30000,"ledger":30000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11322","student":"251FA06529","gateway":1500,"ledger":1500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11323","student":"251FA06011","gateway":22000,"ledger":22000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11324","student":"251FA06011","gateway":18000,"ledger":18000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11325","student":"251FA06774","gateway":45500,"ledger":45500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11326","student":"251FA06774","gateway":40000,"ledger":40000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11327","student":"251FA06774","gateway":28500,"ledger":28500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11328","student":"251FA06740","gateway":30500,"ledger":30500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11329","student":"251FA06876","gateway":33500,"ledger":33500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11330","student":"251FA06876","gateway":27000,"ledger":27000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11331","student":"251FA06384","gateway":33500,"ledger":33500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11332","student":"251FA06395","gateway":39500,"ledger":39500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11333","student":"251FA06395","gateway":32500,"ledger":32500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11334","student":"251FA06901","gateway":45500,"ledger":45500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11335","student":"251FA06901","gateway":39500,"ledger":39500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11336","student":"251FA06901","gateway":28500,"ledger":28500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11337","student":"251FA06077","gateway":33000,"ledger":33000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11338","student":"251FA06077","gateway":27000,"ledger":27000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11339","student":"251FA06979","gateway":40500,"ledger":40500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11340","student":"251FA06979","gateway":35500,"ledger":35500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11341","student":"251FA06979","gateway":25500,"ledger":25500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11342","student":"251FA06741","gateway":32500,"ledger":32500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11343","student":"251FA06741","gateway":28500,"ledger":28500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11344","student":"251FA06741","gateway":20500,"ledger":20500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11345","student":"251FA06713","gateway":49500,"ledger":49500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11346","student":"251FA06713","gateway":43500,"ledger":43500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11347","student":"251FA06713","gateway":31000,"ledger":31000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11348","student":"251FA06894","gateway":23000,"ledger":23000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11349","student":"251FA06894","gateway":19000,"ledger":19000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11350","student":"251FA06489","gateway":29000,"ledger":29000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11351","student":"251FA06489","gateway":23500,"ledger":23500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11352","student":"251FA06479","gateway":37000,"ledger":37000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11353","student":"251FA06479","gateway":30500,"ledger":30500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11354","student":"251FA06419","gateway":33500,"ledger":33500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11355","student":"251FA06999","gateway":31000,"ledger":31000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11356","student":"251FA06999","gateway":25500,"ledger":25500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11357","student":"251FA06882","gateway":24000,"ledger":24000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11358","student":"251FA06882","gateway":20000,"ledger":20000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11359","student":"251FA06918","gateway":55000,"ledger":55000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11360","student":"251FA06918","gateway":48000,"ledger":48000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11361","student":"251FA06918","gateway":34500,"ledger":34500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11362","student":"251FA06170","gateway":50000,"ledger":50000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11363","student":"251FA06170","gateway":43500,"ledger":43500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11364","student":"251FA06170","gateway":31000,"ledger":31000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11365","student":"251FA06556","gateway":45000,"ledger":45000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11366","student":"251FA06556","gateway":39000,"ledger":39000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11367","student":"251FA06556","gateway":28000,"ledger":28000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11368","student":"251FA06637","gateway":45000,"ledger":45000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11369","student":"251FA06637","gateway":39500,"ledger":39500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11370","student":"251FA06637","gateway":28000,"ledger":28000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11371","student":"251FA06788","gateway":37500,"ledger":37500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11372","student":"251FA06788","gateway":33000,"ledger":33000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11373","student":"251FA06788","gateway":23500,"ledger":23500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11374","student":"251FA06163","gateway":38000,"ledger":38000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11375","student":"251FA06163","gateway":31000,"ledger":31000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11376","student":"251FA06602","gateway":46000,"ledger":46000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11377","student":"251FA06602","gateway":40500,"ledger":40500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11378","student":"251FA06602","gateway":28500,"ledger":28500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11379","student":"251FA06980","gateway":39500,"ledger":39500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11380","student":"251FA06980","gateway":34500,"ledger":34500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11381","student":"251FA06980","gateway":24500,"ledger":24500,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11382","student":"251FA06305","gateway":37500,"ledger":37500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11383","student":"251FA06305","gateway":30500,"ledger":30500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11384","student":"251FA06575","gateway":35000,"ledger":35000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11385","student":"251FA06575","gateway":30500,"ledger":30500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11386","student":"251FA06575","gateway":21500,"ledger":21500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11387","student":"251FA06518","gateway":31000,"ledger":31000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11388","student":"251FA06518","gateway":25000,"ledger":25000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11389","student":"251FA07504","gateway":24500,"ledger":24500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11390","student":"251FA07504","gateway":20000,"ledger":20000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11391","student":"251FA07572","gateway":20500,"ledger":20500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11392","student":"251FA07572","gateway":16500,"ledger":16500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11393","student":"251FA07808","gateway":53500,"ledger":53500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11394","student":"251FA07808","gateway":46500,"ledger":46500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11395","student":"251FA07808","gateway":33500,"ledger":33500,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11396","student":"251FA07402","gateway":51000,"ledger":51000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11397","student":"251FA07402","gateway":45000,"ledger":45000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11398","student":"251FA07402","gateway":32000,"ledger":32000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11399","student":"251FA07359","gateway":43000,"ledger":43000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11400","student":"251FA07359","gateway":35500,"ledger":35500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11401","student":"251FA07636","gateway":29500,"ledger":29500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11402","student":"251FA07636","gateway":24500,"ledger":24500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11403","student":"251FA07403","gateway":44000,"ledger":44000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11404","student":"251FA07403","gateway":38500,"ledger":38500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11405","student":"251FA07403","gateway":27500,"ledger":27500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11406","student":"251FA07002","gateway":49000,"ledger":49000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11407","student":"251FA07002","gateway":42500,"ledger":42500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11408","student":"251FA07002","gateway":30500,"ledger":30500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11409","student":"251FA07410","gateway":40500,"ledger":40500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11410","student":"251FA07410","gateway":33000,"ledger":33000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11411","student":"251FA07185","gateway":34500,"ledger":34500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11412","student":"251FA07132","gateway":23000,"ledger":23000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11413","student":"251FA07132","gateway":19000,"ledger":19000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11414","student":"251FA07547","gateway":1000,"ledger":1000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11415","student":"251FA07652","gateway":33500,"ledger":33500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11416","student":"251FA07652","gateway":29500,"ledger":29500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11417","student":"251FA07652","gateway":21000,"ledger":21000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11418","student":"251FA07518","gateway":1000,"ledger":1000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11419","student":"251FA07839","gateway":58000,"ledger":58000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11420","student":"251FA07839","gateway":51000,"ledger":51000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11421","student":"251FA07839","gateway":36000,"ledger":36000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11422","student":"251FA07313","gateway":35000,"ledger":35000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11423","student":"251FA07313","gateway":31000,"ledger":31000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11424","student":"251FA07313","gateway":22000,"ledger":22000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11425","student":"251FA07266","gateway":58000,"ledger":58000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11426","student":"251FA07266","gateway":50500,"ledger":50500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11427","student":"251FA07266","gateway":36000,"ledger":36000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11428","student":"251FA07548","gateway":40500,"ledger":40500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11429","student":"251FA07548","gateway":33500,"ledger":33500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11430","student":"251FA07961","gateway":50000,"ledger":50000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11431","student":"251FA07961","gateway":43500,"ledger":43500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11432","student":"251FA07961","gateway":31000,"ledger":31000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11433","student":"251FA07742","gateway":41500,"ledger":41500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11434","student":"251FA07742","gateway":36500,"ledger":36500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11435","student":"251FA07742","gateway":26000,"ledger":26000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11436","student":"251FA07009","gateway":51000,"ledger":51000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11437","student":"251FA07009","gateway":45000,"ledger":45000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11438","student":"251FA07009","gateway":32000,"ledger":32000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11439","student":"251FA07982","gateway":54000,"ledger":54000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11440","student":"251FA07982","gateway":47000,"ledger":47000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11441","student":"251FA07982","gateway":33500,"ledger":33500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11442","student":"251FA07533","gateway":49500,"ledger":49500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11443","student":"251FA07533","gateway":43500,"ledger":43500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11444","student":"251FA07533","gateway":31000,"ledger":31000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11445","student":"251FA07541","gateway":58000,"ledger":58000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11446","student":"251FA07541","gateway":51000,"ledger":51000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11447","student":"251FA07541","gateway":36500,"ledger":36500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11448","student":"251FA07515","gateway":24000,"ledger":24000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11449","student":"251FA07515","gateway":19500,"ledger":19500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11450","student":"251FA07483","gateway":1000,"ledger":1000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11451","student":"251FA07696","gateway":40000,"ledger":40000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11452","student":"251FA07696","gateway":35000,"ledger":35000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11453","student":"251FA07696","gateway":25500,"ledger":25500,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11454","student":"251FA07018","gateway":35000,"ledger":35000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11455","student":"251FA07015","gateway":29000,"ledger":29000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11456","student":"251FA07015","gateway":23500,"ledger":23500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11457","student":"251FA07651","gateway":32500,"ledger":32500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11458","student":"251FA07651","gateway":26500,"ledger":26500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11459","student":"251FA07628","gateway":38000,"ledger":38000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11460","student":"251FA07628","gateway":31500,"ledger":31500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11461","student":"251FA07746","gateway":33500,"ledger":33500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11462","student":"251FA07746","gateway":29000,"ledger":29000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11463","student":"251FA07746","gateway":21000,"ledger":21000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11464","student":"251FA07438","gateway":36500,"ledger":36500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11465","student":"251FA07438","gateway":30000,"ledger":30000,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11466","student":"251FA07904","gateway":43000,"ledger":43000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11467","student":"251FA07904","gateway":38000,"ledger":38000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11468","student":"251FA07904","gateway":27000,"ledger":27000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11469","student":"251FA07022","gateway":40000,"ledger":40000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11470","student":"251FA07022","gateway":33000,"ledger":33000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11471","student":"251FA07647","gateway":20500,"ledger":20500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11472","student":"251FA07647","gateway":17000,"ledger":17000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11473","student":"251FA07098","gateway":58000,"ledger":58000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11474","student":"251FA07098","gateway":50500,"ledger":50500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11475","student":"251FA07098","gateway":36000,"ledger":36000,"date":"10 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11476","student":"251FA07454","gateway":48500,"ledger":48500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11477","student":"251FA07454","gateway":42500,"ledger":42500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11478","student":"251FA07454","gateway":30500,"ledger":30500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11479","student":"251FA09421","gateway":70500,"ledger":70500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11480","student":"251FA09421","gateway":61500,"ledger":61500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11481","student":"251FA09421","gateway":44000,"ledger":44000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11482","student":"251FA09730","gateway":58000,"ledger":58000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11483","student":"251FA09730","gateway":51000,"ledger":51000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11484","student":"251FA09730","gateway":36500,"ledger":36500,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11485","student":"251FA09170","gateway":68000,"ledger":68000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11486","student":"251FA09170","gateway":59500,"ledger":59500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11487","student":"251FA09170","gateway":42000,"ledger":42000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11488","student":"251FA09911","gateway":41000,"ledger":41000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11489","student":"251FA09911","gateway":33500,"ledger":33500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11490","student":"251FA09162","gateway":76000,"ledger":76000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11491","student":"251FA09162","gateway":66500,"ledger":66500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11492","student":"251FA09162","gateway":47000,"ledger":47000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11493","student":"251FA09369","gateway":73500,"ledger":73500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11494","student":"251FA09369","gateway":64000,"ledger":64000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11495","student":"251FA09369","gateway":46000,"ledger":46000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11496","student":"251FA09120","gateway":34500,"ledger":34500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11497","student":"251FA09120","gateway":30500,"ledger":30500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11498","student":"251FA09120","gateway":21500,"ledger":21500,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11499","student":"251FA09080","gateway":36000,"ledger":36000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11500","student":"251FA09080","gateway":31500,"ledger":31500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11501","student":"251FA09080","gateway":22000,"ledger":22000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11502","student":"251FA09004","gateway":67000,"ledger":67000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11503","student":"251FA09004","gateway":58500,"ledger":58500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11504","student":"251FA09004","gateway":41500,"ledger":41500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11505","student":"251FA09781","gateway":35500,"ledger":35500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11506","student":"251FA09781","gateway":29000,"ledger":29000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11507","student":"251FA09115","gateway":77500,"ledger":77500,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11508","student":"251FA09115","gateway":67500,"ledger":67500,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11509","student":"251FA09115","gateway":48500,"ledger":48500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11510","student":"251FA09544","gateway":31500,"ledger":31500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11511","student":"251FA09544","gateway":25500,"ledger":25500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11512","student":"251FA09743","gateway":70000,"ledger":70000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11513","student":"251FA09743","gateway":61500,"ledger":61500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11514","student":"251FA09743","gateway":44000,"ledger":44000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11515","student":"251FA09660","gateway":28000,"ledger":28000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11516","student":"251FA09660","gateway":22500,"ledger":22500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11517","student":"251FA09606","gateway":73500,"ledger":73500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11518","student":"251FA09606","gateway":64000,"ledger":64000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11519","student":"251FA09606","gateway":46000,"ledger":46000,"date":"02 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11520","student":"251FA09880","gateway":31000,"ledger":31000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11521","student":"251FA09880","gateway":25500,"ledger":25500,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11522","student":"251FA09266","gateway":30500,"ledger":30500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11523","student":"251FA09266","gateway":25000,"ledger":25000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11524","student":"251FA09619","gateway":46500,"ledger":46500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11525","student":"251FA09619","gateway":40500,"ledger":40500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11526","student":"251FA09619","gateway":29000,"ledger":29000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11527","student":"251FA08184","gateway":33500,"ledger":33500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11528","student":"251FA08184","gateway":29500,"ledger":29500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11529","student":"251FA08184","gateway":21000,"ledger":21000,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11530","student":"251FA08116","gateway":36500,"ledger":36500,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11531","student":"251FA08116","gateway":29500,"ledger":29500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11532","student":"251FA08505","gateway":56000,"ledger":56000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11533","student":"251FA08505","gateway":49000,"ledger":49000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11534","student":"251FA08505","gateway":35000,"ledger":35000,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11535","student":"251FA08352","gateway":38000,"ledger":38000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11536","student":"251FA08352","gateway":31500,"ledger":31500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11537","student":"251FA08606","gateway":37000,"ledger":37000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11538","student":"251FA08606","gateway":30500,"ledger":30500,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11539","student":"251FA08397","gateway":28000,"ledger":28000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11540","student":"251FA08397","gateway":23000,"ledger":23000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11541","student":"251FA08288","gateway":37000,"ledger":37000,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11542","student":"251FA08288","gateway":30500,"ledger":30500,"date":"29 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11543","student":"251FA08772","gateway":41500,"ledger":41500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11544","student":"251FA08772","gateway":33500,"ledger":33500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11545","student":"251FA08632","gateway":39500,"ledger":39500,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11546","student":"251FA08632","gateway":32000,"ledger":32000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11547","student":"251FA08297","gateway":53000,"ledger":53000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11548","student":"251FA08297","gateway":46500,"ledger":46500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11549","student":"251FA08297","gateway":33000,"ledger":33000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11550","student":"251FA08959","gateway":32500,"ledger":32500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11551","student":"251FA08959","gateway":28500,"ledger":28500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11552","student":"251FA08959","gateway":20500,"ledger":20500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11553","student":"251FA08399","gateway":48500,"ledger":48500,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11554","student":"251FA08399","gateway":42500,"ledger":42500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11555","student":"251FA08399","gateway":30500,"ledger":30500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11556","student":"251FA08109","gateway":58000,"ledger":58000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11557","student":"251FA08109","gateway":51000,"ledger":51000,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11558","student":"251FA08109","gateway":36000,"ledger":36000,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11559","student":"251FA08624","gateway":34500,"ledger":34500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11560","student":"251FA08624","gateway":28000,"ledger":28000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11561","student":"251FA08858","gateway":26500,"ledger":26500,"date":"09 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11562","student":"251FA08963","gateway":56000,"ledger":56000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11563","student":"251FA08963","gateway":49000,"ledger":49000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11564","student":"251FA08963","gateway":35000,"ledger":35000,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11565","student":"251FA08765","gateway":56000,"ledger":56000,"date":"15 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11566","student":"251FA08765","gateway":49000,"ledger":49000,"date":"15 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11567","student":"251FA08765","gateway":35500,"ledger":35500,"date":"08 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11568","student":"251FA08143","gateway":41000,"ledger":41000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11569","student":"251FA08143","gateway":33500,"ledger":33500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11570","student":"251FA08883","gateway":43500,"ledger":43500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11571","student":"251FA08883","gateway":38000,"ledger":38000,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11572","student":"251FA08883","gateway":27500,"ledger":27500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11573","student":"251FA08261","gateway":23000,"ledger":23000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11574","student":"251FA08261","gateway":19000,"ledger":19000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11575","student":"251FA08259","gateway":34000,"ledger":34000,"date":"04 Sep 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11576","student":"251FA08259","gateway":29500,"ledger":29500,"date":"18 Aug 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11577","student":"251FA08259","gateway":21500,"ledger":21500,"date":"24 Jul 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11578","student":"251FA08927","gateway":22000,"ledger":22000,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11579","student":"251FA08927","gateway":18000,"ledger":18000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11580","student":"251FA08296","gateway":31000,"ledger":31000,"date":"28 Jun 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11581","student":"251FA08296","gateway":25000,"ledger":25000,"date":"10 Sep 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11582","student":"251FA08124","gateway":33500,"ledger":33500,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11583","student":"251FA08124","gateway":27500,"ledger":27500,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11584","student":"251FA08101","gateway":1500,"ledger":1500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11585","student":"251FA08750","gateway":58000,"ledger":58000,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11586","student":"251FA08750","gateway":51000,"ledger":51000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11587","student":"251FA08750","gateway":36000,"ledger":36000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11588","student":"251FA08031","gateway":43000,"ledger":43000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11589","student":"251FA08031","gateway":37500,"ledger":37500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11590","student":"251FA08031","gateway":26500,"ledger":26500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11591","student":"251FA08961","gateway":53000,"ledger":53000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11592","student":"251FA08961","gateway":46500,"ledger":46500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11593","student":"251FA08961","gateway":33000,"ledger":33000,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11594","student":"251FA08640","gateway":52500,"ledger":52500,"date":"09 Sep 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11595","student":"251FA08640","gateway":46000,"ledger":46000,"date":"29 Aug 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11596","student":"251FA08640","gateway":33000,"ledger":33000,"date":"10 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11597","student":"251FA08627","gateway":45500,"ledger":45500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11598","student":"251FA08627","gateway":39500,"ledger":39500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11599","student":"251FA08627","gateway":28500,"ledger":28500,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11600","student":"251FA08592","gateway":37000,"ledger":37000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11601","student":"251FA08592","gateway":32500,"ledger":32500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11602","student":"251FA08592","gateway":23000,"ledger":23000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11603","student":"251FA08044","gateway":32000,"ledger":32000,"date":"28 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11604","student":"251FA08044","gateway":28000,"ledger":28000,"date":"05 Jul 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11605","student":"251FA08044","gateway":20500,"ledger":20500,"date":"11 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11606","student":"251FA08767","gateway":27500,"ledger":27500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11607","student":"251FA08767","gateway":22500,"ledger":22500,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11608","student":"251FA08932","gateway":24000,"ledger":24000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11609","student":"251FA08932","gateway":19500,"ledger":19500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11610","student":"251FA08917","gateway":35500,"ledger":35500,"date":"08 Jun 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11611","student":"251FA08917","gateway":31000,"ledger":31000,"date":"06 Sep 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11612","student":"251FA08917","gateway":22000,"ledger":22000,"date":"22 Aug 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11613","student":"251FA11001","gateway":47000,"ledger":47000,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11614","student":"251FA11001","gateway":41000,"ledger":41000,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11615","student":"251FA11001","gateway":29500,"ledger":29500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11616","student":"251FA11002","gateway":39000,"ledger":39000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11617","student":"251FA11002","gateway":34000,"ledger":34000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11618","student":"251FA11002","gateway":24500,"ledger":24500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11619","student":"251FA11003","gateway":37500,"ledger":37500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11620","student":"251FA11003","gateway":32500,"ledger":32500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11621","student":"251FA11003","gateway":23500,"ledger":23500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11622","student":"251FA12001","gateway":50500,"ledger":50500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11623","student":"251FA12001","gateway":44500,"ledger":44500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11624","student":"251FA12001","gateway":31500,"ledger":31500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11625","student":"251FA12002","gateway":41000,"ledger":41000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11626","student":"251FA12002","gateway":36000,"ledger":36000,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11627","student":"251FA12002","gateway":25500,"ledger":25500,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11628","student":"251FA12003","gateway":42500,"ledger":42500,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11629","student":"251FA12003","gateway":37500,"ledger":37500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11630","student":"251FA12003","gateway":26500,"ledger":26500,"date":"22 Jun 2026","method":"Bank transfer","status":"Matched"},
  {"id":"TXN-11631","student":"251FA13001","gateway":40500,"ledger":40500,"date":"04 Sep 2026","method":"Counter collection","status":"Matched"},
  {"id":"TXN-11632","student":"251FA13001","gateway":35500,"ledger":35500,"date":"18 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11633","student":"251FA13001","gateway":25500,"ledger":25500,"date":"24 Jul 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11634","student":"251FA13002","gateway":36000,"ledger":36000,"date":"26 Aug 2026","method":"UPI","status":"Matched"},
  {"id":"TXN-11635","student":"251FA13002","gateway":31500,"ledger":31500,"date":"05 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11636","student":"251FA13002","gateway":22000,"ledger":22000,"date":"10 Jul 2026","method":"Debit card","status":"Matched"},
  {"id":"TXN-11637","student":"251FA13003","gateway":43000,"ledger":43000,"date":"14 Aug 2026","method":"Net banking","status":"Matched"},
  {"id":"TXN-11638","student":"251FA13003","gateway":35500,"ledger":35500,"date":"20 Jul 2026","method":"Debit card","status":"Matched"},
];
export type Transaction = (typeof transactions)[number];

// Auto-generated demo dataset for finDeck — Multi-branch, Year 1, 25 sections
// Total students: 492
export const students = [
  {"id":"251FA04E03","name":"Akshat Raj","programme":"B.Tech CSE","category":"General","demand":120000,"paid":92000,"overdue":28000,"initials":"AR","scholarship":20000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04E17","name":"Ananya Sharma","programme":"B.Tech CSE","category":"General","demand":120000,"paid":120000,"overdue":0,"initials":"AS","scholarship":0,"concession":0,"instalmentPlan":"Lump-sum"},
  {"id":"251FA04E21","name":"Rohan Mehta","programme":"MBA","category":"Scholarship","demand":160000,"paid":115000,"overdue":45000,"initials":"RM","scholarship":20000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04645","name":"Dharanikota Aaradhya","programme":"B.Tech CSE","category":"Scholarship","demand":115000,"paid":65000,"overdue":50000,"initials":"DA","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04852","name":"Jonnalagadda Mounika","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":132000,"overdue":13000,"initials":"JM","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04863","name":"Kolla Yogesh","programme":"B.Tech CSE","category":"General","demand":145000,"paid":65500,"overdue":79500,"initials":"KY","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04261","name":"Challa Jayanth","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":97000,"overdue":23000,"initials":"CJ","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04001","name":"Jampani Spoorthi","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":92000,"overdue":28000,"initials":"JS","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04777","name":"Murakonda Vishnu","programme":"B.Tech CSE","category":"General","demand":145000,"paid":145000,"overdue":0,"initials":"MV","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04430","name":"Borra Jayanth","programme":"B.Tech CSE","category":"Scholarship","demand":125000,"paid":79000,"overdue":46000,"initials":"BJ","scholarship":20000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04219","name":"Somisetty Srujana","programme":"B.Tech CSE","category":"General","demand":130000,"paid":112500,"overdue":17500,"initials":"SS","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA04381","name":"Gajula Sneha","programme":"B.Tech CSE","category":"General","demand":145000,"paid":107000,"overdue":38000,"initials":"GS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04163","name":"Vankayalapati Arjun","programme":"B.Tech CSE","category":"General","demand":143000,"paid":107000,"overdue":36000,"initials":"VA","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04952","name":"Gurrala Divya","programme":"B.Tech CSE","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"GD","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04940","name":"Jonnalagadda Jayanth","programme":"B.Tech CSE","category":"General","demand":138000,"paid":129500,"overdue":8500,"initials":"JJ","scholarship":5000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04378","name":"Kothapalli Indira","programme":"B.Tech CSE","category":"Scholarship","demand":125000,"paid":104000,"overdue":21000,"initials":"KI","scholarship":20000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04069","name":"Janga Tarun","programme":"B.Tech CSE","category":"General","demand":145000,"paid":145000,"overdue":0,"initials":"JT","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04485","name":"Tanniru Sathvik","programme":"B.Tech CSE","category":"General","demand":145000,"paid":145000,"overdue":0,"initials":"TS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04119","name":"Musunuri Aditya","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":145000,"overdue":0,"initials":"MA","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04493","name":"Yarlagadda Srujana","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":88000,"overdue":57000,"initials":"YS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04208","name":"Khareedu Uday","programme":"B.Tech CSE","category":"General","demand":145000,"paid":132000,"overdue":13000,"initials":"KU","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04394","name":"Atla Abhishek","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":27500,"overdue":92500,"initials":"AA","scholarship":20000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04851","name":"Janga Priya","programme":"B.Tech CSE","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"JP","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04464","name":"Katta Ravi","programme":"B.Tech CSE","category":"Scholarship","demand":110000,"paid":37500,"overdue":72500,"initials":"KR","scholarship":30000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04140","name":"Thummala Priya","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":145000,"overdue":0,"initials":"TP","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04263","name":"Damacharla Chaitanya","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":69500,"overdue":50500,"initials":"DC","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04928","name":"Sanagapalli Vidya","programme":"B.Tech CSE","category":"General","demand":130000,"paid":102500,"overdue":27500,"initials":"SV","scholarship":10000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04564","name":"Guduru Niharika","programme":"B.Tech CSE","category":"General","demand":140000,"paid":134500,"overdue":5500,"initials":"GN","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04085","name":"Balusu Divya","programme":"B.Tech CSE","category":"General","demand":145000,"paid":145000,"overdue":0,"initials":"BD","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04529","name":"Tadepalli Vikram","programme":"B.Tech CSE","category":"General","demand":135000,"paid":111500,"overdue":23500,"initials":"TV","scholarship":10000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04978","name":"Bathula Spoorthi","programme":"B.Tech CSE","category":"Management","demand":143000,"paid":84000,"overdue":59000,"initials":"BS","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04387","name":"Nadimpalli Spoorthi","programme":"B.Tech CSE","category":"General","demand":135000,"paid":124000,"overdue":11000,"initials":"NS","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04068","name":"Akkina Sindhu","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":0,"overdue":145000,"initials":"AS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04348","name":"Penumatsa Uday","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":500,"overdue":119500,"initials":"PU","scholarship":25000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04719","name":"Thummala Yashaswini","programme":"B.Tech CSE","category":"General","demand":138000,"paid":129000,"overdue":9000,"initials":"TY","scholarship":5000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA04511","name":"Manda Dhruv","programme":"B.Tech CSE","category":"General","demand":145000,"paid":64500,"overdue":80500,"initials":"MD","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04885","name":"Jampani Aaradhya","programme":"B.Tech CSE","category":"General","demand":138000,"paid":118000,"overdue":20000,"initials":"JA","scholarship":5000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04909","name":"Chava Pavan","programme":"B.Tech CSE","category":"General","demand":135000,"paid":92000,"overdue":43000,"initials":"CP","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04644","name":"Pachipala Srujana","programme":"B.Tech CSE","category":"General","demand":138000,"paid":116500,"overdue":21500,"initials":"PS","scholarship":5000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA04853","name":"Kothuri Vikram","programme":"B.Tech CSE","category":"General","demand":130000,"paid":51500,"overdue":78500,"initials":"KV","scholarship":10000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04189","name":"Pasupuleti Rahul","programme":"B.Tech CSE","category":"General","demand":133000,"paid":0,"overdue":133000,"initials":"PR","scholarship":10000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA04064","name":"Kelam Sathvik","programme":"B.Tech CSE","category":"General","demand":145000,"paid":145000,"overdue":0,"initials":"KS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04418","name":"Kota Rohan","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":144000,"overdue":1000,"initials":"KR","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04897","name":"Bangaru Keerthi","programme":"B.Tech CSE","category":"General","demand":145000,"paid":145000,"overdue":0,"initials":"BK","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04416","name":"Nannapaneni Krishna","programme":"B.Tech CSE","category":"General","demand":145000,"paid":65500,"overdue":79500,"initials":"NK","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04346","name":"Patibandla Yogesh","programme":"B.Tech CSE","category":"General","demand":135000,"paid":92500,"overdue":42500,"initials":"PY","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04455","name":"Valluri Karthik","programme":"B.Tech CSE","category":"Scholarship","demand":130000,"paid":114000,"overdue":16000,"initials":"VK","scholarship":15000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04953","name":"Pasupuleti Chaitanya","programme":"B.Tech CSE","category":"Scholarship","demand":128000,"paid":111500,"overdue":16500,"initials":"PC","scholarship":15000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04575","name":"Perala Jyothi","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":87500,"overdue":57500,"initials":"PJ","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04741","name":"Kasarla Venkatesh","programme":"B.Tech CSE","category":"Scholarship","demand":130000,"paid":33000,"overdue":97000,"initials":"KV","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04428","name":"Palli Ramya","programme":"B.Tech CSE","category":"General","demand":130000,"paid":112000,"overdue":18000,"initials":"PR","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA04684","name":"Gullipalli Bharath","programme":"B.Tech CSE","category":"General","demand":145000,"paid":65500,"overdue":79500,"initials":"GB","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04282","name":"Sankara Ananya","programme":"B.Tech CSE","category":"General","demand":143000,"paid":85000,"overdue":58000,"initials":"SA","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04028","name":"Guduru Sandeep","programme":"B.Tech CSE","category":"General","demand":145000,"paid":86500,"overdue":58500,"initials":"GS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04496","name":"Talluri Venkatesh","programme":"B.Tech CSE","category":"General","demand":143000,"paid":106500,"overdue":36500,"initials":"TV","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA04400","name":"Atla Reyansh","programme":"B.Tech CSE","category":"General","demand":135000,"paid":500,"overdue":134500,"initials":"AR","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04379","name":"Paladugu Deepika","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":131000,"overdue":14000,"initials":"PD","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04712","name":"Nannapaneni Swathi","programme":"B.Tech CSE","category":"General","demand":145000,"paid":110500,"overdue":34500,"initials":"NS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04449","name":"Rangisetty Vishnu","programme":"B.Tech CSE","category":"General","demand":140000,"paid":1000,"overdue":139000,"initials":"RV","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04025","name":"Nakka Keerthi","programme":"B.Tech CSE","category":"General","demand":135000,"paid":124000,"overdue":11000,"initials":"NK","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04060","name":"Challa Ishaan","programme":"B.Tech CSE","category":"General","demand":140000,"paid":133000,"overdue":7000,"initials":"CI","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04108","name":"Maladi Nandini","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":144500,"overdue":500,"initials":"MN","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04784","name":"Bandaru Varshini","programme":"B.Tech CSE","category":"General","demand":140000,"paid":101500,"overdue":38500,"initials":"BV","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04854","name":"Maddipati Sai","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":63500,"overdue":81500,"initials":"MS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04701","name":"Immanni Gayatri","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":85500,"overdue":34500,"initials":"IG","scholarship":20000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04018","name":"Moka Rahul","programme":"B.Tech CSE","category":"General","demand":145000,"paid":145000,"overdue":0,"initials":"MR","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04610","name":"Jonnalagadda Ishita","programme":"B.Tech CSE","category":"General","demand":145000,"paid":110000,"overdue":35000,"initials":"JI","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04223","name":"Mekala Reyansh","programme":"B.Tech CSE","category":"Scholarship","demand":130000,"paid":85500,"overdue":44500,"initials":"MR","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04426","name":"Uppala Sai","programme":"B.Tech CSE","category":"General","demand":140000,"paid":41500,"overdue":98500,"initials":"US","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04002","name":"Gurram Krishna","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":131500,"overdue":13500,"initials":"GK","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04427","name":"Nandigam Samhitha","programme":"B.Tech CSE","category":"Scholarship","demand":125000,"paid":61500,"overdue":63500,"initials":"NS","scholarship":15000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04704","name":"Donepudi Chaitra","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":93000,"overdue":27000,"initials":"DC","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04924","name":"Muppalla Lakshmi","programme":"B.Tech CSE","category":"General","demand":135000,"paid":0,"overdue":135000,"initials":"ML","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04569","name":"Pragada Triveni","programme":"B.Tech CSE","category":"General","demand":138000,"paid":78000,"overdue":60000,"initials":"PT","scholarship":5000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA04095","name":"Gadiparthi Hasini","programme":"B.Tech CSE","category":"General","demand":135000,"paid":56500,"overdue":78500,"initials":"GH","scholarship":5000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA04034","name":"Sagi Sai","programme":"B.Tech CSE","category":"Scholarship","demand":113000,"paid":79500,"overdue":33500,"initials":"SS","scholarship":30000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04495","name":"Katta Yash","programme":"B.Tech CSE","category":"Management","demand":140000,"paid":99500,"overdue":40500,"initials":"KY","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04210","name":"Nallamothu Sandeep","programme":"B.Tech CSE","category":"General","demand":140000,"paid":0,"overdue":140000,"initials":"NS","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04925","name":"Padamata Sai","programme":"B.Tech CSE","category":"General","demand":130000,"paid":101000,"overdue":29000,"initials":"PS","scholarship":10000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04676","name":"Sathiraju Reyansh","programme":"B.Tech CSE","category":"Management","demand":143000,"paid":140500,"overdue":2500,"initials":"SR","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04894","name":"Cherukuri Kiran","programme":"B.Tech CSE","category":"Scholarship","demand":110000,"paid":36000,"overdue":74000,"initials":"CK","scholarship":30000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04919","name":"Sathiraju Sandeep","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":144500,"overdue":500,"initials":"SS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04868","name":"Valluri Lokesh","programme":"B.Tech CSE","category":"Scholarship","demand":115000,"paid":75500,"overdue":39500,"initials":"VL","scholarship":30000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04178","name":"Ghanta Lakshmi","programme":"B.Tech CSE","category":"Scholarship","demand":130000,"paid":33000,"overdue":97000,"initials":"GL","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04935","name":"Jampani Keerthi","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":65500,"overdue":79500,"initials":"JK","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04443","name":"Tummala Tarun","programme":"B.Tech CSE","category":"Management","demand":143000,"paid":64000,"overdue":79000,"initials":"TT","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA04770","name":"Bodapati Meghana","programme":"B.Tech CSE","category":"General","demand":135000,"paid":38500,"overdue":96500,"initials":"BM","scholarship":5000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04539","name":"Raavi Sravani","programme":"B.Tech CSE","category":"Scholarship","demand":115000,"paid":1500,"overdue":113500,"initials":"RS","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04765","name":"Golla Rahul","programme":"B.Tech CSE","category":"General","demand":138000,"paid":116500,"overdue":21500,"initials":"GR","scholarship":5000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA04250","name":"Kommuru Harika","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":0,"overdue":145000,"initials":"KH","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04145","name":"Kothapalli Bharath","programme":"B.Tech CSE","category":"General","demand":145000,"paid":500,"overdue":144500,"initials":"KB","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04147","name":"Pilli Manoj","programme":"B.Tech CSE","category":"General","demand":145000,"paid":65000,"overdue":80000,"initials":"PM","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04197","name":"Vaddadi Sravani","programme":"B.Tech CSE","category":"General","demand":145000,"paid":109500,"overdue":35500,"initials":"VS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04174","name":"Chatakondu Swathi","programme":"B.Tech CSE","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"CS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04810","name":"Chennupati Chaitanya","programme":"B.Tech CSE","category":"General","demand":140000,"paid":101000,"overdue":39000,"initials":"CC","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04093","name":"Ponnada Yash","programme":"B.Tech CSE","category":"General","demand":145000,"paid":132000,"overdue":13000,"initials":"PY","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04434","name":"Goda Spoorthi","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":88000,"overdue":57000,"initials":"GS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04473","name":"Yalamanchi Jyothi","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":128500,"overdue":16500,"initials":"YJ","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04802","name":"Narra Sanjana","programme":"B.Tech CSE","category":"General","demand":130000,"paid":50500,"overdue":79500,"initials":"NS","scholarship":10000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA04806","name":"Tanniru Krishna","programme":"B.Tech CSE","category":"General","demand":140000,"paid":1000,"overdue":139000,"initials":"TK","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04612","name":"Abburi Bhavana","programme":"B.Tech CSE","category":"Management","demand":143000,"paid":0,"overdue":143000,"initials":"AB","scholarship":0,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA04019","name":"Jampani Srikanth","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":64000,"overdue":81000,"initials":"JS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04713","name":"Mamidala Sindhu","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":87500,"overdue":57500,"initials":"MS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04063","name":"Bonthu Rohan","programme":"B.Tech CSE","category":"Scholarship","demand":125000,"paid":1500,"overdue":123500,"initials":"BR","scholarship":20000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04763","name":"Avula Rahul","programme":"B.Tech CSE","category":"General","demand":135000,"paid":112000,"overdue":23000,"initials":"AR","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04484","name":"Ponnada Sowmya","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":44500,"overdue":100500,"initials":"PS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04089","name":"Badisa Harika","programme":"B.Tech CSE","category":"General","demand":143000,"paid":105500,"overdue":37500,"initials":"BH","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04934","name":"Kosuri Bhavana","programme":"B.Tech CSE","category":"Scholarship","demand":125000,"paid":48500,"overdue":76500,"initials":"KB","scholarship":15000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04220","name":"Chatakondu Tarun","programme":"B.Tech CSE","category":"General","demand":135000,"paid":0,"overdue":135000,"initials":"CT","scholarship":10000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04554","name":"Devireddy Sravani","programme":"B.Tech CSE","category":"General","demand":140000,"paid":121500,"overdue":18500,"initials":"DS","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04370","name":"Eedala Aditya","programme":"B.Tech CSE","category":"General","demand":138000,"paid":97500,"overdue":40500,"initials":"EA","scholarship":5000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA04334","name":"Kolasani Akshat","programme":"B.Tech CSE","category":"General","demand":140000,"paid":134000,"overdue":6000,"initials":"KA","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04527","name":"Immanni Swathi","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":144000,"overdue":1000,"initials":"IS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04562","name":"Chava Varun","programme":"B.Tech CSE","category":"Scholarship","demand":113000,"paid":76000,"overdue":37000,"initials":"CV","scholarship":30000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04144","name":"Guduru Nikhil","programme":"B.Tech CSE","category":"General","demand":145000,"paid":66500,"overdue":78500,"initials":"GN","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04942","name":"Karnati Nandini","programme":"B.Tech CSE","category":"Management","demand":140000,"paid":81500,"overdue":58500,"initials":"KN","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04393","name":"Aravapalli Abhishek","programme":"B.Tech CSE","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"AA","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04487","name":"Koganti Kiran","programme":"B.Tech CSE","category":"General","demand":145000,"paid":130500,"overdue":14500,"initials":"KK","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04401","name":"Jonnalagadda Zubin","programme":"B.Tech CSE","category":"General","demand":135000,"paid":76000,"overdue":59000,"initials":"JZ","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04037","name":"Penumatsa Tanvi","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":43000,"overdue":77000,"initials":"PT","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04725","name":"Jampala Rohan","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":96500,"overdue":23500,"initials":"JR","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04022","name":"Chava Bhavana","programme":"B.Tech CSE","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"CB","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04241","name":"Katta Nandini","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":108000,"overdue":37000,"initials":"KN","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04161","name":"Raparthi Jayanth","programme":"B.Tech CSE","category":"General","demand":140000,"paid":102000,"overdue":38000,"initials":"RJ","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04371","name":"Manda Bhavana","programme":"B.Tech CSE","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"MB","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04318","name":"Mamillapalli Indrajit","programme":"B.Tech CSE","category":"General","demand":145000,"paid":144000,"overdue":1000,"initials":"MI","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04651","name":"Katta Sravani","programme":"B.Tech CSE","category":"General","demand":138000,"paid":38500,"overdue":99500,"initials":"KS","scholarship":5000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04129","name":"Kante Vishnu","programme":"B.Tech CSE","category":"Management","demand":143000,"paid":43500,"overdue":99500,"initials":"KV","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA04278","name":"Madireddy Swathi","programme":"B.Tech CSE","category":"General","demand":130000,"paid":102500,"overdue":27500,"initials":"MS","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA04749","name":"Kancharla Triveni","programme":"B.Tech CSE","category":"General","demand":145000,"paid":108500,"overdue":36500,"initials":"KT","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04146","name":"Vasireddy Lokesh","programme":"B.Tech CSE","category":"Scholarship","demand":120000,"paid":30500,"overdue":89500,"initials":"VL","scholarship":25000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA04332","name":"Edpuganti Tanvi","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":42500,"overdue":102500,"initials":"ET","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA04565","name":"Polisetty Priya","programme":"B.Tech CSE","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"PP","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA04687","name":"Kalidindi Ganesh","programme":"B.Tech CSE","category":"Management","demand":145000,"paid":143000,"overdue":2000,"initials":"KG","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03360","name":"Mekala Revathi","programme":"B.Tech ECE","category":"Scholarship","demand":126000,"paid":0,"overdue":126000,"initials":"MR","scholarship":20000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03886","name":"Nakka Pavan","programme":"B.Tech ECE","category":"Management","demand":146000,"paid":86500,"overdue":59500,"initials":"NP","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03011","name":"Botta Tarun","programme":"B.Tech ECE","category":"General","demand":146000,"paid":86000,"overdue":60000,"initials":"BT","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03823","name":"Gurram Divya","programme":"B.Tech ECE","category":"Management","demand":146000,"paid":0,"overdue":146000,"initials":"GD","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03398","name":"Ganta Kavya","programme":"B.Tech ECE","category":"Scholarship","demand":131000,"paid":101500,"overdue":29500,"initials":"GK","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03219","name":"Ijjada Arjun","programme":"B.Tech ECE","category":"General","demand":144000,"paid":141000,"overdue":3000,"initials":"IA","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03187","name":"Mahankali Naveen","programme":"B.Tech ECE","category":"General","demand":146000,"paid":131500,"overdue":14500,"initials":"MN","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03861","name":"Yerram Venkatesh","programme":"B.Tech ECE","category":"Management","demand":146000,"paid":145500,"overdue":500,"initials":"YV","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03986","name":"Ijjada Priya","programme":"B.Tech ECE","category":"General","demand":144000,"paid":64000,"overdue":80000,"initials":"IP","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03218","name":"Chava Yogesh","programme":"B.Tech ECE","category":"General","demand":146000,"paid":45000,"overdue":101000,"initials":"CY","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03943","name":"Eedala Kavya","programme":"B.Tech ECE","category":"Scholarship","demand":126000,"paid":104500,"overdue":21500,"initials":"EK","scholarship":20000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03193","name":"Pragada Chaitra","programme":"B.Tech ECE","category":"Management","demand":146000,"paid":89000,"overdue":57000,"initials":"PC","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03891","name":"Dakkata Naveen","programme":"B.Tech ECE","category":"General","demand":136000,"paid":72500,"overdue":63500,"initials":"DN","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03569","name":"Pasupuleti Swathi","programme":"B.Tech ECE","category":"Scholarship","demand":116000,"paid":62000,"overdue":54000,"initials":"PS","scholarship":30000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03979","name":"Mekala Yasaswini","programme":"B.Tech ECE","category":"General","demand":146000,"paid":64000,"overdue":82000,"initials":"MY","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03898","name":"Moka Sindhu","programme":"B.Tech ECE","category":"Scholarship","demand":126000,"paid":77500,"overdue":48500,"initials":"MS","scholarship":15000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03285","name":"Nakka Yash","programme":"B.Tech ECE","category":"General","demand":141000,"paid":0,"overdue":141000,"initials":"NY","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03009","name":"Immanni Yasaswini","programme":"B.Tech ECE","category":"General","demand":134000,"paid":54000,"overdue":80000,"initials":"IY","scholarship":10000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03286","name":"Pandilla Yashaswini","programme":"B.Tech ECE","category":"General","demand":146000,"paid":67000,"overdue":79000,"initials":"PY","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03975","name":"Marella Deepak","programme":"B.Tech ECE","category":"General","demand":136000,"paid":73500,"overdue":62500,"initials":"MD","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03300","name":"Jasti Keerthi","programme":"B.Tech ECE","category":"General","demand":146000,"paid":1500,"overdue":144500,"initials":"JK","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03350","name":"Borra Shravya","programme":"B.Tech ECE","category":"General","demand":146000,"paid":87500,"overdue":58500,"initials":"BS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03031","name":"Yella Jayanth","programme":"B.Tech ECE","category":"Scholarship","demand":131000,"paid":113500,"overdue":17500,"initials":"YJ","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03492","name":"Mahankali Reyansh","programme":"B.Tech ECE","category":"Scholarship","demand":121000,"paid":500,"overdue":120500,"initials":"MR","scholarship":25000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03474","name":"Nadimpalli Shravya","programme":"B.Tech ECE","category":"General","demand":131000,"paid":114000,"overdue":17000,"initials":"NS","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA03982","name":"Mailapalli Anirudh","programme":"B.Tech ECE","category":"General","demand":141000,"paid":133500,"overdue":7500,"initials":"MA","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03520","name":"Raparthi Yogesh","programme":"B.Tech ECE","category":"General","demand":139000,"paid":129500,"overdue":9500,"initials":"RY","scholarship":5000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03797","name":"Kondapalli Aaradhya","programme":"B.Tech ECE","category":"General","demand":134000,"paid":71000,"overdue":63000,"initials":"KA","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03159","name":"Penumatsa Pranathi","programme":"B.Tech ECE","category":"General","demand":146000,"paid":130000,"overdue":16000,"initials":"PP","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03544","name":"Guduru Omkar","programme":"B.Tech ECE","category":"General","demand":141000,"paid":39000,"overdue":102000,"initials":"GO","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03209","name":"Arnepalli Samhitha","programme":"B.Tech ECE","category":"General","demand":136000,"paid":37000,"overdue":99000,"initials":"AS","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03811","name":"Donepudi Varshini","programme":"B.Tech ECE","category":"General","demand":146000,"paid":64500,"overdue":81500,"initials":"DV","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03692","name":"Patibandla Siddharth","programme":"B.Tech ECE","category":"General","demand":139000,"paid":59000,"overdue":80000,"initials":"PS","scholarship":5000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03608","name":"Raavi Sowmya","programme":"B.Tech ECE","category":"General","demand":139000,"paid":129000,"overdue":10000,"initials":"RS","scholarship":5000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03121","name":"Thummala Krishna","programme":"B.Tech ECE","category":"Management","demand":146000,"paid":65000,"overdue":81000,"initials":"TK","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03293","name":"Balusu Ishita","programme":"B.Tech ECE","category":"General","demand":146000,"paid":66000,"overdue":80000,"initials":"BI","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03658","name":"Golla Meghana","programme":"B.Tech ECE","category":"General","demand":146000,"paid":130500,"overdue":15500,"initials":"GM","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03735","name":"Kuruba Mounika","programme":"B.Tech ECE","category":"Scholarship","demand":129000,"paid":100000,"overdue":29000,"initials":"KM","scholarship":15000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03694","name":"Borra Lakshmi","programme":"B.Tech ECE","category":"General","demand":146000,"paid":131500,"overdue":14500,"initials":"BL","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03122","name":"Perala Yash","programme":"B.Tech ECE","category":"General","demand":141000,"paid":134500,"overdue":6500,"initials":"PY","scholarship":0,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA03418","name":"Uppala Kavya","programme":"B.Tech ECE","category":"Scholarship","demand":126000,"paid":93500,"overdue":32500,"initials":"UK","scholarship":20000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03207","name":"Arnepalli Yogesh","programme":"B.Tech ECE","category":"Management","demand":146000,"paid":132500,"overdue":13500,"initials":"AY","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03406","name":"Annavarapu Aman","programme":"B.Tech ECE","category":"Scholarship","demand":116000,"paid":79500,"overdue":36500,"initials":"AA","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03573","name":"Chintoti Bharath","programme":"B.Tech ECE","category":"General","demand":141000,"paid":101500,"overdue":39500,"initials":"CB","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03565","name":"Gorantla Ravi","programme":"B.Tech ECE","category":"General","demand":146000,"paid":66500,"overdue":79500,"initials":"GR","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03784","name":"Kothapalli Yashaswini","programme":"B.Tech ECE","category":"General","demand":146000,"paid":64500,"overdue":81500,"initials":"KY","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03177","name":"Doddakula Zubin","programme":"B.Tech ECE","category":"General","demand":146000,"paid":109500,"overdue":36500,"initials":"DZ","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03895","name":"Sagi Gayatri","programme":"B.Tech ECE","category":"General","demand":146000,"paid":88500,"overdue":57500,"initials":"SG","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03438","name":"Vootkur Sneha","programme":"B.Tech ECE","category":"Management","demand":144000,"paid":84500,"overdue":59500,"initials":"VS","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03973","name":"Ganta Priya","programme":"B.Tech ECE","category":"Management","demand":144000,"paid":63000,"overdue":81000,"initials":"GP","scholarship":0,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03894","name":"Yerram Ishaan","programme":"B.Tech ECE","category":"General","demand":146000,"paid":65500,"overdue":80500,"initials":"YI","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03556","name":"Seelam Tanvi","programme":"B.Tech ECE","category":"General","demand":139000,"paid":118500,"overdue":20500,"initials":"ST","scholarship":5000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03499","name":"Patibandla Hemanth","programme":"B.Tech ECE","category":"Scholarship","demand":116000,"paid":84000,"overdue":32000,"initials":"PH","scholarship":30000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03880","name":"Tummala Pavan","programme":"B.Tech ECE","category":"General","demand":141000,"paid":80000,"overdue":61000,"initials":"TP","scholarship":0,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA03788","name":"Narra Lokesh","programme":"B.Tech ECE","category":"Management","demand":144000,"paid":63000,"overdue":81000,"initials":"NL","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03705","name":"Tanniru Niharika","programme":"B.Tech ECE","category":"General","demand":146000,"paid":145000,"overdue":1000,"initials":"TN","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03356","name":"Devireddy Vaishnavi","programme":"B.Tech ECE","category":"General","demand":146000,"paid":65500,"overdue":80500,"initials":"DV","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03361","name":"Pandilla Vishnu","programme":"B.Tech ECE","category":"General","demand":144000,"paid":64500,"overdue":79500,"initials":"PV","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA03244","name":"Penumatsa Sravani","programme":"B.Tech ECE","category":"General","demand":141000,"paid":101000,"overdue":40000,"initials":"PS","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03810","name":"Manda Revathi","programme":"B.Tech ECE","category":"General","demand":136000,"paid":94500,"overdue":41500,"initials":"MR","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03366","name":"Ijjada Meghana","programme":"B.Tech ECE","category":"Scholarship","demand":131000,"paid":102000,"overdue":29000,"initials":"IM","scholarship":15000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03998","name":"Mudigonda Deepak","programme":"B.Tech ECE","category":"Management","demand":141000,"paid":135500,"overdue":5500,"initials":"MD","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03164","name":"Siripurapu Sneha","programme":"B.Tech ECE","category":"Scholarship","demand":116000,"paid":74000,"overdue":42000,"initials":"SS","scholarship":30000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03377","name":"Arnepalli Mounika","programme":"B.Tech ECE","category":"General","demand":146000,"paid":111500,"overdue":34500,"initials":"AM","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03329","name":"Nannapaneni Ishita","programme":"B.Tech ECE","category":"General","demand":141000,"paid":133500,"overdue":7500,"initials":"NI","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03229","name":"Gutta Krishna","programme":"B.Tech ECE","category":"Management","demand":146000,"paid":146000,"overdue":0,"initials":"GK","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03359","name":"Pragada Samhitha","programme":"B.Tech ECE","category":"General","demand":136000,"paid":75000,"overdue":61000,"initials":"PS","scholarship":10000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03025","name":"Nakka Varun","programme":"B.Tech ECE","category":"General","demand":146000,"paid":43000,"overdue":103000,"initials":"NV","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03576","name":"Annapureddy Ramya","programme":"B.Tech ECE","category":"General","demand":146000,"paid":65000,"overdue":81000,"initials":"AR","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03575","name":"Maddipati Kavya","programme":"B.Tech ECE","category":"General","demand":141000,"paid":122000,"overdue":19000,"initials":"MK","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03704","name":"Vankayalapati Ganesh","programme":"B.Tech ECE","category":"General","demand":141000,"paid":135000,"overdue":6000,"initials":"VG","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03058","name":"Ponnada Sahithi","programme":"B.Tech ECE","category":"General","demand":141000,"paid":1000,"overdue":140000,"initials":"PS","scholarship":5000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03052","name":"Polisetty Radhika","programme":"B.Tech ECE","category":"Scholarship","demand":126000,"paid":62000,"overdue":64000,"initials":"PR","scholarship":20000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03949","name":"Muppalla Triveni","programme":"B.Tech ECE","category":"General","demand":141000,"paid":81000,"overdue":60000,"initials":"MT","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03311","name":"Gurrala Lakshmi","programme":"B.Tech ECE","category":"General","demand":146000,"paid":146000,"overdue":0,"initials":"GL","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03113","name":"Cherukuri Gopal","programme":"B.Tech ECE","category":"Scholarship","demand":111000,"paid":80000,"overdue":31000,"initials":"CG","scholarship":30000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03271","name":"Gorantla Aman","programme":"B.Tech ECE","category":"General","demand":141000,"paid":135000,"overdue":6000,"initials":"GA","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03324","name":"Sankara Lavanya","programme":"B.Tech ECE","category":"Management","demand":141000,"paid":122000,"overdue":19000,"initials":"SL","scholarship":0,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA03476","name":"Gajula Gayatri","programme":"B.Tech ECE","category":"General","demand":146000,"paid":88500,"overdue":57500,"initials":"GG","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03956","name":"Karicheti Ishita","programme":"B.Tech ECE","category":"General","demand":146000,"paid":109000,"overdue":37000,"initials":"KI","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03242","name":"Bainaboyina Deepak","programme":"B.Tech ECE","category":"General","demand":131000,"paid":33500,"overdue":97500,"initials":"BD","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA03013","name":"Kamatham Rajesh","programme":"B.Tech ECE","category":"Scholarship","demand":111000,"paid":48000,"overdue":63000,"initials":"KR","scholarship":30000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03043","name":"Narra Srikanth","programme":"B.Tech ECE","category":"General","demand":141000,"paid":60500,"overdue":80500,"initials":"NS","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03511","name":"Kakarla Ravi","programme":"B.Tech ECE","category":"General","demand":136000,"paid":0,"overdue":136000,"initials":"KR","scholarship":5000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03728","name":"Kolli Ramya","programme":"B.Tech ECE","category":"Scholarship","demand":121000,"paid":28000,"overdue":93000,"initials":"KR","scholarship":20000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03023","name":"Nallamothu Chaitanya","programme":"B.Tech ECE","category":"Scholarship","demand":116000,"paid":87500,"overdue":28500,"initials":"NC","scholarship":25000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03446","name":"Narra Kiran","programme":"B.Tech ECE","category":"Scholarship","demand":116000,"paid":24500,"overdue":91500,"initials":"NK","scholarship":25000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03820","name":"Devavarapu Vikram","programme":"B.Tech ECE","category":"Management","demand":141000,"paid":42000,"overdue":99000,"initials":"DV","scholarship":0,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA03670","name":"Immanni Divya","programme":"B.Tech ECE","category":"General","demand":134000,"paid":500,"overdue":133500,"initials":"ID","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03401","name":"Sathiraju Spoorthi","programme":"B.Tech ECE","category":"Management","demand":141000,"paid":62000,"overdue":79000,"initials":"SS","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA03069","name":"Pandilla Zubin","programme":"B.Tech ECE","category":"Scholarship","demand":114000,"paid":79000,"overdue":35000,"initials":"PZ","scholarship":30000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03352","name":"Sankara Manasa","programme":"B.Tech ECE","category":"General","demand":136000,"paid":123000,"overdue":13000,"initials":"SM","scholarship":10000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03543","name":"Somisetty Sneha","programme":"B.Tech ECE","category":"General","demand":146000,"paid":146000,"overdue":0,"initials":"SS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03707","name":"Goda Yogesh","programme":"B.Tech ECE","category":"Scholarship","demand":131000,"paid":68500,"overdue":62500,"initials":"GY","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03027","name":"Vankayalapati Chaitanya","programme":"B.Tech ECE","category":"Scholarship","demand":126000,"paid":77500,"overdue":48500,"initials":"VC","scholarship":20000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA03839","name":"Edpuganti Bharath","programme":"B.Tech ECE","category":"General","demand":141000,"paid":134500,"overdue":6500,"initials":"EB","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03940","name":"Madireddy Aarav","programme":"B.Tech ECE","category":"General","demand":136000,"paid":54000,"overdue":82000,"initials":"MA","scholarship":5000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA03620","name":"Atla Madhuri","programme":"B.Tech ECE","category":"Scholarship","demand":126000,"paid":94500,"overdue":31500,"initials":"AM","scholarship":20000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03362","name":"Kakarla Vaishnavi","programme":"B.Tech ECE","category":"General","demand":136000,"paid":124500,"overdue":11500,"initials":"KV","scholarship":10000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA03365","name":"Yalamanchi Deepika","programme":"B.Tech ECE","category":"General","demand":141000,"paid":102000,"overdue":39000,"initials":"YD","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA03116","name":"Sankara Srujana","programme":"B.Tech ECE","category":"General","demand":146000,"paid":131000,"overdue":15000,"initials":"SS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02424","name":"Chennupati Mahesh","programme":"B.Tech EEE","category":"General","demand":126500,"paid":1500,"overdue":125000,"initials":"CM","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02402","name":"Devavarapu Surya","programme":"B.Tech EEE","category":"Scholarship","demand":121500,"paid":100000,"overdue":21500,"initials":"DS","scholarship":20000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA02253","name":"Bodapati Hasini","programme":"B.Tech EEE","category":"Scholarship","demand":119500,"paid":71500,"overdue":48000,"initials":"BH","scholarship":20000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02576","name":"Ramisetty Spoorthi","programme":"B.Tech EEE","category":"General","demand":131500,"paid":119000,"overdue":12500,"initials":"RS","scholarship":5000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02668","name":"Chidipothu Ramya","programme":"B.Tech EEE","category":"General","demand":136500,"paid":0,"overdue":136500,"initials":"CR","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02739","name":"Maddipati Triveni","programme":"B.Tech EEE","category":"Management","demand":139500,"paid":135500,"overdue":4000,"initials":"MT","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02189","name":"Perala Sanjana","programme":"B.Tech EEE","category":"General","demand":129500,"paid":114500,"overdue":15000,"initials":"PS","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02661","name":"Seelam Divya","programme":"B.Tech EEE","category":"General","demand":141500,"paid":140500,"overdue":1000,"initials":"SD","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02312","name":"Kelam Vidya","programme":"B.Tech EEE","category":"Management","demand":136500,"paid":129500,"overdue":7000,"initials":"KV","scholarship":0,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02068","name":"Busiraju Ananya","programme":"B.Tech EEE","category":"General","demand":131500,"paid":70500,"overdue":61000,"initials":"BA","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02504","name":"Vempati Yogesh","programme":"B.Tech EEE","category":"Scholarship","demand":111500,"paid":81000,"overdue":30500,"initials":"VY","scholarship":30000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA02966","name":"Badisa Sneha","programme":"B.Tech EEE","category":"Management","demand":139500,"paid":62000,"overdue":77500,"initials":"BS","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02393","name":"Palli Nikhil","programme":"B.Tech EEE","category":"Scholarship","demand":124500,"paid":102500,"overdue":22000,"initials":"PN","scholarship":15000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02149","name":"Enumula Lavanya","programme":"B.Tech EEE","category":"General","demand":141500,"paid":107500,"overdue":34000,"initials":"EL","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA02185","name":"Narra Srujana","programme":"B.Tech EEE","category":"Management","demand":139500,"paid":136000,"overdue":3500,"initials":"NS","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02006","name":"Kommuru Nikhil","programme":"B.Tech EEE","category":"Scholarship","demand":109500,"paid":76000,"overdue":33500,"initials":"KN","scholarship":30000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02963","name":"Velpula Meghana","programme":"B.Tech EEE","category":"General","demand":131500,"paid":73000,"overdue":58500,"initials":"VM","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02717","name":"Madupu Harsha","programme":"B.Tech EEE","category":"General","demand":141500,"paid":84000,"overdue":57500,"initials":"MH","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02672","name":"Vankayalapati Madhuri","programme":"B.Tech EEE","category":"General","demand":126500,"paid":65500,"overdue":61000,"initials":"VM","scholarship":10000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02197","name":"Burla Naveen","programme":"B.Tech EEE","category":"Scholarship","demand":116500,"paid":42500,"overdue":74000,"initials":"BN","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02571","name":"Chennupati Meghana","programme":"B.Tech EEE","category":"General","demand":131500,"paid":71500,"overdue":60000,"initials":"CM","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02067","name":"Abburi Sanjana","programme":"B.Tech EEE","category":"General","demand":136500,"paid":79000,"overdue":57500,"initials":"AS","scholarship":0,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02552","name":"Bandaru Pranathi","programme":"B.Tech EEE","category":"General","demand":131500,"paid":89500,"overdue":42000,"initials":"BP","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02992","name":"Nimmagadda Sravani","programme":"B.Tech EEE","category":"Scholarship","demand":119500,"paid":73000,"overdue":46500,"initials":"NS","scholarship":20000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA02235","name":"Polisetty Deepak","programme":"B.Tech EEE","category":"General","demand":136500,"paid":130000,"overdue":6500,"initials":"PD","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA02718","name":"Yerram Ramya","programme":"B.Tech EEE","category":"General","demand":131500,"paid":105500,"overdue":26000,"initials":"YR","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02793","name":"Shaik Srikanth","programme":"B.Tech EEE","category":"Scholarship","demand":121500,"paid":45000,"overdue":76500,"initials":"SS","scholarship":20000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02061","name":"Dharanikota Venkatesh","programme":"B.Tech EEE","category":"General","demand":129500,"paid":105000,"overdue":24500,"initials":"DV","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02984","name":"Madireddy Rajesh","programme":"B.Tech EEE","category":"General","demand":129500,"paid":34500,"overdue":95000,"initials":"MR","scholarship":10000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02236","name":"Cherukuri Naveen","programme":"B.Tech EEE","category":"General","demand":139500,"paid":40000,"overdue":99500,"initials":"CN","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02752","name":"Kamatham Omkar","programme":"B.Tech EEE","category":"Scholarship","demand":121500,"paid":87000,"overdue":34500,"initials":"KO","scholarship":20000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA02039","name":"Nandigam Pranathi","programme":"B.Tech EEE","category":"General","demand":136500,"paid":130000,"overdue":6500,"initials":"NP","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02946","name":"Ponnada Naveen","programme":"B.Tech EEE","category":"General","demand":136500,"paid":130000,"overdue":6500,"initials":"PN","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02762","name":"Seelam Jahnavi","programme":"B.Tech EEE","category":"General","demand":129500,"paid":50500,"overdue":79000,"initials":"SJ","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02509","name":"Javvaji Reyansh","programme":"B.Tech EEE","category":"General","demand":141500,"paid":126500,"overdue":15000,"initials":"JR","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA02664","name":"Pachipala Mounika","programme":"B.Tech EEE","category":"General","demand":129500,"paid":34500,"overdue":95000,"initials":"PM","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02323","name":"Sagi Sowmya","programme":"B.Tech EEE","category":"General","demand":131500,"paid":119000,"overdue":12500,"initials":"SS","scholarship":5000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA02261","name":"Penumatsa Manoj","programme":"B.Tech EEE","category":"General","demand":126500,"paid":110500,"overdue":16000,"initials":"PM","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02031","name":"Ponnada Mounika","programme":"B.Tech EEE","category":"General","demand":136500,"paid":80000,"overdue":56500,"initials":"PM","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02614","name":"Kelam Revathi","programme":"B.Tech EEE","category":"General","demand":131500,"paid":90500,"overdue":41000,"initials":"KR","scholarship":10000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA02828","name":"Gutta Varun","programme":"B.Tech EEE","category":"General","demand":139500,"paid":135500,"overdue":4000,"initials":"GV","scholarship":0,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA02919","name":"Madupu Kavya","programme":"B.Tech EEE","category":"Management","demand":141500,"paid":65000,"overdue":76500,"initials":"MK","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02543","name":"Nakka Vidya","programme":"B.Tech EEE","category":"Scholarship","demand":111500,"paid":78500,"overdue":33000,"initials":"NV","scholarship":25000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02823","name":"Vankayalapati Pallavi","programme":"B.Tech EEE","category":"Scholarship","demand":111500,"paid":34500,"overdue":77000,"initials":"VP","scholarship":25000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02534","name":"Avula Omkar","programme":"B.Tech EEE","category":"General","demand":126500,"paid":98500,"overdue":28000,"initials":"AO","scholarship":10000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02856","name":"Marella Gayatri","programme":"B.Tech EEE","category":"Management","demand":139500,"paid":0,"overdue":139500,"initials":"MG","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02662","name":"Dara Aaradhya","programme":"B.Tech EEE","category":"General","demand":136500,"paid":1000,"overdue":135500,"initials":"DA","scholarship":5000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA02093","name":"Nagisetty Reyansh","programme":"B.Tech EEE","category":"Scholarship","demand":126500,"paid":0,"overdue":126500,"initials":"NR","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02796","name":"Suram Mounika","programme":"B.Tech EEE","category":"Management","demand":141500,"paid":0,"overdue":141500,"initials":"SM","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02539","name":"Borra Sujatha","programme":"B.Tech EEE","category":"Scholarship","demand":114500,"paid":78000,"overdue":36500,"initials":"BS","scholarship":25000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA02319","name":"Patibandla Tanvi","programme":"B.Tech EEE","category":"General","demand":116500,"paid":87500,"overdue":29000,"initials":"PT","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02784","name":"Nannapaneni Srujana","programme":"B.Tech EEE","category":"General","demand":141500,"paid":61500,"overdue":80000,"initials":"NS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA02501","name":"Bitragunta Siddharth","programme":"B.Tech EEE","category":"General","demand":136500,"paid":77000,"overdue":59500,"initials":"BS","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02176","name":"Busiraju Kavya","programme":"B.Tech EEE","category":"General","demand":139500,"paid":62500,"overdue":77000,"initials":"BK","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA02887","name":"Tanniru Yogesh","programme":"B.Tech EEE","category":"Scholarship","demand":116500,"paid":88000,"overdue":28500,"initials":"TY","scholarship":25000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05512","name":"Kante Varun","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":62500,"overdue":75500,"initials":"KV","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05468","name":"Khareedu Arjun","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":83000,"overdue":55000,"initials":"KA","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05824","name":"Kosuri Dhruv","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":137500,"overdue":500,"initials":"KD","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05104","name":"Ijjada Hasini","programme":"B.Tech Mechanical","category":"General","demand":131000,"paid":107500,"overdue":23500,"initials":"IH","scholarship":5000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA05487","name":"Edpuganti Aditya","programme":"B.Tech Mechanical","category":"Scholarship","demand":121000,"paid":102500,"overdue":18500,"initials":"EA","scholarship":15000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05984","name":"Yadavalli Sravani","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":103500,"overdue":34500,"initials":"YS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05827","name":"Musunuri Abhishek","programme":"B.Tech Mechanical","category":"General","demand":111000,"paid":33000,"overdue":78000,"initials":"MA","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA05319","name":"Jala Revathi","programme":"B.Tech Mechanical","category":"Scholarship","demand":106000,"paid":21500,"overdue":84500,"initials":"JR","scholarship":30000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA05133","name":"Kalidindi Naveen","programme":"B.Tech Mechanical","category":"Management","demand":133000,"paid":76000,"overdue":57000,"initials":"KN","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA05991","name":"Kante Sowmya","programme":"B.Tech Mechanical","category":"General","demand":111000,"paid":108500,"overdue":2500,"initials":"KS","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05948","name":"Indukuri Triveni","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":102000,"overdue":36000,"initials":"IT","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05682","name":"Kusuluri Jahnavi","programme":"B.Tech Mechanical","category":"General","demand":133000,"paid":1500,"overdue":131500,"initials":"KJ","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05154","name":"Gurram Gayatri","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":42000,"overdue":96000,"initials":"GG","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05687","name":"Kancharla Sneha","programme":"B.Tech Mechanical","category":"General","demand":128000,"paid":105500,"overdue":22500,"initials":"KS","scholarship":5000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05828","name":"Valluri Ananya","programme":"B.Tech Mechanical","category":"General","demand":128000,"paid":1500,"overdue":126500,"initials":"VA","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05373","name":"Yalamanchi Ravi","programme":"B.Tech Mechanical","category":"General","demand":126000,"paid":102500,"overdue":23500,"initials":"YR","scholarship":10000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA05474","name":"Nimmagadda Sathvik","programme":"B.Tech Mechanical","category":"Management","demand":138000,"paid":102000,"overdue":36000,"initials":"NS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05708","name":"Guntru Yashaswini","programme":"B.Tech Mechanical","category":"General","demand":128000,"paid":51000,"overdue":77000,"initials":"GY","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05232","name":"Tanniru Kavya","programme":"B.Tech Mechanical","category":"General","demand":136000,"paid":101000,"overdue":35000,"initials":"TK","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05067","name":"Valluri Tanvi","programme":"B.Tech Mechanical","category":"Scholarship","demand":113000,"paid":53000,"overdue":60000,"initials":"VT","scholarship":25000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05640","name":"Challa Srikanth","programme":"B.Tech Mechanical","category":"General","demand":136000,"paid":121000,"overdue":15000,"initials":"CS","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA05622","name":"Marella Ganesh","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":124000,"overdue":14000,"initials":"MG","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05102","name":"Chitturi Varshini","programme":"B.Tech Mechanical","category":"General","demand":126000,"paid":110500,"overdue":15500,"initials":"CV","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05041","name":"Mahankali Meghana","programme":"B.Tech Mechanical","category":"Scholarship","demand":108000,"paid":1500,"overdue":106500,"initials":"MM","scholarship":30000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05539","name":"Perala Karthik","programme":"B.Tech Mechanical","category":"General","demand":133000,"paid":114500,"overdue":18500,"initials":"PK","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05500","name":"Nune Saranya","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":136500,"overdue":1500,"initials":"NS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05506","name":"Jala Indira","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":122000,"overdue":16000,"initials":"JI","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05129","name":"Kolla Madhuri","programme":"B.Tech Mechanical","category":"General","demand":126000,"paid":111000,"overdue":15000,"initials":"KM","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05053","name":"Dara Deepika","programme":"B.Tech Mechanical","category":"General","demand":133000,"paid":96000,"overdue":37000,"initials":"DD","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05874","name":"Vempati Uday","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":40500,"overdue":97500,"initials":"VU","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05250","name":"Madala Divya","programme":"B.Tech Mechanical","category":"General","demand":133000,"paid":76000,"overdue":57000,"initials":"MD","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05871","name":"Kothapalli Naveen","programme":"B.Tech Mechanical","category":"Scholarship","demand":83000,"paid":42500,"overdue":40500,"initials":"KN","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05005","name":"Kuruba Sowmya","programme":"B.Tech Mechanical","category":"Scholarship","demand":118000,"paid":1000,"overdue":117000,"initials":"KS","scholarship":20000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05609","name":"Vempati Gayatri","programme":"B.Tech Mechanical","category":"Scholarship","demand":98000,"paid":49000,"overdue":49000,"initials":"VG","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05501","name":"Pulipati Siddharth","programme":"B.Tech Mechanical","category":"Management","demand":108000,"paid":93500,"overdue":14500,"initials":"PS","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05788","name":"Bathula Surya","programme":"B.Tech Mechanical","category":"Scholarship","demand":108000,"paid":47000,"overdue":61000,"initials":"BS","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05473","name":"Karicheti Triveni","programme":"B.Tech Mechanical","category":"Management","demand":136000,"paid":133500,"overdue":2500,"initials":"KT","scholarship":0,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA05738","name":"Damacharla Greeshma","programme":"B.Tech Mechanical","category":"Management","demand":138000,"paid":126000,"overdue":12000,"initials":"DG","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA05842","name":"Neelam Ganesh","programme":"B.Tech Mechanical","category":"General","demand":128000,"paid":1000,"overdue":127000,"initials":"NG","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05069","name":"Penumatsa Bharath","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":136500,"overdue":1500,"initials":"PB","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05848","name":"Velpula Niharika","programme":"B.Tech Mechanical","category":"Scholarship","demand":118000,"paid":27000,"overdue":91000,"initials":"VN","scholarship":20000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05762","name":"Devireddy Sowmya","programme":"B.Tech Mechanical","category":"Management","demand":138000,"paid":82000,"overdue":56000,"initials":"DS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05103","name":"Sistla Omkar","programme":"B.Tech Mechanical","category":"General","demand":111000,"paid":81000,"overdue":30000,"initials":"SO","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05597","name":"Yarlagadda Bhavana","programme":"B.Tech Mechanical","category":"General","demand":136000,"paid":101500,"overdue":34500,"initials":"YB","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05249","name":"Gurram Ramya","programme":"B.Tech Mechanical","category":"General","demand":133000,"paid":97000,"overdue":36000,"initials":"GR","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05176","name":"Yalamanchi Gayatri","programme":"B.Tech Mechanical","category":"Management","demand":136000,"paid":133500,"overdue":2500,"initials":"YG","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05980","name":"Madala Chaitra","programme":"B.Tech Mechanical","category":"General","demand":131000,"paid":500,"overdue":130500,"initials":"MC","scholarship":5000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA05734","name":"Muppalla Rohan","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":137000,"overdue":1000,"initials":"MR","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05296","name":"Thota Surya","programme":"B.Tech Mechanical","category":"Management","demand":136000,"paid":81000,"overdue":55000,"initials":"TS","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05394","name":"Kolasani Sai","programme":"B.Tech Mechanical","category":"Management","demand":136000,"paid":61500,"overdue":74500,"initials":"KS","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA05858","name":"Ponnada Reyansh","programme":"B.Tech Mechanical","category":"General","demand":128000,"paid":35500,"overdue":92500,"initials":"PR","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05028","name":"Koganti Abhishek","programme":"B.Tech Mechanical","category":"Scholarship","demand":106000,"paid":32000,"overdue":74000,"initials":"KA","scholarship":30000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05805","name":"Abburi Sathvik","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":138000,"overdue":0,"initials":"AS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05614","name":"Cheemala Ishita","programme":"B.Tech Mechanical","category":"Management","demand":138000,"paid":138000,"overdue":0,"initials":"CI","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05238","name":"Aleti Karthik","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":0,"overdue":138000,"initials":"AK","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05651","name":"Kelam Sandeep","programme":"B.Tech Mechanical","category":"Scholarship","demand":108000,"paid":46000,"overdue":62000,"initials":"KS","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05411","name":"Bandaru Chaitanya","programme":"B.Tech Mechanical","category":"Management","demand":138000,"paid":42000,"overdue":96000,"initials":"BC","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05055","name":"Chennupati Saranya","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":136000,"overdue":2000,"initials":"CS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05401","name":"Moka Nikhil","programme":"B.Tech Mechanical","category":"General","demand":138000,"paid":60500,"overdue":77500,"initials":"MN","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA05947","name":"Nune Manoj","programme":"B.Tech Mechanical","category":"Scholarship","demand":113000,"paid":86500,"overdue":26500,"initials":"NM","scholarship":25000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA05706","name":"Valluri Vishnu","programme":"B.Tech Mechanical","category":"General","demand":128000,"paid":116000,"overdue":12000,"initials":"VV","scholarship":5000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA05761","name":"Thummala Revathi","programme":"B.Tech Mechanical","category":"Scholarship","demand":116000,"paid":83000,"overdue":33000,"initials":"TR","scholarship":20000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA05696","name":"Maddi Nikhil","programme":"B.Tech Mechanical","category":"General","demand":128000,"paid":51000,"overdue":77000,"initials":"MN","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06967","name":"Mekala Omkar","programme":"B.Tech Civil","category":"Management","demand":112500,"paid":67000,"overdue":45500,"initials":"MO","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06325","name":"Shaik Gopal","programme":"B.Tech Civil","category":"General","demand":102500,"paid":42500,"overdue":60000,"initials":"SG","scholarship":5000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA06254","name":"Sathiraju Pallavi","programme":"B.Tech Civil","category":"General","demand":137500,"paid":82500,"overdue":55000,"initials":"SP","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06081","name":"Seshadri Sanjana","programme":"B.Tech Civil","category":"Management","demand":112500,"paid":35000,"overdue":77500,"initials":"SS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06784","name":"Uppala Surya","programme":"B.Tech Civil","category":"General","demand":127500,"paid":53500,"overdue":74000,"initials":"US","scholarship":10000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06619","name":"Mudigonda Mahesh","programme":"B.Tech Civil","category":"General","demand":137500,"paid":137500,"overdue":0,"initials":"MM","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06902","name":"Kolla Lokesh","programme":"B.Tech Civil","category":"Scholarship","demand":107500,"paid":500,"overdue":107000,"initials":"KL","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06563","name":"Mahankali Priya","programme":"B.Tech Civil","category":"Management","demand":112500,"paid":67000,"overdue":45500,"initials":"MP","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06589","name":"Mamidala Gopal","programme":"B.Tech Civil","category":"General","demand":107500,"paid":0,"overdue":107500,"initials":"MG","scholarship":5000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA06529","name":"Devireddy Niharika","programme":"B.Tech Civil","category":"Management","demand":137500,"paid":1500,"overdue":136000,"initials":"DN","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06011","name":"Busiraju Deepika","programme":"B.Tech Civil","category":"General","demand":135500,"paid":40000,"overdue":95500,"initials":"BD","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA06774","name":"Mamillapalli Krishna","programme":"B.Tech Civil","category":"General","demand":132500,"paid":114000,"overdue":18500,"initials":"MK","scholarship":0,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA06740","name":"Pragada Harika","programme":"B.Tech Civil","category":"Scholarship","demand":120500,"paid":30500,"overdue":90000,"initials":"PH","scholarship":15000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA06876","name":"Chidipothu Swathi","programme":"B.Tech Civil","category":"Scholarship","demand":112500,"paid":60500,"overdue":52000,"initials":"CS","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06384","name":"Kasarla Spoorthi","programme":"B.Tech Civil","category":"General","demand":127500,"paid":33500,"overdue":94000,"initials":"KS","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06395","name":"Pachipala Ravi","programme":"B.Tech Civil","category":"Scholarship","demand":92500,"paid":72000,"overdue":20500,"initials":"PR","scholarship":15000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA06901","name":"Chava Kavya","programme":"B.Tech Civil","category":"General","demand":132500,"paid":113500,"overdue":19000,"initials":"CK","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA06077","name":"Jonnalagadda Greeshma","programme":"B.Tech Civil","category":"General","demand":137500,"paid":60000,"overdue":77500,"initials":"JG","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06979","name":"Pulipati Mahesh","programme":"B.Tech Civil","category":"General","demand":112500,"paid":101500,"overdue":11000,"initials":"PM","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06741","name":"Valluri Sathvik","programme":"B.Tech Civil","category":"General","demand":97500,"paid":81500,"overdue":16000,"initials":"VS","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA06713","name":"Enumula Ananya","programme":"B.Tech Civil","category":"General","demand":137500,"paid":124000,"overdue":13500,"initials":"EA","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA06447","name":"Addanki Nandini","programme":"B.Tech Civil","category":"Scholarship","demand":87500,"paid":0,"overdue":87500,"initials":"AN","scholarship":20000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA06894","name":"Valluri Ravi","programme":"B.Tech Civil","category":"General","demand":137500,"paid":42000,"overdue":95500,"initials":"VR","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06489","name":"Pasupuleti Krishna","programme":"B.Tech Civil","category":"Scholarship","demand":112500,"paid":52500,"overdue":60000,"initials":"PK","scholarship":20000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA06479","name":"Muppalla Pranathi","programme":"B.Tech Civil","category":"General","demand":112500,"paid":67500,"overdue":45000,"initials":"MP","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA06419","name":"Khareedu Varshini","programme":"B.Tech Civil","category":"Management","demand":110500,"paid":33500,"overdue":77000,"initials":"KV","scholarship":0,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA06999","name":"Devireddy Sai","programme":"B.Tech Civil","category":"Scholarship","demand":92500,"paid":56500,"overdue":36000,"initials":"DS","scholarship":15000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA06882","name":"Borra Uday","programme":"B.Tech Civil","category":"Scholarship","demand":107500,"paid":44000,"overdue":63500,"initials":"BU","scholarship":30000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA06918","name":"Shaik Samhitha","programme":"B.Tech Civil","category":"Management","demand":137500,"paid":137500,"overdue":0,"initials":"SS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06170","name":"Mamillapalli Hemanth","programme":"B.Tech Civil","category":"General","demand":137500,"paid":124500,"overdue":13000,"initials":"MH","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06556","name":"Vootkur Tanvi","programme":"B.Tech Civil","category":"General","demand":132500,"paid":112000,"overdue":20500,"initials":"VT","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06637","name":"Vasireddy Saranya","programme":"B.Tech Civil","category":"General","demand":112500,"paid":112500,"overdue":0,"initials":"VS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA06788","name":"Bangaru Spoorthi","programme":"B.Tech Civil","category":"General","demand":132500,"paid":94000,"overdue":38500,"initials":"BS","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06163","name":"Damacharla Jyothi","programme":"B.Tech Civil","category":"General","demand":102500,"paid":69000,"overdue":33500,"initials":"DJ","scholarship":5000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA06602","name":"Khareedu Madhuri","programme":"B.Tech Civil","category":"General","demand":132500,"paid":115000,"overdue":17500,"initials":"KM","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06980","name":"Mamillapalli Omkar","programme":"B.Tech Civil","category":"Management","demand":135500,"paid":98500,"overdue":37000,"initials":"MO","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA06305","name":"Guntru Shravya","programme":"B.Tech Civil","category":"General","demand":112500,"paid":68000,"overdue":44500,"initials":"GS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA06575","name":"Madala Deepika","programme":"B.Tech Civil","category":"General","demand":100500,"paid":87000,"overdue":13500,"initials":"MD","scholarship":10000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA06492","name":"Annapureddy Mahesh","programme":"B.Tech Civil","category":"General","demand":135500,"paid":0,"overdue":135500,"initials":"AM","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA06518","name":"Raparthi Gopal","programme":"B.Tech Civil","category":"General","demand":132500,"paid":56000,"overdue":76500,"initials":"RG","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA07504","name":"Chennupati Madhuri","programme":"B.Tech IT","category":"General","demand":145500,"paid":44500,"overdue":101000,"initials":"CM","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07572","name":"Somisetty Indira","programme":"B.Tech IT","category":"General","demand":135500,"paid":37000,"overdue":98500,"initials":"SI","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07808","name":"Manda Divya","programme":"B.Tech IT","category":"General","demand":140500,"paid":133500,"overdue":7000,"initials":"MD","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA07402","name":"Manda Bharath","programme":"B.Tech IT","category":"Management","demand":143500,"paid":128000,"overdue":15500,"initials":"MB","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA07359","name":"Kasarla Kiran","programme":"B.Tech IT","category":"Scholarship","demand":125500,"paid":78500,"overdue":47000,"initials":"KK","scholarship":20000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07636","name":"Duddupudi Harsha","programme":"B.Tech IT","category":"General","demand":135500,"paid":54000,"overdue":81500,"initials":"DH","scholarship":5000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA07403","name":"Padamata Pranay","programme":"B.Tech IT","category":"General","demand":145500,"paid":110000,"overdue":35500,"initials":"PP","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA07495","name":"Tummala Nandini","programme":"B.Tech IT","category":"General","demand":140500,"paid":0,"overdue":140500,"initials":"TN","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA07002","name":"Chatakondu Bharath","programme":"B.Tech IT","category":"Management","demand":140500,"paid":122000,"overdue":18500,"initials":"CB","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA07410","name":"Edpuganti Jahnavi","programme":"B.Tech IT","category":"General","demand":133500,"paid":73500,"overdue":60000,"initials":"EJ","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA07185","name":"Vaddadi Yogesh","programme":"B.Tech IT","category":"Scholarship","demand":130500,"paid":34500,"overdue":96000,"initials":"VY","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07132","name":"Raavi Revathi","programme":"B.Tech IT","category":"Scholarship","demand":120500,"paid":42000,"overdue":78500,"initials":"RR","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07547","name":"Raavi Tanvi","programme":"B.Tech IT","category":"General","demand":140500,"paid":1000,"overdue":139500,"initials":"RT","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA07652","name":"Katta Srujana","programme":"B.Tech IT","category":"General","demand":143500,"paid":84000,"overdue":59500,"initials":"KS","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA07954","name":"Mekala Nikhil","programme":"B.Tech IT","category":"General","demand":140500,"paid":0,"overdue":140500,"initials":"MN","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA07518","name":"Sarabu Lavanya","programme":"B.Tech IT","category":"General","demand":133500,"paid":1000,"overdue":132500,"initials":"SL","scholarship":10000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA07839","name":"Bodapati Sanjana","programme":"B.Tech IT","category":"General","demand":145500,"paid":145000,"overdue":500,"initials":"BS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07313","name":"Avula Ramya","programme":"B.Tech IT","category":"Management","demand":145500,"paid":88000,"overdue":57500,"initials":"AR","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07266","name":"Tummala Deepika","programme":"B.Tech IT","category":"Management","demand":145500,"paid":144500,"overdue":1000,"initials":"TD","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07548","name":"Sathiraju Siddharth","programme":"B.Tech IT","category":"General","demand":135500,"paid":74000,"overdue":61500,"initials":"SS","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA07961","name":"Rangisetty Manoj","programme":"B.Tech IT","category":"General","demand":135500,"paid":124500,"overdue":11000,"initials":"RM","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07742","name":"Devavarapu Sanjana","programme":"B.Tech IT","category":"Management","demand":143500,"paid":104000,"overdue":39500,"initials":"DS","scholarship":0,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA07009","name":"Chatakondu Manoj","programme":"B.Tech IT","category":"General","demand":143500,"paid":128000,"overdue":15500,"initials":"CM","scholarship":0,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA07982","name":"Botta Vaishnavi","programme":"B.Tech IT","category":"General","demand":140500,"paid":134500,"overdue":6000,"initials":"BV","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07533","name":"Immanni Arjun","programme":"B.Tech IT","category":"General","demand":135500,"paid":124000,"overdue":11500,"initials":"IA","scholarship":10000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA07541","name":"Parimi Ramya","programme":"B.Tech IT","category":"Management","demand":145500,"paid":145500,"overdue":0,"initials":"PR","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA07515","name":"Kothuri Indrajit","programme":"B.Tech IT","category":"Management","demand":145500,"paid":43500,"overdue":102000,"initials":"KI","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07483","name":"Madireddy Pallavi","programme":"B.Tech IT","category":"General","demand":140500,"paid":1000,"overdue":139500,"initials":"MP","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07111","name":"Tummala Srikanth","programme":"B.Tech IT","category":"Scholarship","demand":120500,"paid":0,"overdue":120500,"initials":"TS","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07696","name":"Challa Harsha","programme":"B.Tech IT","category":"General","demand":140500,"paid":100500,"overdue":40000,"initials":"CH","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07018","name":"Indukuri Madhuri","programme":"B.Tech IT","category":"General","demand":133500,"paid":35000,"overdue":98500,"initials":"IM","scholarship":10000,"concession":2000,"instalmentPlan":"lump-sum"},
  {"id":"251FA07015","name":"Borra Harsha","programme":"B.Tech IT","category":"Scholarship","demand":130500,"paid":52500,"overdue":78000,"initials":"BH","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07651","name":"Kasarla Hemanth","programme":"B.Tech IT","category":"General","demand":140500,"paid":59000,"overdue":81500,"initials":"KH","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA07628","name":"Sathiraju Harika","programme":"B.Tech IT","category":"Scholarship","demand":120500,"paid":69500,"overdue":51000,"initials":"SH","scholarship":20000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA07746","name":"Pulipati Ganesh","programme":"B.Tech IT","category":"Scholarship","demand":130500,"paid":83500,"overdue":47000,"initials":"PG","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07438","name":"Velpula Harika","programme":"B.Tech IT","category":"Scholarship","demand":130500,"paid":66500,"overdue":64000,"initials":"VH","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07904","name":"Velpula Surya","programme":"B.Tech IT","category":"General","demand":145500,"paid":108000,"overdue":37500,"initials":"VS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07022","name":"Enumula Manasa","programme":"B.Tech IT","category":"General","demand":135500,"paid":73000,"overdue":62500,"initials":"EM","scholarship":10000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA07647","name":"Nannapaneni Harsha","programme":"B.Tech IT","category":"General","demand":135500,"paid":37500,"overdue":98000,"initials":"NH","scholarship":5000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA07098","name":"Bonthu Vikram","programme":"B.Tech IT","category":"General","demand":145500,"paid":144500,"overdue":1000,"initials":"BV","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA07454","name":"Perala Pavan","programme":"B.Tech IT","category":"General","demand":140500,"paid":121500,"overdue":19000,"initials":"PP","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA09421","name":"Kolla Tarun","programme":"MBA","category":"Management","demand":195000,"paid":176000,"overdue":19000,"initials":"KT","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA09730","name":"Yella Akshat","programme":"MBA","category":"Scholarship","demand":170000,"paid":145500,"overdue":24500,"initials":"YA","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA09170","name":"Marella Vishnu","programme":"MBA","category":"General","demand":183000,"paid":169500,"overdue":13500,"initials":"MV","scholarship":10000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA09631","name":"Siripurapu Manoj","programme":"MBA","category":"General","demand":180000,"paid":0,"overdue":180000,"initials":"SM","scholarship":10000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA09911","name":"Patibandla Kavya","programme":"MBA","category":"General","demand":180000,"paid":74500,"overdue":105500,"initials":"PK","scholarship":10000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA09162","name":"Gajula Sahithi","programme":"MBA","category":"General","demand":193000,"paid":189500,"overdue":3500,"initials":"GS","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA09369","name":"Kakarla Revathi","programme":"MBA","category":"Management","demand":190000,"paid":183500,"overdue":6500,"initials":"KR","scholarship":0,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA09120","name":"Garikapati Indira","programme":"MBA","category":"General","demand":195000,"paid":86500,"overdue":108500,"initials":"GI","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA09080","name":"Ponnada Niharika","programme":"MBA","category":"General","demand":195000,"paid":89500,"overdue":105500,"initials":"PN","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA09004","name":"Botta Dhruv","programme":"MBA","category":"General","demand":190000,"paid":167000,"overdue":23000,"initials":"BD","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA09781","name":"Paladugu Ramya","programme":"MBA","category":"Scholarship","demand":170000,"paid":64500,"overdue":105500,"initials":"PR","scholarship":25000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA09115","name":"Mudigonda Abhishek","programme":"MBA","category":"General","demand":195000,"paid":193500,"overdue":1500,"initials":"MA","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA09544","name":"Mahankali Ananya","programme":"MBA","category":"General","demand":195000,"paid":57000,"overdue":138000,"initials":"MA","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA09743","name":"Kothuri Sanjana","programme":"MBA","category":"General","demand":195000,"paid":175500,"overdue":19500,"initials":"KS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA09660","name":"Kothuri Divya","programme":"MBA","category":"General","demand":185000,"paid":50500,"overdue":134500,"initials":"KD","scholarship":5000,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA09606","name":"Chandra Gopal","programme":"MBA","category":"General","demand":190000,"paid":183500,"overdue":6500,"initials":"CG","scholarship":0,"concession":5000,"instalmentPlan":"3-instalment"},
  {"id":"251FA09236","name":"Damacharla Hasini","programme":"MBA","category":"Scholarship","demand":170000,"paid":0,"overdue":170000,"initials":"DH","scholarship":25000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA09880","name":"Yerram Sahithi","programme":"MBA","category":"General","demand":190000,"paid":56500,"overdue":133500,"initials":"YS","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA09266","name":"Sistla Ramya","programme":"MBA","category":"General","demand":188000,"paid":55500,"overdue":132500,"initials":"SR","scholarship":5000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA09619","name":"Jala Vihaan","programme":"MBA","category":"General","demand":195000,"paid":116000,"overdue":79000,"initials":"JV","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA09301","name":"Kalidindi Greeshma","programme":"MBA","category":"General","demand":193000,"paid":0,"overdue":193000,"initials":"KG","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08086","name":"Gutta Sai","programme":"Biotechnology","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"GS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA08184","name":"Cheemala Deepika","programme":"Biotechnology","category":"Scholarship","demand":115000,"paid":84000,"overdue":31000,"initials":"CD","scholarship":30000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA08116","name":"Penumatsa Spoorthi","programme":"Biotechnology","category":"Management","demand":145000,"paid":66000,"overdue":79000,"initials":"PS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA08505","name":"Dara Venkatesh","programme":"Biotechnology","category":"Management","demand":143000,"paid":140000,"overdue":3000,"initials":"DV","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08352","name":"Sistla Aaradhya","programme":"Biotechnology","category":"General","demand":130000,"paid":69500,"overdue":60500,"initials":"SA","scholarship":10000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA08606","name":"Mahankali Ravi","programme":"Biotechnology","category":"Scholarship","demand":118000,"paid":67500,"overdue":50500,"initials":"MR","scholarship":25000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA08397","name":"Kota Pranay","programme":"Biotechnology","category":"Scholarship","demand":115000,"paid":51000,"overdue":64000,"initials":"KP","scholarship":30000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA08288","name":"Nagisetty Jayanth","programme":"Biotechnology","category":"Scholarship","demand":130000,"paid":67500,"overdue":62500,"initials":"NJ","scholarship":15000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA08772","name":"Annapureddy Lakshmi","programme":"Biotechnology","category":"Scholarship","demand":110000,"paid":75000,"overdue":35000,"initials":"AL","scholarship":30000,"concession":5000,"instalmentPlan":"lump-sum"},
  {"id":"251FA08632","name":"Gutta Hemanth","programme":"Biotechnology","category":"General","demand":133000,"paid":71500,"overdue":61500,"initials":"GH","scholarship":10000,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA08297","name":"Sagi Zubin","programme":"Biotechnology","category":"General","demand":140000,"paid":132500,"overdue":7500,"initials":"SZ","scholarship":5000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA08959","name":"Bainaboyina Harika","programme":"Biotechnology","category":"Scholarship","demand":115000,"paid":81500,"overdue":33500,"initials":"BH","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08399","name":"Edpuganti Sujatha","programme":"Biotechnology","category":"General","demand":135000,"paid":121500,"overdue":13500,"initials":"ES","scholarship":5000,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08359","name":"Nallamothu Triveni","programme":"Biotechnology","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"NT","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA08109","name":"Murakonda Reyansh","programme":"Biotechnology","category":"Management","demand":145000,"paid":145000,"overdue":0,"initials":"MR","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08624","name":"Bainaboyina Jahnavi","programme":"Biotechnology","category":"Scholarship","demand":125000,"paid":62500,"overdue":62500,"initials":"BJ","scholarship":20000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08858","name":"Katta Arjun","programme":"Biotechnology","category":"Scholarship","demand":115000,"paid":26500,"overdue":88500,"initials":"KA","scholarship":30000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA08963","name":"Madala Sanjana","programme":"Biotechnology","category":"General","demand":143000,"paid":140000,"overdue":3000,"initials":"MS","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08765","name":"Tummala Yogesh","programme":"Biotechnology","category":"General","demand":143000,"paid":140500,"overdue":2500,"initials":"TY","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08143","name":"Balusu Nandini","programme":"Biotechnology","category":"Scholarship","demand":113000,"paid":74500,"overdue":38500,"initials":"BN","scholarship":30000,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08883","name":"Chidipothu Lavanya","programme":"Biotechnology","category":"General","demand":135000,"paid":109000,"overdue":26000,"initials":"CL","scholarship":10000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08261","name":"Kolla Pallavi","programme":"Biotechnology","category":"Scholarship","demand":120000,"paid":42000,"overdue":78000,"initials":"KP","scholarship":25000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08259","name":"Palli Niharika","programme":"Biotechnology","category":"Management","demand":143000,"paid":85000,"overdue":58000,"initials":"PN","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA08927","name":"Mamillapalli Divya","programme":"Biotechnology","category":"General","demand":140000,"paid":40000,"overdue":100000,"initials":"MD","scholarship":5000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08270","name":"Chatakondu Meghana","programme":"Biotechnology","category":"Scholarship","demand":130000,"paid":0,"overdue":130000,"initials":"CM","scholarship":15000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08296","name":"Kancharla Swathi","programme":"Biotechnology","category":"Scholarship","demand":120000,"paid":56000,"overdue":64000,"initials":"KS","scholarship":25000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA08124","name":"Mamidala Spoorthi","programme":"Biotechnology","category":"General","demand":140000,"paid":61000,"overdue":79000,"initials":"MS","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08101","name":"Moka Nandini","programme":"Biotechnology","category":"Management","demand":145000,"paid":1500,"overdue":143500,"initials":"MN","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA08750","name":"Manda Sravani","programme":"Biotechnology","category":"Management","demand":145000,"paid":145000,"overdue":0,"initials":"MS","scholarship":0,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA08031","name":"Velpula Reyansh","programme":"Biotechnology","category":"General","demand":143000,"paid":107000,"overdue":36000,"initials":"VR","scholarship":0,"concession":2000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08961","name":"Paladugu Niharika","programme":"Biotechnology","category":"General","demand":140000,"paid":132500,"overdue":7500,"initials":"PN","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08640","name":"Dara Vihaan","programme":"Biotechnology","category":"General","demand":145000,"paid":131500,"overdue":13500,"initials":"DV","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08627","name":"Chintoti Bhavana","programme":"Biotechnology","category":"Scholarship","demand":130000,"paid":113500,"overdue":16500,"initials":"CB","scholarship":15000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA08592","name":"Tummala Zubin","programme":"Biotechnology","category":"Scholarship","demand":125000,"paid":92500,"overdue":32500,"initials":"TZ","scholarship":20000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA08044","name":"Ramisetty Pallavi","programme":"Biotechnology","category":"Scholarship","demand":115000,"paid":80500,"overdue":34500,"initials":"RP","scholarship":30000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA08844","name":"Mudigonda Uday","programme":"Biotechnology","category":"General","demand":145000,"paid":0,"overdue":145000,"initials":"MU","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA08426","name":"Mekala Niharika","programme":"Biotechnology","category":"General","demand":140000,"paid":0,"overdue":140000,"initials":"MN","scholarship":0,"concession":5000,"instalmentPlan":"2-instalment"},
  {"id":"251FA08767","name":"Katta Priya","programme":"Biotechnology","category":"Scholarship","demand":115000,"paid":50000,"overdue":65000,"initials":"KP","scholarship":30000,"concession":0,"instalmentPlan":"lump-sum"},
  {"id":"251FA08932","name":"Chennupati Keerthi","programme":"Biotechnology","category":"General","demand":143000,"paid":43500,"overdue":99500,"initials":"CK","scholarship":0,"concession":2000,"instalmentPlan":"3-instalment"},
  {"id":"251FA08917","name":"Lingala Saranya","programme":"Biotechnology","category":"General","demand":145000,"paid":88500,"overdue":56500,"initials":"LS","scholarship":0,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA11001","name":"Kavita Reddy","programme":"B.Pharmacy","category":"General","demand":147000,"paid":117500,"overdue":29500,"initials":"KR","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA11002","name":"Sai Teja Varma","programme":"B.Pharmacy","category":"Scholarship","demand":122000,"paid":97500,"overdue":24500,"initials":"ST","scholarship":25000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA11003","name":"Pooja Nair","programme":"B.Pharmacy","category":"General","demand":117000,"paid":93500,"overdue":23500,"initials":"PN","scholarship":0,"concession":5000,"instalmentPlan":"Lump-sum"},
  {"id":"251FA12001","name":"Vikram Aditya","programme":"M.Tech","category":"General","demand":158000,"paid":126500,"overdue":31500,"initials":"VA","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA12002","name":"Deepika Rao","programme":"M.Tech","category":"Scholarship","demand":128000,"paid":102500,"overdue":25500,"initials":"DR","scholarship":30000,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA12003","name":"Siddharth Sen","programme":"M.Tech","category":"General","demand":133000,"paid":106500,"overdue":26500,"initials":"SS","scholarship":0,"concession":0,"instalmentPlan":"Lump-sum"},
  {"id":"251FA13001","name":"Aarav Singhania","programme":"BBA","category":"General","demand":127000,"paid":101500,"overdue":25500,"initials":"AS","scholarship":0,"concession":0,"instalmentPlan":"2-instalment"},
  {"id":"251FA13002","name":"Meera Nambiar","programme":"BBA","category":"Scholarship","demand":112000,"paid":89500,"overdue":22500,"initials":"MN","scholarship":15000,"concession":0,"instalmentPlan":"3-instalment"},
  {"id":"251FA13003","name":"Rohan Deshmukh","programme":"BBA","category":"Management","demand":98000,"paid":78500,"overdue":19500,"initials":"RD","scholarship":0,"concession":4000,"instalmentPlan":"Lump-sum"},
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
export interface FeeStructureItem {
  programme: string;
  year: string;
  category: "General" | "Scholarship" | "Management" | "NRI";
  route: string;
  head: "Tuition" | "Hostel" | "Examination" | "Laboratory" | "Library" | "Transport" | "Registration" | "Placement & Alumni";
  amount: number;
  effective: string;
  version: string;
  active: boolean;
}

export const feeStructures: FeeStructureItem[] = [
  // ==========================================
  // 1. MBA (Master of Business Administration)
  // ==========================================
  { programme: "MBA", year: "2026–27", category: "General", route: "Entrance / ICET", head: "Tuition", amount: 130000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "MBA", year: "2026–27", category: "General", route: "Entrance / ICET", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "MBA", year: "2026–27", category: "General", route: "Entrance / ICET", head: "Examination", amount: 10000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "MBA", year: "2026–27", category: "General", route: "Entrance / ICET", head: "Laboratory", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "MBA", year: "2026–27", category: "General", route: "Entrance / ICET", head: "Library", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "MBA", year: "2026–27", category: "General", route: "Entrance / ICET", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "MBA", year: "2026–27", category: "General", route: "Entrance / ICET", head: "Placement & Alumni", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  // MBA Archived Version
  { programme: "MBA", year: "2025–26", category: "General", route: "Entrance / ICET", head: "Tuition", amount: 120000, effective: "01 Apr 2025", version: "v2.0", active: false },
  { programme: "MBA", year: "2025–26", category: "General", route: "Entrance / ICET", head: "Hostel", amount: 38000, effective: "01 Apr 2025", version: "v2.0", active: false },

  // ==========================================
  // 2. B.Tech CSE (Computer Science & Engineering)
  // ==========================================
  { programme: "B.Tech CSE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Tuition", amount: 90000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech CSE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech CSE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Examination", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech CSE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Laboratory", amount: 3000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech CSE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Library", amount: 2000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech CSE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech CSE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Registration", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  // B.Tech CSE Archived
  { programme: "B.Tech CSE", year: "2025–26", category: "General", route: "Merit / V-SAT", head: "Tuition", amount: 85000, effective: "01 Apr 2025", version: "v2.0", active: false },
  { programme: "B.Tech CSE", year: "2025–26", category: "General", route: "Merit / V-SAT", head: "Hostel", amount: 38000, effective: "01 Apr 2025", version: "v2.0", active: false },

  // ==========================================
  // 3. B.Tech ECE (Electronics & Communication Engineering)
  // ==========================================
  { programme: "B.Tech ECE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Tuition", amount: 90000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech ECE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech ECE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Examination", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech ECE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Laboratory", amount: 4000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech ECE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Library", amount: 2000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech ECE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech ECE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Registration", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },

  // ==========================================
  // 4. B.Tech IT (Information Technology)
  // ==========================================
  { programme: "B.Tech IT", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Tuition", amount: 90000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech IT", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech IT", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Examination", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech IT", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Laboratory", amount: 3500, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech IT", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Library", amount: 2000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech IT", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech IT", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Registration", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },

  // ==========================================
  // 5. B.Tech EEE (Electrical & Electronics)
  // ==========================================
  { programme: "B.Tech EEE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Tuition", amount: 85000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech EEE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech EEE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Examination", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech EEE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Laboratory", amount: 4500, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech EEE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Library", amount: 2000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech EEE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech EEE", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Registration", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },

  // ==========================================
  // 6. B.Tech Mechanical Engineering
  // ==========================================
  { programme: "B.Tech Mechanical", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Tuition", amount: 80000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Mechanical", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Mechanical", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Examination", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Mechanical", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Laboratory", amount: 6000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Mechanical", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Library", amount: 2000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Mechanical", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Mechanical", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Registration", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },

  // ==========================================
  // 7. B.Tech Civil Engineering
  // ==========================================
  { programme: "B.Tech Civil", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Tuition", amount: 80000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Civil", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Civil", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Examination", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Civil", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Laboratory", amount: 5500, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Civil", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Library", amount: 2000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Civil", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Tech Civil", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Registration", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },

  // ==========================================
  // 8. Biotechnology (B.Tech Bio-Engineering)
  // ==========================================
  { programme: "Biotechnology", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Tuition", amount: 85000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "Biotechnology", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "Biotechnology", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Examination", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "Biotechnology", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Laboratory", amount: 8000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "Biotechnology", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Library", amount: 2000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "Biotechnology", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "Biotechnology", year: "2026–27", category: "General", route: "Merit / V-SAT", head: "Registration", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },

  // ==========================================
  // 9. B.Pharmacy (Bachelor of Pharmacy)
  // ==========================================
  { programme: "B.Pharmacy", year: "2026–27", category: "General", route: "Entrance / EAMCET", head: "Tuition", amount: 85000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Pharmacy", year: "2026–27", category: "General", route: "Entrance / EAMCET", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Pharmacy", year: "2026–27", category: "General", route: "Entrance / EAMCET", head: "Examination", amount: 6000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Pharmacy", year: "2026–27", category: "General", route: "Entrance / EAMCET", head: "Laboratory", amount: 8000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Pharmacy", year: "2026–27", category: "General", route: "Entrance / EAMCET", head: "Library", amount: 3000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Pharmacy", year: "2026–27", category: "General", route: "Entrance / EAMCET", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "B.Pharmacy", year: "2026–27", category: "General", route: "Entrance / EAMCET", head: "Registration", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },

  // ==========================================
  // 10. M.Tech (Master of Technology - CSE & VLSI)
  // ==========================================
  { programme: "M.Tech", year: "2026–27", category: "General", route: "GATE / PGECET", head: "Tuition", amount: 100000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "M.Tech", year: "2026–27", category: "General", route: "GATE / PGECET", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "M.Tech", year: "2026–27", category: "General", route: "GATE / PGECET", head: "Examination", amount: 8000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "M.Tech", year: "2026–27", category: "General", route: "GATE / PGECET", head: "Laboratory", amount: 6000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "M.Tech", year: "2026–27", category: "General", route: "GATE / PGECET", head: "Library", amount: 4000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "M.Tech", year: "2026–27", category: "General", route: "GATE / PGECET", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },

  // ==========================================
  // 11. BBA (Bachelor of Business Administration)
  // ==========================================
  { programme: "BBA", year: "2026–27", category: "General", route: "Merit / Direct", head: "Tuition", amount: 75000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "BBA", year: "2026–27", category: "General", route: "Merit / Direct", head: "Hostel", amount: 40000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "BBA", year: "2026–27", category: "General", route: "Merit / Direct", head: "Examination", amount: 5000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "BBA", year: "2026–27", category: "General", route: "Merit / Direct", head: "Library", amount: 3000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "BBA", year: "2026–27", category: "General", route: "Merit / Direct", head: "Transport", amount: 15000, effective: "01 Apr 2026", version: "v3.0", active: true },
  { programme: "BBA", year: "2026–27", category: "General", route: "Merit / Direct", head: "Registration", amount: 4000, effective: "01 Apr 2026", version: "v3.0", active: true },
];

// Instalment plans data
export { instalmentPlans, type InstalmentPlan, type Instalment, type InstalmentStatus } from "./instalment-plans";

/**
 * Downloads data as a formatted .xlsx Excel file using SheetJS.
 * @param name  Filename (without extension — .xlsx is appended automatically)
 * @param rows  2D array where the first row is treated as the header row
 * @param sheetName  Optional worksheet name
 */
export async function downloadExcel(
  name: string,
  rows: (string | number)[][],
  sheetName = "Report",
) {
  // Dynamically import SheetJS so it doesn't bloat the initial bundle
  const XLSX = await import("xlsx");

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Auto-size columns (approximate based on content length)
  const colWidths = rows[0].map((_, colIdx) =>
    Math.min(
      40,
      Math.max(
        10,
        ...rows.map((row) => String(row[colIdx] ?? "").length + 2),
      ),
    ),
  );
  ws["!cols"] = colWidths.map((w) => ({ wch: w }));

  // Style header row — bold + light indigo background
  const headerLen = rows[0].length;
  for (let c = 0; c < headerLen; c++) {
    const cellAddr = XLSX.utils.encode_cell({ r: 0, c });
    if (!ws[cellAddr]) continue;
    ws[cellAddr].s = {
      font: { bold: true, color: { rgb: "1E1B4B" } },
      fill: { fgColor: { rgb: "EEF2FF" } },
      alignment: { horizontal: "left", vertical: "center", wrapText: false },
      border: {
        bottom: { style: "thin", color: { rgb: "C7D2FE" } },
      },
    };
  }

  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // Write and trigger download
  const baseName = name.replace(/\.(csv|xlsx|xls)$/i, "");
  XLSX.writeFile(wb, `${baseName}.xlsx`);
}

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

/**
 * Opens a formatted PDF fee statement in a new browser tab (print-ready).
 */
export function printStatementPdf(opts: any) {
  let data = opts;
  if (!opts.fees && (opts.id || opts.studentId)) {
    const sId = opts.id || opts.studentId;
    const student = students.find((s) => s.id === sId);
    if (student) {
      data = {
        studentName: student.name,
        studentId: student.id,
        programme: student.programme,
        category: student.category,
        academicYear: "2026–27",
        fees: [
          { head: "Tuition", gross: 90000, scholarship: student.scholarship, demand: 90000 - student.scholarship, paid: Math.min(student.paid, 90000 - student.scholarship), outstanding: Math.max(0, 90000 - student.scholarship - student.paid) },
          { head: "Hostel / Residence", gross: 25000, scholarship: 0, demand: 25000, paid: Math.max(0, Math.min(25000, student.paid - (90000 - student.scholarship))), outstanding: Math.max(0, 25000 - Math.max(0, student.paid - (90000 - student.scholarship))) },
          { head: "Examination & Labs", gross: 5000, scholarship: 0, demand: 5000, paid: 5000, outstanding: 0 },
        ],
        scholarship: student.scholarship,
        concession: student.concession,
        gross: student.demand + student.scholarship,
        demand: student.demand,
        paid: student.paid,
        outstanding: Math.max(0, student.demand - student.paid),
        payments: [
          { id: `RCPT-${student.id.slice(-4)}`, date: "15 Jul 2026", amount: student.paid, method: "Digital Payment", status: "Matched" },
        ],
        priorCycleSettled: 0,
      };
    }
  }

  const feeRows = (data.fees || [])
    .map(
      (f: any) => `<tr>
      <td>${f.head}</td>
      <td class="num">${inr(f.gross)}</td>
      <td class="num ${f.scholarship ? "green" : "dim"}">${f.scholarship ? "−" + inr(f.scholarship) : "—"}</td>
      <td class="num bold">${inr(f.demand)}</td>
      <td class="num green">${inr(f.paid)}</td>
      <td class="num ${f.outstanding > 0 ? "warn" : "green"}">${inr(f.outstanding)}</td>
    </tr>`,
    )
    .join("");

  const payRows = (data.payments || [])
    .map(
      (p: any) => `<tr>
      <td class="mono">${p.id}</td>
      <td>${p.date}</td>
      <td class="num bold">${inr(p.amount)}</td>
      <td>${p.method}</td>
      <td><span class="badge ${p.status === "Matched" || p.status === "Success" ? "badge-green" : p.status === "Mismatch" ? "badge-red" : "badge-blue"}">${p.status}</span></td>
    </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Fee Statement — ${opts.studentName}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',system-ui,sans-serif;background:#f8fafc;padding:32px 16px;color:#1e293b}
    .page{background:#fff;max-width:780px;margin:0 auto;border-radius:16px;box-shadow:0 4px 32px rgba(0,0,0,.08);padding:40px 44px}
    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px}
    .logo-row{display:flex;align-items:center;gap:12px}
    .logo{width:44px;height:44px;border-radius:12px;background:#6366f1;display:flex;align-items:center;justify-content:center}
    .logo svg{width:24px;height:24px;fill:#fff}
    .brand{font-size:18px;font-weight:700;letter-spacing:-.03em}
    .sub{font-size:10px;letter-spacing:.1em;color:#64748b;text-transform:uppercase;margin-top:2px}
    .doc-title{font-size:22px;font-weight:700;letter-spacing:-.04em}
    .doc-sub{font-size:12px;color:#64748b;margin-top:4px}
    .divider{border:none;border-top:1px solid #e2e8f0;margin:20px 0}
    .info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px 24px;background:#f8fafc;border-radius:12px;padding:16px 20px;margin-bottom:24px}
    .info-label{font-size:11px;color:#64748b;letter-spacing:.04em;text-transform:uppercase}
    .info-value{font-size:14px;font-weight:600;margin-top:3px}
    h2{font-size:14px;font-weight:700;letter-spacing:-.01em;margin-bottom:10px;color:#1e293b}
    table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px}
    th{background:#eef2ff;color:#312e81;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.05em;padding:8px 10px;text-align:left;border-bottom:2px solid #c7d2fe}
    td{padding:8px 10px;border-bottom:1px solid #f1f5f9}
    tr:last-child td{border-bottom:none}
    .num{text-align:right;font-variant-numeric:tabular-nums}
    .bold{font-weight:700}
    .green{color:#16a34a}
    .warn{color:#d97706;font-weight:600}
    .dim{color:#94a3b8}
    .mono{font-family:monospace;font-size:12px}
    .total-row td{font-weight:700;border-top:2px solid #e2e8f0;background:#f8fafc}
    .summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
    .summary-card{border-radius:10px;padding:14px 16px}
    .summary-card.blue{background:#eef2ff;border:1px solid #c7d2fe}
    .summary-card.green{background:#f0fdf4;border:1px solid #bbf7d0}
    .summary-card.warn{background:#fffbeb;border:1px solid #fde68a}
    .summary-label{font-size:11px;color:#64748b;margin-bottom:4px}
    .summary-value{font-size:22px;font-weight:800;letter-spacing:-.04em}
    .summary-value.blue{color:#4338ca}
    .summary-value.green{color:#15803d}
    .summary-value.warn{color:#b45309}
    .badge{display:inline-block;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:600}
    .badge-green{background:#f0fdf4;color:#16a34a}
    .badge-red{background:#fef2f2;color:#dc2626}
    .badge-blue{background:#eff6ff;color:#2563eb}
    .footer{margin-top:24px;text-align:center;font-size:11px;color:#94a3b8;line-height:1.6}
    @media print{.no-print{display:none!important}body{padding:0!important}.page{box-shadow:none;border-radius:0;max-width:100%;padding:24px 32px}}
  </style>
</head>
<body>
  <div class="no-print" style="position:sticky;top:0;left:0;right:0;background:#0f172a;color:#f8fafc;padding:10px 24px;display:flex;justify-content:space-between;align-items:center;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.12);margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-weight:700;color:#38bdf8;">VFSTR University</span>
      <span style="color:#94a3b8;font-size:12px;">• Official Student Fee Statement</span>
    </div>
    <div style="display:flex;gap:10px;">
      <button onclick="window.print()" style="background:#0284c7;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:600;font-size:12px;">🖨️ Print / Save as PDF</button>
      <button onclick="window.close()" style="background:#334155;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:500;font-size:12px;">✕ Close</button>
    </div>
  </div>
  <div class="page">
    <div class="header">
      <div class="logo-row">
        <img src="/vignan-logo.png" style="height:44px;max-width:180px;object-fit:contain" alt="VFSTR" />
        <div><div class="brand">VFSTR UNIVERSITY</div><div class="sub">Vignan&apos;s Foundation for Science, Technology & Research</div></div>
      </div>
      <div style="text-align:right">
        <div class="doc-title">Official Fee Statement</div>
        <div class="doc-sub">Academic Year ${data.academicYear || "2026–27"} · VFSTR Treasury</div>
      </div>
    </div>
    <div class="info-grid">
      <div><div class="info-label">Student name</div><div class="info-value">${data.studentName}</div></div>
      <div><div class="info-label">Student ID</div><div class="info-value">${data.studentId}</div></div>
      <div><div class="info-label">Programme</div><div class="info-value">${data.programme}</div></div>
      <div><div class="info-label">Category</div><div class="info-value">${data.category}</div></div>
      <div><div class="info-label">Academic year</div><div class="info-value">${data.academicYear}</div></div>
      <div><div class="info-label">Generated on</div><div class="info-value">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div></div>
    </div>
    <div class="summary-grid">
      <div class="summary-card blue"><div class="summary-label">Final demand</div><div class="summary-value blue">${inr(data.demand)}</div></div>
      <div class="summary-card green"><div class="summary-label">Total paid</div><div class="summary-value green">${inr(data.paid)}</div></div>
      <div class="summary-card ${data.outstanding > 0 ? "warn" : "green"}"><div class="summary-label">Outstanding</div><div class="summary-value ${data.outstanding > 0 ? "warn" : "green"}">${inr(data.outstanding)}</div></div>
    </div>
    <h2>Fee Breakdown</h2>
    <table>
      <thead><tr><th>Fee head</th><th class="num">Gross</th><th class="num">Scholarship</th><th class="num">Demand</th><th class="num">Paid</th><th class="num">Outstanding</th></tr></thead>
      <tbody>${feeRows}</tbody>
      <tfoot>
        <tr class="total-row">
          <td>Total</td>
          <td class="num">${inr(data.gross)}</td>
          <td class="num green">${data.scholarship ? "−" + inr(data.scholarship) : "—"}</td>
          <td class="num">${inr(data.demand)}</td>
          <td class="num green">${inr(data.paid)}</td>
          <td class="num ${data.outstanding > 0 ? "warn" : "green"}">${inr(data.outstanding)}</td>
        </tr>
      </tfoot>
    </table>
    ${data.priorCycleSettled ? `<p style="font-size:12px;color:#64748b;margin:-12px 0 20px">+ ₹${data.priorCycleSettled.toLocaleString("en-IN")} settled prior-cycle demand (excluded from above)</p>` : ""}
    <h2>Payment History</h2>
    <table>
      <thead><tr><th>Receipt / TXN</th><th>Date</th><th class="num">Amount</th><th>Method</th><th>Status</th></tr></thead>
      <tbody>${payRows || "<tr><td colspan='5' style='color:#94a3b8;text-align:center;padding:16px'>No payment records</td></tr>"}</tbody>
    </table>
    <div class="footer">
      Official Fee Statement · Vignan&apos;s Foundation for Science, Technology & Research (VFSTR Deemed to be University)<br/>
      Office of the Comptroller of Finance & Accounts · Vadlamudi Campus, Guntur
    </div>
  </div>
</body>
</html>`;

  openPrintDocument(html);
}

/**
 * Safely opens a printable document in an isolated new window without freezing the parent application.
 * Uses a Blob URL + rel="noopener noreferrer" to detach completely from the parent tab's thread and event loop.
 */
export function openPrintDocument(html: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 180000);
}


/** Opens a print-ready PDF receipt in a new browser tab */
export function printReceiptPdf(opts: any) {
  const receiptNo = opts.receiptNo ?? (opts.id ? `RCPT-${String(opts.id).replace("TXN-", "")}` : "RCPT-001");
  const studentId = opts.studentId ?? opts.student ?? "—";
  const student = students.find((s) => s.id === studentId);
  const studentName = opts.studentName ?? student?.name ?? "Student";
  const programme = opts.programme ?? student?.programme ?? "Undergraduate";
  const date = opts.date ?? new Date().toLocaleDateString("en-IN");
  const amount = opts.amount ?? opts.ledger ?? 0;
  const method = opts.method ?? "Digital Transfer";
  const txnId = opts.txnId ?? opts.id ?? "—";

  const headRows = opts.heads
    ? opts.heads
        .map(
          (h: any) =>
            `<tr><td style="padding:6px 0;color:#64748b">${h.head}</td><td style="padding:6px 0;text-align:right;font-variant-numeric:tabular-nums">${inr(h.amount)}</td></tr>`,
        )
        .join("")
    : `<tr><td style="padding:6px 0;color:#64748b">Fee payment</td><td style="padding:6px 0;text-align:right">${inr(amount)}</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Fee Receipt ${receiptNo}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',system-ui,sans-serif;background:#f8fafc;display:flex;justify-content:center;padding:40px 16px}
    .card{background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,.08);max-width:480px;width:100%;padding:36px}
    .header{display:flex;align-items:center;gap:12px;margin-bottom:24px}
    .logo{width:44px;height:44px;border-radius:12px;background:#6366f1;display:flex;align-items:center;justify-content:center}
    .logo svg{width:24px;height:24px;fill:#fff}
    .brand{font-size:16px;font-weight:700;letter-spacing:-.03em}
    .sub{font-size:10px;letter-spacing:.05em;color:#64748b;text-transform:uppercase;margin-top:2px}
    .divider{border:none;border-top:1px solid #e2e8f0;margin:20px 0}
    .badge{display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;color:#16a34a;border-radius:999px;padding:4px 12px;font-size:12px;font-weight:600;margin-bottom:20px}
    .dot{width:6px;height:6px;border-radius:50%;background:#16a34a}
    .receipt-no{font-size:22px;font-weight:700;letter-spacing:-.04em;color:#1e293b}
    .label{font-size:12px;color:#64748b;margin-bottom:4px}
    .value{font-size:14px;font-weight:500;color:#1e293b}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}
    table{width:100%;border-collapse:collapse;font-size:14px}
    .total-row td{font-weight:700;border-top:1px solid #e2e8f0;padding-top:10px;padding-bottom:0}
    .amount-box{background:#f8fafc;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;margin-top:20px}
    .amount-label{font-size:13px;color:#64748b}
    .amount-value{font-size:26px;font-weight:700;letter-spacing:-.05em;color:#6366f1}
    .footer{margin-top:24px;font-size:12px;color:#94a3b8;text-align:center;line-height:1.6}
    .method-badge{background:#ede9fe;color:#7c3aed;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600}
    @media print{.no-print{display:none!important}body{padding:0!important}.card{box-shadow:none;border-radius:0;max-width:100%}}
  </style>
</head>
<body style="display:flex;flex-direction:column;align-items:center;padding:0 16px 40px 16px;">
  <div class="no-print" style="position:sticky;top:0;left:0;right:0;width:100%;max-width:600px;background:#0f172a;color:#f8fafc;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.12);margin-bottom:24px;border-radius:0 0 10px 10px;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-weight:700;color:#818cf8;">VFSTR University</span>
      <span style="color:#94a3b8;font-size:12px;">• Official Fee Receipt</span>
    </div>
    <div style="display:flex;gap:10px;">
      <button onclick="window.print()" style="background:#6366f1;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:600;font-size:12px;">🖨️ Print / Save as PDF</button>
      <button onclick="window.close()" style="background:#334155;color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:500;font-size:12px;">✕ Close</button>
    </div>
  </div>
  <div class="card">
    <div class="header">
      <img src="/vignan-logo.png" style="height:46px;max-width:160px;object-fit:contain" alt="VFSTR" />
      <div>
        <div class="brand">VFSTR UNIVERSITY</div>
        <div class="sub">Vignan&apos;s Foundation for Science, Technology & Research</div>
      </div>
    </div>
    <div class="badge"><span class="dot"></span> Payment confirmed</div>
    <div class="receipt-no">${receiptNo}</div>
    <hr class="divider"/>
    <div class="grid">
      <div>
        <div class="label">Student name</div>
        <div class="value">${studentName}</div>
      </div>
      <div>
        <div class="label">Student ID</div>
        <div class="value">${studentId}</div>
      </div>
      <div>
        <div class="label">Programme</div>
        <div class="value">${programme}</div>
      </div>
      <div>
        <div class="label">Academic year</div>
        <div class="value">2026–27</div>
      </div>
      <div>
        <div class="label">Date</div>
        <div class="value">${date}</div>
      </div>
      <div>
        <div class="label">Transaction ID</div>
        <div class="value" style="font-family:monospace">${txnId}</div>
      </div>
      <div>
        <div class="label">Payment method</div>
        <div class="value"><span class="method-badge">${method}</span></div>
      </div>
    </div>
    <hr class="divider"/>
    <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:10px">Fee breakdown</div>
    <table>
      <thead>
        <tr>
          <th style="padding-bottom:8px;color:#64748b;font-weight:600;font-size:12px;text-transform:uppercase">Allocation head</th>
          <th style="padding-bottom:8px;text-align:right;color:#64748b;font-weight:600;font-size:12px;text-transform:uppercase">Amount</th>
        </tr>
      </thead>
      <tbody>${headRows}</tbody>
      <tfoot>
        <tr class="total-row">
          <td style="padding-top:10px">Total paid</td>
          <td style="text-align:right;font-variant-numeric:tabular-nums">${inr(opts.amount)}</td>
        </tr>
      </tfoot>
    </table>
    <div class="amount-box">
      <div class="amount-label">Amount paid</div>
      <div class="amount-value">${inr(amount)}</div>
    </div>
    <div style="margin-top:16px;display:flex;align-items:center;gap:8px">
      <div class="label" style="margin:0">Payment method</div>
      <div class="method-badge">${method}</div>
    </div>
    ${opts.note ? `<div style="margin-top:16px;background:#fefce8;border-radius:8px;padding:10px 14px;font-size:12px;color:#854d0e">${opts.note}</div>` : ""}
    <div class="footer">
      Official Fee Receipt · Vignan&apos;s Foundation for Science, Technology & Research (VFSTR Deemed to be University)<br/>
      Comptroller of Finance & Accounts · Vadlamudi, Guntur
    </div>
  </div>
</body>
</html>`;

  openPrintDocument(html);
}
