// app/api/getdata/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

type TableName =
  | "store"
  | "category"
  | "subcategory"
  | "product"
  | "file"
  | "user"
  | "cart"
  | "cartitem"
  | "order"
  | "orderitem"
  | "banner"|'review';

export async function POST(req: NextRequest) {
  // prisma.review.findMany()
  // prisma.product.findMany({
  //   include:{
  //     reviews:{
  //       include:{
  //         user:{
  //           select:{
  //             email:true,
  //             name:true
  //           }
  //         }
  //       }
  //     }
  //   }
  // })
  // prisma.category.findMany({
  //   include:{
  //     subcategories:true
  //   }
  // })
//  prisma.product.findMany({
//   include:{
//     categories:true
//   }
//  })
  //  var t0=await prisma.banner.findMany({
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

// console.log(t0);

  // var t = await prisma.order.findMany({
  //   include: {
  //     user: true,
  //     items: {
  //       include: {
  //         product: true,
  //       },
  //     },
  //   },
  // });
  // console.log(t);

  //    var t =await prisma.category.findMany({

  //       where: { parentId: null },
  //       include: {

  //         subcategories: {
  //           include: {
  //             subcategories: {
  //               include: {
  //                 subcategories: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     })
  // console.log(t);

  //  var t = await prisma.product.findMany({
  //       include: {
  //         attributes: true,
  //         category: true,
  //       },
  //   })
  //   console.log(t);

  try {
    const body = await req.json();
    const params = body; // body?.table//body?.params || {};
    // console.log("da", body);

    const {
      table,
      search = "",
      filters = {},
      page = 1,
      pageSize = 10,
    } = params;

    if (!table) {
      return NextResponse.json(
        { error: "table name is required" },
        { status: 400 }
      );
    }

    // نگاشت امن جدول‌ها
    const models: Record<TableName, any> = {
      store: prisma.store,
      category: prisma.category,
      subcategory: prisma.subCategory,
      product: prisma.product,
      file: prisma.file,
      user: prisma.user,
      cart: prisma.cart,
      cartitem: prisma.cartItem,
      order: prisma.order,
      orderitem: prisma.orderItem,
      banner: prisma.banner,
      review:prisma.review
    };

    const model = models[table.toLowerCase() as TableName];

    if (!model) {
      return NextResponse.json(
        { error: `Invalid table name: ${table}` },
        { status: 400 }
      );
    }

    // فیلتر جستجو
    const where: any = {};
    // if (search) {
    //   where.OR = [
    //     { name: { contains: search, mode: "insensitive" } },
    //     { title: { contains: search, mode: "insensitive" } },
    //   ];
    // }

    if (filters.where) Object.assign(where, filters.where);

    // Pagination
    // const skip = (page - 1) * pageSize;
    const take = pageSize;

    console.log('filters',take);

    const [data, total] = await Promise.all([
      model.findMany({
        where,
        //  skip,
        ...filters,
        take,
      }),
      model.count(),
    ]);

    //  console.log(await models.order.findMany());

    return NextResponse.json({ data, page, pageSize, total });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
