// src/api/wishlist/getWishlist.ts
import getMyToken from "@/UTil/getMyToken";

export default async function getWishlist() {
  const token = await getMyToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: typeof token === "string" ? token : "",
    },
  });

  if (!res.ok) {
    throw new Error("❌ Failed to fetch wishlist");
  }

  return await res.json(); // بيرجع { status: "success", data: [...] }
}
