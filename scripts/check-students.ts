import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return;
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  const db = client.db("feewise_db");

  const chaitanya = await db.collection("students").findOne({ name: { $regex: "Chaitanya", $options: "i" } });
  console.log("Chaitanya in MongoDB:", chaitanya);

  const akshat = await db.collection("students").findOne({ name: { $regex: "Akshat", $options: "i" } });
  console.log("Akshat in MongoDB:", akshat);

  const aaradhya = await db.collection("students").findOne({ name: { $regex: "Aaradhya", $options: "i" } });
  console.log("Aaradhya in MongoDB:", aaradhya);

  const siddharth = await db.collection("students").findOne({ name: { $regex: "Siddharth", $options: "i" } });
  console.log("Siddharth in MongoDB:", siddharth);

  const vishnu = await db.collection("students").findOne({ name: { $regex: "Vishnu", $options: "i" } });
  console.log("Vishnu in MongoDB:", vishnu);

  await client.close();
}

main();
