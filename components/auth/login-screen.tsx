"use client";

import { useState } from "react";
import { useAuth, type UserRole } from "@/lib/auth-context";
import {
  validateStudentCredentials,
  lookupStudentForPasswordReset,
  verifyStudentIdentityForReset,
  resetStudentPassword,
  type StudentResetProfile,
} from "@/lib/finance-data";
import { Button } from "@/components/ui/button";
import { FinDeckLogo } from "@/components/ui/findeck-logo";
import { TiltedCard } from "@/components/ui/tilted-card";
import DarkVeil from "@/components/ui/DarkVeil";
import { MascotRobot } from "@/components/ui/mascot-robot";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Crown,
  KeyRound,
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Loader2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

type RoleConfig = {
  role: UserRole;
  title: string;
  badge: string;
  defaultEmail: string;
  subtitle: string;
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    glowColor: string;
    buttonGradient: string;
    borderHighlight: string;
  };
  features: string[];
};

const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  admin: {
    role: "admin",
    title: "CEO & Administrator",
    badge: "Executive Authority",
    defaultEmail: "ramamurthy.ceo@vignan.ac.in",
    subtitle: "Dr. K. Ramamurthy · Vice-Chancellor & CEO",
    colorTheme: {
      badgeBg: "bg-amber-100 border-amber-300",
      badgeText: "text-amber-900",
      iconBg: "bg-amber-100 border-amber-300 text-amber-700",
      glowColor: "rgba(245, 158, 11, 0.45)",
      buttonGradient: "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold",
      borderHighlight: "border-amber-300 hover:border-amber-400",
    },
    features: [
      "Real-Time ₹38.45 Cr Treasury",
      "Refund Approval Authority",
      "Fee Slab Configuration",
      "Executive AI Copilot",
    ],
  },
  "finance-officer": {
    role: "finance-officer",
    title: "Finance Officer",
    badge: "Comptroller Desk",
    defaultEmail: "priya.sharma@vignan.ac.in",
    subtitle: "Priya Sharma · Chief Finance Officer",
    colorTheme: {
      badgeBg: "bg-indigo-100 border-indigo-300",
      badgeText: "text-indigo-900",
      iconBg: "bg-indigo-100 border-indigo-300 text-indigo-700",
      glowColor: "rgba(82, 99, 232, 0.45)",
      buttonGradient: "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold",
      borderHighlight: "border-indigo-300 hover:border-indigo-400",
    },
    features: [
      "Reconciliation (TXN-10483)",
      "Cashier Counter Entry",
      "PostgreSQL 07 Schema Dump",
      "Scholarship Risk Warnings",
    ],
  },
  student: {
    role: "student",
    title: "Student Portal",
    badge: "Self-Service",
    defaultEmail: "251FA04645",
    subtitle: "2,500+ Registered Students · Confidential Portal",
    colorTheme: {
      badgeBg: "bg-emerald-100 border-emerald-300",
      badgeText: "text-emerald-900",
      iconBg: "bg-emerald-100 border-emerald-300 text-emerald-700",
      glowColor: "rgba(16, 185, 129, 0.45)",
      buttonGradient: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold",
      borderHighlight: "border-emerald-300 hover:border-emerald-400",
    },
    features: [
      "Waterfall Fee Simulator",
      "Instant 80C Tax Cert PDF",
      "Bank Loan NOC (SBI/HDFC)",
      "Confidential Roll No & DOB Login",
    ],
  },
};

