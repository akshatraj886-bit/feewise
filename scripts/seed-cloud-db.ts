import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env.local if present
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

import { students, transactions, programmes } from "../backend/database/finance-data";
import { studentCredentials } from "../backend/database/student-credentials";
import { feeAllocations } from "../backend/database/fee-allocations";
import { paymentReceipts } from "../backend/database/payment-receipts";
import { scholarshipStatus } from "../backend/database/scholarship-status";
import {
  extendedScholarshipRisks,
  extendedLoanRequests,
  extendedReminders,
  extendedRefunds,
} from "../backend/database/extended-sql-data";

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ ERROR: MONGODB_URI is not defined in .env.local or .env");
    console.log("\n👉 Please create a .env.local file in the project root with:");
    console.log("MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/feewise_db?retryWrites=true&w=majority\n");
    process.exit(1);
  }

  console.log("==================================================");
  console.log("🚀 STARTING VFSTR CLOUD DATABASE SEEDING ENGINE");
  console.log("==================================================");
  console.log("Connecting to MongoDB Atlas Cluster...");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas!");

    const dbName = "feewise_db";
    const db = client.db(dbName);
    console.log(`Target Database: ${dbName}\n`);

    // 1. Students Collection (504 records)
    console.log(`📦 1. Seeding Students (${students.length} records)...`);
    const studentsCol = db.collection("students");
    await studentsCol.deleteMany({});
    if (students.length > 0) {
      await studentsCol.insertMany(students);
      await studentsCol.createIndex({ id: 1 }, { unique: true });
      await studentsCol.createIndex({ programme: 1 });
      await studentsCol.createIndex({ name: "text" });
    }
    console.log(`   ✅ ${students.length} students seeded with unique index on 'id'`);

    // 2. Transactions Collection (1,157 records)
    console.log(`📦 2. Seeding Transactions (${transactions.length} records)...`);
    const txnCol = db.collection("transactions");
    await txnCol.deleteMany({});
    if (transactions.length > 0) {
      await txnCol.insertMany(transactions);
      await txnCol.createIndex({ id: 1 }, { unique: true });
      await txnCol.createIndex({ studentId: 1 });
      await txnCol.createIndex({ status: 1 });
    }
    console.log(`   ✅ ${transactions.length} transactions seeded with index on 'studentId'`);

    // 3. Programmes & Fee Structure (11 programmes)
    console.log(`📦 3. Seeding Programmes (${programmes.length} programmes)...`);
    const progCol = db.collection("programmes");
    await progCol.deleteMany({});
    if (programmes.length > 0) {
      await progCol.insertMany(programmes);
      await progCol.createIndex({ code: 1 }, { unique: true });
    }
    console.log(`   ✅ ${programmes.length} academic programmes fee structures seeded`);

    // 4. Student Credentials (DOB & Authentication)
    const credCount = Object.keys(studentCredentials).length;
    console.log(`📦 4. Seeding Student Credentials (${credCount} credentials)...`);
    const credCol = db.collection("student_credentials");
    await credCol.deleteMany({});
    const credArray = Object.entries(studentCredentials).map(([id, cred]) => ({
      studentId: id,
      ...cred,
    }));
    if (credArray.length > 0) {
      await credCol.insertMany(credArray);
      await credCol.createIndex({ studentId: 1 }, { unique: true });
    }
    console.log(`   ✅ ${credArray.length} student credentials seeded`);

    // 5. Bank Loan Requests (130 records)
    console.log(`📦 5. Seeding Bank Loan Requests (${extendedLoanRequests.length} records)...`);
    const loanCol = db.collection("loan_requests");
    await loanCol.deleteMany({});
    if (extendedLoanRequests.length > 0) {
      await loanCol.insertMany(extendedLoanRequests);
      await loanCol.createIndex({ loan_document_request_id: 1 }, { unique: true });
      await loanCol.createIndex({ student_id: 1 });
      await loanCol.createIndex({ status: 1 });
    }
    console.log(`   ✅ ${extendedLoanRequests.length} bank loan requests seeded`);

    // 6. Scholarship Renewal Risks (115 records)
    console.log(`📦 6. Seeding Scholarship Renewal Risks (${extendedScholarshipRisks.length} records)...`);
    const riskCol = db.collection("scholarship_risks");
    await riskCol.deleteMany({});
    if (extendedScholarshipRisks.length > 0) {
      await riskCol.insertMany(extendedScholarshipRisks);
      await riskCol.createIndex({ risk_id: 1 }, { unique: true });
      await riskCol.createIndex({ student_id: 1 });
      await riskCol.createIndex({ risk_level: 1 });
    }
    console.log(`   ✅ ${extendedScholarshipRisks.length} scholarship renewal risks seeded`);

    // 7. Smart Automated Reminders (72 records)
    console.log(`📦 7. Seeding Smart Reminders (${extendedReminders.length} records)...`);
    const remCol = db.collection("reminder_dispatches");
    await remCol.deleteMany({});
    if (extendedReminders.length > 0) {
      await remCol.insertMany(extendedReminders);
      await remCol.createIndex({ reminder_id: 1 }, { unique: true });
      await remCol.createIndex({ student_id: 1 });
    }
    console.log(`   ✅ ${extendedReminders.length} smart reminder dispatch logs seeded`);

    // 8. Refunds Queue & Policy Records (20 records)
    console.log(`📦 8. Seeding Refunds Queue (${extendedRefunds.length} records)...`);
    const refCol = db.collection("refunds");
    await refCol.deleteMany({});
    if (extendedRefunds.length > 0) {
      await refCol.insertMany(extendedRefunds);
      await refCol.createIndex({ refund_id: 1 }, { unique: true });
      await refCol.createIndex({ student_id: 1 });
      await refCol.createIndex({ status: 1 });
    }
    console.log(`   ✅ ${extendedRefunds.length} institutional refund records seeded`);

    // 9. Itemized Fee Allocations
    const allocKeys = Object.keys(feeAllocations);
    console.log(`📦 9. Seeding Itemized Fee Allocations (${allocKeys.length} students)...`);
    const allocCol = db.collection("fee_allocations");
    await allocCol.deleteMany({});
    const allocArray = Object.entries(feeAllocations).map(([studentId, allocations]) => ({
      studentId,
      allocations,
    }));
    if (allocArray.length > 0) {
      await allocCol.insertMany(allocArray);
      await allocCol.createIndex({ studentId: 1 }, { unique: true });
    }
    console.log(`   ✅ ${allocArray.length} student head-wise waterfall fee allocations seeded`);

    console.log("\n==================================================");
    console.log("🎉 ALL INSTITUTIONAL DATA SUCCESSFULLY SEEDED TO MONGODB!");
    console.log("==================================================");
  } catch (err) {
    console.error("❌ Seeding Error:", err);
  } finally {
    await client.close();
    console.log("Database connection closed cleanly.");
  }
}

seedDatabase();
