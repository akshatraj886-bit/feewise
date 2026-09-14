import sys

path = "components/finance/operations.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace imports
content = content.replace(
    "import {\n  getSqlDatabaseState,\n  updateRefundStatus,\n  type RefundRecord,\n} from \"@/lib/sql-store\";",
    "import {\n  type RefundRecord,\n} from \"@/lib/sql-store\";\nimport { getRefundsAction, updateRefundStatusAction } from \"@/backend/actions/more-modules\";"
)

# Fix loading state
content = content.replace(
    "  const [refunds, setRefunds] = useState<RefundRecord[]>([]);",
    "  const [refunds, setRefunds] = useState<RefundRecord[]>([]);\n  const [loading, setLoading] = useState(true);"
)

content = content.replace(
    "  function reload() {\n    setRefunds(getSqlDatabaseState().refunds);\n  }",
    "  async function reload() {\n    setLoading(true);\n    setRefunds(await getRefundsAction());\n    setLoading(false);\n  }"
)

# Remove window event listener (sync no longer strictly applicable in same way, but let's keep it harmless)
content = content.replace(
    "  useEffect(() => {\n    reload();\n    window.addEventListener(\"feewise_sql_store_updated\", reload);\n    return () => window.removeEventListener(\"feewise_sql_store_updated\", reload);\n  }, []);",
    "  useEffect(() => {\n    reload();\n    // window.addEventListener(\"feewise_sql_store_updated\", reload);\n    // return () => window.removeEventListener(\"feewise_sql_store_updated\", reload);\n  }, []);"
)

# Async handleAction
content = content.replace(
    "  function handleAction(action: \"approve\" | \"reject\" | \"review\") {",
    "  async function handleAction(action: \"approve\" | \"reject\" | \"review\") {"
)

content = content.replace(
    "      updateRefundStatus(activeRefund.refund_id, \"APPROVED\");",
    "      await updateRefundStatusAction(activeRefund.refund_id, \"APPROVED\");"
)
content = content.replace(
    "      updateRefundStatus(activeRefund.refund_id, \"REJECTED\");",
    "      await updateRefundStatusAction(activeRefund.refund_id, \"REJECTED\");"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated operations.tsx")
