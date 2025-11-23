// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/prisma/prisma";
// import bcrypt from "bcryptjs";
// import { signToken } from "@/utils/jwt";

// export async function POST(req: NextRequest) {
//   const { name, email, password, phone, address } = await req.json();

//   if (!name || !email || !password) {
//     return NextResponse.json(
//       { error: "Name, email and password are required" },
//       { status: 400 }
//     );
//   }

//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     return NextResponse.json({ error: "User already exists" }, { status: 400 });
//   }

//   const passwordHash = await bcrypt.hash(password, 10);

//   const user = await prisma.user.create({
//     data: { name, email, phone, address, password: passwordHash },
//   });

//   const token = await signToken({
//     sub: user.id,
//     email: user.email,
//     name: user.name,
//     role: user.role,
//   });
//   const verifyLink = `${
//     process.env.NEXT_PUBLIC_APP_URL
//   }/api/verify?token=${token}`;

//   return NextResponse.json({
//     message: "User created successfully",
//     user: { id: user.id, email: user.email, name: user.name },
//   })
//   .cookies.set({
//     name: "token",
//     value: token,
//     // secure: false,
//     httpOnly: true, // برای امنیت، کلاینت نمی‌تواند بخواند
//     path: "/", // در کل سایت معتبر باشد
//     maxAge: 60 * 60 * 2, // 2 ساعت
//     // sameSite: "strict",
//     // secure: process.env.NODE_ENV === "production" // فقط HTTPS در محیط پروکشن
//   });
//   // لینک تأیید با encodeURIComponent

//   const response = NextResponse.json({
//     message: "Login successful",
//     user: {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       // lastname: user.lastname,
//       phone: user.phone,
//     },
//   });
// }
////////////////////////
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/jwt";
import { sendVerificationEmail } from "@/utils/sendemail";
import { CSRF } from "@/utils/crypto";

export async function POST(req: NextRequest) {
  const { name, email, password, phone, address } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email and password are required" },
      { status: 400 }
    );
  }

  // چک کاربر
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // هش کردن
  const passwordHash = await bcrypt.hash(password, 10);

  // ساخت کاربر
  const user = await prisma.user.create({
    data: { name, email, phone, address, password: passwordHash },
  });

  // ساخت JWT
  const token = await signToken({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  // لینک تأیید
  const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;
  console.log("Verify link:", verifyLink);

  await sendVerificationEmail(email, verifyLink);
  // ساخت Response
  const response = NextResponse.json({
    message: "User created successfully",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
  var csrf = await CSRF();

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 2,
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
