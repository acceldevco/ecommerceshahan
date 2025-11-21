// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/prisma/prisma";
// import { verifyToken } from "./utils/jwt";
// // import Tokens from "csrf";
// const JWT_SECRET = process.env.ACCESS_TOKEN!;
// const CSRF = process.env.CSRF_SECRET!;
// const CSRF_HEADER = "XSRF-TOKEN";

// export async function middleware(request: NextRequest) {
//   const token: any = request.cookies.get("token")?.value;

//   //   const token = request.cookies.get("token")?.value;
//   //   // const csrfToken = request.headers.get(CSRF_HEADER);
//   //   const csrfToken = request.cookies.get(CSRF_HEADER)?.value;
//   const { pathname } = request.nextUrl;

//   //   let userId: string | null = null;

//   //   // مسیرهایی که نیاز به توکن ندارند
//   const excludedPaths = [
//     // "/api/verify",
//     // "/api/sendverification",
//     // "/auth",
//     "/api",
//     "/admin",
//   ];
//   // //   const tokens = new Tokens();
//   //   // بررسی CSRF فقط برای مسیرهای API محافظت‌شده
//   // if (
//   //   !excludedPaths.some((path) => pathname.startsWith(path)) &&
//   //   pathname.startsWith("/api")
//   // ) {

//   // }
//   //   //   if (!csrfToken) {
//   //   //     return new NextResponse("CSRF token missing", { status: 403 });
//   //   //   }

//   //   //   const ok = tokens.verify(CSRF, csrfToken);
//   //   //   if (!ok) return new NextResponse("CSRF token missing", { status: 403 });
//   //   // }

//   const role = (verifyToken(token) as any).role;
//   console.log("pathname", pathname);

//   //   if (role === "CUSTOMER") {
//   //     // if (!pathname.startsWith("/user") || pathname.startsWith("/checkout")) {
//   //     //   return NextResponse.redirect(new URL("/", request.url));
//   //     // }
//   //     // فقط مسیرهای user مجاز هستند
//   //     if (!pathname.startsWith("/user")) {
//   //         console.log('ddss',pathname ==='/checkout',pathname);

//   //       if (pathname !=='/checkout') {
//   //         return NextResponse.redirect(new URL("/", request.url));
//   //       } else {
//   //         // return NextResponse.redirect(new URL("/", request.url));
//   //       }
//   //     }

//   //     // checkout برای مشتری ممنوع است
//   //     // if (pathname.includes("checkout")) {
//   //     //   return NextResponse.redirect(new URL("/", request.url));
//   //     // }
//   //   } else if (role === "ADMIN") {
//   //     if (!pathname.startsWith("/admin")) {
//   //     //   return NextResponse.redirect(new URL("/", request.url));
//   //     }
//   //   } else {
//   //     // نقش ناشناخته → ری‌دایرکت
//   //     // return NextResponse.redirect(new URL("/", request.url));
//   //   }

//   if (role === "CUSTOMER") {
//     // CUSTOMER فقط /user/* اجازه دارد
//     if (!pathname.startsWith("/user")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     // مسیرهای checkout برای CUSTOMER ممنوع
//     // if (pathname !== "/checkout") {
//     //   return NextResponse.redirect(new URL("/", request.url));
//     // }
//   } else if (role === "ADMIN") {
//     if (!pathname.startsWith("/admin")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   } else {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (excludedPaths.some((path) => pathname.startsWith(path))) {
//     console.log(token);
//     console.log("jhj");
//   }

//   //   // بررسی JWT برای مسیرهای محافظت‌شده
//   // if (!excludedPaths.some((path) => pathname.startsWith(path))) {

//   //   if (!token) {
//   //     return NextResponse.redirect(new URL("/auth", request.url));
//   //   }

//   //   try {
//   //     const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
//   //     // userId = payload.sub;
//   //   } catch {
//   //     const response = NextResponse.redirect(new URL("/auth", request.url));
//   //     response.cookies.delete("token");
//   //     return response;
//   //   }
//   // }

//   //   // اگر توکن دارد و به صفحه‌ی auth می‌رود → بفرستش صفحه اصلی
//   //   if (token && pathname.startsWith("/auth")) {
//   //     return NextResponse.redirect(new URL("/", request.url));
//   //   }

//   return NextResponse.next();
// }

// export const config = {
//   runtime: "nodejs",
//   matcher: ["/user/:path*", "/api/:path*", "/admin/:path*", "/checkout"],
// };
////////////////////////////////////////////////////////////////////////
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const excludedPaths = ["/api/verify", "/api/sendverification", "/auth"];

  // مسیرهای استثنا سریعاً عبور کنند
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // اگر توکن وجود ندارد → هدایت به login
  // if (!token) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }

  // let role: string;
  // try {
  //   role = (verifyToken(token) as any).role;
  // } catch (err) {
  //   // توکن نامعتبر → حذف کوکی و ریدایرکت
  //   const response = NextResponse.redirect(new URL("/auth", request.url));
  //   response.cookies.delete("token");
  //   return response;
  // }

  // مسیرهای بر اساس نقش
  //   if (role === "CUSTOMER") {
  //     if (!pathname.startsWith("/user") || pathname.startsWith("/checkout")) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   } else if (role === "ADMIN") {
  //     if (!pathname.startsWith("/admin")) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   } else {
  //     // نقش ناشناخته → ریدایرکت به صفحه اصلی
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  ///////////////////////////////////
  // if (role === "CUSTOMER") {
  //   // مسیرهای غیرمجاز برای CUSTOMER
  //   const forbiddenPaths = ["/checkout"
  //     // , "/api"
  //   ];

  //   // اگر مسیر با /user شروع نمی‌شود یا در مسیرهای ممنوع باشد → redirect
  //   if (
  //     !pathname.startsWith("/user") &&
  //     !forbiddenPaths.some((p) => pathname.startsWith(p))
  //   ) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // } else if (role === "ADMIN") {
  //   // فقط مسیرهای /admin مجاز
  //   if (!pathname.startsWith("/admin")) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // } else {
  //   // نقش ناشناخته → ریدایرکت به صفحه اصلی
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/user/:path*", "/admin/:path*", "/checkout/:path*"],
};
