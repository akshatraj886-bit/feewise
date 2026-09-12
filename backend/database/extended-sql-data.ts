// Auto-generated scaled and synchronized dataset for finDeck institutional modules
import type { ScholarshipRenewalRisk, LoanDocumentRequest, ReminderDispatch, RefundRecord } from "./sql-store";

export const EXTENDED_SCHOLARSHIP_RISKS: ScholarshipRenewalRisk[] = [
  {
    "scholarship_renewal_risk_id": "risk-501",
    "scholarship_application_id": "sa-merit-01",
    "student_id": "251FA04E03",
    "student_name": "Akshat Raj",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 86.4,
    "cgpa": 8.72,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds renewal criteria by +1.22 CGPA and +11.4% attendance."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-502",
    "scholarship_application_id": "sa-merit-02",
    "student_id": "251FA04E58",
    "student_name": "Meera Iyer",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 76.2,
    "cgpa": 7.65,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Attendance is 76.2%, very close to minimum 75% threshold."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-02 11:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-503",
    "scholarship_application_id": "sa-merit-03",
    "student_id": "251FA04E21",
    "student_name": "Rohan Mehta",
    "programme": "MBA",
    "assessed_on": "2026-09-01",
    "attendance_pct": 71,
    "cgpa": 7.18,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Both CGPA (7.18) and attendance (71.0%) below required limits."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 14:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-504",
    "scholarship_application_id": "sa-merit-505",
    "student_id": "251FA04645",
    "student_name": "Dharanikota Aaradhya",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 70.8,
    "cgpa": 7.51,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 70.8%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-505",
    "scholarship_application_id": "sa-merit-506",
    "student_id": "251FA04261",
    "student_name": "Challa Jayanth",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 90.7,
    "cgpa": 8.14,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-506",
    "scholarship_application_id": "sa-merit-507",
    "student_id": "251FA04001",
    "student_name": "Jampani Spoorthi",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 74.3,
    "cgpa": 9.33,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 74.3%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-507",
    "scholarship_application_id": "sa-merit-508",
    "student_id": "251FA04430",
    "student_name": "Borra Jayanth",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 71.5,
    "cgpa": 7.86,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 71.5%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-508",
    "scholarship_application_id": "sa-merit-509",
    "student_id": "251FA04378",
    "student_name": "Kothapalli Indira",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 70.8,
    "cgpa": 7.02,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Critical: Attendance (70.8%) and CGPA (7.02) severely below retention threshold."
    },
    "risk_level": "LIKELY_LOSS",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-509",
    "scholarship_application_id": "sa-merit-510",
    "student_id": "251FA04394",
    "student_name": "Atla Abhishek",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 85.5,
    "cgpa": 7.55,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 85.5%, CGPA: 7.55)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-510",
    "scholarship_application_id": "sa-merit-511",
    "student_id": "251FA04464",
    "student_name": "Katta Ravi",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 70.2,
    "cgpa": 6.69,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Critical: Attendance (70.2%) and CGPA (6.69) severely below retention threshold."
    },
    "risk_level": "LIKELY_LOSS",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-511",
    "scholarship_application_id": "sa-merit-512",
    "student_id": "251FA04263",
    "student_name": "Damacharla Chaitanya",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 89.4,
    "cgpa": 8.87,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-512",
    "scholarship_application_id": "sa-merit-513",
    "student_id": "251FA04348",
    "student_name": "Penumatsa Uday",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 95,
    "cgpa": 9.41,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-513",
    "scholarship_application_id": "sa-merit-514",
    "student_id": "251FA04455",
    "student_name": "Valluri Karthik",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 83.1,
    "cgpa": 8.88,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-514",
    "scholarship_application_id": "sa-merit-515",
    "student_id": "251FA04953",
    "student_name": "Pasupuleti Chaitanya",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 79.6,
    "cgpa": 9.51,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 79.6%, CGPA: 9.51)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-515",
    "scholarship_application_id": "sa-merit-516",
    "student_id": "251FA04741",
    "student_name": "Kasarla Venkatesh",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 70.2,
    "cgpa": 9.32,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 70.2%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-516",
    "scholarship_application_id": "sa-merit-517",
    "student_id": "251FA04701",
    "student_name": "Immanni Gayatri",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 77.6,
    "cgpa": 7.77,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 77.6%, CGPA: 7.77)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-517",
    "scholarship_application_id": "sa-merit-518",
    "student_id": "251FA04223",
    "student_name": "Mekala Reyansh",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 92,
    "cgpa": 7.75,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 92%, CGPA: 7.75)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-518",
    "scholarship_application_id": "sa-merit-519",
    "student_id": "251FA04427",
    "student_name": "Nandigam Samhitha",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 95.5,
    "cgpa": 6.87,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.87, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-519",
    "scholarship_application_id": "sa-merit-520",
    "student_id": "251FA04704",
    "student_name": "Donepudi Chaitra",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 71.2,
    "cgpa": 7.78,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 71.2%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-520",
    "scholarship_application_id": "sa-merit-521",
    "student_id": "251FA04034",
    "student_name": "Sagi Sai",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 97.6,
    "cgpa": 7.9,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 97.6%, CGPA: 7.9)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-521",
    "scholarship_application_id": "sa-merit-522",
    "student_id": "251FA04894",
    "student_name": "Cherukuri Kiran",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 76,
    "cgpa": 9.25,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 76%, CGPA: 9.25)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-522",
    "scholarship_application_id": "sa-merit-523",
    "student_id": "251FA04868",
    "student_name": "Valluri Lokesh",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 86.5,
    "cgpa": 8.52,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-523",
    "scholarship_application_id": "sa-merit-524",
    "student_id": "251FA04178",
    "student_name": "Ghanta Lakshmi",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 83.6,
    "cgpa": 7.39,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 7.39, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-524",
    "scholarship_application_id": "sa-merit-525",
    "student_id": "251FA04539",
    "student_name": "Raavi Sravani",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 84.3,
    "cgpa": 8.57,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-525",
    "scholarship_application_id": "sa-merit-526",
    "student_id": "251FA04063",
    "student_name": "Bonthu Rohan",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 80.3,
    "cgpa": 7.69,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 80.3%, CGPA: 7.69)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-526",
    "scholarship_application_id": "sa-merit-527",
    "student_id": "251FA04934",
    "student_name": "Kosuri Bhavana",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 81.9,
    "cgpa": 7.78,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 81.9%, CGPA: 7.78)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-527",
    "scholarship_application_id": "sa-merit-528",
    "student_id": "251FA04562",
    "student_name": "Chava Varun",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 77.4,
    "cgpa": 7.96,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 77.4%, CGPA: 7.96)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-528",
    "scholarship_application_id": "sa-merit-529",
    "student_id": "251FA04037",
    "student_name": "Penumatsa Tanvi",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 77.7,
    "cgpa": 7.72,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 77.7%, CGPA: 7.72)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-529",
    "scholarship_application_id": "sa-merit-530",
    "student_id": "251FA04725",
    "student_name": "Jampala Rohan",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 91.1,
    "cgpa": 8.48,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-530",
    "scholarship_application_id": "sa-merit-531",
    "student_id": "251FA04146",
    "student_name": "Vasireddy Lokesh",
    "programme": "B.Tech CSE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 88.2,
    "cgpa": 7.25,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 7.25, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-531",
    "scholarship_application_id": "sa-merit-532",
    "student_id": "251FA03360",
    "student_name": "Mekala Revathi",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 84.7,
    "cgpa": 7.24,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 7.24, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-532",
    "scholarship_application_id": "sa-merit-533",
    "student_id": "251FA03398",
    "student_name": "Ganta Kavya",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 83.2,
    "cgpa": 7.43,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 7.43, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-533",
    "scholarship_application_id": "sa-merit-534",
    "student_id": "251FA03943",
    "student_name": "Eedala Kavya",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 83.8,
    "cgpa": 7.96,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 83.8%, CGPA: 7.96)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-534",
    "scholarship_application_id": "sa-merit-535",
    "student_id": "251FA03569",
    "student_name": "Pasupuleti Swathi",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 91.6,
    "cgpa": 8.07,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-535",
    "scholarship_application_id": "sa-merit-536",
    "student_id": "251FA03898",
    "student_name": "Moka Sindhu",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 84.8,
    "cgpa": 9.58,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-536",
    "scholarship_application_id": "sa-merit-537",
    "student_id": "251FA03031",
    "student_name": "Yella Jayanth",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 97.7,
    "cgpa": 9.05,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-537",
    "scholarship_application_id": "sa-merit-538",
    "student_id": "251FA03492",
    "student_name": "Mahankali Reyansh",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 97.1,
    "cgpa": 9.53,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-538",
    "scholarship_application_id": "sa-merit-539",
    "student_id": "251FA03735",
    "student_name": "Kuruba Mounika",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 86.5,
    "cgpa": 8.65,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-539",
    "scholarship_application_id": "sa-merit-540",
    "student_id": "251FA03418",
    "student_name": "Uppala Kavya",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 94.9,
    "cgpa": 9.39,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-540",
    "scholarship_application_id": "sa-merit-541",
    "student_id": "251FA03406",
    "student_name": "Annavarapu Aman",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 70.7,
    "cgpa": 8.07,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 70.7%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-541",
    "scholarship_application_id": "sa-merit-542",
    "student_id": "251FA03499",
    "student_name": "Patibandla Hemanth",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 84.7,
    "cgpa": 9.52,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-542",
    "scholarship_application_id": "sa-merit-543",
    "student_id": "251FA03366",
    "student_name": "Ijjada Meghana",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 95.3,
    "cgpa": 9.57,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-543",
    "scholarship_application_id": "sa-merit-544",
    "student_id": "251FA03164",
    "student_name": "Siripurapu Sneha",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 96.8,
    "cgpa": 9.39,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-544",
    "scholarship_application_id": "sa-merit-545",
    "student_id": "251FA03052",
    "student_name": "Polisetty Radhika",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 76.4,
    "cgpa": 6.75,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.75, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-545",
    "scholarship_application_id": "sa-merit-546",
    "student_id": "251FA03113",
    "student_name": "Cherukuri Gopal",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 97.5,
    "cgpa": 9.21,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-546",
    "scholarship_application_id": "sa-merit-547",
    "student_id": "251FA03013",
    "student_name": "Kamatham Rajesh",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 73.7,
    "cgpa": 8.9,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 73.7%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-547",
    "scholarship_application_id": "sa-merit-548",
    "student_id": "251FA03728",
    "student_name": "Kolli Ramya",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 75.4,
    "cgpa": 8.31,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 75.4%, CGPA: 8.31)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-548",
    "scholarship_application_id": "sa-merit-549",
    "student_id": "251FA03023",
    "student_name": "Nallamothu Chaitanya",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 93.1,
    "cgpa": 8.76,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-549",
    "scholarship_application_id": "sa-merit-550",
    "student_id": "251FA03446",
    "student_name": "Narra Kiran",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 74.3,
    "cgpa": 6.67,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 74.3%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-550",
    "scholarship_application_id": "sa-merit-551",
    "student_id": "251FA03069",
    "student_name": "Pandilla Zubin",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 90.4,
    "cgpa": 8.34,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-551",
    "scholarship_application_id": "sa-merit-552",
    "student_id": "251FA03707",
    "student_name": "Goda Yogesh",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 92.9,
    "cgpa": 7.74,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 92.9%, CGPA: 7.74)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-552",
    "scholarship_application_id": "sa-merit-553",
    "student_id": "251FA03027",
    "student_name": "Vankayalapati Chaitanya",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 95.3,
    "cgpa": 8.51,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-553",
    "scholarship_application_id": "sa-merit-554",
    "student_id": "251FA03620",
    "student_name": "Atla Madhuri",
    "programme": "B.Tech ECE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 74.5,
    "cgpa": 9.25,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 74.5%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-554",
    "scholarship_application_id": "sa-merit-555",
    "student_id": "251FA02402",
    "student_name": "Devavarapu Surya",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 87.4,
    "cgpa": 6.72,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.72, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-555",
    "scholarship_application_id": "sa-merit-556",
    "student_id": "251FA02253",
    "student_name": "Bodapati Hasini",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 84.3,
    "cgpa": 8.14,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-556",
    "scholarship_application_id": "sa-merit-557",
    "student_id": "251FA02504",
    "student_name": "Vempati Yogesh",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 71.7,
    "cgpa": 7.36,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 71.7%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-557",
    "scholarship_application_id": "sa-merit-558",
    "student_id": "251FA02393",
    "student_name": "Palli Nikhil",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 74.8,
    "cgpa": 7.91,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 74.8%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-558",
    "scholarship_application_id": "sa-merit-559",
    "student_id": "251FA02006",
    "student_name": "Kommuru Nikhil",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 77.2,
    "cgpa": 9.56,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 77.2%, CGPA: 9.56)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-559",
    "scholarship_application_id": "sa-merit-560",
    "student_id": "251FA02197",
    "student_name": "Burla Naveen",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 81.4,
    "cgpa": 9.17,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-560",
    "scholarship_application_id": "sa-merit-561",
    "student_id": "251FA02992",
    "student_name": "Nimmagadda Sravani",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 79.1,
    "cgpa": 9.4,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 79.1%, CGPA: 9.4)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-561",
    "scholarship_application_id": "sa-merit-562",
    "student_id": "251FA02793",
    "student_name": "Shaik Srikanth",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 87,
    "cgpa": 8.01,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-562",
    "scholarship_application_id": "sa-merit-563",
    "student_id": "251FA02752",
    "student_name": "Kamatham Omkar",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 85,
    "cgpa": 7.06,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 7.06, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-563",
    "scholarship_application_id": "sa-merit-564",
    "student_id": "251FA02543",
    "student_name": "Nakka Vidya",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 92.2,
    "cgpa": 8.83,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-564",
    "scholarship_application_id": "sa-merit-565",
    "student_id": "251FA02823",
    "student_name": "Vankayalapati Pallavi",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 68,
    "cgpa": 8.24,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 68%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-565",
    "scholarship_application_id": "sa-merit-566",
    "student_id": "251FA02093",
    "student_name": "Nagisetty Reyansh",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 76.5,
    "cgpa": 9.14,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 76.5%, CGPA: 9.14)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-566",
    "scholarship_application_id": "sa-merit-567",
    "student_id": "251FA02539",
    "student_name": "Borra Sujatha",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 84.9,
    "cgpa": 9.39,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-567",
    "scholarship_application_id": "sa-merit-568",
    "student_id": "251FA02887",
    "student_name": "Tanniru Yogesh",
    "programme": "B.Tech EEE",
    "assessed_on": "2026-09-01",
    "attendance_pct": 69.5,
    "cgpa": 7.46,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 69.5%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-568",
    "scholarship_application_id": "sa-merit-569",
    "student_id": "251FA05487",
    "student_name": "Edpuganti Aditya",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 79.3,
    "cgpa": 9.45,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 79.3%, CGPA: 9.45)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-569",
    "scholarship_application_id": "sa-merit-570",
    "student_id": "251FA05319",
    "student_name": "Jala Revathi",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 95.9,
    "cgpa": 9.32,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-570",
    "scholarship_application_id": "sa-merit-571",
    "student_id": "251FA05067",
    "student_name": "Valluri Tanvi",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 78.5,
    "cgpa": 7.45,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 7.45, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-571",
    "scholarship_application_id": "sa-merit-572",
    "student_id": "251FA05041",
    "student_name": "Mahankali Meghana",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 95.8,
    "cgpa": 8.63,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-572",
    "scholarship_application_id": "sa-merit-573",
    "student_id": "251FA05871",
    "student_name": "Kothapalli Naveen",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 74.7,
    "cgpa": 9.56,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 74.7%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-573",
    "scholarship_application_id": "sa-merit-574",
    "student_id": "251FA05005",
    "student_name": "Kuruba Sowmya",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 71.8,
    "cgpa": 6.85,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Critical: Attendance (71.8%) and CGPA (6.85) severely below retention threshold."
    },
    "risk_level": "LIKELY_LOSS",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-574",
    "scholarship_application_id": "sa-merit-575",
    "student_id": "251FA05609",
    "student_name": "Vempati Gayatri",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 87.3,
    "cgpa": 9,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-575",
    "scholarship_application_id": "sa-merit-576",
    "student_id": "251FA05788",
    "student_name": "Bathula Surya",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 90.7,
    "cgpa": 9.25,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-576",
    "scholarship_application_id": "sa-merit-577",
    "student_id": "251FA05848",
    "student_name": "Velpula Niharika",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 72.6,
    "cgpa": 6.65,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 72.6%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-577",
    "scholarship_application_id": "sa-merit-578",
    "student_id": "251FA05028",
    "student_name": "Koganti Abhishek",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 73.3,
    "cgpa": 8.74,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 73.3%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-578",
    "scholarship_application_id": "sa-merit-579",
    "student_id": "251FA05651",
    "student_name": "Kelam Sandeep",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 75.1,
    "cgpa": 9.53,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 75.1%, CGPA: 9.53)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-579",
    "scholarship_application_id": "sa-merit-580",
    "student_id": "251FA05947",
    "student_name": "Nune Manoj",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 82.5,
    "cgpa": 7.2,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 7.2, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-580",
    "scholarship_application_id": "sa-merit-581",
    "student_id": "251FA05761",
    "student_name": "Thummala Revathi",
    "programme": "B.Tech Mechanical",
    "assessed_on": "2026-09-01",
    "attendance_pct": 93.7,
    "cgpa": 6.93,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.93, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-581",
    "scholarship_application_id": "sa-merit-582",
    "student_id": "251FA06902",
    "student_name": "Kolla Lokesh",
    "programme": "B.Tech Civil",
    "assessed_on": "2026-09-01",
    "attendance_pct": 97.6,
    "cgpa": 9.08,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-582",
    "scholarship_application_id": "sa-merit-583",
    "student_id": "251FA06740",
    "student_name": "Pragada Harika",
    "programme": "B.Tech Civil",
    "assessed_on": "2026-09-01",
    "attendance_pct": 85.1,
    "cgpa": 9.22,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-583",
    "scholarship_application_id": "sa-merit-584",
    "student_id": "251FA06876",
    "student_name": "Chidipothu Swathi",
    "programme": "B.Tech Civil",
    "assessed_on": "2026-09-01",
    "attendance_pct": 75.7,
    "cgpa": 8.01,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 75.7%, CGPA: 8.01)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-584",
    "scholarship_application_id": "sa-merit-585",
    "student_id": "251FA06395",
    "student_name": "Pachipala Ravi",
    "programme": "B.Tech Civil",
    "assessed_on": "2026-09-01",
    "attendance_pct": 79.4,
    "cgpa": 7.6,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 79.4%, CGPA: 7.6)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-585",
    "scholarship_application_id": "sa-merit-586",
    "student_id": "251FA06447",
    "student_name": "Addanki Nandini",
    "programme": "B.Tech Civil",
    "assessed_on": "2026-09-01",
    "attendance_pct": 79.2,
    "cgpa": 6.68,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.68, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-586",
    "scholarship_application_id": "sa-merit-587",
    "student_id": "251FA06489",
    "student_name": "Pasupuleti Krishna",
    "programme": "B.Tech Civil",
    "assessed_on": "2026-09-01",
    "attendance_pct": 73.2,
    "cgpa": 8.53,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 73.2%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-587",
    "scholarship_application_id": "sa-merit-588",
    "student_id": "251FA06999",
    "student_name": "Devireddy Sai",
    "programme": "B.Tech Civil",
    "assessed_on": "2026-09-01",
    "attendance_pct": 97.1,
    "cgpa": 8.91,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-588",
    "scholarship_application_id": "sa-merit-589",
    "student_id": "251FA06882",
    "student_name": "Borra Uday",
    "programme": "B.Tech Civil",
    "assessed_on": "2026-09-01",
    "attendance_pct": 83.2,
    "cgpa": 8.68,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-589",
    "scholarship_application_id": "sa-merit-590",
    "student_id": "251FA07359",
    "student_name": "Kasarla Kiran",
    "programme": "B.Tech IT",
    "assessed_on": "2026-09-01",
    "attendance_pct": 84.8,
    "cgpa": 9.43,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-590",
    "scholarship_application_id": "sa-merit-591",
    "student_id": "251FA07185",
    "student_name": "Vaddadi Yogesh",
    "programme": "B.Tech IT",
    "assessed_on": "2026-09-01",
    "attendance_pct": 91.1,
    "cgpa": 9.11,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-591",
    "scholarship_application_id": "sa-merit-592",
    "student_id": "251FA07132",
    "student_name": "Raavi Revathi",
    "programme": "B.Tech IT",
    "assessed_on": "2026-09-01",
    "attendance_pct": 92.2,
    "cgpa": 9.04,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-592",
    "scholarship_application_id": "sa-merit-593",
    "student_id": "251FA07111",
    "student_name": "Tummala Srikanth",
    "programme": "B.Tech IT",
    "assessed_on": "2026-09-01",
    "attendance_pct": 68.8,
    "cgpa": 6.68,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Critical: Attendance (68.8%) and CGPA (6.68) severely below retention threshold."
    },
    "risk_level": "LIKELY_LOSS",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-593",
    "scholarship_application_id": "sa-merit-594",
    "student_id": "251FA07015",
    "student_name": "Borra Harsha",
    "programme": "B.Tech IT",
    "assessed_on": "2026-09-01",
    "attendance_pct": 80.3,
    "cgpa": 6.78,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.78, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-594",
    "scholarship_application_id": "sa-merit-595",
    "student_id": "251FA07628",
    "student_name": "Sathiraju Harika",
    "programme": "B.Tech IT",
    "assessed_on": "2026-09-01",
    "attendance_pct": 69.1,
    "cgpa": 7.22,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 69.1%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-595",
    "scholarship_application_id": "sa-merit-596",
    "student_id": "251FA07746",
    "student_name": "Pulipati Ganesh",
    "programme": "B.Tech IT",
    "assessed_on": "2026-09-01",
    "attendance_pct": 89.9,
    "cgpa": 8.96,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-596",
    "scholarship_application_id": "sa-merit-597",
    "student_id": "251FA07438",
    "student_name": "Velpula Harika",
    "programme": "B.Tech IT",
    "assessed_on": "2026-09-01",
    "attendance_pct": 83.1,
    "cgpa": 9.08,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-597",
    "scholarship_application_id": "sa-merit-598",
    "student_id": "251FA09730",
    "student_name": "Yella Akshat",
    "programme": "MBA",
    "assessed_on": "2026-09-01",
    "attendance_pct": 83.2,
    "cgpa": 9.21,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-598",
    "scholarship_application_id": "sa-merit-599",
    "student_id": "251FA09781",
    "student_name": "Paladugu Ramya",
    "programme": "MBA",
    "assessed_on": "2026-09-01",
    "attendance_pct": 80.7,
    "cgpa": 8.32,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-599",
    "scholarship_application_id": "sa-merit-600",
    "student_id": "251FA09236",
    "student_name": "Damacharla Hasini",
    "programme": "MBA",
    "assessed_on": "2026-09-01",
    "attendance_pct": 92.5,
    "cgpa": 6.67,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.67, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-600",
    "scholarship_application_id": "sa-merit-601",
    "student_id": "251FA08184",
    "student_name": "Cheemala Deepika",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 93,
    "cgpa": 9.38,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-601",
    "scholarship_application_id": "sa-merit-602",
    "student_id": "251FA08606",
    "student_name": "Mahankali Ravi",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 78.4,
    "cgpa": 8.91,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 78.4%, CGPA: 8.91)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-602",
    "scholarship_application_id": "sa-merit-603",
    "student_id": "251FA08397",
    "student_name": "Kota Pranay",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 89.4,
    "cgpa": 8.6,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-603",
    "scholarship_application_id": "sa-merit-604",
    "student_id": "251FA08288",
    "student_name": "Nagisetty Jayanth",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 85,
    "cgpa": 9.19,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-604",
    "scholarship_application_id": "sa-merit-605",
    "student_id": "251FA08772",
    "student_name": "Annapureddy Lakshmi",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 94.4,
    "cgpa": 6.8,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.8, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-605",
    "scholarship_application_id": "sa-merit-606",
    "student_id": "251FA08959",
    "student_name": "Bainaboyina Harika",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 71.2,
    "cgpa": 8.69,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 71.2%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-606",
    "scholarship_application_id": "sa-merit-607",
    "student_id": "251FA08624",
    "student_name": "Bainaboyina Jahnavi",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 70,
    "cgpa": 7.22,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 70%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-607",
    "scholarship_application_id": "sa-merit-608",
    "student_id": "251FA08858",
    "student_name": "Katta Arjun",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 82.9,
    "cgpa": 9.18,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-608",
    "scholarship_application_id": "sa-merit-609",
    "student_id": "251FA08143",
    "student_name": "Balusu Nandini",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 78.6,
    "cgpa": 8.42,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 78.6%, CGPA: 8.42)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-609",
    "scholarship_application_id": "sa-merit-610",
    "student_id": "251FA08261",
    "student_name": "Kolla Pallavi",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 72,
    "cgpa": 8.71,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 72%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-610",
    "scholarship_application_id": "sa-merit-611",
    "student_id": "251FA08270",
    "student_name": "Chatakondu Meghana",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 88.3,
    "cgpa": 8.99,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-611",
    "scholarship_application_id": "sa-merit-612",
    "student_id": "251FA08296",
    "student_name": "Kancharla Swathi",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 77.1,
    "cgpa": 9.36,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Watchlist: Within narrow margin of renewal criteria (Attendance: 77.1%, CGPA: 9.36)."
    },
    "risk_level": "WATCH",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-612",
    "scholarship_application_id": "sa-merit-613",
    "student_id": "251FA08627",
    "student_name": "Chintoti Bhavana",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 75.6,
    "cgpa": 7,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 7, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-613",
    "scholarship_application_id": "sa-merit-614",
    "student_id": "251FA08592",
    "student_name": "Tummala Zubin",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 84.6,
    "cgpa": 8.88,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Safe: Exceeds mandatory 75% attendance and 7.5 CGPA."
    },
    "risk_level": "NONE"
  },
  {
    "scholarship_renewal_risk_id": "risk-614",
    "scholarship_application_id": "sa-merit-615",
    "student_id": "251FA08044",
    "student_name": "Ramisetty Pallavi",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 70.8,
    "cgpa": 9.09,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: Attendance is 70.8%, below mandatory 75% threshold."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  },
  {
    "scholarship_renewal_risk_id": "risk-615",
    "scholarship_application_id": "sa-merit-616",
    "student_id": "251FA08767",
    "student_name": "Katta Priya",
    "programme": "Biotechnology",
    "assessed_on": "2026-09-01",
    "attendance_pct": 91.5,
    "cgpa": 6.99,
    "criteria_at_risk": {
      "min_cgpa": 7.5,
      "min_attendance": 75,
      "notes": "Alert: CGPA is 6.99, below mandatory 7.5 requirement."
    },
    "risk_level": "AT_RISK",
    "alerted_at": "2026-09-03 10:00:00"
  }
];

