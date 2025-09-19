"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
try{
  const cookieStore = await cookies();
  const decodedToken = cookieStore.get("next-auth.session-token")?.value || cookieStore.get("ــSecure-next-auth.session-token")?.value;

  if(!decodedToken){
    return null
  }
  const token = await decode({
    token: decodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  console.log("🔍 Decoded token:", token); // تشخيص بيانات التوكن
  return token?.token || null;
}
catch(err){
  return null
}
}
