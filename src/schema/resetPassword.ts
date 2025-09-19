import * as z from "zod"

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" 
    }),

  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>
