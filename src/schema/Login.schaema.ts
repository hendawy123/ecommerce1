import * as z from "zod"

export const LoginSchema = z.object({

  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Password must be at least 6 characters long" }),
})


export type LoginFormSchema = z.infer<typeof LoginSchema>