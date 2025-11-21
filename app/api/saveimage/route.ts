import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import  prisma  from "@/prisma/prisma";

export async function POST(request: Request) {
  try {
    const { image, title, categoryId, subcategoryId, productId } = await request.json();

    // تبدیل base64 به باینری
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // ساخت مسیر پوشه‌ی ذخیره
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `photo-${Date.now()}.jpg`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;
    const size = buffer.length;

    // ✨ ذخیره در دیتابیس
    const file = await prisma.file.create({
      data: {
        title: title || filename,
        url: fileUrl,
        size,
        // categoryId: categoryId ? Number(categoryId) : null,
        // subcategoryId: subcategoryId ? Number(subcategoryId) : null,
        productId: productId ? Number(productId) : null,
      },
    });

    return NextResponse.json({ message: "تصویر ذخیره شد!", file });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در آپلود تصویر" }, { status: 500 });
  }
}
