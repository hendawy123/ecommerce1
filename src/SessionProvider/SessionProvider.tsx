"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React from "react";

type Props = { children: React.ReactNode };

export default function SessionProvider({ children }: Props) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
