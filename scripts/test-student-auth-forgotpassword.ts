import {
  validateStudentCredentials,
  lookupStudentForPasswordReset,
  verifyStudentIdentityForReset,
  resetStudentPassword,
} from "../backend/database/student-credentials";

console.log("================================================================================");
console.log("TESTING INDIVIDUAL STUDENT AUTHENTICATION & FORGOT PASSWORD FLOW");
console.log("================================================================================");

// 1. Test authentic student logins across branches
console.log("\n[Test 1] Testing authentic student credential validation across departments:");
const aaradhyaCheck = validateStudentCredentials("251FA04645", "Aaradhya@14032004");
console.log(`  ✔ Aaradhya (251FA04645): Valid=${aaradhyaCheck.valid}, StudentID=${aaradhyaCheck.studentId}`);
if (!aaradhyaCheck.valid) throw new Error("Aaradhya login failed");

const kavitaCheck = validateStudentCredentials("251FA11001", "Kavita@12042005");
console.log(`  ✔ Kavita Reddy (251FA11001): Valid=${kavitaCheck.valid}, StudentID=${kavitaCheck.studentId}`);
if (!kavitaCheck.valid) throw new Error("Kavita login failed");

const vikramCheck = validateStudentCredentials("251FA12001", "Vikram@05062003");
console.log(`  ✔ Vikram Aditya (251FA12001): Valid=${vikramCheck.valid}, StudentID=${vikramCheck.studentId}`);
if (!vikramCheck.valid) throw new Error("Vikram login failed");

// 2. Test Invalid Password Rejection
console.log("\n[Test 2] Testing wrong password rejection:");
const badPass = validateStudentCredentials("251FA04645", "WrongPassword123");
console.log(`  ✔ Wrong password rejection: Valid=${badPass.valid}, Message="${badPass.message}"`);
if (badPass.valid) throw new Error("Wrong password should be rejected");

// 3. Test Student Lookup for Forgot Password
console.log("\n[Test 3] Testing student lookup for Forgot Password:");
const lookup1 = lookupStudentForPasswordReset("251FA04645");
console.log(`  ✔ Lookup 251FA04645: Found=${lookup1.found}, Name="${lookup1.studentName}", Email="${lookup1.maskedEmail}", DOB="${lookup1.dob}"`);
if (!lookup1.found || lookup1.studentId !== "251FA04645") throw new Error("Student lookup failed");

const lookupUnknown = lookupStudentForPasswordReset("999XX00000");
console.log(`  ✔ Lookup Unknown: Found=${lookupUnknown.found}, Message="${lookupUnknown.message}"`);
if (lookupUnknown.found) throw new Error("Unknown student should not be found");

// 4. Test Identity Verification (DOB & OTP)
console.log("\n[Test 4] Testing Identity Verification (DOB & 2FA OTP):");
const dobSuccess = verifyStudentIdentityForReset("251FA04645", "14/03/2004", "");
console.log(`  ✔ DOB verification success: Valid=${dobSuccess.valid}`);
if (!dobSuccess.valid) throw new Error("DOB verification should pass");

const otpSuccess = verifyStudentIdentityForReset("251FA04645", "", "842019");
console.log(`  ✔ OTP verification success (842019): Valid=${otpSuccess.valid}`);
if (!otpSuccess.valid) throw new Error("OTP verification should pass");

// 5. Test Password Reset & Subsequent Login with New Password
console.log("\n[Test 5] Testing Password Reset and Immediate Login with New Password:");
const newPass = "NewAaradhya@2027Secure";
const resetResult = resetStudentPassword("251FA04645", newPass);
console.log(`  ✔ Reset Password Result: Success=${resetResult.success}, Message="${resetResult.message}"`);
if (!resetResult.success) throw new Error("Password reset failed");

const newLoginCheck = validateStudentCredentials("251FA04645", newPass);
console.log(`  ✔ Sign In with NEW Password: Valid=${newLoginCheck.valid}, StudentID=${newLoginCheck.studentId}`);
if (!newLoginCheck.valid) throw new Error("Sign in with new password failed!");

console.log("\n================================================================================");
console.log("🎉 ALL STUDENT LOGIN & FORGOT PASSWORD WORKFLOW TESTS PASSED 100%!");
console.log("================================================================================\n");
