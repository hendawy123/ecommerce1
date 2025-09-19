import * as z from "zod"

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),

  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Password must be at least 6 characters long" }),

  rePassword: z
    .string()
    .nonempty("Confirm password is required"),

  phone: z
    .string()
    .regex(/^01[0-2,5][0-9]{8}$/, { 
      message: "Phone number must be a valid Egyptian number (11 digits, starts with 010/011/012/015)" 
    }),
}).refine((object) => object.password === object.rePassword, {
    path:["rePassword"] , error: "Passwords do not match",
})


export type RegisterFormSchema = z.infer<typeof registerSchema>