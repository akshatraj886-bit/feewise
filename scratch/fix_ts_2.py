import sys

# 1. more-modules.ts fixes
path = "backend/actions/more-modules.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("const db = await getDatabase();", "const db = (await getDatabase())!;")
content = content.replace(
    "student_id: string;\n  bank_name: string;\n  document_type: LoanDocumentRequest[\"document_type\"];",
    "student_id: string;\n  student_name: string;\n  bank_name: string;\n  document_type: LoanDocumentRequest[\"document_type\"];"
)
content = content.replace(
    "student_id: data.student_id,\n    bank_name: data.bank_name,",
    "student_id: data.student_id,\n    student_name: data.student_name,\n    bank_name: data.bank_name,"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

# 2. organizer-views.tsx fixes
path = "components/finance/organizer-views.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "issueLoanDocument(reqId, \"VFSTR-\" + Math.floor(100000 + Math.random() * 900000));",
    "await issueLoanDocumentAction(reqId, \"VFSTR-\" + Math.floor(100000 + Math.random() * 900000));"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

# 3. student-portal.tsx fixes
path = "components/student/student-portal.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("import type { LoanDocumentRequest } from \"@/lib/sql-store\";", "")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed TS errors")
