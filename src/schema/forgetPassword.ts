import * as z from "zod"

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
})

export type ForgetPasswordFormSchema = z.infer<typeof forgetPasswordSchema>