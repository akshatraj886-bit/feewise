/**
 * finDeck Frontend Architecture Directory Map
 * 
 * Provides an evaluator with a high-level index of all frontend subsystems:
 * 
 * 1. App Router & Routing Engine:
 *    - /app/page.tsx             : Primary dynamic application entry & role switcher
 *    - /app/layout.tsx           : Root provider tree (Theme + Auth + Fonts)
 *    - /app/globals.css          : Unified Tailwind CSS design system tokens (Light/Dark mode)
 * 
 * 2. Interactive UI & 3D Components (/components/ui/):
 *    - mascot-robot.tsx          : 3D Three.js AI Companion GLB loader with real-time cursor tracking
 *    - DarkVeil.tsx + .css       : React Bits WebGL OGL shader background
 *    - tilted-card.tsx           : 3D interactive tilt cards with specular glow
 *    - findeck-logo.tsx          : Scalable vector branding logo
 *    - theme-toggle.tsx          : Dark / Light mode switcher button
 *    - base-ui/                  : Dialogs, Buttons, Badges, Charts, Cards, Inputs
 * 
 * 3. Role-Based Dashboards & Portals:
 *    - /components/auth/login-screen.tsx        : 3D SSO Login screen with 2FA & Quick Demo auto-fill
 *    - /components/finance/dashboard.tsx       : Executive finance command center with 12 modular tabs
 *    - /components/finance/overview.tsx        : Key institutional metrics, collections, and ageing
 *    - /components/finance/assistant.tsx       : AI Financial Copilot chat interface (multilingual)
 *    - /components/finance/details.tsx         : Ledger reconciliation & discrepancy resolution
 *    - /components/finance/certificates.tsx    : 80C Tax certificates & Clearance documents
 *    - /components/finance/partial-payment-modal.tsx : Waterfall partial payment calculator
 *    - /components/finance/organizer-views.tsx : 07_admissions_finance schema compliance inspector
 *    - /components/student/student-portal.tsx  : Student-facing fee passbook, payments, & downloads
 */

// Re-export major frontend components for evaluator convenience
export * from "@/components/auth/login-screen";
export * from "@/components/finance/dashboard";
export * from "@/components/student/student-portal";
export * from "@/components/ui/mascot-robot";
export * from "@/components/ui/findeck-logo";
export * from "@/components/ui/theme-toggle";
