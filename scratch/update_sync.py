import sys

path = "backend/actions/more-modules.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add a sync helper to the top
sync_helper = """
import { transactions as localTransactions } from "../database/finance-data";
import { getTransactionsAction } from "./payments";

async function syncMongoToLocal() {
  if (await isMongoConfigured()) {
    try {
      const liveTxns = await getTransactionsAction();
      if (liveTxns && liveTxns.length > 0) {
        localTransactions.length = 0;
        localTransactions.push(...liveTxns);
      }
    } catch (e) {
      console.warn("Failed to sync mongo to local transactions", e);
    }
  }
}
"""

content = content.replace(
    "import { dispatchFeeReminder } from \"../database/sql-store\";",
    "import { dispatchFeeReminder } from \"../database/sql-store\";\n" + sync_helper
)

# Apply syncMongoToLocal to getAdmitCardStatusAction
content = content.replace(
    "export async function getAdmitCardStatusAction() {\n  return getAllStudentsAdmitCardStatus();",
    "export async function getAdmitCardStatusAction() {\n  await syncMongoToLocal();\n  return getAllStudentsAdmitCardStatus();"
)

# Apply syncMongoToLocal to dispatchFeeReminderAction
content = content.replace(
    "  // First run local logic to build the reminder object",
    "  await syncMongoToLocal();\n  // First run local logic to build the reminder object"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Added syncMongoToLocal to more-modules.ts")
