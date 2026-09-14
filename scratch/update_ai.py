import sys

path = "backend/ai/ai-finance-engine.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "  deriveFeeAndScholarship,\n", 
    ""
)
content = content.replace(
    "  deriveFeeAndScholarship,\r\n", 
    ""
)

content = content.replace(
    '} from "../services/finance-service";',
    '} from "../services/finance-service";\nimport { deriveFeeAndScholarshipAction } from "../actions/scholarships";'
)

content = content.replace(
    "const derivation = deriveFeeAndScholarship(targetStudent.programme, mode, rank);",
    "const derivation = await deriveFeeAndScholarshipAction(targetStudent.programme, mode, rank);"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated ai-finance-engine.ts")
