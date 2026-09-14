"use server";

import { getDatabase, isMongoConfigured } from "@/lib/mongodb";
import { deriveFeeAndScholarship as localDeriveFeeAndScholarship } from "@/backend/services/finance-service";
import { type AdmissionMode, feeStructures, scholarshipSlabs as localScholarshipSlabs } from "@/backend/database/finance-data";

/**
 * Pure logic function extracted to allow injecting slabs from MongoDB
 */
function deriveWithSlabs(
  programme: string,
  mode: AdmissionMode,
  slabs: any[],
  rankOrScore?: number | string,
  subQuotaOrCategory?: string
) {
  const activeRows = feeStructures.filter((f) => f.programme === programme && f.active);
  const routeRows = activeRows.filter((f) => f.route === mode || f.route.toLowerCase().includes(mode.toLowerCase()));
  const targetRows = routeRows.length > 0 ? routeRows : activeRows.length > 0 ? activeRows : feeStructures.filter((f) => f.programme === "B.Tech CSE" && f.active);

  const tuitionItem = targetRows.find((f) => f.head === "Tuition");
  const tuitionAmount = tuitionItem ? tuitionItem.amount : 90000;
  const grossFee = targetRows.reduce((sum, f) => sum + f.amount, 0);

  const modeSlabs = slabs.filter((s) => s.admissionMode === mode);

  let matchedSlab: any = modeSlabs[modeSlabs.length - 1] || {
    id: "default",
    admissionMode: mode,
    tierName: "Standard Admission",
    criteriaLabel: "General",
    waiverPercent: 0,
    description: "Standard tuition fee",
  };

  const rawStr = String(rankOrScore ?? "");
  const numMatch = rawStr.match(/([0-9]+(\.[0-9]+)?)/);
  const numVal = numMatch ? parseFloat(numMatch[1]) : undefined;
  const subStr = (subQuotaOrCategory ? subQuotaOrCategory + " " + rawStr : rawStr).toLowerCase();

  switch (mode) {
    case "JEE Mains": {
      const pct = numVal !== undefined ? numVal : 80;
      for (const slab of modeSlabs) {
        if (slab.minScore !== undefined && slab.maxScore !== undefined) {
          if (pct >= slab.minScore && pct <= slab.maxScore) {
            matchedSlab = slab;
            break;
          }
        }
      }
      break;
    }
    case "V-SAT":
    case "EAMCET": {
      const rank = numVal !== undefined ? numVal : 5000;
      for (const slab of modeSlabs) {
        if (slab.minScore !== undefined && slab.maxScore !== undefined) {
          if (rank >= slab.minScore && rank <= slab.maxScore) {
            matchedSlab = slab;
            break;
          }
        }
      }
      break;
    }
    case "Reserved/Lower Caste Category": {
      if (subStr.includes("bc-a") || subStr.includes("bc-b") || subStr.includes("bca") || subStr.includes("bcb") || subStr.includes("bc a") || subStr.includes("bc b")) {
        matchedSlab = modeSlabs.find((s) => s.id === "res-bc-ab") || modeSlabs[0];
      } else if (subStr.includes("bc-c") || subStr.includes("bc-d") || subStr.includes("bc-e") || subStr.includes("bcc") || subStr.includes("bcd") || subStr.includes("bce") || subStr.includes("backward")) {
        matchedSlab = modeSlabs.find((s) => s.id === "res-bc-cde") || modeSlabs[0];
      } else if (subStr.includes("ews") || subStr.includes("income") || subStr.includes("economically")) {
        matchedSlab = modeSlabs.find((s) => s.id === "res-ews") || modeSlabs[0];
      } else if (subStr.includes("sc") || subStr.includes("st") || subStr.includes("statutory") || subStr.includes("welfare")) {
        matchedSlab = modeSlabs.find((s) => s.id === "res-sc-st") || modeSlabs[0];
      } else {
        matchedSlab = modeSlabs.find((s) => s.id === "res-sc-st") || modeSlabs[0];
      }
      break;
    }
    case "Special State Status": {
      if (subStr.includes("ne") || subStr.includes("north") || subStr.includes("assam") || subStr.includes("meghalaya")) {
        matchedSlab = modeSlabs.find((s) => s.id === "spec-ne") || modeSlabs[0];
      } else if (subStr.includes("j&k") || subStr.includes("jk") || subStr.includes("kashmir") || subStr.includes("pmsss") || subStr.includes("ladakh")) {
        matchedSlab = modeSlabs.find((s) => s.id === "spec-jk") || modeSlabs[0];
      } else if (subStr.includes("island") || subStr.includes("andaman") || subStr.includes("lakshadweep")) {
        matchedSlab = modeSlabs.find((s) => s.id === "spec-island") || modeSlabs[0];
      } else {
        matchedSlab = modeSlabs.find((s) => s.id === "spec-jk") || modeSlabs[0];
      }
      break;
    }
    case "GATE / PGECET": {
      const score = numVal !== undefined ? numVal : 550;
      matchedSlab = score >= 650 ? modeSlabs[0] : modeSlabs[1] || modeSlabs[0];
      break;
    }
    case "ICET": {
      const rank = numVal !== undefined ? numVal : 1500;
      matchedSlab = rank <= 1000 ? modeSlabs[0] : modeSlabs[1] || modeSlabs[0];
      break;
    }
    case "Management":
    default: {
      matchedSlab = modeSlabs.find((s) => s.id === "mgmt-std") || matchedSlab;
      break;
    }
  }

  const slabPercent = matchedSlab.waiverPercent;
  const scholarshipAmount = Math.round((tuitionAmount * slabPercent) / 100);
  const netPayable = Math.max(0, grossFee - scholarshipAmount);
  const eligibilityRule = `${matchedSlab.tierName} (${matchedSlab.criteriaLabel}): ${slabPercent}% Tuition Waiver (${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(scholarshipAmount)})`;

  return {
    programme,
    admissionMode: mode,
    grossFee,
    tuitionAmount,
    otherHeadsAmount: grossFee - tuitionAmount,
    scholarshipAmount,
    slabPercent,
    matchedSlab,
    eligibilityRule,
    netPayable,
    heads: targetRows.map((f) => ({ head: f.head, amount: f.amount })),
  };
}

