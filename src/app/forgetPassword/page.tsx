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
import { ForgetPasswordFormSchema, forgetPasswordSchema } from "@/schema/forgetPassword"
import forgetPassword from "@/api/passwordActionsForget/forgetPassword"
import Link from "next/link"


export default function ForgetPasswordPage() {
  const router = useRouter()

  const form = useForm<ForgetPasswordFormSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function handleForgetpassword(values: ForgetPasswordFormSchema) {
    try {
      const res = await forgetPassword(values.email)
      console.log("Forget password response:", res) // للتشخيص
      
      // تحقق من عدة حالات للنجاح
      if (res.status === "success" || res.message?.includes("reset code sent") || res.message?.includes("sent")) {
        toast.success("Password reset email sent successfully! Check your email.")
        router.push(`/getCode?email=${encodeURIComponent(values.email)}`)
      } else {
        // حتى لو لم يكن status success، إذا وصل الكود للجيميل، توجه للصفحة التالية
        if (res.message?.toLowerCase().includes("email") || res.message?.toLowerCase().includes("sent")) {
          toast.success("Check your email for the reset code!")
          router.push(`/getCode?email=${encodeURIComponent(values.email)}`)
        } else {
          toast.error(res.message || "Failed to send reset email")
        }
      }
    } catch (error) {
      console.error("Forget password error:", error)
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgetpassword)} className="space-y-4">
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


          <Button type="submit" className="w-full">Send Reset Email</Button>

          {/* Manual navigation to code page */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 mb-2">
              Already received the code?
            </p>
            <Link
              href="/getCode"
              className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Enter Reset Code
            </Link>
          </div>

          {/* Back to Login Link */}
          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
