import sys

# Fix views.tsx
path_views = "components/finance/views.tsx"
with open(path_views, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("React.useEffect(", "useEffect(")
with open(path_views, "w", encoding="utf-8") as f:
    f.write(content)


# Fix test-tiered-slabs.ts
path_tests = "scripts/test-tiered-slabs.ts"
with open(path_tests, "r", encoding="utf-8") as f:
    content = f.read()

# We need to wrap everything after line 85 and before `async function runTests()` into `async function runTests() {`
# The file currently has:
# let passed = 0;
# let failed = 0;
# ... test definitions
# const vsatT1 = await deriveFeeAndScholarshipAction...

# The easiest way to fix top-level await is to just wrap it.
lines = content.split('\n')
out_lines = []
in_main = False
for line in lines:
    if line.startswith('let passed = 0;'):
        out_lines.append('async function runTests() {')
        out_lines.append(line)
        in_main = True
    elif line.startswith('async function runTests() {'):
        # We already added the wrapper, so skip this line
        in_main = False
    elif line.startswith('  await runAiTests();'):
        out_lines.append(line)
        out_lines.append('}') # Close runTests
    else:
        out_lines.append(line)

content = "\n".join(out_lines)

with open(path_tests, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed TS errors")
