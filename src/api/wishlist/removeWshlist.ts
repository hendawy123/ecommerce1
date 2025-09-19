// src/api/wishlist/removeWishlist.ts
import getMyToken from "@/UTil/getMyToken";

export default async function removeWishlist(id: string) {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: typeof token === "string" ? token : "", // مهم: لازم يكون بنفس اسم المفتاح اللي API طالباه
      },
    }
  );

  if (!res.ok) {
    throw new Error("❌ Failed to remove product from wishlist");
  }

  return await res.json(); // API بيرجع status وبيانات جديدة
}
