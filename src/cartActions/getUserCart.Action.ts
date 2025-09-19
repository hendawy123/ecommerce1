"use server";

import getMyToken from "@/UTil/getMyToken";

export default async function getLogedUser() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("you are not logged in now !!");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      token: typeof token === "string" ? token : "",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart data");
  }

  const payload = await res.json();
  return payload; 
}
