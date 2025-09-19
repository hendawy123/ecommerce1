import * as z from "zod";

export const checkoutSchema = z.object({
  details: z
    .string()
    .min(5, { message: "Details must be at least 5 characters long" })
    .max(200, { message: "Details must not exceed 200 characters" }),

  phone: z
    .string()
    .regex(/^01[0-9]{9}$/, { message: "Invalid Egyptian phone number" })
    .nonempty("Phone number is required"),

  city: z
    .string()
    .nonempty("City is required")
    .min(2, { message: "City must be at least 2 characters long" }),
});

export type CheckoutFormSchema = z.infer<typeof checkoutSchema>;
