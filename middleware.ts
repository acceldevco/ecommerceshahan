
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;




  //   const referer = request.headers.get("referer");
  // const allowedOrigins = ["http://localhost:3000"];

  // if (referer && !allowedOrigins.some(origin => referer.startsWith(origin))) {
  //   return NextResponse.redirect(new URL("/error", request.url));
  // }
  // 1) مسیر /auth برای کاربران بدون توکن آزاد است
  if (pathname.startsWith("/auth")) {
    if (token) {
      // اگر لاگین باشد → اجازه ورود به /auth نده
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(); // اگر توکن ندارد، اجازه بده وارد /auth شود
  }

  // 2) برای همه مسیرهای محافظت‌شده توکن لازم است
  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 3) توکن را چک کن
  let role: string;
  try {
    role = (verifyToken(token) as any).role;
  } catch (err) {
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete("token");
    return response;
  }

  // 4) قوانین دسترسی بر اساس نقش
  if (role === "CUSTOMER") {
    const forbiddenPaths = ["/checkout", "/api"];

    if (
      !pathname.startsWith("/user") &&
      !forbiddenPaths.some((p) => pathname.startsWith(p))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (role === "ADMIN") {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/checkout/:path*",
    "/auth/:path*",
  ],
};
