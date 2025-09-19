import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (token) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/regester"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else {
    if (request.nextUrl.pathname === "/cart") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/cart", "/login", "/regester"],
};
