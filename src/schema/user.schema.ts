import { TypeOf, z } from "zod";

export const CreateUserSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email"),

      password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password should be atleast 6 characters long"),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = TypeOf<typeof CreateUserSchema>;
