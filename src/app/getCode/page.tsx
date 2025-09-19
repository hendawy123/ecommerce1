"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
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
import { VerifyCodeFormSchema, verifyCodeSchema } from "@/schema/verifyCode"
import verifyResetCode from "@/api/passwordActionsForget/getcodeForgetPassowrd"
import Link from "next/link"

export default function VerifyCodePage() {
  const router = useRouter()
  // تغليف استخدام useSearchParams بـ Suspense
  const [email, setEmail] = React.useState<string | null>(null)
  const SearchParamsComponent = () => {
    const searchParams = useSearchParams()
    React.useEffect(() => {
      setEmail(searchParams.get('email'))
    }, [searchParams])
    return null
  }

  const form = useForm<VerifyCodeFormSchema>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  })

  // إضافة Suspense حول SearchParamsComponent
  return (
    <React.Suspense fallback={null}>
      <SearchParamsComponent />
      {/* ...باقي الصفحة كما هو... */}
    </React.Suspense>
  )

  async function handleVerifyCode(values: VerifyCodeFormSchema) {
    try {
      console.log("=== CODE VERIFICATION DEBUG ===")
      console.log("Code entered:", values.resetCode)
      console.log("Code length:", values.resetCode.length)
      console.log("Code type:", typeof values.resetCode)
      
      const res = await verifyResetCode(values.resetCode)
      console.log("Full API response:", JSON.stringify(res, null, 2))
      
      // تحقق من جميع الحالات المحتملة للنجاح
      const isSuccess = 
        res.status === "success" || 
        res.status === "Success" ||
        res.message?.toLowerCase().includes("verified") || 
        res.message?.toLowerCase().includes("valid") ||
        res.message?.toLowerCase().includes("success") ||
        res.data?.status === "success" ||
        res.success === true
      
      console.log("Is success?", isSuccess)
      
      if (isSuccess) {
        toast.success("Code verified successfully!")
        router.push(`/resetPassword?email=${encodeURIComponent(email || '')}`)
      } else {
        // عرض رسالة الخطأ الدقيقة
        const errorMessage = res.message || res.error || res.data?.message || "Invalid reset code"
        console.error("Code verification failed. Full response:", res)
        toast.error(`Error: ${errorMessage}`)
      }
    } catch (error) {
      console.error("Verify code error:", error)
      toast.error("An error occurred. Please try again.")
    }
  }

  if (!email) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Reset Code</h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter the reset code you received in your email.
        </p>
        
        {/* Debug info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Debug Information:</h3>
          <p className="text-sm text-yellow-700">
            • Check your email for the 6-digit code<br/>
            • Make sure to enter the code exactly as received<br/>
            • The code is case-sensitive<br/>
            • If the code doesn't work, try requesting a new one
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerifyCode)} className="space-y-4">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      placeholder="Enter the 6-digit code" 
                      maxLength={6}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Verify Code</Button>

            <div className="text-center mt-4 space-y-2">
              <Link
                href="/forgetPassword"
                className="block text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                Back to Forgot Password
              </Link>
              <Link
                href="/login"
                className="block text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Reset Code</h2>
      <p className="text-center text-gray-600 mb-6">
        We've sent a reset code to <strong>{email}</strong>
      </p>
      
      {/* Debug info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Debug Information:</h3>
        <p className="text-sm text-yellow-700">
          • Check your email for the 6-digit code<br/>
          • Make sure to enter the code exactly as received<br/>
          • The code is case-sensitive<br/>
          • If the code doesn't work, try requesting a new one
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerifyCode)} className="space-y-4">
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    placeholder="Enter the 6-digit code" 
                    maxLength={6}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Verify Code</Button>
          
          {/* Debug button */}
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => {
              console.log("=== MANUAL DEBUG ===")
              console.log("Form values:", form.getValues())
              console.log("Email from URL:", email)
            }}
          >
            Debug Info (Check Console)
          </Button>
          
          {/* Test API button */}
          <Button 
            type="button" 
            variant="secondary" 
            className="w-full"
            onClick={async () => {
              const code = form.getValues().resetCode
              if (!code) {
                toast.error("Please enter a code first")
                return
              }
              console.log("=== TESTING API DIRECTLY ===")
              try {
                const res = await verifyResetCode(code)
                console.log("Direct API test result:", res)
                toast.info(`API Response: ${JSON.stringify(res)}`)
              } catch (error) {
                console.error("Direct API test error:", error)
                toast.error("API Test Failed")
              }
            }}
          >
            Test API Directly
          </Button>

          <div className="text-center mt-4 space-y-2">
            <Link
              href={`/forgetPassword?email=${encodeURIComponent(email || '')}`}
              className="block text-green-600 hover:text-green-800 text-sm font-medium transition-colors duration-200"
            >
              Request New Code
            </Link>
            <Link
              href="/forgetPassword"
              className="block text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
            >
              Back to Forgot Password
            </Link>
            <Link
              href="/login"
              className="block text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