/**
 * Derives fee and scholarship async, reading slabs from MongoDB first.
 */
export async function deriveFeeAndScholarshipAction(
  programme: string,
  mode: AdmissionMode,
  rankOrScore?: number | string,
  subQuotaOrCategory?: string
) {
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        // Since scholarship_slabs might not be seeded, we can seed them on the fly if empty
        const count = await db.collection("scholarship_slabs").countDocuments();
        if (count === 0 && localScholarshipSlabs.length > 0) {
          await db.collection("scholarship_slabs").insertMany(localScholarshipSlabs.map(s => ({...s, _id: undefined})));
        }

        const slabsDocs = await db.collection("scholarship_slabs").find({}).toArray();
        if (slabsDocs.length > 0) {
          const sanitizedSlabs = slabsDocs.map(d => {
            const { _id, ...rest } = d;
            return rest;
          });
          return deriveWithSlabs(programme, mode, sanitizedSlabs, rankOrScore, subQuotaOrCategory);
        }
      }
    } catch (err) {
      console.warn("MongoDB read failed for scholarship slabs, falling back to local memory:", err);
    }
  }

  // Fallback
  return localDeriveFeeAndScholarship(programme, mode, rankOrScore, subQuotaOrCategory);
}

export async function getScholarshipSlabsAction() {
  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      if (db) {
        const count = await db.collection("scholarship_slabs").countDocuments();
        if (count === 0 && localScholarshipSlabs.length > 0) {
          await db.collection("scholarship_slabs").insertMany(localScholarshipSlabs.map(s => ({...s, _id: undefined})));
        }
        const slabsDocs = await db.collection("scholarship_slabs").find({}).toArray();
        if (slabsDocs.length > 0) {
          return slabsDocs.map(d => {
            const { _id, ...rest } = d;
            return rest;
          });
        }
      }
    } catch (err) {
      console.warn("MongoDB read failed for scholarship slabs:", err);
    }
  }
  return localScholarshipSlabs;
}
