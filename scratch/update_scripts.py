import sys

paths = [
    "scripts/test-tiered-slabs.ts",
    "scripts/test-step1-admissions.ts",
    "scripts/deep-audit.ts"
]

for path in paths:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace import
    content = content.replace(
        "deriveFeeAndScholarship,",
        ""
    )
    content = content.replace(
        "import { deriveFeeAndScholarship, readFinance, getUnifiedStudentContext } from \"../backend/services/finance-service\";",
        "import { readFinance, getUnifiedStudentContext } from \"../backend/services/finance-service\";\nimport { deriveFeeAndScholarshipAction } from \"../backend/actions/scholarships\";"
    )
    content = content.replace(
        "import { getStudentExamEligibility, deriveFeeAndScholarship } from \"../backend/services/finance-service\";",
        "import { getStudentExamEligibility } from \"../backend/services/finance-service\";\nimport { deriveFeeAndScholarshipAction } from \"../backend/actions/scholarships\";"
    )
    if "deriveFeeAndScholarshipAction" not in content and "deriveFeeAndScholarship" in content:
        content = 'import { deriveFeeAndScholarshipAction } from "../backend/actions/scholarships";\n' + content

    # Replace usages
    content = content.replace("deriveFeeAndScholarship(", "await deriveFeeAndScholarshipAction(")

    # In test-tiered-slabs.ts the main body needs to be inside an async function
    if "test-tiered-slabs.ts" in path:
        if "async function run()" not in content:
            # We need to wrap it in an async IIFE
            content = content.replace("console.log(\"\\n=======================================================\");", "async function run() {\nconsole.log(\"\\n=======================================================\");")
            content += "\n}\nrun().catch(console.error);"

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
print("Updated scripts")
