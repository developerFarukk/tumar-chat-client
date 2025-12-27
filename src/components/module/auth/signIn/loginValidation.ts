import { z } from "zod";

// export const loginSchema = z.object({
//     email: z
//         .string({ required_error: "Email is required" })
//         .email("Invalid email address"),
//     password: z
//         .string({ required_error: "Password is required" })
//         .min(4, "Password must be at least 8 characters"),
// });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),

  password: z
    .string()
    .min(4, { message: "Password is required (min 4 chars)" }),
});
