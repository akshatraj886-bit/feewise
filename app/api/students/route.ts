import { NextRequest, NextResponse } from "next/server";
import { students } from "@/backend/database/finance-data";
import { getDatabase, isMongoConfigured } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const query = searchParams.get("query");
    const programme = searchParams.get("programme");

    if (isMongoConfigured()) {
      const db = await getDatabase();
      if (db) {
        const collection = db.collection("students");
        const count = await collection.countDocuments();
        if (count > 0) {
          if (id) {
            const student = await collection.findOne({ id: id.toUpperCase() });
            return NextResponse.json({ source: "mongodb", student });
          }

          const mongoQuery: Record<string, unknown> = {};
          if (programme && programme !== "All programmes" && programme !== "All branches") {
            mongoQuery.programme = programme;
          }
          if (query) {
            mongoQuery.$or = [
              { name: { $regex: query, $options: "i" } },
              { id: { $regex: query, $options: "i" } },
            ];
          }

          const docs = await collection.find(mongoQuery).toArray();
          return NextResponse.json({ source: "mongodb", count: docs.length, students: docs });
        }
      }
    }

    // Fallback to built-in 492 students
    if (id) {
      const student = students.find((s) => s.id.toUpperCase() === id.toUpperCase());
      return NextResponse.json({ source: "local-store", student: student || null });
    }

    let filtered = [...students];
    if (programme && programme !== "All programmes" && programme !== "All branches") {
      filtered = filtered.filter((s) => s.programme === programme);
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter((s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }

    return NextResponse.json({
      source: "local-store",
      count: filtered.length,
      students: filtered,
    });
  } catch (error) {
    console.error("[Students API Error]:", error);
    return NextResponse.json({ error: "Failed to fetch student data." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // Action to seed MongoDB with all 492 students
    if (action === "seed" && isMongoConfigured()) {
      const db = await getDatabase();
      if (!db) {
        return NextResponse.json({ error: "Could not connect to MongoDB." }, { status: 500 });
      }

      const studentsCol = db.collection("students");
      await studentsCol.deleteMany({});
      await studentsCol.insertMany(students);

      return NextResponse.json({
        success: true,
        message: `Successfully seeded ${students.length} students into MongoDB.`,
      });
    }

    return NextResponse.json({ message: "Action completed." });
  } catch (error) {
    console.error("[Students POST API Error]:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