export const EXTENDED_LOAN_REQUESTS: LoanDocumentRequest[] = [
  {
    "loan_document_request_id": "ldr-301",
    "student_id": "251FA04E03",
    "student_name": "Akshat Raj",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-849201",
    "turnaround_hours": 18.5
  },
  {
    "loan_document_request_id": "ldr-302",
    "student_id": "251FA04E03",
    "student_name": "Akshat Raj",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-849202",
    "turnaround_hours": 18.5
  },
  {
    "loan_document_request_id": "ldr-303",
    "student_id": "251FA04E42",
    "student_name": "Aarav Desai",
    "bank_name": "HDFC Bank Education Loan Division",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-10",
    "status": "IN_PROGRESS",
    "turnaround_hours": 8
  },
  {
    "loan_document_request_id": "ldr-304",
    "student_id": "251FA04E21",
    "student_name": "Rohan Mehta",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-11",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-305",
    "student_id": "251FA04E58",
    "student_name": "Meera Iyer",
    "bank_name": "Canara Bank, Guntur Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-10",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-306",
    "student_id": "251FA04852",
    "student_name": "Jonnalagadda Mounika",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-307",
    "student_id": "251FA04777",
    "student_name": "Murakonda Vishnu",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-308",
    "student_id": "251FA04163",
    "student_name": "Vankayalapati Arjun",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840308",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-309",
    "student_id": "251FA04069",
    "student_name": "Janga Tarun",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840309",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-310",
    "student_id": "251FA04208",
    "student_name": "Khareedu Uday",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840310",
    "turnaround_hours": 16
  },
  {
    "loan_document_request_id": "ldr-311",
    "student_id": "251FA04140",
    "student_name": "Thummala Priya",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-08",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-312",
    "student_id": "251FA04085",
    "student_name": "Balusu Divya",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-04",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-313",
    "student_id": "251FA04068",
    "student_name": "Akkina Sindhu",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840313",
    "turnaround_hours": 13.6
  },
  {
    "loan_document_request_id": "ldr-314",
    "student_id": "251FA04885",
    "student_name": "Jampani Aaradhya",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840314",
    "turnaround_hours": 16.8
  },
  {
    "loan_document_request_id": "ldr-315",
    "student_id": "251FA04189",
    "student_name": "Pasupuleti Rahul",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840315",
    "turnaround_hours": 20
  },
  {
    "loan_document_request_id": "ldr-316",
    "student_id": "251FA04416",
    "student_name": "Nannapaneni Krishna",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-06",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-317",
    "student_id": "251FA04575",
    "student_name": "Perala Jyothi",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-08",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-318",
    "student_id": "251FA04282",
    "student_name": "Sankara Ananya",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840318",
    "turnaround_hours": 17.6
  },
  {
    "loan_document_request_id": "ldr-319",
    "student_id": "251FA04379",
    "student_name": "Paladugu Deepika",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840319",
    "turnaround_hours": 20.8
  },
  {
    "loan_document_request_id": "ldr-320",
    "student_id": "251FA04060",
    "student_name": "Challa Ishaan",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840320",
    "turnaround_hours": 12
  },
  {
    "loan_document_request_id": "ldr-321",
    "student_id": "251FA04701",
    "student_name": "Immanni Gayatri",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-322",
    "student_id": "251FA04426",
    "student_name": "Uppala Sai",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-323",
    "student_id": "251FA04924",
    "student_name": "Muppalla Lakshmi",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840323",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-324",
    "student_id": "251FA04495",
    "student_name": "Katta Yash",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840324",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-325",
    "student_id": "251FA04894",
    "student_name": "Cherukuri Kiran",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840325",
    "turnaround_hours": 16
  },
  {
    "loan_document_request_id": "ldr-326",
    "student_id": "251FA04935",
    "student_name": "Jampani Keerthi",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-08",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-327",
    "student_id": "251FA04765",
    "student_name": "Golla Rahul",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-04",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-328",
    "student_id": "251FA04197",
    "student_name": "Vaddadi Sravani",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840328",
    "turnaround_hours": 13.6
  },
  {
    "loan_document_request_id": "ldr-329",
    "student_id": "251FA04434",
    "student_name": "Goda Spoorthi",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840329",
    "turnaround_hours": 16.8
  },
  {
    "loan_document_request_id": "ldr-330",
    "student_id": "251FA04612",
    "student_name": "Abburi Bhavana",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840330",
    "turnaround_hours": 20
  },
  {
    "loan_document_request_id": "ldr-331",
    "student_id": "251FA04763",
    "student_name": "Avula Rahul",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-06",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-332",
    "student_id": "251FA04220",
    "student_name": "Chatakondu Tarun",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-08",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-333",
    "student_id": "251FA04527",
    "student_name": "Immanni Swathi",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840333",
    "turnaround_hours": 17.6
  },
  {
    "loan_document_request_id": "ldr-334",
    "student_id": "251FA04393",
    "student_name": "Aravapalli Abhishek",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840334",
    "turnaround_hours": 20.8
  },
  {
    "loan_document_request_id": "ldr-335",
    "student_id": "251FA04725",
    "student_name": "Jampala Rohan",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840335",
    "turnaround_hours": 12
  },
  {
    "loan_document_request_id": "ldr-336",
    "student_id": "251FA04371",
    "student_name": "Manda Bhavana",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-337",
    "student_id": "251FA04278",
    "student_name": "Madireddy Swathi",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-338",
    "student_id": "251FA04565",
    "student_name": "Polisetty Priya",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840338",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-339",
    "student_id": "251FA03011",
    "student_name": "Botta Tarun",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840339",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-340",
    "student_id": "251FA03187",
    "student_name": "Mahankali Naveen",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840340",
    "turnaround_hours": 16
  },
  {
    "loan_document_request_id": "ldr-341",
    "student_id": "251FA03943",
    "student_name": "Eedala Kavya",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-08",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-342",
    "student_id": "251FA03979",
    "student_name": "Mekala Yasaswini",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-04",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-343",
    "student_id": "251FA03286",
    "student_name": "Pandilla Yashaswini",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840343",
    "turnaround_hours": 13.6
  },
  {
    "loan_document_request_id": "ldr-344",
    "student_id": "251FA03031",
    "student_name": "Yella Jayanth",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840344",
    "turnaround_hours": 16.8
  },
  {
    "loan_document_request_id": "ldr-345",
    "student_id": "251FA03520",
    "student_name": "Raparthi Yogesh",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840345",
    "turnaround_hours": 20
  },
  {
    "loan_document_request_id": "ldr-346",
    "student_id": "251FA03209",
    "student_name": "Arnepalli Samhitha",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-06",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-347",
    "student_id": "251FA03121",
    "student_name": "Thummala Krishna",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-08",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-348",
    "student_id": "251FA03694",
    "student_name": "Borra Lakshmi",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840348",
    "turnaround_hours": 17.6
  },
  {
    "loan_document_request_id": "ldr-349",
    "student_id": "251FA03406",
    "student_name": "Annavarapu Aman",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840349",
    "turnaround_hours": 20.8
  },
  {
    "loan_document_request_id": "ldr-350",
    "student_id": "251FA03177",
    "student_name": "Doddakula Zubin",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840350",
    "turnaround_hours": 12
  },
  {
    "loan_document_request_id": "ldr-351",
    "student_id": "251FA03894",
    "student_name": "Yerram Ishaan",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-352",
    "student_id": "251FA03788",
    "student_name": "Narra Lokesh",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-353",
    "student_id": "251FA03244",
    "student_name": "Penumatsa Sravani",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840353",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-354",
    "student_id": "251FA03164",
    "student_name": "Siripurapu Sneha",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840354",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-355",
    "student_id": "251FA03359",
    "student_name": "Pragada Samhitha",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840355",
    "turnaround_hours": 16
  },
  {
    "loan_document_request_id": "ldr-356",
    "student_id": "251FA03704",
    "student_name": "Vankayalapati Ganesh",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-08",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-357",
    "student_id": "251FA03311",
    "student_name": "Gurrala Lakshmi",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-04",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-358",
    "student_id": "251FA03476",
    "student_name": "Gajula Gayatri",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840358",
    "turnaround_hours": 13.6
  },
  {
    "loan_document_request_id": "ldr-359",
    "student_id": "251FA03043",
    "student_name": "Narra Srikanth",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840359",
    "turnaround_hours": 16.8
  },
  {
    "loan_document_request_id": "ldr-360",
    "student_id": "251FA03446",
    "student_name": "Narra Kiran",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840360",
    "turnaround_hours": 20
  },
  {
    "loan_document_request_id": "ldr-361",
    "student_id": "251FA03069",
    "student_name": "Pandilla Zubin",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-06",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-362",
    "student_id": "251FA03027",
    "student_name": "Vankayalapati Chaitanya",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-08",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-363",
    "student_id": "251FA03362",
    "student_name": "Kakarla Vaishnavi",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840363",
    "turnaround_hours": 17.6
  },
  {
    "loan_document_request_id": "ldr-364",
    "student_id": "251FA02402",
    "student_name": "Devavarapu Surya",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840364",
    "turnaround_hours": 20.8
  },
  {
    "loan_document_request_id": "ldr-365",
    "student_id": "251FA02739",
    "student_name": "Maddipati Triveni",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840365",
    "turnaround_hours": 12
  },
  {
    "loan_document_request_id": "ldr-366",
    "student_id": "251FA02068",
    "student_name": "Busiraju Ananya",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-367",
    "student_id": "251FA02149",
    "student_name": "Enumula Lavanya",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-368",
    "student_id": "251FA02717",
    "student_name": "Madupu Harsha",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840368",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-369",
    "student_id": "251FA02067",
    "student_name": "Abburi Sanjana",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840369",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-370",
    "student_id": "251FA02718",
    "student_name": "Yerram Ramya",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840370",
    "turnaround_hours": 16
  },
  {
    "loan_document_request_id": "ldr-371",
    "student_id": "251FA02236",
    "student_name": "Cherukuri Naveen",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-08",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-372",
    "student_id": "251FA02762",
    "student_name": "Seelam Jahnavi",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-04",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-373",
    "student_id": "251FA02261",
    "student_name": "Penumatsa Manoj",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840373",
    "turnaround_hours": 13.6
  },
  {
    "loan_document_request_id": "ldr-374",
    "student_id": "251FA02919",
    "student_name": "Madupu Kavya",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840374",
    "turnaround_hours": 16.8
  },
  {
    "loan_document_request_id": "ldr-375",
    "student_id": "251FA02856",
    "student_name": "Marella Gayatri",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840375",
    "turnaround_hours": 20
  },
  {
    "loan_document_request_id": "ldr-376",
    "student_id": "251FA02539",
    "student_name": "Borra Sujatha",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-06",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-377",
    "student_id": "251FA02176",
    "student_name": "Busiraju Kavya",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-08",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-378",
    "student_id": "251FA05824",
    "student_name": "Kosuri Dhruv",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840378",
    "turnaround_hours": 17.6
  },
  {
    "loan_document_request_id": "ldr-379",
    "student_id": "251FA05827",
    "student_name": "Musunuri Abhishek",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840379",
    "turnaround_hours": 20.8
  },
  {
    "loan_document_request_id": "ldr-380",
    "student_id": "251FA05948",
    "student_name": "Indukuri Triveni",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840380",
    "turnaround_hours": 12
  },
  {
    "loan_document_request_id": "ldr-381",
    "student_id": "251FA05828",
    "student_name": "Valluri Ananya",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-382",
    "student_id": "251FA05232",
    "student_name": "Tanniru Kavya",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-383",
    "student_id": "251FA05102",
    "student_name": "Chitturi Varshini",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840383",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-384",
    "student_id": "251FA05506",
    "student_name": "Jala Indira",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840384",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-385",
    "student_id": "251FA05250",
    "student_name": "Madala Divya",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840385",
    "turnaround_hours": 16
  },
  {
    "loan_document_request_id": "ldr-386",
    "student_id": "251FA05501",
    "student_name": "Pulipati Siddharth",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-08",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-387",
    "student_id": "251FA05842",
    "student_name": "Neelam Ganesh",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-04",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-388",
    "student_id": "251FA05103",
    "student_name": "Sistla Omkar",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840388",
    "turnaround_hours": 13.6
  },
  {
    "loan_document_request_id": "ldr-389",
    "student_id": "251FA05980",
    "student_name": "Madala Chaitra",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840389",
    "turnaround_hours": 16.8
  },
  {
    "loan_document_request_id": "ldr-390",
    "student_id": "251FA05858",
    "student_name": "Ponnada Reyansh",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840390",
    "turnaround_hours": 20
  },
  {
    "loan_document_request_id": "ldr-391",
    "student_id": "251FA05238",
    "student_name": "Aleti Karthik",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-06",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-392",
    "student_id": "251FA05401",
    "student_name": "Moka Nikhil",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-08",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-393",
    "student_id": "251FA05696",
    "student_name": "Maddi Nikhil",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840393",
    "turnaround_hours": 17.6
  },
  {
    "loan_document_request_id": "ldr-394",
    "student_id": "251FA06081",
    "student_name": "Seshadri Sanjana",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840394",
    "turnaround_hours": 20.8
  },
  {
    "loan_document_request_id": "ldr-395",
    "student_id": "251FA06563",
    "student_name": "Mahankali Priya",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840395",
    "turnaround_hours": 12
  },
  {
    "loan_document_request_id": "ldr-396",
    "student_id": "251FA06774",
    "student_name": "Mamillapalli Krishna",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-397",
    "student_id": "251FA06395",
    "student_name": "Pachipala Ravi",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-398",
    "student_id": "251FA06741",
    "student_name": "Valluri Sathvik",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840398",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-399",
    "student_id": "251FA06489",
    "student_name": "Pasupuleti Krishna",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840399",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-400",
    "student_id": "251FA06882",
    "student_name": "Borra Uday",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840400",
    "turnaround_hours": 16
  },
  {
    "loan_document_request_id": "ldr-401",
    "student_id": "251FA06637",
    "student_name": "Vasireddy Saranya",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-08",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-402",
    "student_id": "251FA06980",
    "student_name": "Mamillapalli Omkar",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-04",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-403",
    "student_id": "251FA06518",
    "student_name": "Raparthi Gopal",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840403",
    "turnaround_hours": 13.6
  },
  {
    "loan_document_request_id": "ldr-404",
    "student_id": "251FA07402",
    "student_name": "Manda Bharath",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840404",
    "turnaround_hours": 16.8
  },
  {
    "loan_document_request_id": "ldr-405",
    "student_id": "251FA07495",
    "student_name": "Tummala Nandini",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840405",
    "turnaround_hours": 20
  },
  {
    "loan_document_request_id": "ldr-406",
    "student_id": "251FA07132",
    "student_name": "Raavi Revathi",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-06",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-407",
    "student_id": "251FA07518",
    "student_name": "Sarabu Lavanya",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-08",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-408",
    "student_id": "251FA07548",
    "student_name": "Sathiraju Siddharth",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840408",
    "turnaround_hours": 17.6
  },
  {
    "loan_document_request_id": "ldr-409",
    "student_id": "251FA07982",
    "student_name": "Botta Vaishnavi",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840409",
    "turnaround_hours": 20.8
  },
  {
    "loan_document_request_id": "ldr-410",
    "student_id": "251FA07483",
    "student_name": "Madireddy Pallavi",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840410",
    "turnaround_hours": 12
  },
  {
    "loan_document_request_id": "ldr-411",
    "student_id": "251FA07015",
    "student_name": "Borra Harsha",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-412",
    "student_id": "251FA07438",
    "student_name": "Velpula Harika",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-413",
    "student_id": "251FA07098",
    "student_name": "Bonthu Vikram",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840413",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-414",
    "student_id": "251FA09170",
    "student_name": "Marella Vishnu",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840414",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-415",
    "student_id": "251FA09369",
    "student_name": "Kakarla Revathi",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840415",
    "turnaround_hours": 16
  },
  {
    "loan_document_request_id": "ldr-416",
    "student_id": "251FA09781",
    "student_name": "Paladugu Ramya",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-08",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-417",
    "student_id": "251FA09660",
    "student_name": "Kothuri Divya",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-04",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-418",
    "student_id": "251FA09266",
    "student_name": "Sistla Ramya",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840418",
    "turnaround_hours": 13.6
  },
  {
    "loan_document_request_id": "ldr-419",
    "student_id": "251FA08184",
    "student_name": "Cheemala Deepika",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840419",
    "turnaround_hours": 16.8
  },
  {
    "loan_document_request_id": "ldr-420",
    "student_id": "251FA08606",
    "student_name": "Mahankali Ravi",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840420",
    "turnaround_hours": 20
  },
  {
    "loan_document_request_id": "ldr-421",
    "student_id": "251FA08632",
    "student_name": "Gutta Hemanth",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-06",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-422",
    "student_id": "251FA08359",
    "student_name": "Nallamothu Triveni",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-08",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-423",
    "student_id": "251FA08963",
    "student_name": "Madala Sanjana",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840423",
    "turnaround_hours": 17.6
  },
  {
    "loan_document_request_id": "ldr-424",
    "student_id": "251FA08261",
    "student_name": "Kolla Pallavi",
    "bank_name": "State Bank of India (SBI), Vadlamudi Branch",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840424",
    "turnaround_hours": 20.8
  },
  {
    "loan_document_request_id": "ldr-425",
    "student_id": "251FA08296",
    "student_name": "Kancharla Swathi",
    "bank_name": "Bank of Baroda, Guntur Main Branch",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840425",
    "turnaround_hours": 12
  },
  {
    "loan_document_request_id": "ldr-426",
    "student_id": "251FA08031",
    "student_name": "Velpula Reyansh",
    "bank_name": "Canara Bank, Vidyanagar Branch",
    "document_type": "ACADEMIC_STATUS",
    "requested_on": "2026-09-04",
    "status": "REQUESTED"
  },
  {
    "loan_document_request_id": "ldr-427",
    "student_id": "251FA08592",
    "student_name": "Tummala Zubin",
    "bank_name": "Union Bank of India, Tenali Branch",
    "document_type": "FEE_PAID_STATEMENT",
    "requested_on": "2026-09-06",
    "status": "IN_PROGRESS",
    "turnaround_hours": 6.5
  },
  {
    "loan_document_request_id": "ldr-428",
    "student_id": "251FA08767",
    "student_name": "Katta Priya",
    "bank_name": "HDFC Credila Financial Services",
    "document_type": "ADMISSION_CONFIRMATION",
    "requested_on": "2026-09-08",
    "status": "ISSUED",
    "issued_on": "2026-09-09",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840428",
    "turnaround_hours": 21.6
  },
  {
    "loan_document_request_id": "ldr-429",
    "student_id": "251FA11002",
    "student_name": "Sai Teja Varma",
    "bank_name": "ICICI Bank Education Loan Division",
    "document_type": "FEE_STRUCTURE",
    "requested_on": "2026-09-04",
    "status": "ISSUED",
    "issued_on": "2026-09-05",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840429",
    "turnaround_hours": 12.8
  },
  {
    "loan_document_request_id": "ldr-430",
    "student_id": "251FA12003",
    "student_name": "Siddharth Sen",
    "bank_name": "Punjab National Bank (PNB Saraswati)",
    "document_type": "BONAFIDE",
    "requested_on": "2026-09-06",
    "status": "ISSUED",
    "issued_on": "2026-09-07",
    "issued_by": "VFSTR Finance Desk",
    "verification_code": "VFSTR-LOAN-840430",
    "turnaround_hours": 16
  }
];

