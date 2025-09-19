"use server"
import getMyToken from "@/UTil/getMyToken";

export default async function updateQuantityCart(id: string, count: number) {
  const token = await getMyToken();
  if (!token) throw new Error("❌ No token found");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT", 
    headers: {
      token: typeof token === "string" ? token : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }), 
  });



  const payload = await res.json();
  return payload;
}
