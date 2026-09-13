import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("No MONGODB_URI found");
    return;
  }
  console.log("Connecting to MongoDB with 10s timeout...");
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    console.log("Connected successfully!");
    const db = client.db("feewise_db");
    const cols = await db.listCollections().toArray();
    console.log("Collections found:", cols.length);
    for (const col of cols) {
      const count = await db.collection(col.name).countDocuments();
      console.log(` - ${col.name}: ${count} docs`);
    }
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  } finally {
    await client.close();
  }
}

main();
