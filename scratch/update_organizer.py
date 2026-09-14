import sys

path = "components/finance/organizer-views.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace imports
content = content.replace(
    "  getSqlDatabaseState,\n  dispatchFeeReminder,\n  issueLoanDocument,",
    "  getSqlDatabaseState,\n  downloadSqlFile,\n  resetSqlDatabase,\n  type ReminderDispatch,\n  type ScholarshipRenewalRisk,\n  type LoanDocumentRequest,\n  type SqlDatabaseState,\n} from \"@/lib/sql-store\";\nimport { getSmartRemindersAction, dispatchFeeReminderAction, getScholarshipRisksAction, getLoanRequestsAction, issueLoanDocumentAction } from \"@/backend/actions/more-modules\";\n//"
)

# Fix loading and setReminders in SmartRemindersView
content = content.replace(
    "  function reload() {\n    setReminders(getSqlDatabaseState().reminder_dispatches);\n  }",
    "  async function reload() {\n    setReminders(await getSmartRemindersAction());\n  }"
)
content = content.replace(
    "  async function handleDispatch() {",
    "  async function handleDispatch() {"
)
content = content.replace(
    "    const res = dispatchFeeReminder(selectedStudentId);",
    "    const res = await dispatchFeeReminderAction(selectedStudentId);"
)

# Fix loading and setRisks in ScholarshipRisksView
content = content.replace(
    "  function reload() {\n    setRisks(getSqlDatabaseState().scholarship_risks);\n  }",
    "  async function reload() {\n    setRisks(await getScholarshipRisksAction());\n  }"
)

# Fix loading and setRequests in BankLoanDeskView
content = content.replace(
    "  function reload() {\n    setRequests(getSqlDatabaseState().loan_requests);\n  }",
    "  async function reload() {\n    setRequests(await getLoanRequestsAction());\n  }"
)
content = content.replace(
    "  function handleIssue(reqId: string) {",
    "  async function handleIssue(reqId: string) {"
)
content = content.replace(
    "    issueLoanDocument(reqId, \"VFSTR-\" + Math.floor(100000 + Math.random() * 900000));",
    "    await issueLoanDocumentAction(reqId, \"VFSTR-\" + Math.floor(100000 + Math.random() * 900000));"
)

# Fix ReportsView
# It just uses getSqlDatabaseState() for full dump, which we can keep as synchronous local state (as a mock/fallback for the report). 
# However, for consistency, the user just asked for Loan, Reminder, Refund to be migrated. We'll leave ReportsView as-is for now, or update it later if asked.

# Remove window event listener (sync no longer strictly applicable in same way, but let's keep it harmless)
content = content.replace(
    "    window.addEventListener(\"feewise_sql_store_updated\", reload);",
    "    // window.addEventListener(\"feewise_sql_store_updated\", reload);"
)
content = content.replace(
    "    return () => window.removeEventListener(\"feewise_sql_store_updated\", reload);",
    "    // return () => window.removeEventListener(\"feewise_sql_store_updated\", reload);"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated organizer-views.tsx")
