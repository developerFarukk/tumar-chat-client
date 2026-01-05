import z from "zod";

// Signup User Validation
export const signupValidationSchema = z.object({
  //   body: z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." }),
  number: z
    .string()
    .min(11, { message: "Number must be at least 11 characters long." })
    .max(15, { message: "Number cannot exceed 15 characters." })
    .optional(),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long." })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
  //   }),
});

// Login Validation Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),

  password: z
    .string()
    .min(4, { message: "Password is required (min 4 chars)" }),
});

// send message Validation Schema
export const sendMessageSchema = z.object({
  text: z.string().trim().optional(),
  image: z.any().optional(),
});
