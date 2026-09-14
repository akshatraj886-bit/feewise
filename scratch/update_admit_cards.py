import sys

path = "backend/actions/more-modules.ts"
with open(path, "a", encoding="utf-8") as f:
    f.write("\n// ==========================================\n")
    f.write("// 5. OVERSIGHT & ADMIT CARDS\n")
    f.write("// ==========================================\n")
    f.write("import { getAllStudentsAdmitCardStatus } from \"../services/finance-service\";\n")
    f.write("export async function getAdmitCardStatusAction() {\n")
    f.write("  return getAllStudentsAdmitCardStatus();\n")
    f.write("}\n")

path2 = "components/finance/admit-card-oversight-view.tsx"
with open(path2, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "import {\n  getAllStudentsAdmitCardStatus,",
    "import {\n  type CohortAdmitCardSummary,"
)
content = content.replace(
    "import { inr, type Student } from \"@/lib/finance-data\";",
    "import { inr, type Student } from \"@/lib/finance-data\";\nimport { getAdmitCardStatusAction } from \"@/backend/actions/more-modules\";"
)

content = content.replace(
    "const [cohortSummary, setCohortSummary] = useState<CohortAdmitCardSummary | null>(null);",
    "const [cohortSummary, setCohortSummary] = useState<CohortAdmitCardSummary | null>(null);\n  const [loading, setLoading] = useState(true);"
)

content = content.replace(
    "  useEffect(() => {\n    // Load live status initially\n    setCohortSummary(getAllStudentsAdmitCardStatus());\n\n    // Optional: listen for global store updates to auto-refresh\n    const handleUpdate = () => {\n      setCohortSummary(getAllStudentsAdmitCardStatus());\n    };\n    window.addEventListener(\"feewise_sql_store_updated\", handleUpdate);\n    return () => window.removeEventListener(\"feewise_sql_store_updated\", handleUpdate);\n  }, []);",
    "  useEffect(() => {\n    // Load live status initially\n    getAdmitCardStatusAction().then(res => {\n      setCohortSummary(res);\n      setLoading(false);\n    });\n  }, []);"
)

with open(path2, "w", encoding="utf-8") as f:
    f.write(content)

print("Appended and updated admit card")
