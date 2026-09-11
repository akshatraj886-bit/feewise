/**
 * Partial payment allocation logic.
 * When a payment amount is less than total outstanding, it is distributed
 * across fee heads in a defined institutional priority order.
 *
 * Priority (highest → lowest):
 *   1. Tuition
 *   2. Examination
 *   3. Library
 *   4. Laboratory
 *   5. Transport
 *   6. Hostel
 */

export const PAYMENT_PRIORITY: string[] = [
  "Tuition",
  "Examination",
  "Library",
  "Laboratory",
  "Transport",
  "Hostel",
];

export type FeeHeadInput = {
  head: string;
  demand: number;
  paid: number;
  outstanding: number;
};

export type AllocationLine = {
  head: string;
  outstanding: number;
  /** Amount this payment will cover for this head */
  allocated: number;
  /** Remaining after this payment */
  remaining: number;
  /** Was this head fully cleared by this payment? */
  cleared: boolean;
};

export type AllocationResult = {
  lines: AllocationLine[];
  /** Total actually allocated (may be < paymentAmount if over-payment) */
  totalAllocated: number;
  /** Amount that exceeded total outstanding (i.e. advance / credit) */
  advance: number;
  fullySettled: boolean;
};

/**
 * Allocate a partial (or full) payment across fee heads in priority order.
 */
export function allocatePayment(
  fees: FeeHeadInput[],
  paymentAmount: number,
): AllocationResult {
  // Sort by priority, unknowns go last alphabetically
  const priorityIndex = (head: string) => {
    const idx = PAYMENT_PRIORITY.indexOf(head);
    return idx === -1 ? PAYMENT_PRIORITY.length + head.charCodeAt(0) : idx;
  };

  const sorted = [...fees].sort(
    (a, b) => priorityIndex(a.head) - priorityIndex(b.head),
  );

  let remaining = paymentAmount;
  const lines: AllocationLine[] = [];

  for (const fee of sorted) {
    if (fee.outstanding <= 0) continue;
    const canAllocate = Math.min(remaining, fee.outstanding);
    lines.push({
      head: fee.head,
      outstanding: fee.outstanding,
      allocated: canAllocate,
      remaining: fee.outstanding - canAllocate,
      cleared: canAllocate >= fee.outstanding,
    });
    remaining -= canAllocate;
    if (remaining <= 0) break;
  }

  // Heads not touched (no outstanding or allocation exhausted)
  for (const fee of sorted) {
    if (fee.outstanding <= 0) continue;
    if (!lines.find((l) => l.head === fee.head)) {
      lines.push({
        head: fee.head,
        outstanding: fee.outstanding,
        allocated: 0,
        remaining: fee.outstanding,
        cleared: false,
      });
    }
  }

  const totalOutstanding = fees.reduce((s, f) => s + f.outstanding, 0);
  const totalAllocated = paymentAmount - Math.max(0, remaining);
  const advance = Math.max(0, paymentAmount - totalOutstanding);

  return {
    lines,
    totalAllocated,
    advance,
    fullySettled: totalOutstanding <= paymentAmount,
  };
}
