# 🏛️ finDeck — Autonomous University Fee & Finance Command Center
### Vignan's Foundation for Science, Technology & Research (VFSTR Deemed-to-be University)

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_WebGL-000000?logo=three.js)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 📖 **Evaluators & Judges**: Complete architectural blueprints, data flow diagrams, and domain segregation are documented in [**`ARCHITECTURE.md`**](./ARCHITECTURE.md).

---

## ⚡ Quick Start & Live Demo Access

```bash
# 1. Install dependencies
npm install

# 2. Run the local development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### 🎭 Pre-Configured Demo Credentials (One-Click Auto-Fill)
| Role | Demo User | Special Capabilities |
| :--- | :--- | :--- |
| **👑 CEO Administrator** | Dr. P. Ramamurthy (`ramamurthy@vignan.ac.in`) | Full executive command center, statutory reports, institutional macro KPI analytics, audit approval controls. |
| **💼 Finance Officer** | Priya Sharma (`priya.finance@vignan.ac.in`) | Ledger reconciliation, 07_admissions_finance SQL schema inspector, waterfall partial payments, Section 80C certificates. |
| **🎓 Student** | Akshat Raj (`251FA04E03`) | Personal fee passbook, dues clearance tracker, online receipt generator, 80C tax deduction download. |

---

## 🏗️ Codebase Segregation & Organization

The codebase is segregated into distinct, decoupled subsystems:

```
feewise/
├── ⚙️ backend/                        # BACKEND LOGIC & DATA SUBSYSTEMS
│   ├── 🗄️ database/                  # PostgreSQL 07_admissions_finance schema + IndexedDB
│   ├── 💼 services/                  # Ledger reconciliation, snapshot stats, waterfall logic
│   ├── 🤖 ai/                        # Gemini 3.8 Flash ToolLoopAgent + Multilingual AI Engine
│   └── 🔐 auth/                      # Role-Based Access Control (RBAC) & SSO context
│
├── 🖥️ frontend/                       # FRONTEND ARCHITECTURE & INDEX
│   └── index.ts                      # Evaluator map of pages and dashboards
│
├── 🎨 components/                     # MODULAR UI COMPONENT LIBRARY
│   ├── 🪄 ui/                        # Core Design System, 3D WebGL Companion & DarkVeil Shader
│   ├── 🔑 auth/                      # 3D SSO Login screen with 2FA
│   ├── 📊 finance/                   # Executive & Finance Officer Dashboards (12 modular tabs)
│   └── 🎓 student/                   # Student Self-Service Portal
│
├── 🌐 app/                           # NEXT.JS APP ROUTER & API ENDPOINTS
│   ├── api/chat/route.ts             # Vercel AI SDK route handler
│   ├── globals.css                   # Unified light & dark mode design tokens
│   └── page.tsx                      # Dynamic auth-gated view router
│
└── 📦 public/                        # ASSETS & 3D MODELS
    └── models/ai-companion.glb       # 3D Interactive AI Mascot model
```

---

## ✨ Key Feature Innovations

1. **🤖 3D Interactive Mascot Robot (`finBot`)**:
   - WebGL Three.js real-time rendering of `ai-companion.glb`.
   - **Gaze Tracking**: Dynamically tracks cursor movements across the viewport to look at the user.
   - **360° Orbit Drag**: Mouse and touch rotation with soft return to cursor tracking.
   - **Dynamic Role Bubbles**: Reacts with specialized context when role cards are hovered.

2. **🌌 React Bits `<DarkVeil />` WebGL Shader**:
   - Immersive fluid dark-matter shader powered by `ogl`.

3. **🗣️ Multilingual AI Financial Copilot (English & Hinglish)**:
   - Understands native Hindi/Hinglish queries (e.g., *"Mera kitna fees baki hai?"*, *"Scholarship adjust hui kya?"*).
   - Powered by deterministic ledger cross-referencing and Vercel AI SDK / Gemini.

4. **📑 Statutory Section 80C & Fee Clearance Generator**:
   - Generates and downloads official printable PDF statements compliant with Income Tax Section 80C.

5. **⚖️ Priority-Based Waterfall Partial Payment Engine**:
   - Automatically distributes partial installments across institutional heads: `Tuition → Exam → Library → Lab → Transport → Hostel`.

6. **🗃️ Hackathon Database Specification Compliance**:
   - Implements `07_admissions_finance.sql` table structures, foreign keys, transaction logs, and IndexedDB client storage.

7. **🌓 Universal Light / Dark Mode System**:
   - Integrated with `next-themes` and accessible toggle in both login and dashboard headers.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5.7
- **UI & Styling**: Tailwind CSS v4, Lucide Icons, Recharts
- **3D & Shaders**: Three.js, React Bits OGL WebGL Shader
- **AI & Reasoning**: Vercel AI SDK, Google Gemini 3.8 Flash
- **Form & Validation**: Zod, Class Variance Authority
