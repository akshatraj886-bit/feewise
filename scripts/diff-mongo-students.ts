import { students } from "../backend/database/finance-data";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("feewise_db");

  const mongoDocs = await db.collection("students").find({}, { projection: { id: 1 } }).toArray();
  const mongoIds = new Set(mongoDocs.map(d => d.id));

  const missingInMongo = students.filter(s => !mongoIds.has(s.id));
  console.log("Students in code but missing in MongoDB:", missingInMongo.length);
  for (const s of missingInMongo) {
    console.log(" - Missing:", s.id, s.name, s.programme);
  }

  const missingInCode = mongoDocs.filter(d => !students.some(s => s.id === d.id));
  console.log("Students in MongoDB but missing in code:", missingInCode.length);
  for (const d of missingInCode) {
    console.log(" - Extra in Mongo:", d.id);
  }

  await client.close();
}

main();
