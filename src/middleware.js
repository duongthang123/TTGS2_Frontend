import { NextResponse } from "next/server";

export function middleware(request) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;


  if(!accessToken && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login" ]
};