export function LoginScreen() {
  const { login } = useAuth();

  // Active Login Modal State
  const [activeLoginRole, setActiveLoginRole] = useState<UserRole | null>(null);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  // Form Inputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorPin, setTwoFactorPin] = useState("842019");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Forgot Password Flow State
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState<1 | 2 | 3>(1);
  const [resetRollNo, setResetRollNo] = useState("");
  const [resetProfile, setResetProfile] = useState<StudentResetProfile | null>(null);
  const [resetDob, setResetDob] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Open login modal for specific role
  function openRoleLogin(role: UserRole) {
    setActiveLoginRole(role);
    setIsForgotPassword(false);
    setResetStep(1);
    setResetProfile(null);
    setResetDob("");
    setResetOtp("");
    setIsOtpSent(false);
    setNewPassword("");
    setConfirmPassword("");

    if (role === "student") {
      setEmailInput("251FA04645");
      setPasswordInput("Aaradhya@14032004");
    } else if (role === "admin") {
      setEmailInput(ROLE_CONFIGS.admin.defaultEmail);
      setPasswordInput("CeoExecutive@2026");
      setTwoFactorPin("842019");
    } else if (role === "finance-officer") {
      setEmailInput(ROLE_CONFIGS["finance-officer"].defaultEmail);
      setPasswordInput("FinanceOfficer@2026");
      setTwoFactorPin("842019");
    }
  }

  function handleLookupStudent() {
    if (!resetRollNo.trim()) {
      toast.error("Please enter your Student Registration / Roll Number.");
      return;
    }
    const res = lookupStudentForPasswordReset(resetRollNo);
    if (!res.found || !res.studentId) {
      toast.error(res.message || "Student Registration Number not found in directory.");
      return;
    }
    setResetProfile(res);
    setResetDob(res.dob || "");
    setResetStep(2);
    toast.success(`Student profile found: ${res.studentName}`);
  }

  function handleSendOtp() {
    setIsOtpSent(true);
    setResetOtp("842019");
    toast.info(`Simulated OTP sent to ${resetProfile?.maskedEmail || "registered email"}: 842019`);
  }

  function handleVerifyIdentity() {
    if (!resetProfile?.studentId) return;
    const res = verifyStudentIdentityForReset(resetProfile.studentId, resetDob, resetOtp);
    if (!res.valid) {
      toast.error(res.message || "Verification failed. Please check Date of Birth or OTP.");
      return;
    }
    setResetStep(3);
    toast.success("Identity verified! Please set your new password.");
  }

  function handleFinalPasswordReset(e: React.FormEvent) {
    e.preventDefault();
    if (!resetProfile?.studentId) return;
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match! Please check and try again.");
      return;
    }

    setIsResetting(true);
    setTimeout(() => {
      const res = resetStudentPassword(resetProfile.studentId!, newPassword);
      if (!res.success) {
        setIsResetting(false);
        toast.error(res.message);
        return;
      }

      toast.success(`Password reset successful for ${resetProfile.studentName}! Signing you in...`);
      setIsResetting(false);
      setIsForgotPassword(false);
      login("student", resetProfile.studentId!);
      setActiveLoginRole(null);
    }, 500);
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailInput.trim()) {
      toast.error(activeLoginRole === "student" ? "Please enter your Student Roll Number" : "Please enter your official university email");
      return;
    }
    if (!passwordInput.trim()) {
      toast.error("Please enter your password");
      return;
    }

    setIsAuthenticating(true);
    const targetRole = activeLoginRole || "admin";

    setTimeout(() => {
      // 1. Strict Student Validation
      if (targetRole === "student") {
        const cleanInput = emailInput.trim().toLowerCase();
        if (cleanInput.includes("@vignan.ac.in") && (cleanInput.includes("ceo") || cleanInput.includes("sharma") || cleanInput.includes("finance") || cleanInput.includes("ramamurthy"))) {
          setIsAuthenticating(false);
          toast.error("Access Denied: Administrative staff cannot log in to the Student Self-Service portal.");
          return;
        }

        const check = validateStudentCredentials(emailInput, passwordInput);
        if (!check.valid || !check.studentId) {
          setIsAuthenticating(false);
          toast.error(check.message || "Invalid Student ID or Password! Use 'Forgot Password?' below.");
          return;
        }
        setIsAuthenticating(false);
        toast.success(`Authenticated student (${check.studentId}) successfully!`);
        login("student", check.studentId);
        return;
      }

      // 2. Strict CEO Administrator Validation
      if (targetRole === "admin") {
        const cleanEmail = emailInput.trim().toLowerCase();
        const allowedCeoEmails = ["ramamurthy.ceo@vignan.ac.in", "ceo@vignan.ac.in", "vc@vignan.ac.in"];

        if (cleanEmail.includes("priya") || cleanEmail.includes("finance.officer") || cleanEmail.includes("fo-")) {
          setIsAuthenticating(false);
          toast.error("Access Denied: This is a Finance Officer account. You cannot access the CEO Administrator portal.");
          return;
        }

        if (/^\d{3}[a-z]{2}\d{5}/i.test(cleanEmail)) {
          setIsAuthenticating(false);
          toast.error("Access Denied: Student accounts cannot access the CEO Administrator executive portal.");
          return;
        }

        if (!allowedCeoEmails.includes(cleanEmail)) {
          setIsAuthenticating(false);
          toast.error("Access Denied: Email not recognized as CEO Administrator. (Authorized: ramamurthy.ceo@vignan.ac.in)");
          return;
        }

        if (passwordInput !== "CeoExecutive@2026") {
          setIsAuthenticating(false);
          toast.error("Incorrect Password for CEO Administrator! (Use: CeoExecutive@2026)");
          return;
        }

        setIsAuthenticating(false);
        toast.success(`Authenticated as ${ROLE_CONFIGS.admin.title}! Full treasury permissions granted.`);
        login("admin");
        return;
      }

      // 3. Strict Finance Officer Validation
      if (targetRole === "finance-officer") {
        const cleanEmail = emailInput.trim().toLowerCase();
        const allowedFoEmails = ["priya.sharma@vignan.ac.in", "finance.officer@vignan.ac.in", "comptroller@vignan.ac.in"];

        if (cleanEmail.includes("ramamurthy") || cleanEmail.includes("ceo") || cleanEmail.includes("vc@")) {
          setIsAuthenticating(false);
          toast.error("Access Denied: Executive CEO accounts must use the CEO Administrator portal.");
          return;
        }

        if (/^\d{3}[a-z]{2}\d{5}/i.test(cleanEmail)) {
          setIsAuthenticating(false);
          toast.error("Access Denied: Student accounts cannot access the Comptroller Operations desk.");
          return;
        }

        if (!allowedFoEmails.includes(cleanEmail)) {
          setIsAuthenticating(false);
          toast.error("Access Denied: Email not recognized as Finance Officer. (Authorized: priya.sharma@vignan.ac.in)");
          return;
        }

        if (passwordInput !== "FinanceOfficer@2026") {
          setIsAuthenticating(false);
          toast.error("Incorrect Password for Finance Officer! (Use: FinanceOfficer@2026)");
          return;
        }

        setIsAuthenticating(false);
        toast.success(`Authenticated as ${ROLE_CONFIGS["finance-officer"].title}!`);
        login("finance-officer");
        return;
      }
    }, 500);
  }

  return (
    <div className="relative min-h-screen bg-[#07090e] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 overflow-x-hidden select-none">
      {/* React Bits <DarkVeil /> Animated Shader Background (Guaranteed Dark & Visible at z-0) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07090e]">
        <DarkVeil
          speed={0.45}
          warpAmount={0.04}
          noiseIntensity={0.015}
          scanlineIntensity={0.02}
          resolutionScale={1}
          lightMode={false}
        />
      </div>

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <FinDeckLogo
            size={40}
            textSize="lg"
            subtitle="VFSTR • Vignan's Foundation for Science, Technology & Research"
          />
          <span className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Active University Portal
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle className="bg-white/10 border-white/20 text-white hover:bg-white/20" />

          <div className="hidden sm:flex items-center gap-2 text-xs text-white bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-xs">
            <Lock className="size-3.5 text-cyan-400" />
            <span>Select any portal to sign in</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Responsive Layout: White Cards on Left, 3D Robot Mascot on Right */}
      <main className="relative z-10 max-w-7xl w-full mx-auto my-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-8 items-center">
          {/* Left Column: Title + The 3 Crisp White Role Cards */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-xs">
                <Sparkles className="size-3.5 text-cyan-400" />
                <span>Autonomous Higher-Education Finance Architecture</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-lg">
                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-400">finDeck</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Official University Finance &amp; Treasury Command System. Click any portal below to enter your email and credentials.
              </p>
            </div>

            {/* The 3 CRISP BRIGHT WHITE Cards (High Contrast on DarkVeil) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-stretch">
              {/* CARD 1: CEO & ADMINISTRATOR (Bright White Card) */}
              <div
                onMouseEnter={() => setHoveredRole("admin")}
                onMouseLeave={() => setHoveredRole(null)}
                className="h-full"
              >
                <TiltedCard
                  maxTilt={12}
                  scale={1.03}
                  glowColor={ROLE_CONFIGS.admin.colorTheme.glowColor}
                  className="bg-white/95 dark:bg-white/95 text-slate-900 border-2 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl h-full rounded-2xl"
                >
                  <div className="p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`flex size-10 items-center justify-center rounded-xl border shadow-xs ${ROLE_CONFIGS.admin.colorTheme.iconBg}`}>
                          <Crown className="size-5" />
                        </span>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${ROLE_CONFIGS.admin.colorTheme.badgeBg} ${ROLE_CONFIGS.admin.colorTheme.badgeText}`}>
                          {ROLE_CONFIGS.admin.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900">
                          {ROLE_CONFIGS.admin.title}
                        </h3>
                        <p className="text-[11px] text-slate-600 font-semibold mt-0.5 truncate">
                          {ROLE_CONFIGS.admin.subtitle}
                        </p>
                      </div>

                      <div className="space-y-1.5 text-[11px] text-slate-700 font-medium pt-2.5 border-t border-slate-200">
                        {ROLE_CONFIGS.admin.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1">
                      <Button
                        size="sm"
                        className={`w-full h-9 gap-1.5 shadow-md cursor-pointer text-xs ${ROLE_CONFIGS.admin.colorTheme.buttonGradient}`}
                        onClick={() => openRoleLogin("admin")}
                      >
                        <span>Sign In</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </TiltedCard>
              </div>

              {/* CARD 2: FINANCE OFFICER (Bright White Card) */}
              <div
                onMouseEnter={() => setHoveredRole("finance-officer")}
                onMouseLeave={() => setHoveredRole(null)}
                className="h-full"
              >
                <TiltedCard
                  maxTilt={12}
                  scale={1.03}
                  glowColor={ROLE_CONFIGS["finance-officer"].colorTheme.glowColor}
                  className="bg-white/95 dark:bg-white/95 text-slate-900 border-2 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl h-full rounded-2xl"
                >
                  <div className="p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`flex size-10 items-center justify-center rounded-xl border shadow-xs ${ROLE_CONFIGS["finance-officer"].colorTheme.iconBg}`}>
                          <Building className="size-5" />
                        </span>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${ROLE_CONFIGS["finance-officer"].colorTheme.badgeBg} ${ROLE_CONFIGS["finance-officer"].colorTheme.badgeText}`}>
                          {ROLE_CONFIGS["finance-officer"].badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900">
                          {ROLE_CONFIGS["finance-officer"].title}
                        </h3>
                        <p className="text-[11px] text-slate-600 font-semibold mt-0.5 truncate">
                          {ROLE_CONFIGS["finance-officer"].subtitle}
                        </p>
                      </div>

                      <div className="space-y-1.5 text-[11px] text-slate-700 font-medium pt-2.5 border-t border-slate-200">
                        {ROLE_CONFIGS["finance-officer"].features.map((f, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="size-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1">
                      <Button
                        size="sm"
                        className={`w-full h-9 gap-1.5 shadow-md cursor-pointer text-xs ${ROLE_CONFIGS["finance-officer"].colorTheme.buttonGradient}`}
                        onClick={() => openRoleLogin("finance-officer")}
                      >
                        <span>Sign In</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </TiltedCard>
              </div>

              {/* CARD 3: STUDENT PORTAL (Bright White Card) */}
              <div
                onMouseEnter={() => setHoveredRole("student")}
                onMouseLeave={() => setHoveredRole(null)}
                className="h-full"
              >
                <TiltedCard
                  maxTilt={12}
                  scale={1.03}
                  glowColor={ROLE_CONFIGS.student.colorTheme.glowColor}
                  className="bg-white/95 dark:bg-white/95 text-slate-900 border-2 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl h-full rounded-2xl"
                >
                  <div className="p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`flex size-10 items-center justify-center rounded-xl border shadow-xs ${ROLE_CONFIGS.student.colorTheme.iconBg}`}>
                          <GraduationCap className="size-5" />
                        </span>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${ROLE_CONFIGS.student.colorTheme.badgeBg} ${ROLE_CONFIGS.student.colorTheme.badgeText}`}>
                          {ROLE_CONFIGS.student.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900">
                          {ROLE_CONFIGS.student.title}
                        </h3>
                        <p className="text-[11px] text-slate-600 font-semibold mt-0.5 truncate">
                          {ROLE_CONFIGS.student.subtitle}
                        </p>
                      </div>

                      <div className="space-y-1.5 text-[11px] text-slate-700 font-medium pt-2.5 border-t border-slate-200">
                        {ROLE_CONFIGS.student.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1">
                      <Button
                        size="sm"
                        className={`w-full h-9 gap-1.5 shadow-md cursor-pointer text-xs ${ROLE_CONFIGS.student.colorTheme.buttonGradient}`}
                        onClick={() => openRoleLogin("student")}
                      >
                        <span>Sign In</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </TiltedCard>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Mascot Robot that tracks mouse cursor & can be 3D rotated */}
          <div className="flex justify-center items-center py-4 lg:py-0">
            <MascotRobot hoveredRole={hoveredRole} />
          </div>
        </div>
      </main>

      {/* DEDICATED AUTHENTICATION MODAL (Bright White Glassmorphic Card) */}
      {activeLoginRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in-0">
          <div
            className="fixed inset-0"
            onClick={() => setActiveLoginRole(null)}
          />

          <div className="relative w-full max-w-md z-10">
            <TiltedCard
              maxTilt={6}
              scale={1.01}
              glowColor={ROLE_CONFIGS[activeLoginRole].colorTheme.glowColor}
              className="bg-white dark:bg-white text-slate-900 border-2 border-white shadow-2xl p-6 sm:p-7 backdrop-blur-2xl rounded-2xl"
            >
              {/* FORGOT PASSWORD WORKFLOW FOR STUDENTS */}
              {isForgotPassword && activeLoginRole === "student" ? (
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl border bg-emerald-100 border-emerald-300 text-emerald-700">
                        <KeyRound className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-black text-base text-slate-900">
                          Student Password Recovery
                        </h3>
                        <p className="text-[11px] text-slate-600 font-medium">
                          Self-Service Reset via Roll Number &amp; Verification
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setResetStep(1);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-900 p-1 rounded-md hover:bg-slate-100 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Steps Progress Indicator */}
                  <div className="flex items-center justify-between text-[11px] font-bold px-1 bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                    <span className={`flex items-center gap-1.5 ${resetStep >= 1 ? "text-emerald-700" : "text-slate-400"}`}>
                      <span className={`size-5 rounded-full flex items-center justify-center text-[10px] ${resetStep >= 1 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>1</span>
                      Identify
                    </span>
                    <span className="h-0.5 w-6 bg-slate-200" />
                    <span className={`flex items-center gap-1.5 ${resetStep >= 2 ? "text-emerald-700" : "text-slate-400"}`}>
                      <span className={`size-5 rounded-full flex items-center justify-center text-[10px] ${resetStep >= 2 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>2</span>
                      Verify Identity
                    </span>
                    <span className="h-0.5 w-6 bg-slate-200" />
                    <span className={`flex items-center gap-1.5 ${resetStep >= 3 ? "text-emerald-700" : "text-slate-400"}`}>
                      <span className={`size-5 rounded-full flex items-center justify-center text-[10px] ${resetStep === 3 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>3</span>
                      New Password
                    </span>
                  </div>

                  {/* STEP 1: Registration Number Input */}
                  {resetStep === 1 && (
                    <div className="space-y-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <GraduationCap className="size-3.5 text-emerald-600" />
                          Student Registration / Roll Number
                        </label>
                        <input
                          type="text"
                          required
                          value={resetRollNo}
                          onChange={(e) => setResetRollNo(e.target.value.toUpperCase())}
                          placeholder="Enter Roll No (e.g. 251FA04645, 251FA04E03)..."
                          className="w-full h-10 px-3 text-xs font-mono font-bold tracking-wider rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleLookupStudent();
                            }
                          }}
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-600">
                        <span className="font-semibold text-slate-500">Quick Samples:</span>
                        {[
                          { id: "251FA04E58", label: "Chaitanya (₹8k Due)" },
                          { id: "251FA04645", label: "Aaradhya" },
                          { id: "251FA04E03", label: "Akshat" },
                          { id: "251FA11001", label: "Kavita" },
                          { id: "251FA12001", label: "Vikram" },
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setResetRollNo(s.id)}
                            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 cursor-pointer font-medium"
                          >
                            {s.label} ({s.id})
                          </button>
                        ))}
                      </div>

                      <Button
                        type="button"
                        onClick={handleLookupStudent}
                        className="w-full h-10 gap-2 font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow"
                      >
                        <span>Verify Registration Number</span>
                        <ArrowRight className="size-4" />
                      </Button>

                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(false)}
                        className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-1 flex items-center justify-center gap-1 cursor-pointer font-medium"
                      >
                        <ArrowLeft className="size-3" /> Return to Login
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Identity Verification (DOB or OTP) */}
                  {resetStep === 2 && resetProfile && (
                    <div className="space-y-3 pt-1">
                      {/* Verified Profile Card */}
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{resetProfile.studentName}</span>
                          <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {resetProfile.studentId}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">{resetProfile.programme}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 mt-1">
                          <span>Email: {resetProfile.maskedEmail}</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="size-3" /> Directory Verified
                          </span>
                        </div>
                      </div>

                      {/* DOB Input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-emerald-600" />
                            Date of Birth (DD/MM/YYYY)
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {resetProfile.dob ? `Registered: ${resetProfile.dob}` : "As per university records"}
                          </span>
                        </label>
                        <input
                          type="text"
                          value={resetDob}
                          onChange={(e) => setResetDob(e.target.value)}
                          placeholder="e.g. 14/03/2004 or 14032004"
                          className="w-full h-9 px-3 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                        />
                      </div>

                      {/* Or OTP Input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Shield className="size-3.5 text-emerald-600" />
                            Or University 2FA Verification OTP
                          </span>
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold hover:underline cursor-pointer"
                          >
                            {isOtpSent ? "↻ Resend OTP" : "Send 6-Digit OTP"}
                          </button>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={resetOtp}
                            onChange={(e) => setResetOtp(e.target.value)}
                            maxLength={6}
                            placeholder="Enter 6-digit OTP (e.g. 842019)"
                            className="flex-1 h-9 px-3 text-xs font-mono font-bold tracking-widest text-center rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="px-3 h-9 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 cursor-pointer whitespace-nowrap"
                          >
                            Use OTP (842019)
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setResetStep(1)}
                          className="px-3 h-10 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                        >
                          Back
                        </button>
                        <Button
                          type="button"
                          onClick={handleVerifyIdentity}
                          className="flex-1 h-10 gap-2 font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow"
                        >
                          <span>Verify Identity</span>
                          <ArrowRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Set New Password */}
                  {resetStep === 3 && resetProfile && (
                    <form onSubmit={handleFinalPasswordReset} className="space-y-3 pt-1">
                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-900 flex items-center justify-between">
                        <span className="font-bold">Resetting password for: {resetProfile.studentName}</span>
                        <span className="font-mono font-bold text-emerald-800">{resetProfile.studentId}</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Lock className="size-3.5 text-emerald-600" />
                            New Password
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="text-[10px] text-emerald-700 font-semibold cursor-pointer"
                          >
                            {showNewPassword ? "Hide" : "Show"}
                          </button>
                        </label>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password (min 6 characters)"
                          className="w-full h-9 px-3 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Lock className="size-3.5 text-emerald-600" />
                          Confirm New Password
                        </label>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full h-9 px-3 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                        />
                      </div>

                      <p className="text-[11px] text-slate-500">
                        Tip: You can use standard university format <strong>Name@DDMMYYYY</strong> or any secure custom password.
                      </p>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setResetStep(2)}
                          className="px-3 h-10 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                        >
                          Back
                        </button>
                        <Button
                          type="submit"
                          disabled={isResetting}
                          className="flex-1 h-10 gap-2 font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow"
                        >
                          {isResetting ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              <span>Updating Password...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="size-4" />
                              <span>Set Password &amp; Enter Portal</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                /* STANDARD SIGN IN FORM */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Header with Role Details */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className={`flex size-10 items-center justify-center rounded-xl border ${ROLE_CONFIGS[activeLoginRole].colorTheme.iconBg}`}>
                        {activeLoginRole === "admin" ? (
                          <Crown className="size-5" />
                        ) : activeLoginRole === "finance-officer" ? (
                          <Building className="size-5" />
                        ) : (
                          <GraduationCap className="size-5" />
                        )}
                      </span>
                      <div>
                        <h3 className="font-black text-base text-slate-900">
                          Sign in to {ROLE_CONFIGS[activeLoginRole].title}
                        </h3>
                        <p className="text-[11px] text-slate-600 font-medium">
                          {ROLE_CONFIGS[activeLoginRole].subtitle}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveLoginRole(null)}
                      className="text-xs text-slate-500 hover:text-slate-900 p-1 rounded-md hover:bg-slate-100 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {activeLoginRole === "student" && (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <Shield className="size-3.5 text-emerald-600" />
                        Student Credential Protocol
                      </div>
                      <p className="text-[11px] leading-relaxed text-emerald-700">
                        All 2,500+ students can log in with their Roll Number and password (default: <strong>Name@DDMMYYYY</strong>, e.g. <code>Aaradhya@14032004</code>).
                      </p>
                    </div>
                  )}

                  {/* Email / Roll No Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      {activeLoginRole === "student" ? (
                        <>
                          <GraduationCap className="size-3.5 text-primary" />
                          Student Roll Number or Registered Email
                        </>
                      ) : (
                        <>
                          <Mail className="size-3.5 text-primary" />
                          Gmail or University Email
                        </>
                      )}
                    </label>
                    <input
                      type="text"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder={
                        activeLoginRole === "student"
                          ? "Enter Student ID (e.g. 251FA04645)..."
                          : activeLoginRole === "admin"
                          ? "Enter CEO Email (ramamurthy.ceo@vignan.ac.in)..."
                          : "Enter Finance Officer Email (priya.sharma@vignan.ac.in)..."
                      }
                      className="w-full h-10 px-3 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-primary/40 outline-none"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock className="size-3.5 text-primary" />
                        {activeLoginRole === "student" ? "Password (Name@DOB)" : "Account Password"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[10px] text-primary hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                      >
                        {showPassword ? (
                          <>
                            <EyeOff className="size-3" /> Hide
                          </>
                        ) : (
                          <>
                            <Eye className="size-3" /> Show
                          </>
                        )}
                      </button>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder={
                        activeLoginRole === "student"
                          ? "Format: Name@DDMMYYYY (e.g. Aaradhya@14032004)"
                          : activeLoginRole === "admin"
                          ? "Enter CEO Password (CeoExecutive@2026)..."
                          : "Enter Finance Officer Password (FinanceOfficer@2026)..."
                      }
                      className="w-full h-10 px-3 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-primary/40 outline-none"
                    />

                    {/* Student Forgot Password Link */}
                    {activeLoginRole === "student" && (
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotPassword(true);
                            setResetRollNo(emailInput.trim() || "251FA04645");
                            setResetStep(1);
                          }}
                          className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <KeyRound className="size-3" /> Forgot Password? / पासवर्ड भूल गए?
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 2FA Pin / Verification Code or Student Verification Indicator */}
                  {activeLoginRole !== "student" ? (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <KeyRound className="size-3.5 text-primary" />
                          Two-Factor Auth (2FA Token)
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold">Demo Verified</span>
                      </label>
                      <input
                        type="text"
                        value={twoFactorPin}
                        onChange={(e) => setTwoFactorPin(e.target.value)}
                        maxLength={6}
                        className="w-full h-10 px-3 text-xs font-mono tracking-widest text-center rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-primary/40 outline-none font-bold"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-[11px] flex items-center justify-between text-slate-700">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="size-3.5 text-emerald-600" />
                        Confidential Per-Student Ledger
                      </span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="size-3" /> 256-Bit SSL Protected
                      </span>
                    </div>
                  )}

                  {/* Quick Auto-Fill Demo Button & Student Test Chips */}
                  {activeLoginRole === "student" ? (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                        <span>Quick Test Student Profiles:</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Shield className="size-3" /> ISO 27001
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {[
                          { name: "Chaitanya", id: "251FA04E58", pass: "Chaitanya@24012006", branch: "₹8k Past Due" },
                          { name: "Siddharth", id: "251FA04E36", pass: "Siddharth@15082005", branch: "₹20k Past Due" },
                          { name: "Akshat Raj", id: "251FA04E03", pass: "Akshat@14022006", branch: "Current Due" },
                          { name: "Aaradhya", id: "251FA04645", pass: "Aaradhya@14032004", branch: "₹0 Clear" },
                          { name: "Kavita", id: "251FA11001", pass: "Kavita@12042005", branch: "IT" },
                          { name: "Vikram", id: "251FA12001", pass: "Vikram@05062003", branch: "ECE" },
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setEmailInput(s.id);
                              setPasswordInput(s.pass);
                              toast.info(`Filled credentials: ${s.name} (${s.id})`);
                            }}
                            className="text-[10px] px-2 py-0.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors cursor-pointer font-medium"
                          >
                            {s.name} <span className="font-mono text-[9px] text-slate-500">({s.branch})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (activeLoginRole === "admin") {
                            setEmailInput("ramamurthy.ceo@vignan.ac.in");
                            setPasswordInput("CeoExecutive@2026");
                            toast.info("CEO Administrator credentials filled: ramamurthy.ceo@vignan.ac.in / CeoExecutive@2026");
                          } else if (activeLoginRole === "finance-officer") {
                            setEmailInput("priya.sharma@vignan.ac.in");
                            setPasswordInput("FinanceOfficer@2026");
                            toast.info("Finance Officer credentials filled: priya.sharma@vignan.ac.in / FinanceOfficer@2026");
                          }
                        }}
                        className="text-primary hover:underline cursor-pointer font-semibold"
                      >
                        ↻ Auto-fill Demo Credentials
                      </button>

                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <Shield className="size-3" /> 256-Bit SSL
                      </span>
                    </div>
                  )}

                  {/* Submit Sign In Button */}
                  <Button
                    type="submit"
                    disabled={isAuthenticating}
                    className={`w-full h-11 gap-2 font-bold shadow-md cursor-pointer ${ROLE_CONFIGS[activeLoginRole].colorTheme.buttonGradient}`}
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Verifying Credentials…</span>
                      </>
                    ) : (
                      <>
                        <span>Enter {ROLE_CONFIGS[activeLoginRole].title}</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setActiveLoginRole(null)}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-1 flex items-center justify-center gap-1 cursor-pointer font-medium"
                  >
                    <ArrowLeft className="size-3" /> Switch to Another Role
                  </button>
                </form>
              )}
            </TiltedCard>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Shield className="size-3.5 text-cyan-400" />
          <span>AES-256 Encrypted Session · ISO 27001 Financial Governance</span>
        </div>
        <p>Vignan&apos;s Foundation for Science, Technology &amp; Research (Deemed to be University)</p>
      </footer>
    </div>
  );
}
