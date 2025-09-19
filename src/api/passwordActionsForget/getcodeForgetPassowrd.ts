"use server"

export default async function verifyResetCode(resetCode: string) {
    try {
        console.log("Sending verify request with code:", resetCode) // للتشخيص
        
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ resetCode }),
        })
        
        console.log("Response status:", res.status) // للتشخيص
        console.log("Response headers:", Object.fromEntries(res.headers.entries())) // للتشخيص
        
        if (!res.ok) {
            const errorText = await res.text()
            console.error("HTTP error response:", errorText)
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`)
        }

        const payload = await res.json()
        console.log("Verify code response:", payload) // للتشخيص
        return payload
    } catch (error) {
        console.error("Verify code error:", error)
        return {
            status: "error",
            message: "Failed to verify code. Please try again."
        }
    }
}