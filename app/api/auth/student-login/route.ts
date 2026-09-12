import { NextRequest, NextResponse } from "next/server";
import { validateStudentCredentials, studentCredentialsMap } from "@/backend/database/student-credentials";
import { students } from "@/backend/database/finance-data";
import { getDatabase, isMongoConfigured } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json(
        { error: "Student ID and Password are required." },
        { status: 400 }
      );
    }

    const cleanId = String(id).trim().toUpperCase();
    const cleanPassword = String(password).trim();

    // Check if MongoDB is available and configured
    if (isMongoConfigured()) {
      const db = await getDatabase();
      if (db) {
        const studentDoc = await db.collection("students").findOne({ id: cleanId });
        if (studentDoc) {
          const credDoc =
            (await db.collection("student_credentials").findOne({ studentId: cleanId })) ||
            (await db.collection("credentials").findOne({ id: cleanId }));
          if (
            credDoc &&
            (credDoc.studentPassword === cleanPassword ||
              credDoc.password === cleanPassword ||
              validateStudentCredentials(cleanId, cleanPassword).valid)
          ) {
            return NextResponse.json({
              success: true,
              source: "mongodb",
              student: studentDoc,
              dob: credDoc.dob,
            });
          }
        }
      }
    }

    // High-performance embedded credential validation
    const validation = validateStudentCredentials(cleanId, cleanPassword);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.message },
        { status: 401 }
      );
    }

    const foundStudent = students.find((s) => s.id.toUpperCase() === cleanId.toUpperCase());
    const student = foundStudent || {
      id: cleanId,
      name: cleanId,
      programme: "B.Tech CSE",
      demand: 180000,
      paid: 0,
      scholarship: 0,
      concession: 0,
      overdue: 0,
    };

    return NextResponse.json({
      success: true,
      source: "local-store",
      student,
      dob: validation.credential?.dob,
    });
  } catch (error) {
    console.error("[Student Login API Error]:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
