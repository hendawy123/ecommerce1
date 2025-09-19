"use server";

import getMyToken from "@/UTil/getMyToken";
import { CheckoutFormSchema } from "@/schema/chekoutScheama";

export default async function onlineCash(
  cartId: string,
  formValues: CheckoutFormSchema
) {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );

  const payload = await res.json();
  return payload;
}
