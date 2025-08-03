export type BudgetUnit = "K" | "M";

/**
 * Converts raw budget number into amount + unit
 * @example 2_500_000 → { budgetAmount: 2.5, budgetUnit: "M" }
 */

export function decomposeBudget(budget: number): {
  budgetAmount: number;
  budgetUnit: BudgetUnit;
} {
  if (budget >= 1_000_000) {
    return { budgetAmount: budget / 1_000_000, budgetUnit: "M" };
  } else {
    return { budgetAmount: budget / 1_000, budgetUnit: "K" };
  }
}

/**
 * Recombines amount + unit into full numeric budget
 * @example (2.5, "M") → 2_500_000
 */
export function composeBudget(
  budgetAmount: number,
  budgetUnit: BudgetUnit,
): number {
  switch (budgetUnit) {
    case "M":
      return Math.round(budgetAmount * 1_000_000);
    case "K":
    default:
      return Math.round(budgetAmount * 1_000);
  }
}
