///////////////////////////////////////////////////////////////////////////////////////////
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sendVerificationEmail } from "@/utils/sendemail";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { signToken } from "@/utils/jwt";
const JWT_SECRET = process.env.SECRET_TOKEN!;

export async function POST(req: Request) {
  // const { email, password, name } = await req.json();
  // return NextResponse.json({ ok: true, message: "Verification email sent" })
  try {
    const { email, password, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // پیدا کردن یا ساخت کاربر
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, verified: false, password },
    });

    // ساخت JWT برای تایید ایمیل (اعتبار 1 روز)
    const token = await signToken({ sub: user.id, email: user.email, name: user.name, role: user.role })
    

    // لینک تأیید با encodeURIComponent
    const verifyLink = `${
      process.env.NEXT_PUBLIC_APP_URL
    }/api/verify?token=${encodeURIComponent(token)}`;

    // ارسال ایمیل
    // await sendVerificationEmail(email, verifyLink);

    //   const HOST_EMAIL = process.env.HOST_EMAIL!;
    //   const USER_EMAIL = process.env.USER_EMAIL!;
    //   const PASS_EMAIL = process.env.PASS_EMAIL!;
    //   //  const verifyUrl = `https://localhost:3000/api/verify?token=${verifyToken}`
    //   // بررسی داده‌های ورودی
    //   if (!email || !verifyLink) {
    //     throw new Error("Missing required fields");
    //   }

    //   try {

    //     // کانفیگ SMTP از cPanel
    //     const transporter = nodemailer.createTransport({
    //       host: HOST_EMAIL, // آدرس SMTP از cPanel
    //       port: 465, // SSL: 465 یا TLS: 587
    //       secure: true, // true برای SSL، false برای TLS
    //       auth: {
    //         user: USER_EMAIL,
    //         pass: PASS_EMAIL,
    //       },
    //     });

    //     // ارسال ایمیل
    //     await transporter.sendMail({
    //       from: '"Your App Name" <no-reply@yourdomain.com>',
    //       to: email,
    //       subject: "Login to Your Account",
    //       // text,
    //       html: `<p>سلام ${email}،</p>

    // <p>ما درخواست ورود به حساب کاربری شما را دریافت کردیم.</p>

    // <p>برای ورود ایمن به حساب خود، روی دکمه زیر کلیک کنید:</p>

    // <p style="text-align:center;">
    //   <a href="${verifyLink}"
    //      style="display:inline-block; padding:10px 20px; background-color:#4CAF50; color:white; text-decoration:none; border-radius:5px;">
    //     ورود به حساب کاربری
    //   </a>
    // </p>

    // <p>اگر شما این درخواست را ارسال نکرده‌اید، این ایمیل را نادیده بگیرید. هیچ تغییری در حساب شما ایجاد نخواهد شد.</p>

    // <p>با تشکر،<br>
    // تیم YourAppName</p>
    // `,
    //     });

    //     // console.log(test);

    //     return new Response(JSON.stringify({ success: true }), {
    //       status: 200,
    //       headers: { "Content-Type": "application/json" },
    //     });
    //   } catch (error: any) {
    //     console.error(
    //       "Elastic Email Error:",
    //       error.response?.data || error.message
    //     );
    //     return Response.json(
    //       { success: false, error: error.response?.data || error.message },
    //       { status: 500 }
    //     );
    //   }

    const response = NextResponse.json({
      message: "Login successful",
      user: "test", //{ id: user.id, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone }
    });

    response.cookies.set({
      name: "token",
      value: token,
      // secure: false,
      httpOnly: true, // برای امنیت، کلاینت نمی‌تواند بخواند
      path: "/", // در کل سایت معتبر باشد
      maxAge: 60 * 60 * 2, // 2 ساعت
      // sameSite: "strict",
      // secure: process.env.NODE_ENV === "production" // فقط HTTPS در محیط پروکشن
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
