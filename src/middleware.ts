import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;
  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (token && ["/", "/login", "/register"].includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // If user is not logged in and trying to access protected pages, redirect to login
  if (!token && ["/", "/dashboard"].includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/dashboard/:path*'
  ]
};
