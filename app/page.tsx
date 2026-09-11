"use client";

import { useAuth } from "@/lib/auth-context";
import { LoginScreen } from "@/components/auth/login-screen";
import { FinanceDashboard } from "@/components/finance/dashboard";
import { StudentPortal } from "@/components/student/student-portal";

export default function Page() {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  if (user.role === "student") {
    return <StudentPortal />;
  }

  return <FinanceDashboard />;
}
