import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payLoad = await res.json();
        console.log("qqqqqqqqqqqqqqqqqqqq", payLoad);

        if (payLoad.message === "success") {
          const decodeToken: { id: string } = jwtDecode(payLoad.token);
          return {
            id: decodeToken?.id,
            user: payLoad?.user,
            token: payLoad?.token,
          };
        } else {
          throw new Error(payLoad.message || "invalid acc");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
  // تأكد أن session.user يأخذ فقط بيانات المستخدم المطلوبة
      // استخراج فقط الخصائص المطلوبة من token.user
      // استخراج بيانات المستخدم بشكل آمن
      // استخراج بيانات المستخدم بشكل آمن
      let userData: any = {};
      if (token.user && typeof token.user === "object") {
        if ("name" in token.user && "email" in token.user && "role" in token.user) {
          userData = token.user;
        }
      }
      session.user = {
        name: userData.name ?? "",
        email: userData.email ?? "",
        role: userData.role ?? ""
      };
      (session as any).token = token.token;
      return session;
    },
  },
};
