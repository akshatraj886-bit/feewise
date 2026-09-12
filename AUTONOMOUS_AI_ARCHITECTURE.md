# finDeck Autonomous AI Finance Agent Architecture

**finDeck — Autonomous University Fee & Finance Command Center**
*Vignan's Foundation for Science, Technology & Research (VFSTR Deemed to be University), Andhra Pradesh*

---

## 1. Architectural Overview

The finDeck Autonomous AI Agent functions as an intelligent **Application Operator and Autonomous Financial Copilot**. Rather than being a disconnected chatbot, it seamlessly connects to the existing React 19 / Next.js 16 UI and the authoritative finance database layer to perform real-time data lookups, smart entity resolution, role-based access control (RBAC), and automated frontend navigation.

```
+-------------------------------------------------------------------------------+
|                             USER REQUEST (Text / Voice)                       |
|                       English • हिन्दी (Hindi) • Hinglish                      |
+-------------------------------------------------------------------------------+
                                      │
                                      ▼
+───────────────────────────────────────────────────────────────────────────────+
|                           finDeck AI Reasoning Engine                         |
|     (ToolLoopAgent with Gemini 1.5 Flash + Deterministic Autonomous Engine)   |
|                                                                               |
|   • Multilingual Understanding (English, Hindi, Hinglish)                     |
|   • Intent Classification: [Information Intent vs Navigation Intent]          |
|   • Smart Entity Resolution (Students: Name/ID Disambiguation, Txn IDs)       |
|   • Role-Based Access Control (RBAC: Admin | Finance Officer | Student)       |
|   • Strict Financial Safety Guardrails (Read-Only Safety Enforcement)         |
+───────────────────────────────────────────────────────────────────────────────+
                 │                                              │
                 ▼                                              ▼
+───────────────────────────────────+          +────────────────────────────────+
|        Tool: `readFinance`        |          |      Tool: `navigateApp`       |
|  Retrieves authoritative data:    |          |   Returns structured payload:  |
|  • summary, students, dues        |          |   { view, studentId, txnId }   |
|  • feeStructure, feeHeads, ageing |          +────────────────────────────────+
|  • instalments, smartReminders    |                           │
|  • scholarshipRisks, loanRequests |                           ▼
|  • reconciliation, refunds, etc.  |          +────────────────────────────────+
+───────────────────────────────────+          |       Frontend Execution       |
                 │                             |  • Switches Dashboard View     |
                 │                             |  • Opens StudentDrawer         |
                 │                             |  • Opens TransactionDialog     |
                 │                             |  • Logs to University Audit Log|
                 │                             +────────────────────────────────+
                 ▼                                              │
+───────────────────────────────────────────────────────────────────────────────+
|                              UNIFIED USER RESPONSE                            |
|             Natural Language Answer + Live Navigation Feedback Badge           |
+───────────────────────────────────────────────────────────────────────────────+
```

---

## 2. Available AI Tools

### A. `readFinance`
* **Purpose**: Authoritative, read-only data extraction across all major university financial sections.
* **Input Schema (Zod)**:
  ```typescript
  {
    topic: z.enum([
      "summary",
      "students",
      "studentProfile",
      "dues",
      "overdue",
      "hostel",
      "payments",
      "transactions",
      "reconciliation",
      "fees",
      "feeStructure",
      "fee_structure",
      "instalments",
      "smartReminders",
      "reminders",
      "scholarshipRisks",
      "scholarships",
      "loanRequests",
      "loans",
      "refunds",
      "refund",
      "reports",
      "feeHeads",
      "ageing",
      "waterfall"
    ]),
    query?: string // Optional student ID, name, transaction ID, or search keyword
  }
  ```
* **Supported Topics & Data Returned**:
  1. `summary`: Institutional treasury snapshot (Demand: ₹485.60 L, Collected: ₹412.40 L, Outstanding: ₹73.20 L, Reconciliation: 99.2%).
  2. `students` / `studentProfile` / `dues` / `overdue` / `hostel`: Individual/batch student ledger accounts, fee heads, payments, overdue days.
  3. `payments` / `transactions`: Transaction receipts, payment gateway vs ledger reconciliation status, and payment modes.
  4. `reconciliation`: Gateway vs ledger reconciliation rates, settled transactions, and variance cases (e.g. TXN-10483 mismatch).
  5. `fees` / `feeStructure`: Official approved 4-year fee schedules across B.Tech, MBA, M.Tech, and Pharmacy programs.
  6. `instalments`: Split-payment plans (2-tranche & 3-tranche) and milestone schedules.
  7. `smartReminders` / `reminders`: Policy-governed reminder suppression rules (active loans, medical emergencies, recent payments) and dispatch records.
  8. `scholarshipRisks` / `scholarships`: Academic early-warning tracker monitoring students at risk of losing scholarships based on CGPA (< 7.50) and Attendance (< 75%).
  9. `loanRequests` / `loans`: Bank education loan documents (SBI, Canara, HDFC) and verification codes.
  10. `refunds` / `refund`: UGC/AICTE policy WD-2026 refund retention recommendations.
  11. `reports`: Institutional treasury analytics, fee head breakdowns, aging analysis, and SQL schema.
  12. `feeHeads`: Core university fee head distribution (Tuition, Hostel, Transport, Examination, Lab, Library, Caution Deposit).
  13. `ageing`: Overdue aging distribution (<30d, 31-60d, 61-90d, >90d).
  14. `waterfall`: Priority order of partial payment allocation (Tuition > Exam > Lab > Library > Transport > Hostel).

