import * as z from "zod"

export const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .min(4, { message: "Reset code must be at least 4 characters" })
    .max(6, { message: "Reset code must not exceed 6 characters" })
    .regex(/^\d+$/, { message: "Reset code must contain only numbers" }),
})

export type VerifyCodeFormSchema = z.infer<typeof verifyCodeSchema>
