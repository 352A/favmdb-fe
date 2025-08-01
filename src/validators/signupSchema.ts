import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name is too short"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmation: z.string(),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords do not match",
    path: ["confirmation"],
  });

export type SignupData = z.infer<typeof signupSchema>;
