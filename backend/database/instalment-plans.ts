// Synchronized Instalment Plans for institutional students (AY 2026–27)
export type InstalmentStatus = "Paid" | "Pending" | "Overdue";

export type Instalment = {
  no: number;
  due: string;
  amount: number;
  paid: number;
  status: InstalmentStatus;
  paidOn?: string;
  method?: string;
};

export type InstalmentPlan = {
  studentId: string;
  planId: string;
  planType: string;
  academicYear: string;
  totalDemand: number;
  instalments: Instalment[];
};

export const instalmentPlans: InstalmentPlan[] = [
  {
    "studentId": "251FA04E03",
    "planId": "INST-3001",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 40000,
        "paid": 40000,
        "status": "Paid",
        "paidOn": "12 Apr 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 40000,
        "paid": 40000,
        "status": "Paid",
        "paidOn": "10 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 40000,
        "paid": 12000,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04E21",
    "planId": "INST-3002",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 160000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 80000,
        "paid": 80000,
        "status": "Paid",
        "paidOn": "14 Apr 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 80000,
        "paid": 35000,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04E42",
    "planId": "INST-3003",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 180000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "11 Apr 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "13 Jul 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 60000,
        "paid": 5000,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04E58",
    "planId": "INST-3004",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "14 Apr 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 42000,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04E17",
    "planId": "INST-3005",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 120000,
        "paid": 120000,
        "status": "Paid",
        "paidOn": "10 Apr 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04E36",
    "planId": "INST-3006",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 140000,
        "paid": 140000,
        "status": "Paid",
        "paidOn": "08 Apr 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04645",
    "planId": "INST-3007",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 57500,
        "paid": 57500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 57500,
        "paid": 7500,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04852",
    "planId": "INST-3008",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 132000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04863",
    "planId": "INST-3009",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 65500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04261",
    "planId": "INST-3010",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 37000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04001",
    "planId": "INST-3011",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 32000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04777",
    "planId": "INST-3012",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 145000,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04430",
    "planId": "INST-3013",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 125000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 41666,
        "paid": 41666,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 41666,
        "paid": 37334,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 41668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04219",
    "planId": "INST-3014",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43334,
        "paid": 25834,
        "status": "Pending",
        "paidOn": "24 Jul 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04381",
    "planId": "INST-3015",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 10334,
        "status": "Pending",
        "paidOn": "24 Jul 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04163",
    "planId": "INST-3016",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 35500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04952",
    "planId": "INST-3017",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04940",
    "planId": "INST-3018",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 69000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 60500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04378",
    "planId": "INST-3019",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 125000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 62500,
        "paid": 62500,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 62500,
        "paid": 41500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04069",
    "planId": "INST-3020",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04485",
    "planId": "INST-3021",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 145000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04119",
    "planId": "INST-3022",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04493",
    "planId": "INST-3023",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 88000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04208",
    "planId": "INST-3024",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 59500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04394",
    "planId": "INST-3025",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 27500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04851",
    "planId": "INST-3026",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04464",
    "planId": "INST-3027",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 110000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 55000,
        "paid": 37500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 55000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04140",
    "planId": "INST-3028",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 48334,
        "status": "Paid",
        "paidOn": "10 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04263",
    "planId": "INST-3029",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 9500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04928",
    "planId": "INST-3030",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 65000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65000,
        "paid": 37500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04564",
    "planId": "INST-3031",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 70000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 64500,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04085",
    "planId": "INST-3032",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 145000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04529",
    "planId": "INST-3033",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45000,
        "paid": 45000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45000,
        "paid": 45000,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45000,
        "paid": 21500,
        "status": "Pending",
        "paidOn": "24 Jul 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04978",
    "planId": "INST-3034",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 12500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04387",
    "planId": "INST-3035",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 135000,
        "paid": 124000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04068",
    "planId": "INST-3036",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04348",
    "planId": "INST-3037",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 40000,
        "paid": 500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 40000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 40000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04719",
    "planId": "INST-3038",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 129000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04511",
    "planId": "INST-3039",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 64500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04885",
    "planId": "INST-3040",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 69000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 49000,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04909",
    "planId": "INST-3041",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 135000,
        "paid": 92000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04644",
    "planId": "INST-3042",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 116500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04853",
    "planId": "INST-3043",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 51500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04189",
    "planId": "INST-3044",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 133000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04064",
    "planId": "INST-3045",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04418",
    "planId": "INST-3046",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 47334,
        "status": "Pending",
        "paidOn": "10 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04897",
    "planId": "INST-3047",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 48334,
        "status": "Paid",
        "paidOn": "22 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04416",
    "planId": "INST-3048",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 65500,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04346",
    "planId": "INST-3049",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67500,
        "paid": 67500,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67500,
        "paid": 25000,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04455",
    "planId": "INST-3050",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43334,
        "paid": 27334,
        "status": "Pending",
        "paidOn": "08 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04953",
    "planId": "INST-3051",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64000,
        "paid": 64000,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64000,
        "paid": 47500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04575",
    "planId": "INST-3052",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 15000,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04741",
    "planId": "INST-3053",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 33000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04428",
    "planId": "INST-3054",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43334,
        "paid": 25334,
        "status": "Pending",
        "paidOn": "10 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04684",
    "planId": "INST-3055",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 17167,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04282",
    "planId": "INST-3056",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 13500,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04028",
    "planId": "INST-3057",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 86500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04496",
    "planId": "INST-3058",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47666,
        "paid": 47666,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47666,
        "paid": 47666,
        "status": "Paid",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47668,
        "paid": 11168,
        "status": "Pending",
        "paidOn": "02 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04400",
    "planId": "INST-3059",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67500,
        "paid": 500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04379",
    "planId": "INST-3060",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 131000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04712",
    "planId": "INST-3061",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 38000,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04449",
    "planId": "INST-3062",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04025",
    "planId": "INST-3063",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67500,
        "paid": 67500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67500,
        "paid": 56500,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04060",
    "planId": "INST-3064",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 70000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 63000,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04108",
    "planId": "INST-3065",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 72000,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04784",
    "planId": "INST-3066",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46666,
        "paid": 46666,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46666,
        "paid": 46666,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46668,
        "paid": 8168,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04854",
    "planId": "INST-3067",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 63500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04701",
    "planId": "INST-3068",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 25500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04018",
    "planId": "INST-3069",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 48334,
        "status": "Paid",
        "paidOn": "10 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04610",
    "planId": "INST-3070",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 37500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04223",
    "planId": "INST-3071",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 65000,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65000,
        "paid": 20500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04426",
    "planId": "INST-3072",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 41500,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04002",
    "planId": "INST-3073",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 59000,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04427",
    "planId": "INST-3074",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 125000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 62500,
        "paid": 61500,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 62500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04704",
    "planId": "INST-3075",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 33000,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04924",
    "planId": "INST-3076",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04569",
    "planId": "INST-3077",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 78000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04095",
    "planId": "INST-3078",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 135000,
        "paid": 56500,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04034",
    "planId": "INST-3079",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 113000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 56500,
        "paid": 56500,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 56500,
        "paid": 23000,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04495",
    "planId": "INST-3080",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 70000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 29500,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04210",
    "planId": "INST-3081",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04925",
    "planId": "INST-3082",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 65000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65000,
        "paid": 36000,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04676",
    "planId": "INST-3083",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 69000,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04894",
    "planId": "INST-3084",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 110000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 55000,
        "paid": 36000,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 55000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04919",
    "planId": "INST-3085",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 72000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04868",
    "planId": "INST-3086",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 38333,
        "paid": 38333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 38333,
        "paid": 37167,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 38334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04178",
    "planId": "INST-3087",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 33000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04935",
    "planId": "INST-3088",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 17167,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04443",
    "planId": "INST-3089",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47666,
        "paid": 47666,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47666,
        "paid": 16334,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04770",
    "planId": "INST-3090",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67500,
        "paid": 38500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04539",
    "planId": "INST-3091",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 57500,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 57500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04765",
    "planId": "INST-3092",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 24500,
        "status": "Pending",
        "paidOn": "08 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04250",
    "planId": "INST-3093",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04145",
    "planId": "INST-3094",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 500,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04147",
    "planId": "INST-3095",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 16667,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04197",
    "planId": "INST-3096",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 109500,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04174",
    "planId": "INST-3097",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04810",
    "planId": "INST-3098",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 70000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 31000,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04093",
    "planId": "INST-3099",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 35334,
        "status": "Pending",
        "paidOn": "22 Jun 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04434",
    "planId": "INST-3100",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 88000,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04473",
    "planId": "INST-3101",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 31834,
        "status": "Pending",
        "paidOn": "22 Jun 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04802",
    "planId": "INST-3102",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 130000,
        "paid": 50500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04806",
    "planId": "INST-3103",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04612",
    "planId": "INST-3104",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 143000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04019",
    "planId": "INST-3105",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 15667,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04713",
    "planId": "INST-3106",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 15000,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04063",
    "planId": "INST-3107",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 125000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 62500,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 62500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04763",
    "planId": "INST-3108",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 135000,
        "paid": 112000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04484",
    "planId": "INST-3109",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 44500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04089",
    "planId": "INST-3110",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 34000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04934",
    "planId": "INST-3111",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 125000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 62500,
        "paid": 48500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 62500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04220",
    "planId": "INST-3112",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04554",
    "planId": "INST-3113",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46666,
        "paid": 46666,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46666,
        "paid": 46666,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46668,
        "paid": 28168,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04370",
    "planId": "INST-3114",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 97500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04334",
    "planId": "INST-3115",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 70000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 64000,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04527",
    "planId": "INST-3116",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 71500,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04562",
    "planId": "INST-3117",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 113000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 56500,
        "paid": 56500,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 56500,
        "paid": 19500,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04144",
    "planId": "INST-3118",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 66500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04942",
    "planId": "INST-3119",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 70000,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 11500,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04393",
    "planId": "INST-3120",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04487",
    "planId": "INST-3121",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 58000,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04401",
    "planId": "INST-3122",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 135000,
        "paid": 76000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04037",
    "planId": "INST-3123",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 43000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04725",
    "planId": "INST-3124",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 60000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 36500,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04022",
    "planId": "INST-3125",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04241",
    "planId": "INST-3126",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 108000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA04161",
    "planId": "INST-3127",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 70000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 32000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04371",
    "planId": "INST-3128",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04318",
    "planId": "INST-3129",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 144000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA04651",
    "planId": "INST-3130",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 38500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04129",
    "planId": "INST-3131",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 43500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04278",
    "planId": "INST-3132",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43334,
        "paid": 15834,
        "status": "Pending",
        "paidOn": "10 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA04749",
    "planId": "INST-3133",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 108500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA04146",
    "planId": "INST-3134",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 40000,
        "paid": 30500,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 40000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 40000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA04332",
    "planId": "INST-3135",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 42500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA04565",
    "planId": "INST-3136",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA04687",
    "planId": "INST-3137",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 143000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03360",
    "planId": "INST-3138",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 42000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 42000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 42000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03886",
    "planId": "INST-3139",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 13500,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03011",
    "planId": "INST-3140",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 13000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03823",
    "planId": "INST-3141",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 146000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03398",
    "planId": "INST-3142",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65500,
        "paid": 65500,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65500,
        "paid": 36000,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03219",
    "planId": "INST-3143",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 144000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72000,
        "paid": 72000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72000,
        "paid": 69000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03187",
    "planId": "INST-3144",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 34168,
        "status": "Pending",
        "paidOn": "22 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03861",
    "planId": "INST-3145",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 72500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03986",
    "planId": "INST-3146",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 144000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72000,
        "paid": 64000,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03218",
    "planId": "INST-3147",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 45000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03943",
    "planId": "INST-3148",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 126000,
        "paid": 104500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03193",
    "planId": "INST-3149",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 40334,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03891",
    "planId": "INST-3150",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 136000,
        "paid": 72500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03569",
    "planId": "INST-3151",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 116000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 38666,
        "paid": 38666,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 38666,
        "paid": 23334,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 38668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03979",
    "planId": "INST-3152",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 64000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03898",
    "planId": "INST-3153",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63000,
        "paid": 63000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63000,
        "paid": 14500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03285",
    "planId": "INST-3154",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 141000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03009",
    "planId": "INST-3155",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 134000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 134000,
        "paid": 54000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03286",
    "planId": "INST-3156",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 18334,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03975",
    "planId": "INST-3157",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 136000,
        "paid": 73500,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03300",
    "planId": "INST-3158",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 146000,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03350",
    "planId": "INST-3159",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 146000,
        "paid": 87500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03031",
    "planId": "INST-3160",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65500,
        "paid": 65500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65500,
        "paid": 48000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03492",
    "planId": "INST-3161",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 121000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 121000,
        "paid": 500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03474",
    "planId": "INST-3162",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43666,
        "paid": 43666,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43666,
        "paid": 43666,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43668,
        "paid": 26668,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03982",
    "planId": "INST-3163",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70500,
        "paid": 70500,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70500,
        "paid": 63000,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03520",
    "planId": "INST-3164",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 139000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 139000,
        "paid": 129500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03797",
    "planId": "INST-3165",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 134000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67000,
        "paid": 67000,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67000,
        "paid": 4000,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03159",
    "planId": "INST-3166",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 57000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03544",
    "planId": "INST-3167",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 141000,
        "paid": 39000,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03209",
    "planId": "INST-3168",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68000,
        "paid": 37000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03811",
    "planId": "INST-3169",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 15834,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03692",
    "planId": "INST-3170",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 139000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 139000,
        "paid": 59000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03608",
    "planId": "INST-3171",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 139000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69500,
        "paid": 69500,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69500,
        "paid": 59500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03121",
    "planId": "INST-3172",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 65000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03293",
    "planId": "INST-3173",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 146000,
        "paid": 66000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03658",
    "planId": "INST-3174",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 57500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03735",
    "planId": "INST-3175",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 129000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 129000,
        "paid": 100000,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03694",
    "planId": "INST-3176",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 34168,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03122",
    "planId": "INST-3177",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47000,
        "paid": 47000,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47000,
        "paid": 47000,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47000,
        "paid": 40500,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03418",
    "planId": "INST-3178",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 126000,
        "paid": 93500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03207",
    "planId": "INST-3179",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 146000,
        "paid": 132500,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03406",
    "planId": "INST-3180",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 116000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 58000,
        "paid": 58000,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 58000,
        "paid": 21500,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03573",
    "planId": "INST-3181",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70500,
        "paid": 70500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70500,
        "paid": 31000,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03565",
    "planId": "INST-3182",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 17834,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03784",
    "planId": "INST-3183",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 64500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03177",
    "planId": "INST-3184",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 36500,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03895",
    "planId": "INST-3185",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 39834,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03438",
    "planId": "INST-3186",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 144000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72000,
        "paid": 72000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72000,
        "paid": 12500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03973",
    "planId": "INST-3187",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 144000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 144000,
        "paid": 63000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03894",
    "planId": "INST-3188",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 65500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03556",
    "planId": "INST-3189",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 139000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 139000,
        "paid": 118500,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03499",
    "planId": "INST-3190",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 116000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 116000,
        "paid": 84000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03880",
    "planId": "INST-3191",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47000,
        "paid": 47000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47000,
        "paid": 33000,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03788",
    "planId": "INST-3192",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 144000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72000,
        "paid": 63000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03705",
    "planId": "INST-3193",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 146000,
        "paid": 145000,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03356",
    "planId": "INST-3194",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 16834,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03361",
    "planId": "INST-3195",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 144000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48000,
        "paid": 48000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48000,
        "paid": 16500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03244",
    "planId": "INST-3196",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70500,
        "paid": 70500,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70500,
        "paid": 30500,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03810",
    "planId": "INST-3197",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68000,
        "paid": 68000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68000,
        "paid": 26500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03366",
    "planId": "INST-3198",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 131000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 131000,
        "paid": 102000,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03998",
    "planId": "INST-3199",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 141000,
        "paid": 135500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03164",
    "planId": "INST-3200",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 116000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 38666,
        "paid": 38666,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 38666,
        "paid": 35334,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 38668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03377",
    "planId": "INST-3201",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 38500,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03329",
    "planId": "INST-3202",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70500,
        "paid": 70500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70500,
        "paid": 63000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03229",
    "planId": "INST-3203",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 146000,
        "paid": 146000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03359",
    "planId": "INST-3204",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45333,
        "paid": 45333,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45333,
        "paid": 29667,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03025",
    "planId": "INST-3205",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 43000,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03576",
    "planId": "INST-3206",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 65000,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03575",
    "planId": "INST-3207",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70500,
        "paid": 70500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70500,
        "paid": 51500,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03704",
    "planId": "INST-3208",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 141000,
        "paid": 135000,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03058",
    "planId": "INST-3209",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 141000,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03052",
    "planId": "INST-3210",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 126000,
        "paid": 62000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03949",
    "planId": "INST-3211",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70500,
        "paid": 70500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70500,
        "paid": 10500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03311",
    "planId": "INST-3212",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03113",
    "planId": "INST-3213",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 111000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 55500,
        "paid": 55500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 55500,
        "paid": 24500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03271",
    "planId": "INST-3214",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47000,
        "paid": 47000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47000,
        "paid": 47000,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47000,
        "paid": 41000,
        "status": "Pending",
        "paidOn": "24 Jul 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03324",
    "planId": "INST-3215",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47000,
        "paid": 47000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47000,
        "paid": 47000,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47000,
        "paid": 28000,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03476",
    "planId": "INST-3216",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 146000,
        "paid": 88500,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03956",
    "planId": "INST-3217",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 36000,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03242",
    "planId": "INST-3218",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43666,
        "paid": 33500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43666,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03013",
    "planId": "INST-3219",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 111000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 111000,
        "paid": 48000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03043",
    "planId": "INST-3220",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 141000,
        "paid": 60500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03511",
    "planId": "INST-3221",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03728",
    "planId": "INST-3222",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 121000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60500,
        "paid": 28000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03023",
    "planId": "INST-3223",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 116000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 58000,
        "paid": 58000,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 58000,
        "paid": 29500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03446",
    "planId": "INST-3224",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 116000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 58000,
        "paid": 24500,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 58000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03820",
    "planId": "INST-3225",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47000,
        "paid": 42000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA03670",
    "planId": "INST-3226",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 134000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67000,
        "paid": 500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03401",
    "planId": "INST-3227",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 141000,
        "paid": 62000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03069",
    "planId": "INST-3228",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 114000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 57000,
        "paid": 57000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 57000,
        "paid": 22000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03352",
    "planId": "INST-3229",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45333,
        "paid": 45333,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45333,
        "paid": 45333,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45334,
        "paid": 32334,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03543",
    "planId": "INST-3230",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48666,
        "paid": 48666,
        "status": "Paid",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48668,
        "paid": 48668,
        "status": "Paid",
        "paidOn": "22 Jun 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03707",
    "planId": "INST-3231",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65500,
        "paid": 65500,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65500,
        "paid": 3000,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA03027",
    "planId": "INST-3232",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 126000,
        "paid": 77500,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA03839",
    "planId": "INST-3233",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70500,
        "paid": 70500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70500,
        "paid": 64000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA03940",
    "planId": "INST-3234",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68000,
        "paid": 54000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA03620",
    "planId": "INST-3235",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63000,
        "paid": 63000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63000,
        "paid": 31500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03362",
    "planId": "INST-3236",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45333,
        "paid": 45333,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45333,
        "paid": 45333,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45334,
        "paid": 33834,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA03365",
    "planId": "INST-3237",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70500,
        "paid": 70500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70500,
        "paid": 31500,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA03116",
    "planId": "INST-3238",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 146000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73000,
        "paid": 73000,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73000,
        "paid": 58000,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02424",
    "planId": "INST-3239",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 42166,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 42166,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 42168,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA02402",
    "planId": "INST-3240",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 121500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 121500,
        "paid": 100000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02253",
    "planId": "INST-3241",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 119500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 59750,
        "paid": 59750,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 59750,
        "paid": 11750,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA02576",
    "planId": "INST-3242",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43833,
        "paid": 43833,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43833,
        "paid": 43833,
        "status": "Paid",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43834,
        "paid": 31334,
        "status": "Pending",
        "paidOn": "02 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02668",
    "planId": "INST-3243",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68250,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02739",
    "planId": "INST-3244",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 139500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69750,
        "paid": 69750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69750,
        "paid": 65750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA02189",
    "planId": "INST-3245",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 129500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64750,
        "paid": 64750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64750,
        "paid": 49750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA02661",
    "planId": "INST-3246",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70750,
        "paid": 70750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70750,
        "paid": 69750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02312",
    "planId": "INST-3247",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45500,
        "paid": 45500,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45500,
        "paid": 45500,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45500,
        "paid": 38500,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA02068",
    "planId": "INST-3248",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65750,
        "paid": 65750,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65750,
        "paid": 4750,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA02504",
    "planId": "INST-3249",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 111500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37166,
        "paid": 37166,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37166,
        "paid": 37166,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37168,
        "paid": 6668,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA02966",
    "planId": "INST-3250",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 139500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69750,
        "paid": 62000,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02393",
    "planId": "INST-3251",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 124500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 41500,
        "paid": 41500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 41500,
        "paid": 41500,
        "status": "Paid",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 41500,
        "paid": 19500,
        "status": "Pending",
        "paidOn": "22 Jun 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA02149",
    "planId": "INST-3252",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 141500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 141500,
        "paid": 107500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA02185",
    "planId": "INST-3253",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 139500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69750,
        "paid": 69750,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69750,
        "paid": 66250,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA02006",
    "planId": "INST-3254",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 109500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 36500,
        "paid": 36500,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 36500,
        "paid": 36500,
        "status": "Paid",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 36500,
        "paid": 3000,
        "status": "Pending",
        "paidOn": "05 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02963",
    "planId": "INST-3255",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65750,
        "paid": 65750,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65750,
        "paid": 7250,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA02717",
    "planId": "INST-3256",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70750,
        "paid": 70750,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70750,
        "paid": 13250,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02672",
    "planId": "INST-3257",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63250,
        "paid": 63250,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63250,
        "paid": 2250,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02197",
    "planId": "INST-3258",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 116500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 58250,
        "paid": 42500,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 58250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02571",
    "planId": "INST-3259",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65750,
        "paid": 65750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65750,
        "paid": 5750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02067",
    "planId": "INST-3260",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45500,
        "paid": 45500,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45500,
        "paid": 33500,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45500,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA02552",
    "planId": "INST-3261",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65750,
        "paid": 65750,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65750,
        "paid": 23750,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02992",
    "planId": "INST-3262",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 119500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 119500,
        "paid": 73000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02235",
    "planId": "INST-3263",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 136500,
        "paid": 130000,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA02718",
    "planId": "INST-3264",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65750,
        "paid": 65750,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65750,
        "paid": 39750,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA02793",
    "planId": "INST-3265",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 121500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60750,
        "paid": 45000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02061",
    "planId": "INST-3266",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 129500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64750,
        "paid": 64750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64750,
        "paid": 40250,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02984",
    "planId": "INST-3267",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 129500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43166,
        "paid": 34500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43166,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43168,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA02236",
    "planId": "INST-3268",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 139500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69750,
        "paid": 40000,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02752",
    "planId": "INST-3269",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 121500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 121500,
        "paid": 87000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02039",
    "planId": "INST-3270",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68250,
        "paid": 68250,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68250,
        "paid": 61750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA02946",
    "planId": "INST-3271",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68250,
        "paid": 68250,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68250,
        "paid": 61750,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02762",
    "planId": "INST-3272",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 129500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64750,
        "paid": 50500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02509",
    "planId": "INST-3273",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47166,
        "paid": 47166,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47166,
        "paid": 47166,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47168,
        "paid": 32168,
        "status": "Pending",
        "paidOn": "24 Jul 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA02664",
    "planId": "INST-3274",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 129500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64750,
        "paid": 34500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02323",
    "planId": "INST-3275",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 131500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 131500,
        "paid": 119000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02261",
    "planId": "INST-3276",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 42166,
        "paid": 42166,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 42166,
        "paid": 42166,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 42168,
        "paid": 26168,
        "status": "Pending",
        "paidOn": "24 Jul 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02031",
    "planId": "INST-3277",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68250,
        "paid": 68250,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68250,
        "paid": 11750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02614",
    "planId": "INST-3278",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43833,
        "paid": 43833,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43833,
        "paid": 43833,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43834,
        "paid": 2834,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA02828",
    "planId": "INST-3279",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 139500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 139500,
        "paid": 135500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02919",
    "planId": "INST-3280",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70750,
        "paid": 65000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02543",
    "planId": "INST-3281",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 111500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37166,
        "paid": 37166,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37166,
        "paid": 37166,
        "status": "Paid",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37168,
        "paid": 4168,
        "status": "Pending",
        "paidOn": "05 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02823",
    "planId": "INST-3282",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 111500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37166,
        "paid": 34500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37166,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37168,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA02534",
    "planId": "INST-3283",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63250,
        "paid": 63250,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63250,
        "paid": 35250,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA02856",
    "planId": "INST-3284",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 139500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46500,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA02662",
    "planId": "INST-3285",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 136500,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02093",
    "planId": "INST-3286",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63250,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02796",
    "planId": "INST-3287",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70750,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02539",
    "planId": "INST-3288",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 114500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 38166,
        "paid": 38166,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 38166,
        "paid": 38166,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 38168,
        "paid": 1668,
        "status": "Pending",
        "paidOn": "05 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA02319",
    "planId": "INST-3289",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 116500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 58250,
        "paid": 58250,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 58250,
        "paid": 29250,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA02784",
    "planId": "INST-3290",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 141500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70750,
        "paid": 61500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02501",
    "planId": "INST-3291",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68250,
        "paid": 68250,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68250,
        "paid": 8750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA02176",
    "planId": "INST-3292",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 139500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69750,
        "paid": 62500,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA02887",
    "planId": "INST-3293",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 116500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 116500,
        "paid": 88000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05512",
    "planId": "INST-3294",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 62500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05468",
    "planId": "INST-3295",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 83000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05824",
    "planId": "INST-3296",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 45500,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA05104",
    "planId": "INST-3297",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 131000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43666,
        "paid": 43666,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43666,
        "paid": 43666,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43668,
        "paid": 20168,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA05487",
    "planId": "INST-3298",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 121000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60500,
        "paid": 60500,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60500,
        "paid": 42000,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05984",
    "planId": "INST-3299",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 103500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA05827",
    "planId": "INST-3300",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 111000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37000,
        "paid": 33000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA05319",
    "planId": "INST-3301",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 106000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 106000,
        "paid": 21500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA05133",
    "planId": "INST-3302",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 133000,
        "paid": 76000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05991",
    "planId": "INST-3303",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 111000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 55500,
        "paid": 55500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 55500,
        "paid": 53000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05948",
    "planId": "INST-3304",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 10000,
        "status": "Pending",
        "paidOn": "10 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA05682",
    "planId": "INST-3305",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 66500,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 66500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05154",
    "planId": "INST-3306",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 42000,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA05687",
    "planId": "INST-3307",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64000,
        "paid": 64000,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64000,
        "paid": 41500,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05828",
    "planId": "INST-3308",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 128000,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05373",
    "planId": "INST-3309",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 126000,
        "paid": 102500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05474",
    "planId": "INST-3310",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 10000,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA05708",
    "planId": "INST-3311",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 128000,
        "paid": 51000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05232",
    "planId": "INST-3312",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68000,
        "paid": 68000,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68000,
        "paid": 33000,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05067",
    "planId": "INST-3313",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 113000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37666,
        "paid": 37666,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37666,
        "paid": 15334,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA05640",
    "planId": "INST-3314",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45333,
        "paid": 45333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45333,
        "paid": 45333,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45334,
        "paid": 30334,
        "status": "Pending",
        "paidOn": "10 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05622",
    "planId": "INST-3315",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 32000,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA05102",
    "planId": "INST-3316",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63000,
        "paid": 63000,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63000,
        "paid": 47500,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05041",
    "planId": "INST-3317",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 108000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 108000,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA05539",
    "planId": "INST-3318",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 66500,
        "paid": 66500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 66500,
        "paid": 48000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA05500",
    "planId": "INST-3319",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 136500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA05506",
    "planId": "INST-3320",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 30000,
        "status": "Pending",
        "paidOn": "02 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05129",
    "planId": "INST-3321",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 126000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63000,
        "paid": 63000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63000,
        "paid": 48000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA05053",
    "planId": "INST-3322",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 66500,
        "paid": 66500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 66500,
        "paid": 29500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA05874",
    "planId": "INST-3323",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 40500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05250",
    "planId": "INST-3324",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 44333,
        "paid": 44333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 44333,
        "paid": 31667,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 44334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA05871",
    "planId": "INST-3325",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 83000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 41500,
        "paid": 41500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 41500,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05005",
    "planId": "INST-3326",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 118000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 59000,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 59000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05609",
    "planId": "INST-3327",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 98000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 49000,
        "paid": 49000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 49000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05501",
    "planId": "INST-3328",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 108000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 54000,
        "paid": 54000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 54000,
        "paid": 39500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05788",
    "planId": "INST-3329",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 108000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 54000,
        "paid": 47000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 54000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05473",
    "planId": "INST-3330",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 136000,
        "paid": 133500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05738",
    "planId": "INST-3331",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 138000,
        "paid": 126000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05842",
    "planId": "INST-3332",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64000,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05069",
    "planId": "INST-3333",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 69000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 67500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA05848",
    "planId": "INST-3334",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 118000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 39333,
        "paid": 27000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 39333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 39334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA05762",
    "planId": "INST-3335",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 69000,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 13000,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05103",
    "planId": "INST-3336",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 111000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 55500,
        "paid": 55500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 55500,
        "paid": 25500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA05597",
    "planId": "INST-3337",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68000,
        "paid": 68000,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68000,
        "paid": 33500,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA05249",
    "planId": "INST-3338",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 66500,
        "paid": 66500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 66500,
        "paid": 30500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA05176",
    "planId": "INST-3339",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68000,
        "paid": 68000,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68000,
        "paid": 65500,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05980",
    "planId": "INST-3340",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 131000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 131000,
        "paid": 500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA05734",
    "planId": "INST-3341",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 69000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 68000,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA05296",
    "planId": "INST-3342",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68000,
        "paid": 68000,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68000,
        "paid": 13000,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05394",
    "planId": "INST-3343",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 136000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45333,
        "paid": 45333,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45333,
        "paid": 16167,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA05858",
    "planId": "INST-3344",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64000,
        "paid": 35500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05028",
    "planId": "INST-3345",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 106000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 53000,
        "paid": 32000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 53000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05805",
    "planId": "INST-3346",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "08 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05614",
    "planId": "INST-3347",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 46000,
        "status": "Paid",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA05238",
    "planId": "INST-3348",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05651",
    "planId": "INST-3349",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 108000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 54000,
        "paid": 46000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 54000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05411",
    "planId": "INST-3350",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46000,
        "paid": 42000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA05055",
    "planId": "INST-3351",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 69000,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 67000,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA05401",
    "planId": "INST-3352",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 138000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 69000,
        "paid": 60500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 69000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA05947",
    "planId": "INST-3353",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 113000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37666,
        "paid": 37666,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37666,
        "paid": 37666,
        "status": "Paid",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37668,
        "paid": 11168,
        "status": "Pending",
        "paidOn": "22 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA05706",
    "planId": "INST-3354",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64000,
        "paid": 64000,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64000,
        "paid": 52000,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA05761",
    "planId": "INST-3355",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 116000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 116000,
        "paid": 83000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA05696",
    "planId": "INST-3356",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64000,
        "paid": 51000,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06967",
    "planId": "INST-3357",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 56250,
        "paid": 56250,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 56250,
        "paid": 10750,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA06325",
    "planId": "INST-3358",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 102500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 102500,
        "paid": 42500,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA06254",
    "planId": "INST-3359",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 137500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68750,
        "paid": 68750,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68750,
        "paid": 13750,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA06081",
    "planId": "INST-3360",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 56250,
        "paid": 35000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 56250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06784",
    "planId": "INST-3361",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 127500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 42500,
        "paid": 42500,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 42500,
        "paid": 11000,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 42500,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA06619",
    "planId": "INST-3362",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 137500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68750,
        "paid": 68750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68750,
        "paid": 68750,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA06902",
    "planId": "INST-3363",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 107500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 53750,
        "paid": 500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 53750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06563",
    "planId": "INST-3364",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37500,
        "paid": 37500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37500,
        "paid": 29500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37500,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA06589",
    "planId": "INST-3365",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 107500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 107500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06529",
    "planId": "INST-3366",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 137500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68750,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06011",
    "planId": "INST-3367",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67750,
        "paid": 40000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06774",
    "planId": "INST-3368",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 132500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 44168,
        "paid": 25668,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA06740",
    "planId": "INST-3369",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 120500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 120500,
        "paid": 30500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA06876",
    "planId": "INST-3370",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 56250,
        "paid": 56250,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 56250,
        "paid": 4250,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA06384",
    "planId": "INST-3371",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 127500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63750,
        "paid": 33500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06395",
    "planId": "INST-3372",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 92500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46250,
        "paid": 46250,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 46250,
        "paid": 25750,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA06901",
    "planId": "INST-3373",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 132500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 132500,
        "paid": 113500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA06077",
    "planId": "INST-3374",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 137500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45833,
        "paid": 45833,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45833,
        "paid": 14167,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45834,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA06979",
    "planId": "INST-3375",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37500,
        "paid": 37500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37500,
        "paid": 37500,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37500,
        "paid": 26500,
        "status": "Pending",
        "paidOn": "24 Jul 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA06741",
    "planId": "INST-3376",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 97500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 32500,
        "paid": 32500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 32500,
        "paid": 32500,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 32500,
        "paid": 16500,
        "status": "Pending",
        "paidOn": "24 Jul 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA06713",
    "planId": "INST-3377",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 137500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 137500,
        "paid": 124000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA06447",
    "planId": "INST-3378",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 87500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43750,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 43750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06894",
    "planId": "INST-3379",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 137500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68750,
        "paid": 42000,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06489",
    "planId": "INST-3380",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 112500,
        "paid": 52500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA06479",
    "planId": "INST-3381",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 112500,
        "paid": 67500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA06419",
    "planId": "INST-3382",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 110500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 110500,
        "paid": 33500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA06999",
    "planId": "INST-3383",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 92500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 30833,
        "paid": 30833,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 30833,
        "paid": 25667,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 30834,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA06882",
    "planId": "INST-3384",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 107500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 107500,
        "paid": 44000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA06918",
    "planId": "INST-3385",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 137500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 68750,
        "paid": 68750,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 68750,
        "paid": 68750,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA06170",
    "planId": "INST-3386",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 137500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45833,
        "paid": 45833,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45833,
        "paid": 45833,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45834,
        "paid": 32834,
        "status": "Pending",
        "paidOn": "10 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA06556",
    "planId": "INST-3387",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 132500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 44168,
        "paid": 23668,
        "status": "Pending",
        "paidOn": "02 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA06637",
    "planId": "INST-3388",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 56250,
        "paid": 56250,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 56250,
        "paid": 56250,
        "status": "Paid",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA06788",
    "planId": "INST-3389",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 132500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 44168,
        "paid": 5668,
        "status": "Pending",
        "paidOn": "10 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA06163",
    "planId": "INST-3390",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 102500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 102500,
        "paid": 69000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA06602",
    "planId": "INST-3391",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 132500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 44168,
        "paid": 26668,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA06980",
    "planId": "INST-3392",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67750,
        "paid": 67750,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67750,
        "paid": 30750,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA06305",
    "planId": "INST-3393",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 112500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37500,
        "paid": 37500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37500,
        "paid": 30500,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37500,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA06575",
    "planId": "INST-3394",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 100500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 33500,
        "paid": 33500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 33500,
        "paid": 33500,
        "status": "Paid",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 33500,
        "paid": 20000,
        "status": "Pending",
        "paidOn": "08 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA06492",
    "planId": "INST-3395",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67750,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA06518",
    "planId": "INST-3396",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 132500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 44166,
        "paid": 44166,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 44166,
        "paid": 11834,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 44168,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA07504",
    "planId": "INST-3397",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72750,
        "paid": 44500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07572",
    "planId": "INST-3398",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67750,
        "paid": 37000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07808",
    "planId": "INST-3399",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70250,
        "paid": 70250,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70250,
        "paid": 63250,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA07402",
    "planId": "INST-3400",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47833,
        "paid": 47833,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47833,
        "paid": 47833,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47834,
        "paid": 32334,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA07359",
    "planId": "INST-3401",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 125500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 62750,
        "paid": 62750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 62750,
        "paid": 15750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA07636",
    "planId": "INST-3402",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45166,
        "paid": 45166,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45166,
        "paid": 8834,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45168,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA07403",
    "planId": "INST-3403",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145500,
        "paid": 110000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA07495",
    "planId": "INST-3404",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70250,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07002",
    "planId": "INST-3405",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70250,
        "paid": 70250,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70250,
        "paid": 51750,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA07410",
    "planId": "INST-3406",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 133500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 66750,
        "paid": 66750,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 66750,
        "paid": 6750,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA07185",
    "planId": "INST-3407",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65250,
        "paid": 34500,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07132",
    "planId": "INST-3408",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60250,
        "paid": 42000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07547",
    "planId": "INST-3409",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70250,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07652",
    "planId": "INST-3410",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47833,
        "paid": 47833,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47833,
        "paid": 36167,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47834,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA07954",
    "planId": "INST-3411",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46833,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46833,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46834,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA07518",
    "planId": "INST-3412",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 133500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 66750,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 66750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07839",
    "planId": "INST-3413",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72750,
        "paid": 72750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72750,
        "paid": 72250,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA07313",
    "planId": "INST-3414",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72750,
        "paid": 72750,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72750,
        "paid": 15250,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA07266",
    "planId": "INST-3415",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72750,
        "paid": 72750,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72750,
        "paid": 71750,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA07548",
    "planId": "INST-3416",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 135500,
        "paid": 74000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA07961",
    "planId": "INST-3417",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67750,
        "paid": 67750,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67750,
        "paid": 56750,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA07742",
    "planId": "INST-3418",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 143500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 143500,
        "paid": 104000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA07009",
    "planId": "INST-3419",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 143500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 143500,
        "paid": 128000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA07982",
    "planId": "INST-3420",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70250,
        "paid": 70250,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70250,
        "paid": 64250,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA07533",
    "planId": "INST-3421",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 45166,
        "paid": 45166,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 45166,
        "paid": 45166,
        "status": "Paid",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 45168,
        "paid": 33668,
        "status": "Pending",
        "paidOn": "22 Jun 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA07541",
    "planId": "INST-3422",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145500,
        "paid": 145500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA07515",
    "planId": "INST-3423",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72750,
        "paid": 43500,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72750,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07483",
    "planId": "INST-3424",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70250,
        "paid": 1000,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07111",
    "planId": "INST-3425",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60250,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07696",
    "planId": "INST-3426",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70250,
        "paid": 70250,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70250,
        "paid": 30250,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA07018",
    "planId": "INST-3427",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 133500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 133500,
        "paid": 35000,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA07015",
    "planId": "INST-3428",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65250,
        "paid": 52500,
        "status": "Overdue",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07651",
    "planId": "INST-3429",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70250,
        "paid": 59000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70250,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA07628",
    "planId": "INST-3430",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 120500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 120500,
        "paid": 69500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA07746",
    "planId": "INST-3431",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65250,
        "paid": 65250,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65250,
        "paid": 18250,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA07438",
    "planId": "INST-3432",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65250,
        "paid": 65250,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65250,
        "paid": 1250,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA07904",
    "planId": "INST-3433",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72750,
        "paid": 72750,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72750,
        "paid": 35250,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA07022",
    "planId": "INST-3434",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 135500,
        "paid": 73000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA07647",
    "planId": "INST-3435",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 135500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 135500,
        "paid": 37500,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA07098",
    "planId": "INST-3436",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72750,
        "paid": 72750,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72750,
        "paid": 71750,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA07454",
    "planId": "INST-3437",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 140500,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 140500,
        "paid": 121500,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA09421",
    "planId": "INST-3438",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 195000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 97500,
        "paid": 97500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 97500,
        "paid": 78500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA09730",
    "planId": "INST-3439",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 170000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 85000,
        "paid": 85000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 85000,
        "paid": 60500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA09170",
    "planId": "INST-3440",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 183000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 61000,
        "paid": 61000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 61000,
        "paid": 61000,
        "status": "Paid",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 61000,
        "paid": 47500,
        "status": "Pending",
        "paidOn": "10 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA09631",
    "planId": "INST-3441",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 180000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 60000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 60000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA09911",
    "planId": "INST-3442",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 180000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 180000,
        "paid": 74500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA09162",
    "planId": "INST-3443",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 193000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64333,
        "paid": 64333,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 64333,
        "paid": 64333,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 64334,
        "paid": 60834,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA09369",
    "planId": "INST-3444",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 190000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 190000,
        "paid": 183500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA09120",
    "planId": "INST-3445",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 195000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 65000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 65000,
        "paid": 21500,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA09080",
    "planId": "INST-3446",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 195000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 97500,
        "paid": 89500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 97500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA09004",
    "planId": "INST-3447",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 190000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 95000,
        "paid": 95000,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 95000,
        "paid": 72000,
        "status": "Overdue",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA09781",
    "planId": "INST-3448",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 170000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 170000,
        "paid": 64500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA09115",
    "planId": "INST-3449",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 195000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 97500,
        "paid": 97500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 97500,
        "paid": 96000,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA09544",
    "planId": "INST-3450",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 195000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 57000,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA09743",
    "planId": "INST-3451",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 195000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 97500,
        "paid": 97500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 97500,
        "paid": 78000,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA09660",
    "planId": "INST-3452",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 185000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 61666,
        "paid": 50500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 61666,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 61668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA09606",
    "planId": "INST-3453",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 190000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63333,
        "paid": 63333,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 63333,
        "paid": 63333,
        "status": "Paid",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 63334,
        "paid": 56834,
        "status": "Pending",
        "paidOn": "02 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA09236",
    "planId": "INST-3454",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 170000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 170000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA09880",
    "planId": "INST-3455",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 190000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 95000,
        "paid": 56500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 95000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA09266",
    "planId": "INST-3456",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 188000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 62666,
        "paid": 55500,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 62666,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 62668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA09619",
    "planId": "INST-3457",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 195000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 65000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 65000,
        "paid": 51000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA09301",
    "planId": "INST-3458",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 193000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 96500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 96500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08086",
    "planId": "INST-3459",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA08184",
    "planId": "INST-3460",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 38333,
        "paid": 38333,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 38333,
        "paid": 38333,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 38334,
        "paid": 7334,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA08116",
    "planId": "INST-3461",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 17667,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA08505",
    "planId": "INST-3462",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 68500,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA08352",
    "planId": "INST-3463",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 130000,
        "paid": 69500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA08606",
    "planId": "INST-3464",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 118000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 39333,
        "paid": 39333,
        "status": "Paid",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 39333,
        "paid": 28167,
        "status": "Overdue",
        "paidOn": "10 Sep 2026",
        "method": "UPI"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 39334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA08397",
    "planId": "INST-3465",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 115000,
        "paid": 51000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA08288",
    "planId": "INST-3466",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 43333,
        "paid": 43333,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 43333,
        "paid": 24167,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Debit card"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 43334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA08772",
    "planId": "INST-3467",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 110000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 110000,
        "paid": 75000,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA08632",
    "planId": "INST-3468",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 44333,
        "paid": 44333,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 44333,
        "paid": 27167,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 44334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA08297",
    "planId": "INST-3469",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 46666,
        "paid": 46666,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 46666,
        "paid": 46666,
        "status": "Paid",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 46668,
        "paid": 39168,
        "status": "Pending",
        "paidOn": "22 Aug 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA08959",
    "planId": "INST-3470",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 57500,
        "paid": 57500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 57500,
        "paid": 24000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA08399",
    "planId": "INST-3471",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67500,
        "paid": 67500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67500,
        "paid": 54000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA08359",
    "planId": "INST-3472",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08109",
    "planId": "INST-3473",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA08624",
    "planId": "INST-3474",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 125000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 62500,
        "paid": 62500,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 62500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08858",
    "planId": "INST-3475",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 115000,
        "paid": 26500,
        "status": "Overdue",
        "paidOn": "09 Sep 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA08963",
    "planId": "INST-3476",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 68500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA08765",
    "planId": "INST-3477",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "15 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 69000,
        "status": "Overdue",
        "paidOn": "15 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA08143",
    "planId": "INST-3478",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 113000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 56500,
        "paid": 56500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 56500,
        "paid": 18000,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA08883",
    "planId": "INST-3479",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 135000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 67500,
        "paid": 67500,
        "status": "Paid",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 67500,
        "paid": 41500,
        "status": "Overdue",
        "paidOn": "20 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA08261",
    "planId": "INST-3480",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 60000,
        "paid": 42000,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 60000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08259",
    "planId": "INST-3481",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47666,
        "paid": 47666,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47666,
        "paid": 37334,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA08927",
    "planId": "INST-3482",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 40000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08270",
    "planId": "INST-3483",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 65000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08296",
    "planId": "INST-3484",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 120000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 120000,
        "paid": 56000,
        "status": "Overdue",
        "paidOn": "28 Jun 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA08124",
    "planId": "INST-3485",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 61000,
        "status": "Overdue",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08101",
    "planId": "INST-3486",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 1500,
        "status": "Overdue",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA08750",
    "planId": "INST-3487",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 145000,
        "paid": 145000,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      }
    ]
  },
  {
    "studentId": "251FA08031",
    "planId": "INST-3488",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 71500,
        "paid": 71500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 71500,
        "paid": 35500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA08961",
    "planId": "INST-3489",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 70000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 62500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA08640",
    "planId": "INST-3490",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 72500,
        "status": "Paid",
        "paidOn": "09 Sep 2026",
        "method": "Bank transfer"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 59000,
        "status": "Overdue",
        "paidOn": "29 Aug 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA08627",
    "planId": "INST-3491",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 130000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 130000,
        "paid": 113500,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA08592",
    "planId": "INST-3492",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 125000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 41666,
        "paid": 41666,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 41666,
        "paid": 41666,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 41668,
        "paid": 9168,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA08044",
    "planId": "INST-3493",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 38333,
        "paid": 38333,
        "status": "Paid",
        "paidOn": "28 Jul 2026",
        "method": "Debit card"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 38333,
        "paid": 38333,
        "status": "Paid",
        "paidOn": "05 Jul 2026",
        "method": "Bank transfer"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 38334,
        "paid": 3834,
        "status": "Pending",
        "paidOn": "11 Sep 2026",
        "method": "Counter collection"
      }
    ]
  },
  {
    "studentId": "251FA08844",
    "planId": "INST-3494",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 72500,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08426",
    "planId": "INST-3495",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 140000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 70000,
        "paid": 0,
        "status": "Overdue"
      }
    ]
  },
  {
    "studentId": "251FA08767",
    "planId": "INST-3496",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 115000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 115000,
        "paid": 50000,
        "status": "Overdue",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA08932",
    "planId": "INST-3497",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 143000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 47666,
        "paid": 43500,
        "status": "Overdue",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 47666,
        "paid": 0,
        "status": "Overdue"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 47668,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA08917",
    "planId": "INST-3498",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 145000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 48333,
        "paid": 48333,
        "status": "Paid",
        "paidOn": "08 Jun 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 48333,
        "paid": 40167,
        "status": "Overdue",
        "paidOn": "06 Sep 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 48334,
        "paid": 0,
        "status": "Pending"
      }
    ]
  },
  {
    "studentId": "251FA11001",
    "planId": "INST-3499",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 147000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 73500,
        "paid": 73500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 73500,
        "paid": 44000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA11002",
    "planId": "INST-3500",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 122000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 40666,
        "paid": 40666,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 40666,
        "paid": 40666,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 40668,
        "paid": 16168,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA11003",
    "planId": "INST-3501",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 117000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 117000,
        "paid": 93500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA12001",
    "planId": "INST-3502",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 158000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 79000,
        "paid": 79000,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 79000,
        "paid": 47500,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA12002",
    "planId": "INST-3503",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 128000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 64000,
        "paid": 64000,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 64000,
        "paid": 38500,
        "status": "Overdue",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA12003",
    "planId": "INST-3504",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 133000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 133000,
        "paid": 106500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  },
  {
    "studentId": "251FA13001",
    "planId": "INST-3505",
    "planType": "2-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 127000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 63500,
        "paid": 63500,
        "status": "Paid",
        "paidOn": "04 Sep 2026",
        "method": "Counter collection"
      },
      {
        "no": 2,
        "due": "15 Aug 2026",
        "amount": 63500,
        "paid": 38000,
        "status": "Overdue",
        "paidOn": "18 Aug 2026",
        "method": "UPI"
      }
    ]
  },
  {
    "studentId": "251FA13002",
    "planId": "INST-3506",
    "planType": "3-Instalment Plan",
    "academicYear": "2026–27",
    "totalDemand": 112000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 37333,
        "paid": 37333,
        "status": "Paid",
        "paidOn": "26 Aug 2026",
        "method": "UPI"
      },
      {
        "no": 2,
        "due": "15 Jul 2026",
        "amount": 37333,
        "paid": 37333,
        "status": "Paid",
        "paidOn": "05 Aug 2026",
        "method": "Net banking"
      },
      {
        "no": 3,
        "due": "15 Oct 2026",
        "amount": 37334,
        "paid": 14834,
        "status": "Pending",
        "paidOn": "10 Jul 2026",
        "method": "Debit card"
      }
    ]
  },
  {
    "studentId": "251FA13003",
    "planId": "INST-3507",
    "planType": "Lump-sum",
    "academicYear": "2026–27",
    "totalDemand": 98000,
    "instalments": [
      {
        "no": 1,
        "due": "15 Apr 2026",
        "amount": 98000,
        "paid": 78500,
        "status": "Overdue",
        "paidOn": "14 Aug 2026",
        "method": "Net banking"
      }
    ]
  }
];
