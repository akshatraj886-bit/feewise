"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { students } from "../database/finance-data";
import { studentCredentials } from "../database/student-credentials";
import { benchmarkHistoricalStudents } from "../services/finance-service";

/**
 * Core User Roles for finDeck Authentication.
 * NOTE (Step 5 Access Model Architecture):
 * The Counsellor Desk & Exam Permission approval operations are accessible to staff roles
 * ("admin" and "finance-officer"), preserving the 3-role login structure and leaving the CEO role untouched.
 */
export type UserRole = "admin" | "finance-officer" | "student";

export type AuthUser = {
  role: UserRole;
  name: string;
  id: string;
  studentId?: string;
  avatar: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (role: UserRole, studentId?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const STAFF_USERS: Record<"admin" | "finance-officer", Omit<AuthUser, "role">> = {
  admin: {
    name: "Dr. K. Ramamurthy (CEO & Vice-Chancellor)",
    id: "CEO-EXEC-01",
    avatar: "KR",
  },
  "finance-officer": {
    name: "Priya Sharma (Chief Finance Officer)",
    id: "FO-042",
    avatar: "PS",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(role: UserRole, studentId?: string) {
    if (role === "student") {
      const targetId = (studentId || students[0]?.id || "251FA04645").trim().toUpperCase();
      const student =
        students.find((s) => s.id.toUpperCase() === targetId) ||
        benchmarkHistoricalStudents.find((s) => s.id.toUpperCase() === targetId);

      if (student) {
        setUser({
          role: "student",
          name: student.name,
          id: student.id,
          studentId: student.id,
          avatar: student.initials || "ST",
        });
      } else {
        const cred = studentCredentials[targetId];
        const studentName = cred ? cred.password.split("@")[0] : `Student ${targetId}`;
        setUser({
          role: "student",
          name: studentName,
          id: targetId,
          studentId: targetId,
          avatar: studentName.slice(0, 2).toUpperCase(),
        });
      }
    } else {
      setUser({ role, ...STAFF_USERS[role] });
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout: () => setUser(null) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

/** Returns true if the current user can perform privileged admin actions (approve refunds, manage fee structures) */
export function canApprove(role: UserRole) {
  return role === "admin";
}

/** Returns true if the user has staff-level data access (can see all students) */
export function isStaff(role: UserRole) {
  return role === "admin" || role === "finance-officer";
}
