"use server"

import getMyToken from "@/UTil/getMyToken";

export default async function addToCart(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("Please login to access this feature");
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const payload = await res.json();
    console.log("Add to cart response:", payload); // للتشخيص
    return payload;
  } catch (err) {
    console.error("Add to cart error:", err);
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Failed to add product to cart"
    };
  }
}
