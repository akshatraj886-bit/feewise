"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { students } from "../database/finance-data";

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
      const targetId = studentId || students[0]?.id || "251FA04645";
      const student = students.find((s) => s.id === targetId) || students[0];
      if (student) {
        setUser({
          role: "student",
          name: student.name,
          id: student.id,
          studentId: student.id,
          avatar: student.initials,
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
