"use server"

export default async function resetPassword(email: string, newPassword: string) {
  try {
    console.log("=== RESET PASSWORD API DEBUG ===")
    console.log("Email:", email)
    console.log("New password length:", newPassword.length)
    
    const requestBody = { email, newPassword }
    console.log("Request body:", requestBody)
    
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )

    console.log("Response status:", res.status)
    console.log("Response headers:", Object.fromEntries(res.headers.entries()))

    if (!res.ok) {
      const errorText = await res.text()
      console.error("HTTP error response:", errorText)
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`)
    }

    const payload = await res.json()
    console.log("Reset password response:", payload) // للتشخيص
    return payload
  } catch (error) {
    console.error("Reset password error:", error)
    return {
      status: "error",
      message: "Failed to reset password. Please try again."
    }
  }
}
