"use server"

export default async function forgetPassword(email: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const payload = await res.json()
    console.log("Forget password response:", payload) // للتشخيص
    return payload
  } catch (error) {
    console.error("Forget password error:", error)
    return {
      status: "error",
      message: "Failed to send reset email. Please try again."
    }
  }
}
