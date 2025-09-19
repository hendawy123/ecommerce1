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
import { toast } from "sonner"
import { LoginFormSchema } from "@/schema/Login.schaema"
import { signIn } from "next-auth/react"
import Link from "next/link"

// ✅ Validation Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

export default function Login() {
  const router = useRouter()

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function handleLogin(values: LoginFormSchema) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/", // بيرجع للهوم بعد اللوجين
    })

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success("Logged in successfully 🎉")
      window.location.href = "/"
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Login now</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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

          {/* Submit Button */}
          <Button type="submit" className="w-full">Login now</Button>

          {/* Forget Password Link */}
          <div className="text-center mt-4">
          <Link
  href="/forgetPassword"
  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
>
  Forgot Password?
</Link>

          </div>
        </form>
      </Form>
    </div>
  )
}
