import sys

path = "components/finance/admit-card-oversight-view.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix imports
content = content.replace(
    "import {\n  type CohortAdmitCardSummary,\n  type CohortAdmitCardSummary,",
    "import {\n  type CohortAdmitCardSummary,"
)

# Fix useEffects
use_effect_replace = """  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setTimeout(0) defers the heavy computation to after the first paint
    const id = setTimeout(() => {
      setCohortSummary(getAllStudentsAdmitCardStatus());
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Reload when exam permission status changes
  useEffect(() => {
    function reload() {
      setCohortSummary(getAllStudentsAdmitCardStatus());
    }
    window.addEventListener("feewise_exam_permission_updated", reload);
    return () => window.removeEventListener("feewise_exam_permission_updated", reload);
  }, []);"""

use_effect_new = """  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load live status initially
    getAdmitCardStatusAction().then(res => {
      setCohortSummary(res);
      setIsLoading(false);
    });
  }, []);

  // Reload when exam permission status changes
  useEffect(() => {
    function reload() {
      getAdmitCardStatusAction().then(setCohortSummary);
    }
    window.addEventListener("feewise_exam_permission_updated", reload);
    return () => window.removeEventListener("feewise_exam_permission_updated", reload);
  }, []);"""

content = content.replace(use_effect_replace, use_effect_new)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed admit cards TS errors")
