import { z } from "zod";

export const entrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  director: z.string().min(1, "Director is required"),
  budget: z.number().min(0, "Budget must be a positive number"),
  budgetAmount: z
    .number()
    .min(0, "Budget amount must be a positive number")
    .max(999),
  budgetUnit: z.enum(["K", "M"]),
  location: z.string().min(1, "Location is required"),
  durationHours: z.number().optional(),
  durationMinutes: z.number().optional(),
  seasons: z.number().optional(),
  year: z
    .number()
    .int("Year must be an integer")
    .min(1800, "Year must be valid")
    .max(new Date().getFullYear() + 5, "Year is too far in the future"),
  details: z.string().min(1, "Details are required"),
  userId: z.number().optional(),
});
