import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma"; // مسیر به Prisma Client شما
import CryptoJS from "crypto-js";
// لیست جداول مجاز
const tables = [
  "store",
  "category",
  "subcategory",
  "product",
  "file",
  "user",
  "cart",
  "cartitem",
  "order",
  "orderitem",
  "banner",
] as const;

type T = (typeof tables)[number];
const SECRET = process.env.SECRET!;
// فیلدهای مجاز هر جدول
const whitelist: any = {
  store: ["name", "currency"],
  category: ["name", "storeId", "parentId", "imageUrl"],
  subcategory: ["title", "url", "size", "categoryId"],
  product: [
    "name",
    "description",
    "price",
    "image",
    "stock",
    "categoryId",
    "storeId",
    "categories",
    "files",
  ],
  file: ["title", "url", "size", "categoryId", "subcategoryId", "productId"],
  user: ["name", "email", "phone", "address", "role", "storeId"],
  cart: ["userId", "total"],
  cartitem: ["cartId", "productId", "quantity", "unitPrice", "totalPrice"],
  order: ["userId", "storeId", "total", "status", "createdAt"],
  orderitem: ["orderId", "productId", "quantity", "unitPrice"],
  banner: [
    "id",
    "title",
    "file",
    "position",
    "createdAt",
    "isActive",
    "imageUrl",
  ],
};

// فیلتر داده‌ها طبق whitelist
const filter = (t: T, d: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(d).filter(([k]) => {
      return whitelist[t].includes(k);
    })
  );
};

export async function POST(req: NextRequest) {
  // prisma.banner.create({
  //   data:{
  //     title:"test",
  //     imageUrl:"/test"
  //   }
  // })
  // return 0
  // prisma.banner.findMany({
  //   include:{
  //     file:true
  //   }
  //   // where:{
  //   //   categories:{
  //   //     some: {
  //   //       id:{
  //   //         in:
  //   //       }
  //   //     }
  //   //   }
  //   // }
  // })
  // prisma.product.create({
  //   data: {
  //     name: "",
  //     price: 5000,
  //     // id:5,
  //     categories: {
  //       connect: [{
  //         id: 4,
  //       }],
  //     },
  //     files: {
  //       connect: [{
  //         id: 4,
  //       }],
  //     },
  //   },
  // });
  try {
    const body = await req.json();

    const bytes = CryptoJS.AES.decrypt(body.data, SECRET);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const {
      nameTable,
      action,
      id,
      data,
      csrf,
    }: {
      nameTable: T;
      action: "create" | "update" | "delete";
      id?: string | number;
      data?: any;
      csrf: any;
    } = decrypted; // body;
    if (req.cookies.get("csrf")?.value !== csrf) {
      return NextResponse.json({ error: "عدم انطباق csrf" }, { status: 401 });
    }
    // console.log(req.cookies.get('csrf')?.value,csrf);

    // console.log(tables.includes(nameTable));

    // اعتبارسنجی ورودی‌ها
    if (!nameTable || !tables.includes(nameTable)) {
      return NextResponse.json(
        { error: "نام جدول معتبر نیست" },
        { status: 400 }
      );
    }
    if (!action) {
      return NextResponse.json(
        { error: "پارامتر action الزامی است" },
        { status: 400 }
      );
    }

    const model = (prisma as any)[nameTable];
    if (!model) {
      return NextResponse.json({ error: "مدل یافت نشد" }, { status: 500 });
    }
    const safe = data ? filter(nameTable, data) : undefined;

    let result;

    switch (action) {
      case "create":
        if (!safe || !Object.keys(safe).length)
          return NextResponse.json(
            { error: "داده برای ایجاد الزامی است" },
            { status: 400 }
          );
        result = await model.create({ data: safe });
        break;

      case "update":
        if (!id)
          return NextResponse.json(
            { error: "شناسه الزامی است" },
            { status: 400 }
          );
        if (
          // true
          !safe ||
          !Object.keys(safe).length
        )
          // console.log('data',data);

          return NextResponse.json(
            { error: "داده برای ویرایش الزامی است" },
            { status: 400 }
          );
        result = await model.update({ where: { id: Number(id) }, data: safe });
        break;

      case "delete":
        if (!id)
          return NextResponse.json(
            { error: "شناسه الزامی است" },
            { status: 400 }
          );
        result = await model.delete({ where: { id: Number(id) } });
        break;

      default:
        return NextResponse.json(
          { error: "action ناشناخته است" },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err.message || "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}
