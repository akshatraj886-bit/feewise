import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return;
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  const db = client.db("feewise_db");

  const sampleIds = ["251FA04E03", "251FA04645", "251FA04E58"];
  console.log("=== SAMPLE STUDENTS IN MONGODB ===");
  for (const id of sampleIds) {
    const s = await db.collection("students").findOne({ id });
    console.log(id, ":", JSON.stringify(s, null, 2));
  }

  console.log("\n=== SAMPLE TRANSACTIONS FOR 251FA04E03 ===");
  const txns = await db.collection("transactions").find({ student: "251FA04E03" }).toArray();
  console.log("Txns count:", txns.length, txns);

  console.log("\n=== SAMPLE FEE ALLOCATIONS FOR 251FA04E03 ===");
  const alloc = await db.collection("fee_allocations").findOne({ studentId: "251FA04E03" });
  console.log("Allocations:", JSON.stringify(alloc, null, 2));

  console.log("\n=== SAMPLE LOAN REQUEST ===");
  const loan = await db.collection("loan_requests").findOne({});
  console.log("Loan:", loan);

  console.log("\n=== SAMPLE SCHOLARSHIP RISK ===");
  const risk = await db.collection("scholarship_risks").findOne({});
  console.log("Risk:", risk);

  console.log("\n=== SAMPLE REMINDER ===");
  const rem = await db.collection("reminder_dispatches").findOne({});
  console.log("Reminder:", rem);

  console.log("\n=== SAMPLE REFUND ===");
  const ref = await db.collection("refunds").findOne({});
  console.log("Refund:", ref);

  await client.close();
}

main();
