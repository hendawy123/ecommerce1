"use server"

import getMyToken from "@/UTil/getMyToken"

export default async function deleteCartItem(id: string) {
  const token = await getMyToken()
  if (!token) throw new Error("No token found, please login")

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  })

  const payload = await res.json()
  return payload
}