### B. `navigateApp`
* **Purpose**: Dispatches structured navigation commands to the client-side dashboard to switch views or open records.
* **Input Schema (Zod)**:
  ```typescript
  {
    view: z.enum([
      "Dashboard",
      "Students",
      "Fee Structure",
      "Payments",
      "Reconciliation",
      "Instalments",
      "Smart Reminders",
      "Scholarship Risks",
      "Loan Requests",
      "Refunds",
      "Reports"
    ]),
    studentId?: string,     // e.g. "251FA04E03" (Akshat Raj)
    transactionId?: string, // e.g. "TXN-10483"
    searchQuery?: string,
    reason?: string
  }
  ```

---

## 3. Intent Classification Rules

The agent clearly distinguishes user intent:

1. **Information Intent (`readFinance`)**:
   - The user is asking for data, numbers, calculations, rules, or status.
   - Examples: *"mera dues dikhao"*, *"fee structure kya hai?"*, *"reconciliation status batao"*, *"pending instalments batao"*, *"scholarship risk wale students kaun hain?"*, *"pending loan requests batao"*.
   - **Action:** Calls `readFinance` and provides an authoritative response **WITHOUT** triggering navigation.

2. **Navigation Intent (`navigateApp`)**:
   - The user explicitly or implicitly asks to go to, open, show, or display a screen/section.
   - **Explicit Navigation:** *"fee structure pe le chalo"*, *"students section kholo"*, *"reports open karo"*, *"Akshat Raj ka account kholo"*.
   - **Implied Navigation:** *"fee structure kaha hai"*, *"fee structure dikhao"*, *"reconciliation dikha do"*, *"students section mein le chalo"*.
   - **Action:** Calls `navigateApp` with the target view/entity.

3. **Combined Intent (`readFinance` + `navigateApp`)**:
   - The user asks for information AND requests the screen/account to be opened.
   - Example: *"Akshat Raj ka dues check karo aur uska account kholo"*.
   - **Action:** Uses `readFinance` to calculate dues AND calls `navigateApp` to open Students view focused on Akshat Raj (`251FA04E03`).

4. **Ambiguity Handling**:
   - If the request matches multiple students (e.g. *"Rahul ka account kholo"*), the agent stops blind navigation and asks the user to provide the exact Student ID.

---

## 4. Financial Safety Guardrails & Navigation Security

* **Read-Only Safety**: Navigation is a safe, read-only UI action. It does NOT authorize, pay, transfer, refund, or modify financial records.
* **Dangerous Request Handling**:
  - If a user sends a combined dangerous request such as:
    ```text
    "refund page kholo aur refund approve kar do"
    ```
  - The agent **navigates to Refunds** (`navigateApp({ view: "Refunds" })`) so the user can review the screen, **BUT explicitly denies the write/approval action**, explaining that financial mutations require human Finance Officer authorization and 2FA.
* **No Write Tools**: No financial write or mutation tools exist on the agent.
* **RBAC Non-Bypass**: Navigation does not bypass role-based access control. Student logins cannot view administrative views or peer records.

---

## 5. University Audit Trail Logging

Every autonomous navigation event is recorded in the institutional audit log via the existing `log()` mechanism in `components/finance/dashboard.tsx`:

```typescript
log("AI Agent Navigated", `${nav.view} · Student ${nav.studentId || "N/A"}`);
```

Logs are visible in the Audit Log tab and exported reports.

---

## 6. Multilingual Verification (Hinglish & English)

| # | Test Query | Expected Tool & Behavior |
|---|---|---|
| 1 | *"mera dues dikhao"* | `readFinance` (Student dues) · NO navigation |
| 2 | *"fee structure kaha hai"* | `navigateApp` → "Fee Structure" |
| 3 | *"students section mein le chalo"* | `navigateApp` → "Students" |
| 4 | *"reconciliation dikha do"* | `navigateApp` → "Reconciliation" |
| 5 | *"Akshat Raj ka account kholo"* | `navigateApp` → "Students" (studentId: `251FA04E03`) |
| 6 | *"fee structure kya hai?"* | `readFinance(topic="feeStructure")` · NO navigation |
| 7 | *"pending instalments batao"* | `readFinance(topic="instalments")` · NO navigation |
| 8 | *"scholarship risk wale students kaun hain?"* | `readFinance(topic="scholarshipRisks")` · NO navigation |
| 9 | *"pending loan requests batao"* | `readFinance(topic="loanRequests")` · NO navigation |
| 10 | *"Akshat Raj ka dues check karo aur uska account kholo"* | `readFinance` + `navigateApp` (Both executed) |
| 11 | *"refund page kholo aur refund approve kar do"* | `navigateApp` → "Refunds" + Guardrail write denial alert |
| 12 | *"show my dues"* | `readFinance` · NO navigation |
| 13 | *"where is the fee structure"* | `navigateApp` → "Fee Structure" |
| 14 | *"take me to students"* | `navigateApp` → "Students" |
| 15 | *"show reconciliation"* | `navigateApp` → "Reconciliation" |
| 16 | *"open Akshat Raj's account"* | `navigateApp` → "Students" (studentId: `251FA04E03`) |
| 17 | *"show pending instalments"* | `readFinance(topic="instalments")` · NO navigation |
| 18 | *"show scholarship risks"* | `readFinance(topic="scholarshipRisks")` · NO navigation |
| 19 | *"show pending loan requests"* | `readFinance(topic="loanRequests")` · NO navigation |
