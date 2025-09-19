"use server";

import getMyToken from "@/UTil/getMyToken";

export default async function clearCartActions() {
  try {
    const token = await getMyToken();
    if (!token) throw new Error("Please login to access this feature");

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const payload = await res.json();
    console.log("Clear cart response:", payload); // للتشخيص
    return payload;
  } catch (err) {
    console.error("Clear cart error:", err);
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Failed to clear cart"
    };
  }
}
