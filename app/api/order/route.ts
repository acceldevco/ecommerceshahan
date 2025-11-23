// import { NextResponse } from "next/server";
// import  prisma  from "@/prisma/prisma";

// export async function POST(req: Request) {
//   try {
//     const { userId, items } = await req.json();

//     if (!userId) {
//       return NextResponse.json(
//         { error: "userId ارسال نشده است" },
//         { status: 400 }
//       );
//     }

//     if (!items || items.length === 0) {
//       return NextResponse.json(
//         { error: "آیتم‌های سفارش خالی است" },
//         { status: 400 }
//       );
//     }

//     const order = await prisma.$transaction(async (tx) => {
//       let total = 0;
//       const orderItemsData: any[] = [];

//       // محاسبه تک‌تک آیتم‌ها
//       for (const item of items) {
//         const product = await tx.product.findUnique({
//           where: { id: item.productId },
//         });

//         if (!product) {
//           throw new Error(`محصول با id=${item.productId} یافت نشد`);
//         }

//         if (product.stock < item.quantity) {
//           throw new Error(`موجودی کافی برای محصول ${product.name} وجود ندارد`);
//         }

//         const unitPrice = product.discountedPrice ?? product.price;

//         total += unitPrice * item.quantity;

//         orderItemsData.push({
//           productId: product.id,
//           quantity: item.quantity,
//           unitPrice,
//         });

//         // کم کردن موجودی
//         await tx.product.update({
//           where: { id: product.id },
//           data: {
//             stock: { decrement: item.quantity },
//           },
//         });
//       }

//       // ایجاد سفارش
//       const newOrder = await tx.order.create({
//         data: {
//           userId,
//           total,
//           items: {
//             create: orderItemsData,
//           },
//         },
//         include: {
//           items: true,
//         },
//       });

//       return newOrder;
//     });

//     return NextResponse.json(order);

//   } catch (error: any) {
//     console.error("ORDER ERROR:", error);
//     return NextResponse.json(
//       { error: error.message || "خطای ناشناخته" },
//       { status: 500 }
//     );
//   }
// }
/////////////////////////////////////////////////////////////////
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
  try {
    const { userId, userData, items } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId ارسال نشده است" }, { status: 400 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "آیتم‌های سفارش خالی است" }, { status: 400 });
    }

    const order = await prisma.$transaction(async (tx) => {
      let total = 0;
      const orderItemsData: any[] = [];

      // پردازش هر محصول
      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new Error(`محصول با id=${item.productId} یافت نشد`);
        if (product.stock < item.quantity) throw new Error(`موجودی کافی برای محصول ${product.name} وجود ندارد`);

        const unitPrice = product.discountedPrice ?? product.price;
        total += unitPrice * item.quantity;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          unitPrice,
        });

        // کم کردن موجودی محصول
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // ایجاد سفارش
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          items: { create: orderItemsData },
        },
        include: { items: true },
      });

      console.log('userData',userData);
      
      // آپدیت اطلاعات کاربر بر اساس payload
      await tx.user.update({
        where: { id: userId },
        data: {
          ...userData, // name, lastname, phone, address و هر فیلدی که فرستاده شود
          updatedAt: new Date(),
        },
      });

      return newOrder;
    });

    return NextResponse.json(order);

  } catch (error: any) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json({ error: error.message || "خطای ناشناخته" }, { status: 500 });
  }
}
