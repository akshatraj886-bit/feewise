import sys

path = "components/student/student-portal.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix imports
content = content.replace(
    "  getSqlDatabaseState,\n  requestLoanDocument,\n  type ExamPermissionRequest,",
    "  getSqlDatabaseState,\n  type ExamPermissionRequest,"
)
content = content.replace(
    "import { recordPaymentAction, getStudentPaidAmountsAction } from \"@/backend/actions/payments\";",
    "import { recordPaymentAction, getStudentPaidAmountsAction } from \"@/backend/actions/payments\";\nimport { getLoanRequestsAction, requestLoanDocumentAction } from \"@/backend/actions/more-modules\";\nimport type { LoanDocumentRequest } from \"@/lib/sql-store\";"
)

# Fix LoanTab
loan_tab_find = """  const [bankName, setBankName] = useState("State Bank of India (SBI)");
  const [docType, setDocType] = useState<LoanDocumentType>("BONAFIDE");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const state = getSqlDatabaseState();
  const myRequests = state.loan_requests.filter(
    (r) => r.student_id === student.id
  );"""

loan_tab_replace = """  const [bankName, setBankName] = useState("State Bank of India (SBI)");
  const [docType, setDocType] = useState<LoanDocumentType>("BONAFIDE");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myRequests, setMyRequests] = useState<LoanDocumentRequest[]>([]);
  const [loadingReqs, setLoadingReqs] = useState(true);

  async function loadRequests() {
    setLoadingReqs(true);
    const reqs = await getLoanRequestsAction();
    setMyRequests(reqs.filter((r) => r.student_id === student.id));
    setLoadingReqs(false);
  }

  useEffect(() => {
    loadRequests();
  }, [student.id]);"""

content = content.replace(loan_tab_find, loan_tab_replace)

loan_tab_submit_find = """    setIsSubmitting(true);
    setTimeout(() => {
      requestLoanDocument({
        student_id: student.id,
        student_name: student.name,
        bank_name: bankName,
        document_type: docType,
      });
      setIsSubmitting(false);"""

loan_tab_submit_replace = """    setIsSubmitting(true);
    requestLoanDocumentAction({
      student_id: student.id,
      bank_name: bankName,
      document_type: docType,
    }).then(() => {
      loadRequests();
      setIsSubmitting(false);"""

content = content.replace(loan_tab_submit_find, loan_tab_submit_replace)
content = content.replace(
    "      onRequested();\n    }, 400);",
    "      onRequested();\n    });"
)

# Fix unused sqlState
content = content.replace(
    "  const sqlState = getSqlDatabaseState();",
    "  // const sqlState = getSqlDatabaseState();"
)


with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated student-portal.tsx")