export const EXTENDED_REMINDER_DISPATCHES: ReminderDispatch[] = [
  {
    "reminder_dispatch_id": "rem-901",
    "student_id": "251FA04E03",
    "student_name": "Akshat Raj",
    "fee_demand_id": "fd-101",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ONPLAN-401",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment plan (Instalment #3 due 15 Oct 2026) covers remaining balance.",
    "sent_at": "2026-09-10 10:00:00"
  },
  {
    "reminder_dispatch_id": "rem-902",
    "student_id": "251FA04E58",
    "student_name": "Meera Iyer",
    "fee_demand_id": "fd-106",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-SCHOLAR-402",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Sanctioned VFSTR Merit Scholarship (₹20,000) awaiting government disbursement window.",
    "sent_at": "2026-09-09 11:30:00"
  },
  {
    "reminder_dispatch_id": "rem-903",
    "student_id": "251FA04E21",
    "student_name": "Rohan Mehta",
    "fee_demand_id": "fd-103",
    "segment": "PERSISTENT",
    "escalation_level": 2,
    "channel": "SMS + Email",
    "message_ref": "MSG-OVERDUE-403",
    "suppressed": false,
    "sent_at": "2026-09-08 09:15:00",
    "delivered_at": "2026-09-08 09:16:00",
    "responded": true
  },
  {
    "reminder_dispatch_id": "rem-904",
    "student_id": "251FA04E42",
    "student_name": "Aarav Desai",
    "fee_demand_id": "fd-105",
    "segment": "HARDSHIP",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-HARDSHIP-404",
    "suppressed": false,
    "sent_at": "2026-09-05 14:20:00",
    "delivered_at": "2026-09-05 14:21:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-905",
    "student_id": "251FA04645",
    "student_name": "Dharanikota Aaradhya",
    "fee_demand_id": "fd-202",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-502",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-07 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-906",
    "student_id": "251FA04852",
    "student_name": "Jonnalagadda Mounika",
    "fee_demand_id": "fd-203",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-PERS-503",
    "suppressed": false,
    "sent_at": "2026-09-06 10:30:00",
    "delivered_at": "2026-09-06 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-907",
    "student_id": "251FA04863",
    "student_name": "Kolla Yogesh",
    "fee_demand_id": "fd-204",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-ON_P-504",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-05 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-908",
    "student_id": "251FA04261",
    "student_name": "Challa Jayanth",
    "fee_demand_id": "fd-205",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-505",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-04 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-909",
    "student_id": "251FA04001",
    "student_name": "Jampani Spoorthi",
    "fee_demand_id": "fd-206",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-AWAI-506",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Institutional scholarship (₹25,000) awaiting state disbursement.",
    "sent_at": "2026-09-03 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-910",
    "student_id": "251FA04430",
    "student_name": "Borra Jayanth",
    "fee_demand_id": "fd-207",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-507",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-09 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-911",
    "student_id": "251FA04219",
    "student_name": "Somisetty Srujana",
    "fee_demand_id": "fd-208",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ON_P-508",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-08 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-912",
    "student_id": "251FA04381",
    "student_name": "Gajula Sneha",
    "fee_demand_id": "fd-209",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-PERS-509",
    "suppressed": false,
    "sent_at": "2026-09-07 10:30:00",
    "delivered_at": "2026-09-07 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-913",
    "student_id": "251FA04163",
    "student_name": "Vankayalapati Arjun",
    "fee_demand_id": "fd-210",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-510",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-06 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-914",
    "student_id": "251FA04952",
    "student_name": "Gurrala Divya",
    "fee_demand_id": "fd-211",
    "segment": "PERSISTENT",
    "escalation_level": 2,
    "channel": "WhatsApp",
    "message_ref": "MSG-PERS-511",
    "suppressed": false,
    "sent_at": "2026-09-05 10:30:00",
    "delivered_at": "2026-09-05 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-915",
    "student_id": "251FA04940",
    "student_name": "Jonnalagadda Jayanth",
    "fee_demand_id": "fd-212",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-AWAI-512",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Institutional scholarship (₹5,000) awaiting state disbursement.",
    "sent_at": "2026-09-04 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-916",
    "student_id": "251FA04378",
    "student_name": "Kothapalli Indira",
    "fee_demand_id": "fd-213",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ON_P-513",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-03 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-917",
    "student_id": "251FA04493",
    "student_name": "Yarlagadda Srujana",
    "fee_demand_id": "fd-214",
    "segment": "HARDSHIP",
    "escalation_level": 2,
    "channel": "SMS + Email",
    "message_ref": "MSG-HARD-514",
    "suppressed": false,
    "sent_at": "2026-09-09 10:30:00",
    "delivered_at": "2026-09-09 10:31:00",
    "responded": true
  },
  {
    "reminder_dispatch_id": "rem-918",
    "student_id": "251FA04208",
    "student_name": "Khareedu Uday",
    "fee_demand_id": "fd-215",
    "segment": "FORGOTTEN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-FORG-515",
    "suppressed": false,
    "sent_at": "2026-09-08 10:30:00",
    "delivered_at": "2026-09-08 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-919",
    "student_id": "251FA04394",
    "student_name": "Atla Abhishek",
    "fee_demand_id": "fd-216",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-ON_P-516",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-07 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-920",
    "student_id": "251FA04851",
    "student_name": "Janga Priya",
    "fee_demand_id": "fd-217",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-517",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-06 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-921",
    "student_id": "251FA04464",
    "student_name": "Katta Ravi",
    "fee_demand_id": "fd-218",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-AWAI-518",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Institutional scholarship (₹30,000) awaiting state disbursement.",
    "sent_at": "2026-09-05 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-922",
    "student_id": "251FA04263",
    "student_name": "Damacharla Chaitanya",
    "fee_demand_id": "fd-219",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-ON_P-519",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-04 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-923",
    "student_id": "251FA04928",
    "student_name": "Sanagapalli Vidya",
    "fee_demand_id": "fd-220",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-520",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-03 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-924",
    "student_id": "251FA04564",
    "student_name": "Guduru Niharika",
    "fee_demand_id": "fd-221",
    "segment": "HARDSHIP",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-HARD-521",
    "suppressed": false,
    "sent_at": "2026-09-09 10:30:00",
    "delivered_at": "2026-09-09 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-925",
    "student_id": "251FA04529",
    "student_name": "Tadepalli Vikram",
    "fee_demand_id": "fd-222",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-522",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-08 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-926",
    "student_id": "251FA04978",
    "student_name": "Bathula Spoorthi",
    "fee_demand_id": "fd-223",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ON_P-523",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-07 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-927",
    "student_id": "251FA04387",
    "student_name": "Nadimpalli Spoorthi",
    "fee_demand_id": "fd-224",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-AWAI-524",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Institutional scholarship (₹10,000) awaiting state disbursement.",
    "sent_at": "2026-09-06 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-928",
    "student_id": "251FA04068",
    "student_name": "Akkina Sindhu",
    "fee_demand_id": "fd-225",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-525",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-05 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-929",
    "student_id": "251FA04348",
    "student_name": "Penumatsa Uday",
    "fee_demand_id": "fd-226",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-ON_P-526",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-04 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-930",
    "student_id": "251FA04719",
    "student_name": "Thummala Yashaswini",
    "fee_demand_id": "fd-227",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-PERS-527",
    "suppressed": false,
    "sent_at": "2026-09-03 10:30:00",
    "delivered_at": "2026-09-03 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-931",
    "student_id": "251FA04511",
    "student_name": "Manda Dhruv",
    "fee_demand_id": "fd-228",
    "segment": "HARDSHIP",
    "escalation_level": 2,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-HARD-528",
    "suppressed": false,
    "sent_at": "2026-09-09 10:30:00",
    "delivered_at": "2026-09-09 10:31:00",
    "responded": true
  },
  {
    "reminder_dispatch_id": "rem-932",
    "student_id": "251FA04885",
    "student_name": "Jampani Aaradhya",
    "fee_demand_id": "fd-229",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-ON_P-529",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-08 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-933",
    "student_id": "251FA04909",
    "student_name": "Chava Pavan",
    "fee_demand_id": "fd-230",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-AWAI-530",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Institutional scholarship (₹10,000) awaiting state disbursement.",
    "sent_at": "2026-09-07 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-934",
    "student_id": "251FA04644",
    "student_name": "Pachipala Srujana",
    "fee_demand_id": "fd-231",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-PERS-531",
    "suppressed": false,
    "sent_at": "2026-09-06 10:30:00",
    "delivered_at": "2026-09-06 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-935",
    "student_id": "251FA04853",
    "student_name": "Kothuri Vikram",
    "fee_demand_id": "fd-232",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-532",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-05 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-936",
    "student_id": "251FA04189",
    "student_name": "Pasupuleti Rahul",
    "fee_demand_id": "fd-233",
    "segment": "PERSISTENT",
    "escalation_level": 2,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-PERS-533",
    "suppressed": false,
    "sent_at": "2026-09-04 10:30:00",
    "delivered_at": "2026-09-04 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-937",
    "student_id": "251FA04418",
    "student_name": "Kota Rohan",
    "fee_demand_id": "fd-234",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-ON_P-534",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-03 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-938",
    "student_id": "251FA04416",
    "student_name": "Nannapaneni Krishna",
    "fee_demand_id": "fd-235",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-535",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-09 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-939",
    "student_id": "251FA04346",
    "student_name": "Patibandla Yogesh",
    "fee_demand_id": "fd-236",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-AWAI-536",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Institutional scholarship (₹10,000) awaiting state disbursement.",
    "sent_at": "2026-09-08 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-940",
    "student_id": "251FA04455",
    "student_name": "Valluri Karthik",
    "fee_demand_id": "fd-237",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-537",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-07 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-941",
    "student_id": "251FA04953",
    "student_name": "Pasupuleti Chaitanya",
    "fee_demand_id": "fd-238",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ON_P-538",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-06 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-942",
    "student_id": "251FA04575",
    "student_name": "Perala Jyothi",
    "fee_demand_id": "fd-239",
    "segment": "PERSISTENT",
    "escalation_level": 2,
    "channel": "SMS + Email",
    "message_ref": "MSG-PERS-539",
    "suppressed": false,
    "sent_at": "2026-09-05 10:30:00",
    "delivered_at": "2026-09-05 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-943",
    "student_id": "251FA04741",
    "student_name": "Kasarla Venkatesh",
    "fee_demand_id": "fd-240",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-540",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-04 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-944",
    "student_id": "251FA04428",
    "student_name": "Palli Ramya",
    "fee_demand_id": "fd-241",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-ON_P-541",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-03 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-945",
    "student_id": "251FA04684",
    "student_name": "Gullipalli Bharath",
    "fee_demand_id": "fd-242",
    "segment": "HARDSHIP",
    "escalation_level": 2,
    "channel": "Email",
    "message_ref": "MSG-HARD-542",
    "suppressed": false,
    "sent_at": "2026-09-09 10:30:00",
    "delivered_at": "2026-09-09 10:31:00",
    "responded": true
  },
  {
    "reminder_dispatch_id": "rem-946",
    "student_id": "251FA04282",
    "student_name": "Sankara Ananya",
    "fee_demand_id": "fd-243",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ON_P-543",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-08 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-947",
    "student_id": "251FA04028",
    "student_name": "Guduru Sandeep",
    "fee_demand_id": "fd-244",
    "segment": "PERSISTENT",
    "escalation_level": 2,
    "channel": "SMS + Email",
    "message_ref": "MSG-PERS-544",
    "suppressed": false,
    "sent_at": "2026-09-07 10:30:00",
    "delivered_at": "2026-09-07 10:31:00",
    "responded": true
  },
  {
    "reminder_dispatch_id": "rem-948",
    "student_id": "251FA04496",
    "student_name": "Talluri Venkatesh",
    "fee_demand_id": "fd-245",
    "segment": "FORGOTTEN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-FORG-545",
    "suppressed": false,
    "sent_at": "2026-09-06 10:30:00",
    "delivered_at": "2026-09-06 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-949",
    "student_id": "251FA04400",
    "student_name": "Atla Reyansh",
    "fee_demand_id": "fd-246",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-ON_P-546",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-05 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-950",
    "student_id": "251FA04379",
    "student_name": "Paladugu Deepika",
    "fee_demand_id": "fd-247",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-PERS-547",
    "suppressed": false,
    "sent_at": "2026-09-04 10:30:00",
    "delivered_at": "2026-09-04 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-951",
    "student_id": "251FA04712",
    "student_name": "Nannapaneni Swathi",
    "fee_demand_id": "fd-248",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-PERS-548",
    "suppressed": false,
    "sent_at": "2026-09-03 10:30:00",
    "delivered_at": "2026-09-03 10:31:00",
    "responded": true
  },
  {
    "reminder_dispatch_id": "rem-952",
    "student_id": "251FA04449",
    "student_name": "Rangisetty Vishnu",
    "fee_demand_id": "fd-249",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-ON_P-549",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-09 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-953",
    "student_id": "251FA04025",
    "student_name": "Nakka Keerthi",
    "fee_demand_id": "fd-250",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-550",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-08 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-954",
    "student_id": "251FA04060",
    "student_name": "Challa Ishaan",
    "fee_demand_id": "fd-251",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-PERS-551",
    "suppressed": false,
    "sent_at": "2026-09-07 10:30:00",
    "delivered_at": "2026-09-07 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-955",
    "student_id": "251FA04108",
    "student_name": "Maladi Nandini",
    "fee_demand_id": "fd-252",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-552",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-06 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-956",
    "student_id": "251FA04784",
    "student_name": "Bandaru Varshini",
    "fee_demand_id": "fd-253",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ON_P-553",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 3-instalment milestone covers current cycle.",
    "sent_at": "2026-09-05 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-957",
    "student_id": "251FA04854",
    "student_name": "Maddipati Sai",
    "fee_demand_id": "fd-254",
    "segment": "PERSISTENT",
    "escalation_level": 2,
    "channel": "SMS + Email",
    "message_ref": "MSG-PERS-554",
    "suppressed": false,
    "sent_at": "2026-09-04 10:30:00",
    "delivered_at": "2026-09-04 10:31:00",
    "responded": true
  },
  {
    "reminder_dispatch_id": "rem-958",
    "student_id": "251FA04701",
    "student_name": "Immanni Gayatri",
    "fee_demand_id": "fd-255",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-555",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-03 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-959",
    "student_id": "251FA04610",
    "student_name": "Jonnalagadda Ishita",
    "fee_demand_id": "fd-256",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-ON_P-556",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-09 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-960",
    "student_id": "251FA04223",
    "student_name": "Mekala Reyansh",
    "fee_demand_id": "fd-257",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-PERS-557",
    "suppressed": false,
    "sent_at": "2026-09-08 10:30:00",
    "delivered_at": "2026-09-08 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-961",
    "student_id": "251FA04426",
    "student_name": "Uppala Sai",
    "fee_demand_id": "fd-258",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ON_P-558",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-07 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-962",
    "student_id": "251FA04002",
    "student_name": "Gurram Krishna",
    "fee_demand_id": "fd-259",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-ON_P-559",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-06 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-963",
    "student_id": "251FA04427",
    "student_name": "Nandigam Samhitha",
    "fee_demand_id": "fd-260",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-AWAI-560",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Institutional scholarship (₹15,000) awaiting state disbursement.",
    "sent_at": "2026-09-05 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-964",
    "student_id": "251FA04704",
    "student_name": "Donepudi Chaitra",
    "fee_demand_id": "fd-261",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-ON_P-561",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-04 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-965",
    "student_id": "251FA04924",
    "student_name": "Muppalla Lakshmi",
    "fee_demand_id": "fd-262",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-562",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-03 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-966",
    "student_id": "251FA04569",
    "student_name": "Pragada Triveni",
    "fee_demand_id": "fd-263",
    "segment": "HARDSHIP",
    "escalation_level": 2,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-HARD-563",
    "suppressed": false,
    "sent_at": "2026-09-09 10:30:00",
    "delivered_at": "2026-09-09 10:31:00",
    "responded": false
  },
  {
    "reminder_dispatch_id": "rem-967",
    "student_id": "251FA04095",
    "student_name": "Gadiparthi Hasini",
    "fee_demand_id": "fd-264",
    "segment": "AWAITING_SCHOLARSHIP",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-AWAI-564",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Institutional scholarship (₹5,000) awaiting state disbursement.",
    "sent_at": "2026-09-08 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-968",
    "student_id": "251FA04034",
    "student_name": "Sagi Sai",
    "fee_demand_id": "fd-265",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS",
    "message_ref": "MSG-ON_P-565",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-07 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-969",
    "student_id": "251FA04495",
    "student_name": "Katta Yash",
    "fee_demand_id": "fd-266",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "WhatsApp",
    "message_ref": "MSG-PERS-566",
    "suppressed": false,
    "sent_at": "2026-09-06 10:30:00",
    "delivered_at": "2026-09-06 10:31:00",
    "responded": true
  },
  {
    "reminder_dispatch_id": "rem-970",
    "student_id": "251FA04210",
    "student_name": "Nallamothu Sandeep",
    "fee_demand_id": "fd-267",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "Email",
    "message_ref": "MSG-ON_P-567",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-05 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-971",
    "student_id": "251FA04925",
    "student_name": "Padamata Sai",
    "fee_demand_id": "fd-268",
    "segment": "ON_PLAN",
    "escalation_level": 1,
    "channel": "SMS / WhatsApp",
    "message_ref": "MSG-ON_P-568",
    "suppressed": true,
    "suppression_reason": "Suppressed by Policy: Active 2-instalment milestone covers current cycle.",
    "sent_at": "2026-09-04 10:30:00"
  },
  {
    "reminder_dispatch_id": "rem-972",
    "student_id": "251FA04676",
    "student_name": "Sathiraju Reyansh",
    "fee_demand_id": "fd-269",
    "segment": "PERSISTENT",
    "escalation_level": 1,
    "channel": "SMS + Email",
    "message_ref": "MSG-PERS-569",
    "suppressed": false,
    "sent_at": "2026-09-03 10:30:00",
    "delivered_at": "2026-09-03 10:31:00",
    "responded": false
  }
];

