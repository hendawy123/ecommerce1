"use server"

import getMyToken from "@/UTil/getMyToken"

export default async function getAllOrders() {
  const token = await getMyToken()

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`, {
    method: "GET",
    headers: {
      token: typeof token === "string" ? token : "",
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch orders")
  }

  const payload = await res.json()
  return payload
}
