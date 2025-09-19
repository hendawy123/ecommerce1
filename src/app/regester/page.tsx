"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RegisterFormSchema } from "@/schema/regester.schema"
import axios from "axios"
import { toast } from "sonner"

// ✅ Validation Schema
const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  rePassword: z.string().nonempty("Confirm password is required"),
  phone: z.string().regex(/^01[0-2,5][0-9]{8}$/, { 
    message: "Phone number must be a valid Egyptian number (11 digits, starts with 010/011/012/015)" 
  }),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
})

export default function Regester() {
  const router = useRouter()

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues:{
      name: "", 
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    }
  })
  
  async function handleRegister(values: RegisterFormSchema) {
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)

      if (res.data.message === "success") {
        toast.success("Registered successfully 🎉")
        router.push("/login")   // ✅ بعد التسجيل روح لصفحة اللوجين
      } else {
        toast.error(res.data.message || "Something went wrong")
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.response?.data?.message || "Server error ❌")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
          
          {/* Full Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Re-enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Form>
    </div>
  )
}
