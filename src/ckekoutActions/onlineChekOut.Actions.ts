"use server";
import getMyToken from '@/UTil/getMyToken';
import { CheckoutFormSchema } from '../schema/chekoutScheama';

export default async function onlinePayment(
  cartId: string,
  url: string,
  formValues: CheckoutFormSchema
) {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: {
  token: typeof token === "string" ? token : "",
  "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );

  const payload = await res.json();
  return payload;
}
