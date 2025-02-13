import { z } from "zod";

export const CreateSessionSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password should be atleast 6 characters long"),
  }),
});
