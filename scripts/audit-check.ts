import { students, admittedStudents } from "../backend/database/finance-data";
import { benchmarkHistoricalStudents } from "../backend/services/finance-service";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("admittedStudents length:", admittedStudents.length);
  const chaitanyaInCode = admittedStudents.find(s => s.name.includes("Chaitanya"));
  console.log("Chaitanya in admittedStudents:", chaitanyaInCode);

  const cv = admittedStudents.find(s => s.id === "251FA04E58");
  console.log("251FA04E58 in admittedStudents:", cv);

  const benchCV = benchmarkHistoricalStudents.find(s => s.id === "251FA04E58");
  console.log("251FA04E58 in benchmarkHistoricalStudents:", benchCV);

  // Check MongoDB
  const uri = process.env.MONGODB_URI;
  if (uri) {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("feewise_db");
    const mongoStudent = await db.collection("students").findOne({ id: "251FA04E58" });
    console.log("251FA04E58 in MongoDB:", mongoStudent);
    const mongoByName = await db.collection("students").findOne({ name: /Chaitanya/i });
    console.log("Chaitanya in MongoDB:", mongoByName);
    await client.close();
  }
}

main();