export const EXTENDED_REFUNDS: RefundRecord[] = [
  {
    "refund_id": "rf-2081",
    "student_id": "251FA04E17",
    "student_name": "Ananya Sharma",
    "reason": "CAUTION_DEPOSIT",
    "eligible_amount": 20000,
    "approved_amount": 18500,
    "policy_applied": "Policy WD-2026 (Sec 4.2: Processing deduction ₹1,500)",
    "status": "REQUESTED"
  },
  {
    "refund_id": "rf-2082",
    "student_id": "251FA04219",
    "student_name": "Somisetty Srujana",
    "reason": "WITHDRAWAL",
    "eligible_amount": 25000,
    "approved_amount": 24000,
    "policy_applied": "UGC WD-2026 Sec 3.1: 100% refund (₹1,000 processing fee deducted)",
    "status": "REQUESTED"
  },
  {
    "refund_id": "rf-2083",
    "student_id": "251FA04381",
    "student_name": "Gajula Sneha",
    "reason": "CAUTION_DEPOSIT",
    "eligible_amount": 20000,
    "approved_amount": 20000,
    "policy_applied": "Institutional Caution Deposit Return upon degree completion / exit",
    "status": "REQUESTED"
  },
  {
    "refund_id": "rf-2084",
    "student_id": "251FA04163",
    "student_name": "Vankayalapati Arjun",
    "reason": "EXCESS",
    "eligible_amount": 35000,
    "approved_amount": 35000,
    "policy_applied": "Double remittance reconciliation: direct refund to original gateway source",
    "status": "REQUESTED"
  },
  {
    "refund_id": "rf-2085",
    "student_id": "251FA04952",
    "student_name": "Gurrala Divya",
    "reason": "CANCELLATION",
    "eligible_amount": 40000,
    "approved_amount": 38000,
    "policy_applied": "Hostel admission withdrawal prior to room allotment",
    "status": "REQUESTED"
  },
  {
    "refund_id": "rf-2086",
    "student_id": "251FA04940",
    "student_name": "Jonnalagadda Jayanth",
    "reason": "WITHDRAWAL",
    "eligible_amount": 45000,
    "approved_amount": 44000,
    "policy_applied": "UGC WD-2026 Sec 3.1: 100% refund (₹1,000 processing fee deducted)",
    "status": "APPROVED"
  },
  {
    "refund_id": "rf-2087",
    "student_id": "251FA04378",
    "student_name": "Kothapalli Indira",
    "reason": "CAUTION_DEPOSIT",
    "eligible_amount": 20000,
    "approved_amount": 20000,
    "policy_applied": "Institutional Caution Deposit Return upon degree completion / exit",
    "status": "APPROVED"
  },
  {
    "refund_id": "rf-2088",
    "student_id": "251FA04069",
    "student_name": "Janga Tarun",
    "reason": "EXCESS",
    "eligible_amount": 55000,
    "approved_amount": 55000,
    "policy_applied": "Double remittance reconciliation: direct refund to original gateway source",
    "status": "APPROVED"
  },
  {
    "refund_id": "rf-2089",
    "student_id": "251FA04485",
    "student_name": "Tanniru Sathvik",
    "reason": "CANCELLATION",
    "eligible_amount": 60000,
    "approved_amount": 58000,
    "policy_applied": "Hostel admission withdrawal prior to room allotment",
    "status": "APPROVED"
  },
  {
    "refund_id": "rf-2090",
    "student_id": "251FA04119",
    "student_name": "Musunuri Aditya",
    "reason": "WITHDRAWAL",
    "eligible_amount": 65000,
    "approved_amount": 64000,
    "policy_applied": "UGC WD-2026 Sec 3.1: 100% refund (₹1,000 processing fee deducted)",
    "status": "APPROVED"
  },
  {
    "refund_id": "rf-2091",
    "student_id": "251FA04493",
    "student_name": "Yarlagadda Srujana",
    "reason": "CAUTION_DEPOSIT",
    "eligible_amount": 20000,
    "approved_amount": 20000,
    "policy_applied": "Institutional Caution Deposit Return upon degree completion / exit",
    "status": "APPROVED"
  },
  {
    "refund_id": "rf-2092",
    "student_id": "251FA04208",
    "student_name": "Khareedu Uday",
    "reason": "EXCESS",
    "eligible_amount": 75000,
    "approved_amount": 75000,
    "policy_applied": "Double remittance reconciliation: direct refund to original gateway source",
    "status": "APPROVED"
  },
  {
    "refund_id": "rf-2093",
    "student_id": "251FA04394",
    "student_name": "Atla Abhishek",
    "reason": "CANCELLATION",
    "eligible_amount": 80000,
    "approved_amount": 78000,
    "policy_applied": "Hostel admission withdrawal prior to room allotment",
    "status": "PAID"
  },
  {
    "refund_id": "rf-2094",
    "student_id": "251FA04851",
    "student_name": "Janga Priya",
    "reason": "WITHDRAWAL",
    "eligible_amount": 85000,
    "approved_amount": 84000,
    "policy_applied": "UGC WD-2026 Sec 3.1: 100% refund (₹1,000 processing fee deducted)",
    "status": "PAID"
  },
  {
    "refund_id": "rf-2095",
    "student_id": "251FA04464",
    "student_name": "Katta Ravi",
    "reason": "CAUTION_DEPOSIT",
    "eligible_amount": 20000,
    "approved_amount": 20000,
    "policy_applied": "Institutional Caution Deposit Return upon degree completion / exit",
    "status": "PAID"
  },
  {
    "refund_id": "rf-2096",
    "student_id": "251FA04140",
    "student_name": "Thummala Priya",
    "reason": "EXCESS",
    "eligible_amount": 95000,
    "approved_amount": 95000,
    "policy_applied": "Double remittance reconciliation: direct refund to original gateway source",
    "status": "PAID"
  },
  {
    "refund_id": "rf-2097",
    "student_id": "251FA04263",
    "student_name": "Damacharla Chaitanya",
    "reason": "CANCELLATION",
    "eligible_amount": 100000,
    "approved_amount": 98000,
    "policy_applied": "Hostel admission withdrawal prior to room allotment",
    "status": "PAID"
  },
  {
    "refund_id": "rf-2098",
    "student_id": "251FA04928",
    "student_name": "Sanagapalli Vidya",
    "reason": "WITHDRAWAL",
    "eligible_amount": 105000,
    "approved_amount": 0,
    "policy_applied": "Rejected: Withdrawal requested >30 days post commencement (UGC Sec 3.5)",
    "status": "REJECTED"
  },
  {
    "refund_id": "rf-2099",
    "student_id": "251FA04564",
    "student_name": "Guduru Niharika",
    "reason": "CAUTION_DEPOSIT",
    "eligible_amount": 20000,
    "approved_amount": 0,
    "policy_applied": "Rejected: Withdrawal requested >30 days post commencement (UGC Sec 3.5)",
    "status": "REJECTED"
  },
  {
    "refund_id": "rf-2100",
    "student_id": "251FA04085",
    "student_name": "Balusu Divya",
    "reason": "EXCESS",
    "eligible_amount": 115000,
    "approved_amount": 0,
    "policy_applied": "Rejected: Withdrawal requested >30 days post commencement (UGC Sec 3.5)",
    "status": "REJECTED"
  }
];
