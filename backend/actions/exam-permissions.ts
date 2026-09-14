"use server";

import { getDatabase, isMongoConfigured } from "@/lib/mongodb";
import {
  examPermissionRequestsStore,
  type ExamPermissionRequest,
} from "@/backend/database/exam-permission-requests";

// Helper to normalize strings
const normalize = (str: string) => (str || "").toUpperCase().trim();

// Local fallback implementations (server-side memory)
function localGetStudentRequests(studentId: string): ExamPermissionRequest[] {
  const norm = normalize(studentId);
  return examPermissionRequestsStore.filter(r => normalize(r.studentId) === norm);
}

function localCreateRequest(request: ExamPermissionRequest) {
  examPermissionRequestsStore.push(request);
  return request;
}

function localGetAllRequests() {
  return [...examPermissionRequestsStore];
}

function localUpdateRequestStatus(
  id: string,
  updates: Partial<Pick<ExamPermissionRequest, "status" | "rejectionReason" | "reviewedBy" | "reviewedAt" | "counsellorNotes" | "letterRef" | "digitalSignature">>
) {
  const idx = examPermissionRequestsStore.findIndex((r) => r.id === id);
  if (idx !== -1) {
    examPermissionRequestsStore[idx] = { ...examPermissionRequestsStore[idx], ...updates };
    return examPermissionRequestsStore[idx];
  }
  return null;
}

function localGetPendingCount() {
  return examPermissionRequestsStore.filter((r) => r.status === "Pending").length;
}

// --------------------------------------------------------
// SERVER ACTIONS
// --------------------------------------------------------

export async function getStudentPermissionRequestsAction(studentId: string): Promise<ExamPermissionRequest[]> {
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        const docs = await db.collection("exam_permission_requests")
          .find({ studentId: normalize(studentId) })
          .toArray();
        // Return without _id to avoid serialization issues
        return docs.map(d => {
          const { _id, ...rest } = d;
          return rest as ExamPermissionRequest;
        });
      }
    } catch (err) {
      console.warn("MongoDB read failed, falling back to local memory:", err);
    }
  }
  return localGetStudentRequests(studentId);
}

export async function createPermissionRequestAction(request: ExamPermissionRequest): Promise<boolean> {
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        await db.collection("exam_permission_requests").insertOne({ ...request });
        return true;
      }
    } catch (err) {
      console.warn("MongoDB insert failed, falling back to local memory:", err);
    }
  }
  localCreateRequest(request);
  return true;
}

export async function getAllPermissionRequestsAction(): Promise<ExamPermissionRequest[]> {
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        const docs = await db.collection("exam_permission_requests").find({}).toArray();
        if (docs.length > 0) {
          return docs.map(d => {
            const { _id, ...rest } = d;
            return rest as ExamPermissionRequest;
          });
        }
      }
    } catch (err) {
      console.warn("MongoDB read failed, falling back to local memory:", err);
    }
  }
  return localGetAllRequests();
}

export async function updatePermissionRequestStatusAction(
  id: string,
  updates: Partial<Pick<ExamPermissionRequest, "status" | "rejectionReason" | "reviewedBy" | "reviewedAt" | "counsellorNotes" | "letterRef" | "digitalSignature">>
): Promise<ExamPermissionRequest | null> {
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        const result = await db.collection("exam_permission_requests").findOneAndUpdate(
          { id },
          { $set: updates },
          { returnDocument: 'after' }
        );
        if (result) {
          const { _id, ...rest } = result;
          return rest as ExamPermissionRequest;
        }
      }
    } catch (err) {
      console.warn("MongoDB update failed, falling back to local memory:", err);
    }
  }
  return localUpdateRequestStatus(id, updates);
}

export async function getPendingPermissionRequestsCountAction(): Promise<number> {
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        return await db.collection("exam_permission_requests").countDocuments({ status: "Pending" });
      }
    } catch (err) {
      console.warn("MongoDB count failed, falling back to local memory:", err);
    }
  }
  return localGetPendingCount();
}
