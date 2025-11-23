// import { NextRequest, NextResponse } from "next/server";
// import  prisma  from "@/prisma/prisma";
// import bcrypt from "bcryptjs";
// import { signToken } from "@/utils/jwt";

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
//   }

//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const isValid = await bcrypt.compare(password, (user as any).password);
//   if (!isValid) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const token = signToken({ id: user.id, email: user.email, role: user.role }, "2h");

//   return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
// }
/////////////////////////////////////////////////////////////////////
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/jwt";
import { sendVerificationEmail } from "@/utils/sendemail";
import { cookies } from "next/headers";
import { CSRF } from "@/utils/crypto";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user: any = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, (user as any).password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  // console.log("token");
  const token = signToken({ id: user.id, email: user.email, role: user.role });

  const verifyLink = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/api/verify?token=${encodeURIComponent(token)}`;
  var csrf = await CSRF();
  // ارسال ایمیل
  await sendVerificationEmail(email, verifyLink);

  // ایجاد پاسخ و ذخیره JWT در Cookie
  const response = NextResponse.json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      csrf:csrf
    },
  });

  response.cookies.set({
    name: "token",
    value: token,
    secure: false,
    httpOnly: true, // برای امنیت، کلاینت نمی‌تواند بخواند
    path: "/", // در کل سایت معتبر باشد
    maxAge: 60 * 60 * 2, // 2 ساعت
    // sameSite: "strict",
    // secure: process.env.NODE_ENV === "production" // فقط HTTPS در محیط پروکشن
  });
  response.cookies.set({
    name: "csrf",
    value: csrf,
    maxAge: 60 * 60 * 2, // 2 ساعت
    path: "/",
    httpOnly: true,
  });

  return response;
}
