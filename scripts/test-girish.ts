import { students } from "../backend/database/finance-data";
import {
  getStudentDuesBreakdown,
  getStudentExamEligibility,
  getStudentAcademicHistory,
  getStudentAccount
} from "../backend/services/finance-service";

const s = students.find(x => x.id === "241FA02175");
console.log("Student record:", s);
console.log("Dues breakdown:", getStudentDuesBreakdown("241FA02175"));
console.log("Exam eligibility:", getStudentExamEligibility("241FA02175"));
console.log("Academic history:", getStudentAcademicHistory("241FA02175"));
console.log("Account:", getStudentAccount("241FA02175"));
